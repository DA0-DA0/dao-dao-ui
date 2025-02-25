//@ts-nocheck
import { MarketMap, MarketMapAmino, MarketMapSDKType } from "./market";
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { BinaryReader, BinaryWriter } from "../../../binary";
/** GenesisState defines the x/marketmap module's genesis state. */
export interface GenesisState {
  /**
   * MarketMap defines the global set of market configurations for all providers
   * and markets.
   */
  marketMap: MarketMap | undefined;
  /**
   * LastUpdated is the last block height that the market map was updated.
   * This field can be used as an optimization for clients checking if there
   * is a new update to the map.
   */
  lastUpdated: bigint;
  /** Params are the parameters for the x/marketmap module. */
  params: Params | undefined;
}
export interface GenesisStateProtoMsg {
  typeUrl: "/slinky.marketmap.v1.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the x/marketmap module's genesis state. */
export interface GenesisStateAmino {
  /**
   * MarketMap defines the global set of market configurations for all providers
   * and markets.
   */
  market_map?: MarketMapAmino | undefined;
  /**
   * LastUpdated is the last block height that the market map was updated.
   * This field can be used as an optimization for clients checking if there
   * is a new update to the map.
   */
  last_updated?: string;
  /** Params are the parameters for the x/marketmap module. */
  params?: ParamsAmino | undefined;
}
export interface GenesisStateAminoMsg {
  type: "/slinky.marketmap.v1.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the x/marketmap module's genesis state. */
export interface GenesisStateSDKType {
  market_map: MarketMapSDKType | undefined;
  last_updated: bigint;
  params: ParamsSDKType | undefined;
}
function createBaseGenesisState(): GenesisState {
  return {
    marketMap: MarketMap.fromPartial({}),
    lastUpdated: BigInt(0),
    params: Params.fromPartial({})
  };
}
export const GenesisState = {
  typeUrl: "/slinky.marketmap.v1.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.marketMap !== undefined) {
      MarketMap.encode(message.marketMap, writer.uint32(10).fork()).ldelim();
    }
    if (message.lastUpdated !== BigInt(0)) {
      writer.uint32(16).uint64(message.lastUpdated);
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(26).fork()).ldelim();
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
          message.marketMap = MarketMap.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.lastUpdated = reader.uint64();
          break;
        case 3:
          message.params = Params.decode(reader, reader.uint32(), useInterfaces);
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
    message.marketMap = object.marketMap !== undefined && object.marketMap !== null ? MarketMap.fromPartial(object.marketMap) : undefined;
    message.lastUpdated = object.lastUpdated !== undefined && object.lastUpdated !== null ? BigInt(object.lastUpdated.toString()) : BigInt(0);
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    if (object.market_map !== undefined && object.market_map !== null) {
      message.marketMap = MarketMap.fromAmino(object.market_map);
    }
    if (object.last_updated !== undefined && object.last_updated !== null) {
      message.lastUpdated = BigInt(object.last_updated);
    }
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: GenesisState, useInterfaces: boolean = false): GenesisStateAmino {
    const obj: any = {};
    obj.market_map = message.marketMap ? MarketMap.toAmino(message.marketMap, useInterfaces) : undefined;
    obj.last_updated = message.lastUpdated !== BigInt(0) ? message.lastUpdated.toString() : undefined;
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
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
      typeUrl: "/slinky.marketmap.v1.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};