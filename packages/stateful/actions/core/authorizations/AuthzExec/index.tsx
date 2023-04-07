import { useCallback, useEffect, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { constSelector, useRecoilValueLoadable } from 'recoil'

import { LockWithKeyEmoji } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types'
import {
  cosmwasmToProtobuf,
  decodeRawProtobufMsg,
  isDecodedStargateMsg,
  isValidContractAddress,
  isValidWalletAddress,
  makeStargateMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import {
  AddressInput,
  DaoProviders,
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
  AuthzExecComponent as StatelessAuthzExecComponent,
} from './Component'

const TYPE_URL_MSG_EXEC = '/cosmos.authz.v1beta1.MsgExec'

const useDefaults: UseDefaults<AuthzExecData> = () => ({
  address: '',
  msgs: [],
})

const InnerComponentLoading: ActionComponent = (props) => (
  <StatelessAuthzExecComponent
    {...props}
    options={{
      categories: [],
      loadedActions: {},
      actionsForMatching: [],
      AddressInput,
      SuspenseLoader,
    }}
  />
)

const InnerComponent: ActionComponent = (props) => {
  const { categories, loadedActions } = useLoadedActionsAndCategories()
  const actionsForMatching = useActionsForMatching()

  return (
    <StatelessAuthzExecComponent
      {...props}
      options={{
        categories,
        loadedActions,
        actionsForMatching,
        AddressInput,
        SuspenseLoader,
      }}
    />
  )
}

const Component: ActionComponent = (props) => {
  const { bech32Prefix } = useActionOptions()

  // Load DAO info for chosen DAO.
  const { watch, setValue, clearErrors } = useFormContext()
  const address = watch(props.fieldNamePrefix + 'address')

  // Reset actions when address changes during creation.
  useEffect(() => {
    if (props.isCreating) {
      setValue(props.fieldNamePrefix + 'msgs', [])
      clearErrors(props.fieldNamePrefix + 'msgs')
      setValue(props.fieldNamePrefix + '_actions', undefined)
      clearErrors(props.fieldNamePrefix + '_actions')
    }
  }, [clearErrors, address, props.fieldNamePrefix, props.isCreating, setValue])

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
      !Array.isArray(msg.stargate.value.msgs)
    ) {
      return { match: false }
    }

    return {
      match: true,
      data: {
        // Not sure if it's possible to extract the target address since the
        // address may show up in any part of the message body.
        address: '',
        msgs: msg.stargate.value.msgs.map((msg: any) =>
          decodeRawProtobufMsg(msg)
        ),
      },
    }
  }, [msg])

export const makeAuthzExecAction: ActionMaker<AuthzExecData> = ({
  t,
  address: grantee,
}) => {
  const useTransformToCosmos: UseTransformToCosmos<AuthzExecData> = () =>
    useCallback(
      ({ address, msgs }) =>
        makeStargateMessage({
          stargate: {
            typeUrl: TYPE_URL_MSG_EXEC,
            value: {
              grantee,
              msgs: msgs.map((msg) => cosmwasmToProtobuf(msg, address)),
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
