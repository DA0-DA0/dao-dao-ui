import { HugeDecimal } from '@dao-dao/math'
import { ActionBase, HerbEmoji } from '@dao-dao/stateless'
import { GenericToken, TokenType, UnifiedCosmosMsg } from '@dao-dao/types'
import {
  ActionComponent,
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

import { AddressInput } from '../../../../../components'
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
        AddressInput,
      }}
    />
  )
}

export class MintAction extends ActionBase<MintData> {
  public readonly key = ActionKey.Mint
  public readonly Component = Component

  private governanceToken?: GenericToken

  constructor(options: ActionOptions) {
    super(options, {
      Icon: HerbEmoji,
      label: options.t('title.mint'),
      description: options.t('info.mintActionDescription'),
    })

    this.defaults = {
      to: options.address,
      amount: 1,
    }
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

  encode({ to, amount }: MintData): UnifiedCosmosMsg {
    if (!this.governanceToken || this.governanceToken.type !== TokenType.Cw20) {
      throw new Error('Action not ready')
    }

    return makeExecuteSmartContractMessage({
      chainId: this.options.chain.chain_id,
      sender: this.options.address,
      contractAddress: this.governanceToken.denomOrAddress,
      msg: {
        mint: {
          amount: convertDenomToMicroDenomStringWithDecimals(
            amount,
            this.governanceToken.decimals
          ),
          recipient: to,
        },
      },
    })
  }

  match([{ decodedMessage }]: ProcessedMessage[]): ActionMatch {
    return objectMatchesStructure(decodedMessage, {
      wasm: {
        execute: {
          contract_addr: {},
          funds: {},
          msg: {
            mint: {
              amount: {},
              recipient: {},
            },
          },
        },
      },
    })
  }

  decode([{ decodedMessage }]: ProcessedMessage[]): MintData {
    if (!this.governanceToken || this.governanceToken.type !== TokenType.Cw20) {
      throw new Error('Action not ready')
    }

    return {
      to: decodedMessage.wasm.execute.msg.mint.recipient,
      amount: HugeDecimal.from(
        decodedMessage.wasm.execute.msg.mint.amount
      ).toHumanReadableNumber(this.governanceToken.decimals),
    }
  }
}
