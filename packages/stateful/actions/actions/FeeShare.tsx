import { useCallback, useMemo } from 'react'

import { GasEmoji } from '@dao-dao/stateless'
import {
  ActionContextType,
  ActionMaker,
  CoreActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import { isDecodedStargateMsg, makeStargateMessage } from '@dao-dao/utils'

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
  // Only DAOs.
  if (context.type !== ActionContextType.Dao) {
    return null
  }

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<FeeShareData> = (
    msg: Record<string, any>
  ) =>
    useMemo(() => {
      if (
        !isDecodedStargateMsg(msg) ||
        (msg.stargate.typeUrl !== (FeeShareType.Register as string) &&
          msg.stargate.typeUrl !== (FeeShareType.Update as string))
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

      return makeStargateMessage({
        stargate: {
          typeUrl,
          value: {
            contractAddress: contract,
            deployerAddress: address,
            withdrawerAddress:
              showWithdrawer && withdrawer ? withdrawer : address,
          },
        },
      })
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
