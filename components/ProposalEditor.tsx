import { CosmosMsgFor_Empty, Proposal, ProposalResponse } from '@dao-dao/types/contracts/cw3-dao'
import {
  contractProposalMapAtom,
  draftProposalAtom,
  draftProposalItem,
  nextDraftProposalIdAtom,
  proposalListAtom,
  proposalsRequestIdAtom,
} from 'atoms/proposals'
import HelpTooltip from 'components/HelpTooltip'
import { useThemeContext } from 'contexts/theme'
import { EmptyProposal, EmptyProposalItem } from 'models/proposal/proposal'
import { proposalMessages } from 'models/proposal/proposalSelectors'
import { NextRouter, useRouter } from 'next/router'
import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  useRecoilState,
  useRecoilTransaction_UNSTABLE,
  useRecoilValue,
  useResetRecoilState,
} from 'recoil'
import { cosmWasmSigningClient, walletAddressSelector } from 'selectors/cosm'
import { draftProposalsSelector, proposalsSelector } from 'selectors/proposals'
import {
  isBankMsg,
  isBurnMsg,
  isMintMsg,
  isSendMsg,
  labelForMessage,
  makeMintMessage,
  makeSpendMessage,
} from 'util/messagehelpers'
import { createProposalTransaction, isProposal } from 'util/proposal'
import InputField, {
  InputFieldLabel,
  makeFieldErrorMessage,
} from './InputField'
import LineAlert from './LineAlert'
import MessageSelector from './MessageSelector'
import MintEditor from './MintEditor'
import RawEditor from './RawEditor'
import SpendEditor from './SpendEditor'
import { PaperClipIcon, XIcon } from '@heroicons/react/outline'

