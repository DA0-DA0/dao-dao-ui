import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import {
  featuredDaoCardInfosSelector,
  pinnedDaoCardInfosSelector,
} from '@dao-dao/state'
import { useSearchDaos } from '@dao-dao/state/subquery/daos'
import {
  CommandModalContextSection,
  CommandModalContextUseSectionsOptions,
  CommandModalDaoInfo,
} from '@dao-dao/tstypes'
import { getFallbackImage } from '@dao-dao/utils'

export interface UseFilteredDaosSectionOptions {
  options: CommandModalContextUseSectionsOptions
  onChoose: CommandModalContextSection<CommandModalDaoInfo>['onChoose']
  limit?: number
}

const DEFAULT_LIMIT = 7

export const usePinnedAndFilteredDaosSections = ({
  options,
  onChoose,
  limit = DEFAULT_LIMIT,
}: UseFilteredDaosSectionOptions): CommandModalContextSection[] => {
  const { t } = useTranslation()

  const featuredDaos = useRecoilValue(featuredDaoCardInfosSelector)
  const pinnedDaos = useRecoilValue(
    pinnedDaoCardInfosSelector({ daoUrlPrefix: `/dao/` })
  )

  const queryResults = useSearchDaos({
    query: options.filter,
    limit,
    // Exclude pinned DAOs from search since they show in a separate section.
    exclude: pinnedDaos.map(({ coreAddress }) => coreAddress),
  })

  // Use query results if filter is present.
  const daos = options.filter
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
      featuredDaos

  const pinnedSection: CommandModalContextSection<CommandModalDaoInfo> = {
    name: t('title.pinned'),
    onChoose,
    items: pinnedDaos,
  }

  const daosSection: CommandModalContextSection<CommandModalDaoInfo> = {
    name: t('title.daos'),
    onChoose,
    items: daos,
  }

  return [pinnedSection, daosSection]
}
