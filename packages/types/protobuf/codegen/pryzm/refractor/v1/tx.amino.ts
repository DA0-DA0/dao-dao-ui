import { MsgRefract, MsgRedeem, MsgUpdateParams, MsgDepositCAsset } from "./tx";
export const AminoConverter = {
  "/pryzm.refractor.v1.MsgRefract": {
    aminoType: "pryzm/refractor/v1/Refract",
    toAmino: MsgRefract.toAmino,
    fromAmino: MsgRefract.fromAmino
  },
  "/pryzm.refractor.v1.MsgRedeem": {
    aminoType: "pryzm/refractor/v1/Redeem",
    toAmino: MsgRedeem.toAmino,
    fromAmino: MsgRedeem.fromAmino
  },
  "/pryzm.refractor.v1.MsgUpdateParams": {
    aminoType: "pryzm/refractor/v1/UpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  },
  "/pryzm.refractor.v1.MsgDepositCAsset": {
    aminoType: "pryzm/refractor/v1/DepositCAsset",
    toAmino: MsgDepositCAsset.toAmino,
    fromAmino: MsgDepositCAsset.fromAmino
  }
};