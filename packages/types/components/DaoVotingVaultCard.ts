import { VotingVault } from '../contracts/NeutronVotingRegistry'
import { LoadingData } from '../misc'

export type DaoVotingVaultCardProps = {
  vault: VotingVault
  /**
   * The percent of all vaults' voting power controlled by this vault.
   */
  vaultVotingPowerPercent: LoadingData<number>
  /**
   * The percent of this vault's voting power owned by the current wallet. If
   * undefined, no wallet connected, so hide it.
   */
  walletVotingPowerPercent: LoadingData<number | undefined>
  /**
   * Whether or not this is a virtual vault. Virtual vaults do not have bonding.
   */
  virtual?: boolean
}

export type StatefulDaoVotingVaultCardProps = Omit<
  DaoVotingVaultCardProps,
  'vaultVotingPowerPercent' | 'walletVotingPowerPercent' | 'virtual'
> & {
  /**
   * The total voting power across all vaults. Used to calculate the vault's
   * voting power.
   */
  totalVotingPower: LoadingData<number>
}
