import { WarningRounded } from '@mui/icons-material'
import Fuse from 'fuse.js'
import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import { ContractVersion, LazyDaoCardProps } from '@dao-dao/types'
import {
  getChainGovernanceDaoDescription,
  getConfiguredChains,
  getDisplayNameForChainId,
  getImageUrlForChainId,
  getRpcForChainId,
} from '@dao-dao/utils'

import { GridCardContainer, NoContent, SearchBar } from '../components'
import { useSearchFilter } from '../hooks'

export type ChainGovernanceListProps = {
  LazyDaoCard: ComponentType<LazyDaoCardProps>
}

export const ChainGovernanceList = ({
  LazyDaoCard,
}: ChainGovernanceListProps) => {
  const { t } = useTranslation()

  const chains = getConfiguredChains()
    .filter(({ chainId, noGov }) => {
      // Ensure RPC exists for this chain. If not it will error.
      try {
        getRpcForChainId(chainId)
      } catch {
        return false
      }

      return !noGov
    })
    .map(
      ({ chainId, name }): LazyDaoCardProps => ({
        chainId,
        coreAddress: name,
        coreVersion: ContractVersion.Gov,
        description: getChainGovernanceDaoDescription(chainId),
        imageUrl: getImageUrlForChainId(chainId),
        name: getDisplayNameForChainId(chainId),
      })
    )

  const { searchBarProps, filteredData: filteredChains } = useSearchFilter({
    data: chains,
    filterableKeys: FILTERABLE_KEYS,
  })

  return (
    <>
      <SearchBar
        {...searchBarProps}
        containerClassName="mb-4"
        placeholder={t('info.searchForChain')}
      />

      {filteredChains.length > 0 ? (
        <GridCardContainer>
          {filteredChains.map(({ item: props }) => (
            <LazyDaoCard key={props.chainId} {...props} />
          ))}
        </GridCardContainer>
      ) : (
        <NoContent
          Icon={WarningRounded}
          body={t('info.nothingFound')}
          // className="h-full w-full justify-center border-0"
        />
      )}
    </>
  )
}

const FILTERABLE_KEYS: Fuse.FuseOptionKey<LazyDaoCardProps>[] = [
  'name',
  'chainId',
]
