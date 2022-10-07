import { Add, HomeOutlined, InboxOutlined } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import {
  featuredDaoCardInfosSelector,
  pinnedDaoCardInfosSelector,
} from '@dao-dao/state'
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

    const featuredDaos = useRecoilValue(featuredDaoCardInfosSelector)
    const pinnedDaos = useRecoilValue(
      pinnedDaoCardInfosSelector({ daoUrlPrefix: `/dao/` })
    )

    const queryResults = useSearchDaos({
      query: filter,
      limit: MAX_DAOS_DISPLAYED,
      exclude: pinnedDaos.map(({ coreAddress }) => coreAddress),
    })
    // Use query results if filter is present.
    const daos = filter
      ? (
          queryResults.data?.daos.nodes ??
          queryResults.previousData?.daos.nodes ??
          []
        ).map(
          ({ coreAddress, name, imageUrl }): CommandModalDaoInfo => ({
            coreAddress,
            name,
            imageUrl: imageUrl || getFallbackImage(coreAddress),
          })
        )
      : // Otherwise when filter is empty, display featured DAOs.
        featuredDaos.map(
          ({ coreAddress, name, imageUrl }): CommandModalDaoInfo => ({
            coreAddress,
            name,
            imageUrl: imageUrl || getFallbackImage(coreAddress),
          })
        )

    const navigationSection: CommandModalContextSection<{
      href: string
    }> = {
      name: t('title.navigation'),
      onChoose: ({ href }) => router.push(href),
      items: [
        {
          name: t('title.home'),
          Icon: HomeOutlined,
          href: '/home',
        },
        {
          name: t('title.inbox'),
          Icon: InboxOutlined,
          href: '/inbox',
        },
        {
          name: t('title.createADAO'),
          Icon: Add,
          href: '/dao/create',
        },
      ],
    }

    const pinnedSection: CommandModalContextSection<CommandModalDaoInfo> = {
      name: t('title.pinned'),
      onChoose: (dao) =>
        options.addContext(
          makeDaoContext({
            ...options,
            dao,
          })
        ),
      items: pinnedDaos.map(
        ({ coreAddress, name, imageUrl }): CommandModalDaoInfo => ({
          coreAddress,
          name,
          imageUrl: imageUrl || getFallbackImage(coreAddress),
        })
      ),
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

    return [navigationSection, pinnedSection, daosSection]
  }

  return {
    // Not shown.
    name: 'Root',
    useSections,
  }
}
