import { atom } from 'recoil'

import { localStorageEffect } from 'atoms/localStorageEffect'

// As a relic of when we were doing non-backwards compatible changes on the
// testnet we used to namespace a user's favorited DAOs / Multisigs. That
// namespacing used to occur based on the DAO code ID what was being used so we
// now lock the namespace to the last DAO code ID before we got stopped removing
// favorites when the contracts were updated.
const NAMESPACE = process.env.NEXT_PUBLIC_FAVORITES_NAMESPACE as string

export const pinnedDaosAtom = atom<string[]>({
  key: 'pinnedDaoAddresses',
  default: [],
  effects_UNSTABLE: [localStorageEffect<string[]>(`${NAMESPACE}_pinnedDaos`)],
})

export const pinnedMultisigsAtom = atom<string[]>({
  key: 'pinnedMultisigAddresses',
  default: [],
  effects_UNSTABLE: [
    localStorageEffect<string[]>(`${NAMESPACE}_pinnedMultisigs`),
  ],
})
