import {
  PageRequest,
  PageResponseSDKType,
} from 'interchain-rpc/types/codegen/cosmos/base/query/v1beta1/pagination'

export const getAllRpcResponse = async <
  P extends { pagination?: PageRequest; [key: string]: any },
  R extends { pagination?: PageResponseSDKType; [key: string]: any },
  K extends keyof R
>(
  queryFn: (params: P) => Promise<R>,
  params: P,
  key: K
): Promise<R[K]> => {
  let pagination: PageRequest | undefined
  const data = [] as any[]

  do {
    const response = await queryFn({
      ...params,
      pagination,
    })

    pagination = response.pagination?.next_key?.length
      ? { key: response.pagination.next_key }
      : undefined

    data.push(...(response[key] as any[]))
  } while (pagination !== undefined)

  return data as R[K]
}
