//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { Pool, PoolAmino, PoolSDKType } from "./pool";
import { Bond, BondAmino, BondSDKType } from "./bond";
import { Unbonding, UnbondingAmino, UnbondingSDKType } from "./unbonding";
import { BinaryReader, BinaryWriter } from "../../../binary";
/** GenesisState defines the incentives module's genesis state. */
export interface GenesisState {
  params: Params | undefined;
  poolList: Pool[];
  bondList: Bond[];
  unbondingList: Unbonding[];
  unbondingCount: bigint;
}
export interface GenesisStateProtoMsg {
  typeUrl: "/pryzm.incentives.v1.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the incentives module's genesis state. */
export interface GenesisStateAmino {
  params?: ParamsAmino | undefined;
  pool_list?: PoolAmino[];
  bond_list?: BondAmino[];
  unbonding_list?: UnbondingAmino[];
  unbonding_count?: string;
}
export interface GenesisStateAminoMsg {
  type: "/pryzm.incentives.v1.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the incentives module's genesis state. */
export interface GenesisStateSDKType {
  params: ParamsSDKType | undefined;
  pool_list: PoolSDKType[];
  bond_list: BondSDKType[];
  unbonding_list: UnbondingSDKType[];
  unbonding_count: bigint;
}
function createBaseGenesisState(): GenesisState {
  return {
    params: Params.fromPartial({}),
    poolList: [],
    bondList: [],
    unbondingList: [],
    unbondingCount: BigInt(0)
  };
}
export const GenesisState = {
  typeUrl: "/pryzm.incentives.v1.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.poolList) {
      Pool.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.bondList) {
      Bond.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.unbondingList) {
      Unbonding.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.unbondingCount !== BigInt(0)) {
      writer.uint32(40).uint64(message.unbondingCount);
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
          message.poolList.push(Pool.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 3:
          message.bondList.push(Bond.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 4:
          message.unbondingList.push(Unbonding.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 5:
          message.unbondingCount = reader.uint64();
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
    message.poolList = object.poolList?.map(e => Pool.fromPartial(e)) || [];
    message.bondList = object.bondList?.map(e => Bond.fromPartial(e)) || [];
    message.unbondingList = object.unbondingList?.map(e => Unbonding.fromPartial(e)) || [];
    message.unbondingCount = object.unbondingCount !== undefined && object.unbondingCount !== null ? BigInt(object.unbondingCount.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    message.poolList = object.pool_list?.map(e => Pool.fromAmino(e)) || [];
    message.bondList = object.bond_list?.map(e => Bond.fromAmino(e)) || [];
    message.unbondingList = object.unbonding_list?.map(e => Unbonding.fromAmino(e)) || [];
    if (object.unbonding_count !== undefined && object.unbonding_count !== null) {
      message.unbondingCount = BigInt(object.unbonding_count);
    }
    return message;
  },
  toAmino(message: GenesisState, useInterfaces: boolean = false): GenesisStateAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
    if (message.poolList) {
      obj.pool_list = message.poolList.map(e => e ? Pool.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.pool_list = message.poolList;
    }
    if (message.bondList) {
      obj.bond_list = message.bondList.map(e => e ? Bond.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.bond_list = message.bondList;
    }
    if (message.unbondingList) {
      obj.unbonding_list = message.unbondingList.map(e => e ? Unbonding.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.unbonding_list = message.unbondingList;
    }
    obj.unbonding_count = message.unbondingCount !== BigInt(0) ? message.unbondingCount.toString() : undefined;
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
      typeUrl: "/pryzm.incentives.v1.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};