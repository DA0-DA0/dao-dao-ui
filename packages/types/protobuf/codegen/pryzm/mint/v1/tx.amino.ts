import { MsgUpdateParams, MsgDappAccountSpend } from "./tx";
export const AminoConverter = {
  "/pryzm.mint.v1.MsgUpdateParams": {
    aminoType: "pryzm/mint/v1/UpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  },
  "/pryzm.mint.v1.MsgDappAccountSpend": {
    aminoType: "pryzm/mint/v1/DappAccountSpend",
    toAmino: MsgDappAccountSpend.toAmino,
    fromAmino: MsgDappAccountSpend.fromAmino
  }
};