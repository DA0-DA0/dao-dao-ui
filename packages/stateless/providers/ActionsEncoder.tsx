import { ReactNode, useMemo } from 'react'

import { ActionEncodeContext, ActionKeyAndDataNoId } from '@dao-dao/types'

import { ActionsEncoder } from '../actions'
import { ActionsEncoderContext, useActions } from '../contexts'
import { useLoadingPromise } from '../hooks'

export type ActionsEncoderProviderProps = {
  /**
   * Encode context.
   */
  encodeContext: ActionEncodeContext
  /**
   * Optionally immediately encode action keys and data. If undefined, encoder
   * will start in initialized state.
   */
  actionKeysAndData?: ActionKeyAndDataNoId[]
  /**
   * The children to render.
   */
  children: ReactNode
}

export const ActionsEncoderProvider = ({
  encodeContext,
  actionKeysAndData,
  children,
}: ActionsEncoderProviderProps) => {
  const actions = useActions()
  const encoder = useMemo(
    () => new ActionsEncoder(encodeContext, actions),
    [encodeContext, actions]
  )

  // Encode the actions whenever they change. All descendants will re-render
  // when this promise resolves or errors, so descendants should immediately
  // render updates to the encoder class instance's state.
  useLoadingPromise({
    promise: actionKeysAndData && (() => encoder.encode(actionKeysAndData)),
    deps: [encoder, actionKeysAndData && JSON.stringify(actionKeysAndData)],
  })

  return (
    <ActionsEncoderContext.Provider
      value={{
        encoder,
      }}
    >
      {children}
    </ActionsEncoderContext.Provider>
  )
}
