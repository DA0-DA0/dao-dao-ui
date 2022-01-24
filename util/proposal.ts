import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { Proposal, ProposalResponse } from '@dao-dao/types/contracts/cw3-dao'
import {
  contractProposalMapAtom,
  nextDraftProposalIdAtom,
} from 'atoms/proposals'
import {
  activeStatusAtom,
  errorAtom,
  loadingAtom,
  Status,
  transactionHashAtom,
} from 'atoms/status'
import {
  EmptyProposalResponse,
  EmptyThresholdResponse,
  memoForProposal,
} from 'models/proposal/proposal'
import { NextRouter } from 'next/router'
import { CallbackInterface, TransactionInterface_UNSTABLE } from 'recoil'
import { draftProposalsSelector } from 'selectors/proposals'
import {
  ContractProposalMap,
  ExtendedProposalResponse,
  ProposalMap,
  ProposalMapItem,
} from 'types/proposals'
import { defaultExecuteFee } from './fee'

// Prefix used in IDs for draft proposals
const DRAFT_PROPOSAL_PREFFIX = 'draft:'

export function isProposal(
  proposal: Proposal | ProposalResponse | ProposalMapItem | undefined
): proposal is Proposal {
  if (!proposal) {
    return false
  }
  if ((proposal as ProposalMapItem)?.draft === false) {
    return false
  }
  return (proposal as Proposal).proposer !== undefined
}

export function draftProposalKey(proposalId: number): string {
  return `${DRAFT_PROPOSAL_PREFFIX}${proposalId}`
}

// Convenience function to create a draft proposal entry
export function draftProposalItem(
  proposal: Proposal,
  id: string
): ProposalMapItem {
  return {
    proposal,
    id,
    draft: true,
  }
}

export function isDraftProposalKey(proposalKey: string): boolean {
  return proposalKey.startsWith(DRAFT_PROPOSAL_PREFFIX)
}

export function draftProposalKeyNumber(proposalKey: string): number {
  if (isDraftProposalKey(proposalKey)) {
    const str = proposalKey.substring(
      proposalKey.indexOf(DRAFT_PROPOSAL_PREFFIX)
    )
    try {
      const num = parseInt(str)
      return num
    } catch (e) {
      console.error(e)
    }
  }
  return -1
}

export const createDraftProposalTransaction =
  (contractAddress: string, draftProposals: ProposalMap) =>
  ({ get, set }: TransactionInterface_UNSTABLE) => {
    const contractProposalMap = get(contractProposalMapAtom)
    const setContractProposalMap = (
      contractProposalMap: ContractProposalMap
    ) => {
      set(contractProposalMapAtom, contractProposalMap)
    }
    const nextDraftProposalId = get(nextDraftProposalIdAtom)
    const incrementDraftProposalId = () =>
      set(nextDraftProposalIdAtom, nextDraftProposalId + 1)

    return ({ draftProposal }: { draftProposal: Proposal }) => {
      const proposalKey = draftProposalKey(nextDraftProposalId)
      setContractProposalMap({
        ...contractProposalMap,
        [contractAddress]: {
          ...draftProposals,
          [proposalKey]: draftProposalItem(draftProposal, proposalKey),
        },
      })
      incrementDraftProposalId()
    }
  }

export const deleteDraftProposal = (
  draftProposals: ProposalMap,
  proposalId: string
) => {
  const updatedProposals = { ...draftProposals }
  delete updatedProposals[proposalId + '']
  return updatedProposals
}

export const deleteDraftProposalTransaction =
  ({
    contractAddress,
    proposalId,
  }: {
    contractAddress: string
    proposalId: string
  }) =>
  ({ get, set }: TransactionInterface_UNSTABLE) => {
    const draftProposals = get(draftProposalsSelector(contractAddress))

    return () => {
      const updatedProposals = { ...draftProposals }
      delete updatedProposals[proposalId + '']
      set(draftProposalsSelector(contractAddress), updatedProposals)
    }
  }

export const createProposalCallback =
  ({
    walletAddress,
    signingClient,
    contractAddress,
    draftProposals,
    router,
    resetProposals,
    multisig,
  }: {
    walletAddress: string
    signingClient: SigningCosmWasmClient
    contractAddress: string
    draftProposals: ProposalMap
    router: NextRouter
    resetProposals: any
    multisig: boolean
  }) =>
  ({ set }: CallbackInterface) => {
    const setLoading = (loading: boolean) => set(loadingAtom, loading)
    const setError = (message: string) => set(errorAtom, message)
    const setTransactionHash = (hash: string) => set(transactionHashAtom, hash)
    const setActiveStatus = (status: Status) => set(activeStatusAtom, status)
    const setDraftProposals = (draftProposals: ProposalMap) =>
      set(draftProposalsSelector(contractAddress), draftProposals)

    const deleteDraftProposal = (proposalId: string) => {
      const updatedProposals = { ...draftProposals }
      delete updatedProposals[proposalId + '']
      setDraftProposals(updatedProposals)
    }

    return async (proposalId: string, propose: Proposal) => {
      setLoading(true)
      setError('')
      const memo = memoForProposal(propose as any)
      try {
        const response = await signingClient?.execute(
          walletAddress,
          contractAddress,
          { propose },
          defaultExecuteFee,
          memo
        )
        setLoading(false)
        if (response) {
          deleteDraftProposal(proposalId)
          setTransactionHash(response.transactionHash)
          const [{ events }] = response.logs
          const [wasm] = events.filter((e: any) => e.type === 'wasm')
          const [{ value }] = wasm.attributes.filter(
            (w: any) => w.key === 'proposal_id'
          )
          const title = `Saved Proposal "${propose.title}"`
          setActiveStatus({ status: 'success', title })
          const initialMessage = `Saved Proposal "${propose.title}"`
          const paramStr = `initialMessage=${initialMessage}&initialMessageStatus=success`
          resetProposals()
          const route = `${
            multisig ? '/multisig' : '/dao'
          }/${contractAddress}/proposals/${value}?${paramStr}`
          router.push(route)
        }
      } catch (e: any) {
        console.error(
          `Error submitting proposal ${JSON.stringify(propose, undefined, 2)}`
        )
        console.dir(e)
        console.error(e.message)
        setLoading(false)
        setError(e.message)
        throw e
      }
    }
  }

export const draftProposalToExtendedResponse = (draft: ProposalMapItem) => {
  const proposalResponse: ExtendedProposalResponse = {
    ...EmptyProposalResponse,
    ...draft.proposal,
    status: 'draft' as any,
    draftId: draft.id,
    threshold: { ...EmptyThresholdResponse },
    total_weight: 0,
  }
  return proposalResponse
}

export const draftProposalsToExtendedResponses = (
  draftProposals: ProposalMap
) => {
  return draftProposals
    ? Object.values(draftProposals).map((draft) =>
        draftProposalToExtendedResponse(draft)
      )
    : []
}
