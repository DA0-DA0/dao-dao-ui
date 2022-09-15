import { KeyboardDoubleArrowRight } from '@mui/icons-material'
import clsx from 'clsx'
import { useState } from 'react'
import { createPortal } from 'react-dom'

import {
  RightSidebarContentProps,
  RightSidebarProps,
} from '@dao-dao/tstypes/ui/RightSidebar'

import { IconButton } from '../IconButton'
import { ProfileImage } from '../profile'
import { Footer } from './Footer'

export * from '@dao-dao/tstypes/ui/RightSidebar'

export const RightSidebar = ({
  wallet,
  setContentRef,
  profileImageUrl,
}: RightSidebarProps) => {
  const [responsiveVisible, setResponsiveVisible] = useState(false)

  return (
    <>
      <ProfileImage
        className="absolute top-6 right-4 z-10 shadow-dp4 hover:opacity-80 active:opacity-70 transition cursor-pointer xl:hidden"
        imageUrl={profileImageUrl}
        onClick={() => setResponsiveVisible((v) => !v)}
        size="xs"
      />

      <div
        className={clsx(
          // General
          'flex flex-col items-stretch p-6 pt-0 w-full bg-background-base transition-all duration-[225ms] sm:w-96',
          // Responsive
          'absolute top-0 bottom-0 z-30 shadow-dp8',
          responsiveVisible
            ? 'right-0 opacity-100'
            : '-right-full opacity-0 sm:-right-96',
          // Large
          'xl:relative xl:left-0 xl:shrink-0 xl:shadow-none xl:opacity-100'
        )}
      >
        {/* Show responsive close button. */}
        <div className="box-border flex overflow-hidden flex-row justify-end items-start py-6 pr-1 -mr-3 h-20 transition-all xl:py-0 xl:mt-0 xl:max-h-0">
          <IconButton
            Icon={KeyboardDoubleArrowRight}
            // Match ProfileImage rounding.
            circular
            onClick={() => setResponsiveVisible(false)}
            variant="secondary"
          />
        </div>

        {wallet}

        <div className="overflow-y-scroll py-1 pr-4 mt-1 -mr-4 styled-scrollbar">
          <div ref={setContentRef}></div>

          <div className="mt-7">
            <Footer />
          </div>
        </div>
      </div>
    </>
  )
}

// This is a function that generates a function component, used in pages to
// render content in the right sidebar (which is located in a separate React
// tree due to the nature of `AppLayout` managing the layout of the navigation
// bar, main page content, and right sidebar). This function uses a reference to
// the container `div` (seen above with property `ref={setContentRef}`) and
// provides a function component that will funnel its `children` into a React
// portal (https://reactjs.org/docs/portals.html). More specifically,
// `AppLayout` passes a ref callback to the `RightSidebar` component defined
// above. In this callback, `AppLayout` calls this maker function and stores the
// result (the `RightSidebarContent` function component) in a `useState` hook.
// The `useState` hook is initialized to the result of this maker function with
// an argument of `null`, which safely renders nothing before the ref callback
// executes (letting the pages use consistent syntax and removing the need to
// listen for any state/event updates). This state value is passed into the
// `AppLayoutContext.Provider` so that descendants of the context provider (such
// as page components) can retrieve the `RightSidebarContent` component via
// `useAppLayoutContext` in `AppLayoutContext.tsx` and specify what renders in
// the sidebar. When the `useState` hook is updated with the result of this
// maker function called with a valid container element reference (which occurs
// when the container `div` above renders), the `RightSidebarContent` value
// located in the `useState` hook in `AppLayout` and retrieved via the context
// hook in pages is updated with a component that is able to create the portal,
// and the page re-renders, displaying the content. The API for a page is as
// simple as:
//
// export const Page = () => { const { RightSidebarContent } =
//   useAppLayoutContext()

//   return (
//     <>
//       <RightSidebarContent>
//         <ProfileCard title="@Modern-Edamame" />
//       </RightSidebarContent>

//       {/* ... Page content here ... */}
//     </>
//   )
// }
//
// See https://malcolmkee.com/blog/portal-to-subtree/ for an example using
// portals to render components across subtrees with similar syntax.
export const makeRightSidebarContent = (container: HTMLDivElement | null) =>
  function RightSidebarContent({ children }: RightSidebarContentProps) {
    return container ? createPortal(children, container) : null
  }
