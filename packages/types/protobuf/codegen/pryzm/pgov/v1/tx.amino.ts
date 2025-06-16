import { MsgUpdateParams, MsgStakePAssets, MsgUnstakePAssets, MsgSubmitVote, MsgSubmitProposal, MsgRetryVoteTransmit } from "./tx";
export const AminoConverter = {
  "/pryzm.pgov.v1.MsgUpdateParams": {
    aminoType: "pryzm/pgov/v1/UpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  },
  "/pryzm.pgov.v1.MsgStakePAssets": {
    aminoType: "pryzm/pgov/v1/StakePAssets",
    toAmino: MsgStakePAssets.toAmino,
    fromAmino: MsgStakePAssets.fromAmino
  },
  "/pryzm.pgov.v1.MsgUnstakePAssets": {
    aminoType: "pryzm/pgov/v1/UnstakePAssets",
    toAmino: MsgUnstakePAssets.toAmino,
    fromAmino: MsgUnstakePAssets.fromAmino
  },
  "/pryzm.pgov.v1.MsgSubmitVote": {
    aminoType: "pryzm/pgov/v1/SubmitVote",
    toAmino: MsgSubmitVote.toAmino,
    fromAmino: MsgSubmitVote.fromAmino
  },
  "/pryzm.pgov.v1.MsgSubmitProposal": {
    aminoType: "pryzm/pgov/v1/SubmitProposal",
    toAmino: MsgSubmitProposal.toAmino,
    fromAmino: MsgSubmitProposal.fromAmino
  },
  "/pryzm.pgov.v1.MsgRetryVoteTransmit": {
    aminoType: "pryzm/pgov/v1/RetryVoteTransmit",
    toAmino: MsgRetryVoteTransmit.toAmino,
    fromAmino: MsgRetryVoteTransmit.fromAmino
  }
};