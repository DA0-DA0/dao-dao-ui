//@ts-nocheck
import { Minter, MinterAmino, MinterSDKType, Params, ParamsAmino, ParamsSDKType } from "./mint";
import { BinaryReader, BinaryWriter } from "../../../../binary";
/** GenesisState defines the mint module's genesis state. */
export interface GenesisState {
  /** minter is a space for holding current inflation information. */
  minter: Minter | undefined;
  /** params defines all the paramaters of the module. */
  params: Params | undefined;
}
export interface GenesisStateProtoMsg {
  typeUrl: "/publicawesome.stargaze.mint.v1beta1.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the mint module's genesis state. */
export interface GenesisStateAmino {
  /** minter is a space for holding current inflation information. */
  minter?: MinterAmino | undefined;
  /** params defines all the paramaters of the module. */
  params?: ParamsAmino | undefined;
}
export interface GenesisStateAminoMsg {
  type: "/publicawesome.stargaze.mint.v1beta1.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the mint module's genesis state. */
export interface GenesisStateSDKType {
  minter: MinterSDKType | undefined;
  params: ParamsSDKType | undefined;
}
function createBaseGenesisState(): GenesisState {
  return {
    minter: Minter.fromPartial({}),
    params: Params.fromPartial({})
  };
}
export const GenesisState = {
  typeUrl: "/publicawesome.stargaze.mint.v1beta1.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.minter !== undefined) {
      Minter.encode(message.minter, writer.uint32(10).fork()).ldelim();
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).ldelim();
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
          message.minter = Minter.decode(reader, reader.uint32(), useInterfaces);
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
  fromPartial(object: Partial<GenesisState>): GenesisState {
    const message = createBaseGenesisState();
    message.minter = object.minter !== undefined && object.minter !== null ? Minter.fromPartial(object.minter) : undefined;
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    return {
      minter: object?.minter ? Minter.fromAmino(object.minter) : undefined,
      params: object?.params ? Params.fromAmino(object.params) : undefined
    };
  },
  toAmino(message: GenesisState, useInterfaces: boolean = false): GenesisStateAmino {
    const obj: any = {};
    obj.minter = message.minter ? Minter.toAmino(message.minter, useInterfaces) : undefined;
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
      typeUrl: "/publicawesome.stargaze.mint.v1beta1.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};