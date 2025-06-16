//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgProposeMatch } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/pryzm.amm.v2.MsgProposeMatch", MsgProposeMatch]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    proposeMatch(value: MsgProposeMatch) {
      return {
        typeUrl: "/pryzm.amm.v2.MsgProposeMatch",
        value: MsgProposeMatch.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    proposeMatch(value: MsgProposeMatch) {
      return {
        typeUrl: "/pryzm.amm.v2.MsgProposeMatch",
        value
      };
    }
  },
  fromPartial: {
    proposeMatch(value: MsgProposeMatch) {
      return {
        typeUrl: "/pryzm.amm.v2.MsgProposeMatch",
        value: MsgProposeMatch.fromPartial(value)
      };
    }
  }
};