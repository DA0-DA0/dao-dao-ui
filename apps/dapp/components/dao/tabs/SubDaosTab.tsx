// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.
import { useEffect } from 'react'
import { constSelector, useRecoilValueLoadable } from 'recoil'

import { useEncodedCwdProposalSinglePrefill } from '@dao-dao/common'
import { subDaoCardInfosSelector, useVotingModule } from '@dao-dao/state'
import {
  SubDaosTab as StatelessSubDaosTab,
  useDaoInfoContext,
} from '@dao-dao/stateless'
import { ContractVersion } from '@dao-dao/types'
import { loadableToLoadingData } from '@dao-dao/utils'

import { DaoCard } from '../DaoCard'

export const SubDaosTab = () => {
  const daoInfo = useDaoInfoContext()

  const { isMember = false } = useVotingModule(daoInfo.coreAddress, {
    fetchMembership: true,
  })

  const subDaoCardInfosLoadable = useRecoilValueLoadable(
    daoInfo.coreVersion === ContractVersion.V0_1_0
      ? constSelector([])
      : subDaoCardInfosSelector({ coreAddress: daoInfo.coreAddress })
  )

  //! Loadable errors.
  useEffect(() => {
    if (subDaoCardInfosLoadable.state === 'hasError') {
      console.error(subDaoCardInfosLoadable.contents)
    }
  }, [subDaoCardInfosLoadable.contents, subDaoCardInfosLoadable.state])

  // TODO(v2): Add v1 to v2 migrate action.
  const encodedProposalPrefillUpgrade = useEncodedCwdProposalSinglePrefill({
    actions: [],
  })

  return (
    <StatelessSubDaosTab
      DaoCard={DaoCard}
      createSubDaoHref={`/dao/${daoInfo.coreAddress}/create`}
      daoInfo={daoInfo}
      isMember={isMember}
      subDaos={loadableToLoadingData(subDaoCardInfosLoadable, [])}
      upgradeToV2Href={`/dao/${daoInfo.coreAddress}/proposals/create?prefill=${encodedProposalPrefillUpgrade}`}
    />
  )
}
