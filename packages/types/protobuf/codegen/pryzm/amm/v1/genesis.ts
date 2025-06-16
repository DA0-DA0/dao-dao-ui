//@ts-nocheck
import { Pool, PoolAmino, PoolSDKType } from "./pool";
import { PoolToken, PoolTokenAmino, PoolTokenSDKType } from "./pool_token";
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { WeightedPoolProperties, WeightedPoolPropertiesAmino, WeightedPoolPropertiesSDKType } from "./weighted_token";
import { TemporalVirtualBalancePoolToken, TemporalVirtualBalancePoolTokenAmino, TemporalVirtualBalancePoolTokenSDKType, PermanentVirtualBalancePoolToken, PermanentVirtualBalancePoolTokenAmino, PermanentVirtualBalancePoolTokenSDKType } from "./virtual_balance_pool_token";
import { YammConfiguration, YammConfigurationAmino, YammConfigurationSDKType } from "./yamm_configuration";
import { WhitelistedRoute, WhitelistedRouteAmino, WhitelistedRouteSDKType } from "./whitelisted_route";
import { Order, OrderAmino, OrderSDKType, DisabledOrderPair, DisabledOrderPairAmino, DisabledOrderPairSDKType } from "./order";
import { ScheduleOrder, ScheduleOrderAmino, ScheduleOrderSDKType } from "./schedule_order";
import { OraclePricePair, OraclePricePairAmino, OraclePricePairSDKType } from "./oracle_price_pair";
import { PendingTokenIntroduction, PendingTokenIntroductionAmino, PendingTokenIntroductionSDKType } from "./pending_token_introduction";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { bytesFromBase64, base64FromBytes } from "../../../helpers";
export interface GenesisPoolData {
  pool: Pool | undefined;
  totalLpTokenSupply: string;
  poolTokenList: PoolToken[];
}
export interface GenesisPoolDataProtoMsg {
  typeUrl: "/pryzm.amm.v1.GenesisPoolData";
  value: Uint8Array;
}
export interface GenesisPoolDataAmino {
  pool?: PoolAmino | undefined;
  total_lp_token_supply?: string;
  pool_token_list?: PoolTokenAmino[];
}
export interface GenesisPoolDataAminoMsg {
  type: "/pryzm.amm.v1.GenesisPoolData";
  value: GenesisPoolDataAmino;
}
export interface GenesisPoolDataSDKType {
  pool: PoolSDKType | undefined;
  total_lp_token_supply: string;
  pool_token_list: PoolTokenSDKType[];
}
export interface YammPoolAssetId {
  poolId: bigint;
  assetId: string;
}
export interface YammPoolAssetIdProtoMsg {
  typeUrl: "/pryzm.amm.v1.YammPoolAssetId";
  value: Uint8Array;
}
export interface YammPoolAssetIdAmino {
  pool_id?: string;
  asset_id?: string;
}
export interface YammPoolAssetIdAminoMsg {
  type: "/pryzm.amm.v1.YammPoolAssetId";
  value: YammPoolAssetIdAmino;
}
export interface YammPoolAssetIdSDKType {
  pool_id: bigint;
  asset_id: string;
}
/** GenesisState defines the amm module's genesis state. */
export interface GenesisState {
  params: Params | undefined;
  poolList: GenesisPoolData[];
  weightedPoolPropertiesList: WeightedPoolProperties[];
  yammPoolAssetIdList: YammPoolAssetId[];
  introducingPoolTokenList: TemporalVirtualBalancePoolToken[];
  expiringPoolTokenList: TemporalVirtualBalancePoolToken[];
  yammConfigurationList: YammConfiguration[];
  whitelistedRouteList: WhitelistedRoute[];
  orderList: Order[];
  orderCount: bigint;
  executableOrderList: bigint[];
  scheduleOrderList: ScheduleOrder[];
  vaultPaused: boolean;
  oraclePricePairList: OraclePricePair[];
  pendingTokenIntroductionList: PendingTokenIntroduction[];
  disabledOrderPairList: DisabledOrderPair[];
  nextExecutableOrderKey: Uint8Array;
  permanentVirtualBalancePoolTokenList: PermanentVirtualBalancePoolToken[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/pryzm.amm.v1.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the amm module's genesis state. */
export interface GenesisStateAmino {
  params?: ParamsAmino | undefined;
  pool_list?: GenesisPoolDataAmino[];
  weighted_pool_properties_list?: WeightedPoolPropertiesAmino[];
  yamm_pool_asset_id_list?: YammPoolAssetIdAmino[];
  introducing_pool_token_list?: TemporalVirtualBalancePoolTokenAmino[];
  expiring_pool_token_list?: TemporalVirtualBalancePoolTokenAmino[];
  yamm_configuration_list?: YammConfigurationAmino[];
  whitelisted_route_list?: WhitelistedRouteAmino[];
  order_list?: OrderAmino[];
  order_count?: string;
  executable_order_list?: string[];
  schedule_order_list?: ScheduleOrderAmino[];
  vault_paused?: boolean;
  oracle_price_pair_list?: OraclePricePairAmino[];
  pending_token_introduction_list?: PendingTokenIntroductionAmino[];
  disabled_order_pair_list?: DisabledOrderPairAmino[];
  next_executable_order_key?: string;
  permanent_virtual_balance_pool_token_list?: PermanentVirtualBalancePoolTokenAmino[];
}
export interface GenesisStateAminoMsg {
  type: "/pryzm.amm.v1.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the amm module's genesis state. */
export interface GenesisStateSDKType {
  params: ParamsSDKType | undefined;
  pool_list: GenesisPoolDataSDKType[];
  weighted_pool_properties_list: WeightedPoolPropertiesSDKType[];
  yamm_pool_asset_id_list: YammPoolAssetIdSDKType[];
  introducing_pool_token_list: TemporalVirtualBalancePoolTokenSDKType[];
  expiring_pool_token_list: TemporalVirtualBalancePoolTokenSDKType[];
  yamm_configuration_list: YammConfigurationSDKType[];
  whitelisted_route_list: WhitelistedRouteSDKType[];
  order_list: OrderSDKType[];
  order_count: bigint;
  executable_order_list: bigint[];
  schedule_order_list: ScheduleOrderSDKType[];
  vault_paused: boolean;
  oracle_price_pair_list: OraclePricePairSDKType[];
  pending_token_introduction_list: PendingTokenIntroductionSDKType[];
  disabled_order_pair_list: DisabledOrderPairSDKType[];
  next_executable_order_key: Uint8Array;
  permanent_virtual_balance_pool_token_list: PermanentVirtualBalancePoolTokenSDKType[];
}
function createBaseGenesisPoolData(): GenesisPoolData {
  return {
    pool: Pool.fromPartial({}),
    totalLpTokenSupply: "",
    poolTokenList: []
  };
}
export const GenesisPoolData = {
  typeUrl: "/pryzm.amm.v1.GenesisPoolData",
  encode(message: GenesisPoolData, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pool !== undefined) {
      Pool.encode(message.pool, writer.uint32(10).fork()).ldelim();
    }
    if (message.totalLpTokenSupply !== "") {
      writer.uint32(18).string(message.totalLpTokenSupply);
    }
    for (const v of message.poolTokenList) {
      PoolToken.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): GenesisPoolData {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisPoolData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pool = Pool.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.totalLpTokenSupply = reader.string();
          break;
        case 3:
          message.poolTokenList.push(PoolToken.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<GenesisPoolData>): GenesisPoolData {
    const message = createBaseGenesisPoolData();
    message.pool = object.pool !== undefined && object.pool !== null ? Pool.fromPartial(object.pool) : undefined;
    message.totalLpTokenSupply = object.totalLpTokenSupply ?? "";
    message.poolTokenList = object.poolTokenList?.map(e => PoolToken.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: GenesisPoolDataAmino): GenesisPoolData {
    const message = createBaseGenesisPoolData();
    if (object.pool !== undefined && object.pool !== null) {
      message.pool = Pool.fromAmino(object.pool);
    }
    if (object.total_lp_token_supply !== undefined && object.total_lp_token_supply !== null) {
      message.totalLpTokenSupply = object.total_lp_token_supply;
    }
    message.poolTokenList = object.pool_token_list?.map(e => PoolToken.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: GenesisPoolData, useInterfaces: boolean = false): GenesisPoolDataAmino {
    const obj: any = {};
    obj.pool = message.pool ? Pool.toAmino(message.pool, useInterfaces) : undefined;
    obj.total_lp_token_supply = message.totalLpTokenSupply === "" ? undefined : message.totalLpTokenSupply;
    if (message.poolTokenList) {
      obj.pool_token_list = message.poolTokenList.map(e => e ? PoolToken.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.pool_token_list = message.poolTokenList;
    }
    return obj;
  },
  fromAminoMsg(object: GenesisPoolDataAminoMsg): GenesisPoolData {
    return GenesisPoolData.fromAmino(object.value);
  },
  fromProtoMsg(message: GenesisPoolDataProtoMsg, useInterfaces: boolean = false): GenesisPoolData {
    return GenesisPoolData.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: GenesisPoolData): Uint8Array {
    return GenesisPoolData.encode(message).finish();
  },
  toProtoMsg(message: GenesisPoolData): GenesisPoolDataProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.GenesisPoolData",
      value: GenesisPoolData.encode(message).finish()
    };
  }
};
function createBaseYammPoolAssetId(): YammPoolAssetId {
  return {
    poolId: BigInt(0),
    assetId: ""
  };
}
export const YammPoolAssetId = {
  typeUrl: "/pryzm.amm.v1.YammPoolAssetId",
  encode(message: YammPoolAssetId, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.assetId !== "") {
      writer.uint32(18).string(message.assetId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): YammPoolAssetId {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseYammPoolAssetId();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.uint64();
          break;
        case 2:
          message.assetId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<YammPoolAssetId>): YammPoolAssetId {
    const message = createBaseYammPoolAssetId();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.assetId = object.assetId ?? "";
    return message;
  },
  fromAmino(object: YammPoolAssetIdAmino): YammPoolAssetId {
    const message = createBaseYammPoolAssetId();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.asset_id !== undefined && object.asset_id !== null) {
      message.assetId = object.asset_id;
    }
    return message;
  },
  toAmino(message: YammPoolAssetId, useInterfaces: boolean = false): YammPoolAssetIdAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.asset_id = message.assetId === "" ? undefined : message.assetId;
    return obj;
  },
  fromAminoMsg(object: YammPoolAssetIdAminoMsg): YammPoolAssetId {
    return YammPoolAssetId.fromAmino(object.value);
  },
  fromProtoMsg(message: YammPoolAssetIdProtoMsg, useInterfaces: boolean = false): YammPoolAssetId {
    return YammPoolAssetId.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: YammPoolAssetId): Uint8Array {
    return YammPoolAssetId.encode(message).finish();
  },
  toProtoMsg(message: YammPoolAssetId): YammPoolAssetIdProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.YammPoolAssetId",
      value: YammPoolAssetId.encode(message).finish()
    };
  }
};
function createBaseGenesisState(): GenesisState {
  return {
    params: Params.fromPartial({}),
    poolList: [],
    weightedPoolPropertiesList: [],
    yammPoolAssetIdList: [],
    introducingPoolTokenList: [],
    expiringPoolTokenList: [],
    yammConfigurationList: [],
    whitelistedRouteList: [],
    orderList: [],
    orderCount: BigInt(0),
    executableOrderList: [],
    scheduleOrderList: [],
    vaultPaused: false,
    oraclePricePairList: [],
    pendingTokenIntroductionList: [],
    disabledOrderPairList: [],
    nextExecutableOrderKey: new Uint8Array(),
    permanentVirtualBalancePoolTokenList: []
  };
}
export const GenesisState = {
  typeUrl: "/pryzm.amm.v1.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.poolList) {
      GenesisPoolData.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.weightedPoolPropertiesList) {
      WeightedPoolProperties.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.yammPoolAssetIdList) {
      YammPoolAssetId.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.introducingPoolTokenList) {
      TemporalVirtualBalancePoolToken.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.expiringPoolTokenList) {
      TemporalVirtualBalancePoolToken.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.yammConfigurationList) {
      YammConfiguration.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    for (const v of message.whitelistedRouteList) {
      WhitelistedRoute.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    for (const v of message.orderList) {
      Order.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    if (message.orderCount !== BigInt(0)) {
      writer.uint32(80).uint64(message.orderCount);
    }
    writer.uint32(90).fork();
    for (const v of message.executableOrderList) {
      writer.uint64(v);
    }
    writer.ldelim();
    for (const v of message.scheduleOrderList) {
      ScheduleOrder.encode(v!, writer.uint32(98).fork()).ldelim();
    }
    if (message.vaultPaused === true) {
      writer.uint32(104).bool(message.vaultPaused);
    }
    for (const v of message.oraclePricePairList) {
      OraclePricePair.encode(v!, writer.uint32(114).fork()).ldelim();
    }
    for (const v of message.pendingTokenIntroductionList) {
      PendingTokenIntroduction.encode(v!, writer.uint32(122).fork()).ldelim();
    }
    for (const v of message.disabledOrderPairList) {
      DisabledOrderPair.encode(v!, writer.uint32(130).fork()).ldelim();
    }
    if (message.nextExecutableOrderKey.length !== 0) {
      writer.uint32(138).bytes(message.nextExecutableOrderKey);
    }
    for (const v of message.permanentVirtualBalancePoolTokenList) {
      PermanentVirtualBalancePoolToken.encode(v!, writer.uint32(146).fork()).ldelim();
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
          message.params = Params.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.poolList.push(GenesisPoolData.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 3:
          message.weightedPoolPropertiesList.push(WeightedPoolProperties.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 4:
          message.yammPoolAssetIdList.push(YammPoolAssetId.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 5:
          message.introducingPoolTokenList.push(TemporalVirtualBalancePoolToken.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 6:
          message.expiringPoolTokenList.push(TemporalVirtualBalancePoolToken.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 7:
          message.yammConfigurationList.push(YammConfiguration.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 8:
          message.whitelistedRouteList.push(WhitelistedRoute.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 9:
          message.orderList.push(Order.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 10:
          message.orderCount = reader.uint64();
          break;
        case 11:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.executableOrderList.push(reader.uint64());
            }
          } else {
            message.executableOrderList.push(reader.uint64());
          }
          break;
        case 12:
          message.scheduleOrderList.push(ScheduleOrder.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 13:
          message.vaultPaused = reader.bool();
          break;
        case 14:
          message.oraclePricePairList.push(OraclePricePair.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 15:
          message.pendingTokenIntroductionList.push(PendingTokenIntroduction.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 16:
          message.disabledOrderPairList.push(DisabledOrderPair.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 17:
          message.nextExecutableOrderKey = reader.bytes();
          break;
        case 18:
          message.permanentVirtualBalancePoolTokenList.push(PermanentVirtualBalancePoolToken.decode(reader, reader.uint32(), useInterfaces));
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
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    message.poolList = object.poolList?.map(e => GenesisPoolData.fromPartial(e)) || [];
    message.weightedPoolPropertiesList = object.weightedPoolPropertiesList?.map(e => WeightedPoolProperties.fromPartial(e)) || [];
    message.yammPoolAssetIdList = object.yammPoolAssetIdList?.map(e => YammPoolAssetId.fromPartial(e)) || [];
    message.introducingPoolTokenList = object.introducingPoolTokenList?.map(e => TemporalVirtualBalancePoolToken.fromPartial(e)) || [];
    message.expiringPoolTokenList = object.expiringPoolTokenList?.map(e => TemporalVirtualBalancePoolToken.fromPartial(e)) || [];
    message.yammConfigurationList = object.yammConfigurationList?.map(e => YammConfiguration.fromPartial(e)) || [];
    message.whitelistedRouteList = object.whitelistedRouteList?.map(e => WhitelistedRoute.fromPartial(e)) || [];
    message.orderList = object.orderList?.map(e => Order.fromPartial(e)) || [];
    message.orderCount = object.orderCount !== undefined && object.orderCount !== null ? BigInt(object.orderCount.toString()) : BigInt(0);
    message.executableOrderList = object.executableOrderList?.map(e => BigInt(e.toString())) || [];
    message.scheduleOrderList = object.scheduleOrderList?.map(e => ScheduleOrder.fromPartial(e)) || [];
    message.vaultPaused = object.vaultPaused ?? false;
    message.oraclePricePairList = object.oraclePricePairList?.map(e => OraclePricePair.fromPartial(e)) || [];
    message.pendingTokenIntroductionList = object.pendingTokenIntroductionList?.map(e => PendingTokenIntroduction.fromPartial(e)) || [];
    message.disabledOrderPairList = object.disabledOrderPairList?.map(e => DisabledOrderPair.fromPartial(e)) || [];
    message.nextExecutableOrderKey = object.nextExecutableOrderKey ?? new Uint8Array();
    message.permanentVirtualBalancePoolTokenList = object.permanentVirtualBalancePoolTokenList?.map(e => PermanentVirtualBalancePoolToken.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    message.poolList = object.pool_list?.map(e => GenesisPoolData.fromAmino(e)) || [];
    message.weightedPoolPropertiesList = object.weighted_pool_properties_list?.map(e => WeightedPoolProperties.fromAmino(e)) || [];
    message.yammPoolAssetIdList = object.yamm_pool_asset_id_list?.map(e => YammPoolAssetId.fromAmino(e)) || [];
    message.introducingPoolTokenList = object.introducing_pool_token_list?.map(e => TemporalVirtualBalancePoolToken.fromAmino(e)) || [];
    message.expiringPoolTokenList = object.expiring_pool_token_list?.map(e => TemporalVirtualBalancePoolToken.fromAmino(e)) || [];
    message.yammConfigurationList = object.yamm_configuration_list?.map(e => YammConfiguration.fromAmino(e)) || [];
    message.whitelistedRouteList = object.whitelisted_route_list?.map(e => WhitelistedRoute.fromAmino(e)) || [];
    message.orderList = object.order_list?.map(e => Order.fromAmino(e)) || [];
    if (object.order_count !== undefined && object.order_count !== null) {
      message.orderCount = BigInt(object.order_count);
    }
    message.executableOrderList = object.executable_order_list?.map(e => BigInt(e)) || [];
    message.scheduleOrderList = object.schedule_order_list?.map(e => ScheduleOrder.fromAmino(e)) || [];
    if (object.vault_paused !== undefined && object.vault_paused !== null) {
      message.vaultPaused = object.vault_paused;
    }
    message.oraclePricePairList = object.oracle_price_pair_list?.map(e => OraclePricePair.fromAmino(e)) || [];
    message.pendingTokenIntroductionList = object.pending_token_introduction_list?.map(e => PendingTokenIntroduction.fromAmino(e)) || [];
    message.disabledOrderPairList = object.disabled_order_pair_list?.map(e => DisabledOrderPair.fromAmino(e)) || [];
    if (object.next_executable_order_key !== undefined && object.next_executable_order_key !== null) {
      message.nextExecutableOrderKey = bytesFromBase64(object.next_executable_order_key);
    }
    message.permanentVirtualBalancePoolTokenList = object.permanent_virtual_balance_pool_token_list?.map(e => PermanentVirtualBalancePoolToken.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: GenesisState, useInterfaces: boolean = false): GenesisStateAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
    if (message.poolList) {
      obj.pool_list = message.poolList.map(e => e ? GenesisPoolData.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.pool_list = message.poolList;
    }
    if (message.weightedPoolPropertiesList) {
      obj.weighted_pool_properties_list = message.weightedPoolPropertiesList.map(e => e ? WeightedPoolProperties.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.weighted_pool_properties_list = message.weightedPoolPropertiesList;
    }
    if (message.yammPoolAssetIdList) {
      obj.yamm_pool_asset_id_list = message.yammPoolAssetIdList.map(e => e ? YammPoolAssetId.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.yamm_pool_asset_id_list = message.yammPoolAssetIdList;
    }
    if (message.introducingPoolTokenList) {
      obj.introducing_pool_token_list = message.introducingPoolTokenList.map(e => e ? TemporalVirtualBalancePoolToken.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.introducing_pool_token_list = message.introducingPoolTokenList;
    }
    if (message.expiringPoolTokenList) {
      obj.expiring_pool_token_list = message.expiringPoolTokenList.map(e => e ? TemporalVirtualBalancePoolToken.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.expiring_pool_token_list = message.expiringPoolTokenList;
    }
    if (message.yammConfigurationList) {
      obj.yamm_configuration_list = message.yammConfigurationList.map(e => e ? YammConfiguration.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.yamm_configuration_list = message.yammConfigurationList;
    }
    if (message.whitelistedRouteList) {
      obj.whitelisted_route_list = message.whitelistedRouteList.map(e => e ? WhitelistedRoute.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.whitelisted_route_list = message.whitelistedRouteList;
    }
    if (message.orderList) {
      obj.order_list = message.orderList.map(e => e ? Order.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.order_list = message.orderList;
    }
    obj.order_count = message.orderCount !== BigInt(0) ? message.orderCount.toString() : undefined;
    if (message.executableOrderList) {
      obj.executable_order_list = message.executableOrderList.map(e => e.toString());
    } else {
      obj.executable_order_list = message.executableOrderList;
    }
    if (message.scheduleOrderList) {
      obj.schedule_order_list = message.scheduleOrderList.map(e => e ? ScheduleOrder.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.schedule_order_list = message.scheduleOrderList;
    }
    obj.vault_paused = message.vaultPaused === false ? undefined : message.vaultPaused;
    if (message.oraclePricePairList) {
      obj.oracle_price_pair_list = message.oraclePricePairList.map(e => e ? OraclePricePair.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.oracle_price_pair_list = message.oraclePricePairList;
    }
    if (message.pendingTokenIntroductionList) {
      obj.pending_token_introduction_list = message.pendingTokenIntroductionList.map(e => e ? PendingTokenIntroduction.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.pending_token_introduction_list = message.pendingTokenIntroductionList;
    }
    if (message.disabledOrderPairList) {
      obj.disabled_order_pair_list = message.disabledOrderPairList.map(e => e ? DisabledOrderPair.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.disabled_order_pair_list = message.disabledOrderPairList;
    }
    obj.next_executable_order_key = message.nextExecutableOrderKey ? base64FromBytes(message.nextExecutableOrderKey) : undefined;
    if (message.permanentVirtualBalancePoolTokenList) {
      obj.permanent_virtual_balance_pool_token_list = message.permanentVirtualBalancePoolTokenList.map(e => e ? PermanentVirtualBalancePoolToken.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.permanent_virtual_balance_pool_token_list = message.permanentVirtualBalancePoolTokenList;
    }
    return obj;
  },
  fromAminoMsg(object: GenesisStateAminoMsg): GenesisState {
    return GenesisState.fromAmino(object.value);
  },
  fromProtoMsg(message: GenesisStateProtoMsg, useInterfaces: boolean = false): GenesisState {
    return GenesisState.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: GenesisState): Uint8Array {
    return GenesisState.encode(message).finish();
  },
  toProtoMsg(message: GenesisState): GenesisStateProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};