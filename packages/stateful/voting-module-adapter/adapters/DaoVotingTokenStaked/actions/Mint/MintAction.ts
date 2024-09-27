import { HugeDecimal } from '@dao-dao/math'
import { daoVotingTokenStakedExtraQueries } from '@dao-dao/state/query'
import { ActionBase, HerbEmoji } from '@dao-dao/stateless'
import { GenericToken, UnifiedCosmosMsg } from '@dao-dao/types'
import {
  ActionContextType,
  ActionKey,
  ActionMatch,
  ActionOptions,
  ProcessedMessage,
} from '@dao-dao/types/actions'
import {
  convertDenomToMicroDenomStringWithDecimals,
  makeExecuteSmartContractMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { Component } from './Component'
import { MintData } from './MintComponent'

/**
 * A mint action for tokenfactory tokens.
 */
export class MintAction extends ActionBase<MintData> {
  public readonly key = ActionKey.Mint
  public readonly Component = Component

  private governanceToken?: GenericToken
  private tokenFactoryIssuerAddress: string | null = null

  constructor(options: ActionOptions) {
    super(options, {
      Icon: HerbEmoji,
      label: options.t('title.mint'),
      description: options.t('info.mintActionDescription'),
      // Hide until ready. Update this in setup.
      hideFromPicker: true,
    })

    this.defaults = {
      recipient: options.address,
      amount: 1,
    }

    // Fire async init immediately since we may hide this action.
    this.init().catch(() => {})
  }

  async setup() {
    // Type-check.
    if (
      this.options.context.type !== ActionContextType.Dao ||
      !this.options.context.dao.votingModule.getGovernanceTokenQuery
    ) {
      throw new Error('Invalid context for mint action')
    }

    this.governanceToken = await this.options.queryClient.fetchQuery(
      this.options.context.dao.votingModule.getGovernanceTokenQuery()
    )

    this.tokenFactoryIssuerAddress = await this.options.queryClient.fetchQuery(
      daoVotingTokenStakedExtraQueries.validatedTokenfactoryIssuerContract(
        this.options.queryClient,
        {
          chainId: this.options.chain.chain_id,
          address: this.options.context.dao.votingModule.address,
        }
      )
    )

    // Need token factory issuer address to mint.
    this.metadata.hideFromPicker = !this.tokenFactoryIssuerAddress
  }

  encode({ recipient, amount: _amount }: MintData): UnifiedCosmosMsg[] {
    if (!this.governanceToken || !this.tokenFactoryIssuerAddress) {
      throw new Error('Action not ready')
    }

    const amount = convertDenomToMicroDenomStringWithDecimals(
      _amount,
      this.governanceToken.decimals
    )

    return [
      // Set DAO minter allowance to the amount we're about to mint.
      makeExecuteSmartContractMessage({
        chainId: this.options.chain.chain_id,
        sender: this.options.address,
        contractAddress: this.tokenFactoryIssuerAddress,
        msg: {
          set_minter_allowance: {
            address: this.options.address,
            allowance: amount,
          },
        },
      }),
      // Mint.
      makeExecuteSmartContractMessage({
        chainId: this.options.chain.chain_id,
        sender: this.options.address,
        contractAddress: this.tokenFactoryIssuerAddress,
        msg: {
          mint: {
            to_address: recipient,
            amount,
          },
        },
      }),
    ]
  }

  match(messages: ProcessedMessage[]): ActionMatch {
    return !!this.tokenFactoryIssuerAddress &&
      messages.length >= 2 &&
      // Set minter allowance.
      objectMatchesStructure(messages[0].decodedMessage, {
        wasm: {
          execute: {
            contract_addr: {},
            funds: {},
            msg: {
              set_minter_allowance: {
                address: {},
                allowance: {},
              },
            },
          },
        },
      }) &&
      messages[0].decodedMessage.wasm.execute.contract_addr ===
        this.tokenFactoryIssuerAddress &&
      // Mint.
      objectMatchesStructure(messages[1].decodedMessage, {
        wasm: {
          execute: {
            contract_addr: {},
            funds: {},
            msg: {
              mint: {
                to_address: {},
                amount: {},
              },
            },
          },
        },
      }) &&
      messages[1].decodedMessage.wasm.execute.contract_addr ===
        this.tokenFactoryIssuerAddress
      ? // Match both messages.
        2
      : false
  }

  decode([_, { decodedMessage }]: ProcessedMessage[]): MintData {
    if (!this.governanceToken) {
      throw new Error('Action not ready')
    }

    return {
      recipient: decodedMessage.wasm.execute.msg.mint.to_address,
      amount: HugeDecimal.from(
        decodedMessage.wasm.execute.msg.mint.amount
      ).toHumanReadableNumber(this.governanceToken.decimals),
    }
  }
}
