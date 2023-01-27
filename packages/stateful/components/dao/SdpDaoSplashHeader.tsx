import { DaoSplashHeader, useDaoInfoContext } from '@dao-dao/stateless'

import { LinkWrapper } from '../LinkWrapper'
import { DaoInfoBar } from './DaoInfoBar'

// A stateful version of the DaoSplashHeader component, with no following
// toggle. The SDP does not show anything about following.
export const SdpDaoSplashHeader = () => {
  const daoInfo = useDaoInfoContext()

  return (
    <DaoSplashHeader
      DaoInfoBar={DaoInfoBar}
      LinkWrapper={LinkWrapper}
      daoInfo={daoInfo}
    />
  )
}
