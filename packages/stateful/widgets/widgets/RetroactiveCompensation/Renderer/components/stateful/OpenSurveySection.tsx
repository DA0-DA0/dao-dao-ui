import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import {
  useChain,
  useDaoInfoContext,
  useDaoNavHelpers,
} from '@dao-dao/stateless'
import { UnifiedCosmosMsg, WidgetId } from '@dao-dao/types'
import {
  makeBankMessage,
  makeWasmMessage,
  secp256k1PublicKeyToBech32Address,
} from '@dao-dao/utils'

import { useMembership, useWallet } from '../../../../../../hooks'
import { usePostRequest } from '../../hooks/usePostRequest'
import {
  CompleteRatings,
  Contribution,
  ContributionRating,
  ContributionResponse,
  ContributionWithCompensation,
  Rating,
  RatingsResponse,
  RatingsResponseWithIdentities,
  StatefulOpenSurveySectionProps,
  SurveyStatus,
} from '../../types'
import { computeCompensation } from '../../utils'
import { OpenSurveySection as StatelessOpenSurveySection } from '../stateless/OpenSurveySection'
import { ContributionRatingData } from '../stateless/RatingForm'
import { ContributionForm } from './ContributionForm'
import { ProposalCreationForm } from './ProposalCreationForm'
import { RatingForm } from './RatingForm'

