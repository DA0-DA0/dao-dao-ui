import { Validator } from './chain'
import { AmountWithTimestamp } from './state'
import { LoadingData } from './stateless'

export enum TokenType {
  Native = 'native',
  Cw20 = 'cw20',
  Cw721 = 'cw721',
}

// A native or CW20 token.
export type GenericToken = {
  type: TokenType
  denomOrAddress: string
  symbol: string
  decimals: number
  imageUrl: string | undefined
}

export type GenericTokenBalance = {
  token: GenericToken
  balance: string
  isGovernanceToken?: boolean
}

export enum UnstakingTaskStatus {
  Unstaking = 'unstaking',
  ReadyToClaim = 'readyToClaim',
  Claimed = 'claimed',
}

export type UnstakingTask = {
  token: GenericToken
  status: UnstakingTaskStatus
  amount: number
  // If unstaking or ready to claim, date it will be/was unstaked.
  // If claimed, date it was claimed.
  date?: Date
}

export type TokenStake = {
  token: GenericToken
  validator: Validator
  amount: number
  rewards: number
}

export type TokenCardLazyInfo = {
  usdUnitPrice: AmountWithTimestamp | undefined
  stakingInfo:
    | {
        unstakingTasks: UnstakingTask[]
        unstakingDurationSeconds: number | undefined
        stakes: TokenStake[]
      }
    | undefined
}

export type TokenCardInfo = {
  token: GenericToken
  isGovernanceToken: boolean
  subtitle?: string
  unstakedBalance: number
  // Only native tokens load staking info for now, so let's show a nice loader.
  hasStakingInfo: boolean
  lazyInfo: LoadingData<TokenCardLazyInfo>
}
