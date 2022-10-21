// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { ArrowOutward, East, West } from '@mui/icons-material'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilCallback, useRecoilValue } from 'recoil'

import { SuspenseLoader } from '@dao-dao/common'
import {
  TransformedTreasuryTransaction,
  blockHeightSelector,
  blockHeightTimestampSafeSelector,
  blockHeightTimestampSelector,
  nativeBalanceSelector,
  transformedTreasuryTransactionsSelector,
} from '@dao-dao/state'
import {
  Button,
  CopyToClipboard,
  LineGraph,
  Loader,
  useDaoInfoContext,
} from '@dao-dao/ui'
import {
  CHAIN_TXN_URL_PREFIX,
  NATIVE_DECIMALS,
  NATIVE_DENOM,
  convertMicroDenomToDenomWithDecimals,
  nativeTokenLabel,
  processError,
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
// Load roughly 3 days at a time (assuming 1 block per 6 seconds, which is not
// accurate but close enough).
const BLOCK_HEIGHT_INTERVAL = (60 * 60 * 24 * 3) / 6

export const InnerDaoTreasuryHistory = ({
  shortTitle,
}: DaoTreasuryHistoryProps) => {
  const { t } = useTranslation()
  const { coreAddress } = useDaoInfoContext()

  // Initialization.
  const latestBlockHeight = useRecoilValue(blockHeightSelector({}))
  const initialMinHeight = latestBlockHeight - BLOCK_HEIGHT_INTERVAL
  const initialLowestHeightLoadedTimestamp = useRecoilValue(
    blockHeightTimestampSafeSelector({ blockHeight: initialMinHeight })
  )
  const initialTransactions = useRecoilValue(
    transformedTreasuryTransactionsSelector({
      address: coreAddress,
      minHeight: initialMinHeight,
      maxHeight: latestBlockHeight,
    })
  )

  // Paginated data.
  const [loading, setLoading] = useState(false)
  const [lowestHeightLoaded, setLowestHeightLoaded] = useState(initialMinHeight)
  const [lowestHeightLoadedTimestamp, setLowestHeightLoadedTimestamp] =
    useState(initialLowestHeightLoadedTimestamp)
  const [transactions, setTransactions] = useState(initialTransactions)
  const [canLoadMore, setCanLoadMore] = useState(true)

  // Pagination loader.
  const loadMoreTransactions = useRecoilCallback(
    ({ snapshot }) =>
      async (maxHeight: number) => {
        const minHeight = maxHeight - BLOCK_HEIGHT_INTERVAL

        setLoading(true)
        try {
          const newTransactions = await snapshot.getPromise(
            transformedTreasuryTransactionsSelector({
              address: coreAddress,
              minHeight,
              maxHeight,
            })
          )

          const newLowestHeightLoadedTimestamp = await snapshot.getPromise(
            blockHeightTimestampSelector({ blockHeight: minHeight })
          )

          setLowestHeightLoaded(minHeight)
          setLowestHeightLoadedTimestamp(newLowestHeightLoadedTimestamp)

          // If no transactions found, try to load more.
          if (!newTransactions.length) {
            return await loadMoreTransactions(minHeight)
          }

          setTransactions((transactions) => [
            ...transactions,
            ...newTransactions,
          ])
        } catch (err) {
          console.error(
            processError(err, { tags: { coreAddress, minHeight, maxHeight } })
          )
          // If errored, assume we cannot load any more below this height.
          setCanLoadMore(false)
        } finally {
          setLoading(false)
        }
      },
    [
      coreAddress,
      setLoading,
      setTransactions,
      setLowestHeightLoaded,
      setLowestHeightLoadedTimestamp,
    ]
  )

  const nativeBalance = useRecoilValue(
    nativeBalanceSelector({ address: coreAddress })
  )
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

  return (
    <div className="flex flex-col gap-y-4">
      <h2 className="primary-text">
        {shortTitle ? t('title.history') : t('title.treasuryHistory')}
      </h2>

      {transactions.length ? (
        <>
          <div className="max-w-lg">
            <LineGraph
              title={t('title.nativeBalanceOverTime', {
                denomLabel: NATIVE_DENOM_LABEL,
              }).toLocaleUpperCase()}
              yTitle={NATIVE_DENOM_LABEL}
              yValues={lineGraphValues}
            />
          </div>

          <div className="md:px-4">
            {transactions.map((transaction) => (
              <TransactionRenderer
                key={transaction.hash}
                transaction={transaction}
              />
            ))}
          </div>
        </>
      ) : (
        <p className="text-text-secondary">{t('info.nothingFound')}</p>
      )}

      <div className="flex flex-row items-center justify-between gap-4">
        {lowestHeightLoadedTimestamp && (
          <p className="caption-text italic">
            {t('info.historySinceDate', {
              date: lowestHeightLoadedTimestamp.toLocaleString(),
            })}
          </p>
        )}

        {canLoadMore ? (
          <Button
            loading={loading}
            onClick={() => loadMoreTransactions(lowestHeightLoaded)}
            size="sm"
          >
            {t('button.loadMore')}
          </Button>
        ) : (
          <p className="caption-text">{t('info.availableHistoryLoaded')}</p>
        )}
      </div>
    </div>
  )
}

interface TransactionRendererProps {
  transaction: TransformedTreasuryTransaction
}

const TransactionRenderer = ({
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
}: TransactionRendererProps) => (
  <div className="flex flex-row items-start justify-between gap-4 xs:gap-12">
    <div className="flex flex-row flex-wrap items-center gap-x-4 text-sm leading-6">
      <CopyToClipboard value={outgoing ? recipient : sender} />
      {/* Outgoing transactions are received by the address above, so point to the left. */}
      {outgoing ? (
        <West className="!h-4 !w-4" />
      ) : (
        <East className="!h-4 !w-4" />
      )}
      <p>
        {amount} ${denomLabel}
      </p>
    </div>

    <p className="flex flex-row items-center gap-4 text-right font-mono text-xs leading-6">
      {timestamp?.toLocaleString() ?? `${height} block`}

      <a
        className="text-text-tertiary"
        href={CHAIN_TXN_URL_PREFIX + hash}
        rel="noopener noreferrer"
        target="_blank"
      >
        <ArrowOutward className="!h-4 !w-4" />
      </a>
    </p>
  </div>
)
