import { selectorFamily } from 'recoil'

import { PolytoneProxies, WithChainId } from '@dao-dao/types'
import { POLYTONE_NOTES } from '@dao-dao/utils'

import { PolytoneNoteSelectors } from './contracts'

export const daoCorePolytoneProxiesSelector = selectorFamily<
  PolytoneProxies,
  WithChainId<{ coreAddress: string }>
>({
  key: 'daoCorePolytoneProxies',
  get:
    ({ coreAddress, chainId }) =>
    ({ get }) => {
      // Get polytone proxies.
      const polytoneProxies = Object.entries(POLYTONE_NOTES)
        .map(([_chainId, { note }]) => ({
          chainId: _chainId,
          proxy: get(
            PolytoneNoteSelectors.remoteAddressSelector({
              contractAddress: note,
              chainId,
              params: [
                {
                  localAddress: coreAddress,
                },
              ],
            })
          ),
        }))
        .reduce(
          (acc, { chainId, proxy }) => ({
            ...acc,
            ...(proxy
              ? {
                  [chainId]: proxy,
                }
              : {}),
          }),
          {} as PolytoneProxies
        )

      return polytoneProxies
    },
})
