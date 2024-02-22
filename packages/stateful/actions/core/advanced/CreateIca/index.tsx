import { useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  chainSupportsIcaControllerSelector,
  chainSupportsIcaHostSelector,
  icaRemoteAddressSelector,
} from '@dao-dao/state/recoil'
import { ChainEmoji, useCachedLoadingWithError } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseHideFromPicker,
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
import { MsgRegisterInterchainAccount } from '@dao-dao/utils/protobuf/codegen/ibc/applications/interchain_accounts/controller/v1/tx'
import { Metadata } from '@dao-dao/utils/protobuf/codegen/ibc/applications/interchain_accounts/v1/metadata'

import { useActionOptions } from '../../../react'
import { CreateIcaComponent, CreateIcaData } from './Component'

const useDefaults: UseDefaults<CreateIcaData> = () => ({
  chainId: '',
})

const Component: ActionComponent = (props) => {
  const { t } = useTranslation()
  const {
    address,
    chain: { chain_id: srcChainId },
  } = useActionOptions()

  const { watch, setError, clearErrors } = useFormContext<CreateIcaData>()
  const destChainId = watch((props.fieldNamePrefix + 'chainId') as 'chainId')

  const createdAddressLoading = useCachedLoadingWithError(
    icaRemoteAddressSelector({
      address,
      srcChainId,
      destChainId,
    })
  )
  const icaHostSupported = useCachedLoadingWithError(
    chainSupportsIcaHostSelector({
      chainId: destChainId,
    })
  )

  // If ICA account already exists or ICA host not enabled for this chain during
  // creation, add error preventing submission.
  useEffect(() => {
    if (
      destChainId &&
      !icaHostSupported.loading &&
      !icaHostSupported.updating &&
      (icaHostSupported.errored || !icaHostSupported.data) &&
      props.isCreating
    ) {
      setError((props.fieldNamePrefix + 'chainId') as 'chainId', {
        type: 'manual',
        message: icaHostSupported.errored
          ? icaHostSupported.error.message
          : t('error.icaHostUnsupported', {
              chain: getDisplayNameForChainId(destChainId),
            }),
      })
    } else if (
      destChainId &&
      !createdAddressLoading.loading &&
      !createdAddressLoading.updating &&
      !createdAddressLoading.errored &&
      createdAddressLoading.data &&
      props.isCreating
    ) {
      setError((props.fieldNamePrefix + 'chainId') as 'chainId', {
        type: 'manual',
        message: t('error.icaAlreadyExists', {
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
    icaHostSupported,
    props.fieldNamePrefix,
    props.isCreating,
    setError,
    t,
  ])

  return (
    <CreateIcaComponent
      {...props}
      options={{
        createdAddressLoading,
        icaHostSupported,
      }}
    />
  )
}

export const makeCreateIcaAction: ActionMaker<CreateIcaData> = ({
  t,
  chain: { chain_id: sourceChainId },
  address,
}) => {
  const useTransformToCosmos: UseTransformToCosmos<CreateIcaData> = () =>
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

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<CreateIcaData> = (
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

  // Hide from picker if chain does not support ICA controller.
  const useHideFromPicker: UseHideFromPicker = () => {
    const supported = useCachedLoadingWithError(
      chainSupportsIcaControllerSelector({
        chainId: sourceChainId,
      })
    )

    return supported.loading || supported.errored || !supported.data
  }

  return {
    key: ActionKey.CreateIca,
    Icon: ChainEmoji,
    label: t('title.createIca'),
    description: t('info.createIcaDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
    useHideFromPicker,
  }
}
