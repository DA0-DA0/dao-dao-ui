import { MsgRegisterFeeShare, MsgUpdateFeeShare, MsgCancelFeeShare, MsgUpdateParams } from "./tx";
export const AminoConverter = {
  "/juno.feeshare.v1.MsgRegisterFeeShare": {
    aminoType: "/juno.feeshare.v1.MsgRegisterFeeShare",
    toAmino: MsgRegisterFeeShare.toAmino,
    fromAmino: MsgRegisterFeeShare.fromAmino
  },
  "/juno.feeshare.v1.MsgUpdateFeeShare": {
    aminoType: "/juno.feeshare.v1.MsgUpdateFeeShare",
    toAmino: MsgUpdateFeeShare.toAmino,
    fromAmino: MsgUpdateFeeShare.fromAmino
  },
  "/juno.feeshare.v1.MsgCancelFeeShare": {
    aminoType: "/juno.feeshare.v1.MsgCancelFeeShare",
    toAmino: MsgCancelFeeShare.toAmino,
    fromAmino: MsgCancelFeeShare.fromAmino
  },
  "/juno.feeshare.v1.MsgUpdateParams": {
    aminoType: "/juno.feeshare.v1.MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  }
};