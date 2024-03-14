//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgDelegate, MsgRedelegate, MsgUndelegate, MsgClaimDelegationRewards, MsgUpdateParams, MsgCreateAlliance, MsgUpdateAlliance, MsgDeleteAlliance } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/alliance.alliance.MsgDelegate", MsgDelegate], ["/alliance.alliance.MsgRedelegate", MsgRedelegate], ["/alliance.alliance.MsgUndelegate", MsgUndelegate], ["/alliance.alliance.MsgClaimDelegationRewards", MsgClaimDelegationRewards], ["/alliance.alliance.MsgUpdateParams", MsgUpdateParams], ["/alliance.alliance.MsgCreateAlliance", MsgCreateAlliance], ["/alliance.alliance.MsgUpdateAlliance", MsgUpdateAlliance], ["/alliance.alliance.MsgDeleteAlliance", MsgDeleteAlliance]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    delegate(value: MsgDelegate) {
      return {
        typeUrl: "/alliance.alliance.MsgDelegate",
        value: MsgDelegate.encode(value).finish()
      };
    },
    redelegate(value: MsgRedelegate) {
      return {
        typeUrl: "/alliance.alliance.MsgRedelegate",
        value: MsgRedelegate.encode(value).finish()
      };
    },
    undelegate(value: MsgUndelegate) {
      return {
        typeUrl: "/alliance.alliance.MsgUndelegate",
        value: MsgUndelegate.encode(value).finish()
      };
    },
    claimDelegationRewards(value: MsgClaimDelegationRewards) {
      return {
        typeUrl: "/alliance.alliance.MsgClaimDelegationRewards",
        value: MsgClaimDelegationRewards.encode(value).finish()
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/alliance.alliance.MsgUpdateParams",
        value: MsgUpdateParams.encode(value).finish()
      };
    },
    createAlliance(value: MsgCreateAlliance) {
      return {
        typeUrl: "/alliance.alliance.MsgCreateAlliance",
        value: MsgCreateAlliance.encode(value).finish()
      };
    },
    updateAlliance(value: MsgUpdateAlliance) {
      return {
        typeUrl: "/alliance.alliance.MsgUpdateAlliance",
        value: MsgUpdateAlliance.encode(value).finish()
      };
    },
    deleteAlliance(value: MsgDeleteAlliance) {
      return {
        typeUrl: "/alliance.alliance.MsgDeleteAlliance",
        value: MsgDeleteAlliance.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    delegate(value: MsgDelegate) {
      return {
        typeUrl: "/alliance.alliance.MsgDelegate",
        value
      };
    },
    redelegate(value: MsgRedelegate) {
      return {
        typeUrl: "/alliance.alliance.MsgRedelegate",
        value
      };
    },
    undelegate(value: MsgUndelegate) {
      return {
        typeUrl: "/alliance.alliance.MsgUndelegate",
        value
      };
    },
    claimDelegationRewards(value: MsgClaimDelegationRewards) {
      return {
        typeUrl: "/alliance.alliance.MsgClaimDelegationRewards",
        value
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/alliance.alliance.MsgUpdateParams",
        value
      };
    },
    createAlliance(value: MsgCreateAlliance) {
      return {
        typeUrl: "/alliance.alliance.MsgCreateAlliance",
        value
      };
    },
    updateAlliance(value: MsgUpdateAlliance) {
      return {
        typeUrl: "/alliance.alliance.MsgUpdateAlliance",
        value
      };
    },
    deleteAlliance(value: MsgDeleteAlliance) {
      return {
        typeUrl: "/alliance.alliance.MsgDeleteAlliance",
        value
      };
    }
  },
  fromPartial: {
    delegate(value: MsgDelegate) {
      return {
        typeUrl: "/alliance.alliance.MsgDelegate",
        value: MsgDelegate.fromPartial(value)
      };
    },
    redelegate(value: MsgRedelegate) {
      return {
        typeUrl: "/alliance.alliance.MsgRedelegate",
        value: MsgRedelegate.fromPartial(value)
      };
    },
    undelegate(value: MsgUndelegate) {
      return {
        typeUrl: "/alliance.alliance.MsgUndelegate",
        value: MsgUndelegate.fromPartial(value)
      };
    },
    claimDelegationRewards(value: MsgClaimDelegationRewards) {
      return {
        typeUrl: "/alliance.alliance.MsgClaimDelegationRewards",
        value: MsgClaimDelegationRewards.fromPartial(value)
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/alliance.alliance.MsgUpdateParams",
        value: MsgUpdateParams.fromPartial(value)
      };
    },
    createAlliance(value: MsgCreateAlliance) {
      return {
        typeUrl: "/alliance.alliance.MsgCreateAlliance",
        value: MsgCreateAlliance.fromPartial(value)
      };
    },
    updateAlliance(value: MsgUpdateAlliance) {
      return {
        typeUrl: "/alliance.alliance.MsgUpdateAlliance",
        value: MsgUpdateAlliance.fromPartial(value)
      };
    },
    deleteAlliance(value: MsgDeleteAlliance) {
      return {
        typeUrl: "/alliance.alliance.MsgDeleteAlliance",
        value: MsgDeleteAlliance.fromPartial(value)
      };
    }
  }
};