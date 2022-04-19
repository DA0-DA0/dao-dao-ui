import { atom } from 'recoil'

import { Theme } from 'ui'

import { localStorageEffect } from '@/atoms/localStorageEffect'

export const activeTheme = atom({
  key: 'activeTheme',
  default: Theme.Dark,
  effects_UNSTABLE: [localStorageEffect<Theme>('activeTheme')],
})
