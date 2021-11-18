import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { useEffect, useState } from 'react'
import { ProposalListResponse, ProposalResponse, Timestamp } from 'types/cw3'
import { useSigningClient } from 'contexts/cosmwasm'
import { memoForProposal, Proposal } from 'models/proposal/proposal'
import { messageForProposal } from 'models/proposal/proposalSelectors'
import { defaultExecuteFee } from 'util/fee'

export function useProposals(contractAddress: string) {
  const { walletAddress, signingClient } = useSigningClient()
  const [proposals, setProposals] = useState<ProposalResponse[]>([])
  const [hideLoadMore, setHideLoadMore] = useState(false)
  const [loading, setLoading] = useState(false)
  const [startBefore, setStartBefore] = useState<number | null>(null)

  useEffect(() => {
    if (walletAddress.length === 0 || !signingClient) {
      setProposals([])
      setHideLoadMore(false)
      return
    }

    setLoading(true)
    async function sign(signingClient: SigningCosmWasmClient) {
      try {
        const response: ProposalListResponse =
          await signingClient.queryContractSmart(contractAddress, {
            reverse_proposals: {
              ...(startBefore && { start_before: startBefore }),
              limit: 10,
            },
          })
        setLoading(false)
        if (response.proposals.length < 10) {
          setHideLoadMore(true)
        }
        setProposals((p) => p.concat(response.proposals))
      } catch (err) {
        setLoading(false)
      }
    }
    sign(signingClient)
  }, [walletAddress, signingClient, startBefore])
  return { proposals, hideLoadMore, loading, setStartBefore }
}

export function useCreateProposal(contractAddress: string) {
  const { walletAddress, signingClient } = useSigningClient()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [proposalID, setProposalID] = useState('')

  const execute = async (proposal: Proposal) => {
    setLoading(true)
    setError('')

    const propose = messageForProposal(proposal)
    const memo = memoForProposal(proposal)

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
        // setTransactionHash(response.transactionHash)
        const [{ events }] = response.logs
        const [wasm] = events.filter((e) => e.type === 'wasm')
        const [{ value }] = wasm.attributes.filter(
          (attr) => attr.key === 'proposal_id'
        )
        setProposalID(value)
        return response
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

  return { walletAddress, loading, error, proposalID, execute }
}
