import { neutronVotingRegistryQueries } from '@dao-dao/state'
import { NeutronVotingVaultsTab, useChain } from '@dao-dao/stateless'

import { DaoVotingVaultCard } from '../../../../components'
import { useQueryLoadingDataWithError } from '../../../../hooks'
import { useVotingModuleInfo } from '../hooks'

export const VaultsTab = () => {
  const { chain_id: chainId } = useChain()
  const { votingRegistryAddress, loadingVaults } = useVotingModuleInfo()
  const loadingTotalVotingPower = useQueryLoadingDataWithError(
    neutronVotingRegistryQueries.totalPowerAtHeight({
      chainId,
      contractAddress: votingRegistryAddress,
      args: {},
    })
  )

  return (
    <NeutronVotingVaultsTab
      DaoVotingVaultCard={DaoVotingVaultCard}
      loadingVaults={
        loadingVaults.loading || loadingVaults.errored
          ? loadingVaults
          : {
              loading: false,
              errored: false,
              updating: loadingVaults.updating,
              data: loadingVaults.data,
            }
      }
      totalVotingPower={
        loadingTotalVotingPower.loading || loadingTotalVotingPower.errored
          ? loadingTotalVotingPower
          : {
              loading: false,
              errored: false,
              updating: loadingTotalVotingPower.updating,
              data: Number(loadingTotalVotingPower.data.power),
            }
      }
    />
  )
}
