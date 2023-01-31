import { DaoSplashHeaderProps } from '@dao-dao/types'
import { formatDate } from '@dao-dao/utils'

import { DaoHeader } from './DaoHeader'

export const DaoSplashHeader = ({
  daoInfo,
  follow,
  DaoInfoBar,
  LinkWrapper,
}: DaoSplashHeaderProps) => (
  <>
    <DaoHeader
      LinkWrapper={LinkWrapper}
      coreAddress={daoInfo.coreAddress}
      description={daoInfo.description}
      established={daoInfo.created && formatDate(daoInfo.created)}
      follow={follow}
      imageUrl={daoInfo.imageUrl}
      name={daoInfo.name}
      parentDao={daoInfo.parentDao}
    />

    <DaoInfoBar />
  </>
)
