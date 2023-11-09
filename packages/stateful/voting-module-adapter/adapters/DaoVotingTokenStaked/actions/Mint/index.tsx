import { Coin, coin } from '@cosmjs/stargate'
import { useCallback, useMemo } from 'react'
import { constSelector, useRecoilValueLoadable } from 'recoil'

import { MsgMint } from '@dao-dao/protobuf/codegen/osmosis/tokenfactory/v1beta1/tx'
import {
  DaoVotingTokenStakedSelectors,
  isContractSelector,
} from '@dao-dao/state/recoil'
import { HerbEmoji } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseHideFromPicker,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import {
  convertDenomToMicroDenomStringWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  isDecodedStargateMsg,
  makeStargateMessage,
} from '@dao-dao/utils'

import { useActionOptions } from '../../../../../actions'
import { useVotingModuleAdapterOptions } from '../../../../react/context'
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
  const { governanceTokenAddress, governanceTokenInfo } =
    useGovernanceTokenInfo()

  // TODO: use cw-tokenfactory-issuer to set_minter and then mint
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
                governanceTokenInfo.decimals
              ),
              governanceTokenAddress
            ),
          } as MsgMint,
        },
      })
    },
    [address, governanceTokenAddress, governanceTokenInfo.decimals]
  )
}

const useDecodedCosmosMsg: UseDecodedCosmosMsg<MintData> = (
  msg: Record<string, any>
) => {
  const {
    governanceTokenAddress,
    governanceTokenInfo: { decimals },
  } = useGovernanceTokenInfo()

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

    return governanceTokenAddress === denom
      ? {
          match: true,
          data: {
            amount: convertMicroDenomToDenomWithDecimals(amount, decimals),
          },
        }
      : {
          match: false,
        }
  }, [governanceTokenAddress, decimals, msg])
}

const Component: ActionComponent = (props) => {
  const { token } = useGovernanceTokenInfo()

  return (
    <StatelessMintComponent
      {...props}
      options={{
        govToken: token,
      }}
    />
  )
}

// Show in picker if using cw-tokenfactory-issuer contract.
const useHideFromPicker: UseHideFromPicker = () => {
  const { chainId, votingModuleAddress } = useVotingModuleAdapterOptions()
  const { governanceTokenAddress } = useGovernanceTokenInfo()
  const isFactory = governanceTokenAddress.startsWith('factory/')

  const tfIssuerLoadable = useRecoilValueLoadable(
    isFactory
      ? DaoVotingTokenStakedSelectors.tokenContractSelector({
          contractAddress: votingModuleAddress,
          chainId,
          params: [],
        })
      : constSelector(undefined)
  )
  const tfIssuer =
    tfIssuerLoadable.state === 'hasValue'
      ? tfIssuerLoadable.contents
      : undefined

  const isTfIssuerLoadable = useRecoilValueLoadable(
    tfIssuer
      ? isContractSelector({
          contractAddress: tfIssuer,
          chainId,
          name: 'cw-tokenfactory-issuer',
        })
      : constSelector(undefined)
  )
  const isTfIssuer =
    isTfIssuerLoadable.state === 'hasValue' && isTfIssuerLoadable.contents

  const showAction = isFactory && !!isTfIssuer
  return !showAction
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
  useHideFromPicker,
})
