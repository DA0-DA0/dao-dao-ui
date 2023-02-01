import {
  ChainInfoID,
  WalletConnectionStatus,
  useWallet,
} from '@noahsaso/cosmodal'
import { useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { useGetLoopNftsQuery } from '@dao-dao/state'
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
import { walletStargazeNftCardInfosSelector } from '../recoil/selectors/nft'
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

  const stargazeNfts = loadableToLoadingDataWithError(
    useCachedLoadable(
      stargazeWalletAddress
        ? walletStargazeNftCardInfosSelector(stargazeWalletAddress)
        : undefined
    )
  )

  const loopNftsQuery = useGetLoopNftsQuery({
    walletAddress: junoWalletAddress ?? '',
  })
  const loopNfts =
    loopNftsQuery.data?.nfts.nodes ?? loopNftsQuery.previousData?.nfts.nodes

  const nfts: LoadingDataWithError<NftCardInfo[]> = useMemo(
    () =>
      stargazeNfts.loading || stargazeNfts.errored
        ? stargazeNfts
        : {
            loading: false,
            errored: false,
            data: [
              ...stargazeNfts.data.map((nft) => ({
                ...nft,
                chainId: ChainInfoID.Stargaze1,
              })),
              ...(loopNfts?.map(
                ({ tokenID, image, name, contract }): NftCardInfo => ({
                  chainId: ChainInfoID.Juno1,
                  collection: {
                    address: contract.id,
                    name: contract.name,
                  },
                  tokenId: tokenID,
                  externalLink: {
                    href: `https://nft-juno.loop.markets/nftDetail/${contract.id}/${tokenID}`,
                    name: 'Loop',
                  },
                  imageUrl: image,
                  name: name ?? '',
                })
              ) ?? []),
            ],
          },
    [loopNfts, stargazeNfts]
  )

  const {
    walletProfile,
    updateProfileNft,
    updatingProfile,
    backupProfileImage,
  } = useWalletInfo()
  // Initialize to selected NFT.
  const [selected, setSelected] = useState<string | undefined>(
    !walletProfile.loading && walletProfile.data.nft
      ? `${walletProfile.data.nft.collectionAddress}:${walletProfile.data.nft.tokenId}`
      : undefined
  )
  const selectedNft =
    !nfts.loading && !nfts.errored && selected
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
      fallbackError={t('error.stargazeLoadFailedReopenModal')}
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
                : backupProfileImage
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
