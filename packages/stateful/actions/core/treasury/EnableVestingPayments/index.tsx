import { useCallback } from 'react'

import { SuitAndTieEmoji } from '@dao-dao/stateless'
import {
  LATEST_VESTING_PAYMENTS_WIDGET_VERSION,
  VestingPaymentsWidgetData,
  WidgetId,
} from '@dao-dao/types'
import {
  ActionContextType,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import { DAO_WIDGET_ITEM_NAMESPACE } from '@dao-dao/utils'

import { makeManageWidgetsAction } from '../../dao_appearance/ManageWidgets'
import { EnableVestingPaymentsComponent as Component } from './Component'

const useDefaults: UseDefaults<VestingPaymentsWidgetData> = () => ({
  factory: '',
  version: LATEST_VESTING_PAYMENTS_WIDGET_VERSION,
})

export const makeEnableVestingPaymentsAction: ActionMaker<
  VestingPaymentsWidgetData
> = (options) => {
  const { t, context } = options

  const manageWidgetsAction = makeManageWidgetsAction(options)
  if (context.type !== ActionContextType.Dao || !manageWidgetsAction) {
    return null
  }

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<VestingPaymentsWidgetData> = (
    msg: Record<string, any>
  ) => {
    const decoded = manageWidgetsAction.useDecodedCosmosMsg(msg)

    return decoded.match &&
      decoded.data.mode === 'set' &&
      decoded.data.id === WidgetId.VestingPayments &&
      typeof decoded.data.values.factory === 'string'
      ? {
          match: true,
          data: decoded.data.values as VestingPaymentsWidgetData,
        }
      : {
          match: false,
        }
  }

  const useTransformToCosmos: UseTransformToCosmos<
    VestingPaymentsWidgetData
  > = () => {
    const transform = manageWidgetsAction.useTransformToCosmos()

    return useCallback(
      (data) =>
        transform({
          mode: 'set',
          id: WidgetId.VestingPayments,
          values: data,
        }),
      [transform]
    )
  }

  return {
    key: ActionKey.EnableVestingPayments,
    Icon: SuitAndTieEmoji,
    label: t('title.enableVestingPayments'),
    description: t('widgetDescription.vesting'),
    keywords: ['payroll'],
    notReusable: true,
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
    // Do not allow using this action if the DAO already has vesting payments
    // enabled.
    hideFromPicker:
      !!context.info.items[
        DAO_WIDGET_ITEM_NAMESPACE + WidgetId.VestingPayments
      ],
  }
}
