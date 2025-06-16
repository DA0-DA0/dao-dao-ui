import { WeightedVoteOption, WeightedVoteOptionAmino, WeightedVoteOptionSDKType } from "../../../cosmos/gov/v1/gov";
import { BinaryReader, BinaryWriter } from "../../../binary";
/** Vote stores the information for a user's vote for a proposal */
export interface Vote {
  asset: string;
  proposal: bigint;
  voter: string;
  options: WeightedVoteOption[];
}
export interface VoteProtoMsg {
  typeUrl: "/pryzm.pgov.v1.Vote";
  value: Uint8Array;
}
/** Vote stores the information for a user's vote for a proposal */
export interface VoteAmino {
  asset?: string;
  proposal?: string;
  voter?: string;
  options?: WeightedVoteOptionAmino[];
}
export interface VoteAminoMsg {
  type: "/pryzm.pgov.v1.Vote";
  value: VoteAmino;
}
/** Vote stores the information for a user's vote for a proposal */
export interface VoteSDKType {
  asset: string;
  proposal: bigint;
  voter: string;
  options: WeightedVoteOptionSDKType[];
}
function createBaseVote(): Vote {
  return {
    asset: "",
    proposal: BigInt(0),
    voter: "",
    options: []
  };
}
export const Vote = {
  typeUrl: "/pryzm.pgov.v1.Vote",
  encode(message: Vote, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.asset !== "") {
      writer.uint32(10).string(message.asset);
    }
    if (message.proposal !== BigInt(0)) {
      writer.uint32(16).uint64(message.proposal);
    }
    if (message.voter !== "") {
      writer.uint32(26).string(message.voter);
    }
    for (const v of message.options) {
      WeightedVoteOption.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): Vote {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVote();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.asset = reader.string();
          break;
        case 2:
          message.proposal = reader.uint64();
          break;
        case 3:
          message.voter = reader.string();
          break;
        case 4:
          message.options.push(WeightedVoteOption.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Vote>): Vote {
    const message = createBaseVote();
    message.asset = object.asset ?? "";
    message.proposal = object.proposal !== undefined && object.proposal !== null ? BigInt(object.proposal.toString()) : BigInt(0);
    message.voter = object.voter ?? "";
    message.options = object.options?.map(e => WeightedVoteOption.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: VoteAmino): Vote {
    const message = createBaseVote();
    if (object.asset !== undefined && object.asset !== null) {
      message.asset = object.asset;
    }
    if (object.proposal !== undefined && object.proposal !== null) {
      message.proposal = BigInt(object.proposal);
    }
    if (object.voter !== undefined && object.voter !== null) {
      message.voter = object.voter;
    }
    message.options = object.options?.map(e => WeightedVoteOption.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: Vote, useInterfaces: boolean = false): VoteAmino {
    const obj: any = {};
    obj.asset = message.asset === "" ? undefined : message.asset;
    obj.proposal = message.proposal !== BigInt(0) ? message.proposal.toString() : undefined;
    obj.voter = message.voter === "" ? undefined : message.voter;
    if (message.options) {
      obj.options = message.options.map(e => e ? WeightedVoteOption.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.options = message.options;
    }
    return obj;
  },
  fromAminoMsg(object: VoteAminoMsg): Vote {
    return Vote.fromAmino(object.value);
  },
  fromProtoMsg(message: VoteProtoMsg, useInterfaces: boolean = false): Vote {
    return Vote.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Vote): Uint8Array {
    return Vote.encode(message).finish();
  },
  toProtoMsg(message: Vote): VoteProtoMsg {
    return {
      typeUrl: "/pryzm.pgov.v1.Vote",
      value: Vote.encode(message).finish()
    };
  }
};