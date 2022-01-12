import React, { useEffect, useReducer, useState } from 'react'
import { CosmosMsgFor_Empty } from '@dao-dao/types/contracts/cw3-dao'
import { useCw20IncreaseAllowance } from 'hooks/cw20'
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
import { useForm } from 'react-hook-form'
import { makeMintMessage, makeSpendMessage } from 'util/messagehelpers'
import CustomEditor from './CustomEditor'
import InputField, { makeFieldErrorMessage } from './InputField'
import MessageSelector from './MessageSelector'
import MintEditor from './MintEditor'
import RawEditor from './RawEditor'
import SpendEditor from './SpendEditor'
import { PaperClipIcon, XIcon } from '@heroicons/react/outline'
import { useRecoilValue } from 'recoil'
import { daoSelector } from 'selectors/daos'
import { sigSelector } from 'selectors/multisigs'
import {
  contractConfigSelector,
  ContractConfigWrapper,
} from 'util/contractConfigWrapper'

export function ProposalEditor({
  initialProposal,
  loading,
  onProposal,
  contractAddress,
  recipientAddress,
  multisig,
}: {
  initialProposal?: Proposal
  loading?: boolean
  onProposal: (
    proposal: Proposal,
    contractAddress: string,
    govTokenAddress?: string
  ) => void
  contractAddress: string
  recipientAddress: string
  multisig?: boolean
}) {
  const [proposal, dispatch] = useReducer(ProposalReducer, {
    ...(initialProposal || EmptyProposal),
  })

  const { execute: cw20ExecuteIncreaseAllowance } = useCw20IncreaseAllowance()

  const [description, setDescription] = useState('')
  const [editProposalJson, setEditProposalJson] = useState(false)
  const [proposalDescriptionErrorMessage, setProposalDescriptionErrorMessage] =
    useState('')
  const [deposit, setDeposit] = useState('0')
  const [tokenAddress, setTokenAddress] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  let messageActions = [
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
  ]

  // If DAO
  if (!multisig) {
    // Add DAO specific actions
    messageActions.push({
      label: 'Mint',
      id: 'mint',
      execute: () => addMessage(ProposalMessageType.Mint),
      href: '#',
      isEnabled: () => true,
    })
  }

  const contractConfig = new ContractConfigWrapper(
    useRecoilValue(
      contractConfigSelector({ contractAddress, multisig: !!multisig })
    )
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

  async function onSubmit(_formData: any) {
    // If the contract needs a deposit, increase allowance
    if (deposit && deposit !== '0') {
      await cw20ExecuteIncreaseAllowance(tokenAddress, deposit, contractAddress)
    }
    // We don't actually care about what the form processor returned in this
    // case, just that the proposal is filled out correctly, which if
    // the submit method gets called it will be.
    if (isProposalValid(proposal)) {
      onProposal(proposal, contractAddress, contractConfig?.gov_token)
    }
  }

  function setProposalTitle(title: string) {
    dispatch({ type: 'setTitle', title })
  }

  function setProposalDescription(description: string) {
    dispatch({ type: 'setDescription', description })
    if (description) {
      setProposalDescriptionErrorMessage('')
    } else {
      setProposalDescriptionErrorMessage('Proposal description required')
    }
  }

  let messages = proposalMessages(proposal).map((mapEntry) => {
    let modeEditor = null
    let label = ''
    switch (mapEntry?.messageType) {
      case ProposalMessageType.Spend:
        modeEditor = (
          <SpendEditor
            dispatch={dispatch}
            spendMsg={mapEntry}
            contractAddress={contractAddress}
          ></SpendEditor>
        )
        label = 'Spend'
        break
      case ProposalMessageType.Mint: {
        modeEditor = (
          <MintEditor
            dispatch={dispatch}
            mintMsg={mapEntry}
            denom={govTokenSymbol}
          ></MintEditor>
        )
        label = 'Mint'
        break
      }
      case ProposalMessageType.Custom:
        modeEditor = <CustomEditor dispatch={dispatch} customMsg={mapEntry} />
        label = 'Custom'
        break
    }

    return (
      <li
        className="my-4 px-4 py-2 border-l-2 rounded-lg border-accent"
        key={mapEntry.id}
        onClick={() =>
          dispatch({
            type: 'setActiveMessage',
            id: mapEntry.id,
          })
        }
      >
        <div className="flex justify-between">
          <h5 className="ml-1 mb-1">{label}</h5>
          <button
            onClick={() => removeMessage(mapEntry.id)}
            title="Delete message"
            className="btn btn-circle btn-xs bg-primary-content border-none text-neutral hover:bg-base-200"
          >
            <XIcon />
          </button>
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

  const addMintMessage = () => {
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
    let val = newValue()
    if (val.trim() == '\\') {
      val = ''
    }
    setDescription(val)
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

  const fieldErrorMessage = makeFieldErrorMessage(errors)

  return (
    <div className="flex flex-col w-full flex-row">
      <div className="grid mt-3">
        <div className="flex">
          <div className="text-left container mx-auto">
            <form
              className="text-left container mx-auto"
              onSubmit={handleSubmit<any>(onSubmit)}
            >
              <h2 className="text-lg">
                <PaperClipIcon className="inline w-5 h-5 mr-2 mb-1" />
                Basic config
              </h2>
              <div className="px-3">
                <InputField
                  fieldName="label"
                  label="Title"
                  toolTip="The title of the Proposal"
                  errorMessage="Proposal title required"
                  register={register}
                  fieldErrorMessage={fieldErrorMessage}
                  onChange={(e) => setProposalTitle(e?.target?.value)}
                />
                <InputField
                  fieldName="description"
                  errorMessage={proposalDescriptionErrorMessage}
                  fieldErrorMessage={fieldErrorMessage}
                  register={register}
                  label="Description"
                  toolTip="Your proposal description"
                  type="textarea"
                  onChange={(e) =>
                    handleDescriptionChange(() => e.target.value)
                  }
                  defaultValue={proposal.description}
                />
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
                onClick={(_e) => {
                  setProposalDescription(description)
                }}
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
