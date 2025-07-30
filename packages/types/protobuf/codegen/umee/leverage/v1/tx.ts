//@ts-nocheck
import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { Token, TokenAmino, TokenSDKType, SpecialAssetSet, SpecialAssetSetAmino, SpecialAssetSetSDKType, SpecialAssetPair, SpecialAssetPairAmino, SpecialAssetPairSDKType, Params, ParamsAmino, ParamsSDKType } from "./leverage";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { Decimal } from "@cosmjs/math";
/** MsgSupply represents a user's request to supply assets to the module. */
export interface MsgSupply {
  /** Supplier is the account address supplying assets and the signer of the message. */
  supplier: string;
  asset: Coin | undefined;
}
export interface MsgSupplyProtoMsg {
  typeUrl: "/umee.leverage.v1.MsgSupply";
  value: Uint8Array;
}
/** MsgSupply represents a user's request to supply assets to the module. */
export interface MsgSupplyAmino {
  /** Supplier is the account address supplying assets and the signer of the message. */
  supplier?: string;
  asset?: CoinAmino | undefined;
}
export interface MsgSupplyAminoMsg {
  type: "/umee.leverage.v1.MsgSupply";
  value: MsgSupplyAmino;
}
/** MsgSupply represents a user's request to supply assets to the module. */
export interface MsgSupplySDKType {
  supplier: string;
  asset: CoinSDKType | undefined;
}
/**
 * MsgWithdraw represents a user's request to withdraw supplied assets.
 * Asset must be a uToken.
 */
export interface MsgWithdraw {
  /** Supplier is the account address withdrawing assets and the signer of the message. */
  supplier: string;
  asset: Coin | undefined;
}
export interface MsgWithdrawProtoMsg {
  typeUrl: "/umee.leverage.v1.MsgWithdraw";
  value: Uint8Array;
}
/**
 * MsgWithdraw represents a user's request to withdraw supplied assets.
 * Asset must be a uToken.
 */
export interface MsgWithdrawAmino {
  /** Supplier is the account address withdrawing assets and the signer of the message. */
  supplier?: string;
  asset?: CoinAmino | undefined;
}
export interface MsgWithdrawAminoMsg {
  type: "/umee.leverage.v1.MsgWithdraw";
  value: MsgWithdrawAmino;
}
/**
 * MsgWithdraw represents a user's request to withdraw supplied assets.
 * Asset must be a uToken.
 */
export interface MsgWithdrawSDKType {
  supplier: string;
  asset: CoinSDKType | undefined;
}
/** MsgMaxWithdraw represents a user's request to withdraw the maximum valid amount of supplied assets. */
export interface MsgMaxWithdraw {
  /** Supplier is the account address withdrawing assets and the signer of the message. */
  supplier: string;
  /** Denom is base token denom to withdraw */
  denom: string;
}
export interface MsgMaxWithdrawProtoMsg {
  typeUrl: "/umee.leverage.v1.MsgMaxWithdraw";
  value: Uint8Array;
}
/** MsgMaxWithdraw represents a user's request to withdraw the maximum valid amount of supplied assets. */
export interface MsgMaxWithdrawAmino {
  /** Supplier is the account address withdrawing assets and the signer of the message. */
  supplier?: string;
  /** Denom is base token denom to withdraw */
  denom?: string;
}
export interface MsgMaxWithdrawAminoMsg {
  type: "/umee.leverage.v1.MsgMaxWithdraw";
  value: MsgMaxWithdrawAmino;
}
/** MsgMaxWithdraw represents a user's request to withdraw the maximum valid amount of supplied assets. */
export interface MsgMaxWithdrawSDKType {
  supplier: string;
  denom: string;
}
/**
 * MsgCollateralize represents a user's request to enable selected
 * uTokens as collateral.
 */
export interface MsgCollateralize {
  /** Borrower is the account address adding collateral and the signer of the message. */
  borrower: string;
  asset: Coin | undefined;
}
export interface MsgCollateralizeProtoMsg {
  typeUrl: "/umee.leverage.v1.MsgCollateralize";
  value: Uint8Array;
}
/**
 * MsgCollateralize represents a user's request to enable selected
 * uTokens as collateral.
 */
export interface MsgCollateralizeAmino {
  /** Borrower is the account address adding collateral and the signer of the message. */
  borrower?: string;
  asset?: CoinAmino | undefined;
}
export interface MsgCollateralizeAminoMsg {
  type: "/umee.leverage.v1.MsgCollateralize";
  value: MsgCollateralizeAmino;
}
/**
 * MsgCollateralize represents a user's request to enable selected
 * uTokens as collateral.
 */
export interface MsgCollateralizeSDKType {
  borrower: string;
  asset: CoinSDKType | undefined;
}
/**
 * MsgDecollateralize represents a user's request to disable selected
 * uTokens as collateral.
 */
export interface MsgDecollateralize {
  /** Borrower is the account address removing collateral and the signer of the message. */
  borrower: string;
  asset: Coin | undefined;
}
export interface MsgDecollateralizeProtoMsg {
  typeUrl: "/umee.leverage.v1.MsgDecollateralize";
  value: Uint8Array;
}
/**
 * MsgDecollateralize represents a user's request to disable selected
 * uTokens as collateral.
 */
export interface MsgDecollateralizeAmino {
  /** Borrower is the account address removing collateral and the signer of the message. */
  borrower?: string;
  asset?: CoinAmino | undefined;
}
export interface MsgDecollateralizeAminoMsg {
  type: "/umee.leverage.v1.MsgDecollateralize";
  value: MsgDecollateralizeAmino;
}
/**
 * MsgDecollateralize represents a user's request to disable selected
 * uTokens as collateral.
 */
export interface MsgDecollateralizeSDKType {
  borrower: string;
  asset: CoinSDKType | undefined;
}
/**
 * MsgBorrow represents a user's request to borrow a base asset type
 * from the module.
 */
export interface MsgBorrow {
  /**
   * Borrower is the account address taking a loan and the signer
   * of the message.
   */
  borrower: string;
  asset: Coin | undefined;
}
export interface MsgBorrowProtoMsg {
  typeUrl: "/umee.leverage.v1.MsgBorrow";
  value: Uint8Array;
}
/**
 * MsgBorrow represents a user's request to borrow a base asset type
 * from the module.
 */
export interface MsgBorrowAmino {
  /**
   * Borrower is the account address taking a loan and the signer
   * of the message.
   */
  borrower?: string;
  asset?: CoinAmino | undefined;
}
export interface MsgBorrowAminoMsg {
  type: "/umee.leverage.v1.MsgBorrow";
  value: MsgBorrowAmino;
}
/**
 * MsgBorrow represents a user's request to borrow a base asset type
 * from the module.
 */
export interface MsgBorrowSDKType {
  borrower: string;
  asset: CoinSDKType | undefined;
}
/**
 * MsgMaxBorrow represents a user's request to borrow a base asset type
 * from the module, using the maximum available amount.
 */
export interface MsgMaxBorrow {
  /**
   * Borrower is the account address taking a loan and the signer
   * of the message.
   */
  borrower: string;
  denom: string;
}
export interface MsgMaxBorrowProtoMsg {
  typeUrl: "/umee.leverage.v1.MsgMaxBorrow";
  value: Uint8Array;
}
/**
 * MsgMaxBorrow represents a user's request to borrow a base asset type
 * from the module, using the maximum available amount.
 */
export interface MsgMaxBorrowAmino {
  /**
   * Borrower is the account address taking a loan and the signer
   * of the message.
   */
  borrower?: string;
  denom?: string;
}
export interface MsgMaxBorrowAminoMsg {
  type: "/umee.leverage.v1.MsgMaxBorrow";
  value: MsgMaxBorrowAmino;
}
/**
 * MsgMaxBorrow represents a user's request to borrow a base asset type
 * from the module, using the maximum available amount.
 */
export interface MsgMaxBorrowSDKType {
  borrower: string;
  denom: string;
}
/**
 * MsgRepay represents a user's request to repay a borrowed base asset
 * type to the module.
 */
export interface MsgRepay {
  /**
   * Borrower is the account address repaying a loan and the signer
   * of the message.
   */
  borrower: string;
  asset: Coin | undefined;
}
export interface MsgRepayProtoMsg {
  typeUrl: "/umee.leverage.v1.MsgRepay";
  value: Uint8Array;
}
/**
 * MsgRepay represents a user's request to repay a borrowed base asset
 * type to the module.
 */
export interface MsgRepayAmino {
  /**
   * Borrower is the account address repaying a loan and the signer
   * of the message.
   */
  borrower?: string;
  asset?: CoinAmino | undefined;
}
export interface MsgRepayAminoMsg {
  type: "/umee.leverage.v1.MsgRepay";
  value: MsgRepayAmino;
}
/**
 * MsgRepay represents a user's request to repay a borrowed base asset
 * type to the module.
 */
