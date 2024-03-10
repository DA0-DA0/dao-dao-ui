import { Coin, coin } from '@cosmjs/stargate'
import { useCallback, useMemo } from 'react'

import { HerbEmoji } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import {
  convertDenomToMicroDenomStringWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  isDecodedStargateMsg,
  makeStargateMessage,
} from '@dao-dao/utils'
import { MsgMint } from '@dao-dao/utils/protobuf/codegen/osmosis/tokenfactory/v1beta1/tx'

import { useActionOptions } from '../../../../../actions'
import { useGovernanceTokenInfo } from '../../hooks'
import { MintComponent as StatelessMintComponent } from './MintComponent'

export interface MintData {
  amount: number
}

const useDefaults: UseDefaults<MintData> = () => ({
  amount: 1,
})

const useTransformToCosmos: UseTransformToCosmos<MintData> = () => {
  const { address } = useActionOptions()
  const { governanceToken } = useGovernanceTokenInfo()

  return useCallback(
    (data: MintData) => {
      return makeStargateMessage({
        stargate: {
          typeUrl: MsgMint.typeUrl,
          value: {
            sender: address,
            amount: coin(
              convertDenomToMicroDenomStringWithDecimals(
                data.amount,
                governanceToken.decimals
              ),
              governanceToken.denomOrAddress
            ),
          } as MsgMint,
        },
      })
    },
    [address, governanceToken]
  )
}

const useDecodedCosmosMsg: UseDecodedCosmosMsg<MintData> = (
  msg: Record<string, any>
) => {
  const { governanceToken } = useGovernanceTokenInfo()

  return useMemo(() => {
    if (
      !isDecodedStargateMsg(msg) ||
      msg.stargate.typeUrl !== MsgMint.typeUrl
    ) {
      return {
        match: false,
      }
    }

    const { denom, amount } = msg.stargate.value.amount as Coin

    return governanceToken.denomOrAddress === denom
      ? {
          match: true,
          data: {
            amount: convertMicroDenomToDenomWithDecimals(
              amount,
              governanceToken.decimals
            ),
          },
        }
      : {
          match: false,
        }
  }, [governanceToken, msg])
}

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

export const makeMintAction: ActionMaker<MintData> = ({ t }) => ({
  key: ActionKey.Mint,
  Icon: HerbEmoji,
  label: t('title.mint'),
  description: t('info.mintActionDescription'),
  Component,
  useDefaults,
  useTransformToCosmos,
  useDecodedCosmosMsg,
})
