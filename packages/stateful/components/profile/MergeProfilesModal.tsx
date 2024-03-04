import { Add } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useRecoilState } from 'recoil'

import { mergeProfilesVisibleAtom } from '@dao-dao/state'
import {
  Button,
  ChainProvider,
  Modal,
  ProfileImage,
  ProfileNameDisplayAndEditor,
  RadioInputNoForm,
} from '@dao-dao/stateless'
import { processError } from '@dao-dao/utils'

import { useManageProfile, useWallet } from '../../hooks'
import { useRefreshProfile } from '../../hooks/useRefreshProfile'

export const MergeProfilesModal = () => {
  const { t } = useTranslation()
  const {
    chain: { chain_id: walletChainId },
    address = '',
  } = useWallet()
  const { profile, otherProfiles } = useManageProfile()

  const [visible, setVisible] = useRecoilState(mergeProfilesVisibleAtom)

  const currentProfileEmpty =
    !profile.loading &&
    (profile.data.nonce === 0 || (!profile.data.name && !profile.data.nft))
  const addingToOneProfile = currentProfileEmpty && otherProfiles.length === 1

  const profiles = [
    // Don't allow choosing the current profile if it's unused. This modal can
    // only be shown if other profiles exist, so it's safe to ignore the current
    // one here.
    ...(currentProfileEmpty || profile.loading
      ? []
      : [
          {
            chainId: walletChainId,
            address,
            profile: profile.data,
          },
        ]),
    ...otherProfiles,
  ].sort((a, b) => {
    // Prioritize those with a name set, and then an NFT.
    if (a.profile.name && !b.profile.name) {
      return -1
    } else if (!a.profile.name && b.profile.name) {
      return 1
    } else if (a.profile.nft && !b.profile.nft) {
      return -1
    } else if (!a.profile.nft && b.profile.nft) {
      return 1
    }

    // Sort by nonce as a heuristic for which is most used if both have a
    // name/NFT or both don't.
    return b.profile.nonce - a.profile.nonce
  })

  const [selectedProfileChainId, setSelectedProfileChainId] = useState<
    string | undefined
  >()
  // Reset selection back to the first one when modal becomes visible.
  useEffect(() => {
    if (visible) {
      setSelectedProfileChainId(profiles[0]?.chainId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  if (profile.loading || !address) {
    return null
  }

  return (
    <Modal
      header={{
        title: addingToOneProfile
          ? t('title.addToProfile')
          : t('title.mergeProfiles'),
        subtitle: addingToOneProfile
          ? t('info.addToProfileExplanation')
          : t('info.mergeProfilesExplanation'),
      }}
      onClose={() => setVisible(false)}
      visible={visible}
    >
      <RadioInputNoForm<string>
        className="!flex-col !gap-1"
        onChange={(chainId) => setSelectedProfileChainId(chainId)}
        options={profiles.map((profile) => ({
          value: profile.chainId,
          display: (
            <div className="flex min-w-0 flex-row items-center gap-2">
              <ProfileImage imageUrl={profile.profile.imageUrl} size="xs" />
              <ProfileNameDisplayAndEditor
                profile={{ loading: false, data: profile.profile }}
              />
            </div>
          ),
        }))}
        selected={selectedProfileChainId}
      />

      <ChainProvider chainId={selectedProfileChainId || walletChainId}>
        {/* Re-render on chain change to clear profile cache so the button loads the relevant wallet for the chosen profile immediately. */}
        <PerformMerge
          key={selectedProfileChainId || '_empty'}
          addingToOneProfile={addingToOneProfile}
          onClose={() => setVisible(false)}
        />
      </ChainProvider>
    </Modal>
  )
}

type PerformMergeProps = {
  addingToOneProfile: boolean
  onClose: () => void
}

const PerformMerge = ({ addingToOneProfile, onClose }: PerformMergeProps) => {
  const { t } = useTranslation()

  const { addChains, otherProfiles } = useManageProfile()
  const refreshProfiles = useRefreshProfile(
    otherProfiles.map(({ address }) => address),
    {
      loading: false,
      data: otherProfiles.map(({ profile }) => profile),
    }
  )

  const chainsToAdd = otherProfiles.map(({ chainId }) => chainId)

  return (
    <Button
      center
      className="mt-4"
      loading={
        !addChains.ready ||
        addChains.status !== 'idle' ||
        chainsToAdd.length === 0
      }
      onClick={async () => {
        try {
          await addChains.go(chainsToAdd)

          // Refresh other profiles that got merged.
          refreshProfiles()

          // Show success toast.
          toast.success(t('success.mergedProfiles'))

          // Close modal.
          onClose()
        } catch (err) {
          console.error(err)
          toast.error(processError(err))
        }
      }}
      size="lg"
      variant="brand"
    >
      {addingToOneProfile ? (
        <>
          <Add className="!h-5 !w-5" />
          {t('button.addToProfile')}
        </>
      ) : (
        t('button.mergeProfiles')
      )}
    </Button>
  )
}
