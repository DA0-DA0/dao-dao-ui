import { useRouter } from 'next/router'
import Pusher, { Channel } from 'pusher-js'
import { useCallback, useEffect, useRef, useState } from 'react'

import { useAppLayoutContext } from '@dao-dao/stateless'
import {
  DaoPageMode,
  DaoWebSocket,
  DaoWebSocketConnectionInfo,
} from '@dao-dao/types'
import {
  WEB_SOCKET_PUSHER_APP_KEY,
  WEB_SOCKET_PUSHER_HOST,
  WEB_SOCKET_PUSHER_PORT,
  getDaoPath,
  objectMatchesStructure,
} from '@dao-dao/utils'

const channelNameForConnectionInfo = ({
  chainId,
  coreAddress,
}: DaoWebSocketConnectionInfo) => `${chainId}_${coreAddress}`

// Take the DaoPageMode so we can detect when on a DAO page, and disconnect when
// leaving a DAO page. This hook is used outside of an AppLayoutContext since
// its response is added to the context, so we need to explicitly provide the
// page mode.
export const useDaoWebSocket = (pageMode: DaoPageMode): DaoWebSocket => {
  // Create pusher client once mounted in browser.
  const pusher = useRef<Pusher | null>(null)
  const [connected, setConnected] = useState(false)

  const [channel, setChannel] = useState<Channel | null>(null)
  const connectionInfo = useRef<DaoWebSocketConnectionInfo | null>(null)

  const connect = useCallback(
    ({ chainId, coreAddress }: DaoWebSocketConnectionInfo) => {
      // Create pusher client if not already created.
      if (!pusher.current) {
        pusher.current = new Pusher(WEB_SOCKET_PUSHER_APP_KEY, {
          wsHost: WEB_SOCKET_PUSHER_HOST,
          wsPort: WEB_SOCKET_PUSHER_PORT,
          wssPort: WEB_SOCKET_PUSHER_PORT,
          forceTLS: true,
          disableStats: true,
          enabledTransports: ['ws', 'wss'],
          disabledTransports: ['sockjs', 'xhr_streaming', 'xhr_polling'],
        })

        pusher.current.connection.bind('state_change', (states: any) => {
          if (states.current === 'disconnected') {
            console.log('WebSocket disconnected.')
            // Clear channel so listeners are removed.
            setChannel(null)
          } else if (states.current === 'connected') {
            console.log('WebSocket connected.')
          }

          // Update connected state so listeners know if they are active or not.
          setConnected(states.current === 'connected')
        })
      }

      // If already connected to the DAO, do nothing.
      if (
        connectionInfo.current &&
        connectionInfo.current.chainId === chainId &&
        connectionInfo.current.coreAddress === coreAddress
      ) {
        return
      }

      console.log(
        `${
          connectionInfo.current ? 'Switching' : 'Connecting'
        } to WebSocket...`,
        coreAddress
      )

      // Disconnect from the previous channel if connected.
      if (connectionInfo.current) {
        pusher.current.unsubscribe(
          channelNameForConnectionInfo(connectionInfo.current)
        )
      }

      // Make sure we're connected.
      pusher.current.connect()

      // Connect to the new channel.
      connectionInfo.current = { chainId, coreAddress }
      setChannel(
        pusher.current.subscribe(
          channelNameForConnectionInfo(connectionInfo.current)
        )
      )
    },
    []
  )

  const disconnect = useCallback(() => {
    if (!pusher.current) {
      return
    }

    console.log(
      'Disconnecting from WebSocket...',
      connectionInfo.current?.coreAddress
    )

    connectionInfo.current = null
    pusher.current.disconnect()
  }, [])

  // On navigate to non-DAO path, disconnect from the WebSocket.
  const { asPath } = useRouter()
  useEffect(() => {
    if (
      !asPath.startsWith(getDaoPath(pageMode, '')) &&
      connectionInfo.current
    ) {
      disconnect()
    }
  }, [asPath, disconnect, pageMode])

  return {
    connected,
    channel,
    connect,
    disconnect,
  }
}

type OnMessageCallback = (data: Record<string, any>) => any
// If data not passed, will use the default data passed to the hook.
type OnMessageFallback = (data?: Record<string, any>) => void

// Listens for messages from the DAO WebSocket and calls the callback if the
// message type matches the expected type. Returns whether or not the listener
// is currently active.
export const useOnDaoWebSocketMessage = (
  expectedType: string,
  onMessage: OnMessageCallback,
  // If passed, will be used as the default data for the fallback function
  // returned. The returned fallback function optionally allows passing data
  // which will override this default.
  defaultFallbackData?: Parameters<OnMessageFallback>[0]
): {
  listening: boolean
  fallback: OnMessageFallback
} => {
  const { connected, channel } = useAppLayoutContext().daoWebSocket

  // Store callback in ref so it can be used in the effect without having to
  // reapply the handler on every re-render. This avoids having to pass in a
  // memoized `useCallback` function to prevent additional re-renders.
  const callbackRef = useRef<OnMessageCallback>(onMessage)
  callbackRef.current = onMessage

  const [listening, setListening] = useState(false)
  useEffect(() => {
    if (!connected || !channel) {
      setListening(false)
      return
    }

    // Listen for messages and call callback if the message matches the type.
    const handler = (data: any) => {
      if (
        objectMatchesStructure(data, {
          type: {},
          data: {},
        }) &&
        data.type === expectedType
      ) {
        callbackRef.current(data.data)
      }
    }

    channel.bind('broadcast', handler)
    setListening(true)

    console.log(`Listening for WebSocket ${expectedType} messages...`)

    // Remove listener on unmount.
    return () => {
      channel.unbind('broadcast', handler)
      setListening(false)
    }
  }, [channel, expectedType, connected])

  // Create a memoized fallback function that calls the callback with the
  // fallback data. This is useful for when the WebSocket is not connected, but
  // we still want to execute the callback.
  const defaultFallbackDataRef = useRef(defaultFallbackData)
  defaultFallbackDataRef.current = defaultFallbackData
  const fallback: OnMessageFallback = useCallback((data) => {
    callbackRef.current(data ?? defaultFallbackDataRef.current ?? {})
  }, [])

  return {
    listening,
    fallback,
  }
}
