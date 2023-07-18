import { useTranslation } from 'react-i18next'
import { waitForAll } from 'recoil'

import { searchDaosSelector } from '@dao-dao/state/recoil'
import { useCachedLoadable } from '@dao-dao/stateless'
import {
  CommandModalContextSection,
  CommandModalContextSectionItem,
  CommandModalContextUseSectionsOptions,
  CommandModalDaoInfo,
} from '@dao-dao/types'
import { getFallbackImage, getSupportedChains } from '@dao-dao/utils'

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

  const chains = getSupportedChains()
  const featuredDaosLoading = useLoadingFeaturedDaoCardInfos()
  const followingDaosLoading = useLoadingFollowingDaoCardInfos()

  const queryResults = useCachedLoadable(
    options.filter
      ? waitForAll(
          chains.map(({ chain }) =>
            searchDaosSelector({
              chainId: chain.chain_id,
              query: options.filter,
              limit,
              // Exclude following DAOs from search since they show in a separate
              // section.
              exclude: followingDaosLoading.loading
                ? undefined
                : followingDaosLoading.data
                    .filter(({ chainId }) => chainId === chain.chain_id)
                    .map(({ coreAddress }) => coreAddress),
            })
          )
        )
      : undefined
  )

  // Use query results if filter is present.
  const daos = options.filter
    ? (queryResults.state !== 'hasValue' ? [] : queryResults.contents.flat())
        .filter(({ value }) => !!value?.config)
        .map(
          ({
            chainId,
            contractAddress,
            value: {
              config: { name, image_url },
              proposalCount,
            },
          }): CommandModalContextSectionItem<CommandModalDaoInfo> => ({
            chainId,
            coreAddress: contractAddress,
            name,
            imageUrl: image_url || getFallbackImage(contractAddress),
            // If DAO has no proposals, make it less visible and give it a
            // tooltip to indicate that it may not be active.
            ...(proposalCount === 0 && {
              className: 'opacity-50',
              tooltip: t('info.noProposalsTooltip'),
            }),
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
    // When a search is active, show above all other sections. This serves to
    // prioritize the DAOs you follow over all other DAOs you can search.
    searchOrder: 1,
    loading: followingDaosLoading.loading || !!followingDaosLoading.updating,
  }

  const daosSection: CommandModalContextSection<CommandModalDaoInfo> = {
    name: t('title.daos'),
    onChoose,
    items: daos,
    loading: queryResults.state === 'loading',
  }

  return [followingSection, daosSection]
}
