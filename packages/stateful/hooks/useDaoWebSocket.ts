import { useCallback, useEffect, useRef, useState } from 'react'

import { useAppLayoutContext } from '@dao-dao/stateless'
import { DaoWebSocket, DaoWebSocketConnectionInfo } from '@dao-dao/types'
import { objectMatchesStructure } from '@dao-dao/utils'

export const useDaoWebSocket = (): DaoWebSocket => {
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null)
  const connectionInfo = useRef<DaoWebSocketConnectionInfo | null>(null)

  const connect = useCallback(
    (
      { chainId, coreAddress }: DaoWebSocketConnectionInfo,
      // If force is true, will reconnect even if already connected to the DAO.
      // This is used when it disconnects and needs to reconnect.
      force = false
    ) => {
      // If already connected to the DAO, do nothing, unless force is true.
      if (
        !force &&
        connectionInfo.current &&
        connectionInfo.current.chainId === chainId &&
        connectionInfo.current.coreAddress === coreAddress
      ) {
        return
      }

      // Close existing WebSocket if not closed.
      if (webSocket && webSocket.readyState !== WebSocket.CLOSED) {
        webSocket.close()
      }

      console.log('Connecting to WebSocket...', chainId, coreAddress)
      connectionInfo.current = { chainId, coreAddress }

      const _webSocket = new WebSocket(
        `wss://ws.daodao.zone/${chainId}_${coreAddress}/connect`
      )

      _webSocket.addEventListener('open', () => {
        console.log('WebSocket connected.', chainId, coreAddress)
      })
      _webSocket.addEventListener('close', () => {
        console.log('WebSocket disconnected.', chainId, coreAddress)
      })
      _webSocket.addEventListener('error', () => {
        console.log('WebSocket disconnected.', chainId, coreAddress)
        _webSocket.close()
      })

      setWebSocket(_webSocket)
    },
    [connectionInfo, webSocket]
  )

  const disconnect = useCallback(() => {
    if (webSocket && webSocket.readyState !== WebSocket.CLOSED) {
      webSocket.close()
    }

    setWebSocket(null)
  }, [webSocket])

  // Ensure WebSocket is connected every 5 seconds and reconnect if not.
  // Disconnect on unmount if connected.
  useEffect(() => {
    if (!webSocket) {
      return
    }

    const interval = setInterval(() => {
      if (
        connectionInfo.current &&
        (!webSocket ||
          webSocket.readyState === WebSocket.CLOSING ||
          webSocket.readyState === WebSocket.CLOSED)
      ) {
        connect(connectionInfo.current, true)
      }
    }, 5000)

    // Clean up on unmount.
    return () => {
      clearInterval(interval)

      if (webSocket && webSocket.readyState !== WebSocket.CLOSED) {
        webSocket.close()
      }
    }
  }, [connect, connectionInfo, setWebSocket, webSocket])

  return {
    webSocket,
    connect,
    disconnect,
  }
}

// Listens for messages from the DAO WebSocket and calls the callback if the
// message type matches the expected type. Returns whether or not the listener
// is currently active.
export const useOnDaoWebSocketMessage = (
  expectedType: string,
  callback: (data: Record<string, any>) => any
) => {
  const { webSocket } = useAppLayoutContext().daoWebSocket

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
  }, [
    webSocket,
    // Make sure to add listener if readyState changes. If this is not included,
    // it won't always be called since the WebSocket may not be ready
    // immediately.
    webSocket?.readyState,
    callback,
    expectedType,
  ])

  return listening
}
