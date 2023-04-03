import { useCallback } from 'react'

import { SuitAndTieEmoji } from '@dao-dao/stateless'
import {
  ActionContextType,
  ActionMaker,
  CoreActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import { DAO_WIDGET_ITEM_NAMESPACE } from '@dao-dao/utils'

import { VestingPaymentsWidget } from '../../../../widgets/widgets/VestingPayments'
import { VestingPaymentsData } from '../../../../widgets/widgets/VestingPayments/types'
import { makeManageWidgetsAction } from '../../dao_appearance/ManageWidgets'
import { EnableVestingPaymentsComponent as Component } from './Component'

const useDefaults: UseDefaults<VestingPaymentsData> = () => ({
  factory: '',
})

export const makeEnableVestingPaymentsAction: ActionMaker<
  VestingPaymentsData
> = (options) => {
  const { t, context } = options

  const manageWidgetsAction = makeManageWidgetsAction(options)
  if (context.type !== ActionContextType.Dao || !manageWidgetsAction) {
    return null
  }

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<VestingPaymentsData> = (
    msg: Record<string, any>
  ) => {
    const decoded = manageWidgetsAction.useDecodedCosmosMsg(msg)

    return decoded.match &&
      decoded.data.mode === 'set' &&
      decoded.data.id === VestingPaymentsWidget.id &&
      typeof decoded.data.values.factory === 'string'
      ? {
          match: true,
          data: decoded.data.values as VestingPaymentsData,
        }
      : {
          match: false,
        }
  }

  const useTransformToCosmos: UseTransformToCosmos<
    VestingPaymentsData
  > = () => {
    const transform = manageWidgetsAction.useTransformToCosmos()

    return useCallback(
      (data) =>
        transform({
          mode: 'set',
          id: VestingPaymentsWidget.id,
          values: data,
        }),
      [transform]
    )
  }

  return {
    key: CoreActionKey.EnableVestingPayments,
    Icon: SuitAndTieEmoji,
    label: t('title.enableVestingPayments'),
    description: t('widgetDescription.vesting'),
    notReusable: true,
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
    // Do not allow creating/using this action if the DAO already has vesting
    // payments enabled.
    disallowCreation:
      !!context.info.items[
        DAO_WIDGET_ITEM_NAMESPACE + VestingPaymentsWidget.id
      ],
  }
}
