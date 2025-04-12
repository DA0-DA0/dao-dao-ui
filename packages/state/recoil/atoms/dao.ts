import { atom, atomFamily } from 'recoil'

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

export const discordNotifierSetupAtom = atomFamily<
  | {
      state: string
      clientId: string
      clientSecret: string
      botToken: string
      redirectUri: string
    }
  | undefined,
  string
>({
  key: 'discordNotifierSetup',
  default: undefined,
  effects: [localStorageEffectJSON],
})

/**
 * Store whether or not the user has verified the initial actions for a DAO.
 * Verification is done by viewing the initial actions modal.
 */
export const initialActionsVerifiedAtom = atomFamily<
  boolean,
  {
    chainId: string
    coreAddress: string
  }
>({
  key: 'initialActionsVerified',
  default: false,
  effects: [localStorageEffectJSON],
})
