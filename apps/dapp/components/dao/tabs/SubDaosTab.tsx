// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.
import { useEffect } from 'react'
import { constSelector, useRecoilValueLoadable } from 'recoil'

import { useDaoInfoContext } from '@dao-dao/common'
import { subDaoCardInfosSelector, useVotingModule } from '@dao-dao/state'
import { ContractVersion } from '@dao-dao/tstypes'
import { SubDaosTab as StatelessSubDaosTab } from '@dao-dao/ui'
import { loadableToLoadingData } from '@dao-dao/utils'

import { DaoCard } from '../DaoCard'

export const SubDaosTab = () => {
  const daoInfo = useDaoInfoContext()

  const { isMember = false } = useVotingModule(daoInfo.coreAddress, {
    fetchMembership: true,
  })

  const subDaoCardInfosLoadable = useRecoilValueLoadable(
    daoInfo.coreVersion === ContractVersion.V0_2_0
      ? subDaoCardInfosSelector({
          coreAddress: daoInfo.coreAddress,
          daoUrlPrefix: `/dao/`,
        })
      : constSelector([])
  )

  //! Loadable errors.
  useEffect(() => {
    if (subDaoCardInfosLoadable.state === 'hasError') {
      console.error(subDaoCardInfosLoadable.contents)
    }
  }, [subDaoCardInfosLoadable.contents, subDaoCardInfosLoadable.state])

  return (
    <StatelessSubDaosTab
      DaoCard={DaoCard}
      createSubDaoHref={`/dao/${daoInfo.coreAddress}/create`}
      daoInfo={daoInfo}
      isMember={isMember}
      subDaos={loadableToLoadingData(subDaoCardInfosLoadable, [])}
    />
  )
}
