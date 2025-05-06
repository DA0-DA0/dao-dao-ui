//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgUpdateParams, MsgFundTreasury } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/neutron.revenue.MsgUpdateParams", MsgUpdateParams], ["/neutron.revenue.MsgFundTreasury", MsgFundTreasury]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/neutron.revenue.MsgUpdateParams",
        value: MsgUpdateParams.encode(value).finish()
      };
    },
    fundTreasury(value: MsgFundTreasury) {
      return {
        typeUrl: "/neutron.revenue.MsgFundTreasury",
        value: MsgFundTreasury.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/neutron.revenue.MsgUpdateParams",
        value
      };
    },
    fundTreasury(value: MsgFundTreasury) {
      return {
        typeUrl: "/neutron.revenue.MsgFundTreasury",
        value
      };
    }
  },
  fromPartial: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/neutron.revenue.MsgUpdateParams",
        value: MsgUpdateParams.fromPartial(value)
      };
    },
    fundTreasury(value: MsgFundTreasury) {
      return {
        typeUrl: "/neutron.revenue.MsgFundTreasury",
        value: MsgFundTreasury.fromPartial(value)
      };
    }
  }
};