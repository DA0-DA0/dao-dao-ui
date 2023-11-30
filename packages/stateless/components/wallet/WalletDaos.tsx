import { BlurOn, WarningRounded } from '@mui/icons-material'
import Fuse from 'fuse.js'
import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import { LazyDaoCardProps, LoadingDataWithError } from '@dao-dao/types'

import { useQuerySyncedState, useSearchFilter } from '../../hooks'
import { ErrorPage } from '../error'
import { GridCardContainer } from '../GridCardContainer'
import { ChainSwitcher, SearchBar } from '../inputs'
import { Loader } from '../logo'
import { NoContent } from '../NoContent'

export type WalletDaosProps = {
  daos: LoadingDataWithError<LazyDaoCardProps[]>
  LazyDaoCard: ComponentType<LazyDaoCardProps>
}

export const WalletDaos = ({ daos, LazyDaoCard }: WalletDaosProps) => {
  const { t } = useTranslation()

  const allDaos = daos.loading || daos.errored || !daos.data ? [] : daos.data
  const { searchBarProps, filteredData } = useSearchFilter(
    allDaos,
    FILTERABLE_KEYS,
    undefined,
    'dq'
  )

  const [chainId, setChainId] = useQuerySyncedState<string | undefined>({
    param: 'dqc',
    defaultValue: undefined,
  })

  const filteredDaos = chainId
    ? filteredData.filter(({ item }) => item.chainId === chainId)
    : filteredData

  return daos.loading ? (
    <Loader />
  ) : daos.errored ? (
    <ErrorPage title={t('error.unexpectedError')}>
      <pre className="whitespace-pre-wrap text-xs text-text-interactive-error">
        {daos.error instanceof Error ? daos.error.message : `${daos.error}`}
      </pre>
    </ErrorPage>
  ) : (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row items-stretch gap-2">
        <SearchBar
          containerClassName="grow"
          placeholder={t('info.searchDaosPlaceholder')}
          {...searchBarProps}
        />

        <ChainSwitcher
          noneIcon={BlurOn}
          noneLabel={t('info.allChains')}
          onSelect={(chain) => setChainId(chain?.chain_id)}
          selected={chainId}
          showNone
          wrapperClassName="flex flex-row items-stretch"
        />
      </div>

      {filteredDaos.length > 0 ? (
        <GridCardContainer>
          {filteredDaos.map(({ item: dao }) => (
            <LazyDaoCard key={dao.chainId + dao.coreAddress} {...dao} />
          ))}
        </GridCardContainer>
      ) : (
        <NoContent Icon={WarningRounded} body={t('info.nothingFound')} />
      )}
    </div>
  )
}

const FILTERABLE_KEYS: Fuse.FuseOptionKey<LazyDaoCardProps>[] = [
  'chainId',
  'coreAddress',
  'name',
  'description',
]
