// External API

import { ComponentType, useMemo } from 'react'

import { DaoCoreV2Selectors } from '@dao-dao/state/recoil'
import { useCachedLoadable, useDaoInfoContext } from '@dao-dao/stateless'
import { DaoWidgets, LoadingData } from '@dao-dao/types'
import { objectMatchesStructure } from '@dao-dao/utils'

import { DAO_WIDGETS_ITEM_KEY, getWidgetById } from '../core'

// Get widgets for the DAO. If nothing configured or no system found, returns
// undefined.
export const useWidgets = (): LoadingData<ComponentType[]> => {
  const { chainId, coreAddress } = useDaoInfoContext()

  const widgetsItemLoadable = useCachedLoadable(
    DaoCoreV2Selectors.getItemSelector({
      chainId,
      contractAddress: coreAddress,
      params: [
        {
          key: DAO_WIDGETS_ITEM_KEY,
        },
      ],
    })
  )

  const widgetComponents = useMemo((): ComponentType[] | undefined => {
    if (
      widgetsItemLoadable.state !== 'hasValue' ||
      !widgetsItemLoadable.contents.item
    ) {
      return
    }

    try {
      const value = JSON.parse(widgetsItemLoadable.contents.item)
      if (
        objectMatchesStructure(value, {
          widgets: {},
        }) &&
        value.widgets &&
        Array.isArray(value.widgets) &&
        value.widgets.every((widget: unknown) =>
          objectMatchesStructure(widget, {
            id: {},
          })
        )
      ) {
        const { widgets } = value as DaoWidgets

        return widgets
          .map(({ id, values }): ComponentType | undefined => {
            const widget = getWidgetById(id)
            if (widget) {
              const WidgetComponent = () => (
                <widget.Component variables={(values || {}) as any} />
              )
              return WidgetComponent
            }
          })
          .filter((component): component is ComponentType => !!component)
      }
    } catch {}
  }, [widgetsItemLoadable.state, widgetsItemLoadable.contents])

  return widgetComponents
    ? { loading: false, data: widgetComponents }
    : {
        loading: true,
      }
}
