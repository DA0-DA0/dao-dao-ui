import { Coin, CoinAmino, CoinSDKType } from "../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../binary";
import { bytesFromBase64, base64FromBytes } from "../../helpers";
export interface CreateHookProposal {
  /** Title is a short summary */
  title: string;
  /** Description is a human readable text */
  description: string;
  /** The account that will execute the msg on the schedule */
  executor: string;
  /** The contract that the msg is called on */
  contract: string;
  msg: Uint8Array;
  frequency: bigint;
  funds: Coin[];
}
export interface CreateHookProposalProtoMsg {
  typeUrl: "/kujira.scheduler.CreateHookProposal";
  value: Uint8Array;
}
export interface CreateHookProposalAmino {
  /** Title is a short summary */
  title?: string;
  /** Description is a human readable text */
  description?: string;
  /** The account that will execute the msg on the schedule */
  executor?: string;
  /** The contract that the msg is called on */
  contract?: string;
  msg?: string;
  frequency?: string;
  funds?: CoinAmino[];
}
export interface CreateHookProposalAminoMsg {
  type: "/kujira.scheduler.CreateHookProposal";
  value: CreateHookProposalAmino;
}
export interface CreateHookProposalSDKType {
  title: string;
  description: string;
  executor: string;
  contract: string;
  msg: Uint8Array;
  frequency: bigint;
  funds: CoinSDKType[];
}
export interface UpdateHookProposal {
  /** Title is a short summary */
  title: string;
  /** Description is a human readable text */
  description: string;
  id: bigint;
  executor: string;
  contract: string;
  msg: Uint8Array;
  frequency: bigint;
  funds: Coin[];
}
export interface UpdateHookProposalProtoMsg {
  typeUrl: "/kujira.scheduler.UpdateHookProposal";
  value: Uint8Array;
}
export interface UpdateHookProposalAmino {
  /** Title is a short summary */
  title?: string;
  /** Description is a human readable text */
  description?: string;
  id?: string;
  executor?: string;
  contract?: string;
  msg?: string;
  frequency?: string;
  funds?: CoinAmino[];
}
export interface UpdateHookProposalAminoMsg {
  type: "/kujira.scheduler.UpdateHookProposal";
  value: UpdateHookProposalAmino;
}
export interface UpdateHookProposalSDKType {
  title: string;
  description: string;
  id: bigint;
  executor: string;
  contract: string;
  msg: Uint8Array;
  frequency: bigint;
  funds: CoinSDKType[];
}
export interface DeleteHookProposal {
  /** Title is a short summary */
  title: string;
  /** Description is a human readable text */
  description: string;
  id: bigint;
}
export interface DeleteHookProposalProtoMsg {
  typeUrl: "/kujira.scheduler.DeleteHookProposal";
  value: Uint8Array;
}
export interface DeleteHookProposalAmino {
  /** Title is a short summary */
  title?: string;
  /** Description is a human readable text */
  description?: string;
  id?: string;
}
export interface DeleteHookProposalAminoMsg {
  type: "/kujira.scheduler.DeleteHookProposal";
  value: DeleteHookProposalAmino;
}
export interface DeleteHookProposalSDKType {
  title: string;
  description: string;
  id: bigint;
}
function createBaseCreateHookProposal(): CreateHookProposal {
  return {
    title: "",
    description: "",
    executor: "",
    contract: "",
    msg: new Uint8Array(),
    frequency: BigInt(0),
    funds: []
  };
}
export const CreateHookProposal = {
  typeUrl: "/kujira.scheduler.CreateHookProposal",
  encode(message: CreateHookProposal, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.executor !== "") {
      writer.uint32(26).string(message.executor);
    }
    if (message.contract !== "") {
      writer.uint32(34).string(message.contract);
    }
    if (message.msg.length !== 0) {
      writer.uint32(42).bytes(message.msg);
    }
    if (message.frequency !== BigInt(0)) {
      writer.uint32(48).int64(message.frequency);
    }
    for (const v of message.funds) {
      Coin.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): CreateHookProposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateHookProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.executor = reader.string();
          break;
        case 4:
          message.contract = reader.string();
          break;
        case 5:
          message.msg = reader.bytes();
          break;
        case 6:
          message.frequency = reader.int64();
          break;
        case 7:
          message.funds.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<CreateHookProposal>): CreateHookProposal {
    const message = createBaseCreateHookProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.executor = object.executor ?? "";
    message.contract = object.contract ?? "";
    message.msg = object.msg ?? new Uint8Array();
    message.frequency = object.frequency !== undefined && object.frequency !== null ? BigInt(object.frequency.toString()) : BigInt(0);
    message.funds = object.funds?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: CreateHookProposalAmino): CreateHookProposal {
    const message = createBaseCreateHookProposal();
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    }
    if (object.executor !== undefined && object.executor !== null) {
      message.executor = object.executor;
    }
    if (object.contract !== undefined && object.contract !== null) {
      message.contract = object.contract;
    }
    if (object.msg !== undefined && object.msg !== null) {
      message.msg = bytesFromBase64(object.msg);
    }
    if (object.frequency !== undefined && object.frequency !== null) {
      message.frequency = BigInt(object.frequency);
    }
    message.funds = object.funds?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: CreateHookProposal, useInterfaces: boolean = false): CreateHookProposalAmino {
    const obj: any = {};
    obj.title = message.title === "" ? undefined : message.title;
    obj.description = message.description === "" ? undefined : message.description;
    obj.executor = message.executor === "" ? undefined : message.executor;
    obj.contract = message.contract === "" ? undefined : message.contract;
    obj.msg = message.msg ? base64FromBytes(message.msg) : undefined;
    obj.frequency = message.frequency !== BigInt(0) ? message.frequency.toString() : undefined;
    if (message.funds) {
      obj.funds = message.funds.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.funds = message.funds;
    }
    return obj;
  },
  fromAminoMsg(object: CreateHookProposalAminoMsg): CreateHookProposal {
    return CreateHookProposal.fromAmino(object.value);
  },
  fromProtoMsg(message: CreateHookProposalProtoMsg, useInterfaces: boolean = false): CreateHookProposal {
    return CreateHookProposal.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: CreateHookProposal): Uint8Array {
    return CreateHookProposal.encode(message).finish();
  },
  toProtoMsg(message: CreateHookProposal): CreateHookProposalProtoMsg {
    return {
      typeUrl: "/kujira.scheduler.CreateHookProposal",
      value: CreateHookProposal.encode(message).finish()
    };
  }
};
function createBaseUpdateHookProposal(): UpdateHookProposal {
  return {
    title: "",
    description: "",
    id: BigInt(0),
    executor: "",
    contract: "",
    msg: new Uint8Array(),
    frequency: BigInt(0),
    funds: []
  };
}
export const UpdateHookProposal = {
  typeUrl: "/kujira.scheduler.UpdateHookProposal",
  encode(message: UpdateHookProposal, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.id !== BigInt(0)) {
      writer.uint32(24).uint64(message.id);
    }
    if (message.executor !== "") {
      writer.uint32(34).string(message.executor);
    }
    if (message.contract !== "") {
      writer.uint32(42).string(message.contract);
    }
    if (message.msg.length !== 0) {
      writer.uint32(50).bytes(message.msg);
    }
    if (message.frequency !== BigInt(0)) {
      writer.uint32(56).int64(message.frequency);
    }
    for (const v of message.funds) {
      Coin.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): UpdateHookProposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateHookProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.id = reader.uint64();
          break;
        case 4:
          message.executor = reader.string();
          break;
        case 5:
          message.contract = reader.string();
          break;
        case 6:
          message.msg = reader.bytes();
          break;
        case 7:
          message.frequency = reader.int64();
          break;
        case 8:
          message.funds.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<UpdateHookProposal>): UpdateHookProposal {
    const message = createBaseUpdateHookProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.executor = object.executor ?? "";
    message.contract = object.contract ?? "";
    message.msg = object.msg ?? new Uint8Array();
    message.frequency = object.frequency !== undefined && object.frequency !== null ? BigInt(object.frequency.toString()) : BigInt(0);
    message.funds = object.funds?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: UpdateHookProposalAmino): UpdateHookProposal {
    const message = createBaseUpdateHookProposal();
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.executor !== undefined && object.executor !== null) {
      message.executor = object.executor;
    }
    if (object.contract !== undefined && object.contract !== null) {
      message.contract = object.contract;
    }
    if (object.msg !== undefined && object.msg !== null) {
      message.msg = bytesFromBase64(object.msg);
    }
    if (object.frequency !== undefined && object.frequency !== null) {
      message.frequency = BigInt(object.frequency);
    }
    message.funds = object.funds?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: UpdateHookProposal, useInterfaces: boolean = false): UpdateHookProposalAmino {
    const obj: any = {};
    obj.title = message.title === "" ? undefined : message.title;
    obj.description = message.description === "" ? undefined : message.description;
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.executor = message.executor === "" ? undefined : message.executor;
    obj.contract = message.contract === "" ? undefined : message.contract;
    obj.msg = message.msg ? base64FromBytes(message.msg) : undefined;
    obj.frequency = message.frequency !== BigInt(0) ? message.frequency.toString() : undefined;
    if (message.funds) {
      obj.funds = message.funds.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.funds = message.funds;
    }
    return obj;
  },
  fromAminoMsg(object: UpdateHookProposalAminoMsg): UpdateHookProposal {
    return UpdateHookProposal.fromAmino(object.value);
  },
  fromProtoMsg(message: UpdateHookProposalProtoMsg, useInterfaces: boolean = false): UpdateHookProposal {
    return UpdateHookProposal.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: UpdateHookProposal): Uint8Array {
    return UpdateHookProposal.encode(message).finish();
  },
  toProtoMsg(message: UpdateHookProposal): UpdateHookProposalProtoMsg {
    return {
      typeUrl: "/kujira.scheduler.UpdateHookProposal",
      value: UpdateHookProposal.encode(message).finish()
    };
  }
};
function createBaseDeleteHookProposal(): DeleteHookProposal {
  return {
    title: "",
    description: "",
    id: BigInt(0)
  };
}
export const DeleteHookProposal = {
  typeUrl: "/kujira.scheduler.DeleteHookProposal",
  encode(message: DeleteHookProposal, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.id !== BigInt(0)) {
      writer.uint32(24).uint64(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): DeleteHookProposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteHookProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.id = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<DeleteHookProposal>): DeleteHookProposal {
    const message = createBaseDeleteHookProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: DeleteHookProposalAmino): DeleteHookProposal {
    const message = createBaseDeleteHookProposal();
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    return message;
  },
  toAmino(message: DeleteHookProposal, useInterfaces: boolean = false): DeleteHookProposalAmino {
    const obj: any = {};
    obj.title = message.title === "" ? undefined : message.title;
    obj.description = message.description === "" ? undefined : message.description;
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: DeleteHookProposalAminoMsg): DeleteHookProposal {
    return DeleteHookProposal.fromAmino(object.value);
  },
  fromProtoMsg(message: DeleteHookProposalProtoMsg, useInterfaces: boolean = false): DeleteHookProposal {
    return DeleteHookProposal.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: DeleteHookProposal): Uint8Array {
    return DeleteHookProposal.encode(message).finish();
  },
  toProtoMsg(message: DeleteHookProposal): DeleteHookProposalProtoMsg {
    return {
      typeUrl: "/kujira.scheduler.DeleteHookProposal",
      value: DeleteHookProposal.encode(message).finish()
    };
  }
};