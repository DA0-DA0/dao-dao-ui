//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { Failure, FailureAmino, FailureSDKType } from "./failure";
import { BinaryReader, BinaryWriter } from "../../binary";
/** GenesisState defines the contractmanager module's genesis state. */
export interface GenesisState {
  params: Params | undefined;
  /** List of the contract failures */
  failuresList: Failure[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/neutron.contractmanager.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the contractmanager module's genesis state. */
export interface GenesisStateAmino {
  params?: ParamsAmino | undefined;
  /** List of the contract failures */
  failures_list?: FailureAmino[];
}
export interface GenesisStateAminoMsg {
  type: "/neutron.contractmanager.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the contractmanager module's genesis state. */
export interface GenesisStateSDKType {
  params: ParamsSDKType | undefined;
  failures_list: FailureSDKType[];
}
function createBaseGenesisState(): GenesisState {
  return {
    params: Params.fromPartial({}),
    failuresList: []
  };
}
export const GenesisState = {
  typeUrl: "/neutron.contractmanager.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.failuresList) {
      Failure.encode(v!, writer.uint32(18).fork()).ldelim();
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
          message.failuresList.push(Failure.decode(reader, reader.uint32(), useInterfaces));
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
    message.failuresList = object.failuresList?.map(e => Failure.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    message.failuresList = object.failures_list?.map(e => Failure.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: GenesisState, useInterfaces: boolean = false): GenesisStateAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
    if (message.failuresList) {
      obj.failures_list = message.failuresList.map(e => e ? Failure.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.failures_list = [];
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
      typeUrl: "/neutron.contractmanager.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};