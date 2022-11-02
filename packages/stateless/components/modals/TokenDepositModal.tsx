import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'

import { AmountWithTimestamp, LoadingData, ModalProps } from '@dao-dao/types'
import { convertMicroDenomToDenomWithDecimals } from '@dao-dao/utils'

import { Button } from '../buttons/Button'
import { NumberInput, PercentButton } from '../inputs'
import { TokenAmountDisplay } from '../TokenAmountDisplay'
import { Modal } from './Modal'

export type TokenDepositModalProps = Pick<ModalProps, 'visible' | 'onClose'> & {
  tokenSymbol: string
  tokenDecimals: number
  tokenImageUrl: string
  loadingBalance: LoadingData<AmountWithTimestamp>
  onDeposit: (amount: number) => void | Promise<void>
  loading: boolean
  amount: number
  setAmount: Dispatch<SetStateAction<number>>
}

export const TokenDepositModal = ({
  tokenSymbol,
  tokenDecimals,
  tokenImageUrl,
  loadingBalance,
  onDeposit,
  loading,
  amount,
  setAmount,
  ...modalProps
}: TokenDepositModalProps) => {
  const { t } = useTranslation()

  const min = convertMicroDenomToDenomWithDecimals(1, tokenDecimals)

  return (
    <Modal
      {...modalProps}
      header={{
        title: t('title.depositToken', { tokenSymbol }),
        subtitle: t('info.depositTokenSubtitle'),
      }}
    >
      <div className="flex flex-col space-y-4">
        <div className="flex flex-row items-center justify-between gap-10">
          <p className="secondary-text">{t('title.balance')}</p>

          <div className="flex flex-row items-center gap-2">
            {/* Image */}
            <div
              className="h-5 w-5 rounded-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${tokenImageUrl})`,
              }}
            ></div>

            {/* Balance */}
            <TokenAmountDisplay
              amount={
                loadingBalance.loading
                  ? loadingBalance
                  : { loading: false, data: loadingBalance.data.amount }
              }
              dateFetched={
                loadingBalance.loading
                  ? undefined
                  : loadingBalance.data.timestamp
              }
              decimals={tokenDecimals}
              showFullAmount
              symbol={tokenSymbol}
            />
          </div>
        </div>

        <NumberInput
          // Auto focus does not work on mobile Safari by design
          // (https://bugs.webkit.org/show_bug.cgi?id=195884#c4).
          autoFocus
          max={loadingBalance.loading ? undefined : loadingBalance.data.amount}
          min={min}
          onInput={(event) =>
            setAmount(
              Number(
                Number((event.target as HTMLInputElement).value).toFixed(
                  tokenDecimals
                )
              )
            )
          }
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              onDeposit(amount)
            }
          }}
          onMinus={() =>
            setAmount((prev) =>
              Math.max(
                Math.min(
                  Number((prev - 1).toFixed(0)),
                  loadingBalance.loading ? 0 : loadingBalance.data.amount
                ),
                min
              )
            )
          }
          onPlus={() =>
            setAmount((prev) =>
              Math.max(
                Math.min(
                  Number((prev + 1).toFixed(0)),
                  loadingBalance.loading ? 0 : loadingBalance.data.amount
                ),
                min
              )
            )
          }
          step={min}
          unit={'$' + tokenSymbol}
          value={amount}
        />

        <div className="grid grid-cols-5 gap-2">
          {[10, 25, 50, 75, 100].map((percent) => (
            <PercentButton
              key={percent}
              amount={amount}
              label={`${percent}%`}
              loadingMax={
                loadingBalance.loading
                  ? loadingBalance
                  : { loading: false, data: loadingBalance.data.amount }
              }
              percent={percent / 100}
              setAmount={setAmount}
              tokenDecimals={tokenDecimals}
            />
          ))}
        </div>

        <Button
          className="self-end"
          disabled={loadingBalance.loading || loadingBalance.data.amount === 0}
          loading={loading}
          onClick={() => amount > 0 && onDeposit(amount)}
          size="lg"
        >
          {t('button.deposit')}
        </Button>
      </div>
    </Modal>
  )
}
