import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  Button,
  FireEmoji,
  HorizontalNftCard,
  InputErrorMessage,
  Loader,
  NftSelectionModal,
} from '@dao-dao/stateless'
import { ActionComponent, NftCardInfo } from '@dao-dao/types'

import { ActionCard } from '../ActionCard'
import { BurnNftOptions } from './types'

export const BurnNft: ActionComponent<BurnNftOptions> = ({
  fieldNamePrefix,
  onRemove,
  isCreating,
  errors,
  options: { options, nftInfo },
}) => {
  const { t } = useTranslation()
  const { watch, setValue, setError, clearErrors } = useFormContext()

  const tokenId = watch(fieldNamePrefix + 'tokenId')
  const collection = watch(fieldNamePrefix + 'collection')

  const selected = `${collection}${tokenId}`
  const getIdForNft = (nft: NftCardInfo) =>
    `${nft.collection.address}${nft.tokenId}`

  useEffect(() => {
    if (
      !selected ||
      // If selected, make sure it exists in options.
      (!options.loading &&
        !options.errored &&
        !options.data.some((nft) => getIdForNft(nft) === selected))
    ) {
      setError(fieldNamePrefix + 'collection', {
        type: 'required',
        message: t('error.noNftSelected'),
      })
    } else {
      clearErrors(fieldNamePrefix + 'collection')
    }
  }, [selected, setError, clearErrors, t, fieldNamePrefix, options])

  // Show modal initially if creating and no NFT already selected.
  const [showModal, setShowModal] = useState<boolean>(isCreating && !selected)

  return (
    <ActionCard Icon={FireEmoji} onRemove={onRemove} title={t('title.burnNft')}>
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

      <NftSelectionModal
        actionLabel={t('button.save')}
        actionLoading={false}
        getIdForNft={getIdForNft}
        header={{
          title: t('title.selectNftToBurn'),
        }}
        nfts={options}
        onAction={() => setShowModal(false)}
        onClose={() => setShowModal(false)}
        onNftClick={(nft) => {
          if (getIdForNft(nft) === selected) {
            setValue(fieldNamePrefix + 'tokenId', '')
            setValue(fieldNamePrefix + 'collection', '')
          } else {
            setValue(fieldNamePrefix + 'tokenId', nft.tokenId)
            setValue(fieldNamePrefix + 'collection', nft.collection.address)
          }
        }}
        selectedIds={selected ? [selected] : []}
        visible={showModal}
      />
    </ActionCard>
  )
}
