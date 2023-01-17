import { useTranslation } from 'react-i18next'

import { searchDaosSelector } from '@dao-dao/state/recoil'
import { useCachedLoadable } from '@dao-dao/stateless'
import {
  CommandModalContextSection,
  CommandModalContextUseSectionsOptions,
  CommandModalDaoInfo,
} from '@dao-dao/types'
import { getFallbackImage } from '@dao-dao/utils'

import {
  useLoadingFeaturedDaoCardInfos,
  useLoadingFollowingDaoCardInfos,
} from '../../hooks'

export interface UseFilteredDaosSectionOptions {
  options: CommandModalContextUseSectionsOptions
  onChoose: CommandModalContextSection<CommandModalDaoInfo>['onChoose']
  limit?: number
}

const DEFAULT_LIMIT = 7

export const useFollowingAndFilteredDaosSections = ({
  options,
  onChoose,
  limit = DEFAULT_LIMIT,
}: UseFilteredDaosSectionOptions): CommandModalContextSection[] => {
  const { t } = useTranslation()

  const featuredDaosLoading = useLoadingFeaturedDaoCardInfos()
  const followingDaosLoading = useLoadingFollowingDaoCardInfos()

  const queryResults = useCachedLoadable(
    options.filter
      ? searchDaosSelector({
          query: options.filter,
          limit,
          // Exclude following DAOs from search since they show in a separate
          // section.
          exclude: followingDaosLoading.loading
            ? undefined
            : followingDaosLoading.data.map(({ coreAddress }) => coreAddress),
        })
      : undefined
  )

  // Use query results if filter is present.
  const daos = options.filter
    ? (queryResults.state !== 'hasValue' ? [] : queryResults.contents)
        .filter(({ value }) => !!value?.config)
        .map(
          ({
            contractAddress,
            value: {
              config: { name, image_url },
            },
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

  const followingSection: CommandModalContextSection<CommandModalDaoInfo> = {
    name: t('title.following'),
    onChoose,
    items: followingDaosLoading.loading ? [] : followingDaosLoading.data,
  }

  const daosSection: CommandModalContextSection<CommandModalDaoInfo> = {
    name: t('title.daos'),
    onChoose,
    items: daos,
  }

  return [followingSection, daosSection]
}
