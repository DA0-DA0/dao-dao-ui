import { BinaryReader, BinaryWriter } from "../../binary";
export interface Schedule {
  /** Name of schedule */
  name: string;
  /** Period in blocks */
  period: bigint;
  /** Msgs that will be executed every period amount of time */
  msgs: MsgExecuteContract[];
  /** Last execution's block height */
  lastExecuteHeight: bigint;
}
export interface ScheduleProtoMsg {
  typeUrl: "/neutron.cron.Schedule";
  value: Uint8Array;
}
export interface ScheduleAmino {
  /** Name of schedule */
  name?: string;
  /** Period in blocks */
  period?: string;
  /** Msgs that will be executed every period amount of time */
  msgs?: MsgExecuteContractAmino[];
  /** Last execution's block height */
  last_execute_height?: string;
}
export interface ScheduleAminoMsg {
  type: "/neutron.cron.Schedule";
  value: ScheduleAmino;
}
export interface ScheduleSDKType {
  name: string;
  period: bigint;
  msgs: MsgExecuteContractSDKType[];
  last_execute_height: bigint;
}
export interface MsgExecuteContract {
  /** Contract is the address of the smart contract */
  contract: string;
  /** Msg is json encoded message to be passed to the contract */
  msg: string;
}
export interface MsgExecuteContractProtoMsg {
  typeUrl: "/neutron.cron.MsgExecuteContract";
  value: Uint8Array;
}
export interface MsgExecuteContractAmino {
  /** Contract is the address of the smart contract */
  contract?: string;
  /** Msg is json encoded message to be passed to the contract */
  msg?: string;
}
export interface MsgExecuteContractAminoMsg {
  type: "/neutron.cron.MsgExecuteContract";
  value: MsgExecuteContractAmino;
}
export interface MsgExecuteContractSDKType {
  contract: string;
  msg: string;
}
export interface ScheduleCount {
  /** Count is the number of current schedules */
  count: number;
}
export interface ScheduleCountProtoMsg {
  typeUrl: "/neutron.cron.ScheduleCount";
  value: Uint8Array;
}
export interface ScheduleCountAmino {
  /** Count is the number of current schedules */
  count?: number;
}
export interface ScheduleCountAminoMsg {
  type: "/neutron.cron.ScheduleCount";
  value: ScheduleCountAmino;
}
export interface ScheduleCountSDKType {
  count: number;
}
function createBaseSchedule(): Schedule {
  return {
    name: "",
    period: BigInt(0),
    msgs: [],
    lastExecuteHeight: BigInt(0)
  };
}
export const Schedule = {
  typeUrl: "/neutron.cron.Schedule",
  encode(message: Schedule, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.period !== BigInt(0)) {
      writer.uint32(16).uint64(message.period);
    }
    for (const v of message.msgs) {
      MsgExecuteContract.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.lastExecuteHeight !== BigInt(0)) {
      writer.uint32(32).uint64(message.lastExecuteHeight);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): Schedule {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSchedule();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.period = reader.uint64();
          break;
        case 3:
          message.msgs.push(MsgExecuteContract.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 4:
          message.lastExecuteHeight = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Schedule>): Schedule {
    const message = createBaseSchedule();
    message.name = object.name ?? "";
    message.period = object.period !== undefined && object.period !== null ? BigInt(object.period.toString()) : BigInt(0);
    message.msgs = object.msgs?.map(e => MsgExecuteContract.fromPartial(e)) || [];
    message.lastExecuteHeight = object.lastExecuteHeight !== undefined && object.lastExecuteHeight !== null ? BigInt(object.lastExecuteHeight.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: ScheduleAmino): Schedule {
    const message = createBaseSchedule();
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    }
    if (object.period !== undefined && object.period !== null) {
      message.period = BigInt(object.period);
    }
    message.msgs = object.msgs?.map(e => MsgExecuteContract.fromAmino(e)) || [];
    if (object.last_execute_height !== undefined && object.last_execute_height !== null) {
      message.lastExecuteHeight = BigInt(object.last_execute_height);
    }
    return message;
  },
  toAmino(message: Schedule, useInterfaces: boolean = false): ScheduleAmino {
    const obj: any = {};
    obj.name = message.name;
    obj.period = message.period ? message.period.toString() : undefined;
    if (message.msgs) {
      obj.msgs = message.msgs.map(e => e ? MsgExecuteContract.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.msgs = [];
    }
    obj.last_execute_height = message.lastExecuteHeight ? message.lastExecuteHeight.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: ScheduleAminoMsg): Schedule {
    return Schedule.fromAmino(object.value);
  },
  fromProtoMsg(message: ScheduleProtoMsg, useInterfaces: boolean = false): Schedule {
    return Schedule.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Schedule): Uint8Array {
    return Schedule.encode(message).finish();
  },
  toProtoMsg(message: Schedule): ScheduleProtoMsg {
    return {
      typeUrl: "/neutron.cron.Schedule",
      value: Schedule.encode(message).finish()
    };
  }
};
function createBaseMsgExecuteContract(): MsgExecuteContract {
  return {
    contract: "",
    msg: ""
  };
}
export const MsgExecuteContract = {
  typeUrl: "/neutron.cron.MsgExecuteContract",
  encode(message: MsgExecuteContract, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.contract !== "") {
      writer.uint32(10).string(message.contract);
    }
    if (message.msg !== "") {
      writer.uint32(18).string(message.msg);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgExecuteContract {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgExecuteContract();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.contract = reader.string();
          break;
        case 2:
          message.msg = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgExecuteContract>): MsgExecuteContract {
    const message = createBaseMsgExecuteContract();
    message.contract = object.contract ?? "";
    message.msg = object.msg ?? "";
    return message;
  },
  fromAmino(object: MsgExecuteContractAmino): MsgExecuteContract {
    const message = createBaseMsgExecuteContract();
    if (object.contract !== undefined && object.contract !== null) {
      message.contract = object.contract;
    }
    if (object.msg !== undefined && object.msg !== null) {
      message.msg = object.msg;
    }
    return message;
  },
  toAmino(message: MsgExecuteContract, useInterfaces: boolean = false): MsgExecuteContractAmino {
    const obj: any = {};
    obj.contract = message.contract;
    obj.msg = message.msg;
    return obj;
  },
  fromAminoMsg(object: MsgExecuteContractAminoMsg): MsgExecuteContract {
    return MsgExecuteContract.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgExecuteContractProtoMsg, useInterfaces: boolean = false): MsgExecuteContract {
    return MsgExecuteContract.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgExecuteContract): Uint8Array {
    return MsgExecuteContract.encode(message).finish();
  },
  toProtoMsg(message: MsgExecuteContract): MsgExecuteContractProtoMsg {
    return {
      typeUrl: "/neutron.cron.MsgExecuteContract",
      value: MsgExecuteContract.encode(message).finish()
    };
  }
};
function createBaseScheduleCount(): ScheduleCount {
  return {
    count: 0
  };
}
export const ScheduleCount = {
  typeUrl: "/neutron.cron.ScheduleCount",
  encode(message: ScheduleCount, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.count !== 0) {
      writer.uint32(8).int32(message.count);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ScheduleCount {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseScheduleCount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.count = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ScheduleCount>): ScheduleCount {
    const message = createBaseScheduleCount();
    message.count = object.count ?? 0;
    return message;
  },
  fromAmino(object: ScheduleCountAmino): ScheduleCount {
    const message = createBaseScheduleCount();
    if (object.count !== undefined && object.count !== null) {
      message.count = object.count;
    }
    return message;
  },
  toAmino(message: ScheduleCount, useInterfaces: boolean = false): ScheduleCountAmino {
    const obj: any = {};
    obj.count = message.count;
    return obj;
  },
  fromAminoMsg(object: ScheduleCountAminoMsg): ScheduleCount {
    return ScheduleCount.fromAmino(object.value);
  },
  fromProtoMsg(message: ScheduleCountProtoMsg, useInterfaces: boolean = false): ScheduleCount {
    return ScheduleCount.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ScheduleCount): Uint8Array {
    return ScheduleCount.encode(message).finish();
  },
  toProtoMsg(message: ScheduleCount): ScheduleCountProtoMsg {
    return {
      typeUrl: "/neutron.cron.ScheduleCount",
      value: ScheduleCount.encode(message).finish()
    };
  }
};