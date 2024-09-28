import {
  ArrowRightAltRounded,
  SubdirectoryArrowRightRounded,
} from '@mui/icons-material'
import clsx from 'clsx'

import { HugeDecimal } from '@dao-dao/math'
import { PayEntityDisplayProps, PayEntityDisplayRowProps } from '@dao-dao/types'

import { useDetectWrap } from '../hooks'
import { TokenAmountDisplay } from './token'

export const PayEntityDisplay = ({
  tokens,
  className,
  ...props
}: PayEntityDisplayProps) => (
  <div className={clsx(className, 'space-y-2')}>
    {tokens.map((token) => (
      <PayEntityDisplayRow
        key={token.token.denomOrAddress}
        token={token}
        {...props}
      />
    ))}
  </div>
)

const PayEntityDisplayRow = ({
  token: { token, balance: amount },
  recipient,
  EntityDisplay,
}: PayEntityDisplayRowProps) => {
  const { containerRef, childRef, wrapped } = useDetectWrap()
  const Icon = wrapped ? SubdirectoryArrowRightRounded : ArrowRightAltRounded

  return (
    <div
      className="flex min-w-0 flex-row flex-wrap items-stretch justify-between gap-x-3 gap-y-2"
      ref={containerRef}
    >
      <TokenAmountDisplay
        key={token.denomOrAddress}
        amount={HugeDecimal.from(amount)}
        decimals={token.decimals}
        iconUrl={token.imageUrl}
        showFullAmount
        symbol={token.symbol}
      />

      <div
        className="flex min-w-0 grow flex-row items-stretch gap-2 sm:gap-3"
        ref={childRef}
      >
        <div className={clsx('flex flex-row items-center', wrapped && 'pl-1')}>
          <Icon className="!h-6 !w-6 text-text-secondary" />
        </div>

        <EntityDisplay address={recipient} />
      </div>
    </div>
  )
}
