import { useRecoilValueLoadable } from 'recoil'

import { CwdCoreV2Selectors } from '@dao-dao/state'
import { LoadingData, Profile, WithChainId } from '@dao-dao/types'
import { getFallbackImage } from '@dao-dao/utils'

import { useWalletProfile } from './useWalletProfile'

export type UseProfileOptions = WithChainId<{
  address: string
}>

export const useProfile = ({
  address,
  chainId,
}: UseProfileOptions): LoadingData<Profile> => {
  // Try to load config assuming the address is a DAO.
  const daoConfig = useRecoilValueLoadable(
    CwdCoreV2Selectors.configSelector({
      contractAddress: address,
      chainId,
      params: [],
    })
  )

  // Try loading wallet profile assuming the address is a wallet.
  const walletProfile = useWalletProfile({
    walletAddress: address,
  })

  return daoConfig.state !== 'hasValue' && walletProfile.profile.loading
    ? { loading: true }
    : {
        loading: false,
        data: {
          address,
          name:
            daoConfig.state === 'hasValue'
              ? daoConfig.contents.name
              : !walletProfile.profile.loading
              ? walletProfile.profile.data.name
              : null,
          imageUrl:
            (daoConfig.state === 'hasValue'
              ? daoConfig.contents.image_url
              : !walletProfile.profile.loading
              ? walletProfile.profile.data.imageUrl
              : undefined) || getFallbackImage(address),
        },
      }
}
