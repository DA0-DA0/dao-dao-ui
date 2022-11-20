import { selectorFamily } from 'recoil'

import { refreshStatusAtom } from './atoms'
import { API_BASE } from './constants'
import { Status } from './types'

export const statusSelector = selectorFamily<
  Status | undefined,
  {
    daoAddress: string
    walletAddress: string
  }
>({
  key: 'payrollRetroactiveStatus',
  get:
    ({ daoAddress, walletAddress }) =>
    async ({ get }) => {
      get(refreshStatusAtom({ daoAddress, walletAddress }))

      const response = await fetch(
        `${API_BASE}/${daoAddress}/${walletAddress}/status`
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
