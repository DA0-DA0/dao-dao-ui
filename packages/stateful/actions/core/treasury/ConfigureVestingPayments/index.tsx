import cloneDeep from 'lodash.clonedeep'
import { useCallback } from 'react'

import { SuitAndTieEmoji } from '@dao-dao/stateless'
import { VestingPaymentsWidgetData, WidgetId } from '@dao-dao/types'
import {
  ActionContextType,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import { DAO_WIDGET_ITEM_NAMESPACE } from '@dao-dao/utils'

import { useWidgets } from '../../../../widgets'
import { makeManageWidgetsAction } from '../../dao_appearance/ManageWidgets'
import { ConfigureVestingPaymentsComponent as Component } from './Component'
export const makeConfigureVestingPaymentsAction: ActionMaker<
  VestingPaymentsWidgetData
> = (options) => {
  const { t, context } = options

  const manageWidgetsAction = makeManageWidgetsAction(options)
  if (context.type !== ActionContextType.Dao || !manageWidgetsAction) {
    return null
  }

  const useDefaults: UseDefaults<VestingPaymentsWidgetData> = () => {
    // Attempt to load existing widget data.
    const loadingExistingWidgets = useWidgets()
    const widget = loadingExistingWidgets.loading
      ? undefined
      : loadingExistingWidgets.data.find(
          ({ widget: { id } }) => id === WidgetId.VestingPayments
        )

    return widget
      ? cloneDeep(widget.daoWidget.values)
      : {
          factories: {},
        }
  }

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<VestingPaymentsWidgetData> = (
    msg: Record<string, any>
  ) => {
    const decoded = manageWidgetsAction.useDecodedCosmosMsg(msg)

    return decoded.match &&
      decoded.data.mode === 'set' &&
      decoded.data.id === WidgetId.VestingPayments
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

  const vestingEnabled =
    !!context.info.items[DAO_WIDGET_ITEM_NAMESPACE + WidgetId.VestingPayments]

  return {
    key: ActionKey.ConfigureVestingPayments,
    Icon: SuitAndTieEmoji,
    label: vestingEnabled
      ? t('title.configureVestingPayments')
      : t('title.enableVestingPayments'),
    description: vestingEnabled
      ? t('info.configureVestingPaymentsDescription')
      : t('widgetDescription.vesting'),
    keywords: ['payroll'],
    notReusable: true,
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
