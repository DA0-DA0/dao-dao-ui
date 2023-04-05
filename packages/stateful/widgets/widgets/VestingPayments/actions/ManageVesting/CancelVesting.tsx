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

import { useActionOptions } from '../../../../../actions/react/context'
import { VestingPaymentCard } from '../../components/VestingPaymentCard'
import { VestingInfo } from '../../types'

export type CancelVestingData = {
  address: string
}

export type CancelVestingOptions = {
  vestingInfos: LoadingData<VestingInfo[]>
  cancelledVestingContract: LoadingData<VestingInfo | undefined>
  EntityDisplay: ComponentType<StatefulEntityDisplayProps>
}

export const CancelVesting: ActionComponent<CancelVestingOptions> = ({
  fieldNamePrefix,
  errors,
  isCreating,
  options: { vestingInfos, cancelledVestingContract, EntityDisplay },
}) => {
  const { t } = useTranslation()
  const { address } = useActionOptions()

  const { watch, setValue } = useFormContext()
  const watchAddress = watch(fieldNamePrefix + 'address')

  // Only vesting contracts with a non-zero balance remaining and whose owner is
  // the current address are cancellable.
  const cancellableVestingContracts = vestingInfos.loading
    ? undefined
    : vestingInfos.data.filter(
        ({ owner, vested }) => owner === address && vested !== '0'
      )

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
                  vest,
                  token,
                  vested,
                  total,
                  endDate,
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
    </>
  )
}
