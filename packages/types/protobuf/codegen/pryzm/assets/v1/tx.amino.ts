import { MsgUpdateParams, MsgRegisterAsset, MsgDisableAsset, MsgUpdateMaturityParams, MsgUpdateFeeRatios, MsgIntroduceMaturityLevel } from "./tx";
export const AminoConverter = {
  "/pryzm.assets.v1.MsgUpdateParams": {
    aminoType: "pryzm/assets/v1/UpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  },
  "/pryzm.assets.v1.MsgRegisterAsset": {
    aminoType: "pryzm/assets/v1/RegisterAsset",
    toAmino: MsgRegisterAsset.toAmino,
    fromAmino: MsgRegisterAsset.fromAmino
  },
  "/pryzm.assets.v1.MsgDisableAsset": {
    aminoType: "pryzm/assets/v1/DisableAsset",
    toAmino: MsgDisableAsset.toAmino,
    fromAmino: MsgDisableAsset.fromAmino
  },
  "/pryzm.assets.v1.MsgUpdateMaturityParams": {
    aminoType: "pryzm/assets/v1/UpdateMaturityParams",
    toAmino: MsgUpdateMaturityParams.toAmino,
    fromAmino: MsgUpdateMaturityParams.fromAmino
  },
  "/pryzm.assets.v1.MsgUpdateFeeRatios": {
    aminoType: "pryzm/assets/v1/UpdateFeeRatios",
    toAmino: MsgUpdateFeeRatios.toAmino,
    fromAmino: MsgUpdateFeeRatios.fromAmino
  },
  "/pryzm.assets.v1.MsgIntroduceMaturityLevel": {
    aminoType: "pryzm/assets/v1/IntroduceMaturityLevel",
    toAmino: MsgIntroduceMaturityLevel.toAmino,
    fromAmino: MsgIntroduceMaturityLevel.fromAmino
  }
};