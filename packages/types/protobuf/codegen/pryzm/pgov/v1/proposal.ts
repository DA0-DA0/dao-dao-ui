import { Timestamp } from "../../../google/protobuf/timestamp";
import { WeightedVoteOption, WeightedVoteOptionAmino, WeightedVoteOptionSDKType } from "../../../cosmos/gov/v1/gov";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { toTimestamp, fromTimestamp } from "../../../helpers";
export enum ProposalStatus {
  ACTIVE = 0,
  SUBMITTING = 1,
  SUBMITTED = 2,
  FAILED = 3,
  UNRECOGNIZED = -1,
}
export const ProposalStatusSDKType = ProposalStatus;
export const ProposalStatusAmino = ProposalStatus;
export function proposalStatusFromJSON(object: any): ProposalStatus {
  switch (object) {
    case 0:
    case "ACTIVE":
      return ProposalStatus.ACTIVE;
    case 1:
    case "SUBMITTING":
      return ProposalStatus.SUBMITTING;
    case 2:
    case "SUBMITTED":
      return ProposalStatus.SUBMITTED;
    case 3:
    case "FAILED":
      return ProposalStatus.FAILED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ProposalStatus.UNRECOGNIZED;
  }
}
export function proposalStatusToJSON(object: ProposalStatus): string {
  switch (object) {
    case ProposalStatus.ACTIVE:
      return "ACTIVE";
    case ProposalStatus.SUBMITTING:
      return "SUBMITTING";
    case ProposalStatus.SUBMITTED:
      return "SUBMITTED";
    case ProposalStatus.FAILED:
      return "FAILED";
    case ProposalStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/** Proposal stores information about a replicated proposal */
export interface Proposal {
  /** the id of proposal on the host chain */
  proposalId: bigint;
  /** the asset ID */
  asset: string;
  /** the time when the proposal has been started */
  startTime?: Date | undefined;
  /** the time of proposal ending on PRYZM, this time is sooner than the real end time of proposal on the host chain */
  endTime: Date | undefined;
  /** the final aggregation of votes on PRYZM, which is submitted to the host chain */
  finalVote: WeightedVoteOption[];
  /** the state of the proposal */
  status: ProposalStatus;
}
export interface ProposalProtoMsg {
  typeUrl: "/pryzm.pgov.v1.Proposal";
  value: Uint8Array;
}
/** Proposal stores information about a replicated proposal */
export interface ProposalAmino {
  /** the id of proposal on the host chain */
  proposal_id?: string;
  /** the asset ID */
  asset?: string;
  /** the time when the proposal has been started */
  start_time?: string | undefined;
  /** the time of proposal ending on PRYZM, this time is sooner than the real end time of proposal on the host chain */
  end_time?: string | undefined;
  /** the final aggregation of votes on PRYZM, which is submitted to the host chain */
  final_vote?: WeightedVoteOptionAmino[];
  /** the state of the proposal */
  status?: ProposalStatus;
}
export interface ProposalAminoMsg {
  type: "/pryzm.pgov.v1.Proposal";
  value: ProposalAmino;
}
/** Proposal stores information about a replicated proposal */
export interface ProposalSDKType {
  proposal_id: bigint;
  asset: string;
  start_time?: Date | undefined;
  end_time: Date | undefined;
  final_vote: WeightedVoteOptionSDKType[];
  status: ProposalStatus;
}
function createBaseProposal(): Proposal {
  return {
    proposalId: BigInt(0),
    asset: "",
    startTime: undefined,
    endTime: new Date(),
    finalVote: [],
    status: 0
  };
}
export const Proposal = {
  typeUrl: "/pryzm.pgov.v1.Proposal",
  encode(message: Proposal, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.proposalId !== BigInt(0)) {
      writer.uint32(8).uint64(message.proposalId);
    }
    if (message.asset !== "") {
      writer.uint32(18).string(message.asset);
    }
    if (message.startTime !== undefined) {
      Timestamp.encode(toTimestamp(message.startTime), writer.uint32(26).fork()).ldelim();
    }
    if (message.endTime !== undefined) {
      Timestamp.encode(toTimestamp(message.endTime), writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.finalVote) {
      WeightedVoteOption.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(48).int32(message.status);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): Proposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProposal();
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
          message.startTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 4:
          message.endTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 5:
          message.finalVote.push(WeightedVoteOption.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 6:
          message.status = (reader.int32() as any);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Proposal>): Proposal {
    const message = createBaseProposal();
    message.proposalId = object.proposalId !== undefined && object.proposalId !== null ? BigInt(object.proposalId.toString()) : BigInt(0);
    message.asset = object.asset ?? "";
    message.startTime = object.startTime ?? undefined;
    message.endTime = object.endTime ?? undefined;
    message.finalVote = object.finalVote?.map(e => WeightedVoteOption.fromPartial(e)) || [];
    message.status = object.status ?? 0;
    return message;
  },
  fromAmino(object: ProposalAmino): Proposal {
    const message = createBaseProposal();
    if (object.proposal_id !== undefined && object.proposal_id !== null) {
      message.proposalId = BigInt(object.proposal_id);
    }
    if (object.asset !== undefined && object.asset !== null) {
      message.asset = object.asset;
    }
    if (object.start_time !== undefined && object.start_time !== null) {
      message.startTime = fromTimestamp(Timestamp.fromAmino(object.start_time));
    }
    if (object.end_time !== undefined && object.end_time !== null) {
      message.endTime = fromTimestamp(Timestamp.fromAmino(object.end_time));
    }
    message.finalVote = object.final_vote?.map(e => WeightedVoteOption.fromAmino(e)) || [];
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    return message;
  },
  toAmino(message: Proposal, useInterfaces: boolean = false): ProposalAmino {
    const obj: any = {};
    obj.proposal_id = message.proposalId !== BigInt(0) ? message.proposalId.toString() : undefined;
    obj.asset = message.asset === "" ? undefined : message.asset;
    obj.start_time = message.startTime ? Timestamp.toAmino(toTimestamp(message.startTime)) : undefined;
    obj.end_time = message.endTime ? Timestamp.toAmino(toTimestamp(message.endTime)) : undefined;
    if (message.finalVote) {
      obj.final_vote = message.finalVote.map(e => e ? WeightedVoteOption.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.final_vote = message.finalVote;
    }
    obj.status = message.status === 0 ? undefined : message.status;
    return obj;
  },
  fromAminoMsg(object: ProposalAminoMsg): Proposal {
    return Proposal.fromAmino(object.value);
  },
  fromProtoMsg(message: ProposalProtoMsg, useInterfaces: boolean = false): Proposal {
    return Proposal.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Proposal): Uint8Array {
    return Proposal.encode(message).finish();
  },
  toProtoMsg(message: Proposal): ProposalProtoMsg {
    return {
      typeUrl: "/pryzm.pgov.v1.Proposal",
      value: Proposal.encode(message).finish()
    };
  }
};