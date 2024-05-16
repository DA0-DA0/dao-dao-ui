import { saveAs } from 'file-saver'
import { unparse as jsonToCsv } from 'papaparse'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { waitForAll } from 'recoil'

import { DaoCoreV2Selectors } from '@dao-dao/state/recoil'
import {
  useCachedLoading,
  useChain,
  useDaoInfoContext,
} from '@dao-dao/stateless'
import { secp256k1PublicKeyToBech32Address } from '@dao-dao/utils'

import { IconButtonLink } from '../../../../../../components'
import {
  useMembership,
  useWalletWithSecretNetworkPermit,
} from '../../../../../../hooks'
import { usePostRequest } from '../../hooks/usePostRequest'
import { listCompletedSurveysSelector, statusSelector } from '../../selectors'
import { CompletedSurvey, CompletedSurveyListing } from '../../types'
import { TabRenderer as StatelessTabRenderer } from '../stateless/TabRenderer'
import { NewSurveyForm } from './NewSurveyForm'
import { OpenSurveySection } from './OpenSurveySection'

export const TabRenderer = () => {
  const { coreAddress } = useDaoInfoContext()
  const { chain_id: chainId, bech32_prefix: bech32Prefix } = useChain()
  const {
    isSecretNetwork,
    address: walletAddress,
    permit,
    hexPublicKey,
  } = useWalletWithSecretNetworkPermit({
    dao: coreAddress,
    loadAccount: true,
  })
  const { isMember = false } = useMembership({
    coreAddress,
  })

  const loadingStatus = useCachedLoading(
    statusSelector({
      daoAddress: coreAddress,
      walletPublicKey: !hexPublicKey.loading ? hexPublicKey.data : '_',
    }),
    undefined
  )
  const loadingCompletedSurveys = useCachedLoading(
    listCompletedSurveysSelector({
      daoAddress: coreAddress,
    }),
    []
  )
  // Get voting power at time of each completed survey creation to determine if
  // we can download the CSV or not.
  const loadingMembershipDuringCompletedSurveys = useCachedLoading(
    loadingCompletedSurveys.loading ||
      !(isSecretNetwork ? permit : walletAddress)
      ? undefined
      : waitForAll(
          loadingCompletedSurveys.data.map(({ createdAtBlockHeight }) =>
            DaoCoreV2Selectors.votingPowerAtHeightSelector({
              contractAddress: coreAddress,
              chainId,
              params: [
                {
                  height: createdAtBlockHeight,
                  ...(isSecretNetwork
                    ? { auth: { permit } }
                    : { address: walletAddress }),
                },
              ],
            })
          )
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
    [bech32Prefix, coreAddress, postRequest]
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
