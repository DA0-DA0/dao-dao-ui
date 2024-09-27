import { coin } from '@cosmjs/stargate'

import { HugeDecimal } from '@dao-dao/math'
import { ActionBase, HerbEmoji } from '@dao-dao/stateless'
import {
  GenericToken,
  UnifiedCosmosMsg,
  makeStargateMessage,
} from '@dao-dao/types'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMatch,
  ActionOptions,
  ProcessedMessage,
} from '@dao-dao/types/actions'
import { MsgMint } from '@dao-dao/types/protobuf/codegen/osmosis/tokenfactory/v1beta1/tx'
import {
  convertDenomToMicroDenomStringWithDecimals,
  isDecodedStargateMsg,
} from '@dao-dao/utils'

import { useGovernanceTokenInfo } from '../../hooks'
import {
  MintData,
  MintComponent as StatelessMintComponent,
} from './MintComponent'

const Component: ActionComponent = (props) => {
  const { governanceToken } = useGovernanceTokenInfo()

  return (
    <StatelessMintComponent
      {...props}
      options={{
        govToken: governanceToken,
      }}
    />
  )
}

export class MintAction extends ActionBase<MintData> {
  public readonly key = ActionKey.Mint
  public readonly Component = Component

  protected _defaults: MintData = {
    amount: 1,
  }

  private governanceToken?: GenericToken

  constructor(options: ActionOptions) {
    super(options, {
      Icon: HerbEmoji,
      label: options.t('title.mint'),
      description: options.t('info.mintActionDescription'),
    })
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
  }

  encode({ amount }: MintData): UnifiedCosmosMsg {
    if (!this.governanceToken) {
      throw new Error('Action not ready')
    }

    return makeStargateMessage({
      stargate: {
        typeUrl: MsgMint.typeUrl,
        value: MsgMint.fromPartial({
          sender: this.options.address,
          amount: coin(
            convertDenomToMicroDenomStringWithDecimals(
              amount,
              this.governanceToken.decimals
            ),
            this.governanceToken.denomOrAddress
          ),
        }),
      },
    })
  }

  match([{ decodedMessage }]: ProcessedMessage[]): ActionMatch {
    return (
      isDecodedStargateMsg(decodedMessage, MsgMint) &&
      !!this.governanceToken &&
      decodedMessage.stargate.value.amount.denom ===
        this.governanceToken.denomOrAddress
    )
  }

  decode([{ decodedMessage }]: ProcessedMessage[]): MintData {
    if (!this.governanceToken) {
      throw new Error('Action not ready')
    }

    return {
      amount: HugeDecimal.from(
        decodedMessage.stargate.value.amount.amount
      ).toHumanReadableNumber(this.governanceToken.decimals),
    }
  }
}
