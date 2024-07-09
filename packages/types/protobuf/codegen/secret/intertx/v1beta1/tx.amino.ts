import { MsgRegisterAccount, MsgSubmitTx } from "./tx";
export const AminoConverter = {
  "/secret.intertx.v1beta1.MsgRegisterAccount": {
    aminoType: "/secret.intertx.v1beta1.MsgRegisterAccount",
    toAmino: MsgRegisterAccount.toAmino,
    fromAmino: MsgRegisterAccount.fromAmino
  },
  "/secret.intertx.v1beta1.MsgSubmitTx": {
    aminoType: "/secret.intertx.v1beta1.MsgSubmitTx",
    toAmino: MsgSubmitTx.toAmino,
    fromAmino: MsgSubmitTx.fromAmino
  }
};