import {
  SecretDaoPreProposeMultipleClient,
  SecretDaoProposalMultipleClient,
} from '@dao-dao/state/contracts'
import { secretDaoProposalMultipleQueries } from '@dao-dao/state/query'
import { Coin, ProposalModuleBase } from '@dao-dao/types'
import { VoteInfo } from '@dao-dao/types/contracts/SecretDaoProposalMultiple'
import {
  DAO_PROPOSAL_MULTIPLE_CONTRACT_NAMES,
  SupportedSigningCosmWasmClient,
  findWasmAttributeValue,
} from '@dao-dao/utils'

import { NewProposalData } from '../../proposal-module-adapter/adapters/DaoProposalMultiple/types'
import { SecretCwDao } from '../dao/SecretCwDao'

export class SecretMultipleChoiceProposalModule extends ProposalModuleBase<
  SecretCwDao,
  NewProposalData,
  VoteInfo
> {
  static contractNames: readonly string[] = DAO_PROPOSAL_MULTIPLE_CONTRACT_NAMES

  async getVote(
    proposalId: number,
    address: string,
    /**
     * Whether or not to prompt the wallet for a permit. If true,
     * `dao.registerOfflineSignerAminoGetter` must be called first.
     *
     * Defaults to false.
     */
    prompt = false
  ): Promise<VoteInfo | null> {
    const permit = prompt
      ? await this.dao.getPermit(address)
      : this.dao.getExistingPermit(address)

    if (!permit) {
      throw new Error('No permit found')
    }

    return (
      (
        await this.queryClient.fetchQuery(
          secretDaoProposalMultipleQueries.getVote({
            chainId: this.dao.chainId,
            contractAddress: this.info.address,
            args: {
              proposalId,
              auth: {
                permit,
              },
            },
          })
        )
      ).vote || null
    )
  }

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
    const permit = await this.dao.getPermit(sender)

    let proposalNumber: number

    if (this.prePropose) {
      const { events } = await new SecretDaoPreProposeMultipleClient(
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
        auth: {
          permit,
        },
      })

      proposalNumber = Number(
        findWasmAttributeValue(events, this.address, 'proposal_id') ?? -1
      )
    } else {
      const { events } = await new SecretDaoProposalMultipleClient(
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
      // Proposal IDs are the the prefix plus the proposal number.
      proposalId: `${this.prefix}${proposalNumber}`,
    }
  }
}
