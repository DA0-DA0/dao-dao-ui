import {
  AnyToken,
  Attribute,
  ContributionCompensation,
  ContributionFormData,
  ContributionRating,
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
              amount: BigInt(
                Math.floor(Number(amount) * proportionalCompensation)
              ).toString(),
            })
          )

          const cw20Tokens = attribute.cw20Tokens.map(
            ({ address, amount }): AnyToken => ({
              denomOrAddress: address,
              amount: BigInt(
                Math.floor(Number(amount) * proportionalCompensation)
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

/**
 * Prepare contribution form data by combining text and images into the
 * contribution text and removing the images.
 */
export const prepareContributionFormData = <D extends ContributionFormData>(
  data: D
): D => {
  const formData: D = {
    ...data,
    // Add Markdown image lines to bottom of contribution if they exist.
    contribution: [
      data.contribution,
      data.images?.flatMap(({ url }) => `![${url}](${url})` || []).join('\n'),
    ]
      .filter(Boolean)
      .join('\n\n'),
  }
  delete formData.images
  return formData
}
