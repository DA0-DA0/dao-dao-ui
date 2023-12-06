import { constSelector, selectorFamily, waitForAllSettled } from 'recoil'

import {
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
export const entitySelector = selectorFamily<
  Entity,
  WithChainId<{ address: string }>
>({
  key: 'entity',
  get:
    ({ address, chainId }) =>
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

      const [isDao, isPolytoneProxy] = address
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
            ])
          )
        : []

      const [
        daoInfoLoadable,
        daoInfoFromPolytoneProxyLoadable,
        walletProfileDataLoadable,
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
        ])
      )

      const daoInfo =
        daoInfoLoadable.state === 'hasValue'
          ? daoInfoLoadable.contents
          : undefined
      const daoInfoFromPolytoneProxy =
        daoInfoFromPolytoneProxyLoadable.state === 'hasValue'
          ? daoInfoFromPolytoneProxyLoadable.contents
          : undefined
      const walletProfileData =
        walletProfileDataLoadable.state === 'hasValue'
          ? walletProfileDataLoadable.contents
          : undefined

      const actualAddress = daoInfoFromPolytoneProxy
        ? daoInfoFromPolytoneProxy.coreAddress
        : address

      const entity: Entity = {
        ...(daoInfo || daoInfoFromPolytoneProxy
          ? {
              type: EntityType.Dao,
              daoInfo: daoInfo ? daoInfo : daoInfoFromPolytoneProxy!.info,
              polytoneProxy: daoInfoFromPolytoneProxy
                ? {
                    chainId,
                    address,
                  }
                : undefined,
            }
          : {
              type: EntityType.Wallet,
            }),
        chainId: daoInfoFromPolytoneProxy
          ? daoInfoFromPolytoneProxy.chainId
          : chainId,
        address: actualAddress,
        name: daoInfo
          ? daoInfo.name
          : daoInfoFromPolytoneProxy
          ? daoInfoFromPolytoneProxy.info.name
          : walletProfileData
          ? walletProfileData.profile.name
          : null,
        imageUrl:
          (daoInfo
            ? daoInfo.imageUrl
            : daoInfoFromPolytoneProxy
            ? daoInfoFromPolytoneProxy.info.imageUrl
            : walletProfileData
            ? walletProfileData.profile.imageUrl
            : undefined) ||
          // Use actual address for fallback image, even if polytone account, so
          // the fallback image stays consistent.
          getFallbackImage(actualAddress),
      }

      return entity
    },
})
