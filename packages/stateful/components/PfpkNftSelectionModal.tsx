import { WalletConnectionStatus, useWallet } from '@noahsaso/cosmodal'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import {
  ModalLoader,
  ModalProps,
  NftSelectionModal,
  ProfileImage,
  useCachedLoadingWithError,
} from '@dao-dao/stateless'
import { NftCardInfo } from '@dao-dao/types'
import { processError } from '@dao-dao/utils'

import { useWalletInfo } from '../hooks'
import { walletNativeAndStargazeNftsSelector } from '../recoil'
import { SuspenseLoader } from './SuspenseLoader'

export type PfpkNftSelectionModalProps = Pick<Required<ModalProps>, 'onClose'>

export const InnerPfpkNftSelectionModal = ({
  onClose,
}: PfpkNftSelectionModalProps) => {
  const { t } = useTranslation()
  const {
    address: walletAddress,
    status: walletStatus,
    error: walletError,
  } = useWallet()

  const getIdForNft = (nft: NftCardInfo) =>
    `${nft.collection.address}:${nft.tokenId}`

  const nfts = useCachedLoadingWithError(
    walletAddress
      ? walletNativeAndStargazeNftsSelector(walletAddress)
      : undefined
  )

  const {
    walletProfileData,
    updateProfileNft,
    updatingProfile,
    backupImageUrl,
  } = useWalletInfo()
  // Initialize to selected NFT.
  const [selected, setSelected] = useState<string | undefined>(
    !walletProfileData.loading && walletProfileData.profile.nft
      ? `${walletProfileData.profile.nft.collectionAddress}:${walletProfileData.profile.nft.tokenId}`
      : undefined
  )
  const selectedNft =
    !nfts.loading && !nfts.errored && selected
      ? nfts.data.find((nft) => selected === getIdForNft(nft))
      : undefined
  // If nonce changes, set selected NFT.
  const [lastNonce, setLastNonce] = useState(
    walletProfileData.loading ? 0 : walletProfileData.profile.nonce
  )
  useEffect(() => {
    if (
      !walletProfileData.loading &&
      walletProfileData.profile.nft &&
      walletProfileData.profile.nonce > lastNonce
    ) {
      setSelected(
        `${walletProfileData.profile.nft.collectionAddress}:${walletProfileData.profile.nft.tokenId}`
      )
      setLastNonce(walletProfileData.profile.nonce)
    }
  }, [lastNonce, walletProfileData])

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
              chainId: selectedNft.chainId,
              collectionAddress: selectedNft.collection.address,
              tokenId: selectedNft.tokenId,
            }
          : // Clear NFT if nothing selected.
            null
      )
      // Close on successful update.
      onClose()
    } catch (err) {
      console.error(err)
      toast.error(
        processError(err, {
          forceCapture: false,
        })
      )
    }
  }, [nfts, selected, selectedNft, t, updateProfileNft, onClose])

  return (
    <NftSelectionModal
      actionLabel={t('button.save')}
      actionLoading={updatingProfile}
      allowSelectingNone
      getIdForNft={getIdForNft}
      header={{
        title: t('title.chooseNftProfilePicture'),
        subtitle: t('info.chooseNftProfilePictureSubtitle'),
      }}
      nfts={
        walletStatus === WalletConnectionStatus.Errored
          ? { loading: false, errored: true, error: walletError }
          : nfts
      }
      onAction={onAction}
      onClose={onClose}
      onNftClick={(nft) =>
        setSelected(
          selected === getIdForNft(nft) ? undefined : getIdForNft(nft)
        )
      }
      selectedDisplay={
        <ProfileImage
          imageUrl={
            !nfts.loading
              ? selectedNft
                ? selectedNft.imageUrl
                : backupImageUrl
              : undefined
          }
          loading={nfts.loading}
          size="sm"
        />
      }
      selectedIds={selected ? [selected] : []}
      visible
    />
  )
}

export const PfpkNftSelectionModal = (props: PfpkNftSelectionModalProps) => (
  <SuspenseLoader fallback={<ModalLoader {...props} />}>
    <InnerPfpkNftSelectionModal {...props} />
  </SuspenseLoader>
)
