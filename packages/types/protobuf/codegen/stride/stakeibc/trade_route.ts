import { ICAAccount, ICAAccountAmino, ICAAccountSDKType } from "./ica_account";
import { BinaryReader, BinaryWriter } from "../../binary";
import { Decimal } from "@cosmjs/math";
/**
 * Deprecated, this configuration is no longer needed since swaps
 * are executed off-chain via authz
 * 
 * Stores pool information needed to execute the swap along a trade route
 */
/** @deprecated */
export interface TradeConfig {
  /** Currently Osmosis is the only trade chain so this is an osmosis pool id */
  poolId: bigint;
  /**
   * Spot price in the pool to convert the reward denom to the host denom
   * output_tokens = swap_price * input tokens
   * This value may be slightly stale as it is updated by an ICQ
   */
  swapPrice: string;
  /** unix time in seconds that the price was last updated */
  priceUpdateTimestamp: bigint;
  /**
   * Threshold defining the percentage of tokens that could be lost in the trade
   * This captures both the loss from slippage and from a stale price on stride
   * 0.05 means the output from the trade can be no less than a 5% deviation
   * from the current value
   */
  maxAllowedSwapLossRate: string;
  /**
   * min and max set boundaries of reward denom on trade chain we will swap
   * min also decides when reward token transfers are worth it (transfer fees)
   */
  minSwapAmount: string;
  maxSwapAmount: string;
}
export interface TradeConfigProtoMsg {
  typeUrl: "/stride.stakeibc.TradeConfig";
  value: Uint8Array;
}
/**
 * Deprecated, this configuration is no longer needed since swaps
 * are executed off-chain via authz
 * 
 * Stores pool information needed to execute the swap along a trade route
 */
/** @deprecated */
export interface TradeConfigAmino {
  /** Currently Osmosis is the only trade chain so this is an osmosis pool id */
  pool_id?: string;
  /**
   * Spot price in the pool to convert the reward denom to the host denom
   * output_tokens = swap_price * input tokens
   * This value may be slightly stale as it is updated by an ICQ
   */
  swap_price?: string;
  /** unix time in seconds that the price was last updated */
  price_update_timestamp?: string;
  /**
   * Threshold defining the percentage of tokens that could be lost in the trade
   * This captures both the loss from slippage and from a stale price on stride
   * 0.05 means the output from the trade can be no less than a 5% deviation
   * from the current value
   */
  max_allowed_swap_loss_rate?: string;
  /**
   * min and max set boundaries of reward denom on trade chain we will swap
   * min also decides when reward token transfers are worth it (transfer fees)
   */
  min_swap_amount?: string;
  max_swap_amount?: string;
}
export interface TradeConfigAminoMsg {
  type: "/stride.stakeibc.TradeConfig";
  value: TradeConfigAmino;
}
/**
 * Deprecated, this configuration is no longer needed since swaps
 * are executed off-chain via authz
 * 
 * Stores pool information needed to execute the swap along a trade route
 */
/** @deprecated */
export interface TradeConfigSDKType {
  pool_id: bigint;
  swap_price: string;
  price_update_timestamp: bigint;
  max_allowed_swap_loss_rate: string;
  min_swap_amount: string;
  max_swap_amount: string;
}
/**
 * TradeRoute represents a round trip including info on transfer and how to do
 * the swap. It makes the assumption that the reward token is always foreign to
 * the host so therefore the first two hops are to unwind the ibc denom enroute
 * to the trade chain and the last hop is the return so funds start/end in the
 * withdrawl ICA on hostZone
 * The structure is key'd on reward denom and host denom in their native forms
 * (i.e. reward_denom_on_reward_zone and host_denom_on_host_zone)
 */
