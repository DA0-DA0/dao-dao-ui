import { saveAs } from 'file-saver'
import { unparse as jsonToCsv } from 'papaparse'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { useChain, useDao } from '@dao-dao/stateless'
import { secp256k1PublicKeyToBech32Address } from '@dao-dao/utils'

import { ButtonLink } from '../../../../../../../../components'
import { usePostRequest } from '../../../../hooks/usePostRequest'
import { CompletedSurvey } from '../../../../types'
import { Info as StatelessInfo } from '../../../stateless/pages/ViewSurvey/Info'
import { ViewSurveyPageProps } from './types'

export const Info = ({ status, isMember }: ViewSurveyPageProps) => {
  const dao = useDao()
  const { bech32_prefix: bech32Prefix } = useChain()

  const postRequest = usePostRequest()

  const [downloading, setDownloading] = useState(false)
  const download = async () => {
    setDownloading(true)
    try {
      const { survey }: { survey: CompletedSurvey } = await postRequest(
        `/${dao.coreAddress}/${status.survey.uuid}/dump`
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
        `survey-${survey.uuid}.csv`
      )
    } catch (err) {
      console.error(
        'Failed to fetch retroactive compensation completed survey.',
        err
      )
      toast.error(err instanceof Error ? err.message : JSON.stringify(err))
    } finally {
      setDownloading(false)
    }
  }

  return (
    <StatelessInfo
      ButtonLink={ButtonLink}
      canDownload={isMember}
      download={download}
      downloading={downloading}
      status={status}
    />
  )
}
