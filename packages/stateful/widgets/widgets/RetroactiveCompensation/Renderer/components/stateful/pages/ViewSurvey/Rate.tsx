import { fromBase64, toHex } from '@cosmjs/encoding'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useRecoilValue, waitForAll } from 'recoil'

import {
  cosmWasmClientForChainSelector,
  genericTokenWithUsdPriceSelector,
} from '@dao-dao/state/recoil'
import { Loader, useCachedLoadable, useChain, useDao } from '@dao-dao/stateless'
import { TokenType } from '@dao-dao/types'
import { secp256k1PublicKeyToBech32Address } from '@dao-dao/utils'

import {
  AddressInput,
  EntityDisplay,
  SuspenseLoader,
  Trans,
} from '../../../../../../../../components'
import { usePostRequest } from '../../../../hooks/usePostRequest'
import {
  Contribution,
  ContributionRating,
  ContributionResponse,
  RatingsFormData,
} from '../../../../types'
import { prepareContributionFormData } from '../../../../utils'
import {
  NominationForm,
  Rate as StatelessRate,
  SurveyContributionRatingState,
} from '../../../stateless/pages/ViewSurvey/Rate'
import { ViewSurveyPageProps } from './types'

export const Rate = ({ status, refreshRef, isMember }: ViewSurveyPageProps) => {
  const { t } = useTranslation()
  const { chain_id: chainId, bech32_prefix: bech32Prefix } = useChain()
  const { coreAddress } = useDao()

  const client = useRecoilValue(cosmWasmClientForChainSelector(chainId))
  const postRequest = usePostRequest()

  const [loadingState, setLoadingState] = useState(false)
  const [state, setState] = useState<SurveyContributionRatingState>()
  const loadState = useCallback(async () => {
    setLoadingState(true)

    try {
      // Fetch contributions.
      const response: {
        contributions: ContributionResponse[]
        ratings: ContributionRating[]
      } = await postRequest(
        `/${coreAddress}/${status.survey.uuid}/contributions`
      )

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

      setState({
        contributions,
        existingRatings: response.ratings,
      })
    } catch (err) {
      console.error(err)
      toast.error(err instanceof Error ? err.message : JSON.stringify(err))
    } finally {
      setLoadingState(false)
    }
  }, [bech32Prefix, coreAddress, postRequest, status.survey.uuid])

  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const onSubmit = useCallback(
    async ({ ratings }: RatingsFormData) => {
      setLoadingSubmit(true)

      try {
        await postRequest(`/${coreAddress}/${status.survey.uuid}/rate`, {
          // no need to submit weight to ratings. not used by backend.
          ratings: ratings.map(({ weight: _, ...rating }) => ({
            ...rating,
          })),
        })
        toast.success(t('success.ratingsSubmitted'))
        // Reload status on success.
        await refreshRef.current()
      } catch (err) {
        console.error(err)
        toast.error(err instanceof Error ? err.message : JSON.stringify(err))
      } finally {
        setLoadingSubmit(false)
      }
    },
    [coreAddress, postRequest, refreshRef, status.survey.uuid, t]
  )

  const tokenPrices = useCachedLoadable(
    waitForAll(
      status.survey.attributes.flatMap(({ nativeTokens, cw20Tokens }) => [
        ...nativeTokens.map(({ denom }) =>
          genericTokenWithUsdPriceSelector({
            chainId,
            type: TokenType.Native,
            denomOrAddress: denom,
          })
        ),
        ...cw20Tokens.map(({ address }) =>
          genericTokenWithUsdPriceSelector({
            chainId,
            type: TokenType.Cw20,
            denomOrAddress: address,
          })
        ),
      ])
    )
  )

  const [loadingNominate, setLoadingNominate] = useState(false)
  const onNominate = useCallback(
    async (formData: NominationForm) => {
      setLoadingNominate(true)

      try {
        // Get public key from address.
        const account = await client.getAccount(formData.contributor)
        if (!account?.pubkey?.value) {
          throw new Error(t('error.addressNotFoundOnChain'))
        }
        const contributorPublicKey = toHex(fromBase64(account.pubkey.value))

        // Nominate.
        await postRequest(`/${coreAddress}/${status.survey.uuid}/nominate`, {
          ...prepareContributionFormData(formData),
          contributor: contributorPublicKey,
        })
        toast.success(t('success.nominationSubmitted'))

        // Reload data so nomination appears if data already loaded.
        if (state) {
          await loadState()
        }
      } catch (err) {
        console.error(err)
        toast.error(err instanceof Error ? err.message : JSON.stringify(err))
      } finally {
        setLoadingNominate(false)
      }
    },
    [client, postRequest, coreAddress, status.survey.uuid, t, state, loadState]
  )

  return (
    <SuspenseLoader
      fallback={<Loader />}
      forceFallback={tokenPrices.state === 'loading'}
    >
      {tokenPrices.state === 'hasValue' && (
        <StatelessRate
          AddressInput={AddressInput}
          EntityDisplay={EntityDisplay}
          Trans={Trans}
          canRate={isMember}
          loadState={loadState}
          loadingNominate={loadingNominate}
          loadingState={loadingState}
          loadingSubmit={loadingSubmit}
          onNominate={onNominate}
          onSubmit={onSubmit}
          state={state}
          status={status}
          tokenPrices={tokenPrices.contents}
        />
      )}
    </SuspenseLoader>
  )
}
