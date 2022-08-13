// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { atom } from 'recoil'

export const commandModalVisibleAtom = atom<boolean>({
  key: 'commandModalVisible',
  default: false,
})
