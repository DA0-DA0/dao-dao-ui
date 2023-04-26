import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'

import { queryIndexer } from '@dao-dao/state/indexer'
import {
  CommonProposalInfo,
  ContractVersionInfo,
  IProposalModuleAdapterOptions,
  InfoResponse,
} from '@dao-dao/types'
import { ProposalResponse } from '@dao-dao/types/contracts/DaoProposalMultiple'
import { cosmWasmClientRouter, getRpcForChainId } from '@dao-dao/utils'

import { DaoProposalMultipleQueryClient } from '../contracts/DaoProposalMultiple.client'

export const makeGetProposalInfo =
  ({
    chain: { chain_id: chainId },
    proposalModule,
    proposalNumber,
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

    let proposalResponse: ProposalResponse | undefined
    try {
      let info: ContractVersionInfo | undefined
      // Try indexer first.
      try {
        info = await queryIndexer<ContractVersionInfo>(
          'contract',
          proposalModule.address,
          'info'
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
          'daoProposalMultiple/proposal',
          {
            args: {
              id: proposalNumber,
            },
          }
        )
      } catch (err) {
        // Ignore error.
        console.error(err)
      }
      // If indexer fails, fallback to querying chain.
      if (!proposalResponse) {
        const cosmWasmClient = await getCosmWasmClient()
        const queryClient = new DaoProposalMultipleQueryClient(
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
        'daoProposalMultiple/proposalCreatedAt',
        {
          args: {
            id,
          },
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
