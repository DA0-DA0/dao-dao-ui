import { UnifiedCosmosMsg } from '@dao-dao/types'

export enum SurveyStatus {
  Inactive = 'inactive',
  AcceptingContributions = 'accepting_contributions',
  AcceptingRatings = 'accepting_ratings',
  AwaitingCompletion = 'awaiting_completion',
  Complete = 'complete',
}

export type NativeToken = {
  denom: string
  amount: string
}

export type Cw20Token = {
  address: string
  amount: string
}

export type Attribute = {
  name: string
  nativeTokens: NativeToken[]
  cw20Tokens: Cw20Token[]
}

export type AnyToken = {
  denomOrAddress: string
  amount: string
}

export type Survey = {
  uuid: string
  status: SurveyStatus
  name: string
  creatorPublicKey: string
  contributionsOpenAt: string
  contributionsCloseRatingsOpenAt: string
  ratingsCloseAt: string
  contributionInstructions: string
  ratingInstructions: string
  attributes: Attribute[]
  proposalId: string | null
  createdAtBlockHeight: number
  contributionCount: number
}

export type NewSurveyRequest = Omit<Survey, 'status' | 'createdAtBlockHeight'>

export type NewSurveyFormData = Omit<NewSurveyRequest, 'attributes'> & {
  // Combine native and CW20 tokens into one, and uncombine before submitting.
  attributes: {
    name: string
    tokens: AnyToken[]
  }[]
}

export type ContributionFile = {
  name: string
  url: string
  mimetype: string
}

/**
 * Survey with extra metadata about the requesting user's relationship to the
 * survey.
 */
export type SurveyWithMetadata = {
  survey: Survey
  contribution: {
    content: string
    files: ContributionFile[] | null
    selfRatings: (number | null)[] | null
  } | null
  rated: boolean
}

export type ContributionRating = {
  contributionId: number
  /**
   * Weight can be any number. The computation utility function normalizes
   * weights so that the output weighted averages are in the range [0, 100].
   */
  weight: number
  // The position matches the position in the survey's attributes list.
  attributes: (number | null)[]
}

export type RatingsFormData = {
  ratings: ContributionRating[]
}

export type Identity = {
  publicKey: string
  address: string
}

export type ContributionResponse = {
  id: number
  contributor: string
  content: string
  files: ContributionFile[] | null
  ratings: (number | null)[] | null
  createdAt: string
  updatedAt: string
}

export type Contribution = Omit<ContributionResponse, 'contributor'> & {
  contributor: Identity
}

export type RatingResponse = {
  rater: string
  raterVotingPower: string
  contributions: {
    id: number
    // The position matches the position in the survey's attributes list.
    attributes: (number | null)[]
  }[]
}

export type Rating = Omit<RatingResponse, 'rater'> & {
  rater: Identity
}

export type RatingsResponse = {
  contributions: ContributionResponse[]
  ratings: RatingResponse[]
}

export type RatingsResponseWithIdentities = {
  contributions: Contribution[]
  ratings: Rating[]
}

export type ContributionCompensation = {
  contributionId: number
  compensationPerAttribute: {
    averageRating: number
    nativeTokens: AnyToken[]
    cw20Tokens: AnyToken[]
  }[]
}

export type ContributionWithCompensation = Contribution & {
  compensation: ContributionCompensation
}

export type CompleteRatings = {
  contributions: ContributionWithCompensation[]
  ratings: Rating[]
  cosmosMsgs: UnifiedCosmosMsg[]
}

export type CompletedSurvey = Survey & {
  id: number
  contributions: ContributionResponse[]
  ratings: RatingResponse[]
}

export type ContributionFormData = {
  contribution: string
  files: Partial<
    ContributionFile & {
      image: boolean
    }
  >[]
  ratings: (number | null)[]
}

export enum PagePath {
  Home = '',
  Create = 'create',
  View = 's',
}

export type StatefulSurveyRowProps = {
  /**
   * The active survey.
   */
  survey: SurveyWithMetadata
}
