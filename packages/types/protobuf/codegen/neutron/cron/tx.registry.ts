//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgAddSchedule, MsgRemoveSchedule, MsgUpdateParams } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/neutron.cron.MsgAddSchedule", MsgAddSchedule], ["/neutron.cron.MsgRemoveSchedule", MsgRemoveSchedule], ["/neutron.cron.MsgUpdateParams", MsgUpdateParams]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    addSchedule(value: MsgAddSchedule) {
      return {
        typeUrl: "/neutron.cron.MsgAddSchedule",
        value: MsgAddSchedule.encode(value).finish()
      };
    },
    removeSchedule(value: MsgRemoveSchedule) {
      return {
        typeUrl: "/neutron.cron.MsgRemoveSchedule",
        value: MsgRemoveSchedule.encode(value).finish()
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/neutron.cron.MsgUpdateParams",
        value: MsgUpdateParams.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    addSchedule(value: MsgAddSchedule) {
      return {
        typeUrl: "/neutron.cron.MsgAddSchedule",
        value
      };
    },
    removeSchedule(value: MsgRemoveSchedule) {
      return {
        typeUrl: "/neutron.cron.MsgRemoveSchedule",
        value
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/neutron.cron.MsgUpdateParams",
        value
      };
    }
  },
  fromPartial: {
    addSchedule(value: MsgAddSchedule) {
      return {
        typeUrl: "/neutron.cron.MsgAddSchedule",
        value: MsgAddSchedule.fromPartial(value)
      };
    },
    removeSchedule(value: MsgRemoveSchedule) {
      return {
        typeUrl: "/neutron.cron.MsgRemoveSchedule",
        value: MsgRemoveSchedule.fromPartial(value)
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/neutron.cron.MsgUpdateParams",
        value: MsgUpdateParams.fromPartial(value)
      };
    }
  }
};