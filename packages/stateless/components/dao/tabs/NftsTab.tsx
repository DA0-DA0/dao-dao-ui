import { Image } from '@mui/icons-material'
import { ComponentType, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { LoadingData } from '@dao-dao/types'

import { GridCardContainer } from '../../GridCardContainer'
import { Dropdown, DropdownProps } from '../../inputs/Dropdown'
import { Loader } from '../../logo/Loader'
import { NoContent } from '../../NoContent'
import { PAGINATION_MIN_PAGE, Pagination } from '../../Pagination'

export interface NftsTabProps<N = any> {
  nfts: LoadingData<(N & { key: string })[]>
  NftCard: ComponentType<N>
  description?: string
  // If present, will show a dropdown to filter the NFTs.
  filterDropdownProps?: DropdownProps<any>
}

const NFTS_PER_PAGE = 30

export const NftsTab = <N extends object>({
  nfts,
  NftCard,
  description,
  filterDropdownProps,
}: NftsTabProps<N>) => {
  const { t } = useTranslation()

  const [page, setPage] = useState(PAGINATION_MIN_PAGE)

  return nfts.loading || nfts.data.length > 0 ? (
    <>
      <div className="flex min-h-[3.5rem] flex-col gap-y-4 gap-x-16 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-row flex-wrap items-end gap-x-4 gap-y-2">
          <p className="title-text">
            {nfts.loading
              ? t('title.nfts')
              : t('title.numNfts', { count: nfts.data.length })}
          </p>

          {description && (
            <p className="secondary-text break-words">{description}</p>
          )}
        </div>

        {filterDropdownProps && (
          <div className="flex shrink-0 flex-row items-center justify-between gap-4">
            <p className="primary-text text-text-body">{t('title.filter')}</p>

            <Dropdown {...filterDropdownProps} />
          </div>
        )}
      </div>

      {nfts.loading ? (
        <Loader fill={false} />
      ) : (
        <>
          <GridCardContainer className="pb-6">
            {nfts.data
              .slice((page - 1) * NFTS_PER_PAGE, page * NFTS_PER_PAGE)
              .map((props) => (
                <NftCard {...(props as N)} key={props.key} />
              ))}
          </GridCardContainer>

          <Pagination
            className="mx-auto mt-12"
            page={page}
            pageSize={NFTS_PER_PAGE}
            setPage={setPage}
            total={nfts.data.length}
          />
        </>
      )}
    </>
  ) : (
    <NoContent Icon={Image} body={t('info.noNftsYet')} />
  )
}
