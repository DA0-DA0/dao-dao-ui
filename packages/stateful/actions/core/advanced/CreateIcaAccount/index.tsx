import { useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { MsgRegisterInterchainAccount } from '@dao-dao/protobuf/codegen/ibc/applications/interchain_accounts/controller/v1/tx'
import { Metadata } from '@dao-dao/protobuf/codegen/ibc/applications/interchain_accounts/v1/metadata'
import { icaRemoteAddressSelector } from '@dao-dao/state/recoil'
import { ChainEmoji, useCachedLoadingWithError } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types'
import {
  getChainForChainName,
  getDisplayNameForChainId,
  getIbcTransferInfoBetweenChains,
  getIbcTransferInfoFromConnection,
  isDecodedStargateMsg,
  makeStargateMessage,
} from '@dao-dao/utils'

import { useActionOptions } from '../../../react'
import { CreateIcaAccountComponent, CreateIcaAccountData } from './Component'

const Component: ActionComponent = (props) => {
  const { t } = useTranslation()
  const {
    address,
    chain: { chain_id: srcChainId },
  } = useActionOptions()

  const { watch, setError, clearErrors } =
    useFormContext<CreateIcaAccountData>()
  const destChainId = watch((props.fieldNamePrefix + 'chainId') as 'chainId')

  const createdAddressLoading = useCachedLoadingWithError(
    icaRemoteAddressSelector({
      address,
      srcChainId,
      destChainId,
    })
  )

  // If ICA account already exists for this chain during creation, add error
  // preventing submission.
  useEffect(() => {
    if (
      !createdAddressLoading.loading &&
      !createdAddressLoading.errored &&
      createdAddressLoading.data &&
      props.isCreating
    ) {
      setError((props.fieldNamePrefix + 'chainId') as 'chainId', {
        type: 'manual',
        message: t('error.icaAccountAlreadyExists', {
          chain: getDisplayNameForChainId(destChainId),
        }),
      })
    } else {
      clearErrors((props.fieldNamePrefix + 'chainId') as 'chainId')
    }
  }, [
    clearErrors,
    createdAddressLoading,
    destChainId,
    props.fieldNamePrefix,
    props.isCreating,
    setError,
    t,
  ])

  return (
    <CreateIcaAccountComponent
      {...props}
      options={{
        createdAddressLoading,
      }}
    />
  )
}

export const makeCreateIcaAccountAction: ActionMaker<CreateIcaAccountData> = ({
  t,
  chain: { chain_id: sourceChainId },
  address,
}) => {
  const useDefaults: UseDefaults<CreateIcaAccountData> = () => ({
    chainId: '',
  })

  const useTransformToCosmos: UseTransformToCosmos<CreateIcaAccountData> = () =>
    useCallback(({ chainId }) => {
      if (!chainId) {
        return
      }

      const info = getIbcTransferInfoBetweenChains(sourceChainId, chainId)

      return makeStargateMessage({
        stargate: {
          typeUrl: MsgRegisterInterchainAccount.typeUrl,
          value: MsgRegisterInterchainAccount.fromPartial({
            owner: address,
            connectionId: info.sourceChain.connection_id,
            version: JSON.stringify(
              Metadata.fromPartial({
                version: 'ics27-1',
                controllerConnectionId: info.sourceChain.connection_id,
                hostConnectionId: info.destinationChain.connection_id,
                // Empty when registering a new address.
                address: '',
                encoding: 'proto3',
                txType: 'sdk_multi_msg',
              })
            ),
          }),
        },
      })
    }, [])

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<CreateIcaAccountData> = (
    msg: Record<string, any>
  ) => {
    if (
      !isDecodedStargateMsg(msg) ||
      msg.stargate.typeUrl !== MsgRegisterInterchainAccount.typeUrl
    ) {
      return {
        match: false,
      }
    }

    try {
      const { connectionId } = msg.stargate.value
      const { destinationChain } = getIbcTransferInfoFromConnection(
        sourceChainId,
        connectionId
      )

      return {
        match: true,
        data: {
          chainId: getChainForChainName(destinationChain.chain_name).chain_id,
        },
      }
    } catch (err) {
      return {
        match: false,
      }
    }
  }

  return {
    key: ActionKey.CreateIcaAccount,
    Icon: ChainEmoji,
    label: t('title.createICAAccount'),
    description: t('info.createICAAccountDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}