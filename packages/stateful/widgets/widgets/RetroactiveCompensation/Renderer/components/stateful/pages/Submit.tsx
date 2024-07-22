import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import {
  ErrorPage,
  Loader,
  useDaoContext,
  useDaoNavHelpers,
} from '@dao-dao/stateless'

import {
  ConnectWallet,
  EntityDisplay,
  SuspenseLoader,
  Trans,
} from '../../../../../../../components'
import {
  useEntity,
  useQueryLoadingDataWithError,
  useWallet,
} from '../../../../../../../hooks'
import { usePostRequest } from '../../../hooks/usePostRequest'
import { retroactiveCompensationQueries } from '../../../queries'
import { ContributionFormData } from '../../../types'
import { prepareContributionFormData } from '../../../utils'
import { Submit as StatelessSubmit } from '../../stateless/pages/Submit'

export const Submit = () => {
  const { t } = useTranslation()
  const { dao } = useDaoContext()
  const { daoSubpathComponents } = useDaoNavHelpers()
  const {
    isWalletConnected,
    address: walletAddress = '',
    hexPublicKey,
  } = useWallet({
    loadAccount: true,
  })
  const { entity: walletEntity } = useEntity(walletAddress)
  const postRequest = usePostRequest()

  const surveyId = Number(daoSubpathComponents[2] || '-1')

  const queryClient = useQueryClient()
  const surveyQuery = retroactiveCompensationQueries.activeSurvey({
    daoAddress: dao.coreAddress,
    walletPublicKey: !hexPublicKey.loading ? hexPublicKey.data : '_',
    surveyId,
  })
  const loadingSurvey = useQueryLoadingDataWithError(surveyQuery)

  const [loading, setLoading] = useState(false)
  const onSubmit = async (data: ContributionFormData) => {
    setLoading(true)

    try {
      await postRequest(
        `/${dao.coreAddress}/${surveyId}/contribution`,
        prepareContributionFormData(data)
      )
      toast.success(t('success.contributionSubmitted'))
      // Reload on success.
      await queryClient.refetchQueries({
        queryKey: surveyQuery.queryKey,
      })
    } catch (err) {
      console.error(err)
      toast.error(err instanceof Error ? err.message : JSON.stringify(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <SuspenseLoader fallback={<Loader />} forceFallback={loadingSurvey.loading}>
      {loadingSurvey.loading ? null : loadingSurvey.errored ? (
        <ErrorPage error={loadingSurvey.error} />
      ) : (
        <StatelessSubmit
          ConnectWallet={ConnectWallet}
          EntityDisplay={() => (
            <EntityDisplay
              address={walletAddress}
              loadingEntity={walletEntity}
            />
          )}
          Trans={Trans}
          connected={isWalletConnected}
          loading={loading || !!loadingSurvey.updating}
          loadingEntity={walletEntity}
          onSubmit={onSubmit}
          survey={loadingSurvey.data}
        />
      )}
    </SuspenseLoader>
  )
}
