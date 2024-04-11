//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgToggleIbcSwitch } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/secret.emergencybutton.v1beta1.MsgToggleIbcSwitch", MsgToggleIbcSwitch]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    toggleIbcSwitch(value: MsgToggleIbcSwitch) {
      return {
        typeUrl: "/secret.emergencybutton.v1beta1.MsgToggleIbcSwitch",
        value: MsgToggleIbcSwitch.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    toggleIbcSwitch(value: MsgToggleIbcSwitch) {
      return {
        typeUrl: "/secret.emergencybutton.v1beta1.MsgToggleIbcSwitch",
        value
      };
    }
  },
  fromPartial: {
    toggleIbcSwitch(value: MsgToggleIbcSwitch) {
      return {
        typeUrl: "/secret.emergencybutton.v1beta1.MsgToggleIbcSwitch",
        value: MsgToggleIbcSwitch.fromPartial(value)
      };
    }
  }
};