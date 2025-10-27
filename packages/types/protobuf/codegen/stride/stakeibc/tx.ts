//@ts-nocheck
import { Validator, ValidatorAmino, ValidatorSDKType } from "./validator";
import { Coin, CoinAmino, CoinSDKType } from "../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../binary";
import { Decimal } from "@cosmjs/math";
export enum AuthzPermissionChange {
  /** GRANT - Grant the address trade permissions */
  GRANT = 0,
  /** REVOKE - Revoke trade permissions from the address */
  REVOKE = 1,
  UNRECOGNIZED = -1,
}
export const AuthzPermissionChangeSDKType = AuthzPermissionChange;
export const AuthzPermissionChangeAmino = AuthzPermissionChange;
export function authzPermissionChangeFromJSON(object: any): AuthzPermissionChange {
  switch (object) {
    case 0:
    case "GRANT":
      return AuthzPermissionChange.GRANT;
    case 1:
    case "REVOKE":
      return AuthzPermissionChange.REVOKE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return AuthzPermissionChange.UNRECOGNIZED;
  }
}
export function authzPermissionChangeToJSON(object: AuthzPermissionChange): string {
  switch (object) {
    case AuthzPermissionChange.GRANT:
      return "GRANT";
    case AuthzPermissionChange.REVOKE:
      return "REVOKE";
    case AuthzPermissionChange.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
export interface MsgUpdateInnerRedemptionRateBounds {
  creator: string;
  chainId: string;
  minInnerRedemptionRate: string;
  maxInnerRedemptionRate: string;
}
export interface MsgUpdateInnerRedemptionRateBoundsProtoMsg {
  typeUrl: "/stride.stakeibc.MsgUpdateInnerRedemptionRateBounds";
  value: Uint8Array;
}
export interface MsgUpdateInnerRedemptionRateBoundsAmino {
  creator?: string;
  chain_id?: string;
  min_inner_redemption_rate?: string;
  max_inner_redemption_rate?: string;
}
export interface MsgUpdateInnerRedemptionRateBoundsAminoMsg {
  type: "stakeibc/MsgUpdateRedemptionRateBounds";
  value: MsgUpdateInnerRedemptionRateBoundsAmino;
}
export interface MsgUpdateInnerRedemptionRateBoundsSDKType {
  creator: string;
  chain_id: string;
  min_inner_redemption_rate: string;
  max_inner_redemption_rate: string;
}
export interface MsgUpdateInnerRedemptionRateBoundsResponse {}
export interface MsgUpdateInnerRedemptionRateBoundsResponseProtoMsg {
  typeUrl: "/stride.stakeibc.MsgUpdateInnerRedemptionRateBoundsResponse";
  value: Uint8Array;
}
export interface MsgUpdateInnerRedemptionRateBoundsResponseAmino {}
export interface MsgUpdateInnerRedemptionRateBoundsResponseAminoMsg {
  type: "/stride.stakeibc.MsgUpdateInnerRedemptionRateBoundsResponse";
  value: MsgUpdateInnerRedemptionRateBoundsResponseAmino;
}
export interface MsgUpdateInnerRedemptionRateBoundsResponseSDKType {}
export interface MsgLiquidStake {
  creator: string;
  amount: string;
  hostDenom: string;
}
export interface MsgLiquidStakeProtoMsg {
  typeUrl: "/stride.stakeibc.MsgLiquidStake";
  value: Uint8Array;
}
export interface MsgLiquidStakeAmino {
  creator?: string;
  amount?: string;
  host_denom?: string;
}
export interface MsgLiquidStakeAminoMsg {
  type: "stakeibc/MsgLiquidStake";
  value: MsgLiquidStakeAmino;
}
export interface MsgLiquidStakeSDKType {
  creator: string;
  amount: string;
  host_denom: string;
}
export interface MsgLiquidStakeResponse {
  stToken: Coin | undefined;
}
export interface MsgLiquidStakeResponseProtoMsg {
  typeUrl: "/stride.stakeibc.MsgLiquidStakeResponse";
  value: Uint8Array;
}
export interface MsgLiquidStakeResponseAmino {
  st_token?: CoinAmino | undefined;
}
export interface MsgLiquidStakeResponseAminoMsg {
  type: "/stride.stakeibc.MsgLiquidStakeResponse";
  value: MsgLiquidStakeResponseAmino;
}
export interface MsgLiquidStakeResponseSDKType {
  st_token: CoinSDKType | undefined;
}
export interface MsgLSMLiquidStake {
  creator: string;
  amount: string;
  lsmTokenIbcDenom: string;
}
export interface MsgLSMLiquidStakeProtoMsg {
  typeUrl: "/stride.stakeibc.MsgLSMLiquidStake";
  value: Uint8Array;
}
export interface MsgLSMLiquidStakeAmino {
  creator?: string;
  amount?: string;
  lsm_token_ibc_denom?: string;
}
export interface MsgLSMLiquidStakeAminoMsg {
  type: "stakeibc/MsgLSMLiquidStake";
  value: MsgLSMLiquidStakeAmino;
}
export interface MsgLSMLiquidStakeSDKType {
  creator: string;
  amount: string;
  lsm_token_ibc_denom: string;
}
export interface MsgLSMLiquidStakeResponse {
  transactionComplete: boolean;
}
export interface MsgLSMLiquidStakeResponseProtoMsg {
  typeUrl: "/stride.stakeibc.MsgLSMLiquidStakeResponse";
  value: Uint8Array;
}
export interface MsgLSMLiquidStakeResponseAmino {
  transaction_complete?: boolean;
}
export interface MsgLSMLiquidStakeResponseAminoMsg {
  type: "/stride.stakeibc.MsgLSMLiquidStakeResponse";
  value: MsgLSMLiquidStakeResponseAmino;
}
export interface MsgLSMLiquidStakeResponseSDKType {
  transaction_complete: boolean;
}
export interface MsgClearBalance {
  creator: string;
  chainId: string;
  amount: string;
  channel: string;
}
export interface MsgClearBalanceProtoMsg {
  typeUrl: "/stride.stakeibc.MsgClearBalance";
  value: Uint8Array;
}
export interface MsgClearBalanceAmino {
  creator?: string;
  chain_id?: string;
  amount?: string;
  channel?: string;
}
export interface MsgClearBalanceAminoMsg {
  type: "stakeibc/MsgClearBalance";
  value: MsgClearBalanceAmino;
}
export interface MsgClearBalanceSDKType {
  creator: string;
  chain_id: string;
  amount: string;
  channel: string;
}
export interface MsgClearBalanceResponse {}
export interface MsgClearBalanceResponseProtoMsg {
  typeUrl: "/stride.stakeibc.MsgClearBalanceResponse";
  value: Uint8Array;
}
export interface MsgClearBalanceResponseAmino {}
export interface MsgClearBalanceResponseAminoMsg {
  type: "/stride.stakeibc.MsgClearBalanceResponse";
  value: MsgClearBalanceResponseAmino;
}
export interface MsgClearBalanceResponseSDKType {}
export interface MsgRedeemStake {
  creator: string;
  amount: string;
  hostZone: string;
  receiver: string;
}
export interface MsgRedeemStakeProtoMsg {
  typeUrl: "/stride.stakeibc.MsgRedeemStake";
  value: Uint8Array;
}
export interface MsgRedeemStakeAmino {
  creator?: string;
  amount?: string;
  host_zone?: string;
  receiver?: string;
}
export interface MsgRedeemStakeAminoMsg {
  type: "stakeibc/MsgRedeemStake";
  value: MsgRedeemStakeAmino;
}
export interface MsgRedeemStakeSDKType {
  creator: string;
  amount: string;
  host_zone: string;
  receiver: string;
}
export interface MsgRedeemStakeResponse {}
export interface MsgRedeemStakeResponseProtoMsg {
  typeUrl: "/stride.stakeibc.MsgRedeemStakeResponse";
  value: Uint8Array;
}
export interface MsgRedeemStakeResponseAmino {}
export interface MsgRedeemStakeResponseAminoMsg {
  type: "/stride.stakeibc.MsgRedeemStakeResponse";
  value: MsgRedeemStakeResponseAmino;
}
export interface MsgRedeemStakeResponseSDKType {}
/** next: 15 */
export interface MsgRegisterHostZone {
  connectionId: string;
  bech32prefix: string;
  hostDenom: string;
  ibcDenom: string;
  creator: string;
  transferChannelId: string;
  unbondingPeriod: bigint;
  minRedemptionRate: string;
  maxRedemptionRate: string;
  lsmLiquidStakeEnabled: boolean;
  communityPoolTreasuryAddress: string;
  maxMessagesPerIcaTx: bigint;
}
export interface MsgRegisterHostZoneProtoMsg {
  typeUrl: "/stride.stakeibc.MsgRegisterHostZone";
  value: Uint8Array;
}
/** next: 15 */
export interface MsgRegisterHostZoneAmino {
  connection_id?: string;
  bech32prefix?: string;
  host_denom?: string;
  ibc_denom?: string;
  creator?: string;
  transfer_channel_id?: string;
  unbonding_period?: string;
  min_redemption_rate?: string;
  max_redemption_rate?: string;
  lsm_liquid_stake_enabled?: boolean;
  community_pool_treasury_address?: string;
  max_messages_per_ica_tx?: string;
}
export interface MsgRegisterHostZoneAminoMsg {
  type: "stakeibc/MsgRegisterHostZone";
  value: MsgRegisterHostZoneAmino;
}
/** next: 15 */
export interface MsgRegisterHostZoneSDKType {
  connection_id: string;
  bech32prefix: string;
  host_denom: string;
  ibc_denom: string;
  creator: string;
  transfer_channel_id: string;
  unbonding_period: bigint;
  min_redemption_rate: string;
  max_redemption_rate: string;
  lsm_liquid_stake_enabled: boolean;
  community_pool_treasury_address: string;
  max_messages_per_ica_tx: bigint;
}
export interface MsgRegisterHostZoneResponse {}
export interface MsgRegisterHostZoneResponseProtoMsg {
  typeUrl: "/stride.stakeibc.MsgRegisterHostZoneResponse";
  value: Uint8Array;
}
export interface MsgRegisterHostZoneResponseAmino {}
export interface MsgRegisterHostZoneResponseAminoMsg {
  type: "/stride.stakeibc.MsgRegisterHostZoneResponse";
  value: MsgRegisterHostZoneResponseAmino;
}
export interface MsgRegisterHostZoneResponseSDKType {}
export interface MsgClaimUndelegatedTokens {
  creator: string;
  /** UserUnbondingRecords are keyed on {chain_id}.{epoch}.{receiver} */
  hostZoneId: string;
  epoch: bigint;
  receiver: string;
}
export interface MsgClaimUndelegatedTokensProtoMsg {
  typeUrl: "/stride.stakeibc.MsgClaimUndelegatedTokens";
  value: Uint8Array;
}
export interface MsgClaimUndelegatedTokensAmino {
  creator?: string;
  /** UserUnbondingRecords are keyed on {chain_id}.{epoch}.{receiver} */
  host_zone_id?: string;
  epoch?: string;
  receiver?: string;
}
export interface MsgClaimUndelegatedTokensAminoMsg {
  type: "stakeibc/MsgClaimUndelegatedTokens";
  value: MsgClaimUndelegatedTokensAmino;
}
export interface MsgClaimUndelegatedTokensSDKType {
  creator: string;
  host_zone_id: string;
  epoch: bigint;
  receiver: string;
}
export interface MsgClaimUndelegatedTokensResponse {}
export interface MsgClaimUndelegatedTokensResponseProtoMsg {
  typeUrl: "/stride.stakeibc.MsgClaimUndelegatedTokensResponse";
  value: Uint8Array;
}
export interface MsgClaimUndelegatedTokensResponseAmino {}
export interface MsgClaimUndelegatedTokensResponseAminoMsg {
  type: "/stride.stakeibc.MsgClaimUndelegatedTokensResponse";
  value: MsgClaimUndelegatedTokensResponseAmino;
}
export interface MsgClaimUndelegatedTokensResponseSDKType {}
export interface MsgRebalanceValidators {
  creator: string;
  hostZone: string;
  numRebalance: bigint;
}
export interface MsgRebalanceValidatorsProtoMsg {
  typeUrl: "/stride.stakeibc.MsgRebalanceValidators";
  value: Uint8Array;
}
export interface MsgRebalanceValidatorsAmino {
  creator?: string;
  host_zone?: string;
  num_rebalance?: string;
}
export interface MsgRebalanceValidatorsAminoMsg {
  type: "stakeibc/MsgRebalanceValidators";
  value: MsgRebalanceValidatorsAmino;
}
export interface MsgRebalanceValidatorsSDKType {
  creator: string;
  host_zone: string;
  num_rebalance: bigint;
}
export interface MsgRebalanceValidatorsResponse {}
export interface MsgRebalanceValidatorsResponseProtoMsg {
  typeUrl: "/stride.stakeibc.MsgRebalanceValidatorsResponse";
  value: Uint8Array;
}
export interface MsgRebalanceValidatorsResponseAmino {}
export interface MsgRebalanceValidatorsResponseAminoMsg {
  type: "/stride.stakeibc.MsgRebalanceValidatorsResponse";
  value: MsgRebalanceValidatorsResponseAmino;
}
export interface MsgRebalanceValidatorsResponseSDKType {}
export interface MsgAddValidators {
  creator: string;
  hostZone: string;
  validators: Validator[];
}
export interface MsgAddValidatorsProtoMsg {
  typeUrl: "/stride.stakeibc.MsgAddValidators";
  value: Uint8Array;
}
export interface MsgAddValidatorsAmino {
  creator?: string;
  host_zone?: string;
  validators?: ValidatorAmino[];
}
export interface MsgAddValidatorsAminoMsg {
  type: "stakeibc/MsgAddValidators";
  value: MsgAddValidatorsAmino;
}
export interface MsgAddValidatorsSDKType {
  creator: string;
  host_zone: string;
  validators: ValidatorSDKType[];
}
export interface MsgAddValidatorsResponse {}
export interface MsgAddValidatorsResponseProtoMsg {
  typeUrl: "/stride.stakeibc.MsgAddValidatorsResponse";
  value: Uint8Array;
}
export interface MsgAddValidatorsResponseAmino {}
export interface MsgAddValidatorsResponseAminoMsg {
  type: "/stride.stakeibc.MsgAddValidatorsResponse";
  value: MsgAddValidatorsResponseAmino;
}
export interface MsgAddValidatorsResponseSDKType {}
export interface ValidatorWeight {
  address: string;
  weight: bigint;
}
export interface ValidatorWeightProtoMsg {
  typeUrl: "/stride.stakeibc.ValidatorWeight";
  value: Uint8Array;
}
export interface ValidatorWeightAmino {
  address?: string;
  weight?: string;
}
export interface ValidatorWeightAminoMsg {
  type: "/stride.stakeibc.ValidatorWeight";
  value: ValidatorWeightAmino;
}
export interface ValidatorWeightSDKType {
  address: string;
  weight: bigint;
}
export interface MsgChangeValidatorWeights {
  creator: string;
  hostZone: string;
  validatorWeights: ValidatorWeight[];
}
export interface MsgChangeValidatorWeightsProtoMsg {
  typeUrl: "/stride.stakeibc.MsgChangeValidatorWeights";
  value: Uint8Array;
}
export interface MsgChangeValidatorWeightsAmino {
  creator?: string;
  host_zone?: string;
  validator_weights?: ValidatorWeightAmino[];
}
export interface MsgChangeValidatorWeightsAminoMsg {
  type: "stakeibc/MsgChangeValidatorWeights";
  value: MsgChangeValidatorWeightsAmino;
}
export interface MsgChangeValidatorWeightsSDKType {
  creator: string;
  host_zone: string;
  validator_weights: ValidatorWeightSDKType[];
}
export interface MsgChangeValidatorWeightsResponse {}
export interface MsgChangeValidatorWeightsResponseProtoMsg {
  typeUrl: "/stride.stakeibc.MsgChangeValidatorWeightsResponse";
  value: Uint8Array;
}
export interface MsgChangeValidatorWeightsResponseAmino {}
export interface MsgChangeValidatorWeightsResponseAminoMsg {
  type: "/stride.stakeibc.MsgChangeValidatorWeightsResponse";
  value: MsgChangeValidatorWeightsResponseAmino;
}
export interface MsgChangeValidatorWeightsResponseSDKType {}
export interface MsgDeleteValidator {
  creator: string;
  hostZone: string;
  valAddr: string;
}
export interface MsgDeleteValidatorProtoMsg {
  typeUrl: "/stride.stakeibc.MsgDeleteValidator";
  value: Uint8Array;
}
export interface MsgDeleteValidatorAmino {
  creator?: string;
  host_zone?: string;
  val_addr?: string;
}
export interface MsgDeleteValidatorAminoMsg {
  type: "stakeibc/MsgDeleteValidator";
  value: MsgDeleteValidatorAmino;
}
export interface MsgDeleteValidatorSDKType {
  creator: string;
  host_zone: string;
  val_addr: string;
}
export interface MsgDeleteValidatorResponse {}
export interface MsgDeleteValidatorResponseProtoMsg {
  typeUrl: "/stride.stakeibc.MsgDeleteValidatorResponse";
  value: Uint8Array;
}
export interface MsgDeleteValidatorResponseAmino {}
export interface MsgDeleteValidatorResponseAminoMsg {
  type: "/stride.stakeibc.MsgDeleteValidatorResponse";
  value: MsgDeleteValidatorResponseAmino;
}
export interface MsgDeleteValidatorResponseSDKType {}
export interface MsgRestoreInterchainAccount {
  creator: string;
  chainId: string;
  connectionId: string;
  accountOwner: string;
}
export interface MsgRestoreInterchainAccountProtoMsg {
  typeUrl: "/stride.stakeibc.MsgRestoreInterchainAccount";
  value: Uint8Array;
}
export interface MsgRestoreInterchainAccountAmino {
  creator?: string;
  chain_id?: string;
  connection_id?: string;
  account_owner?: string;
}
export interface MsgRestoreInterchainAccountAminoMsg {
  type: "stakeibc/MsgRestoreInterchainAcco";
  value: MsgRestoreInterchainAccountAmino;
}
export interface MsgRestoreInterchainAccountSDKType {
  creator: string;
  chain_id: string;
  connection_id: string;
  account_owner: string;
}
export interface MsgRestoreInterchainAccountResponse {}
export interface MsgRestoreInterchainAccountResponseProtoMsg {
  typeUrl: "/stride.stakeibc.MsgRestoreInterchainAccountResponse";
  value: Uint8Array;
}
export interface MsgRestoreInterchainAccountResponseAmino {}
export interface MsgRestoreInterchainAccountResponseAminoMsg {
  type: "/stride.stakeibc.MsgRestoreInterchainAccountResponse";
  value: MsgRestoreInterchainAccountResponseAmino;
}
export interface MsgRestoreInterchainAccountResponseSDKType {}
export interface MsgCloseDelegationChannel {
  creator: string;
  chainId: string;
}
export interface MsgCloseDelegationChannelProtoMsg {
  typeUrl: "/stride.stakeibc.MsgCloseDelegationChannel";
  value: Uint8Array;
}
export interface MsgCloseDelegationChannelAmino {
  creator?: string;
  chain_id?: string;
}
export interface MsgCloseDelegationChannelAminoMsg {
  type: "stakeibc/MsgCloseDelegationChanne";
  value: MsgCloseDelegationChannelAmino;
}
export interface MsgCloseDelegationChannelSDKType {
  creator: string;
  chain_id: string;
}
export interface MsgCloseDelegationChannelResponse {}
export interface MsgCloseDelegationChannelResponseProtoMsg {
  typeUrl: "/stride.stakeibc.MsgCloseDelegationChannelResponse";
  value: Uint8Array;
}
export interface MsgCloseDelegationChannelResponseAmino {}
export interface MsgCloseDelegationChannelResponseAminoMsg {
  type: "/stride.stakeibc.MsgCloseDelegationChannelResponse";
  value: MsgCloseDelegationChannelResponseAmino;
}
export interface MsgCloseDelegationChannelResponseSDKType {}
export interface MsgUpdateValidatorSharesExchRate {
  creator: string;
  chainId: string;
  valoper: string;
}
export interface MsgUpdateValidatorSharesExchRateProtoMsg {
  typeUrl: "/stride.stakeibc.MsgUpdateValidatorSharesExchRate";
  value: Uint8Array;
}
export interface MsgUpdateValidatorSharesExchRateAmino {
  creator?: string;
  chain_id?: string;
  valoper?: string;
}
export interface MsgUpdateValidatorSharesExchRateAminoMsg {
  type: "stakeibc/MsgUpdateValSharesExchRate";
  value: MsgUpdateValidatorSharesExchRateAmino;
}
export interface MsgUpdateValidatorSharesExchRateSDKType {
  creator: string;
  chain_id: string;
  valoper: string;
}
export interface MsgUpdateValidatorSharesExchRateResponse {}
export interface MsgUpdateValidatorSharesExchRateResponseProtoMsg {
  typeUrl: "/stride.stakeibc.MsgUpdateValidatorSharesExchRateResponse";
  value: Uint8Array;
}
export interface MsgUpdateValidatorSharesExchRateResponseAmino {}
export interface MsgUpdateValidatorSharesExchRateResponseAminoMsg {
  type: "/stride.stakeibc.MsgUpdateValidatorSharesExchRateResponse";
  value: MsgUpdateValidatorSharesExchRateResponseAmino;
}
export interface MsgUpdateValidatorSharesExchRateResponseSDKType {}
export interface MsgCalibrateDelegation {
  creator: string;
  chainId: string;
  valoper: string;
}
export interface MsgCalibrateDelegationProtoMsg {
  typeUrl: "/stride.stakeibc.MsgCalibrateDelegation";
  value: Uint8Array;
}
export interface MsgCalibrateDelegationAmino {
  creator?: string;
  chain_id?: string;
  valoper?: string;
}
export interface MsgCalibrateDelegationAminoMsg {
  type: "stakeibc/MsgCalibrateDelegation";
  value: MsgCalibrateDelegationAmino;
}
export interface MsgCalibrateDelegationSDKType {
  creator: string;
  chain_id: string;
  valoper: string;
}
export interface MsgCalibrateDelegationResponse {}
export interface MsgCalibrateDelegationResponseProtoMsg {
  typeUrl: "/stride.stakeibc.MsgCalibrateDelegationResponse";
  value: Uint8Array;
}
export interface MsgCalibrateDelegationResponseAmino {}
export interface MsgCalibrateDelegationResponseAminoMsg {
  type: "/stride.stakeibc.MsgCalibrateDelegationResponse";
  value: MsgCalibrateDelegationResponseAmino;
}
export interface MsgCalibrateDelegationResponseSDKType {}
export interface MsgResumeHostZone {
  creator: string;
  chainId: string;
}
export interface MsgResumeHostZoneProtoMsg {
  typeUrl: "/stride.stakeibc.MsgResumeHostZone";
  value: Uint8Array;
}
export interface MsgResumeHostZoneAmino {
  creator?: string;
  chain_id?: string;
}
export interface MsgResumeHostZoneAminoMsg {
  type: "stakeibc/MsgResumeHostZone";
  value: MsgResumeHostZoneAmino;
}
export interface MsgResumeHostZoneSDKType {
  creator: string;
  chain_id: string;
}
export interface MsgResumeHostZoneResponse {}
export interface MsgResumeHostZoneResponseProtoMsg {
  typeUrl: "/stride.stakeibc.MsgResumeHostZoneResponse";
  value: Uint8Array;
}
export interface MsgResumeHostZoneResponseAmino {}
export interface MsgResumeHostZoneResponseAminoMsg {
  type: "/stride.stakeibc.MsgResumeHostZoneResponse";
  value: MsgResumeHostZoneResponseAmino;
}
export interface MsgResumeHostZoneResponseSDKType {}
export interface MsgDeprecateHostZone {
  authority: string;
  chainId: string;
}
export interface MsgDeprecateHostZoneProtoMsg {
  typeUrl: "/stride.stakeibc.MsgDeprecateHostZone";
  value: Uint8Array;
}
export interface MsgDeprecateHostZoneAmino {
  authority?: string;
  chain_id?: string;
}
export interface MsgDeprecateHostZoneAminoMsg {
  type: "stakeibc/MsgDeprecateHostZone";
  value: MsgDeprecateHostZoneAmino;
}
export interface MsgDeprecateHostZoneSDKType {
  authority: string;
  chain_id: string;
}
export interface MsgDeprecateHostZoneResponse {}
export interface MsgDeprecateHostZoneResponseProtoMsg {
  typeUrl: "/stride.stakeibc.MsgDeprecateHostZoneResponse";
  value: Uint8Array;
}
export interface MsgDeprecateHostZoneResponseAmino {}
export interface MsgDeprecateHostZoneResponseAminoMsg {
  type: "/stride.stakeibc.MsgDeprecateHostZoneResponse";
  value: MsgDeprecateHostZoneResponseAmino;
}
export interface MsgDeprecateHostZoneResponseSDKType {}
/** Creates a new trade route */
export interface MsgCreateTradeRoute {
  /**
   * authority is the address that controls the module (defaults to x/gov unless
   * overwritten).
   */
  authority: string;
  /** The chain ID of the host zone */
  hostChainId: string;
  /** Connection IDs between stride and the other zones */
  strideToRewardConnectionId: string;
  strideToTradeConnectionId: string;
  /** Transfer channels between the host, reward, and trade zones */
  hostToRewardTransferChannelId: string;
  rewardToTradeTransferChannelId: string;
  tradeToHostTransferChannelId: string;
  /** ibc denom for the reward token on the host zone (e.g. ibc/usdc on dYdX) */
  rewardDenomOnHost: string;
  /** native denom of reward token on the reward zone (e.g. usdc on Noble) */
  rewardDenomOnReward: string;
  /** ibc denom of the reward token on the trade zone (e.g. ibc/usdc on Osmosis) */
  rewardDenomOnTrade: string;
  /** ibc denom of the host's token on the trade zone (e.g. ibc/dydx on Osmosis) */
  hostDenomOnTrade: string;
  /** the host zone's native denom (e.g. dydx on dYdX) */
  hostDenomOnHost: string;
  /**
   * Deprecated, the trades are now executed off-chain via authz
   * 
   * The osmosis pool ID
   */
  /** @deprecated */
  poolId: bigint;
  /**
   * Deprecated, the trades are now executed off-chain via authz
   * 
   * Threshold defining the percentage of tokens that could be lost in the trade
   * This captures both the loss from slippage and from a stale price on stride
   * "0.05" means the output from the trade can be no less than a 5% deviation
   * from the current value
   */
  /** @deprecated */
  maxAllowedSwapLossRate: string;
  /**
   * Deprecated, the trades are now executed off-chain via authz
   * 
   * minimum amount of reward tokens to initate a swap
   * if not provided, defaults to 0
   */
  minSwapAmount: string;
  /**
   * Deprecated, the trades are now executed off-chain via authz
   * 
   * maximum amount of reward tokens in a single swap
   * if not provided, defaults to 10e24
   */
  maxSwapAmount: string;
  /**
   * Minimum amount of reward token that must be accumulated before
   * the tokens are transferred to the trade ICA
   */
  minTransferAmount: string;
}
export interface MsgCreateTradeRouteProtoMsg {
  typeUrl: "/stride.stakeibc.MsgCreateTradeRoute";
  value: Uint8Array;
}
/** Creates a new trade route */
export interface MsgCreateTradeRouteAmino {
  /**
   * authority is the address that controls the module (defaults to x/gov unless
   * overwritten).
   */
  authority?: string;
  /** The chain ID of the host zone */
  host_chain_id?: string;
  /** Connection IDs between stride and the other zones */
  stride_to_reward_connection_id?: string;
  stride_to_trade_connection_id?: string;
  /** Transfer channels between the host, reward, and trade zones */
  host_to_reward_transfer_channel_id?: string;
  reward_to_trade_transfer_channel_id?: string;
  trade_to_host_transfer_channel_id?: string;
  /** ibc denom for the reward token on the host zone (e.g. ibc/usdc on dYdX) */
  reward_denom_on_host?: string;
  /** native denom of reward token on the reward zone (e.g. usdc on Noble) */
  reward_denom_on_reward?: string;
  /** ibc denom of the reward token on the trade zone (e.g. ibc/usdc on Osmosis) */
  reward_denom_on_trade?: string;
  /** ibc denom of the host's token on the trade zone (e.g. ibc/dydx on Osmosis) */
  host_denom_on_trade?: string;
  /** the host zone's native denom (e.g. dydx on dYdX) */
  host_denom_on_host?: string;
  /**
   * Deprecated, the trades are now executed off-chain via authz
   * 
   * The osmosis pool ID
   */
  /** @deprecated */
  pool_id?: string;
  /**
   * Deprecated, the trades are now executed off-chain via authz
   * 
   * Threshold defining the percentage of tokens that could be lost in the trade
   * This captures both the loss from slippage and from a stale price on stride
   * "0.05" means the output from the trade can be no less than a 5% deviation
   * from the current value
   */
  /** @deprecated */
  max_allowed_swap_loss_rate?: string;
  /**
   * Deprecated, the trades are now executed off-chain via authz
   * 
   * minimum amount of reward tokens to initate a swap
   * if not provided, defaults to 0
   */
  min_swap_amount?: string;
  /**
   * Deprecated, the trades are now executed off-chain via authz
   * 
   * maximum amount of reward tokens in a single swap
   * if not provided, defaults to 10e24
   */
  max_swap_amount?: string;
  /**
   * Minimum amount of reward token that must be accumulated before
   * the tokens are transferred to the trade ICA
   */
  min_transfer_amount?: string;
}
export interface MsgCreateTradeRouteAminoMsg {
  type: "stakeibc/MsgCreateTradeRoute";
  value: MsgCreateTradeRouteAmino;
}
/** Creates a new trade route */
export interface MsgCreateTradeRouteSDKType {
  authority: string;
  host_chain_id: string;
  stride_to_reward_connection_id: string;
  stride_to_trade_connection_id: string;
  host_to_reward_transfer_channel_id: string;
  reward_to_trade_transfer_channel_id: string;
  trade_to_host_transfer_channel_id: string;
  reward_denom_on_host: string;
  reward_denom_on_reward: string;
  reward_denom_on_trade: string;
  host_denom_on_trade: string;
  host_denom_on_host: string;
  /** @deprecated */
  pool_id: bigint;
  /** @deprecated */
  max_allowed_swap_loss_rate: string;
  min_swap_amount: string;
  max_swap_amount: string;
  min_transfer_amount: string;
}
export interface MsgCreateTradeRouteResponse {}
export interface MsgCreateTradeRouteResponseProtoMsg {
  typeUrl: "/stride.stakeibc.MsgCreateTradeRouteResponse";
  value: Uint8Array;
}
export interface MsgCreateTradeRouteResponseAmino {}
export interface MsgCreateTradeRouteResponseAminoMsg {
  type: "/stride.stakeibc.MsgCreateTradeRouteResponse";
  value: MsgCreateTradeRouteResponseAmino;
}
export interface MsgCreateTradeRouteResponseSDKType {}
/** Deletes a trade route */
export interface MsgDeleteTradeRoute {
  /**
   * authority is the address that controls the module (defaults to x/gov unless
   * overwritten).
   */
  authority: string;
  /** The reward denom of the route in it's native form (e.g. usdc) */
  rewardDenom: string;
  /** The host zone's denom in it's native form (e.g. dydx) */
  hostDenom: string;
}
export interface MsgDeleteTradeRouteProtoMsg {
  typeUrl: "/stride.stakeibc.MsgDeleteTradeRoute";
  value: Uint8Array;
}
/** Deletes a trade route */
export interface MsgDeleteTradeRouteAmino {
  /**
   * authority is the address that controls the module (defaults to x/gov unless
   * overwritten).
   */
  authority?: string;
  /** The reward denom of the route in it's native form (e.g. usdc) */
  reward_denom?: string;
  /** The host zone's denom in it's native form (e.g. dydx) */
  host_denom?: string;
}
export interface MsgDeleteTradeRouteAminoMsg {
  type: "stakeibc/MsgDeleteTradeRoute";
  value: MsgDeleteTradeRouteAmino;
}
/** Deletes a trade route */
export interface MsgDeleteTradeRouteSDKType {
  authority: string;
  reward_denom: string;
  host_denom: string;
}
export interface MsgDeleteTradeRouteResponse {}
export interface MsgDeleteTradeRouteResponseProtoMsg {
  typeUrl: "/stride.stakeibc.MsgDeleteTradeRouteResponse";
  value: Uint8Array;
}
export interface MsgDeleteTradeRouteResponseAmino {}
export interface MsgDeleteTradeRouteResponseAminoMsg {
  type: "/stride.stakeibc.MsgDeleteTradeRouteResponse";
  value: MsgDeleteTradeRouteResponseAmino;
}
export interface MsgDeleteTradeRouteResponseSDKType {}
/** Updates the config of a trade route */
export interface MsgUpdateTradeRoute {
  /**
   * authority is the address that controls the module (defaults to x/gov unless
   * overwritten).
   */
  authority: string;
  /** The reward denom of the route in it's native form (e.g. usdc) */
  rewardDenom: string;
  /** The host zone's denom in it's native form (e.g. dydx) */
  hostDenom: string;
  /**
   * Deprecated, the trades are now executed off-chain via authz
   * 
   * The osmosis pool ID
   */
  /** @deprecated */
  poolId: bigint;
  /**
   * Deprecated, the trades are now executed off-chain via authz
   * 
   * Threshold defining the percentage of tokens that could be lost in the trade
   * This captures both the loss from slippage and from a stale price on stride
   * "0.05" means the output from the trade can be no less than a 5% deviation
   * from the current value
   */
  /** @deprecated */
  maxAllowedSwapLossRate: string;
  /**
   * Deprecated, the trades are now executed off-chain via authz
   * 
   * minimum amount of reward tokens to initate a swap
   * if not provided, defaults to 0
   */
  /** @deprecated */
  minSwapAmount: string;
  /**
   * Deprecated, the trades are now executed off-chain via authz
   * 
   * maximum amount of reward tokens in a single swap
   * if not provided, defaults to 10e24
   */
  /** @deprecated */
  maxSwapAmount: string;
  /**
   * Minimum amount of reward token that must be accumulated before
   * the tokens are transferred to the trade ICA
   */
  minTransferAmount: string;
}
export interface MsgUpdateTradeRouteProtoMsg {
  typeUrl: "/stride.stakeibc.MsgUpdateTradeRoute";
  value: Uint8Array;
}
/** Updates the config of a trade route */
export interface MsgUpdateTradeRouteAmino {
  /**
   * authority is the address that controls the module (defaults to x/gov unless
   * overwritten).
   */
  authority?: string;
  /** The reward denom of the route in it's native form (e.g. usdc) */
  reward_denom?: string;
  /** The host zone's denom in it's native form (e.g. dydx) */
  host_denom?: string;
  /**
   * Deprecated, the trades are now executed off-chain via authz
   * 
   * The osmosis pool ID
   */
  /** @deprecated */
  pool_id?: string;
  /**
   * Deprecated, the trades are now executed off-chain via authz
   * 
   * Threshold defining the percentage of tokens that could be lost in the trade
   * This captures both the loss from slippage and from a stale price on stride
   * "0.05" means the output from the trade can be no less than a 5% deviation
   * from the current value
   */
  /** @deprecated */
  max_allowed_swap_loss_rate?: string;
  /**
   * Deprecated, the trades are now executed off-chain via authz
   * 
   * minimum amount of reward tokens to initate a swap
   * if not provided, defaults to 0
   */
  /** @deprecated */
  min_swap_amount?: string;
  /**
   * Deprecated, the trades are now executed off-chain via authz
   * 
   * maximum amount of reward tokens in a single swap
   * if not provided, defaults to 10e24
   */
  /** @deprecated */
  max_swap_amount?: string;
  /**
   * Minimum amount of reward token that must be accumulated before
   * the tokens are transferred to the trade ICA
   */
  min_transfer_amount?: string;
}
export interface MsgUpdateTradeRouteAminoMsg {
  type: "stakeibc/MsgUpdateTradeRoute";
  value: MsgUpdateTradeRouteAmino;
}
/** Updates the config of a trade route */
export interface MsgUpdateTradeRouteSDKType {
  authority: string;
  reward_denom: string;
  host_denom: string;
  /** @deprecated */
  pool_id: bigint;
  /** @deprecated */
  max_allowed_swap_loss_rate: string;
  /** @deprecated */
  min_swap_amount: string;
  /** @deprecated */
  max_swap_amount: string;
  min_transfer_amount: string;
}
export interface MsgUpdateTradeRouteResponse {}
export interface MsgUpdateTradeRouteResponseProtoMsg {
  typeUrl: "/stride.stakeibc.MsgUpdateTradeRouteResponse";
  value: Uint8Array;
}
export interface MsgUpdateTradeRouteResponseAmino {}
export interface MsgUpdateTradeRouteResponseAminoMsg {
  type: "/stride.stakeibc.MsgUpdateTradeRouteResponse";
  value: MsgUpdateTradeRouteResponseAmino;
}
export interface MsgUpdateTradeRouteResponseSDKType {}
/**
 * Registers or updates a community pool rebate by specifying the amount liquid
 * staked
 */
export interface MsgSetCommunityPoolRebate {
  /** Message signer (admin only) */
  creator: string;
  /**
   * Chain id of the chain whose community pool has a liquid staking rebate
   * arrangement with stride
   */
  chainId: string;
  /** Rebate percentage represented as a decimal (e.g. 0.2 for 20%) */
  rebateRate: string;
  /** Number of stTokens recieved by the community pool after liquid staking */
  liquidStakedStTokenAmount: string;
}
export interface MsgSetCommunityPoolRebateProtoMsg {
  typeUrl: "/stride.stakeibc.MsgSetCommunityPoolRebate";
  value: Uint8Array;
}
/**
 * Registers or updates a community pool rebate by specifying the amount liquid
 * staked
 */
export interface MsgSetCommunityPoolRebateAmino {
  /** Message signer (admin only) */
  creator?: string;
  /**
   * Chain id of the chain whose community pool has a liquid staking rebate
   * arrangement with stride
   */
  chain_id?: string;
  /** Rebate percentage represented as a decimal (e.g. 0.2 for 20%) */
  rebate_rate?: string;
  /** Number of stTokens recieved by the community pool after liquid staking */
  liquid_staked_st_token_amount?: string;
}
export interface MsgSetCommunityPoolRebateAminoMsg {
  type: "stakeibc/MsgSetCommunityPoolRebate";
  value: MsgSetCommunityPoolRebateAmino;
}
/**
 * Registers or updates a community pool rebate by specifying the amount liquid
 * staked
 */
export interface MsgSetCommunityPoolRebateSDKType {
  creator: string;
  chain_id: string;
  rebate_rate: string;
  liquid_staked_st_token_amount: string;
}
export interface MsgSetCommunityPoolRebateResponse {}
export interface MsgSetCommunityPoolRebateResponseProtoMsg {
  typeUrl: "/stride.stakeibc.MsgSetCommunityPoolRebateResponse";
  value: Uint8Array;
}
export interface MsgSetCommunityPoolRebateResponseAmino {}
export interface MsgSetCommunityPoolRebateResponseAminoMsg {
  type: "/stride.stakeibc.MsgSetCommunityPoolRebateResponse";
  value: MsgSetCommunityPoolRebateResponseAmino;
}
export interface MsgSetCommunityPoolRebateResponseSDKType {}
/** Grants or revokes trade permissions to a given address via authz */
export interface MsgToggleTradeController {
  /** Message signer (admin only) */
  creator: string;
  /** Chain ID of the trade account */
  chainId: string;
  /** Permission change (either grant or revoke) */
  permissionChange: AuthzPermissionChange;
  /** Address of trade operator */
  address: string;
  /** Option to grant/revoke the legacy osmosis swap message */
  legacy: boolean;
}
export interface MsgToggleTradeControllerProtoMsg {
  typeUrl: "/stride.stakeibc.MsgToggleTradeController";
  value: Uint8Array;
}
/** Grants or revokes trade permissions to a given address via authz */
export interface MsgToggleTradeControllerAmino {
  /** Message signer (admin only) */
  creator?: string;
  /** Chain ID of the trade account */
  chain_id?: string;
  /** Permission change (either grant or revoke) */
  permission_change?: AuthzPermissionChange;
  /** Address of trade operator */
  address?: string;
  /** Option to grant/revoke the legacy osmosis swap message */
  legacy?: boolean;
}
export interface MsgToggleTradeControllerAminoMsg {
  type: "stakeibc/MsgToggleTradeController";
  value: MsgToggleTradeControllerAmino;
}
/** Grants or revokes trade permissions to a given address via authz */
export interface MsgToggleTradeControllerSDKType {
  creator: string;
  chain_id: string;
  permission_change: AuthzPermissionChange;
  address: string;
  legacy: boolean;
}
export interface MsgToggleTradeControllerResponse {}
export interface MsgToggleTradeControllerResponseProtoMsg {
  typeUrl: "/stride.stakeibc.MsgToggleTradeControllerResponse";
  value: Uint8Array;
}
export interface MsgToggleTradeControllerResponseAmino {}
export interface MsgToggleTradeControllerResponseAminoMsg {
  type: "/stride.stakeibc.MsgToggleTradeControllerResponse";
  value: MsgToggleTradeControllerResponseAmino;
}
export interface MsgToggleTradeControllerResponseSDKType {}
/** Updates host zone params */
export interface MsgUpdateHostZoneParams {
  /**
   * authority is the address that controls the module (defaults to x/gov unless
   * overwritten).
   */
  authority: string;
  /** Chain ID of the host zone */
  chainId: string;
  /** Max messages that can be sent in a single ICA message */
  maxMessagesPerIcaTx: bigint;
}
export interface MsgUpdateHostZoneParamsProtoMsg {
  typeUrl: "/stride.stakeibc.MsgUpdateHostZoneParams";
  value: Uint8Array;
}
/** Updates host zone params */
export interface MsgUpdateHostZoneParamsAmino {
  /**
   * authority is the address that controls the module (defaults to x/gov unless
   * overwritten).
   */
  authority?: string;
  /** Chain ID of the host zone */
  chain_id?: string;
  /** Max messages that can be sent in a single ICA message */
  max_messages_per_ica_tx?: string;
}
export interface MsgUpdateHostZoneParamsAminoMsg {
  type: "stakeibc/MsgUpdateHostZoneParams";
  value: MsgUpdateHostZoneParamsAmino;
}
/** Updates host zone params */
export interface MsgUpdateHostZoneParamsSDKType {
  authority: string;
  chain_id: string;
  max_messages_per_ica_tx: bigint;
}
export interface MsgUpdateHostZoneParamsResponse {}
export interface MsgUpdateHostZoneParamsResponseProtoMsg {
  typeUrl: "/stride.stakeibc.MsgUpdateHostZoneParamsResponse";
  value: Uint8Array;
}
export interface MsgUpdateHostZoneParamsResponseAmino {}
export interface MsgUpdateHostZoneParamsResponseAminoMsg {
  type: "/stride.stakeibc.MsgUpdateHostZoneParamsResponse";
  value: MsgUpdateHostZoneParamsResponseAmino;
}
export interface MsgUpdateHostZoneParamsResponseSDKType {}
function createBaseMsgUpdateInnerRedemptionRateBounds(): MsgUpdateInnerRedemptionRateBounds {
  return {
    creator: "",
    chainId: "",
    minInnerRedemptionRate: "",
    maxInnerRedemptionRate: ""
  };
}
export const MsgUpdateInnerRedemptionRateBounds = {
  typeUrl: "/stride.stakeibc.MsgUpdateInnerRedemptionRateBounds",
  encode(message: MsgUpdateInnerRedemptionRateBounds, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.chainId !== "") {
      writer.uint32(18).string(message.chainId);
    }
    if (message.minInnerRedemptionRate !== "") {
      writer.uint32(26).string(Decimal.fromUserInput(message.minInnerRedemptionRate, 18).atomics);
    }
    if (message.maxInnerRedemptionRate !== "") {
      writer.uint32(34).string(Decimal.fromUserInput(message.maxInnerRedemptionRate, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateInnerRedemptionRateBounds {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateInnerRedemptionRateBounds();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.chainId = reader.string();
          break;
        case 3:
          message.minInnerRedemptionRate = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 4:
          message.maxInnerRedemptionRate = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUpdateInnerRedemptionRateBounds>): MsgUpdateInnerRedemptionRateBounds {
    const message = createBaseMsgUpdateInnerRedemptionRateBounds();
    message.creator = object.creator ?? "";
    message.chainId = object.chainId ?? "";
    message.minInnerRedemptionRate = object.minInnerRedemptionRate ?? "";
    message.maxInnerRedemptionRate = object.maxInnerRedemptionRate ?? "";
    return message;
  },
  fromAmino(object: MsgUpdateInnerRedemptionRateBoundsAmino): MsgUpdateInnerRedemptionRateBounds {
    const message = createBaseMsgUpdateInnerRedemptionRateBounds();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.chain_id !== undefined && object.chain_id !== null) {
      message.chainId = object.chain_id;
    }
    if (object.min_inner_redemption_rate !== undefined && object.min_inner_redemption_rate !== null) {
      message.minInnerRedemptionRate = object.min_inner_redemption_rate;
    }
    if (object.max_inner_redemption_rate !== undefined && object.max_inner_redemption_rate !== null) {
      message.maxInnerRedemptionRate = object.max_inner_redemption_rate;
    }
    return message;
  },
  toAmino(message: MsgUpdateInnerRedemptionRateBounds, useInterfaces: boolean = false): MsgUpdateInnerRedemptionRateBoundsAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.chain_id = message.chainId === "" ? undefined : message.chainId;
    obj.min_inner_redemption_rate = message.minInnerRedemptionRate === "" ? undefined : message.minInnerRedemptionRate;
    obj.max_inner_redemption_rate = message.maxInnerRedemptionRate === "" ? undefined : message.maxInnerRedemptionRate;
    return obj;
  },
  fromAminoMsg(object: MsgUpdateInnerRedemptionRateBoundsAminoMsg): MsgUpdateInnerRedemptionRateBounds {
    return MsgUpdateInnerRedemptionRateBounds.fromAmino(object.value);
  },
  toAminoMsg(message: MsgUpdateInnerRedemptionRateBounds, useInterfaces: boolean = false): MsgUpdateInnerRedemptionRateBoundsAminoMsg {
    return {
      type: "stakeibc/MsgUpdateRedemptionRateBounds",
      value: MsgUpdateInnerRedemptionRateBounds.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgUpdateInnerRedemptionRateBoundsProtoMsg, useInterfaces: boolean = false): MsgUpdateInnerRedemptionRateBounds {
    return MsgUpdateInnerRedemptionRateBounds.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateInnerRedemptionRateBounds): Uint8Array {
    return MsgUpdateInnerRedemptionRateBounds.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateInnerRedemptionRateBounds): MsgUpdateInnerRedemptionRateBoundsProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.MsgUpdateInnerRedemptionRateBounds",
      value: MsgUpdateInnerRedemptionRateBounds.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateInnerRedemptionRateBoundsResponse(): MsgUpdateInnerRedemptionRateBoundsResponse {
  return {};
}
export const MsgUpdateInnerRedemptionRateBoundsResponse = {
  typeUrl: "/stride.stakeibc.MsgUpdateInnerRedemptionRateBoundsResponse",
  encode(_: MsgUpdateInnerRedemptionRateBoundsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateInnerRedemptionRateBoundsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateInnerRedemptionRateBoundsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgUpdateInnerRedemptionRateBoundsResponse>): MsgUpdateInnerRedemptionRateBoundsResponse {
    const message = createBaseMsgUpdateInnerRedemptionRateBoundsResponse();
    return message;
  },
  fromAmino(_: MsgUpdateInnerRedemptionRateBoundsResponseAmino): MsgUpdateInnerRedemptionRateBoundsResponse {
    const message = createBaseMsgUpdateInnerRedemptionRateBoundsResponse();
    return message;
  },
  toAmino(_: MsgUpdateInnerRedemptionRateBoundsResponse, useInterfaces: boolean = false): MsgUpdateInnerRedemptionRateBoundsResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateInnerRedemptionRateBoundsResponseAminoMsg): MsgUpdateInnerRedemptionRateBoundsResponse {
    return MsgUpdateInnerRedemptionRateBoundsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateInnerRedemptionRateBoundsResponseProtoMsg, useInterfaces: boolean = false): MsgUpdateInnerRedemptionRateBoundsResponse {
    return MsgUpdateInnerRedemptionRateBoundsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateInnerRedemptionRateBoundsResponse): Uint8Array {
    return MsgUpdateInnerRedemptionRateBoundsResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateInnerRedemptionRateBoundsResponse): MsgUpdateInnerRedemptionRateBoundsResponseProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.MsgUpdateInnerRedemptionRateBoundsResponse",
      value: MsgUpdateInnerRedemptionRateBoundsResponse.encode(message).finish()
    };
  }
};
function createBaseMsgLiquidStake(): MsgLiquidStake {
  return {
    creator: "",
    amount: "",
    hostDenom: ""
  };
}
export const MsgLiquidStake = {
  typeUrl: "/stride.stakeibc.MsgLiquidStake",
  encode(message: MsgLiquidStake, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.amount !== "") {
      writer.uint32(18).string(message.amount);
    }
    if (message.hostDenom !== "") {
      writer.uint32(26).string(message.hostDenom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgLiquidStake {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgLiquidStake();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.amount = reader.string();
          break;
        case 3:
          message.hostDenom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgLiquidStake>): MsgLiquidStake {
    const message = createBaseMsgLiquidStake();
    message.creator = object.creator ?? "";
    message.amount = object.amount ?? "";
    message.hostDenom = object.hostDenom ?? "";
    return message;
  },
  fromAmino(object: MsgLiquidStakeAmino): MsgLiquidStake {
    const message = createBaseMsgLiquidStake();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    }
    if (object.host_denom !== undefined && object.host_denom !== null) {
      message.hostDenom = object.host_denom;
    }
    return message;
  },
  toAmino(message: MsgLiquidStake, useInterfaces: boolean = false): MsgLiquidStakeAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.amount = message.amount === "" ? undefined : message.amount;
    obj.host_denom = message.hostDenom === "" ? undefined : message.hostDenom;
    return obj;
  },
  fromAminoMsg(object: MsgLiquidStakeAminoMsg): MsgLiquidStake {
    return MsgLiquidStake.fromAmino(object.value);
  },
  toAminoMsg(message: MsgLiquidStake, useInterfaces: boolean = false): MsgLiquidStakeAminoMsg {
    return {
      type: "stakeibc/MsgLiquidStake",
      value: MsgLiquidStake.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgLiquidStakeProtoMsg, useInterfaces: boolean = false): MsgLiquidStake {
    return MsgLiquidStake.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgLiquidStake): Uint8Array {
    return MsgLiquidStake.encode(message).finish();
  },
  toProtoMsg(message: MsgLiquidStake): MsgLiquidStakeProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.MsgLiquidStake",
      value: MsgLiquidStake.encode(message).finish()
    };
  }
};
function createBaseMsgLiquidStakeResponse(): MsgLiquidStakeResponse {
  return {
    stToken: Coin.fromPartial({})
  };
}
export const MsgLiquidStakeResponse = {
  typeUrl: "/stride.stakeibc.MsgLiquidStakeResponse",
  encode(message: MsgLiquidStakeResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.stToken !== undefined) {
      Coin.encode(message.stToken, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgLiquidStakeResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgLiquidStakeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.stToken = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgLiquidStakeResponse>): MsgLiquidStakeResponse {
    const message = createBaseMsgLiquidStakeResponse();
    message.stToken = object.stToken !== undefined && object.stToken !== null ? Coin.fromPartial(object.stToken) : undefined;
    return message;
  },
  fromAmino(object: MsgLiquidStakeResponseAmino): MsgLiquidStakeResponse {
    const message = createBaseMsgLiquidStakeResponse();
    if (object.st_token !== undefined && object.st_token !== null) {
      message.stToken = Coin.fromAmino(object.st_token);
    }
    return message;
  },
  toAmino(message: MsgLiquidStakeResponse, useInterfaces: boolean = false): MsgLiquidStakeResponseAmino {
    const obj: any = {};
    obj.st_token = message.stToken ? Coin.toAmino(message.stToken, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgLiquidStakeResponseAminoMsg): MsgLiquidStakeResponse {
    return MsgLiquidStakeResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgLiquidStakeResponseProtoMsg, useInterfaces: boolean = false): MsgLiquidStakeResponse {
    return MsgLiquidStakeResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgLiquidStakeResponse): Uint8Array {
    return MsgLiquidStakeResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgLiquidStakeResponse): MsgLiquidStakeResponseProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.MsgLiquidStakeResponse",
      value: MsgLiquidStakeResponse.encode(message).finish()
    };
  }
};
function createBaseMsgLSMLiquidStake(): MsgLSMLiquidStake {
  return {
    creator: "",
    amount: "",
    lsmTokenIbcDenom: ""
  };
}
export const MsgLSMLiquidStake = {
  typeUrl: "/stride.stakeibc.MsgLSMLiquidStake",
  encode(message: MsgLSMLiquidStake, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.amount !== "") {
      writer.uint32(18).string(message.amount);
    }
    if (message.lsmTokenIbcDenom !== "") {
      writer.uint32(26).string(message.lsmTokenIbcDenom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgLSMLiquidStake {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgLSMLiquidStake();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.amount = reader.string();
          break;
        case 3:
          message.lsmTokenIbcDenom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgLSMLiquidStake>): MsgLSMLiquidStake {
    const message = createBaseMsgLSMLiquidStake();
    message.creator = object.creator ?? "";
    message.amount = object.amount ?? "";
    message.lsmTokenIbcDenom = object.lsmTokenIbcDenom ?? "";
    return message;
  },
  fromAmino(object: MsgLSMLiquidStakeAmino): MsgLSMLiquidStake {
    const message = createBaseMsgLSMLiquidStake();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    }
    if (object.lsm_token_ibc_denom !== undefined && object.lsm_token_ibc_denom !== null) {
      message.lsmTokenIbcDenom = object.lsm_token_ibc_denom;
    }
    return message;
  },
  toAmino(message: MsgLSMLiquidStake, useInterfaces: boolean = false): MsgLSMLiquidStakeAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.amount = message.amount === "" ? undefined : message.amount;
    obj.lsm_token_ibc_denom = message.lsmTokenIbcDenom === "" ? undefined : message.lsmTokenIbcDenom;
    return obj;
  },
  fromAminoMsg(object: MsgLSMLiquidStakeAminoMsg): MsgLSMLiquidStake {
    return MsgLSMLiquidStake.fromAmino(object.value);
  },
  toAminoMsg(message: MsgLSMLiquidStake, useInterfaces: boolean = false): MsgLSMLiquidStakeAminoMsg {
    return {
      type: "stakeibc/MsgLSMLiquidStake",
      value: MsgLSMLiquidStake.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgLSMLiquidStakeProtoMsg, useInterfaces: boolean = false): MsgLSMLiquidStake {
    return MsgLSMLiquidStake.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgLSMLiquidStake): Uint8Array {
    return MsgLSMLiquidStake.encode(message).finish();
  },
  toProtoMsg(message: MsgLSMLiquidStake): MsgLSMLiquidStakeProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.MsgLSMLiquidStake",
      value: MsgLSMLiquidStake.encode(message).finish()
    };
  }
};
function createBaseMsgLSMLiquidStakeResponse(): MsgLSMLiquidStakeResponse {
  return {
    transactionComplete: false
  };
}
export const MsgLSMLiquidStakeResponse = {
  typeUrl: "/stride.stakeibc.MsgLSMLiquidStakeResponse",
  encode(message: MsgLSMLiquidStakeResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.transactionComplete === true) {
      writer.uint32(8).bool(message.transactionComplete);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgLSMLiquidStakeResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgLSMLiquidStakeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.transactionComplete = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgLSMLiquidStakeResponse>): MsgLSMLiquidStakeResponse {
    const message = createBaseMsgLSMLiquidStakeResponse();
    message.transactionComplete = object.transactionComplete ?? false;
    return message;
  },
  fromAmino(object: MsgLSMLiquidStakeResponseAmino): MsgLSMLiquidStakeResponse {
    const message = createBaseMsgLSMLiquidStakeResponse();
    if (object.transaction_complete !== undefined && object.transaction_complete !== null) {
      message.transactionComplete = object.transaction_complete;
    }
    return message;
  },
  toAmino(message: MsgLSMLiquidStakeResponse, useInterfaces: boolean = false): MsgLSMLiquidStakeResponseAmino {
    const obj: any = {};
    obj.transaction_complete = message.transactionComplete === false ? undefined : message.transactionComplete;
    return obj;
  },
  fromAminoMsg(object: MsgLSMLiquidStakeResponseAminoMsg): MsgLSMLiquidStakeResponse {
    return MsgLSMLiquidStakeResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgLSMLiquidStakeResponseProtoMsg, useInterfaces: boolean = false): MsgLSMLiquidStakeResponse {
    return MsgLSMLiquidStakeResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgLSMLiquidStakeResponse): Uint8Array {
    return MsgLSMLiquidStakeResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgLSMLiquidStakeResponse): MsgLSMLiquidStakeResponseProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.MsgLSMLiquidStakeResponse",
      value: MsgLSMLiquidStakeResponse.encode(message).finish()
    };
  }
};
function createBaseMsgClearBalance(): MsgClearBalance {
  return {
    creator: "",
    chainId: "",
    amount: "",
    channel: ""
  };
}
export const MsgClearBalance = {
  typeUrl: "/stride.stakeibc.MsgClearBalance",
  encode(message: MsgClearBalance, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.chainId !== "") {
      writer.uint32(18).string(message.chainId);
    }
    if (message.amount !== "") {
      writer.uint32(26).string(message.amount);
    }
    if (message.channel !== "") {
      writer.uint32(34).string(message.channel);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgClearBalance {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClearBalance();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.chainId = reader.string();
          break;
        case 3:
          message.amount = reader.string();
          break;
        case 4:
          message.channel = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgClearBalance>): MsgClearBalance {
    const message = createBaseMsgClearBalance();
    message.creator = object.creator ?? "";
    message.chainId = object.chainId ?? "";
    message.amount = object.amount ?? "";
    message.channel = object.channel ?? "";
    return message;
  },
  fromAmino(object: MsgClearBalanceAmino): MsgClearBalance {
    const message = createBaseMsgClearBalance();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.chain_id !== undefined && object.chain_id !== null) {
      message.chainId = object.chain_id;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    }
    if (object.channel !== undefined && object.channel !== null) {
      message.channel = object.channel;
    }
    return message;
  },
  toAmino(message: MsgClearBalance, useInterfaces: boolean = false): MsgClearBalanceAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.chain_id = message.chainId === "" ? undefined : message.chainId;
    obj.amount = message.amount === "" ? undefined : message.amount;
    obj.channel = message.channel === "" ? undefined : message.channel;
    return obj;
  },
  fromAminoMsg(object: MsgClearBalanceAminoMsg): MsgClearBalance {
    return MsgClearBalance.fromAmino(object.value);
  },
  toAminoMsg(message: MsgClearBalance, useInterfaces: boolean = false): MsgClearBalanceAminoMsg {
    return {
      type: "stakeibc/MsgClearBalance",
      value: MsgClearBalance.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgClearBalanceProtoMsg, useInterfaces: boolean = false): MsgClearBalance {
    return MsgClearBalance.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgClearBalance): Uint8Array {
    return MsgClearBalance.encode(message).finish();
  },
  toProtoMsg(message: MsgClearBalance): MsgClearBalanceProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.MsgClearBalance",
      value: MsgClearBalance.encode(message).finish()
    };
  }
};
function createBaseMsgClearBalanceResponse(): MsgClearBalanceResponse {
  return {};
}
export const MsgClearBalanceResponse = {
  typeUrl: "/stride.stakeibc.MsgClearBalanceResponse",
  encode(_: MsgClearBalanceResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgClearBalanceResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClearBalanceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgClearBalanceResponse>): MsgClearBalanceResponse {
    const message = createBaseMsgClearBalanceResponse();
    return message;
  },
  fromAmino(_: MsgClearBalanceResponseAmino): MsgClearBalanceResponse {
    const message = createBaseMsgClearBalanceResponse();
    return message;
  },
  toAmino(_: MsgClearBalanceResponse, useInterfaces: boolean = false): MsgClearBalanceResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgClearBalanceResponseAminoMsg): MsgClearBalanceResponse {
    return MsgClearBalanceResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgClearBalanceResponseProtoMsg, useInterfaces: boolean = false): MsgClearBalanceResponse {
    return MsgClearBalanceResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgClearBalanceResponse): Uint8Array {
    return MsgClearBalanceResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgClearBalanceResponse): MsgClearBalanceResponseProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.MsgClearBalanceResponse",
      value: MsgClearBalanceResponse.encode(message).finish()
    };
  }
};
function createBaseMsgRedeemStake(): MsgRedeemStake {
  return {
    creator: "",
    amount: "",
    hostZone: "",
    receiver: ""
  };
}
export const MsgRedeemStake = {
  typeUrl: "/stride.stakeibc.MsgRedeemStake",
  encode(message: MsgRedeemStake, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.amount !== "") {
      writer.uint32(18).string(message.amount);
    }
    if (message.hostZone !== "") {
      writer.uint32(26).string(message.hostZone);
    }
    if (message.receiver !== "") {
      writer.uint32(34).string(message.receiver);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRedeemStake {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRedeemStake();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.amount = reader.string();
          break;
        case 3:
          message.hostZone = reader.string();
          break;
        case 4:
          message.receiver = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgRedeemStake>): MsgRedeemStake {
    const message = createBaseMsgRedeemStake();
    message.creator = object.creator ?? "";
    message.amount = object.amount ?? "";
    message.hostZone = object.hostZone ?? "";
    message.receiver = object.receiver ?? "";
    return message;
  },
  fromAmino(object: MsgRedeemStakeAmino): MsgRedeemStake {
    const message = createBaseMsgRedeemStake();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    }
    if (object.host_zone !== undefined && object.host_zone !== null) {
      message.hostZone = object.host_zone;
    }
    if (object.receiver !== undefined && object.receiver !== null) {
      message.receiver = object.receiver;
    }
    return message;
  },
  toAmino(message: MsgRedeemStake, useInterfaces: boolean = false): MsgRedeemStakeAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.amount = message.amount === "" ? undefined : message.amount;
    obj.host_zone = message.hostZone === "" ? undefined : message.hostZone;
    obj.receiver = message.receiver === "" ? undefined : message.receiver;
    return obj;
  },
  fromAminoMsg(object: MsgRedeemStakeAminoMsg): MsgRedeemStake {
    return MsgRedeemStake.fromAmino(object.value);
  },
  toAminoMsg(message: MsgRedeemStake, useInterfaces: boolean = false): MsgRedeemStakeAminoMsg {
    return {
      type: "stakeibc/MsgRedeemStake",
      value: MsgRedeemStake.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgRedeemStakeProtoMsg, useInterfaces: boolean = false): MsgRedeemStake {
    return MsgRedeemStake.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRedeemStake): Uint8Array {
    return MsgRedeemStake.encode(message).finish();
  },
  toProtoMsg(message: MsgRedeemStake): MsgRedeemStakeProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.MsgRedeemStake",
      value: MsgRedeemStake.encode(message).finish()
    };
  }
};
function createBaseMsgRedeemStakeResponse(): MsgRedeemStakeResponse {
  return {};
}
export const MsgRedeemStakeResponse = {
  typeUrl: "/stride.stakeibc.MsgRedeemStakeResponse",
  encode(_: MsgRedeemStakeResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRedeemStakeResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRedeemStakeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgRedeemStakeResponse>): MsgRedeemStakeResponse {
    const message = createBaseMsgRedeemStakeResponse();
    return message;
  },
  fromAmino(_: MsgRedeemStakeResponseAmino): MsgRedeemStakeResponse {
    const message = createBaseMsgRedeemStakeResponse();
    return message;
  },
  toAmino(_: MsgRedeemStakeResponse, useInterfaces: boolean = false): MsgRedeemStakeResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgRedeemStakeResponseAminoMsg): MsgRedeemStakeResponse {
    return MsgRedeemStakeResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRedeemStakeResponseProtoMsg, useInterfaces: boolean = false): MsgRedeemStakeResponse {
    return MsgRedeemStakeResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRedeemStakeResponse): Uint8Array {
    return MsgRedeemStakeResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgRedeemStakeResponse): MsgRedeemStakeResponseProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.MsgRedeemStakeResponse",
      value: MsgRedeemStakeResponse.encode(message).finish()
    };
  }
};
function createBaseMsgRegisterHostZone(): MsgRegisterHostZone {
  return {
    connectionId: "",
    bech32prefix: "",
    hostDenom: "",
    ibcDenom: "",
    creator: "",
    transferChannelId: "",
    unbondingPeriod: BigInt(0),
    minRedemptionRate: "",
    maxRedemptionRate: "",
    lsmLiquidStakeEnabled: false,
    communityPoolTreasuryAddress: "",
    maxMessagesPerIcaTx: BigInt(0)
  };
}
export const MsgRegisterHostZone = {
  typeUrl: "/stride.stakeibc.MsgRegisterHostZone",
  encode(message: MsgRegisterHostZone, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.connectionId !== "") {
      writer.uint32(18).string(message.connectionId);
    }
    if (message.bech32prefix !== "") {
      writer.uint32(98).string(message.bech32prefix);
    }
    if (message.hostDenom !== "") {
      writer.uint32(34).string(message.hostDenom);
    }
    if (message.ibcDenom !== "") {
      writer.uint32(42).string(message.ibcDenom);
    }
    if (message.creator !== "") {
      writer.uint32(50).string(message.creator);
    }
    if (message.transferChannelId !== "") {
      writer.uint32(82).string(message.transferChannelId);
    }
    if (message.unbondingPeriod !== BigInt(0)) {
      writer.uint32(88).uint64(message.unbondingPeriod);
    }
    if (message.minRedemptionRate !== "") {
      writer.uint32(106).string(Decimal.fromUserInput(message.minRedemptionRate, 18).atomics);
    }
    if (message.maxRedemptionRate !== "") {
      writer.uint32(114).string(Decimal.fromUserInput(message.maxRedemptionRate, 18).atomics);
    }
    if (message.lsmLiquidStakeEnabled === true) {
      writer.uint32(120).bool(message.lsmLiquidStakeEnabled);
    }
    if (message.communityPoolTreasuryAddress !== "") {
      writer.uint32(130).string(message.communityPoolTreasuryAddress);
    }
    if (message.maxMessagesPerIcaTx !== BigInt(0)) {
      writer.uint32(136).uint64(message.maxMessagesPerIcaTx);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRegisterHostZone {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterHostZone();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.connectionId = reader.string();
          break;
        case 12:
          message.bech32prefix = reader.string();
          break;
        case 4:
          message.hostDenom = reader.string();
          break;
        case 5:
          message.ibcDenom = reader.string();
          break;
        case 6:
          message.creator = reader.string();
          break;
        case 10:
          message.transferChannelId = reader.string();
          break;
        case 11:
          message.unbondingPeriod = reader.uint64();
          break;
        case 13:
          message.minRedemptionRate = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 14:
          message.maxRedemptionRate = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 15:
          message.lsmLiquidStakeEnabled = reader.bool();
          break;
        case 16:
          message.communityPoolTreasuryAddress = reader.string();
          break;
        case 17:
          message.maxMessagesPerIcaTx = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgRegisterHostZone>): MsgRegisterHostZone {
    const message = createBaseMsgRegisterHostZone();
    message.connectionId = object.connectionId ?? "";
    message.bech32prefix = object.bech32prefix ?? "";
    message.hostDenom = object.hostDenom ?? "";
    message.ibcDenom = object.ibcDenom ?? "";
    message.creator = object.creator ?? "";
    message.transferChannelId = object.transferChannelId ?? "";
    message.unbondingPeriod = object.unbondingPeriod !== undefined && object.unbondingPeriod !== null ? BigInt(object.unbondingPeriod.toString()) : BigInt(0);
    message.minRedemptionRate = object.minRedemptionRate ?? "";
    message.maxRedemptionRate = object.maxRedemptionRate ?? "";
    message.lsmLiquidStakeEnabled = object.lsmLiquidStakeEnabled ?? false;
    message.communityPoolTreasuryAddress = object.communityPoolTreasuryAddress ?? "";
    message.maxMessagesPerIcaTx = object.maxMessagesPerIcaTx !== undefined && object.maxMessagesPerIcaTx !== null ? BigInt(object.maxMessagesPerIcaTx.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgRegisterHostZoneAmino): MsgRegisterHostZone {
    const message = createBaseMsgRegisterHostZone();
    if (object.connection_id !== undefined && object.connection_id !== null) {
      message.connectionId = object.connection_id;
    }
    if (object.bech32prefix !== undefined && object.bech32prefix !== null) {
      message.bech32prefix = object.bech32prefix;
    }
    if (object.host_denom !== undefined && object.host_denom !== null) {
      message.hostDenom = object.host_denom;
    }
    if (object.ibc_denom !== undefined && object.ibc_denom !== null) {
      message.ibcDenom = object.ibc_denom;
    }
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.transfer_channel_id !== undefined && object.transfer_channel_id !== null) {
      message.transferChannelId = object.transfer_channel_id;
    }
    if (object.unbonding_period !== undefined && object.unbonding_period !== null) {
      message.unbondingPeriod = BigInt(object.unbonding_period);
    }
    if (object.min_redemption_rate !== undefined && object.min_redemption_rate !== null) {
      message.minRedemptionRate = object.min_redemption_rate;
    }
    if (object.max_redemption_rate !== undefined && object.max_redemption_rate !== null) {
      message.maxRedemptionRate = object.max_redemption_rate;
    }
    if (object.lsm_liquid_stake_enabled !== undefined && object.lsm_liquid_stake_enabled !== null) {
      message.lsmLiquidStakeEnabled = object.lsm_liquid_stake_enabled;
    }
    if (object.community_pool_treasury_address !== undefined && object.community_pool_treasury_address !== null) {
      message.communityPoolTreasuryAddress = object.community_pool_treasury_address;
    }
    if (object.max_messages_per_ica_tx !== undefined && object.max_messages_per_ica_tx !== null) {
      message.maxMessagesPerIcaTx = BigInt(object.max_messages_per_ica_tx);
    }
    return message;
  },
  toAmino(message: MsgRegisterHostZone, useInterfaces: boolean = false): MsgRegisterHostZoneAmino {
    const obj: any = {};
    obj.connection_id = message.connectionId === "" ? undefined : message.connectionId;
    obj.bech32prefix = message.bech32prefix === "" ? undefined : message.bech32prefix;
    obj.host_denom = message.hostDenom === "" ? undefined : message.hostDenom;
    obj.ibc_denom = message.ibcDenom === "" ? undefined : message.ibcDenom;
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.transfer_channel_id = message.transferChannelId === "" ? undefined : message.transferChannelId;
    obj.unbonding_period = message.unbondingPeriod !== BigInt(0) ? message.unbondingPeriod.toString() : undefined;
    obj.min_redemption_rate = message.minRedemptionRate === "" ? undefined : message.minRedemptionRate;
    obj.max_redemption_rate = message.maxRedemptionRate === "" ? undefined : message.maxRedemptionRate;
    obj.lsm_liquid_stake_enabled = message.lsmLiquidStakeEnabled === false ? undefined : message.lsmLiquidStakeEnabled;
    obj.community_pool_treasury_address = message.communityPoolTreasuryAddress === "" ? undefined : message.communityPoolTreasuryAddress;
    obj.max_messages_per_ica_tx = message.maxMessagesPerIcaTx !== BigInt(0) ? message.maxMessagesPerIcaTx.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgRegisterHostZoneAminoMsg): MsgRegisterHostZone {
    return MsgRegisterHostZone.fromAmino(object.value);
  },
  toAminoMsg(message: MsgRegisterHostZone, useInterfaces: boolean = false): MsgRegisterHostZoneAminoMsg {
    return {
      type: "stakeibc/MsgRegisterHostZone",
      value: MsgRegisterHostZone.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgRegisterHostZoneProtoMsg, useInterfaces: boolean = false): MsgRegisterHostZone {
    return MsgRegisterHostZone.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRegisterHostZone): Uint8Array {
    return MsgRegisterHostZone.encode(message).finish();
  },
  toProtoMsg(message: MsgRegisterHostZone): MsgRegisterHostZoneProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.MsgRegisterHostZone",
      value: MsgRegisterHostZone.encode(message).finish()
    };
  }
};
function createBaseMsgRegisterHostZoneResponse(): MsgRegisterHostZoneResponse {
  return {};
}
export const MsgRegisterHostZoneResponse = {
  typeUrl: "/stride.stakeibc.MsgRegisterHostZoneResponse",
  encode(_: MsgRegisterHostZoneResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRegisterHostZoneResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterHostZoneResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgRegisterHostZoneResponse>): MsgRegisterHostZoneResponse {
    const message = createBaseMsgRegisterHostZoneResponse();
    return message;
  },
  fromAmino(_: MsgRegisterHostZoneResponseAmino): MsgRegisterHostZoneResponse {
    const message = createBaseMsgRegisterHostZoneResponse();
    return message;
  },
  toAmino(_: MsgRegisterHostZoneResponse, useInterfaces: boolean = false): MsgRegisterHostZoneResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgRegisterHostZoneResponseAminoMsg): MsgRegisterHostZoneResponse {
    return MsgRegisterHostZoneResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRegisterHostZoneResponseProtoMsg, useInterfaces: boolean = false): MsgRegisterHostZoneResponse {
    return MsgRegisterHostZoneResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRegisterHostZoneResponse): Uint8Array {
    return MsgRegisterHostZoneResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgRegisterHostZoneResponse): MsgRegisterHostZoneResponseProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.MsgRegisterHostZoneResponse",
      value: MsgRegisterHostZoneResponse.encode(message).finish()
    };
  }
};
function createBaseMsgClaimUndelegatedTokens(): MsgClaimUndelegatedTokens {
  return {
    creator: "",
    hostZoneId: "",
    epoch: BigInt(0),
    receiver: ""
  };
}
export const MsgClaimUndelegatedTokens = {
  typeUrl: "/stride.stakeibc.MsgClaimUndelegatedTokens",
  encode(message: MsgClaimUndelegatedTokens, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.hostZoneId !== "") {
      writer.uint32(18).string(message.hostZoneId);
    }
    if (message.epoch !== BigInt(0)) {
      writer.uint32(24).uint64(message.epoch);
    }
    if (message.receiver !== "") {
      writer.uint32(42).string(message.receiver);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgClaimUndelegatedTokens {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClaimUndelegatedTokens();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.hostZoneId = reader.string();
          break;
        case 3:
          message.epoch = reader.uint64();
          break;
        case 5:
          message.receiver = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgClaimUndelegatedTokens>): MsgClaimUndelegatedTokens {
    const message = createBaseMsgClaimUndelegatedTokens();
    message.creator = object.creator ?? "";
    message.hostZoneId = object.hostZoneId ?? "";
    message.epoch = object.epoch !== undefined && object.epoch !== null ? BigInt(object.epoch.toString()) : BigInt(0);
    message.receiver = object.receiver ?? "";
    return message;
  },
  fromAmino(object: MsgClaimUndelegatedTokensAmino): MsgClaimUndelegatedTokens {
    const message = createBaseMsgClaimUndelegatedTokens();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.host_zone_id !== undefined && object.host_zone_id !== null) {
      message.hostZoneId = object.host_zone_id;
    }
    if (object.epoch !== undefined && object.epoch !== null) {
      message.epoch = BigInt(object.epoch);
    }
    if (object.receiver !== undefined && object.receiver !== null) {
      message.receiver = object.receiver;
    }
    return message;
  },
  toAmino(message: MsgClaimUndelegatedTokens, useInterfaces: boolean = false): MsgClaimUndelegatedTokensAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.host_zone_id = message.hostZoneId === "" ? undefined : message.hostZoneId;
    obj.epoch = message.epoch !== BigInt(0) ? message.epoch.toString() : undefined;
    obj.receiver = message.receiver === "" ? undefined : message.receiver;
    return obj;
  },
  fromAminoMsg(object: MsgClaimUndelegatedTokensAminoMsg): MsgClaimUndelegatedTokens {
    return MsgClaimUndelegatedTokens.fromAmino(object.value);
  },
  toAminoMsg(message: MsgClaimUndelegatedTokens, useInterfaces: boolean = false): MsgClaimUndelegatedTokensAminoMsg {
    return {
      type: "stakeibc/MsgClaimUndelegatedTokens",
      value: MsgClaimUndelegatedTokens.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgClaimUndelegatedTokensProtoMsg, useInterfaces: boolean = false): MsgClaimUndelegatedTokens {
    return MsgClaimUndelegatedTokens.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgClaimUndelegatedTokens): Uint8Array {
    return MsgClaimUndelegatedTokens.encode(message).finish();
  },
  toProtoMsg(message: MsgClaimUndelegatedTokens): MsgClaimUndelegatedTokensProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.MsgClaimUndelegatedTokens",
      value: MsgClaimUndelegatedTokens.encode(message).finish()
    };
  }
};
function createBaseMsgClaimUndelegatedTokensResponse(): MsgClaimUndelegatedTokensResponse {
  return {};
}
export const MsgClaimUndelegatedTokensResponse = {
  typeUrl: "/stride.stakeibc.MsgClaimUndelegatedTokensResponse",
  encode(_: MsgClaimUndelegatedTokensResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgClaimUndelegatedTokensResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgClaimUndelegatedTokensResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgClaimUndelegatedTokensResponse>): MsgClaimUndelegatedTokensResponse {
    const message = createBaseMsgClaimUndelegatedTokensResponse();
    return message;
  },
  fromAmino(_: MsgClaimUndelegatedTokensResponseAmino): MsgClaimUndelegatedTokensResponse {
    const message = createBaseMsgClaimUndelegatedTokensResponse();
    return message;
  },
  toAmino(_: MsgClaimUndelegatedTokensResponse, useInterfaces: boolean = false): MsgClaimUndelegatedTokensResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgClaimUndelegatedTokensResponseAminoMsg): MsgClaimUndelegatedTokensResponse {
    return MsgClaimUndelegatedTokensResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgClaimUndelegatedTokensResponseProtoMsg, useInterfaces: boolean = false): MsgClaimUndelegatedTokensResponse {
    return MsgClaimUndelegatedTokensResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgClaimUndelegatedTokensResponse): Uint8Array {
    return MsgClaimUndelegatedTokensResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgClaimUndelegatedTokensResponse): MsgClaimUndelegatedTokensResponseProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.MsgClaimUndelegatedTokensResponse",
      value: MsgClaimUndelegatedTokensResponse.encode(message).finish()
    };
  }
};
function createBaseMsgRebalanceValidators(): MsgRebalanceValidators {
  return {
    creator: "",
    hostZone: "",
    numRebalance: BigInt(0)
  };
}
export const MsgRebalanceValidators = {
  typeUrl: "/stride.stakeibc.MsgRebalanceValidators",
  encode(message: MsgRebalanceValidators, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.hostZone !== "") {
      writer.uint32(18).string(message.hostZone);
    }
    if (message.numRebalance !== BigInt(0)) {
      writer.uint32(24).uint64(message.numRebalance);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRebalanceValidators {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRebalanceValidators();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.hostZone = reader.string();
          break;
        case 3:
          message.numRebalance = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgRebalanceValidators>): MsgRebalanceValidators {
    const message = createBaseMsgRebalanceValidators();
    message.creator = object.creator ?? "";
    message.hostZone = object.hostZone ?? "";
    message.numRebalance = object.numRebalance !== undefined && object.numRebalance !== null ? BigInt(object.numRebalance.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgRebalanceValidatorsAmino): MsgRebalanceValidators {
    const message = createBaseMsgRebalanceValidators();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.host_zone !== undefined && object.host_zone !== null) {
      message.hostZone = object.host_zone;
    }
    if (object.num_rebalance !== undefined && object.num_rebalance !== null) {
      message.numRebalance = BigInt(object.num_rebalance);
    }
    return message;
  },
  toAmino(message: MsgRebalanceValidators, useInterfaces: boolean = false): MsgRebalanceValidatorsAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.host_zone = message.hostZone === "" ? undefined : message.hostZone;
    obj.num_rebalance = message.numRebalance !== BigInt(0) ? message.numRebalance.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgRebalanceValidatorsAminoMsg): MsgRebalanceValidators {
    return MsgRebalanceValidators.fromAmino(object.value);
  },
  toAminoMsg(message: MsgRebalanceValidators, useInterfaces: boolean = false): MsgRebalanceValidatorsAminoMsg {
    return {
      type: "stakeibc/MsgRebalanceValidators",
      value: MsgRebalanceValidators.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgRebalanceValidatorsProtoMsg, useInterfaces: boolean = false): MsgRebalanceValidators {
    return MsgRebalanceValidators.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRebalanceValidators): Uint8Array {
    return MsgRebalanceValidators.encode(message).finish();
  },
  toProtoMsg(message: MsgRebalanceValidators): MsgRebalanceValidatorsProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.MsgRebalanceValidators",
      value: MsgRebalanceValidators.encode(message).finish()
    };
  }
};
function createBaseMsgRebalanceValidatorsResponse(): MsgRebalanceValidatorsResponse {
  return {};
}
export const MsgRebalanceValidatorsResponse = {
  typeUrl: "/stride.stakeibc.MsgRebalanceValidatorsResponse",
  encode(_: MsgRebalanceValidatorsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRebalanceValidatorsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRebalanceValidatorsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgRebalanceValidatorsResponse>): MsgRebalanceValidatorsResponse {
    const message = createBaseMsgRebalanceValidatorsResponse();
    return message;
  },
  fromAmino(_: MsgRebalanceValidatorsResponseAmino): MsgRebalanceValidatorsResponse {
    const message = createBaseMsgRebalanceValidatorsResponse();
    return message;
  },
  toAmino(_: MsgRebalanceValidatorsResponse, useInterfaces: boolean = false): MsgRebalanceValidatorsResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgRebalanceValidatorsResponseAminoMsg): MsgRebalanceValidatorsResponse {
    return MsgRebalanceValidatorsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRebalanceValidatorsResponseProtoMsg, useInterfaces: boolean = false): MsgRebalanceValidatorsResponse {
    return MsgRebalanceValidatorsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRebalanceValidatorsResponse): Uint8Array {
    return MsgRebalanceValidatorsResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgRebalanceValidatorsResponse): MsgRebalanceValidatorsResponseProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.MsgRebalanceValidatorsResponse",
      value: MsgRebalanceValidatorsResponse.encode(message).finish()
    };
  }
};
function createBaseMsgAddValidators(): MsgAddValidators {
  return {
    creator: "",
    hostZone: "",
    validators: []
  };
}
export const MsgAddValidators = {
  typeUrl: "/stride.stakeibc.MsgAddValidators",
  encode(message: MsgAddValidators, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.hostZone !== "") {
      writer.uint32(18).string(message.hostZone);
    }
    for (const v of message.validators) {
      Validator.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgAddValidators {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddValidators();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.hostZone = reader.string();
          break;
        case 3:
          message.validators.push(Validator.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgAddValidators>): MsgAddValidators {
    const message = createBaseMsgAddValidators();
    message.creator = object.creator ?? "";
    message.hostZone = object.hostZone ?? "";
    message.validators = object.validators?.map(e => Validator.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: MsgAddValidatorsAmino): MsgAddValidators {
    const message = createBaseMsgAddValidators();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.host_zone !== undefined && object.host_zone !== null) {
      message.hostZone = object.host_zone;
    }
    message.validators = object.validators?.map(e => Validator.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: MsgAddValidators, useInterfaces: boolean = false): MsgAddValidatorsAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.host_zone = message.hostZone === "" ? undefined : message.hostZone;
    if (message.validators) {
      obj.validators = message.validators.map(e => e ? Validator.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.validators = message.validators;
    }
    return obj;
  },
  fromAminoMsg(object: MsgAddValidatorsAminoMsg): MsgAddValidators {
    return MsgAddValidators.fromAmino(object.value);
  },
  toAminoMsg(message: MsgAddValidators, useInterfaces: boolean = false): MsgAddValidatorsAminoMsg {
    return {
      type: "stakeibc/MsgAddValidators",
      value: MsgAddValidators.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgAddValidatorsProtoMsg, useInterfaces: boolean = false): MsgAddValidators {
    return MsgAddValidators.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgAddValidators): Uint8Array {
    return MsgAddValidators.encode(message).finish();
  },
  toProtoMsg(message: MsgAddValidators): MsgAddValidatorsProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.MsgAddValidators",
      value: MsgAddValidators.encode(message).finish()
    };
  }
};
function createBaseMsgAddValidatorsResponse(): MsgAddValidatorsResponse {
  return {};
}
export const MsgAddValidatorsResponse = {
  typeUrl: "/stride.stakeibc.MsgAddValidatorsResponse",
  encode(_: MsgAddValidatorsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgAddValidatorsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddValidatorsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgAddValidatorsResponse>): MsgAddValidatorsResponse {
    const message = createBaseMsgAddValidatorsResponse();
    return message;
  },
  fromAmino(_: MsgAddValidatorsResponseAmino): MsgAddValidatorsResponse {
    const message = createBaseMsgAddValidatorsResponse();
    return message;
  },
  toAmino(_: MsgAddValidatorsResponse, useInterfaces: boolean = false): MsgAddValidatorsResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgAddValidatorsResponseAminoMsg): MsgAddValidatorsResponse {
    return MsgAddValidatorsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgAddValidatorsResponseProtoMsg, useInterfaces: boolean = false): MsgAddValidatorsResponse {
    return MsgAddValidatorsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgAddValidatorsResponse): Uint8Array {
    return MsgAddValidatorsResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgAddValidatorsResponse): MsgAddValidatorsResponseProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.MsgAddValidatorsResponse",
      value: MsgAddValidatorsResponse.encode(message).finish()
    };
  }
};
function createBaseValidatorWeight(): ValidatorWeight {
  return {
    address: "",
    weight: BigInt(0)
  };
}
export const ValidatorWeight = {
  typeUrl: "/stride.stakeibc.ValidatorWeight",
  encode(message: ValidatorWeight, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.weight !== BigInt(0)) {
      writer.uint32(16).uint64(message.weight);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ValidatorWeight {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidatorWeight();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.weight = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ValidatorWeight>): ValidatorWeight {
    const message = createBaseValidatorWeight();
    message.address = object.address ?? "";
    message.weight = object.weight !== undefined && object.weight !== null ? BigInt(object.weight.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: ValidatorWeightAmino): ValidatorWeight {
    const message = createBaseValidatorWeight();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    if (object.weight !== undefined && object.weight !== null) {
      message.weight = BigInt(object.weight);
    }
    return message;
  },
  toAmino(message: ValidatorWeight, useInterfaces: boolean = false): ValidatorWeightAmino {
    const obj: any = {};
    obj.address = message.address === "" ? undefined : message.address;
    obj.weight = message.weight !== BigInt(0) ? message.weight.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: ValidatorWeightAminoMsg): ValidatorWeight {
    return ValidatorWeight.fromAmino(object.value);
  },
  fromProtoMsg(message: ValidatorWeightProtoMsg, useInterfaces: boolean = false): ValidatorWeight {
    return ValidatorWeight.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ValidatorWeight): Uint8Array {
    return ValidatorWeight.encode(message).finish();
  },
  toProtoMsg(message: ValidatorWeight): ValidatorWeightProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.ValidatorWeight",
      value: ValidatorWeight.encode(message).finish()
    };
  }
};
function createBaseMsgChangeValidatorWeights(): MsgChangeValidatorWeights {
  return {
    creator: "",
    hostZone: "",
    validatorWeights: []
  };
}
export const MsgChangeValidatorWeights = {
  typeUrl: "/stride.stakeibc.MsgChangeValidatorWeights",
  encode(message: MsgChangeValidatorWeights, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.hostZone !== "") {
      writer.uint32(18).string(message.hostZone);
    }
    for (const v of message.validatorWeights) {
      ValidatorWeight.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgChangeValidatorWeights {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChangeValidatorWeights();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.hostZone = reader.string();
          break;
        case 3:
          message.validatorWeights.push(ValidatorWeight.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgChangeValidatorWeights>): MsgChangeValidatorWeights {
    const message = createBaseMsgChangeValidatorWeights();
    message.creator = object.creator ?? "";
    message.hostZone = object.hostZone ?? "";
    message.validatorWeights = object.validatorWeights?.map(e => ValidatorWeight.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: MsgChangeValidatorWeightsAmino): MsgChangeValidatorWeights {
    const message = createBaseMsgChangeValidatorWeights();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.host_zone !== undefined && object.host_zone !== null) {
      message.hostZone = object.host_zone;
    }
    message.validatorWeights = object.validator_weights?.map(e => ValidatorWeight.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: MsgChangeValidatorWeights, useInterfaces: boolean = false): MsgChangeValidatorWeightsAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.host_zone = message.hostZone === "" ? undefined : message.hostZone;
    if (message.validatorWeights) {
      obj.validator_weights = message.validatorWeights.map(e => e ? ValidatorWeight.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.validator_weights = message.validatorWeights;
    }
    return obj;
  },
  fromAminoMsg(object: MsgChangeValidatorWeightsAminoMsg): MsgChangeValidatorWeights {
    return MsgChangeValidatorWeights.fromAmino(object.value);
  },
  toAminoMsg(message: MsgChangeValidatorWeights, useInterfaces: boolean = false): MsgChangeValidatorWeightsAminoMsg {
    return {
      type: "stakeibc/MsgChangeValidatorWeights",
      value: MsgChangeValidatorWeights.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgChangeValidatorWeightsProtoMsg, useInterfaces: boolean = false): MsgChangeValidatorWeights {
    return MsgChangeValidatorWeights.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgChangeValidatorWeights): Uint8Array {
    return MsgChangeValidatorWeights.encode(message).finish();
  },
  toProtoMsg(message: MsgChangeValidatorWeights): MsgChangeValidatorWeightsProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.MsgChangeValidatorWeights",
      value: MsgChangeValidatorWeights.encode(message).finish()
    };
  }
};
function createBaseMsgChangeValidatorWeightsResponse(): MsgChangeValidatorWeightsResponse {
  return {};
}
export const MsgChangeValidatorWeightsResponse = {
  typeUrl: "/stride.stakeibc.MsgChangeValidatorWeightsResponse",
  encode(_: MsgChangeValidatorWeightsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgChangeValidatorWeightsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChangeValidatorWeightsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgChangeValidatorWeightsResponse>): MsgChangeValidatorWeightsResponse {
    const message = createBaseMsgChangeValidatorWeightsResponse();
    return message;
  },
  fromAmino(_: MsgChangeValidatorWeightsResponseAmino): MsgChangeValidatorWeightsResponse {
    const message = createBaseMsgChangeValidatorWeightsResponse();
    return message;
  },
  toAmino(_: MsgChangeValidatorWeightsResponse, useInterfaces: boolean = false): MsgChangeValidatorWeightsResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgChangeValidatorWeightsResponseAminoMsg): MsgChangeValidatorWeightsResponse {
    return MsgChangeValidatorWeightsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgChangeValidatorWeightsResponseProtoMsg, useInterfaces: boolean = false): MsgChangeValidatorWeightsResponse {
    return MsgChangeValidatorWeightsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgChangeValidatorWeightsResponse): Uint8Array {
    return MsgChangeValidatorWeightsResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgChangeValidatorWeightsResponse): MsgChangeValidatorWeightsResponseProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.MsgChangeValidatorWeightsResponse",
      value: MsgChangeValidatorWeightsResponse.encode(message).finish()
    };
  }
};
function createBaseMsgDeleteValidator(): MsgDeleteValidator {
  return {
    creator: "",
    hostZone: "",
    valAddr: ""
  };
}
export const MsgDeleteValidator = {
  typeUrl: "/stride.stakeibc.MsgDeleteValidator",
  encode(message: MsgDeleteValidator, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.hostZone !== "") {
      writer.uint32(18).string(message.hostZone);
    }
    if (message.valAddr !== "") {
      writer.uint32(26).string(message.valAddr);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgDeleteValidator {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteValidator();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.hostZone = reader.string();
          break;
        case 3:
          message.valAddr = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgDeleteValidator>): MsgDeleteValidator {
    const message = createBaseMsgDeleteValidator();
    message.creator = object.creator ?? "";
    message.hostZone = object.hostZone ?? "";
    message.valAddr = object.valAddr ?? "";
    return message;
  },
  fromAmino(object: MsgDeleteValidatorAmino): MsgDeleteValidator {
    const message = createBaseMsgDeleteValidator();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.host_zone !== undefined && object.host_zone !== null) {
      message.hostZone = object.host_zone;
    }
    if (object.val_addr !== undefined && object.val_addr !== null) {
      message.valAddr = object.val_addr;
    }
    return message;
  },
  toAmino(message: MsgDeleteValidator, useInterfaces: boolean = false): MsgDeleteValidatorAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.host_zone = message.hostZone === "" ? undefined : message.hostZone;
    obj.val_addr = message.valAddr === "" ? undefined : message.valAddr;
    return obj;
  },
  fromAminoMsg(object: MsgDeleteValidatorAminoMsg): MsgDeleteValidator {
    return MsgDeleteValidator.fromAmino(object.value);
  },
  toAminoMsg(message: MsgDeleteValidator, useInterfaces: boolean = false): MsgDeleteValidatorAminoMsg {
    return {
      type: "stakeibc/MsgDeleteValidator",
      value: MsgDeleteValidator.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgDeleteValidatorProtoMsg, useInterfaces: boolean = false): MsgDeleteValidator {
    return MsgDeleteValidator.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgDeleteValidator): Uint8Array {
    return MsgDeleteValidator.encode(message).finish();
  },
  toProtoMsg(message: MsgDeleteValidator): MsgDeleteValidatorProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.MsgDeleteValidator",
      value: MsgDeleteValidator.encode(message).finish()
    };
  }
};
function createBaseMsgDeleteValidatorResponse(): MsgDeleteValidatorResponse {
  return {};
}
export const MsgDeleteValidatorResponse = {
  typeUrl: "/stride.stakeibc.MsgDeleteValidatorResponse",
  encode(_: MsgDeleteValidatorResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgDeleteValidatorResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteValidatorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgDeleteValidatorResponse>): MsgDeleteValidatorResponse {
    const message = createBaseMsgDeleteValidatorResponse();
    return message;
  },
  fromAmino(_: MsgDeleteValidatorResponseAmino): MsgDeleteValidatorResponse {
    const message = createBaseMsgDeleteValidatorResponse();
    return message;
  },
  toAmino(_: MsgDeleteValidatorResponse, useInterfaces: boolean = false): MsgDeleteValidatorResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgDeleteValidatorResponseAminoMsg): MsgDeleteValidatorResponse {
    return MsgDeleteValidatorResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgDeleteValidatorResponseProtoMsg, useInterfaces: boolean = false): MsgDeleteValidatorResponse {
    return MsgDeleteValidatorResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgDeleteValidatorResponse): Uint8Array {
    return MsgDeleteValidatorResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgDeleteValidatorResponse): MsgDeleteValidatorResponseProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.MsgDeleteValidatorResponse",
      value: MsgDeleteValidatorResponse.encode(message).finish()
    };
  }
};
function createBaseMsgRestoreInterchainAccount(): MsgRestoreInterchainAccount {
  return {
    creator: "",
    chainId: "",
    connectionId: "",
    accountOwner: ""
  };
}
export const MsgRestoreInterchainAccount = {
  typeUrl: "/stride.stakeibc.MsgRestoreInterchainAccount",
  encode(message: MsgRestoreInterchainAccount, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.chainId !== "") {
      writer.uint32(18).string(message.chainId);
    }
    if (message.connectionId !== "") {
      writer.uint32(26).string(message.connectionId);
    }
    if (message.accountOwner !== "") {
      writer.uint32(34).string(message.accountOwner);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRestoreInterchainAccount {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRestoreInterchainAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.chainId = reader.string();
          break;
        case 3:
          message.connectionId = reader.string();
          break;
        case 4:
          message.accountOwner = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgRestoreInterchainAccount>): MsgRestoreInterchainAccount {
    const message = createBaseMsgRestoreInterchainAccount();
    message.creator = object.creator ?? "";
    message.chainId = object.chainId ?? "";
    message.connectionId = object.connectionId ?? "";
    message.accountOwner = object.accountOwner ?? "";
    return message;
  },
  fromAmino(object: MsgRestoreInterchainAccountAmino): MsgRestoreInterchainAccount {
    const message = createBaseMsgRestoreInterchainAccount();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.chain_id !== undefined && object.chain_id !== null) {
      message.chainId = object.chain_id;
    }
    if (object.connection_id !== undefined && object.connection_id !== null) {
      message.connectionId = object.connection_id;
    }
    if (object.account_owner !== undefined && object.account_owner !== null) {
      message.accountOwner = object.account_owner;
    }
    return message;
  },
  toAmino(message: MsgRestoreInterchainAccount, useInterfaces: boolean = false): MsgRestoreInterchainAccountAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.chain_id = message.chainId === "" ? undefined : message.chainId;
    obj.connection_id = message.connectionId === "" ? undefined : message.connectionId;
    obj.account_owner = message.accountOwner === "" ? undefined : message.accountOwner;
    return obj;
  },
  fromAminoMsg(object: MsgRestoreInterchainAccountAminoMsg): MsgRestoreInterchainAccount {
    return MsgRestoreInterchainAccount.fromAmino(object.value);
  },
  toAminoMsg(message: MsgRestoreInterchainAccount, useInterfaces: boolean = false): MsgRestoreInterchainAccountAminoMsg {
    return {
      type: "stakeibc/MsgRestoreInterchainAcco",
      value: MsgRestoreInterchainAccount.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgRestoreInterchainAccountProtoMsg, useInterfaces: boolean = false): MsgRestoreInterchainAccount {
    return MsgRestoreInterchainAccount.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRestoreInterchainAccount): Uint8Array {
    return MsgRestoreInterchainAccount.encode(message).finish();
  },
  toProtoMsg(message: MsgRestoreInterchainAccount): MsgRestoreInterchainAccountProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.MsgRestoreInterchainAccount",
      value: MsgRestoreInterchainAccount.encode(message).finish()
    };
  }
};
function createBaseMsgRestoreInterchainAccountResponse(): MsgRestoreInterchainAccountResponse {
  return {};
}
export const MsgRestoreInterchainAccountResponse = {
  typeUrl: "/stride.stakeibc.MsgRestoreInterchainAccountResponse",
  encode(_: MsgRestoreInterchainAccountResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRestoreInterchainAccountResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRestoreInterchainAccountResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgRestoreInterchainAccountResponse>): MsgRestoreInterchainAccountResponse {
    const message = createBaseMsgRestoreInterchainAccountResponse();
    return message;
  },
  fromAmino(_: MsgRestoreInterchainAccountResponseAmino): MsgRestoreInterchainAccountResponse {
    const message = createBaseMsgRestoreInterchainAccountResponse();
    return message;
  },
  toAmino(_: MsgRestoreInterchainAccountResponse, useInterfaces: boolean = false): MsgRestoreInterchainAccountResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgRestoreInterchainAccountResponseAminoMsg): MsgRestoreInterchainAccountResponse {
    return MsgRestoreInterchainAccountResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRestoreInterchainAccountResponseProtoMsg, useInterfaces: boolean = false): MsgRestoreInterchainAccountResponse {
    return MsgRestoreInterchainAccountResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRestoreInterchainAccountResponse): Uint8Array {
    return MsgRestoreInterchainAccountResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgRestoreInterchainAccountResponse): MsgRestoreInterchainAccountResponseProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.MsgRestoreInterchainAccountResponse",
      value: MsgRestoreInterchainAccountResponse.encode(message).finish()
    };
  }
};
function createBaseMsgCloseDelegationChannel(): MsgCloseDelegationChannel {
  return {
    creator: "",
    chainId: ""
  };
}
export const MsgCloseDelegationChannel = {
  typeUrl: "/stride.stakeibc.MsgCloseDelegationChannel",
  encode(message: MsgCloseDelegationChannel, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.chainId !== "") {
      writer.uint32(18).string(message.chainId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgCloseDelegationChannel {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCloseDelegationChannel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.chainId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgCloseDelegationChannel>): MsgCloseDelegationChannel {
    const message = createBaseMsgCloseDelegationChannel();
    message.creator = object.creator ?? "";
    message.chainId = object.chainId ?? "";
    return message;
  },
  fromAmino(object: MsgCloseDelegationChannelAmino): MsgCloseDelegationChannel {
    const message = createBaseMsgCloseDelegationChannel();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.chain_id !== undefined && object.chain_id !== null) {
      message.chainId = object.chain_id;
    }
    return message;
  },
  toAmino(message: MsgCloseDelegationChannel, useInterfaces: boolean = false): MsgCloseDelegationChannelAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.chain_id = message.chainId === "" ? undefined : message.chainId;
    return obj;
  },
  fromAminoMsg(object: MsgCloseDelegationChannelAminoMsg): MsgCloseDelegationChannel {
    return MsgCloseDelegationChannel.fromAmino(object.value);
  },
  toAminoMsg(message: MsgCloseDelegationChannel, useInterfaces: boolean = false): MsgCloseDelegationChannelAminoMsg {
    return {
      type: "stakeibc/MsgCloseDelegationChanne",
      value: MsgCloseDelegationChannel.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgCloseDelegationChannelProtoMsg, useInterfaces: boolean = false): MsgCloseDelegationChannel {
    return MsgCloseDelegationChannel.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgCloseDelegationChannel): Uint8Array {
    return MsgCloseDelegationChannel.encode(message).finish();
  },
  toProtoMsg(message: MsgCloseDelegationChannel): MsgCloseDelegationChannelProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.MsgCloseDelegationChannel",
      value: MsgCloseDelegationChannel.encode(message).finish()
    };
  }
};
function createBaseMsgCloseDelegationChannelResponse(): MsgCloseDelegationChannelResponse {
  return {};
}
export const MsgCloseDelegationChannelResponse = {
  typeUrl: "/stride.stakeibc.MsgCloseDelegationChannelResponse",
  encode(_: MsgCloseDelegationChannelResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgCloseDelegationChannelResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCloseDelegationChannelResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgCloseDelegationChannelResponse>): MsgCloseDelegationChannelResponse {
    const message = createBaseMsgCloseDelegationChannelResponse();
    return message;
  },
  fromAmino(_: MsgCloseDelegationChannelResponseAmino): MsgCloseDelegationChannelResponse {
    const message = createBaseMsgCloseDelegationChannelResponse();
    return message;
  },
  toAmino(_: MsgCloseDelegationChannelResponse, useInterfaces: boolean = false): MsgCloseDelegationChannelResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgCloseDelegationChannelResponseAminoMsg): MsgCloseDelegationChannelResponse {
    return MsgCloseDelegationChannelResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgCloseDelegationChannelResponseProtoMsg, useInterfaces: boolean = false): MsgCloseDelegationChannelResponse {
    return MsgCloseDelegationChannelResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgCloseDelegationChannelResponse): Uint8Array {
    return MsgCloseDelegationChannelResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgCloseDelegationChannelResponse): MsgCloseDelegationChannelResponseProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.MsgCloseDelegationChannelResponse",
      value: MsgCloseDelegationChannelResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateValidatorSharesExchRate(): MsgUpdateValidatorSharesExchRate {
  return {
    creator: "",
    chainId: "",
    valoper: ""
  };
}
export const MsgUpdateValidatorSharesExchRate = {
  typeUrl: "/stride.stakeibc.MsgUpdateValidatorSharesExchRate",
  encode(message: MsgUpdateValidatorSharesExchRate, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.chainId !== "") {
      writer.uint32(18).string(message.chainId);
    }
    if (message.valoper !== "") {
      writer.uint32(26).string(message.valoper);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateValidatorSharesExchRate {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateValidatorSharesExchRate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.chainId = reader.string();
          break;
        case 3:
          message.valoper = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUpdateValidatorSharesExchRate>): MsgUpdateValidatorSharesExchRate {
    const message = createBaseMsgUpdateValidatorSharesExchRate();
    message.creator = object.creator ?? "";
    message.chainId = object.chainId ?? "";
    message.valoper = object.valoper ?? "";
    return message;
  },
  fromAmino(object: MsgUpdateValidatorSharesExchRateAmino): MsgUpdateValidatorSharesExchRate {
    const message = createBaseMsgUpdateValidatorSharesExchRate();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.chain_id !== undefined && object.chain_id !== null) {
      message.chainId = object.chain_id;
    }
    if (object.valoper !== undefined && object.valoper !== null) {
      message.valoper = object.valoper;
    }
    return message;
  },
  toAmino(message: MsgUpdateValidatorSharesExchRate, useInterfaces: boolean = false): MsgUpdateValidatorSharesExchRateAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.chain_id = message.chainId === "" ? undefined : message.chainId;
    obj.valoper = message.valoper === "" ? undefined : message.valoper;
    return obj;
  },
  fromAminoMsg(object: MsgUpdateValidatorSharesExchRateAminoMsg): MsgUpdateValidatorSharesExchRate {
    return MsgUpdateValidatorSharesExchRate.fromAmino(object.value);
  },
  toAminoMsg(message: MsgUpdateValidatorSharesExchRate, useInterfaces: boolean = false): MsgUpdateValidatorSharesExchRateAminoMsg {
    return {
      type: "stakeibc/MsgUpdateValSharesExchRate",
      value: MsgUpdateValidatorSharesExchRate.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgUpdateValidatorSharesExchRateProtoMsg, useInterfaces: boolean = false): MsgUpdateValidatorSharesExchRate {
    return MsgUpdateValidatorSharesExchRate.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateValidatorSharesExchRate): Uint8Array {
    return MsgUpdateValidatorSharesExchRate.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateValidatorSharesExchRate): MsgUpdateValidatorSharesExchRateProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.MsgUpdateValidatorSharesExchRate",
      value: MsgUpdateValidatorSharesExchRate.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateValidatorSharesExchRateResponse(): MsgUpdateValidatorSharesExchRateResponse {
  return {};
}
export const MsgUpdateValidatorSharesExchRateResponse = {
  typeUrl: "/stride.stakeibc.MsgUpdateValidatorSharesExchRateResponse",
  encode(_: MsgUpdateValidatorSharesExchRateResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateValidatorSharesExchRateResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateValidatorSharesExchRateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgUpdateValidatorSharesExchRateResponse>): MsgUpdateValidatorSharesExchRateResponse {
    const message = createBaseMsgUpdateValidatorSharesExchRateResponse();
    return message;
  },
  fromAmino(_: MsgUpdateValidatorSharesExchRateResponseAmino): MsgUpdateValidatorSharesExchRateResponse {
    const message = createBaseMsgUpdateValidatorSharesExchRateResponse();
    return message;
  },
  toAmino(_: MsgUpdateValidatorSharesExchRateResponse, useInterfaces: boolean = false): MsgUpdateValidatorSharesExchRateResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateValidatorSharesExchRateResponseAminoMsg): MsgUpdateValidatorSharesExchRateResponse {
    return MsgUpdateValidatorSharesExchRateResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateValidatorSharesExchRateResponseProtoMsg, useInterfaces: boolean = false): MsgUpdateValidatorSharesExchRateResponse {
    return MsgUpdateValidatorSharesExchRateResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateValidatorSharesExchRateResponse): Uint8Array {
    return MsgUpdateValidatorSharesExchRateResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateValidatorSharesExchRateResponse): MsgUpdateValidatorSharesExchRateResponseProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.MsgUpdateValidatorSharesExchRateResponse",
      value: MsgUpdateValidatorSharesExchRateResponse.encode(message).finish()
    };
  }
};
function createBaseMsgCalibrateDelegation(): MsgCalibrateDelegation {
  return {
    creator: "",
    chainId: "",
    valoper: ""
  };
}
export const MsgCalibrateDelegation = {
  typeUrl: "/stride.stakeibc.MsgCalibrateDelegation",
  encode(message: MsgCalibrateDelegation, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.chainId !== "") {
      writer.uint32(18).string(message.chainId);
    }
    if (message.valoper !== "") {
      writer.uint32(26).string(message.valoper);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgCalibrateDelegation {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCalibrateDelegation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.chainId = reader.string();
          break;
        case 3:
          message.valoper = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgCalibrateDelegation>): MsgCalibrateDelegation {
    const message = createBaseMsgCalibrateDelegation();
    message.creator = object.creator ?? "";
    message.chainId = object.chainId ?? "";
    message.valoper = object.valoper ?? "";
    return message;
  },
  fromAmino(object: MsgCalibrateDelegationAmino): MsgCalibrateDelegation {
    const message = createBaseMsgCalibrateDelegation();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.chain_id !== undefined && object.chain_id !== null) {
      message.chainId = object.chain_id;
    }
    if (object.valoper !== undefined && object.valoper !== null) {
      message.valoper = object.valoper;
    }
    return message;
  },
  toAmino(message: MsgCalibrateDelegation, useInterfaces: boolean = false): MsgCalibrateDelegationAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.chain_id = message.chainId === "" ? undefined : message.chainId;
    obj.valoper = message.valoper === "" ? undefined : message.valoper;
    return obj;
  },
  fromAminoMsg(object: MsgCalibrateDelegationAminoMsg): MsgCalibrateDelegation {
    return MsgCalibrateDelegation.fromAmino(object.value);
  },
  toAminoMsg(message: MsgCalibrateDelegation, useInterfaces: boolean = false): MsgCalibrateDelegationAminoMsg {
    return {
      type: "stakeibc/MsgCalibrateDelegation",
      value: MsgCalibrateDelegation.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgCalibrateDelegationProtoMsg, useInterfaces: boolean = false): MsgCalibrateDelegation {
    return MsgCalibrateDelegation.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgCalibrateDelegation): Uint8Array {
    return MsgCalibrateDelegation.encode(message).finish();
  },
  toProtoMsg(message: MsgCalibrateDelegation): MsgCalibrateDelegationProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.MsgCalibrateDelegation",
      value: MsgCalibrateDelegation.encode(message).finish()
    };
  }
};
function createBaseMsgCalibrateDelegationResponse(): MsgCalibrateDelegationResponse {
  return {};
}
export const MsgCalibrateDelegationResponse = {
  typeUrl: "/stride.stakeibc.MsgCalibrateDelegationResponse",
  encode(_: MsgCalibrateDelegationResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgCalibrateDelegationResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCalibrateDelegationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgCalibrateDelegationResponse>): MsgCalibrateDelegationResponse {
    const message = createBaseMsgCalibrateDelegationResponse();
    return message;
  },
  fromAmino(_: MsgCalibrateDelegationResponseAmino): MsgCalibrateDelegationResponse {
    const message = createBaseMsgCalibrateDelegationResponse();
    return message;
  },
  toAmino(_: MsgCalibrateDelegationResponse, useInterfaces: boolean = false): MsgCalibrateDelegationResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgCalibrateDelegationResponseAminoMsg): MsgCalibrateDelegationResponse {
    return MsgCalibrateDelegationResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgCalibrateDelegationResponseProtoMsg, useInterfaces: boolean = false): MsgCalibrateDelegationResponse {
    return MsgCalibrateDelegationResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgCalibrateDelegationResponse): Uint8Array {
    return MsgCalibrateDelegationResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgCalibrateDelegationResponse): MsgCalibrateDelegationResponseProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.MsgCalibrateDelegationResponse",
      value: MsgCalibrateDelegationResponse.encode(message).finish()
    };
  }
};
function createBaseMsgResumeHostZone(): MsgResumeHostZone {
  return {
    creator: "",
    chainId: ""
  };
}
export const MsgResumeHostZone = {
  typeUrl: "/stride.stakeibc.MsgResumeHostZone",
  encode(message: MsgResumeHostZone, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.chainId !== "") {
      writer.uint32(18).string(message.chainId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgResumeHostZone {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgResumeHostZone();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.chainId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgResumeHostZone>): MsgResumeHostZone {
    const message = createBaseMsgResumeHostZone();
    message.creator = object.creator ?? "";
    message.chainId = object.chainId ?? "";
    return message;
  },
  fromAmino(object: MsgResumeHostZoneAmino): MsgResumeHostZone {
    const message = createBaseMsgResumeHostZone();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.chain_id !== undefined && object.chain_id !== null) {
      message.chainId = object.chain_id;
    }
    return message;
  },
  toAmino(message: MsgResumeHostZone, useInterfaces: boolean = false): MsgResumeHostZoneAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.chain_id = message.chainId === "" ? undefined : message.chainId;
    return obj;
  },
  fromAminoMsg(object: MsgResumeHostZoneAminoMsg): MsgResumeHostZone {
    return MsgResumeHostZone.fromAmino(object.value);
  },
  toAminoMsg(message: MsgResumeHostZone, useInterfaces: boolean = false): MsgResumeHostZoneAminoMsg {
    return {
      type: "stakeibc/MsgResumeHostZone",
      value: MsgResumeHostZone.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgResumeHostZoneProtoMsg, useInterfaces: boolean = false): MsgResumeHostZone {
    return MsgResumeHostZone.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgResumeHostZone): Uint8Array {
    return MsgResumeHostZone.encode(message).finish();
  },
  toProtoMsg(message: MsgResumeHostZone): MsgResumeHostZoneProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.MsgResumeHostZone",
      value: MsgResumeHostZone.encode(message).finish()
    };
  }
};
function createBaseMsgResumeHostZoneResponse(): MsgResumeHostZoneResponse {
  return {};
}
export const MsgResumeHostZoneResponse = {
  typeUrl: "/stride.stakeibc.MsgResumeHostZoneResponse",
  encode(_: MsgResumeHostZoneResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgResumeHostZoneResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgResumeHostZoneResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgResumeHostZoneResponse>): MsgResumeHostZoneResponse {
    const message = createBaseMsgResumeHostZoneResponse();
    return message;
  },
  fromAmino(_: MsgResumeHostZoneResponseAmino): MsgResumeHostZoneResponse {
    const message = createBaseMsgResumeHostZoneResponse();
    return message;
  },
  toAmino(_: MsgResumeHostZoneResponse, useInterfaces: boolean = false): MsgResumeHostZoneResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgResumeHostZoneResponseAminoMsg): MsgResumeHostZoneResponse {
    return MsgResumeHostZoneResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgResumeHostZoneResponseProtoMsg, useInterfaces: boolean = false): MsgResumeHostZoneResponse {
    return MsgResumeHostZoneResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgResumeHostZoneResponse): Uint8Array {
    return MsgResumeHostZoneResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgResumeHostZoneResponse): MsgResumeHostZoneResponseProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.MsgResumeHostZoneResponse",
      value: MsgResumeHostZoneResponse.encode(message).finish()
    };
  }
};
function createBaseMsgDeprecateHostZone(): MsgDeprecateHostZone {
  return {
    authority: "",
    chainId: ""
  };
}
export const MsgDeprecateHostZone = {
  typeUrl: "/stride.stakeibc.MsgDeprecateHostZone",
  encode(message: MsgDeprecateHostZone, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.chainId !== "") {
      writer.uint32(18).string(message.chainId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgDeprecateHostZone {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeprecateHostZone();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.chainId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgDeprecateHostZone>): MsgDeprecateHostZone {
    const message = createBaseMsgDeprecateHostZone();
    message.authority = object.authority ?? "";
    message.chainId = object.chainId ?? "";
    return message;
  },
  fromAmino(object: MsgDeprecateHostZoneAmino): MsgDeprecateHostZone {
    const message = createBaseMsgDeprecateHostZone();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.chain_id !== undefined && object.chain_id !== null) {
      message.chainId = object.chain_id;
    }
    return message;
  },
  toAmino(message: MsgDeprecateHostZone, useInterfaces: boolean = false): MsgDeprecateHostZoneAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.chain_id = message.chainId === "" ? undefined : message.chainId;
    return obj;
  },
  fromAminoMsg(object: MsgDeprecateHostZoneAminoMsg): MsgDeprecateHostZone {
    return MsgDeprecateHostZone.fromAmino(object.value);
  },
  toAminoMsg(message: MsgDeprecateHostZone, useInterfaces: boolean = false): MsgDeprecateHostZoneAminoMsg {
    return {
      type: "stakeibc/MsgDeprecateHostZone",
      value: MsgDeprecateHostZone.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgDeprecateHostZoneProtoMsg, useInterfaces: boolean = false): MsgDeprecateHostZone {
    return MsgDeprecateHostZone.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgDeprecateHostZone): Uint8Array {
    return MsgDeprecateHostZone.encode(message).finish();
  },
  toProtoMsg(message: MsgDeprecateHostZone): MsgDeprecateHostZoneProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.MsgDeprecateHostZone",
      value: MsgDeprecateHostZone.encode(message).finish()
    };
  }
};
function createBaseMsgDeprecateHostZoneResponse(): MsgDeprecateHostZoneResponse {
  return {};
}
export const MsgDeprecateHostZoneResponse = {
  typeUrl: "/stride.stakeibc.MsgDeprecateHostZoneResponse",
  encode(_: MsgDeprecateHostZoneResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgDeprecateHostZoneResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeprecateHostZoneResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgDeprecateHostZoneResponse>): MsgDeprecateHostZoneResponse {
    const message = createBaseMsgDeprecateHostZoneResponse();
    return message;
  },
  fromAmino(_: MsgDeprecateHostZoneResponseAmino): MsgDeprecateHostZoneResponse {
    const message = createBaseMsgDeprecateHostZoneResponse();
    return message;
  },
  toAmino(_: MsgDeprecateHostZoneResponse, useInterfaces: boolean = false): MsgDeprecateHostZoneResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgDeprecateHostZoneResponseAminoMsg): MsgDeprecateHostZoneResponse {
    return MsgDeprecateHostZoneResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgDeprecateHostZoneResponseProtoMsg, useInterfaces: boolean = false): MsgDeprecateHostZoneResponse {
    return MsgDeprecateHostZoneResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgDeprecateHostZoneResponse): Uint8Array {
    return MsgDeprecateHostZoneResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgDeprecateHostZoneResponse): MsgDeprecateHostZoneResponseProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.MsgDeprecateHostZoneResponse",
      value: MsgDeprecateHostZoneResponse.encode(message).finish()
    };
  }
};
function createBaseMsgCreateTradeRoute(): MsgCreateTradeRoute {
  return {
    authority: "",
    hostChainId: "",
    strideToRewardConnectionId: "",
    strideToTradeConnectionId: "",
    hostToRewardTransferChannelId: "",
    rewardToTradeTransferChannelId: "",
    tradeToHostTransferChannelId: "",
    rewardDenomOnHost: "",
    rewardDenomOnReward: "",
    rewardDenomOnTrade: "",
    hostDenomOnTrade: "",
    hostDenomOnHost: "",
    poolId: BigInt(0),
    maxAllowedSwapLossRate: "",
    minSwapAmount: "",
    maxSwapAmount: "",
    minTransferAmount: ""
  };
}
export const MsgCreateTradeRoute = {
  typeUrl: "/stride.stakeibc.MsgCreateTradeRoute",
  encode(message: MsgCreateTradeRoute, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.hostChainId !== "") {
      writer.uint32(18).string(message.hostChainId);
    }
    if (message.strideToRewardConnectionId !== "") {
      writer.uint32(26).string(message.strideToRewardConnectionId);
    }
    if (message.strideToTradeConnectionId !== "") {
      writer.uint32(34).string(message.strideToTradeConnectionId);
    }
    if (message.hostToRewardTransferChannelId !== "") {
      writer.uint32(42).string(message.hostToRewardTransferChannelId);
    }
    if (message.rewardToTradeTransferChannelId !== "") {
      writer.uint32(50).string(message.rewardToTradeTransferChannelId);
    }
    if (message.tradeToHostTransferChannelId !== "") {
      writer.uint32(58).string(message.tradeToHostTransferChannelId);
    }
    if (message.rewardDenomOnHost !== "") {
      writer.uint32(66).string(message.rewardDenomOnHost);
    }
    if (message.rewardDenomOnReward !== "") {
      writer.uint32(74).string(message.rewardDenomOnReward);
    }
    if (message.rewardDenomOnTrade !== "") {
      writer.uint32(82).string(message.rewardDenomOnTrade);
    }
    if (message.hostDenomOnTrade !== "") {
      writer.uint32(90).string(message.hostDenomOnTrade);
    }
    if (message.hostDenomOnHost !== "") {
      writer.uint32(98).string(message.hostDenomOnHost);
    }
    if (message.poolId !== BigInt(0)) {
      writer.uint32(104).uint64(message.poolId);
    }
    if (message.maxAllowedSwapLossRate !== "") {
      writer.uint32(114).string(message.maxAllowedSwapLossRate);
    }
    if (message.minSwapAmount !== "") {
      writer.uint32(122).string(message.minSwapAmount);
    }
    if (message.maxSwapAmount !== "") {
      writer.uint32(130).string(message.maxSwapAmount);
    }
    if (message.minTransferAmount !== "") {
      writer.uint32(138).string(message.minTransferAmount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgCreateTradeRoute {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateTradeRoute();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.hostChainId = reader.string();
          break;
        case 3:
          message.strideToRewardConnectionId = reader.string();
          break;
        case 4:
          message.strideToTradeConnectionId = reader.string();
          break;
        case 5:
          message.hostToRewardTransferChannelId = reader.string();
          break;
        case 6:
          message.rewardToTradeTransferChannelId = reader.string();
          break;
        case 7:
          message.tradeToHostTransferChannelId = reader.string();
          break;
        case 8:
          message.rewardDenomOnHost = reader.string();
          break;
        case 9:
          message.rewardDenomOnReward = reader.string();
          break;
        case 10:
          message.rewardDenomOnTrade = reader.string();
          break;
        case 11:
          message.hostDenomOnTrade = reader.string();
          break;
        case 12:
          message.hostDenomOnHost = reader.string();
          break;
        case 13:
          message.poolId = reader.uint64();
          break;
        case 14:
          message.maxAllowedSwapLossRate = reader.string();
          break;
        case 15:
          message.minSwapAmount = reader.string();
          break;
        case 16:
          message.maxSwapAmount = reader.string();
          break;
        case 17:
          message.minTransferAmount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgCreateTradeRoute>): MsgCreateTradeRoute {
    const message = createBaseMsgCreateTradeRoute();
    message.authority = object.authority ?? "";
    message.hostChainId = object.hostChainId ?? "";
    message.strideToRewardConnectionId = object.strideToRewardConnectionId ?? "";
    message.strideToTradeConnectionId = object.strideToTradeConnectionId ?? "";
    message.hostToRewardTransferChannelId = object.hostToRewardTransferChannelId ?? "";
    message.rewardToTradeTransferChannelId = object.rewardToTradeTransferChannelId ?? "";
    message.tradeToHostTransferChannelId = object.tradeToHostTransferChannelId ?? "";
    message.rewardDenomOnHost = object.rewardDenomOnHost ?? "";
    message.rewardDenomOnReward = object.rewardDenomOnReward ?? "";
    message.rewardDenomOnTrade = object.rewardDenomOnTrade ?? "";
    message.hostDenomOnTrade = object.hostDenomOnTrade ?? "";
    message.hostDenomOnHost = object.hostDenomOnHost ?? "";
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.maxAllowedSwapLossRate = object.maxAllowedSwapLossRate ?? "";
    message.minSwapAmount = object.minSwapAmount ?? "";
    message.maxSwapAmount = object.maxSwapAmount ?? "";
    message.minTransferAmount = object.minTransferAmount ?? "";
    return message;
  },
  fromAmino(object: MsgCreateTradeRouteAmino): MsgCreateTradeRoute {
    const message = createBaseMsgCreateTradeRoute();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.host_chain_id !== undefined && object.host_chain_id !== null) {
      message.hostChainId = object.host_chain_id;
    }
    if (object.stride_to_reward_connection_id !== undefined && object.stride_to_reward_connection_id !== null) {
      message.strideToRewardConnectionId = object.stride_to_reward_connection_id;
    }
    if (object.stride_to_trade_connection_id !== undefined && object.stride_to_trade_connection_id !== null) {
      message.strideToTradeConnectionId = object.stride_to_trade_connection_id;
    }
    if (object.host_to_reward_transfer_channel_id !== undefined && object.host_to_reward_transfer_channel_id !== null) {
      message.hostToRewardTransferChannelId = object.host_to_reward_transfer_channel_id;
    }
    if (object.reward_to_trade_transfer_channel_id !== undefined && object.reward_to_trade_transfer_channel_id !== null) {
      message.rewardToTradeTransferChannelId = object.reward_to_trade_transfer_channel_id;
    }
    if (object.trade_to_host_transfer_channel_id !== undefined && object.trade_to_host_transfer_channel_id !== null) {
      message.tradeToHostTransferChannelId = object.trade_to_host_transfer_channel_id;
    }
    if (object.reward_denom_on_host !== undefined && object.reward_denom_on_host !== null) {
      message.rewardDenomOnHost = object.reward_denom_on_host;
    }
    if (object.reward_denom_on_reward !== undefined && object.reward_denom_on_reward !== null) {
      message.rewardDenomOnReward = object.reward_denom_on_reward;
    }
    if (object.reward_denom_on_trade !== undefined && object.reward_denom_on_trade !== null) {
      message.rewardDenomOnTrade = object.reward_denom_on_trade;
    }
    if (object.host_denom_on_trade !== undefined && object.host_denom_on_trade !== null) {
      message.hostDenomOnTrade = object.host_denom_on_trade;
    }
    if (object.host_denom_on_host !== undefined && object.host_denom_on_host !== null) {
      message.hostDenomOnHost = object.host_denom_on_host;
    }
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.max_allowed_swap_loss_rate !== undefined && object.max_allowed_swap_loss_rate !== null) {
      message.maxAllowedSwapLossRate = object.max_allowed_swap_loss_rate;
    }
    if (object.min_swap_amount !== undefined && object.min_swap_amount !== null) {
      message.minSwapAmount = object.min_swap_amount;
    }
    if (object.max_swap_amount !== undefined && object.max_swap_amount !== null) {
      message.maxSwapAmount = object.max_swap_amount;
    }
    if (object.min_transfer_amount !== undefined && object.min_transfer_amount !== null) {
      message.minTransferAmount = object.min_transfer_amount;
    }
    return message;
  },
  toAmino(message: MsgCreateTradeRoute, useInterfaces: boolean = false): MsgCreateTradeRouteAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.host_chain_id = message.hostChainId === "" ? undefined : message.hostChainId;
    obj.stride_to_reward_connection_id = message.strideToRewardConnectionId === "" ? undefined : message.strideToRewardConnectionId;
    obj.stride_to_trade_connection_id = message.strideToTradeConnectionId === "" ? undefined : message.strideToTradeConnectionId;
    obj.host_to_reward_transfer_channel_id = message.hostToRewardTransferChannelId === "" ? undefined : message.hostToRewardTransferChannelId;
    obj.reward_to_trade_transfer_channel_id = message.rewardToTradeTransferChannelId === "" ? undefined : message.rewardToTradeTransferChannelId;
    obj.trade_to_host_transfer_channel_id = message.tradeToHostTransferChannelId === "" ? undefined : message.tradeToHostTransferChannelId;
    obj.reward_denom_on_host = message.rewardDenomOnHost === "" ? undefined : message.rewardDenomOnHost;
    obj.reward_denom_on_reward = message.rewardDenomOnReward === "" ? undefined : message.rewardDenomOnReward;
    obj.reward_denom_on_trade = message.rewardDenomOnTrade === "" ? undefined : message.rewardDenomOnTrade;
    obj.host_denom_on_trade = message.hostDenomOnTrade === "" ? undefined : message.hostDenomOnTrade;
    obj.host_denom_on_host = message.hostDenomOnHost === "" ? undefined : message.hostDenomOnHost;
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.max_allowed_swap_loss_rate = message.maxAllowedSwapLossRate === "" ? undefined : message.maxAllowedSwapLossRate;
    obj.min_swap_amount = message.minSwapAmount === "" ? undefined : message.minSwapAmount;
    obj.max_swap_amount = message.maxSwapAmount === "" ? undefined : message.maxSwapAmount;
    obj.min_transfer_amount = message.minTransferAmount === "" ? undefined : message.minTransferAmount;
    return obj;
  },
  fromAminoMsg(object: MsgCreateTradeRouteAminoMsg): MsgCreateTradeRoute {
    return MsgCreateTradeRoute.fromAmino(object.value);
  },
  toAminoMsg(message: MsgCreateTradeRoute, useInterfaces: boolean = false): MsgCreateTradeRouteAminoMsg {
    return {
      type: "stakeibc/MsgCreateTradeRoute",
      value: MsgCreateTradeRoute.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgCreateTradeRouteProtoMsg, useInterfaces: boolean = false): MsgCreateTradeRoute {
    return MsgCreateTradeRoute.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgCreateTradeRoute): Uint8Array {
    return MsgCreateTradeRoute.encode(message).finish();
  },
  toProtoMsg(message: MsgCreateTradeRoute): MsgCreateTradeRouteProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.MsgCreateTradeRoute",
      value: MsgCreateTradeRoute.encode(message).finish()
    };
  }
};
function createBaseMsgCreateTradeRouteResponse(): MsgCreateTradeRouteResponse {
  return {};
}
export const MsgCreateTradeRouteResponse = {
  typeUrl: "/stride.stakeibc.MsgCreateTradeRouteResponse",
  encode(_: MsgCreateTradeRouteResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgCreateTradeRouteResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateTradeRouteResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgCreateTradeRouteResponse>): MsgCreateTradeRouteResponse {
    const message = createBaseMsgCreateTradeRouteResponse();
    return message;
  },
  fromAmino(_: MsgCreateTradeRouteResponseAmino): MsgCreateTradeRouteResponse {
    const message = createBaseMsgCreateTradeRouteResponse();
    return message;
  },
  toAmino(_: MsgCreateTradeRouteResponse, useInterfaces: boolean = false): MsgCreateTradeRouteResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgCreateTradeRouteResponseAminoMsg): MsgCreateTradeRouteResponse {
    return MsgCreateTradeRouteResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgCreateTradeRouteResponseProtoMsg, useInterfaces: boolean = false): MsgCreateTradeRouteResponse {
    return MsgCreateTradeRouteResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgCreateTradeRouteResponse): Uint8Array {
    return MsgCreateTradeRouteResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgCreateTradeRouteResponse): MsgCreateTradeRouteResponseProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.MsgCreateTradeRouteResponse",
      value: MsgCreateTradeRouteResponse.encode(message).finish()
    };
  }
};
function createBaseMsgDeleteTradeRoute(): MsgDeleteTradeRoute {
  return {
    authority: "",
    rewardDenom: "",
    hostDenom: ""
  };
}
export const MsgDeleteTradeRoute = {
  typeUrl: "/stride.stakeibc.MsgDeleteTradeRoute",
  encode(message: MsgDeleteTradeRoute, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.rewardDenom !== "") {
      writer.uint32(18).string(message.rewardDenom);
    }
    if (message.hostDenom !== "") {
      writer.uint32(26).string(message.hostDenom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgDeleteTradeRoute {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteTradeRoute();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.rewardDenom = reader.string();
          break;
        case 3:
          message.hostDenom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgDeleteTradeRoute>): MsgDeleteTradeRoute {
    const message = createBaseMsgDeleteTradeRoute();
    message.authority = object.authority ?? "";
    message.rewardDenom = object.rewardDenom ?? "";
    message.hostDenom = object.hostDenom ?? "";
    return message;
  },
  fromAmino(object: MsgDeleteTradeRouteAmino): MsgDeleteTradeRoute {
    const message = createBaseMsgDeleteTradeRoute();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.reward_denom !== undefined && object.reward_denom !== null) {
      message.rewardDenom = object.reward_denom;
    }
    if (object.host_denom !== undefined && object.host_denom !== null) {
      message.hostDenom = object.host_denom;
    }
    return message;
  },
  toAmino(message: MsgDeleteTradeRoute, useInterfaces: boolean = false): MsgDeleteTradeRouteAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.reward_denom = message.rewardDenom === "" ? undefined : message.rewardDenom;
    obj.host_denom = message.hostDenom === "" ? undefined : message.hostDenom;
    return obj;
  },
  fromAminoMsg(object: MsgDeleteTradeRouteAminoMsg): MsgDeleteTradeRoute {
    return MsgDeleteTradeRoute.fromAmino(object.value);
  },
  toAminoMsg(message: MsgDeleteTradeRoute, useInterfaces: boolean = false): MsgDeleteTradeRouteAminoMsg {
    return {
      type: "stakeibc/MsgDeleteTradeRoute",
      value: MsgDeleteTradeRoute.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgDeleteTradeRouteProtoMsg, useInterfaces: boolean = false): MsgDeleteTradeRoute {
    return MsgDeleteTradeRoute.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgDeleteTradeRoute): Uint8Array {
    return MsgDeleteTradeRoute.encode(message).finish();
  },
  toProtoMsg(message: MsgDeleteTradeRoute): MsgDeleteTradeRouteProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.MsgDeleteTradeRoute",
      value: MsgDeleteTradeRoute.encode(message).finish()
    };
  }
};
function createBaseMsgDeleteTradeRouteResponse(): MsgDeleteTradeRouteResponse {
  return {};
}
export const MsgDeleteTradeRouteResponse = {
  typeUrl: "/stride.stakeibc.MsgDeleteTradeRouteResponse",
  encode(_: MsgDeleteTradeRouteResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgDeleteTradeRouteResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteTradeRouteResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgDeleteTradeRouteResponse>): MsgDeleteTradeRouteResponse {
    const message = createBaseMsgDeleteTradeRouteResponse();
    return message;
  },
  fromAmino(_: MsgDeleteTradeRouteResponseAmino): MsgDeleteTradeRouteResponse {
    const message = createBaseMsgDeleteTradeRouteResponse();
    return message;
  },
  toAmino(_: MsgDeleteTradeRouteResponse, useInterfaces: boolean = false): MsgDeleteTradeRouteResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgDeleteTradeRouteResponseAminoMsg): MsgDeleteTradeRouteResponse {
    return MsgDeleteTradeRouteResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgDeleteTradeRouteResponseProtoMsg, useInterfaces: boolean = false): MsgDeleteTradeRouteResponse {
    return MsgDeleteTradeRouteResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgDeleteTradeRouteResponse): Uint8Array {
    return MsgDeleteTradeRouteResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgDeleteTradeRouteResponse): MsgDeleteTradeRouteResponseProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.MsgDeleteTradeRouteResponse",
      value: MsgDeleteTradeRouteResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateTradeRoute(): MsgUpdateTradeRoute {
  return {
    authority: "",
    rewardDenom: "",
    hostDenom: "",
    poolId: BigInt(0),
    maxAllowedSwapLossRate: "",
    minSwapAmount: "",
    maxSwapAmount: "",
    minTransferAmount: ""
  };
}
export const MsgUpdateTradeRoute = {
  typeUrl: "/stride.stakeibc.MsgUpdateTradeRoute",
  encode(message: MsgUpdateTradeRoute, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.rewardDenom !== "") {
      writer.uint32(18).string(message.rewardDenom);
    }
    if (message.hostDenom !== "") {
      writer.uint32(26).string(message.hostDenom);
    }
    if (message.poolId !== BigInt(0)) {
      writer.uint32(32).uint64(message.poolId);
    }
    if (message.maxAllowedSwapLossRate !== "") {
      writer.uint32(42).string(message.maxAllowedSwapLossRate);
    }
    if (message.minSwapAmount !== "") {
      writer.uint32(50).string(message.minSwapAmount);
    }
    if (message.maxSwapAmount !== "") {
      writer.uint32(58).string(message.maxSwapAmount);
    }
    if (message.minTransferAmount !== "") {
      writer.uint32(138).string(message.minTransferAmount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateTradeRoute {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateTradeRoute();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.rewardDenom = reader.string();
          break;
        case 3:
          message.hostDenom = reader.string();
          break;
        case 4:
          message.poolId = reader.uint64();
          break;
        case 5:
          message.maxAllowedSwapLossRate = reader.string();
          break;
        case 6:
          message.minSwapAmount = reader.string();
          break;
        case 7:
          message.maxSwapAmount = reader.string();
          break;
        case 17:
          message.minTransferAmount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUpdateTradeRoute>): MsgUpdateTradeRoute {
    const message = createBaseMsgUpdateTradeRoute();
    message.authority = object.authority ?? "";
    message.rewardDenom = object.rewardDenom ?? "";
    message.hostDenom = object.hostDenom ?? "";
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.maxAllowedSwapLossRate = object.maxAllowedSwapLossRate ?? "";
    message.minSwapAmount = object.minSwapAmount ?? "";
    message.maxSwapAmount = object.maxSwapAmount ?? "";
    message.minTransferAmount = object.minTransferAmount ?? "";
    return message;
  },
  fromAmino(object: MsgUpdateTradeRouteAmino): MsgUpdateTradeRoute {
    const message = createBaseMsgUpdateTradeRoute();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.reward_denom !== undefined && object.reward_denom !== null) {
      message.rewardDenom = object.reward_denom;
    }
    if (object.host_denom !== undefined && object.host_denom !== null) {
      message.hostDenom = object.host_denom;
    }
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.max_allowed_swap_loss_rate !== undefined && object.max_allowed_swap_loss_rate !== null) {
      message.maxAllowedSwapLossRate = object.max_allowed_swap_loss_rate;
    }
    if (object.min_swap_amount !== undefined && object.min_swap_amount !== null) {
      message.minSwapAmount = object.min_swap_amount;
    }
    if (object.max_swap_amount !== undefined && object.max_swap_amount !== null) {
      message.maxSwapAmount = object.max_swap_amount;
    }
    if (object.min_transfer_amount !== undefined && object.min_transfer_amount !== null) {
      message.minTransferAmount = object.min_transfer_amount;
    }
    return message;
  },
  toAmino(message: MsgUpdateTradeRoute, useInterfaces: boolean = false): MsgUpdateTradeRouteAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.reward_denom = message.rewardDenom === "" ? undefined : message.rewardDenom;
    obj.host_denom = message.hostDenom === "" ? undefined : message.hostDenom;
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.max_allowed_swap_loss_rate = message.maxAllowedSwapLossRate === "" ? undefined : message.maxAllowedSwapLossRate;
    obj.min_swap_amount = message.minSwapAmount === "" ? undefined : message.minSwapAmount;
    obj.max_swap_amount = message.maxSwapAmount === "" ? undefined : message.maxSwapAmount;
    obj.min_transfer_amount = message.minTransferAmount === "" ? undefined : message.minTransferAmount;
    return obj;
  },
  fromAminoMsg(object: MsgUpdateTradeRouteAminoMsg): MsgUpdateTradeRoute {
    return MsgUpdateTradeRoute.fromAmino(object.value);
  },
  toAminoMsg(message: MsgUpdateTradeRoute, useInterfaces: boolean = false): MsgUpdateTradeRouteAminoMsg {
    return {
      type: "stakeibc/MsgUpdateTradeRoute",
      value: MsgUpdateTradeRoute.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgUpdateTradeRouteProtoMsg, useInterfaces: boolean = false): MsgUpdateTradeRoute {
    return MsgUpdateTradeRoute.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateTradeRoute): Uint8Array {
    return MsgUpdateTradeRoute.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateTradeRoute): MsgUpdateTradeRouteProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.MsgUpdateTradeRoute",
      value: MsgUpdateTradeRoute.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateTradeRouteResponse(): MsgUpdateTradeRouteResponse {
  return {};
}
export const MsgUpdateTradeRouteResponse = {
  typeUrl: "/stride.stakeibc.MsgUpdateTradeRouteResponse",
  encode(_: MsgUpdateTradeRouteResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateTradeRouteResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateTradeRouteResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgUpdateTradeRouteResponse>): MsgUpdateTradeRouteResponse {
    const message = createBaseMsgUpdateTradeRouteResponse();
    return message;
  },
  fromAmino(_: MsgUpdateTradeRouteResponseAmino): MsgUpdateTradeRouteResponse {
    const message = createBaseMsgUpdateTradeRouteResponse();
    return message;
  },
  toAmino(_: MsgUpdateTradeRouteResponse, useInterfaces: boolean = false): MsgUpdateTradeRouteResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateTradeRouteResponseAminoMsg): MsgUpdateTradeRouteResponse {
    return MsgUpdateTradeRouteResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateTradeRouteResponseProtoMsg, useInterfaces: boolean = false): MsgUpdateTradeRouteResponse {
    return MsgUpdateTradeRouteResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateTradeRouteResponse): Uint8Array {
    return MsgUpdateTradeRouteResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateTradeRouteResponse): MsgUpdateTradeRouteResponseProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.MsgUpdateTradeRouteResponse",
      value: MsgUpdateTradeRouteResponse.encode(message).finish()
    };
  }
};
function createBaseMsgSetCommunityPoolRebate(): MsgSetCommunityPoolRebate {
  return {
    creator: "",
    chainId: "",
    rebateRate: "",
    liquidStakedStTokenAmount: ""
  };
}
export const MsgSetCommunityPoolRebate = {
  typeUrl: "/stride.stakeibc.MsgSetCommunityPoolRebate",
  encode(message: MsgSetCommunityPoolRebate, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.chainId !== "") {
      writer.uint32(18).string(message.chainId);
    }
    if (message.rebateRate !== "") {
      writer.uint32(26).string(Decimal.fromUserInput(message.rebateRate, 18).atomics);
    }
    if (message.liquidStakedStTokenAmount !== "") {
      writer.uint32(34).string(message.liquidStakedStTokenAmount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSetCommunityPoolRebate {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetCommunityPoolRebate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.chainId = reader.string();
          break;
        case 3:
          message.rebateRate = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 4:
          message.liquidStakedStTokenAmount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSetCommunityPoolRebate>): MsgSetCommunityPoolRebate {
    const message = createBaseMsgSetCommunityPoolRebate();
    message.creator = object.creator ?? "";
    message.chainId = object.chainId ?? "";
    message.rebateRate = object.rebateRate ?? "";
    message.liquidStakedStTokenAmount = object.liquidStakedStTokenAmount ?? "";
    return message;
  },
  fromAmino(object: MsgSetCommunityPoolRebateAmino): MsgSetCommunityPoolRebate {
    const message = createBaseMsgSetCommunityPoolRebate();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.chain_id !== undefined && object.chain_id !== null) {
      message.chainId = object.chain_id;
    }
    if (object.rebate_rate !== undefined && object.rebate_rate !== null) {
      message.rebateRate = object.rebate_rate;
    }
    if (object.liquid_staked_st_token_amount !== undefined && object.liquid_staked_st_token_amount !== null) {
      message.liquidStakedStTokenAmount = object.liquid_staked_st_token_amount;
    }
    return message;
  },
  toAmino(message: MsgSetCommunityPoolRebate, useInterfaces: boolean = false): MsgSetCommunityPoolRebateAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.chain_id = message.chainId === "" ? undefined : message.chainId;
    obj.rebate_rate = message.rebateRate === "" ? undefined : message.rebateRate;
    obj.liquid_staked_st_token_amount = message.liquidStakedStTokenAmount === "" ? undefined : message.liquidStakedStTokenAmount;
    return obj;
  },
  fromAminoMsg(object: MsgSetCommunityPoolRebateAminoMsg): MsgSetCommunityPoolRebate {
    return MsgSetCommunityPoolRebate.fromAmino(object.value);
  },
  toAminoMsg(message: MsgSetCommunityPoolRebate, useInterfaces: boolean = false): MsgSetCommunityPoolRebateAminoMsg {
    return {
      type: "stakeibc/MsgSetCommunityPoolRebate",
      value: MsgSetCommunityPoolRebate.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgSetCommunityPoolRebateProtoMsg, useInterfaces: boolean = false): MsgSetCommunityPoolRebate {
    return MsgSetCommunityPoolRebate.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSetCommunityPoolRebate): Uint8Array {
    return MsgSetCommunityPoolRebate.encode(message).finish();
  },
  toProtoMsg(message: MsgSetCommunityPoolRebate): MsgSetCommunityPoolRebateProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.MsgSetCommunityPoolRebate",
      value: MsgSetCommunityPoolRebate.encode(message).finish()
    };
  }
};
function createBaseMsgSetCommunityPoolRebateResponse(): MsgSetCommunityPoolRebateResponse {
  return {};
}
export const MsgSetCommunityPoolRebateResponse = {
  typeUrl: "/stride.stakeibc.MsgSetCommunityPoolRebateResponse",
  encode(_: MsgSetCommunityPoolRebateResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSetCommunityPoolRebateResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetCommunityPoolRebateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgSetCommunityPoolRebateResponse>): MsgSetCommunityPoolRebateResponse {
    const message = createBaseMsgSetCommunityPoolRebateResponse();
    return message;
  },
  fromAmino(_: MsgSetCommunityPoolRebateResponseAmino): MsgSetCommunityPoolRebateResponse {
    const message = createBaseMsgSetCommunityPoolRebateResponse();
    return message;
  },
  toAmino(_: MsgSetCommunityPoolRebateResponse, useInterfaces: boolean = false): MsgSetCommunityPoolRebateResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgSetCommunityPoolRebateResponseAminoMsg): MsgSetCommunityPoolRebateResponse {
    return MsgSetCommunityPoolRebateResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSetCommunityPoolRebateResponseProtoMsg, useInterfaces: boolean = false): MsgSetCommunityPoolRebateResponse {
    return MsgSetCommunityPoolRebateResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSetCommunityPoolRebateResponse): Uint8Array {
    return MsgSetCommunityPoolRebateResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSetCommunityPoolRebateResponse): MsgSetCommunityPoolRebateResponseProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.MsgSetCommunityPoolRebateResponse",
      value: MsgSetCommunityPoolRebateResponse.encode(message).finish()
    };
  }
};
function createBaseMsgToggleTradeController(): MsgToggleTradeController {
  return {
    creator: "",
    chainId: "",
    permissionChange: 0,
    address: "",
    legacy: false
  };
}
export const MsgToggleTradeController = {
  typeUrl: "/stride.stakeibc.MsgToggleTradeController",
  encode(message: MsgToggleTradeController, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.chainId !== "") {
      writer.uint32(18).string(message.chainId);
    }
    if (message.permissionChange !== 0) {
      writer.uint32(24).int32(message.permissionChange);
    }
    if (message.address !== "") {
      writer.uint32(34).string(message.address);
    }
    if (message.legacy === true) {
      writer.uint32(40).bool(message.legacy);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgToggleTradeController {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgToggleTradeController();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.chainId = reader.string();
          break;
        case 3:
          message.permissionChange = (reader.int32() as any);
          break;
        case 4:
          message.address = reader.string();
          break;
        case 5:
          message.legacy = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgToggleTradeController>): MsgToggleTradeController {
    const message = createBaseMsgToggleTradeController();
    message.creator = object.creator ?? "";
    message.chainId = object.chainId ?? "";
    message.permissionChange = object.permissionChange ?? 0;
    message.address = object.address ?? "";
    message.legacy = object.legacy ?? false;
    return message;
  },
  fromAmino(object: MsgToggleTradeControllerAmino): MsgToggleTradeController {
    const message = createBaseMsgToggleTradeController();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.chain_id !== undefined && object.chain_id !== null) {
      message.chainId = object.chain_id;
    }
    if (object.permission_change !== undefined && object.permission_change !== null) {
      message.permissionChange = object.permission_change;
    }
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    if (object.legacy !== undefined && object.legacy !== null) {
      message.legacy = object.legacy;
    }
    return message;
  },
  toAmino(message: MsgToggleTradeController, useInterfaces: boolean = false): MsgToggleTradeControllerAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.chain_id = message.chainId === "" ? undefined : message.chainId;
    obj.permission_change = message.permissionChange === 0 ? undefined : message.permissionChange;
    obj.address = message.address === "" ? undefined : message.address;
    obj.legacy = message.legacy === false ? undefined : message.legacy;
    return obj;
  },
  fromAminoMsg(object: MsgToggleTradeControllerAminoMsg): MsgToggleTradeController {
    return MsgToggleTradeController.fromAmino(object.value);
  },
  toAminoMsg(message: MsgToggleTradeController, useInterfaces: boolean = false): MsgToggleTradeControllerAminoMsg {
    return {
      type: "stakeibc/MsgToggleTradeController",
      value: MsgToggleTradeController.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgToggleTradeControllerProtoMsg, useInterfaces: boolean = false): MsgToggleTradeController {
    return MsgToggleTradeController.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgToggleTradeController): Uint8Array {
    return MsgToggleTradeController.encode(message).finish();
  },
  toProtoMsg(message: MsgToggleTradeController): MsgToggleTradeControllerProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.MsgToggleTradeController",
      value: MsgToggleTradeController.encode(message).finish()
    };
  }
};
function createBaseMsgToggleTradeControllerResponse(): MsgToggleTradeControllerResponse {
  return {};
}
export const MsgToggleTradeControllerResponse = {
  typeUrl: "/stride.stakeibc.MsgToggleTradeControllerResponse",
  encode(_: MsgToggleTradeControllerResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgToggleTradeControllerResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgToggleTradeControllerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgToggleTradeControllerResponse>): MsgToggleTradeControllerResponse {
    const message = createBaseMsgToggleTradeControllerResponse();
    return message;
  },
  fromAmino(_: MsgToggleTradeControllerResponseAmino): MsgToggleTradeControllerResponse {
    const message = createBaseMsgToggleTradeControllerResponse();
    return message;
  },
  toAmino(_: MsgToggleTradeControllerResponse, useInterfaces: boolean = false): MsgToggleTradeControllerResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgToggleTradeControllerResponseAminoMsg): MsgToggleTradeControllerResponse {
    return MsgToggleTradeControllerResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgToggleTradeControllerResponseProtoMsg, useInterfaces: boolean = false): MsgToggleTradeControllerResponse {
    return MsgToggleTradeControllerResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgToggleTradeControllerResponse): Uint8Array {
    return MsgToggleTradeControllerResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgToggleTradeControllerResponse): MsgToggleTradeControllerResponseProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.MsgToggleTradeControllerResponse",
      value: MsgToggleTradeControllerResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateHostZoneParams(): MsgUpdateHostZoneParams {
  return {
    authority: "",
    chainId: "",
    maxMessagesPerIcaTx: BigInt(0)
  };
}
export const MsgUpdateHostZoneParams = {
  typeUrl: "/stride.stakeibc.MsgUpdateHostZoneParams",
  encode(message: MsgUpdateHostZoneParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.chainId !== "") {
      writer.uint32(18).string(message.chainId);
    }
    if (message.maxMessagesPerIcaTx !== BigInt(0)) {
      writer.uint32(24).uint64(message.maxMessagesPerIcaTx);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateHostZoneParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateHostZoneParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.chainId = reader.string();
          break;
        case 3:
          message.maxMessagesPerIcaTx = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUpdateHostZoneParams>): MsgUpdateHostZoneParams {
    const message = createBaseMsgUpdateHostZoneParams();
    message.authority = object.authority ?? "";
    message.chainId = object.chainId ?? "";
    message.maxMessagesPerIcaTx = object.maxMessagesPerIcaTx !== undefined && object.maxMessagesPerIcaTx !== null ? BigInt(object.maxMessagesPerIcaTx.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgUpdateHostZoneParamsAmino): MsgUpdateHostZoneParams {
    const message = createBaseMsgUpdateHostZoneParams();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.chain_id !== undefined && object.chain_id !== null) {
      message.chainId = object.chain_id;
    }
    if (object.max_messages_per_ica_tx !== undefined && object.max_messages_per_ica_tx !== null) {
      message.maxMessagesPerIcaTx = BigInt(object.max_messages_per_ica_tx);
    }
    return message;
  },
  toAmino(message: MsgUpdateHostZoneParams, useInterfaces: boolean = false): MsgUpdateHostZoneParamsAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.chain_id = message.chainId === "" ? undefined : message.chainId;
    obj.max_messages_per_ica_tx = message.maxMessagesPerIcaTx !== BigInt(0) ? message.maxMessagesPerIcaTx.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgUpdateHostZoneParamsAminoMsg): MsgUpdateHostZoneParams {
    return MsgUpdateHostZoneParams.fromAmino(object.value);
  },
  toAminoMsg(message: MsgUpdateHostZoneParams, useInterfaces: boolean = false): MsgUpdateHostZoneParamsAminoMsg {
    return {
      type: "stakeibc/MsgUpdateHostZoneParams",
      value: MsgUpdateHostZoneParams.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgUpdateHostZoneParamsProtoMsg, useInterfaces: boolean = false): MsgUpdateHostZoneParams {
    return MsgUpdateHostZoneParams.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateHostZoneParams): Uint8Array {
    return MsgUpdateHostZoneParams.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateHostZoneParams): MsgUpdateHostZoneParamsProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.MsgUpdateHostZoneParams",
      value: MsgUpdateHostZoneParams.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateHostZoneParamsResponse(): MsgUpdateHostZoneParamsResponse {
  return {};
}
export const MsgUpdateHostZoneParamsResponse = {
  typeUrl: "/stride.stakeibc.MsgUpdateHostZoneParamsResponse",
  encode(_: MsgUpdateHostZoneParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateHostZoneParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateHostZoneParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgUpdateHostZoneParamsResponse>): MsgUpdateHostZoneParamsResponse {
    const message = createBaseMsgUpdateHostZoneParamsResponse();
    return message;
  },
  fromAmino(_: MsgUpdateHostZoneParamsResponseAmino): MsgUpdateHostZoneParamsResponse {
    const message = createBaseMsgUpdateHostZoneParamsResponse();
    return message;
  },
  toAmino(_: MsgUpdateHostZoneParamsResponse, useInterfaces: boolean = false): MsgUpdateHostZoneParamsResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateHostZoneParamsResponseAminoMsg): MsgUpdateHostZoneParamsResponse {
    return MsgUpdateHostZoneParamsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateHostZoneParamsResponseProtoMsg, useInterfaces: boolean = false): MsgUpdateHostZoneParamsResponse {
    return MsgUpdateHostZoneParamsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateHostZoneParamsResponse): Uint8Array {
    return MsgUpdateHostZoneParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateHostZoneParamsResponse): MsgUpdateHostZoneParamsResponseProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.MsgUpdateHostZoneParamsResponse",
      value: MsgUpdateHostZoneParamsResponse.encode(message).finish()
    };
  }
};