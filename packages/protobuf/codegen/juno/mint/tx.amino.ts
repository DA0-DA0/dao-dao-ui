import { MsgUpdateParams } from "./tx";
export const AminoConverter = {
  "/juno.mint.MsgUpdateParams": {
    aminoType: "/juno.mint.MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  }
};