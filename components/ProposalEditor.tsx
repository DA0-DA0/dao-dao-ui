import { FormEvent, FormEventHandler, useReducer, useState } from 'react'
import { useThemeContext } from 'contexts/theme'
import { ProposalMessageType } from 'models/proposal/messageMap'
import { EmptyProposal, Proposal } from 'models/proposal/proposal'
import {
  ProposalAction,
  ProposalRemoveMessage,
  ProposalUpdateFromMessage,
} from 'models/proposal/proposalActions'
import { ProposalReducer } from 'models/proposal/proposalReducer'
import {
  messageForProposal,
  proposalMessages,
} from 'models/proposal/proposalSelectors'
import Editor from 'rich-markdown-editor'
import { isValidAddress } from 'util/isValidAddress'
import {
  labelForMessage,
  makeMintMessage,
  makeSpendMessage,
} from 'util/messagehelpers'
import CustomEditor from './CustomEditor'
import LineAlert from './LineAlert'
import MessageSelector from './MessageSelector'
import RawEditor from './RawEditor'
import SpendEditor from './SpendEditor'
import MintEditor from './MintEditor'
import { CosmosMsgFor_Empty } from '@dao_dao/types/contracts/cw3-dao'

export default function ProposalEditor({
  initialProposal,
  loading,
  error,
  onProposal,
  contractAddress,
  recipientAddress,
}: {
  initialProposal?: Proposal
  loading?: boolean
  error?: string
  onProposal: (proposal: Proposal) => void
  contractAddress: string
  recipientAddress: string
}) {
  const [proposal, dispatch] = useReducer(ProposalReducer, {
    ...(initialProposal || EmptyProposal),
  })
  const [editProposalJson, setEditProposalJson] = useState(false)
  const [value, setValue] = useState('')
  const themeContext = useThemeContext()

  const messageActions = [
    {
      label: 'Spend',
      id: 'spend',
      execute: () => addMessage(ProposalMessageType.Spend),
      href: '#',
      isEnabled: () => true,
    },
    {
      label: 'Custom',
      id: 'custom',
      execute: () => addMessage(ProposalMessageType.Custom),
      href: '#',
      isEnabled: () => true,
    },
    {
      label: 'Mint',
      id: 'mint',
      execute: () => addMessage(ProposalMessageType.Mint),
      href: '#',
      isEnabled: () => true,
    },
  ]

  const complete = false

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e: FormEvent) => {
    e.preventDefault()
    onProposal(proposal)
  }

  function setProposalTitle(title: string) {
    dispatch({ type: 'setTitle', title })
  }

  function setProposalDescription(description: string) {
    dispatch({ type: 'setDescription', description })
  }

  let messages = proposalMessages(proposal).map((mapEntry, key) => {
    const label = labelForMessage(mapEntry.message)

    let modeEditor = null
    switch (mapEntry?.messageType) {
      case ProposalMessageType.Spend:
        let amount = ''
        if (mapEntry?.message) {
          amount = (mapEntry.message as any).bank?.send?.amount[0]?.amount
        }
        modeEditor = (
          <SpendEditor
            dispatch={dispatch}
            spendMsg={mapEntry}
            contractAddress={contractAddress}
            initialRecipientAddress={recipientAddress}
          ></SpendEditor>
        )
        break
      case ProposalMessageType.Mint: {
        modeEditor = (
          <MintEditor
            dispatch={dispatch}
            mintMsg={mapEntry}
            initialRecipientAddress={recipientAddress}
          ></MintEditor>
        )
        break
      }
      case ProposalMessageType.Custom:
        modeEditor = <CustomEditor dispatch={dispatch} customMsg={mapEntry} />
        break
    }

    return (
      <li
        className="py-8"
        key={mapEntry.id}
        onClick={() =>
          dispatch({
            type: 'setActiveMessage',
            id: mapEntry.id,
          })
        }
      >
        <div title={label} className="whitespace-nowrap text-left">
          <h5 className="text-lg font-bold">
            {mapEntry.messageType.toUpperCase()} {label}{' '}
            <button
              onClick={() => removeMessage(mapEntry.id)}
              title="Delete message"
              className="btn btn-circle btn-xs float-right"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-4 h-4 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </h5>
        </div>
        {modeEditor}
      </li>
    )
  })

  const addMessage = (messageType: ProposalMessageType) => {
    if (messageType === ProposalMessageType.Spend) {
      addSpendMessage()
    } else if (messageType === ProposalMessageType.Mint) {
      addMintMessage()
    } else if (messageType === ProposalMessageType.Custom) {
      addCustomMessage()
    }
  }

  const addCustomMessage = () => {
    const action: ProposalAction = {
      type: 'addMessage',
      message: { custom: {} } as CosmosMsgFor_Empty,
      messageType: ProposalMessageType.Custom,
    }
    dispatch(action)
  }

  const addSpendMessage = () => {
    const validAddress = !!(
      recipientAddress && isValidAddress(recipientAddress)
    )
    if (validAddress) {
      try {
        const message = makeSpendMessage('', recipientAddress, contractAddress)
        const messageType = ProposalMessageType.Spend
        const action: ProposalAction = {
          type: 'addMessage',
          message,
          messageType,
        }
        dispatch(action)
      } catch (e) {
        console.error(e)
      }
    }
  }

  const addMintMessage = () => {
    const validAddress = !!(
      recipientAddress && isValidAddress(recipientAddress)
    )
    if (validAddress) {
      try {
        const message = makeMintMessage('', recipientAddress)
        const messageType = ProposalMessageType.Mint
        const action: ProposalAction = {
          type: 'addMessage',
          message,
          messageType,
        }
        dispatch(action)
      } catch (e) {
        console.error(e)
      }
    }
  }

  const removeMessage = (messageId: string) => {
    const removeMessageAction: ProposalRemoveMessage = {
      type: 'removeMessage',
      id: messageId,
    }
    dispatch(removeMessageAction)
  }

  function handleJsonChanged(json: any) {
    const updateFromJsonAction: ProposalUpdateFromMessage = {
      type: 'updateFromMessage',
      message: json,
    }
    setEditProposalJson(false)
    dispatch(updateFromJsonAction)
  }

  function handleDescriptionChange(newValue: () => string) {
    setValue(newValue)
  }

  function handleDescriptionBlur() {
    setProposalDescription(value)
  }

  // TODO preview mode for the whole proposal
  if (editProposalJson) {
    return (
      <RawEditor
        json={messageForProposal(proposal)}
        onChange={handleJsonChanged}
      ></RawEditor>
    )
  }

  return (
    <div className="flex flex-col w-full flex-row">
      <div className="grid bg-base-100">
        <div className="flex">
          <div className="text-left container mx-auto">
            <h1 className="text-4xl my-8 text-bold">Create Proposal</h1>
            <form
              className="text-left container mx-auto"
              onSubmit={handleSubmit}
            >
              <label className="block text-xl">Title</label>
              <input
                className="input input-bordered rounded box-border px-8 w-full focus:input-primary text-xl"
                name="label"
                onChange={(e) => setProposalTitle(e?.target?.value)}
                readOnly={complete}
                value={proposal.title}
              />
              <label className="block mt-4 text-xl">
                Description{' '}
                <span className="text-sm opacity-60">(Markdown Supported)</span>
              </label>
              <Editor
                className="input input-bordered rounded box-border py-3 px-8 h-full w-full focus:input-primary text-xl"
                onBlur={handleDescriptionBlur}
                onChange={handleDescriptionChange}
                readOnly={complete}
                value={proposal.description}
                dark={themeContext.theme === 'junoDark'}
              />
              <label htmlFor="message-list" className="block mt-4 text-xl">
                Messages
              </label>
              <ul id="message-list">{messages}</ul>
              <br />
              <MessageSelector actions={messageActions}></MessageSelector>
              <br />
              {!complete && (
                <button
                  className={`btn btn-primary text-lg mt-8 ml-auto ${
                    loading ? 'loading' : ''
                  }`}
                  style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
                  type="submit"
                  disabled={loading}
                >
                  Create Proposal
                </button>
              )}
              {error && (
                <div className="mt-8">
                  <LineAlert variant="error" msg={error} />
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
