import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useRecoilValueLoadable } from 'recoil'

import { DaoCoreV2Selectors } from '@dao-dao/state'
import { ChainPickerPopup, GovernanceDaos, useChain } from '@dao-dao/stateless'
import {
  NEUTRON_GOVERNANCE_DAO,
  getConfiguredChainConfig,
  getConfiguredChains,
  getGovPath,
} from '@dao-dao/utils'

import { useLoadingDaoCardInfos } from '../../hooks'
import { DaoCard } from '../dao'
import { PageHeaderContent } from '../PageHeaderContent'

export const NeutronGovernanceHome = () => {
  const router = useRouter()
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

  const [goingToChainId, setGoingToChainId] = useState<string>()
  // Pre-fetch other chains.
  useEffect(() => {
    getConfiguredChains().forEach(({ name }) => {
      router.prefetch(getGovPath(name))
    })
  }, [router])

  return (
    <>
      <PageHeaderContent
        breadcrumbs={{
          home: true,
          override: true,
          current: (
            <ChainPickerPopup
              chains={{ type: 'configured' }}
              headerMode
              loading={!!goingToChainId && goingToChainId !== chainId}
              onSelect={(chainId) => {
                // Type-check. None option is not enabled so this shouldn't happen.
                if (!chainId) {
                  return
                }

                const chainConfig = getConfiguredChainConfig(chainId)
                if (chainConfig) {
                  router.push(getGovPath(chainConfig.name))
                  setGoingToChainId(chainId)
                }
              }}
              selectedChainId={chainId}
            />
          ),
        }}
      />

      <GovernanceDaos DaoCard={DaoCard} daos={daosLoading} />
    </>
  )
}
