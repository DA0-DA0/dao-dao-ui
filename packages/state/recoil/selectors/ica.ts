import { selectorFamily } from 'recoil'

import { WithChainId } from '@dao-dao/types'
import { getIbcTransferInfoBetweenChains } from '@dao-dao/utils'
import { MsgSend } from '@dao-dao/utils/protobuf/codegen/cosmos/bank/v1beta1/tx'
import { MsgTransfer } from '@dao-dao/utils/protobuf/codegen/ibc/applications/transfer/v1/tx'

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

/**
 * Whether or not the chain has ICA host setup and allows spends/IBC transfers.
 */
export const chainSupportsIcaHostSelector = selectorFamily<
  boolean,
  WithChainId<{}>
>({
  key: 'chainSupportsIcaHost',
  get:
    ({ chainId }) =>
    async ({ get }) => {
      const ibc = get(ibcRpcClientForChainSelector(chainId))

      try {
        const { params: { hostEnabled, allowMessages } = {} } =
          await ibc.applications.interchain_accounts.host.v1.params()

        return (
          !!hostEnabled &&
          // Wildcard allows all messages.
          (!!allowMessages?.includes('*') ||
            // If no wildcard, ensure both bank and IBC sends are enabled.
            (!!allowMessages?.includes(MsgSend.typeUrl) &&
              !!allowMessages?.includes(MsgTransfer.typeUrl)))
        )
      } catch {
        return false
      }
    },
})

/**
 * Whether or not the chain has ICA controller setup.
 */
export const chainSupportsIcaControllerSelector = selectorFamily<
  boolean,
  WithChainId<{}>
>({
  key: 'chainSupportsIcaController',
  get:
    ({ chainId }) =>
    async ({ get }) => {
      const ibc = get(ibcRpcClientForChainSelector(chainId))

      try {
        const { params: { controllerEnabled } = {} } =
          await ibc.applications.interchain_accounts.controller.v1.params()

        return !!controllerEnabled
      } catch {
        return false
      }
    },
})
