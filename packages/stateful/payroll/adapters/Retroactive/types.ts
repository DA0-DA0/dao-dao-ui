export enum SurveyStatus {
  Inactive = 'inactive',
  AcceptingContributions = 'accepting_contributions',
  AcceptingRatings = 'accepting_ratings',
  AwaitingCompletion = 'awaiting_completion',
  Complete = 'complete',
}

export interface NativeToken {
  denom: string
  amount: string
}

export interface Cw20Token {
  address: string
  amount: string
}

export interface Attribute {
  name: string
  nativeTokens: NativeToken[]
  cw20Tokens: Cw20Token[]
}

export interface AnyToken {
  denomOrAddress: string
  amount: string
}

export interface Survey {
  status: string
  name: string
  contributionsOpenAt: string
  contributionsCloseRatingsOpenAt: string
  ratingsCloseAt: string
  contributionInstructions: string
  ratingInstructions: string
  attributes: Attribute[]
}

export type NewSurveyRequest = Omit<Survey, 'status'>

export interface NewSurveyFormData
  extends Omit<NewSurveyRequest, 'attributes'> {
  // Combine native and CW20 tokens into one, and uncombine before submitting.
  attributes: {
    name: string
    tokens: AnyToken[]
  }[]
}

export type LoadedCompletedSurvey = Omit<Survey, 'status'> & {
  // Only present for DAO members.
  contributions:
    | {
        id: number
        contributor: string
        content: string
        createdAt: string
        updatedAt: string
      }[]
    | undefined
  // Only present for DAO members.
  ratings:
    | {
        rater: string
        contributions: {
          contributor: string
          content: string
          // The position matches the position in the survey's attributes list.
          attributes: (number | null)[]
        }[]
      }[]
    | undefined
}

export interface Status {
  survey: Survey
  contribution: string | null
  rated: boolean
}

export interface CompletedSurvey {
  id: number
  name: string
  contributionCount: number
  openedAt: string
}

export interface ContributionRating {
  contributionId: number
  // The position matches the position in the survey's attributes list.
  attributes: (number | null)[]
}

export interface RatingsFormData {
  ratings: ContributionRating[]
}

export interface Identity {
  publicKey: string
  address: string
}

export interface ContributionResponse {
  id: number
  contributor: string
  content: string
  createdAt: string
  updatedAt: string
}

export interface Contribution
  extends Omit<ContributionResponse, 'contributor'> {
  contributor: Identity
}

export interface RatingResponse {
  rater: string
  contributions: {
    id: number
    // The position matches the position in the survey's attributes list.
    attributes: (number | null)[]
  }[]
}

export interface Rating extends Omit<RatingResponse, 'rater'> {
  rater: Identity
}

export interface RatingsResponse {
  contributions: ContributionResponse[]
  ratings: RatingResponse[]
}

export interface ContributionWithCompensation extends Contribution {
  averageRatingPerAttribute: number[]
  tokens: AnyToken[]
}

export interface CompleteRatings {
  contributions: ContributionWithCompensation[]
  ratings: Rating[]
}
