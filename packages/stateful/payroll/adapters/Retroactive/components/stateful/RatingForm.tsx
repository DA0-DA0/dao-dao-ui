import { useWallet } from '@noahsaso/cosmodal'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState, waitForAll } from 'recoil'

import {
  Cw20BaseSelectors,
  usdcPerMacroTokenSelector,
} from '@dao-dao/state/recoil'
import {
  Loader,
  useCachedLoadable,
  useDaoInfoContext,
} from '@dao-dao/stateless'
import { AmountWithTimestampAndDenom } from '@dao-dao/types'
import {
  nativeTokenDecimals,
  secp256k1PublicKeyToBech32Address,
} from '@dao-dao/utils'

import { SuspenseLoader } from '../../../../../components'
import { refreshStatusAtom } from '../../atoms'
import { usePostRequest } from '../../hooks/usePostRequest'
import { statusSelector } from '../../selectors'
import {
  Contribution,
  ContributionRating,
  ContributionResponse,
  RatingsFormData,
} from '../../types'
import {
  ContributionRatingData,
  RatingForm as StatelessRatingForm,
} from '../stateless/RatingForm'
import { IdentityProfileDisplay } from './IdentityProfileDisplay'

export const RatingForm = () => {
  const { t } = useTranslation()
  const { coreAddress, chainId, bech32Prefix } = useDaoInfoContext()
  const { publicKey: walletPublicKey } = useWallet(chainId)

  const postRequest = usePostRequest()

  const statusLoadable = useCachedLoadable(
    walletPublicKey?.hex
      ? statusSelector({
          daoAddress: coreAddress,
          walletPublicKey: walletPublicKey.hex,
        })
      : undefined
  )
  const setRefreshStatus = useSetRecoilState(
    refreshStatusAtom({
      daoAddress: coreAddress,
    })
  )

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<ContributionRatingData>()

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      // Fetch contributions.
      const response: {
        contributions: ContributionResponse[]
        ratings: ContributionRating[]
      } = await postRequest(`/${coreAddress}/contributions`)

      // Get addresses for contributor public keys.
      const contributions = await Promise.all(
        response.contributions.map(
          async ({
            contributor: publicKey,
            ...contribution
          }): Promise<Contribution> => {
            const address = await secp256k1PublicKeyToBech32Address(
              publicKey,
              bech32Prefix
            )

            return {
              ...contribution,
              contributor: {
                publicKey,
                address,
              },
            }
          }
        )
      )

      setData({
        contributions,
        existingRatings: response.ratings,
      })
    } catch (err) {
      console.error(err)
      toast.error(err instanceof Error ? err.message : JSON.stringify(err))
    } finally {
      setLoading(false)
    }
  }, [bech32Prefix, coreAddress, postRequest])

  const onSubmit = useCallback(
    async (data: RatingsFormData) => {
      setLoading(true)

      try {
        await postRequest(`/${coreAddress}/rate`, { ...data })
        toast.success(t('success.ratingsSubmitted'))
        // Reload status on success.
        setRefreshStatus((id) => id + 1)
      } catch (err) {
        console.error(err)
        toast.error(err instanceof Error ? err.message : JSON.stringify(err))
      } finally {
        setLoading(false)
      }
    },
    [coreAddress, postRequest, setRefreshStatus, t]
  )

  const loadingCw20TokenInfos = useCachedLoadable(
    statusLoadable.state === 'hasValue' && statusLoadable.contents
      ? waitForAll(
          statusLoadable.contents.survey.attributes.flatMap(({ cw20Tokens }) =>
            cw20Tokens.map(({ address }) =>
              Cw20BaseSelectors.tokenInfoWithAddressAndLogoSelector({
                contractAddress: address,
                chainId,
                params: [],
              })
            )
          )
        )
      : undefined
  )

  const prices = useCachedLoadable(
    statusLoadable.state === 'hasValue' &&
      statusLoadable.contents &&
      loadingCw20TokenInfos.state === 'hasValue'
      ? waitForAll(
          statusLoadable.contents.survey.attributes.flatMap(
            ({ nativeTokens, cw20Tokens }) => [
              ...nativeTokens.map(({ denom }) => {
                const decimals = nativeTokenDecimals(denom)
                if (decimals === undefined) {
                  throw new Error(`Unknown denom: ${denom}`)
                }
                return usdcPerMacroTokenSelector({
                  denom,
                  decimals,
                })
              }),
              ...cw20Tokens.map(({ address }, cw20TokenIndex) =>
                usdcPerMacroTokenSelector({
                  denom: address,
                  decimals:
                    loadingCw20TokenInfos.contents[cw20TokenIndex].decimals,
                })
              ),
            ]
          )
        )
      : undefined
  )

  return (
    <SuspenseLoader
      fallback={<Loader />}
      forceFallback={
        statusLoadable.state === 'loading' ||
        loadingCw20TokenInfos.state === 'loading' ||
        prices.state === 'loading'
      }
    >
      {statusLoadable.state === 'hasValue' &&
        !!statusLoadable.contents &&
        loadingCw20TokenInfos.state === 'hasValue' &&
        prices.state === 'hasValue' && (
          <StatelessRatingForm
            IdentityProfileDisplay={IdentityProfileDisplay}
            cw20TokenInfos={loadingCw20TokenInfos.contents}
            data={data}
            loadData={loadData}
            loading={loading || statusLoadable.updating}
            onSubmit={onSubmit}
            prices={
              prices.contents.filter(Boolean) as AmountWithTimestampAndDenom[]
            }
            status={statusLoadable.contents}
          />
        )}
    </SuspenseLoader>
  )
}
