import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { Proposal, ProposalResponse, CosmosMsgFor_Empty } from '@dao-dao/types/contracts/cw3-dao'
import { activeStatusAtom, errorAtom, loadingAtom, Status, transactionHashAtom } from 'atoms/status'
import { memoForProposal } from 'models/proposal/proposal'
import { TransactionInterface_UNSTABLE } from 'recoil'
import { ContractProposalMap, ProposalMap, ProposalMapItem } from 'types/proposals'
import { contractProposalMapAtom, draftProposalItem, nextDraftProposalIdAtom } from 'atoms/proposals'
import { defaultExecuteFee } from './fee'
import { NextRouter } from 'next/router'

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

export const createDraftProposalTransaction =
  (contractAddress: string, draftProposals: ProposalMap) =>
  ({ get, set }: TransactionInterface_UNSTABLE) => {
    const contractProposalMap = get(contractProposalMapAtom)
    const setContractProposalMap = (contractProposalMap: ContractProposalMap) =>
      set(contractProposalMapAtom, contractProposalMap)
    const nextDraftProposalId = get(nextDraftProposalIdAtom)
    const incrementDraftProposalId = () =>
      set(nextDraftProposalIdAtom, nextDraftProposalId + 1)

    return (
      contractAddress: string,
      {
        draftProposal,
      }: {
        draftProposal: Proposal
      }
    ) => {
      setContractProposalMap({
        ...contractProposalMap,
        [contractAddress]: {
          ...draftProposals,
          [nextDraftProposalId + '']: draftProposalItem(
            draftProposal,
            nextDraftProposalId
          ),
        },
      })
      incrementDraftProposalId()
    }
  }

  export const createProposalTransaction =
  ({
    walletAddress,
    signingClient,
    contractAddress,
    draftProposals,
    router
  }: {
    walletAddress: string
    signingClient: SigningCosmWasmClient
    contractAddress: string
    draftProposals: ProposalMap,
    router: NextRouter
  }) =>
  ({ get, set }: TransactionInterface_UNSTABLE) => {
    const setLoading = (loading: boolean) => set(loadingAtom, loading)
    const setError = (message: string) => set(errorAtom, message)
    const setTransactionHash = (hash: string) => set(transactionHashAtom, hash)
    const setActiveStatus = (status: Status) => set(activeStatusAtom, status)
    const contractProposalMap = get(contractProposalMapAtom)
    const setContractProposalMap = (contractProposalMap: ContractProposalMap) =>
      set(contractProposalMapAtom, contractProposalMap)

    const deleteDraftProposal = (proposalId: number) => {
      // delete the draft
      console.log(`deleteDraftProposal ${contractAddress}:${proposalId}`)
      const updatedProposals = { ...draftProposals }
      delete updatedProposals[proposalId + '']
      const updatedMap = {
        ...contractProposalMap,
        [contractAddress]: updatedProposals,
      }
      setContractProposalMap(updatedMap)
    }

    return async (proposalId: number, propose: Proposal) => {
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
          setTransactionHash(response.transactionHash)
          deleteDraftProposal(proposalId)
          const [{ events }] = response.logs
          const [wasm] = events.filter((e: any) => e.type === 'wasm')
          const [{ value }] = wasm.attributes.filter(
            (w: any) => w.key === 'proposal_id'
          )
          const title = `Saved Proposal "${propose.title}"`
          setActiveStatus({ status: 'success', title })
          const initialMessage = `Saved Proposal "${propose.title}"`
          const paramStr = `initialMessage=${initialMessage}&initialMessageStatus=success`
          router.push(`/dao/${contractAddress}/proposals/${value}?${paramStr}`) 
        }
      } catch (e: any) {
        console.error(
          `Error submitting proposal ${JSON.stringify(propose, undefined, 2)}`
        )
        console.dir(e)
        console.error(e.message)
        setLoading(false)
        setError(e.message)
      }
    }
  }

  export const createProposal =
  ({
    setLoading,
    setError,
    signingClient,
    walletAddress,
    contractAddress,
    router,
    setTransactionHash,
  }: {
    setLoading: (loading: boolean) => void
    setError: (message: string) => void
    signingClient: SigningCosmWasmClient
    walletAddress: string
    contractAddress: string
    router: NextRouter
    setTransactionHash: (hash: string) => void
  }) =>
  async (proposal: Proposal) => {
    setLoading(true)
    setError('')
    const memo = memoForProposal(proposal as any)
    try {
      const response = await signingClient?.execute(
        walletAddress,
        contractAddress,
        { propose: proposal },
        defaultExecuteFee,
        memo
      )
      setLoading(false)
      if (response) {
        setTransactionHash(response.transactionHash)
        const [{ events }] = response.logs
        const [wasm] = events.filter((e: any) => e.type === 'wasm')
        const [{ value }] = wasm.attributes.filter(
          (w: any) => w.key === 'proposal_id'
        )
        const initialMessage = `Saved Proposal "${proposal.title}"`
        const paramStr = `initialMessage=${initialMessage}&initialMessageStatus=success`

        // router.push(`/dao/${contractAddress}/proposals/${value}?${paramStr}`)
      }
    } catch (e: any) {
      console.error(
        `Error submitting proposal ${JSON.stringify(proposal, undefined, 2)}`
      )
      console.dir(e)
      console.error(e.message)
      setLoading(false)
      setError(e.message)
    }
  }

export const updateProposalMessage =
  ({
    proposalMapItem,
    setProposalMapItem,
  }: {
    proposalMapItem: any
    setProposalMapItem: any
  }) =>
  (messageIndex: number, msg: CosmosMsgFor_Empty) => {}
