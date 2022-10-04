import { selectorFamily } from 'recoil'

import { KeplrWalletProfile } from '@dao-dao/tstypes'

export const keplrProfileImageSelector = selectorFamily<
  string | undefined,
  string
>({
  key: 'keplrProfileImage',
  get: (publicKey) => async () => {
    const { profile }: KeplrWalletProfile = await (
      await fetch(
        `https://api.kube-uw2.keplr-prod.manythings.xyz/v1/user/${publicKey}/profile`
      )
    ).json()

    return 'imageUrl' in profile ? profile.imageUrl : undefined
  },
})
