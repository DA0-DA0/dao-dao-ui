import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { useDaoInfoContext } from '@dao-dao/stateless'
import { CosmosMsgFor_Empty } from '@dao-dao/types'
import {
  makeBankMessage,
  makeWasmMessage,
  secp256k1PublicKeyToBech32Address,
} from '@dao-dao/utils'

import { useVotingModule } from '../../../../../hooks/useVotingModule'
import { usePostRequest } from '../../hooks/usePostRequest'
import {
  CompleteRatings,
  Contribution,
  ContributionRating,
  ContributionResponse,
  ContributionWithCompensation,
  Rating,
  RatingsResponse,
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
  const { coreAddress, bech32Prefix } = useDaoInfoContext()

  const { isMember = false } = useVotingModule(coreAddress, {
    fetchMembership: true,
    blockHeight: status.survey.createdAtBlockHeight,
  })

  const [loading, setLoading] = useState(false)
  const [showContributionForm, setShowContributionForm] = useState(false)
  const [ratingFormData, setRatingFormData] = useState<ContributionRatingData>()
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

  const loadProposalCreationFormData = useCallback(async () => {
    setLoading(true)

    try {
      // Fetch ratings.
      const response: RatingsResponse = await postRequest(
        `/${coreAddress}/ratings`
      )

      // Compute compensation.
      const compensationPerContribution = computeCompensation(
        response.contributions.map(({ id }) => id),
        response.ratings.flatMap((rating) =>
          rating.contributions.map(({ id, attributes }) => ({
            contributionId: id,
            attributes,
          }))
        ),
        status.survey.attributes
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

            const compensation = compensationPerContribution[contributionIndex]

            return {
              ...contribution,
              contributor: {
                publicKey,
                address,
              },
              compensation,
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

      const cosmosMsgs: CosmosMsgFor_Empty[] = contributions.flatMap(
        ({ contributor, compensation }) =>
          compensation.compensationPerAttribute.flatMap(
            ({ nativeTokens, cw20Tokens }): CosmosMsgFor_Empty[] => [
              ...nativeTokens.map(
                ({ amount, denom }): CosmosMsgFor_Empty => ({
                  bank: makeBankMessage(amount, contributor.address, denom),
                })
              ),
              ...cw20Tokens.map(
                ({ amount, address }): CosmosMsgFor_Empty =>
                  makeWasmMessage({
                    wasm: {
                      execute: {
                        contract_addr: address,
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
    } catch (err) {
      console.error(err)
      toast.error(err instanceof Error ? err.message : JSON.stringify(err))
    } finally {
      setLoading(false)
    }
  }, [bech32Prefix, coreAddress, postRequest, status.survey.attributes])

  const onClick =
    status.survey.status === SurveyStatus.Inactive ||
    status.survey.status === SurveyStatus.AcceptingContributions
      ? () => setShowContributionForm(true)
      : isMember
      ? status.survey.status === SurveyStatus.AcceptingRatings
        ? loadRatingFormData
        : status.survey.status === SurveyStatus.AwaitingCompletion
        ? loadProposalCreationFormData
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
      <ProposalCreationForm data={proposalCreationFormData!} />
    </div>
  ) : (
    <StatelessOpenSurveySection
      isMember={isMember}
      loading={loading}
      onClick={onClick}
      status={status}
      tooltip={tooltip}
    />
  )
}
