import { MsgPromoteToPrivilegedContract, MsgDemoteFromPrivilegedContract, MsgUpdateParams } from "./tx";
export const AminoConverter = {
  "/publicawesome.stargaze.cron.v1.MsgPromoteToPrivilegedContract": {
    aminoType: "/publicawesome.stargaze.cron.v1.MsgPromoteToPrivilegedContract",
    toAmino: MsgPromoteToPrivilegedContract.toAmino,
    fromAmino: MsgPromoteToPrivilegedContract.fromAmino
  },
  "/publicawesome.stargaze.cron.v1.MsgDemoteFromPrivilegedContract": {
    aminoType: "/publicawesome.stargaze.cron.v1.MsgDemoteFromPrivilegedContract",
    toAmino: MsgDemoteFromPrivilegedContract.toAmino,
    fromAmino: MsgDemoteFromPrivilegedContract.fromAmino
  },
  "/publicawesome.stargaze.cron.v1.MsgUpdateParams": {
    aminoType: "/publicawesome.stargaze.cron.v1.MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  }
};