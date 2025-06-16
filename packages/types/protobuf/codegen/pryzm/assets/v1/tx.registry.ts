//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgUpdateParams, MsgRegisterAsset, MsgDisableAsset, MsgUpdateMaturityParams, MsgUpdateFeeRatios, MsgIntroduceMaturityLevel } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/pryzm.assets.v1.MsgUpdateParams", MsgUpdateParams], ["/pryzm.assets.v1.MsgRegisterAsset", MsgRegisterAsset], ["/pryzm.assets.v1.MsgDisableAsset", MsgDisableAsset], ["/pryzm.assets.v1.MsgUpdateMaturityParams", MsgUpdateMaturityParams], ["/pryzm.assets.v1.MsgUpdateFeeRatios", MsgUpdateFeeRatios], ["/pryzm.assets.v1.MsgIntroduceMaturityLevel", MsgIntroduceMaturityLevel]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/pryzm.assets.v1.MsgUpdateParams",
        value: MsgUpdateParams.encode(value).finish()
      };
    },
    registerAsset(value: MsgRegisterAsset) {
      return {
        typeUrl: "/pryzm.assets.v1.MsgRegisterAsset",
        value: MsgRegisterAsset.encode(value).finish()
      };
    },
    disableAsset(value: MsgDisableAsset) {
      return {
        typeUrl: "/pryzm.assets.v1.MsgDisableAsset",
        value: MsgDisableAsset.encode(value).finish()
      };
    },
    updateMaturityParams(value: MsgUpdateMaturityParams) {
      return {
        typeUrl: "/pryzm.assets.v1.MsgUpdateMaturityParams",
        value: MsgUpdateMaturityParams.encode(value).finish()
      };
    },
    updateFeeRatios(value: MsgUpdateFeeRatios) {
      return {
        typeUrl: "/pryzm.assets.v1.MsgUpdateFeeRatios",
        value: MsgUpdateFeeRatios.encode(value).finish()
      };
    },
    introduceMaturityLevel(value: MsgIntroduceMaturityLevel) {
      return {
        typeUrl: "/pryzm.assets.v1.MsgIntroduceMaturityLevel",
        value: MsgIntroduceMaturityLevel.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/pryzm.assets.v1.MsgUpdateParams",
        value
      };
    },
    registerAsset(value: MsgRegisterAsset) {
      return {
        typeUrl: "/pryzm.assets.v1.MsgRegisterAsset",
        value
      };
    },
    disableAsset(value: MsgDisableAsset) {
      return {
        typeUrl: "/pryzm.assets.v1.MsgDisableAsset",
        value
      };
    },
    updateMaturityParams(value: MsgUpdateMaturityParams) {
      return {
        typeUrl: "/pryzm.assets.v1.MsgUpdateMaturityParams",
        value
      };
    },
    updateFeeRatios(value: MsgUpdateFeeRatios) {
      return {
        typeUrl: "/pryzm.assets.v1.MsgUpdateFeeRatios",
        value
      };
    },
    introduceMaturityLevel(value: MsgIntroduceMaturityLevel) {
      return {
        typeUrl: "/pryzm.assets.v1.MsgIntroduceMaturityLevel",
        value
      };
    }
  },
  fromPartial: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/pryzm.assets.v1.MsgUpdateParams",
        value: MsgUpdateParams.fromPartial(value)
      };
    },
    registerAsset(value: MsgRegisterAsset) {
      return {
        typeUrl: "/pryzm.assets.v1.MsgRegisterAsset",
        value: MsgRegisterAsset.fromPartial(value)
      };
    },
    disableAsset(value: MsgDisableAsset) {
      return {
        typeUrl: "/pryzm.assets.v1.MsgDisableAsset",
        value: MsgDisableAsset.fromPartial(value)
      };
    },
    updateMaturityParams(value: MsgUpdateMaturityParams) {
      return {
        typeUrl: "/pryzm.assets.v1.MsgUpdateMaturityParams",
        value: MsgUpdateMaturityParams.fromPartial(value)
      };
    },
    updateFeeRatios(value: MsgUpdateFeeRatios) {
      return {
        typeUrl: "/pryzm.assets.v1.MsgUpdateFeeRatios",
        value: MsgUpdateFeeRatios.fromPartial(value)
      };
    },
    introduceMaturityLevel(value: MsgIntroduceMaturityLevel) {
      return {
        typeUrl: "/pryzm.assets.v1.MsgIntroduceMaturityLevel",
        value: MsgIntroduceMaturityLevel.fromPartial(value)
      };
    }
  }
};