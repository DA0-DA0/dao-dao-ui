import { atom } from 'recoil'

import { Theme } from '@dao-dao/ui'

import { localStorageEffectJSON } from '../effects'

export const activeTheme = atom({
  key: 'activeTheme',
  default: Theme.Dark,
  effects: [localStorageEffectJSON<Theme>('activeTheme')],
})
