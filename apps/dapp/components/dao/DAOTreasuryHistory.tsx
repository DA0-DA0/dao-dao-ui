import { parseCoins } from '@cosmjs/stargate'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import {
  TreasuryTransaction,
  treasuryTransactionsSelector,
} from '@dao-dao/state'
import { CopyToClipboard, Loader, SuspenseLoader, Trans } from '@dao-dao/ui'
import {
  convertMicroDenomToDenomWithDecimals,
  nativeTokenDecimals,
  nativeTokenLabel,
} from '@dao-dao/utils'

import { useDAOInfoContext } from '../DAOPageWrapper'

export const DAOTreasuryHistory: FC = () => {
  const { t } = useTranslation()

  return (
    <SuspenseLoader
      fallback={
        <div className="flex justify-between items-center">
          <h2 className="primary-text">{t('title.treasuryHistory')}</h2>
          <Loader />
        </div>
      }
    >
      <InnerDAOTreasuryHistory />
    </SuspenseLoader>
  )
}

export const InnerDAOTreasuryHistory: FC = () => {
  const { t } = useTranslation()
  const { coreAddress } = useDAOInfoContext()
  const transactions = useRecoilValue(treasuryTransactionsSelector(coreAddress))

  return (
    <div className="space-y-4">
      <h2 className="primary-text">{t('title.treasuryHistory')}</h2>

      <div className="md:px-4">
        {transactions?.map((transaction) => (
          <TransactionRenderer
            key={transaction.tx.hash}
            transaction={transaction}
          />
        ))}
      </div>
    </div>
  )
}

interface TransactionRendererProps {
  transaction: TreasuryTransaction
}

const TransactionRenderer: FC<TransactionRendererProps> = ({
  transaction: { tx, events },
}) => {
  const { coreAddress } = useDAOInfoContext()

  const transferEvent = events.find(({ type }) => type === 'transfer')
  if (!transferEvent) {
    return null
  }

  let sender = transferEvent.attributes.find(
    ({ key }) => key === 'sender'
  )?.value
  let recipient = transferEvent.attributes.find(
    ({ key }) => key === 'recipient'
  )?.value
  const amount = transferEvent.attributes.find(
    ({ key }) => key === 'amount'
  )?.value

  if (!sender || !recipient || !amount) {
    return null
  }

  const coin = parseCoins(amount)[0]
  if (!coin) {
    return null
  }

  const coinDecimals = nativeTokenDecimals(coin.denom)
  if (coinDecimals === undefined) {
    return null
  }

  const readableAmount = `${convertMicroDenomToDenomWithDecimals(
    coin.amount,
    coinDecimals
  )} $${nativeTokenLabel(coin.denom)}`

  // Outgoing payment.
  const spentFromDAO = sender === coreAddress

  return (
    <div className="flex flex-row gap-8 justify-between items-center">
      <div className="flex flex-row gap-1 items-center">
        {spentFromDAO ? (
          <Trans i18nKey="info.treasurySent">
            <p className="font-extrabold">
              <CopyToClipboard value={recipient} />
            </p>
            <p>was sent</p>
            <p className="font-bold">{{ amount: readableAmount }}</p>
            <p>from the treasury.</p>
          </Trans>
        ) : (
          <Trans i18nKey="info.treasuryReceived">
            <p className="font-extrabold">
              <CopyToClipboard value={sender} />
            </p>
            <p>sent</p>
            <p className="font-bold">{{ amount: readableAmount }}</p>
            <p>to the treasury.</p>
          </Trans>
        )}
      </div>

      {/* <p>{tx.height}</p> */}
    </div>
  )
}
