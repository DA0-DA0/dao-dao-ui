import { createPortal } from 'react-dom'

import {
  PageHeader,
  PageLoader,
  useAppContextIfAvailable,
} from '@dao-dao/stateless'
import { PageHeaderProps } from '@dao-dao/types'

import { SidebarWallet } from './SidebarWallet'

// This is a portal that inserts a PageHeader wherever the AppContext's
// `pageHeaderRef` is placed. This is handled by the layout components. See the
// `ReactSidebarContent` comment in `RightSidebar.tsx` for more information on
// how this works.
//
// If not in an AppContext, this component will render a PageHeader normally
// instead of using the portal.
export const PageHeaderContent = (props: PageHeaderProps) => {
  const appContext = useAppContextIfAvailable()

  const pageHeader = (
    <PageHeader
      {...props}
      rightNode={
        <div className="flex flex-row items-center justify-end gap-4 pr-2">
          {props.rightNode}

          <SidebarWallet />
        </div>
      }
    />
  )

  // If app context is available, but the page header ref is not, render nothing
  // until the ref is available. If not in an app context, render the element
  // directly. The direct render is useful when outside the AppContext, such as
  // error pages in the SDA.
  return appContext ? (
    appContext.pageHeaderRef.current ? (
      createPortal(pageHeader, appContext.pageHeaderRef.current)
    ) : (
      <PageLoader className="absolute top-0 right-0 bottom-0 left-0 z-50 bg-background-base" />
    )
  ) : (
    pageHeader
  )
}
