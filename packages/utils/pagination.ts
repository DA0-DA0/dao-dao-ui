import { Long } from '@osmonauts/helpers'
import {
  PageRequest,
  PageResponseSDKType,
} from 'interchain/types/codegen/cosmos/base/query/v1beta1/pagination'

import { KeysMatching } from '@dao-dao/tstypes'

export const getAllLcdResponse = async <
  P extends { pagination?: PageRequest },
  OP extends Omit<P, 'pagination'>,
  R extends { pagination?: PageResponseSDKType },
  K extends KeysMatching<R, unknown[]>
>(
  queryFn: (params: OP) => Promise<R>,
  params: OP,
  key: K
): Promise<R[K]> => {
  let pagination: PageRequest | undefined
  const data = []

  do {
    const response = await queryFn({
      ...params,
      pagination,
    })

    pagination = response.pagination?.next_key?.length
      ? {
          key: response.pagination.next_key,
          offset: Long.ZERO,
          limit: Long.MAX_VALUE,
          countTotal: false,
          reverse: false,
        }
      : undefined

    data.push(...(response[key] as unknown as unknown[]))
  } while (pagination !== undefined)

  return data as R[K]
}
