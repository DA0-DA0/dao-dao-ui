import { useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { useDao } from '@dao-dao/stateless'

import {
  ConnectWallet,
  EntityDisplay,
  Trans,
} from '../../../../../../../../components'
import { useEntity, useWallet } from '../../../../../../../../hooks'
import { usePostRequest } from '../../../../hooks/usePostRequest'
import { ContributionFormData } from '../../../../types'
import { prepareContributionFormData } from '../../../../utils'
import { Submit as StatelessSubmit } from '../../../stateless/pages/ViewSurvey/Submit'
import { ViewSurveyPageProps } from './types'

export const Submit = ({
  status,
  refreshRef,
  connected,
}: ViewSurveyPageProps) => {
  const { t } = useTranslation()
  const dao = useDao()
  const { address: walletAddress = '' } = useWallet()
  const { entity: walletEntity } = useEntity(walletAddress)
  const postRequest = usePostRequest()

  const [loading, setLoading] = useState(false)
  const onSubmit = async (data: ContributionFormData) => {
    setLoading(true)

    try {
      await postRequest(
        `/${dao.coreAddress}/${status.survey.uuid}/contribution`,
        prepareContributionFormData(data)
      )

      toast.success(t('success.contributionSubmitted'))

      // Reload on success.
      await refreshRef.current()
    } catch (err) {
      console.error(err)
      toast.error(err instanceof Error ? err.message : JSON.stringify(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <StatelessSubmit
      ConnectWallet={ConnectWallet}
      EntityDisplay={() => (
        <EntityDisplay address={walletAddress} loadingEntity={walletEntity} />
      )}
      Trans={Trans}
      connected={connected}
      loading={loading}
      loadingEntity={walletEntity}
      onSubmit={onSubmit}
      status={status}
    />
  )
}
