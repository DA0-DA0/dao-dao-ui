import { useCallback, useMemo } from 'react'

import { GasEmoji } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import { isDecodedStargateMsg, makeStargateMessage } from '@dao-dao/utils'

import { AddressInput } from '../../../../components/AddressInput'
import { FeeShareComponent, FeeShareData, FeeShareType } from './Component'

const useDefaults: UseDefaults<FeeShareData> = () => ({
  typeUrl: FeeShareType.Register,
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
}) => {
  const useDecodedCosmosMsg: UseDecodedCosmosMsg<FeeShareData> = (
    msg: Record<string, any>
  ) =>
    useMemo(() => {
      if (
        !isDecodedStargateMsg(msg) ||
        (msg.stargate.typeUrl !== FeeShareType.Register &&
          msg.stargate.typeUrl !== FeeShareType.Update)
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
