import { atomFamily } from 'recoil'

import { localStorageEffectJSON } from '../effects'

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
