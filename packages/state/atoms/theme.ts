import { atom } from 'recoil'

import { Theme } from '@dao-dao/ui'

import { localStorageEffect } from './effects'

export const activeTheme = atom({
  key: 'activeTheme',
  default: Theme.Dark,
  effects_UNSTABLE: [localStorageEffect<Theme>('activeTheme')],
})
