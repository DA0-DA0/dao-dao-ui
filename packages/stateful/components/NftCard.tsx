import { AccountCircle, Check, NoAccounts } from '@mui/icons-material'
import { ComponentProps } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { NftCardProps, NftCard as StatelessNftCard } from '@dao-dao/stateless'
import { ButtonPopupSection } from '@dao-dao/types'
import { processError } from '@dao-dao/utils'

import { useWalletInfo } from '../hooks'
import { ButtonLink } from './ButtonLink'
import { EntityDisplay } from './EntityDisplay'

export const NftCard = (props: Omit<NftCardProps, 'EntityDisplay'>) => (
  <StatelessNftCard {...props} EntityDisplay={EntityDisplay} />
)

export const NftCardNoCollection = (props: ComponentProps<typeof NftCard>) => (
  <NftCard hideCollection {...props} />
)

export const StakedNftCard = (props: ComponentProps<typeof NftCard>) => {
  const { t } = useTranslation()
  return <NftCard hideCollection ownerLabel={t('title.staker')} {...props} />
}

export const WalletNftCard = (props: ComponentProps<typeof NftCard>) => {
  const { t } = useTranslation()
  const { walletProfileData, updatingProfile, updateProfileNft } =
    useWalletInfo()

  const setProfilePhoto = async () => {
    try {
      await updateProfileNft({
        chainId: props.chainId,
        collectionAddress: props.collection.address,
        tokenId: props.tokenId,
      })
    } catch (err) {
      console.error(err)
      toast.error(err instanceof Error ? err.message : processError(err))
    }
  }
  const unsetProfilePhoto = async () => {
    try {
      await updateProfileNft(null)
    } catch (err) {
      console.error(err)
      toast.error(err instanceof Error ? err.message : processError(err))
    }
  }

  const currentProfilePhoto =
    walletProfileData.profile.nft?.chainId === props.chainId &&
    walletProfileData.profile.nft?.collectionAddress ===
      props.collection.address &&
    walletProfileData.profile.nft?.tokenId === props.tokenId

  // Setup actions for popup. Prefill with cw20 related actions.
  const buttonPopupSections: ButtonPopupSection[] =
    !walletProfileData.loading && walletProfileData.profile.nonce >= 0
      ? [
          {
            label: t('title.profile'),
            buttons: [
              {
                Icon: currentProfilePhoto ? Check : AccountCircle,
                label: t('button.setAsProfilePhoto'),
                loading: updatingProfile,
                disabled: currentProfilePhoto,
                onClick: setProfilePhoto,
              },
              {
                Icon: NoAccounts,
                label: t('button.unsetProfilePhoto'),
                loading: updatingProfile,
                disabled: !walletProfileData.profile.nft,
                onClick: unsetProfilePhoto,
              },
            ],
          },
        ]
      : []

  return (
    <NftCard
      {...props}
      buttonPopup={{
        sections: buttonPopupSections,
        ButtonLink,
      }}
    />
  )
}
