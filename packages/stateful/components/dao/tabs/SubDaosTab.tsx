import {
  SubDaosTab as StatelessSubDaosTab,
  useCachedLoading,
  useChain,
  useDaoInfoContext,
  useDaoNavHelpers,
} from '@dao-dao/stateless'
import { ActionKey, Feature } from '@dao-dao/types'
import { getDaoProposalSinglePrefill } from '@dao-dao/utils'

import { useActionForKey } from '../../../actions'
import { useMembership } from '../../../hooks'
import { subDaoInfosSelector } from '../../../recoil'
import { ButtonLink } from '../../ButtonLink'
import { DaoCard } from '../DaoCard'

export const SubDaosTab = () => {
  const { chain_id: chainId } = useChain()
  const daoInfo = useDaoInfoContext()
  const { getDaoPath, getDaoProposalPath } = useDaoNavHelpers()

  const { isMember = false } = useMembership(daoInfo)

  const subDaos = useCachedLoading(
    daoInfo.supportedFeatures[Feature.SubDaos]
      ? subDaoInfosSelector({ chainId, coreAddress: daoInfo.coreAddress })
      : // Passing undefined here returns an infinite loading state, which is
        // fine because it's never used.
        undefined,
    []
  )

  const upgradeToV2Action = useActionForKey(ActionKey.UpgradeV1ToV2)
  const upgradeToV2ActionDefaults = upgradeToV2Action?.useDefaults()

  return (
    <StatelessSubDaosTab
      ButtonLink={ButtonLink}
      DaoCard={DaoCard}
      createSubDaoHref={getDaoPath(daoInfo.coreAddress, 'create')}
      isMember={isMember}
      subDaos={subDaos}
      upgradeToV2Href={getDaoProposalPath(daoInfo.coreAddress, 'create', {
        prefill: getDaoProposalSinglePrefill({
          actions: upgradeToV2Action
            ? [
                {
                  actionKey: upgradeToV2Action.key,
                  data: upgradeToV2ActionDefaults,
                },
              ]
            : [],
        }),
      })}
    />
  )
}
