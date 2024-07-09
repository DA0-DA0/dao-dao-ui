import { MoneyWingsEmoji } from '@dao-dao/stateless'
import { AccountType, ActionMaker, ChainId } from '@dao-dao/types'
import {
  ActionComponent,
  ActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import { getAccount } from '@dao-dao/utils'

import { StatefulSpendComponent, makeSpendAction } from '../../treasury/Spend'
import { SpendData } from '../../treasury/Spend/Component'

export type FundRebalancerData = SpendData

export const makeFundRebalancerAction: ActionMaker<FundRebalancerData> = (
  options
) => {
  const {
    t,
    context,
    address,
    chain: { chain_id: chainId },
  } = options

  const spendAction = makeSpendAction(options)
  if (!spendAction) {
    return null
  }

  const valenceAccount = getAccount({
    accounts: context.accounts,
    chainId: ChainId.NeutronMainnet,
    types: [AccountType.Valence],
  })

  const useDefaults: UseDefaults<FundRebalancerData> = () => {
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
      fromChainId: chainId,
      from: address,
      toChainId: ChainId.NeutronMainnet,
      to: valenceAccount.address,
    }
  }

  const useTransformToCosmos: UseTransformToCosmos<FundRebalancerData> =
    spendAction.useTransformToCosmos

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<FundRebalancerData> = (
    msg: Record<string, any>
  ) => {
    const decoded = spendAction.useDecodedCosmosMsg(msg)

    return decoded.match &&
      valenceAccount &&
      decoded.data.toChainId === valenceAccount.chainId &&
      decoded.data.to === valenceAccount.address
      ? decoded
      : {
          match: false,
        }
  }

  const Component: ActionComponent = (props) => (
    <StatefulSpendComponent {...props} noChangeDestination />
  )

  return {
    key: ActionKey.FundRebalancer,
    Icon: MoneyWingsEmoji,
    label: t('title.fundRebalancer'),
    description: t('info.fundRebalancerDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
    // Hide if no Valence account created.
    hideFromPicker: !valenceAccount,
  }
}
