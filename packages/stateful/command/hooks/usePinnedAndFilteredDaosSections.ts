import { useTranslation } from 'react-i18next'

import {
  CommandModalContextSection,
  CommandModalContextUseSectionsOptions,
  CommandModalDaoInfo,
} from '@dao-dao/types'
import { getFallbackImage } from '@dao-dao/utils'

import {
  useLoadingFeaturedDaoCardInfos,
  useLoadingPinnedDaoCardInfos,
} from '../../hooks'
import { useSearchDaos } from '../../hooks/useSearchDaos'

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

  const featuredDaosLoading = useLoadingFeaturedDaoCardInfos()
  const pinnedDaosLoading = useLoadingPinnedDaoCardInfos()

  const queryResults = useSearchDaos({
    query: options.filter,
    limit,
    // Exclude pinned DAOs from search since they show in a separate section.
    exclude: pinnedDaosLoading.loading
      ? undefined
      : pinnedDaosLoading.data.map(({ coreAddress }) => coreAddress),
  })

  // Use query results if filter is present.
  const daos = options.filter
    ? (queryResults.state !== 'hasValue' ? [] : queryResults.contents).map(
        ({
          contractAddress,
          value: { name, image_url },
        }): CommandModalDaoInfo => ({
          // Nothing specific to set here yet, just uses default.
          chainId: undefined,
          coreAddress: contractAddress,
          name,
          imageUrl: image_url || getFallbackImage(contractAddress),
        })
      )
    : // Otherwise when filter is empty, display featured DAOs.
    featuredDaosLoading.loading
    ? []
    : featuredDaosLoading.data

  const pinnedSection: CommandModalContextSection<CommandModalDaoInfo> = {
    name: t('title.pinned'),
    onChoose,
    items: pinnedDaosLoading.loading ? [] : pinnedDaosLoading.data,
  }

  const daosSection: CommandModalContextSection<CommandModalDaoInfo> = {
    name: t('title.daos'),
    onChoose,
    items: daos,
  }

  return [pinnedSection, daosSection]
}
