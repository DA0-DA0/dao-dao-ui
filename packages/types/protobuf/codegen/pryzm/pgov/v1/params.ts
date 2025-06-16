import { Duration, DurationAmino, DurationSDKType } from "../../../google/protobuf/duration";
import { BinaryReader, BinaryWriter } from "../../../binary";
/** Params defines the parameters for the module. */
export interface Params {
  /** (Host chain proposal end time) - (Pryzm proposal end time) */
  votingResultSubmissionWindow: Duration | undefined;
}
export interface ParamsProtoMsg {
  typeUrl: "/pryzm.pgov.v1.Params";
  value: Uint8Array;
}
/** Params defines the parameters for the module. */
export interface ParamsAmino {
  /** (Host chain proposal end time) - (Pryzm proposal end time) */
  voting_result_submission_window: DurationAmino | undefined;
}
export interface ParamsAminoMsg {
  type: "/pryzm.pgov.v1.Params";
  value: ParamsAmino;
}
/** Params defines the parameters for the module. */
export interface ParamsSDKType {
  voting_result_submission_window: DurationSDKType | undefined;
}
function createBaseParams(): Params {
  return {
    votingResultSubmissionWindow: Duration.fromPartial({})
  };
}
export const Params = {
  typeUrl: "/pryzm.pgov.v1.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.votingResultSubmissionWindow !== undefined) {
      Duration.encode(message.votingResultSubmissionWindow, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): Params {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.votingResultSubmissionWindow = Duration.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Params>): Params {
    const message = createBaseParams();
    message.votingResultSubmissionWindow = object.votingResultSubmissionWindow !== undefined && object.votingResultSubmissionWindow !== null ? Duration.fromPartial(object.votingResultSubmissionWindow) : undefined;
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    const message = createBaseParams();
    if (object.voting_result_submission_window !== undefined && object.voting_result_submission_window !== null) {
      message.votingResultSubmissionWindow = Duration.fromAmino(object.voting_result_submission_window);
    }
    return message;
  },
  toAmino(message: Params, useInterfaces: boolean = false): ParamsAmino {
    const obj: any = {};
    obj.voting_result_submission_window = message.votingResultSubmissionWindow ? Duration.toAmino(message.votingResultSubmissionWindow, useInterfaces) : Duration.toAmino(Duration.fromPartial({}));
    return obj;
  },
  fromAminoMsg(object: ParamsAminoMsg): Params {
    return Params.fromAmino(object.value);
  },
  fromProtoMsg(message: ParamsProtoMsg, useInterfaces: boolean = false): Params {
    return Params.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Params): Uint8Array {
    return Params.encode(message).finish();
  },
  toProtoMsg(message: Params): ParamsProtoMsg {
    return {
      typeUrl: "/pryzm.pgov.v1.Params",
      value: Params.encode(message).finish()
    };
  }
};