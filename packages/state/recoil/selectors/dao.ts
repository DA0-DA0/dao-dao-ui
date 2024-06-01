import { RecoilValueReadOnly, selectorFamily, waitForAll } from 'recoil'

import {
  ContractVersion,
  ContractVersionInfo,
  DaoDropdownInfo,
  DaoParentInfo,
  Feature,
  LazyDaoCardProps,
  WithChainId,
} from '@dao-dao/types'
import { ConfigResponse as CwCoreV1ConfigResponse } from '@dao-dao/types/contracts/CwCore.v1'
import { ConfigResponse as DaoCoreV2ConfigResponse } from '@dao-dao/types/contracts/DaoCore.v2'
import {
  DAO_CORE_CONTRACT_NAMES,
  INACTIVE_DAO_NAMES,
  VETOABLE_DAOS_ITEM_KEY_PREFIX,
  getChainGovernanceDaoDescription,
  getConfiguredChainConfig,
  getDisplayNameForChainId,
  getFallbackImage,
  getImageUrlForChainId,
  getSupportedChainConfig,
  isConfiguredChainName,
  isFeatureSupportedByVersion,
  parseContractVersion,
} from '@dao-dao/utils'

import { addressIsModuleSelector } from './chain'
import {
  contractInfoSelector,
  contractVersionSelector,
  isDaoSelector,
} from './contract'
import { DaoCoreV2Selectors } from './contracts'
import { queryContractIndexerSelector } from './indexer'

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
          DaoCoreV2Selectors.configSelector({
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
    ({ get }) => {
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
          DaoCoreV2Selectors.configSelector({
            chainId,
            contractAddress: coreAddress,
            params: [],
          }),
        ])
      )

      const subDaos = isFeatureSupportedByVersion(Feature.SubDaos, version)
        ? get(
            DaoCoreV2Selectors.listAllSubDaosSelector({
              chainId,
              contractAddress: coreAddress,
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
        DaoCoreV2Selectors.listAllItemsWithPrefixSelector({
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

/**
 * Attempt to fetch the info needed to describe a parent DAO. Returns undefined
 * if not a DAO nor the chain gov module account.
 */
export const daoParentInfoSelector = selectorFamily<
  DaoParentInfo | undefined,
  WithChainId<{
    parentAddress: string
    /**
     * To determine if the parent has registered the child, pass the child. This
     * will set `registeredSubDao` appropriately. Otherwise, if undefined,
     * `registeredSubDao` will be set to false.
     */
    childAddress?: string
  }>
>({
  key: 'daoParentInfo',
  get:
    ({ chainId, parentAddress, childAddress }) =>
    ({ get }) => {
      // If address is a DAO contract...
      if (
        get(
          isDaoSelector({
            chainId,
            address: parentAddress,
          })
        )
      ) {
        const parentAdmin = get(
          DaoCoreV2Selectors.adminSelector({
            chainId,
            contractAddress: parentAddress,
            params: [],
          })
        )
        const {
          info: { version },
        } = get(
          contractInfoSelector({
            chainId,
            contractAddress: parentAddress,
          })
        )
        const parentVersion = parseContractVersion(version)

        if (parentVersion) {
          const {
            name,
            image_url,
          }: CwCoreV1ConfigResponse | DaoCoreV2ConfigResponse = get(
            // Both v1 and v2 have a config query.
            DaoCoreV2Selectors.configSelector({
              chainId,
              contractAddress: parentAddress,
              params: [],
            })
          )

          // Check if parent has registered the child DAO as a SubDAO.
          const registeredSubDao =
            childAddress &&
            isFeatureSupportedByVersion(Feature.SubDaos, parentVersion)
              ? get(
                  DaoCoreV2Selectors.listAllSubDaosSelector({
                    contractAddress: parentAddress,
                    chainId,
                  })
                ).some(({ addr }) => addr === childAddress)
              : false

          return {
            chainId,
            coreAddress: parentAddress,
            coreVersion: parentVersion,
            name,
            imageUrl: image_url || getFallbackImage(parentAddress),
            admin: parentAdmin ?? '',
            registeredSubDao,
          }
        }

        // If address is the chain's x/gov module account...
      } else if (
        get(
          addressIsModuleSelector({
            chainId,
            address: parentAddress,
            moduleName: 'gov',
          })
        )
      ) {
        const chainConfig = getConfiguredChainConfig(chainId)
        return (
          chainConfig && {
            chainId,
            coreAddress: chainConfig.name,
            coreVersion: ContractVersion.Gov,
            name: getDisplayNameForChainId(chainId),
            imageUrl: getImageUrlForChainId(chainId),
            admin: '',
            registeredSubDao:
              !!childAddress &&
              !!getSupportedChainConfig(chainId)?.subDaos?.includes(
                childAddress
              ),
          }
        )
      }
    },
})

/**
 * Retrieve all potential SubDAOs of the DAO from the indexer.
 */
export const daoPotentialSubDaosSelector = selectorFamily<
  string[],
  WithChainId<{
    coreAddress: string
  }>
>({
  key: 'daoPotentialSubDaos',
  get:
    ({ coreAddress, chainId }) =>
    ({ get }) => {
      const potentialSubDaos: {
        contractAddress: string
        info: ContractVersionInfo
      }[] = get(
        queryContractIndexerSelector({
          chainId,
          contractAddress: coreAddress,
          formula: 'daoCore/potentialSubDaos',
          noFallback: true,
        })
      )

      // Filter out those that do not appear to be DAO contracts and also the
      // contract itself since it is probably its own admin.
      return potentialSubDaos
        .filter(
          ({ contractAddress, info }) =>
            contractAddress !== coreAddress &&
            DAO_CORE_CONTRACT_NAMES.some((name) => info.contract.includes(name))
        )
        .map(({ contractAddress }) => contractAddress)
    },
})
