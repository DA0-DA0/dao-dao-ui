// External API

import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useDao } from '@dao-dao/stateless'
import {
  LoadedWidget,
  LoadingData,
  WidgetLocation,
  WidgetVisibilityContext,
} from '@dao-dao/types'

import { useMembership } from '../../hooks'
import { getDaoWidgets } from '../core'

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
  const dao = useDao()
  const { isMember = false } = useMembership()

  const loadingWidgets = useMemo(
    (): LoadingData<LoadedWidget[]> => ({
      loading: false,
      data: getDaoWidgets(dao).flatMap(
        ({ widget, daoWidget }): LoadedWidget | [] => {
          if (location && widget.location !== location) {
            return []
          }

          // Enforce visibility context.
          switch (widget.visibilityContext) {
            case WidgetVisibilityContext.OnlyMembers:
              if (!isMember) {
                return []
              }
              break
            case WidgetVisibilityContext.OnlyNonMembers:
              if (isMember) {
                return []
              }
              break
          }

          // Fill component with loaded values.
          const WidgetComponent = () =>
            widget.Renderer ? (
              <widget.Renderer variables={(daoWidget.values || {}) as any} />
            ) : null

          return {
            title: t('widgetTitle.' + widget.id),
            widget,
            daoWidget,
            WidgetComponent,
          }
        }
      ),
    }),
    [dao, isMember, t, location]
  )

  return loadingWidgets
}
