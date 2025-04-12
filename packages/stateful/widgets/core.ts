import { CreatingDaoPlaceholder } from '@dao-dao/state/clients/dao'
import {
  DaoWidget,
  IDaoBase,
  Widget,
  WidgetFilterOptions,
} from '@dao-dao/types'
import { versionGte } from '@dao-dao/utils'

import {
  PressWidget,
  RetroactiveCompensationWidget,
  VestingPaymentsWidget,
  VoteDelegationWidget,
} from './widgets'

/**
 * Get active widgets for the context.
 */
export const getWidgets = ({
  chainId,
  version,
  isDaoCreation = false,
}: WidgetFilterOptions): readonly Widget[] =>
  [
    // MintNftWidget,
    VestingPaymentsWidget,
    RetroactiveCompensationWidget,
    VoteDelegationWidget,
    PressWidget,
    // Add widgets here.
  ].filter(
    (widget) =>
      (!widget.isChainSupported || widget.isChainSupported(chainId)) &&
      (!widget.minVersion || versionGte(version, widget.minVersion)) &&
      (!isDaoCreation || widget.supportsDaoCreation)
  )

/**
 * Get widget by ID.
 */
export const getWidgetById = <Variables extends Record<string, unknown> = any>(
  options: WidgetFilterOptions,
  id: string
): Widget<Variables> | undefined =>
  getWidgets(options).find((widget) => widget.id === id)

/**
 * Get widget in a DAO. Returns null if the widget is not found.
 */
export const getDaoWidget = <Variables extends Record<string, unknown> = any>(
  dao: IDaoBase,
  id: string
): {
  widget: Widget<Variables>
  daoWidget: DaoWidget<Variables>
} | null => {
  const daoWidget = dao.getWidget(id)
  if (!daoWidget) {
    return null
  }

  const widget = getWidgetById(
    {
      chainId: dao.chainId,
      version: dao.coreVersion,
      isDaoCreation: dao instanceof CreatingDaoPlaceholder,
    },
    id
  )

  if (!widget) {
    return null
  }

  return {
    widget,
    daoWidget,
  }
}

/**
 * Get all widgets in DAO.
 */
export const getDaoWidgets = (
  dao: IDaoBase
): {
  widget: Widget
  daoWidget: DaoWidget
}[] => {
  const widgets = getWidgets({
    chainId: dao.chainId,
    version: dao.coreVersion,
    isDaoCreation: dao instanceof CreatingDaoPlaceholder,
  })

  return dao.widgets.flatMap((daoWidget) => {
    const widget = widgets.find((widget) => widget.id === daoWidget.id)
    if (!widget) {
      return []
    }

    return { widget, daoWidget }
  })
}