export default function ProposalEditor({
  proposalId,
  loading,
  error,
  onProposal,
  contractAddress,
  recipientAddress,
}: {
  proposalId: number
  loading?: boolean
  error?: string
  onProposal?: (proposal: Proposal) => void
  contractAddress: string
  recipientAddress: string
}) {
  const proposalsState = proposalsSelector({
    contractAddress,
    startBefore: 0,
    limit: 10,
  })
  const proposals = useRecoilValue(proposalsState)
  const [editProposalJson, setEditProposalJson] = useState(false)
  const [proposalDescriptionErrorMessage, setProposalDescriptionErrorMessage] =
    useState('')
  const themeContext = useThemeContext()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const router: NextRouter = useRouter()
  const [contractProposalMap, setContractProposalMap] = useRecoilState(
    contractProposalMapAtom
  )
  const draftProposals = useRecoilValue(draftProposalsSelector(contractAddress))
  const [proposalMapItem, setProposalMapItem] = useRecoilState(
    draftProposalAtom({ contractAddress, proposalId })
  )
  const [nextProposalRequestId, setNextProposalRequestId] = useRecoilState(
    proposalsRequestIdAtom
  )
  // const resetProposals = useResetRecoilState(proposalsState)
  const [nextDraftProposalId, setNextDraftProposalId] = useRecoilState(
    nextDraftProposalIdAtom
  )
  const walletAddress = useRecoilValue(walletAddressSelector)
  const signingClient = useRecoilValue(cosmWasmSigningClient)
  const createProposalFunction = useRecoilTransaction_UNSTABLE(
    createProposalTransaction({
      walletAddress,
      signingClient,
      contractAddress,
      draftProposals,
      router,
    }),
    [walletAddress, signingClient, contractAddress, draftProposals]
  )

  if (!proposalId || proposalId < 0) {
    proposalId = nextDraftProposalId
  }

  const proposalsListRoute = `/dao/${contractAddress}/proposals`

  const isExistingDraftProposal = !!proposalMapItem?.proposal
  const proposal: Proposal =
    isExistingDraftProposal && isProposal(proposalMapItem?.proposal)
      ? proposalMapItem.proposal
      : ({ ...EmptyProposal } as any as Proposal)

  console.log({ proposal })

  if (!isExistingDraftProposal) {
    // We're creating a new proposal, so bump the draft ID:
    setNextDraftProposalId(proposalId)
  }

  const createProposal = (proposal: Proposal) => {
    return createProposalFunction(proposalId, proposal)
  }

  const saveDraftProposal = (draftProposal: Proposal) => {
    setContractProposalMap({
      ...contractProposalMap,
      [contractAddress]: {
        ...draftProposals,
        [proposalId + '']: {
          ...(proposalMapItem ?? draftProposalItem(draftProposal, proposalId)),
          proposal: draftProposal,
        },
      },
    })
  }

  const deleteDraftProposal = () => {
    const updatedProposals = { ...draftProposals }
    delete updatedProposals[proposalId + '']
    const updatedMap = {
      ...contractProposalMap,
      [contractAddress]: updatedProposals,
    }
    // Clear the map entry if no data
    if (Object.keys(updatedProposals).length === 0) {
      delete updatedMap[contractAddress]
    }
    setContractProposalMap(updatedMap)
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
      label: 'Wasm',
      id: 'wasm',
      execute: () => addWasmMessage(),
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
    {
      label: 'Mint',
      id: 'mint',
      execute: () => addMintMessage(),
      href: '#',
      isEnabled: () => true,
    },
  ]

  const complete = false

  function isProposalValid(proposalToCheck: Proposal): boolean {
    if (!proposalToCheck) {
      return false
    }
    if (!(proposalToCheck.description && proposalToCheck.title)) {
      return false
    }
    return true
  }

  async function onSubmit(_formData: any) {
    // We don't actually care about what the form processor returned in this
    // case, just that the proposal is filled out correctly, which if
    // the submit method gets called it will be.
    if (isProposal(proposal)) {
      if (isProposalValid(proposal)) {
        await createProposal(proposal)
        setNextProposalRequestId(nextProposalRequestId + 1)
        // resetProposals()
        deleteDraftProposal()
      }
    }
  }

  function updateProposal(updatedProposal: Proposal) {
    console.log(`updateProposal for ${proposalId}`)
    const updatedProposalItem = {
      ...(proposalMapItem ?? EmptyProposalItem),
      id: proposalId,
      proposal: updatedProposal,
    }
    setProposalMapItem(updatedProposalItem)
    const proposalIdKey = `${proposalId}`
    setContractProposalMap({
      ...contractProposalMap,
      [contractAddress]: {
        ...draftProposals,
        [proposalIdKey]: updatedProposalItem,
      },
    })
  }

  function setProposalTitle(title: string) {
    updateProposal({
      ...proposal,
      title,
    })
  }

  function setProposalDescription(description: string) {
    updateProposal({
      ...proposal,
      description,
    })
    if (description) {
      setProposalDescriptionErrorMessage('')
    } else {
      setProposalDescriptionErrorMessage('Proposal description required')
    }
  }

  let messages = (proposal?.msgs ?? []).map((msg, messageIndex) => {
    const label = labelForMessage(msg)
    const modeEditor = <div>TODO: editor for {label}</div>
    /*
    let modeEditor = null
    if (isBankMsg(msg)) {
      if (isSendMsg(msg.bank) && proposalId !== undefined) {
        modeEditor = (
          <SpendEditor
            spendMsg={msg.bank as any}
            contractAddress={contractAddress}
            initialRecipientAddress={recipientAddress}
            proposalId={proposalId as any}
            updateProposal={updateProposal}
            msgIndex={messageIndex}
          />
        )
      } else if (isBurnMsg(msg.bank)) {
        modeEditor = <h1>BURN MESSAGE NOT IMPLEMENTED</h1>
      }
    } else if (isMintMsg(msg)) {
      modeEditor = (
        <MintEditor mintMsg={msg} initialRecipientAddress={recipientAddress} />
      )
    }
    */
    // switch (mapEntry?.messageType) {
    //   case ProposalMessageType.Spend:
    //     modeEditor = (
    //       <SpendEditor
    //         spendMsg={msg}
    //         contractAddress={contractAddress}
    //         initialRecipientAddress={recipientAddress}
    //       ></SpendEditor>
    //     )
    //     break
    //   case ProposalMessageType.Mint: {
    //     modeEditor = (
    //       <MintEditor
    //         mintMsg={msg}
    //         initialRecipientAddress={recipientAddress}
    //       ></MintEditor>
    //     )
    //     break
    //   }
    //   case ProposalMessageType.Custom:
    //     modeEditor = <CustomEditor customMsg={msg} />
    //     break
    //   case ProposalMessageType.Wasm:
    //     modeEditor = <CustomEditor customMsg={msg} />
    //     break
    // }

    return (
      <li
        className="my-4 px-4 py-2 border-l-2 rounded-lg border-accent"
        key={`msg_${messageIndex}`}
        onClick={() => setActiveMessage(messageIndex)}
      >
        <div title={label} className="flex justify-between">
          <h5 className="text-lg font-bold">
            {label}{' '}
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
  })

  const addMessage = (message: CosmosMsgFor_Empty) => {
    updateProposal({
      ...proposal,
      msgs: [...proposal.msgs, message],
    })
  }

  const addWasmMessage = () => {
    addMessage({ wasm: {} } as any)
  }

  const addCustomMessage = () => {
    addMessage({ custom: {} } as CosmosMsgFor_Empty)
  }

  const addSpendMessage = () => {
    try {
      const message: CosmosMsgFor_Empty = makeSpendMessage(
        '',
        recipientAddress,
        contractAddress
      )
      addMessage(message)
    } catch (e) {
      console.error(e)
    }
  }

  const addMintMessage = () => {
    // TODO(gavin.doughtie): fix
    // try {
    //   const msg: CosmosMsgFor_Empty = {
    //     wasm: makeMintMessage('', recipientAddress)
    //   }
    //   addMessage(msg)
    // } catch (e) {
    //   console.error(e)
    // }
  }

  const removeMessage = (messageIndex: number) => {
    const msgs = [...proposal.msgs]
    const removed = msgs.splice(messageIndex, 1)
    if (removed) {
      updateProposal({
        ...proposal,
        msgs,
      })
      // setActiveMessage(-1)
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

  function handleJsonChanged(json: any) {
    setEditProposalJson(false)
  }

  function handleDescriptionBlur(e: ChangeEvent<HTMLTextAreaElement>) {
    setProposalDescription(e.target.value)
  }

  function handleDescriptionTextChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setProposalDescription(e.target.value)
  }

  // TODO preview mode for the whole proposal
  if (editProposalJson) {
    return <RawEditor json={proposal} onChange={handleJsonChanged}></RawEditor>
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
      <div className="grid bg-base-100">
        <div className="flex">
          <div className="text-left container mx-auto">
            <h1 className="text-4xl my-8 text-bold">Create Proposal</h1>
            <form
              className="text-left container mx-auto"
              onSubmit={e => {
                e.preventDefault()
                e.stopPropagation()
                handleSubmit<any>(onSubmit)
              }}
            >
              <h2 className="text-lg">
                <PaperClipIcon className="inline w-5 h-5 mr-2 mb-1" />
                Basic config
              </h2>
              <div className="px-3">
                <InputField
                  fieldName="label"
                  label="Name"
                  toolTip="Name the Proposal"
                  errorMessage="Proposal name required"
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
                <textarea
                  className={editorClassName}
                  // onChange={handleDescriptionChange}
                  onChange={handleDescriptionTextChange}
                  defaultValue={proposal.description}
                  readOnly={complete}
                  // dark={themeContext.theme === 'junoDark'}
                  onBlur={handleDescriptionBlur}
                  id="description"
                ></textarea>
                <label htmlFor="message-list" className="block mt-4 text-xl">
                  Messages{' '}
                  <HelpTooltip text="Messages that will be executed on chain." />
                </label>
                <ul id="message-list">{messages}</ul>
                <br />

                <MessageSelector actions={messageActions}></MessageSelector>
                <br />

                {!complete && (
                  <div>
                    <button
                      key="create"
                      className={`btn btn-primary text-lg mt-8 ml-auto ${
                        loading ? 'loading' : ''
                      }`}
                      style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
                      type="submit"
                      disabled={loading}
                    >
                      Create Proposal
                    </button>
                    <button
                      key="save_draft"
                      className={`btn btn-secondary text-lg mt-8 ml-auto ${
                        loading ? 'loading' : ''
                      }`}
                      style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
                      disabled={loading}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        saveDraftProposal(proposal)
                      }}
                    >
                      Save Draft
                    </button>
                    <button
                      key="delete_draft"
                      className={`btn btn-secondary text-lg mt-8 ml-auto ${
                        loading ? 'loading' : ''
                      }`}
                      style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
                      disabled={loading}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        deleteDraftProposal()
                      }}
                    >
                      Delete Draft
                    </button>
                  </div>
                )}
                {errorComponent}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
