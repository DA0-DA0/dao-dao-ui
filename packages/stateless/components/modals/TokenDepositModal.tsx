import { WarningRounded } from '@mui/icons-material'
import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'

import {
  AmountWithTimestamp,
  GenericToken,
  LoadingData,
  ModalProps,
} from '@dao-dao/types'
import {
  convertMicroDenomToDenomWithDecimals,
  transformIbcSymbol,
} from '@dao-dao/utils'

import { Button } from '../buttons/Button'
import { NumberInput, PercentButton } from '../inputs'
import { TokenAmountDisplay } from '../token/TokenAmountDisplay'
import { Modal } from './Modal'

export type TokenDepositModalProps = Pick<ModalProps, 'visible' | 'onClose'> & {
  token: GenericToken
  loadingBalance: LoadingData<AmountWithTimestamp>
  onDeposit: (amount: number) => void | Promise<void>
  loading: boolean
  amount: number
  setAmount: Dispatch<SetStateAction<number>>
}

export const TokenDepositModal = ({
  token,
  loadingBalance,
  onDeposit,
  loading,
  amount,
  setAmount,
  ...modalProps
}: TokenDepositModalProps) => {
  const { t } = useTranslation()

  const min = convertMicroDenomToDenomWithDecimals(1, token.decimals)

  const { tokenSymbol } = transformIbcSymbol(token.symbol)

  return (
    <Modal
      {...modalProps}
      contentContainerClassName="gap-4"
      footerContainerClassName="flex flex-row justify-end !p-4"
      footerContent={
        <Button
          disabled={loadingBalance.loading || loadingBalance.data.amount === 0}
          loading={loading}
          onClick={() => amount > 0 && onDeposit(amount)}
        >
          {t('button.deposit')}
        </Button>
      }
      header={{
        title: t('title.depositToken', { tokenSymbol }),
      }}
      headerContent={
        <div className="space-y-4">
          <p>{t('info.depositTokenSubtitle')}</p>

          <div className="flex flex-row items-center gap-4 rounded-md bg-background-secondary p-4">
            <WarningRounded className="!h-10 !w-10" />

            <p className="">{t('info.depositTokenWarning')}</p>
          </div>
        </div>
      }
    >
      <div className="flex flex-row items-center justify-between gap-10">
        <p className="secondary-text">{t('title.balance')}</p>

        {/* Balance */}
        <TokenAmountDisplay
          amount={
            loadingBalance.loading
              ? loadingBalance
              : { loading: false, data: loadingBalance.data.amount }
          }
          dateFetched={
            loadingBalance.loading ? undefined : loadingBalance.data.timestamp
          }
          decimals={token.decimals}
          iconUrl={token.imageUrl}
          showFullAmount
          symbol={tokenSymbol}
        />
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
                token.decimals
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
            tokenDecimals={token.decimals}
          />
        ))}
      </div>
    </Modal>
  )
}
