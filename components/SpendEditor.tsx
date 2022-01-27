import { MessageMapEntry } from 'models/proposal/messageMap'
import { FormEvent, useState } from 'react'
import { isValidAddress } from 'util/isValidAddress'
import {
  getDenom,
  makeSpendMessage,
  getSpendAmount,
  getSpendRecipient,
} from '../util/messagehelpers'
import { useRecoilState } from 'recoil'
import { draftProposalMessageSelector } from 'selectors/proposals'

export default function SpendEditor({
  contractAddress,
  proposalId,
  initialRecipientAddress,
  spendMsgId,
}: {
  contractAddress: string
  proposalId: string
  spendMsgId: string
  initialRecipientAddress: string
}) {
  const [validAddress, setValidAddress] = useState(
    initialRecipientAddress ? isValidAddress(initialRecipientAddress) : true
  )
  const [spendMessage, setSpendMessage] = useRecoilState(
    draftProposalMessageSelector({
      contractAddress,
      proposalId,
      messageId: spendMsgId,
    })
  )

  if (spendMessage === undefined) {
    return <h1>Error message not found</h1>
  }

  let recipientAddress =
    getSpendRecipient(spendMessage) || initialRecipientAddress

  let amount = getSpendAmount(spendMessage) ?? ''
  let denom = getDenom(spendMessage.message)

  function setAmount(newAmount: string) {
    amount = newAmount
    updateSpend()
  }

  function updateSpend(e?: FormEvent, options?: { recipientAddress?: string }) {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    if (spendMessage) {
      const recipient = options?.recipientAddress ?? recipientAddress

      try {
        const message = makeSpendMessage(
          amount,
          recipient,
          contractAddress,
          denom
        )
        const updatedSpendMessage: MessageMapEntry = {
          ...spendMessage,
          message,
        }
        setSpendMessage(updatedSpendMessage)
      } catch (err) {
        console.error(err)
      }
    }
  }

  function handleRecipientAddress(e: React.FormEvent<HTMLInputElement>) {
    const address = e.currentTarget?.value
    const valid = !!(address && isValidAddress(address))
    updateSpend(undefined, { recipientAddress: address })
    setValidAddress(valid)
  }

  function handleAmount(e: React.FormEvent<HTMLInputElement>) {
    const amount = e?.currentTarget?.value
    setAmount(amount)
  }

  const addressClass = `input input-bordered rounded box-border p-3 w-full text-xl ${
    validAddress ? '' : 'bg-error'
  }`

  return (
    <div>
      <label htmlFor="amount" className="block mt-4">
        Amount
      </label>
      <input
        type="number"
        id="amount"
        className="input input-bordered rounded box-border p-3 w-full text-xl"
        name="amount"
        step="any"
        readOnly={false}
        onChange={handleAmount}
        defaultValue={amount}
      />
      <label htmlFor="recipientAddress" className="block mt-4">
        Recipient Address{validAddress ? '' : ' (Invalid Address)'}
      </label>
      <input
        type="text"
        id="recipientAddress"
        className={addressClass}
        name="recipientAddress"
        readOnly={false}
        onChange={handleRecipientAddress}
        value={recipientAddress}
      />
    </div>
  )
}
