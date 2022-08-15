// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { ExternalLinkIcon } from '@heroicons/react/outline'
import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import { useDaoInfoContext } from '@dao-dao/common'
import {
  TransformedTreasuryTransaction,
  nativeBalanceSelector,
  transformedTreasuryTransactionsSelector,
} from '@dao-dao/state'
import {
  CopyToClipboard,
  LineGraph,
  Loader,
  SuspenseLoader,
  Trans,
} from '@dao-dao/ui'
import {
  CHAIN_TXN_URL_PREFIX,
  NATIVE_DECIMALS,
  NATIVE_DENOM,
  convertMicroDenomToDenomWithDecimals,
  nativeTokenLabel,
} from '@dao-dao/utils'

interface DaoTreasuryHistoryProps {
  shortTitle?: boolean
}

export const DaoTreasuryHistory = (props: DaoTreasuryHistoryProps) => {
  const { t } = useTranslation()

  return (
    <SuspenseLoader
      fallback={
        <div className="flex flex-col gap-4">
          <h2 className="primary-text">
            {props.shortTitle ? t('title.history') : t('title.treasuryHistory')}
          </h2>
          <Loader />
        </div>
      }
    >
      <InnerDaoTreasuryHistory {...props} />
    </SuspenseLoader>
  )
}

const NATIVE_DENOM_LABEL = nativeTokenLabel(NATIVE_DENOM)

export const InnerDaoTreasuryHistory = ({
  shortTitle,
}: DaoTreasuryHistoryProps) => {
  const { t } = useTranslation()
  const { coreAddress } = useDaoInfoContext()

  const transactions = useRecoilValue(
    transformedTreasuryTransactionsSelector(coreAddress)
  )
  const nativeBalance = useRecoilValue(nativeBalanceSelector(coreAddress))

  const lineGraphValues = useMemo(() => {
    let runningTotal = convertMicroDenomToDenomWithDecimals(
      nativeBalance.amount,
      NATIVE_DECIMALS
    )

    return (
      transactions
        .filter(({ denomLabel }) => denomLabel === NATIVE_DENOM_LABEL)
        .map(({ amount, outgoing }) => {
          let currentTotal = runningTotal
          runningTotal -= (outgoing ? -1 : 1) * amount
          return currentTotal
        })
        // Reverse since transactions are descending, but we want the graph to
        // display ascending balance.
        .reverse()
    )
  }, [nativeBalance, transactions])

  return transactions.length ? (
    <div className="space-y-4">
      <h2 className="primary-text">
        {shortTitle ? t('title.history') : t('title.treasuryHistory')}
      </h2>

      <div>
        <LineGraph yLabel={NATIVE_DENOM_LABEL} yValues={lineGraphValues} />
      </div>

      <div className="md:px-4">
        {transactions.map((transaction) => (
          <TransactionRenderer
            key={transaction.hash}
            transaction={transaction}
          />
        ))}
      </div>
    </div>
  ) : null
}

interface TransactionRendererProps {
  transaction: TransformedTreasuryTransaction
}

const TransactionRenderer: FC<TransactionRendererProps> = ({
  transaction: {
    hash,
    height,
    timestamp,
    sender,
    recipient,
    amount,
    denomLabel,
    outgoing,
  },
}) => (
  <div className="flex flex-row gap-4 justify-between items-start xs:gap-12">
    <div className="flex flex-row flex-wrap gap-x-1 items-center text-sm leading-6">
      {outgoing ? (
        <Trans i18nKey="info.treasurySent">
          <p className="font-extrabold">
            <CopyToClipboard value={recipient} />
          </p>
          <p>was sent</p>
          <p className="font-bold">{{ amount: `${amount} $${denomLabel}` }}</p>
          <p className="pr-1">from the treasury.</p>
        </Trans>
      ) : (
        <Trans i18nKey="info.treasuryReceived">
          <p className="font-extrabold">
            <CopyToClipboard value={sender} />
          </p>
          <p>sent</p>
          <p className="font-bold">{{ amount: `${amount} $${denomLabel}` }}</p>
          <p className="pr-1">to the treasury.</p>
        </Trans>
      )}

      <a
        className="text-tertiary"
        href={CHAIN_TXN_URL_PREFIX + hash}
        rel="noopener noreferrer"
        target="_blank"
      >
        <ExternalLinkIcon className="w-4" />
      </a>
    </div>

    <p className="font-mono text-xs leading-6 text-right">
      {timestamp?.toLocaleString() ?? `${height} block`}
    </p>
  </div>
)
