import { Any } from 'cosmjs-types/google/protobuf/any'
import { useCallback, useEffect, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { constSelector, useRecoilValueLoadable } from 'recoil'

import { LockWithKeyEmoji } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionKey,
  ActionMaker,
  CosmosMsgFor_Empty,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types'
import {
  cwMsgToProtobuf,
  isDecodedStargateMsg,
  isValidContractAddress,
  isValidWalletAddress,
  makeStargateMessage,
  objectMatchesStructure,
  protobufToCwMsg,
} from '@dao-dao/utils'

import {
  AddressInput,
  DaoProviders,
  EntityDisplay,
  SuspenseLoader,
} from '../../../../components'
import { daoInfoSelector } from '../../../../recoil'
import {
  WalletActionsProvider,
  useActionOptions,
  useActionsForMatching,
  useLoadedActionsAndCategories,
} from '../../../react'
import {
  AuthzExecData,
  AuthzExecOptions,
  AuthzExecComponent as StatelessAuthzExecComponent,
} from './Component'

const TYPE_URL_MSG_EXEC = '/cosmos.authz.v1beta1.MsgExec'

const useDefaults: UseDefaults<AuthzExecData> = () => ({
  address: '',
  msgs: [],
})

type InnerOptions = Pick<AuthzExecOptions, 'msgPerSenderIndex'>

const InnerComponentLoading: ActionComponent<InnerOptions> = (props) => (
  <StatelessAuthzExecComponent
    {...props}
    options={{
      msgPerSenderIndex: props.options.msgPerSenderIndex,
      categories: [],
      loadedActions: {},
      actionsForMatching: [],
      AddressInput,
      EntityDisplay,
      SuspenseLoader,
    }}
  />
)

const InnerComponent: ActionComponent<InnerOptions> = (props) => {
  const { categories, loadedActions } = useLoadedActionsAndCategories()
  const actionsForMatching = useActionsForMatching()

  return (
    <StatelessAuthzExecComponent
      {...props}
      options={{
        msgPerSenderIndex: props.options.msgPerSenderIndex,
        categories,
        loadedActions,
        actionsForMatching,
        AddressInput,
        EntityDisplay,
        SuspenseLoader,
      }}
    />
  )
}

const InnerComponentWrapper: ActionComponent<
  InnerOptions & { address: string }
> = (props) => {
  const { bech32Prefix } = useActionOptions()
  const {
    options: { address },
  } = props

  const isContractAddress = isValidContractAddress(address, bech32Prefix)
  const isWalletAddress = isValidWalletAddress(address, bech32Prefix)
  // If contract, try to load DAO info.
  const daoInfoLoadable = useRecoilValueLoadable(
    isContractAddress
      ? daoInfoSelector({
          coreAddress: address,
        })
      : constSelector(undefined)
  )

  return isContractAddress ? (
    daoInfoLoadable.state === 'hasValue' ? (
      <SuspenseLoader fallback={<InnerComponentLoading {...props} />}>
        <DaoProviders info={daoInfoLoadable.contents!}>
          <InnerComponent {...props} />
        </DaoProviders>
      </SuspenseLoader>
    ) : (
      <InnerComponentLoading {...props} />
    )
  ) : isWalletAddress ? (
    <WalletActionsProvider>
      <InnerComponent {...props} />
    </WalletActionsProvider>
  ) : (
    <InnerComponent {...props} />
  )
}

const Component: ActionComponent = (props) => {
  // Load DAO info for chosen DAO.
  const { watch, setValue, clearErrors } = useFormContext<AuthzExecData>()
  const address = watch((props.fieldNamePrefix + 'address') as 'address')
  const msgsPerSender =
    watch((props.fieldNamePrefix + '_msgs') as '_msgs') ?? []

  // Reset actions when address changes during creation.
  useEffect(() => {
    if (props.isCreating) {
      setValue((props.fieldNamePrefix + 'msgs') as 'msgs', [])
      clearErrors((props.fieldNamePrefix + 'msgs') as 'msgs')
      setValue(
        (props.fieldNamePrefix + '_actionData') as '_actionData',
        undefined
      )
      clearErrors((props.fieldNamePrefix + '_actionData') as '_actionData')
    }
  }, [clearErrors, address, props.fieldNamePrefix, props.isCreating, setValue])

  // When creating, just show one form for the chosen address. When not
  // creating, render a form for each sender message group since the component
  // needs to be wrapped in the providers for that sender.
  return props.isCreating ? (
    <InnerComponentWrapper
      {...props}
      options={{
        address,
      }}
    />
  ) : (
    <>
      {msgsPerSender.map(({ sender }, index) => (
        <InnerComponentWrapper
          key={index}
          {...props}
          options={{
            address: sender,
            // Set so the component knows which sender message group to render.
            msgPerSenderIndex: index,
          }}
        />
      ))}
    </>
  )
}

export const makeAuthzExecAction: ActionMaker<AuthzExecData> = ({
  t,
  address: grantee,
}) => {
  const useDecodedCosmosMsg: UseDecodedCosmosMsg<AuthzExecData> = (
    msg: Record<string, any>
  ) =>
    useMemo(() => {
      if (
        !isDecodedStargateMsg(msg) ||
        msg.stargate.typeUrl !== TYPE_URL_MSG_EXEC ||
        !objectMatchesStructure(msg.stargate.value, {
          grantee: {},
          msgs: {},
        }) ||
        // Make sure this address is the grantee.
        msg.stargate.value.grantee !== grantee ||
        !Array.isArray(msg.stargate.value.msgs)
      ) {
        return { match: false }
      }

      // Group adjacent messages by sender, preserving message order.
      const msgsPerSender = (msg.stargate.value.msgs as Any[])
        .map((msg) => protobufToCwMsg(msg))
        .reduce(
          (acc, { msg, sender }) => {
            const last = acc[acc.length - 1]
            if (last && last.sender === sender) {
              last.msgs.push(msg)
            } else {
              acc.push({ sender, msgs: [msg] })
            }
            return acc
          },
          [] as {
            sender: string
            msgs: CosmosMsgFor_Empty[]
          }[]
        )

      return {
        match: true,
        data: {
          // Technically each message could have a different address. While we
          // don't support that on creation, we can still detect and render them
          // correctly in the component.
          address: '',
          msgs: [],
          _msgs: msgsPerSender,
        },
      }
    }, [msg])

  const useTransformToCosmos: UseTransformToCosmos<AuthzExecData> = () =>
    useCallback(
      ({ address, msgs }) =>
        makeStargateMessage({
          stargate: {
            typeUrl: TYPE_URL_MSG_EXEC,
            value: {
              grantee,
              msgs: msgs.map((msg) => cwMsgToProtobuf(msg, address)),
            },
          },
        }),
      []
    )

  return {
    key: ActionKey.AuthzExec,
    Icon: LockWithKeyEmoji,
    label: t('title.authzExec'),
    description: t('info.authzExecDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
