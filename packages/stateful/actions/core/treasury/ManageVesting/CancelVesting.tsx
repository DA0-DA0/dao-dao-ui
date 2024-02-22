import { ComponentType } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  Button,
  ChainProvider,
  InputErrorMessage,
  Loader,
  TokenAmountDisplay,
} from '@dao-dao/stateless'
import {
  ActionComponent,
  LoadingData,
  LoadingDataWithError,
  StatefulEntityDisplayProps,
  VestingInfo,
} from '@dao-dao/types'
import {
  convertMicroDenomToDenomWithDecimals,
  formatDateTimeTz,
  getChainAddressForActionOptions,
} from '@dao-dao/utils'

import { useActionOptions } from '../../../react'

export type CancelVestingData = {
  chainId: string
  address: string
}

export type CancelVestingOptions = {
  vestingInfos: LoadingDataWithError<VestingInfo[]>
  cancelledVestingContract: LoadingData<VestingInfo | undefined>
  EntityDisplay: ComponentType<StatefulEntityDisplayProps>
  VestingPaymentCard: ComponentType<VestingInfo>
}

export const CancelVesting: ActionComponent<CancelVestingOptions> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  options: {
    vestingInfos,
    cancelledVestingContract,
    EntityDisplay,
    VestingPaymentCard,
  },
}) => {
  const { t } = useTranslation()
  const options = useActionOptions()

  const { watch, setValue } = useFormContext()
  const watchChainId = watch(fieldNamePrefix + 'chainId')
  const watchAddress = watch(fieldNamePrefix + 'address')

  // The only vesting contracts that can be cancelled:
  //   - have not finished vesting
  //   - have not been cancelled
  //   - are cancellable by the current entity
  const cancellableVestingContracts =
    vestingInfos.loading || vestingInfos.errored
      ? undefined
      : vestingInfos.data.filter(
          ({ chainId, owner, vested, total, vest: { status } }) => {
            const chainAddress = getChainAddressForActionOptions(
              options,
              chainId
            )

            return (
              owner &&
              chainAddress &&
              (owner.address === chainAddress ||
                (owner.isCw1Whitelist &&
                  owner.cw1WhitelistAdmins.includes(chainAddress))) &&
              vested !== total &&
              !(typeof status === 'object' && 'canceled' in status)
            )
          }
        )

  return (
    <ChainProvider chainId={watchChainId}>
      <div className="flex flex-col gap-2">
        {isCreating ? (
          !cancellableVestingContracts ? (
            <Loader />
          ) : cancellableVestingContracts.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {cancellableVestingContracts.map(
                ({
                  chainId,
                  vestingContractAddress,
                  vest,
                  token,
                  vested,
                  total,
                  endDate,
                }) => (
                  <Button
                    key={chainId + vestingContractAddress}
                    onClick={() => {
                      setValue(fieldNamePrefix + 'chainId', chainId)
                      setValue(
                        fieldNamePrefix + 'address',
                        vestingContractAddress
                      )
                    }}
                    pressed={
                      watchChainId === chainId &&
                      watchAddress === vestingContractAddress
                    }
                    variant="secondary"
                  >
                    <div className="grid auto-rows-auto grid-cols-[auto_1fr] items-center justify-items-start gap-y-2 gap-x-4 p-2">
                      <p className="secondary-text">{t('form.recipient')}:</p>

                      <EntityDisplay address={vest.recipient} />

                      <p className="secondary-text">
                        {t('info.remainingBalanceVesting')}:
                      </p>

                      <TokenAmountDisplay
                        amount={convertMicroDenomToDenomWithDecimals(
                          Number(total) - Number(vested),
                          token.decimals
                        )}
                        decimals={token.decimals}
                        iconUrl={token.imageUrl}
                        symbol={token.symbol}
                      />

                      <p className="secondary-text">{t('form.finishDate')}:</p>

                      <p>{formatDateTimeTz(endDate)}</p>
                    </div>
                  </Button>
                )
              )}
            </div>
          ) : (
            <p className="text-text-interactive-error">
              {t('error.noCancellableVestingContracts')}
            </p>
          )
        ) : // If not creating, show just the cancelled vesting contract.
        cancelledVestingContract.loading ? (
          <Loader />
        ) : cancelledVestingContract.data ? (
          <VestingPaymentCard {...cancelledVestingContract.data} />
        ) : (
          <p className="text-text-interactive-error">
            {t('error.loadingData')}
          </p>
        )}

        {/* Only show error if there are vests to choose from. If no vests, other error will show. */}
        {isCreating && !!cancellableVestingContracts?.length && (
          <InputErrorMessage error={errors?.address} />
        )}
      </div>
    </ChainProvider>
  )
}
