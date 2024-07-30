//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../binary";
/**
 * MsgAggregateExchangeRatePrevote represents a message to submit
 * aggregate exchange rate prevote.
 */
export interface MsgAggregateExchangeRatePrevote {
  hash: string;
  feeder: string;
  validator: string;
}
export interface MsgAggregateExchangeRatePrevoteProtoMsg {
  typeUrl: "/kujira.oracle.MsgAggregateExchangeRatePrevote";
  value: Uint8Array;
}
/**
 * MsgAggregateExchangeRatePrevote represents a message to submit
 * aggregate exchange rate prevote.
 */
export interface MsgAggregateExchangeRatePrevoteAmino {
  hash?: string;
  feeder?: string;
  validator?: string;
}
export interface MsgAggregateExchangeRatePrevoteAminoMsg {
  type: "/kujira.oracle.MsgAggregateExchangeRatePrevote";
  value: MsgAggregateExchangeRatePrevoteAmino;
}
/**
 * MsgAggregateExchangeRatePrevote represents a message to submit
 * aggregate exchange rate prevote.
 */
export interface MsgAggregateExchangeRatePrevoteSDKType {
  hash: string;
  feeder: string;
  validator: string;
}
/** MsgAggregateExchangeRatePrevoteResponse defines the Msg/AggregateExchangeRatePrevote response type. */
export interface MsgAggregateExchangeRatePrevoteResponse {}
export interface MsgAggregateExchangeRatePrevoteResponseProtoMsg {
  typeUrl: "/kujira.oracle.MsgAggregateExchangeRatePrevoteResponse";
  value: Uint8Array;
}
/** MsgAggregateExchangeRatePrevoteResponse defines the Msg/AggregateExchangeRatePrevote response type. */
export interface MsgAggregateExchangeRatePrevoteResponseAmino {}
export interface MsgAggregateExchangeRatePrevoteResponseAminoMsg {
  type: "/kujira.oracle.MsgAggregateExchangeRatePrevoteResponse";
  value: MsgAggregateExchangeRatePrevoteResponseAmino;
}
/** MsgAggregateExchangeRatePrevoteResponse defines the Msg/AggregateExchangeRatePrevote response type. */
export interface MsgAggregateExchangeRatePrevoteResponseSDKType {}
/**
 * MsgAggregateExchangeRateVote represents a message to submit
 * aggregate exchange rate vote.
 */
export interface MsgAggregateExchangeRateVote {
  salt: string;
  exchangeRates: string;
  feeder: string;
  validator: string;
}
export interface MsgAggregateExchangeRateVoteProtoMsg {
  typeUrl: "/kujira.oracle.MsgAggregateExchangeRateVote";
  value: Uint8Array;
}
/**
 * MsgAggregateExchangeRateVote represents a message to submit
 * aggregate exchange rate vote.
 */
export interface MsgAggregateExchangeRateVoteAmino {
  salt?: string;
  exchange_rates?: string;
  feeder?: string;
  validator?: string;
}
export interface MsgAggregateExchangeRateVoteAminoMsg {
  type: "/kujira.oracle.MsgAggregateExchangeRateVote";
  value: MsgAggregateExchangeRateVoteAmino;
}
/**
 * MsgAggregateExchangeRateVote represents a message to submit
 * aggregate exchange rate vote.
 */
export interface MsgAggregateExchangeRateVoteSDKType {
  salt: string;
  exchange_rates: string;
  feeder: string;
  validator: string;
}
/** MsgAggregateExchangeRateVoteResponse defines the Msg/AggregateExchangeRateVote response type. */
export interface MsgAggregateExchangeRateVoteResponse {}
export interface MsgAggregateExchangeRateVoteResponseProtoMsg {
  typeUrl: "/kujira.oracle.MsgAggregateExchangeRateVoteResponse";
  value: Uint8Array;
}
/** MsgAggregateExchangeRateVoteResponse defines the Msg/AggregateExchangeRateVote response type. */
export interface MsgAggregateExchangeRateVoteResponseAmino {}
export interface MsgAggregateExchangeRateVoteResponseAminoMsg {
  type: "/kujira.oracle.MsgAggregateExchangeRateVoteResponse";
  value: MsgAggregateExchangeRateVoteResponseAmino;
}
/** MsgAggregateExchangeRateVoteResponse defines the Msg/AggregateExchangeRateVote response type. */
export interface MsgAggregateExchangeRateVoteResponseSDKType {}
/**
 * MsgDelegateFeedConsent represents a message to
 * delegate oracle voting rights to another address.
 */
