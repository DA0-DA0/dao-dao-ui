import { SdaDaoPageWrapper, SdaDaoPageWrapperProps } from '@dao-dao/common'

import { Header } from './Header'
import { Loader, PageLoader } from './Loader'
import { Logo } from './Logo'

export type PageWrapperProps = Omit<
  SdaDaoPageWrapperProps,
  'Header' | 'Loader' | 'Logo' | 'PageLoader'
>

export const PageWrapper = ({ children, ...props }: PageWrapperProps) => (
  <SdaDaoPageWrapper
    {...props}
    Header={Header}
    Loader={Loader}
    Logo={Logo}
    PageLoader={PageLoader}
  >
    {children}
  </SdaDaoPageWrapper>
)
