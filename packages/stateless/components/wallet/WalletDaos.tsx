import { BlurOn, WarningRounded } from '@mui/icons-material'
import Fuse from 'fuse.js'
import { ComponentType, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { LazyDaoCardProps, LoadingDataWithError } from '@dao-dao/types'

import { useQuerySyncedState, useSearchFilter } from '../../hooks'
import { Collapsible } from '../Collapsible'
import { ErrorPage } from '../error'
import { GridCardContainer } from '../GridCardContainer'
import { SearchBar } from '../inputs'
import { Loader } from '../logo'
import { NoContent } from '../NoContent'
import { ChainPickerPopup } from '../popup'

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

  const [showingInactive, setShowingInactive] = useState(false)

  const filteredDaos = chainId
    ? filteredData.filter(({ item }) => item.chainId === chainId)
    : filteredData

  const activeDaos = filteredDaos.filter(({ item }) => !item.isInactive)
  const inactiveDaos = filteredDaos.filter(({ item }) => item.isInactive)

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

        <ChainPickerPopup
          chains={{ type: 'supported' }}
          noneIcon={BlurOn}
          noneLabel={t('info.allChains')}
          onSelect={setChainId}
          selectedChainId={chainId}
          showNone
          // wrapperClassName="flex flex-row items-stretch"
        />
      </div>

      {activeDaos.length > 0 || inactiveDaos.length > 0 ? (
        <>
          {activeDaos.length > 0 && (
            <GridCardContainer>
              {activeDaos.map(({ item: dao }) => (
                <LazyDaoCard key={dao.chainId + dao.coreAddress} {...dao} />
              ))}
            </GridCardContainer>
          )}

          {inactiveDaos.length > 0 && (
            <Collapsible
              defaultCollapsed={!showingInactive}
              label={t('title.inactiveDaos')}
              noContentIndent
              onExpand={(expanded) => setShowingInactive(expanded)}
              tooltip={t('info.inactiveDaosTooltip')}
            >
              <GridCardContainer>
                {inactiveDaos.map(({ item: dao }) => (
                  <LazyDaoCard key={dao.chainId + dao.coreAddress} {...dao} />
                ))}
              </GridCardContainer>
            </Collapsible>
          )}
        </>
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
