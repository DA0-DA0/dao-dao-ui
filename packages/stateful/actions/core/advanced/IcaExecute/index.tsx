import { useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { MsgSendTx } from '@dao-dao/protobuf/codegen/ibc/applications/interchain_accounts/controller/v1/tx'
import {
  CosmosTx,
  InterchainAccountPacketData,
  Type,
} from '@dao-dao/protobuf/codegen/ibc/applications/interchain_accounts/v1/packet'
import { icaRemoteAddressSelector } from '@dao-dao/state/recoil'
import {
  ChainProvider,
  CopyToClipboard,
  IbcDestinationChainPicker,
  InputErrorMessage,
  Loader,
  RocketShipEmoji,
  useCachedLoadingWithError,
} from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types'
import {
  IBC_TIMEOUT_SECONDS,
  cwMsgToProtobuf,
  getChainForChainName,
  getDisplayNameForChainId,
  getIbcTransferInfoBetweenChains,
  getIbcTransferInfoFromConnection,
  isDecodedStargateMsg,
  makeStargateMessage,
  protobufToCwMsg,
} from '@dao-dao/utils'

import { SuspenseLoader } from '../../../../components'
import {
  WalletActionsProvider,
  useActionOptions,
  useActionsForMatching,
  useLoadedActionsAndCategories,
} from '../../../react'
import {
  IcaExecuteData,
  IcaExecuteComponent as StatelessIcaExecuteComponent,
} from './Component'

const InnerComponent: ActionComponent = (props) => {
  const { categories, loadedActions } = useLoadedActionsAndCategories({
    isCreating: props.isCreating,
  })
  const actionsForMatching = useActionsForMatching()

  return (
    <StatelessIcaExecuteComponent
      {...props}
      options={{
        categories,
        loadedActions,
        actionsForMatching,
        SuspenseLoader,
      }}
    />
  )
}

const Component: ActionComponent = (props) => {
  const { t } = useTranslation()
  const {
    address,
    context,
    chain: { chain_id: srcChainId },
  } = useActionOptions()

  const { watch, setError, clearErrors, setValue } =
    useFormContext<IcaExecuteData>()
  const destChainId = watch((props.fieldNamePrefix + 'chainId') as 'chainId')

  const icaRemoteAddressLoading = useCachedLoadingWithError(
    destChainId
      ? icaRemoteAddressSelector({
          address,
          srcChainId,
          destChainId,
        })
      : undefined
  )

  // Set error and ICA remote address loader.
  useEffect(() => {
    setValue(
      (props.fieldNamePrefix + 'icaRemoteAddress') as 'icaRemoteAddress',
      ''
    )

    if (icaRemoteAddressLoading.loading || icaRemoteAddressLoading.updating) {
      clearErrors(
        (props.fieldNamePrefix + 'icaRemoteAddress') as 'icaRemoteAddress'
      )
      return
    }

    if (icaRemoteAddressLoading.errored) {
      setError(
        (props.fieldNamePrefix + 'icaRemoteAddress') as 'icaRemoteAddress',
        {
          type: 'manual',
          message:
            icaRemoteAddressLoading.error instanceof Error
              ? icaRemoteAddressLoading.error.message
              : `${icaRemoteAddressLoading.error}`,
        }
      )
    } else if (!icaRemoteAddressLoading.data) {
      setError(
        (props.fieldNamePrefix + 'icaRemoteAddress') as 'icaRemoteAddress',
        {
          type: 'manual',
          message: t('error.icaAccountDoesNotExist', {
            chain: getDisplayNameForChainId(destChainId),
          }),
        }
      )
    } else {
      clearErrors(
        (props.fieldNamePrefix + 'icaRemoteAddress') as 'icaRemoteAddress'
      )
      setValue(
        (props.fieldNamePrefix + 'icaRemoteAddress') as 'icaRemoteAddress',
        icaRemoteAddressLoading.data
      )
    }
  }, [
    clearErrors,
    context.type,
    destChainId,
    icaRemoteAddressLoading,
    props.fieldNamePrefix,
    setError,
    setValue,
    t,
  ])

  return (
    <>
      <div className="flex flex-row items-center justify-between gap-x-8">
        <IbcDestinationChainPicker
          buttonClassName="self-start"
          disabled={!props.isCreating}
          includeSourceChain={false}
          onChainSelected={(chainId) =>
            setValue((props.fieldNamePrefix + 'chainId') as 'chainId', chainId)
          }
          onlySupportedChains
          selectedChainId={destChainId}
          sourceChainId={srcChainId}
        />

        {!icaRemoteAddressLoading.loading &&
          !icaRemoteAddressLoading.updating &&
          !icaRemoteAddressLoading.errored &&
          !!icaRemoteAddressLoading.data && (
            <CopyToClipboard
              takeN={18}
              tooltip={t('button.clickToCopyAddress')}
              value={icaRemoteAddressLoading.data}
            />
          )}
      </div>

      {!!destChainId &&
        (icaRemoteAddressLoading.loading || icaRemoteAddressLoading.updating ? (
          <Loader />
        ) : (
          <>
            <InputErrorMessage
              className="-mt-2"
              error={
                icaRemoteAddressLoading.errored
                  ? icaRemoteAddressLoading.error
                  : props.errors?.icaRemoteAddress
              }
            />

            {!icaRemoteAddressLoading.errored &&
              !!icaRemoteAddressLoading.data && (
                // Re-render when chain changes so hooks and state reset.
                <ChainProvider key={destChainId} chainId={destChainId}>
                  <WalletActionsProvider address={icaRemoteAddressLoading.data}>
                    <InnerComponent {...props} />
                  </WalletActionsProvider>
                </ChainProvider>
              )}
          </>
        ))}
    </>
  )
}

export const makeIcaExecuteAction: ActionMaker<IcaExecuteData> = ({
  t,
  address,
  chain: { chain_id: sourceChainId },
}) => {
  const useDefaults: UseDefaults<IcaExecuteData> = () => ({
    chainId: '',
    icaRemoteAddress: '',
    msgs: [],
  })

  const useTransformToCosmos: UseTransformToCosmos<IcaExecuteData> = () =>
    useCallback(({ chainId, icaRemoteAddress, msgs }) => {
      if (!chainId || !icaRemoteAddress) {
        return
      }

      const {
        sourceChain: { connection_id: connectionId },
      } = getIbcTransferInfoBetweenChains(sourceChainId, chainId)

      return makeStargateMessage({
        stargate: {
          typeUrl: MsgSendTx.typeUrl,
          value: MsgSendTx.fromPartial({
            owner: address,
            connectionId,
            packetData: InterchainAccountPacketData.fromPartial({
              type: Type.TYPE_EXECUTE_TX,
              data: CosmosTx.toProto({
                messages: msgs.map((msg) =>
                  cwMsgToProtobuf(msg, icaRemoteAddress)
                ),
              }),
              memo: '',
            }),
            // Nanoseconds timeout from TX execution.
            relativeTimeout: BigInt(IBC_TIMEOUT_SECONDS * 1e9),
          }),
        },
      })
    }, [])

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<IcaExecuteData> = (
    msg: Record<string, any>
  ) => {
    if (
      !isDecodedStargateMsg(msg) ||
      msg.stargate.typeUrl !== MsgSendTx.typeUrl
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

      const { packetData: { data } = {} } = msg.stargate.value as MsgSendTx
      const protobufMessages = data && CosmosTx.decode(data).messages
      const msgs =
        protobufMessages?.map((protobuf) => protobufToCwMsg(protobuf).msg) || []

      return {
        match: true,
        data: {
          chainId: getChainForChainName(destinationChain.chain_name).chain_id,
          // Not needed for decoding.
          icaRemoteAddress: '',
          msgs,
        },
      }
    } catch (err) {
      return {
        match: false,
      }
    }
  }

  return {
    key: ActionKey.IcaExecute,
    Icon: RocketShipEmoji,
    label: t('title.icaExecute'),
    description: t('info.icaExecuteDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
