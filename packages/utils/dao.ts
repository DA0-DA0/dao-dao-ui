import {
  BreadcrumbCrumb,
  ContractVersion,
  DaoParentInfo,
  DaoWebSocketChannelInfo,
  PolytoneProxies,
} from '@dao-dao/types'

import { getSupportedChainConfig } from './chain'
import { getGovPath } from './url'

export const getParentDaoBreadcrumbs = (
  getDaoPath: (coreAddress: string) => string,
  parentDao: DaoParentInfo | null | undefined
): BreadcrumbCrumb[] =>
  parentDao
    ? [
        ...getParentDaoBreadcrumbs(getDaoPath, parentDao.parentDao),
        {
          href: (parentDao.coreVersion === ContractVersion.Gov
            ? getGovPath
            : getDaoPath)(parentDao.coreAddress),
          label: parentDao.name,
        },
      ]
    : []

export const webSocketChannelNameForDao = ({
  chainId,
  coreAddress,
}: DaoWebSocketChannelInfo) => `${chainId}_${coreAddress}`

export const polytoneNoteProxyMapToChainIdMap = (
  // Source chain
  chainId: string,
  // Map of polytone note on source chain to remote polytone proxies.
  polytoneNoteProxyMap: Record<string, string>
): PolytoneProxies => {
  // Convert to chain ID to proxy map based on polytone connections.
  return Object.entries(
    getSupportedChainConfig(chainId)?.polytone || {}
  ).reduce((acc, [chainId, { note }]) => {
    const proxy = polytoneNoteProxyMap[note]

    return {
      ...acc,
      ...(proxy
        ? {
            [chainId]: proxy,
          }
        : {}),
    }
  }, {} as PolytoneProxies)
}
