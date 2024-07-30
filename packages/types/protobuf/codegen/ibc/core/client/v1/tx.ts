//@ts-nocheck
import { Any, AnyAmino, AnySDKType } from "../../../../google/protobuf/any";
import { Params, ParamsAmino, ParamsSDKType } from "./client";
import { BinaryReader, BinaryWriter } from "../../../../binary";
import { bytesFromBase64, base64FromBytes } from "../../../../helpers";
/** MsgCreateClient defines a message to create an IBC client */
export interface MsgCreateClient {
  /** light client state */
  clientState?: Any | undefined;
  /**
   * consensus state associated with the client that corresponds to a given
   * height.
   */
  consensusState?: Any | undefined;
  /** signer address */
  signer: string;
}
export interface MsgCreateClientProtoMsg {
  typeUrl: "/ibc.core.client.v1.MsgCreateClient";
  value: Uint8Array;
}
/** MsgCreateClient defines a message to create an IBC client */
export interface MsgCreateClientAmino {
  /** light client state */
  client_state?: AnyAmino | undefined;
  /**
   * consensus state associated with the client that corresponds to a given
   * height.
   */
  consensus_state?: AnyAmino | undefined;
  /** signer address */
  signer?: string;
}
export interface MsgCreateClientAminoMsg {
  type: "cosmos-sdk/MsgCreateClient";
  value: MsgCreateClientAmino;
}
/** MsgCreateClient defines a message to create an IBC client */
export interface MsgCreateClientSDKType {
  client_state?: AnySDKType | undefined;
  consensus_state?: AnySDKType | undefined;
  signer: string;
}
/** MsgCreateClientResponse defines the Msg/CreateClient response type. */
export interface MsgCreateClientResponse {}
export interface MsgCreateClientResponseProtoMsg {
  typeUrl: "/ibc.core.client.v1.MsgCreateClientResponse";
  value: Uint8Array;
}
/** MsgCreateClientResponse defines the Msg/CreateClient response type. */
export interface MsgCreateClientResponseAmino {}
export interface MsgCreateClientResponseAminoMsg {
  type: "cosmos-sdk/MsgCreateClientResponse";
  value: MsgCreateClientResponseAmino;
}
/** MsgCreateClientResponse defines the Msg/CreateClient response type. */
export interface MsgCreateClientResponseSDKType {}
/**
 * MsgUpdateClient defines an sdk.Msg to update a IBC client state using
 * the given client message.
 */
export interface MsgUpdateClient {
  /** client unique identifier */
  clientId: string;
  /** client message to update the light client */
  clientMessage?: Any | undefined;
  /** signer address */
  signer: string;
}
export interface MsgUpdateClientProtoMsg {
  typeUrl: "/ibc.core.client.v1.MsgUpdateClient";
  value: Uint8Array;
}
/**
 * MsgUpdateClient defines an sdk.Msg to update a IBC client state using
 * the given client message.
 */
export interface MsgUpdateClientAmino {
  /** client unique identifier */
  client_id?: string;
  /** client message to update the light client */
  client_message?: AnyAmino | undefined;
  /** signer address */
  signer?: string;
}
export interface MsgUpdateClientAminoMsg {
  type: "cosmos-sdk/MsgUpdateClient";
  value: MsgUpdateClientAmino;
}
/**
 * MsgUpdateClient defines an sdk.Msg to update a IBC client state using
 * the given client message.
 */
export interface MsgUpdateClientSDKType {
  client_id: string;
  client_message?: AnySDKType | undefined;
  signer: string;
}
/** MsgUpdateClientResponse defines the Msg/UpdateClient response type. */
export interface MsgUpdateClientResponse {}
export interface MsgUpdateClientResponseProtoMsg {
  typeUrl: "/ibc.core.client.v1.MsgUpdateClientResponse";
  value: Uint8Array;
}
/** MsgUpdateClientResponse defines the Msg/UpdateClient response type. */
export interface MsgUpdateClientResponseAmino {}
export interface MsgUpdateClientResponseAminoMsg {
  type: "cosmos-sdk/MsgUpdateClientResponse";
  value: MsgUpdateClientResponseAmino;
}
/** MsgUpdateClientResponse defines the Msg/UpdateClient response type. */
export interface MsgUpdateClientResponseSDKType {}
/**
 * MsgUpgradeClient defines an sdk.Msg to upgrade an IBC client to a new client
 * state
 */
