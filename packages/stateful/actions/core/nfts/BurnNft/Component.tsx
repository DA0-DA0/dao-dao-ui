import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  Button,
  HorizontalNftCard,
  InputErrorMessage,
  Loader,
  NftSelectionModal,
} from '@dao-dao/stateless'
import {
  ActionComponent,
  LoadingDataWithError,
  NftCardInfo,
} from '@dao-dao/types'

export type BurnNftData = {
  chainId: string
  collection: string
  tokenId: string
}

export interface BurnNftOptions {
  // The set of NFTs that may be burned as part of this action.
  options: LoadingDataWithError<NftCardInfo[]>
  // Information about the NFT currently selected. If errored, it may be burnt.
  nftInfo: LoadingDataWithError<NftCardInfo | undefined>
}

export const BurnNft: ActionComponent<BurnNftOptions> = ({
  fieldNamePrefix,
  isCreating,
  errors,
  options: { options, nftInfo },
}) => {
  const { t } = useTranslation()
  const { watch, setValue, setError, clearErrors } =
    useFormContext<BurnNftData>()

  const chainId = watch((fieldNamePrefix + 'chainId') as 'chainId')
  const tokenId = watch((fieldNamePrefix + 'tokenId') as 'tokenId')
  const collection = watch((fieldNamePrefix + 'collection') as 'collection')

  const selected = `${chainId}:${collection}:${tokenId}`
  const getIdForNft = (nft: NftCardInfo) =>
    `${nft.chainId}:${nft.collection.address}:${nft.tokenId}`

  useEffect(() => {
    if (
      !selected ||
      // If selected, make sure it exists in options.
      (!options.loading &&
        !options.errored &&
        !options.data.some((nft) => getIdForNft(nft) === selected))
    ) {
      if (!errors?.collection) {
        setError((fieldNamePrefix + 'collection') as 'collection', {
          type: 'required',
          message: t('error.noNftSelected'),
        })
      }
    } else {
      if (errors?.collection) {
        clearErrors((fieldNamePrefix + 'collection') as 'collection')
      }
    }
  }, [
    selected,
    setError,
    clearErrors,
    t,
    fieldNamePrefix,
    options,
    errors?.collection,
  ])

  // Show modal initially if creating and no NFT already selected.
  const [showModal, setShowModal] = useState<boolean>(isCreating && !selected)

  return (
    <>
      <div className="flex flex-col gap-2">
        {nftInfo.loading ? (
          <Loader size={24} />
        ) : !nftInfo.errored && nftInfo.data ? (
          <HorizontalNftCard {...nftInfo.data} />
        ) : (
          // If errored loading NFT and not creating, token likely burned.
          nftInfo.errored &&
          !isCreating && (
            <p className="primary-text">{t('info.tokenBurned', { tokenId })}</p>
          )
        )}

        {isCreating && (
          <Button
            className={clsx(
              'text-text-tertiary',
              !nftInfo.loading && !nftInfo.errored && nftInfo.data
                ? 'self-end'
                : 'self-start'
            )}
            onClick={() => setShowModal(true)}
            variant="secondary"
          >
            {t('button.selectNft')}
          </Button>
        )}

        <InputErrorMessage error={errors?.collection} />
      </div>

      {isCreating && (
        <NftSelectionModal
          action={{
            loading: false,
            label: t('button.save'),
            onClick: () => setShowModal(false),
          }}
          getIdForNft={getIdForNft}
          header={{
            title: t('title.selectNftToBurn'),
          }}
          nfts={options}
          onClose={() => setShowModal(false)}
          onNftClick={(nft) => {
            if (getIdForNft(nft) === selected) {
              // No need to clear chain when deselecting.
              setValue((fieldNamePrefix + 'tokenId') as 'tokenId', '')
              setValue((fieldNamePrefix + 'collection') as 'collection', '')
            } else {
              setValue((fieldNamePrefix + 'chainId') as 'chainId', nft.chainId)
              setValue((fieldNamePrefix + 'tokenId') as 'tokenId', nft.tokenId)
              setValue(
                (fieldNamePrefix + 'collection') as 'collection',
                nft.collection.address
              )
            }
          }}
          selectedIds={selected ? [selected] : []}
          visible={showModal}
        />
      )}
    </>
  )
}
