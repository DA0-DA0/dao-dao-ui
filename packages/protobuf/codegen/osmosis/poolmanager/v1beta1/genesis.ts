//@ts-nocheck
import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { ModuleRoute, ModuleRouteAmino, ModuleRouteSDKType } from "./module_route";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { Decimal } from "@cosmjs/math";
/** Params holds parameters for the poolmanager module */
export interface Params {
  poolCreationFee: Coin[];
  /** taker_fee_params is the container of taker fee parameters. */
  takerFeeParams: TakerFeeParams | undefined;
  /**
   * authorized_quote_denoms is a list of quote denoms that can be used as
   * token1 when creating a concentrated pool. We limit the quote assets to a
   * small set for the purposes of having convinient price increments stemming
   * from tick to price conversion. These increments are in a human readable
   * magnitude only for token1 as a quote. For limit orders in the future, this
   * will be a desirable property in terms of UX as to allow users to set limit
   * orders at prices in terms of token1 (quote asset) that are easy to reason
   * about.
   */
  authorizedQuoteDenoms: string[];
}
export interface ParamsProtoMsg {
  typeUrl: "/osmosis.poolmanager.v1beta1.Params";
  value: Uint8Array;
}
/** Params holds parameters for the poolmanager module */
export interface ParamsAmino {
  pool_creation_fee: CoinAmino[];
  /** taker_fee_params is the container of taker fee parameters. */
  taker_fee_params?: TakerFeeParamsAmino | undefined;
  /**
   * authorized_quote_denoms is a list of quote denoms that can be used as
   * token1 when creating a concentrated pool. We limit the quote assets to a
   * small set for the purposes of having convinient price increments stemming
   * from tick to price conversion. These increments are in a human readable
   * magnitude only for token1 as a quote. For limit orders in the future, this
   * will be a desirable property in terms of UX as to allow users to set limit
   * orders at prices in terms of token1 (quote asset) that are easy to reason
   * about.
   */
  authorized_quote_denoms: string[];
}
export interface ParamsAminoMsg {
  type: "osmosis/poolmanager/params";
  value: ParamsAmino;
}
/** Params holds parameters for the poolmanager module */
export interface ParamsSDKType {
  pool_creation_fee: CoinSDKType[];
  taker_fee_params: TakerFeeParamsSDKType | undefined;
  authorized_quote_denoms: string[];
}
/** GenesisState defines the poolmanager module's genesis state. */
export interface GenesisState {
  /** the next_pool_id */
  nextPoolId: bigint;
  /** params is the container of poolmanager parameters. */
  params: Params | undefined;
  /** pool_routes is the container of the mappings from pool id to pool type. */
  poolRoutes: ModuleRoute[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/osmosis.poolmanager.v1beta1.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the poolmanager module's genesis state. */
export interface GenesisStateAmino {
  /** the next_pool_id */
  next_pool_id: string;
  /** params is the container of poolmanager parameters. */
  params?: ParamsAmino | undefined;
  /** pool_routes is the container of the mappings from pool id to pool type. */
  pool_routes: ModuleRouteAmino[];
}
export interface GenesisStateAminoMsg {
  type: "osmosis/poolmanager/genesis-state";
  value: GenesisStateAmino;
}
/** GenesisState defines the poolmanager module's genesis state. */
export interface GenesisStateSDKType {
  next_pool_id: bigint;
  params: ParamsSDKType | undefined;
  pool_routes: ModuleRouteSDKType[];
}
/** TakerFeeParams consolidates the taker fee parameters for the poolmanager. */
export interface TakerFeeParams {
  /**
   * default_taker_fee is the fee used when creating a new pool that doesn't
   * fall under a custom pool taker fee or stableswap taker fee category.
   */
  defaultTakerFee: string;
  /**
   * osmo_taker_fee_distribution defines the distribution of taker fees
   * generated in OSMO. As of this writing, it has two catagories:
   * - staking_rewards: the percent of the taker fee that gets distributed to
   *   stakers.
   * - community_pool: the percent of the taker fee that gets sent to the
   *   community pool.
   */
  osmoTakerFeeDistribution: TakerFeeDistributionPercentage | undefined;
  /**
   * non_osmo_taker_fee_distribution defines the distribution of taker fees
   * generated in non-OSMO. As of this writing, it has two categories:
   * - staking_rewards: the percent of the taker fee that gets swapped to OSMO
   *   and then distirbuted to stakers.
   * - community_pool: the percent of the taker fee that gets sent to the
   *   community pool. Note: If the non-OSMO asset is an authorized_quote_denom,
   *   that denom is sent directly to the community pool. Otherwise, it is
   *   swapped to the community_pool_denom_to_swap_non_whitelisted_assets_to and
   *   then sent to the community pool as that denom.
   */
  nonOsmoTakerFeeDistribution: TakerFeeDistributionPercentage | undefined;
  /**
   * admin_addresses is a list of addresses that are allowed to set and remove
   * custom taker fees for denom pairs. Governance also has the ability to set
   * and remove custom taker fees for denom pairs, but with the normal
   * governance delay.
   */
  adminAddresses: string[];
  /**
   * community_pool_denom_to_swap_non_whitelisted_assets_to is the denom that
   * non-whitelisted taker fees will be swapped to before being sent to
   * the community pool.
   */
  communityPoolDenomToSwapNonWhitelistedAssetsTo: string;
}
export interface TakerFeeParamsProtoMsg {
  typeUrl: "/osmosis.poolmanager.v1beta1.TakerFeeParams";
  value: Uint8Array;
}
/** TakerFeeParams consolidates the taker fee parameters for the poolmanager. */
export interface TakerFeeParamsAmino {
  /**
   * default_taker_fee is the fee used when creating a new pool that doesn't
   * fall under a custom pool taker fee or stableswap taker fee category.
   */
  default_taker_fee: string;
  /**
   * osmo_taker_fee_distribution defines the distribution of taker fees
   * generated in OSMO. As of this writing, it has two catagories:
   * - staking_rewards: the percent of the taker fee that gets distributed to
   *   stakers.
   * - community_pool: the percent of the taker fee that gets sent to the
   *   community pool.
   */
  osmo_taker_fee_distribution?: TakerFeeDistributionPercentageAmino | undefined;
  /**
   * non_osmo_taker_fee_distribution defines the distribution of taker fees
   * generated in non-OSMO. As of this writing, it has two categories:
   * - staking_rewards: the percent of the taker fee that gets swapped to OSMO
   *   and then distirbuted to stakers.
   * - community_pool: the percent of the taker fee that gets sent to the
   *   community pool. Note: If the non-OSMO asset is an authorized_quote_denom,
   *   that denom is sent directly to the community pool. Otherwise, it is
   *   swapped to the community_pool_denom_to_swap_non_whitelisted_assets_to and
   *   then sent to the community pool as that denom.
   */
  non_osmo_taker_fee_distribution?: TakerFeeDistributionPercentageAmino | undefined;
  /**
   * admin_addresses is a list of addresses that are allowed to set and remove
   * custom taker fees for denom pairs. Governance also has the ability to set
   * and remove custom taker fees for denom pairs, but with the normal
   * governance delay.
   */
  admin_addresses: string[];
  /**
   * community_pool_denom_to_swap_non_whitelisted_assets_to is the denom that
   * non-whitelisted taker fees will be swapped to before being sent to
   * the community pool.
   */
  community_pool_denom_to_swap_non_whitelisted_assets_to: string;
}
export interface TakerFeeParamsAminoMsg {
  type: "osmosis/poolmanager/taker-fee-params";
  value: TakerFeeParamsAmino;
}
/** TakerFeeParams consolidates the taker fee parameters for the poolmanager. */
export interface TakerFeeParamsSDKType {
  default_taker_fee: string;
  osmo_taker_fee_distribution: TakerFeeDistributionPercentageSDKType | undefined;
  non_osmo_taker_fee_distribution: TakerFeeDistributionPercentageSDKType | undefined;
  admin_addresses: string[];
  community_pool_denom_to_swap_non_whitelisted_assets_to: string;
}
/**
 * TakerFeeDistributionPercentage defines what percent of the taker fee category
 * gets distributed to the available categories.
 */
export interface TakerFeeDistributionPercentage {
  stakingRewards: string;
  communityPool: string;
}
export interface TakerFeeDistributionPercentageProtoMsg {
  typeUrl: "/osmosis.poolmanager.v1beta1.TakerFeeDistributionPercentage";
  value: Uint8Array;
}
/**
 * TakerFeeDistributionPercentage defines what percent of the taker fee category
 * gets distributed to the available categories.
 */
export interface TakerFeeDistributionPercentageAmino {
  staking_rewards: string;
  community_pool: string;
}
export interface TakerFeeDistributionPercentageAminoMsg {
  type: "osmosis/poolmanager/taker-fee-distribution-percentage";
  value: TakerFeeDistributionPercentageAmino;
}
/**
 * TakerFeeDistributionPercentage defines what percent of the taker fee category
 * gets distributed to the available categories.
 */
export interface TakerFeeDistributionPercentageSDKType {
  staking_rewards: string;
  community_pool: string;
}
function createBaseParams(): Params {
  return {
    poolCreationFee: [],
    takerFeeParams: TakerFeeParams.fromPartial({}),
    authorizedQuoteDenoms: []
  };
}
export const Params = {
  typeUrl: "/osmosis.poolmanager.v1beta1.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.poolCreationFee) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.takerFeeParams !== undefined) {
      TakerFeeParams.encode(message.takerFeeParams, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.authorizedQuoteDenoms) {
      writer.uint32(26).string(v!);
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
        case 1:
          message.poolCreationFee.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
          message.takerFeeParams = TakerFeeParams.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.authorizedQuoteDenoms.push(reader.string());
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
    message.poolCreationFee = object.poolCreationFee?.map(e => Coin.fromPartial(e)) || [];
    message.takerFeeParams = object.takerFeeParams !== undefined && object.takerFeeParams !== null ? TakerFeeParams.fromPartial(object.takerFeeParams) : undefined;
    message.authorizedQuoteDenoms = object.authorizedQuoteDenoms?.map(e => e) || [];
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    return {
      poolCreationFee: Array.isArray(object?.pool_creation_fee) ? object.pool_creation_fee.map((e: any) => Coin.fromAmino(e)) : [],
      takerFeeParams: object?.taker_fee_params ? TakerFeeParams.fromAmino(object.taker_fee_params) : undefined,
      authorizedQuoteDenoms: Array.isArray(object?.authorized_quote_denoms) ? object.authorized_quote_denoms.map((e: any) => e) : []
    };
  },
  toAmino(message: Params, useInterfaces: boolean = false): ParamsAmino {
    const obj: any = {};
    if (message.poolCreationFee) {
      obj.pool_creation_fee = message.poolCreationFee.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.pool_creation_fee = [];
    }
    obj.taker_fee_params = message.takerFeeParams ? TakerFeeParams.toAmino(message.takerFeeParams, useInterfaces) : undefined;
    if (message.authorizedQuoteDenoms) {
      obj.authorized_quote_denoms = message.authorizedQuoteDenoms.map(e => e);
    } else {
      obj.authorized_quote_denoms = [];
    }
    return obj;
  },
  fromAminoMsg(object: ParamsAminoMsg): Params {
    return Params.fromAmino(object.value);
  },
  toAminoMsg(message: Params, useInterfaces: boolean = false): ParamsAminoMsg {
    return {
      type: "osmosis/poolmanager/params",
      value: Params.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: ParamsProtoMsg, useInterfaces: boolean = false): Params {
    return Params.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Params): Uint8Array {
    return Params.encode(message).finish();
  },
  toProtoMsg(message: Params): ParamsProtoMsg {
    return {
      typeUrl: "/osmosis.poolmanager.v1beta1.Params",
      value: Params.encode(message).finish()
    };
  }
};
function createBaseGenesisState(): GenesisState {
  return {
    nextPoolId: BigInt(0),
    params: Params.fromPartial({}),
    poolRoutes: []
  };
}
export const GenesisState = {
  typeUrl: "/osmosis.poolmanager.v1beta1.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.nextPoolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.nextPoolId);
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.poolRoutes) {
      ModuleRoute.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): GenesisState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nextPoolId = reader.uint64();
          break;
        case 2:
          message.params = Params.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.poolRoutes.push(ModuleRoute.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<GenesisState>): GenesisState {
    const message = createBaseGenesisState();
    message.nextPoolId = object.nextPoolId !== undefined && object.nextPoolId !== null ? BigInt(object.nextPoolId.toString()) : BigInt(0);
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    message.poolRoutes = object.poolRoutes?.map(e => ModuleRoute.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    return {
      nextPoolId: BigInt(object.next_pool_id),
      params: object?.params ? Params.fromAmino(object.params) : undefined,
      poolRoutes: Array.isArray(object?.pool_routes) ? object.pool_routes.map((e: any) => ModuleRoute.fromAmino(e)) : []
    };
  },
  toAmino(message: GenesisState, useInterfaces: boolean = false): GenesisStateAmino {
    const obj: any = {};
    obj.next_pool_id = message.nextPoolId ? message.nextPoolId.toString() : undefined;
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
    if (message.poolRoutes) {
      obj.pool_routes = message.poolRoutes.map(e => e ? ModuleRoute.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.pool_routes = [];
    }
    return obj;
  },
  fromAminoMsg(object: GenesisStateAminoMsg): GenesisState {
    return GenesisState.fromAmino(object.value);
  },
  toAminoMsg(message: GenesisState, useInterfaces: boolean = false): GenesisStateAminoMsg {
    return {
      type: "osmosis/poolmanager/genesis-state",
      value: GenesisState.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: GenesisStateProtoMsg, useInterfaces: boolean = false): GenesisState {
    return GenesisState.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: GenesisState): Uint8Array {
    return GenesisState.encode(message).finish();
  },
  toProtoMsg(message: GenesisState): GenesisStateProtoMsg {
    return {
      typeUrl: "/osmosis.poolmanager.v1beta1.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};
function createBaseTakerFeeParams(): TakerFeeParams {
  return {
    defaultTakerFee: "",
    osmoTakerFeeDistribution: TakerFeeDistributionPercentage.fromPartial({}),
    nonOsmoTakerFeeDistribution: TakerFeeDistributionPercentage.fromPartial({}),
    adminAddresses: [],
    communityPoolDenomToSwapNonWhitelistedAssetsTo: ""
  };
}
export const TakerFeeParams = {
  typeUrl: "/osmosis.poolmanager.v1beta1.TakerFeeParams",
  encode(message: TakerFeeParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.defaultTakerFee !== "") {
      writer.uint32(10).string(Decimal.fromUserInput(message.defaultTakerFee, 18).atomics);
    }
    if (message.osmoTakerFeeDistribution !== undefined) {
      TakerFeeDistributionPercentage.encode(message.osmoTakerFeeDistribution, writer.uint32(18).fork()).ldelim();
    }
    if (message.nonOsmoTakerFeeDistribution !== undefined) {
      TakerFeeDistributionPercentage.encode(message.nonOsmoTakerFeeDistribution, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.adminAddresses) {
      writer.uint32(34).string(v!);
    }
    if (message.communityPoolDenomToSwapNonWhitelistedAssetsTo !== "") {
      writer.uint32(42).string(message.communityPoolDenomToSwapNonWhitelistedAssetsTo);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): TakerFeeParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTakerFeeParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.defaultTakerFee = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 2:
          message.osmoTakerFeeDistribution = TakerFeeDistributionPercentage.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.nonOsmoTakerFeeDistribution = TakerFeeDistributionPercentage.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 4:
          message.adminAddresses.push(reader.string());
          break;
        case 5:
          message.communityPoolDenomToSwapNonWhitelistedAssetsTo = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<TakerFeeParams>): TakerFeeParams {
    const message = createBaseTakerFeeParams();
    message.defaultTakerFee = object.defaultTakerFee ?? "";
    message.osmoTakerFeeDistribution = object.osmoTakerFeeDistribution !== undefined && object.osmoTakerFeeDistribution !== null ? TakerFeeDistributionPercentage.fromPartial(object.osmoTakerFeeDistribution) : undefined;
    message.nonOsmoTakerFeeDistribution = object.nonOsmoTakerFeeDistribution !== undefined && object.nonOsmoTakerFeeDistribution !== null ? TakerFeeDistributionPercentage.fromPartial(object.nonOsmoTakerFeeDistribution) : undefined;
    message.adminAddresses = object.adminAddresses?.map(e => e) || [];
    message.communityPoolDenomToSwapNonWhitelistedAssetsTo = object.communityPoolDenomToSwapNonWhitelistedAssetsTo ?? "";
    return message;
  },
  fromAmino(object: TakerFeeParamsAmino): TakerFeeParams {
    return {
      defaultTakerFee: object.default_taker_fee,
      osmoTakerFeeDistribution: object?.osmo_taker_fee_distribution ? TakerFeeDistributionPercentage.fromAmino(object.osmo_taker_fee_distribution) : undefined,
      nonOsmoTakerFeeDistribution: object?.non_osmo_taker_fee_distribution ? TakerFeeDistributionPercentage.fromAmino(object.non_osmo_taker_fee_distribution) : undefined,
      adminAddresses: Array.isArray(object?.admin_addresses) ? object.admin_addresses.map((e: any) => e) : [],
      communityPoolDenomToSwapNonWhitelistedAssetsTo: object.community_pool_denom_to_swap_non_whitelisted_assets_to
    };
  },
  toAmino(message: TakerFeeParams, useInterfaces: boolean = false): TakerFeeParamsAmino {
    const obj: any = {};
    obj.default_taker_fee = message.defaultTakerFee;
    obj.osmo_taker_fee_distribution = message.osmoTakerFeeDistribution ? TakerFeeDistributionPercentage.toAmino(message.osmoTakerFeeDistribution, useInterfaces) : undefined;
    obj.non_osmo_taker_fee_distribution = message.nonOsmoTakerFeeDistribution ? TakerFeeDistributionPercentage.toAmino(message.nonOsmoTakerFeeDistribution, useInterfaces) : undefined;
    if (message.adminAddresses) {
      obj.admin_addresses = message.adminAddresses.map(e => e);
    } else {
      obj.admin_addresses = [];
    }
    obj.community_pool_denom_to_swap_non_whitelisted_assets_to = message.communityPoolDenomToSwapNonWhitelistedAssetsTo;
    return obj;
  },
  fromAminoMsg(object: TakerFeeParamsAminoMsg): TakerFeeParams {
    return TakerFeeParams.fromAmino(object.value);
  },
  toAminoMsg(message: TakerFeeParams, useInterfaces: boolean = false): TakerFeeParamsAminoMsg {
    return {
      type: "osmosis/poolmanager/taker-fee-params",
      value: TakerFeeParams.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: TakerFeeParamsProtoMsg, useInterfaces: boolean = false): TakerFeeParams {
    return TakerFeeParams.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: TakerFeeParams): Uint8Array {
    return TakerFeeParams.encode(message).finish();
  },
  toProtoMsg(message: TakerFeeParams): TakerFeeParamsProtoMsg {
    return {
      typeUrl: "/osmosis.poolmanager.v1beta1.TakerFeeParams",
      value: TakerFeeParams.encode(message).finish()
    };
  }
};
function createBaseTakerFeeDistributionPercentage(): TakerFeeDistributionPercentage {
  return {
    stakingRewards: "",
    communityPool: ""
  };
}
export const TakerFeeDistributionPercentage = {
  typeUrl: "/osmosis.poolmanager.v1beta1.TakerFeeDistributionPercentage",
  encode(message: TakerFeeDistributionPercentage, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.stakingRewards !== "") {
      writer.uint32(10).string(Decimal.fromUserInput(message.stakingRewards, 18).atomics);
    }
    if (message.communityPool !== "") {
      writer.uint32(18).string(Decimal.fromUserInput(message.communityPool, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): TakerFeeDistributionPercentage {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTakerFeeDistributionPercentage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.stakingRewards = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 2:
          message.communityPool = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<TakerFeeDistributionPercentage>): TakerFeeDistributionPercentage {
    const message = createBaseTakerFeeDistributionPercentage();
    message.stakingRewards = object.stakingRewards ?? "";
    message.communityPool = object.communityPool ?? "";
    return message;
  },
  fromAmino(object: TakerFeeDistributionPercentageAmino): TakerFeeDistributionPercentage {
    return {
      stakingRewards: object.staking_rewards,
      communityPool: object.community_pool
    };
  },
  toAmino(message: TakerFeeDistributionPercentage, useInterfaces: boolean = false): TakerFeeDistributionPercentageAmino {
    const obj: any = {};
    obj.staking_rewards = message.stakingRewards;
    obj.community_pool = message.communityPool;
    return obj;
  },
  fromAminoMsg(object: TakerFeeDistributionPercentageAminoMsg): TakerFeeDistributionPercentage {
    return TakerFeeDistributionPercentage.fromAmino(object.value);
  },
  toAminoMsg(message: TakerFeeDistributionPercentage, useInterfaces: boolean = false): TakerFeeDistributionPercentageAminoMsg {
    return {
      type: "osmosis/poolmanager/taker-fee-distribution-percentage",
      value: TakerFeeDistributionPercentage.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: TakerFeeDistributionPercentageProtoMsg, useInterfaces: boolean = false): TakerFeeDistributionPercentage {
    return TakerFeeDistributionPercentage.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: TakerFeeDistributionPercentage): Uint8Array {
    return TakerFeeDistributionPercentage.encode(message).finish();
  },
  toProtoMsg(message: TakerFeeDistributionPercentage): TakerFeeDistributionPercentageProtoMsg {
    return {
      typeUrl: "/osmosis.poolmanager.v1beta1.TakerFeeDistributionPercentage",
      value: TakerFeeDistributionPercentage.encode(message).finish()
    };
  }
};