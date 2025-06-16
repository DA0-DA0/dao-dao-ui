//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgUpdateParams, MsgDappAccountSpend } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/pryzm.mint.v1.MsgUpdateParams", MsgUpdateParams], ["/pryzm.mint.v1.MsgDappAccountSpend", MsgDappAccountSpend]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/pryzm.mint.v1.MsgUpdateParams",
        value: MsgUpdateParams.encode(value).finish()
      };
    },
    dappAccountSpend(value: MsgDappAccountSpend) {
      return {
        typeUrl: "/pryzm.mint.v1.MsgDappAccountSpend",
        value: MsgDappAccountSpend.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/pryzm.mint.v1.MsgUpdateParams",
        value
      };
    },
    dappAccountSpend(value: MsgDappAccountSpend) {
      return {
        typeUrl: "/pryzm.mint.v1.MsgDappAccountSpend",
        value
      };
    }
  },
  fromPartial: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/pryzm.mint.v1.MsgUpdateParams",
        value: MsgUpdateParams.fromPartial(value)
      };
    },
    dappAccountSpend(value: MsgDappAccountSpend) {
      return {
        typeUrl: "/pryzm.mint.v1.MsgDappAccountSpend",
        value: MsgDappAccountSpend.fromPartial(value)
      };
    }
  }
};