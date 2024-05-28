import { atom } from 'recoil'

import { localStorageEffectJSON } from '../effects'

// Following API doesn't update right away due to Cloudflare KV Store latency,
// so this serves to keep track of all successful updates for the current
// session. This will be reset on page refresh. Set this right away so the UI
// can update immediately even if the API takes up to a minute or two. Though
// likely it only takes 10 seconds or so.
export const temporaryFollowingDaosAtom = atom<{
  /**
   * Serialized DaoSources.
   */
  following: string[]
  /**
   * Serialized DaoSources.
   */
  unfollowing: string[]
}>({
  key: 'temporaryFollowingDaos',
  default: { following: [], unfollowing: [] },
})

export const discordNotifierSetupAtom = atom<{
  state: string
  coreAddress: string
} | null>({
  key: 'discordNotifierSetup',
  default: null,
  effects: [localStorageEffectJSON],
})
