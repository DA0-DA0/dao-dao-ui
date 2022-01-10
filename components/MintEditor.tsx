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
  mintMsg,
  denom,
}: {
  dispatch: (action: ProposalAction) => void
  mintMsg?: MessageMapEntry
  denom: string
}) {
  const [address, setAddress] = useState('')
  const [validAddress, setValidAddress] = useState(true)

  let recipientAddress = getMintRecipient(mintMsg) || ''

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

  return (
    <div className="grid grid-cols-3 gap-2">
      <div className="form-control col-span-2">
        <label htmlFor="recipientAddress" className="label">
          <span className="label-text text-secondary text-medium ">
            Recipient address
          </span>
        </label>
        <input
          type="text"
          id="recipientAddress"
          className={
            'input input-bordered' + (!validAddress ? ' input-error' : '')
          }
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

      <div className="form-control">
        <label htmlFor="recipientAddress" className="label">
          <span className="label-text text-secondary text-medium ">Amount</span>
        </label>
        <input
          type="number"
          id="recipientAddress"
          className="input input-bordered"
          name="amount"
          onChange={handleAmount}
          value={amount}
        />
        <label className="label">
          <span className="label-text-alt w-full text-right mr-1">
            ${denom}
          </span>
        </label>
      </div>
    </div>
  )
}
