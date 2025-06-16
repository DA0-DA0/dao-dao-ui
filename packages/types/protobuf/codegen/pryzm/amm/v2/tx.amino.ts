import { MsgProposeMatch } from "./tx";
export const AminoConverter = {
  "/pryzm.amm.v2.MsgProposeMatch": {
    aminoType: "pryzm/amm/v2/ProposeMatch",
    toAmino: MsgProposeMatch.toAmino,
    fromAmino: MsgProposeMatch.fromAmino
  }
};