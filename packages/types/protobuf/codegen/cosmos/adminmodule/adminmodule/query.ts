//@ts-nocheck
import { Proposal as Proposal1 } from "../../gov/v1/gov";
import { ProposalAmino as Proposal1Amino } from "../../gov/v1/gov";
import { ProposalSDKType as Proposal1SDKType } from "../../gov/v1/gov";
import { Proposal as Proposal2 } from "../../gov/v1beta1/gov";
import { ProposalAmino as Proposal2Amino } from "../../gov/v1beta1/gov";
import { ProposalSDKType as Proposal2SDKType } from "../../gov/v1beta1/gov";
import { BinaryReader, BinaryWriter } from "../../../binary";
export interface QueryAdminsRequest {}
export interface QueryAdminsRequestProtoMsg {
  typeUrl: "/cosmos.adminmodule.adminmodule.QueryAdminsRequest";
  value: Uint8Array;
}
export interface QueryAdminsRequestAmino {}
export interface QueryAdminsRequestAminoMsg {
  type: "cosmos-sdk/QueryAdminsRequest";
  value: QueryAdminsRequestAmino;
}
export interface QueryAdminsRequestSDKType {}
export interface QueryAdminsResponse {
  admins: string[];
}
export interface QueryAdminsResponseProtoMsg {
  typeUrl: "/cosmos.adminmodule.adminmodule.QueryAdminsResponse";
  value: Uint8Array;
}
export interface QueryAdminsResponseAmino {
  admins?: string[];
}
export interface QueryAdminsResponseAminoMsg {
  type: "cosmos-sdk/QueryAdminsResponse";
  value: QueryAdminsResponseAmino;
}
export interface QueryAdminsResponseSDKType {
  admins: string[];
}
export interface QueryArchivedProposalsRequest {}
export interface QueryArchivedProposalsRequestProtoMsg {
  typeUrl: "/cosmos.adminmodule.adminmodule.QueryArchivedProposalsRequest";
  value: Uint8Array;
}
export interface QueryArchivedProposalsRequestAmino {}
export interface QueryArchivedProposalsRequestAminoMsg {
  type: "cosmos-sdk/QueryArchivedProposalsRequest";
  value: QueryArchivedProposalsRequestAmino;
}
export interface QueryArchivedProposalsRequestSDKType {}
export interface QueryArchivedProposalsLegacyRequest {}
export interface QueryArchivedProposalsLegacyRequestProtoMsg {
  typeUrl: "/cosmos.adminmodule.adminmodule.QueryArchivedProposalsLegacyRequest";
  value: Uint8Array;
}
export interface QueryArchivedProposalsLegacyRequestAmino {}
export interface QueryArchivedProposalsLegacyRequestAminoMsg {
  type: "cosmos-sdk/QueryArchivedProposalsLegacyRequest";
  value: QueryArchivedProposalsLegacyRequestAmino;
}
export interface QueryArchivedProposalsLegacyRequestSDKType {}
export interface QueryProposalsResponse {
  proposals: Proposal1[];
}
export interface QueryProposalsResponseProtoMsg {
  typeUrl: "/cosmos.adminmodule.adminmodule.QueryProposalsResponse";
  value: Uint8Array;
}
export interface QueryProposalsResponseAmino {
  proposals?: Proposal1Amino[];
}
export interface QueryProposalsResponseAminoMsg {
  type: "cosmos-sdk/QueryProposalsResponse";
  value: QueryProposalsResponseAmino;
}
export interface QueryProposalsResponseSDKType {
  proposals: Proposal1SDKType[];
}
export interface QueryArchivedProposalsResponse {
  proposals: Proposal1[];
}
export interface QueryArchivedProposalsResponseProtoMsg {
  typeUrl: "/cosmos.adminmodule.adminmodule.QueryArchivedProposalsResponse";
  value: Uint8Array;
}
export interface QueryArchivedProposalsResponseAmino {
  proposals?: Proposal1Amino[];
}
export interface QueryArchivedProposalsResponseAminoMsg {
  type: "cosmos-sdk/QueryArchivedProposalsResponse";
  value: QueryArchivedProposalsResponseAmino;
}
export interface QueryArchivedProposalsResponseSDKType {
  proposals: Proposal1SDKType[];
}
export interface QueryArchivedProposalsLegacyResponse {
  proposalsLegacy: Proposal2[];
}
export interface QueryArchivedProposalsLegacyResponseProtoMsg {
  typeUrl: "/cosmos.adminmodule.adminmodule.QueryArchivedProposalsLegacyResponse";
  value: Uint8Array;
}
export interface QueryArchivedProposalsLegacyResponseAmino {
  proposalsLegacy?: Proposal2Amino[];
}
export interface QueryArchivedProposalsLegacyResponseAminoMsg {
  type: "cosmos-sdk/QueryArchivedProposalsLegacyResponse";
  value: QueryArchivedProposalsLegacyResponseAmino;
}
export interface QueryArchivedProposalsLegacyResponseSDKType {
  proposalsLegacy: Proposal2SDKType[];
}
function createBaseQueryAdminsRequest(): QueryAdminsRequest {
  return {};
}
export const QueryAdminsRequest = {
  typeUrl: "/cosmos.adminmodule.adminmodule.QueryAdminsRequest",
  encode(_: QueryAdminsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAdminsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAdminsRequest();
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
  fromPartial(_: Partial<QueryAdminsRequest>): QueryAdminsRequest {
    const message = createBaseQueryAdminsRequest();
    return message;
  },
  fromAmino(_: QueryAdminsRequestAmino): QueryAdminsRequest {
    const message = createBaseQueryAdminsRequest();
    return message;
  },
  toAmino(_: QueryAdminsRequest, useInterfaces: boolean = false): QueryAdminsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryAdminsRequestAminoMsg): QueryAdminsRequest {
    return QueryAdminsRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryAdminsRequest, useInterfaces: boolean = false): QueryAdminsRequestAminoMsg {
    return {
      type: "cosmos-sdk/QueryAdminsRequest",
      value: QueryAdminsRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryAdminsRequestProtoMsg, useInterfaces: boolean = false): QueryAdminsRequest {
    return QueryAdminsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAdminsRequest): Uint8Array {
    return QueryAdminsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAdminsRequest): QueryAdminsRequestProtoMsg {
    return {
      typeUrl: "/cosmos.adminmodule.adminmodule.QueryAdminsRequest",
      value: QueryAdminsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAdminsResponse(): QueryAdminsResponse {
  return {
    admins: []
  };
}
export const QueryAdminsResponse = {
  typeUrl: "/cosmos.adminmodule.adminmodule.QueryAdminsResponse",
  encode(message: QueryAdminsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.admins) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryAdminsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAdminsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.admins.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAdminsResponse>): QueryAdminsResponse {
    const message = createBaseQueryAdminsResponse();
    message.admins = object.admins?.map(e => e) || [];
    return message;
  },
  fromAmino(object: QueryAdminsResponseAmino): QueryAdminsResponse {
    const message = createBaseQueryAdminsResponse();
    message.admins = object.admins?.map(e => e) || [];
    return message;
  },
  toAmino(message: QueryAdminsResponse, useInterfaces: boolean = false): QueryAdminsResponseAmino {
    const obj: any = {};
    if (message.admins) {
      obj.admins = message.admins.map(e => e);
    } else {
      obj.admins = [];
    }
    return obj;
  },
  fromAminoMsg(object: QueryAdminsResponseAminoMsg): QueryAdminsResponse {
    return QueryAdminsResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryAdminsResponse, useInterfaces: boolean = false): QueryAdminsResponseAminoMsg {
    return {
      type: "cosmos-sdk/QueryAdminsResponse",
      value: QueryAdminsResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryAdminsResponseProtoMsg, useInterfaces: boolean = false): QueryAdminsResponse {
    return QueryAdminsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryAdminsResponse): Uint8Array {
    return QueryAdminsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAdminsResponse): QueryAdminsResponseProtoMsg {
    return {
      typeUrl: "/cosmos.adminmodule.adminmodule.QueryAdminsResponse",
      value: QueryAdminsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryArchivedProposalsRequest(): QueryArchivedProposalsRequest {
  return {};
}
export const QueryArchivedProposalsRequest = {
  typeUrl: "/cosmos.adminmodule.adminmodule.QueryArchivedProposalsRequest",
  encode(_: QueryArchivedProposalsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryArchivedProposalsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryArchivedProposalsRequest();
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
  fromPartial(_: Partial<QueryArchivedProposalsRequest>): QueryArchivedProposalsRequest {
    const message = createBaseQueryArchivedProposalsRequest();
    return message;
  },
  fromAmino(_: QueryArchivedProposalsRequestAmino): QueryArchivedProposalsRequest {
    const message = createBaseQueryArchivedProposalsRequest();
    return message;
  },
  toAmino(_: QueryArchivedProposalsRequest, useInterfaces: boolean = false): QueryArchivedProposalsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryArchivedProposalsRequestAminoMsg): QueryArchivedProposalsRequest {
    return QueryArchivedProposalsRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryArchivedProposalsRequest, useInterfaces: boolean = false): QueryArchivedProposalsRequestAminoMsg {
    return {
      type: "cosmos-sdk/QueryArchivedProposalsRequest",
      value: QueryArchivedProposalsRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryArchivedProposalsRequestProtoMsg, useInterfaces: boolean = false): QueryArchivedProposalsRequest {
    return QueryArchivedProposalsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryArchivedProposalsRequest): Uint8Array {
    return QueryArchivedProposalsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryArchivedProposalsRequest): QueryArchivedProposalsRequestProtoMsg {
    return {
      typeUrl: "/cosmos.adminmodule.adminmodule.QueryArchivedProposalsRequest",
      value: QueryArchivedProposalsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryArchivedProposalsLegacyRequest(): QueryArchivedProposalsLegacyRequest {
  return {};
}
export const QueryArchivedProposalsLegacyRequest = {
  typeUrl: "/cosmos.adminmodule.adminmodule.QueryArchivedProposalsLegacyRequest",
  encode(_: QueryArchivedProposalsLegacyRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryArchivedProposalsLegacyRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryArchivedProposalsLegacyRequest();
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
  fromPartial(_: Partial<QueryArchivedProposalsLegacyRequest>): QueryArchivedProposalsLegacyRequest {
    const message = createBaseQueryArchivedProposalsLegacyRequest();
    return message;
  },
  fromAmino(_: QueryArchivedProposalsLegacyRequestAmino): QueryArchivedProposalsLegacyRequest {
    const message = createBaseQueryArchivedProposalsLegacyRequest();
    return message;
  },
  toAmino(_: QueryArchivedProposalsLegacyRequest, useInterfaces: boolean = false): QueryArchivedProposalsLegacyRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryArchivedProposalsLegacyRequestAminoMsg): QueryArchivedProposalsLegacyRequest {
    return QueryArchivedProposalsLegacyRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryArchivedProposalsLegacyRequest, useInterfaces: boolean = false): QueryArchivedProposalsLegacyRequestAminoMsg {
    return {
      type: "cosmos-sdk/QueryArchivedProposalsLegacyRequest",
      value: QueryArchivedProposalsLegacyRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryArchivedProposalsLegacyRequestProtoMsg, useInterfaces: boolean = false): QueryArchivedProposalsLegacyRequest {
    return QueryArchivedProposalsLegacyRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryArchivedProposalsLegacyRequest): Uint8Array {
    return QueryArchivedProposalsLegacyRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryArchivedProposalsLegacyRequest): QueryArchivedProposalsLegacyRequestProtoMsg {
    return {
      typeUrl: "/cosmos.adminmodule.adminmodule.QueryArchivedProposalsLegacyRequest",
      value: QueryArchivedProposalsLegacyRequest.encode(message).finish()
    };
  }
};
function createBaseQueryProposalsResponse(): QueryProposalsResponse {
  return {
    proposals: []
  };
}
export const QueryProposalsResponse = {
  typeUrl: "/cosmos.adminmodule.adminmodule.QueryProposalsResponse",
  encode(message: QueryProposalsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.proposals) {
      Proposal1.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryProposalsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryProposalsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proposals.push(Proposal1.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryProposalsResponse>): QueryProposalsResponse {
    const message = createBaseQueryProposalsResponse();
    message.proposals = object.proposals?.map(e => Proposal1.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryProposalsResponseAmino): QueryProposalsResponse {
    const message = createBaseQueryProposalsResponse();
    message.proposals = object.proposals?.map(e => Proposal1.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryProposalsResponse, useInterfaces: boolean = false): QueryProposalsResponseAmino {
    const obj: any = {};
    if (message.proposals) {
      obj.proposals = message.proposals.map(e => e ? Proposal1.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.proposals = [];
    }
    return obj;
  },
  fromAminoMsg(object: QueryProposalsResponseAminoMsg): QueryProposalsResponse {
    return QueryProposalsResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryProposalsResponse, useInterfaces: boolean = false): QueryProposalsResponseAminoMsg {
    return {
      type: "cosmos-sdk/QueryProposalsResponse",
      value: QueryProposalsResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryProposalsResponseProtoMsg, useInterfaces: boolean = false): QueryProposalsResponse {
    return QueryProposalsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryProposalsResponse): Uint8Array {
    return QueryProposalsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryProposalsResponse): QueryProposalsResponseProtoMsg {
    return {
      typeUrl: "/cosmos.adminmodule.adminmodule.QueryProposalsResponse",
      value: QueryProposalsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryArchivedProposalsResponse(): QueryArchivedProposalsResponse {
  return {
    proposals: []
  };
}
export const QueryArchivedProposalsResponse = {
  typeUrl: "/cosmos.adminmodule.adminmodule.QueryArchivedProposalsResponse",
  encode(message: QueryArchivedProposalsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.proposals) {
      Proposal1.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryArchivedProposalsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryArchivedProposalsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proposals.push(Proposal1.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryArchivedProposalsResponse>): QueryArchivedProposalsResponse {
    const message = createBaseQueryArchivedProposalsResponse();
    message.proposals = object.proposals?.map(e => Proposal1.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryArchivedProposalsResponseAmino): QueryArchivedProposalsResponse {
    const message = createBaseQueryArchivedProposalsResponse();
    message.proposals = object.proposals?.map(e => Proposal1.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryArchivedProposalsResponse, useInterfaces: boolean = false): QueryArchivedProposalsResponseAmino {
    const obj: any = {};
    if (message.proposals) {
      obj.proposals = message.proposals.map(e => e ? Proposal1.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.proposals = [];
    }
    return obj;
  },
  fromAminoMsg(object: QueryArchivedProposalsResponseAminoMsg): QueryArchivedProposalsResponse {
    return QueryArchivedProposalsResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryArchivedProposalsResponse, useInterfaces: boolean = false): QueryArchivedProposalsResponseAminoMsg {
    return {
      type: "cosmos-sdk/QueryArchivedProposalsResponse",
      value: QueryArchivedProposalsResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryArchivedProposalsResponseProtoMsg, useInterfaces: boolean = false): QueryArchivedProposalsResponse {
    return QueryArchivedProposalsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryArchivedProposalsResponse): Uint8Array {
    return QueryArchivedProposalsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryArchivedProposalsResponse): QueryArchivedProposalsResponseProtoMsg {
    return {
      typeUrl: "/cosmos.adminmodule.adminmodule.QueryArchivedProposalsResponse",
      value: QueryArchivedProposalsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryArchivedProposalsLegacyResponse(): QueryArchivedProposalsLegacyResponse {
  return {
    proposalsLegacy: []
  };
}
export const QueryArchivedProposalsLegacyResponse = {
  typeUrl: "/cosmos.adminmodule.adminmodule.QueryArchivedProposalsLegacyResponse",
  encode(message: QueryArchivedProposalsLegacyResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.proposalsLegacy) {
      Proposal2.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryArchivedProposalsLegacyResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryArchivedProposalsLegacyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proposalsLegacy.push(Proposal2.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryArchivedProposalsLegacyResponse>): QueryArchivedProposalsLegacyResponse {
    const message = createBaseQueryArchivedProposalsLegacyResponse();
    message.proposalsLegacy = object.proposalsLegacy?.map(e => Proposal2.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryArchivedProposalsLegacyResponseAmino): QueryArchivedProposalsLegacyResponse {
    const message = createBaseQueryArchivedProposalsLegacyResponse();
    message.proposalsLegacy = object.proposalsLegacy?.map(e => Proposal2.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryArchivedProposalsLegacyResponse, useInterfaces: boolean = false): QueryArchivedProposalsLegacyResponseAmino {
    const obj: any = {};
    if (message.proposalsLegacy) {
      obj.proposalsLegacy = message.proposalsLegacy.map(e => e ? Proposal2.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.proposalsLegacy = [];
    }
    return obj;
  },
  fromAminoMsg(object: QueryArchivedProposalsLegacyResponseAminoMsg): QueryArchivedProposalsLegacyResponse {
    return QueryArchivedProposalsLegacyResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryArchivedProposalsLegacyResponse, useInterfaces: boolean = false): QueryArchivedProposalsLegacyResponseAminoMsg {
    return {
      type: "cosmos-sdk/QueryArchivedProposalsLegacyResponse",
      value: QueryArchivedProposalsLegacyResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryArchivedProposalsLegacyResponseProtoMsg, useInterfaces: boolean = false): QueryArchivedProposalsLegacyResponse {
    return QueryArchivedProposalsLegacyResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryArchivedProposalsLegacyResponse): Uint8Array {
    return QueryArchivedProposalsLegacyResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryArchivedProposalsLegacyResponse): QueryArchivedProposalsLegacyResponseProtoMsg {
    return {
      typeUrl: "/cosmos.adminmodule.adminmodule.QueryArchivedProposalsLegacyResponse",
      value: QueryArchivedProposalsLegacyResponse.encode(message).finish()
    };
  }
};