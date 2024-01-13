// External API

import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useChain, useDaoInfoContext } from '@dao-dao/stateless'
import {
  DaoWidget,
  LoadedWidget,
  LoadingData,
  WidgetLocation,
  WidgetVisibilityContext,
} from '@dao-dao/types'
import {
  DAO_WIDGET_ITEM_NAMESPACE,
  getFilteredDaoItemsByPrefix,
} from '@dao-dao/utils'

import { useMembership } from '../../hooks'
import { getWidgetById } from '../core'

type UseWidgetsOptions = {
  // If passed, will only return the widgets in this location.
  location?: WidgetLocation
}

type UseWidgetsResult = LoadingData<LoadedWidget[]>

// Get widgets for the DAO.
export const useWidgets = ({
  location,
}: UseWidgetsOptions = {}): UseWidgetsResult => {
  const { t } = useTranslation()
  const { chain_id: chainId } = useChain()
  const { coreAddress, items } = useDaoInfoContext()
  const { isMember = false } = useMembership({
    coreAddress,
  })

  const loadingWidgets = useMemo((): LoadingData<LoadedWidget[]> => {
    const parsedWidgets = getFilteredDaoItemsByPrefix(
      items,
      DAO_WIDGET_ITEM_NAMESPACE
    )
      .map(([id, widgetJson]): DaoWidget | undefined => {
        try {
          return {
            id,
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

    return {
      loading: false,
      data: parsedWidgets
        .map((daoWidget): LoadedWidget | undefined => {
          const widget = getWidgetById(chainId, daoWidget.id)
          // Enforce location filter.
          if (!widget || (location && widget.location !== location)) {
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
            <widget.Renderer variables={(daoWidget.values || {}) as any} />
          )

          return {
            title: t('widgetTitle.' + widget.id),
            widget,
            daoWidget,
            WidgetComponent,
          }
        })
        // Filter out any undefined widgets.
        .filter((widget): widget is LoadedWidget => !!widget),
    }
  }, [items, isMember, t, location, chainId])

  return loadingWidgets
}
