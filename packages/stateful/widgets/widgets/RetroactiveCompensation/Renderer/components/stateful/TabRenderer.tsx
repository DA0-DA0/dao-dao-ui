import { FetchQueryOptions, useQueries } from '@tanstack/react-query'
import { saveAs } from 'file-saver'
import { unparse as jsonToCsv } from 'papaparse'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'

import { useCachedLoading, useChain, useDaoContext } from '@dao-dao/stateless'
import { VotingPowerAtHeightResponse } from '@dao-dao/types/contracts/DaoDaoCore'
import {
  makeCombineQueryResultsIntoLoadingDataWithError,
  secp256k1PublicKeyToBech32Address,
} from '@dao-dao/utils'

import { IconButtonLink } from '../../../../../../components'
import {
  useMembership,
  useOnSecretNetworkPermitUpdate,
  useWallet,
} from '../../../../../../hooks'
import { usePostRequest } from '../../hooks/usePostRequest'
import { listCompletedSurveysSelector, statusSelector } from '../../selectors'
import { CompletedSurvey, CompletedSurveyListing } from '../../types'
import { TabRenderer as StatelessTabRenderer } from '../stateless/TabRenderer'
import { NewSurveyForm } from './NewSurveyForm'
import { OpenSurveySection } from './OpenSurveySection'

export const TabRenderer = () => {
  const { dao } = useDaoContext()
  const { bech32_prefix: bech32Prefix } = useChain()
  const { address: walletAddress, hexPublicKey } = useWallet({
    loadAccount: true,
  })
  const { isMember = false } = useMembership()

  const loadingStatus = useCachedLoading(
    statusSelector({
      daoAddress: dao.coreAddress,
      walletPublicKey: !hexPublicKey.loading ? hexPublicKey.data : '_',
    }),
    undefined
  )
  const loadingCompletedSurveys = useCachedLoading(
    listCompletedSurveysSelector({
      daoAddress: dao.coreAddress,
    }),
    []
  )

  // Get voting power at time of each completed survey creation to determine if
  // we can download the CSV or not.
  const loadingMembershipDuringCompletedSurveys = useQueries({
    queries:
      loadingCompletedSurveys.loading || !walletAddress
        ? ([] as FetchQueryOptions<VotingPowerAtHeightResponse>[])
        : loadingCompletedSurveys.data.map(({ createdAtBlockHeight }) =>
            dao.getVotingPowerQuery(walletAddress, createdAtBlockHeight)
          ),
    combine: makeCombineQueryResultsIntoLoadingDataWithError({
      transform: (results) => results.map((r) => r.power),
    }),
  })
  // Make sure this component re-renders if the Secret Network permit changes so
  // the voting queries above refresh.
  useOnSecretNetworkPermitUpdate()

  const postRequest = usePostRequest()

  const [loadingCompletedSurveyId, setLoadingCompletedSurveyId] =
    useState<number>()
  const downloadCompletedSurvey = useCallback(
    async ({ id }: CompletedSurveyListing) => {
      setLoadingCompletedSurveyId(id)
      try {
        const { survey }: { survey: CompletedSurvey } = await postRequest(
          `/${dao.coreAddress}/view/${id}`
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
        const csvContent = jsonToCsv(csvData, { columns: csvTitles })
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
    [bech32Prefix, dao.coreAddress, postRequest]
  )

  return (
    <StatelessTabRenderer
      IconButtonLink={IconButtonLink}
      NewSurveyForm={NewSurveyForm}
      OpenSurveySection={OpenSurveySection}
      downloadCompletedSurvey={downloadCompletedSurvey}
      isMember={isMember}
      loadingCompletedSurveyId={loadingCompletedSurveyId}
      loadingCompletedSurveys={loadingCompletedSurveys}
      loadingMembershipDuringCompletedSurveys={
        loadingMembershipDuringCompletedSurveys
      }
      loadingStatus={loadingStatus}
    />
  )
}
