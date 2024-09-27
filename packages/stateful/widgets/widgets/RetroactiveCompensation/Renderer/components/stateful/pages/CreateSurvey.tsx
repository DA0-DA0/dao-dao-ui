import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { HugeDecimal } from '@dao-dao/math'
import { genericTokenBalancesSelector } from '@dao-dao/state'
import {
  Loader,
  useCachedLoading,
  useChain,
  useDaoInfoContext,
  useDaoNavHelpers,
} from '@dao-dao/stateless'
import { TokenType, WidgetId } from '@dao-dao/types'

import { SuspenseLoader } from '../../../../../../../components'
import { useCw20CommonGovernanceTokenInfoIfExists } from '../../../../../../../voting-module-adapter/react/hooks/useCw20CommonGovernanceTokenInfoIfExists'
import { usePostRequest } from '../../../hooks/usePostRequest'
import { retroactiveCompensationQueries } from '../../../queries'
import {
  Cw20Token,
  NativeToken,
  NewSurveyFormData,
  NewSurveyRequest,
  PagePath,
  Survey,
} from '../../../types'
import { CreateSurvey as StatelessCreateSurvey } from '../../stateless/pages/CreateSurvey'

export const CreateSurvey = () => {
  const { t } = useTranslation()
  const { chain_id: chainId } = useChain()
  const { coreAddress } = useDaoInfoContext()
  const { getDaoPath } = useDaoNavHelpers()
  const router = useRouter()

  // Get CW20 governance token address from voting module adapter if exists, so
  // we can make sure to load it with all cw20 balances, even if it has not been
  // explicitly added to the DAO.
  const { denomOrAddress: governanceTokenAddress } =
    useCw20CommonGovernanceTokenInfoIfExists() ?? {}

  // This needs to be loaded via a cached loadable to avoid displaying a loader
  // when this data updates on a schedule. Manually trigger a suspense loader
  // the first time when the initial data is still loading.
  const availableTokensLoading = useCachedLoading(
    genericTokenBalancesSelector({
      chainId,
      address: coreAddress,
      cw20GovernanceTokenAddress: governanceTokenAddress,
      // Only load tokens in native account.
      filter: {
        account: {
          chainId,
          address: coreAddress,
        },
      },
    }),
    []
  )

  const queryClient = useQueryClient()
  const postRequest = usePostRequest()

  const [loading, setLoading] = useState(false)
  const onCreate = useCallback(
    async (surveyData: NewSurveyFormData) => {
      // Need balances to be loaded.
      if (availableTokensLoading.loading) {
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
              const nativeDecimals = availableTokensLoading.data.find(
                ({ token }) =>
                  token.type === TokenType.Native &&
                  token.denomOrAddress === denomOrAddress
              )?.token.decimals
              const cw20Decimals = availableTokensLoading.data.find(
                ({ token }) =>
                  token.type === TokenType.Cw20 &&
                  token.denomOrAddress === denomOrAddress
              )?.token.decimals

              if (cw20Decimals !== undefined) {
                cw20Tokens.push({
                  address: denomOrAddress,
                  amount: HugeDecimal.fromHumanReadable(
                    amount,
                    cw20Decimals
                  ).toString(),
                })
              } else if (nativeDecimals !== undefined) {
                nativeTokens.push({
                  denom: denomOrAddress,
                  amount: HugeDecimal.fromHumanReadable(
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

        const {
          survey: { uuid },
        } = await postRequest<{ survey: Survey }>(`/${coreAddress}/survey`, {
          survey,
        })

        toast.success(t('success.compensationCycleCreated'))

        // Reload survey list.
        await queryClient.refetchQueries({
          queryKey: retroactiveCompensationQueries.listSurveys(queryClient, {
            daoAddress: coreAddress,
          }).queryKey,
        })

        // Navigate to survey.
        router.push(
          getDaoPath(
            coreAddress,
            [WidgetId.RetroactiveCompensation, PagePath.View, uuid].join('/')
          ),
          undefined,
          {
            shallow: true,
          }
        )

        // Don't stop loading since we're navigating. Only stop loading on
        // error.
      } catch (err) {
        console.error(err)
        toast.error(err instanceof Error ? err.message : JSON.stringify(err))
        setLoading(false)
      }
    },
    [
      availableTokensLoading,
      t,
      postRequest,
      coreAddress,
      queryClient,
      router,
      getDaoPath,
    ]
  )

  return (
    <SuspenseLoader
      fallback={<Loader />}
      forceFallback={
        // Manually trigger since we are using a cached loadable but want to
        // wait for this. We use the loadable to prevent re-rendering when the
        // data is updated on a schedule.
        availableTokensLoading.loading
      }
    >
      <StatelessCreateSurvey
        availableTokens={
          availableTokensLoading.loading
            ? []
            : availableTokensLoading.data.map(({ token }) => token)
        }
        loading={loading}
        onCreate={onCreate}
      />
    </SuspenseLoader>
  )
}
