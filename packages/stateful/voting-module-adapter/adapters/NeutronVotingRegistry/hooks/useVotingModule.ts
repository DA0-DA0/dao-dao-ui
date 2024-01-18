import { useMemo } from 'react'
import { waitForAll } from 'recoil'

import {
  NeutronVaultSelectors,
  NeutronVotingRegistrySelectors,
} from '@dao-dao/state'
import { useCachedLoadingWithError } from '@dao-dao/stateless'
import { GenericToken, LoadingDataWithError } from '@dao-dao/types'
import { VotingVault } from '@dao-dao/types/contracts/NeutronVotingRegistry'

import { useVotingModuleAdapterOptions } from '../../../react/context'

export type LoadingVaults = LoadingDataWithError<{
  /**
   * All voting vaults.
   */
  votingVaults: VotingVault[]
  /**
   * Only the real voting vaults with their bond tokens.
   */
  realVaults: {
    vault: VotingVault
    bondToken: GenericToken
  }[]
  /**
   * Only the virtual voting vaults.
   */
  virtualVaults: VotingVault[]
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
              votingVaults: votingVaults.data,
              realVaults: votingVaults.data.flatMap((vault, index) => {
                const info = vaultInfos.data[index]
                return info.real
                  ? {
                      vault,
                      bondToken: info.bondToken,
                    }
                  : []
              }),
              virtualVaults: votingVaults.data.filter(
                (_, index) => !vaultInfos.data[index].real
              ),
            },
          }

    return {
      votingRegistryAddress: votingModuleAddress,
      loadingVaults,
    }
  }, [votingModuleAddress, votingVaults, vaultInfos])
}
