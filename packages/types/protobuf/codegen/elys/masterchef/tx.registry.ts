//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgAddExternalRewardDenom, MsgAddExternalIncentive, MsgUpdateParams, MsgUpdatePoolMultipliers, MsgClaimRewards, MsgTogglePoolEdenRewards } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/elys.masterchef.MsgAddExternalRewardDenom", MsgAddExternalRewardDenom], ["/elys.masterchef.MsgAddExternalIncentive", MsgAddExternalIncentive], ["/elys.masterchef.MsgUpdateParams", MsgUpdateParams], ["/elys.masterchef.MsgUpdatePoolMultipliers", MsgUpdatePoolMultipliers], ["/elys.masterchef.MsgClaimRewards", MsgClaimRewards], ["/elys.masterchef.MsgTogglePoolEdenRewards", MsgTogglePoolEdenRewards]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    addExternalRewardDenom(value: MsgAddExternalRewardDenom) {
      return {
        typeUrl: "/elys.masterchef.MsgAddExternalRewardDenom",
        value: MsgAddExternalRewardDenom.encode(value).finish()
      };
    },
    addExternalIncentive(value: MsgAddExternalIncentive) {
      return {
        typeUrl: "/elys.masterchef.MsgAddExternalIncentive",
        value: MsgAddExternalIncentive.encode(value).finish()
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/elys.masterchef.MsgUpdateParams",
        value: MsgUpdateParams.encode(value).finish()
      };
    },
    updatePoolMultipliers(value: MsgUpdatePoolMultipliers) {
      return {
        typeUrl: "/elys.masterchef.MsgUpdatePoolMultipliers",
        value: MsgUpdatePoolMultipliers.encode(value).finish()
      };
    },
    claimRewards(value: MsgClaimRewards) {
      return {
        typeUrl: "/elys.masterchef.MsgClaimRewards",
        value: MsgClaimRewards.encode(value).finish()
      };
    },
    togglePoolEdenRewards(value: MsgTogglePoolEdenRewards) {
      return {
        typeUrl: "/elys.masterchef.MsgTogglePoolEdenRewards",
        value: MsgTogglePoolEdenRewards.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    addExternalRewardDenom(value: MsgAddExternalRewardDenom) {
      return {
        typeUrl: "/elys.masterchef.MsgAddExternalRewardDenom",
        value
      };
    },
    addExternalIncentive(value: MsgAddExternalIncentive) {
      return {
        typeUrl: "/elys.masterchef.MsgAddExternalIncentive",
        value
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/elys.masterchef.MsgUpdateParams",
        value
      };
    },
    updatePoolMultipliers(value: MsgUpdatePoolMultipliers) {
      return {
        typeUrl: "/elys.masterchef.MsgUpdatePoolMultipliers",
        value
      };
    },
    claimRewards(value: MsgClaimRewards) {
      return {
        typeUrl: "/elys.masterchef.MsgClaimRewards",
        value
      };
    },
    togglePoolEdenRewards(value: MsgTogglePoolEdenRewards) {
      return {
        typeUrl: "/elys.masterchef.MsgTogglePoolEdenRewards",
        value
      };
    }
  },
  fromPartial: {
    addExternalRewardDenom(value: MsgAddExternalRewardDenom) {
      return {
        typeUrl: "/elys.masterchef.MsgAddExternalRewardDenom",
        value: MsgAddExternalRewardDenom.fromPartial(value)
      };
    },
    addExternalIncentive(value: MsgAddExternalIncentive) {
      return {
        typeUrl: "/elys.masterchef.MsgAddExternalIncentive",
        value: MsgAddExternalIncentive.fromPartial(value)
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/elys.masterchef.MsgUpdateParams",
        value: MsgUpdateParams.fromPartial(value)
      };
    },
    updatePoolMultipliers(value: MsgUpdatePoolMultipliers) {
      return {
        typeUrl: "/elys.masterchef.MsgUpdatePoolMultipliers",
        value: MsgUpdatePoolMultipliers.fromPartial(value)
      };
    },
    claimRewards(value: MsgClaimRewards) {
      return {
        typeUrl: "/elys.masterchef.MsgClaimRewards",
        value: MsgClaimRewards.fromPartial(value)
      };
    },
    togglePoolEdenRewards(value: MsgTogglePoolEdenRewards) {
      return {
        typeUrl: "/elys.masterchef.MsgTogglePoolEdenRewards",
        value: MsgTogglePoolEdenRewards.fromPartial(value)
      };
    }
  }
};