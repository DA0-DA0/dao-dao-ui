import {
  WalletConnectionStatus,
  useWallet,
  useWalletManager,
} from '@noahsaso/cosmodal'
import { saveAs } from 'file-saver'
import { parse as parseJsonToCsv } from 'json2csv'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import {
  ConnectWallet,
  Loader,
  useCachedLoadable,
  useDaoInfoContext,
} from '@dao-dao/stateless'
import {
  loadableToLoadingData,
  secp256k1PublicKeyToBech32Address,
} from '@dao-dao/utils'

import { IconButtonLink, SuspenseLoader } from '../../../../../components'
import { useVotingModule } from '../../../../../hooks/useVotingModule'
import { usePostRequest } from '../../hooks/usePostRequest'
import { listCompletedSurveysSelector, statusSelector } from '../../selectors'
import { CompletedSurvey, CompletedSurveyListing } from '../../types'
import { PayrollTab as StatelessPayrollTab } from '../stateless/PayrollTab'
import { ContributionForm } from './ContributionForm'
import { NewSurveyForm } from './NewSurveyForm'
import { ProposalCreationForm } from './ProposalCreationForm'
import { RatingForm } from './RatingForm'

export const PayrollTab = () => {
  const { t } = useTranslation()
  const { chainId } = useDaoInfoContext()
  const { connect } = useWalletManager()
  const { connected, status, error } = useWallet(chainId)

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

      {error && (
        <pre className="text-text-error mt-4">
          {error instanceof Error ? error.message : JSON.stringify(error)}
        </pre>
      )}
    </>
  )
}

export const InnerPayrollTab = () => {
  const { chainId, coreAddress, bech32Prefix } = useDaoInfoContext()
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

  const [loadingCompletedSurveyId, setLoadingCompletedSurveyId] =
    useState<number>()
  const downloadCompletedSurvey = useCallback(
    async ({ id }: CompletedSurveyListing) => {
      setLoadingCompletedSurveyId(id)
      try {
        const { survey }: { survey: CompletedSurvey } = await postRequest(
          `/${coreAddress}/view/${id}`
        )

        const raterTitles = (
          await Promise.all(
            survey.ratings.map(async (rating) => {
              const raterAddress = await secp256k1PublicKeyToBech32Address(
                rating.rater,
                bech32Prefix
              )
              return survey.attributes.map(
                ({ name }) => `${raterAddress}:${name}`
              )
            })
          )
        ).flat()

        const csvTitles = ['Contributor', 'Contribution', ...raterTitles]

        const csvData = await Promise.all(
          survey.contributions.map(async (contribution) => {
            const contributorAddress = await secp256k1PublicKeyToBech32Address(
              contribution.contributor,
              bech32Prefix
            )

            const ratings = survey.ratings.flatMap(
              (rating) =>
                rating.contributions
                  .find(({ id }) => id === contribution.id)
                  ?.attributes.map((rating) =>
                    typeof rating === 'number' ? rating : ''
                  ) ?? []
            )

            return {
              [csvTitles[0]]: contributorAddress,
              [csvTitles[1]]: contribution.content,
              ...Object.fromEntries(
                raterTitles.map((title, index) => [title, ratings[index]])
              ),
            }
          })
        )

        // Create and save CSV.
        const csvContent = parseJsonToCsv(csvData, { fields: csvTitles })
        saveAs(
          new Blob([csvContent], { type: 'text/plain;charset=utf-8' }),
          `survey-${id}.csv`
        )
      } catch (err) {
        console.error('Failed to fetch retroactive payroll past survey.', err)
        toast.error(err instanceof Error ? err.message : JSON.stringify(err))
      } finally {
        setLoadingCompletedSurveyId(undefined)
      }
    },
    [bech32Prefix, coreAddress, postRequest]
  )

  return (
    <StatelessPayrollTab
      ContributionForm={ContributionForm}
      IconButtonLink={IconButtonLink}
      NewSurveyForm={NewSurveyForm}
      ProposalCreationForm={ProposalCreationForm}
      RatingForm={RatingForm}
      downloadCompletedSurvey={downloadCompletedSurvey}
      isMember={isMember}
      loadingCompletedSurveyId={loadingCompletedSurveyId}
      loadingCompletedSurveys={loadingCompletedSurveys}
      loadingStatus={loadingStatus}
    />
  )
}
