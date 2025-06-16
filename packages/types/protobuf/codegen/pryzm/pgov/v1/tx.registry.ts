//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgUpdateParams, MsgStakePAssets, MsgUnstakePAssets, MsgSubmitVote, MsgSubmitProposal, MsgRetryVoteTransmit } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/pryzm.pgov.v1.MsgUpdateParams", MsgUpdateParams], ["/pryzm.pgov.v1.MsgStakePAssets", MsgStakePAssets], ["/pryzm.pgov.v1.MsgUnstakePAssets", MsgUnstakePAssets], ["/pryzm.pgov.v1.MsgSubmitVote", MsgSubmitVote], ["/pryzm.pgov.v1.MsgSubmitProposal", MsgSubmitProposal], ["/pryzm.pgov.v1.MsgRetryVoteTransmit", MsgRetryVoteTransmit]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/pryzm.pgov.v1.MsgUpdateParams",
        value: MsgUpdateParams.encode(value).finish()
      };
    },
    stakePAssets(value: MsgStakePAssets) {
      return {
        typeUrl: "/pryzm.pgov.v1.MsgStakePAssets",
        value: MsgStakePAssets.encode(value).finish()
      };
    },
    unstakePAssets(value: MsgUnstakePAssets) {
      return {
        typeUrl: "/pryzm.pgov.v1.MsgUnstakePAssets",
        value: MsgUnstakePAssets.encode(value).finish()
      };
    },
    submitVote(value: MsgSubmitVote) {
      return {
        typeUrl: "/pryzm.pgov.v1.MsgSubmitVote",
        value: MsgSubmitVote.encode(value).finish()
      };
    },
    submitProposal(value: MsgSubmitProposal) {
      return {
        typeUrl: "/pryzm.pgov.v1.MsgSubmitProposal",
        value: MsgSubmitProposal.encode(value).finish()
      };
    },
    retryVoteTransmit(value: MsgRetryVoteTransmit) {
      return {
        typeUrl: "/pryzm.pgov.v1.MsgRetryVoteTransmit",
        value: MsgRetryVoteTransmit.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/pryzm.pgov.v1.MsgUpdateParams",
        value
      };
    },
    stakePAssets(value: MsgStakePAssets) {
      return {
        typeUrl: "/pryzm.pgov.v1.MsgStakePAssets",
        value
      };
    },
    unstakePAssets(value: MsgUnstakePAssets) {
      return {
        typeUrl: "/pryzm.pgov.v1.MsgUnstakePAssets",
        value
      };
    },
    submitVote(value: MsgSubmitVote) {
      return {
        typeUrl: "/pryzm.pgov.v1.MsgSubmitVote",
        value
      };
    },
    submitProposal(value: MsgSubmitProposal) {
      return {
        typeUrl: "/pryzm.pgov.v1.MsgSubmitProposal",
        value
      };
    },
    retryVoteTransmit(value: MsgRetryVoteTransmit) {
      return {
        typeUrl: "/pryzm.pgov.v1.MsgRetryVoteTransmit",
        value
      };
    }
  },
  fromPartial: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/pryzm.pgov.v1.MsgUpdateParams",
        value: MsgUpdateParams.fromPartial(value)
      };
    },
    stakePAssets(value: MsgStakePAssets) {
      return {
        typeUrl: "/pryzm.pgov.v1.MsgStakePAssets",
        value: MsgStakePAssets.fromPartial(value)
      };
    },
    unstakePAssets(value: MsgUnstakePAssets) {
      return {
        typeUrl: "/pryzm.pgov.v1.MsgUnstakePAssets",
        value: MsgUnstakePAssets.fromPartial(value)
      };
    },
    submitVote(value: MsgSubmitVote) {
      return {
        typeUrl: "/pryzm.pgov.v1.MsgSubmitVote",
        value: MsgSubmitVote.fromPartial(value)
      };
    },
    submitProposal(value: MsgSubmitProposal) {
      return {
        typeUrl: "/pryzm.pgov.v1.MsgSubmitProposal",
        value: MsgSubmitProposal.fromPartial(value)
      };
    },
    retryVoteTransmit(value: MsgRetryVoteTransmit) {
      return {
        typeUrl: "/pryzm.pgov.v1.MsgRetryVoteTransmit",
        value: MsgRetryVoteTransmit.fromPartial(value)
      };
    }
  }
};