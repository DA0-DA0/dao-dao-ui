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
