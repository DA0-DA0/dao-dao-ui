import { useQueryClient } from '@tanstack/react-query'

import { neutronVotingRegistryExtraQueries } from '@dao-dao/state'
import { LoadingDataWithError, VotingVaultWithInfo } from '@dao-dao/types'

import { useQueryLoadingDataWithError } from '../../../../hooks'
import { useVotingModuleAdapterOptions } from '../../../react/context'

export type LoadingVaults = LoadingDataWithError<VotingVaultWithInfo[]>

export type UseVotingModuleReturn = {
  votingRegistryAddress: string
  loadingVaults: LoadingVaults
}

export const useVotingModule = (): UseVotingModuleReturn => {
  const { chainId, votingModuleAddress } = useVotingModuleAdapterOptions()

  const queryClient = useQueryClient()
  const loadingVaults = useQueryLoadingDataWithError(
    neutronVotingRegistryExtraQueries.vaultsWithInfo(queryClient, {
      chainId,
      address: votingModuleAddress,
    })
  )

  return {
    votingRegistryAddress: votingModuleAddress,
    loadingVaults,
  }
}
