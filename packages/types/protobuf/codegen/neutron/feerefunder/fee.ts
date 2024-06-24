import { Coin, CoinAmino, CoinSDKType } from "../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../binary";
/** Fee defines the ICS29 receive, acknowledgement and timeout fees */
export interface Fee {
  /** the packet receive fee */
  recvFee: Coin[];
  /** the packet acknowledgement fee */
  ackFee: Coin[];
  /** the packet timeout fee */
  timeoutFee: Coin[];
}
export interface FeeProtoMsg {
  typeUrl: "/neutron.feerefunder.Fee";
  value: Uint8Array;
}
/** Fee defines the ICS29 receive, acknowledgement and timeout fees */
export interface FeeAmino {
  /** the packet receive fee */
  recv_fee?: CoinAmino[];
  /** the packet acknowledgement fee */
  ack_fee?: CoinAmino[];
  /** the packet timeout fee */
  timeout_fee?: CoinAmino[];
}
export interface FeeAminoMsg {
  type: "/neutron.feerefunder.Fee";
  value: FeeAmino;
}
/** Fee defines the ICS29 receive, acknowledgement and timeout fees */
export interface FeeSDKType {
  recv_fee: CoinSDKType[];
  ack_fee: CoinSDKType[];
  timeout_fee: CoinSDKType[];
}
export interface PacketID {
  channelId: string;
  portId: string;
  sequence: bigint;
}
export interface PacketIDProtoMsg {
  typeUrl: "/neutron.feerefunder.PacketID";
  value: Uint8Array;
}
export interface PacketIDAmino {
  channel_id?: string;
  port_id?: string;
  sequence?: string;
}
export interface PacketIDAminoMsg {
  type: "/neutron.feerefunder.PacketID";
  value: PacketIDAmino;
}
export interface PacketIDSDKType {
  channel_id: string;
  port_id: string;
  sequence: bigint;
}
function createBaseFee(): Fee {
  return {
    recvFee: [],
    ackFee: [],
    timeoutFee: []
  };
}
export const Fee = {
  typeUrl: "/neutron.feerefunder.Fee",
  encode(message: Fee, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.recvFee) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.ackFee) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.timeoutFee) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): Fee {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFee();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.recvFee.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
          message.ackFee.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 3:
          message.timeoutFee.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Fee>): Fee {
    const message = createBaseFee();
    message.recvFee = object.recvFee?.map(e => Coin.fromPartial(e)) || [];
    message.ackFee = object.ackFee?.map(e => Coin.fromPartial(e)) || [];
    message.timeoutFee = object.timeoutFee?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: FeeAmino): Fee {
    const message = createBaseFee();
    message.recvFee = object.recv_fee?.map(e => Coin.fromAmino(e)) || [];
    message.ackFee = object.ack_fee?.map(e => Coin.fromAmino(e)) || [];
    message.timeoutFee = object.timeout_fee?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: Fee, useInterfaces: boolean = false): FeeAmino {
    const obj: any = {};
    if (message.recvFee) {
      obj.recv_fee = message.recvFee.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.recv_fee = message.recvFee;
    }
    if (message.ackFee) {
      obj.ack_fee = message.ackFee.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.ack_fee = message.ackFee;
    }
    if (message.timeoutFee) {
      obj.timeout_fee = message.timeoutFee.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.timeout_fee = message.timeoutFee;
    }
    return obj;
  },
  fromAminoMsg(object: FeeAminoMsg): Fee {
    return Fee.fromAmino(object.value);
  },
  fromProtoMsg(message: FeeProtoMsg, useInterfaces: boolean = false): Fee {
    return Fee.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Fee): Uint8Array {
    return Fee.encode(message).finish();
  },
  toProtoMsg(message: Fee): FeeProtoMsg {
    return {
      typeUrl: "/neutron.feerefunder.Fee",
      value: Fee.encode(message).finish()
    };
  }
};
function createBasePacketID(): PacketID {
  return {
    channelId: "",
    portId: "",
    sequence: BigInt(0)
  };
}
export const PacketID = {
  typeUrl: "/neutron.feerefunder.PacketID",
  encode(message: PacketID, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.channelId !== "") {
      writer.uint32(10).string(message.channelId);
    }
    if (message.portId !== "") {
      writer.uint32(18).string(message.portId);
    }
    if (message.sequence !== BigInt(0)) {
      writer.uint32(24).uint64(message.sequence);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): PacketID {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePacketID();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channelId = reader.string();
          break;
        case 2:
          message.portId = reader.string();
          break;
        case 3:
          message.sequence = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<PacketID>): PacketID {
    const message = createBasePacketID();
    message.channelId = object.channelId ?? "";
    message.portId = object.portId ?? "";
    message.sequence = object.sequence !== undefined && object.sequence !== null ? BigInt(object.sequence.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: PacketIDAmino): PacketID {
    const message = createBasePacketID();
    if (object.channel_id !== undefined && object.channel_id !== null) {
      message.channelId = object.channel_id;
    }
    if (object.port_id !== undefined && object.port_id !== null) {
      message.portId = object.port_id;
    }
    if (object.sequence !== undefined && object.sequence !== null) {
      message.sequence = BigInt(object.sequence);
    }
    return message;
  },
  toAmino(message: PacketID, useInterfaces: boolean = false): PacketIDAmino {
    const obj: any = {};
    obj.channel_id = message.channelId === "" ? undefined : message.channelId;
    obj.port_id = message.portId === "" ? undefined : message.portId;
    obj.sequence = message.sequence !== BigInt(0) ? message.sequence.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: PacketIDAminoMsg): PacketID {
    return PacketID.fromAmino(object.value);
  },
  fromProtoMsg(message: PacketIDProtoMsg, useInterfaces: boolean = false): PacketID {
    return PacketID.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: PacketID): Uint8Array {
    return PacketID.encode(message).finish();
  },
  toProtoMsg(message: PacketID): PacketIDProtoMsg {
    return {
      typeUrl: "/neutron.feerefunder.PacketID",
      value: PacketID.encode(message).finish()
    };
  }
};