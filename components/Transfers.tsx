import {
  convertMicroDenomToDenom,
  convertFromMicroDenom,
} from 'util/conversion'
import { IndexedTx } from '@cosmjs/stargate'

interface TxEventAttribute {
  key: string
  value: string
}

interface TxEvent {
  type: string
  attributes: TxEventAttribute[]
}

const DAO_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_DAO_CONTRACT_ADDRESS || ''

function TransferRow({ tx }: { tx: IndexedTx }) {
  const [{ events }] = JSON.parse(tx.rawLog)
  console.log('events', events)

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

  const isSender = sender == DAO_CONTRACT_ADDRESS

  const address = isSender ? recipient : sender
  const sign = isSender ? '-' : '+'

  const {
    groups: { uamount, udenom },
  } = amount.match(/(?<uamount>\d+)(?<udenom>[a-zA-Z]+)/)

  const amountLabel = `${sign}${convertMicroDenomToDenom(
    uamount
  )} ${convertFromMicroDenom(udenom)}`

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

function Transfers({ txs }: { txs: IndexedTx[] }) {
  return (
    <>
      <h3 className="text-2xl mb-2">Transfers</h3>
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
            {txs.map((tx: IndexedTx) => (
              <TransferRow key={tx.hash} tx={tx} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Transfers
