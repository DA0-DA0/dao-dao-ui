import { BinaryReader, BinaryWriter } from "../../../binary";
/** Information about an ongoing sweep ibc transfer waiting to be completed */
export interface SweepTransfer {
  /** the timeout timestamp set on the ibc transfer */
  timeout: bigint;
  /** host chain id */
  hostChain: string;
  /** the channel of the transfer */
  channel: string;
  /** whether the transfer is meant to bring back Pryzm protocol fees, in which case the epochs field is empty */
  fee: boolean;
  /** list of the epochs that the sweep transfer is related to */
  epochs: bigint[];
  /** the amount of tokens being transferred */
  amount: string;
}
export interface SweepTransferProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.SweepTransfer";
  value: Uint8Array;
}
/** Information about an ongoing sweep ibc transfer waiting to be completed */
export interface SweepTransferAmino {
  /** the timeout timestamp set on the ibc transfer */
  timeout?: string;
  /** host chain id */
  host_chain?: string;
  /** the channel of the transfer */
  channel?: string;
  /** whether the transfer is meant to bring back Pryzm protocol fees, in which case the epochs field is empty */
  fee?: boolean;
  /** list of the epochs that the sweep transfer is related to */
  epochs?: string[];
  /** the amount of tokens being transferred */
  amount?: string;
}
export interface SweepTransferAminoMsg {
  type: "/pryzm.icstaking.v1.SweepTransfer";
  value: SweepTransferAmino;
}
/** Information about an ongoing sweep ibc transfer waiting to be completed */
export interface SweepTransferSDKType {
  timeout: bigint;
  host_chain: string;
  channel: string;
  fee: boolean;
  epochs: bigint[];
  amount: string;
}
function createBaseSweepTransfer(): SweepTransfer {
  return {
    timeout: BigInt(0),
    hostChain: "",
    channel: "",
    fee: false,
    epochs: [],
    amount: ""
  };
}
export const SweepTransfer = {
  typeUrl: "/pryzm.icstaking.v1.SweepTransfer",
  encode(message: SweepTransfer, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.timeout !== BigInt(0)) {
      writer.uint32(8).uint64(message.timeout);
    }
    if (message.hostChain !== "") {
      writer.uint32(18).string(message.hostChain);
    }
    if (message.channel !== "") {
      writer.uint32(26).string(message.channel);
    }
    if (message.fee === true) {
      writer.uint32(32).bool(message.fee);
    }
    writer.uint32(42).fork();
    for (const v of message.epochs) {
      writer.uint64(v);
    }
    writer.ldelim();
    if (message.amount !== "") {
      writer.uint32(50).string(message.amount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): SweepTransfer {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSweepTransfer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.timeout = reader.uint64();
          break;
        case 2:
          message.hostChain = reader.string();
          break;
        case 3:
          message.channel = reader.string();
          break;
        case 4:
          message.fee = reader.bool();
          break;
        case 5:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.epochs.push(reader.uint64());
            }
          } else {
            message.epochs.push(reader.uint64());
          }
          break;
        case 6:
          message.amount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<SweepTransfer>): SweepTransfer {
    const message = createBaseSweepTransfer();
    message.timeout = object.timeout !== undefined && object.timeout !== null ? BigInt(object.timeout.toString()) : BigInt(0);
    message.hostChain = object.hostChain ?? "";
    message.channel = object.channel ?? "";
    message.fee = object.fee ?? false;
    message.epochs = object.epochs?.map(e => BigInt(e.toString())) || [];
    message.amount = object.amount ?? "";
    return message;
  },
  fromAmino(object: SweepTransferAmino): SweepTransfer {
    const message = createBaseSweepTransfer();
    if (object.timeout !== undefined && object.timeout !== null) {
      message.timeout = BigInt(object.timeout);
    }
    if (object.host_chain !== undefined && object.host_chain !== null) {
      message.hostChain = object.host_chain;
    }
    if (object.channel !== undefined && object.channel !== null) {
      message.channel = object.channel;
    }
    if (object.fee !== undefined && object.fee !== null) {
      message.fee = object.fee;
    }
    message.epochs = object.epochs?.map(e => BigInt(e)) || [];
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    }
    return message;
  },
  toAmino(message: SweepTransfer, useInterfaces: boolean = false): SweepTransferAmino {
    const obj: any = {};
    obj.timeout = message.timeout !== BigInt(0) ? message.timeout.toString() : undefined;
    obj.host_chain = message.hostChain === "" ? undefined : message.hostChain;
    obj.channel = message.channel === "" ? undefined : message.channel;
    obj.fee = message.fee === false ? undefined : message.fee;
    if (message.epochs) {
      obj.epochs = message.epochs.map(e => e.toString());
    } else {
      obj.epochs = message.epochs;
    }
    obj.amount = message.amount === "" ? undefined : message.amount;
    return obj;
  },
  fromAminoMsg(object: SweepTransferAminoMsg): SweepTransfer {
    return SweepTransfer.fromAmino(object.value);
  },
  fromProtoMsg(message: SweepTransferProtoMsg, useInterfaces: boolean = false): SweepTransfer {
    return SweepTransfer.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: SweepTransfer): Uint8Array {
    return SweepTransfer.encode(message).finish();
  },
  toProtoMsg(message: SweepTransfer): SweepTransferProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.SweepTransfer",
      value: SweepTransfer.encode(message).finish()
    };
  }
};