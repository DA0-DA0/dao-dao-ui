import { useTranslation } from 'react-i18next'

import { getSupportedChains } from '@dao-dao/utils'

import { useProfile } from '../../hooks'
import { WalletDaos } from '../wallet'
import { ProfileAddChains } from './ProfileAddChains'

export const ProfileDaos = () => {
  const { t } = useTranslation()

  const { chains } = useProfile({
    onlySupported: true,
  })

  const missingChains =
    !chains.loading && chains.data.length < getSupportedChains().length

  return (
    <>
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
          className="mt-4"
          onlySupported
          prompt={t('info.supportedChainDaosNotShowingUpPrompt')}
        />
      )}
    </>
  )
}
