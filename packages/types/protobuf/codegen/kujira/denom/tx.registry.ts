//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgCreateDenom, MsgMint, MsgBurn, MsgChangeAdmin } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/kujira.denom.MsgCreateDenom", MsgCreateDenom], ["/kujira.denom.MsgMint", MsgMint], ["/kujira.denom.MsgBurn", MsgBurn], ["/kujira.denom.MsgChangeAdmin", MsgChangeAdmin]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    createDenom(value: MsgCreateDenom) {
      return {
        typeUrl: "/kujira.denom.MsgCreateDenom",
        value: MsgCreateDenom.encode(value).finish()
      };
    },
    mint(value: MsgMint) {
      return {
        typeUrl: "/kujira.denom.MsgMint",
        value: MsgMint.encode(value).finish()
      };
    },
    burn(value: MsgBurn) {
      return {
        typeUrl: "/kujira.denom.MsgBurn",
        value: MsgBurn.encode(value).finish()
      };
    },
    changeAdmin(value: MsgChangeAdmin) {
      return {
        typeUrl: "/kujira.denom.MsgChangeAdmin",
        value: MsgChangeAdmin.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    createDenom(value: MsgCreateDenom) {
      return {
        typeUrl: "/kujira.denom.MsgCreateDenom",
        value
      };
    },
    mint(value: MsgMint) {
      return {
        typeUrl: "/kujira.denom.MsgMint",
        value
      };
    },
    burn(value: MsgBurn) {
      return {
        typeUrl: "/kujira.denom.MsgBurn",
        value
      };
    },
    changeAdmin(value: MsgChangeAdmin) {
      return {
        typeUrl: "/kujira.denom.MsgChangeAdmin",
        value
      };
    }
  },
  fromPartial: {
    createDenom(value: MsgCreateDenom) {
      return {
        typeUrl: "/kujira.denom.MsgCreateDenom",
        value: MsgCreateDenom.fromPartial(value)
      };
    },
    mint(value: MsgMint) {
      return {
        typeUrl: "/kujira.denom.MsgMint",
        value: MsgMint.fromPartial(value)
      };
    },
    burn(value: MsgBurn) {
      return {
        typeUrl: "/kujira.denom.MsgBurn",
        value: MsgBurn.fromPartial(value)
      };
    },
    changeAdmin(value: MsgChangeAdmin) {
      return {
        typeUrl: "/kujira.denom.MsgChangeAdmin",
        value: MsgChangeAdmin.fromPartial(value)
      };
    }
  }
};