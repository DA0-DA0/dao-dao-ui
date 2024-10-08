import { BinaryReader, BinaryWriter } from "../../binary";
import { bytesFromBase64, base64FromBytes } from "../../helpers";
/** ExtensionData is a data structure that can be used in transaction extensions. */
export interface ExtensionData {
  /**
   * protocol_id is the identifier of the protocol
   * the field is not used internally but it is validated for correctness
   */
  protocolId: string;
  /**
   * protocol_version is the identifier of the protocol version
   * the field is not used internally but it is validated for correctness
   */
  protocolVersion: string;
  /**
   * arbitrary bytes data that can be used to store any data
   * the field is not used internally but it is validated and must be provided
   */
  data: Uint8Array;
}
export interface ExtensionDataProtoMsg {
  typeUrl: "/gaia.metaprotocols.ExtensionData";
  value: Uint8Array;
}
/** ExtensionData is a data structure that can be used in transaction extensions. */
export interface ExtensionDataAmino {
  /**
   * protocol_id is the identifier of the protocol
   * the field is not used internally but it is validated for correctness
   */
  protocol_id?: string;
  /**
   * protocol_version is the identifier of the protocol version
   * the field is not used internally but it is validated for correctness
   */
  protocol_version?: string;
  /**
   * arbitrary bytes data that can be used to store any data
   * the field is not used internally but it is validated and must be provided
   */
  data?: string;
}
export interface ExtensionDataAminoMsg {
  type: "/gaia.metaprotocols.ExtensionData";
  value: ExtensionDataAmino;
}
/** ExtensionData is a data structure that can be used in transaction extensions. */
export interface ExtensionDataSDKType {
  protocol_id: string;
  protocol_version: string;
  data: Uint8Array;
}
function createBaseExtensionData(): ExtensionData {
  return {
    protocolId: "",
    protocolVersion: "",
    data: new Uint8Array()
  };
}
export const ExtensionData = {
  typeUrl: "/gaia.metaprotocols.ExtensionData",
  encode(message: ExtensionData, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.protocolId !== "") {
      writer.uint32(10).string(message.protocolId);
    }
    if (message.protocolVersion !== "") {
      writer.uint32(18).string(message.protocolVersion);
    }
    if (message.data.length !== 0) {
      writer.uint32(26).bytes(message.data);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ExtensionData {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExtensionData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.protocolId = reader.string();
          break;
        case 2:
          message.protocolVersion = reader.string();
          break;
        case 3:
          message.data = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ExtensionData>): ExtensionData {
    const message = createBaseExtensionData();
    message.protocolId = object.protocolId ?? "";
    message.protocolVersion = object.protocolVersion ?? "";
    message.data = object.data ?? new Uint8Array();
    return message;
  },
  fromAmino(object: ExtensionDataAmino): ExtensionData {
    const message = createBaseExtensionData();
    if (object.protocol_id !== undefined && object.protocol_id !== null) {
      message.protocolId = object.protocol_id;
    }
    if (object.protocol_version !== undefined && object.protocol_version !== null) {
      message.protocolVersion = object.protocol_version;
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = bytesFromBase64(object.data);
    }
    return message;
  },
  toAmino(message: ExtensionData, useInterfaces: boolean = false): ExtensionDataAmino {
    const obj: any = {};
    obj.protocol_id = message.protocolId === "" ? undefined : message.protocolId;
    obj.protocol_version = message.protocolVersion === "" ? undefined : message.protocolVersion;
    obj.data = message.data ? base64FromBytes(message.data) : undefined;
    return obj;
  },
  fromAminoMsg(object: ExtensionDataAminoMsg): ExtensionData {
    return ExtensionData.fromAmino(object.value);
  },
  fromProtoMsg(message: ExtensionDataProtoMsg, useInterfaces: boolean = false): ExtensionData {
    return ExtensionData.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ExtensionData): Uint8Array {
    return ExtensionData.encode(message).finish();
  },
  toProtoMsg(message: ExtensionData): ExtensionDataProtoMsg {
    return {
      typeUrl: "/gaia.metaprotocols.ExtensionData",
      value: ExtensionData.encode(message).finish()
    };
  }
};