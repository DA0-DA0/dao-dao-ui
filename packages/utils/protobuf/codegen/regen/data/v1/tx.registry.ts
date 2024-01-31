//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgAnchor, MsgAttest, MsgDefineResolver, MsgRegisterResolver } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/regen.data.v1.MsgAnchor", MsgAnchor], ["/regen.data.v1.MsgAttest", MsgAttest], ["/regen.data.v1.MsgDefineResolver", MsgDefineResolver], ["/regen.data.v1.MsgRegisterResolver", MsgRegisterResolver]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    anchor(value: MsgAnchor) {
      return {
        typeUrl: "/regen.data.v1.MsgAnchor",
        value: MsgAnchor.encode(value).finish()
      };
    },
    attest(value: MsgAttest) {
      return {
        typeUrl: "/regen.data.v1.MsgAttest",
        value: MsgAttest.encode(value).finish()
      };
    },
    defineResolver(value: MsgDefineResolver) {
      return {
        typeUrl: "/regen.data.v1.MsgDefineResolver",
        value: MsgDefineResolver.encode(value).finish()
      };
    },
    registerResolver(value: MsgRegisterResolver) {
      return {
        typeUrl: "/regen.data.v1.MsgRegisterResolver",
        value: MsgRegisterResolver.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    anchor(value: MsgAnchor) {
      return {
        typeUrl: "/regen.data.v1.MsgAnchor",
        value
      };
    },
    attest(value: MsgAttest) {
      return {
        typeUrl: "/regen.data.v1.MsgAttest",
        value
      };
    },
    defineResolver(value: MsgDefineResolver) {
      return {
        typeUrl: "/regen.data.v1.MsgDefineResolver",
        value
      };
    },
    registerResolver(value: MsgRegisterResolver) {
      return {
        typeUrl: "/regen.data.v1.MsgRegisterResolver",
        value
      };
    }
  },
  fromPartial: {
    anchor(value: MsgAnchor) {
      return {
        typeUrl: "/regen.data.v1.MsgAnchor",
        value: MsgAnchor.fromPartial(value)
      };
    },
    attest(value: MsgAttest) {
      return {
        typeUrl: "/regen.data.v1.MsgAttest",
        value: MsgAttest.fromPartial(value)
      };
    },
    defineResolver(value: MsgDefineResolver) {
      return {
        typeUrl: "/regen.data.v1.MsgDefineResolver",
        value: MsgDefineResolver.fromPartial(value)
      };
    },
    registerResolver(value: MsgRegisterResolver) {
      return {
        typeUrl: "/regen.data.v1.MsgRegisterResolver",
        value: MsgRegisterResolver.fromPartial(value)
      };
    }
  }
};