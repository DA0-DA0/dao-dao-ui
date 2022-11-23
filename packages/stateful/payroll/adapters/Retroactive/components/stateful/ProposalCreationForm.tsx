import { useWallet } from '@noahsaso/cosmodal'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'

import {
  Loader,
  useCachedLoadable,
  useDaoInfoContext,
} from '@dao-dao/stateless'
import { secp256k1PublicKeyToBech32Address } from '@dao-dao/utils'

import { SuspenseLoader } from '../../../../../components'
import { refreshStatusAtom } from '../../atoms'
import { usePostRequest } from '../../hooks/usePostRequest'
import { statusSelector } from '../../selectors'
import {
  AnyToken,
  CompleteRatings,
  ContributionWithCompensation,
  Rating,
  RatingsResponse,
} from '../../types'
import { ProposalCreationForm as StatelessProposalCreationForm } from '../stateless/ProposalCreationForm'
import { IdentityProfileDisplay } from './IdentityProfileDisplay'

export const ProposalCreationForm = () => {
  const { t } = useTranslation()
  const router = useRouter()
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

  const [completeRatings, setCompleteRatings] = useState<CompleteRatings>()
  const loadRatings = useCallback(async () => {
    // Need survey status to be loaded to compute compensation.
    if (statusLoadable.state !== 'hasValue' || !statusLoadable.contents) {
      return
    }

    setLoading(true)

    try {
      // Fetch ratings.
      const response: RatingsResponse = await postRequest(
        `/${coreAddress}/ratings`
      )

      // Compute average of ratings for contributions for each attribute.
      const contributionsWithAverageRatings = response.contributions.map(
        (contribution) => {
          // Each item is an array of attribute ratings for this contributor.
          // The order of attributes matches the attribute order in the survey.
          const attributeRatings = response.ratings.map(
            (rating) =>
              rating.contributions.find(({ id }) => id === contribution.id)
                ?.attributes ?? []
          )

          // Average attribute rating for each attribute. If the ratings were
          // [50, 100], the average is 75. If the ratings were [null, 50], the
          // average is 50. If the ratings were [null, null], the average is 0.
          const averageAttributeRatings =
            statusLoadable.contents!.survey.attributes.map(
              (_, attributeIndex) => {
                const nonAbstainRatings = attributeRatings
                  .map((ratings) => ratings[attributeIndex])
                  .filter((rating) => typeof rating === 'number') as number[]

                // If all ratings are abstain, return 0.
                return nonAbstainRatings.length === 0
                  ? 0
                  : // Otherwise, return average.
                    nonAbstainRatings.reduce((sum, rating) => sum + rating, 0) /
                      nonAbstainRatings.length
              }
            )

          return averageAttributeRatings
        }
      )

      // Compute total of averages for each attribute.
      const totalsOfAverages = statusLoadable.contents!.survey.attributes.map(
        (_, attributeIndex) =>
          contributionsWithAverageRatings.reduce(
            (sum, averageAttributeRatings) =>
              sum + averageAttributeRatings[attributeIndex],
            0
          )
      )

      // Get addresses for contributor public keys, and compute compensation.
      const contributions = await Promise.all(
        response.contributions.map(
          async (
            { contributor: publicKey, ...contribution },
            contributionIndex
          ): Promise<ContributionWithCompensation> => {
            const address = await secp256k1PublicKeyToBech32Address(
              publicKey,
              bech32Prefix
            )

            const averageRatingPerAttribute =
              contributionsWithAverageRatings[contributionIndex]

            const tokens = statusLoadable.contents!.survey.attributes.flatMap(
              ({ nativeTokens, cw20Tokens }, attributeIndex): AnyToken[] => {
                const averageRating = averageRatingPerAttribute[attributeIndex]
                const totalOfAverages = totalsOfAverages[attributeIndex]
                const proportionalCompensation = averageRating / totalOfAverages

                return [
                  ...nativeTokens.map(
                    ({ denom, amount }): AnyToken => ({
                      denomOrAddress: denom,
                      amount: Math.floor(
                        Number(amount) * proportionalCompensation
                      ).toString(),
                    })
                  ),
                  ...cw20Tokens.map(
                    ({ address, amount }): AnyToken => ({
                      denomOrAddress: address,
                      amount: Math.floor(
                        Number(amount) * proportionalCompensation
                      ).toString(),
                    })
                  ),
                ]
              }
            )

            return {
              ...contribution,
              contributor: {
                publicKey,
                address,
              },
              averageRatingPerAttribute,
              tokens,
            }
          }
        )
      )

      const ratings = await Promise.all(
        response.ratings.map(
          async ({ rater: publicKey, ...rating }): Promise<Rating> => {
            const address = await secp256k1PublicKeyToBech32Address(
              publicKey,
              bech32Prefix
            )

            return {
              ...rating,
              rater: {
                publicKey,
                address,
              },
            }
          }
        )
      )

      const completeRatings: CompleteRatings = {
        contributions,
        ratings,
      }

      setCompleteRatings(completeRatings)
    } catch (err) {
      console.error(err)
      toast.error(err instanceof Error ? err.message : JSON.stringify(err))
    } finally {
      setLoading(false)
    }
  }, [
    bech32Prefix,
    coreAddress,
    postRequest,
    statusLoadable.contents,
    statusLoadable.state,
  ])

  const onComplete = useCallback(async () => {
    setLoading(true)

    try {
      // Propose.
      // TODO: Make proposal
      const proposalId = 'A1'

      // Complete with proposal ID.
      await postRequest(`/${coreAddress}/complete`, { proposalId })
      toast.success(t('success.surveyCompleted'))

      // Reload status on success.
      setRefreshStatus((id) => id + 1)

      // Navigate to proposal.
      router.push(`/dao/${coreAddress}/proposals/${proposalId}`)
    } catch (err) {
      console.error(err)
      toast.error(err instanceof Error ? err.message : JSON.stringify(err))
    } finally {
      setLoading(false)
    }
  }, [coreAddress, postRequest, router, setRefreshStatus, t])

  return (
    <SuspenseLoader
      fallback={<Loader />}
      forceFallback={statusLoadable.state === 'loading'}
    >
      {statusLoadable.state === 'hasValue' && !!statusLoadable.contents && (
        <StatelessProposalCreationForm
          IdentityProfileDisplay={IdentityProfileDisplay}
          completeRatings={completeRatings}
          loadRatings={loadRatings}
          loading={loading || statusLoadable.updating}
          onComplete={onComplete}
          status={statusLoadable.contents}
        />
      )}
    </SuspenseLoader>
  )
}
