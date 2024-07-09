//@ts-nocheck
import { RegistrationNodeInfo, RegistrationNodeInfoAmino, RegistrationNodeInfoSDKType } from "./types";
import { MasterKey, MasterKeyAmino, MasterKeySDKType } from "./msg";
import { BinaryReader, BinaryWriter } from "../../../binary";
export interface GenesisState {
  registration: RegistrationNodeInfo[];
  nodeExchMasterKey?: MasterKey | undefined;
  ioMasterKey?: MasterKey | undefined;
}
export interface GenesisStateProtoMsg {
  typeUrl: "/secret.registration.v1beta1.GenesisState";
  value: Uint8Array;
}
export interface GenesisStateAmino {
  registration?: RegistrationNodeInfoAmino[];
  node_exch_master_key?: MasterKeyAmino | undefined;
  io_master_key?: MasterKeyAmino | undefined;
}
export interface GenesisStateAminoMsg {
  type: "/secret.registration.v1beta1.GenesisState";
  value: GenesisStateAmino;
}
export interface GenesisStateSDKType {
  registration: RegistrationNodeInfoSDKType[];
  node_exch_master_key?: MasterKeySDKType | undefined;
  io_master_key?: MasterKeySDKType | undefined;
}
function createBaseGenesisState(): GenesisState {
  return {
    registration: [],
    nodeExchMasterKey: undefined,
    ioMasterKey: undefined
  };
}
export const GenesisState = {
  typeUrl: "/secret.registration.v1beta1.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.registration) {
      RegistrationNodeInfo.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.nodeExchMasterKey !== undefined) {
      MasterKey.encode(message.nodeExchMasterKey, writer.uint32(18).fork()).ldelim();
    }
    if (message.ioMasterKey !== undefined) {
      MasterKey.encode(message.ioMasterKey, writer.uint32(26).fork()).ldelim();
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
          message.registration.push(RegistrationNodeInfo.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
          message.nodeExchMasterKey = MasterKey.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.ioMasterKey = MasterKey.decode(reader, reader.uint32(), useInterfaces);
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
    message.registration = object.registration?.map(e => RegistrationNodeInfo.fromPartial(e)) || [];
    message.nodeExchMasterKey = object.nodeExchMasterKey !== undefined && object.nodeExchMasterKey !== null ? MasterKey.fromPartial(object.nodeExchMasterKey) : undefined;
    message.ioMasterKey = object.ioMasterKey !== undefined && object.ioMasterKey !== null ? MasterKey.fromPartial(object.ioMasterKey) : undefined;
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    message.registration = object.registration?.map(e => RegistrationNodeInfo.fromAmino(e)) || [];
    if (object.node_exch_master_key !== undefined && object.node_exch_master_key !== null) {
      message.nodeExchMasterKey = MasterKey.fromAmino(object.node_exch_master_key);
    }
    if (object.io_master_key !== undefined && object.io_master_key !== null) {
      message.ioMasterKey = MasterKey.fromAmino(object.io_master_key);
    }
    return message;
  },
  toAmino(message: GenesisState, useInterfaces: boolean = false): GenesisStateAmino {
    const obj: any = {};
    if (message.registration) {
      obj.registration = message.registration.map(e => e ? RegistrationNodeInfo.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.registration = [];
    }
    obj.node_exch_master_key = message.nodeExchMasterKey ? MasterKey.toAmino(message.nodeExchMasterKey, useInterfaces) : undefined;
    obj.io_master_key = message.ioMasterKey ? MasterKey.toAmino(message.ioMasterKey, useInterfaces) : undefined;
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
      typeUrl: "/secret.registration.v1beta1.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};