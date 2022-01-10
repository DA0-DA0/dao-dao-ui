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
import {
  convertDenomToHumanReadableDenom,
  convertMicroDenomToDenom,
} from 'util/conversion'
import { isValidAddress } from 'util/isValidAddress'
import { makeSpendMessage } from '../util/messagehelpers'

export default function SpendEditor({
  dispatch,
  contractAddress,
  spendMsg,
}: {
  dispatch: (action: ProposalAction) => void
  spendMsg?: MessageMapEntry
  contractAddress: string
}) {
  const [address, setAddress] = useState('')
  const [validAddress, setValidAddress] = useState(true)

  let recipientAddress = getSpendRecipient(spendMsg) || ''

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
            {convertDenomToHumanReadableDenom(
              process.env.NEXT_PUBLIC_STAKING_DENOM as string
            )}
          </span>
        </label>
      </div>
    </div>
  )
}
