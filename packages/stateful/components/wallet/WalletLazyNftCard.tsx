import {
  AccountCircle,
  Check,
  LocalFireDepartment,
  NoAccounts,
  SendRounded,
} from '@mui/icons-material'
import { ComponentProps } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { useInitializedActionForKey } from '@dao-dao/stateless'
import { ActionKey, ButtonPopupSection } from '@dao-dao/types'
import { getActionBuilderPrefillPath, processError } from '@dao-dao/utils'

import { useManageProfile } from '../../hooks'
import { ButtonLink } from '../ButtonLink'
import { LazyNftCard } from '../nft'

export const WalletLazyNftCard = (
  props: ComponentProps<typeof LazyNftCard>
) => {
  const { t } = useTranslation()
  const {
    profile,
    updateProfile: { updating: updatingProfile, go: updateProfile },
  } = useManageProfile()

  const setProfilePhoto = async () => {
    try {
      await updateProfile({
        nft: {
          chainId: props.chainId,
          collectionAddress: props.collectionAddress,
          tokenId: props.tokenId,
        },
      })
    } catch (err) {
      console.error(err)
      toast.error(
        processError(err, {
          forceCapture: false,
        })
      )
    }
  }
  const unsetProfilePhoto = async () => {
    try {
      await updateProfile({ nft: null })
    } catch (err) {
      console.error(err)
      toast.error(
        processError(err, {
          forceCapture: false,
        })
      )
    }
  }

  const currentProfilePhoto =
    !profile.loading &&
    profile.data.nft?.chainId === props.chainId &&
    profile.data.nft?.collectionAddress === props.collectionAddress &&
    profile.data.nft?.tokenId === props.tokenId

  const transferAction = useInitializedActionForKey(ActionKey.TransferNft)

  // Setup actions for popup. Prefill with cw20 related actions.
  const buttonPopupSections: ButtonPopupSection[] = [
    ...(!profile.loading && profile.data.nonce >= 0
      ? [
          {
            label: t('title.profile'),
            buttons: [
              {
                Icon: currentProfilePhoto ? Check : AccountCircle,
                label: t('button.setAsProfilePhoto'),
                loading: updatingProfile,
                disabled: currentProfilePhoto,
                closeOnClick: false,
                onClick: setProfilePhoto,
              },
              {
                Icon: NoAccounts,
                label: t('button.unsetProfilePhoto'),
                loading: updatingProfile,
                disabled: !profile.data.nft,
                closeOnClick: false,
                onClick: unsetProfilePhoto,
              },
            ],
          },
        ]
      : []),
    ...(!transferAction.loading &&
    !transferAction.errored &&
    // If the NFT is staked, don't show the transfer/burn buttons, since the
    // wallet does not have control.
    !props.staked
      ? [
          {
            label: t('title.transaction'),
            buttons: [
              {
                Icon: SendRounded,
                label: t('button.transfer'),
                closeOnClick: true,
                href: getActionBuilderPrefillPath([
                  {
                    actionKey: transferAction.data.key,
                    data: {
                      ...transferAction.data.defaults,
                      collection: props.collectionAddress,
                      tokenId: props.tokenId,
                      recipient: '',
                    },
                  },
                ]),
              },
              {
                Icon: LocalFireDepartment,
                label: t('button.burn'),
                closeOnClick: true,
                href: getActionBuilderPrefillPath([
                  {
                    actionKey: ActionKey.BurnNft,
                    data: {
                      collection: props.collectionAddress,
                      tokenId: props.tokenId,
                    },
                  },
                ]),
              },
            ],
          },
        ]
      : []),
  ]

  return (
    <LazyNftCard
      {...props}
      buttonPopup={{
        sections: buttonPopupSections,
        ButtonLink,
      }}
    />
  )
}
