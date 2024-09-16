import { neutronVaultQueries } from '@dao-dao/state'
import {
  DaoVotingVaultCard as StatelessDaoVotingVaultCard,
  useChain,
} from '@dao-dao/stateless'
import { StatefulDaoVotingVaultCardProps } from '@dao-dao/types'

import { useQueryLoadingDataWithError, useWallet } from '../../hooks'

export const DaoVotingVaultCard = (props: StatefulDaoVotingVaultCardProps) => {
  const { chain_id: chainId } = useChain()
  const { address } = useWallet()

  const loadingWalletVotingPower = useQueryLoadingDataWithError(
    address
      ? neutronVaultQueries.votingPowerAtHeight({
          chainId,
          contractAddress: props.vault.address,
          args: {
            address,
          },
        })
      : undefined
  )

  return (
    <StatelessDaoVotingVaultCard
      vaultVotingPowerPercent={
        props.totalVotingPower.loading
          ? {
              loading: true,
            }
          : {
              loading: false,
              data:
                props.totalVotingPower.data === 0
                  ? 0
                  : (Number(props.vault.totalPower) /
                      props.totalVotingPower.data) *
                    100,
            }
      }
      walletVotingPowerPercent={
        !address
          ? {
              loading: false,
              data: undefined,
            }
          : loadingWalletVotingPower.loading || loadingWalletVotingPower.errored
          ? {
              loading: true,
            }
          : {
              loading: false,
              data:
                props.vault.totalPower === '0'
                  ? 0
                  : (Number(loadingWalletVotingPower.data.power) /
                      Number(props.vault.totalPower)) *
                    100,
            }
      }
      {...props}
    />
  )
}
