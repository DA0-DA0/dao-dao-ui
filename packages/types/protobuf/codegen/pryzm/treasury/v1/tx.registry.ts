//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgUpdateParams, MsgSetAction } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/pryzm.treasury.v1.MsgUpdateParams", MsgUpdateParams], ["/pryzm.treasury.v1.MsgSetAction", MsgSetAction]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/pryzm.treasury.v1.MsgUpdateParams",
        value: MsgUpdateParams.encode(value).finish()
      };
    },
    setAction(value: MsgSetAction) {
      return {
        typeUrl: "/pryzm.treasury.v1.MsgSetAction",
        value: MsgSetAction.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/pryzm.treasury.v1.MsgUpdateParams",
        value
      };
    },
    setAction(value: MsgSetAction) {
      return {
        typeUrl: "/pryzm.treasury.v1.MsgSetAction",
        value
      };
    }
  },
  fromPartial: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/pryzm.treasury.v1.MsgUpdateParams",
        value: MsgUpdateParams.fromPartial(value)
      };
    },
    setAction(value: MsgSetAction) {
      return {
        typeUrl: "/pryzm.treasury.v1.MsgSetAction",
        value: MsgSetAction.fromPartial(value)
      };
    }
  }
};