export interface MsgUpgradeClient {
  /** client unique identifier */
  clientId: string;
  /** upgraded client state */
  clientState?: Any | undefined;
  /**
   * upgraded consensus state, only contains enough information to serve as a
   * basis of trust in update logic
   */
  consensusState?: Any | undefined;
  /** proof that old chain committed to new client */
  proofUpgradeClient: Uint8Array;
  /** proof that old chain committed to new consensus state */
  proofUpgradeConsensusState: Uint8Array;
  /** signer address */
  signer: string;
}
export interface MsgUpgradeClientProtoMsg {
  typeUrl: "/ibc.core.client.v1.MsgUpgradeClient";
  value: Uint8Array;
}
/**
 * MsgUpgradeClient defines an sdk.Msg to upgrade an IBC client to a new client
 * state
 */
export interface MsgUpgradeClientAmino {
  /** client unique identifier */
  client_id?: string;
  /** upgraded client state */
  client_state?: AnyAmino | undefined;
  /**
   * upgraded consensus state, only contains enough information to serve as a
   * basis of trust in update logic
   */
  consensus_state?: AnyAmino | undefined;
  /** proof that old chain committed to new client */
  proof_upgrade_client?: string;
  /** proof that old chain committed to new consensus state */
  proof_upgrade_consensus_state?: string;
  /** signer address */
  signer?: string;
}
export interface MsgUpgradeClientAminoMsg {
  type: "cosmos-sdk/MsgUpgradeClient";
  value: MsgUpgradeClientAmino;
}
/**
 * MsgUpgradeClient defines an sdk.Msg to upgrade an IBC client to a new client
 * state
 */
export interface MsgUpgradeClientSDKType {
  client_id: string;
  client_state?: AnySDKType | undefined;
  consensus_state?: AnySDKType | undefined;
  proof_upgrade_client: Uint8Array;
  proof_upgrade_consensus_state: Uint8Array;
  signer: string;
}
/** MsgUpgradeClientResponse defines the Msg/UpgradeClient response type. */
export interface MsgUpgradeClientResponse {}
export interface MsgUpgradeClientResponseProtoMsg {
  typeUrl: "/ibc.core.client.v1.MsgUpgradeClientResponse";
  value: Uint8Array;
}
/** MsgUpgradeClientResponse defines the Msg/UpgradeClient response type. */
export interface MsgUpgradeClientResponseAmino {}
export interface MsgUpgradeClientResponseAminoMsg {
  type: "cosmos-sdk/MsgUpgradeClientResponse";
  value: MsgUpgradeClientResponseAmino;
}
/** MsgUpgradeClientResponse defines the Msg/UpgradeClient response type. */
export interface MsgUpgradeClientResponseSDKType {}
/**
 * MsgSubmitMisbehaviour defines an sdk.Msg type that submits Evidence for
 * light client misbehaviour.
 * This message has been deprecated. Use MsgUpdateClient instead.
 */
/** @deprecated */
export interface MsgSubmitMisbehaviour {
  /** client unique identifier */
  clientId: string;
  /** misbehaviour used for freezing the light client */
  misbehaviour?: Any | undefined;
  /** signer address */
  signer: string;
}
export interface MsgSubmitMisbehaviourProtoMsg {
  typeUrl: "/ibc.core.client.v1.MsgSubmitMisbehaviour";
  value: Uint8Array;
}
/**
 * MsgSubmitMisbehaviour defines an sdk.Msg type that submits Evidence for
 * light client misbehaviour.
 * This message has been deprecated. Use MsgUpdateClient instead.
 */
/** @deprecated */
export interface MsgSubmitMisbehaviourAmino {
  /** client unique identifier */
  client_id?: string;
  /** misbehaviour used for freezing the light client */
  misbehaviour?: AnyAmino | undefined;
  /** signer address */
  signer?: string;
}
export interface MsgSubmitMisbehaviourAminoMsg {
  type: "cosmos-sdk/MsgSubmitMisbehaviour";
  value: MsgSubmitMisbehaviourAmino;
}
/**
 * MsgSubmitMisbehaviour defines an sdk.Msg type that submits Evidence for
 * light client misbehaviour.
 * This message has been deprecated. Use MsgUpdateClient instead.
 */
