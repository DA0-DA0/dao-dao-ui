import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'

import { CwProposalSingleQueryClient } from '@dao-dao/state'
import {
  ProposalResponse,
  Status,
} from '@dao-dao/state/clients/cw-proposal-single'
import { processError } from '@dao-dao/utils'

import {
  CommonProposalInfo,
  IProposalModuleAdapterOptions,
} from '../../../types'

export const makeGetProposalInfo =
  ({
    proposalModule: { address, prefix },
    proposalNumber,
  }: IProposalModuleAdapterOptions) =>
  async (
    cosmWasmClient: CosmWasmClient
  ): Promise<CommonProposalInfo | undefined> => {
    const queryClient = new CwProposalSingleQueryClient(cosmWasmClient, address)

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
      createdAtEpoch = new Date(
        proposal.created
          ? proposal.created
          : (await cosmWasmClient.getBlock(proposal.start_height)).header.time
      ).getTime()
    } catch (err) {
      console.error(processError(err))
    }

    return {
      id: `${prefix}${id}`,
      title: proposal.title,
      description: proposal.description,
      creationHeight: proposal.start_height,
      votingOpen: proposal.status === Status.Open,
      expiration: proposal.expiration,
      createdAtEpoch,
      createdByAddress: proposal.proposer,
    }
  }
