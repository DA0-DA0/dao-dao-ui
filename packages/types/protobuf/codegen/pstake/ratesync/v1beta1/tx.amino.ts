import { MsgCreateHostChain, MsgUpdateHostChain, MsgDeleteHostChain, MsgUpdateParams } from "./tx";
export const AminoConverter = {
  "/pstake.ratesync.v1beta1.MsgCreateHostChain": {
    aminoType: "pstake/ratesync/MsgCreateHostChain",
    toAmino: MsgCreateHostChain.toAmino,
    fromAmino: MsgCreateHostChain.fromAmino
  },
  "/pstake.ratesync.v1beta1.MsgUpdateHostChain": {
    aminoType: "pstake/ratesync/MsgUpdateHostChain",
    toAmino: MsgUpdateHostChain.toAmino,
    fromAmino: MsgUpdateHostChain.fromAmino
  },
  "/pstake.ratesync.v1beta1.MsgDeleteHostChain": {
    aminoType: "pstake/ratesync/MsgDeleteHostChain",
    toAmino: MsgDeleteHostChain.toAmino,
    fromAmino: MsgDeleteHostChain.fromAmino
  },
  "/pstake.ratesync.v1beta1.MsgUpdateParams": {
    aminoType: "pstake/ratesync/MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  }
};