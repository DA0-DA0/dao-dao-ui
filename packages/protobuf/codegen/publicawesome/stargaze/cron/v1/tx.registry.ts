//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgPromoteToPrivilegedContract, MsgDemoteFromPrivilegedContract, MsgUpdateParams } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/publicawesome.stargaze.cron.v1.MsgPromoteToPrivilegedContract", MsgPromoteToPrivilegedContract], ["/publicawesome.stargaze.cron.v1.MsgDemoteFromPrivilegedContract", MsgDemoteFromPrivilegedContract], ["/publicawesome.stargaze.cron.v1.MsgUpdateParams", MsgUpdateParams]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    promoteToPrivilegedContract(value: MsgPromoteToPrivilegedContract) {
      return {
        typeUrl: "/publicawesome.stargaze.cron.v1.MsgPromoteToPrivilegedContract",
        value: MsgPromoteToPrivilegedContract.encode(value).finish()
      };
    },
    demoteFromPrivilegedContract(value: MsgDemoteFromPrivilegedContract) {
      return {
        typeUrl: "/publicawesome.stargaze.cron.v1.MsgDemoteFromPrivilegedContract",
        value: MsgDemoteFromPrivilegedContract.encode(value).finish()
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/publicawesome.stargaze.cron.v1.MsgUpdateParams",
        value: MsgUpdateParams.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    promoteToPrivilegedContract(value: MsgPromoteToPrivilegedContract) {
      return {
        typeUrl: "/publicawesome.stargaze.cron.v1.MsgPromoteToPrivilegedContract",
        value
      };
    },
    demoteFromPrivilegedContract(value: MsgDemoteFromPrivilegedContract) {
      return {
        typeUrl: "/publicawesome.stargaze.cron.v1.MsgDemoteFromPrivilegedContract",
        value
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/publicawesome.stargaze.cron.v1.MsgUpdateParams",
        value
      };
    }
  },
  fromPartial: {
    promoteToPrivilegedContract(value: MsgPromoteToPrivilegedContract) {
      return {
        typeUrl: "/publicawesome.stargaze.cron.v1.MsgPromoteToPrivilegedContract",
        value: MsgPromoteToPrivilegedContract.fromPartial(value)
      };
    },
    demoteFromPrivilegedContract(value: MsgDemoteFromPrivilegedContract) {
      return {
        typeUrl: "/publicawesome.stargaze.cron.v1.MsgDemoteFromPrivilegedContract",
        value: MsgDemoteFromPrivilegedContract.fromPartial(value)
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/publicawesome.stargaze.cron.v1.MsgUpdateParams",
        value: MsgUpdateParams.fromPartial(value)
      };
    }
  }
};