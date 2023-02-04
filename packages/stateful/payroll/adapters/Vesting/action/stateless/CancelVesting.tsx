import { ComponentType } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  Button,
  InputErrorMessage,
  Loader,
  TokenAmountDisplay,
} from '@dao-dao/stateless'
import {
  ActionComponent,
  LoadingData,
  StatefulEntityDisplayProps,
} from '@dao-dao/types'
import {
  convertMicroDenomToDenomWithDecimals,
  formatDateTimeTz,
} from '@dao-dao/utils'

import { VestingPaymentCard } from '../../components/stateful/VestingPaymentCard'
import { StatefulVestingPaymentCardProps } from '../../components/types'

export type CancelVestingData = {
  address: string
}

export type CancelVestingOptions = {
  vestingContracts: LoadingData<StatefulVestingPaymentCardProps[]>
  cancelledVestingContract: LoadingData<
    StatefulVestingPaymentCardProps | undefined
  >
  EntityDisplay: ComponentType<StatefulEntityDisplayProps>
}

export const CancelVesting: ActionComponent<CancelVestingOptions> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  options: { vestingContracts, cancelledVestingContract, EntityDisplay },
}) => {
  const { t } = useTranslation()

  const { watch, setValue } = useFormContext()
  const watchAddress = watch(fieldNamePrefix + 'address')

  const cancellableVestingContracts = vestingContracts.loading
    ? undefined
    : vestingContracts.data
        // Only vesting contracts with a non-zero balance remaining are
        // cancellable.
        .filter(({ vestedAmount }) => vestedAmount > 0)

  return (
    <>
      <div className="flex flex-col gap-2">
        {isCreating ? (
          !cancellableVestingContracts ? (
            <Loader />
          ) : cancellableVestingContracts.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {cancellableVestingContracts.map(
                ({
                  vestingContractAddress,
                  vestingPayment,
                  vestedAmount,
                  token,
                }) => (
                  <Button
                    key={vestingContractAddress}
                    onClick={() =>
                      setValue(
                        fieldNamePrefix + 'address',
                        vestingContractAddress
                      )
                    }
                    pressed={watchAddress === vestingContractAddress}
                    variant="secondary"
                  >
                    <div className="grid auto-rows-auto grid-cols-[auto_1fr] items-center justify-items-start gap-y-2 gap-x-4 p-2">
                      <p className="secondary-text">{t('form.recipient')}:</p>

                      <EntityDisplay address={vestingPayment.recipient} />

                      <p className="secondary-text">
                        {t('info.remainingBalanceVesting')}:
                      </p>

                      <TokenAmountDisplay
                        amount={convertMicroDenomToDenomWithDecimals(
                          vestedAmount,
                          token.decimals
                        )}
                        decimals={token.decimals}
                        iconUrl={token.imageUrl}
                        symbol={token.symbol}
                      />

                      {'saturating_linear' in
                        vestingPayment.vesting_schedule && (
                        <>
                          <p className="secondary-text">
                            {t('form.finishDate')}:
                          </p>

                          <p>
                            {formatDateTimeTz(
                              new Date(
                                vestingPayment.vesting_schedule
                                  .saturating_linear.max_x * 1000
                              )
                            )}
                          </p>
                        </>
                      )}
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

        <InputErrorMessage error={errors?.address} />
      </div>
    </>
  )
}
