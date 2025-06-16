//@ts-nocheck
import { PairMatchProposal, PairMatchProposalAmino, PairMatchProposalSDKType, MatchedPairSummary, MatchedPairSummaryAmino, MatchedPairSummarySDKType } from "../v1/pair_match_proposal";
import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../../binary";
export interface MsgProposeMatch {
  creator: string;
  pairs: PairMatchProposal[];
  /**
   * this includes the output amount of virtual orders as well as the proposer reward
   * if the limits are not met, the transaction will fail
   */
  minAmountsOut: Coin[];
  /** is not casted to coins, to allow for zero limits */
  maxAmountsIn: Coin[];
}
export interface MsgProposeMatchProtoMsg {
  typeUrl: "/pryzm.amm.v2.MsgProposeMatch";
  value: Uint8Array;
}
export interface MsgProposeMatchAmino {
  creator?: string;
  pairs: PairMatchProposalAmino[];
  /**
   * this includes the output amount of virtual orders as well as the proposer reward
   * if the limits are not met, the transaction will fail
   */
  min_amounts_out?: CoinAmino[];
  /** is not casted to coins, to allow for zero limits */
  max_amounts_in?: CoinAmino[];
}
export interface MsgProposeMatchAminoMsg {
  type: "pryzm/amm/v2/ProposeMatch";
  value: MsgProposeMatchAmino;
}
export interface MsgProposeMatchSDKType {
  creator: string;
  pairs: PairMatchProposalSDKType[];
  min_amounts_out: CoinSDKType[];
  max_amounts_in: CoinSDKType[];
}
export interface MsgProposeMatchResponse {
  proposerReward: Coin[];
  matchedPairs: MatchedPairSummary[];
}
export interface MsgProposeMatchResponseProtoMsg {
  typeUrl: "/pryzm.amm.v2.MsgProposeMatchResponse";
  value: Uint8Array;
}
export interface MsgProposeMatchResponseAmino {
  proposer_reward?: CoinAmino[];
  matched_pairs?: MatchedPairSummaryAmino[];
}
export interface MsgProposeMatchResponseAminoMsg {
  type: "/pryzm.amm.v2.MsgProposeMatchResponse";
  value: MsgProposeMatchResponseAmino;
}
export interface MsgProposeMatchResponseSDKType {
  proposer_reward: CoinSDKType[];
  matched_pairs: MatchedPairSummarySDKType[];
}
function createBaseMsgProposeMatch(): MsgProposeMatch {
  return {
    creator: "",
    pairs: [],
    minAmountsOut: [],
    maxAmountsIn: []
  };
}
export const MsgProposeMatch = {
  typeUrl: "/pryzm.amm.v2.MsgProposeMatch",
  encode(message: MsgProposeMatch, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    for (const v of message.pairs) {
      PairMatchProposal.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.minAmountsOut) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.maxAmountsIn) {
      Coin.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgProposeMatch {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgProposeMatch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.pairs.push(PairMatchProposal.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 3:
          message.minAmountsOut.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 4:
          message.maxAmountsIn.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgProposeMatch>): MsgProposeMatch {
    const message = createBaseMsgProposeMatch();
    message.creator = object.creator ?? "";
    message.pairs = object.pairs?.map(e => PairMatchProposal.fromPartial(e)) || [];
    message.minAmountsOut = object.minAmountsOut?.map(e => Coin.fromPartial(e)) || [];
    message.maxAmountsIn = object.maxAmountsIn?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: MsgProposeMatchAmino): MsgProposeMatch {
    const message = createBaseMsgProposeMatch();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    message.pairs = object.pairs?.map(e => PairMatchProposal.fromAmino(e)) || [];
    message.minAmountsOut = object.min_amounts_out?.map(e => Coin.fromAmino(e)) || [];
    message.maxAmountsIn = object.max_amounts_in?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: MsgProposeMatch, useInterfaces: boolean = false): MsgProposeMatchAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    if (message.pairs) {
      obj.pairs = message.pairs.map(e => e ? PairMatchProposal.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.pairs = message.pairs;
    }
    if (message.minAmountsOut) {
      obj.min_amounts_out = message.minAmountsOut.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.min_amounts_out = message.minAmountsOut;
    }
    if (message.maxAmountsIn) {
      obj.max_amounts_in = message.maxAmountsIn.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.max_amounts_in = message.maxAmountsIn;
    }
    return obj;
  },
  fromAminoMsg(object: MsgProposeMatchAminoMsg): MsgProposeMatch {
    return MsgProposeMatch.fromAmino(object.value);
  },
  toAminoMsg(message: MsgProposeMatch, useInterfaces: boolean = false): MsgProposeMatchAminoMsg {
    return {
      type: "pryzm/amm/v2/ProposeMatch",
      value: MsgProposeMatch.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgProposeMatchProtoMsg, useInterfaces: boolean = false): MsgProposeMatch {
    return MsgProposeMatch.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgProposeMatch): Uint8Array {
    return MsgProposeMatch.encode(message).finish();
  },
  toProtoMsg(message: MsgProposeMatch): MsgProposeMatchProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v2.MsgProposeMatch",
      value: MsgProposeMatch.encode(message).finish()
    };
  }
};
function createBaseMsgProposeMatchResponse(): MsgProposeMatchResponse {
  return {
    proposerReward: [],
    matchedPairs: []
  };
}
export const MsgProposeMatchResponse = {
  typeUrl: "/pryzm.amm.v2.MsgProposeMatchResponse",
  encode(message: MsgProposeMatchResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.proposerReward) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.matchedPairs) {
      MatchedPairSummary.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgProposeMatchResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgProposeMatchResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proposerReward.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
          message.matchedPairs.push(MatchedPairSummary.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgProposeMatchResponse>): MsgProposeMatchResponse {
    const message = createBaseMsgProposeMatchResponse();
    message.proposerReward = object.proposerReward?.map(e => Coin.fromPartial(e)) || [];
    message.matchedPairs = object.matchedPairs?.map(e => MatchedPairSummary.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: MsgProposeMatchResponseAmino): MsgProposeMatchResponse {
    const message = createBaseMsgProposeMatchResponse();
    message.proposerReward = object.proposer_reward?.map(e => Coin.fromAmino(e)) || [];
    message.matchedPairs = object.matched_pairs?.map(e => MatchedPairSummary.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: MsgProposeMatchResponse, useInterfaces: boolean = false): MsgProposeMatchResponseAmino {
    const obj: any = {};
    if (message.proposerReward) {
      obj.proposer_reward = message.proposerReward.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.proposer_reward = message.proposerReward;
    }
    if (message.matchedPairs) {
      obj.matched_pairs = message.matchedPairs.map(e => e ? MatchedPairSummary.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.matched_pairs = message.matchedPairs;
    }
    return obj;
  },
  fromAminoMsg(object: MsgProposeMatchResponseAminoMsg): MsgProposeMatchResponse {
    return MsgProposeMatchResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgProposeMatchResponseProtoMsg, useInterfaces: boolean = false): MsgProposeMatchResponse {
    return MsgProposeMatchResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgProposeMatchResponse): Uint8Array {
    return MsgProposeMatchResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgProposeMatchResponse): MsgProposeMatchResponseProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v2.MsgProposeMatchResponse",
      value: MsgProposeMatchResponse.encode(message).finish()
    };
  }
};