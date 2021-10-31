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
import JsonDisplayCollapse from './JsonDisplayCollapse'

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
    const valid = !!(recipientAddress && isValidAddress(recipient))

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
          valid,
        }
      } else {
        action = {
          type: 'addMessage',
          message,
          messageType,
          valid,
        }
      }
      dispatch(action)
    } catch (e) {}
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

  let inputBaseClass =
    'input input-bordered rounded box-border p-3 w-full text-xl'
  let inputErrorClass =
    'input input-bordered rounded box-border p-3 w-full text-xl bg-error'

  let addressClass = validAddress ? inputBaseClass : inputErrorClass

  const updateTitle = spendMsg?.id ? 'Update Spend' : 'Add Spend'
  return (
    <div>
      <label htmlFor="amount" className="block mt-4">
        Amount
      </label>
      <input
        type="number"
        id="amount"
        value={amount}
        className="input input-bordered rounded box-border p-3 w-full focus:input-primary text-xl"
        name="amount"
        readOnly={false}
        onChange={handleAmount}
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
      <JsonDisplayCollapse
        title="Show JSON"
        content={JSON.stringify(spendMsg, undefined, 2)}
      />
    </div>
  )
}
