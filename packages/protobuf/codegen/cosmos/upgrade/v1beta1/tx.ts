//@ts-nocheck
import { Plan, PlanAmino, PlanSDKType } from "./upgrade";
import { BinaryReader, BinaryWriter } from "../../../binary";
/**
 * MsgSoftwareUpgrade is the Msg/SoftwareUpgrade request type.
 * 
 * Since: cosmos-sdk 0.46
 */
export interface MsgSoftwareUpgrade {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority: string;
  /** plan is the upgrade plan. */
  plan: Plan | undefined;
}
export interface MsgSoftwareUpgradeProtoMsg {
  typeUrl: "/cosmos.upgrade.v1beta1.MsgSoftwareUpgrade";
  value: Uint8Array;
}
/**
 * MsgSoftwareUpgrade is the Msg/SoftwareUpgrade request type.
 * 
 * Since: cosmos-sdk 0.46
 */
export interface MsgSoftwareUpgradeAmino {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority: string;
  /** plan is the upgrade plan. */
  plan?: PlanAmino | undefined;
}
export interface MsgSoftwareUpgradeAminoMsg {
  type: "cosmos-sdk/MsgSoftwareUpgrade";
  value: MsgSoftwareUpgradeAmino;
}
/**
 * MsgSoftwareUpgrade is the Msg/SoftwareUpgrade request type.
 * 
 * Since: cosmos-sdk 0.46
 */
export interface MsgSoftwareUpgradeSDKType {
  authority: string;
  plan: PlanSDKType | undefined;
}
/**
 * MsgSoftwareUpgradeResponse is the Msg/SoftwareUpgrade response type.
 * 
 * Since: cosmos-sdk 0.46
 */
export interface MsgSoftwareUpgradeResponse {}
export interface MsgSoftwareUpgradeResponseProtoMsg {
  typeUrl: "/cosmos.upgrade.v1beta1.MsgSoftwareUpgradeResponse";
  value: Uint8Array;
}
/**
 * MsgSoftwareUpgradeResponse is the Msg/SoftwareUpgrade response type.
 * 
 * Since: cosmos-sdk 0.46
 */
export interface MsgSoftwareUpgradeResponseAmino {}
export interface MsgSoftwareUpgradeResponseAminoMsg {
  type: "cosmos-sdk/MsgSoftwareUpgradeResponse";
  value: MsgSoftwareUpgradeResponseAmino;
}
/**
 * MsgSoftwareUpgradeResponse is the Msg/SoftwareUpgrade response type.
 * 
 * Since: cosmos-sdk 0.46
 */
export interface MsgSoftwareUpgradeResponseSDKType {}
/**
 * MsgCancelUpgrade is the Msg/CancelUpgrade request type.
 * 
 * Since: cosmos-sdk 0.46
 */
export interface MsgCancelUpgrade {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority: string;
}
export interface MsgCancelUpgradeProtoMsg {
  typeUrl: "/cosmos.upgrade.v1beta1.MsgCancelUpgrade";
  value: Uint8Array;
}
/**
 * MsgCancelUpgrade is the Msg/CancelUpgrade request type.
 * 
 * Since: cosmos-sdk 0.46
 */
export interface MsgCancelUpgradeAmino {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority: string;
}
export interface MsgCancelUpgradeAminoMsg {
  type: "cosmos-sdk/MsgCancelUpgrade";
  value: MsgCancelUpgradeAmino;
}
/**
 * MsgCancelUpgrade is the Msg/CancelUpgrade request type.
 * 
 * Since: cosmos-sdk 0.46
 */
export interface MsgCancelUpgradeSDKType {
  authority: string;
}
/**
 * MsgCancelUpgradeResponse is the Msg/CancelUpgrade response type.
 * 
 * Since: cosmos-sdk 0.46
 */
export interface MsgCancelUpgradeResponse {}
export interface MsgCancelUpgradeResponseProtoMsg {
  typeUrl: "/cosmos.upgrade.v1beta1.MsgCancelUpgradeResponse";
  value: Uint8Array;
}
/**
 * MsgCancelUpgradeResponse is the Msg/CancelUpgrade response type.
 * 
 * Since: cosmos-sdk 0.46
 */
