import { NeutronVotingRegistrySelectors } from '@dao-dao/state'
import {
  NeutronVotingVaultsTab,
  useCachedLoadingWithError,
  useChain,
} from '@dao-dao/stateless'

import { DaoVotingVaultCard } from '../../../../components'
import { useVotingModule } from '../hooks'

export const VaultsTab = () => {
  const { chain_id: chainId } = useChain()
  const { votingRegistryAddress, loadingVaults } = useVotingModule()
  const loadingTotalVotingPower = useCachedLoadingWithError(
    NeutronVotingRegistrySelectors.totalPowerAtHeightSelector({
      contractAddress: votingRegistryAddress,
      chainId,
      params: [{}],
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
