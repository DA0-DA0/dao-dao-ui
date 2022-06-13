import { atom } from 'recoil'

import { Theme } from '@dao-dao/v1-types'

import { localStorageEffectJSON } from '../effects'

export const activeThemeAtom = atom({
  key: 'activeTheme',
  default: Theme.Dark,
  effects: [localStorageEffectJSON<Theme>('activeTheme')],
})
