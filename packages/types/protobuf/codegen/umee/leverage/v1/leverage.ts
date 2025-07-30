import { BinaryReader, BinaryWriter } from "../../../binary";
import { Decimal } from "@cosmjs/math";
/** Params defines the parameters for the leverage module. */
export interface Params {
  /**
   * Complete Liquidation Threshold determines how far between
   * liquidation_threshold (LT) and collateral_value (CV) a borrower's
   * borrowed value must have progressed in order to allow a full liquidation.
   * 0.3 indicates 30% of the way from LT to CV.
   * See also `minimum_close_factor` for more information.
   * Valid values: 0-1.
   */
  completeLiquidationThreshold: string;
  /**
   * Close Factor determines the portion of a borrower's position that can be
   * liquidated in a single event. Minimum Close Factor is Close Factor at
   * liquidation_threshold. 0.1 means that that 10% of the borrower position can
   * be liquidated when the borrowed value passes the liquidation_threshold.
   * close_factor scales linearly between minimum_close_factor and 1.0,
   * reaching its maximum when borrowed value passes
   * complete_liquidation_threshold. We can put it into the picture:
   * 
   *             borrowed          CV := collateral
   *             value                   value
   *  --- | ------- | ----- | -------- | ------->
   *     LV                 CL
   * 
   * LV = liquidation value = liquidation_threshold * CV
   * CL = LV + (CV-LV) * complete_liquidation_threshold
   *    is the borrowed value above which close factor will be 1.
   * 
   * Valid values: 0-1.
   */
  minimumCloseFactor: string;
  /**
   * Oracle Reward Factor determines the portion of interest accrued on
   * borrows that is sent to the oracle module to fund its reward pool.
   * Valid values: 0-1.
   */
  oracleRewardFactor: string;
  /**
   * Small Liquidation Size determines the USD value at which a borrow is
   * considered small enough to be liquidated in a single transaction, bypassing
   * dynamic close factor.
   */
  smallLiquidationSize: string;
  /**
   * Direct Liquidation Fee is a reduction factor in liquidation incentive
   * experienced by liquidators who choose to receive base assets instead of
   * uTokens as liquidation rewards.
   * Valid values: 0-1.
   */
  directLiquidationFee: string;
  /**
   * Rewards Auction Fee determines the interest increase that will be accrued on
   * borrows that is sent to the auction module for the rewards auction.
   * So, 2% means, that there is additional 2% per year fee collected.
   * Valid values: 0-1.
   */
  rewardsAuctionFee: string;
}
export interface ParamsProtoMsg {
  typeUrl: "/umee.leverage.v1.Params";
  value: Uint8Array;
}
/** Params defines the parameters for the leverage module. */
export interface ParamsAmino {
  /**
   * Complete Liquidation Threshold determines how far between
   * liquidation_threshold (LT) and collateral_value (CV) a borrower's
   * borrowed value must have progressed in order to allow a full liquidation.
   * 0.3 indicates 30% of the way from LT to CV.
   * See also `minimum_close_factor` for more information.
   * Valid values: 0-1.
   */
  complete_liquidation_threshold?: string;
  /**
   * Close Factor determines the portion of a borrower's position that can be
   * liquidated in a single event. Minimum Close Factor is Close Factor at
   * liquidation_threshold. 0.1 means that that 10% of the borrower position can
   * be liquidated when the borrowed value passes the liquidation_threshold.
   * close_factor scales linearly between minimum_close_factor and 1.0,
   * reaching its maximum when borrowed value passes
   * complete_liquidation_threshold. We can put it into the picture:
   * 
   *             borrowed          CV := collateral
   *             value                   value
   *  --- | ------- | ----- | -------- | ------->
   *     LV                 CL
   * 
   * LV = liquidation value = liquidation_threshold * CV
   * CL = LV + (CV-LV) * complete_liquidation_threshold
   *    is the borrowed value above which close factor will be 1.
   * 
   * Valid values: 0-1.
   */
  minimum_close_factor?: string;
  /**
   * Oracle Reward Factor determines the portion of interest accrued on
   * borrows that is sent to the oracle module to fund its reward pool.
   * Valid values: 0-1.
   */
  oracle_reward_factor?: string;
  /**
   * Small Liquidation Size determines the USD value at which a borrow is
   * considered small enough to be liquidated in a single transaction, bypassing
   * dynamic close factor.
   */
  small_liquidation_size?: string;
  /**
   * Direct Liquidation Fee is a reduction factor in liquidation incentive
   * experienced by liquidators who choose to receive base assets instead of
   * uTokens as liquidation rewards.
   * Valid values: 0-1.
   */
  direct_liquidation_fee?: string;
  /**
   * Rewards Auction Fee determines the interest increase that will be accrued on
   * borrows that is sent to the auction module for the rewards auction.
   * So, 2% means, that there is additional 2% per year fee collected.
   * Valid values: 0-1.
   */
  rewards_auction_fee?: string;
}
export interface ParamsAminoMsg {
  type: "/umee.leverage.v1.Params";
  value: ParamsAmino;
}
/** Params defines the parameters for the leverage module. */
export interface ParamsSDKType {
  complete_liquidation_threshold: string;
  minimum_close_factor: string;
  oracle_reward_factor: string;
  small_liquidation_size: string;
  direct_liquidation_fee: string;
  rewards_auction_fee: string;
}
/**
 * Token defines a token, along with its metadata and parameters, in the Umee
 * capital facility that can be supplied and borrowed.
 * See https://github.com/umee-network/umee/blob/main/docs/design_docs/010-market-params.md
 * for more details.
 */
