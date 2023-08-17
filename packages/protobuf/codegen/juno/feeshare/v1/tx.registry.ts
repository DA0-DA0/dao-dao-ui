//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgRegisterFeeShare, MsgUpdateFeeShare, MsgCancelFeeShare, MsgUpdateParams } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/juno.feeshare.v1.MsgRegisterFeeShare", MsgRegisterFeeShare], ["/juno.feeshare.v1.MsgUpdateFeeShare", MsgUpdateFeeShare], ["/juno.feeshare.v1.MsgCancelFeeShare", MsgCancelFeeShare], ["/juno.feeshare.v1.MsgUpdateParams", MsgUpdateParams]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    registerFeeShare(value: MsgRegisterFeeShare) {
      return {
        typeUrl: "/juno.feeshare.v1.MsgRegisterFeeShare",
        value: MsgRegisterFeeShare.encode(value).finish()
      };
    },
    updateFeeShare(value: MsgUpdateFeeShare) {
      return {
        typeUrl: "/juno.feeshare.v1.MsgUpdateFeeShare",
        value: MsgUpdateFeeShare.encode(value).finish()
      };
    },
    cancelFeeShare(value: MsgCancelFeeShare) {
      return {
        typeUrl: "/juno.feeshare.v1.MsgCancelFeeShare",
        value: MsgCancelFeeShare.encode(value).finish()
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/juno.feeshare.v1.MsgUpdateParams",
        value: MsgUpdateParams.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    registerFeeShare(value: MsgRegisterFeeShare) {
      return {
        typeUrl: "/juno.feeshare.v1.MsgRegisterFeeShare",
        value
      };
    },
    updateFeeShare(value: MsgUpdateFeeShare) {
      return {
        typeUrl: "/juno.feeshare.v1.MsgUpdateFeeShare",
        value
      };
    },
    cancelFeeShare(value: MsgCancelFeeShare) {
      return {
        typeUrl: "/juno.feeshare.v1.MsgCancelFeeShare",
        value
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/juno.feeshare.v1.MsgUpdateParams",
        value
      };
    }
  },
  fromPartial: {
    registerFeeShare(value: MsgRegisterFeeShare) {
      return {
        typeUrl: "/juno.feeshare.v1.MsgRegisterFeeShare",
        value: MsgRegisterFeeShare.fromPartial(value)
      };
    },
    updateFeeShare(value: MsgUpdateFeeShare) {
      return {
        typeUrl: "/juno.feeshare.v1.MsgUpdateFeeShare",
        value: MsgUpdateFeeShare.fromPartial(value)
      };
    },
    cancelFeeShare(value: MsgCancelFeeShare) {
      return {
        typeUrl: "/juno.feeshare.v1.MsgCancelFeeShare",
        value: MsgCancelFeeShare.fromPartial(value)
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/juno.feeshare.v1.MsgUpdateParams",
        value: MsgUpdateParams.fromPartial(value)
      };
    }
  }
};