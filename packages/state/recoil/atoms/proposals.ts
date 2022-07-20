import { atomFamily } from 'recoil'

// Store proposal ID list endings for proposal pagination for the given
// coreAddress. Map list index to its ending for each proposal module address.
export const proposalStartBeforesAtom = atomFamily<
  Record<number, Record<string, number | undefined> | undefined>,
  string
>({
  key: 'proposalStartBefores',
  // Start first list (index 0) at the beginning.
  // It uses the previous list's ending as its starting point, so
  // set index -1 to undefined so startBefore is initially undefined.
  default: { [-1]: undefined },
})

// Count of proposal lists that have been loaded for the given coreAddress. Each
// 'load more' action increments this.
export const proposalListCountAtom = atomFamily<number, string>({
  key: 'proposalListCount',
  default: 1,
})
