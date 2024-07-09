import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'

import { DaoProposalMultipleQueryClient, queryIndexer } from '@dao-dao/state'
import {
  CommonProposalInfo,
  ContractVersionInfo,
  IProposalModuleAdapterOptions,
  InfoResponse,
} from '@dao-dao/types'
import { ProposalResponse } from '@dao-dao/types/contracts/DaoProposalMultiple'
import { getCosmWasmClientForChainId } from '@dao-dao/utils'

export const makeGetProposalInfo =
  ({
    chain: { chain_id: chainId },
    proposalModule,
    proposalNumber,
    isPreProposeApprovalProposal,
  }: IProposalModuleAdapterOptions) =>
  async (): Promise<CommonProposalInfo | undefined> => {
    // Multiple choice does not support pre-propose-approval right now.
    if (isPreProposeApprovalProposal) {
      return
    }

    // Lazily connect if necessary.
    let _cosmWasmClient: CosmWasmClient
    const getCosmWasmClient = async () => {
      if (!_cosmWasmClient) {
        _cosmWasmClient = await getCosmWasmClientForChainId(chainId)
      }
      return _cosmWasmClient
    }

    let proposalResponse: ProposalResponse | undefined
    try {
      let info: ContractVersionInfo | undefined
      // Try indexer first.
      try {
        info = await queryIndexer<ContractVersionInfo>({
          type: 'contract',
          address: proposalModule.address,
          formula: 'info',
          chainId,
        })
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
        proposalResponse = await queryIndexer({
          type: 'contract',
          address: proposalModule.address,
          formula: 'daoProposalMultiple/proposal',
          chainId,
          args: {
            id: proposalNumber,
          },
        })
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
      const createdAt = await queryIndexer<string>({
        type: 'contract',
        address: proposalModule.address,
        formula: 'daoProposalMultiple/proposalCreatedAt',
        chainId,
        args: {
          id,
        },
      })
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
      try {
        createdAtEpoch = new Date(
          (
            await (await getCosmWasmClient()).getBlock(proposal.start_height)
          ).header.time
        ).getTime()
      } catch (err) {
        // Ignore error.
        console.error(err)
      }
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
