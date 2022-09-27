import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'

import { CwProposalSingleQueryClient } from '@dao-dao/state'
import {
  ProposalResponse,
  Status,
} from '@dao-dao/state/clients/cw-proposal-single'
import {
  GET_PROPOSAL,
  GetProposal,
  GetProposalOperationVariables,
  getGetProposalSubqueryId,
  client as subqueryClient,
} from '@dao-dao/state/subquery'
import { processError } from '@dao-dao/utils'

import {
  CommonProposalInfo,
  IProposalModuleAdapterOptions,
} from '../../../types'

export const makeGetProposalInfo =
  ({ proposalModule, proposalNumber }: IProposalModuleAdapterOptions) =>
  async (
    cosmWasmClient: CosmWasmClient
  ): Promise<CommonProposalInfo | undefined> => {
    const queryClient = new CwProposalSingleQueryClient(
      cosmWasmClient,
      proposalModule.address
    )

    let proposalResponse: ProposalResponse | undefined
    try {
      proposalResponse = await queryClient.proposal({
        proposalId: proposalNumber,
      })
    } catch (err) {
      // If proposal doesn't exist, handle just return undefined instead of
      // throwing an error. Rethrow all other errors.
      if (
        !(err instanceof Error) ||
        !err.message.includes('Proposal not found')
      ) {
        throw err
      }

      console.error(err)
    }

    if (!proposalResponse) {
      return
    }

    const { id, proposal } = proposalResponse

    // Use timestamp if available, or block height otherwise.
    let createdAtEpoch: number | null = null
    try {
      const proposalSubquery = await subqueryClient.query<
        GetProposal,
        GetProposalOperationVariables
      >({
        query: GET_PROPOSAL,
        variables: { id: getGetProposalSubqueryId(proposalModule.address, id) },
      })

      createdAtEpoch = new Date(
        proposalSubquery.data?.proposal?.createdAt
          ? proposalSubquery.data?.proposal?.createdAt
          : (await cosmWasmClient.getBlock(proposal.start_height)).header.time
      ).getTime()
    } catch (err) {
      console.error(processError(err))
    }

    return {
      id: `${proposalModule.prefix}${id}`,
      title: proposal.title,
      description: proposal.description,
      votingOpen: proposal.status === Status.Open,
      expiration: proposal.expiration,
      createdAtEpoch,
      createdByAddress: proposal.proposer,
    }
  }