export interface TradeRoute {
  /** ibc denom for the reward on the host zone */
  rewardDenomOnHostZone: string;
  /** should be the native denom for the reward chain */
  rewardDenomOnRewardZone: string;
  /** ibc denom of the reward on the trade chain, input to the swap */
  rewardDenomOnTradeZone: string;
  /** ibc of the host denom on the trade chain, output from the swap */
  hostDenomOnTradeZone: string;
  /** should be the same as the native host denom on the host chain */
  hostDenomOnHostZone: string;
  /**
   * ICAAccount on the host zone with the reward tokens
   * This is the same as the host zone withdrawal ICA account
   */
  hostAccount: ICAAccount | undefined;
  /**
   * ICAAccount on the reward zone that is acts as the intermediate
   * receiver of the transfer from host zone to trade zone
   */
  rewardAccount: ICAAccount | undefined;
  /**
   * ICAAccount responsible for executing the swap of reward
   * tokens for host tokens
   */
  tradeAccount: ICAAccount | undefined;
  /**
   * Channel responsible for the transfer of reward tokens from the host
   * zone to the reward zone. This is the channel ID on the host zone side
   */
  hostToRewardChannelId: string;
  /**
   * Channel responsible for the transfer of reward tokens from the reward
   * zone to the trade zone. This is the channel ID on the reward zone side
   */
  rewardToTradeChannelId: string;
  /**
   * Channel responsible for the transfer of host tokens from the trade
   * zone, back to the host zone. This is the channel ID on the trade zone side
   */
  tradeToHostChannelId: string;
  /**
   * Minimum amount of reward token that must be accumulated before
   * the tokens are transferred to the trade ICA
   */
  minTransferAmount: string;
  /**
   * Deprecated, the trades are now executed off-chain via authz
   * so the trade configuration is no longer needed
   * 
   * specifies the configuration needed to execute the swap
   * such as pool_id, slippage, min trade amount, etc.
   */
  /** @deprecated */
  tradeConfig: TradeConfig | undefined;
}
export interface TradeRouteProtoMsg {
  typeUrl: "/stride.stakeibc.TradeRoute";
  value: Uint8Array;
}
/**
 * TradeRoute represents a round trip including info on transfer and how to do
 * the swap. It makes the assumption that the reward token is always foreign to
 * the host so therefore the first two hops are to unwind the ibc denom enroute
 * to the trade chain and the last hop is the return so funds start/end in the
 * withdrawl ICA on hostZone
 * The structure is key'd on reward denom and host denom in their native forms
 * (i.e. reward_denom_on_reward_zone and host_denom_on_host_zone)
 */
export interface TradeRouteAmino {
  /** ibc denom for the reward on the host zone */
  reward_denom_on_host_zone?: string;
  /** should be the native denom for the reward chain */
  reward_denom_on_reward_zone?: string;
  /** ibc denom of the reward on the trade chain, input to the swap */
  reward_denom_on_trade_zone?: string;
  /** ibc of the host denom on the trade chain, output from the swap */
  host_denom_on_trade_zone?: string;
  /** should be the same as the native host denom on the host chain */
  host_denom_on_host_zone?: string;
  /**
   * ICAAccount on the host zone with the reward tokens
   * This is the same as the host zone withdrawal ICA account
   */
  host_account?: ICAAccountAmino | undefined;
  /**
   * ICAAccount on the reward zone that is acts as the intermediate
   * receiver of the transfer from host zone to trade zone
   */
  reward_account?: ICAAccountAmino | undefined;
  /**
   * ICAAccount responsible for executing the swap of reward
   * tokens for host tokens
   */
  trade_account?: ICAAccountAmino | undefined;
  /**
   * Channel responsible for the transfer of reward tokens from the host
   * zone to the reward zone. This is the channel ID on the host zone side
   */
  host_to_reward_channel_id?: string;
  /**
   * Channel responsible for the transfer of reward tokens from the reward
   * zone to the trade zone. This is the channel ID on the reward zone side
   */
  reward_to_trade_channel_id?: string;
  /**
   * Channel responsible for the transfer of host tokens from the trade
   * zone, back to the host zone. This is the channel ID on the trade zone side
   */
  trade_to_host_channel_id?: string;
  /**
   * Minimum amount of reward token that must be accumulated before
   * the tokens are transferred to the trade ICA
   */
  min_transfer_amount?: string;
  /**
   * Deprecated, the trades are now executed off-chain via authz
   * so the trade configuration is no longer needed
   * 
   * specifies the configuration needed to execute the swap
   * such as pool_id, slippage, min trade amount, etc.
   */
  /** @deprecated */
  trade_config?: TradeConfigAmino | undefined;
}
export interface TradeRouteAminoMsg {
  type: "/stride.stakeibc.TradeRoute";
  value: TradeRouteAmino;
}
/**
 * TradeRoute represents a round trip including info on transfer and how to do
 * the swap. It makes the assumption that the reward token is always foreign to
 * the host so therefore the first two hops are to unwind the ibc denom enroute
 * to the trade chain and the last hop is the return so funds start/end in the
 * withdrawl ICA on hostZone
 * The structure is key'd on reward denom and host denom in their native forms
 * (i.e. reward_denom_on_reward_zone and host_denom_on_host_zone)
 */
