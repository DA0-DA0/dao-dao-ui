import { BigNumber } from 'bignumber.js'

import {
  AnyToken,
  Attribute,
  ContributionCompensation,
  ContributionFormData,
  ContributionRating,
  SurveyWithMetadata,
} from './types'

// Distribute compensation per survey attribute among the contributions
// according to the weighted average ratings. Output array matches the order of
// contributonIds input.
export const computeCompensation = (
  contributionIds: number[],
  ratings: ContributionRating[],
  surveyAttributes: Attribute[]
): ContributionCompensation[] => {
  // Compute average of ratings for contributions for each attribute.
  const contributionsWithAverageRatings = contributionIds.map(
    (contributionId) => {
      const contributionRatings = ratings.filter(
        (rating) => rating.contributionId === contributionId
      )
      // Sum weight per attribute, ignoring weights for abstains.
      const totalWeightPerAttribute = surveyAttributes.map((_, index) =>
        contributionRatings.reduce(
          (sum, rating) =>
            rating.attributes[index] === null ? sum : sum + rating.weight,
          0
        )
      )

      // Each item is an array of attribute ratings for this contributor. The
      // order of attributes matches the attribute order in the survey.
      const weightedAttributeRatings = contributionRatings.map((rating) =>
        rating.attributes.map((a, i) =>
          a === null ? a : (a * rating.weight) / totalWeightPerAttribute[i]
        )
      )

      // Weighted average attribute rating for each attribute. If the ratings
      // were [50, 100] with equal weight, the average is 75. If the ratings
      // were [null, 50], the average is 50. If the ratings were [null, null],
      // the average is 0.
      const averageAttributeRatings = surveyAttributes.map(
        (_, attributeIndex) => {
          const nonAbstainRatings = weightedAttributeRatings
            .map((ratings) => ratings[attributeIndex])
            .filter((rating) => typeof rating === 'number') as number[]

          // If all ratings are abstain, return 0.
          return nonAbstainRatings.length === 0
            ? 0
            : // Otherwise, add together since weight was applied before.
              nonAbstainRatings.reduce((sum, rating) => sum + rating, 0)
        }
      )

      return averageAttributeRatings
    }
  )

  // Compute total of averages for each attribute.
  const totalsOfAverages = surveyAttributes.map((_, attributeIndex) =>
    contributionsWithAverageRatings.reduce(
      (sum, averageAttributeRatings) =>
        sum + averageAttributeRatings[attributeIndex],
      0
    )
  )

  // Compute compensation for each contribution per attribute.
  const compensationPerContribution = contributionIds.map(
    (contributionId, contributionIndex) => {
      const averageRatingPerAttribute =
        contributionsWithAverageRatings[contributionIndex]

      // Compute compensation for each attribute.
      const compensationPerAttribute = surveyAttributes.map(
        (attribute, attributeIndex) => {
          const averageRating = averageRatingPerAttribute[attributeIndex]
          const totalOfAverages = totalsOfAverages[attributeIndex]
          const proportionalCompensation =
            totalOfAverages === 0 ? 0 : averageRating / totalOfAverages

          const nativeTokens = attribute.nativeTokens.map(
            ({ denom, amount }): AnyToken => ({
              denomOrAddress: denom,
              amount: BigNumber(amount)
                .times(proportionalCompensation)
                .integerValue(BigNumber.ROUND_FLOOR)
                .toString(),
            })
          )

          const cw20Tokens = attribute.cw20Tokens.map(
            ({ address, amount }): AnyToken => ({
              denomOrAddress: address,
              amount: BigNumber(amount)
                .times(proportionalCompensation)
                .integerValue(BigNumber.ROUND_FLOOR)
                .toString(),
            })
          )

          return {
            averageRating,
            nativeTokens,
            cw20Tokens,
          }
        }
      )

      return {
        contributionId,
        compensationPerAttribute,
      }
    }
  )

  return compensationPerContribution
}

/**
 * Prepare contribution form data by removing files that don't have all the
 * fields set and removing the image field.
 */
export const prepareContributionFormData = <D extends ContributionFormData>(
  data: D
): D => ({
  ...data,
  files: data.files.flatMap(({ image: _, ...file }) =>
    file.name && file.url && file.mimetype ? file : []
  ),
})

/**
 * Extract contribution form data from survey.
 */
export const extractContributionFormDataFromSurvey = ({
  survey: { attributes },
  contribution,
}: SurveyWithMetadata): ContributionFormData => ({
  contribution: contribution?.content || '',
  files:
    contribution?.files?.map((f) => ({
      ...f,
      image: f.mimetype.startsWith('image'),
    })) || [],
  ratings: contribution?.selfRatings || attributes.map(() => null),
})
