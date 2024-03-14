//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgTransfer } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/neutron.transfer.MsgTransfer", MsgTransfer]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    transfer(value: MsgTransfer) {
      return {
        typeUrl: "/neutron.transfer.MsgTransfer",
        value: MsgTransfer.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    transfer(value: MsgTransfer) {
      return {
        typeUrl: "/neutron.transfer.MsgTransfer",
        value
      };
    }
  },
  fromPartial: {
    transfer(value: MsgTransfer) {
      return {
        typeUrl: "/neutron.transfer.MsgTransfer",
        value: MsgTransfer.fromPartial(value)
      };
    }
  }
};