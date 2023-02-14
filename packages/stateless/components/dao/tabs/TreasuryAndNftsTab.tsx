import { Image } from '@mui/icons-material'
import { ComponentType, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { LoadingData, NftCardInfo, TokenCardInfo } from '@dao-dao/types'

import { SortFn, useDropdownSorter } from '../../../hooks'
import { Button } from '../../buttons'
import { GridCardContainer } from '../../GridCardContainer'
import { Dropdown, DropdownOption } from '../../inputs/Dropdown'
import { Loader } from '../../logo/Loader'
import { ModalProps } from '../../modals/Modal'
import { NoContent } from '../../NoContent'

export interface TreasuryAndNftsTabProps<
  T extends TokenCardInfo,
  N extends NftCardInfo
> {
  tokens: LoadingData<T[]>
  TokenCard: ComponentType<T>
  nfts: LoadingData<N[]>
  NftCard: ComponentType<N>
  isMember: boolean
  addCollectionHref?: string
  StargazeNftImportModal: ComponentType<Pick<ModalProps, 'onClose'>>
  FiatDepositModal?: ComponentType<Pick<ModalProps, 'onClose' | 'visible'>>
}

export const TreasuryAndNftsTab = <
  T extends TokenCardInfo,
  N extends NftCardInfo
>({
  tokens,
  TokenCard,
  nfts,
  NftCard,
  isMember,
  addCollectionHref,
  StargazeNftImportModal,
  FiatDepositModal,
}: TreasuryAndNftsTabProps<T, N>) => {
  const [showImportStargazeNftsModal, setShowImportStargazeNftsModal] =
    useState(false)

  const { t } = useTranslation()

  // Sort governance token first.
  const sortedTokens = useMemo(
    () =>
      tokens.loading
        ? []
        : // `sort` mutates, so let's make a copy of the array first.
          [...tokens.data].sort((a, b) =>
            !!a.isGovernanceToken === !!b.isGovernanceToken
              ? 0
              : a.isGovernanceToken
              ? -1
              : 1
          ),
    [tokens]
  )

  const { sortedData: sortedNfts, dropdownProps: sortDropdownProps } =
    useDropdownSorter(nfts.loading ? [] : nfts.data, sortOptions)

  const [showDepositFiat, setShowDepositFiat] = useState(false)

  return (
    <>
      {/* header min-height of 3.5rem standardized across all tabs */}
      <div className="flex min-h-[3.5rem] flex-row items-center justify-between pb-6">
        <p className="title-text text-text-body">{t('title.treasury')}</p>

        {/* Only show if defined, which indicates wallet connected. */}
        {FiatDepositModal && (
          <Button onClick={() => setShowDepositFiat(true)} variant="secondary">
            {t('button.depositFiat')}
          </Button>
        )}
      </div>

      <div className="mb-9">
        {tokens.loading || !tokens.data ? (
          <Loader fill={false} />
        ) : tokens.data.length ? (
          <GridCardContainer cardType="wide">
            {sortedTokens.map((props, index) => (
              <TokenCard {...props} key={index} />
            ))}
          </GridCardContainer>
        ) : (
          <p className="secondary-text">{t('info.nothingFound')}</p>
        )}
      </div>

      {nfts.loading || nfts.data.length > 0 ? (
        <>
          <div className="mb-6 flex flex-col gap-4 xs:flex-row xs:items-center xs:justify-between">
            <p className="title-text">
              {nfts.loading
                ? t('title.nfts')
                : t('title.numNfts', { count: nfts.data.length })}
            </p>

            {!nfts.loading && nfts.data.length > 0 && (
              <div className="flex flex-row items-center justify-between gap-4">
                <p className="primary-text text-text-body">
                  {t('title.sortBy')}
                </p>

                <Dropdown {...sortDropdownProps} />
              </div>
            )}
          </div>

          {nfts.loading ? (
            <Loader fill={false} />
          ) : (
            <GridCardContainer className="pb-6">
              {sortedNfts.map((props, index) => (
                <NftCard {...(props as N)} key={index} />
              ))}

              {/* TODO(ICS721): Uncomment when ICS721 is ready. */}
              {/* <NoContent
                Icon={Image}
                body={t('info.depositFromStargazeQuestion')}
                buttonLabel={t('button.deposit')}
                className="justify-center min-h-[20rem]"
                onClick={() => setShowImportStargazeNftsModal(true)}
              /> */}
            </GridCardContainer>
          )}
        </>
      ) : (
        <NoContent
          Icon={Image}
          actionNudge={t('info.areTheyMissingQuestion')}
          body={t('info.noNftsYet')}
          buttonLabel={t('button.addCollection')}
          href={isMember ? addCollectionHref : undefined}
        />
      )}

      {showImportStargazeNftsModal && (
        <StargazeNftImportModal
          onClose={() => setShowImportStargazeNftsModal(false)}
        />
      )}

      {FiatDepositModal && (
        <FiatDepositModal
          onClose={() => setShowDepositFiat(false)}
          visible={showDepositFiat}
        />
      )}
    </>
  )
}

const sortOptions: DropdownOption<
  SortFn<Pick<NftCardInfo, 'name' | 'floorPrice'>>
>[] = [
  {
    label: 'A → Z',
    value: (a, b) =>
      a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase()),
  },
  {
    label: 'Z → A',
    value: (a, b) =>
      b.name.toLocaleLowerCase().localeCompare(a.name.toLocaleLowerCase()),
  },
  // {
  //   label: 'Lowest floor',
  //   value: (a, b) =>
  //     !a.floorPrice
  //       ? 1
  //       : !b.floorPrice
  //       ? -1
  //       : a.floorPrice.amount - b.floorPrice.amount,
  // },
  // {
  //   label: 'Highest floor',
  //   value: (a, b) =>
  //     !a.floorPrice
  //       ? 1
  //       : !b.floorPrice
  //       ? -1
  //       : b.floorPrice.amount - a.floorPrice.amount,
  // },
]
