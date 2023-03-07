import {
  SubDaosTab as StatelessSubDaosTab,
  useCachedLoading,
  useDaoInfoContext,
  useNavHelpers,
} from '@dao-dao/stateless'
import { ContractVersion } from '@dao-dao/types'

import { useMembership } from '../../../hooks'
import { subDaoCardInfosSelector } from '../../../recoil'
import { ButtonLink } from '../../ButtonLink'
import { DaoCard } from '../DaoCard'

export const SubDaosTab = () => {
  const daoInfo = useDaoInfoContext()
  const { getDaoPath } = useNavHelpers()

  const { isMember = false } = useMembership(daoInfo)

  const subDaos = useCachedLoading(
    daoInfo.coreVersion === ContractVersion.V1
      ? // Only v2 DAOs have SubDAOs. Passing undefined here returns an infinite loading state, which is fine because it's never used.
        undefined
      : subDaoCardInfosSelector({ coreAddress: daoInfo.coreAddress }),
    []
  )

  // TODO(v2): Add v1 to v2 migrate action.
  // const proposalPrefillUpgrade = useDaoProposalSinglePrefill({
  //   actions: [],
  // })

  return (
    <StatelessSubDaosTab
      ButtonLink={ButtonLink}
      DaoCard={DaoCard}
      createSubDaoHref={getDaoPath(daoInfo.coreAddress) + '/create'}
      daoInfo={daoInfo}
      isMember={isMember}
      subDaos={subDaos}
      // upgradeToV2Href={getDaoProposalPath(daoInfo.coreAddress, 'create', {
      //   prefill: proposalPrefillUpgrade,
      // })}
    />
  )
}