export interface Token {
  /**
   * Base Denom is the denomination of the underlying base token. Must be the base
   * denom as registered in the Bank module (so IBC denom for IBC tokens).
   */
  baseDenom: string;
  /**
   * Reserve Factor defines what portion of accrued interest goes to reserves
   * when this token is borrowed.
   * Valid values: 0-1.
   */
  reserveFactor: string;
  /**
   * Collateral Weight defines what portion of the total value of the asset
   * can contribute to a users borrowing power. If the collateral weight is
   * zero, using this asset as collateral against borrowing will be disabled.
   * Must be smaller than `liquidation_threshold`.
   * Valid values: 0-1.
   */
  collateralWeight: string;
  /**
   * Liquidation Threshold defines what amount of the total value of the
   * asset as a collateral can contribute to a user's liquidation threshold
   * (above which they become eligible for liquidation).
   * Must be bigger than `collateral_weight`.
   * Valid values: 0-1.
   * See also: min_close_factor.
   */
  liquidationThreshold: string;
  /**
   * Base Borrow Rate defines the minimum interest rate for borrowing this
   * asset.
   * Valid values: 0-∞
   */
  baseBorrowRate: string;
  /**
   * Kink Borrow Rate defines the interest rate for borrowing this
   * asset when supply utilization is equal to 'kink_utilization'.
   * Valid values: 0-∞
   */
  kinkBorrowRate: string;
  /**
   * Max Borrow Rate defines the interest rate for borrowing this
   * asset when supply utilization is at its maximum.
   * Valid values: 0-∞
   */
  maxBorrowRate: string;
  /**
   * Kink Utilization defines the supply utilization value where
   * the kink in the borrow interest rate function occurs.
   * Valid values: 0-1.
   */
  kinkUtilization: string;
  /**
   * Liquidation Incentive determines the portion of bonus collateral of
   * a token type liquidators receive as a liquidation reward.
   * Valid values: 0-1.
   */
  liquidationIncentive: string;
  /** Symbol Denom is the human readable denomination of this token. */
  symbolDenom: string;
  /**
   * Exponent is the power of ten by which to multiply, in order to convert
   * an amount of the token denoted in its symbol denom to the actual amount
   * of its base denom.
   */
  exponent: number;
  /**
   * Enable Msg Supply allows supplying for lending or collateral using this
   * token. `false` means that a token can no longer be supplied.
   * Note that withdrawing is always enabled. Disabling supply would
   * be one step in phasing out an asset type.
   */
  enableMsgSupply: boolean;
  /**
   * Enable Msg Borrow allows borrowing of this token. Note that repaying is
   * always enabled. Disabling borrowing would be one step in phasing out an
   * asset type, but could also be used from the start for asset types meant
   * to be collateral only, like meTokens.
   */
  enableMsgBorrow: boolean;
  /**
   * Blacklist should only be used to eliminate an asset completely. A blacklisted
   * asset is treated as though its oracle price is zero, and thus ignored by
   * calculations such as collateral value and borrow limit. Can still be repaid
   * or withdrawn, but not liquidated. A blacklisted token must have enable_msg_supply
   * and enable_msg_borrow set to false. Such tokens can be safely removed from the
   * oracle and price feeder as well.
   */
  blacklist: boolean;
  /**
   * Max Collateral Share specifies how much of the system's overall collateral
   * can be provided by a given token. 1.0 means that the token has no restriction.
   * 0.1 means maximum 10% of system's total collateral value can be provided by this token.
   * Valid values: 0-1.
   */
  maxCollateralShare: string;
  /**
   * Max Supply Utilization specifies the maximum supply utilization a token is
   * allowed to reach as a direct result of user borrowing. New borrows are not allowed when
   * the supply utilization is above `max_supply_utilization`.
   *    supply_utilization(token) = total_borrowed(token) / total_supply(token)
   * Valid values: 0-1.
   */
  maxSupplyUtilization: string;
  /**
   * Min Collateral Liquidity specifies min limit for the following function:
   *    collateral_liquidity(token) = available(token) / total_collateral(token)
   * Borrowing, collateralizing, or withdrawing assets is not allowed when the
   * result of such action invalidates min_collateral_liquidity.
   * Liquidity can only drop below this value due to interest or liquidations.
   * The goal is to assure that there is enough available (not borrowed) token to be available
   * for withdraw when there is a collateral liquidation and the liquidator needs to
   * withdraw uToken.
   * Valid values: 0 - inf
   */
  minCollateralLiquidity: string;
  /**
   * Max Supply is the maximum amount of tokens the protocol can hold.
   * Adding more supply of the given token to the protocol will return an error.
   * Must be a non negative value. 0 means that there is no limit.
   * To mark a token as not valid for supply, `msg_supply` must be set to false.
   */
  maxSupply: string;
  /**
   * Historic Medians is the number of median historic prices to request from
   * the oracle module when evaluating new borrow positions containing this token.
   * All MsgBorrow, MsgWithdraw, and MsgDecollateralize must result in healthy
   * borrow positions under both current and historic prices. The default value of
   * zero for this field causes current price to be used in those calculations
   * for the affected Token.
   * The time span covered by the historic median will be:
   *     oracle.Params.median_stamp_period * oracle.Params.historic_stamp_period * historic_medians.
   */
  historicMedians: number;
}
export interface TokenProtoMsg {
  typeUrl: "/umee.leverage.v1.Token";
  value: Uint8Array;
}
/**
 * Token defines a token, along with its metadata and parameters, in the Umee
 * capital facility that can be supplied and borrowed.
 * See https://github.com/umee-network/umee/blob/main/docs/design_docs/010-market-params.md
 * for more details.
 */
