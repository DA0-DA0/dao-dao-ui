import { atom } from 'recoil'

import { Theme } from '@dao-dao/ui'

import { localStorageEffectJSON } from '../effects'

export const activeThemeAtom = atom({
  key: 'activeTheme',
  default: Theme.Dark,
  effects: [localStorageEffectJSON],
})
