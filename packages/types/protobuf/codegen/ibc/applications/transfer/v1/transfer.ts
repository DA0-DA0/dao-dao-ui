import { BinaryReader, BinaryWriter } from "../../../../binary";
/**
 * Params defines the set of IBC transfer parameters.
 * NOTE: To prevent a single token from being transferred, set the
 * TransfersEnabled parameter to true and then set the bank module's SendEnabled
 * parameter for the denomination to false.
 */
export interface Params {
  /**
   * send_enabled enables or disables all cross-chain token transfers from this
   * chain.
   */
  sendEnabled: boolean;
  /**
   * receive_enabled enables or disables all cross-chain token transfers to this
   * chain.
   */
  receiveEnabled: boolean;
}
export interface ParamsProtoMsg {
  typeUrl: "/ibc.applications.transfer.v1.Params";
  value: Uint8Array;
}
/**
 * Params defines the set of IBC transfer parameters.
 * NOTE: To prevent a single token from being transferred, set the
 * TransfersEnabled parameter to true and then set the bank module's SendEnabled
 * parameter for the denomination to false.
 */
export interface ParamsAmino {
  /**
   * send_enabled enables or disables all cross-chain token transfers from this
   * chain.
   */
  send_enabled?: boolean;
  /**
   * receive_enabled enables or disables all cross-chain token transfers to this
   * chain.
   */
  receive_enabled?: boolean;
}
export interface ParamsAminoMsg {
  type: "cosmos-sdk/Params";
  value: ParamsAmino;
}
/**
 * Params defines the set of IBC transfer parameters.
 * NOTE: To prevent a single token from being transferred, set the
 * TransfersEnabled parameter to true and then set the bank module's SendEnabled
 * parameter for the denomination to false.
 */
export interface ParamsSDKType {
  send_enabled: boolean;
  receive_enabled: boolean;
}
/**
 * Hop defines a port ID, channel ID pair specifying where tokens must be forwarded
 * next in a multihop transfer.
 */
export interface Hop {
  portId: string;
  channelId: string;
}
export interface HopProtoMsg {
  typeUrl: "/ibc.applications.transfer.v1.Hop";
  value: Uint8Array;
}
/**
 * Hop defines a port ID, channel ID pair specifying where tokens must be forwarded
 * next in a multihop transfer.
 */
export interface HopAmino {
  port_id?: string;
  channel_id?: string;
}
export interface HopAminoMsg {
  type: "cosmos-sdk/Hop";
  value: HopAmino;
}
/**
 * Hop defines a port ID, channel ID pair specifying where tokens must be forwarded
 * next in a multihop transfer.
 */
export interface HopSDKType {
  port_id: string;
  channel_id: string;
}
function createBaseParams(): Params {
  return {
    sendEnabled: false,
    receiveEnabled: false
  };
}
export const Params = {
  typeUrl: "/ibc.applications.transfer.v1.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sendEnabled === true) {
      writer.uint32(8).bool(message.sendEnabled);
    }
    if (message.receiveEnabled === true) {
      writer.uint32(16).bool(message.receiveEnabled);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): Params {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sendEnabled = reader.bool();
          break;
        case 2:
          message.receiveEnabled = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Params>): Params {
    const message = createBaseParams();
    message.sendEnabled = object.sendEnabled ?? false;
    message.receiveEnabled = object.receiveEnabled ?? false;
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    const message = createBaseParams();
    if (object.send_enabled !== undefined && object.send_enabled !== null) {
      message.sendEnabled = object.send_enabled;
    }
    if (object.receive_enabled !== undefined && object.receive_enabled !== null) {
      message.receiveEnabled = object.receive_enabled;
    }
    return message;
  },
  toAmino(message: Params, useInterfaces: boolean = false): ParamsAmino {
    const obj: any = {};
    obj.send_enabled = message.sendEnabled === false ? undefined : message.sendEnabled;
    obj.receive_enabled = message.receiveEnabled === false ? undefined : message.receiveEnabled;
    return obj;
  },
  fromAminoMsg(object: ParamsAminoMsg): Params {
    return Params.fromAmino(object.value);
  },
  toAminoMsg(message: Params, useInterfaces: boolean = false): ParamsAminoMsg {
    return {
      type: "cosmos-sdk/Params",
      value: Params.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: ParamsProtoMsg, useInterfaces: boolean = false): Params {
    return Params.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Params): Uint8Array {
    return Params.encode(message).finish();
  },
  toProtoMsg(message: Params): ParamsProtoMsg {
    return {
      typeUrl: "/ibc.applications.transfer.v1.Params",
      value: Params.encode(message).finish()
    };
  }
};
function createBaseHop(): Hop {
  return {
    portId: "",
    channelId: ""
  };
}
export const Hop = {
  typeUrl: "/ibc.applications.transfer.v1.Hop",
  encode(message: Hop, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.portId !== "") {
      writer.uint32(10).string(message.portId);
    }
    if (message.channelId !== "") {
      writer.uint32(18).string(message.channelId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): Hop {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHop();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.portId = reader.string();
          break;
        case 2:
          message.channelId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Hop>): Hop {
    const message = createBaseHop();
    message.portId = object.portId ?? "";
    message.channelId = object.channelId ?? "";
    return message;
  },
  fromAmino(object: HopAmino): Hop {
    const message = createBaseHop();
    if (object.port_id !== undefined && object.port_id !== null) {
      message.portId = object.port_id;
    }
    if (object.channel_id !== undefined && object.channel_id !== null) {
      message.channelId = object.channel_id;
    }
    return message;
  },
  toAmino(message: Hop, useInterfaces: boolean = false): HopAmino {
    const obj: any = {};
    obj.port_id = message.portId === "" ? undefined : message.portId;
    obj.channel_id = message.channelId === "" ? undefined : message.channelId;
    return obj;
  },
  fromAminoMsg(object: HopAminoMsg): Hop {
    return Hop.fromAmino(object.value);
  },
  toAminoMsg(message: Hop, useInterfaces: boolean = false): HopAminoMsg {
    return {
      type: "cosmos-sdk/Hop",
      value: Hop.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: HopProtoMsg, useInterfaces: boolean = false): Hop {
    return Hop.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Hop): Uint8Array {
    return Hop.encode(message).finish();
  },
  toProtoMsg(message: Hop): HopProtoMsg {
    return {
      typeUrl: "/ibc.applications.transfer.v1.Hop",
      value: Hop.encode(message).finish()
    };
  }
};