export interface TokenAmino {
  /**
   * Base Denom is the denomination of the underlying base token. Must be the base
   * denom as registered in the Bank module (so IBC denom for IBC tokens).
   */
  base_denom?: string;
  /**
   * Reserve Factor defines what portion of accrued interest goes to reserves
   * when this token is borrowed.
   * Valid values: 0-1.
   */
  reserve_factor?: string;
  /**
   * Collateral Weight defines what portion of the total value of the asset
   * can contribute to a users borrowing power. If the collateral weight is
   * zero, using this asset as collateral against borrowing will be disabled.
   * Must be smaller than `liquidation_threshold`.
   * Valid values: 0-1.
   */
  collateral_weight?: string;
  /**
   * Liquidation Threshold defines what amount of the total value of the
   * asset as a collateral can contribute to a user's liquidation threshold
   * (above which they become eligible for liquidation).
   * Must be bigger than `collateral_weight`.
   * Valid values: 0-1.
   * See also: min_close_factor.
   */
  liquidation_threshold?: string;
  /**
   * Base Borrow Rate defines the minimum interest rate for borrowing this
   * asset.
   * Valid values: 0-∞
   */
  base_borrow_rate?: string;
  /**
   * Kink Borrow Rate defines the interest rate for borrowing this
   * asset when supply utilization is equal to 'kink_utilization'.
   * Valid values: 0-∞
   */
  kink_borrow_rate?: string;
  /**
   * Max Borrow Rate defines the interest rate for borrowing this
   * asset when supply utilization is at its maximum.
   * Valid values: 0-∞
   */
  max_borrow_rate?: string;
  /**
   * Kink Utilization defines the supply utilization value where
   * the kink in the borrow interest rate function occurs.
   * Valid values: 0-1.
   */
  kink_utilization?: string;
  /**
   * Liquidation Incentive determines the portion of bonus collateral of
   * a token type liquidators receive as a liquidation reward.
   * Valid values: 0-1.
   */
  liquidation_incentive?: string;
  /** Symbol Denom is the human readable denomination of this token. */
  symbol_denom?: string;
  /**
   * Exponent is the power of ten by which to multiply, in order to convert
   * an amount of the token denoted in its symbol denom to the actual amount
   * of its base denom.
   */
  exponent?: number;
  /**
   * Enable Msg Supply allows supplying for lending or collateral using this
   * token. `false` means that a token can no longer be supplied.
   * Note that withdrawing is always enabled. Disabling supply would
   * be one step in phasing out an asset type.
   */
  enable_msg_supply?: boolean;
  /**
   * Enable Msg Borrow allows borrowing of this token. Note that repaying is
   * always enabled. Disabling borrowing would be one step in phasing out an
   * asset type, but could also be used from the start for asset types meant
   * to be collateral only, like meTokens.
   */
  enable_msg_borrow?: boolean;
  /**
   * Blacklist should only be used to eliminate an asset completely. A blacklisted
   * asset is treated as though its oracle price is zero, and thus ignored by
   * calculations such as collateral value and borrow limit. Can still be repaid
   * or withdrawn, but not liquidated. A blacklisted token must have enable_msg_supply
   * and enable_msg_borrow set to false. Such tokens can be safely removed from the
   * oracle and price feeder as well.
   */
  blacklist?: boolean;
  /**
   * Max Collateral Share specifies how much of the system's overall collateral
   * can be provided by a given token. 1.0 means that the token has no restriction.
   * 0.1 means maximum 10% of system's total collateral value can be provided by this token.
   * Valid values: 0-1.
   */
  max_collateral_share?: string;
  /**
   * Max Supply Utilization specifies the maximum supply utilization a token is
   * allowed to reach as a direct result of user borrowing. New borrows are not allowed when
   * the supply utilization is above `max_supply_utilization`.
   *    supply_utilization(token) = total_borrowed(token) / total_supply(token)
   * Valid values: 0-1.
   */
  max_supply_utilization?: string;
  /**
   * Min Collateral Liquidity specifies min limit for the following function:
   *    collateral_liquidity(token) = available(token) / total_collateral(token)
   * Borrowing, collateralizing, or withdrawing assets is not allowed when the
   * result of such action invalidates min_collateral_liquidity.
   * Liquidity can only drop below this value due to interest or liquidations.
   * The goal is to assure that there is enough available (not borrowed) token to be available
   * for withdraw when there is a collateral liquidation and the liquidator needs to
   * withdraw uToken.
   * Valid values: 0 - inf
   */
  min_collateral_liquidity?: string;
  /**
   * Max Supply is the maximum amount of tokens the protocol can hold.
   * Adding more supply of the given token to the protocol will return an error.
   * Must be a non negative value. 0 means that there is no limit.
   * To mark a token as not valid for supply, `msg_supply` must be set to false.
   */
  max_supply?: string;
  /**
   * Historic Medians is the number of median historic prices to request from
   * the oracle module when evaluating new borrow positions containing this token.
   * All MsgBorrow, MsgWithdraw, and MsgDecollateralize must result in healthy
   * borrow positions under both current and historic prices. The default value of
   * zero for this field causes current price to be used in those calculations
   * for the affected Token.
   * The time span covered by the historic median will be:
   *     oracle.Params.median_stamp_period * oracle.Params.historic_stamp_period * historic_medians.
   */
  historic_medians?: number;
}
export interface TokenAminoMsg {
  type: "/umee.leverage.v1.Token";
  value: TokenAmino;
}
/**
 * Token defines a token, along with its metadata and parameters, in the Umee
 * capital facility that can be supplied and borrowed.
 * See https://github.com/umee-network/umee/blob/main/docs/design_docs/010-market-params.md
 * for more details.
 */
