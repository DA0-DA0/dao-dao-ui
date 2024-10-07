import { WarningRounded } from '@mui/icons-material'
import { ComponentType, Dispatch, ReactNode, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'

import { HugeDecimal } from '@dao-dao/math'
import {
  AmountWithTimestamp,
  GenericToken,
  LoadingData,
  ModalProps,
} from '@dao-dao/types'
import { shortenTokenSymbol } from '@dao-dao/utils'

import { Button } from '../buttons/Button'
import { NumericInput, PercentButton } from '../inputs'
import { TokenAmountDisplay } from '../token/TokenAmountDisplay'
import { Modal } from './Modal'

export type TokenDepositModalProps = Pick<ModalProps, 'visible' | 'onClose'> & {
  token: GenericToken
  loadingBalance: LoadingData<AmountWithTimestamp>
  onDeposit: (amount: HugeDecimal) => void | Promise<void>
  loading: boolean
  amount: HugeDecimal
  setAmount: Dispatch<SetStateAction<HugeDecimal>>
  connected: boolean
  ConnectWallet?: ComponentType
  subtitle?: string | ReactNode
  warning?: string
  disabled?: boolean
}

export const TokenDepositModal = ({
  token,
  loadingBalance,
  onDeposit,
  loading,
  amount,
  setAmount,
  connected,
  ConnectWallet,
  subtitle,
  warning,
  disabled,
  ...modalProps
}: TokenDepositModalProps) => {
  const { t } = useTranslation()

  const min = HugeDecimal.one.toHumanReadableNumber(token.decimals)

  const { tokenSymbol } = shortenTokenSymbol(token.symbol)

  return (
    <Modal
      {...modalProps}
      contentContainerClassName="gap-4"
      footerContainerClassName="flex flex-row justify-end !p-4"
      footerContent={
        // If not connected and has ConnectWallet component, show ConnectWallet.
        !connected && ConnectWallet ? (
          <ConnectWallet />
        ) : (
          <Button
            disabled={
              !connected ||
              loadingBalance.loading ||
              loadingBalance.data.amount === 0 ||
              disabled
            }
            loading={loading}
            onClick={() => amount.isPositive() && onDeposit(amount)}
          >
            {t('button.deposit')}
          </Button>
        )
      }
      header={{
        title: t('title.depositToken', { tokenSymbol }),
      }}
      headerContent={
        !!subtitle &&
        (typeof subtitle === 'string' ? <p>{subtitle}</p> : subtitle)
      }
    >
      {warning && (
        <div className="flex flex-row items-center gap-4 rounded-md bg-background-secondary p-4">
          <WarningRounded className="!h-10 !w-10" />

          <p>{warning}</p>
        </div>
      )}

      {connected && (
        <div className="flex flex-row items-center justify-between gap-10">
          <p className="secondary-text">{t('title.balance')}</p>

          {/* Balance */}
          <TokenAmountDisplay
            amount={
              loadingBalance.loading
                ? loadingBalance
                : loadingBalance.data.amount
            }
            dateFetched={
              loadingBalance.loading
                ? undefined
                : new Date(loadingBalance.data.timestamp)
            }
            decimals={token.decimals}
            iconUrl={token.imageUrl}
            showFullAmount
            symbol={tokenSymbol}
          />
        </div>
      )}

      <NumericInput
        // Auto focus does not work on mobile Safari by design
        // (https://bugs.webkit.org/show_bug.cgi?id=195884#c4).
        autoFocus={modalProps.visible}
        max={loadingBalance.loading ? undefined : loadingBalance.data.amount}
        min={min}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            onDeposit(amount)
          }
        }}
        setValue={(_, value) =>
          setAmount(HugeDecimal.fromHumanReadable(value, token.decimals))
        }
        step={min}
        unit={'$' + tokenSymbol}
        value={amount.toHumanReadableString(token.decimals)}
      />

      <div className="grid grid-cols-5 gap-2">
        {[10, 25, 50, 75, 100].map((percent) => (
          <PercentButton
            key={percent}
            amount={amount}
            loadingMax={
              loadingBalance.loading
                ? loadingBalance
                : {
                    loading: false,
                    data: HugeDecimal.fromHumanReadable(
                      loadingBalance.data.amount,
                      token.decimals
                    ),
                  }
            }
            percent={percent}
            setAmount={setAmount}
          />
        ))}
      </div>
    </Modal>
  )
}
