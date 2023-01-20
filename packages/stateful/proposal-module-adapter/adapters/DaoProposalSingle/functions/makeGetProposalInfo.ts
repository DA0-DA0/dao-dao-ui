import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'

import { queryIndexer } from '@dao-dao/state/indexer'
import {
  CommonProposalInfo,
  ContractVersion,
  ContractVersionInfo,
  IProposalModuleAdapterOptions,
  InfoResponse,
} from '@dao-dao/types'
import { ProposalResponse as ProposalV1Response } from '@dao-dao/types/contracts/CwProposalSingle.v1'
import { ProposalResponse as ProposalV2Response } from '@dao-dao/types/contracts/DaoProposalSingle.v2'
import {
  SITE_URL,
  cosmWasmClientRouter,
  getRpcForChainId,
  parseContractVersion,
} from '@dao-dao/utils'

import { CwProposalSingleV1QueryClient as CwProposalSingleV1QueryClient } from '../contracts/CwProposalSingle.v1.client'
import { DaoProposalSingleV2QueryClient as DaoProposalSingleV2QueryClient } from '../contracts/DaoProposalSingle.v2.client'

export const makeGetProposalInfo =
  ({
    proposalModule,
    proposalNumber,
    chainId,
  }: IProposalModuleAdapterOptions) =>
  async (): Promise<CommonProposalInfo | undefined> => {
    // Lazily connect if necessary.
    let _cosmWasmClient: CosmWasmClient
    const getCosmWasmClient = async () => {
      if (!_cosmWasmClient) {
        _cosmWasmClient = await cosmWasmClientRouter.connect(
          getRpcForChainId(chainId)
        )
      }
      return _cosmWasmClient
    }

    let proposalResponse: ProposalV1Response | ProposalV2Response | undefined
    try {
      let info: ContractVersionInfo | undefined
      // Try indexer first.
      try {
        info = await queryIndexer<ContractVersionInfo>(
          'contract',
          proposalModule.address,
          'info',
          {
            // Needed for server-side queries.
            baseUrl: SITE_URL,
          }
        )
      } catch (err) {
        // Ignore error.
        console.error(err)
      }
      // If indexer fails, fallback to querying chain.
      if (!info) {
        info = (
          (await (
            await getCosmWasmClient()
          ).queryContractSmart(proposalModule.address, {
            info: {},
          })) as InfoResponse
        ).info
      }

      // Try indexer first.
      try {
        proposalResponse = await queryIndexer(
          'contract',
          proposalModule.address,
          'daoProposalSingle/proposal',
          {
            args: {
              id: proposalNumber,
            },
            // Needed for server-side queries.
            baseUrl: SITE_URL,
          }
        )
      } catch (err) {
        // Ignore error.
        console.error(err)
      }
      // If indexer fails, fallback to querying chain.
      if (!proposalResponse) {
        const cosmWasmClient = await getCosmWasmClient()
        const version = parseContractVersion(info.version)
        const queryClient =
          version === ContractVersion.V1
            ? new CwProposalSingleV1QueryClient(
                cosmWasmClient,
                proposalModule.address
              )
            : new DaoProposalSingleV2QueryClient(
                cosmWasmClient,
                proposalModule.address
              )

        proposalResponse = await queryClient.proposal({
          proposalId: proposalNumber,
        })
      }
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

    // Try indexer first.
    let createdAtEpoch: number | null = null
    try {
      const createdAt = await queryIndexer<string>(
        'contract',
        proposalModule.address,
        'daoProposalSingle/proposalCreatedAt',
        {
          args: {
            id,
          },
          // Needed for server-side queries.
          baseUrl: SITE_URL,
        }
      )
      // If indexer returned a value, assume it's a date.
      if (createdAt) {
        createdAtEpoch = new Date(createdAt).getTime()
      }
    } catch (err) {
      // Ignore error.
      console.error(err)
    }
    // If indexer fails, fallback to querying block info from chain.
    if (!createdAtEpoch) {
      createdAtEpoch = new Date(
        (
          await (await getCosmWasmClient()).getBlock(proposal.start_height)
        ).header.time
      ).getTime()
    }

    return {
      id: `${proposalModule.prefix}${id}`,
      title: proposal.title,
      description: proposal.description,
      expiration: proposal.expiration,
      createdAtEpoch,
      createdByAddress: proposal.proposer,
    }
  }
