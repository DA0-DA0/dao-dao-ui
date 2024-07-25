import { useQueryClient } from '@tanstack/react-query'

import { profileQueries } from '@dao-dao/state'
import { LoadingData, ProfileChain, UnifiedProfile } from '@dao-dao/types'
import {
  MAINNET,
  getDisplayNameForChainId,
  isSupportedChain,
  makeEmptyUnifiedProfile,
  maybeGetChainForChainId,
  toBech32Hash,
} from '@dao-dao/utils'

import { useQueryLoadingData } from './query/useQueryLoadingData'
import { useRefreshProfile } from './useRefreshProfile'
import { useWallet } from './useWallet'

export type UseProfileOptions = {
  /**
   * Optionally specify the chain to attempt to load from. Defaults to the
   * current context.
   */
  chainId?: string
  /**
   * The wallet address to get profile information for. Defaults to the
   * currently connected wallet.
   */
  address?: string
  /**
   * Whether or not to only load supported chains. Defaults to false.
   */
  onlySupported?: boolean
}

export type UseProfileReturn = {
  /**
   * Whether or not the current wallet is connected. When an address is passed,
   * this will be false.
   */
  connected: boolean
  /**
   * Whether or not the current wallet is connecting. When an address is passed,
   * this will be false.
   */
  connecting: boolean
  /**
   * The profile for the currently connected wallet. If not connected and no
   * address was passed, this will be in the loading state. The unified profile
   * loads data from backup sources in case profile information is missing and
   * substitutes a default profile on error.
   */
  profile: LoadingData<UnifiedProfile>
  /**
   * Refresh the profile for the currently connected wallet.
   */
  refreshProfile: () => void
  /**
   * Chain information for the profile. If not connected and no address was
   * passed, this will be in the loading state. If no profile has been created
   * for the current wallet, this will only contain the currently connected
   * wallet chain information.
   */
  chains: LoadingData<ProfileChain[]>
  /**
   * Unique public keys for the profile's chains. If not connected and no
   * address was passed, this will be in the loading state.
   */
  uniquePublicKeys: LoadingData<
    {
      /**
       * The public key in hex.
       */
      publicKey: string
      /**
       * The bech32 hash for the public key.
       */
      bech32Hash: string
      /**
       * All chains that use this public key.
       */
      chains: ProfileChain[]
    }[]
  >
}

/**
 * A hook to get profile information for a wallet. If no wallet is passed,
 * defaults to the currently connected wallet.
 */
export const useProfile = ({
  chainId,
  address,
  onlySupported = false,
}: UseProfileOptions = {}): UseProfileReturn => {
  const {
    chain: { chain_id: walletChainId },
    address: currentAddress = '',
    hexPublicKey,
    isWalletConnected,
    isWalletConnecting,
  } = useWallet({
    chainId,
    loadAccount: true,
  })

  const profileAddress = address || currentAddress

  const profile = useQueryLoadingData(
    profileQueries.unified(useQueryClient(), {
      chainId: walletChainId,
      address: profileAddress,
    }),
    makeEmptyUnifiedProfile(walletChainId, profileAddress)
  )

  const refreshProfile = useRefreshProfile(profileAddress, profile)

  const chains: LoadingData<ProfileChain[]> =
    (!address && !isWalletConnected) || profile.loading
      ? { loading: true }
      : {
          loading: false,
          data: Object.entries({
            ...profile.data.chains,
            // Add wallet-connected account if not already in the profile. This
            // should only be the case if no profile exists yet and an empty
            // profile with no chains is being returned.
            ...(!profile.data.chains[walletChainId] &&
            !hexPublicKey.loading &&
            profileAddress
              ? {
                  [walletChainId]: {
                    publicKey: hexPublicKey.data,
                    address: profileAddress,
                  },
                }
              : {}),
          })
            .flatMap(([chainId, { address, publicKey }]): ProfileChain | [] => {
              const chain = maybeGetChainForChainId(chainId)
              const supported = chain ? isSupportedChain(chainId) : false

              return chain &&
                // Only include chains that are on the right network type.
                (chain.network_type === 'mainnet') === MAINNET &&
                // Filter by onlySupported filter.
                (!onlySupported || supported)
                ? {
                    chainId,
                    chain,
                    supported,
                    address,
                    publicKey,
                  }
                : []
            })
            .sort((a, b) =>
              getDisplayNameForChainId(a.chainId).localeCompare(
                getDisplayNameForChainId(b.chainId)
              )
            ),
        }

  const uniquePublicKeys: LoadingData<
    {
      publicKey: string
      bech32Hash: string
      chains: ProfileChain[]
    }[]
  > = chains.loading
    ? {
        loading: true,
      }
    : {
        loading: false,
        // Convert to object and back to array to get unique public keys only.
        // All addresses for the same public key have the same bech32 hash, so
        // it doesn't matter which address is used for that conversion.
        data: Object.entries(
          Object.fromEntries(chains.data.map((c) => [c.publicKey, c.address]))
        ).map(([publicKey, address]) => ({
          publicKey,
          bech32Hash: toBech32Hash(address),
          chains: chains.data.flatMap((c) =>
            c.publicKey === publicKey ? [c] : c
          ),
        })),
      }

  return {
    // Connected and connecting are only relevant when using the currently
    // connected wallet. If an address is passed, set connected to false.
    connected: address ? false : isWalletConnected,
    connecting: address ? false : isWalletConnecting,
    profile,
    refreshProfile,
    chains,
    uniquePublicKeys,
  }
}
