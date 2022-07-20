import { DaoPageWrapper, DaoPageWrapperProps } from '@dao-dao/common'
import { SuspenseLoader } from '@dao-dao/ui'

import { Header } from './Header'
import { Loader, PageLoader } from './Loader'
import { Logo } from './Logo'

export type PageWrapperProps = DaoPageWrapperProps

export const PageWrapper = ({ children, ...props }: PageWrapperProps) => (
  <DaoPageWrapper
    {...props}
    Loader={Loader}
    Logo={Logo}
    PageLoader={PageLoader}
  >
    <Header />

    <SuspenseLoader
      // Make room at top for Header.
      fallback={<PageLoader className="!min-h-[calc(100vh-5rem)]" />}
    >
      <div className="p-4 mx-auto max-w-page sm:p-8">{children}</div>
    </SuspenseLoader>
  </DaoPageWrapper>
)
