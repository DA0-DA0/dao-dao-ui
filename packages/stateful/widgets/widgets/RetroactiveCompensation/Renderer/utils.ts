import {
  AnyToken,
  Attribute,
  ContributionCompensation,
  ContributionRating,
} from './types'

// Distribute compensation per survey attribute among the contributions
// according to the average ratings. Output array matches the order of
// contributonIds input.
export const computeCompensation = (
  contributionIds: number[],
  ratings: ContributionRating[],
  surveyAttributes: Attribute[]
): ContributionCompensation[] => {
  // Compute average of ratings for contributions for each attribute.
  const contributionsWithAverageRatings = contributionIds.map(
    (contributionId) => {
      // Each item is an array of attribute ratings for this contributor. The
      // order of attributes matches the attribute order in the survey.
      const attributeRatings = ratings
        .filter((rating) => rating.contributionId === contributionId)
        .map((rating) => rating.attributes)

      // Average attribute rating for each attribute. If the ratings were
      // [50, 100], the average is 75. If the ratings were [null, 50], the
      // average is 50. If the ratings were [null, null], the average is 0.
      const averageAttributeRatings = surveyAttributes.map(
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
              amount: Math.floor(
                Number(amount) * proportionalCompensation
              ).toString(),
            })
          )

          const cw20Tokens = attribute.cw20Tokens.map(
            ({ address, amount }): AnyToken => ({
              denomOrAddress: address,
              amount: Math.floor(
                Number(amount) * proportionalCompensation
              ).toString(),
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
