import { HugeDecimal } from '@dao-dao/math'
import { tokenQueries } from '@dao-dao/state/query'
import { ActionBase, HerbEmoji } from '@dao-dao/stateless'
import {
  GenericToken,
  UnifiedCosmosMsg,
  makeStargateMessage,
} from '@dao-dao/types'
import {
  ActionContextType,
  ActionKey,
  ActionMatch,
  ActionOptions,
  ProcessedMessage,
} from '@dao-dao/types/actions'
import { MsgMint } from '@dao-dao/types/protobuf/codegen/bitsong/fantoken/v1beta1/tx'
import { isDecodedStargateMsg } from '@dao-dao/utils'

import { Component } from './Component'
import { MintData } from './MintComponent'

/**
 * A mint action for BitSong Fantokens.
 */
export class BitSongFantokenMintAction extends ActionBase<MintData> {
  public readonly key = ActionKey.Mint
  public readonly Component = Component

  private governanceToken?: GenericToken

  constructor(options: ActionOptions) {
    super(options, {
      Icon: HerbEmoji,
      label: options.t('title.mint'),
      description: options.t('info.mintActionDescription'),
      // Hide until ready. Update this in setup.
      hideFromPicker: true,
    })

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

    const fantoken = await this.options.queryClient.fetchQuery(
      tokenQueries.bitSongFantoken({
        chainId: this.options.chain.chain_id,
        denom: this.governanceToken.denomOrAddress,
      })
    )

    // Hide action if the minter is not the DAO.
    this.metadata.hideFromPicker = fantoken.minter !== this.options.address

    this.defaults = {
      recipient: this.options.address,
      amount: '1',
    }
  }

  encode({ recipient, amount }: MintData): UnifiedCosmosMsg {
    if (!this.governanceToken) {
      throw new Error('Action not ready')
    }

    return makeStargateMessage({
      stargate: {
        typeUrl: MsgMint.typeUrl,
        value: MsgMint.fromPartial({
          recipient,
          coin: HugeDecimal.fromHumanReadable(
            amount,
            this.governanceToken.decimals
          ).toCoin(this.governanceToken.denomOrAddress),
          minter: this.options.address,
        }),
      },
    })
  }

  match([{ decodedMessage }]: ProcessedMessage[]): ActionMatch {
    return isDecodedStargateMsg(decodedMessage, MsgMint.typeUrl, {
      recipient: {},
      coin: {
        denom: {},
        amount: {},
      },
      minter: {},
    })
  }

  decode([{ decodedMessage }]: ProcessedMessage[]): MintData {
    if (!this.governanceToken) {
      throw new Error('Action not ready')
    }

    return {
      recipient: decodedMessage.stargate.value.recipient,
      amount: HugeDecimal.from(
        decodedMessage.stargate.value.coin.amount
      ).toHumanReadableString(this.governanceToken.decimals),
    }
  }
}
