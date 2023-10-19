import { selectorFamily } from 'recoil'

import { getIbcTransferInfoBetweenChains } from '@dao-dao/utils'

import { ibcRpcClientForChainSelector } from './chain'

// Returns ICA address on host `destChainId` controlled by `address` on
// `srcChainId`.
export const icaRemoteAddressSelector = selectorFamily<
  string | undefined,
  {
    address: string
    srcChainId: string
    destChainId: string
  }
>({
  key: 'icaRemoteAddress',
  get:
    ({ address, srcChainId, destChainId }) =>
    async ({ get }) => {
      const {
        sourceChain: { connection_id },
      } = getIbcTransferInfoBetweenChains(srcChainId, destChainId)
      const ibcClient = get(ibcRpcClientForChainSelector(srcChainId))

      try {
        const account =
          await ibcClient.applications.interchain_accounts.controller.v1.interchainAccount(
            {
              owner: address,
              connectionId: connection_id,
            }
          )

        return account.address
      } catch (err) {
        // On lookup failure, return undefined.
        if (
          err instanceof Error &&
          err.message.includes('failed to retrieve account address') &&
          err.message.includes('key not found')
        ) {
          return
        }

        // Rethrow all other errors.
        throw err
      }
    },
})
