import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { useEffect, useState } from 'react'
import { ProposalListResponse, ProposalResponse, Timestamp } from 'types/cw3'
import { useSigningClient } from 'contexts/cosmwasm'

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
