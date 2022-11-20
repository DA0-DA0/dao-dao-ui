export enum SurveyStatus {
  Inactive = 'inactive',
  AcceptingContributions = 'accepting_contributions',
  AcceptingRankings = 'accepting_rankings',
  AwaitingCompletion = 'awaiting_completion',
  Complete = 'complete',
}

export interface Attribute {
  name: string
  nativeTokens: {
    denom: string
    amount: string
  }[]
  cw20Tokens: {
    address: string
    amount: string
  }[]
}

export interface Survey {
  status: string
  name: string
  contributionsOpenAt: string
  contributionsCloseRankingsOpenAt: string
  rankingsCloseAt: string
  contributionDescription: string
  rankingDescription: string
  attributes: Attribute[]
}

export type NewSurvey = Omit<Survey, 'status'>

export interface Status {
  survey: Survey
  contributed: boolean
  ranked: boolean
}
