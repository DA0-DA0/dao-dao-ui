import { DaoSplashHeader, useDaoInfoContext } from '@dao-dao/stateless'

import { LinkWrapper } from '../LinkWrapper'
import { DaoInfoBar } from './DaoInfoBar'
import { DaoWidgets } from './DaoWidgets'

export const SdaDaoHome = () => {
  const daoInfo = useDaoInfoContext()

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
