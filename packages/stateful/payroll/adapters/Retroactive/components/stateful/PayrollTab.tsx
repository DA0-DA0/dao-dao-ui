import {
  WalletConnectionStatus,
  useWallet,
  useWalletManager,
} from '@noahsaso/cosmodal'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import {
  ConnectWallet,
  Loader,
  useCachedLoadable,
  useDaoInfoContext,
} from '@dao-dao/stateless'
import { loadableToLoadingData } from '@dao-dao/utils'

import { SuspenseLoader } from '../../../../../components'
import { useVotingModule } from '../../../../../hooks/useVotingModule'
import { usePostRequest } from '../../hooks/usePostRequest'
import { listCompletedSurveysSelector, statusSelector } from '../../selectors'
import { CompletedSurvey, LoadedCompletedSurvey } from '../../types'
import { PayrollTab as StatelessPayrollTab } from '../stateless/PayrollTab'
import { ContributionForm } from './ContributionForm'
import { NewSurveyForm } from './NewSurveyForm'
import { ProposalCreationForm } from './ProposalCreationForm'
import { RatingForm } from './RatingForm'

export const PayrollTab = () => {
  const { t } = useTranslation()
  const { chainId } = useDaoInfoContext()
  const { connect } = useWalletManager()
  const { connected, status } = useWallet(chainId)

  // Show loader while connecting instead of blinking the connect wallet button.
  const connecting =
    status === WalletConnectionStatus.Initializing ||
    status === WalletConnectionStatus.AttemptingAutoConnection ||
    status === WalletConnectionStatus.Connecting

  return connecting || connected ? (
    <SuspenseLoader fallback={<Loader />} forceFallback={connecting}>
      <InnerPayrollTab />
    </SuspenseLoader>
  ) : (
    <>
      <p className="title-text mb-6 text-text-body">
        {t('title.retroactiveCompensation')}
      </p>

      <ConnectWallet onConnect={connect} />
    </>
  )
}

export const InnerPayrollTab = () => {
  const { chainId, coreAddress } = useDaoInfoContext()
  const { address: walletPublicKey = '' } = useWallet(chainId)
  const { isMember = false } = useVotingModule(coreAddress, {
    fetchMembership: true,
  })

  const loadingStatus = loadableToLoadingData(
    useCachedLoadable(
      walletPublicKey
        ? statusSelector({
            daoAddress: coreAddress,
            walletPublicKey: walletPublicKey,
          })
        : undefined
    ),
    undefined
  )
  const loadingCompletedSurveys = loadableToLoadingData(
    useCachedLoadable(
      listCompletedSurveysSelector({
        daoAddress: coreAddress,
      })
    ),
    []
  )

  const postRequest = usePostRequest()

  const [loadingCompletedSurvey, setLoadingCompletedSurvey] = useState(false)
  const [loadedCompletedSurvey, setLoadedCompletedSurvey] =
    useState<LoadedCompletedSurvey>()
  const selectCompletedSurvey = useCallback(
    async ({ id }: CompletedSurvey) => {
      setLoadingCompletedSurvey(true)
      try {
        const response = await postRequest(`/${coreAddress}/view/${id}`)
        if (!response.ok) {
          const responseBody = await response.json()
          console.error(
            'Failed to fetch retroactive payroll past survey.',
            response,
            responseBody
          )
          throw new Error(
            responseBody && 'error' in responseBody
              ? responseBody.error
              : JSON.stringify(responseBody)
          )
        }

        const { survey } = await response.json()
        setLoadedCompletedSurvey(survey)
      } catch (err) {
        console.error(err)
        toast.error(err instanceof Error ? err.message : JSON.stringify(err))
      } finally {
        setLoadingCompletedSurvey(false)
      }
    },
    [coreAddress, postRequest]
  )

  return (
    <StatelessPayrollTab
      ContributionForm={ContributionForm}
      NewSurveyForm={NewSurveyForm}
      ProposalCreationForm={ProposalCreationForm}
      RatingForm={RatingForm}
      isMember={isMember}
      loadedCompletedSurvey={loadedCompletedSurvey}
      loadingCompletedSurvey={loadingCompletedSurvey}
      loadingCompletedSurveys={loadingCompletedSurveys}
      loadingStatus={loadingStatus}
      selectCompletedSurvey={selectCompletedSurvey}
    />
  )
}