/** @deprecated */
export interface MsgSubmitMisbehaviourSDKType {
  client_id: string;
  misbehaviour?: AnySDKType | undefined;
  signer: string;
}
/**
 * MsgSubmitMisbehaviourResponse defines the Msg/SubmitMisbehaviour response
 * type.
 */
export interface MsgSubmitMisbehaviourResponse {}
export interface MsgSubmitMisbehaviourResponseProtoMsg {
  typeUrl: "/ibc.core.client.v1.MsgSubmitMisbehaviourResponse";
  value: Uint8Array;
}
/**
 * MsgSubmitMisbehaviourResponse defines the Msg/SubmitMisbehaviour response
 * type.
 */
export interface MsgSubmitMisbehaviourResponseAmino {}
export interface MsgSubmitMisbehaviourResponseAminoMsg {
  type: "cosmos-sdk/MsgSubmitMisbehaviourResponse";
  value: MsgSubmitMisbehaviourResponseAmino;
}
/**
 * MsgSubmitMisbehaviourResponse defines the Msg/SubmitMisbehaviour response
 * type.
 */
export interface MsgSubmitMisbehaviourResponseSDKType {}
/** MsgUpdateParams defines the sdk.Msg type to update the client parameters. */
export interface MsgUpdateParams {
  /** authority is the address of the governance account. */
  authority: string;
  /**
   * params defines the client parameters to update.
   * 
   * NOTE: All parameters must be supplied.
   */
  params: Params | undefined;
}
export interface MsgUpdateParamsProtoMsg {
  typeUrl: "/ibc.core.client.v1.MsgUpdateParams";
  value: Uint8Array;
}
/** MsgUpdateParams defines the sdk.Msg type to update the client parameters. */
export interface MsgUpdateParamsAmino {
  /** authority is the address of the governance account. */
  authority?: string;
  /**
   * params defines the client parameters to update.
   * 
   * NOTE: All parameters must be supplied.
   */
  params?: ParamsAmino | undefined;
}
export interface MsgUpdateParamsAminoMsg {
  type: "cosmos-sdk/MsgUpdateParams";
  value: MsgUpdateParamsAmino;
}
/** MsgUpdateParams defines the sdk.Msg type to update the client parameters. */
export interface MsgUpdateParamsSDKType {
  authority: string;
  params: ParamsSDKType | undefined;
}
/** MsgUpdateParamsResponse defines the MsgUpdateParams response type. */
export interface MsgUpdateParamsResponse {}
export interface MsgUpdateParamsResponseProtoMsg {
  typeUrl: "/ibc.core.client.v1.MsgUpdateParamsResponse";
  value: Uint8Array;
}
/** MsgUpdateParamsResponse defines the MsgUpdateParams response type. */
export interface MsgUpdateParamsResponseAmino {}
export interface MsgUpdateParamsResponseAminoMsg {
  type: "cosmos-sdk/MsgUpdateParamsResponse";
  value: MsgUpdateParamsResponseAmino;
}
/** MsgUpdateParamsResponse defines the MsgUpdateParams response type. */
export interface MsgUpdateParamsResponseSDKType {}
function createBaseMsgCreateClient(): MsgCreateClient {
  return {
    clientState: undefined,
    consensusState: undefined,
    signer: ""
  };
}
export const MsgCreateClient = {
  typeUrl: "/ibc.core.client.v1.MsgCreateClient",
  encode(message: MsgCreateClient, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.clientState !== undefined) {
      Any.encode(message.clientState, writer.uint32(10).fork()).ldelim();
    }
    if (message.consensusState !== undefined) {
      Any.encode(message.consensusState, writer.uint32(18).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(26).string(message.signer);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgCreateClient {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateClient();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clientState = Any.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.consensusState = Any.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgCreateClient>): MsgCreateClient {
    const message = createBaseMsgCreateClient();
    message.clientState = object.clientState !== undefined && object.clientState !== null ? Any.fromPartial(object.clientState) : undefined;
    message.consensusState = object.consensusState !== undefined && object.consensusState !== null ? Any.fromPartial(object.consensusState) : undefined;
    message.signer = object.signer ?? "";
    return message;
  },
  fromAmino(object: MsgCreateClientAmino): MsgCreateClient {
    const message = createBaseMsgCreateClient();
    if (object.client_state !== undefined && object.client_state !== null) {
      message.clientState = Any.fromAmino(object.client_state);
    }
    if (object.consensus_state !== undefined && object.consensus_state !== null) {
      message.consensusState = Any.fromAmino(object.consensus_state);
    }
    if (object.signer !== undefined && object.signer !== null) {
      message.signer = object.signer;
    }
    return message;
  },
  toAmino(message: MsgCreateClient, useInterfaces: boolean = false): MsgCreateClientAmino {
    const obj: any = {};
    obj.client_state = message.clientState ? Any.toAmino(message.clientState, useInterfaces) : undefined;
    obj.consensus_state = message.consensusState ? Any.toAmino(message.consensusState, useInterfaces) : undefined;
    obj.signer = message.signer === "" ? undefined : message.signer;
    return obj;
  },
  fromAminoMsg(object: MsgCreateClientAminoMsg): MsgCreateClient {
    return MsgCreateClient.fromAmino(object.value);
  },
  toAminoMsg(message: MsgCreateClient, useInterfaces: boolean = false): MsgCreateClientAminoMsg {
    return {
      type: "cosmos-sdk/MsgCreateClient",
      value: MsgCreateClient.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgCreateClientProtoMsg, useInterfaces: boolean = false): MsgCreateClient {
    return MsgCreateClient.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgCreateClient): Uint8Array {
    return MsgCreateClient.encode(message).finish();
  },
  toProtoMsg(message: MsgCreateClient): MsgCreateClientProtoMsg {
    return {
      typeUrl: "/ibc.core.client.v1.MsgCreateClient",
      value: MsgCreateClient.encode(message).finish()
    };
  }
};
function createBaseMsgCreateClientResponse(): MsgCreateClientResponse {
  return {};
}
export const MsgCreateClientResponse = {
  typeUrl: "/ibc.core.client.v1.MsgCreateClientResponse",
  encode(_: MsgCreateClientResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgCreateClientResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateClientResponse();
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
  fromPartial(_: Partial<MsgCreateClientResponse>): MsgCreateClientResponse {
    const message = createBaseMsgCreateClientResponse();
    return message;
  },
  fromAmino(_: MsgCreateClientResponseAmino): MsgCreateClientResponse {
    const message = createBaseMsgCreateClientResponse();
    return message;
  },
  toAmino(_: MsgCreateClientResponse, useInterfaces: boolean = false): MsgCreateClientResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgCreateClientResponseAminoMsg): MsgCreateClientResponse {
    return MsgCreateClientResponse.fromAmino(object.value);
  },
  toAminoMsg(message: MsgCreateClientResponse, useInterfaces: boolean = false): MsgCreateClientResponseAminoMsg {
    return {
      type: "cosmos-sdk/MsgCreateClientResponse",
      value: MsgCreateClientResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgCreateClientResponseProtoMsg, useInterfaces: boolean = false): MsgCreateClientResponse {
    return MsgCreateClientResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgCreateClientResponse): Uint8Array {
    return MsgCreateClientResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgCreateClientResponse): MsgCreateClientResponseProtoMsg {
    return {
      typeUrl: "/ibc.core.client.v1.MsgCreateClientResponse",
      value: MsgCreateClientResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateClient(): MsgUpdateClient {
  return {
    clientId: "",
    clientMessage: undefined,
    signer: ""
  };
}
export const MsgUpdateClient = {
  typeUrl: "/ibc.core.client.v1.MsgUpdateClient",
  encode(message: MsgUpdateClient, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.clientId !== "") {
      writer.uint32(10).string(message.clientId);
    }
    if (message.clientMessage !== undefined) {
      Any.encode(message.clientMessage, writer.uint32(18).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(26).string(message.signer);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateClient {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateClient();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clientId = reader.string();
          break;
        case 2:
          message.clientMessage = Any.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUpdateClient>): MsgUpdateClient {
    const message = createBaseMsgUpdateClient();
    message.clientId = object.clientId ?? "";
    message.clientMessage = object.clientMessage !== undefined && object.clientMessage !== null ? Any.fromPartial(object.clientMessage) : undefined;
    message.signer = object.signer ?? "";
    return message;
  },
  fromAmino(object: MsgUpdateClientAmino): MsgUpdateClient {
    const message = createBaseMsgUpdateClient();
    if (object.client_id !== undefined && object.client_id !== null) {
      message.clientId = object.client_id;
    }
    if (object.client_message !== undefined && object.client_message !== null) {
      message.clientMessage = Any.fromAmino(object.client_message);
    }
    if (object.signer !== undefined && object.signer !== null) {
      message.signer = object.signer;
    }
    return message;
  },
  toAmino(message: MsgUpdateClient, useInterfaces: boolean = false): MsgUpdateClientAmino {
    const obj: any = {};
    obj.client_id = message.clientId === "" ? undefined : message.clientId;
    obj.client_message = message.clientMessage ? Any.toAmino(message.clientMessage, useInterfaces) : undefined;
    obj.signer = message.signer === "" ? undefined : message.signer;
    return obj;
  },
  fromAminoMsg(object: MsgUpdateClientAminoMsg): MsgUpdateClient {
    return MsgUpdateClient.fromAmino(object.value);
  },
  toAminoMsg(message: MsgUpdateClient, useInterfaces: boolean = false): MsgUpdateClientAminoMsg {
    return {
      type: "cosmos-sdk/MsgUpdateClient",
      value: MsgUpdateClient.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgUpdateClientProtoMsg, useInterfaces: boolean = false): MsgUpdateClient {
    return MsgUpdateClient.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateClient): Uint8Array {
    return MsgUpdateClient.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateClient): MsgUpdateClientProtoMsg {
    return {
      typeUrl: "/ibc.core.client.v1.MsgUpdateClient",
      value: MsgUpdateClient.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateClientResponse(): MsgUpdateClientResponse {
  return {};
}
export const MsgUpdateClientResponse = {
  typeUrl: "/ibc.core.client.v1.MsgUpdateClientResponse",
  encode(_: MsgUpdateClientResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateClientResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateClientResponse();
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
  fromPartial(_: Partial<MsgUpdateClientResponse>): MsgUpdateClientResponse {
    const message = createBaseMsgUpdateClientResponse();
    return message;
  },
  fromAmino(_: MsgUpdateClientResponseAmino): MsgUpdateClientResponse {
    const message = createBaseMsgUpdateClientResponse();
    return message;
  },
  toAmino(_: MsgUpdateClientResponse, useInterfaces: boolean = false): MsgUpdateClientResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateClientResponseAminoMsg): MsgUpdateClientResponse {
    return MsgUpdateClientResponse.fromAmino(object.value);
  },
  toAminoMsg(message: MsgUpdateClientResponse, useInterfaces: boolean = false): MsgUpdateClientResponseAminoMsg {
    return {
      type: "cosmos-sdk/MsgUpdateClientResponse",
      value: MsgUpdateClientResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgUpdateClientResponseProtoMsg, useInterfaces: boolean = false): MsgUpdateClientResponse {
    return MsgUpdateClientResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateClientResponse): Uint8Array {
    return MsgUpdateClientResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateClientResponse): MsgUpdateClientResponseProtoMsg {
    return {
      typeUrl: "/ibc.core.client.v1.MsgUpdateClientResponse",
      value: MsgUpdateClientResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpgradeClient(): MsgUpgradeClient {
  return {
    clientId: "",
    clientState: undefined,
    consensusState: undefined,
    proofUpgradeClient: new Uint8Array(),
    proofUpgradeConsensusState: new Uint8Array(),
    signer: ""
  };
}
export const MsgUpgradeClient = {
  typeUrl: "/ibc.core.client.v1.MsgUpgradeClient",
  encode(message: MsgUpgradeClient, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.clientId !== "") {
      writer.uint32(10).string(message.clientId);
    }
    if (message.clientState !== undefined) {
      Any.encode(message.clientState, writer.uint32(18).fork()).ldelim();
    }
    if (message.consensusState !== undefined) {
      Any.encode(message.consensusState, writer.uint32(26).fork()).ldelim();
    }
    if (message.proofUpgradeClient.length !== 0) {
      writer.uint32(34).bytes(message.proofUpgradeClient);
    }
    if (message.proofUpgradeConsensusState.length !== 0) {
      writer.uint32(42).bytes(message.proofUpgradeConsensusState);
    }
    if (message.signer !== "") {
      writer.uint32(50).string(message.signer);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpgradeClient {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpgradeClient();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clientId = reader.string();
          break;
        case 2:
          message.clientState = Any.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.consensusState = Any.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 4:
          message.proofUpgradeClient = reader.bytes();
          break;
        case 5:
          message.proofUpgradeConsensusState = reader.bytes();
          break;
        case 6:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUpgradeClient>): MsgUpgradeClient {
    const message = createBaseMsgUpgradeClient();
    message.clientId = object.clientId ?? "";
    message.clientState = object.clientState !== undefined && object.clientState !== null ? Any.fromPartial(object.clientState) : undefined;
    message.consensusState = object.consensusState !== undefined && object.consensusState !== null ? Any.fromPartial(object.consensusState) : undefined;
    message.proofUpgradeClient = object.proofUpgradeClient ?? new Uint8Array();
    message.proofUpgradeConsensusState = object.proofUpgradeConsensusState ?? new Uint8Array();
    message.signer = object.signer ?? "";
    return message;
  },
  fromAmino(object: MsgUpgradeClientAmino): MsgUpgradeClient {
    const message = createBaseMsgUpgradeClient();
    if (object.client_id !== undefined && object.client_id !== null) {
      message.clientId = object.client_id;
    }
    if (object.client_state !== undefined && object.client_state !== null) {
      message.clientState = Any.fromAmino(object.client_state);
    }
    if (object.consensus_state !== undefined && object.consensus_state !== null) {
      message.consensusState = Any.fromAmino(object.consensus_state);
    }
    if (object.proof_upgrade_client !== undefined && object.proof_upgrade_client !== null) {
      message.proofUpgradeClient = bytesFromBase64(object.proof_upgrade_client);
    }
    if (object.proof_upgrade_consensus_state !== undefined && object.proof_upgrade_consensus_state !== null) {
      message.proofUpgradeConsensusState = bytesFromBase64(object.proof_upgrade_consensus_state);
    }
    if (object.signer !== undefined && object.signer !== null) {
      message.signer = object.signer;
    }
    return message;
  },
  toAmino(message: MsgUpgradeClient, useInterfaces: boolean = false): MsgUpgradeClientAmino {
    const obj: any = {};
    obj.client_id = message.clientId === "" ? undefined : message.clientId;
    obj.client_state = message.clientState ? Any.toAmino(message.clientState, useInterfaces) : undefined;
    obj.consensus_state = message.consensusState ? Any.toAmino(message.consensusState, useInterfaces) : undefined;
    obj.proof_upgrade_client = message.proofUpgradeClient ? base64FromBytes(message.proofUpgradeClient) : undefined;
    obj.proof_upgrade_consensus_state = message.proofUpgradeConsensusState ? base64FromBytes(message.proofUpgradeConsensusState) : undefined;
    obj.signer = message.signer === "" ? undefined : message.signer;
    return obj;
  },
  fromAminoMsg(object: MsgUpgradeClientAminoMsg): MsgUpgradeClient {
    return MsgUpgradeClient.fromAmino(object.value);
  },
  toAminoMsg(message: MsgUpgradeClient, useInterfaces: boolean = false): MsgUpgradeClientAminoMsg {
    return {
      type: "cosmos-sdk/MsgUpgradeClient",
      value: MsgUpgradeClient.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgUpgradeClientProtoMsg, useInterfaces: boolean = false): MsgUpgradeClient {
    return MsgUpgradeClient.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpgradeClient): Uint8Array {
    return MsgUpgradeClient.encode(message).finish();
  },
  toProtoMsg(message: MsgUpgradeClient): MsgUpgradeClientProtoMsg {
    return {
      typeUrl: "/ibc.core.client.v1.MsgUpgradeClient",
      value: MsgUpgradeClient.encode(message).finish()
    };
  }
};
function createBaseMsgUpgradeClientResponse(): MsgUpgradeClientResponse {
  return {};
}
export const MsgUpgradeClientResponse = {
  typeUrl: "/ibc.core.client.v1.MsgUpgradeClientResponse",
  encode(_: MsgUpgradeClientResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpgradeClientResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpgradeClientResponse();
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
  fromPartial(_: Partial<MsgUpgradeClientResponse>): MsgUpgradeClientResponse {
    const message = createBaseMsgUpgradeClientResponse();
    return message;
  },
  fromAmino(_: MsgUpgradeClientResponseAmino): MsgUpgradeClientResponse {
    const message = createBaseMsgUpgradeClientResponse();
    return message;
  },
  toAmino(_: MsgUpgradeClientResponse, useInterfaces: boolean = false): MsgUpgradeClientResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpgradeClientResponseAminoMsg): MsgUpgradeClientResponse {
    return MsgUpgradeClientResponse.fromAmino(object.value);
  },
  toAminoMsg(message: MsgUpgradeClientResponse, useInterfaces: boolean = false): MsgUpgradeClientResponseAminoMsg {
    return {
      type: "cosmos-sdk/MsgUpgradeClientResponse",
      value: MsgUpgradeClientResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgUpgradeClientResponseProtoMsg, useInterfaces: boolean = false): MsgUpgradeClientResponse {
    return MsgUpgradeClientResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpgradeClientResponse): Uint8Array {
    return MsgUpgradeClientResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpgradeClientResponse): MsgUpgradeClientResponseProtoMsg {
    return {
      typeUrl: "/ibc.core.client.v1.MsgUpgradeClientResponse",
      value: MsgUpgradeClientResponse.encode(message).finish()
    };
  }
};
function createBaseMsgSubmitMisbehaviour(): MsgSubmitMisbehaviour {
  return {
    clientId: "",
    misbehaviour: undefined,
    signer: ""
  };
}
export const MsgSubmitMisbehaviour = {
  typeUrl: "/ibc.core.client.v1.MsgSubmitMisbehaviour",
  encode(message: MsgSubmitMisbehaviour, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.clientId !== "") {
      writer.uint32(10).string(message.clientId);
    }
    if (message.misbehaviour !== undefined) {
      Any.encode(message.misbehaviour, writer.uint32(18).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(26).string(message.signer);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSubmitMisbehaviour {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitMisbehaviour();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clientId = reader.string();
          break;
        case 2:
          message.misbehaviour = Any.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSubmitMisbehaviour>): MsgSubmitMisbehaviour {
    const message = createBaseMsgSubmitMisbehaviour();
    message.clientId = object.clientId ?? "";
    message.misbehaviour = object.misbehaviour !== undefined && object.misbehaviour !== null ? Any.fromPartial(object.misbehaviour) : undefined;
    message.signer = object.signer ?? "";
    return message;
  },
  fromAmino(object: MsgSubmitMisbehaviourAmino): MsgSubmitMisbehaviour {
    const message = createBaseMsgSubmitMisbehaviour();
    if (object.client_id !== undefined && object.client_id !== null) {
      message.clientId = object.client_id;
    }
    if (object.misbehaviour !== undefined && object.misbehaviour !== null) {
      message.misbehaviour = Any.fromAmino(object.misbehaviour);
    }
    if (object.signer !== undefined && object.signer !== null) {
      message.signer = object.signer;
    }
    return message;
  },
  toAmino(message: MsgSubmitMisbehaviour, useInterfaces: boolean = false): MsgSubmitMisbehaviourAmino {
    const obj: any = {};
    obj.client_id = message.clientId === "" ? undefined : message.clientId;
    obj.misbehaviour = message.misbehaviour ? Any.toAmino(message.misbehaviour, useInterfaces) : undefined;
    obj.signer = message.signer === "" ? undefined : message.signer;
    return obj;
  },
  fromAminoMsg(object: MsgSubmitMisbehaviourAminoMsg): MsgSubmitMisbehaviour {
    return MsgSubmitMisbehaviour.fromAmino(object.value);
  },
  toAminoMsg(message: MsgSubmitMisbehaviour, useInterfaces: boolean = false): MsgSubmitMisbehaviourAminoMsg {
    return {
      type: "cosmos-sdk/MsgSubmitMisbehaviour",
      value: MsgSubmitMisbehaviour.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgSubmitMisbehaviourProtoMsg, useInterfaces: boolean = false): MsgSubmitMisbehaviour {
    return MsgSubmitMisbehaviour.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSubmitMisbehaviour): Uint8Array {
    return MsgSubmitMisbehaviour.encode(message).finish();
  },
  toProtoMsg(message: MsgSubmitMisbehaviour): MsgSubmitMisbehaviourProtoMsg {
    return {
      typeUrl: "/ibc.core.client.v1.MsgSubmitMisbehaviour",
      value: MsgSubmitMisbehaviour.encode(message).finish()
    };
  }
};
function createBaseMsgSubmitMisbehaviourResponse(): MsgSubmitMisbehaviourResponse {
  return {};
}
export const MsgSubmitMisbehaviourResponse = {
  typeUrl: "/ibc.core.client.v1.MsgSubmitMisbehaviourResponse",
  encode(_: MsgSubmitMisbehaviourResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSubmitMisbehaviourResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitMisbehaviourResponse();
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
  fromPartial(_: Partial<MsgSubmitMisbehaviourResponse>): MsgSubmitMisbehaviourResponse {
    const message = createBaseMsgSubmitMisbehaviourResponse();
    return message;
  },
  fromAmino(_: MsgSubmitMisbehaviourResponseAmino): MsgSubmitMisbehaviourResponse {
    const message = createBaseMsgSubmitMisbehaviourResponse();
    return message;
  },
  toAmino(_: MsgSubmitMisbehaviourResponse, useInterfaces: boolean = false): MsgSubmitMisbehaviourResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgSubmitMisbehaviourResponseAminoMsg): MsgSubmitMisbehaviourResponse {
    return MsgSubmitMisbehaviourResponse.fromAmino(object.value);
  },
  toAminoMsg(message: MsgSubmitMisbehaviourResponse, useInterfaces: boolean = false): MsgSubmitMisbehaviourResponseAminoMsg {
    return {
      type: "cosmos-sdk/MsgSubmitMisbehaviourResponse",
      value: MsgSubmitMisbehaviourResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgSubmitMisbehaviourResponseProtoMsg, useInterfaces: boolean = false): MsgSubmitMisbehaviourResponse {
    return MsgSubmitMisbehaviourResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSubmitMisbehaviourResponse): Uint8Array {
    return MsgSubmitMisbehaviourResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSubmitMisbehaviourResponse): MsgSubmitMisbehaviourResponseProtoMsg {
    return {
      typeUrl: "/ibc.core.client.v1.MsgSubmitMisbehaviourResponse",
      value: MsgSubmitMisbehaviourResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateParams(): MsgUpdateParams {
  return {
    authority: "",
    params: Params.fromPartial({})
  };
}
export const MsgUpdateParams = {
  typeUrl: "/ibc.core.client.v1.MsgUpdateParams",
  encode(message: MsgUpdateParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.params = Params.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUpdateParams>): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    message.authority = object.authority ?? "";
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: MsgUpdateParamsAmino): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: MsgUpdateParams, useInterfaces: boolean = false): MsgUpdateParamsAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgUpdateParamsAminoMsg): MsgUpdateParams {
    return MsgUpdateParams.fromAmino(object.value);
  },
  toAminoMsg(message: MsgUpdateParams, useInterfaces: boolean = false): MsgUpdateParamsAminoMsg {
    return {
      type: "cosmos-sdk/MsgUpdateParams",
      value: MsgUpdateParams.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgUpdateParamsProtoMsg, useInterfaces: boolean = false): MsgUpdateParams {
    return MsgUpdateParams.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateParams): Uint8Array {
    return MsgUpdateParams.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateParams): MsgUpdateParamsProtoMsg {
    return {
      typeUrl: "/ibc.core.client.v1.MsgUpdateParams",
      value: MsgUpdateParams.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateParamsResponse(): MsgUpdateParamsResponse {
  return {};
}
export const MsgUpdateParamsResponse = {
  typeUrl: "/ibc.core.client.v1.MsgUpdateParamsResponse",
  encode(_: MsgUpdateParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParamsResponse();
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
  fromPartial(_: Partial<MsgUpdateParamsResponse>): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  },
  fromAmino(_: MsgUpdateParamsResponseAmino): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  },
  toAmino(_: MsgUpdateParamsResponse, useInterfaces: boolean = false): MsgUpdateParamsResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateParamsResponseAminoMsg): MsgUpdateParamsResponse {
    return MsgUpdateParamsResponse.fromAmino(object.value);
  },
  toAminoMsg(message: MsgUpdateParamsResponse, useInterfaces: boolean = false): MsgUpdateParamsResponseAminoMsg {
    return {
      type: "cosmos-sdk/MsgUpdateParamsResponse",
      value: MsgUpdateParamsResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgUpdateParamsResponseProtoMsg, useInterfaces: boolean = false): MsgUpdateParamsResponse {
    return MsgUpdateParamsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateParamsResponse): Uint8Array {
    return MsgUpdateParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateParamsResponse): MsgUpdateParamsResponseProtoMsg {
    return {
      typeUrl: "/ibc.core.client.v1.MsgUpdateParamsResponse",
      value: MsgUpdateParamsResponse.encode(message).finish()
    };
  }
};