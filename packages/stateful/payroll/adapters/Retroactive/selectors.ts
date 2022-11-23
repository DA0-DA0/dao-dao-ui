import { selectorFamily } from 'recoil'

import { refreshStatusAtom } from './atoms'
import { API_BASE } from './constants'
import { CompletedSurvey, Status } from './types'

export const statusSelector = selectorFamily<
  Status | undefined,
  {
    daoAddress: string
    walletPublicKey: string
  }
>({
  key: 'payrollRetroactiveStatus',
  get:
    ({ daoAddress, walletPublicKey }) =>
    async ({ get }) => {
      get(refreshStatusAtom({ daoAddress, walletPublicKey }))

      const response = await fetch(
        `${API_BASE}/${daoAddress}/${walletPublicKey}/status`
      )
      // If not found, return undefined since there is no active survey.
      if (response.status === 404) {
        return undefined
      } else if (!response.ok) {
        const responseBody = await response.json().catch((err) => ({
          error: err instanceof Error ? err.message : JSON.stringify(err),
        }))
        console.error(
          'Failed to fetch retroactive payroll survey status.',
          response,
          responseBody
        )
        throw new Error(
          'error' in responseBody
            ? responseBody.error
            : JSON.stringify(responseBody)
        )
      }

      return await response.json()
    },
})

export const listCompletedSurveysSelector = selectorFamily<
  CompletedSurvey[],
  {
    daoAddress: string
  }
>({
  key: 'listCompletedSurveys',
  get:
    ({ daoAddress }) =>
    async () => {
      const response = await fetch(`${API_BASE}/${daoAddress}/list`)
      // If not found, return undefined since there is no active survey.
      if (response.status === 404) {
        return undefined
      } else if (!response.ok) {
        const responseBody = await response.json().catch((err) => ({
          error: err instanceof Error ? err.message : JSON.stringify(err),
        }))
        console.error(
          'Failed to fetch retroactive payroll survey list.',
          response,
          responseBody
        )
        throw new Error(
          'error' in responseBody
            ? responseBody.error
            : JSON.stringify(responseBody)
        )
      }

      const body = await response.json()
      if (!('surveys' in body) || !Array.isArray(body.surveys)) {
        throw new Error(
          'Unexpected response from retroactive payroll survey list.'
        )
      }

      return body.surveys
    },
})
