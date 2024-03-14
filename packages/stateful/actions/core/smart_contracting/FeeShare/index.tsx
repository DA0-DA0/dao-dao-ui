import { useCallback, useMemo } from 'react'

import { GasEmoji } from '@dao-dao/stateless'
import { ChainId, makeStargateMessage } from '@dao-dao/types'
import {
  ActionComponent,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import {
  MsgRegisterFeeShare,
  MsgUpdateFeeShare,
} from '@dao-dao/types/protobuf/codegen/juno/feeshare/v1/tx'
import { isDecodedStargateMsg } from '@dao-dao/utils'

import { AddressInput } from '../../../../components/AddressInput'
import { FeeShareComponent, FeeShareData } from './Component'

const useDefaults: UseDefaults<FeeShareData> = () => ({
  typeUrl: MsgRegisterFeeShare.typeUrl,
  contract: '',
  showWithdrawer: false,
  withdrawer: '',
})

const Component: ActionComponent = (props) => (
  <FeeShareComponent
    {...props}
    options={{
      AddressInput,
    }}
  />
)

export const makeFeeShareAction: ActionMaker<FeeShareData> = ({
  t,
  address,
  chain,
}) => {
  // Only supported on Juno.
  if (
    chain.chain_id !== ChainId.JunoMainnet &&
    chain.chain_id !== ChainId.JunoTestnet
  ) {
    return null
  }

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<FeeShareData> = (
    msg: Record<string, any>
  ) =>
    useMemo(() => {
      if (
        !isDecodedStargateMsg(msg) ||
        (msg.stargate.typeUrl !== MsgRegisterFeeShare.typeUrl &&
          msg.stargate.typeUrl !== MsgUpdateFeeShare.typeUrl)
      ) {
        return {
          match: false,
        }
      }

      const { contractAddress, withdrawerAddress } = msg.stargate.value

      return {
        match: true,
        data: {
          typeUrl: msg.stargate.typeUrl,
          contract: contractAddress,
          showWithdrawer: withdrawerAddress !== address,
          withdrawer: withdrawerAddress,
        },
      }
    }, [msg])

  const useTransformToCosmos: UseTransformToCosmos<FeeShareData> = () =>
    useCallback((data: FeeShareData) => {
      const { contract, showWithdrawer, typeUrl, withdrawer } = data

      return makeStargateMessage({
        stargate: {
          typeUrl,
          value: {
            contractAddress: contract,
            deployerAddress: address,
            withdrawerAddress: (showWithdrawer && withdrawer) || address,
          },
        },
      })
    }, [])

  return {
    key: ActionKey.FeeShare,
    Icon: GasEmoji,
    label: t('title.feeShare'),
    description: t('info.feeShareDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
