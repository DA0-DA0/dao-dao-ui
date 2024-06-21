//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgParams } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/feemarket.feemarket.v1.MsgParams", MsgParams]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    params(value: MsgParams) {
      return {
        typeUrl: "/feemarket.feemarket.v1.MsgParams",
        value: MsgParams.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    params(value: MsgParams) {
      return {
        typeUrl: "/feemarket.feemarket.v1.MsgParams",
        value
      };
    }
  },
  fromPartial: {
    params(value: MsgParams) {
      return {
        typeUrl: "/feemarket.feemarket.v1.MsgParams",
        value: MsgParams.fromPartial(value)
      };
    }
  }
};