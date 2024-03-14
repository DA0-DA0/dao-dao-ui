import { coins } from '@cosmjs/stargate'
import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'

import { genericTokenSelector } from '@dao-dao/state/recoil'
import { DownArrowEmoji, useCachedLoadingWithError } from '@dao-dao/stateless'
import {
  ChainId,
  TokenType,
  UseDecodedCosmosMsg,
  makeStargateMessage,
} from '@dao-dao/types'
import {
  ActionComponent,
  ActionKey,
  ActionMaker,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import { MsgFundCommunityPool } from '@dao-dao/types/protobuf/codegen/cosmos/distribution/v1beta1/tx'
import {
  convertDenomToMicroDenomStringWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  decodePolytoneExecuteMsg,
  isDecodedStargateMsg,
  maybeMakePolytoneExecuteMessage,
  objectMatchesStructure,
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

export const makeCommunityPoolDepositAction: ActionMaker<
  CommunityPoolDepositData
> = ({ t, address, chain: { chain_id: currentChainId }, chainContext }) => {
  // Neutron does not use the x/distribution community pool.
  if (currentChainId === ChainId.NeutronMainnet) {
    return null
  }

  const useDefaults: UseDefaults<CommunityPoolDepositData> = () => ({
    chainId: currentChainId,
    amount: 100,
    denom: chainContext.nativeToken?.denomOrAddress || '',
  })

  const useTransformToCosmos: UseTransformToCosmos<
    CommunityPoolDepositData
  > = () => {
    const tokens = useTokenBalances({
      filter: TokenType.Native,
    })

    return useCallback(
      ({ chainId, amount, denom }: CommunityPoolDepositData) => {
        if (tokens.loading) {
          return
        }

        const token = tokens.data.find(
          ({ token }) =>
            token.chainId === chainId && token.denomOrAddress === denom
        )?.token
        if (!token) {
          throw new Error(`Unknown token: ${denom}`)
        }

        return maybeMakePolytoneExecuteMessage(
          currentChainId,
          chainId,
          makeStargateMessage({
            stargate: {
              typeUrl: MsgFundCommunityPool.typeUrl,
              value: MsgFundCommunityPool.fromPartial({
                depositor: address,
                amount: coins(
                  convertDenomToMicroDenomStringWithDecimals(
                    amount,
                    token.decimals
                  ),
                  denom
                ),
              }),
            },
          })
        )
      },
      [tokens]
    )
  }

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<CommunityPoolDepositData> = (
    msg: Record<string, any>
  ) => {
    let chainId = currentChainId
    const decodedPolytone = decodePolytoneExecuteMsg(currentChainId, msg)
    if (decodedPolytone.match) {
      chainId = decodedPolytone.chainId
      msg = decodedPolytone.msg
    }

    const isFundMsg =
      isDecodedStargateMsg(msg) &&
      objectMatchesStructure(msg, {
        stargate: {
          typeUrl: {},
          value: {
            depositor: {},
            amount: {},
          },
        },
      }) &&
      msg.stargate.typeUrl === MsgFundCommunityPool.typeUrl &&
      msg.stargate.value.depositor === address &&
      Array.isArray(msg.stargate.value.amount) &&
      msg.stargate.value.amount.length === 1

    const token = useCachedLoadingWithError(
      isFundMsg
        ? genericTokenSelector({
            chainId,
            type: TokenType.Native,
            denomOrAddress: msg.stargate.value.amount[0].denom,
          })
        : undefined
    )

    if (!isFundMsg || token.loading || token.errored) {
      return { match: false }
    }

    return {
      match: true,
      data: {
        chainId,
        amount: convertMicroDenomToDenomWithDecimals(
          msg.stargate.value.amount[0].amount,
          token.data.decimals
        ),
        denom: msg.stargate.value.amount[0].denom,
      },
    }
  }

  return {
    key: ActionKey.CommunityPoolDeposit,
    Icon: DownArrowEmoji,
    label: t('title.communityPoolDeposit'),
    description: t('info.communityPoolDepositDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