export interface MsgRepaySDKType {
  borrower: string;
  asset: CoinSDKType | undefined;
}
/** MsgLiquidate is the request structure for the Liquidate RPC. */
export interface MsgLiquidate {
  /**
   * Liquidator is the account address performing a liquidation and the signer
   * of the message.
   */
  liquidator: string;
  /**
   * Borrower is the account whose borrow is being repaid, and collateral consumed,
   * by the liquidation. It does not sign the message.
   */
  borrower: string;
  /**
   * Repayment is the maximum amount of base tokens that the liquidator is willing
   * to repay.
   */
  repayment: Coin | undefined;
  /**
   * RewardDenom is the denom that the liquidator will receive as a liquidation reward.
   * If it is a uToken, the liquidator will receive uTokens from the borrower's
   * collateral. If it is a base token, the uTokens will be redeemed directly at
   * a reduced Liquidation Incentive, and the liquidator will receive base tokens.
   */
  rewardDenom: string;
}
export interface MsgLiquidateProtoMsg {
  typeUrl: "/umee.leverage.v1.MsgLiquidate";
  value: Uint8Array;
}
/** MsgLiquidate is the request structure for the Liquidate RPC. */
export interface MsgLiquidateAmino {
  /**
   * Liquidator is the account address performing a liquidation and the signer
   * of the message.
   */
  liquidator?: string;
  /**
   * Borrower is the account whose borrow is being repaid, and collateral consumed,
   * by the liquidation. It does not sign the message.
   */
  borrower?: string;
  /**
   * Repayment is the maximum amount of base tokens that the liquidator is willing
   * to repay.
   */
  repayment?: CoinAmino | undefined;
  /**
   * RewardDenom is the denom that the liquidator will receive as a liquidation reward.
   * If it is a uToken, the liquidator will receive uTokens from the borrower's
   * collateral. If it is a base token, the uTokens will be redeemed directly at
   * a reduced Liquidation Incentive, and the liquidator will receive base tokens.
   */
  reward_denom?: string;
}
export interface MsgLiquidateAminoMsg {
  type: "/umee.leverage.v1.MsgLiquidate";
  value: MsgLiquidateAmino;
}
/** MsgLiquidate is the request structure for the Liquidate RPC. */
export interface MsgLiquidateSDKType {
  liquidator: string;
  borrower: string;
  repayment: CoinSDKType | undefined;
  reward_denom: string;
}
/** MsgLeveragedLiquidate is the request structure for the LeveragedLiquidate RPC. */
export interface MsgLeveragedLiquidate {
  /**
   * Liquidator is the account address performing a liquidation and the signer
   * of the message.
   */
  liquidator: string;
  /**
   * Borrower is the account whose borrow is being repaid, and collateral consumed,
   * by the liquidation. It does not sign the message.
   */
  borrower: string;
  /**
   * RepayDenom is the base token that the liquidator will borrow in order to repay on behalf of
   * the borrower.
   */
  repayDenom: string;
  /**
   * RewardDenom is the uToken denom that the liquidator will receive as a liquidation reward
   * and immediately collateralize.
   */
  rewardDenom: string;
  /** MaxRepay optionally limits the USD value to repay. If specified, this cannot be below $1.00 */
  maxRepay: string;
}
export interface MsgLeveragedLiquidateProtoMsg {
  typeUrl: "/umee.leverage.v1.MsgLeveragedLiquidate";
  value: Uint8Array;
}
/** MsgLeveragedLiquidate is the request structure for the LeveragedLiquidate RPC. */
export interface MsgLeveragedLiquidateAmino {
  /**
   * Liquidator is the account address performing a liquidation and the signer
   * of the message.
   */
  liquidator?: string;
  /**
   * Borrower is the account whose borrow is being repaid, and collateral consumed,
   * by the liquidation. It does not sign the message.
   */
  borrower?: string;
  /**
   * RepayDenom is the base token that the liquidator will borrow in order to repay on behalf of
   * the borrower.
   */
  repay_denom?: string;
  /**
   * RewardDenom is the uToken denom that the liquidator will receive as a liquidation reward
   * and immediately collateralize.
   */
  reward_denom?: string;
  /** MaxRepay optionally limits the USD value to repay. If specified, this cannot be below $1.00 */
  max_repay?: string;
}
export interface MsgLeveragedLiquidateAminoMsg {
  type: "/umee.leverage.v1.MsgLeveragedLiquidate";
  value: MsgLeveragedLiquidateAmino;
}
/** MsgLeveragedLiquidate is the request structure for the LeveragedLiquidate RPC. */
export interface MsgLeveragedLiquidateSDKType {
  liquidator: string;
  borrower: string;
  repay_denom: string;
  reward_denom: string;
  max_repay: string;
}
/** MsgSupplyCollateral represents a user's request to supply and collateralize assets to the module. */
export interface MsgSupplyCollateral {
  /** Supplier is the account address supplying assets and the signer of the message. */
  supplier: string;
  asset: Coin | undefined;
}
export interface MsgSupplyCollateralProtoMsg {
  typeUrl: "/umee.leverage.v1.MsgSupplyCollateral";
  value: Uint8Array;
}
/** MsgSupplyCollateral represents a user's request to supply and collateralize assets to the module. */
export interface MsgSupplyCollateralAmino {
  /** Supplier is the account address supplying assets and the signer of the message. */
  supplier?: string;
  asset?: CoinAmino | undefined;
}
export interface MsgSupplyCollateralAminoMsg {
  type: "/umee.leverage.v1.MsgSupplyCollateral";
  value: MsgSupplyCollateralAmino;
}
/** MsgSupplyCollateral represents a user's request to supply and collateralize assets to the module. */
export interface MsgSupplyCollateralSDKType {
  supplier: string;
  asset: CoinSDKType | undefined;
}
/** MsgSupplyResponse defines the Msg/Supply response type. */
export interface MsgSupplyResponse {
  /** Received is the amount of uTokens received. */
  received: Coin | undefined;
}
export interface MsgSupplyResponseProtoMsg {
  typeUrl: "/umee.leverage.v1.MsgSupplyResponse";
  value: Uint8Array;
}
/** MsgSupplyResponse defines the Msg/Supply response type. */
export interface MsgSupplyResponseAmino {
  /** Received is the amount of uTokens received. */
  received?: CoinAmino | undefined;
}
export interface MsgSupplyResponseAminoMsg {
  type: "/umee.leverage.v1.MsgSupplyResponse";
  value: MsgSupplyResponseAmino;
}
/** MsgSupplyResponse defines the Msg/Supply response type. */
export interface MsgSupplyResponseSDKType {
  received: CoinSDKType | undefined;
}
/** MsgWithdrawResponse defines the Msg/Withdraw response type. */
export interface MsgWithdrawResponse {
  /** Received is the amount of base tokens received. */
  received: Coin | undefined;
}
export interface MsgWithdrawResponseProtoMsg {
  typeUrl: "/umee.leverage.v1.MsgWithdrawResponse";
  value: Uint8Array;
}
/** MsgWithdrawResponse defines the Msg/Withdraw response type. */
export interface MsgWithdrawResponseAmino {
  /** Received is the amount of base tokens received. */
  received?: CoinAmino | undefined;
}
export interface MsgWithdrawResponseAminoMsg {
  type: "/umee.leverage.v1.MsgWithdrawResponse";
  value: MsgWithdrawResponseAmino;
}
/** MsgWithdrawResponse defines the Msg/Withdraw response type. */
export interface MsgWithdrawResponseSDKType {
  received: CoinSDKType | undefined;
}
/** MsgMaxWithdrawResponse defines the Msg/MaxWithdraw response type. */
export interface MsgMaxWithdrawResponse {
  /** Withdrawn is the amount of uTokens withdrawn. */
  withdrawn: Coin | undefined;
  /** Received is the amount of base tokens received. */
  received: Coin | undefined;
}
export interface MsgMaxWithdrawResponseProtoMsg {
  typeUrl: "/umee.leverage.v1.MsgMaxWithdrawResponse";
  value: Uint8Array;
}
/** MsgMaxWithdrawResponse defines the Msg/MaxWithdraw response type. */
export interface MsgMaxWithdrawResponseAmino {
  /** Withdrawn is the amount of uTokens withdrawn. */
  withdrawn?: CoinAmino | undefined;
  /** Received is the amount of base tokens received. */
  received?: CoinAmino | undefined;
}
export interface MsgMaxWithdrawResponseAminoMsg {
  type: "/umee.leverage.v1.MsgMaxWithdrawResponse";
  value: MsgMaxWithdrawResponseAmino;
}
/** MsgMaxWithdrawResponse defines the Msg/MaxWithdraw response type. */
export interface MsgMaxWithdrawResponseSDKType {
  withdrawn: CoinSDKType | undefined;
  received: CoinSDKType | undefined;
}
/** MsgCollateralizeResponse defines the Msg/Collateralize response type. */
export interface MsgCollateralizeResponse {}
export interface MsgCollateralizeResponseProtoMsg {
  typeUrl: "/umee.leverage.v1.MsgCollateralizeResponse";
  value: Uint8Array;
}
/** MsgCollateralizeResponse defines the Msg/Collateralize response type. */
export interface MsgCollateralizeResponseAmino {}
export interface MsgCollateralizeResponseAminoMsg {
  type: "/umee.leverage.v1.MsgCollateralizeResponse";
  value: MsgCollateralizeResponseAmino;
}
/** MsgCollateralizeResponse defines the Msg/Collateralize response type. */
export interface MsgCollateralizeResponseSDKType {}
/** MsgDecollateralizeResponse defines the Msg/Decollateralize response type. */
export interface MsgDecollateralizeResponse {}
export interface MsgDecollateralizeResponseProtoMsg {
  typeUrl: "/umee.leverage.v1.MsgDecollateralizeResponse";
  value: Uint8Array;
}
/** MsgDecollateralizeResponse defines the Msg/Decollateralize response type. */
export interface MsgDecollateralizeResponseAmino {}
export interface MsgDecollateralizeResponseAminoMsg {
  type: "/umee.leverage.v1.MsgDecollateralizeResponse";
  value: MsgDecollateralizeResponseAmino;
}
/** MsgDecollateralizeResponse defines the Msg/Decollateralize response type. */
export interface MsgDecollateralizeResponseSDKType {}
/** MsgBorrowResponse defines the Msg/Borrow response type. */
export interface MsgBorrowResponse {}
export interface MsgBorrowResponseProtoMsg {
  typeUrl: "/umee.leverage.v1.MsgBorrowResponse";
  value: Uint8Array;
}
/** MsgBorrowResponse defines the Msg/Borrow response type. */
export interface MsgBorrowResponseAmino {}
export interface MsgBorrowResponseAminoMsg {
  type: "/umee.leverage.v1.MsgBorrowResponse";
  value: MsgBorrowResponseAmino;
}
/** MsgBorrowResponse defines the Msg/Borrow response type. */
export interface MsgBorrowResponseSDKType {}
/** MsgMaxBorrowResponse defines the Msg/MaxBorrow response type. */
export interface MsgMaxBorrowResponse {
  /** Borrowed is the amount of tokens borrowed. */
  borrowed: Coin | undefined;
}
export interface MsgMaxBorrowResponseProtoMsg {
  typeUrl: "/umee.leverage.v1.MsgMaxBorrowResponse";
  value: Uint8Array;
}
/** MsgMaxBorrowResponse defines the Msg/MaxBorrow response type. */
export interface MsgMaxBorrowResponseAmino {
  /** Borrowed is the amount of tokens borrowed. */
  borrowed?: CoinAmino | undefined;
}
export interface MsgMaxBorrowResponseAminoMsg {
  type: "/umee.leverage.v1.MsgMaxBorrowResponse";
  value: MsgMaxBorrowResponseAmino;
}
/** MsgMaxBorrowResponse defines the Msg/MaxBorrow response type. */
export interface MsgMaxBorrowResponseSDKType {
  borrowed: CoinSDKType | undefined;
}
/** MsgRepayResponse defines the Msg/Repay response type. */
export interface MsgRepayResponse {
  /** Repaid is the amount of base tokens repaid to the module. */
  repaid: Coin | undefined;
}
export interface MsgRepayResponseProtoMsg {
  typeUrl: "/umee.leverage.v1.MsgRepayResponse";
  value: Uint8Array;
}
/** MsgRepayResponse defines the Msg/Repay response type. */
export interface MsgRepayResponseAmino {
  /** Repaid is the amount of base tokens repaid to the module. */
  repaid?: CoinAmino | undefined;
}
export interface MsgRepayResponseAminoMsg {
  type: "/umee.leverage.v1.MsgRepayResponse";
  value: MsgRepayResponseAmino;
}
/** MsgRepayResponse defines the Msg/Repay response type. */
export interface MsgRepayResponseSDKType {
  repaid: CoinSDKType | undefined;
}
/** MsgLiquidateResponse defines the Msg/Liquidate response type. */
export interface MsgLiquidateResponse {
  /**
   * Repaid is the amount of borrowed base tokens that the liquidator repaid
   * to the module on behalf of the borrower.
   */
  repaid: Coin | undefined;
  /**
   * Collateral is the amount of the borrower's uToken collateral that
   * was liquidated.
   */
  collateral: Coin | undefined;
  /**
   * Reward is the amount of base tokens that the liquidator received from
   * the module as reward for the liquidation.
   */
  reward: Coin | undefined;
}
export interface MsgLiquidateResponseProtoMsg {
  typeUrl: "/umee.leverage.v1.MsgLiquidateResponse";
  value: Uint8Array;
}
/** MsgLiquidateResponse defines the Msg/Liquidate response type. */
export interface MsgLiquidateResponseAmino {
  /**
   * Repaid is the amount of borrowed base tokens that the liquidator repaid
   * to the module on behalf of the borrower.
   */
  repaid?: CoinAmino | undefined;
  /**
   * Collateral is the amount of the borrower's uToken collateral that
   * was liquidated.
   */
  collateral?: CoinAmino | undefined;
  /**
   * Reward is the amount of base tokens that the liquidator received from
   * the module as reward for the liquidation.
   */
  reward?: CoinAmino | undefined;
}
export interface MsgLiquidateResponseAminoMsg {
  type: "/umee.leverage.v1.MsgLiquidateResponse";
  value: MsgLiquidateResponseAmino;
}
/** MsgLiquidateResponse defines the Msg/Liquidate response type. */
export interface MsgLiquidateResponseSDKType {
  repaid: CoinSDKType | undefined;
  collateral: CoinSDKType | undefined;
  reward: CoinSDKType | undefined;
}
/** MsgLeveragedLiquidateResponse defines the Msg/LeveragedLiquidate response type. */
export interface MsgLeveragedLiquidateResponse {
  /**
   * Repaid is the amount of base tokens that the liquidator borrowed and repaid
   * to the module on behalf of the borrower.
   */
  repaid: Coin | undefined;
  /**
   * Reward is the amount of collateral that the liquidator gained
   * as reward for the liquidation.
   */
  reward: Coin | undefined;
}
export interface MsgLeveragedLiquidateResponseProtoMsg {
  typeUrl: "/umee.leverage.v1.MsgLeveragedLiquidateResponse";
  value: Uint8Array;
}
/** MsgLeveragedLiquidateResponse defines the Msg/LeveragedLiquidate response type. */
export interface MsgLeveragedLiquidateResponseAmino {
  /**
   * Repaid is the amount of base tokens that the liquidator borrowed and repaid
   * to the module on behalf of the borrower.
   */
  repaid?: CoinAmino | undefined;
  /**
   * Reward is the amount of collateral that the liquidator gained
   * as reward for the liquidation.
   */
  reward?: CoinAmino | undefined;
}
export interface MsgLeveragedLiquidateResponseAminoMsg {
  type: "/umee.leverage.v1.MsgLeveragedLiquidateResponse";
  value: MsgLeveragedLiquidateResponseAmino;
}
/** MsgLeveragedLiquidateResponse defines the Msg/LeveragedLiquidate response type. */
export interface MsgLeveragedLiquidateResponseSDKType {
  repaid: CoinSDKType | undefined;
  reward: CoinSDKType | undefined;
}
/** MsgSupplyCollateralResponse defines the Msg/SupplyCollateral response type. */
export interface MsgSupplyCollateralResponse {
  /** Collateralized is the amount of uTokens collateralized. */
  collateralized: Coin | undefined;
}
export interface MsgSupplyCollateralResponseProtoMsg {
  typeUrl: "/umee.leverage.v1.MsgSupplyCollateralResponse";
  value: Uint8Array;
}
/** MsgSupplyCollateralResponse defines the Msg/SupplyCollateral response type. */
export interface MsgSupplyCollateralResponseAmino {
  /** Collateralized is the amount of uTokens collateralized. */
  collateralized?: CoinAmino | undefined;
}
export interface MsgSupplyCollateralResponseAminoMsg {
  type: "/umee.leverage.v1.MsgSupplyCollateralResponse";
  value: MsgSupplyCollateralResponseAmino;
}
/** MsgSupplyCollateralResponse defines the Msg/SupplyCollateral response type. */
export interface MsgSupplyCollateralResponseSDKType {
  collateralized: CoinSDKType | undefined;
}
/** MsgGovUpdateRegistry defines the Msg/GovUpdateRegistry request type. */
export interface MsgGovUpdateRegistry {
  /** authority is the address of the governance account or the Emergency Group. */
  authority: string;
  /**
   * description motivating the change. Should be used only when executing by the
   * Emergency Group. Otherwise the x/gov Proposal metadata should be used.
   */
  description: string;
  /** add_tokens defines new token settings. */
  addTokens: Token[];
  /** update_tokens defines the new settings for existed tokens. */
  updateTokens: Token[];
}
export interface MsgGovUpdateRegistryProtoMsg {
  typeUrl: "/umee.leverage.v1.MsgGovUpdateRegistry";
  value: Uint8Array;
}
/** MsgGovUpdateRegistry defines the Msg/GovUpdateRegistry request type. */
export interface MsgGovUpdateRegistryAmino {
  /** authority is the address of the governance account or the Emergency Group. */
  authority?: string;
  /**
   * description motivating the change. Should be used only when executing by the
   * Emergency Group. Otherwise the x/gov Proposal metadata should be used.
   */
  description?: string;
  /** add_tokens defines new token settings. */
  add_tokens?: TokenAmino[];
  /** update_tokens defines the new settings for existed tokens. */
  update_tokens?: TokenAmino[];
}
export interface MsgGovUpdateRegistryAminoMsg {
  type: "/umee.leverage.v1.MsgGovUpdateRegistry";
  value: MsgGovUpdateRegistryAmino;
}
/** MsgGovUpdateRegistry defines the Msg/GovUpdateRegistry request type. */
export interface MsgGovUpdateRegistrySDKType {
  authority: string;
  description: string;
  add_tokens: TokenSDKType[];
  update_tokens: TokenSDKType[];
}
/** MsgGovUpdateRegistryResponse defines the Msg/GovUpdateRegistry response type. */
export interface MsgGovUpdateRegistryResponse {}
export interface MsgGovUpdateRegistryResponseProtoMsg {
  typeUrl: "/umee.leverage.v1.MsgGovUpdateRegistryResponse";
  value: Uint8Array;
}
/** MsgGovUpdateRegistryResponse defines the Msg/GovUpdateRegistry response type. */
export interface MsgGovUpdateRegistryResponseAmino {}
export interface MsgGovUpdateRegistryResponseAminoMsg {
  type: "/umee.leverage.v1.MsgGovUpdateRegistryResponse";
  value: MsgGovUpdateRegistryResponseAmino;
}
/** MsgGovUpdateRegistryResponse defines the Msg/GovUpdateRegistry response type. */
export interface MsgGovUpdateRegistryResponseSDKType {}
/** MsgGovUpdateSpecialAssets defines the Msg/GovUpdateSpecialAssets request type. */
export interface MsgGovUpdateSpecialAssets {
  /** authority is the address of the governance account or the Emergency Group. */
  authority: string;
  /**
   * description motivating the change. Should be used only when executing by the
   * Emergency Group. Otherwise the x/gov Proposal metadata should be used.
   */
  description: string;
  /**
   * sets are bidirectional groups of special asset pairs. Creating a special asset
   * set causes all assets in the set to have a certain collateral weight when borrowing
   * against each other (but not looping with themselves). Overrides any existing
   * special asset pairs between assets in the set. Using both collateral weight
   * and liquidation theshold of zero will clear all existing special pairs in the set instead.
   */
  sets: SpecialAssetSet[];
  /**
   * pairs are new or updated special asset pairs. Updating both a special asset pair's
   * collateral weight and liquidation threshold to zero deletes the pair instead.
   * These pairs will be applied after any sets above when passing a proposal,
   * so they can be used to override certain set elements, set directional relationships,
   * or set an asset's relation to itself (looping).
   */
  pairs: SpecialAssetPair[];
}
export interface MsgGovUpdateSpecialAssetsProtoMsg {
  typeUrl: "/umee.leverage.v1.MsgGovUpdateSpecialAssets";
  value: Uint8Array;
}
/** MsgGovUpdateSpecialAssets defines the Msg/GovUpdateSpecialAssets request type. */
export interface MsgGovUpdateSpecialAssetsAmino {
  /** authority is the address of the governance account or the Emergency Group. */
  authority?: string;
  /**
   * description motivating the change. Should be used only when executing by the
   * Emergency Group. Otherwise the x/gov Proposal metadata should be used.
   */
  description?: string;
  /**
   * sets are bidirectional groups of special asset pairs. Creating a special asset
   * set causes all assets in the set to have a certain collateral weight when borrowing
   * against each other (but not looping with themselves). Overrides any existing
   * special asset pairs between assets in the set. Using both collateral weight
   * and liquidation theshold of zero will clear all existing special pairs in the set instead.
   */
  sets?: SpecialAssetSetAmino[];
  /**
   * pairs are new or updated special asset pairs. Updating both a special asset pair's
   * collateral weight and liquidation threshold to zero deletes the pair instead.
   * These pairs will be applied after any sets above when passing a proposal,
   * so they can be used to override certain set elements, set directional relationships,
   * or set an asset's relation to itself (looping).
   */
  pairs?: SpecialAssetPairAmino[];
}
export interface MsgGovUpdateSpecialAssetsAminoMsg {
  type: "/umee.leverage.v1.MsgGovUpdateSpecialAssets";
  value: MsgGovUpdateSpecialAssetsAmino;
}
/** MsgGovUpdateSpecialAssets defines the Msg/GovUpdateSpecialAssets request type. */
export interface MsgGovUpdateSpecialAssetsSDKType {
  authority: string;
  description: string;
  sets: SpecialAssetSetSDKType[];
  pairs: SpecialAssetPairSDKType[];
}
/** MsgGovUpdateSpecialAssetsResponse defines the Msg/GovUpdateSpecialAssets response type. */
export interface MsgGovUpdateSpecialAssetsResponse {}
export interface MsgGovUpdateSpecialAssetsResponseProtoMsg {
  typeUrl: "/umee.leverage.v1.MsgGovUpdateSpecialAssetsResponse";
  value: Uint8Array;
}
/** MsgGovUpdateSpecialAssetsResponse defines the Msg/GovUpdateSpecialAssets response type. */
export interface MsgGovUpdateSpecialAssetsResponseAmino {}
export interface MsgGovUpdateSpecialAssetsResponseAminoMsg {
  type: "/umee.leverage.v1.MsgGovUpdateSpecialAssetsResponse";
  value: MsgGovUpdateSpecialAssetsResponseAmino;
}
/** MsgGovUpdateSpecialAssetsResponse defines the Msg/GovUpdateSpecialAssets response type. */
export interface MsgGovUpdateSpecialAssetsResponseSDKType {}
/** MsgGovSetParams is used by governance to update module parameters. */
export interface MsgGovSetParams {
  /** authority must be the address of the governance account. */
  authority: string;
  params: Params | undefined;
}
export interface MsgGovSetParamsProtoMsg {
  typeUrl: "/umee.leverage.v1.MsgGovSetParams";
  value: Uint8Array;
}
/** MsgGovSetParams is used by governance to update module parameters. */
export interface MsgGovSetParamsAmino {
  /** authority must be the address of the governance account. */
  authority?: string;
  params?: ParamsAmino | undefined;
}
export interface MsgGovSetParamsAminoMsg {
  type: "/umee.leverage.v1.MsgGovSetParams";
  value: MsgGovSetParamsAmino;
}
/** MsgGovSetParams is used by governance to update module parameters. */
export interface MsgGovSetParamsSDKType {
  authority: string;
  params: ParamsSDKType | undefined;
}
/** MsgGovSetParamsResponse defines the Msg/SetParams response type. */
export interface MsgGovSetParamsResponse {}
export interface MsgGovSetParamsResponseProtoMsg {
  typeUrl: "/umee.leverage.v1.MsgGovSetParamsResponse";
  value: Uint8Array;
}
/** MsgGovSetParamsResponse defines the Msg/SetParams response type. */
export interface MsgGovSetParamsResponseAmino {}
export interface MsgGovSetParamsResponseAminoMsg {
  type: "/umee.leverage.v1.MsgGovSetParamsResponse";
  value: MsgGovSetParamsResponseAmino;
}
/** MsgGovSetParamsResponse defines the Msg/SetParams response type. */
export interface MsgGovSetParamsResponseSDKType {}
function createBaseMsgSupply(): MsgSupply {
  return {
    supplier: "",
    asset: Coin.fromPartial({})
  };
}
export const MsgSupply = {
  typeUrl: "/umee.leverage.v1.MsgSupply",
  encode(message: MsgSupply, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.supplier !== "") {
      writer.uint32(10).string(message.supplier);
    }
    if (message.asset !== undefined) {
      Coin.encode(message.asset, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSupply {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSupply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.supplier = reader.string();
          break;
        case 2:
          message.asset = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSupply>): MsgSupply {
    const message = createBaseMsgSupply();
    message.supplier = object.supplier ?? "";
    message.asset = object.asset !== undefined && object.asset !== null ? Coin.fromPartial(object.asset) : undefined;
    return message;
  },
  fromAmino(object: MsgSupplyAmino): MsgSupply {
    const message = createBaseMsgSupply();
    if (object.supplier !== undefined && object.supplier !== null) {
      message.supplier = object.supplier;
    }
    if (object.asset !== undefined && object.asset !== null) {
      message.asset = Coin.fromAmino(object.asset);
    }
    return message;
  },
  toAmino(message: MsgSupply, useInterfaces: boolean = false): MsgSupplyAmino {
    const obj: any = {};
    obj.supplier = message.supplier === "" ? undefined : message.supplier;
    obj.asset = message.asset ? Coin.toAmino(message.asset, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgSupplyAminoMsg): MsgSupply {
    return MsgSupply.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSupplyProtoMsg, useInterfaces: boolean = false): MsgSupply {
    return MsgSupply.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSupply): Uint8Array {
    return MsgSupply.encode(message).finish();
  },
  toProtoMsg(message: MsgSupply): MsgSupplyProtoMsg {
    return {
      typeUrl: "/umee.leverage.v1.MsgSupply",
      value: MsgSupply.encode(message).finish()
    };
  }
};
function createBaseMsgWithdraw(): MsgWithdraw {
  return {
    supplier: "",
    asset: Coin.fromPartial({})
  };
}
export const MsgWithdraw = {
  typeUrl: "/umee.leverage.v1.MsgWithdraw",
  encode(message: MsgWithdraw, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.supplier !== "") {
      writer.uint32(10).string(message.supplier);
    }
    if (message.asset !== undefined) {
      Coin.encode(message.asset, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgWithdraw {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdraw();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.supplier = reader.string();
          break;
        case 2:
          message.asset = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgWithdraw>): MsgWithdraw {
    const message = createBaseMsgWithdraw();
    message.supplier = object.supplier ?? "";
    message.asset = object.asset !== undefined && object.asset !== null ? Coin.fromPartial(object.asset) : undefined;
    return message;
  },
  fromAmino(object: MsgWithdrawAmino): MsgWithdraw {
    const message = createBaseMsgWithdraw();
    if (object.supplier !== undefined && object.supplier !== null) {
      message.supplier = object.supplier;
    }
    if (object.asset !== undefined && object.asset !== null) {
      message.asset = Coin.fromAmino(object.asset);
    }
    return message;
  },
  toAmino(message: MsgWithdraw, useInterfaces: boolean = false): MsgWithdrawAmino {
    const obj: any = {};
    obj.supplier = message.supplier === "" ? undefined : message.supplier;
    obj.asset = message.asset ? Coin.toAmino(message.asset, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgWithdrawAminoMsg): MsgWithdraw {
    return MsgWithdraw.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgWithdrawProtoMsg, useInterfaces: boolean = false): MsgWithdraw {
    return MsgWithdraw.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgWithdraw): Uint8Array {
    return MsgWithdraw.encode(message).finish();
  },
  toProtoMsg(message: MsgWithdraw): MsgWithdrawProtoMsg {
    return {
      typeUrl: "/umee.leverage.v1.MsgWithdraw",
      value: MsgWithdraw.encode(message).finish()
    };
  }
};
function createBaseMsgMaxWithdraw(): MsgMaxWithdraw {
  return {
    supplier: "",
    denom: ""
  };
}
export const MsgMaxWithdraw = {
  typeUrl: "/umee.leverage.v1.MsgMaxWithdraw",
  encode(message: MsgMaxWithdraw, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.supplier !== "") {
      writer.uint32(10).string(message.supplier);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgMaxWithdraw {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMaxWithdraw();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.supplier = reader.string();
          break;
        case 2:
          message.denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgMaxWithdraw>): MsgMaxWithdraw {
    const message = createBaseMsgMaxWithdraw();
    message.supplier = object.supplier ?? "";
    message.denom = object.denom ?? "";
    return message;
  },
  fromAmino(object: MsgMaxWithdrawAmino): MsgMaxWithdraw {
    const message = createBaseMsgMaxWithdraw();
    if (object.supplier !== undefined && object.supplier !== null) {
      message.supplier = object.supplier;
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    return message;
  },
  toAmino(message: MsgMaxWithdraw, useInterfaces: boolean = false): MsgMaxWithdrawAmino {
    const obj: any = {};
    obj.supplier = message.supplier === "" ? undefined : message.supplier;
    obj.denom = message.denom === "" ? undefined : message.denom;
    return obj;
  },
  fromAminoMsg(object: MsgMaxWithdrawAminoMsg): MsgMaxWithdraw {
    return MsgMaxWithdraw.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgMaxWithdrawProtoMsg, useInterfaces: boolean = false): MsgMaxWithdraw {
    return MsgMaxWithdraw.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgMaxWithdraw): Uint8Array {
    return MsgMaxWithdraw.encode(message).finish();
  },
  toProtoMsg(message: MsgMaxWithdraw): MsgMaxWithdrawProtoMsg {
    return {
      typeUrl: "/umee.leverage.v1.MsgMaxWithdraw",
      value: MsgMaxWithdraw.encode(message).finish()
    };
  }
};
function createBaseMsgCollateralize(): MsgCollateralize {
  return {
    borrower: "",
    asset: Coin.fromPartial({})
  };
}
export const MsgCollateralize = {
  typeUrl: "/umee.leverage.v1.MsgCollateralize",
  encode(message: MsgCollateralize, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.borrower !== "") {
      writer.uint32(10).string(message.borrower);
    }
    if (message.asset !== undefined) {
      Coin.encode(message.asset, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgCollateralize {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCollateralize();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.borrower = reader.string();
          break;
        case 2:
          message.asset = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgCollateralize>): MsgCollateralize {
    const message = createBaseMsgCollateralize();
    message.borrower = object.borrower ?? "";
    message.asset = object.asset !== undefined && object.asset !== null ? Coin.fromPartial(object.asset) : undefined;
    return message;
  },
  fromAmino(object: MsgCollateralizeAmino): MsgCollateralize {
    const message = createBaseMsgCollateralize();
    if (object.borrower !== undefined && object.borrower !== null) {
      message.borrower = object.borrower;
    }
    if (object.asset !== undefined && object.asset !== null) {
      message.asset = Coin.fromAmino(object.asset);
    }
    return message;
  },
  toAmino(message: MsgCollateralize, useInterfaces: boolean = false): MsgCollateralizeAmino {
    const obj: any = {};
    obj.borrower = message.borrower === "" ? undefined : message.borrower;
    obj.asset = message.asset ? Coin.toAmino(message.asset, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgCollateralizeAminoMsg): MsgCollateralize {
    return MsgCollateralize.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgCollateralizeProtoMsg, useInterfaces: boolean = false): MsgCollateralize {
    return MsgCollateralize.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgCollateralize): Uint8Array {
    return MsgCollateralize.encode(message).finish();
  },
  toProtoMsg(message: MsgCollateralize): MsgCollateralizeProtoMsg {
    return {
      typeUrl: "/umee.leverage.v1.MsgCollateralize",
      value: MsgCollateralize.encode(message).finish()
    };
  }
};
function createBaseMsgDecollateralize(): MsgDecollateralize {
  return {
    borrower: "",
    asset: Coin.fromPartial({})
  };
}
export const MsgDecollateralize = {
  typeUrl: "/umee.leverage.v1.MsgDecollateralize",
  encode(message: MsgDecollateralize, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.borrower !== "") {
      writer.uint32(10).string(message.borrower);
    }
    if (message.asset !== undefined) {
      Coin.encode(message.asset, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgDecollateralize {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDecollateralize();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.borrower = reader.string();
          break;
        case 2:
          message.asset = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgDecollateralize>): MsgDecollateralize {
    const message = createBaseMsgDecollateralize();
    message.borrower = object.borrower ?? "";
    message.asset = object.asset !== undefined && object.asset !== null ? Coin.fromPartial(object.asset) : undefined;
    return message;
  },
  fromAmino(object: MsgDecollateralizeAmino): MsgDecollateralize {
    const message = createBaseMsgDecollateralize();
    if (object.borrower !== undefined && object.borrower !== null) {
      message.borrower = object.borrower;
    }
    if (object.asset !== undefined && object.asset !== null) {
      message.asset = Coin.fromAmino(object.asset);
    }
    return message;
  },
  toAmino(message: MsgDecollateralize, useInterfaces: boolean = false): MsgDecollateralizeAmino {
    const obj: any = {};
    obj.borrower = message.borrower === "" ? undefined : message.borrower;
    obj.asset = message.asset ? Coin.toAmino(message.asset, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgDecollateralizeAminoMsg): MsgDecollateralize {
    return MsgDecollateralize.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgDecollateralizeProtoMsg, useInterfaces: boolean = false): MsgDecollateralize {
    return MsgDecollateralize.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgDecollateralize): Uint8Array {
    return MsgDecollateralize.encode(message).finish();
  },
  toProtoMsg(message: MsgDecollateralize): MsgDecollateralizeProtoMsg {
    return {
      typeUrl: "/umee.leverage.v1.MsgDecollateralize",
      value: MsgDecollateralize.encode(message).finish()
    };
  }
};
function createBaseMsgBorrow(): MsgBorrow {
  return {
    borrower: "",
    asset: Coin.fromPartial({})
  };
}
export const MsgBorrow = {
  typeUrl: "/umee.leverage.v1.MsgBorrow",
  encode(message: MsgBorrow, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.borrower !== "") {
      writer.uint32(10).string(message.borrower);
    }
    if (message.asset !== undefined) {
      Coin.encode(message.asset, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgBorrow {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBorrow();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.borrower = reader.string();
          break;
        case 2:
          message.asset = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgBorrow>): MsgBorrow {
    const message = createBaseMsgBorrow();
    message.borrower = object.borrower ?? "";
    message.asset = object.asset !== undefined && object.asset !== null ? Coin.fromPartial(object.asset) : undefined;
    return message;
  },
  fromAmino(object: MsgBorrowAmino): MsgBorrow {
    const message = createBaseMsgBorrow();
    if (object.borrower !== undefined && object.borrower !== null) {
      message.borrower = object.borrower;
    }
    if (object.asset !== undefined && object.asset !== null) {
      message.asset = Coin.fromAmino(object.asset);
    }
    return message;
  },
  toAmino(message: MsgBorrow, useInterfaces: boolean = false): MsgBorrowAmino {
    const obj: any = {};
    obj.borrower = message.borrower === "" ? undefined : message.borrower;
    obj.asset = message.asset ? Coin.toAmino(message.asset, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgBorrowAminoMsg): MsgBorrow {
    return MsgBorrow.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgBorrowProtoMsg, useInterfaces: boolean = false): MsgBorrow {
    return MsgBorrow.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgBorrow): Uint8Array {
    return MsgBorrow.encode(message).finish();
  },
  toProtoMsg(message: MsgBorrow): MsgBorrowProtoMsg {
    return {
      typeUrl: "/umee.leverage.v1.MsgBorrow",
      value: MsgBorrow.encode(message).finish()
    };
  }
};
function createBaseMsgMaxBorrow(): MsgMaxBorrow {
  return {
    borrower: "",
    denom: ""
  };
}
export const MsgMaxBorrow = {
  typeUrl: "/umee.leverage.v1.MsgMaxBorrow",
  encode(message: MsgMaxBorrow, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.borrower !== "") {
      writer.uint32(10).string(message.borrower);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgMaxBorrow {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMaxBorrow();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.borrower = reader.string();
          break;
        case 2:
          message.denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgMaxBorrow>): MsgMaxBorrow {
    const message = createBaseMsgMaxBorrow();
    message.borrower = object.borrower ?? "";
    message.denom = object.denom ?? "";
    return message;
  },
  fromAmino(object: MsgMaxBorrowAmino): MsgMaxBorrow {
    const message = createBaseMsgMaxBorrow();
    if (object.borrower !== undefined && object.borrower !== null) {
      message.borrower = object.borrower;
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    return message;
  },
  toAmino(message: MsgMaxBorrow, useInterfaces: boolean = false): MsgMaxBorrowAmino {
    const obj: any = {};
    obj.borrower = message.borrower === "" ? undefined : message.borrower;
    obj.denom = message.denom === "" ? undefined : message.denom;
    return obj;
  },
  fromAminoMsg(object: MsgMaxBorrowAminoMsg): MsgMaxBorrow {
    return MsgMaxBorrow.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgMaxBorrowProtoMsg, useInterfaces: boolean = false): MsgMaxBorrow {
    return MsgMaxBorrow.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgMaxBorrow): Uint8Array {
    return MsgMaxBorrow.encode(message).finish();
  },
  toProtoMsg(message: MsgMaxBorrow): MsgMaxBorrowProtoMsg {
    return {
      typeUrl: "/umee.leverage.v1.MsgMaxBorrow",
      value: MsgMaxBorrow.encode(message).finish()
    };
  }
};
function createBaseMsgRepay(): MsgRepay {
  return {
    borrower: "",
    asset: Coin.fromPartial({})
  };
}
export const MsgRepay = {
  typeUrl: "/umee.leverage.v1.MsgRepay",
  encode(message: MsgRepay, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.borrower !== "") {
      writer.uint32(10).string(message.borrower);
    }
    if (message.asset !== undefined) {
      Coin.encode(message.asset, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRepay {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRepay();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.borrower = reader.string();
          break;
        case 2:
          message.asset = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgRepay>): MsgRepay {
    const message = createBaseMsgRepay();
    message.borrower = object.borrower ?? "";
    message.asset = object.asset !== undefined && object.asset !== null ? Coin.fromPartial(object.asset) : undefined;
    return message;
  },
  fromAmino(object: MsgRepayAmino): MsgRepay {
    const message = createBaseMsgRepay();
    if (object.borrower !== undefined && object.borrower !== null) {
      message.borrower = object.borrower;
    }
    if (object.asset !== undefined && object.asset !== null) {
      message.asset = Coin.fromAmino(object.asset);
    }
    return message;
  },
  toAmino(message: MsgRepay, useInterfaces: boolean = false): MsgRepayAmino {
    const obj: any = {};
    obj.borrower = message.borrower === "" ? undefined : message.borrower;
    obj.asset = message.asset ? Coin.toAmino(message.asset, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgRepayAminoMsg): MsgRepay {
    return MsgRepay.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRepayProtoMsg, useInterfaces: boolean = false): MsgRepay {
    return MsgRepay.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRepay): Uint8Array {
    return MsgRepay.encode(message).finish();
  },
  toProtoMsg(message: MsgRepay): MsgRepayProtoMsg {
    return {
      typeUrl: "/umee.leverage.v1.MsgRepay",
      value: MsgRepay.encode(message).finish()
    };
  }
};
function createBaseMsgLiquidate(): MsgLiquidate {
  return {
    liquidator: "",
    borrower: "",
    repayment: Coin.fromPartial({}),
    rewardDenom: ""
  };
}
export const MsgLiquidate = {
  typeUrl: "/umee.leverage.v1.MsgLiquidate",
  encode(message: MsgLiquidate, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.liquidator !== "") {
      writer.uint32(10).string(message.liquidator);
    }
    if (message.borrower !== "") {
      writer.uint32(18).string(message.borrower);
    }
    if (message.repayment !== undefined) {
      Coin.encode(message.repayment, writer.uint32(26).fork()).ldelim();
    }
    if (message.rewardDenom !== "") {
      writer.uint32(34).string(message.rewardDenom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgLiquidate {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgLiquidate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.liquidator = reader.string();
          break;
        case 2:
          message.borrower = reader.string();
          break;
        case 3:
          message.repayment = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 4:
          message.rewardDenom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgLiquidate>): MsgLiquidate {
    const message = createBaseMsgLiquidate();
    message.liquidator = object.liquidator ?? "";
    message.borrower = object.borrower ?? "";
    message.repayment = object.repayment !== undefined && object.repayment !== null ? Coin.fromPartial(object.repayment) : undefined;
    message.rewardDenom = object.rewardDenom ?? "";
    return message;
  },
  fromAmino(object: MsgLiquidateAmino): MsgLiquidate {
    const message = createBaseMsgLiquidate();
    if (object.liquidator !== undefined && object.liquidator !== null) {
      message.liquidator = object.liquidator;
    }
    if (object.borrower !== undefined && object.borrower !== null) {
      message.borrower = object.borrower;
    }
    if (object.repayment !== undefined && object.repayment !== null) {
      message.repayment = Coin.fromAmino(object.repayment);
    }
    if (object.reward_denom !== undefined && object.reward_denom !== null) {
      message.rewardDenom = object.reward_denom;
    }
    return message;
  },
  toAmino(message: MsgLiquidate, useInterfaces: boolean = false): MsgLiquidateAmino {
    const obj: any = {};
    obj.liquidator = message.liquidator === "" ? undefined : message.liquidator;
    obj.borrower = message.borrower === "" ? undefined : message.borrower;
    obj.repayment = message.repayment ? Coin.toAmino(message.repayment, useInterfaces) : undefined;
    obj.reward_denom = message.rewardDenom === "" ? undefined : message.rewardDenom;
    return obj;
  },
  fromAminoMsg(object: MsgLiquidateAminoMsg): MsgLiquidate {
    return MsgLiquidate.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgLiquidateProtoMsg, useInterfaces: boolean = false): MsgLiquidate {
    return MsgLiquidate.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgLiquidate): Uint8Array {
    return MsgLiquidate.encode(message).finish();
  },
  toProtoMsg(message: MsgLiquidate): MsgLiquidateProtoMsg {
    return {
      typeUrl: "/umee.leverage.v1.MsgLiquidate",
      value: MsgLiquidate.encode(message).finish()
    };
  }
};
function createBaseMsgLeveragedLiquidate(): MsgLeveragedLiquidate {
  return {
    liquidator: "",
    borrower: "",
    repayDenom: "",
    rewardDenom: "",
    maxRepay: ""
  };
}
export const MsgLeveragedLiquidate = {
  typeUrl: "/umee.leverage.v1.MsgLeveragedLiquidate",
  encode(message: MsgLeveragedLiquidate, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.liquidator !== "") {
      writer.uint32(10).string(message.liquidator);
    }
    if (message.borrower !== "") {
      writer.uint32(18).string(message.borrower);
    }
    if (message.repayDenom !== "") {
      writer.uint32(26).string(message.repayDenom);
    }
    if (message.rewardDenom !== "") {
      writer.uint32(34).string(message.rewardDenom);
    }
    if (message.maxRepay !== "") {
      writer.uint32(42).string(Decimal.fromUserInput(message.maxRepay, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgLeveragedLiquidate {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgLeveragedLiquidate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.liquidator = reader.string();
          break;
        case 2:
          message.borrower = reader.string();
          break;
        case 3:
          message.repayDenom = reader.string();
          break;
        case 4:
          message.rewardDenom = reader.string();
          break;
        case 5:
          message.maxRepay = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgLeveragedLiquidate>): MsgLeveragedLiquidate {
    const message = createBaseMsgLeveragedLiquidate();
    message.liquidator = object.liquidator ?? "";
    message.borrower = object.borrower ?? "";
    message.repayDenom = object.repayDenom ?? "";
    message.rewardDenom = object.rewardDenom ?? "";
    message.maxRepay = object.maxRepay ?? "";
    return message;
  },
  fromAmino(object: MsgLeveragedLiquidateAmino): MsgLeveragedLiquidate {
    const message = createBaseMsgLeveragedLiquidate();
    if (object.liquidator !== undefined && object.liquidator !== null) {
      message.liquidator = object.liquidator;
    }
    if (object.borrower !== undefined && object.borrower !== null) {
      message.borrower = object.borrower;
    }
    if (object.repay_denom !== undefined && object.repay_denom !== null) {
      message.repayDenom = object.repay_denom;
    }
    if (object.reward_denom !== undefined && object.reward_denom !== null) {
      message.rewardDenom = object.reward_denom;
    }
    if (object.max_repay !== undefined && object.max_repay !== null) {
      message.maxRepay = object.max_repay;
    }
    return message;
  },
  toAmino(message: MsgLeveragedLiquidate, useInterfaces: boolean = false): MsgLeveragedLiquidateAmino {
    const obj: any = {};
    obj.liquidator = message.liquidator === "" ? undefined : message.liquidator;
    obj.borrower = message.borrower === "" ? undefined : message.borrower;
    obj.repay_denom = message.repayDenom === "" ? undefined : message.repayDenom;
    obj.reward_denom = message.rewardDenom === "" ? undefined : message.rewardDenom;
    obj.max_repay = message.maxRepay === "" ? undefined : message.maxRepay;
    return obj;
  },
  fromAminoMsg(object: MsgLeveragedLiquidateAminoMsg): MsgLeveragedLiquidate {
    return MsgLeveragedLiquidate.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgLeveragedLiquidateProtoMsg, useInterfaces: boolean = false): MsgLeveragedLiquidate {
    return MsgLeveragedLiquidate.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgLeveragedLiquidate): Uint8Array {
    return MsgLeveragedLiquidate.encode(message).finish();
  },
  toProtoMsg(message: MsgLeveragedLiquidate): MsgLeveragedLiquidateProtoMsg {
    return {
      typeUrl: "/umee.leverage.v1.MsgLeveragedLiquidate",
      value: MsgLeveragedLiquidate.encode(message).finish()
    };
  }
};
function createBaseMsgSupplyCollateral(): MsgSupplyCollateral {
  return {
    supplier: "",
    asset: Coin.fromPartial({})
  };
}
export const MsgSupplyCollateral = {
  typeUrl: "/umee.leverage.v1.MsgSupplyCollateral",
  encode(message: MsgSupplyCollateral, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.supplier !== "") {
      writer.uint32(10).string(message.supplier);
    }
    if (message.asset !== undefined) {
      Coin.encode(message.asset, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSupplyCollateral {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSupplyCollateral();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.supplier = reader.string();
          break;
        case 2:
          message.asset = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSupplyCollateral>): MsgSupplyCollateral {
    const message = createBaseMsgSupplyCollateral();
    message.supplier = object.supplier ?? "";
    message.asset = object.asset !== undefined && object.asset !== null ? Coin.fromPartial(object.asset) : undefined;
    return message;
  },
  fromAmino(object: MsgSupplyCollateralAmino): MsgSupplyCollateral {
    const message = createBaseMsgSupplyCollateral();
    if (object.supplier !== undefined && object.supplier !== null) {
      message.supplier = object.supplier;
    }
    if (object.asset !== undefined && object.asset !== null) {
      message.asset = Coin.fromAmino(object.asset);
    }
    return message;
  },
  toAmino(message: MsgSupplyCollateral, useInterfaces: boolean = false): MsgSupplyCollateralAmino {
    const obj: any = {};
    obj.supplier = message.supplier === "" ? undefined : message.supplier;
    obj.asset = message.asset ? Coin.toAmino(message.asset, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgSupplyCollateralAminoMsg): MsgSupplyCollateral {
    return MsgSupplyCollateral.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSupplyCollateralProtoMsg, useInterfaces: boolean = false): MsgSupplyCollateral {
    return MsgSupplyCollateral.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSupplyCollateral): Uint8Array {
    return MsgSupplyCollateral.encode(message).finish();
  },
  toProtoMsg(message: MsgSupplyCollateral): MsgSupplyCollateralProtoMsg {
    return {
      typeUrl: "/umee.leverage.v1.MsgSupplyCollateral",
      value: MsgSupplyCollateral.encode(message).finish()
    };
  }
};
function createBaseMsgSupplyResponse(): MsgSupplyResponse {
  return {
    received: Coin.fromPartial({})
  };
}
export const MsgSupplyResponse = {
  typeUrl: "/umee.leverage.v1.MsgSupplyResponse",
  encode(message: MsgSupplyResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.received !== undefined) {
      Coin.encode(message.received, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSupplyResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSupplyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.received = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSupplyResponse>): MsgSupplyResponse {
    const message = createBaseMsgSupplyResponse();
    message.received = object.received !== undefined && object.received !== null ? Coin.fromPartial(object.received) : undefined;
    return message;
  },
  fromAmino(object: MsgSupplyResponseAmino): MsgSupplyResponse {
    const message = createBaseMsgSupplyResponse();
    if (object.received !== undefined && object.received !== null) {
      message.received = Coin.fromAmino(object.received);
    }
    return message;
  },
  toAmino(message: MsgSupplyResponse, useInterfaces: boolean = false): MsgSupplyResponseAmino {
    const obj: any = {};
    obj.received = message.received ? Coin.toAmino(message.received, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgSupplyResponseAminoMsg): MsgSupplyResponse {
    return MsgSupplyResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSupplyResponseProtoMsg, useInterfaces: boolean = false): MsgSupplyResponse {
    return MsgSupplyResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSupplyResponse): Uint8Array {
    return MsgSupplyResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSupplyResponse): MsgSupplyResponseProtoMsg {
    return {
      typeUrl: "/umee.leverage.v1.MsgSupplyResponse",
      value: MsgSupplyResponse.encode(message).finish()
    };
  }
};
function createBaseMsgWithdrawResponse(): MsgWithdrawResponse {
  return {
    received: Coin.fromPartial({})
  };
}
export const MsgWithdrawResponse = {
  typeUrl: "/umee.leverage.v1.MsgWithdrawResponse",
  encode(message: MsgWithdrawResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.received !== undefined) {
      Coin.encode(message.received, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgWithdrawResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdrawResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.received = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgWithdrawResponse>): MsgWithdrawResponse {
    const message = createBaseMsgWithdrawResponse();
    message.received = object.received !== undefined && object.received !== null ? Coin.fromPartial(object.received) : undefined;
    return message;
  },
  fromAmino(object: MsgWithdrawResponseAmino): MsgWithdrawResponse {
    const message = createBaseMsgWithdrawResponse();
    if (object.received !== undefined && object.received !== null) {
      message.received = Coin.fromAmino(object.received);
    }
    return message;
  },
  toAmino(message: MsgWithdrawResponse, useInterfaces: boolean = false): MsgWithdrawResponseAmino {
    const obj: any = {};
    obj.received = message.received ? Coin.toAmino(message.received, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgWithdrawResponseAminoMsg): MsgWithdrawResponse {
    return MsgWithdrawResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgWithdrawResponseProtoMsg, useInterfaces: boolean = false): MsgWithdrawResponse {
    return MsgWithdrawResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgWithdrawResponse): Uint8Array {
    return MsgWithdrawResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgWithdrawResponse): MsgWithdrawResponseProtoMsg {
    return {
      typeUrl: "/umee.leverage.v1.MsgWithdrawResponse",
      value: MsgWithdrawResponse.encode(message).finish()
    };
  }
};
function createBaseMsgMaxWithdrawResponse(): MsgMaxWithdrawResponse {
  return {
    withdrawn: Coin.fromPartial({}),
    received: Coin.fromPartial({})
  };
}
export const MsgMaxWithdrawResponse = {
  typeUrl: "/umee.leverage.v1.MsgMaxWithdrawResponse",
  encode(message: MsgMaxWithdrawResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.withdrawn !== undefined) {
      Coin.encode(message.withdrawn, writer.uint32(10).fork()).ldelim();
    }
    if (message.received !== undefined) {
      Coin.encode(message.received, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgMaxWithdrawResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMaxWithdrawResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.withdrawn = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.received = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgMaxWithdrawResponse>): MsgMaxWithdrawResponse {
    const message = createBaseMsgMaxWithdrawResponse();
    message.withdrawn = object.withdrawn !== undefined && object.withdrawn !== null ? Coin.fromPartial(object.withdrawn) : undefined;
    message.received = object.received !== undefined && object.received !== null ? Coin.fromPartial(object.received) : undefined;
    return message;
  },
  fromAmino(object: MsgMaxWithdrawResponseAmino): MsgMaxWithdrawResponse {
    const message = createBaseMsgMaxWithdrawResponse();
    if (object.withdrawn !== undefined && object.withdrawn !== null) {
      message.withdrawn = Coin.fromAmino(object.withdrawn);
    }
    if (object.received !== undefined && object.received !== null) {
      message.received = Coin.fromAmino(object.received);
    }
    return message;
  },
  toAmino(message: MsgMaxWithdrawResponse, useInterfaces: boolean = false): MsgMaxWithdrawResponseAmino {
    const obj: any = {};
    obj.withdrawn = message.withdrawn ? Coin.toAmino(message.withdrawn, useInterfaces) : undefined;
    obj.received = message.received ? Coin.toAmino(message.received, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgMaxWithdrawResponseAminoMsg): MsgMaxWithdrawResponse {
    return MsgMaxWithdrawResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgMaxWithdrawResponseProtoMsg, useInterfaces: boolean = false): MsgMaxWithdrawResponse {
    return MsgMaxWithdrawResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgMaxWithdrawResponse): Uint8Array {
    return MsgMaxWithdrawResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgMaxWithdrawResponse): MsgMaxWithdrawResponseProtoMsg {
    return {
      typeUrl: "/umee.leverage.v1.MsgMaxWithdrawResponse",
      value: MsgMaxWithdrawResponse.encode(message).finish()
    };
  }
};
function createBaseMsgCollateralizeResponse(): MsgCollateralizeResponse {
  return {};
}
export const MsgCollateralizeResponse = {
  typeUrl: "/umee.leverage.v1.MsgCollateralizeResponse",
  encode(_: MsgCollateralizeResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgCollateralizeResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCollateralizeResponse();
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
  fromPartial(_: Partial<MsgCollateralizeResponse>): MsgCollateralizeResponse {
    const message = createBaseMsgCollateralizeResponse();
    return message;
  },
  fromAmino(_: MsgCollateralizeResponseAmino): MsgCollateralizeResponse {
    const message = createBaseMsgCollateralizeResponse();
    return message;
  },
  toAmino(_: MsgCollateralizeResponse, useInterfaces: boolean = false): MsgCollateralizeResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgCollateralizeResponseAminoMsg): MsgCollateralizeResponse {
    return MsgCollateralizeResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgCollateralizeResponseProtoMsg, useInterfaces: boolean = false): MsgCollateralizeResponse {
    return MsgCollateralizeResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgCollateralizeResponse): Uint8Array {
    return MsgCollateralizeResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgCollateralizeResponse): MsgCollateralizeResponseProtoMsg {
    return {
      typeUrl: "/umee.leverage.v1.MsgCollateralizeResponse",
      value: MsgCollateralizeResponse.encode(message).finish()
    };
  }
};
function createBaseMsgDecollateralizeResponse(): MsgDecollateralizeResponse {
  return {};
}
export const MsgDecollateralizeResponse = {
  typeUrl: "/umee.leverage.v1.MsgDecollateralizeResponse",
  encode(_: MsgDecollateralizeResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgDecollateralizeResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDecollateralizeResponse();
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
  fromPartial(_: Partial<MsgDecollateralizeResponse>): MsgDecollateralizeResponse {
    const message = createBaseMsgDecollateralizeResponse();
    return message;
  },
  fromAmino(_: MsgDecollateralizeResponseAmino): MsgDecollateralizeResponse {
    const message = createBaseMsgDecollateralizeResponse();
    return message;
  },
  toAmino(_: MsgDecollateralizeResponse, useInterfaces: boolean = false): MsgDecollateralizeResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgDecollateralizeResponseAminoMsg): MsgDecollateralizeResponse {
    return MsgDecollateralizeResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgDecollateralizeResponseProtoMsg, useInterfaces: boolean = false): MsgDecollateralizeResponse {
    return MsgDecollateralizeResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgDecollateralizeResponse): Uint8Array {
    return MsgDecollateralizeResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgDecollateralizeResponse): MsgDecollateralizeResponseProtoMsg {
    return {
      typeUrl: "/umee.leverage.v1.MsgDecollateralizeResponse",
      value: MsgDecollateralizeResponse.encode(message).finish()
    };
  }
};
function createBaseMsgBorrowResponse(): MsgBorrowResponse {
  return {};
}
export const MsgBorrowResponse = {
  typeUrl: "/umee.leverage.v1.MsgBorrowResponse",
  encode(_: MsgBorrowResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgBorrowResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBorrowResponse();
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
  fromPartial(_: Partial<MsgBorrowResponse>): MsgBorrowResponse {
    const message = createBaseMsgBorrowResponse();
    return message;
  },
  fromAmino(_: MsgBorrowResponseAmino): MsgBorrowResponse {
    const message = createBaseMsgBorrowResponse();
    return message;
  },
  toAmino(_: MsgBorrowResponse, useInterfaces: boolean = false): MsgBorrowResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgBorrowResponseAminoMsg): MsgBorrowResponse {
    return MsgBorrowResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgBorrowResponseProtoMsg, useInterfaces: boolean = false): MsgBorrowResponse {
    return MsgBorrowResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgBorrowResponse): Uint8Array {
    return MsgBorrowResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgBorrowResponse): MsgBorrowResponseProtoMsg {
    return {
      typeUrl: "/umee.leverage.v1.MsgBorrowResponse",
      value: MsgBorrowResponse.encode(message).finish()
    };
  }
};
function createBaseMsgMaxBorrowResponse(): MsgMaxBorrowResponse {
  return {
    borrowed: Coin.fromPartial({})
  };
}
export const MsgMaxBorrowResponse = {
  typeUrl: "/umee.leverage.v1.MsgMaxBorrowResponse",
  encode(message: MsgMaxBorrowResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.borrowed !== undefined) {
      Coin.encode(message.borrowed, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgMaxBorrowResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMaxBorrowResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.borrowed = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgMaxBorrowResponse>): MsgMaxBorrowResponse {
    const message = createBaseMsgMaxBorrowResponse();
    message.borrowed = object.borrowed !== undefined && object.borrowed !== null ? Coin.fromPartial(object.borrowed) : undefined;
    return message;
  },
  fromAmino(object: MsgMaxBorrowResponseAmino): MsgMaxBorrowResponse {
    const message = createBaseMsgMaxBorrowResponse();
    if (object.borrowed !== undefined && object.borrowed !== null) {
      message.borrowed = Coin.fromAmino(object.borrowed);
    }
    return message;
  },
  toAmino(message: MsgMaxBorrowResponse, useInterfaces: boolean = false): MsgMaxBorrowResponseAmino {
    const obj: any = {};
    obj.borrowed = message.borrowed ? Coin.toAmino(message.borrowed, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgMaxBorrowResponseAminoMsg): MsgMaxBorrowResponse {
    return MsgMaxBorrowResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgMaxBorrowResponseProtoMsg, useInterfaces: boolean = false): MsgMaxBorrowResponse {
    return MsgMaxBorrowResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgMaxBorrowResponse): Uint8Array {
    return MsgMaxBorrowResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgMaxBorrowResponse): MsgMaxBorrowResponseProtoMsg {
    return {
      typeUrl: "/umee.leverage.v1.MsgMaxBorrowResponse",
      value: MsgMaxBorrowResponse.encode(message).finish()
    };
  }
};
function createBaseMsgRepayResponse(): MsgRepayResponse {
  return {
    repaid: Coin.fromPartial({})
  };
}
export const MsgRepayResponse = {
  typeUrl: "/umee.leverage.v1.MsgRepayResponse",
  encode(message: MsgRepayResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.repaid !== undefined) {
      Coin.encode(message.repaid, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRepayResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRepayResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.repaid = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgRepayResponse>): MsgRepayResponse {
    const message = createBaseMsgRepayResponse();
    message.repaid = object.repaid !== undefined && object.repaid !== null ? Coin.fromPartial(object.repaid) : undefined;
    return message;
  },
  fromAmino(object: MsgRepayResponseAmino): MsgRepayResponse {
    const message = createBaseMsgRepayResponse();
    if (object.repaid !== undefined && object.repaid !== null) {
      message.repaid = Coin.fromAmino(object.repaid);
    }
    return message;
  },
  toAmino(message: MsgRepayResponse, useInterfaces: boolean = false): MsgRepayResponseAmino {
    const obj: any = {};
    obj.repaid = message.repaid ? Coin.toAmino(message.repaid, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgRepayResponseAminoMsg): MsgRepayResponse {
    return MsgRepayResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRepayResponseProtoMsg, useInterfaces: boolean = false): MsgRepayResponse {
    return MsgRepayResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRepayResponse): Uint8Array {
    return MsgRepayResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgRepayResponse): MsgRepayResponseProtoMsg {
    return {
      typeUrl: "/umee.leverage.v1.MsgRepayResponse",
      value: MsgRepayResponse.encode(message).finish()
    };
  }
};
function createBaseMsgLiquidateResponse(): MsgLiquidateResponse {
  return {
    repaid: Coin.fromPartial({}),
    collateral: Coin.fromPartial({}),
    reward: Coin.fromPartial({})
  };
}
export const MsgLiquidateResponse = {
  typeUrl: "/umee.leverage.v1.MsgLiquidateResponse",
  encode(message: MsgLiquidateResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.repaid !== undefined) {
      Coin.encode(message.repaid, writer.uint32(10).fork()).ldelim();
    }
    if (message.collateral !== undefined) {
      Coin.encode(message.collateral, writer.uint32(18).fork()).ldelim();
    }
    if (message.reward !== undefined) {
      Coin.encode(message.reward, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgLiquidateResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgLiquidateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.repaid = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.collateral = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.reward = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgLiquidateResponse>): MsgLiquidateResponse {
    const message = createBaseMsgLiquidateResponse();
    message.repaid = object.repaid !== undefined && object.repaid !== null ? Coin.fromPartial(object.repaid) : undefined;
    message.collateral = object.collateral !== undefined && object.collateral !== null ? Coin.fromPartial(object.collateral) : undefined;
    message.reward = object.reward !== undefined && object.reward !== null ? Coin.fromPartial(object.reward) : undefined;
    return message;
  },
  fromAmino(object: MsgLiquidateResponseAmino): MsgLiquidateResponse {
    const message = createBaseMsgLiquidateResponse();
    if (object.repaid !== undefined && object.repaid !== null) {
      message.repaid = Coin.fromAmino(object.repaid);
    }
    if (object.collateral !== undefined && object.collateral !== null) {
      message.collateral = Coin.fromAmino(object.collateral);
    }
    if (object.reward !== undefined && object.reward !== null) {
      message.reward = Coin.fromAmino(object.reward);
    }
    return message;
  },
  toAmino(message: MsgLiquidateResponse, useInterfaces: boolean = false): MsgLiquidateResponseAmino {
    const obj: any = {};
    obj.repaid = message.repaid ? Coin.toAmino(message.repaid, useInterfaces) : undefined;
    obj.collateral = message.collateral ? Coin.toAmino(message.collateral, useInterfaces) : undefined;
    obj.reward = message.reward ? Coin.toAmino(message.reward, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgLiquidateResponseAminoMsg): MsgLiquidateResponse {
    return MsgLiquidateResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgLiquidateResponseProtoMsg, useInterfaces: boolean = false): MsgLiquidateResponse {
    return MsgLiquidateResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgLiquidateResponse): Uint8Array {
    return MsgLiquidateResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgLiquidateResponse): MsgLiquidateResponseProtoMsg {
    return {
      typeUrl: "/umee.leverage.v1.MsgLiquidateResponse",
      value: MsgLiquidateResponse.encode(message).finish()
    };
  }
};
function createBaseMsgLeveragedLiquidateResponse(): MsgLeveragedLiquidateResponse {
  return {
    repaid: Coin.fromPartial({}),
    reward: Coin.fromPartial({})
  };
}
export const MsgLeveragedLiquidateResponse = {
  typeUrl: "/umee.leverage.v1.MsgLeveragedLiquidateResponse",
  encode(message: MsgLeveragedLiquidateResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.repaid !== undefined) {
      Coin.encode(message.repaid, writer.uint32(10).fork()).ldelim();
    }
    if (message.reward !== undefined) {
      Coin.encode(message.reward, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgLeveragedLiquidateResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgLeveragedLiquidateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.repaid = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.reward = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgLeveragedLiquidateResponse>): MsgLeveragedLiquidateResponse {
    const message = createBaseMsgLeveragedLiquidateResponse();
    message.repaid = object.repaid !== undefined && object.repaid !== null ? Coin.fromPartial(object.repaid) : undefined;
    message.reward = object.reward !== undefined && object.reward !== null ? Coin.fromPartial(object.reward) : undefined;
    return message;
  },
  fromAmino(object: MsgLeveragedLiquidateResponseAmino): MsgLeveragedLiquidateResponse {
    const message = createBaseMsgLeveragedLiquidateResponse();
    if (object.repaid !== undefined && object.repaid !== null) {
      message.repaid = Coin.fromAmino(object.repaid);
    }
    if (object.reward !== undefined && object.reward !== null) {
      message.reward = Coin.fromAmino(object.reward);
    }
    return message;
  },
  toAmino(message: MsgLeveragedLiquidateResponse, useInterfaces: boolean = false): MsgLeveragedLiquidateResponseAmino {
    const obj: any = {};
    obj.repaid = message.repaid ? Coin.toAmino(message.repaid, useInterfaces) : undefined;
    obj.reward = message.reward ? Coin.toAmino(message.reward, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgLeveragedLiquidateResponseAminoMsg): MsgLeveragedLiquidateResponse {
    return MsgLeveragedLiquidateResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgLeveragedLiquidateResponseProtoMsg, useInterfaces: boolean = false): MsgLeveragedLiquidateResponse {
    return MsgLeveragedLiquidateResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgLeveragedLiquidateResponse): Uint8Array {
    return MsgLeveragedLiquidateResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgLeveragedLiquidateResponse): MsgLeveragedLiquidateResponseProtoMsg {
    return {
      typeUrl: "/umee.leverage.v1.MsgLeveragedLiquidateResponse",
      value: MsgLeveragedLiquidateResponse.encode(message).finish()
    };
  }
};
function createBaseMsgSupplyCollateralResponse(): MsgSupplyCollateralResponse {
  return {
    collateralized: Coin.fromPartial({})
  };
}
export const MsgSupplyCollateralResponse = {
  typeUrl: "/umee.leverage.v1.MsgSupplyCollateralResponse",
  encode(message: MsgSupplyCollateralResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.collateralized !== undefined) {
      Coin.encode(message.collateralized, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSupplyCollateralResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSupplyCollateralResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.collateralized = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSupplyCollateralResponse>): MsgSupplyCollateralResponse {
    const message = createBaseMsgSupplyCollateralResponse();
    message.collateralized = object.collateralized !== undefined && object.collateralized !== null ? Coin.fromPartial(object.collateralized) : undefined;
    return message;
  },
  fromAmino(object: MsgSupplyCollateralResponseAmino): MsgSupplyCollateralResponse {
    const message = createBaseMsgSupplyCollateralResponse();
    if (object.collateralized !== undefined && object.collateralized !== null) {
      message.collateralized = Coin.fromAmino(object.collateralized);
    }
    return message;
  },
  toAmino(message: MsgSupplyCollateralResponse, useInterfaces: boolean = false): MsgSupplyCollateralResponseAmino {
    const obj: any = {};
    obj.collateralized = message.collateralized ? Coin.toAmino(message.collateralized, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgSupplyCollateralResponseAminoMsg): MsgSupplyCollateralResponse {
    return MsgSupplyCollateralResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSupplyCollateralResponseProtoMsg, useInterfaces: boolean = false): MsgSupplyCollateralResponse {
    return MsgSupplyCollateralResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSupplyCollateralResponse): Uint8Array {
    return MsgSupplyCollateralResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSupplyCollateralResponse): MsgSupplyCollateralResponseProtoMsg {
    return {
      typeUrl: "/umee.leverage.v1.MsgSupplyCollateralResponse",
      value: MsgSupplyCollateralResponse.encode(message).finish()
    };
  }
};
function createBaseMsgGovUpdateRegistry(): MsgGovUpdateRegistry {
  return {
    authority: "",
    description: "",
    addTokens: [],
    updateTokens: []
  };
}
export const MsgGovUpdateRegistry = {
  typeUrl: "/umee.leverage.v1.MsgGovUpdateRegistry",
  encode(message: MsgGovUpdateRegistry, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    for (const v of message.addTokens) {
      Token.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.updateTokens) {
      Token.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgGovUpdateRegistry {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgGovUpdateRegistry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 3:
          message.description = reader.string();
          break;
        case 4:
          message.addTokens.push(Token.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 5:
          message.updateTokens.push(Token.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgGovUpdateRegistry>): MsgGovUpdateRegistry {
    const message = createBaseMsgGovUpdateRegistry();
    message.authority = object.authority ?? "";
    message.description = object.description ?? "";
    message.addTokens = object.addTokens?.map(e => Token.fromPartial(e)) || [];
    message.updateTokens = object.updateTokens?.map(e => Token.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: MsgGovUpdateRegistryAmino): MsgGovUpdateRegistry {
    const message = createBaseMsgGovUpdateRegistry();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    }
    message.addTokens = object.add_tokens?.map(e => Token.fromAmino(e)) || [];
    message.updateTokens = object.update_tokens?.map(e => Token.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: MsgGovUpdateRegistry, useInterfaces: boolean = false): MsgGovUpdateRegistryAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.description = message.description === "" ? undefined : message.description;
    if (message.addTokens) {
      obj.add_tokens = message.addTokens.map(e => e ? Token.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.add_tokens = message.addTokens;
    }
    if (message.updateTokens) {
      obj.update_tokens = message.updateTokens.map(e => e ? Token.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.update_tokens = message.updateTokens;
    }
    return obj;
  },
  fromAminoMsg(object: MsgGovUpdateRegistryAminoMsg): MsgGovUpdateRegistry {
    return MsgGovUpdateRegistry.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgGovUpdateRegistryProtoMsg, useInterfaces: boolean = false): MsgGovUpdateRegistry {
    return MsgGovUpdateRegistry.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgGovUpdateRegistry): Uint8Array {
    return MsgGovUpdateRegistry.encode(message).finish();
  },
  toProtoMsg(message: MsgGovUpdateRegistry): MsgGovUpdateRegistryProtoMsg {
    return {
      typeUrl: "/umee.leverage.v1.MsgGovUpdateRegistry",
      value: MsgGovUpdateRegistry.encode(message).finish()
    };
  }
};
function createBaseMsgGovUpdateRegistryResponse(): MsgGovUpdateRegistryResponse {
  return {};
}
export const MsgGovUpdateRegistryResponse = {
  typeUrl: "/umee.leverage.v1.MsgGovUpdateRegistryResponse",
  encode(_: MsgGovUpdateRegistryResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgGovUpdateRegistryResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgGovUpdateRegistryResponse();
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
  fromPartial(_: Partial<MsgGovUpdateRegistryResponse>): MsgGovUpdateRegistryResponse {
    const message = createBaseMsgGovUpdateRegistryResponse();
    return message;
  },
  fromAmino(_: MsgGovUpdateRegistryResponseAmino): MsgGovUpdateRegistryResponse {
    const message = createBaseMsgGovUpdateRegistryResponse();
    return message;
  },
  toAmino(_: MsgGovUpdateRegistryResponse, useInterfaces: boolean = false): MsgGovUpdateRegistryResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgGovUpdateRegistryResponseAminoMsg): MsgGovUpdateRegistryResponse {
    return MsgGovUpdateRegistryResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgGovUpdateRegistryResponseProtoMsg, useInterfaces: boolean = false): MsgGovUpdateRegistryResponse {
    return MsgGovUpdateRegistryResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgGovUpdateRegistryResponse): Uint8Array {
    return MsgGovUpdateRegistryResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgGovUpdateRegistryResponse): MsgGovUpdateRegistryResponseProtoMsg {
    return {
      typeUrl: "/umee.leverage.v1.MsgGovUpdateRegistryResponse",
      value: MsgGovUpdateRegistryResponse.encode(message).finish()
    };
  }
};
function createBaseMsgGovUpdateSpecialAssets(): MsgGovUpdateSpecialAssets {
  return {
    authority: "",
    description: "",
    sets: [],
    pairs: []
  };
}
export const MsgGovUpdateSpecialAssets = {
  typeUrl: "/umee.leverage.v1.MsgGovUpdateSpecialAssets",
  encode(message: MsgGovUpdateSpecialAssets, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    for (const v of message.sets) {
      SpecialAssetSet.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.pairs) {
      SpecialAssetPair.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgGovUpdateSpecialAssets {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgGovUpdateSpecialAssets();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.sets.push(SpecialAssetSet.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 4:
          message.pairs.push(SpecialAssetPair.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgGovUpdateSpecialAssets>): MsgGovUpdateSpecialAssets {
    const message = createBaseMsgGovUpdateSpecialAssets();
    message.authority = object.authority ?? "";
    message.description = object.description ?? "";
    message.sets = object.sets?.map(e => SpecialAssetSet.fromPartial(e)) || [];
    message.pairs = object.pairs?.map(e => SpecialAssetPair.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: MsgGovUpdateSpecialAssetsAmino): MsgGovUpdateSpecialAssets {
    const message = createBaseMsgGovUpdateSpecialAssets();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    }
    message.sets = object.sets?.map(e => SpecialAssetSet.fromAmino(e)) || [];
    message.pairs = object.pairs?.map(e => SpecialAssetPair.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: MsgGovUpdateSpecialAssets, useInterfaces: boolean = false): MsgGovUpdateSpecialAssetsAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.description = message.description === "" ? undefined : message.description;
    if (message.sets) {
      obj.sets = message.sets.map(e => e ? SpecialAssetSet.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.sets = message.sets;
    }
    if (message.pairs) {
      obj.pairs = message.pairs.map(e => e ? SpecialAssetPair.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.pairs = message.pairs;
    }
    return obj;
  },
  fromAminoMsg(object: MsgGovUpdateSpecialAssetsAminoMsg): MsgGovUpdateSpecialAssets {
    return MsgGovUpdateSpecialAssets.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgGovUpdateSpecialAssetsProtoMsg, useInterfaces: boolean = false): MsgGovUpdateSpecialAssets {
    return MsgGovUpdateSpecialAssets.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgGovUpdateSpecialAssets): Uint8Array {
    return MsgGovUpdateSpecialAssets.encode(message).finish();
  },
  toProtoMsg(message: MsgGovUpdateSpecialAssets): MsgGovUpdateSpecialAssetsProtoMsg {
    return {
      typeUrl: "/umee.leverage.v1.MsgGovUpdateSpecialAssets",
      value: MsgGovUpdateSpecialAssets.encode(message).finish()
    };
  }
};
function createBaseMsgGovUpdateSpecialAssetsResponse(): MsgGovUpdateSpecialAssetsResponse {
  return {};
}
export const MsgGovUpdateSpecialAssetsResponse = {
  typeUrl: "/umee.leverage.v1.MsgGovUpdateSpecialAssetsResponse",
  encode(_: MsgGovUpdateSpecialAssetsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgGovUpdateSpecialAssetsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgGovUpdateSpecialAssetsResponse();
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
  fromPartial(_: Partial<MsgGovUpdateSpecialAssetsResponse>): MsgGovUpdateSpecialAssetsResponse {
    const message = createBaseMsgGovUpdateSpecialAssetsResponse();
    return message;
  },
  fromAmino(_: MsgGovUpdateSpecialAssetsResponseAmino): MsgGovUpdateSpecialAssetsResponse {
    const message = createBaseMsgGovUpdateSpecialAssetsResponse();
    return message;
  },
  toAmino(_: MsgGovUpdateSpecialAssetsResponse, useInterfaces: boolean = false): MsgGovUpdateSpecialAssetsResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgGovUpdateSpecialAssetsResponseAminoMsg): MsgGovUpdateSpecialAssetsResponse {
    return MsgGovUpdateSpecialAssetsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgGovUpdateSpecialAssetsResponseProtoMsg, useInterfaces: boolean = false): MsgGovUpdateSpecialAssetsResponse {
    return MsgGovUpdateSpecialAssetsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgGovUpdateSpecialAssetsResponse): Uint8Array {
    return MsgGovUpdateSpecialAssetsResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgGovUpdateSpecialAssetsResponse): MsgGovUpdateSpecialAssetsResponseProtoMsg {
    return {
      typeUrl: "/umee.leverage.v1.MsgGovUpdateSpecialAssetsResponse",
      value: MsgGovUpdateSpecialAssetsResponse.encode(message).finish()
    };
  }
};
function createBaseMsgGovSetParams(): MsgGovSetParams {
  return {
    authority: "",
    params: Params.fromPartial({})
  };
}
export const MsgGovSetParams = {
  typeUrl: "/umee.leverage.v1.MsgGovSetParams",
  encode(message: MsgGovSetParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgGovSetParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgGovSetParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.params = Params.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgGovSetParams>): MsgGovSetParams {
    const message = createBaseMsgGovSetParams();
    message.authority = object.authority ?? "";
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: MsgGovSetParamsAmino): MsgGovSetParams {
    const message = createBaseMsgGovSetParams();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: MsgGovSetParams, useInterfaces: boolean = false): MsgGovSetParamsAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgGovSetParamsAminoMsg): MsgGovSetParams {
    return MsgGovSetParams.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgGovSetParamsProtoMsg, useInterfaces: boolean = false): MsgGovSetParams {
    return MsgGovSetParams.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgGovSetParams): Uint8Array {
    return MsgGovSetParams.encode(message).finish();
  },
  toProtoMsg(message: MsgGovSetParams): MsgGovSetParamsProtoMsg {
    return {
      typeUrl: "/umee.leverage.v1.MsgGovSetParams",
      value: MsgGovSetParams.encode(message).finish()
    };
  }
};
function createBaseMsgGovSetParamsResponse(): MsgGovSetParamsResponse {
  return {};
}
export const MsgGovSetParamsResponse = {
  typeUrl: "/umee.leverage.v1.MsgGovSetParamsResponse",
  encode(_: MsgGovSetParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgGovSetParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgGovSetParamsResponse();
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
  fromPartial(_: Partial<MsgGovSetParamsResponse>): MsgGovSetParamsResponse {
    const message = createBaseMsgGovSetParamsResponse();
    return message;
  },
  fromAmino(_: MsgGovSetParamsResponseAmino): MsgGovSetParamsResponse {
    const message = createBaseMsgGovSetParamsResponse();
    return message;
  },
  toAmino(_: MsgGovSetParamsResponse, useInterfaces: boolean = false): MsgGovSetParamsResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgGovSetParamsResponseAminoMsg): MsgGovSetParamsResponse {
    return MsgGovSetParamsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgGovSetParamsResponseProtoMsg, useInterfaces: boolean = false): MsgGovSetParamsResponse {
    return MsgGovSetParamsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgGovSetParamsResponse): Uint8Array {
    return MsgGovSetParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgGovSetParamsResponse): MsgGovSetParamsResponseProtoMsg {
    return {
      typeUrl: "/umee.leverage.v1.MsgGovSetParamsResponse",
      value: MsgGovSetParamsResponse.encode(message).finish()
    };
  }
};