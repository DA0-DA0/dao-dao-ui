import { constSelector, selectorFamily, waitForAllSettled } from 'recoil'

import { Entity, EntityType, WithChainId } from '@dao-dao/types'
import {
  getChainForChainId,
  getFallbackImage,
  isValidContractAddress,
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

      const [
        daoInfoLoadable,
        daoInfoFromPolytoneProxyLoadable,
        walletProfileDataLoadable,
      ] = get(
        waitForAllSettled([
          // Try to load config assuming the address is a DAO.
          address && isValidContractAddress(address, bech32Prefix)
            ? daoInfoSelector({
                coreAddress: address,
                chainId,
              })
            : constSelector(undefined),
          // Try to load config assuming the address is a polytone proxy of a
          // DAO.
          address && isValidContractAddress(address, bech32Prefix)
            ? daoInfoFromPolytoneProxySelector({
                proxy: address,
                chainId,
              })
            : constSelector(undefined),
          // try to load profile assuming the address is a wallet address.
          address && isValidWalletAddress(address, bech32Prefix)
            ? walletProfileDataSelector({
                address,
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
