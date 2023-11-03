import { BinaryReader, BinaryWriter } from "../../../../binary";
/** ===================== JoinPoolExecuteMsg */
export interface EmptyRequest {}
export interface EmptyRequestProtoMsg {
  typeUrl: "/osmosis.cosmwasmpool.v1beta1.EmptyRequest";
  value: Uint8Array;
}
/** ===================== JoinPoolExecuteMsg */
export interface EmptyRequestAmino {}
export interface EmptyRequestAminoMsg {
  type: "osmosis/cosmwasmpool/empty-request";
  value: EmptyRequestAmino;
}
/** ===================== JoinPoolExecuteMsg */
export interface EmptyRequestSDKType {}
export interface JoinPoolExecuteMsgRequest {
  /**
   * join_pool is the structure containing all request fields of the join pool
   * execute message.
   */
  joinPool: EmptyRequest | undefined;
}
export interface JoinPoolExecuteMsgRequestProtoMsg {
  typeUrl: "/osmosis.cosmwasmpool.v1beta1.JoinPoolExecuteMsgRequest";
  value: Uint8Array;
}
export interface JoinPoolExecuteMsgRequestAmino {
  /**
   * join_pool is the structure containing all request fields of the join pool
   * execute message.
   */
  join_pool?: EmptyRequestAmino | undefined;
}
export interface JoinPoolExecuteMsgRequestAminoMsg {
  type: "osmosis/cosmwasmpool/join-pool-execute-msg-request";
  value: JoinPoolExecuteMsgRequestAmino;
}
export interface JoinPoolExecuteMsgRequestSDKType {
  join_pool: EmptyRequestSDKType | undefined;
}
export interface JoinPoolExecuteMsgResponse {}
export interface JoinPoolExecuteMsgResponseProtoMsg {
  typeUrl: "/osmosis.cosmwasmpool.v1beta1.JoinPoolExecuteMsgResponse";
  value: Uint8Array;
}
export interface JoinPoolExecuteMsgResponseAmino {}
export interface JoinPoolExecuteMsgResponseAminoMsg {
  type: "osmosis/cosmwasmpool/join-pool-execute-msg-response";
  value: JoinPoolExecuteMsgResponseAmino;
}
export interface JoinPoolExecuteMsgResponseSDKType {}
/** ===================== ExitPoolExecuteMsg */
export interface ExitPoolExecuteMsgRequest {
  /**
   * exit_pool is the structure containing all request fields of the exit pool
   * execute message.
   */
  exitPool: EmptyRequest | undefined;
}
export interface ExitPoolExecuteMsgRequestProtoMsg {
  typeUrl: "/osmosis.cosmwasmpool.v1beta1.ExitPoolExecuteMsgRequest";
  value: Uint8Array;
}
/** ===================== ExitPoolExecuteMsg */
export interface ExitPoolExecuteMsgRequestAmino {
  /**
   * exit_pool is the structure containing all request fields of the exit pool
   * execute message.
   */
  exit_pool?: EmptyRequestAmino | undefined;
}
export interface ExitPoolExecuteMsgRequestAminoMsg {
  type: "osmosis/cosmwasmpool/exit-pool-execute-msg-request";
  value: ExitPoolExecuteMsgRequestAmino;
}
/** ===================== ExitPoolExecuteMsg */
export interface ExitPoolExecuteMsgRequestSDKType {
  exit_pool: EmptyRequestSDKType | undefined;
}
export interface ExitPoolExecuteMsgResponse {}
export interface ExitPoolExecuteMsgResponseProtoMsg {
  typeUrl: "/osmosis.cosmwasmpool.v1beta1.ExitPoolExecuteMsgResponse";
  value: Uint8Array;
}
export interface ExitPoolExecuteMsgResponseAmino {}
export interface ExitPoolExecuteMsgResponseAminoMsg {
  type: "osmosis/cosmwasmpool/exit-pool-execute-msg-response";
  value: ExitPoolExecuteMsgResponseAmino;
}
export interface ExitPoolExecuteMsgResponseSDKType {}
function createBaseEmptyRequest(): EmptyRequest {
  return {};
}
export const EmptyRequest = {
  typeUrl: "/osmosis.cosmwasmpool.v1beta1.EmptyRequest",
  encode(_: EmptyRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EmptyRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEmptyRequest();
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
  fromPartial(_: Partial<EmptyRequest>): EmptyRequest {
    const message = createBaseEmptyRequest();
    return message;
  },
  fromAmino(_: EmptyRequestAmino): EmptyRequest {
    return {};
  },
  toAmino(_: EmptyRequest, useInterfaces: boolean = false): EmptyRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: EmptyRequestAminoMsg): EmptyRequest {
    return EmptyRequest.fromAmino(object.value);
  },
  toAminoMsg(message: EmptyRequest, useInterfaces: boolean = false): EmptyRequestAminoMsg {
    return {
      type: "osmosis/cosmwasmpool/empty-request",
      value: EmptyRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: EmptyRequestProtoMsg, useInterfaces: boolean = false): EmptyRequest {
    return EmptyRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EmptyRequest): Uint8Array {
    return EmptyRequest.encode(message).finish();
  },
  toProtoMsg(message: EmptyRequest): EmptyRequestProtoMsg {
    return {
      typeUrl: "/osmosis.cosmwasmpool.v1beta1.EmptyRequest",
      value: EmptyRequest.encode(message).finish()
    };
  }
};
function createBaseJoinPoolExecuteMsgRequest(): JoinPoolExecuteMsgRequest {
  return {
    joinPool: EmptyRequest.fromPartial({})
  };
}
export const JoinPoolExecuteMsgRequest = {
  typeUrl: "/osmosis.cosmwasmpool.v1beta1.JoinPoolExecuteMsgRequest",
  encode(message: JoinPoolExecuteMsgRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.joinPool !== undefined) {
      EmptyRequest.encode(message.joinPool, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): JoinPoolExecuteMsgRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseJoinPoolExecuteMsgRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.joinPool = EmptyRequest.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<JoinPoolExecuteMsgRequest>): JoinPoolExecuteMsgRequest {
    const message = createBaseJoinPoolExecuteMsgRequest();
    message.joinPool = object.joinPool !== undefined && object.joinPool !== null ? EmptyRequest.fromPartial(object.joinPool) : undefined;
    return message;
  },
  fromAmino(object: JoinPoolExecuteMsgRequestAmino): JoinPoolExecuteMsgRequest {
    return {
      joinPool: object?.join_pool ? EmptyRequest.fromAmino(object.join_pool) : undefined
    };
  },
  toAmino(message: JoinPoolExecuteMsgRequest, useInterfaces: boolean = false): JoinPoolExecuteMsgRequestAmino {
    const obj: any = {};
    obj.join_pool = message.joinPool ? EmptyRequest.toAmino(message.joinPool, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: JoinPoolExecuteMsgRequestAminoMsg): JoinPoolExecuteMsgRequest {
    return JoinPoolExecuteMsgRequest.fromAmino(object.value);
  },
  toAminoMsg(message: JoinPoolExecuteMsgRequest, useInterfaces: boolean = false): JoinPoolExecuteMsgRequestAminoMsg {
    return {
      type: "osmosis/cosmwasmpool/join-pool-execute-msg-request",
      value: JoinPoolExecuteMsgRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: JoinPoolExecuteMsgRequestProtoMsg, useInterfaces: boolean = false): JoinPoolExecuteMsgRequest {
    return JoinPoolExecuteMsgRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: JoinPoolExecuteMsgRequest): Uint8Array {
    return JoinPoolExecuteMsgRequest.encode(message).finish();
  },
  toProtoMsg(message: JoinPoolExecuteMsgRequest): JoinPoolExecuteMsgRequestProtoMsg {
    return {
      typeUrl: "/osmosis.cosmwasmpool.v1beta1.JoinPoolExecuteMsgRequest",
      value: JoinPoolExecuteMsgRequest.encode(message).finish()
    };
  }
};
function createBaseJoinPoolExecuteMsgResponse(): JoinPoolExecuteMsgResponse {
  return {};
}
export const JoinPoolExecuteMsgResponse = {
  typeUrl: "/osmosis.cosmwasmpool.v1beta1.JoinPoolExecuteMsgResponse",
  encode(_: JoinPoolExecuteMsgResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): JoinPoolExecuteMsgResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseJoinPoolExecuteMsgResponse();
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
  fromPartial(_: Partial<JoinPoolExecuteMsgResponse>): JoinPoolExecuteMsgResponse {
    const message = createBaseJoinPoolExecuteMsgResponse();
    return message;
  },
  fromAmino(_: JoinPoolExecuteMsgResponseAmino): JoinPoolExecuteMsgResponse {
    return {};
  },
  toAmino(_: JoinPoolExecuteMsgResponse, useInterfaces: boolean = false): JoinPoolExecuteMsgResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: JoinPoolExecuteMsgResponseAminoMsg): JoinPoolExecuteMsgResponse {
    return JoinPoolExecuteMsgResponse.fromAmino(object.value);
  },
  toAminoMsg(message: JoinPoolExecuteMsgResponse, useInterfaces: boolean = false): JoinPoolExecuteMsgResponseAminoMsg {
    return {
      type: "osmosis/cosmwasmpool/join-pool-execute-msg-response",
      value: JoinPoolExecuteMsgResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: JoinPoolExecuteMsgResponseProtoMsg, useInterfaces: boolean = false): JoinPoolExecuteMsgResponse {
    return JoinPoolExecuteMsgResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: JoinPoolExecuteMsgResponse): Uint8Array {
    return JoinPoolExecuteMsgResponse.encode(message).finish();
  },
  toProtoMsg(message: JoinPoolExecuteMsgResponse): JoinPoolExecuteMsgResponseProtoMsg {
    return {
      typeUrl: "/osmosis.cosmwasmpool.v1beta1.JoinPoolExecuteMsgResponse",
      value: JoinPoolExecuteMsgResponse.encode(message).finish()
    };
  }
};
function createBaseExitPoolExecuteMsgRequest(): ExitPoolExecuteMsgRequest {
  return {
    exitPool: EmptyRequest.fromPartial({})
  };
}
export const ExitPoolExecuteMsgRequest = {
  typeUrl: "/osmosis.cosmwasmpool.v1beta1.ExitPoolExecuteMsgRequest",
  encode(message: ExitPoolExecuteMsgRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.exitPool !== undefined) {
      EmptyRequest.encode(message.exitPool, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ExitPoolExecuteMsgRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExitPoolExecuteMsgRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.exitPool = EmptyRequest.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ExitPoolExecuteMsgRequest>): ExitPoolExecuteMsgRequest {
    const message = createBaseExitPoolExecuteMsgRequest();
    message.exitPool = object.exitPool !== undefined && object.exitPool !== null ? EmptyRequest.fromPartial(object.exitPool) : undefined;
    return message;
  },
  fromAmino(object: ExitPoolExecuteMsgRequestAmino): ExitPoolExecuteMsgRequest {
    return {
      exitPool: object?.exit_pool ? EmptyRequest.fromAmino(object.exit_pool) : undefined
    };
  },
  toAmino(message: ExitPoolExecuteMsgRequest, useInterfaces: boolean = false): ExitPoolExecuteMsgRequestAmino {
    const obj: any = {};
    obj.exit_pool = message.exitPool ? EmptyRequest.toAmino(message.exitPool, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: ExitPoolExecuteMsgRequestAminoMsg): ExitPoolExecuteMsgRequest {
    return ExitPoolExecuteMsgRequest.fromAmino(object.value);
  },
  toAminoMsg(message: ExitPoolExecuteMsgRequest, useInterfaces: boolean = false): ExitPoolExecuteMsgRequestAminoMsg {
    return {
      type: "osmosis/cosmwasmpool/exit-pool-execute-msg-request",
      value: ExitPoolExecuteMsgRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: ExitPoolExecuteMsgRequestProtoMsg, useInterfaces: boolean = false): ExitPoolExecuteMsgRequest {
    return ExitPoolExecuteMsgRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ExitPoolExecuteMsgRequest): Uint8Array {
    return ExitPoolExecuteMsgRequest.encode(message).finish();
  },
  toProtoMsg(message: ExitPoolExecuteMsgRequest): ExitPoolExecuteMsgRequestProtoMsg {
    return {
      typeUrl: "/osmosis.cosmwasmpool.v1beta1.ExitPoolExecuteMsgRequest",
      value: ExitPoolExecuteMsgRequest.encode(message).finish()
    };
  }
};
function createBaseExitPoolExecuteMsgResponse(): ExitPoolExecuteMsgResponse {
  return {};
}
export const ExitPoolExecuteMsgResponse = {
  typeUrl: "/osmosis.cosmwasmpool.v1beta1.ExitPoolExecuteMsgResponse",
  encode(_: ExitPoolExecuteMsgResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ExitPoolExecuteMsgResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExitPoolExecuteMsgResponse();
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
  fromPartial(_: Partial<ExitPoolExecuteMsgResponse>): ExitPoolExecuteMsgResponse {
    const message = createBaseExitPoolExecuteMsgResponse();
    return message;
  },
  fromAmino(_: ExitPoolExecuteMsgResponseAmino): ExitPoolExecuteMsgResponse {
    return {};
  },
  toAmino(_: ExitPoolExecuteMsgResponse, useInterfaces: boolean = false): ExitPoolExecuteMsgResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: ExitPoolExecuteMsgResponseAminoMsg): ExitPoolExecuteMsgResponse {
    return ExitPoolExecuteMsgResponse.fromAmino(object.value);
  },
  toAminoMsg(message: ExitPoolExecuteMsgResponse, useInterfaces: boolean = false): ExitPoolExecuteMsgResponseAminoMsg {
    return {
      type: "osmosis/cosmwasmpool/exit-pool-execute-msg-response",
      value: ExitPoolExecuteMsgResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: ExitPoolExecuteMsgResponseProtoMsg, useInterfaces: boolean = false): ExitPoolExecuteMsgResponse {
    return ExitPoolExecuteMsgResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ExitPoolExecuteMsgResponse): Uint8Array {
    return ExitPoolExecuteMsgResponse.encode(message).finish();
  },
  toProtoMsg(message: ExitPoolExecuteMsgResponse): ExitPoolExecuteMsgResponseProtoMsg {
    return {
      typeUrl: "/osmosis.cosmwasmpool.v1beta1.ExitPoolExecuteMsgResponse",
      value: ExitPoolExecuteMsgResponse.encode(message).finish()
    };
  }
};