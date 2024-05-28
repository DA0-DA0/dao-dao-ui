import { QueryFunctionContext, useQuery } from '@tanstack/react-query'

export const daoQueryKeys = {
  info: (chainId: string, coreAddress: string) =>
    [
      {
        type: 'dao',
        query: 'info',
        chainId,
        coreAddress,
      },
    ] as const,
}

const fetchDaoInfo = async ({
  queryKey: [{ type, query, chainId, coreAddress }],
}: QueryFunctionContext<ReturnType<typeof daoQueryKeys.info>>) => {}

export const useDaoInfo = (...args: Parameters<typeof daoQueryKeys.info>) => {
  return useQuery({
    queryKey: daoQueryKeys.info(...args),
    queryFn: fetchDaoInfo,
  })
}
