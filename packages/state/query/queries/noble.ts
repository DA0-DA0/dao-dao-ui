import { queryOptions } from '@tanstack/react-query'

import { ChainId } from '@dao-dao/types'
import { Params as NobleTariffParams } from '@dao-dao/types/protobuf/codegen/tariff/params'
import { nobleProtoRpcClientRouter } from '@dao-dao/utils'

/**
 * Fetch Noble IBC transfer fee.
 */
export const fetchNobleIbcTransferFee =
  async (): Promise<NobleTariffParams | null> => {
    const nobleClient = await nobleProtoRpcClientRouter.connect(
      ChainId.NobleMainnet
    )
    const { params } = await nobleClient.tariff.params()
    return params || null
  }

export const nobleQueries = {
  /**
   * Fetch Noble IBC transfer fee.
   */
  ibcTransferFee: () =>
    queryOptions({
      queryKey: ['noble', 'ibcTransferFee'],
      queryFn: fetchNobleIbcTransferFee,
    }),
}
