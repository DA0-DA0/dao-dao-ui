import { useEffect } from 'react'
import { constSelector, useRecoilValueLoadable } from 'recoil'

import {
  SubDaosTab as StatelessSubDaosTab,
  useDaoInfoContext,
  useNavHelpers,
} from '@dao-dao/stateless'
import { ContractVersion, CoreActionKey } from '@dao-dao/types'
import { loadableToLoadingData } from '@dao-dao/utils'

import { useCoreActionForKey } from '../../../actions'
import { useDaoProposalSinglePrefill, useMembership } from '../../../hooks'
import { subDaoCardInfosSelector } from '../../../recoil'
import { ButtonLink } from '../../ButtonLink'
import { DaoCard } from '../DaoCard'

export const SubDaosTab = () => {
  const daoInfo = useDaoInfoContext()
  const { getDaoPath, getDaoProposalPath } = useNavHelpers()

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

  const upgradeToV2Action = useCoreActionForKey(CoreActionKey.UpgradeV1ToV2)
  const upgradeToV2ActionDefaults = upgradeToV2Action?.useDefaults()
  const proposalPrefillUpgrade = useDaoProposalSinglePrefill({
    actions: upgradeToV2Action
      ? [
          {
            action: upgradeToV2Action,
            data: upgradeToV2ActionDefaults,
          },
        ]
      : [],
  })

  return (
    <StatelessSubDaosTab
      ButtonLink={ButtonLink}
      DaoCard={DaoCard}
      createSubDaoHref={getDaoPath(daoInfo.coreAddress) + '/create'}
      daoInfo={daoInfo}
      isMember={isMember}
      subDaos={loadableToLoadingData(subDaoCardInfosLoadable, [])}
      upgradeToV2Href={getDaoProposalPath(daoInfo.coreAddress, 'create', {
        prefill: proposalPrefillUpgrade,
      })}
    />
  )
}
