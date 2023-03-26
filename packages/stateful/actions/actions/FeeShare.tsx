import { toBase64 } from '@cosmjs/encoding'
import { juno } from 'juno-network'
import { useCallback, useMemo } from 'react'

import { GasEmoji } from '@dao-dao/stateless'
import {
  ActionMaker,
  CoreActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import { isDecodedStargateMsg } from '@dao-dao/utils'

import { FeeShareComponent as Component } from '../components/FeeShare'

export enum FeeShareType {
  Register = '/juno.feeshare.v1.MsgRegisterFeeShare',
  Update = '/juno.feeshare.v1.MsgUpdateFeeShare',
}

export interface FeeShareData {
  contract: string
  showWithdrawer: boolean
  typeUrl: FeeShareType
  withdrawer?: string
}

const useDefaults: UseDefaults<FeeShareData> = () => ({
  contract: '',
  showWithdrawer: false,
  typeUrl: FeeShareType.Register,
  withdrawer: '',
})

export const makeFeeShareAction: ActionMaker<FeeShareData> = ({
  t,
  address,
  context,
}) => {
  const useDecodedCosmosMsg: UseDecodedCosmosMsg<FeeShareData> = (
    msg: Record<string, any>
  ) =>
    useMemo(() => {
      if (
        !isDecodedStargateMsg(msg) ||
        msg.stargate.typeUrl !== (FeeShareType.Register as string) ||
        msg.stargate.typeUrl !== (FeeShareType.Update as string)
      ) {
        return {
          match: false,
        }
      }

      let { contractAddress, withdrawerAddress } = msg.stargate.value

      return {
        match: true,
        data: {
          contract: contractAddress,
          showWithdrawer: withdrawerAddress !== address,
          typeUrl: msg.stargate.typeUrl as FeeShareType,
          withdrawer: withdrawerAddress,
        },
      }
    }, [msg])

  const useTransformToCosmos: UseTransformToCosmos<FeeShareData> = () =>
    useCallback((data: FeeShareData) => {
      const { contract, showWithdrawer, typeUrl, withdrawer } = data

      let value
      switch (typeUrl) {
        case FeeShareType.Register:
          const { MsgRegisterFeeShare } = juno.feeshare.v1
          value = MsgRegisterFeeShare.encode({
            contractAddress: contract,
            deployerAddress: address,
            withdrawerAddress:
              showWithdrawer && withdrawer ? withdrawer : address,
          }).finish()
          break
        case FeeShareType.Update:
          const { MsgUpdateFeeShare } = juno.feeshare.v1
          value = MsgUpdateFeeShare.encode({
            contractAddress: contract,
            deployerAddress: address,
            withdrawerAddress:
              showWithdrawer && withdrawer ? withdrawer : address,
          }).finish()
          break
        default:
          throw new Error('Unknown typeUrl')
      }

      return {
        stargate: {
          type_url: typeUrl,
          value: toBase64(value),
        },
      }
    }, [])

  return {
    key: CoreActionKey.FeeShare,
    Icon: GasEmoji,
    label: t('title.feeShare'),
    description: t('info.feeShareDescription', {
      context: context.type,
    }),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
