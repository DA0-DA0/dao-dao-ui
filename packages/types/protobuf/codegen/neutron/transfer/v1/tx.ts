//@ts-nocheck
import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { Height, HeightAmino, HeightSDKType } from "../../../ibc/core/client/v1/client";
import { Fee, FeeAmino, FeeSDKType } from "../../feerefunder/fee";
import { BinaryReader, BinaryWriter } from "../../../binary";
export interface MsgTransfer {
  /** the port on which the packet will be sent */
  sourcePort: string;
  /** the channel by which the packet will be sent */
  sourceChannel: string;
  /** the tokens to be transferred */
  token: Coin | undefined;
  /** the sender address */
  sender: string;
  /** the recipient address on the destination chain */
  receiver: string;
  /**
   * Timeout height relative to the current block height.
   * The timeout is disabled when set to 0.
   */
  timeoutHeight: Height | undefined;
  /**
   * Timeout timestamp in absolute nanoseconds since unix epoch.
   * The timeout is disabled when set to 0.
   */
  timeoutTimestamp: bigint;
  memo: string;
  fee: Fee | undefined;
}
export interface MsgTransferProtoMsg {
  typeUrl: "/neutron.transfer.MsgTransfer";
  value: Uint8Array;
}
export interface MsgTransferAmino {
  /** the port on which the packet will be sent */
  source_port?: string;
  /** the channel by which the packet will be sent */
  source_channel?: string;
  /** the tokens to be transferred */
  token?: CoinAmino | undefined;
  /** the sender address */
  sender?: string;
  /** the recipient address on the destination chain */
  receiver?: string;
  /**
   * Timeout height relative to the current block height.
   * The timeout is disabled when set to 0.
   */
  timeout_height?: HeightAmino | undefined;
  /**
   * Timeout timestamp in absolute nanoseconds since unix epoch.
   * The timeout is disabled when set to 0.
   */
  timeout_timestamp?: string;
  memo?: string;
  fee?: FeeAmino | undefined;
}
export interface MsgTransferAminoMsg {
  type: "/neutron.transfer.MsgTransfer";
  value: MsgTransferAmino;
}
export interface MsgTransferSDKType {
  source_port: string;
  source_channel: string;
  token: CoinSDKType | undefined;
  sender: string;
  receiver: string;
  timeout_height: HeightSDKType | undefined;
  timeout_timestamp: bigint;
  memo: string;
  fee: FeeSDKType | undefined;
}
/**
 * MsgTransferResponse is the modified response type for
 * ibc-go MsgTransfer.
 */
export interface MsgTransferResponse {
  /** channel's sequence_id for outgoing ibc packet. Unique per a channel. */
  sequenceId: bigint;
  /** channel src channel on neutron side trasaction was submitted from */
  channel: string;
}
export interface MsgTransferResponseProtoMsg {
  typeUrl: "/neutron.transfer.MsgTransferResponse";
  value: Uint8Array;
}
/**
 * MsgTransferResponse is the modified response type for
 * ibc-go MsgTransfer.
 */
export interface MsgTransferResponseAmino {
  /** channel's sequence_id for outgoing ibc packet. Unique per a channel. */
  sequence_id?: string;
  /** channel src channel on neutron side trasaction was submitted from */
  channel?: string;
}
export interface MsgTransferResponseAminoMsg {
  type: "/neutron.transfer.MsgTransferResponse";
  value: MsgTransferResponseAmino;
}
/**
 * MsgTransferResponse is the modified response type for
 * ibc-go MsgTransfer.
 */
