//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { PacketID, PacketIDAmino, PacketIDSDKType, Fee, FeeAmino, FeeSDKType } from "./fee";
import { BinaryReader, BinaryWriter } from "../../binary";
/** GenesisState defines the fee module's genesis state. */
export interface GenesisState {
  params: Params | undefined;
  feeInfos: FeeInfo[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/neutron.feerefunder.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the fee module's genesis state. */
export interface GenesisStateAmino {
  params?: ParamsAmino | undefined;
  fee_infos?: FeeInfoAmino[];
}
export interface GenesisStateAminoMsg {
  type: "/neutron.feerefunder.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the fee module's genesis state. */
export interface GenesisStateSDKType {
  params: ParamsSDKType | undefined;
  fee_infos: FeeInfoSDKType[];
}
export interface FeeInfo {
  payer: string;
  packetId: PacketID | undefined;
  fee: Fee | undefined;
}
export interface FeeInfoProtoMsg {
  typeUrl: "/neutron.feerefunder.FeeInfo";
  value: Uint8Array;
}
export interface FeeInfoAmino {
  payer?: string;
  packet_id?: PacketIDAmino | undefined;
  fee?: FeeAmino | undefined;
}
export interface FeeInfoAminoMsg {
  type: "/neutron.feerefunder.FeeInfo";
  value: FeeInfoAmino;
}
export interface FeeInfoSDKType {
  payer: string;
  packet_id: PacketIDSDKType | undefined;
  fee: FeeSDKType | undefined;
}
function createBaseGenesisState(): GenesisState {
  return {
    params: Params.fromPartial({}),
    feeInfos: []
  };
}
export const GenesisState = {
  typeUrl: "/neutron.feerefunder.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.feeInfos) {
      FeeInfo.encode(v!, writer.uint32(18).fork()).ldelim();
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
          message.feeInfos.push(FeeInfo.decode(reader, reader.uint32(), useInterfaces));
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
    message.feeInfos = object.feeInfos?.map(e => FeeInfo.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    message.feeInfos = object.fee_infos?.map(e => FeeInfo.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: GenesisState, useInterfaces: boolean = false): GenesisStateAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
    if (message.feeInfos) {
      obj.fee_infos = message.feeInfos.map(e => e ? FeeInfo.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.fee_infos = [];
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
      typeUrl: "/neutron.feerefunder.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};
function createBaseFeeInfo(): FeeInfo {
  return {
    payer: "",
    packetId: PacketID.fromPartial({}),
    fee: Fee.fromPartial({})
  };
}
export const FeeInfo = {
  typeUrl: "/neutron.feerefunder.FeeInfo",
  encode(message: FeeInfo, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.payer !== "") {
      writer.uint32(10).string(message.payer);
    }
    if (message.packetId !== undefined) {
      PacketID.encode(message.packetId, writer.uint32(18).fork()).ldelim();
    }
    if (message.fee !== undefined) {
      Fee.encode(message.fee, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): FeeInfo {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFeeInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.payer = reader.string();
          break;
        case 2:
          message.packetId = PacketID.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.fee = Fee.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<FeeInfo>): FeeInfo {
    const message = createBaseFeeInfo();
    message.payer = object.payer ?? "";
    message.packetId = object.packetId !== undefined && object.packetId !== null ? PacketID.fromPartial(object.packetId) : undefined;
    message.fee = object.fee !== undefined && object.fee !== null ? Fee.fromPartial(object.fee) : undefined;
    return message;
  },
  fromAmino(object: FeeInfoAmino): FeeInfo {
    const message = createBaseFeeInfo();
    if (object.payer !== undefined && object.payer !== null) {
      message.payer = object.payer;
    }
    if (object.packet_id !== undefined && object.packet_id !== null) {
      message.packetId = PacketID.fromAmino(object.packet_id);
    }
    if (object.fee !== undefined && object.fee !== null) {
      message.fee = Fee.fromAmino(object.fee);
    }
    return message;
  },
  toAmino(message: FeeInfo, useInterfaces: boolean = false): FeeInfoAmino {
    const obj: any = {};
    obj.payer = message.payer;
    obj.packet_id = message.packetId ? PacketID.toAmino(message.packetId, useInterfaces) : undefined;
    obj.fee = message.fee ? Fee.toAmino(message.fee, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: FeeInfoAminoMsg): FeeInfo {
    return FeeInfo.fromAmino(object.value);
  },
  fromProtoMsg(message: FeeInfoProtoMsg, useInterfaces: boolean = false): FeeInfo {
    return FeeInfo.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: FeeInfo): Uint8Array {
    return FeeInfo.encode(message).finish();
  },
  toProtoMsg(message: FeeInfo): FeeInfoProtoMsg {
    return {
      typeUrl: "/neutron.feerefunder.FeeInfo",
      value: FeeInfo.encode(message).finish()
    };
  }
};