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
  const { votingModule } = useVotingModuleAdapterOptions()

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
