import { MsgAddExternalRewardDenom, MsgAddExternalIncentive, MsgUpdateParams, MsgUpdatePoolMultipliers, MsgClaimRewards, MsgTogglePoolEdenRewards } from "./tx";
export const AminoConverter = {
  "/elys.masterchef.MsgAddExternalRewardDenom": {
    aminoType: "masterchef/MsgAddExternalRewardDenom",
    toAmino: MsgAddExternalRewardDenom.toAmino,
    fromAmino: MsgAddExternalRewardDenom.fromAmino
  },
  "/elys.masterchef.MsgAddExternalIncentive": {
    aminoType: "masterchef/MsgAddExternalIncentive",
    toAmino: MsgAddExternalIncentive.toAmino,
    fromAmino: MsgAddExternalIncentive.fromAmino
  },
  "/elys.masterchef.MsgUpdateParams": {
    aminoType: "masterchef/MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  },
  "/elys.masterchef.MsgUpdatePoolMultipliers": {
    aminoType: "masterchef/MsgUpdatePoolMultipliers",
    toAmino: MsgUpdatePoolMultipliers.toAmino,
    fromAmino: MsgUpdatePoolMultipliers.fromAmino
  },
  "/elys.masterchef.MsgClaimRewards": {
    aminoType: "masterchef/MsgClaimRewards",
    toAmino: MsgClaimRewards.toAmino,
    fromAmino: MsgClaimRewards.fromAmino
  },
  "/elys.masterchef.MsgTogglePoolEdenRewards": {
    aminoType: "masterchef/MsgTogglePoolEdenRewards",
    toAmino: MsgTogglePoolEdenRewards.toAmino,
    fromAmino: MsgTogglePoolEdenRewards.fromAmino
  }
};