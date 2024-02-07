import {
  Account,
  AccountType,
  BreadcrumbCrumb,
  ContractVersion,
  DaoDropdownInfo,
  DaoParentInfo,
  DaoWebSocketChannelInfo,
  PolytoneProxies,
} from '@dao-dao/types'
import { InstantiateMsg as DaoCoreV2InstantiateMsg } from '@dao-dao/types/contracts/DaoCore.v2'

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

export const getFundsFromDaoInstantiateMsg = ({
  voting_module_instantiate_info,
  proposal_modules_instantiate_info,
}: DaoCoreV2InstantiateMsg) => [
  ...(voting_module_instantiate_info.funds || []),
  ...proposal_modules_instantiate_info.flatMap(({ funds }) => funds || []),
]

// Gets the account on the specified chain or undefined if nonexistent.
export const getAccount = ({
  accounts,
  chainId,
  types = [AccountType.Native, AccountType.Polytone],
}: {
  accounts: Account[]
  chainId: string
  types?: AccountType[]
}): Account | undefined =>
  accounts.find(
    (account) => types.includes(account.type) && account.chainId === chainId
  )

// Gets the account address on the specified chain or undefined if nonexistent.
export const getAccountAddress = (
  ...params: Parameters<typeof getAccount>
): string | undefined => getAccount(...params)?.address

// Gets the chain ID for an address or undefined if nonexistent.
export const getAccountChainId = ({
  accounts,
  address,
  types = [AccountType.Native, AccountType.Polytone],
}: {
  accounts: Account[]
  address: string
  types?: AccountType[]
}): string | undefined =>
  accounts.find(
    (account) => types.includes(account.type) && account.address === address
  )?.chainId

/**
 * Filter DAO items by prefix and remove the prefix from the key.
 *
 * @param items A DAO items object.
 * @param prefix The prefix to filter by.
 * @returns An array of filtered items in the form of [key, value].
 */
export const getFilteredDaoItemsByPrefix = (
  items: Record<string, string>,
  prefix: string
): [string, string][] =>
  Object.entries(items).flatMap(([key, value]) =>
    key.startsWith(prefix) ? [[key.substring(prefix.length), value]] : []
  )

/**
 * Keep SubDAOs in the dropdown that are in the list to keep. This helper
 * function is used in `followingDaoDropdownInfosSelector`.
 */
export const keepSubDaosInDropdown = (
  daos: DaoDropdownInfo[],
  keepDaos: string[]
): DaoDropdownInfo[] =>
  daos.map((dao) => ({
    ...dao,
    subDaos: dao.subDaos
      ? // Recurse into SubDAOs of SubDAOs.
        keepSubDaosInDropdown(
          // Only keep followed SubDAOs.
          dao.subDaos.filter(({ coreAddress }) =>
            keepDaos.includes(coreAddress)
          ),
          keepDaos
        )
      : undefined,
  }))

/**
 * Check if a DAO exists as a SubDAO in the list of DAO dropdowns. This helper
 * function is used in `followingDaoDropdownInfosSelector`.
 */
export const subDaoExistsInDropdown = (
  daos: DaoDropdownInfo[],
  subDaoAddress: string
): boolean =>
  daos.some((dao) =>
    dao.subDaos?.some(
      ({ coreAddress, subDaos }) =>
        coreAddress === subDaoAddress ||
        (subDaos && subDaoExistsInDropdown(subDaos, subDaoAddress))
    )
  )
