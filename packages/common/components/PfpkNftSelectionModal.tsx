import { useWallet } from '@noahsaso/cosmodal'
import { ComponentType, useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import {
  useCachedLoadable,
  useWalletProfile,
  walletStargazeNftCardInfosSelector,
} from '@dao-dao/state'
import { NftCardInfo } from '@dao-dao/tstypes'
import {
  Loader as DefaultLoader,
  LoaderProps,
  Modal,
  ModalProps,
  NftSelectionModal,
  ProfileImage,
} from '@dao-dao/ui'
import {
  STARGAZE_CHAIN_ID,
  loadableToLoadingData,
  processError,
} from '@dao-dao/utils'

import { SuspenseLoader } from './SuspenseLoader'

export interface PfpkNftSelectionModalProps
  extends Pick<ModalProps, 'onClose'> {
  Loader?: ComponentType<LoaderProps>
}

export const InnerPfpkNftSelectionModal = ({
  onClose,
  Loader = DefaultLoader,
}: PfpkNftSelectionModalProps) => {
  const { t } = useTranslation()
  const { address: stargazeWalletAddress } = useWallet(STARGAZE_CHAIN_ID)
  const getIdForNft = (nft: NftCardInfo) =>
    `${nft.collection.address}:${nft.tokenId}`

  const nfts = loadableToLoadingData(
    useCachedLoadable(
      stargazeWalletAddress
        ? walletStargazeNftCardInfosSelector(stargazeWalletAddress)
        : undefined
    ),
    []
  )

  const {
    walletProfile,
    updateProfileNft,
    updatingProfile,
    backupProfileImage,
  } = useWalletProfile()
  // Initialize to selected NFT.
  const [selected, setSelected] = useState<string | undefined>(
    !walletProfile.loading && walletProfile.data.nft
      ? `${walletProfile.data.nft.collectionAddress}:${walletProfile.data.nft.tokenId}`
      : undefined
  )
  const selectedNft =
    !nfts.loading && selected
      ? nfts.data.find((nft) => selected === getIdForNft(nft))
      : undefined
  // If nonce changes, set selected NFT.
  const [lastNonce, setLastNonce] = useState(
    walletProfile.loading ? 0 : walletProfile.data.nonce
  )
  useEffect(() => {
    if (
      !walletProfile.loading &&
      walletProfile.data.nft &&
      walletProfile.data.nonce > lastNonce
    ) {
      setSelected(
        `${walletProfile.data.nft.collectionAddress}:${walletProfile.data.nft.tokenId}`
      )
      setLastNonce(walletProfile.data.nonce)
    }
  }, [walletProfile, lastNonce])

  const onAction = useCallback(async () => {
    if (nfts.loading) {
      toast.error(t('error.noNftsSelected'))
      return
    }

    // Only give error about no NFTs if something should be selected. This
    // should never happen...
    if (selected && !selectedNft) {
      toast.error(t('error.noNftsSelected'))
      return
    }

    try {
      // Update NFT only.
      await updateProfileNft(
        selectedNft
          ? {
              tokenId: selectedNft.tokenId,
              collectionAddress: selectedNft.collection.address,
            }
          : // Clear NFT if nothing selected.
            null
      )
      // Close on successful update.
      onClose()
    } catch (err) {
      console.error(err)
      toast.error(processError(err))
    }
  }, [nfts, selected, selectedNft, t, updateProfileNft, onClose])

  return (
    <NftSelectionModal
      Loader={Loader}
      actionLabel={t('button.save')}
      actionLoading={updatingProfile}
      allowSelectingNone
      getIdForNft={getIdForNft}
      header={{
        title: t('title.chooseNftProfilePicture'),
        subtitle: t('info.chooseNftProfilePictureSubtitle'),
      }}
      nfts={nfts}
      onAction={onAction}
      onClose={onClose}
      onNftClick={(nft) =>
        setSelected(
          selected === getIdForNft(nft) ? undefined : getIdForNft(nft)
        )
      }
      selectedDisplay={
        <ProfileImage
          imageUrl={selectedNft ? selectedNft.imageUrl : backupProfileImage}
          size="sm"
        />
      }
      selectedIds={selected ? [selected] : []}
    />
  )
}

export const PfpkNftSelectionModal = ({
  onClose,
  Loader = DefaultLoader,
}: PfpkNftSelectionModalProps) => (
  <SuspenseLoader
    fallback={
      <Modal containerClassName="!p-40" onClose={onClose}>
        <Loader />
      </Modal>
    }
  >
    <InnerPfpkNftSelectionModal onClose={onClose} />
  </SuspenseLoader>
)
