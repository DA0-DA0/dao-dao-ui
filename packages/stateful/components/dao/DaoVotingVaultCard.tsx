import { constSelector } from 'recoil'

import { NeutronVaultSelectors } from '@dao-dao/state'
import {
  DaoVotingVaultCard as StatelessDaoVotingVaultCard,
  useCachedLoadingWithError,
  useChain,
} from '@dao-dao/stateless'
import { StatefulDaoVotingVaultCardProps } from '@dao-dao/types'

import { useWallet } from '../../hooks'

export const DaoVotingVaultCard = (props: StatefulDaoVotingVaultCardProps) => {
  const { chain_id: chainId } = useChain()
  const { address } = useWallet()

  const loadingVaultVotingPower = useCachedLoadingWithError(
    NeutronVaultSelectors.totalPowerAtHeightSelector({
      contractAddress: props.vault.address,
      chainId,
      params: [{}],
    })
  )
  const loadingWalletVotingPower = useCachedLoadingWithError(
    address
      ? NeutronVaultSelectors.votingPowerAtHeightSelector({
          contractAddress: props.vault.address,
          chainId,
          params: [
            {
              address,
            },
          ],
        })
      : constSelector(undefined)
  )

  return (
    <StatelessDaoVotingVaultCard
      vaultVotingPowerPercent={
        loadingVaultVotingPower.loading ||
        loadingVaultVotingPower.errored ||
        props.totalVotingPower.loading
          ? {
              loading: true,
            }
          : {
              loading: false,
              data:
                props.totalVotingPower.data === 0
                  ? 0
                  : (Number(loadingVaultVotingPower.data.power) /
                      props.totalVotingPower.data) *
                    100,
            }
      }
      walletVotingPowerPercent={
        loadingVaultVotingPower.loading ||
        loadingVaultVotingPower.errored ||
        loadingWalletVotingPower.loading ||
        loadingWalletVotingPower.errored
          ? {
              loading: true,
            }
          : {
              loading: false,
              data:
                loadingWalletVotingPower.data === undefined
                  ? undefined
                  : loadingVaultVotingPower.data.power === '0'
                  ? 0
                  : (Number(loadingWalletVotingPower.data.power) /
                      Number(loadingVaultVotingPower.data.power)) *
                    100,
            }
      }
      {...props}
    />
  )
}
