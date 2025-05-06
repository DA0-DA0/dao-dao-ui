import { MsgAddSchedule, MsgRemoveSchedule, MsgUpdateParams } from "./tx";
export const AminoConverter = {
  "/neutron.cron.MsgAddSchedule": {
    aminoType: "cron/MsgAddSchedule",
    toAmino: MsgAddSchedule.toAmino,
    fromAmino: MsgAddSchedule.fromAmino
  },
  "/neutron.cron.MsgRemoveSchedule": {
    aminoType: "cron/MsgRemoveSchedule",
    toAmino: MsgRemoveSchedule.toAmino,
    fromAmino: MsgRemoveSchedule.fromAmino
  },
  "/neutron.cron.MsgUpdateParams": {
    aminoType: "cron/MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  }
};