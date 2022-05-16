import { atom } from 'recoil'

// Store proposal ID list endings for proposal pagination.
// Map list index to its ending.
// Example with 25 proposals: { 0: 16, 1: 6, 2: 1 }
export const proposalStartBeforesAtom = atom<
  Record<number, number | undefined>
>({
  key: 'proposalStartBefores',
  default: {},
})

// Count of proposal lists that have been loaded. Each 'load more' action
// increments this.
export const proposalListCountAtom = atom<number>({
  key: 'proposalListCount',
  default: 1,
})
