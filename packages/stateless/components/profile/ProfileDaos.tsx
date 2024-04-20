import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import {
  LoadingData,
  ProfileChain,
  StatefulProfileAddChainsProps,
  StatefulWalletDaosProps,
} from '@dao-dao/types'
import { getSupportedChains } from '@dao-dao/utils'

import { FollowingDaos, FollowingDaosProps } from '../dao/FollowingDaos'
import { Feed, FeedProps } from '../Feed'

export type ProfileDaosProps = {
  followingDaosProps: FollowingDaosProps
  feedProps: FeedProps
  chains: LoadingData<ProfileChain[]>
  WalletDaos: ComponentType<StatefulWalletDaosProps>
  ProfileAddChains: ComponentType<StatefulProfileAddChainsProps>
}

export const ProfileDaos = ({
  followingDaosProps,
  feedProps,
  chains,
  WalletDaos,
  ProfileAddChains,
}: ProfileDaosProps) => {
  const { t } = useTranslation()

  const missingChains =
    !chains.loading && chains.data.length < getSupportedChains().length

  return (
    <div className="space-y-8">
      <Feed {...feedProps} />

      <FollowingDaos {...followingDaosProps} />

      <WalletDaos
        chainWallets={
          chains.loading || chains.data.length === 0
            ? { loading: true, errored: false }
            : {
                loading: false,
                errored: false,
                data: chains.data,
              }
        }
      />

      {missingChains && (
        <ProfileAddChains
          className="self-end mt-4"
          onlySupported
          prompt={t('button.addChains')}
          promptTooltip={t('info.supportedChainDaosNotShowingUpPrompt')}
        />
      )}
    </div>
  )
}
