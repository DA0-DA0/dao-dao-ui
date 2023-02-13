import { atom, atomFamily } from 'recoil'

// Change this to refresh claims for the given wallet.
export const refreshClaimsIdAtom = atomFamily<number, string | undefined>({
  key: 'refreshClaimsId',
  default: 0,
})

// Change this to refresh token balances for the given wallet or the total.
export const refreshWalletBalancesIdAtom = atomFamily<
  number,
  string | undefined
>({
  key: 'refreshWalletBalancesId',
  default: 0,
})

// Change this to refresh information for the given proposal from the
// given proposal module.
export const refreshProposalIdAtom = atomFamily<
  number,
  { address: string; proposalId: number }
>({
  key: 'refreshProposalId',
  default: 0,
})

// Change this to refresh all proposals.
export const refreshProposalsIdAtom = atom<number>({
  key: 'refreshProposalsId',
  default: 0,
})

// Change this to refresh the token USDC price for a denom, or use an empty
// string to refresh all prices at once.
export const refreshTokenUsdcPriceAtom = atomFamily<number, string>({
  key: 'refreshTokenUsdcPrice',
  default: 0,
})

// Change this to refresh the current block height.
export const refreshBlockHeightAtom = atom<number>({
  key: 'refreshBlockHeight',
  default: 0,
})

// Change this to refresh the list of stargaze NFTs for a wallet.
export const refreshWalletStargazeNftsAtom = atomFamily<number, string>({
  key: 'refreshWalletStargazeNfts',
  default: 0,
})

// Change this to refresh the profile for a wallet.
export const refreshWalletProfileAtom = atomFamily<number, string>({
  key: 'refreshWalletProfile',
  default: 0,
})

// Change this to refresh native token staking info for the given address.
export const refreshNativeTokenStakingInfoAtom = atomFamily<
  number,
  string | undefined
>({
  key: 'refreshNativeTokenStakingInfo',
  default: 0,
})

// Change this to refresh voting power info for a DAO given its core address.
export const refreshDaoVotingPowerAtom = atomFamily<number, string>({
  key: 'refreshDaoVotingPower',
  default: 0,
})

// Change this to refresh open proposals.
export const refreshOpenProposalsAtom = atom({
  key: 'refreshOpenProposals',
  default: 0,
})

// Change this to refresh wallet proposal stats.
export const refreshWalletProposalStatsAtom = atom({
  key: 'refreshWalletProposalStats',
  default: 0,
})

// Change this to refresh following DAOs.
export const refreshFollowingDaosAtom = atom({
  key: 'refreshFollowingDaos',
  default: 0,
})

// Change this to refresh saved TXs.
export const refreshSavedTxsAtom = atom({
  key: 'refreshSavedTxs',
  default: 0,
})

// Change this to refresh checkmark status.
export const refreshCheckmarkStatusAtom = atom({
  key: 'refreshCheckmarkStatus',
  default: 0,
})

// Change this to refresh hidden balances.
export const refreshHiddenBalancesAtom = atom({
  key: 'refreshHiddenBalances',
  default: 0,
})

// Change this to refresh a vesting contract's data.
export const refreshVestingAtom = atomFamily<number, string>({
  key: 'refreshVesting',
  default: 0,
})
