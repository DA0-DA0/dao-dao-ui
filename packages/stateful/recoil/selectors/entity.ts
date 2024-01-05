import {
  RecoilValueReadOnly,
  constSelector,
  selectorFamily,
  waitForAll,
  waitForAllSettled,
} from 'recoil'

import {
  Cw1WhitelistSelectors,
  isDaoSelector,
  isPolytoneProxySelector,
  moduleNameForAddressSelector,
} from '@dao-dao/state/recoil'
import { Entity, EntityType, WithChainId } from '@dao-dao/types'
import {
  getChainForChainId,
  getFallbackImage,
  getImageUrlForChainId,
  isValidWalletAddress,
} from '@dao-dao/utils'

import { daoInfoFromPolytoneProxySelector, daoInfoSelector } from './dao'
import { walletProfileDataSelector } from './profile'

// Load entity from address on chain, whether it's a wallet address, a DAO, or a
// DAO's polytone account.
export const entitySelector: (
  param: WithChainId<{
    address: string
    // Prevent infinite loop if cw1-whitelist nests itself.
    ignoreEntities?: string[]
  }>
) => RecoilValueReadOnly<Entity> = selectorFamily({
  key: 'entity',
  get:
    ({ address, chainId, ignoreEntities }) =>
    ({ get }) => {
      const { bech32_prefix: bech32Prefix } = getChainForChainId(chainId)

      // Check if address is module account.
      const moduleName = get(
        moduleNameForAddressSelector({
          chainId,
          address,
        })
      )
      if (moduleName) {
        const entity: Entity = {
          type: EntityType.Module,
          chainId,
          address,
          name: moduleName,
          imageUrl: getImageUrlForChainId(chainId),
        }
        return entity
      }

      const [isDao, isPolytoneProxy, cw1WhitelistAdmins] = address
        ? get(
            waitForAllSettled([
              isDaoSelector({
                chainId,
                address,
              }),
              isPolytoneProxySelector({
                chainId,
                address,
              }),
              Cw1WhitelistSelectors.adminsIfCw1Whitelist({
                chainId,
                contractAddress: address,
              }),
            ])
          )
        : []

      const [
        daoInfoLoadable,
        daoInfoFromPolytoneProxyLoadable,
        walletProfileDataLoadable,
        cw1WhitelistEntitiesLoadable,
      ] = get(
        waitForAllSettled([
          // Try to load config assuming the address is a DAO.
          isDao?.state === 'hasValue' && isDao.contents
            ? daoInfoSelector({
                coreAddress: address,
                chainId,
              })
            : constSelector(undefined),
          isPolytoneProxy?.state === 'hasValue' && isPolytoneProxy.contents
            ? daoInfoFromPolytoneProxySelector({
                proxy: address,
                chainId,
              })
            : constSelector(undefined),
          // Try to load profile assuming the address is a wallet.
          address && isValidWalletAddress(address, bech32Prefix)
            ? walletProfileDataSelector({
                address,
                chainId,
              })
            : constSelector(undefined),
          // Try to load all contained entities for cw1-whitelist.
          cw1WhitelistAdmins?.state === 'hasValue' &&
          cw1WhitelistAdmins.contents
            ? waitForAll(
                cw1WhitelistAdmins.contents.map((entityAddress) =>
                  ignoreEntities?.includes(entityAddress)
                    ? // Placeholder entity to prevent infinite loop.
                      constSelector({
                        type: EntityType.Wallet,
                        chainId,
                        address: entityAddress,
                        name: null,
                        imageUrl: getFallbackImage(entityAddress),
                      } as const)
                    : entitySelector({
                        chainId,
                        address: entityAddress,
                        // Prevent infinite loop if cw1-whitelist nests itself.
                        ignoreEntities: [...(ignoreEntities || []), address],
                      })
                )
              )
            : constSelector(undefined),
        ])
      )

      const daoInfo = daoInfoLoadable.valueMaybe()
      const daoInfoFromPolytoneProxy =
        daoInfoFromPolytoneProxyLoadable.valueMaybe()
      const walletProfileData = walletProfileDataLoadable.valueMaybe()
      const cw1WhitelistEntities = cw1WhitelistEntitiesLoadable.valueMaybe()

      if (daoInfo) {
        return {
          type: EntityType.Dao,
          daoInfo,
          chainId,
          address,
          name: daoInfo.name,
          imageUrl: daoInfo.imageUrl || getFallbackImage(address),
        }
      } else if (daoInfoFromPolytoneProxy) {
        return {
          type: EntityType.Dao,
          daoInfo: daoInfoFromPolytoneProxy.info,
          polytoneProxy: {
            chainId,
            address,
          },
          chainId: daoInfoFromPolytoneProxy.chainId,
          address: daoInfoFromPolytoneProxy.coreAddress,
          name: daoInfoFromPolytoneProxy.info.name,
          imageUrl:
            daoInfoFromPolytoneProxy.info.imageUrl ||
            getFallbackImage(daoInfoFromPolytoneProxy.coreAddress),
        }
      } else if (cw1WhitelistEntities) {
        return {
          type: EntityType.Cw1Whitelist,
          chainId,
          address,
          name: null,
          imageUrl: getFallbackImage(address),
          entities: cw1WhitelistEntities,
        }
      } else {
        return {
          type: EntityType.Wallet,
          chainId,
          address,
          name: walletProfileData?.profile.name || null,
          imageUrl:
            walletProfileData?.profile.imageUrl || getFallbackImage(address),
        }
      }
    },
})
