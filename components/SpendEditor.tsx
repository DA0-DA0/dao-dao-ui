import { BankMsg, Proposal } from '@dao-dao/types/contracts/cw3-dao'
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
import { useRecoilState } from 'recoil'
import { draftProposalMessageSelector } from 'selectors/proposals'

export default function SpendEditor({
  contractAddress,
  proposalId,
  msgIndex,
  initialRecipientAddress,
  spendMsg,
  updateProposal
}: {
  contractAddress: string,
  proposalId: string,
  msgIndex: number,
  spendMsg?: MessageMapEntry
  initialRecipientAddress: string
  updateProposal: (proposal: Proposal) => void
}) {
  const [validAddress, setValidAddress] = useState(
    isValidAddress(initialRecipientAddress)
  )
  const [spendMessage, setSpendMessage] = useRecoilState(draftProposalMessageSelector({
    contractAddress,
    proposalId,
    messageId: spendMsg?.id ?? ''
  }))

  let recipientAddress = getSpendRecipient(spendMsg) || initialRecipientAddress

  let amount = getSpendAmount(spendMessage) ?? ''

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
      const id = spendMsg?.id ?? `${msgIndex}`
      const messageType = spendMsg?.messageType ?? ProposalMessageType.Spend
      const order = msgIndex

      const message = makeSpendMessage(amount, recipient, contractAddress, spendMsg?.message?.denom)
      const updatedSpendMessage: MessageMapEntry = {
        ...spendMsg,
        id,
        messageType,
        order,
        message
      }
      setSpendMessage(updatedSpendMessage)
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
