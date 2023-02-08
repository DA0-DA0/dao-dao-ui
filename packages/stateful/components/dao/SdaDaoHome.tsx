import { DaoSplashHeader, useDaoInfo } from '@dao-dao/stateless'

import { LinkWrapper } from '../LinkWrapper'
import { DaoInfoBar } from './DaoInfoBar'
import { DaoWidgets } from './DaoWidgets'

export const SdaDaoHome = () => {
  const daoInfo = useDaoInfo()

  return (
    <div className="flex flex-col gap-4">
      <DaoSplashHeader
        DaoInfoBar={DaoInfoBar}
        LinkWrapper={LinkWrapper}
        daoInfo={daoInfo}
      />

      <DaoWidgets />
    </div>
  )
}
