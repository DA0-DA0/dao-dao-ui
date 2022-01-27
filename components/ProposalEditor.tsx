import { Proposal } from '@dao-dao/types/contracts/cw3-dao'
import { PaperClipIcon, XIcon } from '@heroicons/react/outline'
import {
  nextDraftProposalIdAtom,
  proposalListAtom,
  proposalsRequestIdAtom,
} from 'atoms/proposals'
import {
  MessageMapEntry,
  ProposalMessageType,
} from 'models/proposal/messageMap'
import { EmptyProposal, EmptyProposalItem } from 'models/proposal/proposal'
import { NextRouter, useRouter } from 'next/router'
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil'
import {
  cosmWasmSigningClient,
  walletAddress as walletAddressSelector,
} from 'selectors/cosm'
import {
  draftProposalSelector,
  draftProposalsSelector,
} from 'selectors/proposals'
import { ProposalMapItem } from 'types/proposals'
import {
  contractConfigSelector,
  ContractConfigWrapper,
} from 'util/contractConfigWrapper'
import {
  labelForMessage,
  makeMintMessage,
  makeSpendMessage,
  messageForDraftProposal,
} from 'util/messagehelpers'
import {
  createProposalCallback,
  draftProposalKey,
  isProposal,
} from '../util/proposal'
import CustomEditor from './CustomEditor'
import InputField, {
  InputFieldLabel,
  makeFieldErrorMessage,
} from './InputField'
import LineAlert from './LineAlert'
import MessageSelector from './MessageSelector'
import MintEditor from './MintEditor'
import SpendEditor from './SpendEditor'
import { defaultExecuteFee } from 'util/fee'
import { errorAtom } from 'atoms/status'

