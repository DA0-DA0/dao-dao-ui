import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'

import {
  NeutronVotingRegistrySelectors,
  genericTokenSelector,
} from '@dao-dao/state'
import { useCachedLoadingWithError } from '@dao-dao/stateless'
import {
  ChainId,
  GenericToken,
  LoadingDataWithError,
  TokenType,
} from '@dao-dao/types'
import { VotingVault } from '@dao-dao/types/contracts/NeutronVotingRegistry'

import { useVotingModuleAdapterOptions } from '../../../react/context'

export type LoadingVaults = LoadingDataWithError<{
  votingVaults: VotingVault[]
  neutronVault: VotingVault
}>

export type UseVotingModuleReturn = {
  votingRegistryAddress: string
  neutronToken: GenericToken
  loadingVaults: LoadingVaults
}

export const useVotingModule = (): UseVotingModuleReturn => {
  const { chainId, votingModuleAddress } = useVotingModuleAdapterOptions()

  const neutronToken = useRecoilValue(
    genericTokenSelector({
      type: TokenType.Native,
      chainId: ChainId.NeutronMainnet,
      denomOrAddress: 'untrn',
    })
  )

  const votingVaults = useCachedLoadingWithError(
    NeutronVotingRegistrySelectors.votingVaultsSelector({
      chainId,
      contractAddress: votingModuleAddress,
      params: [{}],
    })
  )

  const neutronVault =
    votingVaults.loading || votingVaults.errored
      ? undefined
      : votingVaults.data.find(
          (vault) => vault.name === 'Neutron Vault' && vault.state === 'Active'
        )

  return useMemo((): UseVotingModuleReturn => {
    const loadingVaults: LoadingVaults = votingVaults.loading
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
      : !neutronVault
      ? {
          loading: false,
          errored: true,
          error: new Error('Failed to find Neutron Vault.'),
        }
      : {
          loading: false,
          errored: false,
          updating: votingVaults.updating,
          data: {
            votingVaults: votingVaults.data,
            neutronVault,
          },
        }

    return {
      votingRegistryAddress: votingModuleAddress,
      neutronToken,
      loadingVaults,
    }
  }, [votingModuleAddress, votingVaults, neutronVault, neutronToken])
}
