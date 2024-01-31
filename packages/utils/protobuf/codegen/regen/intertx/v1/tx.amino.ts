import { MsgRegisterAccount, MsgSubmitTx } from "./tx";
export const AminoConverter = {
  "/regen.intertx.v1.MsgRegisterAccount": {
    aminoType: "/regen.intertx.v1.MsgRegisterAccount",
    toAmino: MsgRegisterAccount.toAmino,
    fromAmino: MsgRegisterAccount.fromAmino
  },
  "/regen.intertx.v1.MsgSubmitTx": {
    aminoType: "/regen.intertx.v1.MsgSubmitTx",
    toAmino: MsgSubmitTx.toAmino,
    fromAmino: MsgSubmitTx.fromAmino
  }
};