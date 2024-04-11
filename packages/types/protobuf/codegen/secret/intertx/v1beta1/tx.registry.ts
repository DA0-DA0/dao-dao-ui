//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgRegisterAccount, MsgSubmitTx } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/secret.intertx.v1beta1.MsgRegisterAccount", MsgRegisterAccount], ["/secret.intertx.v1beta1.MsgSubmitTx", MsgSubmitTx]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    registerAccount(value: MsgRegisterAccount) {
      return {
        typeUrl: "/secret.intertx.v1beta1.MsgRegisterAccount",
        value: MsgRegisterAccount.encode(value).finish()
      };
    },
    submitTx(value: MsgSubmitTx) {
      return {
        typeUrl: "/secret.intertx.v1beta1.MsgSubmitTx",
        value: MsgSubmitTx.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    registerAccount(value: MsgRegisterAccount) {
      return {
        typeUrl: "/secret.intertx.v1beta1.MsgRegisterAccount",
        value
      };
    },
    submitTx(value: MsgSubmitTx) {
      return {
        typeUrl: "/secret.intertx.v1beta1.MsgSubmitTx",
        value
      };
    }
  },
  fromPartial: {
    registerAccount(value: MsgRegisterAccount) {
      return {
        typeUrl: "/secret.intertx.v1beta1.MsgRegisterAccount",
        value: MsgRegisterAccount.fromPartial(value)
      };
    },
    submitTx(value: MsgSubmitTx) {
      return {
        typeUrl: "/secret.intertx.v1beta1.MsgSubmitTx",
        value: MsgSubmitTx.fromPartial(value)
      };
    }
  }
};