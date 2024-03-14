import { MsgUpdateParams } from "./tx";
export const AminoConverter = {
  "/neutron.contractmanager.MsgUpdateParams": {
    aminoType: "contractmanager/MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  }
};