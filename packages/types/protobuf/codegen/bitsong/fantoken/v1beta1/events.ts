import { BinaryReader, BinaryWriter } from "../../../binary";
export interface EventIssue {
  denom: string;
}
export interface EventIssueProtoMsg {
  typeUrl: "/bitsong.fantoken.v1beta1.EventIssue";
  value: Uint8Array;
}
export interface EventIssueAmino {
  denom?: string;
}
export interface EventIssueAminoMsg {
  type: "/bitsong.fantoken.v1beta1.EventIssue";
  value: EventIssueAmino;
}
export interface EventIssueSDKType {
  denom: string;
}
export interface EventDisableMint {
  denom: string;
}
export interface EventDisableMintProtoMsg {
  typeUrl: "/bitsong.fantoken.v1beta1.EventDisableMint";
  value: Uint8Array;
}
export interface EventDisableMintAmino {
  denom?: string;
}
export interface EventDisableMintAminoMsg {
  type: "/bitsong.fantoken.v1beta1.EventDisableMint";
  value: EventDisableMintAmino;
}
export interface EventDisableMintSDKType {
  denom: string;
}
export interface EventMint {
  recipient: string;
  coin: string;
}
export interface EventMintProtoMsg {
  typeUrl: "/bitsong.fantoken.v1beta1.EventMint";
  value: Uint8Array;
}
export interface EventMintAmino {
  recipient?: string;
  coin?: string;
}
export interface EventMintAminoMsg {
  type: "/bitsong.fantoken.v1beta1.EventMint";
  value: EventMintAmino;
}
export interface EventMintSDKType {
  recipient: string;
  coin: string;
}
export interface EventBurn {
  sender: string;
  coin: string;
}
export interface EventBurnProtoMsg {
  typeUrl: "/bitsong.fantoken.v1beta1.EventBurn";
  value: Uint8Array;
}
export interface EventBurnAmino {
  sender?: string;
  coin?: string;
}
export interface EventBurnAminoMsg {
  type: "/bitsong.fantoken.v1beta1.EventBurn";
  value: EventBurnAmino;
}
export interface EventBurnSDKType {
  sender: string;
  coin: string;
}
export interface EventSetAuthority {
  denom: string;
  oldAuthority: string;
  newAuthority: string;
}
export interface EventSetAuthorityProtoMsg {
  typeUrl: "/bitsong.fantoken.v1beta1.EventSetAuthority";
  value: Uint8Array;
}
export interface EventSetAuthorityAmino {
  denom?: string;
  old_authority?: string;
  new_authority?: string;
}
export interface EventSetAuthorityAminoMsg {
  type: "/bitsong.fantoken.v1beta1.EventSetAuthority";
  value: EventSetAuthorityAmino;
}
export interface EventSetAuthoritySDKType {
  denom: string;
  old_authority: string;
  new_authority: string;
}
export interface EventSetMinter {
  denom: string;
  oldMinter: string;
  newMinter: string;
}
export interface EventSetMinterProtoMsg {
  typeUrl: "/bitsong.fantoken.v1beta1.EventSetMinter";
  value: Uint8Array;
}
export interface EventSetMinterAmino {
  denom?: string;
  old_minter?: string;
  new_minter?: string;
}
export interface EventSetMinterAminoMsg {
  type: "/bitsong.fantoken.v1beta1.EventSetMinter";
  value: EventSetMinterAmino;
}
export interface EventSetMinterSDKType {
  denom: string;
  old_minter: string;
  new_minter: string;
}
export interface EventSetUri {
  denom: string;
}
export interface EventSetUriProtoMsg {
  typeUrl: "/bitsong.fantoken.v1beta1.EventSetUri";
  value: Uint8Array;
}
export interface EventSetUriAmino {
  denom?: string;
}
export interface EventSetUriAminoMsg {
  type: "/bitsong.fantoken.v1beta1.EventSetUri";
  value: EventSetUriAmino;
}
export interface EventSetUriSDKType {
  denom: string;
}
function createBaseEventIssue(): EventIssue {
  return {
    denom: ""
  };
}
export const EventIssue = {
  typeUrl: "/bitsong.fantoken.v1beta1.EventIssue",
  encode(message: EventIssue, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventIssue {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventIssue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventIssue>): EventIssue {
    const message = createBaseEventIssue();
    message.denom = object.denom ?? "";
    return message;
  },
  fromAmino(object: EventIssueAmino): EventIssue {
    const message = createBaseEventIssue();
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    return message;
  },
  toAmino(message: EventIssue, useInterfaces: boolean = false): EventIssueAmino {
    const obj: any = {};
    obj.denom = message.denom;
    return obj;
  },
  fromAminoMsg(object: EventIssueAminoMsg): EventIssue {
    return EventIssue.fromAmino(object.value);
  },
  fromProtoMsg(message: EventIssueProtoMsg, useInterfaces: boolean = false): EventIssue {
    return EventIssue.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventIssue): Uint8Array {
    return EventIssue.encode(message).finish();
  },
  toProtoMsg(message: EventIssue): EventIssueProtoMsg {
    return {
      typeUrl: "/bitsong.fantoken.v1beta1.EventIssue",
      value: EventIssue.encode(message).finish()
    };
  }
};
function createBaseEventDisableMint(): EventDisableMint {
  return {
    denom: ""
  };
}
export const EventDisableMint = {
  typeUrl: "/bitsong.fantoken.v1beta1.EventDisableMint",
  encode(message: EventDisableMint, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventDisableMint {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventDisableMint();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventDisableMint>): EventDisableMint {
    const message = createBaseEventDisableMint();
    message.denom = object.denom ?? "";
    return message;
  },
  fromAmino(object: EventDisableMintAmino): EventDisableMint {
    const message = createBaseEventDisableMint();
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    return message;
  },
  toAmino(message: EventDisableMint, useInterfaces: boolean = false): EventDisableMintAmino {
    const obj: any = {};
    obj.denom = message.denom;
    return obj;
  },
  fromAminoMsg(object: EventDisableMintAminoMsg): EventDisableMint {
    return EventDisableMint.fromAmino(object.value);
  },
  fromProtoMsg(message: EventDisableMintProtoMsg, useInterfaces: boolean = false): EventDisableMint {
    return EventDisableMint.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventDisableMint): Uint8Array {
    return EventDisableMint.encode(message).finish();
  },
  toProtoMsg(message: EventDisableMint): EventDisableMintProtoMsg {
    return {
      typeUrl: "/bitsong.fantoken.v1beta1.EventDisableMint",
      value: EventDisableMint.encode(message).finish()
    };
  }
};
function createBaseEventMint(): EventMint {
  return {
    recipient: "",
    coin: ""
  };
}
export const EventMint = {
  typeUrl: "/bitsong.fantoken.v1beta1.EventMint",
  encode(message: EventMint, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.recipient !== "") {
      writer.uint32(10).string(message.recipient);
    }
    if (message.coin !== "") {
      writer.uint32(18).string(message.coin);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventMint {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventMint();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.recipient = reader.string();
          break;
        case 2:
          message.coin = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventMint>): EventMint {
    const message = createBaseEventMint();
    message.recipient = object.recipient ?? "";
    message.coin = object.coin ?? "";
    return message;
  },
  fromAmino(object: EventMintAmino): EventMint {
    const message = createBaseEventMint();
    if (object.recipient !== undefined && object.recipient !== null) {
      message.recipient = object.recipient;
    }
    if (object.coin !== undefined && object.coin !== null) {
      message.coin = object.coin;
    }
    return message;
  },
  toAmino(message: EventMint, useInterfaces: boolean = false): EventMintAmino {
    const obj: any = {};
    obj.recipient = message.recipient;
    obj.coin = message.coin;
    return obj;
  },
  fromAminoMsg(object: EventMintAminoMsg): EventMint {
    return EventMint.fromAmino(object.value);
  },
  fromProtoMsg(message: EventMintProtoMsg, useInterfaces: boolean = false): EventMint {
    return EventMint.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventMint): Uint8Array {
    return EventMint.encode(message).finish();
  },
  toProtoMsg(message: EventMint): EventMintProtoMsg {
    return {
      typeUrl: "/bitsong.fantoken.v1beta1.EventMint",
      value: EventMint.encode(message).finish()
    };
  }
};
function createBaseEventBurn(): EventBurn {
  return {
    sender: "",
    coin: ""
  };
}
export const EventBurn = {
  typeUrl: "/bitsong.fantoken.v1beta1.EventBurn",
  encode(message: EventBurn, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.coin !== "") {
      writer.uint32(18).string(message.coin);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventBurn {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventBurn();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.coin = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventBurn>): EventBurn {
    const message = createBaseEventBurn();
    message.sender = object.sender ?? "";
    message.coin = object.coin ?? "";
    return message;
  },
  fromAmino(object: EventBurnAmino): EventBurn {
    const message = createBaseEventBurn();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    if (object.coin !== undefined && object.coin !== null) {
      message.coin = object.coin;
    }
    return message;
  },
  toAmino(message: EventBurn, useInterfaces: boolean = false): EventBurnAmino {
    const obj: any = {};
    obj.sender = message.sender;
    obj.coin = message.coin;
    return obj;
  },
  fromAminoMsg(object: EventBurnAminoMsg): EventBurn {
    return EventBurn.fromAmino(object.value);
  },
  fromProtoMsg(message: EventBurnProtoMsg, useInterfaces: boolean = false): EventBurn {
    return EventBurn.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventBurn): Uint8Array {
    return EventBurn.encode(message).finish();
  },
  toProtoMsg(message: EventBurn): EventBurnProtoMsg {
    return {
      typeUrl: "/bitsong.fantoken.v1beta1.EventBurn",
      value: EventBurn.encode(message).finish()
    };
  }
};
function createBaseEventSetAuthority(): EventSetAuthority {
  return {
    denom: "",
    oldAuthority: "",
    newAuthority: ""
  };
}
export const EventSetAuthority = {
  typeUrl: "/bitsong.fantoken.v1beta1.EventSetAuthority",
  encode(message: EventSetAuthority, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.oldAuthority !== "") {
      writer.uint32(18).string(message.oldAuthority);
    }
    if (message.newAuthority !== "") {
      writer.uint32(26).string(message.newAuthority);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventSetAuthority {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSetAuthority();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.oldAuthority = reader.string();
          break;
        case 3:
          message.newAuthority = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventSetAuthority>): EventSetAuthority {
    const message = createBaseEventSetAuthority();
    message.denom = object.denom ?? "";
    message.oldAuthority = object.oldAuthority ?? "";
    message.newAuthority = object.newAuthority ?? "";
    return message;
  },
  fromAmino(object: EventSetAuthorityAmino): EventSetAuthority {
    const message = createBaseEventSetAuthority();
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.old_authority !== undefined && object.old_authority !== null) {
      message.oldAuthority = object.old_authority;
    }
    if (object.new_authority !== undefined && object.new_authority !== null) {
      message.newAuthority = object.new_authority;
    }
    return message;
  },
  toAmino(message: EventSetAuthority, useInterfaces: boolean = false): EventSetAuthorityAmino {
    const obj: any = {};
    obj.denom = message.denom;
    obj.old_authority = message.oldAuthority;
    obj.new_authority = message.newAuthority;
    return obj;
  },
  fromAminoMsg(object: EventSetAuthorityAminoMsg): EventSetAuthority {
    return EventSetAuthority.fromAmino(object.value);
  },
  fromProtoMsg(message: EventSetAuthorityProtoMsg, useInterfaces: boolean = false): EventSetAuthority {
    return EventSetAuthority.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventSetAuthority): Uint8Array {
    return EventSetAuthority.encode(message).finish();
  },
  toProtoMsg(message: EventSetAuthority): EventSetAuthorityProtoMsg {
    return {
      typeUrl: "/bitsong.fantoken.v1beta1.EventSetAuthority",
      value: EventSetAuthority.encode(message).finish()
    };
  }
};
function createBaseEventSetMinter(): EventSetMinter {
  return {
    denom: "",
    oldMinter: "",
    newMinter: ""
  };
}
export const EventSetMinter = {
  typeUrl: "/bitsong.fantoken.v1beta1.EventSetMinter",
  encode(message: EventSetMinter, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.oldMinter !== "") {
      writer.uint32(18).string(message.oldMinter);
    }
    if (message.newMinter !== "") {
      writer.uint32(26).string(message.newMinter);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventSetMinter {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSetMinter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.oldMinter = reader.string();
          break;
        case 3:
          message.newMinter = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventSetMinter>): EventSetMinter {
    const message = createBaseEventSetMinter();
    message.denom = object.denom ?? "";
    message.oldMinter = object.oldMinter ?? "";
    message.newMinter = object.newMinter ?? "";
    return message;
  },
  fromAmino(object: EventSetMinterAmino): EventSetMinter {
    const message = createBaseEventSetMinter();
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.old_minter !== undefined && object.old_minter !== null) {
      message.oldMinter = object.old_minter;
    }
    if (object.new_minter !== undefined && object.new_minter !== null) {
      message.newMinter = object.new_minter;
    }
    return message;
  },
  toAmino(message: EventSetMinter, useInterfaces: boolean = false): EventSetMinterAmino {
    const obj: any = {};
    obj.denom = message.denom;
    obj.old_minter = message.oldMinter;
    obj.new_minter = message.newMinter;
    return obj;
  },
  fromAminoMsg(object: EventSetMinterAminoMsg): EventSetMinter {
    return EventSetMinter.fromAmino(object.value);
  },
  fromProtoMsg(message: EventSetMinterProtoMsg, useInterfaces: boolean = false): EventSetMinter {
    return EventSetMinter.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventSetMinter): Uint8Array {
    return EventSetMinter.encode(message).finish();
  },
  toProtoMsg(message: EventSetMinter): EventSetMinterProtoMsg {
    return {
      typeUrl: "/bitsong.fantoken.v1beta1.EventSetMinter",
      value: EventSetMinter.encode(message).finish()
    };
  }
};
function createBaseEventSetUri(): EventSetUri {
  return {
    denom: ""
  };
}
export const EventSetUri = {
  typeUrl: "/bitsong.fantoken.v1beta1.EventSetUri",
  encode(message: EventSetUri, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventSetUri {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSetUri();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventSetUri>): EventSetUri {
    const message = createBaseEventSetUri();
    message.denom = object.denom ?? "";
    return message;
  },
  fromAmino(object: EventSetUriAmino): EventSetUri {
    const message = createBaseEventSetUri();
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    return message;
  },
  toAmino(message: EventSetUri, useInterfaces: boolean = false): EventSetUriAmino {
    const obj: any = {};
    obj.denom = message.denom;
    return obj;
  },
  fromAminoMsg(object: EventSetUriAminoMsg): EventSetUri {
    return EventSetUri.fromAmino(object.value);
  },
  fromProtoMsg(message: EventSetUriProtoMsg, useInterfaces: boolean = false): EventSetUri {
    return EventSetUri.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventSetUri): Uint8Array {
    return EventSetUri.encode(message).finish();
  },
  toProtoMsg(message: EventSetUri): EventSetUriProtoMsg {
    return {
      typeUrl: "/bitsong.fantoken.v1beta1.EventSetUri",
      value: EventSetUri.encode(message).finish()
    };
  }
};