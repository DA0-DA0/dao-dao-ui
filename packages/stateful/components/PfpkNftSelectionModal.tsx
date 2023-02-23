import {
  ChainInfoID,
  WalletConnectionStatus,
  useWallet,
} from '@noahsaso/cosmodal'
import { useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import {
  ModalLoader,
  ModalProps,
  NftSelectionModal,
  ProfileImage,
  useCachedLoadable,
} from '@dao-dao/stateless'
import { LoadingDataWithError, NftCardInfo } from '@dao-dao/types'
import { loadableToLoadingDataWithError, processError } from '@dao-dao/utils'

import { useWalletInfo } from '../hooks'
import {
  walletNftCardInfos,
  walletStakedNftCardInfos,
  walletStargazeNftCardInfosSelector,
} from '../recoil/selectors/nft'
import { SuspenseLoader } from './SuspenseLoader'

export type PfpkNftSelectionModalProps = Pick<Required<ModalProps>, 'onClose'>

export const InnerPfpkNftSelectionModal = ({
  onClose,
}: PfpkNftSelectionModalProps) => {
  const { t } = useTranslation()
  const {
    address: junoWalletAddress,
    status: junoConnectionStatus,
    error: junoConnectionError,
  } = useWallet(ChainInfoID.Juno1)
  const {
    address: stargazeWalletAddress,
    status: stargazeConnectionStatus,
    error: stargazeConnectionError,
  } = useWallet(ChainInfoID.Stargaze1)

  const getIdForNft = (nft: NftCardInfo) =>
    `${nft.collection.address}:${nft.tokenId}`

  const junoNfts = loadableToLoadingDataWithError(
    useCachedLoadable(
      junoWalletAddress
        ? walletNftCardInfos({
            walletAddress: junoWalletAddress,
            chainId: ChainInfoID.Juno1,
          })
        : undefined
    )
  )

  const stakedJunoNfts = loadableToLoadingDataWithError(
    useCachedLoadable(
      junoWalletAddress
        ? walletStakedNftCardInfos({
            walletAddress: junoWalletAddress,
            chainId: ChainInfoID.Juno1,
          })
        : undefined
    )
  )

  const stargazeNfts = loadableToLoadingDataWithError(
    useCachedLoadable(
      stargazeWalletAddress
        ? walletStargazeNftCardInfosSelector(stargazeWalletAddress)
        : undefined
    )
  )

  const nfts: LoadingDataWithError<NftCardInfo[]> = useMemo(
    () =>
      stargazeNfts.loading || junoNfts.loading || stakedJunoNfts.loading
        ? {
            loading: true,
            errored: false,
          }
        : {
            loading: false,
            errored: false,
            data: [
              ...(!stargazeNfts.errored ? stargazeNfts.data : []),
              ...(!junoNfts.errored ? junoNfts.data : []),
              ...(!stakedJunoNfts.errored ? stakedJunoNfts.data : []),
            ],
          },
    [junoNfts, stakedJunoNfts, stargazeNfts]
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
      toast.error(err instanceof Error ? err.message : processError(err))
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
        stargazeConnectionStatus === WalletConnectionStatus.Errored
          ? { loading: false, errored: true, error: stargazeConnectionError }
          : junoConnectionStatus === WalletConnectionStatus.Errored
          ? { loading: false, errored: true, error: junoConnectionError }
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
