import { MsgUpdateParams, MsgSetAction } from "./tx";
export const AminoConverter = {
  "/pryzm.treasury.v1.MsgUpdateParams": {
    aminoType: "pryzm/treasury/v1/UpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  },
  "/pryzm.treasury.v1.MsgSetAction": {
    aminoType: "pryzm/treasury/v1/SetAction",
    toAmino: MsgSetAction.toAmino,
    fromAmino: MsgSetAction.fromAmino
  }
};