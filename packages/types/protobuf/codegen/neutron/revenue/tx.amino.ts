import { MsgUpdateParams, MsgFundTreasury } from "./tx";
export const AminoConverter = {
  "/neutron.revenue.MsgUpdateParams": {
    aminoType: "revenue/MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  },
  "/neutron.revenue.MsgFundTreasury": {
    aminoType: "revenue/MsgFundTreasury",
    toAmino: MsgFundTreasury.toAmino,
    fromAmino: MsgFundTreasury.fromAmino
  }
};