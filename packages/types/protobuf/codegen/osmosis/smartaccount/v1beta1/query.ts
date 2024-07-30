//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { AccountAuthenticator, AccountAuthenticatorAmino, AccountAuthenticatorSDKType } from "./models";
import { BinaryReader, BinaryWriter } from "../../../binary";
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/osmosis.smartaccount.v1beta1.QueryParamsRequest";
  value: Uint8Array;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "osmosis/smartaccount/query-params-request";
  value: QueryParamsRequestAmino;
}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestSDKType {}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params | undefined;
}
export interface QueryParamsResponseProtoMsg {
  typeUrl: "/osmosis.smartaccount.v1beta1.QueryParamsResponse";
  value: Uint8Array;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseAmino {
  /** params holds all the parameters of this module. */
  params?: ParamsAmino | undefined;
}
export interface QueryParamsResponseAminoMsg {
  type: "osmosis/smartaccount/query-params-response";
  value: QueryParamsResponseAmino;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType | undefined;
}
/** MsgGetAuthenticatorsRequest defines the Msg/GetAuthenticators request type. */
export interface GetAuthenticatorsRequest {
  account: string;
}
export interface GetAuthenticatorsRequestProtoMsg {
  typeUrl: "/osmosis.smartaccount.v1beta1.GetAuthenticatorsRequest";
  value: Uint8Array;
}
/** MsgGetAuthenticatorsRequest defines the Msg/GetAuthenticators request type. */
export interface GetAuthenticatorsRequestAmino {
  account?: string;
}
export interface GetAuthenticatorsRequestAminoMsg {
  type: "osmosis/smartaccount/get-authenticators-request";
  value: GetAuthenticatorsRequestAmino;
}
/** MsgGetAuthenticatorsRequest defines the Msg/GetAuthenticators request type. */
export interface GetAuthenticatorsRequestSDKType {
  account: string;
}
/** MsgGetAuthenticatorsResponse defines the Msg/GetAuthenticators response type. */
export interface GetAuthenticatorsResponse {
  accountAuthenticators: AccountAuthenticator[];
}
export interface GetAuthenticatorsResponseProtoMsg {
  typeUrl: "/osmosis.smartaccount.v1beta1.GetAuthenticatorsResponse";
  value: Uint8Array;
}
/** MsgGetAuthenticatorsResponse defines the Msg/GetAuthenticators response type. */
export interface GetAuthenticatorsResponseAmino {
  account_authenticators?: AccountAuthenticatorAmino[];
}
export interface GetAuthenticatorsResponseAminoMsg {
  type: "osmosis/smartaccount/get-authenticators-response";
  value: GetAuthenticatorsResponseAmino;
}
/** MsgGetAuthenticatorsResponse defines the Msg/GetAuthenticators response type. */
export interface GetAuthenticatorsResponseSDKType {
  account_authenticators: AccountAuthenticatorSDKType[];
}
/** MsgGetAuthenticatorRequest defines the Msg/GetAuthenticator request type. */
export interface GetAuthenticatorRequest {
  account: string;
  authenticatorId: bigint;
}
export interface GetAuthenticatorRequestProtoMsg {
  typeUrl: "/osmosis.smartaccount.v1beta1.GetAuthenticatorRequest";
  value: Uint8Array;
}
/** MsgGetAuthenticatorRequest defines the Msg/GetAuthenticator request type. */
export interface GetAuthenticatorRequestAmino {
  account?: string;
  authenticator_id?: string;
}
export interface GetAuthenticatorRequestAminoMsg {
  type: "osmosis/smartaccount/get-authenticator-request";
  value: GetAuthenticatorRequestAmino;
}
/** MsgGetAuthenticatorRequest defines the Msg/GetAuthenticator request type. */
export interface GetAuthenticatorRequestSDKType {
  account: string;
  authenticator_id: bigint;
}
/** MsgGetAuthenticatorResponse defines the Msg/GetAuthenticator response type. */
export interface GetAuthenticatorResponse {
  accountAuthenticator?: AccountAuthenticator | undefined;
}
export interface GetAuthenticatorResponseProtoMsg {
  typeUrl: "/osmosis.smartaccount.v1beta1.GetAuthenticatorResponse";
  value: Uint8Array;
}
/** MsgGetAuthenticatorResponse defines the Msg/GetAuthenticator response type. */
export interface GetAuthenticatorResponseAmino {
  account_authenticator?: AccountAuthenticatorAmino | undefined;
}
export interface GetAuthenticatorResponseAminoMsg {
  type: "osmosis/smartaccount/get-authenticator-response";
  value: GetAuthenticatorResponseAmino;
}
/** MsgGetAuthenticatorResponse defines the Msg/GetAuthenticator response type. */
export interface GetAuthenticatorResponseSDKType {
  account_authenticator?: AccountAuthenticatorSDKType | undefined;
}
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/osmosis.smartaccount.v1beta1.QueryParamsRequest",
  encode(_: QueryParamsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryParamsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
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
  fromPartial(_: Partial<QueryParamsRequest>): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
  fromAmino(_: QueryParamsRequestAmino): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
  toAmino(_: QueryParamsRequest, useInterfaces: boolean = false): QueryParamsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryParamsRequestAminoMsg): QueryParamsRequest {
    return QueryParamsRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryParamsRequest, useInterfaces: boolean = false): QueryParamsRequestAminoMsg {
    return {
      type: "osmosis/smartaccount/query-params-request",
      value: QueryParamsRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryParamsRequestProtoMsg, useInterfaces: boolean = false): QueryParamsRequest {
    return QueryParamsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryParamsRequest): Uint8Array {
    return QueryParamsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryParamsRequest): QueryParamsRequestProtoMsg {
    return {
      typeUrl: "/osmosis.smartaccount.v1beta1.QueryParamsRequest",
      value: QueryParamsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryParamsResponse(): QueryParamsResponse {
  return {
    params: Params.fromPartial({})
  };
}
export const QueryParamsResponse = {
  typeUrl: "/osmosis.smartaccount.v1beta1.QueryParamsResponse",
  encode(message: QueryParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryParamsResponse>): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: QueryParamsResponseAmino): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: QueryParamsResponse, useInterfaces: boolean = false): QueryParamsResponseAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryParamsResponseAminoMsg): QueryParamsResponse {
    return QueryParamsResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryParamsResponse, useInterfaces: boolean = false): QueryParamsResponseAminoMsg {
    return {
      type: "osmosis/smartaccount/query-params-response",
      value: QueryParamsResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryParamsResponseProtoMsg, useInterfaces: boolean = false): QueryParamsResponse {
    return QueryParamsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryParamsResponse): Uint8Array {
    return QueryParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryParamsResponse): QueryParamsResponseProtoMsg {
    return {
      typeUrl: "/osmosis.smartaccount.v1beta1.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};
function createBaseGetAuthenticatorsRequest(): GetAuthenticatorsRequest {
  return {
    account: ""
  };
}
export const GetAuthenticatorsRequest = {
  typeUrl: "/osmosis.smartaccount.v1beta1.GetAuthenticatorsRequest",
  encode(message: GetAuthenticatorsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.account !== "") {
      writer.uint32(10).string(message.account);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): GetAuthenticatorsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAuthenticatorsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<GetAuthenticatorsRequest>): GetAuthenticatorsRequest {
    const message = createBaseGetAuthenticatorsRequest();
    message.account = object.account ?? "";
    return message;
  },
  fromAmino(object: GetAuthenticatorsRequestAmino): GetAuthenticatorsRequest {
    const message = createBaseGetAuthenticatorsRequest();
    if (object.account !== undefined && object.account !== null) {
      message.account = object.account;
    }
    return message;
  },
  toAmino(message: GetAuthenticatorsRequest, useInterfaces: boolean = false): GetAuthenticatorsRequestAmino {
    const obj: any = {};
    obj.account = message.account === "" ? undefined : message.account;
    return obj;
  },
  fromAminoMsg(object: GetAuthenticatorsRequestAminoMsg): GetAuthenticatorsRequest {
    return GetAuthenticatorsRequest.fromAmino(object.value);
  },
  toAminoMsg(message: GetAuthenticatorsRequest, useInterfaces: boolean = false): GetAuthenticatorsRequestAminoMsg {
    return {
      type: "osmosis/smartaccount/get-authenticators-request",
      value: GetAuthenticatorsRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: GetAuthenticatorsRequestProtoMsg, useInterfaces: boolean = false): GetAuthenticatorsRequest {
    return GetAuthenticatorsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: GetAuthenticatorsRequest): Uint8Array {
    return GetAuthenticatorsRequest.encode(message).finish();
  },
  toProtoMsg(message: GetAuthenticatorsRequest): GetAuthenticatorsRequestProtoMsg {
    return {
      typeUrl: "/osmosis.smartaccount.v1beta1.GetAuthenticatorsRequest",
      value: GetAuthenticatorsRequest.encode(message).finish()
    };
  }
};
function createBaseGetAuthenticatorsResponse(): GetAuthenticatorsResponse {
  return {
    accountAuthenticators: []
  };
}
export const GetAuthenticatorsResponse = {
  typeUrl: "/osmosis.smartaccount.v1beta1.GetAuthenticatorsResponse",
  encode(message: GetAuthenticatorsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.accountAuthenticators) {
      AccountAuthenticator.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): GetAuthenticatorsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAuthenticatorsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.accountAuthenticators.push(AccountAuthenticator.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<GetAuthenticatorsResponse>): GetAuthenticatorsResponse {
    const message = createBaseGetAuthenticatorsResponse();
    message.accountAuthenticators = object.accountAuthenticators?.map(e => AccountAuthenticator.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: GetAuthenticatorsResponseAmino): GetAuthenticatorsResponse {
    const message = createBaseGetAuthenticatorsResponse();
    message.accountAuthenticators = object.account_authenticators?.map(e => AccountAuthenticator.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: GetAuthenticatorsResponse, useInterfaces: boolean = false): GetAuthenticatorsResponseAmino {
    const obj: any = {};
    if (message.accountAuthenticators) {
      obj.account_authenticators = message.accountAuthenticators.map(e => e ? AccountAuthenticator.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.account_authenticators = message.accountAuthenticators;
    }
    return obj;
  },
  fromAminoMsg(object: GetAuthenticatorsResponseAminoMsg): GetAuthenticatorsResponse {
    return GetAuthenticatorsResponse.fromAmino(object.value);
  },
  toAminoMsg(message: GetAuthenticatorsResponse, useInterfaces: boolean = false): GetAuthenticatorsResponseAminoMsg {
    return {
      type: "osmosis/smartaccount/get-authenticators-response",
      value: GetAuthenticatorsResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: GetAuthenticatorsResponseProtoMsg, useInterfaces: boolean = false): GetAuthenticatorsResponse {
    return GetAuthenticatorsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: GetAuthenticatorsResponse): Uint8Array {
    return GetAuthenticatorsResponse.encode(message).finish();
  },
  toProtoMsg(message: GetAuthenticatorsResponse): GetAuthenticatorsResponseProtoMsg {
    return {
      typeUrl: "/osmosis.smartaccount.v1beta1.GetAuthenticatorsResponse",
      value: GetAuthenticatorsResponse.encode(message).finish()
    };
  }
};
function createBaseGetAuthenticatorRequest(): GetAuthenticatorRequest {
  return {
    account: "",
    authenticatorId: BigInt(0)
  };
}
export const GetAuthenticatorRequest = {
  typeUrl: "/osmosis.smartaccount.v1beta1.GetAuthenticatorRequest",
  encode(message: GetAuthenticatorRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.account !== "") {
      writer.uint32(10).string(message.account);
    }
    if (message.authenticatorId !== BigInt(0)) {
      writer.uint32(16).uint64(message.authenticatorId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): GetAuthenticatorRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAuthenticatorRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = reader.string();
          break;
        case 2:
          message.authenticatorId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<GetAuthenticatorRequest>): GetAuthenticatorRequest {
    const message = createBaseGetAuthenticatorRequest();
    message.account = object.account ?? "";
    message.authenticatorId = object.authenticatorId !== undefined && object.authenticatorId !== null ? BigInt(object.authenticatorId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: GetAuthenticatorRequestAmino): GetAuthenticatorRequest {
    const message = createBaseGetAuthenticatorRequest();
    if (object.account !== undefined && object.account !== null) {
      message.account = object.account;
    }
    if (object.authenticator_id !== undefined && object.authenticator_id !== null) {
      message.authenticatorId = BigInt(object.authenticator_id);
    }
    return message;
  },
  toAmino(message: GetAuthenticatorRequest, useInterfaces: boolean = false): GetAuthenticatorRequestAmino {
    const obj: any = {};
    obj.account = message.account === "" ? undefined : message.account;
    obj.authenticator_id = message.authenticatorId !== BigInt(0) ? message.authenticatorId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: GetAuthenticatorRequestAminoMsg): GetAuthenticatorRequest {
    return GetAuthenticatorRequest.fromAmino(object.value);
  },
  toAminoMsg(message: GetAuthenticatorRequest, useInterfaces: boolean = false): GetAuthenticatorRequestAminoMsg {
    return {
      type: "osmosis/smartaccount/get-authenticator-request",
      value: GetAuthenticatorRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: GetAuthenticatorRequestProtoMsg, useInterfaces: boolean = false): GetAuthenticatorRequest {
    return GetAuthenticatorRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: GetAuthenticatorRequest): Uint8Array {
    return GetAuthenticatorRequest.encode(message).finish();
  },
  toProtoMsg(message: GetAuthenticatorRequest): GetAuthenticatorRequestProtoMsg {
    return {
      typeUrl: "/osmosis.smartaccount.v1beta1.GetAuthenticatorRequest",
      value: GetAuthenticatorRequest.encode(message).finish()
    };
  }
};
function createBaseGetAuthenticatorResponse(): GetAuthenticatorResponse {
  return {
    accountAuthenticator: undefined
  };
}
export const GetAuthenticatorResponse = {
  typeUrl: "/osmosis.smartaccount.v1beta1.GetAuthenticatorResponse",
  encode(message: GetAuthenticatorResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.accountAuthenticator !== undefined) {
      AccountAuthenticator.encode(message.accountAuthenticator, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): GetAuthenticatorResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetAuthenticatorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.accountAuthenticator = AccountAuthenticator.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<GetAuthenticatorResponse>): GetAuthenticatorResponse {
    const message = createBaseGetAuthenticatorResponse();
    message.accountAuthenticator = object.accountAuthenticator !== undefined && object.accountAuthenticator !== null ? AccountAuthenticator.fromPartial(object.accountAuthenticator) : undefined;
    return message;
  },
  fromAmino(object: GetAuthenticatorResponseAmino): GetAuthenticatorResponse {
    const message = createBaseGetAuthenticatorResponse();
    if (object.account_authenticator !== undefined && object.account_authenticator !== null) {
      message.accountAuthenticator = AccountAuthenticator.fromAmino(object.account_authenticator);
    }
    return message;
  },
  toAmino(message: GetAuthenticatorResponse, useInterfaces: boolean = false): GetAuthenticatorResponseAmino {
    const obj: any = {};
    obj.account_authenticator = message.accountAuthenticator ? AccountAuthenticator.toAmino(message.accountAuthenticator, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: GetAuthenticatorResponseAminoMsg): GetAuthenticatorResponse {
    return GetAuthenticatorResponse.fromAmino(object.value);
  },
  toAminoMsg(message: GetAuthenticatorResponse, useInterfaces: boolean = false): GetAuthenticatorResponseAminoMsg {
    return {
      type: "osmosis/smartaccount/get-authenticator-response",
      value: GetAuthenticatorResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: GetAuthenticatorResponseProtoMsg, useInterfaces: boolean = false): GetAuthenticatorResponse {
    return GetAuthenticatorResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: GetAuthenticatorResponse): Uint8Array {
    return GetAuthenticatorResponse.encode(message).finish();
  },
  toProtoMsg(message: GetAuthenticatorResponse): GetAuthenticatorResponseProtoMsg {
    return {
      typeUrl: "/osmosis.smartaccount.v1beta1.GetAuthenticatorResponse",
      value: GetAuthenticatorResponse.encode(message).finish()
    };
  }
};