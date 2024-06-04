import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'

import { indexerWebSocketChannelSubscriptionsAtom } from '@dao-dao/state/recoil'
import { AppContext, useServiceWorker } from '@dao-dao/stateless'
import {
  AppContextProviderProps,
  CommandModalContextMaker,
  CommonAppContext,
  DaoPageMode,
} from '@dao-dao/types'

import { makeGenericContext } from '../command'
import { useInbox, useWebSocket } from '../hooks'

export const AppContextProvider = ({
  mode,
  children,
}: AppContextProviderProps) => {
  // Visibility toggles.
  const [responsiveNavigationEnabled, setResponsiveNavigationEnabled] =
    useState(false)

  const pageHeaderRef = useRef<HTMLDivElement | null>(null)

  // Unsubscribe from WebSocket channels when all subscriptions removed.
  const { pusher } = useWebSocket()
  const [
    indexerWebSocketChannelSubscriptions,
    setIndexerWebSocketChannelSubscriptions,
  ] = useRecoilState(indexerWebSocketChannelSubscriptionsAtom)
  useEffect(() => {
    if (!pusher) {
      return
    }

    const emptyChannels = Object.entries(indexerWebSocketChannelSubscriptions)
      .filter(([, subscriptions]) => subscriptions === 0)
      .map(([channel]) => channel)

    if (emptyChannels.length > 0) {
      emptyChannels.forEach((channel) => pusher.unsubscribe(channel))
      setIndexerWebSocketChannelSubscriptions((subscriptions) => {
        const newSubscriptions = { ...subscriptions }
        emptyChannels.forEach((channel) => {
          delete newSubscriptions[channel]
        })
        return newSubscriptions
      })
    }
  }, [
    indexerWebSocketChannelSubscriptions,
    pusher,
    setIndexerWebSocketChannelSubscriptions,
  ])

  const commonContext: CommonAppContext = {
    responsiveNavigation: {
      enabled: responsiveNavigationEnabled,
      toggle: () => setResponsiveNavigationEnabled((v) => !v),
    },
    pageHeaderRef,
  }

  // Install service worker.
  useServiceWorker()

  return mode === DaoPageMode.Dapp ? (
    <DappContextProvider commonContext={commonContext}>
      {children}
    </DappContextProvider>
  ) : mode === DaoPageMode.Sda ? (
    <SdaContextProvider commonContext={commonContext}>
      {children}
    </SdaContextProvider>
  ) : null
}

// App-specific context providers.

type CommonAppContextProviderProps = {
  commonContext: CommonAppContext
  children: ReactNode
}

const DappContextProvider = ({
  commonContext,
  children,
}: CommonAppContextProviderProps) => {
  // Command modal.
  const [rootCommandContextMaker, _setRootCommandContextMaker] =
    useState<CommandModalContextMaker>(
      // makeGenericContext is a function, and useState allows passing a
      // function that executes immediately and returns the initial value for
      // the state. Thus, pass a function that is called immediately, which
      // returns the function we want to set.
      () => makeGenericContext
    )
  const setRootCommandContextMaker = useCallback(
    (maker) =>
      // See comment above for an explanation on why we pass a function here.
      _setRootCommandContextMaker(() => maker),
    []
  )

  // Inbox.
  const inbox = useInbox()

  return (
    <AppContext.Provider
      value={{
        ...commonContext,

        mode: DaoPageMode.Dapp,

        // Command modal.
        rootCommandContextMaker,
        setRootCommandContextMaker,

        // Inbox.
        inbox,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const SdaContextProvider = ({
  commonContext,
  children,
}: CommonAppContextProviderProps) => (
  <AppContext.Provider
    value={{
      ...commonContext,

      mode: DaoPageMode.Sda,
    }}
  >
    {children}
  </AppContext.Provider>
)
