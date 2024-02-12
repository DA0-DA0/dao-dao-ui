import { MsgDelegate, MsgRedelegate, MsgUndelegate, MsgClaimDelegationRewards, MsgUpdateParams, MsgCreateAlliance, MsgUpdateAlliance, MsgDeleteAlliance } from "./tx";
export const AminoConverter = {
  "/alliance.alliance.MsgDelegate": {
    aminoType: "alliance/MsgDelegate",
    toAmino: MsgDelegate.toAmino,
    fromAmino: MsgDelegate.fromAmino
  },
  "/alliance.alliance.MsgRedelegate": {
    aminoType: "alliance/MsgRedelegate",
    toAmino: MsgRedelegate.toAmino,
    fromAmino: MsgRedelegate.fromAmino
  },
  "/alliance.alliance.MsgUndelegate": {
    aminoType: "alliance/MsgUndelegate",
    toAmino: MsgUndelegate.toAmino,
    fromAmino: MsgUndelegate.fromAmino
  },
  "/alliance.alliance.MsgClaimDelegationRewards": {
    aminoType: "alliance/MsgClaimDelegationRewards",
    toAmino: MsgClaimDelegationRewards.toAmino,
    fromAmino: MsgClaimDelegationRewards.fromAmino
  },
  "/alliance.alliance.MsgUpdateParams": {
    aminoType: "/alliance.alliance.MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  },
  "/alliance.alliance.MsgCreateAlliance": {
    aminoType: "/alliance.alliance.MsgCreateAlliance",
    toAmino: MsgCreateAlliance.toAmino,
    fromAmino: MsgCreateAlliance.fromAmino
  },
  "/alliance.alliance.MsgUpdateAlliance": {
    aminoType: "/alliance.alliance.MsgUpdateAlliance",
    toAmino: MsgUpdateAlliance.toAmino,
    fromAmino: MsgUpdateAlliance.fromAmino
  },
  "/alliance.alliance.MsgDeleteAlliance": {
    aminoType: "/alliance.alliance.MsgDeleteAlliance",
    toAmino: MsgDeleteAlliance.toAmino,
    fromAmino: MsgDeleteAlliance.fromAmino
  }
};