export interface TokenSDKType {
  base_denom: string;
  reserve_factor: string;
  collateral_weight: string;
  liquidation_threshold: string;
  base_borrow_rate: string;
  kink_borrow_rate: string;
  max_borrow_rate: string;
  kink_utilization: string;
  liquidation_incentive: string;
  symbol_denom: string;
  exponent: number;
  enable_msg_supply: boolean;
  enable_msg_borrow: boolean;
  blacklist: boolean;
  max_collateral_share: string;
  max_supply_utilization: string;
  min_collateral_liquidity: string;
  max_supply: string;
  historic_medians: number;
}
/**
 * SpecialAssetPair defines a special (increased) CollateralWeight used when a specified Collateral is used
 * to collateralize a specified Borrow. This association is one-way (so it does not work in reverse).
 */
export interface SpecialAssetPair {
  /** Collateral base token denom. */
  collateral: string;
  /** Borrow base token denom. */
  borrow: string;
  /**
   * Collateral Weight defines what portion of the total value of the asset
   * can contribute to a users borrowing power. For special asset pairs, this
   * also overrides the borrowed asset's collateral weight when evaluating borrow
   * factor. Valid values: 0-1.
   */
  collateralWeight: string;
  /**
   * Liquidation threshold defines what portion of the total value of the assets
   * can contribute to a users liquidation threshold, when borrowing within the pair.
   * Valid values in range [collateral_weight,1]
   */
  liquidationThreshold: string;
}
export interface SpecialAssetPairProtoMsg {
  typeUrl: "/umee.leverage.v1.SpecialAssetPair";
  value: Uint8Array;
}
/**
 * SpecialAssetPair defines a special (increased) CollateralWeight used when a specified Collateral is used
 * to collateralize a specified Borrow. This association is one-way (so it does not work in reverse).
 */
export interface SpecialAssetPairAmino {
  /** Collateral base token denom. */
  collateral?: string;
  /** Borrow base token denom. */
  borrow?: string;
  /**
   * Collateral Weight defines what portion of the total value of the asset
   * can contribute to a users borrowing power. For special asset pairs, this
   * also overrides the borrowed asset's collateral weight when evaluating borrow
   * factor. Valid values: 0-1.
   */
  collateral_weight?: string;
  /**
   * Liquidation threshold defines what portion of the total value of the assets
   * can contribute to a users liquidation threshold, when borrowing within the pair.
   * Valid values in range [collateral_weight,1]
   */
  liquidation_threshold?: string;
}
export interface SpecialAssetPairAminoMsg {
  type: "/umee.leverage.v1.SpecialAssetPair";
  value: SpecialAssetPairAmino;
}
/**
 * SpecialAssetPair defines a special (increased) CollateralWeight used when a specified Collateral is used
 * to collateralize a specified Borrow. This association is one-way (so it does not work in reverse).
 */
export interface SpecialAssetPairSDKType {
  collateral: string;
  borrow: string;
  collateral_weight: string;
  liquidation_threshold: string;
}
/**
 * SpecialAssetSet defines a special (increased) CollateralWeight used when any of a set
 * of assets are used to borrow each other (except for looping). It is used in gov proposals
 * to create all the pairs that make up a set at once.
 */
export interface SpecialAssetSet {
  /** Collateral or borrowed base token denoms. */
  assets: string[];
  /**
   * Collateral Weight defines what portion of the total value of the assets
   * can contribute to a users borrowing power, when borrowing within the set.
   * Valid values: 0-1.
   */
  collateralWeight: string;
  /**
   * Liquidation threshold defines what portion of the total value of the assets
   * can contribute to a users liquidation threshold, when borrowing within the set.
   * Valid values in range [collateral_weight,1]
   */
  liquidationThreshold: string;
}
export interface SpecialAssetSetProtoMsg {
  typeUrl: "/umee.leverage.v1.SpecialAssetSet";
  value: Uint8Array;
}
/**
 * SpecialAssetSet defines a special (increased) CollateralWeight used when any of a set
 * of assets are used to borrow each other (except for looping). It is used in gov proposals
 * to create all the pairs that make up a set at once.
 */
export interface SpecialAssetSetAmino {
  /** Collateral or borrowed base token denoms. */
  assets?: string[];
  /**
   * Collateral Weight defines what portion of the total value of the assets
   * can contribute to a users borrowing power, when borrowing within the set.
   * Valid values: 0-1.
   */
  collateral_weight?: string;
  /**
   * Liquidation threshold defines what portion of the total value of the assets
   * can contribute to a users liquidation threshold, when borrowing within the set.
   * Valid values in range [collateral_weight,1]
   */
  liquidation_threshold?: string;
}
export interface SpecialAssetSetAminoMsg {
  type: "/umee.leverage.v1.SpecialAssetSet";
  value: SpecialAssetSetAmino;
}
/**
 * SpecialAssetSet defines a special (increased) CollateralWeight used when any of a set
 * of assets are used to borrow each other (except for looping). It is used in gov proposals
 * to create all the pairs that make up a set at once.
 */
