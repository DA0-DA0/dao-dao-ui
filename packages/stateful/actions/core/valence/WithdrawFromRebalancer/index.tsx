import { useCallback } from 'react'

import { DownArrowEmoji } from '@dao-dao/stateless'
import { AccountType, ActionMaker, ChainId } from '@dao-dao/types'
import {
  ActionComponent,
  ActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import {
  decodeIcaExecuteMsg,
  decodePolytoneExecuteMsg,
  getAccount,
  makeWasmMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { StatefulSpendComponent, makeSpendAction } from '../../treasury/Spend'
import { SpendData } from '../../treasury/Spend/Component'

export type WithdrawFromRebalancerData = SpendData

export const makeWithdrawFromRebalancerAction: ActionMaker<
  WithdrawFromRebalancerData
> = (options) => {
  const {
    t,
    context,
    address,
    chain: { chain_id: currentChainId },
  } = options

  const spendAction = makeSpendAction({
    ...options,
    fromValence: true,
  })
  if (!spendAction) {
    return null
  }

  const valenceAccount = getAccount({
    accounts: context.accounts,
    chainId: ChainId.NeutronMainnet,
    types: [AccountType.Valence],
  })

  const useDefaults: UseDefaults<WithdrawFromRebalancerData> = () => {
    const spendDefaults = spendAction.useDefaults()

    if (!valenceAccount) {
      return new Error(t('error.noValenceAccount'))
    }

    if (!spendDefaults) {
      return
    } else if (spendDefaults instanceof Error) {
      return spendDefaults
    }

    return {
      ...spendDefaults,
      fromChainId: ChainId.NeutronMainnet,
      from: valenceAccount.address,
      toChainId: currentChainId,
      to: address,
    }
  }

  const useTransformToCosmos: UseTransformToCosmos<
    WithdrawFromRebalancerData
  > = () => {
    const transform = spendAction.useTransformToCosmos()

    return useCallback(
      (data) => {
        if (!valenceAccount) {
          throw new Error(t('error.noValenceAccount'))
        }

        const transformed = transform(data)
        if (!transformed) {
          return
        }

        return makeWasmMessage({
          wasm: {
            execute: {
              contract_addr: valenceAccount.address,
              funds: [],
              msg: {
                execute_by_admin: {
                  msgs: [transformed],
                },
              },
            },
          },
        })
      },
      [transform]
    )
  }

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<WithdrawFromRebalancerData> = (
    msg: Record<string, any>
  ) => {
    let chainId = currentChainId
    const decodedPolytone = decodePolytoneExecuteMsg(chainId, msg)
    if (decodedPolytone.match) {
      msg = decodedPolytone.msg
      chainId = decodedPolytone.chainId
    } else {
      const decodedIca = decodeIcaExecuteMsg(chainId, msg)
      if (decodedIca.match) {
        chainId = decodedIca.chainId
        msg = decodedIca.msgWithSender?.msg || {}
      }
    }

    const isExecuteByAdmin =
      objectMatchesStructure(msg, {
        wasm: {
          execute: {
            contract_addr: {},
            funds: {},
            msg: {
              execute_by_admin: {
                msgs: {},
              },
            },
          },
        },
      }) &&
      msg.wasm.execute.contract_addr === valenceAccount?.address &&
      Array.isArray(msg.wasm.execute.msg.execute_by_admin.msgs) &&
      msg.wasm.execute.msg.execute_by_admin.msgs.length === 1

    // Only attempt to decode execute by admin msg.
    const decoded = spendAction.useDecodedCosmosMsg(
      isExecuteByAdmin ? msg.wasm.execute.msg.execute_by_admin.msgs[0] : {}
    )

    return isExecuteByAdmin &&
      decoded.match &&
      valenceAccount &&
      decoded.data.toChainId === currentChainId &&
      decoded.data.to === address
      ? decoded
      : {
          match: false,
        }
  }

  const Component: ActionComponent = (props) => (
    <StatefulSpendComponent {...props} fromValence noChangeDestination />
  )

  return {
    key: ActionKey.WithdrawFromRebalancer,
    Icon: DownArrowEmoji,
    label: t('title.withdrawFromRebalancer'),
    description: t('info.withdrawFromRebalancerDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
    // Hide if no Valence account created.
    hideFromPicker: !valenceAccount,
  }
}
