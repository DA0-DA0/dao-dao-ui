import {
  MessageMapEntry,
  ProposalMessageType,
} from 'models/proposal/messageMap'
import { ProposalAction } from 'models/proposal/proposalActions'
import {
  getSpendAmount,
  getSpendRecipient,
} from 'models/proposal/proposalSelectors'
import { FormEvent, useState } from 'react'
import { isValidAddress } from 'util/isValidAddress'
import { makeSpendMessage } from '../util/messagehelpers'

export default function SpendEditor({
  dispatch,
  contractAddress,
  initialRecipientAddress,
  spendMsg,
}: {
  dispatch: (action: ProposalAction) => void
  spendMsg?: MessageMapEntry
  contractAddress: string
  initialRecipientAddress: string
}) {
  const [address, setAddress] = useState(initialRecipientAddress)
  const [validAddress, setValidAddress] = useState(
    isValidAddress(initialRecipientAddress)
  )

  let recipientAddress = getSpendRecipient(spendMsg) || initialRecipientAddress

  let amount = getSpendAmount(spendMsg) ?? ''

  function setAmount(newAmount: string) {
    amount = newAmount
    updateSpend()
  }

  function updateSpend(e?: FormEvent, options?: { recipientAddress?: string }) {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    const recipient = options?.recipientAddress ?? recipientAddress

    try {
      const id = spendMsg?.id ?? ''
      const messageType = spendMsg?.messageType ?? ProposalMessageType.Spend
      let action: ProposalAction

      const message = makeSpendMessage(amount, recipient, contractAddress)
      if (id) {
        action = {
          type: 'updateMessage',
          id,
          message,
        }
      } else {
        action = {
          type: 'addMessage',
          message,
          messageType,
        }
      }
      dispatch(action)
    } catch (e) {}
  }

  function handleRecipientAddress(e: React.FormEvent<HTMLInputElement>) {
    const valid = !!(address && isValidAddress(address))
    updateSpend(e, { recipientAddress: address })
    setValidAddress(valid)
  }

  function handleAmount(e: React.FormEvent<HTMLInputElement>) {
    const amount = e?.currentTarget?.value
    setAmount(amount)
  }

  let inputBaseClass =
    'input input-bordered rounded box-border p-3 w-full text-xl'
  let inputErrorClass =
    'input input-bordered rounded box-border p-3 w-full text-xl input-error'

  let addressClass = validAddress ? inputBaseClass : inputErrorClass

  return (
    <div>
      <div className="form-control">
        <label htmlFor="amount" className="label">
          <span className="label-text font-bold">Amount</span>
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          className="input input-bordered rounded box-border p-3 w-full text-xl"
          name="amount"
          onChange={handleAmount}
        />
      </div>
      <div className="form-control">
        <label htmlFor="recipientAddress" className="label">
          <span className="label-text font-bold">Recipient Address</span>
        </label>
        <input
          type="text"
          id="recipientAddress"
          className={addressClass}
          name="recipientAddress"
          onChange={(e) => setAddress(e.target.value)}
          onBlur={handleRecipientAddress}
          value={address}
        />
        {!validAddress && (
          <label className="label">
            <span className="label-text-alt text-error">Invalid address</span>
          </label>
        )}
      </div>
    </div>
  )
}