export interface SpecialAssetSetSDKType {
  assets: string[];
  collateral_weight: string;
  liquidation_threshold: string;
}
function createBaseParams(): Params {
  return {
    completeLiquidationThreshold: "",
    minimumCloseFactor: "",
    oracleRewardFactor: "",
    smallLiquidationSize: "",
    directLiquidationFee: "",
    rewardsAuctionFee: ""
  };
}
export const Params = {
  typeUrl: "/umee.leverage.v1.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.completeLiquidationThreshold !== "") {
      writer.uint32(18).string(Decimal.fromUserInput(message.completeLiquidationThreshold, 18).atomics);
    }
    if (message.minimumCloseFactor !== "") {
      writer.uint32(26).string(Decimal.fromUserInput(message.minimumCloseFactor, 18).atomics);
    }
    if (message.oracleRewardFactor !== "") {
      writer.uint32(34).string(Decimal.fromUserInput(message.oracleRewardFactor, 18).atomics);
    }
    if (message.smallLiquidationSize !== "") {
      writer.uint32(42).string(Decimal.fromUserInput(message.smallLiquidationSize, 18).atomics);
    }
    if (message.directLiquidationFee !== "") {
      writer.uint32(50).string(Decimal.fromUserInput(message.directLiquidationFee, 18).atomics);
    }
    if (message.rewardsAuctionFee !== "") {
      writer.uint32(58).string(Decimal.fromUserInput(message.rewardsAuctionFee, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): Params {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.completeLiquidationThreshold = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 3:
          message.minimumCloseFactor = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 4:
          message.oracleRewardFactor = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 5:
          message.smallLiquidationSize = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 6:
          message.directLiquidationFee = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 7:
          message.rewardsAuctionFee = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Params>): Params {
    const message = createBaseParams();
    message.completeLiquidationThreshold = object.completeLiquidationThreshold ?? "";
    message.minimumCloseFactor = object.minimumCloseFactor ?? "";
    message.oracleRewardFactor = object.oracleRewardFactor ?? "";
    message.smallLiquidationSize = object.smallLiquidationSize ?? "";
    message.directLiquidationFee = object.directLiquidationFee ?? "";
    message.rewardsAuctionFee = object.rewardsAuctionFee ?? "";
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    const message = createBaseParams();
    if (object.complete_liquidation_threshold !== undefined && object.complete_liquidation_threshold !== null) {
      message.completeLiquidationThreshold = object.complete_liquidation_threshold;
    }
    if (object.minimum_close_factor !== undefined && object.minimum_close_factor !== null) {
      message.minimumCloseFactor = object.minimum_close_factor;
    }
    if (object.oracle_reward_factor !== undefined && object.oracle_reward_factor !== null) {
      message.oracleRewardFactor = object.oracle_reward_factor;
    }
    if (object.small_liquidation_size !== undefined && object.small_liquidation_size !== null) {
      message.smallLiquidationSize = object.small_liquidation_size;
    }
    if (object.direct_liquidation_fee !== undefined && object.direct_liquidation_fee !== null) {
      message.directLiquidationFee = object.direct_liquidation_fee;
    }
    if (object.rewards_auction_fee !== undefined && object.rewards_auction_fee !== null) {
      message.rewardsAuctionFee = object.rewards_auction_fee;
    }
    return message;
  },
  toAmino(message: Params, useInterfaces: boolean = false): ParamsAmino {
    const obj: any = {};
    obj.complete_liquidation_threshold = message.completeLiquidationThreshold === "" ? undefined : message.completeLiquidationThreshold;
    obj.minimum_close_factor = message.minimumCloseFactor === "" ? undefined : message.minimumCloseFactor;
    obj.oracle_reward_factor = message.oracleRewardFactor === "" ? undefined : message.oracleRewardFactor;
    obj.small_liquidation_size = message.smallLiquidationSize === "" ? undefined : message.smallLiquidationSize;
    obj.direct_liquidation_fee = message.directLiquidationFee === "" ? undefined : message.directLiquidationFee;
    obj.rewards_auction_fee = message.rewardsAuctionFee === "" ? undefined : message.rewardsAuctionFee;
    return obj;
  },
  fromAminoMsg(object: ParamsAminoMsg): Params {
    return Params.fromAmino(object.value);
  },
  fromProtoMsg(message: ParamsProtoMsg, useInterfaces: boolean = false): Params {
    return Params.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Params): Uint8Array {
    return Params.encode(message).finish();
  },
  toProtoMsg(message: Params): ParamsProtoMsg {
    return {
      typeUrl: "/umee.leverage.v1.Params",
      value: Params.encode(message).finish()
    };
  }
};
function createBaseToken(): Token {
  return {
    baseDenom: "",
    reserveFactor: "",
    collateralWeight: "",
    liquidationThreshold: "",
    baseBorrowRate: "",
    kinkBorrowRate: "",
    maxBorrowRate: "",
    kinkUtilization: "",
    liquidationIncentive: "",
    symbolDenom: "",
    exponent: 0,
    enableMsgSupply: false,
    enableMsgBorrow: false,
    blacklist: false,
    maxCollateralShare: "",
    maxSupplyUtilization: "",
    minCollateralLiquidity: "",
    maxSupply: "",
    historicMedians: 0
  };
}
export const Token = {
  typeUrl: "/umee.leverage.v1.Token",
  encode(message: Token, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.baseDenom !== "") {
      writer.uint32(10).string(message.baseDenom);
    }
    if (message.reserveFactor !== "") {
      writer.uint32(18).string(Decimal.fromUserInput(message.reserveFactor, 18).atomics);
    }
    if (message.collateralWeight !== "") {
      writer.uint32(26).string(Decimal.fromUserInput(message.collateralWeight, 18).atomics);
    }
    if (message.liquidationThreshold !== "") {
      writer.uint32(34).string(Decimal.fromUserInput(message.liquidationThreshold, 18).atomics);
    }
    if (message.baseBorrowRate !== "") {
      writer.uint32(42).string(Decimal.fromUserInput(message.baseBorrowRate, 18).atomics);
    }
    if (message.kinkBorrowRate !== "") {
      writer.uint32(50).string(Decimal.fromUserInput(message.kinkBorrowRate, 18).atomics);
    }
    if (message.maxBorrowRate !== "") {
      writer.uint32(58).string(Decimal.fromUserInput(message.maxBorrowRate, 18).atomics);
    }
    if (message.kinkUtilization !== "") {
      writer.uint32(66).string(Decimal.fromUserInput(message.kinkUtilization, 18).atomics);
    }
    if (message.liquidationIncentive !== "") {
      writer.uint32(74).string(Decimal.fromUserInput(message.liquidationIncentive, 18).atomics);
    }
    if (message.symbolDenom !== "") {
      writer.uint32(82).string(message.symbolDenom);
    }
    if (message.exponent !== 0) {
      writer.uint32(88).uint32(message.exponent);
    }
    if (message.enableMsgSupply === true) {
      writer.uint32(96).bool(message.enableMsgSupply);
    }
    if (message.enableMsgBorrow === true) {
      writer.uint32(104).bool(message.enableMsgBorrow);
    }
    if (message.blacklist === true) {
      writer.uint32(112).bool(message.blacklist);
    }
    if (message.maxCollateralShare !== "") {
      writer.uint32(122).string(Decimal.fromUserInput(message.maxCollateralShare, 18).atomics);
    }
    if (message.maxSupplyUtilization !== "") {
      writer.uint32(130).string(Decimal.fromUserInput(message.maxSupplyUtilization, 18).atomics);
    }
    if (message.minCollateralLiquidity !== "") {
      writer.uint32(138).string(Decimal.fromUserInput(message.minCollateralLiquidity, 18).atomics);
    }
    if (message.maxSupply !== "") {
      writer.uint32(146).string(message.maxSupply);
    }
    if (message.historicMedians !== 0) {
      writer.uint32(152).uint32(message.historicMedians);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): Token {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseToken();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.baseDenom = reader.string();
          break;
        case 2:
          message.reserveFactor = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 3:
          message.collateralWeight = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 4:
          message.liquidationThreshold = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 5:
          message.baseBorrowRate = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 6:
          message.kinkBorrowRate = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 7:
          message.maxBorrowRate = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 8:
          message.kinkUtilization = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 9:
          message.liquidationIncentive = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 10:
          message.symbolDenom = reader.string();
          break;
        case 11:
          message.exponent = reader.uint32();
          break;
        case 12:
          message.enableMsgSupply = reader.bool();
          break;
        case 13:
          message.enableMsgBorrow = reader.bool();
          break;
        case 14:
          message.blacklist = reader.bool();
          break;
        case 15:
          message.maxCollateralShare = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 16:
          message.maxSupplyUtilization = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 17:
          message.minCollateralLiquidity = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 18:
          message.maxSupply = reader.string();
          break;
        case 19:
          message.historicMedians = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Token>): Token {
    const message = createBaseToken();
    message.baseDenom = object.baseDenom ?? "";
    message.reserveFactor = object.reserveFactor ?? "";
    message.collateralWeight = object.collateralWeight ?? "";
    message.liquidationThreshold = object.liquidationThreshold ?? "";
    message.baseBorrowRate = object.baseBorrowRate ?? "";
    message.kinkBorrowRate = object.kinkBorrowRate ?? "";
    message.maxBorrowRate = object.maxBorrowRate ?? "";
    message.kinkUtilization = object.kinkUtilization ?? "";
    message.liquidationIncentive = object.liquidationIncentive ?? "";
    message.symbolDenom = object.symbolDenom ?? "";
    message.exponent = object.exponent ?? 0;
    message.enableMsgSupply = object.enableMsgSupply ?? false;
    message.enableMsgBorrow = object.enableMsgBorrow ?? false;
    message.blacklist = object.blacklist ?? false;
    message.maxCollateralShare = object.maxCollateralShare ?? "";
    message.maxSupplyUtilization = object.maxSupplyUtilization ?? "";
    message.minCollateralLiquidity = object.minCollateralLiquidity ?? "";
    message.maxSupply = object.maxSupply ?? "";
    message.historicMedians = object.historicMedians ?? 0;
    return message;
  },
  fromAmino(object: TokenAmino): Token {
    const message = createBaseToken();
    if (object.base_denom !== undefined && object.base_denom !== null) {
      message.baseDenom = object.base_denom;
    }
    if (object.reserve_factor !== undefined && object.reserve_factor !== null) {
      message.reserveFactor = object.reserve_factor;
    }
    if (object.collateral_weight !== undefined && object.collateral_weight !== null) {
      message.collateralWeight = object.collateral_weight;
    }
    if (object.liquidation_threshold !== undefined && object.liquidation_threshold !== null) {
      message.liquidationThreshold = object.liquidation_threshold;
    }
    if (object.base_borrow_rate !== undefined && object.base_borrow_rate !== null) {
      message.baseBorrowRate = object.base_borrow_rate;
    }
    if (object.kink_borrow_rate !== undefined && object.kink_borrow_rate !== null) {
      message.kinkBorrowRate = object.kink_borrow_rate;
    }
    if (object.max_borrow_rate !== undefined && object.max_borrow_rate !== null) {
      message.maxBorrowRate = object.max_borrow_rate;
    }
    if (object.kink_utilization !== undefined && object.kink_utilization !== null) {
      message.kinkUtilization = object.kink_utilization;
    }
    if (object.liquidation_incentive !== undefined && object.liquidation_incentive !== null) {
      message.liquidationIncentive = object.liquidation_incentive;
    }
    if (object.symbol_denom !== undefined && object.symbol_denom !== null) {
      message.symbolDenom = object.symbol_denom;
    }
    if (object.exponent !== undefined && object.exponent !== null) {
      message.exponent = object.exponent;
    }
    if (object.enable_msg_supply !== undefined && object.enable_msg_supply !== null) {
      message.enableMsgSupply = object.enable_msg_supply;
    }
    if (object.enable_msg_borrow !== undefined && object.enable_msg_borrow !== null) {
      message.enableMsgBorrow = object.enable_msg_borrow;
    }
    if (object.blacklist !== undefined && object.blacklist !== null) {
      message.blacklist = object.blacklist;
    }
    if (object.max_collateral_share !== undefined && object.max_collateral_share !== null) {
      message.maxCollateralShare = object.max_collateral_share;
    }
    if (object.max_supply_utilization !== undefined && object.max_supply_utilization !== null) {
      message.maxSupplyUtilization = object.max_supply_utilization;
    }
    if (object.min_collateral_liquidity !== undefined && object.min_collateral_liquidity !== null) {
      message.minCollateralLiquidity = object.min_collateral_liquidity;
    }
    if (object.max_supply !== undefined && object.max_supply !== null) {
      message.maxSupply = object.max_supply;
    }
    if (object.historic_medians !== undefined && object.historic_medians !== null) {
      message.historicMedians = object.historic_medians;
    }
    return message;
  },
  toAmino(message: Token, useInterfaces: boolean = false): TokenAmino {
    const obj: any = {};
    obj.base_denom = message.baseDenom === "" ? undefined : message.baseDenom;
    obj.reserve_factor = message.reserveFactor === "" ? undefined : message.reserveFactor;
    obj.collateral_weight = message.collateralWeight === "" ? undefined : message.collateralWeight;
    obj.liquidation_threshold = message.liquidationThreshold === "" ? undefined : message.liquidationThreshold;
    obj.base_borrow_rate = message.baseBorrowRate === "" ? undefined : message.baseBorrowRate;
    obj.kink_borrow_rate = message.kinkBorrowRate === "" ? undefined : message.kinkBorrowRate;
    obj.max_borrow_rate = message.maxBorrowRate === "" ? undefined : message.maxBorrowRate;
    obj.kink_utilization = message.kinkUtilization === "" ? undefined : message.kinkUtilization;
    obj.liquidation_incentive = message.liquidationIncentive === "" ? undefined : message.liquidationIncentive;
    obj.symbol_denom = message.symbolDenom === "" ? undefined : message.symbolDenom;
    obj.exponent = message.exponent === 0 ? undefined : message.exponent;
    obj.enable_msg_supply = message.enableMsgSupply === false ? undefined : message.enableMsgSupply;
    obj.enable_msg_borrow = message.enableMsgBorrow === false ? undefined : message.enableMsgBorrow;
    obj.blacklist = message.blacklist === false ? undefined : message.blacklist;
    obj.max_collateral_share = message.maxCollateralShare === "" ? undefined : message.maxCollateralShare;
    obj.max_supply_utilization = message.maxSupplyUtilization === "" ? undefined : message.maxSupplyUtilization;
    obj.min_collateral_liquidity = message.minCollateralLiquidity === "" ? undefined : message.minCollateralLiquidity;
    obj.max_supply = message.maxSupply === "" ? undefined : message.maxSupply;
    obj.historic_medians = message.historicMedians === 0 ? undefined : message.historicMedians;
    return obj;
  },
  fromAminoMsg(object: TokenAminoMsg): Token {
    return Token.fromAmino(object.value);
  },
  fromProtoMsg(message: TokenProtoMsg, useInterfaces: boolean = false): Token {
    return Token.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Token): Uint8Array {
    return Token.encode(message).finish();
  },
  toProtoMsg(message: Token): TokenProtoMsg {
    return {
      typeUrl: "/umee.leverage.v1.Token",
      value: Token.encode(message).finish()
    };
  }
};
function createBaseSpecialAssetPair(): SpecialAssetPair {
  return {
    collateral: "",
    borrow: "",
    collateralWeight: "",
    liquidationThreshold: ""
  };
}
export const SpecialAssetPair = {
  typeUrl: "/umee.leverage.v1.SpecialAssetPair",
  encode(message: SpecialAssetPair, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.collateral !== "") {
      writer.uint32(10).string(message.collateral);
    }
    if (message.borrow !== "") {
      writer.uint32(18).string(message.borrow);
    }
    if (message.collateralWeight !== "") {
      writer.uint32(26).string(Decimal.fromUserInput(message.collateralWeight, 18).atomics);
    }
    if (message.liquidationThreshold !== "") {
      writer.uint32(34).string(Decimal.fromUserInput(message.liquidationThreshold, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): SpecialAssetPair {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSpecialAssetPair();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.collateral = reader.string();
          break;
        case 2:
          message.borrow = reader.string();
          break;
        case 3:
          message.collateralWeight = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 4:
          message.liquidationThreshold = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<SpecialAssetPair>): SpecialAssetPair {
    const message = createBaseSpecialAssetPair();
    message.collateral = object.collateral ?? "";
    message.borrow = object.borrow ?? "";
    message.collateralWeight = object.collateralWeight ?? "";
    message.liquidationThreshold = object.liquidationThreshold ?? "";
    return message;
  },
  fromAmino(object: SpecialAssetPairAmino): SpecialAssetPair {
    const message = createBaseSpecialAssetPair();
    if (object.collateral !== undefined && object.collateral !== null) {
      message.collateral = object.collateral;
    }
    if (object.borrow !== undefined && object.borrow !== null) {
      message.borrow = object.borrow;
    }
    if (object.collateral_weight !== undefined && object.collateral_weight !== null) {
      message.collateralWeight = object.collateral_weight;
    }
    if (object.liquidation_threshold !== undefined && object.liquidation_threshold !== null) {
      message.liquidationThreshold = object.liquidation_threshold;
    }
    return message;
  },
  toAmino(message: SpecialAssetPair, useInterfaces: boolean = false): SpecialAssetPairAmino {
    const obj: any = {};
    obj.collateral = message.collateral === "" ? undefined : message.collateral;
    obj.borrow = message.borrow === "" ? undefined : message.borrow;
    obj.collateral_weight = message.collateralWeight === "" ? undefined : message.collateralWeight;
    obj.liquidation_threshold = message.liquidationThreshold === "" ? undefined : message.liquidationThreshold;
    return obj;
  },
  fromAminoMsg(object: SpecialAssetPairAminoMsg): SpecialAssetPair {
    return SpecialAssetPair.fromAmino(object.value);
  },
  fromProtoMsg(message: SpecialAssetPairProtoMsg, useInterfaces: boolean = false): SpecialAssetPair {
    return SpecialAssetPair.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: SpecialAssetPair): Uint8Array {
    return SpecialAssetPair.encode(message).finish();
  },
  toProtoMsg(message: SpecialAssetPair): SpecialAssetPairProtoMsg {
    return {
      typeUrl: "/umee.leverage.v1.SpecialAssetPair",
      value: SpecialAssetPair.encode(message).finish()
    };
  }
};
function createBaseSpecialAssetSet(): SpecialAssetSet {
  return {
    assets: [],
    collateralWeight: "",
    liquidationThreshold: ""
  };
}
export const SpecialAssetSet = {
  typeUrl: "/umee.leverage.v1.SpecialAssetSet",
  encode(message: SpecialAssetSet, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.assets) {
      writer.uint32(10).string(v!);
    }
    if (message.collateralWeight !== "") {
      writer.uint32(18).string(Decimal.fromUserInput(message.collateralWeight, 18).atomics);
    }
    if (message.liquidationThreshold !== "") {
      writer.uint32(26).string(Decimal.fromUserInput(message.liquidationThreshold, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): SpecialAssetSet {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSpecialAssetSet();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.assets.push(reader.string());
          break;
        case 2:
          message.collateralWeight = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 3:
          message.liquidationThreshold = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<SpecialAssetSet>): SpecialAssetSet {
    const message = createBaseSpecialAssetSet();
    message.assets = object.assets?.map(e => e) || [];
    message.collateralWeight = object.collateralWeight ?? "";
    message.liquidationThreshold = object.liquidationThreshold ?? "";
    return message;
  },
  fromAmino(object: SpecialAssetSetAmino): SpecialAssetSet {
    const message = createBaseSpecialAssetSet();
    message.assets = object.assets?.map(e => e) || [];
    if (object.collateral_weight !== undefined && object.collateral_weight !== null) {
      message.collateralWeight = object.collateral_weight;
    }
    if (object.liquidation_threshold !== undefined && object.liquidation_threshold !== null) {
      message.liquidationThreshold = object.liquidation_threshold;
    }
    return message;
  },
  toAmino(message: SpecialAssetSet, useInterfaces: boolean = false): SpecialAssetSetAmino {
    const obj: any = {};
    if (message.assets) {
      obj.assets = message.assets.map(e => e);
    } else {
      obj.assets = message.assets;
    }
    obj.collateral_weight = message.collateralWeight === "" ? undefined : message.collateralWeight;
    obj.liquidation_threshold = message.liquidationThreshold === "" ? undefined : message.liquidationThreshold;
    return obj;
  },
  fromAminoMsg(object: SpecialAssetSetAminoMsg): SpecialAssetSet {
    return SpecialAssetSet.fromAmino(object.value);
  },
  fromProtoMsg(message: SpecialAssetSetProtoMsg, useInterfaces: boolean = false): SpecialAssetSet {
    return SpecialAssetSet.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: SpecialAssetSet): Uint8Array {
    return SpecialAssetSet.encode(message).finish();
  },
  toProtoMsg(message: SpecialAssetSet): SpecialAssetSetProtoMsg {
    return {
      typeUrl: "/umee.leverage.v1.SpecialAssetSet",
      value: SpecialAssetSet.encode(message).finish()
    };
  }
};