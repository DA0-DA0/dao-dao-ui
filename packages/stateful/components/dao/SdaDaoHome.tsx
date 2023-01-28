import { DaoSplashHeader, useDaoInfoContext } from '@dao-dao/stateless'

import { useWidgets } from '../../widgets'
import { LinkWrapper } from '../LinkWrapper'
import { DaoInfoBar } from './DaoInfoBar'

export const SdaDaoHome = () => {
  const daoInfo = useDaoInfoContext()

  const loadingWidgets = useWidgets()

  return (
    <div className="flex flex-col gap-4">
      <DaoSplashHeader
        DaoInfoBar={DaoInfoBar}
        LinkWrapper={LinkWrapper}
        daoInfo={daoInfo}
      />

      {!loadingWidgets.loading && loadingWidgets.data.length > 0 && (
        <div className="flex flex-col gap-2">
          {loadingWidgets.data.map((Widget, index) => (
            <div key={index}>
              <Widget />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
