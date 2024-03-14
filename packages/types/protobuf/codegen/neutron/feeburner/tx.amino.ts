import { MsgUpdateParams } from "./tx";
export const AminoConverter = {
  "/neutron.feeburner.MsgUpdateParams": {
    aminoType: "feeburner/MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  }
};