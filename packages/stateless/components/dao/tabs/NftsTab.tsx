import { Image } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import { LoadingData } from '@dao-dao/types'

import { GridCardContainer } from '../../GridCardContainer'
import { Dropdown, DropdownProps } from '../../inputs/Dropdown'
import { NftCardLoader } from '../../nft/NftCard'
import { NoContent } from '../../NoContent'
import { Pagination } from '../../Pagination'

export interface NftsTabProps<N = any> {
  page: number
  setPage: (page: number) => void
  pageSize: number
  nfts: LoadingData<(N & { key: string })[]>
  numNfts: LoadingData<number>
  NftCard: ComponentType<N>
  description?: string
  // If present, will show a dropdown to filter the NFTs.
  filterDropdownProps?: DropdownProps<any>
}

export const NftsTab = <N extends object>({
  page,
  setPage,
  pageSize,
  nfts,
  numNfts,
  NftCard,
  description,
  filterDropdownProps,
}: NftsTabProps<N>) => {
  const { t } = useTranslation()

  return nfts.loading || numNfts.loading || numNfts.data > 0 ? (
    <>
      <div className="flex min-h-[3.5rem] flex-col gap-y-4 gap-x-16 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-row flex-wrap items-end gap-x-4 gap-y-2">
          <p className="title-text">
            {nfts.loading || numNfts.loading
              ? t('title.nfts')
              : t('title.numNfts', { count: numNfts.data })}
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

      {nfts.loading || numNfts.loading ? (
        <GridCardContainer className="pb-6">
          {[...Array(pageSize)].map((_, index) => (
            <NftCardLoader key={index} />
          ))}
        </GridCardContainer>
      ) : (
        <>
          <GridCardContainer
            className={clsx('pb-6', nfts.updating && 'animate-pulse')}
          >
            {nfts.data.map((props) => (
              <NftCard {...(props as N)} key={props.key} />
            ))}
          </GridCardContainer>

          <Pagination
            className="mx-auto mt-6"
            page={page}
            pageSize={pageSize}
            setPage={setPage}
            total={numNfts.data}
          />
        </>
      )}
    </>
  ) : (
    <NoContent Icon={Image} body={t('info.noNftsFound')} />
  )
}
