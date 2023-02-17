import { useCallback, useState } from 'react'

import {
  AppContext,
  makePageHeader,
  makeRightSidebarContent,
} from '@dao-dao/stateless'
import {
  AppContextProviderProps,
  CommandModalContextMaker,
  RightSidebarProps,
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
  const [PageHeader, setPageHeader] = useState(() => makePageHeader(null))
  const setPageHeaderRef = useCallback(
    (ref: HTMLDivElement | null) =>
      // Use state setting function since we want to return a function
      // (component).
      setPageHeader(() => makePageHeader(ref)),
    []
  )

  // Right sidebar.
  const [RightSidebarContent, setRightSidebarContent] = useState(() =>
    makeRightSidebarContent(null)
  )
  // See comment on makeRightSidebarContent in RightSidebar.tsx for information
  // on what this is and how it works and why it exists. Use state setting
  // function since we want to return a function (component).
  const setRightSidebarContentRef: RightSidebarProps['setContentRef'] =
    useCallback(
      (ref) =>
        // Use state setting function since we want to return a function
        // (component).
        setRightSidebarContent(() => makeRightSidebarContent(ref)),
      []
    )

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
        // Include the page header and right sidebar portal renderers in the
        // context to be accessed by pages, and the ref setters to be accessed
        // by the layout component.
        PageHeader,
        setPageHeaderRef,
        RightSidebarContent,
        setRightSidebarContentRef,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
