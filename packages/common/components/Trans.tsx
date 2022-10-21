// This is wrapped in a SuspenseLoader to prevent it from attempting to render
// invalid interpolated objects before translations are loaded. This is relevant
// on fallback pages while `getStaticProps` is loading since the translations
// are not loaded until static props are ready. Previously, we set `fallback:
// 'blocking'` on the dynamically generated pages which prevented communication
// to the user that a page is loading and made the UI look stuck when navigating
// to dynamic pages such as a DAO or proposal page.
import { Trans as OriginalTrans } from 'react-i18next'

import { TransProps } from '@dao-dao/types'
import { Loader as DefaultLoader } from '@dao-dao/ui'

import { SuspenseLoader } from './SuspenseLoader'

export const Trans = ({ Loader = DefaultLoader, ...props }: TransProps) => (
  <SuspenseLoader fallback={<Loader size={20} />}>
    <OriginalTrans {...props} />
  </SuspenseLoader>
)
