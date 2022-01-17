import {
  MessageMapEntry,
  ProposalMessageType,
} from 'models/proposal/messageMap'
import { ProposalAction } from 'models/proposal/proposalActions'
import { FormEvent, useState } from 'react'
import { isValidAddress } from 'util/isValidAddress'
import { makeMintMessage, getMintRecipient, getMintAmount } from 'util/messagehelpers'
import { draftProposalMessageSelector } from 'selectors/proposals'
import { useRecoilState } from 'recoil'

export default function MintEditor({
  contractAddress,
  proposalId,
  mintMsg,
  denom,
}: {
  contractAddress: string,
  proposalId: string,
  mintMsg?: MessageMapEntry
  denom: string
}) {
  const [address, setAddress] = useState(getMintRecipient(mintMsg) || '')
  const [validAddress, setValidAddress] = useState(true)
  const [mintMessage, setMintMessage] = useRecoilState(draftProposalMessageSelector({
    contractAddress,
    proposalId,
    messageId: mintMsg?.id ?? ''
  }))

  let amount = getMintAmount(mintMessage) ?? ''

  function setAmount(newAmount: string) {
    amount = newAmount
    updateMint()
  }

  function updateMint(e?: FormEvent) {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    const recipient = isValidAddress(address) ? address : ''

    try {
      const id = mintMsg?.id ?? ''
      const messageType = mintMsg?.messageType ?? ProposalMessageType.Mint
      const order = mintMsg?.order ?? 0

      const message = makeMintMessage(amount, recipient)
      const updatedMintMessage: MessageMapEntry = {
        id,
        messageType,
        ...mintMessage,
        order,
        message
      }
      setMintMessage(updatedMintMessage)
    } catch (e) {}
  }

  function handleRecipientAddress(e: React.FormEvent<HTMLInputElement>) {
    const valid = !!(address && isValidAddress(address))
    updateMint(e)
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
          required
          type="text"
          id="recipientAddress"
          className={
            'input input-bordered' + (!validAddress ? ' input-error' : '')
          }
          name="recipientAddress"
          onChange={(e) => {
            setAddress(e.target.value)
            setValidAddress(isValidAddress(address))
          }}
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
          required
          type="number"
          id="mintAmount"
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
