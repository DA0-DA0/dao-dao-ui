import { ReactNode, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Action, ActionOptions } from '@dao-dao/tstypes'

import { getActions } from '../actions'
import { ActionsContext } from './context'

export interface ActionsProviderProps {
  options: Omit<ActionOptions, 't'>
  additionalActions?: Action[]
  children: ReactNode | ReactNode[]
}

// Ensure this re-renders when the options. You can do this by setting a `key` on this component or one
// of its ancestors. See DaoPageWrapper.tsx where this component is used.
export const ActionsProvider = ({
  options: _options,
  additionalActions,
  children,
}: ActionsProviderProps) => {
  const { t } = useTranslation()

  const context = useMemo(() => {
    const options: ActionOptions = {
      t,
      ..._options,
    }

    return {
      options,
      actions: getActions(options)
        .concat(additionalActions ?? [])
        // Sort alphabetically.
        .sort((a, b) =>
          a.label.toLowerCase().localeCompare(b.label.toLowerCase())
        ),
    }
  }, [t, _options, additionalActions])

  return (
    <ActionsContext.Provider value={context}>
      {children}
    </ActionsContext.Provider>
  )
}
