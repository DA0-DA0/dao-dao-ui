import {
  MessageMapEntry,
  ProposalMessageType,
} from 'models/proposal/messageMap'
import { ProposalAction } from 'models/proposal/proposalActions'
import {
  getMintAmount,
  getMintRecipient,
} from 'models/proposal/proposalSelectors'
import { FormEvent, useState } from 'react'
import { isValidAddress } from 'util/isValidAddress'
import { makeMintMessage } from 'util/messagehelpers'

export default function MintEditor({
  dispatch,
  initialRecipientAddress,
  mintMsg,
}: {
  dispatch: (action: ProposalAction) => void
  mintMsg?: MessageMapEntry
  initialRecipientAddress: string
}) {
  const [address, setAddress] = useState(initialRecipientAddress)
  const [validAddress, setValidAddress] = useState(
    isValidAddress(initialRecipientAddress)
  )

  let recipientAddress = getMintRecipient(mintMsg) || initialRecipientAddress

  let amount = getMintAmount(mintMsg) ?? ''

  function setAmount(newAmount: string) {
    amount = newAmount
    updateMint()
  }

  function updateMint(e?: FormEvent, options?: { recipientAddress?: string }) {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    const recipient = options?.recipientAddress ?? recipientAddress

    try {
      const id = mintMsg?.id ?? ''
      const messageType = mintMsg?.messageType ?? ProposalMessageType.Mint
      let action: ProposalAction

      const message = makeMintMessage(amount, recipient)

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
    updateMint(e, { recipientAddress: address })
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
