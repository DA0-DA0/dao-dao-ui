import { QueryClient, queryOptions } from '@tanstack/react-query'

import { API_BASE } from './constants'
import { SurveyWithMetadata } from './types'

/**
 * Fetch survey with wallet metadata.
 */
export const fetchSurvey = async ({
  daoAddress,
  walletPublicKey,
  surveyId,
}: {
  daoAddress: string
  walletPublicKey: string
  surveyId: number
}): Promise<SurveyWithMetadata> => {
  const response = await fetch(
    `${API_BASE}/${daoAddress}/${surveyId}/${walletPublicKey}/status`
  )

  if (!response.ok) {
    const responseBody = await response.json().catch((err) => ({
      error: err instanceof Error ? err.message : JSON.stringify(err),
    }))
    console.error(
      `Failed to fetch retroactive compensation survey for ID ${surveyId}.`,
      response,
      responseBody
    )
    throw new Error(
      'error' in responseBody
        ? responseBody.error
        : JSON.stringify(responseBody)
    )
  }

  const survey: SurveyWithMetadata = await response.json()

  return survey
}

/**
 * List surveys.
 */
export const listSurveys = async (
  queryClient: QueryClient,
  {
    daoAddress,
    walletPublicKey,
  }: {
    daoAddress: string
    walletPublicKey: string
  }
): Promise<SurveyWithMetadata[]> => {
  const response = await fetch(
    `${API_BASE}/${daoAddress}/${walletPublicKey}/list`
  )

  if (!response.ok) {
    const responseBody = await response.json().catch((err) => ({
      error: err instanceof Error ? err.message : JSON.stringify(err),
    }))
    console.error(
      'Failed to fetch retroactive compensation surveys.',
      response,
      responseBody
    )
    throw new Error(
      'error' in responseBody
        ? responseBody.error
        : JSON.stringify(responseBody)
    )
  }

  const surveys: SurveyWithMetadata[] = (await response.json()).surveys

  surveys.forEach((survey) => {
    queryClient.setQueryData(
      retroactiveCompensationQueries.survey({
        daoAddress,
        walletPublicKey,
        surveyId: survey.survey.surveyId,
      }).queryKey,
      survey
    )
  })

  return surveys
}

export const retroactiveCompensationQueries = {
  /**
   * Fetch survey with wallet metadata.
   */
  survey: (options: Parameters<typeof fetchSurvey>[0]) =>
    queryOptions({
      queryKey: ['retroactiveCompensation', 'survey', options],
      queryFn: () => fetchSurvey(options),
    }),
  /**
   * List surveys.
   */
  listSurveys: (
    queryClient: QueryClient,
    options: Parameters<typeof listSurveys>[1]
  ) =>
    queryOptions({
      queryKey: ['retroactiveCompensation', 'listSurveys', options],
      queryFn: () => listSurveys(queryClient, options),
    }),
}