export function ProposalEditor({
  proposalId,
  loading,
  error,
  contractAddress,
  recipientAddress,
  multisig,
}: {
  proposalId: string
  loading?: boolean
  error?: string
  contractAddress: string
  recipientAddress: string
  multisig: boolean
}) {
  const router: NextRouter = useRouter()

  const [deposit, setDeposit] = useState('0')
  const [tokenAddress, setTokenAddress] = useState('')
  const setError = useSetRecoilState(errorAtom)

  const signingClient = useRecoilValue(cosmWasmSigningClient)
  const walletAddress = useRecoilValue(walletAddressSelector)

  const [proposalDescriptionErrorMessage, setProposalDescriptionErrorMessage] =
    useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [draftProposals, setDraftProposals] = useRecoilState(
    draftProposalsSelector(contractAddress)
  )
  const [proposalMapItem, setProposalMapItem] = useRecoilState(
    draftProposalSelector({ contractAddress, proposalId })
  )
  const [nextProposalRequestId, setNextProposalRequestId] = useRecoilState(
    proposalsRequestIdAtom
  )

  const [nextDraftProposalId, setNextDraftProposalId] = useRecoilState(
    nextDraftProposalIdAtom
  )

  const messageMap = proposalMapItem?.messages ?? {}
  const resetProposals = useResetRecoilState(proposalListAtom(contractAddress))
  const createProposalFunction = useRecoilCallback(
    createProposalCallback({
      walletAddress,
      signingClient,
      contractAddress,
      draftProposals,
      router,
      resetProposals,
      multisig,
    }),
    [walletAddress, signingClient, contractAddress, draftProposals]
  )

  if (!proposalId) {
    proposalId = draftProposalKey(nextDraftProposalId)
  }

  const isExistingDraftProposal = !!proposalMapItem?.proposal
  const proposal: Proposal =
    isExistingDraftProposal && isProposal(proposalMapItem?.proposal)
      ? proposalMapItem.proposal
      : ({ ...EmptyProposal } as any as Proposal)

  const createProposal = (proposalMapItem: ProposalMapItem) => {
    const proposal = messageForDraftProposal(
      proposalMapItem,
      contractConfig?.gov_token
    )
    return createProposalFunction(proposalId, proposal)
  }

  const messageActions = [
    {
      label: 'Spend',
      id: 'spend',
      execute: () => addSpendMessage(),
      href: '#',
      isEnabled: () => true,
    },
    {
      label: 'Custom',
      id: 'custom',
      execute: () => addCustomMessage(),
      href: '#',
      isEnabled: () => true,
    },
  ]

  // If DAO
  if (!multisig) {
    // Add DAO specific actions
    messageActions.push({
      label: 'Mint',
      id: 'mint',
      execute: () => addMintMessage(),
      href: '#',
      isEnabled: () => true,
    })
  }

  const complete = false

  const config = useRecoilValue(
    contractConfigSelector({ contractAddress, multisig: !!multisig })
  )

  const contractConfig = useMemo(
    () => new ContractConfigWrapper(config),
    [config]
  )
  // We can't call a variable number of hooks per render so we need to 'fetch' this unconditionally.
  const govTokenSymbol = contractConfig.gov_token_symbol

  useEffect(() => {
    setDeposit(contractConfig.proposal_deposit.toString())
    setTokenAddress(contractConfig?.gov_token)
  }, [contractConfig])

  function isProposalValid(proposalToCheck: Proposal): boolean {
    if (!proposalToCheck) {
      return false
    }
    if (!(proposalToCheck.description && proposalToCheck.title)) {
      return false
    }
    return true
  }

  async function onSubmitProposal(_formData: any) {
    if (!walletAddress) {
      setError('Please connect your wallet')
    }
    // If the contract needs a deposit, increase allowance
    if (deposit && deposit !== '0') {
      await signingClient?.execute(
        walletAddress,
        tokenAddress,
        { increase_allowance: { amount: deposit, spender: contractAddress } },
        defaultExecuteFee
      )
    }
    // We don't actually care about what the form processor returned in this
    // case, just that the proposal is filled out correctly, which if
    // the submit method gets called it will be.
    if (proposalMapItem && isProposalValid(proposalMapItem.proposal)) {
      await createProposal(proposalMapItem)
      setNextProposalRequestId(nextProposalRequestId + 1)
    }
  }

  function updateProposal(updatedProposal: Proposal) {
    const updatedProposalItem: ProposalMapItem = {
      ...(proposalMapItem ?? EmptyProposalItem),
      id: proposalId,
      proposal: updatedProposal,
    }
    setProposalMapItem(updatedProposalItem)
  }

  function setProposalTitle(title: string) {
    title = title.trim()
    if (proposal.title !== title) {
      updateProposal({
        ...proposal,
        title,
      })
    }
  }

  function setProposalDescription(description: string) {
    description = description.trim()
    if (description == '\\') {
      description = ''
    }
    if (proposal.description !== description) {
      updateProposal({
        ...proposal,
        description,
      })
    }
    if (description) {
      setProposalDescriptionErrorMessage('')
    } else {
      setProposalDescriptionErrorMessage('Proposal description required')
    }
  }

  let messages = Object.entries(messageMap ?? {}).map(
    ([key, mapEntry], messageIndex) => {
      const msg = mapEntry.message
      let label = ''

      let modeEditor = <h1>Not implemented</h1>
      switch (mapEntry.messageType) {
        case ProposalMessageType.Spend:
          modeEditor = (
            <SpendEditor
              spendMsgId={mapEntry.id}
              contractAddress={contractAddress}
              initialRecipientAddress={recipientAddress}
              proposalId={proposalId}
            />
          )
          label = 'Spend'
          break
        case ProposalMessageType.Mint:
          modeEditor = (
            <MintEditor
              mintMsg={mapEntry}
              denom={govTokenSymbol}
              contractAddress={contractAddress}
              proposalId={proposalId}
            />
          )
          label = 'Mint'
          break
        case ProposalMessageType.Custom:
          modeEditor = (
            <CustomEditor
              contractAddress={contractAddress}
              proposalId={proposalId}
              customMsg={mapEntry}
            />
          )
          label = 'Custom'
          break
      }

      const messageTitle = `${label} ${labelForMessage(msg)}`
      return (
        <li
          className="my-4 px-4 py-2 border-l-2 rounded-lg border-accent"
          key={`msg_${messageIndex}`}
          onClick={() => setActiveMessage(messageIndex)}
        >
          <div title={messageTitle} className="flex justify-between">
            <h5 className="text-lg font-bold">
              {messageTitle}{' '}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  removeMessage(messageIndex)
                }}
                title="Delete message"
                className="btn btn-circle btn-xs float-right"
              >
                <XIcon />
              </button>
            </h5>
          </div>
          {modeEditor}
        </li>
      )
    }
  )

  const currentMessageCount = () => Object.keys(messageMap ?? {}).length
  const nextMessageKey = () => `${currentMessageCount()}`

  const addMessage = (message: MessageMapEntry) => {
    const messages = { ...messageMap, [message.id]: message }
    const updatedProposal: ProposalMapItem = {
      ...(proposalMapItem || EmptyProposalItem),
      messages,
    }
    setProposalMapItem(updatedProposal)
  }

  const addCustomMessage = () => {
    const customMessageEntry = makeMessageMapEntry(ProposalMessageType.Custom, {
      custom: {},
    })
    addMessage(customMessageEntry)
  }

  const makeMessageMapEntry = (
    messageType: ProposalMessageType,
    message: any
  ) => {
    return {
      id: nextMessageKey(),
      messageType,
      order: currentMessageCount(),
      message,
    }
  }

  const addSpendMessage = () => {
    try {
      addMessage(
        makeMessageMapEntry(
          ProposalMessageType.Spend,
          makeSpendMessage(
            '0', // amount
            recipientAddress,
            contractAddress
          )
        )
      )
    } catch (e) {
      console.error(e)
    }
  }

  const addMintMessage = () => {
    try {
      addMessage(
        makeMessageMapEntry(
          ProposalMessageType.Mint,
          makeMintMessage('0', recipientAddress)
        )
      )
    } catch (e) {
      console.error(e)
    }
  }

  const removeMessage = (messageIndex: number) => {
    if (!proposalMapItem?.messages) {
      return
    }
    const existing: MessageMapEntry =
      proposalMapItem.messages[`${messageIndex}`]
    if (existing) {
      const messages = {
        ...proposalMapItem.messages,
      }
      delete messages[existing.id]
      const updated: ProposalMapItem = {
        ...proposalMapItem,
        messages,
      }
      setProposalMapItem(updated)
    } else {
      console.warn(`no message at ${messageIndex}`)
    }
  }

  const setActiveMessage = (activeMessageIndex: number) => {
    setProposalMapItem({
      ...(proposalMapItem ?? EmptyProposalItem),
      activeMessageIndex,
    })
  }

  function handleDescriptionBlur(e: ChangeEvent<HTMLTextAreaElement>) {
    setProposalDescription(e.target.value)
  }

  function handleDescriptionTextChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setProposalDescription(e.target.value)
  }

  const fieldErrorMessage = makeFieldErrorMessage(errors)

  const editorClassName = proposalDescriptionErrorMessage
    ? 'input input-error input-bordered rounded box-border py-3 px-8 h-full w-full text-xl'
    : 'input input-bordered rounded box-border py-3 px-8 h-full w-full text-xl'

  const errorComponent = error ? (
    <div className="mt-8">
      <LineAlert variant="error" msg={error} />
    </div>
  ) : null

  return (
    <div className="flex flex-col w-full flex-row">
      <div className="grid mt-3">
        <div className="flex">
          <div className="text-left container mx-auto">
            <form
              className="text-left container mx-auto"
              onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleSubmit(onSubmitProposal, (x) => {
                  console.error('bad submit:')
                  console.dir(x)
                })(e)
              }}
            >
              <h2 className="pl-4 mt-10 text-lg">Name and description</h2>
              <div className="px-3">
                <InputField
                  fieldName="label"
                  label="Title"
                  toolTip="The title of your proposal"
                  errorMessage="Proposal title required"
                  readOnly={complete}
                  register={register}
                  fieldErrorMessage={fieldErrorMessage}
                  defaultValue={proposal.title}
                  onChange={(e) => setProposalTitle(e?.target?.value)}
                />
                <InputFieldLabel
                  errorText={proposalDescriptionErrorMessage}
                  fieldName="description"
                  label="Description"
                  toolTip="Your proposal description"
                />
                {/* TODO(gavin.doughtie): Markdown editor goes here. */}
                <textarea
                  className={editorClassName}
                  onChange={handleDescriptionTextChange}
                  defaultValue={proposal.description}
                  readOnly={complete}
                  onBlur={handleDescriptionBlur}
                  id="description"
                ></textarea>
              </div>
              <h2 className="text-lg mt-6 mb-3">
                <PaperClipIcon className="inline w-5 h-5 mr-2 mb-1" />
                Messages
              </h2>
              <div className="px-3">
                <ul id="message-list" className="list-none">
                  {messages}
                </ul>
                <MessageSelector actions={messageActions}></MessageSelector>
              </div>
              <button
                className={`btn btn-primary btn-md font-semibold normal-case text-lg mt-6 ml-auto ${
                  loading ? 'loading' : ''
                }`}
                style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
                type="submit"
                disabled={loading}
              >
                {deposit && deposit !== '0'
                  ? 'Deposit & create propsal'
                  : 'Create proposal'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProposalEditor
