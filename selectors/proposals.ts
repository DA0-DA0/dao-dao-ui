import { ProposalResponse } from '@dao-dao/types/contracts/cw3-dao'
import { selectorFamily } from 'recoil'
import { cosmWasmClient } from './cosm'
import { proposalsRequestIdAtom } from 'atoms/proposals'

export const onChainProposalsSelector = selectorFamily<ProposalResponse[], any>(
  {
    key: 'onChainProposals',
    get:
      ({
        contractAddress,
        startBefore,
      }: {
        contractAddress: string
        startBefore: number
      }) =>
      async ({ get }) => {
        const requestId = get(proposalsRequestIdAtom)
        console.log(`fetching proposals, requestId: ${requestId}`)
        const client = get(cosmWasmClient)
        const { proposals } = await client.queryContractSmart(contractAddress, {
          reverse_proposals: {
            ...(startBefore && { start_before: startBefore }),
            limit: 10,
          },
        })
        return proposals
      },
  }
)
