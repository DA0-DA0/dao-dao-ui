import { useCallback, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { constSelector, useRecoilValueLoadable } from 'recoil'

import { isDaoSelector } from '@dao-dao/state/recoil'
import {
  ChainProvider,
  DaoSupportedChainPickerInput,
  LockWithKeyEmoji,
  useChain,
} from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMaker,
  CosmosMsgFor_Empty,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types'
import {
  cwMsgToProtobuf,
  decodePolytoneExecuteMsg,
  getChainAddressForActionOptions,
  isDecodedStargateMsg,
  makeStargateMessage,
  maybeMakePolytoneExecuteMessage,
  objectMatchesStructure,
  protobufToCwMsg,
} from '@dao-dao/utils'
import { MsgExec } from '@dao-dao/utils/protobuf/codegen/cosmos/authz/v1beta1/tx'

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
  const { categories, loadedActions } = useLoadedActionsAndCategories({
    isCreating: props.isCreating,
  })
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
  const {
    options: { address },
  } = props
  const { chain_id: chainId } = useChain()

  const isDaoLoadable = useRecoilValueLoadable(
    isDaoSelector({
      address,
      chainId,
    })
  )
  const daoInfoLoadable = useRecoilValueLoadable(
    isDaoLoadable.state === 'hasValue' && isDaoLoadable.contents
      ? daoInfoSelector({
          chainId,
          coreAddress: address,
        })
      : constSelector(undefined)
  )

  return isDaoLoadable.state === 'loading' ||
    daoInfoLoadable.state === 'loading' ? (
    <InnerComponentLoading {...props} />
  ) : daoInfoLoadable.state === 'hasValue' && daoInfoLoadable.contents ? (
    <SuspenseLoader fallback={<InnerComponentLoading {...props} />}>
      <DaoProviders info={daoInfoLoadable.contents}>
        <InnerComponent {...props} />
      </DaoProviders>
    </SuspenseLoader>
  ) : (
    <WalletActionsProvider address={address}>
      <InnerComponent {...props} />
    </WalletActionsProvider>
  )
}

const Component: ActionComponent = (props) => {
  const { context } = useActionOptions()

  // Load DAO info for chosen DAO.
  const { watch } = useFormContext<AuthzExecData>()
  const address = watch((props.fieldNamePrefix + 'address') as 'address')
  const msgsPerSender =
    watch((props.fieldNamePrefix + '_msgs') as '_msgs') ?? []

  const chainId = watch((props.fieldNamePrefix + 'chainId') as 'chainId')

  // When creating, just show one form for the chosen address. When not
  // creating, render a form for each sender message group since the component
  // needs to be wrapped in the providers for that sender.
  return (
    <>
      {context.type === ActionContextType.Dao && (
        <DaoSupportedChainPickerInput
          disabled={!props.isCreating}
          fieldName={props.fieldNamePrefix + 'chainId'}
          onlyDaoChainIds
        />
      )}

      <ChainProvider chainId={chainId}>
        {props.isCreating ? (
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
        )}
      </ChainProvider>
    </>
  )
}

export const makeAuthzExecAction: ActionMaker<AuthzExecData> = (options) => {
  const {
    t,
    chain: { chain_id: currentChainId },
  } = options

  const useDefaults: UseDefaults<AuthzExecData> = () => ({
    chainId: currentChainId,
    address: '',
    msgs: [],
  })

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<AuthzExecData> = (
    msg: Record<string, any>
  ) => {
    let chainId = currentChainId
    const decodedPolytone = decodePolytoneExecuteMsg(chainId, msg)
    if (decodedPolytone.match) {
      chainId = decodedPolytone.chainId
      msg = decodedPolytone.msg
    }

    return useMemo(() => {
      if (
        !isDecodedStargateMsg(msg) ||
        msg.stargate.typeUrl !== MsgExec.typeUrl ||
        !objectMatchesStructure(msg.stargate.value, {
          grantee: {},
          msgs: {},
        }) ||
        !Array.isArray(msg.stargate.value.msgs)
      ) {
        return { match: false }
      }

      const execMsg = msg.stargate.value as MsgExec

      // Group adjacent messages by sender, preserving message order.
      const msgsPerSender = execMsg.msgs
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
          chainId,
          // Technically each message could have a different address. While we
          // don't support that on creation, we can still detect and render them
          // correctly in the component.
          address: '',
          msgs: [],
          _msgs: msgsPerSender,
        },
      }
    }, [chainId, msg])
  }

  const useTransformToCosmos: UseTransformToCosmos<AuthzExecData> = () =>
    useCallback(
      ({ chainId, address, msgs }) =>
        maybeMakePolytoneExecuteMessage(
          currentChainId,
          chainId,
          makeStargateMessage({
            stargate: {
              typeUrl: MsgExec.typeUrl,
              value: {
                grantee: getChainAddressForActionOptions(options, chainId),
                msgs: msgs.map((msg) => cwMsgToProtobuf(msg, address)),
              } as MsgExec,
            },
          })
        ),
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
