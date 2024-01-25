import { useMemo } from 'react'
import { waitForAll } from 'recoil'

import {
  NeutronVaultSelectors,
  NeutronVotingRegistrySelectors,
} from '@dao-dao/state'
import { useCachedLoadingWithError } from '@dao-dao/stateless'
import {
  GenericToken,
  LoadingDataWithError,
  VotingVaultWithMetadata,
} from '@dao-dao/types'

import { useVotingModuleAdapterOptions } from '../../../react/context'

export type LoadingVaults = LoadingDataWithError<{
  /**
   * All voting vaults.
   */
  votingVaults: VotingVaultWithMetadata[]
  /**
   * Only the real voting vaults with their bond tokens.
   */
  realVaults: {
    vault: VotingVaultWithMetadata
    bondToken: GenericToken
  }[]
  /**
   * Only the virtual voting vaults.
   */
  virtualVaults: VotingVaultWithMetadata[]
}>

export type UseVotingModuleReturn = {
  votingRegistryAddress: string
  loadingVaults: LoadingVaults
}

export const useVotingModule = (): UseVotingModuleReturn => {
  const { chainId, votingModuleAddress } = useVotingModuleAdapterOptions()

  const votingVaults = useCachedLoadingWithError(
    NeutronVotingRegistrySelectors.votingVaultsSelector({
      chainId,
      contractAddress: votingModuleAddress,
      params: [{}],
    })
  )

  const vaultInfos = useCachedLoadingWithError(
    votingVaults.loading || votingVaults.errored
      ? undefined
      : waitForAll(
          votingVaults.data.map(({ address }) =>
            NeutronVaultSelectors.vaultInfoSelector({
              chainId,
              contractAddress: address,
            })
          )
        )
  )

  return useMemo((): UseVotingModuleReturn => {
    const vaults =
      votingVaults.loading ||
      votingVaults.errored ||
      vaultInfos.loading ||
      vaultInfos.errored
        ? []
        : votingVaults.data
            .map(
              (vault, index): VotingVaultWithMetadata => ({
                ...vault,
                virtual: !vaultInfos.data[index].real,
              })
            )
            .sort((a, b) => a.name.localeCompare(b.name))

    const loadingVaults: LoadingVaults =
      votingVaults.loading || vaultInfos.loading
        ? {
            loading: true,
            errored: false,
          }
        : votingVaults.errored
        ? {
            loading: false,
            errored: true,
            error: votingVaults.error,
          }
        : vaultInfos.errored
        ? {
            loading: false,
            errored: true,
            error: vaultInfos.error,
          }
        : {
            loading: false,
            errored: false,
            updating: votingVaults.updating || vaultInfos.updating,
            data: {
              votingVaults: vaults,
              realVaults: vaults.flatMap((vault, index) => {
                const info = vaultInfos.data[index]
                return info.real
                  ? {
                      vault,
                      bondToken: info.bondToken,
                    }
                  : []
              }),
              virtualVaults: vaults.filter((vault) => vault.virtual),
            },
          }

    return {
      votingRegistryAddress: votingModuleAddress,
      loadingVaults,
    }
  }, [votingModuleAddress, votingVaults, vaultInfos])
}
