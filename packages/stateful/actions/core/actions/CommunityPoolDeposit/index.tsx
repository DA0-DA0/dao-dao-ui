import { useFormContext } from 'react-hook-form'

import { HugeDecimal } from '@dao-dao/math'
import { tokenQueries } from '@dao-dao/state/query'
import { ActionBase, DownArrowEmoji } from '@dao-dao/stateless'
import {
  ChainId,
  TokenType,
  UnifiedCosmosMsg,
  makeStargateMessage,
} from '@dao-dao/types'
import {
  ActionComponent,
  ActionKey,
  ActionMatch,
  ActionOptions,
  ProcessedMessage,
} from '@dao-dao/types/actions'
import { MsgFundCommunityPool } from '@dao-dao/types/protobuf/codegen/cosmos/distribution/v1beta1/tx'
import {
  getChainAddressForActionOptions,
  isDecodedStargateMsg,
  maybeMakePolytoneExecuteMessages,
} from '@dao-dao/utils'

import { useTokenBalances } from '../../../hooks'
import {
  CommunityPoolDepositComponent,
  CommunityPoolDepositData,
} from './Component'

const Component: ActionComponent<undefined, CommunityPoolDepositData> = (
  props
) => {
  const { watch } = useFormContext<CommunityPoolDepositData>()

  const chainId = watch((props.fieldNamePrefix + 'chainId') as 'chainId')
  const denom = watch((props.fieldNamePrefix + 'denom') as 'denom')

  const tokens = useTokenBalances({
    filter: TokenType.Native,
    // Load selected token when not creating, in case it is no longer returned
    // in the list of all tokens for the given account.
    additionalTokens: props.isCreating
      ? undefined
      : [
          {
            chainId,
            type: TokenType.Native,
            denomOrAddress: denom,
          },
        ],
  })

  return (
    <CommunityPoolDepositComponent
      {...props}
      options={{
        tokens,
      }}
    />
  )
}

export class CommunityPoolDepositAction extends ActionBase<CommunityPoolDepositData> {
  public readonly key = ActionKey.CommunityPoolDeposit
  public readonly Component = Component

  constructor(options: ActionOptions) {
    // Neutron does not use the x/distribution community pool.
    if (
      options.chain.chain_id === ChainId.NeutronMainnet ||
      options.chain.chain_id === ChainId.NeutronTestnet
    ) {
      throw new Error('Neutron does not support community pool deposits')
    }

    super(options, {
      Icon: DownArrowEmoji,
      label: options.t('title.communityPoolDeposit'),
      description: options.t('info.communityPoolDepositDescription'),
    })

    this.defaults = {
      chainId: options.chain.chain_id,
      amount: '100',
      denom: options.chainContext.nativeToken?.denomOrAddress || '',
    }
  }

  async encode({
    chainId,
    amount,
    denom,
  }: CommunityPoolDepositData): Promise<UnifiedCosmosMsg[]> {
    const depositor = getChainAddressForActionOptions(this.options, chainId)
    if (!depositor) {
      throw new Error('No depositor address found for chain')
    }

    const token = await this.options.queryClient.fetchQuery(
      tokenQueries.info(this.options.queryClient, {
        chainId,
        type: TokenType.Native,
        denomOrAddress: denom,
      })
    )

    return maybeMakePolytoneExecuteMessages(
      this.options.chain.chain_id,
      chainId,
      makeStargateMessage({
        stargate: {
          typeUrl: MsgFundCommunityPool.typeUrl,
          value: MsgFundCommunityPool.fromPartial({
            depositor,
            amount: HugeDecimal.fromHumanReadable(
              amount,
              token.decimals
            ).toCoins(denom),
          }),
        },
      })
    )
  }

  match([{ decodedMessage }]: ProcessedMessage[]): ActionMatch {
    return isDecodedStargateMsg(decodedMessage, MsgFundCommunityPool, {
      depositor: {},
      amount: [
        {
          amount: {},
          denom: {},
        },
      ],
    })
  }

  async decode([
    {
      decodedMessage,
      account: { chainId },
    },
  ]: ProcessedMessage[]): Promise<CommunityPoolDepositData> {
    const { amount, denom } = decodedMessage.stargate.value.amount[0]
    const { decimals } = await this.options.queryClient.fetchQuery(
      tokenQueries.info(this.options.queryClient, {
        chainId,
        type: TokenType.Native,
        denomOrAddress: denom,
      })
    )

    return {
      chainId,
      amount: HugeDecimal.from(amount).toHumanReadableString(decimals),
      denom,
    }
  }
}
