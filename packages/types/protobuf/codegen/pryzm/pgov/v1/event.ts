import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { Proposal, ProposalAmino, ProposalSDKType } from "./proposal";
import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { Vote, VoteAmino, VoteSDKType } from "./vote";
import { BinaryReader, BinaryWriter } from "../../../binary";
export interface EventSetParams {
  params: Params | undefined;
}
export interface EventSetParamsProtoMsg {
  typeUrl: "/pryzm.pgov.v1.EventSetParams";
  value: Uint8Array;
}
export interface EventSetParamsAmino {
  params?: ParamsAmino | undefined;
}
export interface EventSetParamsAminoMsg {
  type: "/pryzm.pgov.v1.EventSetParams";
  value: EventSetParamsAmino;
}
export interface EventSetParamsSDKType {
  params: ParamsSDKType | undefined;
}
export interface EventSetProposal {
  proposal: Proposal | undefined;
}
export interface EventSetProposalProtoMsg {
  typeUrl: "/pryzm.pgov.v1.EventSetProposal";
  value: Uint8Array;
}
export interface EventSetProposalAmino {
  proposal?: ProposalAmino | undefined;
}
export interface EventSetProposalAminoMsg {
  type: "/pryzm.pgov.v1.EventSetProposal";
  value: EventSetProposalAmino;
}
export interface EventSetProposalSDKType {
  proposal: ProposalSDKType | undefined;
}
export interface EventPAssetStake {
  address: string;
  asset: string;
  amount: Coin[];
  totalStakedPAsset: string;
}
export interface EventPAssetStakeProtoMsg {
  typeUrl: "/pryzm.pgov.v1.EventPAssetStake";
  value: Uint8Array;
}
export interface EventPAssetStakeAmino {
  address?: string;
  asset?: string;
  amount?: CoinAmino[];
  total_staked_p_asset?: string;
}
export interface EventPAssetStakeAminoMsg {
  type: "/pryzm.pgov.v1.EventPAssetStake";
  value: EventPAssetStakeAmino;
}
export interface EventPAssetStakeSDKType {
  address: string;
  asset: string;
  amount: CoinSDKType[];
  total_staked_p_asset: string;
}
export interface EventPAssetUnstake {
  address: string;
  asset: string;
  amount: Coin[];
  totalStakedPAsset: string;
}
export interface EventPAssetUnstakeProtoMsg {
  typeUrl: "/pryzm.pgov.v1.EventPAssetUnstake";
  value: Uint8Array;
}
export interface EventPAssetUnstakeAmino {
  address?: string;
  asset?: string;
  amount?: CoinAmino[];
  total_staked_p_asset?: string;
}
export interface EventPAssetUnstakeAminoMsg {
  type: "/pryzm.pgov.v1.EventPAssetUnstake";
  value: EventPAssetUnstakeAmino;
}
export interface EventPAssetUnstakeSDKType {
  address: string;
  asset: string;
  amount: CoinSDKType[];
  total_staked_p_asset: string;
}
export interface EventVoteSubmit {
  vote?: Vote | undefined;
}
export interface EventVoteSubmitProtoMsg {
  typeUrl: "/pryzm.pgov.v1.EventVoteSubmit";
  value: Uint8Array;
}
export interface EventVoteSubmitAmino {
  vote?: VoteAmino | undefined;
}
export interface EventVoteSubmitAminoMsg {
  type: "/pryzm.pgov.v1.EventVoteSubmit";
  value: EventVoteSubmitAmino;
}
export interface EventVoteSubmitSDKType {
  vote?: VoteSDKType | undefined;
}
export interface EventProposalEnd {
  proposal?: Proposal | undefined;
}
export interface EventProposalEndProtoMsg {
  typeUrl: "/pryzm.pgov.v1.EventProposalEnd";
  value: Uint8Array;
}
export interface EventProposalEndAmino {
  proposal?: ProposalAmino | undefined;
}
export interface EventProposalEndAminoMsg {
  type: "/pryzm.pgov.v1.EventProposalEnd";
  value: EventProposalEndAmino;
}
export interface EventProposalEndSDKType {
  proposal?: ProposalSDKType | undefined;
}
export interface EventVoteTransmit {
  proposalId: bigint;
  asset: string;
}
export interface EventVoteTransmitProtoMsg {
  typeUrl: "/pryzm.pgov.v1.EventVoteTransmit";
  value: Uint8Array;
}
export interface EventVoteTransmitAmino {
  proposal_id?: string;
  asset?: string;
}
export interface EventVoteTransmitAminoMsg {
  type: "/pryzm.pgov.v1.EventVoteTransmit";
  value: EventVoteTransmitAmino;
}
export interface EventVoteTransmitSDKType {
  proposal_id: bigint;
  asset: string;
}
export interface EventVoteTransmitFailure {
  proposalId: bigint;
  asset: string;
  error: string;
}
export interface EventVoteTransmitFailureProtoMsg {
  typeUrl: "/pryzm.pgov.v1.EventVoteTransmitFailure";
  value: Uint8Array;
}
export interface EventVoteTransmitFailureAmino {
  proposal_id?: string;
  asset?: string;
  error?: string;
}
export interface EventVoteTransmitFailureAminoMsg {
  type: "/pryzm.pgov.v1.EventVoteTransmitFailure";
  value: EventVoteTransmitFailureAmino;
}
export interface EventVoteTransmitFailureSDKType {
  proposal_id: bigint;
  asset: string;
  error: string;
}
export interface EventVoteAckSuccess {
  proposalId: bigint;
  asset: string;
}
export interface EventVoteAckSuccessProtoMsg {
  typeUrl: "/pryzm.pgov.v1.EventVoteAckSuccess";
  value: Uint8Array;
}
export interface EventVoteAckSuccessAmino {
  proposal_id?: string;
  asset?: string;
}
export interface EventVoteAckSuccessAminoMsg {
  type: "/pryzm.pgov.v1.EventVoteAckSuccess";
  value: EventVoteAckSuccessAmino;
}
export interface EventVoteAckSuccessSDKType {
  proposal_id: bigint;
  asset: string;
}
export interface EventVoteAckFailure {
  proposalId: bigint;
  asset: string;
  error: string;
}
export interface EventVoteAckFailureProtoMsg {
  typeUrl: "/pryzm.pgov.v1.EventVoteAckFailure";
  value: Uint8Array;
}
export interface EventVoteAckFailureAmino {
  proposal_id?: string;
  asset?: string;
  error?: string;
}
export interface EventVoteAckFailureAminoMsg {
  type: "/pryzm.pgov.v1.EventVoteAckFailure";
  value: EventVoteAckFailureAmino;
}
export interface EventVoteAckFailureSDKType {
  proposal_id: bigint;
  asset: string;
  error: string;
}
export interface EventVoteTimeout {
  proposalId: bigint;
  asset: string;
}
export interface EventVoteTimeoutProtoMsg {
  typeUrl: "/pryzm.pgov.v1.EventVoteTimeout";
  value: Uint8Array;
}
export interface EventVoteTimeoutAmino {
  proposal_id?: string;
  asset?: string;
}
export interface EventVoteTimeoutAminoMsg {
  type: "/pryzm.pgov.v1.EventVoteTimeout";
  value: EventVoteTimeoutAmino;
}
export interface EventVoteTimeoutSDKType {
  proposal_id: bigint;
  asset: string;
}
function createBaseEventSetParams(): EventSetParams {
  return {
    params: Params.fromPartial({})
  };
}
export const EventSetParams = {
  typeUrl: "/pryzm.pgov.v1.EventSetParams",
  encode(message: EventSetParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventSetParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSetParams();
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
  fromPartial(object: Partial<EventSetParams>): EventSetParams {
    const message = createBaseEventSetParams();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: EventSetParamsAmino): EventSetParams {
    const message = createBaseEventSetParams();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: EventSetParams, useInterfaces: boolean = false): EventSetParamsAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventSetParamsAminoMsg): EventSetParams {
    return EventSetParams.fromAmino(object.value);
  },
  fromProtoMsg(message: EventSetParamsProtoMsg, useInterfaces: boolean = false): EventSetParams {
    return EventSetParams.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventSetParams): Uint8Array {
    return EventSetParams.encode(message).finish();
  },
  toProtoMsg(message: EventSetParams): EventSetParamsProtoMsg {
    return {
      typeUrl: "/pryzm.pgov.v1.EventSetParams",
      value: EventSetParams.encode(message).finish()
    };
  }
};
function createBaseEventSetProposal(): EventSetProposal {
  return {
    proposal: Proposal.fromPartial({})
  };
}
export const EventSetProposal = {
  typeUrl: "/pryzm.pgov.v1.EventSetProposal",
  encode(message: EventSetProposal, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.proposal !== undefined) {
      Proposal.encode(message.proposal, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventSetProposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSetProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proposal = Proposal.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventSetProposal>): EventSetProposal {
    const message = createBaseEventSetProposal();
    message.proposal = object.proposal !== undefined && object.proposal !== null ? Proposal.fromPartial(object.proposal) : undefined;
    return message;
  },
  fromAmino(object: EventSetProposalAmino): EventSetProposal {
    const message = createBaseEventSetProposal();
    if (object.proposal !== undefined && object.proposal !== null) {
      message.proposal = Proposal.fromAmino(object.proposal);
    }
    return message;
  },
  toAmino(message: EventSetProposal, useInterfaces: boolean = false): EventSetProposalAmino {
    const obj: any = {};
    obj.proposal = message.proposal ? Proposal.toAmino(message.proposal, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventSetProposalAminoMsg): EventSetProposal {
    return EventSetProposal.fromAmino(object.value);
  },
  fromProtoMsg(message: EventSetProposalProtoMsg, useInterfaces: boolean = false): EventSetProposal {
    return EventSetProposal.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventSetProposal): Uint8Array {
    return EventSetProposal.encode(message).finish();
  },
  toProtoMsg(message: EventSetProposal): EventSetProposalProtoMsg {
    return {
      typeUrl: "/pryzm.pgov.v1.EventSetProposal",
      value: EventSetProposal.encode(message).finish()
    };
  }
};
function createBaseEventPAssetStake(): EventPAssetStake {
  return {
    address: "",
    asset: "",
    amount: [],
    totalStakedPAsset: ""
  };
}
export const EventPAssetStake = {
  typeUrl: "/pryzm.pgov.v1.EventPAssetStake",
  encode(message: EventPAssetStake, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.asset !== "") {
      writer.uint32(18).string(message.asset);
    }
    for (const v of message.amount) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.totalStakedPAsset !== "") {
      writer.uint32(34).string(message.totalStakedPAsset);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventPAssetStake {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventPAssetStake();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.asset = reader.string();
          break;
        case 3:
          message.amount.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 4:
          message.totalStakedPAsset = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventPAssetStake>): EventPAssetStake {
    const message = createBaseEventPAssetStake();
    message.address = object.address ?? "";
    message.asset = object.asset ?? "";
    message.amount = object.amount?.map(e => Coin.fromPartial(e)) || [];
    message.totalStakedPAsset = object.totalStakedPAsset ?? "";
    return message;
  },
  fromAmino(object: EventPAssetStakeAmino): EventPAssetStake {
    const message = createBaseEventPAssetStake();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    if (object.asset !== undefined && object.asset !== null) {
      message.asset = object.asset;
    }
    message.amount = object.amount?.map(e => Coin.fromAmino(e)) || [];
    if (object.total_staked_p_asset !== undefined && object.total_staked_p_asset !== null) {
      message.totalStakedPAsset = object.total_staked_p_asset;
    }
    return message;
  },
  toAmino(message: EventPAssetStake, useInterfaces: boolean = false): EventPAssetStakeAmino {
    const obj: any = {};
    obj.address = message.address === "" ? undefined : message.address;
    obj.asset = message.asset === "" ? undefined : message.asset;
    if (message.amount) {
      obj.amount = message.amount.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.amount = message.amount;
    }
    obj.total_staked_p_asset = message.totalStakedPAsset === "" ? undefined : message.totalStakedPAsset;
    return obj;
  },
  fromAminoMsg(object: EventPAssetStakeAminoMsg): EventPAssetStake {
    return EventPAssetStake.fromAmino(object.value);
  },
  fromProtoMsg(message: EventPAssetStakeProtoMsg, useInterfaces: boolean = false): EventPAssetStake {
    return EventPAssetStake.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventPAssetStake): Uint8Array {
    return EventPAssetStake.encode(message).finish();
  },
  toProtoMsg(message: EventPAssetStake): EventPAssetStakeProtoMsg {
    return {
      typeUrl: "/pryzm.pgov.v1.EventPAssetStake",
      value: EventPAssetStake.encode(message).finish()
    };
  }
};
function createBaseEventPAssetUnstake(): EventPAssetUnstake {
  return {
    address: "",
    asset: "",
    amount: [],
    totalStakedPAsset: ""
  };
}
export const EventPAssetUnstake = {
  typeUrl: "/pryzm.pgov.v1.EventPAssetUnstake",
  encode(message: EventPAssetUnstake, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.asset !== "") {
      writer.uint32(18).string(message.asset);
    }
    for (const v of message.amount) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.totalStakedPAsset !== "") {
      writer.uint32(34).string(message.totalStakedPAsset);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventPAssetUnstake {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventPAssetUnstake();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.asset = reader.string();
          break;
        case 3:
          message.amount.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 4:
          message.totalStakedPAsset = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventPAssetUnstake>): EventPAssetUnstake {
    const message = createBaseEventPAssetUnstake();
    message.address = object.address ?? "";
    message.asset = object.asset ?? "";
    message.amount = object.amount?.map(e => Coin.fromPartial(e)) || [];
    message.totalStakedPAsset = object.totalStakedPAsset ?? "";
    return message;
  },
  fromAmino(object: EventPAssetUnstakeAmino): EventPAssetUnstake {
    const message = createBaseEventPAssetUnstake();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    if (object.asset !== undefined && object.asset !== null) {
      message.asset = object.asset;
    }
    message.amount = object.amount?.map(e => Coin.fromAmino(e)) || [];
    if (object.total_staked_p_asset !== undefined && object.total_staked_p_asset !== null) {
      message.totalStakedPAsset = object.total_staked_p_asset;
    }
    return message;
  },
  toAmino(message: EventPAssetUnstake, useInterfaces: boolean = false): EventPAssetUnstakeAmino {
    const obj: any = {};
    obj.address = message.address === "" ? undefined : message.address;
    obj.asset = message.asset === "" ? undefined : message.asset;
    if (message.amount) {
      obj.amount = message.amount.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.amount = message.amount;
    }
    obj.total_staked_p_asset = message.totalStakedPAsset === "" ? undefined : message.totalStakedPAsset;
    return obj;
  },
  fromAminoMsg(object: EventPAssetUnstakeAminoMsg): EventPAssetUnstake {
    return EventPAssetUnstake.fromAmino(object.value);
  },
  fromProtoMsg(message: EventPAssetUnstakeProtoMsg, useInterfaces: boolean = false): EventPAssetUnstake {
    return EventPAssetUnstake.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventPAssetUnstake): Uint8Array {
    return EventPAssetUnstake.encode(message).finish();
  },
  toProtoMsg(message: EventPAssetUnstake): EventPAssetUnstakeProtoMsg {
    return {
      typeUrl: "/pryzm.pgov.v1.EventPAssetUnstake",
      value: EventPAssetUnstake.encode(message).finish()
    };
  }
};
function createBaseEventVoteSubmit(): EventVoteSubmit {
  return {
    vote: undefined
  };
}
export const EventVoteSubmit = {
  typeUrl: "/pryzm.pgov.v1.EventVoteSubmit",
  encode(message: EventVoteSubmit, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.vote !== undefined) {
      Vote.encode(message.vote, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventVoteSubmit {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventVoteSubmit();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.vote = Vote.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventVoteSubmit>): EventVoteSubmit {
    const message = createBaseEventVoteSubmit();
    message.vote = object.vote !== undefined && object.vote !== null ? Vote.fromPartial(object.vote) : undefined;
    return message;
  },
  fromAmino(object: EventVoteSubmitAmino): EventVoteSubmit {
    const message = createBaseEventVoteSubmit();
    if (object.vote !== undefined && object.vote !== null) {
      message.vote = Vote.fromAmino(object.vote);
    }
    return message;
  },
  toAmino(message: EventVoteSubmit, useInterfaces: boolean = false): EventVoteSubmitAmino {
    const obj: any = {};
    obj.vote = message.vote ? Vote.toAmino(message.vote, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventVoteSubmitAminoMsg): EventVoteSubmit {
    return EventVoteSubmit.fromAmino(object.value);
  },
  fromProtoMsg(message: EventVoteSubmitProtoMsg, useInterfaces: boolean = false): EventVoteSubmit {
    return EventVoteSubmit.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventVoteSubmit): Uint8Array {
    return EventVoteSubmit.encode(message).finish();
  },
  toProtoMsg(message: EventVoteSubmit): EventVoteSubmitProtoMsg {
    return {
      typeUrl: "/pryzm.pgov.v1.EventVoteSubmit",
      value: EventVoteSubmit.encode(message).finish()
    };
  }
};
function createBaseEventProposalEnd(): EventProposalEnd {
  return {
    proposal: undefined
  };
}
export const EventProposalEnd = {
  typeUrl: "/pryzm.pgov.v1.EventProposalEnd",
  encode(message: EventProposalEnd, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.proposal !== undefined) {
      Proposal.encode(message.proposal, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventProposalEnd {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventProposalEnd();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proposal = Proposal.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventProposalEnd>): EventProposalEnd {
    const message = createBaseEventProposalEnd();
    message.proposal = object.proposal !== undefined && object.proposal !== null ? Proposal.fromPartial(object.proposal) : undefined;
    return message;
  },
  fromAmino(object: EventProposalEndAmino): EventProposalEnd {
    const message = createBaseEventProposalEnd();
    if (object.proposal !== undefined && object.proposal !== null) {
      message.proposal = Proposal.fromAmino(object.proposal);
    }
    return message;
  },
  toAmino(message: EventProposalEnd, useInterfaces: boolean = false): EventProposalEndAmino {
    const obj: any = {};
    obj.proposal = message.proposal ? Proposal.toAmino(message.proposal, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventProposalEndAminoMsg): EventProposalEnd {
    return EventProposalEnd.fromAmino(object.value);
  },
  fromProtoMsg(message: EventProposalEndProtoMsg, useInterfaces: boolean = false): EventProposalEnd {
    return EventProposalEnd.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventProposalEnd): Uint8Array {
    return EventProposalEnd.encode(message).finish();
  },
  toProtoMsg(message: EventProposalEnd): EventProposalEndProtoMsg {
    return {
      typeUrl: "/pryzm.pgov.v1.EventProposalEnd",
      value: EventProposalEnd.encode(message).finish()
    };
  }
};
function createBaseEventVoteTransmit(): EventVoteTransmit {
  return {
    proposalId: BigInt(0),
    asset: ""
  };
}
export const EventVoteTransmit = {
  typeUrl: "/pryzm.pgov.v1.EventVoteTransmit",
  encode(message: EventVoteTransmit, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.proposalId !== BigInt(0)) {
      writer.uint32(8).uint64(message.proposalId);
    }
    if (message.asset !== "") {
      writer.uint32(18).string(message.asset);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventVoteTransmit {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventVoteTransmit();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proposalId = reader.uint64();
          break;
        case 2:
          message.asset = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventVoteTransmit>): EventVoteTransmit {
    const message = createBaseEventVoteTransmit();
    message.proposalId = object.proposalId !== undefined && object.proposalId !== null ? BigInt(object.proposalId.toString()) : BigInt(0);
    message.asset = object.asset ?? "";
    return message;
  },
  fromAmino(object: EventVoteTransmitAmino): EventVoteTransmit {
    const message = createBaseEventVoteTransmit();
    if (object.proposal_id !== undefined && object.proposal_id !== null) {
      message.proposalId = BigInt(object.proposal_id);
    }
    if (object.asset !== undefined && object.asset !== null) {
      message.asset = object.asset;
    }
    return message;
  },
  toAmino(message: EventVoteTransmit, useInterfaces: boolean = false): EventVoteTransmitAmino {
    const obj: any = {};
    obj.proposal_id = message.proposalId !== BigInt(0) ? message.proposalId.toString() : undefined;
    obj.asset = message.asset === "" ? undefined : message.asset;
    return obj;
  },
  fromAminoMsg(object: EventVoteTransmitAminoMsg): EventVoteTransmit {
    return EventVoteTransmit.fromAmino(object.value);
  },
  fromProtoMsg(message: EventVoteTransmitProtoMsg, useInterfaces: boolean = false): EventVoteTransmit {
    return EventVoteTransmit.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventVoteTransmit): Uint8Array {
    return EventVoteTransmit.encode(message).finish();
  },
  toProtoMsg(message: EventVoteTransmit): EventVoteTransmitProtoMsg {
    return {
      typeUrl: "/pryzm.pgov.v1.EventVoteTransmit",
      value: EventVoteTransmit.encode(message).finish()
    };
  }
};
function createBaseEventVoteTransmitFailure(): EventVoteTransmitFailure {
  return {
    proposalId: BigInt(0),
    asset: "",
    error: ""
  };
}
export const EventVoteTransmitFailure = {
  typeUrl: "/pryzm.pgov.v1.EventVoteTransmitFailure",
  encode(message: EventVoteTransmitFailure, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.proposalId !== BigInt(0)) {
      writer.uint32(8).uint64(message.proposalId);
    }
    if (message.asset !== "") {
      writer.uint32(18).string(message.asset);
    }
    if (message.error !== "") {
      writer.uint32(26).string(message.error);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventVoteTransmitFailure {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventVoteTransmitFailure();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proposalId = reader.uint64();
          break;
        case 2:
          message.asset = reader.string();
          break;
        case 3:
          message.error = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventVoteTransmitFailure>): EventVoteTransmitFailure {
    const message = createBaseEventVoteTransmitFailure();
    message.proposalId = object.proposalId !== undefined && object.proposalId !== null ? BigInt(object.proposalId.toString()) : BigInt(0);
    message.asset = object.asset ?? "";
    message.error = object.error ?? "";
    return message;
  },
  fromAmino(object: EventVoteTransmitFailureAmino): EventVoteTransmitFailure {
    const message = createBaseEventVoteTransmitFailure();
    if (object.proposal_id !== undefined && object.proposal_id !== null) {
      message.proposalId = BigInt(object.proposal_id);
    }
    if (object.asset !== undefined && object.asset !== null) {
      message.asset = object.asset;
    }
    if (object.error !== undefined && object.error !== null) {
      message.error = object.error;
    }
    return message;
  },
  toAmino(message: EventVoteTransmitFailure, useInterfaces: boolean = false): EventVoteTransmitFailureAmino {
    const obj: any = {};
    obj.proposal_id = message.proposalId !== BigInt(0) ? message.proposalId.toString() : undefined;
    obj.asset = message.asset === "" ? undefined : message.asset;
    obj.error = message.error === "" ? undefined : message.error;
    return obj;
  },
  fromAminoMsg(object: EventVoteTransmitFailureAminoMsg): EventVoteTransmitFailure {
    return EventVoteTransmitFailure.fromAmino(object.value);
  },
  fromProtoMsg(message: EventVoteTransmitFailureProtoMsg, useInterfaces: boolean = false): EventVoteTransmitFailure {
    return EventVoteTransmitFailure.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventVoteTransmitFailure): Uint8Array {
    return EventVoteTransmitFailure.encode(message).finish();
  },
  toProtoMsg(message: EventVoteTransmitFailure): EventVoteTransmitFailureProtoMsg {
    return {
      typeUrl: "/pryzm.pgov.v1.EventVoteTransmitFailure",
      value: EventVoteTransmitFailure.encode(message).finish()
    };
  }
};
function createBaseEventVoteAckSuccess(): EventVoteAckSuccess {
  return {
    proposalId: BigInt(0),
    asset: ""
  };
}
export const EventVoteAckSuccess = {
  typeUrl: "/pryzm.pgov.v1.EventVoteAckSuccess",
  encode(message: EventVoteAckSuccess, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.proposalId !== BigInt(0)) {
      writer.uint32(8).uint64(message.proposalId);
    }
    if (message.asset !== "") {
      writer.uint32(18).string(message.asset);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventVoteAckSuccess {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventVoteAckSuccess();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proposalId = reader.uint64();
          break;
        case 2:
          message.asset = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventVoteAckSuccess>): EventVoteAckSuccess {
    const message = createBaseEventVoteAckSuccess();
    message.proposalId = object.proposalId !== undefined && object.proposalId !== null ? BigInt(object.proposalId.toString()) : BigInt(0);
    message.asset = object.asset ?? "";
    return message;
  },
  fromAmino(object: EventVoteAckSuccessAmino): EventVoteAckSuccess {
    const message = createBaseEventVoteAckSuccess();
    if (object.proposal_id !== undefined && object.proposal_id !== null) {
      message.proposalId = BigInt(object.proposal_id);
    }
    if (object.asset !== undefined && object.asset !== null) {
      message.asset = object.asset;
    }
    return message;
  },
  toAmino(message: EventVoteAckSuccess, useInterfaces: boolean = false): EventVoteAckSuccessAmino {
    const obj: any = {};
    obj.proposal_id = message.proposalId !== BigInt(0) ? message.proposalId.toString() : undefined;
    obj.asset = message.asset === "" ? undefined : message.asset;
    return obj;
  },
  fromAminoMsg(object: EventVoteAckSuccessAminoMsg): EventVoteAckSuccess {
    return EventVoteAckSuccess.fromAmino(object.value);
  },
  fromProtoMsg(message: EventVoteAckSuccessProtoMsg, useInterfaces: boolean = false): EventVoteAckSuccess {
    return EventVoteAckSuccess.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventVoteAckSuccess): Uint8Array {
    return EventVoteAckSuccess.encode(message).finish();
  },
  toProtoMsg(message: EventVoteAckSuccess): EventVoteAckSuccessProtoMsg {
    return {
      typeUrl: "/pryzm.pgov.v1.EventVoteAckSuccess",
      value: EventVoteAckSuccess.encode(message).finish()
    };
  }
};
function createBaseEventVoteAckFailure(): EventVoteAckFailure {
  return {
    proposalId: BigInt(0),
    asset: "",
    error: ""
  };
}
export const EventVoteAckFailure = {
  typeUrl: "/pryzm.pgov.v1.EventVoteAckFailure",
  encode(message: EventVoteAckFailure, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.proposalId !== BigInt(0)) {
      writer.uint32(8).uint64(message.proposalId);
    }
    if (message.asset !== "") {
      writer.uint32(18).string(message.asset);
    }
    if (message.error !== "") {
      writer.uint32(26).string(message.error);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventVoteAckFailure {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventVoteAckFailure();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proposalId = reader.uint64();
          break;
        case 2:
          message.asset = reader.string();
          break;
        case 3:
          message.error = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventVoteAckFailure>): EventVoteAckFailure {
    const message = createBaseEventVoteAckFailure();
    message.proposalId = object.proposalId !== undefined && object.proposalId !== null ? BigInt(object.proposalId.toString()) : BigInt(0);
    message.asset = object.asset ?? "";
    message.error = object.error ?? "";
    return message;
  },
  fromAmino(object: EventVoteAckFailureAmino): EventVoteAckFailure {
    const message = createBaseEventVoteAckFailure();
    if (object.proposal_id !== undefined && object.proposal_id !== null) {
      message.proposalId = BigInt(object.proposal_id);
    }
    if (object.asset !== undefined && object.asset !== null) {
      message.asset = object.asset;
    }
    if (object.error !== undefined && object.error !== null) {
      message.error = object.error;
    }
    return message;
  },
  toAmino(message: EventVoteAckFailure, useInterfaces: boolean = false): EventVoteAckFailureAmino {
    const obj: any = {};
    obj.proposal_id = message.proposalId !== BigInt(0) ? message.proposalId.toString() : undefined;
    obj.asset = message.asset === "" ? undefined : message.asset;
    obj.error = message.error === "" ? undefined : message.error;
    return obj;
  },
  fromAminoMsg(object: EventVoteAckFailureAminoMsg): EventVoteAckFailure {
    return EventVoteAckFailure.fromAmino(object.value);
  },
  fromProtoMsg(message: EventVoteAckFailureProtoMsg, useInterfaces: boolean = false): EventVoteAckFailure {
    return EventVoteAckFailure.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventVoteAckFailure): Uint8Array {
    return EventVoteAckFailure.encode(message).finish();
  },
  toProtoMsg(message: EventVoteAckFailure): EventVoteAckFailureProtoMsg {
    return {
      typeUrl: "/pryzm.pgov.v1.EventVoteAckFailure",
      value: EventVoteAckFailure.encode(message).finish()
    };
  }
};
function createBaseEventVoteTimeout(): EventVoteTimeout {
  return {
    proposalId: BigInt(0),
    asset: ""
  };
}
export const EventVoteTimeout = {
  typeUrl: "/pryzm.pgov.v1.EventVoteTimeout",
  encode(message: EventVoteTimeout, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.proposalId !== BigInt(0)) {
      writer.uint32(8).uint64(message.proposalId);
    }
    if (message.asset !== "") {
      writer.uint32(18).string(message.asset);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventVoteTimeout {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventVoteTimeout();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proposalId = reader.uint64();
          break;
        case 2:
          message.asset = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventVoteTimeout>): EventVoteTimeout {
    const message = createBaseEventVoteTimeout();
    message.proposalId = object.proposalId !== undefined && object.proposalId !== null ? BigInt(object.proposalId.toString()) : BigInt(0);
    message.asset = object.asset ?? "";
    return message;
  },
  fromAmino(object: EventVoteTimeoutAmino): EventVoteTimeout {
    const message = createBaseEventVoteTimeout();
    if (object.proposal_id !== undefined && object.proposal_id !== null) {
      message.proposalId = BigInt(object.proposal_id);
    }
    if (object.asset !== undefined && object.asset !== null) {
      message.asset = object.asset;
    }
    return message;
  },
  toAmino(message: EventVoteTimeout, useInterfaces: boolean = false): EventVoteTimeoutAmino {
    const obj: any = {};
    obj.proposal_id = message.proposalId !== BigInt(0) ? message.proposalId.toString() : undefined;
    obj.asset = message.asset === "" ? undefined : message.asset;
    return obj;
  },
  fromAminoMsg(object: EventVoteTimeoutAminoMsg): EventVoteTimeout {
    return EventVoteTimeout.fromAmino(object.value);
  },
  fromProtoMsg(message: EventVoteTimeoutProtoMsg, useInterfaces: boolean = false): EventVoteTimeout {
    return EventVoteTimeout.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventVoteTimeout): Uint8Array {
    return EventVoteTimeout.encode(message).finish();
  },
  toProtoMsg(message: EventVoteTimeout): EventVoteTimeoutProtoMsg {
    return {
      typeUrl: "/pryzm.pgov.v1.EventVoteTimeout",
      value: EventVoteTimeout.encode(message).finish()
    };
  }
};