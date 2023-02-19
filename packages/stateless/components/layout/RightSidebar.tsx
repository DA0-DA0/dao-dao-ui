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
import { useAppContext } from './AppContext'

export * from '@dao-dao/types/stateless/RightSidebar'

export const RightSidebar = ({
  wallet,
  WalletFiatRampModal,
}: RightSidebarProps) => {
  const { t } = useTranslation()

  const {
    setRightSidebarRef,
    responsiveRightSidebar: {
      enabled: responsiveEnabled,
      toggle: toggleResponsive,
    },
  } = useAppContext()

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
          <div ref={setRightSidebarRef}></div>
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

// This is a portal that teleports content, used in pages to render content in
// the right sidebar (which is located in a separate React tree due to the
// nature of `DappLayout`/`SdaLayout` managing the layout of the navigation bar,
// main page content, and right sidebar). This component uses a reference to the
// container `div` (seen above with property `ref={setRightSidebarRef}`) and
// provides a component that will funnel its `children` into a React portal
// (https://reactjs.org/docs/portals.html). `AppContext` provides a ref which
// the `RightSidebar` component above uses and the `RightSidebarContent` below
// uses. This ref is accessible via the `useAppContext` hook so that descendants
// of the context provider (such as page components) can use the
// `RightSidebarContent` component below and specify what renders in the
// sidebar. The API for a page is as simple as:
//
// export const Page = () => (
//   <>
//     <RightSidebarContent>
//       <ProfileCard title="@Modern-Edamame" />
//     </RightSidebarContent>

//     {/* ... Page content here ... */}
//   </>
// )
//
// See https://malcolmkee.com/blog/portal-to-subtree/ for an example using
// portals to render components across subtrees with similar syntax.
export const RightSidebarContent = ({ children }: RightSidebarContentProps) => {
  const container = useAppContext().rightSidebarRef
  return container.current ? createPortal(children, container.current) : null
}
