//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { HostChain, HostChainAmino, HostChainSDKType } from "./ratesync";
import { BinaryReader, BinaryWriter } from "../../../binary";
/** GenesisState defines the ratesync module's genesis state. */
export interface GenesisState {
  params: Params | undefined;
  hostChains: HostChain[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/pstake.ratesync.v1beta1.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the ratesync module's genesis state. */
export interface GenesisStateAmino {
  params?: ParamsAmino | undefined;
  host_chains?: HostChainAmino[];
}
export interface GenesisStateAminoMsg {
  type: "/pstake.ratesync.v1beta1.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the ratesync module's genesis state. */
export interface GenesisStateSDKType {
  params: ParamsSDKType | undefined;
  host_chains: HostChainSDKType[];
}
function createBaseGenesisState(): GenesisState {
  return {
    params: Params.fromPartial({}),
    hostChains: []
  };
}
export const GenesisState = {
  typeUrl: "/pstake.ratesync.v1beta1.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.hostChains) {
      HostChain.encode(v!, writer.uint32(18).fork()).ldelim();
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
          message.hostChains.push(HostChain.decode(reader, reader.uint32(), useInterfaces));
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
    message.hostChains = object.hostChains?.map(e => HostChain.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    message.hostChains = object.host_chains?.map(e => HostChain.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: GenesisState, useInterfaces: boolean = false): GenesisStateAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
    if (message.hostChains) {
      obj.host_chains = message.hostChains.map(e => e ? HostChain.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.host_chains = [];
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
      typeUrl: "/pstake.ratesync.v1beta1.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};