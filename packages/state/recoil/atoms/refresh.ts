import { atomFamily } from 'recoil'

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
