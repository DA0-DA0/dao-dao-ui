import { useContext, useEffect, useState } from 'react'

import { objectMatchesStructure } from '@dao-dao/utils'

import { DaoContext } from '../components/dao/DaoContext'

export const useDaoContext = () => {
  const context = useContext(DaoContext)
  if (!context) {
    throw new Error(
      'useDaoContext can only be used in a descendant of DaoContext.Provider.'
    )
  }

  return context
}

export const useDaoInfo = () => useDaoContext().daoInfo
export const useDaoInfoIfAvailable = () => useContext(DaoContext)?.daoInfo

export const useDaoWebSocket = () => useDaoContext().webSocket

// Listens for messages from the DAO WebSocket and calls the callback if the
// message type matches the expected type. Returns whether or not the listener
// is currently active.
export const useOnDaoWebSocketMessage = (
  expectedType: string,
  callback: (data: Record<string, any>) => any
) => {
  const webSocket = useDaoWebSocket()
  const [listening, setListening] = useState(false)
  useEffect(() => {
    if (!webSocket || webSocket.readyState !== WebSocket.OPEN) {
      setListening(false)
      return
    }

    // Listen for messages and call callback if the message matches the type.
    const listener = (event: MessageEvent) => {
      const data = JSON.parse(event.data)
      if (
        objectMatchesStructure(data, {
          type: {},
          data: {},
        }) &&
        data.type === expectedType
      ) {
        callback(data.data)
      }
    }

    webSocket.addEventListener('message', listener)
    setListening(true)

    // Remove listener on unmount.
    return () => {
      webSocket.removeEventListener('message', listener)
      setListening(false)
    }
  }, [webSocket, callback, expectedType])

  return listening
}
