import { useMemo } from 'react'
import { waitForAll } from 'recoil'

import {
  NeutronVaultSelectors,
  NeutronVotingRegistrySelectors,
} from '@dao-dao/state'
import { useCachedLoadingWithError } from '@dao-dao/stateless'
import { LoadingDataWithError, VotingVaultWithInfo } from '@dao-dao/types'

import { useVotingModuleAdapterOptions } from '../../../react/context'

export type LoadingVaults = LoadingDataWithError<VotingVaultWithInfo[]>

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

  return useMemo(
    (): UseVotingModuleReturn => ({
      votingRegistryAddress: votingModuleAddress,
      loadingVaults:
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
              data: votingVaults.data
                .map(
                  (vault, index): VotingVaultWithInfo => ({
                    ...vault,
                    info: vaultInfos.data[index],
                  })
                )
                .sort((a, b) => a.name.localeCompare(b.name)),
            },
    }),
    [votingModuleAddress, votingVaults, vaultInfos]
  )
}
