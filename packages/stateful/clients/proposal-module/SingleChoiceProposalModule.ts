import {
  CwProposalSingleV1Client,
  DaoPreProposeSingleClient,
  DaoProposalSingleV2Client,
} from '@dao-dao/state/contracts'
import {
  cwProposalSingleV1Queries,
  daoProposalSingleV2Queries,
} from '@dao-dao/state/query'
import { Coin, ContractVersion, ProposalModuleBase } from '@dao-dao/types'
import {
  Vote,
  VoteInfo,
} from '@dao-dao/types/contracts/DaoProposalSingle.common'
import {
  ContractName,
  DAO_PROPOSAL_SINGLE_CONTRACT_NAMES,
  SupportedSigningCosmWasmClient,
  findWasmAttributeValue,
} from '@dao-dao/utils'

import { NewProposalData } from '../../proposal-module-adapter/adapters/DaoProposalSingle/types'
import { CwDao } from '../dao/CwDao'

export class SingleChoiceProposalModule extends ProposalModuleBase<
  CwDao,
  NewProposalData,
  VoteInfo,
  Vote
> {
  static contractNames: readonly string[] = DAO_PROPOSAL_SINGLE_CONTRACT_NAMES

  async propose({
    data,
    getSigningClient,
    sender,
    funds,
  }: {
    data: NewProposalData
    getSigningClient: () => Promise<SupportedSigningCosmWasmClient>
    sender: string
    funds?: Coin[]
  }): Promise<{
    proposalNumber: number
    proposalId: string
  }> {
    const client = await getSigningClient()

    let proposalNumber: number
    let isPreProposeApprovalProposal = false

    // V1 does not support pre-propose.
    if (this.version === ContractVersion.V1) {
      const { events } = await new CwProposalSingleV1Client(
        client,
        sender,
        this.address
      ).propose(
        // Type mismatch between Cosmos msgs and Secret Network Cosmos msgs.
        // The contract execution will fail if the messages are invalid, so this
        // is safe. The UI should ensure that the correct messages are used for
        // the given chain anyways.
        data as any,
        undefined,
        undefined,
        funds
      )

      proposalNumber = Number(
        findWasmAttributeValue(events, this.address, 'proposal_id') ?? -1
      )

      // Every other version supports pre-propose.
    } else if (this.prePropose) {
      const { events } = await new DaoPreProposeSingleClient(
        client,
        sender,
        this.prePropose.address
      ).propose({
        msg: {
          // Type mismatch between Cosmos msgs and Secret Network Cosmos msgs.
          // The contract execution will fail if the messages are invalid, so
          // this is safe. The UI should ensure that the co rrect messages are
          // used for the given chain anyways.
          propose: data as any,
        },
      })

      isPreProposeApprovalProposal =
        this.prePropose.contractName === ContractName.PreProposeApprovalSingle
      proposalNumber =
        // pre-propose-approval proposals have a different event
        isPreProposeApprovalProposal
          ? Number(
              findWasmAttributeValue(events, this.prePropose.address, 'id') ??
                -1
            )
          : Number(
              findWasmAttributeValue(events, this.address, 'proposal_id') ?? -1
            )
    } else {
      const { events } = await new DaoProposalSingleV2Client(
        client,
        sender,
        this.address
      ).propose(
        // Type mismatch between Cosmos msgs and Secret Network Cosmos msgs.
        // The contract execution will fail if the messages are invalid, so this
        // is safe. The UI should ensure that the correct messages are used for
        // the given chain anyways.
        data as any,
        undefined,
        undefined,
        funds
      )

      proposalNumber = Number(
        findWasmAttributeValue(events, this.address, 'proposal_id') ?? -1
      )
    }

    if (proposalNumber === -1) {
      throw new Error('Proposal ID not found')
    }

    return {
      proposalNumber,
      // Proposal IDs are the the prefix plus the proposal number. If a
      // pre-propose-approval proposal, an asterisk is inserted in the middle.
      proposalId: `${this.prefix}${
        isPreProposeApprovalProposal ? '*' : ''
      }${proposalNumber}`,
    }
  }

  async vote({
    proposalId,
    vote,
    getSigningClient,
    sender,
  }: {
    proposalId: number
    vote: Vote
    getSigningClient: () => Promise<SupportedSigningCosmWasmClient>
    sender: string
  }): Promise<void> {
    const client = await getSigningClient()

    const Client =
      this.version === ContractVersion.V1
        ? CwProposalSingleV1Client
        : DaoProposalSingleV2Client

    await new Client(client, sender, this.address).vote({
      proposalId,
      vote,
    })
  }

  async execute({
    proposalId,
    getSigningClient,
    sender,
  }: {
    proposalId: number
    getSigningClient: () => Promise<SupportedSigningCosmWasmClient>
    sender: string
  }): Promise<void> {
    const client = await getSigningClient()

    const Client =
      this.version === ContractVersion.V1
        ? CwProposalSingleV1Client
        : DaoProposalSingleV2Client

    await new Client(client, sender, this.address).execute({
      proposalId,
    })
  }

  async close({
    proposalId,
    getSigningClient,
    sender,
  }: {
    proposalId: number
    getSigningClient: () => Promise<SupportedSigningCosmWasmClient>
    sender: string
  }): Promise<void> {
    const client = await getSigningClient()

    const Client =
      this.version === ContractVersion.V1
        ? CwProposalSingleV1Client
        : DaoProposalSingleV2Client

    await new Client(client, sender, this.address).close({
      proposalId,
    })
  }

  async getVote({
    proposalId,
    voter,
  }: {
    proposalId: number
    voter: string
  }): Promise<VoteInfo | null> {
    const query =
      this.info.version === ContractVersion.V1
        ? cwProposalSingleV1Queries.vote
        : daoProposalSingleV2Queries.getVote

    return (
      (
        await this.queryClient.fetchQuery(
          query({
            chainId: this.dao.chainId,
            contractAddress: this.info.address,
            args: {
              proposalId,
              voter,
            },
          })
        )
      ).vote || null
    )
  }
}
