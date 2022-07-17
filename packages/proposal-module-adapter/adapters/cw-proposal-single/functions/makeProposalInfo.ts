import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'

import { CwProposalSingleQueryClient } from '@dao-dao/state'
import { ProposalResponse } from '@dao-dao/state/clients/cw-proposal-single'

import {
  CommonProposalInfo,
  IProposalModuleAdapterOptions,
} from '../../../types'

export const makeProposalInfo =
  ({ proposalModuleAddress, proposalNumber }: IProposalModuleAdapterOptions) =>
  async (
    cosmWasmClient: CosmWasmClient
  ): Promise<CommonProposalInfo | undefined> => {
    const queryClient = new CwProposalSingleQueryClient(
      cosmWasmClient,
      proposalModuleAddress
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

    return (
      proposalResponse && {
        id: proposalResponse.id,
        title: proposalResponse.proposal.title,
      }
    )
  }