export const OpenSurveySection = ({
  status,
}: StatefulOpenSurveySectionProps) => {
  const { t } = useTranslation()
  const { coreAddress } = useDaoInfoContext()
  const { bech32_prefix: bech32Prefix } = useChain()
  const { daoSubpathComponents, goToDao } = useDaoNavHelpers()

  // Show contribution form if `submit` subpath is present and the currently
  // open survey is inactive or accepting contributions.
  const showContributionForm =
    daoSubpathComponents[0] === WidgetId.RetroactiveCompensation &&
    daoSubpathComponents[1] === 'submit' &&
    (status.survey.status === SurveyStatus.Inactive ||
      status.survey.status === SurveyStatus.AcceptingContributions)
  const setShowContributionForm = useCallback(
    (show: boolean) =>
      goToDao(
        coreAddress,
        WidgetId.RetroactiveCompensation + (show ? `/submit` : ''),
        undefined,
        {
          shallow: true,
        }
      ),
    [coreAddress, goToDao]
  )

  const { isWalletConnected } = useWallet()
  // Voting power at time of survey creation, which determines what access level
  // this wallet has.
  const { isMember = false } = useMembership({
    coreAddress,
    blockHeight: status.survey.createdAtBlockHeight,
  })

  const [loading, setLoading] = useState(false)
  const [ratingFormData, setRatingFormData] = useState<ContributionRatingData>()
  const [weightByVotingPower, setWeightByVotingPower] = useState<boolean>(true)
  const [proposalCreationFormData, setProposalCreationFormData] =
    useState<CompleteRatings>()

  const postRequest = usePostRequest()

  const loadRatingFormData = useCallback(async () => {
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

      setRatingFormData({
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

  const [ratingsResponse, setRatingsResponse] =
    useState<RatingsResponseWithIdentities>()

  const updateProposalCreationFormData = useCallback(
    (response: RatingsResponseWithIdentities | undefined = ratingsResponse) => {
      if (!response) {
        return
      }

      const { contributions: _contributions, ratings } = response

      // Get max voting power so we can normalize weights.
      const maxVotingPower = ratings.length
        ? Math.max(...ratings.map((r) => Number(r.raterVotingPower)))
        : 0

      // Compute compensation.
      const compensationPerContribution = computeCompensation(
        _contributions.map(({ id }) => id),
        ratings.flatMap((rating) => {
          // Normalize a rater's ratings to be between 0 and 100, where 100 is
          // the highest score they gave. If they ranked everyone 20, then
          // they will all be normalized to 100.
          const maxPerAttribute = status.survey.attributes.map((_, index) =>
            Math.max(
              0,
              ...rating.contributions.map(
                ({ attributes }) => attributes[index] || 0
              )
            )
          )

          return rating.contributions.map(({ id, attributes }) => ({
            contributionId: id,
            // Normalize weights to prevent them from getting too large and
            // causing an overflow when summed together.
            weight: weightByVotingPower
              ? maxVotingPower === 0
                ? 0
                : Number(rating.raterVotingPower) / maxVotingPower
              : // Set weight to 1 if not weighting by voting power.
                1,
            attributes: attributes.map((attribute, i) =>
              attribute === null
                ? null
                : maxPerAttribute[i] === 0
                ? 0
                : (attribute / maxPerAttribute[i]) * 100
            ),
          }))
        }),
        status.survey.attributes
      )

      const contributions = _contributions.map(
        (c, index): ContributionWithCompensation => ({
          ...c,
          compensation: compensationPerContribution[index],
        })
      )

      const cosmosMsgs: UnifiedCosmosMsg[] = contributions.flatMap(
        ({ contributor, compensation }) =>
          compensation.compensationPerAttribute.flatMap(
            ({ nativeTokens, cw20Tokens }): UnifiedCosmosMsg[] => [
              ...nativeTokens
                .filter(({ amount }) => amount !== '0')
                .map(
                  ({ denomOrAddress, amount }): UnifiedCosmosMsg => ({
                    bank: makeBankMessage(
                      amount,
                      contributor.address,
                      denomOrAddress
                    ),
                  })
                ),
              ...cw20Tokens
                .filter(({ amount }) => amount !== '0')
                .map(
                  ({ denomOrAddress, amount }): UnifiedCosmosMsg =>
                    makeWasmMessage({
                      wasm: {
                        execute: {
                          contract_addr: denomOrAddress,
                          funds: [],
                          msg: {
                            transfer: {
                              recipient: contributor.address,
                              amount,
                            },
                          },
                        },
                      },
                    })
                ),
            ]
          )
      )

      const completeRatings: CompleteRatings = {
        contributions,
        ratings,
        cosmosMsgs,
      }

      setProposalCreationFormData(completeRatings)
    },
    [ratingsResponse, status.survey.attributes, weightByVotingPower]
  )

  const loadRatingsAndProposalCreationFormData = useCallback(async () => {
    setLoading(true)

    try {
      // Fetch ratings.
      const response: RatingsResponse = await postRequest(
        `/${coreAddress}/ratings`
      )

      // Get addresses for contributor and rater public keys.
      const [contributions, ratings] = await Promise.all([
        Promise.all(
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
        ),
        Promise.all(
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
        ),
      ])

      const responseWithIdentities: RatingsResponseWithIdentities = {
        contributions,
        ratings,
      }

      setRatingsResponse(responseWithIdentities)
      updateProposalCreationFormData(responseWithIdentities)
    } catch (err) {
      console.error(err)
      toast.error(err instanceof Error ? err.message : JSON.stringify(err))
    } finally {
      setLoading(false)
    }
  }, [bech32Prefix, coreAddress, updateProposalCreationFormData, postRequest])

  // If proposal creation form data is defined and weight by vote power changes,
  // recompute based on same ratings response.
  useEffect(() => {
    if (!proposalCreationFormData) {
      return
    }

    updateProposalCreationFormData()

    // Only update when weight by voting power changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weightByVotingPower])

  const onClick =
    status.survey.status === SurveyStatus.Inactive ||
    status.survey.status === SurveyStatus.AcceptingContributions
      ? () => setShowContributionForm(true)
      : isMember
      ? status.survey.status === SurveyStatus.AcceptingRatings
        ? loadRatingFormData
        : status.survey.status === SurveyStatus.AwaitingCompletion
        ? loadRatingsAndProposalCreationFormData
        : undefined
      : undefined

  const tooltip = isMember
    ? undefined
    : status.survey.status === SurveyStatus.AcceptingRatings ||
      status.survey.status === SurveyStatus.AwaitingCompletion
    ? t('info.submissionsBeingRated')
    : undefined

  return (status.survey.status === SurveyStatus.Inactive ||
    status.survey.status === SurveyStatus.AcceptingContributions) &&
    showContributionForm ? (
    <div className="pb-10">
      <ContributionForm />
    </div>
  ) : status.survey.status === SurveyStatus.AcceptingRatings &&
    isMember &&
    ratingFormData ? (
    <div className="pb-10">
      <RatingForm data={ratingFormData} reloadData={loadRatingFormData} />
    </div>
  ) : status.survey.status === SurveyStatus.AwaitingCompletion &&
    isMember &&
    proposalCreationFormData ? (
    <div className="pb-10">
      <ProposalCreationForm
        data={proposalCreationFormData}
        setWeightByVotingPower={setWeightByVotingPower}
        weightByVotingPower={weightByVotingPower}
      />
    </div>
  ) : (
    <StatelessOpenSurveySection
      connected={isWalletConnected}
      isMember={isMember}
      loading={loading}
      onClick={onClick}
      status={status}
      tooltip={tooltip}
    />
  )
}
