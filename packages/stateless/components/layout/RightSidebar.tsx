import {
  KeyboardDoubleArrowRight,
  Paid,
  SavingsRounded,
} from '@mui/icons-material'
import clsx from 'clsx'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'

import {
  RightSidebarContentProps,
  RightSidebarProps,
} from '@dao-dao/types/stateless/RightSidebar'

import { Button } from '../buttons'
import { IconButton } from '../icon_buttons'
import { useAppLayoutContext } from './AppLayoutContext'

export * from '@dao-dao/types/stateless/RightSidebar'

export const RightSidebar = ({
  wallet,
  setContentRef,
  WalletFiatRampModal,
}: RightSidebarProps) => {
  const { t } = useTranslation()

  const { enabled: responsiveEnabled, toggle: toggleResponsive } =
    useAppLayoutContext().responsiveRightSidebar

  // Set this to a value to show the fiat ramp modal defaulted to that option.
  const [fiatRampDefaultModeVisible, setFiatRampDefaultModeVisible] = useState<
    'buy' | 'sell' | undefined
  >()

  return (
    <>
      {/* Layer underneath that allows closing the responsive sidebar by tapping on visible parts of the page. */}
      {responsiveEnabled && (
        <div
          className="absolute top-0 right-0 bottom-0 left-0 z-[29] cursor-pointer xl:hidden"
          onClick={() => responsiveEnabled && toggleResponsive()}
        ></div>
      )}

      <div
        className={clsx(
          // General
          'no-scrollbar flex w-[90vw] flex-col items-stretch overflow-y-auto bg-background-base p-6 pt-0 transition-all duration-[225ms] sm:w-96',
          // Responsive
          'absolute top-0 bottom-0 z-30 shadow-dp8',
          responsiveEnabled
            ? 'right-0 opacity-100'
            : 'pointer-events-none -right-full opacity-0 sm:-right-96',
          // Large
          'xl:pointer-events-auto xl:relative xl:left-0 xl:shrink-0 xl:opacity-100 xl:shadow-none'
        )}
      >
        {/* Show responsive close button. */}
        <div className="fixed right-4 bottom-4 z-40 cursor-pointer rounded-full bg-background-base shadow-dp8 transition sm:right-6 sm:bottom-6 xl:hidden">
          <IconButton
            Icon={KeyboardDoubleArrowRight}
            // Match ProfileImage rounding.
            circular
            onClick={toggleResponsive}
            variant="secondary"
          />
        </div>

        {wallet}

        <div className="mt-1">
          {/* Content gets inserted here when the portal <RightSidebarContent> below is used. */}
          <div ref={setContentRef}></div>
        </div>

        {/* Only show if defined, which indicates wallet connected. */}
        {WalletFiatRampModal && (
          <div className="mt-6 flex flex-col items-stretch gap-2">
            <Button
              center
              onClick={() => setFiatRampDefaultModeVisible('buy')}
              size="lg"
              variant="secondary"
            >
              <Paid />
              {t('button.depositFiat')}
            </Button>

            <Button
              center
              onClick={() => setFiatRampDefaultModeVisible('sell')}
              size="lg"
              variant="secondary"
            >
              <SavingsRounded />
              {t('button.withdrawFiat')}
            </Button>
          </div>
        )}
      </div>

      {WalletFiatRampModal && (
        <WalletFiatRampModal
          defaultMode={fiatRampDefaultModeVisible}
          onClose={() => setFiatRampDefaultModeVisible(undefined)}
          visible={fiatRampDefaultModeVisible !== undefined}
        />
      )}
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
