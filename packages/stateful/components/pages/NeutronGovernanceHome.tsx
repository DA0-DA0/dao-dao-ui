import { useRecoilValueLoadable } from 'recoil'

import { DaoCoreV2Selectors } from '@dao-dao/state'
import { GovernanceDaos, useChain } from '@dao-dao/stateless'
import {
  NEUTRON_GOVERNANCE_DAO,
  getDisplayNameForChainId,
} from '@dao-dao/utils'

import { useLoadingDaoCardInfos } from '../../hooks'
import { DaoCard } from '../dao'
import { PageHeaderContent } from '../PageHeaderContent'

export const NeutronGovernanceHome = () => {
  const { chain_id: chainId } = useChain()

  const neutronSubdaos = useRecoilValueLoadable(
    DaoCoreV2Selectors.listAllSubDaosSelector({
      chainId,
      contractAddress: NEUTRON_GOVERNANCE_DAO,
    })
  )
  const daosLoading = useLoadingDaoCardInfos(
    neutronSubdaos.state !== 'hasValue'
      ? { loading: true }
      : {
          loading: false,
          data: [
            {
              chainId,
              coreAddress: NEUTRON_GOVERNANCE_DAO,
            },
            ...neutronSubdaos.contents.map(({ addr }) => ({
              chainId,
              coreAddress: addr,
            })),
          ],
        }
  )

  return (
    <>
      <PageHeaderContent
        breadcrumbs={{
          home: true,
          current: getDisplayNameForChainId(chainId),
        }}
      />

      <GovernanceDaos DaoCard={DaoCard} daos={daosLoading} />
    </>
  )
}
