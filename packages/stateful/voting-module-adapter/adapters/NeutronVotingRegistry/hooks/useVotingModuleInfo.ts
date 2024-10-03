import { useQueryClient } from '@tanstack/react-query'

import { neutronVotingRegistryExtraQueries } from '@dao-dao/state'
import { useVotingModule } from '@dao-dao/stateless'
import { LoadingDataWithError, VotingVaultWithInfo } from '@dao-dao/types'

import { useQueryLoadingDataWithError } from '../../../../hooks'

export type LoadingVaults = LoadingDataWithError<VotingVaultWithInfo[]>

export type UseVotingModuleInfoReturn = {
  votingRegistryAddress: string
  loadingVaults: LoadingVaults
}

export const useVotingModuleInfo = (): UseVotingModuleInfoReturn => {
  const votingModule = useVotingModule()

  const queryClient = useQueryClient()
  const loadingVaults = useQueryLoadingDataWithError(
    neutronVotingRegistryExtraQueries.vaultsWithInfo(queryClient, {
      chainId: votingModule.chainId,
      address: votingModule.address,
    })
  )

  return {
    votingRegistryAddress: votingModule.address,
    loadingVaults,
  }
}
