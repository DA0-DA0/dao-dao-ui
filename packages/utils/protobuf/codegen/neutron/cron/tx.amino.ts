import { MsgUpdateParams } from "./tx";
export const AminoConverter = {
  "/neutron.cron.MsgUpdateParams": {
    aminoType: "cron/MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  }
};