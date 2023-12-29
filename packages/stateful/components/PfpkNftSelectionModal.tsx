import { Image } from '@mui/icons-material'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useRecoilState, useRecoilValue } from 'recoil'

import {
  nftCardInfosForKeyAtom,
  updateProfileNftVisibleAtom,
} from '@dao-dao/state/recoil'
import {
  ImageSelectorModal,
  ModalLoader,
  ModalProps,
  NoContent,
  ProfileImage,
  Tooltip,
  useCachedLoadingWithError,
} from '@dao-dao/stateless'
import { ChainId } from '@dao-dao/types'
import {
  InstantiateMsg,
  MintMsgForNullable_Empty,
} from '@dao-dao/types/contracts/Cw721Base'
import {
  MAINNET,
  getDisplayNameForChainId,
  getNftKey,
  getSupportedChainConfig,
  processError,
  uploadNft,
} from '@dao-dao/utils'

import { useInstantiateAndExecute, useWallet, useWalletInfo } from '../hooks'
import { allWalletNftsSelector } from '../recoil'
import { NftSelectionModal } from './nft'
import { SuspenseLoader } from './SuspenseLoader'
import { Trans } from './Trans'

export type PfpkNftSelectionModalProps = Pick<
  Required<ModalProps>,
  'onClose' | 'visible'
>

