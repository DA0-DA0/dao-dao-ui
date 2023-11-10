import clsx from 'clsx'
import { ComponentType, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  Button,
  HorizontalNftCard,
  InputErrorMessage,
  Loader,
} from '@dao-dao/stateless'
import {
  ActionComponent,
  LazyNftCardInfo,
  LoadingDataWithError,
  NftCardInfo,
  NftSelectionModalProps,
} from '@dao-dao/types'
import { getNftKey } from '@dao-dao/utils'

export type BurnNftData = {
  chainId: string
  collection: string
  tokenId: string
}

export interface BurnNftOptions {
  // The set of NFTs that may be burned as part of this action.
  options: LoadingDataWithError<LazyNftCardInfo[]>
  // Information about the NFT currently selected. If errored, it may be burnt.
  nftInfo: LoadingDataWithError<NftCardInfo | undefined>
  NftSelectionModal: ComponentType<NftSelectionModalProps>
}

export const BurnNft: ActionComponent<BurnNftOptions> = ({
  fieldNamePrefix,
  isCreating,
  errors,
  options: { options, nftInfo, NftSelectionModal },
}) => {
  const { t } = useTranslation()
  const { watch, setValue, setError, clearErrors } =
    useFormContext<BurnNftData>()

  const chainId = watch((fieldNamePrefix + 'chainId') as 'chainId')
  const tokenId = watch((fieldNamePrefix + 'tokenId') as 'tokenId')
  const collection = watch((fieldNamePrefix + 'collection') as 'collection')

  const selectedKey = getNftKey(chainId, collection, tokenId)

  useEffect(() => {
    if (
      !selectedKey ||
      // If selected, make sure it exists in options.
      (!options.loading &&
        !options.errored &&
        !options.data.some((nft) => nft.key === selectedKey))
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
    selectedKey,
    setError,
    clearErrors,
    t,
    fieldNamePrefix,
    options,
    errors?.collection,
  ])

  // Show modal initially if creating and no NFT already selected.
  const [showModal, setShowModal] = useState<boolean>(
    isCreating && !selectedKey
  )

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
          header={{
            title: t('title.selectNftToBurn'),
          }}
          nfts={options}
          onClose={() => setShowModal(false)}
          onNftClick={(nft) => {
            if (nft.key === selectedKey) {
              setValue((fieldNamePrefix + 'chainId') as 'chainId', '')
              setValue((fieldNamePrefix + 'tokenId') as 'tokenId', '')
              setValue((fieldNamePrefix + 'collection') as 'collection', '')
            } else {
              setValue((fieldNamePrefix + 'chainId') as 'chainId', nft.chainId)
              setValue((fieldNamePrefix + 'tokenId') as 'tokenId', nft.tokenId)
              setValue(
                (fieldNamePrefix + 'collection') as 'collection',
                nft.collectionAddress
              )
            }
          }}
          selectedKeys={selectedKey ? [selectedKey] : []}
          visible={showModal}
        />
      )}
    </>
  )
}
