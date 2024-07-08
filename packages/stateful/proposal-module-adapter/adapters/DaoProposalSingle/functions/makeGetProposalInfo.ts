import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'

import {
  CwProposalSingleV1QueryClient,
  DaoPreProposeApprovalSingleQueryClient,
  DaoProposalSingleV2QueryClient,
} from '@dao-dao/state/contracts'
import { queryIndexer } from '@dao-dao/state/indexer'
import {
  CommonProposalInfo,
  ContractVersion,
  ContractVersionInfo,
  IProposalModuleAdapterOptions,
  InfoResponse,
} from '@dao-dao/types'
import { ProposalResponse as ProposalV1Response } from '@dao-dao/types/contracts/CwProposalSingle.v1'
import { Proposal as DaoPreProposeApprovalSingleProposal } from '@dao-dao/types/contracts/DaoPreProposeApprovalSingle'
import { ProposalResponse as ProposalV2Response } from '@dao-dao/types/contracts/DaoProposalSingle.v2'
import {
  getCosmWasmClientForChainId,
  parseContractVersion,
} from '@dao-dao/utils'

export const makeGetProposalInfo =
  ({
    proposalModule,
    proposalNumber,
    isPreProposeApprovalProposal,
    chain: { chain_id: chainId },
  }: IProposalModuleAdapterOptions) =>
  async (): Promise<CommonProposalInfo | undefined> => {
    // Lazily connect if necessary.
    let _cosmWasmClient: CosmWasmClient
    const getCosmWasmClient = async () => {
      if (!_cosmWasmClient) {
        _cosmWasmClient = await getCosmWasmClientForChainId(chainId)
      }
      return _cosmWasmClient
    }

    // Get pre-propose approval proposal from pre propose module.
    if (isPreProposeApprovalProposal && proposalModule.prePropose) {
      let proposal: DaoPreProposeApprovalSingleProposal | undefined
      // Try indexer first.
      try {
        proposal = await queryIndexer({
          type: 'contract',
          address: proposalModule.prePropose.address,
          formula: 'daoPreProposeApprovalSingle/proposal',
          args: {
            id: proposalNumber,
          },
          chainId,
        })
      } catch (err) {
        // Ignore error.
        console.error(err)
      }
      // If indexer fails, fallback to querying chain.
      if (!proposal) {
        const cosmWasmClient = await getCosmWasmClient()
        const queryClient = new DaoPreProposeApprovalSingleQueryClient(
          cosmWasmClient,
          proposalModule.prePropose.address
        )

        proposal = await queryClient.queryExtension({
          msg: {
            proposal: {
              id: proposalNumber,
            },
          },
        })
      }

      if (!proposal) {
        return
      }

      return {
        id: `${proposalModule.prefix}*${proposal.approval_id}`,
        title: proposal.msg.title,
        description: proposal.msg.description,
        expiration: null,
        createdAtEpoch: proposal.createdAt
          ? new Date(proposal.createdAt).getTime()
          : null,
        createdByAddress: proposal.proposer,
      }
    }

    let proposalResponse: ProposalV1Response | ProposalV2Response | undefined
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
          formula: 'daoProposalSingle/proposal',
          args: {
            id: proposalNumber,
          },
          chainId,
        })
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
      const createdAt = await queryIndexer<string>({
        type: 'contract',
        address: proposalModule.address,
        formula: 'daoProposalSingle/proposalCreatedAt',
        args: {
          id,
        },
        chainId,
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
