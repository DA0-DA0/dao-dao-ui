import { ComponentType } from 'react'

import { Account } from './account'
import { ChainId, Validator } from './chain'
import {
  ButtonLinkProps,
  ButtonPopupSection,
  ButtonPopupSectionButton,
  StatefulEntityDisplayProps,
} from './components'
import { TokenInfoResponse } from './contracts/Cw20Base'
import { LoadingData, LoadingDataWithError } from './misc'

export enum TokenType {
  Native = 'native',
  Cw20 = 'cw20',
  Cw721 = 'cw721',
}

export type GenericTokenSource = Pick<
  GenericToken,
  'chainId' | 'type' | 'denomOrAddress'
>

// A native or CW20 token.
export type GenericToken = {
  /**
   * What chain this token exists on.
   */
  chainId: string
  /**
   * The type of this token.
   */
  type: TokenType
  /**
   * The native denom or contract address for this token. Denom when type is
   * native, and contract address when type is cw20/cw721.
   */
  denomOrAddress: string
  /**
   * SNIP-20 code hash if isSecretNetwork(chainId) && type === TokenType.Cw20
   */
  snip20CodeHash?: string | null
  /**
   * The symbol for this token.
   */
  symbol: string
  /**
   * The decimals for this token.
   */
  decimals: number
  /**
   * The image URL for this token.
   */
  imageUrl: string | undefined
  /**
   * The source chain and base denom. For IBC assets, this should differ from
   * the main fields. If the source chain ID is the same as the main chain ID,
   * then the type and denomOrAddress should be the same too.
   */
  source: GenericTokenSource
}

export type GenericTokenWithUsdPrice = {
  token: GenericToken
  usdPrice?: number
  timestamp?: Date
}

export type GenericTokenBalance = {
  token: GenericToken
  balance: string
  // Whether or not this is the governance token in the related context.
  isGovernanceToken?: boolean
  // Whether or not this is staked.
  staked?: boolean
  // Whether or not this is unstaking.
  unstaking?: boolean
}

export type GenericTokenBalanceWithOwner = GenericTokenBalance & {
  owner: Account
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
  usdUnitPrice: GenericTokenWithUsdPrice | undefined
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
  owner: Account
  token: GenericToken
  isGovernanceToken: boolean
  subtitle?: string
  unstakedBalance: number
  // Only native tokens load staking info for now, so let's show a nice loader.
  hasStakingInfo: boolean
  lazyInfo: LoadingData<TokenCardLazyInfo>
  // If defined, adds a color indicator.
  color?: string
  /**
   * Whether or not to hide the chain icon on tokens.
   */
  hideChainIcon?: boolean
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

/**
 * Packet-forward-middleware memo field for transfer messages.
 * (https://github.com/cosmos/ibc-apps/tree/main/middleware/packet-forward-middleware#intermediate-receivers)
 */
export type PfmMemo = {
  forward: {
    receiver: string
    port: string
    channel: string
    timeout?: string
    retries?: number
    // Parsed from JSON-stringified PfmMemo if needed (field can be a JSON
    // string or an object).
    next?: PfmMemo
  }
}

export type TokenInfoResponseWithAddressAndLogo = TokenInfoResponse & {
  address: string
  logoUrl?: string
}

export type AmountWithTimestamp = {
  amount: number
  timestamp: Date
}

export enum TokenPriceHistoryRange {
  Year = 'year',
  Month = 'month',
  Week = 'week',
  Day = 'day',
}
