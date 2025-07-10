import { PageRequest, PageRequestAmino, PageRequestSDKType } from "../../cosmos/base/query/v1beta1/pagination";
import { PoolAsset, PoolAssetAmino, PoolAssetSDKType } from "./pool_asset";
import { Coin, CoinAmino, CoinSDKType } from "../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../binary";
import { Decimal } from "@cosmjs/math";
export enum FilterType {
  FILTER_ALL = 0,
  FILTER_PERPETUAL = 1,
  FILTER_FIXED_WEIGHT = 2,
  FILTER_DYNAMIC_WEIGHT = 3,
  FILTER_LEVERAGE = 4,
  UNRECOGNIZED = -1,
}
export const FilterTypeSDKType = FilterType;
export const FilterTypeAmino = FilterType;
export function filterTypeFromJSON(object: any): FilterType {
  switch (object) {
    case 0:
    case "FILTER_ALL":
      return FilterType.FILTER_ALL;
    case 1:
    case "FILTER_PERPETUAL":
      return FilterType.FILTER_PERPETUAL;
    case 2:
    case "FILTER_FIXED_WEIGHT":
      return FilterType.FILTER_FIXED_WEIGHT;
    case 3:
    case "FILTER_DYNAMIC_WEIGHT":
      return FilterType.FILTER_DYNAMIC_WEIGHT;
    case 4:
    case "FILTER_LEVERAGE":
      return FilterType.FILTER_LEVERAGE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return FilterType.UNRECOGNIZED;
  }
}
export function filterTypeToJSON(object: FilterType): string {
  switch (object) {
    case FilterType.FILTER_ALL:
      return "FILTER_ALL";
    case FilterType.FILTER_PERPETUAL:
      return "FILTER_PERPETUAL";
    case FilterType.FILTER_FIXED_WEIGHT:
      return "FILTER_FIXED_WEIGHT";
    case FilterType.FILTER_DYNAMIC_WEIGHT:
      return "FILTER_DYNAMIC_WEIGHT";
    case FilterType.FILTER_LEVERAGE:
      return "FILTER_LEVERAGE";
    case FilterType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
export interface QueryEarnPoolRequest {
  poolIds: bigint[];
  filterType: FilterType;
  pagination?: PageRequest | undefined;
}
export interface QueryEarnPoolRequestProtoMsg {
  typeUrl: "/elys.amm.QueryEarnPoolRequest";
  value: Uint8Array;
}
export interface QueryEarnPoolRequestAmino {
  pool_ids?: string[];
  filter_type?: FilterType;
  pagination?: PageRequestAmino | undefined;
}
export interface QueryEarnPoolRequestAminoMsg {
  type: "/elys.amm.QueryEarnPoolRequest";
  value: QueryEarnPoolRequestAmino;
}
export interface QueryEarnPoolRequestSDKType {
  pool_ids: bigint[];
  filter_type: FilterType;
  pagination?: PageRequestSDKType | undefined;
}
export interface EarnPool {
  poolId: bigint;
  assets: PoolAsset[];
  poolRatio: string;
  rewardsApr: string;
  borrowApr: string;
  leverageLp: string;
  perpetual: string;
  tvl: string;
  lpTokenPrice: string;
  rewardsUsd: string;
  rewardCoins: Coin[];
  totalShares: Coin | undefined;
  swapFee: string;
  feeDenom: string;
  useOracle: boolean;
  isLeveragelp: boolean;
}
export interface EarnPoolProtoMsg {
  typeUrl: "/elys.amm.EarnPool";
  value: Uint8Array;
}
export interface EarnPoolAmino {
  pool_id?: string;
  assets?: PoolAssetAmino[];
  pool_ratio?: string;
  rewards_apr?: string;
  borrow_apr?: string;
  leverage_lp?: string;
  perpetual?: string;
  tvl?: string;
  lp_token_price?: string;
  rewards_usd?: string;
  reward_coins?: CoinAmino[];
  total_shares?: CoinAmino | undefined;
  swap_fee?: string;
  fee_denom?: string;
  use_oracle?: boolean;
  is_leveragelp?: boolean;
}
export interface EarnPoolAminoMsg {
  type: "/elys.amm.EarnPool";
  value: EarnPoolAmino;
}
export interface EarnPoolSDKType {
  pool_id: bigint;
  assets: PoolAssetSDKType[];
  pool_ratio: string;
  rewards_apr: string;
  borrow_apr: string;
  leverage_lp: string;
  perpetual: string;
  tvl: string;
  lp_token_price: string;
  rewards_usd: string;
  reward_coins: CoinSDKType[];
  total_shares: CoinSDKType | undefined;
  swap_fee: string;
  fee_denom: string;
  use_oracle: boolean;
  is_leveragelp: boolean;
}
export interface QueryEarnPoolResponse {
  pools: EarnPool[];
}
export interface QueryEarnPoolResponseProtoMsg {
  typeUrl: "/elys.amm.QueryEarnPoolResponse";
  value: Uint8Array;
}
export interface QueryEarnPoolResponseAmino {
  pools?: EarnPoolAmino[];
}
export interface QueryEarnPoolResponseAminoMsg {
  type: "/elys.amm.QueryEarnPoolResponse";
  value: QueryEarnPoolResponseAmino;
}
export interface QueryEarnPoolResponseSDKType {
  pools: EarnPoolSDKType[];
}
function createBaseQueryEarnPoolRequest(): QueryEarnPoolRequest {
  return {
    poolIds: [],
    filterType: 0,
    pagination: undefined
  };
}
export const QueryEarnPoolRequest = {
  typeUrl: "/elys.amm.QueryEarnPoolRequest",
  encode(message: QueryEarnPoolRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    writer.uint32(10).fork();
    for (const v of message.poolIds) {
      writer.uint64(v);
    }
    writer.ldelim();
    if (message.filterType !== 0) {
      writer.uint32(16).int32(message.filterType);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryEarnPoolRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryEarnPoolRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.poolIds.push(reader.uint64());
            }
          } else {
            message.poolIds.push(reader.uint64());
          }
          break;
        case 2:
          message.filterType = (reader.int32() as any);
          break;
        case 3:
          message.pagination = PageRequest.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryEarnPoolRequest>): QueryEarnPoolRequest {
    const message = createBaseQueryEarnPoolRequest();
    message.poolIds = object.poolIds?.map(e => BigInt(e.toString())) || [];
    message.filterType = object.filterType ?? 0;
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryEarnPoolRequestAmino): QueryEarnPoolRequest {
    const message = createBaseQueryEarnPoolRequest();
    message.poolIds = object.pool_ids?.map(e => BigInt(e)) || [];
    if (object.filter_type !== undefined && object.filter_type !== null) {
      message.filterType = object.filter_type;
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: QueryEarnPoolRequest, useInterfaces: boolean = false): QueryEarnPoolRequestAmino {
    const obj: any = {};
    if (message.poolIds) {
      obj.pool_ids = message.poolIds.map(e => e.toString());
    } else {
      obj.pool_ids = message.poolIds;
    }
    obj.filter_type = message.filterType === 0 ? undefined : message.filterType;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryEarnPoolRequestAminoMsg): QueryEarnPoolRequest {
    return QueryEarnPoolRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryEarnPoolRequestProtoMsg, useInterfaces: boolean = false): QueryEarnPoolRequest {
    return QueryEarnPoolRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryEarnPoolRequest): Uint8Array {
    return QueryEarnPoolRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryEarnPoolRequest): QueryEarnPoolRequestProtoMsg {
    return {
      typeUrl: "/elys.amm.QueryEarnPoolRequest",
      value: QueryEarnPoolRequest.encode(message).finish()
    };
  }
};
function createBaseEarnPool(): EarnPool {
  return {
    poolId: BigInt(0),
    assets: [],
    poolRatio: "",
    rewardsApr: "",
    borrowApr: "",
    leverageLp: "",
    perpetual: "",
    tvl: "",
    lpTokenPrice: "",
    rewardsUsd: "",
    rewardCoins: [],
    totalShares: Coin.fromPartial({}),
    swapFee: "",
    feeDenom: "",
    useOracle: false,
    isLeveragelp: false
  };
}
export const EarnPool = {
  typeUrl: "/elys.amm.EarnPool",
  encode(message: EarnPool, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    for (const v of message.assets) {
      PoolAsset.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.poolRatio !== "") {
      writer.uint32(26).string(message.poolRatio);
    }
    if (message.rewardsApr !== "") {
      writer.uint32(34).string(Decimal.fromUserInput(message.rewardsApr, 18).atomics);
    }
    if (message.borrowApr !== "") {
      writer.uint32(42).string(Decimal.fromUserInput(message.borrowApr, 18).atomics);
    }
    if (message.leverageLp !== "") {
      writer.uint32(50).string(Decimal.fromUserInput(message.leverageLp, 18).atomics);
    }
    if (message.perpetual !== "") {
      writer.uint32(58).string(Decimal.fromUserInput(message.perpetual, 18).atomics);
    }
    if (message.tvl !== "") {
      writer.uint32(66).string(Decimal.fromUserInput(message.tvl, 18).atomics);
    }
    if (message.lpTokenPrice !== "") {
      writer.uint32(74).string(Decimal.fromUserInput(message.lpTokenPrice, 18).atomics);
    }
    if (message.rewardsUsd !== "") {
      writer.uint32(82).string(Decimal.fromUserInput(message.rewardsUsd, 18).atomics);
    }
    for (const v of message.rewardCoins) {
      Coin.encode(v!, writer.uint32(90).fork()).ldelim();
    }
    if (message.totalShares !== undefined) {
      Coin.encode(message.totalShares, writer.uint32(98).fork()).ldelim();
    }
    if (message.swapFee !== "") {
      writer.uint32(106).string(Decimal.fromUserInput(message.swapFee, 18).atomics);
    }
    if (message.feeDenom !== "") {
      writer.uint32(114).string(message.feeDenom);
    }
    if (message.useOracle === true) {
      writer.uint32(120).bool(message.useOracle);
    }
    if (message.isLeveragelp === true) {
      writer.uint32(128).bool(message.isLeveragelp);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EarnPool {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEarnPool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.uint64();
          break;
        case 2:
          message.assets.push(PoolAsset.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 3:
          message.poolRatio = reader.string();
          break;
        case 4:
          message.rewardsApr = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 5:
          message.borrowApr = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 6:
          message.leverageLp = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 7:
          message.perpetual = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 8:
          message.tvl = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 9:
          message.lpTokenPrice = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 10:
          message.rewardsUsd = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 11:
          message.rewardCoins.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 12:
          message.totalShares = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 13:
          message.swapFee = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 14:
          message.feeDenom = reader.string();
          break;
        case 15:
          message.useOracle = reader.bool();
          break;
        case 16:
          message.isLeveragelp = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EarnPool>): EarnPool {
    const message = createBaseEarnPool();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.assets = object.assets?.map(e => PoolAsset.fromPartial(e)) || [];
    message.poolRatio = object.poolRatio ?? "";
    message.rewardsApr = object.rewardsApr ?? "";
    message.borrowApr = object.borrowApr ?? "";
    message.leverageLp = object.leverageLp ?? "";
    message.perpetual = object.perpetual ?? "";
    message.tvl = object.tvl ?? "";
    message.lpTokenPrice = object.lpTokenPrice ?? "";
    message.rewardsUsd = object.rewardsUsd ?? "";
    message.rewardCoins = object.rewardCoins?.map(e => Coin.fromPartial(e)) || [];
    message.totalShares = object.totalShares !== undefined && object.totalShares !== null ? Coin.fromPartial(object.totalShares) : undefined;
    message.swapFee = object.swapFee ?? "";
    message.feeDenom = object.feeDenom ?? "";
    message.useOracle = object.useOracle ?? false;
    message.isLeveragelp = object.isLeveragelp ?? false;
    return message;
  },
  fromAmino(object: EarnPoolAmino): EarnPool {
    const message = createBaseEarnPool();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    message.assets = object.assets?.map(e => PoolAsset.fromAmino(e)) || [];
    if (object.pool_ratio !== undefined && object.pool_ratio !== null) {
      message.poolRatio = object.pool_ratio;
    }
    if (object.rewards_apr !== undefined && object.rewards_apr !== null) {
      message.rewardsApr = object.rewards_apr;
    }
    if (object.borrow_apr !== undefined && object.borrow_apr !== null) {
      message.borrowApr = object.borrow_apr;
    }
    if (object.leverage_lp !== undefined && object.leverage_lp !== null) {
      message.leverageLp = object.leverage_lp;
    }
    if (object.perpetual !== undefined && object.perpetual !== null) {
      message.perpetual = object.perpetual;
    }
    if (object.tvl !== undefined && object.tvl !== null) {
      message.tvl = object.tvl;
    }
    if (object.lp_token_price !== undefined && object.lp_token_price !== null) {
      message.lpTokenPrice = object.lp_token_price;
    }
    if (object.rewards_usd !== undefined && object.rewards_usd !== null) {
      message.rewardsUsd = object.rewards_usd;
    }
    message.rewardCoins = object.reward_coins?.map(e => Coin.fromAmino(e)) || [];
    if (object.total_shares !== undefined && object.total_shares !== null) {
      message.totalShares = Coin.fromAmino(object.total_shares);
    }
    if (object.swap_fee !== undefined && object.swap_fee !== null) {
      message.swapFee = object.swap_fee;
    }
    if (object.fee_denom !== undefined && object.fee_denom !== null) {
      message.feeDenom = object.fee_denom;
    }
    if (object.use_oracle !== undefined && object.use_oracle !== null) {
      message.useOracle = object.use_oracle;
    }
    if (object.is_leveragelp !== undefined && object.is_leveragelp !== null) {
      message.isLeveragelp = object.is_leveragelp;
    }
    return message;
  },
  toAmino(message: EarnPool, useInterfaces: boolean = false): EarnPoolAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    if (message.assets) {
      obj.assets = message.assets.map(e => e ? PoolAsset.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.assets = message.assets;
    }
    obj.pool_ratio = message.poolRatio === "" ? undefined : message.poolRatio;
    obj.rewards_apr = message.rewardsApr === "" ? undefined : message.rewardsApr;
    obj.borrow_apr = message.borrowApr === "" ? undefined : message.borrowApr;
    obj.leverage_lp = message.leverageLp === "" ? undefined : message.leverageLp;
    obj.perpetual = message.perpetual === "" ? undefined : message.perpetual;
    obj.tvl = message.tvl === "" ? undefined : message.tvl;
    obj.lp_token_price = message.lpTokenPrice === "" ? undefined : message.lpTokenPrice;
    obj.rewards_usd = message.rewardsUsd === "" ? undefined : message.rewardsUsd;
    if (message.rewardCoins) {
      obj.reward_coins = message.rewardCoins.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.reward_coins = message.rewardCoins;
    }
    obj.total_shares = message.totalShares ? Coin.toAmino(message.totalShares, useInterfaces) : undefined;
    obj.swap_fee = message.swapFee === "" ? undefined : message.swapFee;
    obj.fee_denom = message.feeDenom === "" ? undefined : message.feeDenom;
    obj.use_oracle = message.useOracle === false ? undefined : message.useOracle;
    obj.is_leveragelp = message.isLeveragelp === false ? undefined : message.isLeveragelp;
    return obj;
  },
  fromAminoMsg(object: EarnPoolAminoMsg): EarnPool {
    return EarnPool.fromAmino(object.value);
  },
  fromProtoMsg(message: EarnPoolProtoMsg, useInterfaces: boolean = false): EarnPool {
    return EarnPool.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EarnPool): Uint8Array {
    return EarnPool.encode(message).finish();
  },
  toProtoMsg(message: EarnPool): EarnPoolProtoMsg {
    return {
      typeUrl: "/elys.amm.EarnPool",
      value: EarnPool.encode(message).finish()
    };
  }
};
function createBaseQueryEarnPoolResponse(): QueryEarnPoolResponse {
  return {
    pools: []
  };
}
export const QueryEarnPoolResponse = {
  typeUrl: "/elys.amm.QueryEarnPoolResponse",
  encode(message: QueryEarnPoolResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.pools) {
      EarnPool.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryEarnPoolResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryEarnPoolResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pools.push(EarnPool.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryEarnPoolResponse>): QueryEarnPoolResponse {
    const message = createBaseQueryEarnPoolResponse();
    message.pools = object.pools?.map(e => EarnPool.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryEarnPoolResponseAmino): QueryEarnPoolResponse {
    const message = createBaseQueryEarnPoolResponse();
    message.pools = object.pools?.map(e => EarnPool.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryEarnPoolResponse, useInterfaces: boolean = false): QueryEarnPoolResponseAmino {
    const obj: any = {};
    if (message.pools) {
      obj.pools = message.pools.map(e => e ? EarnPool.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.pools = message.pools;
    }
    return obj;
  },
  fromAminoMsg(object: QueryEarnPoolResponseAminoMsg): QueryEarnPoolResponse {
    return QueryEarnPoolResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryEarnPoolResponseProtoMsg, useInterfaces: boolean = false): QueryEarnPoolResponse {
    return QueryEarnPoolResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryEarnPoolResponse): Uint8Array {
    return QueryEarnPoolResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryEarnPoolResponse): QueryEarnPoolResponseProtoMsg {
    return {
      typeUrl: "/elys.amm.QueryEarnPoolResponse",
      value: QueryEarnPoolResponse.encode(message).finish()
    };
  }
};