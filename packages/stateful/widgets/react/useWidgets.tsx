// External API

import { ComponentType, useMemo } from 'react'
import { constSelector, useRecoilValue } from 'recoil'

import { DaoCoreV2Selectors } from '@dao-dao/state/recoil'
import { useCachedLoadable, useDaoInfoContext } from '@dao-dao/stateless'
import {
  DaoWidget,
  LoadingData,
  Widget,
  WidgetVisibilityContext,
} from '@dao-dao/types'
import { DAO_WIDGET_ITEM_NAMESPACE } from '@dao-dao/utils'

import { useMembership } from '../../hooks'
import { getWidgetById } from '../core'

type UseWidgetsOptions = {
  // If true, will suspend while loading. Otherwise, will start off as loading
  // but not suspend the UI.
  suspendWhileLoading?: boolean
}

type LoadedWidget = {
  widget: Widget
  daoWidget: DaoWidget
  WidgetComponent: ComponentType
}

type UseWidgetsResult = LoadingData<LoadedWidget[]>

// Get widgets for the DAO. If nothing configured or no system found, returns
// undefined.
export const useWidgets = ({
  suspendWhileLoading = false,
}: UseWidgetsOptions = {}): UseWidgetsResult => {
  const { coreAddress, chainId } = useDaoInfoContext()
  const { isMember = false } = useMembership({
    coreAddress,
    chainId,
  })

  const widgetItemsSelector = DaoCoreV2Selectors.listAllItemsWithPrefixSelector(
    {
      chainId,
      contractAddress: coreAddress,
      prefix: DAO_WIDGET_ITEM_NAMESPACE,
    }
  )

  // If suspend while loading, load the items here. Otherwise, don't block by
  // loading a constant value immediately.
  useRecoilValue(
    suspendWhileLoading ? widgetItemsSelector : constSelector(undefined)
  )

  const widgetItemsLoadable = useCachedLoadable(widgetItemsSelector)

  const loadedWidgets = useMemo((): LoadedWidget[] | undefined => {
    if (widgetItemsLoadable.state !== 'hasValue') {
      return
    }

    const parsedWidgets = widgetItemsLoadable.contents
      .map(([key, widgetJson]): DaoWidget | undefined => {
        try {
          return {
            id: key.replace(new RegExp(`^${DAO_WIDGET_ITEM_NAMESPACE}`), ''),
            values: (widgetJson && JSON.parse(widgetJson)) || {},
          }
        } catch (err) {
          // Ignore widget format error but log to console for debugging.
          console.error(`Invalid widget JSON: ${widgetJson}`, err)
          return
        }
      })
      // Validate widget structure.
      .filter((widget): widget is DaoWidget => !!widget)

    return (
      parsedWidgets
        .map((daoWidget): LoadedWidget | undefined => {
          const widget = getWidgetById(daoWidget.id)
          if (!widget) {
            return
          }

          // Enforce visibility context.
          switch (widget.visibilityContext) {
            case WidgetVisibilityContext.OnlyMembers:
              if (!isMember) {
                return
              }
              break
            case WidgetVisibilityContext.OnlyNonMembers:
              if (isMember) {
                return
              }
              break
          }

          // Fill component with loaded values.
          const WidgetComponent = () => (
            <widget.Component variables={(daoWidget.values || {}) as any} />
          )

          return {
            widget,
            daoWidget,
            WidgetComponent,
          }
        })
        // Filter out any undefined widgets.
        .filter((widget): widget is LoadedWidget => !!widget)
    )
  }, [widgetItemsLoadable, isMember])

  return loadedWidgets
    ? {
        loading: false,
        data: loadedWidgets,
      }
    : {
        loading: true,
      }
}
