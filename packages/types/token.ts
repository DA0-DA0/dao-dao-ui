import { ComponentType } from 'react'

import { ChainId, Validator } from './chain'
import {
  ButtonLinkProps,
  ButtonPopupSection,
  ButtonPopupSectionButton,
  LoadingData,
  LoadingDataWithError,
  StatefulEntityDisplayProps,
} from './components'
import { DaoAccountType } from './dao'
import { AmountWithTimestamp } from './state'

export enum TokenType {
  Native = 'native',
  Cw20 = 'cw20',
  Cw721 = 'cw721',
}

// A native or CW20 token.
export type GenericToken = {
  // What chain this token lives on.
  chainId: string
  type: TokenType
  denomOrAddress: string
  symbol: string
  decimals: number
  imageUrl: string | undefined
  // The source chain and base denom. For IBC assets, this should differ from
  // the main fields.
  source: {
    chainId: string
    denomOrAddress: string
  }
}

export type GenericTokenWithUsdPrice = {
  token: GenericToken
  usdPrice?: number
  timestamp?: Date
}

export type GenericTokenBalance = {
  token: GenericToken
  balance: string
  isGovernanceToken?: boolean
}

export type LooseGenericToken = Pick<
  GenericToken,
  'chainId' | 'denomOrAddress'
> & {
  type: TokenType | string
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
        totalStaked: number
        totalPendingRewards: number
        totalUnstaking: number
      }
    | undefined
  // unstakedBalance + totalStaked + totalUnstaking
  totalBalance: number
  // Display DAOs that the token is used as governance in, and optionally an
  // amount of staked tokens. This is used to display how much a wallet has
  // staked.
  daosGoverned?: {
    coreAddress: string
    stakingContractAddress: string
    stakedBalance?: number
  }[]
}

export type TokenCardInfo = {
  owner: string
  // If this is token is owned by a DAO account, this is the type of the account
  // that owns it.
  daoOwnerType?: DaoAccountType
  token: GenericToken
  isGovernanceToken: boolean
  subtitle?: string
  unstakedBalance: number
  // Only native tokens load staking info for now, so let's show a nice loader.
  hasStakingInfo: boolean
  lazyInfo: LoadingData<TokenCardLazyInfo>
}

export type TokenCardProps = TokenCardInfo & {
  refreshUnstakingTasks?: () => void
  onClaim?: () => void
  ButtonLink: ComponentType<ButtonLinkProps>
  EntityDisplay: ComponentType<StatefulEntityDisplayProps>
  // Actions to display in the button popup.
  actions?: {
    // Actions to add in the token section. By default, this will include copy
    // address and add to wallet, if a cw20 token.
    token?: ButtonPopupSectionButton[]
    // Extra sections to add to the action popup.
    extraSections?: ButtonPopupSection[]
  }
}

export type TokenLineProps<T extends TokenCardInfo = TokenCardInfo> = T & {
  transparentBackground?: boolean
  TokenCard: ComponentType<T>
}

// Map chain ID to loading tokens on that chain.
export type LoadingTokens<T extends TokenCardInfo = TokenCardInfo> = Partial<
  Record<ChainId | string, LoadingDataWithError<T[]>>
>

export type DaoTokenCardProps = TokenCardInfo & {
  // Hide extra actions, like stake, unstake, and claim.
  noExtraActions?: boolean
}
