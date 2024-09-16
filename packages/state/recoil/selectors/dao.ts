import { RecoilValueReadOnly, selectorFamily, waitForAll } from 'recoil'

import {
  ContractVersion,
  DaoDropdownInfo,
  Feature,
  LazyDaoCardProps,
  WithChainId,
} from '@dao-dao/types'
import {
  INACTIVE_DAO_NAMES,
  VETOABLE_DAOS_ITEM_KEY_PREFIX,
  getChainGovernanceDaoDescription,
  getDisplayNameForChainId,
  getFallbackImage,
  getImageUrlForChainId,
  getSupportedChainConfig,
  isConfiguredChainName,
  isFeatureSupportedByVersion,
  parseContractVersion,
} from '@dao-dao/utils'

import { daoQueries } from '../../query'
import { queryClientAtom } from '../atoms'
import { contractInfoSelector, contractVersionSelector } from './contract'
import { DaoDaoCoreSelectors } from './contracts'

export const lazyDaoCardPropsSelector = selectorFamily<
  LazyDaoCardProps,
  WithChainId<{ coreAddress: string }>
>({
  key: 'lazyDaoCardProps',
  get:
    ({ chainId, coreAddress }) =>
    ({ get }) => {
      // Native chain x/gov module.
      if (isConfiguredChainName(chainId, coreAddress)) {
        return {
          info: {
            chainId,
            coreAddress,
            coreVersion: ContractVersion.Gov,
            name: getDisplayNameForChainId(chainId),
            description: getChainGovernanceDaoDescription(chainId),
            imageUrl: getImageUrlForChainId(chainId),
          },
        }
      }

      // DAO.

      const [
        {
          info: { version },
        },
        config,
      ] = get(
        waitForAll([
          contractInfoSelector({
            chainId,
            contractAddress: coreAddress,
          }),
          DaoDaoCoreSelectors.configSelector({
            chainId,
            contractAddress: coreAddress,
            params: [],
          }),
        ])
      )

      const coreVersion = parseContractVersion(version)
      if (!coreVersion) {
        throw new Error('Failed to parse core version.')
      }

      return {
        info: {
          chainId,
          coreAddress,
          coreVersion,
          name: config.name,
          description: config.description,
          imageUrl: config.image_url || getFallbackImage(coreAddress),
        },
        isInactive: INACTIVE_DAO_NAMES.includes(config.name),
      }
    },
})

export const daoDropdownInfoSelector: (
  params: WithChainId<{
    coreAddress: string
    // Catch and prevent cycles.
    parents?: string[]
    noSubDaos?: boolean
  }>
) => RecoilValueReadOnly<DaoDropdownInfo> = selectorFamily({
  key: 'daoDropdownInfo',
  get:
    ({ chainId, coreAddress, parents, noSubDaos }) =>
    async ({ get }) => {
      const isGovModule = isConfiguredChainName(chainId, coreAddress)
      // Native chain x/gov module.
      if (isGovModule) {
        const lazyInfo = get(
          lazyDaoCardPropsSelector({
            chainId,
            coreAddress,
          })
        )
        const subDaos = getSupportedChainConfig(chainId)?.subDaos || []

        return {
          chainId,
          coreAddress,
          imageUrl: lazyInfo.info.imageUrl,
          name: lazyInfo.info.name,
          subDaos: subDaos.length
            ? get(
                waitForAll(
                  subDaos.map((subDaoAddress) =>
                    daoDropdownInfoSelector({
                      chainId,
                      coreAddress: subDaoAddress,
                      parents: [...(parents ?? []), coreAddress],
                      // Prevents cycles. If one of our children is also our
                      // ancestor, don't let it load any children, but still load it
                      // so we can see the cycle exists.
                      noSubDaos: !!parents?.includes(subDaoAddress),
                    })
                  )
                )
              )
            : [],
        }
      }

      // DAOs.

      const [version, config] = get(
        waitForAll([
          contractVersionSelector({
            chainId,
            contractAddress: coreAddress,
          }),
          DaoDaoCoreSelectors.configSelector({
            chainId,
            contractAddress: coreAddress,
            params: [],
          }),
        ])
      )

      const queryClient = get(queryClientAtom)
      const subDaos = isFeatureSupportedByVersion(Feature.SubDaos, version)
        ? await queryClient.fetchQuery(
            daoQueries.listAllSubDaos(queryClient, {
              chainId,
              address: coreAddress,
            })
          )
        : []

      return {
        chainId,
        coreAddress,
        imageUrl: config.image_url || getFallbackImage(coreAddress),
        name: config.name,
        subDaos: noSubDaos
          ? []
          : get(
              waitForAll(
                subDaos.map(({ chainId, addr: subDaoAddress }) =>
                  daoDropdownInfoSelector({
                    chainId,
                    coreAddress: subDaoAddress,
                    parents: [...(parents ?? []), coreAddress],
                    // Prevents cycles. If one of our children is also our
                    // ancestor, don't let it load any children, but still load
                    // it so we can see the cycle exists.
                    noSubDaos: !!parents?.includes(subDaoAddress),
                  })
                )
              )
            ),
      }
    },
})

/**
 * DAOs this DAO has enabled vetoable proposal listing for.
 */
export const daoVetoableDaosSelector = selectorFamily<
  { chainId: string; coreAddress: string }[],
  WithChainId<{ coreAddress: string }>
>({
  key: 'daoVetoableDaos',
  get:
    ({ chainId, coreAddress }) =>
    ({ get }) =>
      get(
        DaoDaoCoreSelectors.listAllItemsWithPrefixSelector({
          chainId,
          contractAddress: coreAddress,
          prefix: VETOABLE_DAOS_ITEM_KEY_PREFIX,
        })
      ).map(([key]) => {
        const [chainId, coreAdress] = key.split(':')

        return {
          chainId,
          coreAddress: coreAdress,
        }
      }),
})
