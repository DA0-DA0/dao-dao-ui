import { MsgUpdateParams } from "./tx";
export const AminoConverter = {
  "/neutron.feerefunder.MsgUpdateParams": {
    aminoType: "feerefunder/MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  }
};