import { BinaryReader, BinaryWriter } from "../../../binary";
import { bytesFromBase64, base64FromBytes } from "../../../helpers";
/**
 * TokenPair is used to look up the Noble token (i.e. "uusdc") from a remote
 * domain token address Multiple remote_domain + remote_token pairs can map to
 * the same local_token
 * 
 * @param remote_domain the remote domain_id corresponding to the token
 * @param remote_token the remote token address
 * @param local_token the corresponding Noble token denom in uunits
 */
export interface TokenPair {
  remoteDomain: number;
  remoteToken: Uint8Array;
  localToken: string;
}
export interface TokenPairProtoMsg {
  typeUrl: "/circle.cctp.v1.TokenPair";
  value: Uint8Array;
}
/**
 * TokenPair is used to look up the Noble token (i.e. "uusdc") from a remote
 * domain token address Multiple remote_domain + remote_token pairs can map to
 * the same local_token
 * 
 * @param remote_domain the remote domain_id corresponding to the token
 * @param remote_token the remote token address
 * @param local_token the corresponding Noble token denom in uunits
 */
export interface TokenPairAmino {
  remote_domain?: number;
  remote_token?: string;
  local_token?: string;
}
export interface TokenPairAminoMsg {
  type: "/circle.cctp.v1.TokenPair";
  value: TokenPairAmino;
}
/**
 * TokenPair is used to look up the Noble token (i.e. "uusdc") from a remote
 * domain token address Multiple remote_domain + remote_token pairs can map to
 * the same local_token
 * 
 * @param remote_domain the remote domain_id corresponding to the token
 * @param remote_token the remote token address
 * @param local_token the corresponding Noble token denom in uunits
 */
export interface TokenPairSDKType {
  remote_domain: number;
  remote_token: Uint8Array;
  local_token: string;
}
function createBaseTokenPair(): TokenPair {
  return {
    remoteDomain: 0,
    remoteToken: new Uint8Array(),
    localToken: ""
  };
}
export const TokenPair = {
  typeUrl: "/circle.cctp.v1.TokenPair",
  encode(message: TokenPair, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.remoteDomain !== 0) {
      writer.uint32(8).uint32(message.remoteDomain);
    }
    if (message.remoteToken.length !== 0) {
      writer.uint32(18).bytes(message.remoteToken);
    }
    if (message.localToken !== "") {
      writer.uint32(26).string(message.localToken);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): TokenPair {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTokenPair();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.remoteDomain = reader.uint32();
          break;
        case 2:
          message.remoteToken = reader.bytes();
          break;
        case 3:
          message.localToken = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<TokenPair>): TokenPair {
    const message = createBaseTokenPair();
    message.remoteDomain = object.remoteDomain ?? 0;
    message.remoteToken = object.remoteToken ?? new Uint8Array();
    message.localToken = object.localToken ?? "";
    return message;
  },
  fromAmino(object: TokenPairAmino): TokenPair {
    const message = createBaseTokenPair();
    if (object.remote_domain !== undefined && object.remote_domain !== null) {
      message.remoteDomain = object.remote_domain;
    }
    if (object.remote_token !== undefined && object.remote_token !== null) {
      message.remoteToken = bytesFromBase64(object.remote_token);
    }
    if (object.local_token !== undefined && object.local_token !== null) {
      message.localToken = object.local_token;
    }
    return message;
  },
  toAmino(message: TokenPair, useInterfaces: boolean = false): TokenPairAmino {
    const obj: any = {};
    obj.remote_domain = message.remoteDomain;
    obj.remote_token = message.remoteToken ? base64FromBytes(message.remoteToken) : undefined;
    obj.local_token = message.localToken;
    return obj;
  },
  fromAminoMsg(object: TokenPairAminoMsg): TokenPair {
    return TokenPair.fromAmino(object.value);
  },
  fromProtoMsg(message: TokenPairProtoMsg, useInterfaces: boolean = false): TokenPair {
    return TokenPair.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: TokenPair): Uint8Array {
    return TokenPair.encode(message).finish();
  },
  toProtoMsg(message: TokenPair): TokenPairProtoMsg {
    return {
      typeUrl: "/circle.cctp.v1.TokenPair",
      value: TokenPair.encode(message).finish()
    };
  }
};