import {
  BreadcrumbCrumb,
  DaoParentInfo,
  DaoPayrollConfig,
  DaoWebSocketChannelInfo,
} from '@dao-dao/types'

export const getParentDaoBreadcrumbs = (
  getDaoPath: (coreAddress: string) => string,
  parentDao: DaoParentInfo | null | undefined
): BreadcrumbCrumb[] =>
  parentDao
    ? [
        ...getParentDaoBreadcrumbs(getDaoPath, parentDao.parentDao),
        {
          href: getDaoPath(parentDao.coreAddress),
          label: parentDao.name,
        },
      ]
    : []

// Converts item value from DAO's core contract to a DaoPayrollConfig object, or
// undefined if it is not formatted correctly. It is either a string with the
// payroll type, or a stringified JSON object containing the payroll `type` and
// potentially additional arbitrary `data`.
export const getPayrollConfigFromItemValue = (
  itemValue: string | null | undefined
): DaoPayrollConfig | undefined => {
  if (!itemValue || typeof itemValue !== 'string') {
    return
  }

  // Try to parse item as JSON if starts with a "{". If does not start with "{",
  // assume it's an ID string, with no data.

  if (!itemValue.startsWith('{')) {
    return {
      type: itemValue,
      data: undefined,
    }
  }

  try {
    const parsedItem = JSON.parse(itemValue)
    if (
      'type' in parsedItem &&
      typeof parsedItem.type === 'string' &&
      !!parsedItem.type &&
      // Either data does not exist or is an object.
      (!('data' in parsedItem) || typeof parsedItem.data === 'object')
    ) {
      return parsedItem
    }
  } catch {
    // If failed to parse as JSON, or JSON does not match expected
    // structure, return undefined.
  }
}

export const webSocketChannelNameForDao = ({
  chainId,
  coreAddress,
}: DaoWebSocketChannelInfo) => `${chainId}_${coreAddress}`