export interface MsgTransferResponseSDKType {
  sequence_id: bigint;
  channel: string;
}
function createBaseMsgTransfer(): MsgTransfer {
  return {
    sourcePort: "",
    sourceChannel: "",
    token: Coin.fromPartial({}),
    sender: "",
    receiver: "",
    timeoutHeight: Height.fromPartial({}),
    timeoutTimestamp: BigInt(0),
    memo: "",
    fee: Fee.fromPartial({})
  };
}
export const MsgTransfer = {
  typeUrl: "/neutron.transfer.MsgTransfer",
  encode(message: MsgTransfer, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sourcePort !== "") {
      writer.uint32(10).string(message.sourcePort);
    }
    if (message.sourceChannel !== "") {
      writer.uint32(18).string(message.sourceChannel);
    }
    if (message.token !== undefined) {
      Coin.encode(message.token, writer.uint32(26).fork()).ldelim();
    }
    if (message.sender !== "") {
      writer.uint32(34).string(message.sender);
    }
    if (message.receiver !== "") {
      writer.uint32(42).string(message.receiver);
    }
    if (message.timeoutHeight !== undefined) {
      Height.encode(message.timeoutHeight, writer.uint32(50).fork()).ldelim();
    }
    if (message.timeoutTimestamp !== BigInt(0)) {
      writer.uint32(56).uint64(message.timeoutTimestamp);
    }
    if (message.memo !== "") {
      writer.uint32(66).string(message.memo);
    }
    if (message.fee !== undefined) {
      Fee.encode(message.fee, writer.uint32(74).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgTransfer {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTransfer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sourcePort = reader.string();
          break;
        case 2:
          message.sourceChannel = reader.string();
          break;
        case 3:
          message.token = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 4:
          message.sender = reader.string();
          break;
        case 5:
          message.receiver = reader.string();
          break;
        case 6:
          message.timeoutHeight = Height.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 7:
          message.timeoutTimestamp = reader.uint64();
          break;
        case 8:
          message.memo = reader.string();
          break;
        case 9:
          message.fee = Fee.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgTransfer>): MsgTransfer {
    const message = createBaseMsgTransfer();
    message.sourcePort = object.sourcePort ?? "";
    message.sourceChannel = object.sourceChannel ?? "";
    message.token = object.token !== undefined && object.token !== null ? Coin.fromPartial(object.token) : undefined;
    message.sender = object.sender ?? "";
    message.receiver = object.receiver ?? "";
    message.timeoutHeight = object.timeoutHeight !== undefined && object.timeoutHeight !== null ? Height.fromPartial(object.timeoutHeight) : undefined;
    message.timeoutTimestamp = object.timeoutTimestamp !== undefined && object.timeoutTimestamp !== null ? BigInt(object.timeoutTimestamp.toString()) : BigInt(0);
    message.memo = object.memo ?? "";
    message.fee = object.fee !== undefined && object.fee !== null ? Fee.fromPartial(object.fee) : undefined;
    return message;
  },
  fromAmino(object: MsgTransferAmino): MsgTransfer {
    const message = createBaseMsgTransfer();
    if (object.source_port !== undefined && object.source_port !== null) {
      message.sourcePort = object.source_port;
    }
    if (object.source_channel !== undefined && object.source_channel !== null) {
      message.sourceChannel = object.source_channel;
    }
    if (object.token !== undefined && object.token !== null) {
      message.token = Coin.fromAmino(object.token);
    }
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    if (object.receiver !== undefined && object.receiver !== null) {
      message.receiver = object.receiver;
    }
    if (object.timeout_height !== undefined && object.timeout_height !== null) {
      message.timeoutHeight = Height.fromAmino(object.timeout_height);
    }
    if (object.timeout_timestamp !== undefined && object.timeout_timestamp !== null) {
      message.timeoutTimestamp = BigInt(object.timeout_timestamp);
    }
    if (object.memo !== undefined && object.memo !== null) {
      message.memo = object.memo;
    }
    if (object.fee !== undefined && object.fee !== null) {
      message.fee = Fee.fromAmino(object.fee);
    }
    return message;
  },
  toAmino(message: MsgTransfer, useInterfaces: boolean = false): MsgTransferAmino {
    const obj: any = {};
    obj.source_port = message.sourcePort;
    obj.source_channel = message.sourceChannel;
    obj.token = message.token ? Coin.toAmino(message.token, useInterfaces) : undefined;
    obj.sender = message.sender;
    obj.receiver = message.receiver;
    obj.timeout_height = message.timeoutHeight ? Height.toAmino(message.timeoutHeight, useInterfaces) : {};
    obj.timeout_timestamp = message.timeoutTimestamp ? message.timeoutTimestamp.toString() : undefined;
    obj.memo = message.memo;
    obj.fee = message.fee ? Fee.toAmino(message.fee, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgTransferAminoMsg): MsgTransfer {
    return MsgTransfer.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgTransferProtoMsg, useInterfaces: boolean = false): MsgTransfer {
    return MsgTransfer.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgTransfer): Uint8Array {
    return MsgTransfer.encode(message).finish();
  },
  toProtoMsg(message: MsgTransfer): MsgTransferProtoMsg {
    return {
      typeUrl: "/neutron.transfer.MsgTransfer",
      value: MsgTransfer.encode(message).finish()
    };
  }
};
function createBaseMsgTransferResponse(): MsgTransferResponse {
  return {
    sequenceId: BigInt(0),
    channel: ""
  };
}
export const MsgTransferResponse = {
  typeUrl: "/neutron.transfer.MsgTransferResponse",
  encode(message: MsgTransferResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sequenceId !== BigInt(0)) {
      writer.uint32(8).uint64(message.sequenceId);
    }
    if (message.channel !== "") {
      writer.uint32(18).string(message.channel);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgTransferResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTransferResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sequenceId = reader.uint64();
          break;
        case 2:
          message.channel = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgTransferResponse>): MsgTransferResponse {
    const message = createBaseMsgTransferResponse();
    message.sequenceId = object.sequenceId !== undefined && object.sequenceId !== null ? BigInt(object.sequenceId.toString()) : BigInt(0);
    message.channel = object.channel ?? "";
    return message;
  },
  fromAmino(object: MsgTransferResponseAmino): MsgTransferResponse {
    const message = createBaseMsgTransferResponse();
    if (object.sequence_id !== undefined && object.sequence_id !== null) {
      message.sequenceId = BigInt(object.sequence_id);
    }
    if (object.channel !== undefined && object.channel !== null) {
      message.channel = object.channel;
    }
    return message;
  },
  toAmino(message: MsgTransferResponse, useInterfaces: boolean = false): MsgTransferResponseAmino {
    const obj: any = {};
    obj.sequence_id = message.sequenceId ? message.sequenceId.toString() : undefined;
    obj.channel = message.channel;
    return obj;
  },
  fromAminoMsg(object: MsgTransferResponseAminoMsg): MsgTransferResponse {
    return MsgTransferResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgTransferResponseProtoMsg, useInterfaces: boolean = false): MsgTransferResponse {
    return MsgTransferResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgTransferResponse): Uint8Array {
    return MsgTransferResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgTransferResponse): MsgTransferResponseProtoMsg {
    return {
      typeUrl: "/neutron.transfer.MsgTransferResponse",
      value: MsgTransferResponse.encode(message).finish()
    };
  }
};