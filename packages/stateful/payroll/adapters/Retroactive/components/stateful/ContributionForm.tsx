import { useWallet } from '@noahsaso/cosmodal'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'

import {
  Loader,
  ProfileDisplay,
  useCachedLoadable,
  useDaoInfoContext,
} from '@dao-dao/stateless'

import { SuspenseLoader } from '../../../../../components'
import { useWalletProfile } from '../../../../../hooks'
import { refreshStatusAtom } from '../../atoms'
import { usePostRequest } from '../../hooks/usePostRequest'
import { statusSelector } from '../../selectors'
import { ContributionForm as StatelessContributionForm } from '../stateless/ContributionForm'

export const ContributionForm = () => {
  const { t } = useTranslation()
  const { coreAddress, chainId } = useDaoInfoContext()
  const { address: walletAddress = '', publicKey: walletPublicKey } =
    useWallet(chainId)
  const { walletProfile } = useWalletProfile(chainId)

  const postRequest = usePostRequest()

  const statusLoadable = useCachedLoadable(
    statusSelector({
      daoAddress: coreAddress,
      walletPublicKey: walletPublicKey?.hex ?? '',
    })
  )
  const setRefreshStatus = useSetRecoilState(
    refreshStatusAtom({
      daoAddress: coreAddress,
      walletPublicKey: walletPublicKey?.hex ?? '',
    })
  )

  const [loading, setLoading] = useState(false)
  const onSubmit = useCallback(
    async (contribution: string) => {
      setLoading(true)

      try {
        await postRequest(`/${coreAddress}/contribution`, { contribution })
        toast.success(t('success.contributionSubmitted'))
        // Reload status on success.
        setRefreshStatus((id) => id + 1)
      } catch (err) {
        console.error(err)
        toast.error(err instanceof Error ? err.message : JSON.stringify(err))
      } finally {
        setLoading(false)
      }
    },
    [coreAddress, postRequest, setRefreshStatus, t]
  )

  return (
    <SuspenseLoader
      fallback={<Loader />}
      forceFallback={
        statusLoadable.state === 'loading' || walletProfile.loading
      }
    >
      {statusLoadable.state === 'hasValue' &&
        !!statusLoadable.contents &&
        !walletProfile.loading && (
          <StatelessContributionForm
            ProfileDisplay={() => (
              <ProfileDisplay
                address={walletAddress}
                hexPublicKey={walletPublicKey?.hex}
                loadingProfile={walletProfile}
              />
            )}
            loading={loading || statusLoadable.updating}
            onSubmit={onSubmit}
            status={statusLoadable.contents}
            walletProfile={walletProfile.data}
          />
        )}
    </SuspenseLoader>
  )
}
