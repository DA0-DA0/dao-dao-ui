import { BinaryReader, BinaryWriter } from "../../../binary";
/** TwapAlgorithm enumerates the valid algorithms for twap_algorithm. */
export enum TwapAlgorithm {
  TWAP_ALGORITHM_ARITHMETIC = 0,
  TWAP_ALGORITHM_GEOMETRIC = 1,
  UNRECOGNIZED = -1,
}
export const TwapAlgorithmSDKType = TwapAlgorithm;
export const TwapAlgorithmAmino = TwapAlgorithm;
export function twapAlgorithmFromJSON(object: any): TwapAlgorithm {
  switch (object) {
    case 0:
    case "TWAP_ALGORITHM_ARITHMETIC":
      return TwapAlgorithm.TWAP_ALGORITHM_ARITHMETIC;
    case 1:
    case "TWAP_ALGORITHM_GEOMETRIC":
      return TwapAlgorithm.TWAP_ALGORITHM_GEOMETRIC;
    case -1:
    case "UNRECOGNIZED":
    default:
      return TwapAlgorithm.UNRECOGNIZED;
  }
}
export function twapAlgorithmToJSON(object: TwapAlgorithm): string {
  switch (object) {
    case TwapAlgorithm.TWAP_ALGORITHM_ARITHMETIC:
      return "TWAP_ALGORITHM_ARITHMETIC";
    case TwapAlgorithm.TWAP_ALGORITHM_GEOMETRIC:
      return "TWAP_ALGORITHM_GEOMETRIC";
    case TwapAlgorithm.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
export interface Pair {
  base: string;
  quote: string;
  /** refers to the data source pool (e.g. osmosis gamm pool) */
  poolId: string;
  dataSource: string;
}
export interface PairProtoMsg {
  typeUrl: "/pryzm.amm.v1.Pair";
  value: Uint8Array;
}
export interface PairAmino {
  base?: string;
  quote?: string;
  /** refers to the data source pool (e.g. osmosis gamm pool) */
  pool_id?: string;
  data_source?: string;
}
export interface PairAminoMsg {
  type: "/pryzm.amm.v1.Pair";
  value: PairAmino;
}
export interface PairSDKType {
  base: string;
  quote: string;
  pool_id: string;
  data_source: string;
}
export interface OraclePricePair {
  assetId: string;
  /**
   * this is the token denom which should exist in the target weighted pool in pryzm chain
   * the reason for adding this property and not using the pairs, is that the token denom in various chains might be different
   * for example usdc token might have contract or ibc denom on different chains with different channel and ids
   */
  quoteToken: string;
  twapDurationMillis: bigint;
  twapAlgorithm: TwapAlgorithm;
  disabled: boolean;
  pairs: Pair[];
  /**
   * this is the denom of the base token on this chain
   * should be ibc denom for most cases
   */
  baseDenom: string;
}
export interface OraclePricePairProtoMsg {
  typeUrl: "/pryzm.amm.v1.OraclePricePair";
  value: Uint8Array;
}
export interface OraclePricePairAmino {
  asset_id?: string;
  /**
   * this is the token denom which should exist in the target weighted pool in pryzm chain
   * the reason for adding this property and not using the pairs, is that the token denom in various chains might be different
   * for example usdc token might have contract or ibc denom on different chains with different channel and ids
   */
  quote_token?: string;
  twap_duration_millis: string;
  twap_algorithm: TwapAlgorithm;
  disabled: boolean;
  pairs: PairAmino[];
  /**
   * this is the denom of the base token on this chain
   * should be ibc denom for most cases
   */
  base_denom?: string;
}
export interface OraclePricePairAminoMsg {
  type: "/pryzm.amm.v1.OraclePricePair";
  value: OraclePricePairAmino;
}
export interface OraclePricePairSDKType {
  asset_id: string;
  quote_token: string;
  twap_duration_millis: bigint;
  twap_algorithm: TwapAlgorithm;
  disabled: boolean;
  pairs: PairSDKType[];
  base_denom: string;
}
function createBasePair(): Pair {
  return {
    base: "",
    quote: "",
    poolId: "",
    dataSource: ""
  };
}
export const Pair = {
  typeUrl: "/pryzm.amm.v1.Pair",
  encode(message: Pair, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.base !== "") {
      writer.uint32(10).string(message.base);
    }
    if (message.quote !== "") {
      writer.uint32(18).string(message.quote);
    }
    if (message.poolId !== "") {
      writer.uint32(26).string(message.poolId);
    }
    if (message.dataSource !== "") {
      writer.uint32(34).string(message.dataSource);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): Pair {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePair();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.base = reader.string();
          break;
        case 2:
          message.quote = reader.string();
          break;
        case 3:
          message.poolId = reader.string();
          break;
        case 4:
          message.dataSource = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Pair>): Pair {
    const message = createBasePair();
    message.base = object.base ?? "";
    message.quote = object.quote ?? "";
    message.poolId = object.poolId ?? "";
    message.dataSource = object.dataSource ?? "";
    return message;
  },
  fromAmino(object: PairAmino): Pair {
    const message = createBasePair();
    if (object.base !== undefined && object.base !== null) {
      message.base = object.base;
    }
    if (object.quote !== undefined && object.quote !== null) {
      message.quote = object.quote;
    }
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = object.pool_id;
    }
    if (object.data_source !== undefined && object.data_source !== null) {
      message.dataSource = object.data_source;
    }
    return message;
  },
  toAmino(message: Pair, useInterfaces: boolean = false): PairAmino {
    const obj: any = {};
    obj.base = message.base === "" ? undefined : message.base;
    obj.quote = message.quote === "" ? undefined : message.quote;
    obj.pool_id = message.poolId === "" ? undefined : message.poolId;
    obj.data_source = message.dataSource === "" ? undefined : message.dataSource;
    return obj;
  },
  fromAminoMsg(object: PairAminoMsg): Pair {
    return Pair.fromAmino(object.value);
  },
  fromProtoMsg(message: PairProtoMsg, useInterfaces: boolean = false): Pair {
    return Pair.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Pair): Uint8Array {
    return Pair.encode(message).finish();
  },
  toProtoMsg(message: Pair): PairProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.Pair",
      value: Pair.encode(message).finish()
    };
  }
};
function createBaseOraclePricePair(): OraclePricePair {
  return {
    assetId: "",
    quoteToken: "",
    twapDurationMillis: BigInt(0),
    twapAlgorithm: 0,
    disabled: false,
    pairs: [],
    baseDenom: ""
  };
}
export const OraclePricePair = {
  typeUrl: "/pryzm.amm.v1.OraclePricePair",
  encode(message: OraclePricePair, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.assetId !== "") {
      writer.uint32(10).string(message.assetId);
    }
    if (message.quoteToken !== "") {
      writer.uint32(18).string(message.quoteToken);
    }
    if (message.twapDurationMillis !== BigInt(0)) {
      writer.uint32(24).uint64(message.twapDurationMillis);
    }
    if (message.twapAlgorithm !== 0) {
      writer.uint32(32).int32(message.twapAlgorithm);
    }
    if (message.disabled === true) {
      writer.uint32(40).bool(message.disabled);
    }
    for (const v of message.pairs) {
      Pair.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    if (message.baseDenom !== "") {
      writer.uint32(58).string(message.baseDenom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): OraclePricePair {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOraclePricePair();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.assetId = reader.string();
          break;
        case 2:
          message.quoteToken = reader.string();
          break;
        case 3:
          message.twapDurationMillis = reader.uint64();
          break;
        case 4:
          message.twapAlgorithm = (reader.int32() as any);
          break;
        case 5:
          message.disabled = reader.bool();
          break;
        case 6:
          message.pairs.push(Pair.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 7:
          message.baseDenom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<OraclePricePair>): OraclePricePair {
    const message = createBaseOraclePricePair();
    message.assetId = object.assetId ?? "";
    message.quoteToken = object.quoteToken ?? "";
    message.twapDurationMillis = object.twapDurationMillis !== undefined && object.twapDurationMillis !== null ? BigInt(object.twapDurationMillis.toString()) : BigInt(0);
    message.twapAlgorithm = object.twapAlgorithm ?? 0;
    message.disabled = object.disabled ?? false;
    message.pairs = object.pairs?.map(e => Pair.fromPartial(e)) || [];
    message.baseDenom = object.baseDenom ?? "";
    return message;
  },
  fromAmino(object: OraclePricePairAmino): OraclePricePair {
    const message = createBaseOraclePricePair();
    if (object.asset_id !== undefined && object.asset_id !== null) {
      message.assetId = object.asset_id;
    }
    if (object.quote_token !== undefined && object.quote_token !== null) {
      message.quoteToken = object.quote_token;
    }
    if (object.twap_duration_millis !== undefined && object.twap_duration_millis !== null) {
      message.twapDurationMillis = BigInt(object.twap_duration_millis);
    }
    if (object.twap_algorithm !== undefined && object.twap_algorithm !== null) {
      message.twapAlgorithm = object.twap_algorithm;
    }
    if (object.disabled !== undefined && object.disabled !== null) {
      message.disabled = object.disabled;
    }
    message.pairs = object.pairs?.map(e => Pair.fromAmino(e)) || [];
    if (object.base_denom !== undefined && object.base_denom !== null) {
      message.baseDenom = object.base_denom;
    }
    return message;
  },
  toAmino(message: OraclePricePair, useInterfaces: boolean = false): OraclePricePairAmino {
    const obj: any = {};
    obj.asset_id = message.assetId === "" ? undefined : message.assetId;
    obj.quote_token = message.quoteToken === "" ? undefined : message.quoteToken;
    obj.twap_duration_millis = message.twapDurationMillis ? message.twapDurationMillis.toString() : "0";
    obj.twap_algorithm = message.twapAlgorithm ?? 0;
    obj.disabled = message.disabled ?? false;
    if (message.pairs) {
      obj.pairs = message.pairs.map(e => e ? Pair.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.pairs = message.pairs;
    }
    obj.base_denom = message.baseDenom === "" ? undefined : message.baseDenom;
    return obj;
  },
  fromAminoMsg(object: OraclePricePairAminoMsg): OraclePricePair {
    return OraclePricePair.fromAmino(object.value);
  },
  fromProtoMsg(message: OraclePricePairProtoMsg, useInterfaces: boolean = false): OraclePricePair {
    return OraclePricePair.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: OraclePricePair): Uint8Array {
    return OraclePricePair.encode(message).finish();
  },
  toProtoMsg(message: OraclePricePair): OraclePricePairProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.OraclePricePair",
      value: OraclePricePair.encode(message).finish()
    };
  }
};