export interface MsgDelegateFeedConsent {
  operator: string;
  delegate: string;
}
export interface MsgDelegateFeedConsentProtoMsg {
  typeUrl: "/kujira.oracle.MsgDelegateFeedConsent";
  value: Uint8Array;
}
/**
 * MsgDelegateFeedConsent represents a message to
 * delegate oracle voting rights to another address.
 */
export interface MsgDelegateFeedConsentAmino {
  operator?: string;
  delegate?: string;
}
export interface MsgDelegateFeedConsentAminoMsg {
  type: "/kujira.oracle.MsgDelegateFeedConsent";
  value: MsgDelegateFeedConsentAmino;
}
/**
 * MsgDelegateFeedConsent represents a message to
 * delegate oracle voting rights to another address.
 */
export interface MsgDelegateFeedConsentSDKType {
  operator: string;
  delegate: string;
}
/** MsgDelegateFeedConsentResponse defines the Msg/DelegateFeedConsent response type. */
export interface MsgDelegateFeedConsentResponse {}
export interface MsgDelegateFeedConsentResponseProtoMsg {
  typeUrl: "/kujira.oracle.MsgDelegateFeedConsentResponse";
  value: Uint8Array;
}
/** MsgDelegateFeedConsentResponse defines the Msg/DelegateFeedConsent response type. */
export interface MsgDelegateFeedConsentResponseAmino {}
export interface MsgDelegateFeedConsentResponseAminoMsg {
  type: "/kujira.oracle.MsgDelegateFeedConsentResponse";
  value: MsgDelegateFeedConsentResponseAmino;
}
/** MsgDelegateFeedConsentResponse defines the Msg/DelegateFeedConsent response type. */
export interface MsgDelegateFeedConsentResponseSDKType {}
function createBaseMsgAggregateExchangeRatePrevote(): MsgAggregateExchangeRatePrevote {
  return {
    hash: "",
    feeder: "",
    validator: ""
  };
}
export const MsgAggregateExchangeRatePrevote = {
  typeUrl: "/kujira.oracle.MsgAggregateExchangeRatePrevote",
  encode(message: MsgAggregateExchangeRatePrevote, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.hash !== "") {
      writer.uint32(10).string(message.hash);
    }
    if (message.feeder !== "") {
      writer.uint32(18).string(message.feeder);
    }
    if (message.validator !== "") {
      writer.uint32(26).string(message.validator);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgAggregateExchangeRatePrevote {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAggregateExchangeRatePrevote();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hash = reader.string();
          break;
        case 2:
          message.feeder = reader.string();
          break;
        case 3:
          message.validator = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgAggregateExchangeRatePrevote>): MsgAggregateExchangeRatePrevote {
    const message = createBaseMsgAggregateExchangeRatePrevote();
    message.hash = object.hash ?? "";
    message.feeder = object.feeder ?? "";
    message.validator = object.validator ?? "";
    return message;
  },
  fromAmino(object: MsgAggregateExchangeRatePrevoteAmino): MsgAggregateExchangeRatePrevote {
    const message = createBaseMsgAggregateExchangeRatePrevote();
    if (object.hash !== undefined && object.hash !== null) {
      message.hash = object.hash;
    }
    if (object.feeder !== undefined && object.feeder !== null) {
      message.feeder = object.feeder;
    }
    if (object.validator !== undefined && object.validator !== null) {
      message.validator = object.validator;
    }
    return message;
  },
  toAmino(message: MsgAggregateExchangeRatePrevote, useInterfaces: boolean = false): MsgAggregateExchangeRatePrevoteAmino {
    const obj: any = {};
    obj.hash = message.hash === "" ? undefined : message.hash;
    obj.feeder = message.feeder === "" ? undefined : message.feeder;
    obj.validator = message.validator === "" ? undefined : message.validator;
    return obj;
  },
  fromAminoMsg(object: MsgAggregateExchangeRatePrevoteAminoMsg): MsgAggregateExchangeRatePrevote {
    return MsgAggregateExchangeRatePrevote.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgAggregateExchangeRatePrevoteProtoMsg, useInterfaces: boolean = false): MsgAggregateExchangeRatePrevote {
    return MsgAggregateExchangeRatePrevote.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgAggregateExchangeRatePrevote): Uint8Array {
    return MsgAggregateExchangeRatePrevote.encode(message).finish();
  },
  toProtoMsg(message: MsgAggregateExchangeRatePrevote): MsgAggregateExchangeRatePrevoteProtoMsg {
    return {
      typeUrl: "/kujira.oracle.MsgAggregateExchangeRatePrevote",
      value: MsgAggregateExchangeRatePrevote.encode(message).finish()
    };
  }
};
function createBaseMsgAggregateExchangeRatePrevoteResponse(): MsgAggregateExchangeRatePrevoteResponse {
  return {};
}
export const MsgAggregateExchangeRatePrevoteResponse = {
  typeUrl: "/kujira.oracle.MsgAggregateExchangeRatePrevoteResponse",
  encode(_: MsgAggregateExchangeRatePrevoteResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgAggregateExchangeRatePrevoteResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAggregateExchangeRatePrevoteResponse();
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
  fromPartial(_: Partial<MsgAggregateExchangeRatePrevoteResponse>): MsgAggregateExchangeRatePrevoteResponse {
    const message = createBaseMsgAggregateExchangeRatePrevoteResponse();
    return message;
  },
  fromAmino(_: MsgAggregateExchangeRatePrevoteResponseAmino): MsgAggregateExchangeRatePrevoteResponse {
    const message = createBaseMsgAggregateExchangeRatePrevoteResponse();
    return message;
  },
  toAmino(_: MsgAggregateExchangeRatePrevoteResponse, useInterfaces: boolean = false): MsgAggregateExchangeRatePrevoteResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgAggregateExchangeRatePrevoteResponseAminoMsg): MsgAggregateExchangeRatePrevoteResponse {
    return MsgAggregateExchangeRatePrevoteResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgAggregateExchangeRatePrevoteResponseProtoMsg, useInterfaces: boolean = false): MsgAggregateExchangeRatePrevoteResponse {
    return MsgAggregateExchangeRatePrevoteResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgAggregateExchangeRatePrevoteResponse): Uint8Array {
    return MsgAggregateExchangeRatePrevoteResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgAggregateExchangeRatePrevoteResponse): MsgAggregateExchangeRatePrevoteResponseProtoMsg {
    return {
      typeUrl: "/kujira.oracle.MsgAggregateExchangeRatePrevoteResponse",
      value: MsgAggregateExchangeRatePrevoteResponse.encode(message).finish()
    };
  }
};
function createBaseMsgAggregateExchangeRateVote(): MsgAggregateExchangeRateVote {
  return {
    salt: "",
    exchangeRates: "",
    feeder: "",
    validator: ""
  };
}
export const MsgAggregateExchangeRateVote = {
  typeUrl: "/kujira.oracle.MsgAggregateExchangeRateVote",
  encode(message: MsgAggregateExchangeRateVote, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.salt !== "") {
      writer.uint32(10).string(message.salt);
    }
    if (message.exchangeRates !== "") {
      writer.uint32(18).string(message.exchangeRates);
    }
    if (message.feeder !== "") {
      writer.uint32(26).string(message.feeder);
    }
    if (message.validator !== "") {
      writer.uint32(34).string(message.validator);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgAggregateExchangeRateVote {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAggregateExchangeRateVote();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.salt = reader.string();
          break;
        case 2:
          message.exchangeRates = reader.string();
          break;
        case 3:
          message.feeder = reader.string();
          break;
        case 4:
          message.validator = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgAggregateExchangeRateVote>): MsgAggregateExchangeRateVote {
    const message = createBaseMsgAggregateExchangeRateVote();
    message.salt = object.salt ?? "";
    message.exchangeRates = object.exchangeRates ?? "";
    message.feeder = object.feeder ?? "";
    message.validator = object.validator ?? "";
    return message;
  },
  fromAmino(object: MsgAggregateExchangeRateVoteAmino): MsgAggregateExchangeRateVote {
    const message = createBaseMsgAggregateExchangeRateVote();
    if (object.salt !== undefined && object.salt !== null) {
      message.salt = object.salt;
    }
    if (object.exchange_rates !== undefined && object.exchange_rates !== null) {
      message.exchangeRates = object.exchange_rates;
    }
    if (object.feeder !== undefined && object.feeder !== null) {
      message.feeder = object.feeder;
    }
    if (object.validator !== undefined && object.validator !== null) {
      message.validator = object.validator;
    }
    return message;
  },
  toAmino(message: MsgAggregateExchangeRateVote, useInterfaces: boolean = false): MsgAggregateExchangeRateVoteAmino {
    const obj: any = {};
    obj.salt = message.salt === "" ? undefined : message.salt;
    obj.exchange_rates = message.exchangeRates === "" ? undefined : message.exchangeRates;
    obj.feeder = message.feeder === "" ? undefined : message.feeder;
    obj.validator = message.validator === "" ? undefined : message.validator;
    return obj;
  },
  fromAminoMsg(object: MsgAggregateExchangeRateVoteAminoMsg): MsgAggregateExchangeRateVote {
    return MsgAggregateExchangeRateVote.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgAggregateExchangeRateVoteProtoMsg, useInterfaces: boolean = false): MsgAggregateExchangeRateVote {
    return MsgAggregateExchangeRateVote.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgAggregateExchangeRateVote): Uint8Array {
    return MsgAggregateExchangeRateVote.encode(message).finish();
  },
  toProtoMsg(message: MsgAggregateExchangeRateVote): MsgAggregateExchangeRateVoteProtoMsg {
    return {
      typeUrl: "/kujira.oracle.MsgAggregateExchangeRateVote",
      value: MsgAggregateExchangeRateVote.encode(message).finish()
    };
  }
};
function createBaseMsgAggregateExchangeRateVoteResponse(): MsgAggregateExchangeRateVoteResponse {
  return {};
}
export const MsgAggregateExchangeRateVoteResponse = {
  typeUrl: "/kujira.oracle.MsgAggregateExchangeRateVoteResponse",
  encode(_: MsgAggregateExchangeRateVoteResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgAggregateExchangeRateVoteResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAggregateExchangeRateVoteResponse();
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
  fromPartial(_: Partial<MsgAggregateExchangeRateVoteResponse>): MsgAggregateExchangeRateVoteResponse {
    const message = createBaseMsgAggregateExchangeRateVoteResponse();
    return message;
  },
  fromAmino(_: MsgAggregateExchangeRateVoteResponseAmino): MsgAggregateExchangeRateVoteResponse {
    const message = createBaseMsgAggregateExchangeRateVoteResponse();
    return message;
  },
  toAmino(_: MsgAggregateExchangeRateVoteResponse, useInterfaces: boolean = false): MsgAggregateExchangeRateVoteResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgAggregateExchangeRateVoteResponseAminoMsg): MsgAggregateExchangeRateVoteResponse {
    return MsgAggregateExchangeRateVoteResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgAggregateExchangeRateVoteResponseProtoMsg, useInterfaces: boolean = false): MsgAggregateExchangeRateVoteResponse {
    return MsgAggregateExchangeRateVoteResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgAggregateExchangeRateVoteResponse): Uint8Array {
    return MsgAggregateExchangeRateVoteResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgAggregateExchangeRateVoteResponse): MsgAggregateExchangeRateVoteResponseProtoMsg {
    return {
      typeUrl: "/kujira.oracle.MsgAggregateExchangeRateVoteResponse",
      value: MsgAggregateExchangeRateVoteResponse.encode(message).finish()
    };
  }
};
function createBaseMsgDelegateFeedConsent(): MsgDelegateFeedConsent {
  return {
    operator: "",
    delegate: ""
  };
}
export const MsgDelegateFeedConsent = {
  typeUrl: "/kujira.oracle.MsgDelegateFeedConsent",
  encode(message: MsgDelegateFeedConsent, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.operator !== "") {
      writer.uint32(10).string(message.operator);
    }
    if (message.delegate !== "") {
      writer.uint32(18).string(message.delegate);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgDelegateFeedConsent {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDelegateFeedConsent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.operator = reader.string();
          break;
        case 2:
          message.delegate = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgDelegateFeedConsent>): MsgDelegateFeedConsent {
    const message = createBaseMsgDelegateFeedConsent();
    message.operator = object.operator ?? "";
    message.delegate = object.delegate ?? "";
    return message;
  },
  fromAmino(object: MsgDelegateFeedConsentAmino): MsgDelegateFeedConsent {
    const message = createBaseMsgDelegateFeedConsent();
    if (object.operator !== undefined && object.operator !== null) {
      message.operator = object.operator;
    }
    if (object.delegate !== undefined && object.delegate !== null) {
      message.delegate = object.delegate;
    }
    return message;
  },
  toAmino(message: MsgDelegateFeedConsent, useInterfaces: boolean = false): MsgDelegateFeedConsentAmino {
    const obj: any = {};
    obj.operator = message.operator === "" ? undefined : message.operator;
    obj.delegate = message.delegate === "" ? undefined : message.delegate;
    return obj;
  },
  fromAminoMsg(object: MsgDelegateFeedConsentAminoMsg): MsgDelegateFeedConsent {
    return MsgDelegateFeedConsent.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgDelegateFeedConsentProtoMsg, useInterfaces: boolean = false): MsgDelegateFeedConsent {
    return MsgDelegateFeedConsent.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgDelegateFeedConsent): Uint8Array {
    return MsgDelegateFeedConsent.encode(message).finish();
  },
  toProtoMsg(message: MsgDelegateFeedConsent): MsgDelegateFeedConsentProtoMsg {
    return {
      typeUrl: "/kujira.oracle.MsgDelegateFeedConsent",
      value: MsgDelegateFeedConsent.encode(message).finish()
    };
  }
};
function createBaseMsgDelegateFeedConsentResponse(): MsgDelegateFeedConsentResponse {
  return {};
}
export const MsgDelegateFeedConsentResponse = {
  typeUrl: "/kujira.oracle.MsgDelegateFeedConsentResponse",
  encode(_: MsgDelegateFeedConsentResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgDelegateFeedConsentResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDelegateFeedConsentResponse();
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
  fromPartial(_: Partial<MsgDelegateFeedConsentResponse>): MsgDelegateFeedConsentResponse {
    const message = createBaseMsgDelegateFeedConsentResponse();
    return message;
  },
  fromAmino(_: MsgDelegateFeedConsentResponseAmino): MsgDelegateFeedConsentResponse {
    const message = createBaseMsgDelegateFeedConsentResponse();
    return message;
  },
  toAmino(_: MsgDelegateFeedConsentResponse, useInterfaces: boolean = false): MsgDelegateFeedConsentResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgDelegateFeedConsentResponseAminoMsg): MsgDelegateFeedConsentResponse {
    return MsgDelegateFeedConsentResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgDelegateFeedConsentResponseProtoMsg, useInterfaces: boolean = false): MsgDelegateFeedConsentResponse {
    return MsgDelegateFeedConsentResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgDelegateFeedConsentResponse): Uint8Array {
    return MsgDelegateFeedConsentResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgDelegateFeedConsentResponse): MsgDelegateFeedConsentResponseProtoMsg {
    return {
      typeUrl: "/kujira.oracle.MsgDelegateFeedConsentResponse",
      value: MsgDelegateFeedConsentResponse.encode(message).finish()
    };
  }
};