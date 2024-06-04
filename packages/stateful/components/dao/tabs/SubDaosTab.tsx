import { useQueryClient } from '@tanstack/react-query'

import {
  SubDaosTab as StatelessSubDaosTab,
  useDaoInfoContext,
  useDaoNavHelpers,
} from '@dao-dao/stateless'
import { ActionKey, Feature } from '@dao-dao/types'
import { getDaoProposalSinglePrefill } from '@dao-dao/utils'

import { useActionForKey } from '../../../actions'
import { useCachedLoadingQuery, useMembership } from '../../../hooks'
import { daoQueries } from '../../../queries'
import { ButtonLink } from '../../ButtonLink'
import { DaoCard } from '../DaoCard'

export const SubDaosTab = () => {
  const daoInfo = useDaoInfoContext()
  const { getDaoPath, getDaoProposalPath } = useDaoNavHelpers()

  const { isMember = false } = useMembership(daoInfo)

  const queryClient = useQueryClient()
  const subDaos = useCachedLoadingQuery(
    {
      ...daoQueries.subDaoInfos(queryClient, {
        chainId: daoInfo.chainId,
        coreAddress: daoInfo.coreAddress,
      }),
      enabled: !!daoInfo.supportedFeatures[Feature.SubDaos],
    },
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
