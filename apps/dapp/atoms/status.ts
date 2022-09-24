// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { atom } from 'recoil'

import { localStorageEffectJSON } from '@dao-dao/state/recoil/effects'

export const betaWarningAcceptedAtom = atom<boolean>({
  key: 'betaWarningAccepted',
  default: false,
  effects: [localStorageEffectJSON],
})

export const installWarningVisibleAtom = atom<boolean>({
  key: 'installWarningVisible',
  default: false,
})

export const noKeplrAccountAtom = atom<boolean>({
  key: 'noKeplrAccountAtom',
  default: false,
})
