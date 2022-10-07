import { Add } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

import { useSearchDaos } from '@dao-dao/state/subquery/daos'
import {
  CommandModalContextMaker,
  CommandModalContextSection,
  CommandModalContextUseSections,
  CommandModalDaoInfo,
} from '@dao-dao/tstypes'
import { getFallbackImage } from '@dao-dao/utils'

import { makeDaoContext } from './dao'

const MAX_DAOS_DISPLAYED = 7

export const makeRootContext: CommandModalContextMaker = (options) => {
  const useSections: CommandModalContextUseSections = ({ filter }) => {
    const { t } = useTranslation()
    const router = useRouter()

    // TODO: When filter is empty, display featured DAOs.
    const queryResults = useSearchDaos({
      query: filter,
    })
    const daos = (
      queryResults.data?.daos.nodes ??
      queryResults.previousData?.daos.nodes ??
      []
    )
      .slice(0, MAX_DAOS_DISPLAYED)
      .map(
        ({ coreAddress, name, imageUrl }): CommandModalDaoInfo => ({
          coreAddress,
          name,
          imageUrl: imageUrl || getFallbackImage(coreAddress),
        })
      )

    const appNavigationSection: CommandModalContextSection<{
      href: string
    }> = {
      name: t('title.appNavigation'),
      onChoose: ({ href }) => router.push(href),
      items: [
        {
          name: t('title.createADAO'),
          Icon: Add,
          href: '/dao/create',
        },
      ],
    }

    const daosSection: CommandModalContextSection<CommandModalDaoInfo> = {
      name: t('title.daos'),
      onChoose: (dao) =>
        options.addContext(
          makeDaoContext({
            ...options,
            dao,
          })
        ),
      items: daos,
    }

    return [appNavigationSection, daosSection]
  }

  return {
    // Not shown.
    name: 'Root',
    useSections,
  }
}