export interface TradeRouteSDKType {
  reward_denom_on_host_zone: string;
  reward_denom_on_reward_zone: string;
  reward_denom_on_trade_zone: string;
  host_denom_on_trade_zone: string;
  host_denom_on_host_zone: string;
  host_account: ICAAccountSDKType | undefined;
  reward_account: ICAAccountSDKType | undefined;
  trade_account: ICAAccountSDKType | undefined;
  host_to_reward_channel_id: string;
  reward_to_trade_channel_id: string;
  trade_to_host_channel_id: string;
  min_transfer_amount: string;
  /** @deprecated */
  trade_config: TradeConfigSDKType | undefined;
}
function createBaseTradeConfig(): TradeConfig {
  return {
    poolId: BigInt(0),
    swapPrice: "",
    priceUpdateTimestamp: BigInt(0),
    maxAllowedSwapLossRate: "",
    minSwapAmount: "",
    maxSwapAmount: ""
  };
}
export const TradeConfig = {
  typeUrl: "/stride.stakeibc.TradeConfig",
  encode(message: TradeConfig, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.swapPrice !== "") {
      writer.uint32(18).string(Decimal.fromUserInput(message.swapPrice, 18).atomics);
    }
    if (message.priceUpdateTimestamp !== BigInt(0)) {
      writer.uint32(24).uint64(message.priceUpdateTimestamp);
    }
    if (message.maxAllowedSwapLossRate !== "") {
      writer.uint32(34).string(Decimal.fromUserInput(message.maxAllowedSwapLossRate, 18).atomics);
    }
    if (message.minSwapAmount !== "") {
      writer.uint32(42).string(message.minSwapAmount);
    }
    if (message.maxSwapAmount !== "") {
      writer.uint32(50).string(message.maxSwapAmount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): TradeConfig {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTradeConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.uint64();
          break;
        case 2:
          message.swapPrice = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 3:
          message.priceUpdateTimestamp = reader.uint64();
          break;
        case 4:
          message.maxAllowedSwapLossRate = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 5:
          message.minSwapAmount = reader.string();
          break;
        case 6:
          message.maxSwapAmount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<TradeConfig>): TradeConfig {
    const message = createBaseTradeConfig();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.swapPrice = object.swapPrice ?? "";
    message.priceUpdateTimestamp = object.priceUpdateTimestamp !== undefined && object.priceUpdateTimestamp !== null ? BigInt(object.priceUpdateTimestamp.toString()) : BigInt(0);
    message.maxAllowedSwapLossRate = object.maxAllowedSwapLossRate ?? "";
    message.minSwapAmount = object.minSwapAmount ?? "";
    message.maxSwapAmount = object.maxSwapAmount ?? "";
    return message;
  },
  fromAmino(object: TradeConfigAmino): TradeConfig {
    const message = createBaseTradeConfig();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.swap_price !== undefined && object.swap_price !== null) {
      message.swapPrice = object.swap_price;
    }
    if (object.price_update_timestamp !== undefined && object.price_update_timestamp !== null) {
      message.priceUpdateTimestamp = BigInt(object.price_update_timestamp);
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
    return message;
  },
  toAmino(message: TradeConfig, useInterfaces: boolean = false): TradeConfigAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.swap_price = message.swapPrice === "" ? undefined : message.swapPrice;
    obj.price_update_timestamp = message.priceUpdateTimestamp !== BigInt(0) ? message.priceUpdateTimestamp.toString() : undefined;
    obj.max_allowed_swap_loss_rate = message.maxAllowedSwapLossRate === "" ? undefined : message.maxAllowedSwapLossRate;
    obj.min_swap_amount = message.minSwapAmount === "" ? undefined : message.minSwapAmount;
    obj.max_swap_amount = message.maxSwapAmount === "" ? undefined : message.maxSwapAmount;
    return obj;
  },
  fromAminoMsg(object: TradeConfigAminoMsg): TradeConfig {
    return TradeConfig.fromAmino(object.value);
  },
  fromProtoMsg(message: TradeConfigProtoMsg, useInterfaces: boolean = false): TradeConfig {
    return TradeConfig.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: TradeConfig): Uint8Array {
    return TradeConfig.encode(message).finish();
  },
  toProtoMsg(message: TradeConfig): TradeConfigProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.TradeConfig",
      value: TradeConfig.encode(message).finish()
    };
  }
};
function createBaseTradeRoute(): TradeRoute {
  return {
    rewardDenomOnHostZone: "",
    rewardDenomOnRewardZone: "",
    rewardDenomOnTradeZone: "",
    hostDenomOnTradeZone: "",
    hostDenomOnHostZone: "",
    hostAccount: ICAAccount.fromPartial({}),
    rewardAccount: ICAAccount.fromPartial({}),
    tradeAccount: ICAAccount.fromPartial({}),
    hostToRewardChannelId: "",
    rewardToTradeChannelId: "",
    tradeToHostChannelId: "",
    minTransferAmount: "",
    tradeConfig: TradeConfig.fromPartial({})
  };
}
export const TradeRoute = {
  typeUrl: "/stride.stakeibc.TradeRoute",
  encode(message: TradeRoute, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.rewardDenomOnHostZone !== "") {
      writer.uint32(10).string(message.rewardDenomOnHostZone);
    }
    if (message.rewardDenomOnRewardZone !== "") {
      writer.uint32(18).string(message.rewardDenomOnRewardZone);
    }
    if (message.rewardDenomOnTradeZone !== "") {
      writer.uint32(26).string(message.rewardDenomOnTradeZone);
    }
    if (message.hostDenomOnTradeZone !== "") {
      writer.uint32(34).string(message.hostDenomOnTradeZone);
    }
    if (message.hostDenomOnHostZone !== "") {
      writer.uint32(42).string(message.hostDenomOnHostZone);
    }
    if (message.hostAccount !== undefined) {
      ICAAccount.encode(message.hostAccount, writer.uint32(50).fork()).ldelim();
    }
    if (message.rewardAccount !== undefined) {
      ICAAccount.encode(message.rewardAccount, writer.uint32(58).fork()).ldelim();
    }
    if (message.tradeAccount !== undefined) {
      ICAAccount.encode(message.tradeAccount, writer.uint32(66).fork()).ldelim();
    }
    if (message.hostToRewardChannelId !== "") {
      writer.uint32(74).string(message.hostToRewardChannelId);
    }
    if (message.rewardToTradeChannelId !== "") {
      writer.uint32(82).string(message.rewardToTradeChannelId);
    }
    if (message.tradeToHostChannelId !== "") {
      writer.uint32(90).string(message.tradeToHostChannelId);
    }
    if (message.minTransferAmount !== "") {
      writer.uint32(106).string(message.minTransferAmount);
    }
    if (message.tradeConfig !== undefined) {
      TradeConfig.encode(message.tradeConfig, writer.uint32(98).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): TradeRoute {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTradeRoute();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rewardDenomOnHostZone = reader.string();
          break;
        case 2:
          message.rewardDenomOnRewardZone = reader.string();
          break;
        case 3:
          message.rewardDenomOnTradeZone = reader.string();
          break;
        case 4:
          message.hostDenomOnTradeZone = reader.string();
          break;
        case 5:
          message.hostDenomOnHostZone = reader.string();
          break;
        case 6:
          message.hostAccount = ICAAccount.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 7:
          message.rewardAccount = ICAAccount.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 8:
          message.tradeAccount = ICAAccount.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 9:
          message.hostToRewardChannelId = reader.string();
          break;
        case 10:
          message.rewardToTradeChannelId = reader.string();
          break;
        case 11:
          message.tradeToHostChannelId = reader.string();
          break;
        case 13:
          message.minTransferAmount = reader.string();
          break;
        case 12:
          message.tradeConfig = TradeConfig.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<TradeRoute>): TradeRoute {
    const message = createBaseTradeRoute();
    message.rewardDenomOnHostZone = object.rewardDenomOnHostZone ?? "";
    message.rewardDenomOnRewardZone = object.rewardDenomOnRewardZone ?? "";
    message.rewardDenomOnTradeZone = object.rewardDenomOnTradeZone ?? "";
    message.hostDenomOnTradeZone = object.hostDenomOnTradeZone ?? "";
    message.hostDenomOnHostZone = object.hostDenomOnHostZone ?? "";
    message.hostAccount = object.hostAccount !== undefined && object.hostAccount !== null ? ICAAccount.fromPartial(object.hostAccount) : undefined;
    message.rewardAccount = object.rewardAccount !== undefined && object.rewardAccount !== null ? ICAAccount.fromPartial(object.rewardAccount) : undefined;
    message.tradeAccount = object.tradeAccount !== undefined && object.tradeAccount !== null ? ICAAccount.fromPartial(object.tradeAccount) : undefined;
    message.hostToRewardChannelId = object.hostToRewardChannelId ?? "";
    message.rewardToTradeChannelId = object.rewardToTradeChannelId ?? "";
    message.tradeToHostChannelId = object.tradeToHostChannelId ?? "";
    message.minTransferAmount = object.minTransferAmount ?? "";
    message.tradeConfig = object.tradeConfig !== undefined && object.tradeConfig !== null ? TradeConfig.fromPartial(object.tradeConfig) : undefined;
    return message;
  },
  fromAmino(object: TradeRouteAmino): TradeRoute {
    const message = createBaseTradeRoute();
    if (object.reward_denom_on_host_zone !== undefined && object.reward_denom_on_host_zone !== null) {
      message.rewardDenomOnHostZone = object.reward_denom_on_host_zone;
    }
    if (object.reward_denom_on_reward_zone !== undefined && object.reward_denom_on_reward_zone !== null) {
      message.rewardDenomOnRewardZone = object.reward_denom_on_reward_zone;
    }
    if (object.reward_denom_on_trade_zone !== undefined && object.reward_denom_on_trade_zone !== null) {
      message.rewardDenomOnTradeZone = object.reward_denom_on_trade_zone;
    }
    if (object.host_denom_on_trade_zone !== undefined && object.host_denom_on_trade_zone !== null) {
      message.hostDenomOnTradeZone = object.host_denom_on_trade_zone;
    }
    if (object.host_denom_on_host_zone !== undefined && object.host_denom_on_host_zone !== null) {
      message.hostDenomOnHostZone = object.host_denom_on_host_zone;
    }
    if (object.host_account !== undefined && object.host_account !== null) {
      message.hostAccount = ICAAccount.fromAmino(object.host_account);
    }
    if (object.reward_account !== undefined && object.reward_account !== null) {
      message.rewardAccount = ICAAccount.fromAmino(object.reward_account);
    }
    if (object.trade_account !== undefined && object.trade_account !== null) {
      message.tradeAccount = ICAAccount.fromAmino(object.trade_account);
    }
    if (object.host_to_reward_channel_id !== undefined && object.host_to_reward_channel_id !== null) {
      message.hostToRewardChannelId = object.host_to_reward_channel_id;
    }
    if (object.reward_to_trade_channel_id !== undefined && object.reward_to_trade_channel_id !== null) {
      message.rewardToTradeChannelId = object.reward_to_trade_channel_id;
    }
    if (object.trade_to_host_channel_id !== undefined && object.trade_to_host_channel_id !== null) {
      message.tradeToHostChannelId = object.trade_to_host_channel_id;
    }
    if (object.min_transfer_amount !== undefined && object.min_transfer_amount !== null) {
      message.minTransferAmount = object.min_transfer_amount;
    }
    if (object.trade_config !== undefined && object.trade_config !== null) {
      message.tradeConfig = TradeConfig.fromAmino(object.trade_config);
    }
    return message;
  },
  toAmino(message: TradeRoute, useInterfaces: boolean = false): TradeRouteAmino {
    const obj: any = {};
    obj.reward_denom_on_host_zone = message.rewardDenomOnHostZone === "" ? undefined : message.rewardDenomOnHostZone;
    obj.reward_denom_on_reward_zone = message.rewardDenomOnRewardZone === "" ? undefined : message.rewardDenomOnRewardZone;
    obj.reward_denom_on_trade_zone = message.rewardDenomOnTradeZone === "" ? undefined : message.rewardDenomOnTradeZone;
    obj.host_denom_on_trade_zone = message.hostDenomOnTradeZone === "" ? undefined : message.hostDenomOnTradeZone;
    obj.host_denom_on_host_zone = message.hostDenomOnHostZone === "" ? undefined : message.hostDenomOnHostZone;
    obj.host_account = message.hostAccount ? ICAAccount.toAmino(message.hostAccount, useInterfaces) : undefined;
    obj.reward_account = message.rewardAccount ? ICAAccount.toAmino(message.rewardAccount, useInterfaces) : undefined;
    obj.trade_account = message.tradeAccount ? ICAAccount.toAmino(message.tradeAccount, useInterfaces) : undefined;
    obj.host_to_reward_channel_id = message.hostToRewardChannelId === "" ? undefined : message.hostToRewardChannelId;
    obj.reward_to_trade_channel_id = message.rewardToTradeChannelId === "" ? undefined : message.rewardToTradeChannelId;
    obj.trade_to_host_channel_id = message.tradeToHostChannelId === "" ? undefined : message.tradeToHostChannelId;
    obj.min_transfer_amount = message.minTransferAmount === "" ? undefined : message.minTransferAmount;
    obj.trade_config = message.tradeConfig ? TradeConfig.toAmino(message.tradeConfig, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: TradeRouteAminoMsg): TradeRoute {
    return TradeRoute.fromAmino(object.value);
  },
  fromProtoMsg(message: TradeRouteProtoMsg, useInterfaces: boolean = false): TradeRoute {
    return TradeRoute.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: TradeRoute): Uint8Array {
    return TradeRoute.encode(message).finish();
  },
  toProtoMsg(message: TradeRoute): TradeRouteProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.TradeRoute",
      value: TradeRoute.encode(message).finish()
    };
  }
};