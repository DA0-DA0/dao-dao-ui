//@ts-nocheck
import { Validator, ValidatorAmino, ValidatorSDKType } from "./validator";
import { BinaryReader, BinaryWriter } from "../../binary";
export interface AddValidatorsProposal {
  title: string;
  description: string;
  hostZone: string;
  validators: Validator[];
  deposit: string;
}
export interface AddValidatorsProposalProtoMsg {
  typeUrl: "/stride.stakeibc.AddValidatorsProposal";
  value: Uint8Array;
}
export interface AddValidatorsProposalAmino {
  title?: string;
  description?: string;
  host_zone?: string;
  validators?: ValidatorAmino[];
  deposit?: string;
}
export interface AddValidatorsProposalAminoMsg {
  type: "stakeibc/AddValidatorsProposal";
  value: AddValidatorsProposalAmino;
}
export interface AddValidatorsProposalSDKType {
  title: string;
  description: string;
  host_zone: string;
  validators: ValidatorSDKType[];
  deposit: string;
}
export interface ToggleLSMProposal {
  title: string;
  description: string;
  hostZone: string;
  enabled: boolean;
  deposit: string;
}
export interface ToggleLSMProposalProtoMsg {
  typeUrl: "/stride.stakeibc.ToggleLSMProposal";
  value: Uint8Array;
}
export interface ToggleLSMProposalAmino {
  title?: string;
  description?: string;
  host_zone?: string;
  enabled?: boolean;
  deposit?: string;
}
export interface ToggleLSMProposalAminoMsg {
  type: "stakeibc/ToggleLSMProposal";
  value: ToggleLSMProposalAmino;
}
export interface ToggleLSMProposalSDKType {
  title: string;
  description: string;
  host_zone: string;
  enabled: boolean;
  deposit: string;
}
function createBaseAddValidatorsProposal(): AddValidatorsProposal {
  return {
    title: "",
    description: "",
    hostZone: "",
    validators: [],
    deposit: ""
  };
}
export const AddValidatorsProposal = {
  typeUrl: "/stride.stakeibc.AddValidatorsProposal",
  encode(message: AddValidatorsProposal, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.hostZone !== "") {
      writer.uint32(26).string(message.hostZone);
    }
    for (const v of message.validators) {
      Validator.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.deposit !== "") {
      writer.uint32(42).string(message.deposit);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): AddValidatorsProposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddValidatorsProposal();
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
          message.hostZone = reader.string();
          break;
        case 4:
          message.validators.push(Validator.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 5:
          message.deposit = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<AddValidatorsProposal>): AddValidatorsProposal {
    const message = createBaseAddValidatorsProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.hostZone = object.hostZone ?? "";
    message.validators = object.validators?.map(e => Validator.fromPartial(e)) || [];
    message.deposit = object.deposit ?? "";
    return message;
  },
  fromAmino(object: AddValidatorsProposalAmino): AddValidatorsProposal {
    const message = createBaseAddValidatorsProposal();
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    }
    if (object.host_zone !== undefined && object.host_zone !== null) {
      message.hostZone = object.host_zone;
    }
    message.validators = object.validators?.map(e => Validator.fromAmino(e)) || [];
    if (object.deposit !== undefined && object.deposit !== null) {
      message.deposit = object.deposit;
    }
    return message;
  },
  toAmino(message: AddValidatorsProposal, useInterfaces: boolean = false): AddValidatorsProposalAmino {
    const obj: any = {};
    obj.title = message.title === "" ? undefined : message.title;
    obj.description = message.description === "" ? undefined : message.description;
    obj.host_zone = message.hostZone === "" ? undefined : message.hostZone;
    if (message.validators) {
      obj.validators = message.validators.map(e => e ? Validator.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.validators = message.validators;
    }
    obj.deposit = message.deposit === "" ? undefined : message.deposit;
    return obj;
  },
  fromAminoMsg(object: AddValidatorsProposalAminoMsg): AddValidatorsProposal {
    return AddValidatorsProposal.fromAmino(object.value);
  },
  toAminoMsg(message: AddValidatorsProposal, useInterfaces: boolean = false): AddValidatorsProposalAminoMsg {
    return {
      type: "stakeibc/AddValidatorsProposal",
      value: AddValidatorsProposal.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: AddValidatorsProposalProtoMsg, useInterfaces: boolean = false): AddValidatorsProposal {
    return AddValidatorsProposal.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: AddValidatorsProposal): Uint8Array {
    return AddValidatorsProposal.encode(message).finish();
  },
  toProtoMsg(message: AddValidatorsProposal): AddValidatorsProposalProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.AddValidatorsProposal",
      value: AddValidatorsProposal.encode(message).finish()
    };
  }
};
function createBaseToggleLSMProposal(): ToggleLSMProposal {
  return {
    title: "",
    description: "",
    hostZone: "",
    enabled: false,
    deposit: ""
  };
}
export const ToggleLSMProposal = {
  typeUrl: "/stride.stakeibc.ToggleLSMProposal",
  encode(message: ToggleLSMProposal, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.hostZone !== "") {
      writer.uint32(26).string(message.hostZone);
    }
    if (message.enabled === true) {
      writer.uint32(32).bool(message.enabled);
    }
    if (message.deposit !== "") {
      writer.uint32(42).string(message.deposit);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ToggleLSMProposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseToggleLSMProposal();
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
          message.hostZone = reader.string();
          break;
        case 4:
          message.enabled = reader.bool();
          break;
        case 5:
          message.deposit = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ToggleLSMProposal>): ToggleLSMProposal {
    const message = createBaseToggleLSMProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.hostZone = object.hostZone ?? "";
    message.enabled = object.enabled ?? false;
    message.deposit = object.deposit ?? "";
    return message;
  },
  fromAmino(object: ToggleLSMProposalAmino): ToggleLSMProposal {
    const message = createBaseToggleLSMProposal();
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    }
    if (object.host_zone !== undefined && object.host_zone !== null) {
      message.hostZone = object.host_zone;
    }
    if (object.enabled !== undefined && object.enabled !== null) {
      message.enabled = object.enabled;
    }
    if (object.deposit !== undefined && object.deposit !== null) {
      message.deposit = object.deposit;
    }
    return message;
  },
  toAmino(message: ToggleLSMProposal, useInterfaces: boolean = false): ToggleLSMProposalAmino {
    const obj: any = {};
    obj.title = message.title === "" ? undefined : message.title;
    obj.description = message.description === "" ? undefined : message.description;
    obj.host_zone = message.hostZone === "" ? undefined : message.hostZone;
    obj.enabled = message.enabled === false ? undefined : message.enabled;
    obj.deposit = message.deposit === "" ? undefined : message.deposit;
    return obj;
  },
  fromAminoMsg(object: ToggleLSMProposalAminoMsg): ToggleLSMProposal {
    return ToggleLSMProposal.fromAmino(object.value);
  },
  toAminoMsg(message: ToggleLSMProposal, useInterfaces: boolean = false): ToggleLSMProposalAminoMsg {
    return {
      type: "stakeibc/ToggleLSMProposal",
      value: ToggleLSMProposal.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: ToggleLSMProposalProtoMsg, useInterfaces: boolean = false): ToggleLSMProposal {
    return ToggleLSMProposal.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ToggleLSMProposal): Uint8Array {
    return ToggleLSMProposal.encode(message).finish();
  },
  toProtoMsg(message: ToggleLSMProposal): ToggleLSMProposalProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.ToggleLSMProposal",
      value: ToggleLSMProposal.encode(message).finish()
    };
  }
};