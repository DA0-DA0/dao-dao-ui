//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgBond, MsgUnbond, MsgUpdateParams, MsgAddPool, MsgUpdatePool } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/elys.stablestake.MsgBond", MsgBond], ["/elys.stablestake.MsgUnbond", MsgUnbond], ["/elys.stablestake.MsgUpdateParams", MsgUpdateParams], ["/elys.stablestake.MsgAddPool", MsgAddPool], ["/elys.stablestake.MsgUpdatePool", MsgUpdatePool]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    bond(value: MsgBond) {
      return {
        typeUrl: "/elys.stablestake.MsgBond",
        value: MsgBond.encode(value).finish()
      };
    },
    unbond(value: MsgUnbond) {
      return {
        typeUrl: "/elys.stablestake.MsgUnbond",
        value: MsgUnbond.encode(value).finish()
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/elys.stablestake.MsgUpdateParams",
        value: MsgUpdateParams.encode(value).finish()
      };
    },
    addPool(value: MsgAddPool) {
      return {
        typeUrl: "/elys.stablestake.MsgAddPool",
        value: MsgAddPool.encode(value).finish()
      };
    },
    updatePool(value: MsgUpdatePool) {
      return {
        typeUrl: "/elys.stablestake.MsgUpdatePool",
        value: MsgUpdatePool.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    bond(value: MsgBond) {
      return {
        typeUrl: "/elys.stablestake.MsgBond",
        value
      };
    },
    unbond(value: MsgUnbond) {
      return {
        typeUrl: "/elys.stablestake.MsgUnbond",
        value
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/elys.stablestake.MsgUpdateParams",
        value
      };
    },
    addPool(value: MsgAddPool) {
      return {
        typeUrl: "/elys.stablestake.MsgAddPool",
        value
      };
    },
    updatePool(value: MsgUpdatePool) {
      return {
        typeUrl: "/elys.stablestake.MsgUpdatePool",
        value
      };
    }
  },
  fromPartial: {
    bond(value: MsgBond) {
      return {
        typeUrl: "/elys.stablestake.MsgBond",
        value: MsgBond.fromPartial(value)
      };
    },
    unbond(value: MsgUnbond) {
      return {
        typeUrl: "/elys.stablestake.MsgUnbond",
        value: MsgUnbond.fromPartial(value)
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/elys.stablestake.MsgUpdateParams",
        value: MsgUpdateParams.fromPartial(value)
      };
    },
    addPool(value: MsgAddPool) {
      return {
        typeUrl: "/elys.stablestake.MsgAddPool",
        value: MsgAddPool.fromPartial(value)
      };
    },
    updatePool(value: MsgUpdatePool) {
      return {
        typeUrl: "/elys.stablestake.MsgUpdatePool",
        value: MsgUpdatePool.fromPartial(value)
      };
    }
  }
};