import {
  SubDaosTab as StatelessSubDaosTab,
  useCachedLoading,
  useDaoInfoContext,
  useNavHelpers,
} from '@dao-dao/stateless'
import { ActionKey, ContractVersion } from '@dao-dao/types'

import { useActionForKey } from '../../../actions'
import { useDaoProposalSinglePrefill, useMembership } from '../../../hooks'
import { subDaoCardInfosSelector } from '../../../recoil'
import { ButtonLink } from '../../ButtonLink'
import { DaoCard } from '../DaoCard'

export const SubDaosTab = () => {
  const daoInfo = useDaoInfoContext()
  const { getDaoPath, getDaoProposalPath } = useNavHelpers()

  const { isMember = false } = useMembership(daoInfo)

  const subDaos = useCachedLoading(
    daoInfo.coreVersion === ContractVersion.V1
      ? // Only v2 DAOs have SubDAOs. Passing undefined here returns an infinite loading state, which is fine because it's never used.
        undefined
      : subDaoCardInfosSelector({ coreAddress: daoInfo.coreAddress }),
    []
  )

  const upgradeToV2Action = useActionForKey(ActionKey.UpgradeV1ToV2)
  const upgradeToV2ActionDefaults = upgradeToV2Action?.action.useDefaults()
  const proposalPrefillUpgrade = useDaoProposalSinglePrefill({
    actions: upgradeToV2Action
      ? [
          {
            actionKey: upgradeToV2Action.action.key,
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
      subDaos={subDaos}
      upgradeToV2Href={getDaoProposalPath(daoInfo.coreAddress, 'create', {
        prefill: proposalPrefillUpgrade,
      })}
    />
  )
}
