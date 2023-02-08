import { useEffect } from 'react'
import { constSelector, useRecoilValueLoadable } from 'recoil'

import {
  SubDaosTab as StatelessSubDaosTab,
  useDaoInfo,
  useNavHelpers,
} from '@dao-dao/stateless'
import { ContractVersion } from '@dao-dao/types'
import { loadableToLoadingData } from '@dao-dao/utils'

import { useMembership } from '../../../hooks'
import { subDaoCardInfosSelector } from '../../../recoil'
import { ButtonLink } from '../../ButtonLink'
import { DaoCard } from '../DaoCard'

export const SubDaosTab = () => {
  const daoInfo = useDaoInfo()
  const { getDaoPath } = useNavHelpers()

  const { isMember = false } = useMembership(daoInfo)

  const subDaoCardInfosLoadable = useRecoilValueLoadable(
    daoInfo.coreVersion === ContractVersion.V1
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
  // const encodedProposalPrefillUpgrade = useEncodedDaoProposalSinglePrefill({
  //   actions: [],
  // })

  return (
    <StatelessSubDaosTab
      ButtonLink={ButtonLink}
      DaoCard={DaoCard}
      createSubDaoHref={getDaoPath(daoInfo.coreAddress) + '/create'}
      daoInfo={daoInfo}
      isMember={isMember}
      subDaos={loadableToLoadingData(subDaoCardInfosLoadable, [])}
      // upgradeToV2Href={getDaoProposalPath(daoInfo.coreAddress, 'create', {
      //   prefill: encodedProposalPrefillUpgrade,
      // })}
    />
  )
}
