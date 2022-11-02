import { atom } from 'recoil'

import { Theme } from '@dao-dao/types'

import { localStorageEffectJSON } from '../effects'

export const activeThemeAtom = atom({
  key: 'activeTheme',
  default: Theme.Dark,
  effects: [localStorageEffectJSON],
})
