import { atomFamily } from 'recoil'

// Increment this to refresh status.
export const refreshStatusAtom = atomFamily<
  number,
  { daoAddress: string; walletAddress: string }
>({
  key: 'payrollRetroactiveRefreshStatus',
  default: 0,
})
