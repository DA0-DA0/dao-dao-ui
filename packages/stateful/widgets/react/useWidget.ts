import { LoadedWidget, WidgetId } from '@dao-dao/types'

import { useWidgets } from './useWidgets'

// Return the loaded widget for the current DAO if it exists.
export const useWidget = <Data extends Record<string, unknown> = any>(
  widgetId: WidgetId
): LoadedWidget<Data> | undefined => {
  const widgets = useWidgets()

  return widgets.loading
    ? undefined
    : widgets.data.find(({ widget }) => widget.id === widgetId)
}
