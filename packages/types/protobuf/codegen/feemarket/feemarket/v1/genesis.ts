//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { Decimal } from "@cosmjs/math";
/** GenesisState defines the feemarket module's genesis state. */
export interface GenesisState {
  /**
   * Params are the parameters for the feemarket module. These parameters
   * can be utilized to implement both the base EIP-1559 fee market and
   * and the AIMD EIP-1559 fee market.
   */
  params: Params | undefined;
  /** State contains the current state of the AIMD fee market. */
  state: State | undefined;
}
export interface GenesisStateProtoMsg {
  typeUrl: "/feemarket.feemarket.v1.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the feemarket module's genesis state. */
export interface GenesisStateAmino {
  /**
   * Params are the parameters for the feemarket module. These parameters
   * can be utilized to implement both the base EIP-1559 fee market and
   * and the AIMD EIP-1559 fee market.
   */
  params?: ParamsAmino | undefined;
  /** State contains the current state of the AIMD fee market. */
  state?: StateAmino | undefined;
}
export interface GenesisStateAminoMsg {
  type: "/feemarket.feemarket.v1.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the feemarket module's genesis state. */
export interface GenesisStateSDKType {
  params: ParamsSDKType | undefined;
  state: StateSDKType | undefined;
}
/**
 * State is utilized to track the current state of the fee market. This includes
 * the current base fee, learning rate, and block utilization within the
 * specified AIMD window.
 */
export interface State {
  /**
   * BaseGasPrice is the current base fee. This is denominated in the fee per
   * gas unit.
   */
  baseGasPrice: string;
  /** LearningRate is the current learning rate. */
  learningRate: string;
  /**
   * Window contains a list of the last blocks' utilization values. This is used
   * to calculate the next base fee. This stores the number of units of gas
   * consumed per block.
   */
  window: bigint[];
  /** Index is the index of the current block in the block utilization window. */
  index: bigint;
}
export interface StateProtoMsg {
  typeUrl: "/feemarket.feemarket.v1.State";
  value: Uint8Array;
}
/**
 * State is utilized to track the current state of the fee market. This includes
 * the current base fee, learning rate, and block utilization within the
 * specified AIMD window.
 */
export interface StateAmino {
  /**
   * BaseGasPrice is the current base fee. This is denominated in the fee per
   * gas unit.
   */
  base_gas_price?: string;
  /** LearningRate is the current learning rate. */
  learning_rate?: string;
  /**
   * Window contains a list of the last blocks' utilization values. This is used
   * to calculate the next base fee. This stores the number of units of gas
   * consumed per block.
   */
  window?: string[];
  /** Index is the index of the current block in the block utilization window. */
  index?: string;
}
export interface StateAminoMsg {
  type: "/feemarket.feemarket.v1.State";
  value: StateAmino;
}
/**
 * State is utilized to track the current state of the fee market. This includes
 * the current base fee, learning rate, and block utilization within the
 * specified AIMD window.
 */
export interface StateSDKType {
  base_gas_price: string;
  learning_rate: string;
  window: bigint[];
  index: bigint;
}
function createBaseGenesisState(): GenesisState {
  return {
    params: Params.fromPartial({}),
    state: State.fromPartial({})
  };
}
export const GenesisState = {
  typeUrl: "/feemarket.feemarket.v1.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    if (message.state !== undefined) {
      State.encode(message.state, writer.uint32(18).fork()).ldelim();
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
          message.state = State.decode(reader, reader.uint32(), useInterfaces);
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
    message.state = object.state !== undefined && object.state !== null ? State.fromPartial(object.state) : undefined;
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = State.fromAmino(object.state);
    }
    return message;
  },
  toAmino(message: GenesisState, useInterfaces: boolean = false): GenesisStateAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
    obj.state = message.state ? State.toAmino(message.state, useInterfaces) : undefined;
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
      typeUrl: "/feemarket.feemarket.v1.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};
function createBaseState(): State {
  return {
    baseGasPrice: "",
    learningRate: "",
    window: [],
    index: BigInt(0)
  };
}
export const State = {
  typeUrl: "/feemarket.feemarket.v1.State",
  encode(message: State, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.baseGasPrice !== "") {
      writer.uint32(10).string(Decimal.fromUserInput(message.baseGasPrice, 18).atomics);
    }
    if (message.learningRate !== "") {
      writer.uint32(18).string(Decimal.fromUserInput(message.learningRate, 18).atomics);
    }
    writer.uint32(26).fork();
    for (const v of message.window) {
      writer.uint64(v);
    }
    writer.ldelim();
    if (message.index !== BigInt(0)) {
      writer.uint32(32).uint64(message.index);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): State {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.baseGasPrice = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 2:
          message.learningRate = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 3:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.window.push(reader.uint64());
            }
          } else {
            message.window.push(reader.uint64());
          }
          break;
        case 4:
          message.index = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<State>): State {
    const message = createBaseState();
    message.baseGasPrice = object.baseGasPrice ?? "";
    message.learningRate = object.learningRate ?? "";
    message.window = object.window?.map(e => BigInt(e.toString())) || [];
    message.index = object.index !== undefined && object.index !== null ? BigInt(object.index.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: StateAmino): State {
    const message = createBaseState();
    if (object.base_gas_price !== undefined && object.base_gas_price !== null) {
      message.baseGasPrice = object.base_gas_price;
    }
    if (object.learning_rate !== undefined && object.learning_rate !== null) {
      message.learningRate = object.learning_rate;
    }
    message.window = object.window?.map(e => BigInt(e)) || [];
    if (object.index !== undefined && object.index !== null) {
      message.index = BigInt(object.index);
    }
    return message;
  },
  toAmino(message: State, useInterfaces: boolean = false): StateAmino {
    const obj: any = {};
    obj.base_gas_price = message.baseGasPrice;
    obj.learning_rate = message.learningRate;
    if (message.window) {
      obj.window = message.window.map(e => e.toString());
    } else {
      obj.window = [];
    }
    obj.index = message.index ? message.index.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: StateAminoMsg): State {
    return State.fromAmino(object.value);
  },
  fromProtoMsg(message: StateProtoMsg, useInterfaces: boolean = false): State {
    return State.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: State): Uint8Array {
    return State.encode(message).finish();
  },
  toProtoMsg(message: State): StateProtoMsg {
    return {
      typeUrl: "/feemarket.feemarket.v1.State",
      value: State.encode(message).finish()
    };
  }
};