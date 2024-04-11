//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../../binary";
import { bytesFromBase64, base64FromBytes } from "../../../helpers";
export interface QueryEncryptedSeedRequest {
  pubKey: Uint8Array;
}
export interface QueryEncryptedSeedRequestProtoMsg {
  typeUrl: "/secret.registration.v1beta1.QueryEncryptedSeedRequest";
  value: Uint8Array;
}
export interface QueryEncryptedSeedRequestAmino {
  pub_key?: string;
}
export interface QueryEncryptedSeedRequestAminoMsg {
  type: "/secret.registration.v1beta1.QueryEncryptedSeedRequest";
  value: QueryEncryptedSeedRequestAmino;
}
export interface QueryEncryptedSeedRequestSDKType {
  pub_key: Uint8Array;
}
export interface QueryEncryptedSeedResponse {
  /** [(gogoproto.nullable) = false]; */
  encryptedSeed: Uint8Array;
}
export interface QueryEncryptedSeedResponseProtoMsg {
  typeUrl: "/secret.registration.v1beta1.QueryEncryptedSeedResponse";
  value: Uint8Array;
}
export interface QueryEncryptedSeedResponseAmino {
  /** [(gogoproto.nullable) = false]; */
  encrypted_seed?: string;
}
export interface QueryEncryptedSeedResponseAminoMsg {
  type: "/secret.registration.v1beta1.QueryEncryptedSeedResponse";
  value: QueryEncryptedSeedResponseAmino;
}
export interface QueryEncryptedSeedResponseSDKType {
  encrypted_seed: Uint8Array;
}
function createBaseQueryEncryptedSeedRequest(): QueryEncryptedSeedRequest {
  return {
    pubKey: new Uint8Array()
  };
}
export const QueryEncryptedSeedRequest = {
  typeUrl: "/secret.registration.v1beta1.QueryEncryptedSeedRequest",
  encode(message: QueryEncryptedSeedRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pubKey.length !== 0) {
      writer.uint32(10).bytes(message.pubKey);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryEncryptedSeedRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryEncryptedSeedRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pubKey = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryEncryptedSeedRequest>): QueryEncryptedSeedRequest {
    const message = createBaseQueryEncryptedSeedRequest();
    message.pubKey = object.pubKey ?? new Uint8Array();
    return message;
  },
  fromAmino(object: QueryEncryptedSeedRequestAmino): QueryEncryptedSeedRequest {
    const message = createBaseQueryEncryptedSeedRequest();
    if (object.pub_key !== undefined && object.pub_key !== null) {
      message.pubKey = bytesFromBase64(object.pub_key);
    }
    return message;
  },
  toAmino(message: QueryEncryptedSeedRequest, useInterfaces: boolean = false): QueryEncryptedSeedRequestAmino {
    const obj: any = {};
    obj.pub_key = message.pubKey ? base64FromBytes(message.pubKey) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryEncryptedSeedRequestAminoMsg): QueryEncryptedSeedRequest {
    return QueryEncryptedSeedRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryEncryptedSeedRequestProtoMsg, useInterfaces: boolean = false): QueryEncryptedSeedRequest {
    return QueryEncryptedSeedRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryEncryptedSeedRequest): Uint8Array {
    return QueryEncryptedSeedRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryEncryptedSeedRequest): QueryEncryptedSeedRequestProtoMsg {
    return {
      typeUrl: "/secret.registration.v1beta1.QueryEncryptedSeedRequest",
      value: QueryEncryptedSeedRequest.encode(message).finish()
    };
  }
};
function createBaseQueryEncryptedSeedResponse(): QueryEncryptedSeedResponse {
  return {
    encryptedSeed: new Uint8Array()
  };
}
export const QueryEncryptedSeedResponse = {
  typeUrl: "/secret.registration.v1beta1.QueryEncryptedSeedResponse",
  encode(message: QueryEncryptedSeedResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.encryptedSeed.length !== 0) {
      writer.uint32(10).bytes(message.encryptedSeed);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryEncryptedSeedResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryEncryptedSeedResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.encryptedSeed = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryEncryptedSeedResponse>): QueryEncryptedSeedResponse {
    const message = createBaseQueryEncryptedSeedResponse();
    message.encryptedSeed = object.encryptedSeed ?? new Uint8Array();
    return message;
  },
  fromAmino(object: QueryEncryptedSeedResponseAmino): QueryEncryptedSeedResponse {
    const message = createBaseQueryEncryptedSeedResponse();
    if (object.encrypted_seed !== undefined && object.encrypted_seed !== null) {
      message.encryptedSeed = bytesFromBase64(object.encrypted_seed);
    }
    return message;
  },
  toAmino(message: QueryEncryptedSeedResponse, useInterfaces: boolean = false): QueryEncryptedSeedResponseAmino {
    const obj: any = {};
    obj.encrypted_seed = message.encryptedSeed ? base64FromBytes(message.encryptedSeed) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryEncryptedSeedResponseAminoMsg): QueryEncryptedSeedResponse {
    return QueryEncryptedSeedResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryEncryptedSeedResponseProtoMsg, useInterfaces: boolean = false): QueryEncryptedSeedResponse {
    return QueryEncryptedSeedResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryEncryptedSeedResponse): Uint8Array {
    return QueryEncryptedSeedResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryEncryptedSeedResponse): QueryEncryptedSeedResponseProtoMsg {
    return {
      typeUrl: "/secret.registration.v1beta1.QueryEncryptedSeedResponse",
      value: QueryEncryptedSeedResponse.encode(message).finish()
    };
  }
};