export interface MsgCancelUpgradeResponseAmino {}
export interface MsgCancelUpgradeResponseAminoMsg {
  type: "cosmos-sdk/MsgCancelUpgradeResponse";
  value: MsgCancelUpgradeResponseAmino;
}
/**
 * MsgCancelUpgradeResponse is the Msg/CancelUpgrade response type.
 * 
 * Since: cosmos-sdk 0.46
 */
export interface MsgCancelUpgradeResponseSDKType {}
function createBaseMsgSoftwareUpgrade(): MsgSoftwareUpgrade {
  return {
    authority: "",
    plan: Plan.fromPartial({})
  };
}
export const MsgSoftwareUpgrade = {
  typeUrl: "/cosmos.upgrade.v1beta1.MsgSoftwareUpgrade",
  encode(message: MsgSoftwareUpgrade, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.plan !== undefined) {
      Plan.encode(message.plan, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSoftwareUpgrade {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSoftwareUpgrade();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.plan = Plan.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSoftwareUpgrade>): MsgSoftwareUpgrade {
    const message = createBaseMsgSoftwareUpgrade();
    message.authority = object.authority ?? "";
    message.plan = object.plan !== undefined && object.plan !== null ? Plan.fromPartial(object.plan) : undefined;
    return message;
  },
  fromAmino(object: MsgSoftwareUpgradeAmino): MsgSoftwareUpgrade {
    return {
      authority: object.authority,
      plan: object?.plan ? Plan.fromAmino(object.plan) : undefined
    };
  },
  toAmino(message: MsgSoftwareUpgrade, useInterfaces: boolean = false): MsgSoftwareUpgradeAmino {
    const obj: any = {};
    obj.authority = message.authority;
    obj.plan = message.plan ? Plan.toAmino(message.plan, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgSoftwareUpgradeAminoMsg): MsgSoftwareUpgrade {
    return MsgSoftwareUpgrade.fromAmino(object.value);
  },
  toAminoMsg(message: MsgSoftwareUpgrade, useInterfaces: boolean = false): MsgSoftwareUpgradeAminoMsg {
    return {
      type: "cosmos-sdk/MsgSoftwareUpgrade",
      value: MsgSoftwareUpgrade.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgSoftwareUpgradeProtoMsg, useInterfaces: boolean = false): MsgSoftwareUpgrade {
    return MsgSoftwareUpgrade.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSoftwareUpgrade): Uint8Array {
    return MsgSoftwareUpgrade.encode(message).finish();
  },
  toProtoMsg(message: MsgSoftwareUpgrade): MsgSoftwareUpgradeProtoMsg {
    return {
      typeUrl: "/cosmos.upgrade.v1beta1.MsgSoftwareUpgrade",
      value: MsgSoftwareUpgrade.encode(message).finish()
    };
  }
};
function createBaseMsgSoftwareUpgradeResponse(): MsgSoftwareUpgradeResponse {
  return {};
}
export const MsgSoftwareUpgradeResponse = {
  typeUrl: "/cosmos.upgrade.v1beta1.MsgSoftwareUpgradeResponse",
  encode(_: MsgSoftwareUpgradeResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSoftwareUpgradeResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSoftwareUpgradeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgSoftwareUpgradeResponse>): MsgSoftwareUpgradeResponse {
    const message = createBaseMsgSoftwareUpgradeResponse();
    return message;
  },
  fromAmino(_: MsgSoftwareUpgradeResponseAmino): MsgSoftwareUpgradeResponse {
    return {};
  },
  toAmino(_: MsgSoftwareUpgradeResponse, useInterfaces: boolean = false): MsgSoftwareUpgradeResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgSoftwareUpgradeResponseAminoMsg): MsgSoftwareUpgradeResponse {
    return MsgSoftwareUpgradeResponse.fromAmino(object.value);
  },
  toAminoMsg(message: MsgSoftwareUpgradeResponse, useInterfaces: boolean = false): MsgSoftwareUpgradeResponseAminoMsg {
    return {
      type: "cosmos-sdk/MsgSoftwareUpgradeResponse",
      value: MsgSoftwareUpgradeResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgSoftwareUpgradeResponseProtoMsg, useInterfaces: boolean = false): MsgSoftwareUpgradeResponse {
    return MsgSoftwareUpgradeResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSoftwareUpgradeResponse): Uint8Array {
    return MsgSoftwareUpgradeResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSoftwareUpgradeResponse): MsgSoftwareUpgradeResponseProtoMsg {
    return {
      typeUrl: "/cosmos.upgrade.v1beta1.MsgSoftwareUpgradeResponse",
      value: MsgSoftwareUpgradeResponse.encode(message).finish()
    };
  }
};
function createBaseMsgCancelUpgrade(): MsgCancelUpgrade {
  return {
    authority: ""
  };
}
export const MsgCancelUpgrade = {
  typeUrl: "/cosmos.upgrade.v1beta1.MsgCancelUpgrade",
  encode(message: MsgCancelUpgrade, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgCancelUpgrade {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCancelUpgrade();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgCancelUpgrade>): MsgCancelUpgrade {
    const message = createBaseMsgCancelUpgrade();
    message.authority = object.authority ?? "";
    return message;
  },
  fromAmino(object: MsgCancelUpgradeAmino): MsgCancelUpgrade {
    return {
      authority: object.authority
    };
  },
  toAmino(message: MsgCancelUpgrade, useInterfaces: boolean = false): MsgCancelUpgradeAmino {
    const obj: any = {};
    obj.authority = message.authority;
    return obj;
  },
  fromAminoMsg(object: MsgCancelUpgradeAminoMsg): MsgCancelUpgrade {
    return MsgCancelUpgrade.fromAmino(object.value);
  },
  toAminoMsg(message: MsgCancelUpgrade, useInterfaces: boolean = false): MsgCancelUpgradeAminoMsg {
    return {
      type: "cosmos-sdk/MsgCancelUpgrade",
      value: MsgCancelUpgrade.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgCancelUpgradeProtoMsg, useInterfaces: boolean = false): MsgCancelUpgrade {
    return MsgCancelUpgrade.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgCancelUpgrade): Uint8Array {
    return MsgCancelUpgrade.encode(message).finish();
  },
  toProtoMsg(message: MsgCancelUpgrade): MsgCancelUpgradeProtoMsg {
    return {
      typeUrl: "/cosmos.upgrade.v1beta1.MsgCancelUpgrade",
      value: MsgCancelUpgrade.encode(message).finish()
    };
  }
};
function createBaseMsgCancelUpgradeResponse(): MsgCancelUpgradeResponse {
  return {};
}
export const MsgCancelUpgradeResponse = {
  typeUrl: "/cosmos.upgrade.v1beta1.MsgCancelUpgradeResponse",
  encode(_: MsgCancelUpgradeResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgCancelUpgradeResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCancelUpgradeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgCancelUpgradeResponse>): MsgCancelUpgradeResponse {
    const message = createBaseMsgCancelUpgradeResponse();
    return message;
  },
  fromAmino(_: MsgCancelUpgradeResponseAmino): MsgCancelUpgradeResponse {
    return {};
  },
  toAmino(_: MsgCancelUpgradeResponse, useInterfaces: boolean = false): MsgCancelUpgradeResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgCancelUpgradeResponseAminoMsg): MsgCancelUpgradeResponse {
    return MsgCancelUpgradeResponse.fromAmino(object.value);
  },
  toAminoMsg(message: MsgCancelUpgradeResponse, useInterfaces: boolean = false): MsgCancelUpgradeResponseAminoMsg {
    return {
      type: "cosmos-sdk/MsgCancelUpgradeResponse",
      value: MsgCancelUpgradeResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgCancelUpgradeResponseProtoMsg, useInterfaces: boolean = false): MsgCancelUpgradeResponse {
    return MsgCancelUpgradeResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgCancelUpgradeResponse): Uint8Array {
    return MsgCancelUpgradeResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgCancelUpgradeResponse): MsgCancelUpgradeResponseProtoMsg {
    return {
      typeUrl: "/cosmos.upgrade.v1beta1.MsgCancelUpgradeResponse",
      value: MsgCancelUpgradeResponse.encode(message).finish()
    };
  }
};