import { MsgCreateDenom, MsgMint, MsgBurn, MsgChangeAdmin } from "./tx";
export const AminoConverter = {
  "/kujira.denom.MsgCreateDenom": {
    aminoType: "/kujira.denom.MsgCreateDenom",
    toAmino: MsgCreateDenom.toAmino,
    fromAmino: MsgCreateDenom.fromAmino
  },
  "/kujira.denom.MsgMint": {
    aminoType: "/kujira.denom.MsgMint",
    toAmino: MsgMint.toAmino,
    fromAmino: MsgMint.fromAmino
  },
  "/kujira.denom.MsgBurn": {
    aminoType: "/kujira.denom.MsgBurn",
    toAmino: MsgBurn.toAmino,
    fromAmino: MsgBurn.fromAmino
  },
  "/kujira.denom.MsgChangeAdmin": {
    aminoType: "/kujira.denom.MsgChangeAdmin",
    toAmino: MsgChangeAdmin.toAmino,
    fromAmino: MsgChangeAdmin.fromAmino
  }
};