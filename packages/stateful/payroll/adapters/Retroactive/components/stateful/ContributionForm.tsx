import { useWallet } from '@noahsaso/cosmodal'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'

import {
  EntityDisplay,
  Loader,
  useCachedLoadable,
  useDaoInfo,
} from '@dao-dao/stateless'

import { SuspenseLoader } from '../../../../../components'
import { useEntity } from '../../../../../hooks'
import { refreshStatusAtom } from '../../atoms'
import { usePostRequest } from '../../hooks/usePostRequest'
import { statusSelector } from '../../selectors'
import { ContributionForm as StatelessContributionForm } from '../stateless/ContributionForm'

export const ContributionForm = () => {
  const { t } = useTranslation()
  const { coreAddress, chainId } = useDaoInfo()
  const { address: walletAddress = '', publicKey: walletPublicKey } =
    useWallet(chainId)
  const walletEntity = useEntity({
    address: walletAddress,
    walletHexPublicKey: walletPublicKey?.hex,
    chainId,
  })

  const postRequest = usePostRequest()

  const statusLoadable = useCachedLoadable(
    walletPublicKey?.hex
      ? statusSelector({
          daoAddress: coreAddress,
          walletPublicKey: walletPublicKey.hex,
        })
      : undefined
  )
  const setRefreshStatus = useSetRecoilState(
    refreshStatusAtom({
      daoAddress: coreAddress,
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
      forceFallback={statusLoadable.state === 'loading' || walletEntity.loading}
    >
      {statusLoadable.state === 'hasValue' &&
        !!statusLoadable.contents &&
        !walletEntity.loading && (
          <StatelessContributionForm
            EntityDisplay={() => (
              <EntityDisplay
                address={walletAddress}
                loadingEntity={walletEntity}
              />
            )}
            entity={walletEntity.data}
            loading={loading || statusLoadable.updating}
            onSubmit={onSubmit}
            status={statusLoadable.contents}
          />
        )}
    </SuspenseLoader>
  )
}
