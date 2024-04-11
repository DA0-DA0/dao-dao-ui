import { MsgToggleIbcSwitch } from "./tx";
export const AminoConverter = {
  "/secret.emergencybutton.v1beta1.MsgToggleIbcSwitch": {
    aminoType: "/secret.emergencybutton.v1beta1.MsgToggleIbcSwitch",
    toAmino: MsgToggleIbcSwitch.toAmino,
    fromAmino: MsgToggleIbcSwitch.fromAmino
  }
};