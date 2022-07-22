import { atom } from 'recoil'

export const commandModalVisibleAtom = atom<boolean>({
  key: 'commandModalVisible',
  default: false,
})
