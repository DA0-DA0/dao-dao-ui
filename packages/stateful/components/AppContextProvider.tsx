import { useRef, useState } from 'react'

import { AppContext } from '@dao-dao/stateless'
import {
  AppContextProviderProps,
  CommandModalContextMaker,
} from '@dao-dao/types'

import { makeGenericContext } from '../command'
import { useDaoWebSocket } from '../hooks/useDaoWebSocket'
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

  // Page header.
  const pageHeaderRef = useRef<HTMLDivElement | null>(null)
  // Right sidebar.
  const rightSidebarRef = useRef<HTMLDivElement | null>(null)

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

  // WebSocket.
  const daoWebSocket = useDaoWebSocket(mode)

  return (
    <AppContext.Provider
      value={{
        mode,
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
        rootCommandContextMaker,
        setRootCommandContextMaker: (maker) =>
          // See comment in `_setRootCommandContextMaker` for an explanation on
          // why we pass a function here.
          _setRootCommandContextMaker(() => maker),
        inbox,
        daoWebSocket,
        // Include the page header and right sidebar portal refs in the context
        // to be accessed by the component portals.
        pageHeaderRef,
        rightSidebarRef,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
