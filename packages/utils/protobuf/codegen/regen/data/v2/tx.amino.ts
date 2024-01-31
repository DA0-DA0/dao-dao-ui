import { MsgAnchor, MsgAttest, MsgDefineResolver, MsgRegisterResolver } from "./tx";
export const AminoConverter = {
  "/regen.data.v2.MsgAnchor": {
    aminoType: "/regen.data.v2.MsgAnchor",
    toAmino: MsgAnchor.toAmino,
    fromAmino: MsgAnchor.fromAmino
  },
  "/regen.data.v2.MsgAttest": {
    aminoType: "/regen.data.v2.MsgAttest",
    toAmino: MsgAttest.toAmino,
    fromAmino: MsgAttest.fromAmino
  },
  "/regen.data.v2.MsgDefineResolver": {
    aminoType: "/regen.data.v2.MsgDefineResolver",
    toAmino: MsgDefineResolver.toAmino,
    fromAmino: MsgDefineResolver.fromAmino
  },
  "/regen.data.v2.MsgRegisterResolver": {
    aminoType: "/regen.data.v2.MsgRegisterResolver",
    toAmino: MsgRegisterResolver.toAmino,
    fromAmino: MsgRegisterResolver.fromAmino
  }
};