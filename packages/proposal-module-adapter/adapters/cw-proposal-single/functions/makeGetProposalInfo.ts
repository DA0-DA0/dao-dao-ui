import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'

import {
  GET_PROPOSAL,
  GetProposal,
  GetProposalOperationVariables,
  getGetProposalSubqueryId,
  client as subqueryClient,
} from '@dao-dao/state/subquery'
import { ContractVersion } from '@dao-dao/tstypes'
import { Status } from '@dao-dao/tstypes/contracts/CwProposalSingle.common'
import { ProposalResponse as ProposalV1Response } from '@dao-dao/tstypes/contracts/CwProposalSingle.v1'
import {
  InfoResponse,
  ProposalResponse as ProposalV2Response,
} from '@dao-dao/tstypes/contracts/CwProposalSingle.v2'
import { parseContractVersion, processError } from '@dao-dao/utils'

import {
  CommonProposalInfo,
  IProposalModuleAdapterOptions,
} from '../../../types'
import { CwProposalSingleQueryClient as CwProposalSingleV1QueryClient } from '../contracts/CwProposalSingle.v1.client'
import { CwProposalSingleQueryClient as CwProposalSingleV2QueryClient } from '../contracts/CwProposalSingle.v2.client'

export const makeGetProposalInfo =
  ({ proposalModule, proposalNumber }: IProposalModuleAdapterOptions) =>
  async (
    cosmWasmClient: CosmWasmClient
  ): Promise<CommonProposalInfo | undefined> => {
    let proposalResponse: ProposalV1Response | ProposalV2Response | undefined
    try {
      // All info queries are the same.
      const { info }: InfoResponse = await cosmWasmClient.queryContractSmart(
        proposalModule.address,
        {
          info: {},
        }
      )
      const version = parseContractVersion(info.version)

      const queryClient =
        version === ContractVersion.V0_1_0
          ? new CwProposalSingleV1QueryClient(
              cosmWasmClient,
              proposalModule.address
            )
          : new CwProposalSingleV2QueryClient(
              cosmWasmClient,
              proposalModule.address
            )

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
