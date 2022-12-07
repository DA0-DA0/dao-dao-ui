import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import {
  CwdCoreV2Selectors,
  nativeBalancesSelector,
} from '@dao-dao/state/recoil'
import {
  Loader,
  useCachedLoadable,
  useDaoInfoContext,
} from '@dao-dao/stateless'
import {
  convertDenomToMicroDenomWithDecimals,
  loadableToLoadingData,
} from '@dao-dao/utils'

import { SuspenseLoader } from '../../../../../components'
import { useCw20GovernanceTokenInfoResponseIfExists } from '../../../../../voting-module-adapter/react/hooks/useCw20GovernanceTokenInfoResponseIfExists'
import { refreshStatusAtom } from '../../atoms'
import { usePostRequest } from '../../hooks/usePostRequest'
import {
  Cw20Token,
  NativeToken,
  NewSurveyFormData,
  NewSurveyRequest,
} from '../../types'
import { NewSurveyForm as StatelessNewSurveyForm } from '../stateless/NewSurveyForm'

export const NewSurveyForm = () => {
  const { t } = useTranslation()
  const { coreAddress, chainId } = useDaoInfoContext()

  // Get CW20 governance token address from voting module adapter if exists, so
  // we can make sure to load it with all cw20 balances, even if it has not been
  // explicitly added to the DAO.
  const { governanceTokenAddress } =
    useCw20GovernanceTokenInfoResponseIfExists() ?? {}

  const cw20TokenInfos = useRecoilValue(
    CwdCoreV2Selectors.allCw20InfosSelector({
      contractAddress: coreAddress,
      chainId,
      governanceTokenAddress,
    })
  )
  // This needs to be loaded via a cached loadable to avoid displaying a loader
  // when this data updates on a schedule. Manually trigger a suspense loader
  // the first time when the initial data is still loading.
  const nativeBalancesLoadable = loadableToLoadingData(
    useCachedLoadable(
      nativeBalancesSelector({
        address: coreAddress,
        chainId,
      })
    ),
    []
  )

  const postRequest = usePostRequest()
  const setRefreshStatus = useSetRecoilState(
    refreshStatusAtom({
      daoAddress: coreAddress,
    })
  )

  const [loading, setLoading] = useState(false)
  const onCreate = useCallback(
    async (surveyData: NewSurveyFormData) => {
      // Need balances to be loaded.
      if (nativeBalancesLoadable.loading) {
        toast.error(t('error.loadingData'))
        return
      }

      setLoading(true)

      try {
        const survey: NewSurveyRequest = {
          ...surveyData,
          // Convert date strings to dates and back, to ensure they are in the
          // local timezone.
          contributionsOpenAt: new Date(
            surveyData.contributionsOpenAt
          ).toISOString(),
          contributionsCloseRatingsOpenAt: new Date(
            surveyData.contributionsCloseRatingsOpenAt
          ).toISOString(),
          ratingsCloseAt: new Date(surveyData.ratingsCloseAt).toISOString(),
          // Split up cw20 and native tokens, and convert amount decimals.
          attributes: surveyData.attributes.map(({ tokens, ...attribute }) => {
            const nativeTokens: NativeToken[] = []
            const cw20Tokens: Cw20Token[] = []

            tokens.forEach(({ denomOrAddress, amount }) => {
              const nativeDecimals = nativeBalancesLoadable.data.find(
                ({ denom }) => denom === denomOrAddress
              )?.decimals
              const cw20Decimals = cw20TokenInfos.find(
                ({ address }) => address === denomOrAddress
              )?.info.decimals

              if (cw20Decimals !== undefined) {
                cw20Tokens.push({
                  address: denomOrAddress,
                  amount: convertDenomToMicroDenomWithDecimals(
                    amount,
                    cw20Decimals
                  ).toString(),
                })
              } else if (nativeDecimals !== undefined) {
                nativeTokens.push({
                  denom: denomOrAddress,
                  amount: convertDenomToMicroDenomWithDecimals(
                    amount,
                    nativeDecimals
                  ).toString(),
                })
              } else {
                // Should never happen, but just in case.
                throw new Error(
                  `Could not find decimals for token with denom or address '${denomOrAddress}'.`
                )
              }
            })

            return {
              ...attribute,
              nativeTokens,
              cw20Tokens,
            }
          }),
        }

        await postRequest(`/${coreAddress}`, { survey })
        toast.success(t('success.surveyCreated'))

        // Reload status on success.
        setRefreshStatus((id) => id + 1)
      } catch (err) {
        console.error(err)
        toast.error(err instanceof Error ? err.message : JSON.stringify(err))
      } finally {
        setLoading(false)
      }
    },
    [
      coreAddress,
      cw20TokenInfos,
      nativeBalancesLoadable,
      postRequest,
      setRefreshStatus,
      t,
    ]
  )

  return (
    <SuspenseLoader
      fallback={<Loader />}
      forceFallback={
        // Manually trigger since we are using a cached loadable but want to
        // wait for this. We use the loadable to prevent re-rendering when the
        // data is updated on a schedule.
        nativeBalancesLoadable.loading
      }
    >
      <StatelessNewSurveyForm
        cw20TokenInfos={cw20TokenInfos}
        loading={loading}
        nativeDenoms={
          nativeBalancesLoadable.loading
            ? []
            : nativeBalancesLoadable.data.map(({ denom }) => denom)
        }
        onCreate={onCreate}
      />
    </SuspenseLoader>
  )
}
