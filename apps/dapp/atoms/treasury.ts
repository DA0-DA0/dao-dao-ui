import { atomFamily } from 'recoil'

// Atom to count the number of treasury token list updates for a given contract
// address.
export const treasuryTokenListUpdates = atomFamily<number, string>({
  key: 'treasuryTokenListUpdates',
  default: 0,
})
