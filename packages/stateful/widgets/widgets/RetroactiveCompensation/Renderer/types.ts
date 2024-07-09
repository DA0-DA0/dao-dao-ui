import { UnifiedCosmosMsg } from '@dao-dao/types'

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
  createdAtBlockHeight: number
}

export type NewSurveyRequest = Omit<Survey, 'status' | 'createdAtBlockHeight'>

export interface NewSurveyFormData
  extends Omit<NewSurveyRequest, 'attributes'> {
  // Combine native and CW20 tokens into one, and uncombine before submitting.
  attributes: {
    name: string
    tokens: AnyToken[]
  }[]
}

export interface Status {
  survey: Survey
  contribution: string | null
  contributionSelfRatings: (number | null)[] | null
  rated: boolean
}

export interface CompletedSurveyListing {
  id: number
  name: string
  contributionCount: number
  contributionsOpenedAt: string
  proposalId: string
  createdAtBlockHeight: number
}

export interface ContributionRating {
  contributionId: number
  /**
   * Weight can be any number. The computation utility function normalizes
   * weights so that the output weighted averages are in the range [0, 100].
   */
  weight: number
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
  ratings: (number | null)[] | null
  createdAt: string
  updatedAt: string
}

export interface Contribution
  extends Omit<ContributionResponse, 'contributor'> {
  contributor: Identity
}

export interface RatingResponse {
  rater: string
  raterVotingPower: string
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

export type RatingsResponseWithIdentities = {
  contributions: Contribution[]
  ratings: Rating[]
}

export interface ContributionCompensation {
  contributionId: number
  compensationPerAttribute: {
    averageRating: number
    nativeTokens: AnyToken[]
    cw20Tokens: AnyToken[]
  }[]
}

export interface ContributionWithCompensation extends Contribution {
  compensation: ContributionCompensation
}

export interface CompleteRatings {
  contributions: ContributionWithCompensation[]
  ratings: Rating[]
  cosmosMsgs: UnifiedCosmosMsg[]
}

export type CompletedSurvey = Omit<Survey, 'status'> & {
  id: number
  contributions: ContributionResponse[]
  ratings: RatingResponse[]
}

export interface StatefulOpenSurveySectionProps {
  status: Status
}

export type ContributionFormData = {
  contribution: string
  images?: {
    url?: string
  }[]
  ratings: (number | null)[]
}
