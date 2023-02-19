import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'

import { indexerWebSocketChannelSubscriptionsAtom } from '@dao-dao/state/recoil'
import { AppContext } from '@dao-dao/stateless'
import {
  AppContextProviderProps,
  CommandModalContextMaker,
  CommonAppContext,
  DaoPageMode,
} from '@dao-dao/types'

import { makeGenericContext } from '../command'
import { useWebSocket } from '../hooks'
import { useInbox } from '../inbox'

export const AppContextProvider = ({
  mode,
  children,
}: AppContextProviderProps) => {
  // Visibility toggles.
  const [responsiveNavigationEnabled, setResponsiveNavigationEnabled] =
    useState(false)
  const [responsiveRightSidebarEnabled, setResponsiveRightSidebarEnabled] =
    useState(false)
  const [updateProfileNftVisible, setUpdateProfileNftVisible] = useState(false)

  // Page header. Set state when ref is set so it re-renders immediately.
  // Without this, the page header is invisible until the next render.
  const [, setPageHeaderSet] = useState(false)
  const pageHeaderRef = useRef<HTMLDivElement | null>(null)
  const setPageHeaderRef = useCallback((ref: HTMLDivElement | null) => {
    pageHeaderRef.current = ref
    if (ref) {
      setPageHeaderSet(true)
    }
  }, [])
  // Right sidebar. Set state when ref is set so it re-renders immediately.
  // Without this, the right sidebar is invisible until the next render.
  const [, setRightSidebarSet] = useState(false)
  const rightSidebarRef = useRef<HTMLDivElement | null>(null)
  const setRightSidebarRef = useCallback((ref: HTMLDivElement | null) => {
    rightSidebarRef.current = ref
    if (ref) {
      setRightSidebarSet(true)
    }
  }, [])

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
    responsiveRightSidebar: {
      enabled: responsiveRightSidebarEnabled,
      toggle: () => setResponsiveRightSidebarEnabled((v) => !v),
    },
    updateProfileNft: {
      visible: updateProfileNftVisible,
      toggle: () => setUpdateProfileNftVisible((v) => !v),
    },
    // Include the page header and right sidebar portal refs in the context
    // to be accessed by the component portals.
    pageHeaderRef,
    setPageHeaderRef,
    rightSidebarRef,
    setRightSidebarRef,
  }

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

  // Inbox.
  const inbox = useInbox()

  return (
    <AppContext.Provider
      value={{
        ...commonContext,

        mode: DaoPageMode.Dapp,

        // Command modal.
        rootCommandContextMaker,
        setRootCommandContextMaker: (maker) =>
          // See comment in `_setRootCommandContextMaker` for an explanation on
          // why we pass a function here.
          _setRootCommandContextMaker(() => maker),

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
