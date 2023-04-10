import { useCallback, useMemo } from 'react'

import { GasEmoji } from '@dao-dao/stateless'
import {
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import { isDecodedStargateMsg, makeStargateMessage } from '@dao-dao/utils'

import {
  FeeShareComponent as Component,
  FeeShareData,
  FeeShareType,
} from './Component'

const useDefaults: UseDefaults<FeeShareData> = () => ({
  contract: '',
  showWithdrawer: false,
  typeUrl: FeeShareType.Register,
  withdrawer: '',
})

export const makeFeeShareAction: ActionMaker<FeeShareData> = ({
  t,
  address,
}) => {
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
