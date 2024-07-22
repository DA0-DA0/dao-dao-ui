import { QueryClient, queryOptions } from '@tanstack/react-query'

import { API_BASE } from './constants'
import { ActiveSurveyStatus, CompletedSurveyStatus } from './types'

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
}): Promise<ActiveSurveyStatus> => {
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

  const survey: ActiveSurveyStatus = await response.json()

  return survey
}

/**
 * List active surveys.
 */
export const listActiveSurveys = async (
  queryClient: QueryClient,
  {
    daoAddress,
    walletPublicKey,
  }: {
    daoAddress: string
    walletPublicKey: string
  }
): Promise<ActiveSurveyStatus[]> => {
  const response = await fetch(
    `${API_BASE}/${daoAddress}/${walletPublicKey}/active`
  )

  if (!response.ok) {
    const responseBody = await response.json().catch((err) => ({
      error: err instanceof Error ? err.message : JSON.stringify(err),
    }))
    console.error(
      'Failed to fetch retroactive compensation active surveys.',
      response,
      responseBody
    )
    throw new Error(
      'error' in responseBody
        ? responseBody.error
        : JSON.stringify(responseBody)
    )
  }

  const surveys: ActiveSurveyStatus[] = (await response.json()).surveys

  surveys.forEach((survey) => {
    queryClient.setQueryData(
      retroactiveCompensationQueries.activeSurvey({
        daoAddress,
        walletPublicKey,
        surveyId: survey.survey.surveyId,
      }).queryKey,
      survey
    )
  })

  return surveys
}

/**
 * List completed surveys.
 */
export const listCompletedSurveys = async ({
  daoAddress,
}: {
  daoAddress: string
}): Promise<CompletedSurveyStatus[]> => {
  const response = await fetch(`${API_BASE}/${daoAddress}/completed`)

  if (!response.ok) {
    const responseBody = await response.json().catch((err) => ({
      error: err instanceof Error ? err.message : JSON.stringify(err),
    }))
    console.error(
      'Failed to fetch retroactive compensation completed surveys.',
      response,
      responseBody
    )
    throw new Error(
      'error' in responseBody
        ? responseBody.error
        : JSON.stringify(responseBody)
    )
  }

  const surveys: CompletedSurveyStatus[] = (await response.json()).surveys

  return surveys
}

export const retroactiveCompensationQueries = {
  /**
   * Fetch survey with wallet metadata.
   */
  activeSurvey: (options: Parameters<typeof fetchSurvey>[0]) =>
    queryOptions({
      queryKey: ['retroactiveCompensation', 'activeSurvey', options],
      queryFn: () => fetchSurvey(options),
    }),
  /**
   * List active surveys.
   */
  listActiveSurveys: (
    queryClient: QueryClient,
    options: Parameters<typeof listActiveSurveys>[1]
  ) =>
    queryOptions({
      queryKey: ['retroactiveCompensation', 'listActiveSurveys', options],
      queryFn: () => listActiveSurveys(queryClient, options),
    }),
  /**
   * List completed surveys.
   */
  listCompletedSurveys: (options: Parameters<typeof listCompletedSurveys>[0]) =>
    queryOptions({
      queryKey: ['retroactiveCompensation', 'listCompletedSurveys', options],
      queryFn: () => listCompletedSurveys(options),
    }),
}
