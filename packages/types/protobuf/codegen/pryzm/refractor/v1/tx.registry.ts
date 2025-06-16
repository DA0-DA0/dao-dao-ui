//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgRefract, MsgRedeem, MsgUpdateParams, MsgDepositCAsset } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/pryzm.refractor.v1.MsgRefract", MsgRefract], ["/pryzm.refractor.v1.MsgRedeem", MsgRedeem], ["/pryzm.refractor.v1.MsgUpdateParams", MsgUpdateParams], ["/pryzm.refractor.v1.MsgDepositCAsset", MsgDepositCAsset]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    refract(value: MsgRefract) {
      return {
        typeUrl: "/pryzm.refractor.v1.MsgRefract",
        value: MsgRefract.encode(value).finish()
      };
    },
    redeem(value: MsgRedeem) {
      return {
        typeUrl: "/pryzm.refractor.v1.MsgRedeem",
        value: MsgRedeem.encode(value).finish()
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/pryzm.refractor.v1.MsgUpdateParams",
        value: MsgUpdateParams.encode(value).finish()
      };
    },
    depositCAsset(value: MsgDepositCAsset) {
      return {
        typeUrl: "/pryzm.refractor.v1.MsgDepositCAsset",
        value: MsgDepositCAsset.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    refract(value: MsgRefract) {
      return {
        typeUrl: "/pryzm.refractor.v1.MsgRefract",
        value
      };
    },
    redeem(value: MsgRedeem) {
      return {
        typeUrl: "/pryzm.refractor.v1.MsgRedeem",
        value
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/pryzm.refractor.v1.MsgUpdateParams",
        value
      };
    },
    depositCAsset(value: MsgDepositCAsset) {
      return {
        typeUrl: "/pryzm.refractor.v1.MsgDepositCAsset",
        value
      };
    }
  },
  fromPartial: {
    refract(value: MsgRefract) {
      return {
        typeUrl: "/pryzm.refractor.v1.MsgRefract",
        value: MsgRefract.fromPartial(value)
      };
    },
    redeem(value: MsgRedeem) {
      return {
        typeUrl: "/pryzm.refractor.v1.MsgRedeem",
        value: MsgRedeem.fromPartial(value)
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/pryzm.refractor.v1.MsgUpdateParams",
        value: MsgUpdateParams.fromPartial(value)
      };
    },
    depositCAsset(value: MsgDepositCAsset) {
      return {
        typeUrl: "/pryzm.refractor.v1.MsgDepositCAsset",
        value: MsgDepositCAsset.fromPartial(value)
      };
    }
  }
};