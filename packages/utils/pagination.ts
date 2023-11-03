import {
  PageRequest,
  PageResponse,
} from './protobuf/codegen/cosmos/base/query/v1beta1/pagination'

export const getAllRpcResponse = async <
  P extends { pagination?: PageRequest; [key: string]: any },
  R extends { pagination?: PageResponse; [key: string]: any },
  K extends keyof R
>(
  queryFn: (params: P) => Promise<R>,
  params: P,
  key: K,
  reverse = false
): Promise<R[K]> => {
  let pagination: Partial<PageRequest> | undefined
  const data = [] as any[]

  do {
    const response = await queryFn({
      ...params,
      pagination: {
        key: new Uint8Array(),
        ...pagination,
        reverse,
        // Get all.
        offset: 0n,
        limit: BigInt(Number.MAX_SAFE_INTEGER),
      },
    })

    pagination = response.pagination?.nextKey?.length
      ? {
          key: response.pagination.nextKey,
        }
      : undefined

    const results = response[key] as any[]
    // If no results retrieved, stop.
    if (!results?.length) {
      break
    }

    data.push(...results)
  } while (pagination !== undefined)

  return data as R[K]
}
