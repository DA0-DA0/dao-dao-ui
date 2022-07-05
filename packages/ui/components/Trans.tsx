// eslint-disable-next-line regex/invalid
import { _probablyDontUseThisTrans as OriginalTrans } from '@dao-dao/i18n'

import { Loader } from '.'
import { SuspenseLoader } from './SuspenseLoader'

export const Trans: typeof OriginalTrans = (props) => (
  <SuspenseLoader fallback={<Loader />}>
    <OriginalTrans {...props} />
  </SuspenseLoader>
)
