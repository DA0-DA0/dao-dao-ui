import { useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { icaRemoteAddressSelector } from '@dao-dao/state/recoil'
import {
  ChainProvider,
  CopyToClipboard,
  IbcDestinationChainPicker,
  InputErrorMessage,
  Loader,
  RocketShipEmoji,
  WarningCard,
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
  decodeIcaExecuteMsg,
  getDisplayNameForChainId,
  maybeMakeIcaExecuteMessage,
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
          message: t('error.icaDoesNotExist', {
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

      <WarningCard className="max-w-xl" content={t('info.icaExperimental')} />
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

      return maybeMakeIcaExecuteMessage(
        sourceChainId,
        chainId,
        address,
        icaRemoteAddress,
        msgs
      )
    }, [])

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<IcaExecuteData> = (
    msg: Record<string, any>
  ) => {
    const decodedIca = decodeIcaExecuteMsg(sourceChainId, msg, 'any')
    if (!decodedIca.match) {
      return {
        match: false,
      }
    }

    return {
      match: true,
      data: {
        chainId: decodedIca.chainId,
        // Not needed for decoding.
        icaRemoteAddress: '',
        msgs: decodedIca.cosmosMsgsWithSenders.map(({ msg }) => msg),
      },
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
