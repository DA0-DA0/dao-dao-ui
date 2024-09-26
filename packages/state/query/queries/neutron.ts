import { QueryClient, queryOptions } from '@tanstack/react-query'
import uniq from 'lodash.uniq'

import { HugeDecimal } from '@dao-dao/math'
import { ChainId, GenericTokenBalance, TokenType } from '@dao-dao/types'
import { Fee as NeutronFee } from '@dao-dao/types/protobuf/codegen/neutron/feerefunder/fee'
import { MAINNET, neutronProtoRpcClientRouter } from '@dao-dao/utils'

import { tokenQueries } from './token'

/**
 * Fetch Neutron IBC transfer fee.
 */
export const fetchNeutronIbcTransferFee = async (
  queryClient: QueryClient
): Promise<{
  fee: NeutronFee
  // Total fees summed together.
  sum: GenericTokenBalance[]
} | null> => {
  const chainId = MAINNET ? ChainId.NeutronMainnet : ChainId.NeutronTestnet
  const neutronClient = await neutronProtoRpcClientRouter.connect(chainId)
  const { params } = await neutronClient.feerefunder.params()
  const fee = params?.minFee
  if (fee) {
    const fees = [...fee.ackFee, ...fee.recvFee, ...fee.timeoutFee]
    const uniqueDenoms = uniq(fees.map((fee) => fee.denom))

    const tokens = await Promise.all(
      uniqueDenoms.map((denom) =>
        queryClient.fetchQuery(
          tokenQueries.info(queryClient, {
            chainId,
            type: TokenType.Native,
            denomOrAddress: denom,
          })
        )
      )
    )

    return {
      fee,
      sum: uniqueDenoms.map((denom) => ({
        token: tokens.find((token) => token.denomOrAddress === denom)!,
        balance: fees
          .filter(({ denom: feeDenom }) => feeDenom === denom)
          .reduce((acc, { amount }) => acc.plus(amount), HugeDecimal.zero)
          .toString(),
      })),
    }
  } else {
    return null
  }
}

export const neutronQueries = {
  /**
   * Fetch Neutron IBC transfer fee.
   */
  ibcTransferFee: (queryClient: QueryClient) =>
    queryOptions({
      queryKey: ['neutron', 'ibcTransferFee'],
      queryFn: () => fetchNeutronIbcTransferFee(queryClient),
    }),
}
