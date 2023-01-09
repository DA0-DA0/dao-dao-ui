import { BreadcrumbsProps, DaoParentInfo } from '@dao-dao/types'

export const getParentDaoBreadcrumbs = (
  parentDao: DaoParentInfo | null | undefined
): BreadcrumbsProps['crumbs'] =>
  parentDao
    ? [
        ...getParentDaoBreadcrumbs(parentDao.parentDao),
        {
          href: `/dao/${parentDao.coreAddress}`,
          label: parentDao.name,
        },
      ]
    : []
