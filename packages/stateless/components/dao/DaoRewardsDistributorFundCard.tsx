import { Check } from '@mui/icons-material'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { HugeDecimal } from '@dao-dao/math'
import {
  DaoRewardDistribution,
  DaoRewardsDistributorFundCardProps,
} from '@dao-dao/types'
import { validatePositive, validateRequired } from '@dao-dao/utils'

import { Button } from '../buttons'
import { ErrorPage } from '../error'
import { InputErrorMessage, NumericInput } from '../inputs'
import { DaoRewardDistributionPicker } from './DaoRewardDistributionPicker'

export const DaoRewardsDistributorFundCard = ({
  className,
  onFund,
  funding,
  distributions,
}: DaoRewardsDistributorFundCardProps) => {
  const { t } = useTranslation()

  const [selectedDistribution, setSelectedDistribution] = useState<
    DaoRewardDistribution | undefined
  >()

  const [funded, setFunded] = useState(false)
  useEffect(() => {
    if (!funded) {
      return
    }

    const timeout = setTimeout(() => {
      setFunded(false)
    }, 3000)

    return () => clearTimeout(timeout)
  }, [funded])

  const {
    register,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<{
    amount: string
  }>({
    defaultValues: {
      amount: '1',
    },
  })

  const amount = watch('amount')
  const hugeAmount = HugeDecimal.fromHumanReadable(
    amount,
    selectedDistribution?.token.decimals ?? 0
  )

  return (
    <div
      className={clsx(
        'bg-background-tertiary flex flex-col rounded-md p-4 gap-2',
        className
      )}
    >
      <p className="mb-2">{t('info.distributeToDaoMembersFromWallet')}</p>

      {distributions.errored ? (
        <ErrorPage error={distributions.error} />
      ) : (
        <DaoRewardDistributionPicker
          distributions={distributions.loading ? [] : distributions.data}
          onSelect={setSelectedDistribution}
          selectButtonClassName={
            selectedDistribution ? '!self-stretch' : undefined
          }
          selectButtonContentContainerClassName="justify-between"
          selectButtonVariant={
            selectedDistribution ? 'ghost_outline' : 'secondary'
          }
          selectedDistribution={selectedDistribution}
        />
      )}

      {selectedDistribution && (
        <div className="flex flex-row gap-2">
          <NumericInput
            containerClassName="grow"
            error={errors?.amount}
            fieldName="amount"
            getValues={getValues}
            min={0}
            register={register}
            setValue={setValue}
            step={HugeDecimal.one.toHumanReadableNumber(
              selectedDistribution.token.decimals
            )}
            unit={'$' + selectedDistribution.token.symbol}
            validation={[validateRequired, validatePositive]}
          />

          <Button
            disabled={
              distributions.errored || hugeAmount.isNaN() || hugeAmount.isZero()
            }
            loading={distributions.errored || funding}
            onClick={() =>
              onFund(selectedDistribution, hugeAmount).then((success) =>
                setFunded(success)
              )
            }
            variant="secondary"
          >
            {funded ? t('button.distributed') : t('button.distribute')}
            {funded && <Check className="!h-5 !w-5" />}
          </Button>
        </div>
      )}

      <InputErrorMessage error={errors?.amount} />
    </div>
  )
}
