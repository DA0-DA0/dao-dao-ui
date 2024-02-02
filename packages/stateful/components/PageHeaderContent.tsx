import { createPortal } from 'react-dom'

import {
  PageHeader,
  PageLoader,
  useAppContextIfAvailable,
} from '@dao-dao/stateless'
import { PageHeaderProps } from '@dao-dao/types'

import { SidebarWallet } from './SidebarWallet'

// This is a portal that teleports content, used in pages to render content in
// the header (which is located in a separate React tree due to `DappLayout` and
// `SdaLayout` managing the layouts of the apps). This component uses a
// reference to the target div (stored in the `AppContext`) and provides a
// component that will funnel its `children` into a React portal
// (https://reactjs.org/docs/portals.html). This ref is accessible via the
// `useAppContext` hook so that descendants of the context provider (such as
// page components) can use the `PageHeaderContent` component below and specify
// what renders in the header. The API for a page is as simple as:
//
// export const Page = () => (
//   <>
//     <PageHeaderContent title="Page Title" />

//     {/* ... Page content here ... */}
//   </>
// )
//
// See https://malcolmkee.com/blog/portal-to-subtree/ for an example using
// portals to render components across subtrees with similar syntax.
//
// If not in an AppContext, this component will render a PageHeader normally
// instead of using the portal.
export const PageHeaderContent = (props: PageHeaderProps) => {
  const appContext = useAppContextIfAvailable()

  const pageHeader = (
    <PageHeader
      {...props}
      rightNode={
        <div className="flex flex-row items-center justify-end gap-4">
          {props.rightNode}

          <SidebarWallet containerClassName="hidden md:flex border-l border-border-secondary pl-4 min-w-72 self-stretch" />
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
