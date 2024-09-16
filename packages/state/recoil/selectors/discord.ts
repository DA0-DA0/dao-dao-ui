import { atomFamily, selectorFamily } from 'recoil'

import { DiscordNotifierRegistration } from '@dao-dao/types'
import { DISCORD_NOTIFIER_API_BASE } from '@dao-dao/utils'

type DiscordNotifierRegistrationsOptions = {
  chainId: string
  coreAddress: string
  walletPublicKey: string
}

export const refreshDiscordNotifierRegistrationsAtom = atomFamily<
  number,
  DiscordNotifierRegistrationsOptions
>({
  key: 'refreshDiscordNotifierRegistrations',
  default: 0,
})

export const discordNotifierRegistrationsSelector = selectorFamily<
  DiscordNotifierRegistration[],
  DiscordNotifierRegistrationsOptions
>({
  key: 'discordNotifierRegistrations',
  get:
    ({ chainId, coreAddress, walletPublicKey }) =>
    async ({ get }) => {
      get(
        refreshDiscordNotifierRegistrationsAtom({
          chainId,
          coreAddress,
          walletPublicKey,
        })
      )

      try {
        const { registrations } = await (
          await fetch(
            DISCORD_NOTIFIER_API_BASE +
              `/${chainId}/${coreAddress}/${walletPublicKey}/registrations`
          )
        ).json()

        return Array.isArray(registrations) ? registrations : []
      } catch (err) {
        console.error(err)
        return []
      }
    },
})
