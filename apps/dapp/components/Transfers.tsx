import { useRecoilValueLoadable } from 'recoil'

import { IndexedTx } from '@cosmjs/stargate'

import { transactions } from 'selectors/treasury'
import { NATIVE_DECIMALS } from 'util/constants'
import {
  convertMicroDenomToDenomWithDecimals,
  nativeTokenLabel,
} from 'util/conversion'

interface TxEventAttribute {
  key: string
  value: string
}

interface TxEvent {
  type: string
  attributes: TxEventAttribute[]
}

function TransferRow({
  contract_address,
  tx,
}: {
  contract_address: string
  tx: IndexedTx
}) {
  const [{ events }] = JSON.parse(tx.rawLog)

  const [transfer] = events.filter((event: TxEvent) => event.type == 'transfer')

  if (!transfer) {
    return null
  }

  const { recipient, sender, amount } = transfer.attributes.reduce(
    (acc: any, current: TxEventAttribute) => ({
      ...acc,
      [current.key]: current.value,
    })
  )

  const isSender = sender == contract_address

  const address = isSender ? recipient : sender
  const sign = isSender ? '-' : '+'

  const {
    groups: { uamount, udenom },
  } = amount.match(/(?<uamount>\d+)(?<udenom>[a-zA-Z]+)/)

  // Assume we only deal with transfers in native denominations.
  const amountLabel = `${sign}${convertMicroDenomToDenomWithDecimals(
    uamount,
    NATIVE_DECIMALS
  )} ${nativeTokenLabel(udenom)}`

  // TODO(@ebaker): add link to block explorer
  return (
    <tr className="hover">
      <td>{tx.height}</td>
      <td>{address}</td>
      {/* memo */}
      <td className={`${isSender ? 'text-red-400' : 'text-green-400'}`}>
        {amountLabel}
      </td>
    </tr>
  )
}

function TransferRows({ contractAddress }: { contractAddress: string }) {
  // transactions load slowly, show loading state with useRecoilValueLoadable
  const txs = useRecoilValueLoadable(transactions(contractAddress))

  switch (txs.state) {
    case 'hasValue':
      return (
        <>
          {txs.contents.map((tx: IndexedTx) => (
            <TransferRow
              key={tx.hash}
              tx={tx}
              contract_address={contractAddress}
            />
          ))}
        </>
      )

    case 'loading':
      return (
        <tr>
          <td colSpan={3}>Loading...</td>
        </tr>
      )
    case 'hasError':
      throw txs.contents
  }
}

function Transfers({ contract_address }: { contract_address: string }) {
  return (
    <div className="border border-base-200 rounded-lg pb-1 shadow-lg">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Block Height</th>
            <th>Source/Recipient</th>
            {/* <th>Memo</th> */}
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <TransferRows contractAddress={contract_address} />
        </tbody>
      </table>
    </div>
  )
}

export default Transfers
