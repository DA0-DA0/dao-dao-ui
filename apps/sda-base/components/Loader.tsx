import {
  LoaderProps,
  Loader as OriginalLoader,
  PageLoader as OriginalPageLoader,
} from '@dao-dao/ui'

import { Logo } from '@/components'

export const Loader = (props: Omit<LoaderProps, 'Logo'>) => (
  <OriginalLoader Logo={Logo} {...props} />
)

export const PageLoader = (props: Omit<LoaderProps, 'Logo'>) => (
  <OriginalPageLoader Logo={Logo} {...props} />
)