export const InnerPfpkNftSelectionModal = ({
  onClose,
  visible,
}: PfpkNftSelectionModalProps) => {
  const { t } = useTranslation()
  const {
    address: walletAddress,
    isWalletError,
    message: walletErrorMessage,
    chain,
  } = useWallet({
    attemptConnection: visible,
  })

  const nfts = useCachedLoadingWithError(
    // Don't load NFTs until visible.
    walletAddress && visible
      ? allWalletNftsSelector({
          walletAddress,
        })
      : undefined
  )

  const {
    walletProfileData,
    updateProfileNft,
    updatingProfile,
    backupImageUrl,
    refreshBalances,
  } = useWalletInfo()
  // Initialize to selected NFT.
  const [selectedKey, setSelectedKey] = useState<string | undefined>(
    !walletProfileData.loading && walletProfileData.profile.nft
      ? getNftKey(
          walletProfileData.profile.nft.chainId,
          walletProfileData.profile.nft.collectionAddress,
          walletProfileData.profile.nft.tokenId
        )
      : undefined
  )
  const selectedNft =
    !nfts.loading && !nfts.errored && selectedKey
      ? nfts.data.find((nft) => selectedKey === nft.key)
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
      setSelectedKey(
        getNftKey(
          walletProfileData.profile.nft.chainId,
          walletProfileData.profile.nft.collectionAddress,
          walletProfileData.profile.nft.tokenId
        )
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
    if (selectedKey && !selectedNft) {
      toast.error(t('error.noNftsSelected'))
      return
    }

    try {
      // Update NFT only.
      await updateProfileNft(
        selectedNft
          ? {
              chainId: selectedNft.chainId,
              collectionAddress: selectedNft.collectionAddress,
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
  }, [nfts, selectedKey, selectedNft, t, updateProfileNft, onClose])

  const [showImageSelector, setShowImageSelector] = useState(false)
  const { register, setValue, watch } = useForm<{ image: string }>()
  const image = watch('image')

  const [uploadingImage, setUploadingImage] = useState(false)

  // Upload profile photos to Juno mainnet.
  const junoWallet = useWallet({
    chainId: ChainId.JunoMainnet,
    // Attempt connection to Juno when image selector is visible.
    attemptConnection: showImageSelector,
  })
  const { ready: instantiateAndExecuteReady, instantiateAndExecute } =
    useInstantiateAndExecute(
      junoWallet.chain.chain_id,
      getSupportedChainConfig(junoWallet.chain.chain_id)?.codeIds.Cw721Base ||
        -1
    )

  const uploadImage = useCallback(async () => {
    setUploadingImage(true)
    try {
      if (!junoWallet.isWalletConnected) {
        await junoWallet.connect()
        return
      }

      if (!instantiateAndExecuteReady) {
        toast.error(t('error.loadingData'))
        return
      }

      if (!image) {
        toast.error(t('error.noImageSelected'))
        return
      }

      const { cid, metadataUrl } = await uploadNft(
        'DAO DAO Profile Picture',
        '',
        undefined,
        // Use image URL directly instead of uploading a file.
        JSON.stringify({
          image,
        })
      )

      // Instantiate and execute cw721 mint.
      const { contractAddress } = await instantiateAndExecute({
        instantiate: {
          admin: walletAddress,
          funds: [],
          label: 'DAO DAO Profile Picture',
          msg: {
            minter: walletAddress,
            name: 'DAO DAO Profile Picture',
            symbol: 'PIC',
          } as InstantiateMsg,
        },
        executes: [
          {
            funds: [],
            msg: {
              mint: {
                owner: walletAddress,
                token_id: cid,
                token_uri: metadataUrl,
              } as MintMsgForNullable_Empty,
            },
          },
        ],
      })

      // On success, hide image selector, select new collection and token ID,
      // and refresh NFT list.
      setShowImageSelector(false)
      setSelectedKey(getNftKey(chain.chain_id, contractAddress, cid))
      refreshBalances()
    } catch (err) {
      console.error(err)
      toast.error(
        processError(err, {
          forceCapture: false,
        })
      )
    } finally {
      setUploadingImage(false)
    }
  }, [
    chain.chain_id,
    image,
    instantiateAndExecute,
    instantiateAndExecuteReady,
    junoWallet,
    refreshBalances,
    t,
    walletAddress,
  ])

  const nftCardInfosForKey = useRecoilValue(nftCardInfosForKeyAtom)

  return (
    <>
      <NftSelectionModal
        action={{
          loading: updatingProfile,
          label: t('button.save'),
          onClick: onAction,
        }}
        allowSelectingNone
        header={{
          title: t('title.chooseProfilePicture'),
          subtitle: t('info.chooseProfilePictureSubtitle'),
        }}
        nfts={
          isWalletError && walletErrorMessage
            ? {
                loading: false,
                errored: true,
                error: new Error(walletErrorMessage),
              }
            : nfts
        }
        noneDisplay={
          MAINNET ? (
            <NoContent
              Icon={Image}
              body={t('info.nothingHereYet')}
              buttonLabel={t('button.uploadImage')}
              className="grow justify-center"
              onClick={() => setShowImageSelector(true)}
            />
          ) : undefined
        }
        onClose={onClose}
        onNftClick={(nft) =>
          setSelectedKey(selectedKey === nft.key ? undefined : nft.key)
        }
        secondaryAction={
          // Only mainnet NFTs are supported in PFPK. No testnets.
          MAINNET
            ? {
                label: t('button.uploadImage'),
                onClick: () => setShowImageSelector(true),
              }
            : undefined
        }
        selectedDisplay={
          <Tooltip title={t('title.preview')}>
            <div>
              <ProfileImage
                imageUrl={
                  !nfts.loading
                    ? selectedNft
                      ? nftCardInfosForKey[selectedNft.key]?.imageUrl
                      : backupImageUrl
                    : undefined
                }
                loading={
                  nfts.loading ||
                  // If selected NFT but info not yet loaded, we're loading.
                  (selectedNft &&
                    !nftCardInfosForKey[selectedNft.key]?.imageUrl)
                }
                size="sm"
              />
            </div>
          </Tooltip>
        }
        selectedKeys={selectedKey ? [selectedKey] : []}
        visible={visible}
      />

      {/* Only mainnet NFTs are supported in PFPK. No testnets. */}
      {MAINNET && (
        <ImageSelectorModal
          Trans={Trans}
          buttonLabel={
            junoWallet.isWalletConnected
              ? t('button.save')
              : t('button.connectToChain', {
                  chainName: getDisplayNameForChainId(
                    junoWallet.chain.chain_id
                  ),
                })
          }
          fieldName="image"
          imageClassName="!rounded-2xl"
          loading={uploadingImage}
          onCloseOrDone={(done) =>
            done ? uploadImage() : setShowImageSelector(false)
          }
          register={register}
          setValue={setValue}
          visible={showImageSelector}
          watch={watch}
        />
      )}
    </>
  )
}

export const PfpkNftSelectionModal = () => {
  const [updateProfileNftVisible, setUpdateProfileNftVisible] = useRecoilState(
    updateProfileNftVisibleAtom
  )
  const onClose = () => setUpdateProfileNftVisible(false)

  return (
    <SuspenseLoader fallback={<ModalLoader onClose={onClose} />}>
      <InnerPfpkNftSelectionModal
        onClose={onClose}
        visible={updateProfileNftVisible}
      />
    </SuspenseLoader>
  )
}
