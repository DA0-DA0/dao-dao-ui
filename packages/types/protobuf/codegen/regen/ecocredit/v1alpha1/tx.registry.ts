//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgCreateClass, MsgCreateBatch, MsgSend, MsgRetire, MsgCancel, MsgUpdateClassAdmin, MsgUpdateClassIssuers, MsgUpdateClassMetadata } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/regen.ecocredit.v1alpha1.MsgCreateClass", MsgCreateClass], ["/regen.ecocredit.v1alpha1.MsgCreateBatch", MsgCreateBatch], ["/regen.ecocredit.v1alpha1.MsgSend", MsgSend], ["/regen.ecocredit.v1alpha1.MsgRetire", MsgRetire], ["/regen.ecocredit.v1alpha1.MsgCancel", MsgCancel], ["/regen.ecocredit.v1alpha1.MsgUpdateClassAdmin", MsgUpdateClassAdmin], ["/regen.ecocredit.v1alpha1.MsgUpdateClassIssuers", MsgUpdateClassIssuers], ["/regen.ecocredit.v1alpha1.MsgUpdateClassMetadata", MsgUpdateClassMetadata]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    createClass(value: MsgCreateClass) {
      return {
        typeUrl: "/regen.ecocredit.v1alpha1.MsgCreateClass",
        value: MsgCreateClass.encode(value).finish()
      };
    },
    createBatch(value: MsgCreateBatch) {
      return {
        typeUrl: "/regen.ecocredit.v1alpha1.MsgCreateBatch",
        value: MsgCreateBatch.encode(value).finish()
      };
    },
    send(value: MsgSend) {
      return {
        typeUrl: "/regen.ecocredit.v1alpha1.MsgSend",
        value: MsgSend.encode(value).finish()
      };
    },
    retire(value: MsgRetire) {
      return {
        typeUrl: "/regen.ecocredit.v1alpha1.MsgRetire",
        value: MsgRetire.encode(value).finish()
      };
    },
    cancel(value: MsgCancel) {
      return {
        typeUrl: "/regen.ecocredit.v1alpha1.MsgCancel",
        value: MsgCancel.encode(value).finish()
      };
    },
    updateClassAdmin(value: MsgUpdateClassAdmin) {
      return {
        typeUrl: "/regen.ecocredit.v1alpha1.MsgUpdateClassAdmin",
        value: MsgUpdateClassAdmin.encode(value).finish()
      };
    },
    updateClassIssuers(value: MsgUpdateClassIssuers) {
      return {
        typeUrl: "/regen.ecocredit.v1alpha1.MsgUpdateClassIssuers",
        value: MsgUpdateClassIssuers.encode(value).finish()
      };
    },
    updateClassMetadata(value: MsgUpdateClassMetadata) {
      return {
        typeUrl: "/regen.ecocredit.v1alpha1.MsgUpdateClassMetadata",
        value: MsgUpdateClassMetadata.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    createClass(value: MsgCreateClass) {
      return {
        typeUrl: "/regen.ecocredit.v1alpha1.MsgCreateClass",
        value
      };
    },
    createBatch(value: MsgCreateBatch) {
      return {
        typeUrl: "/regen.ecocredit.v1alpha1.MsgCreateBatch",
        value
      };
    },
    send(value: MsgSend) {
      return {
        typeUrl: "/regen.ecocredit.v1alpha1.MsgSend",
        value
      };
    },
    retire(value: MsgRetire) {
      return {
        typeUrl: "/regen.ecocredit.v1alpha1.MsgRetire",
        value
      };
    },
    cancel(value: MsgCancel) {
      return {
        typeUrl: "/regen.ecocredit.v1alpha1.MsgCancel",
        value
      };
    },
    updateClassAdmin(value: MsgUpdateClassAdmin) {
      return {
        typeUrl: "/regen.ecocredit.v1alpha1.MsgUpdateClassAdmin",
        value
      };
    },
    updateClassIssuers(value: MsgUpdateClassIssuers) {
      return {
        typeUrl: "/regen.ecocredit.v1alpha1.MsgUpdateClassIssuers",
        value
      };
    },
    updateClassMetadata(value: MsgUpdateClassMetadata) {
      return {
        typeUrl: "/regen.ecocredit.v1alpha1.MsgUpdateClassMetadata",
        value
      };
    }
  },
  fromPartial: {
    createClass(value: MsgCreateClass) {
      return {
        typeUrl: "/regen.ecocredit.v1alpha1.MsgCreateClass",
        value: MsgCreateClass.fromPartial(value)
      };
    },
    createBatch(value: MsgCreateBatch) {
      return {
        typeUrl: "/regen.ecocredit.v1alpha1.MsgCreateBatch",
        value: MsgCreateBatch.fromPartial(value)
      };
    },
    send(value: MsgSend) {
      return {
        typeUrl: "/regen.ecocredit.v1alpha1.MsgSend",
        value: MsgSend.fromPartial(value)
      };
    },
    retire(value: MsgRetire) {
      return {
        typeUrl: "/regen.ecocredit.v1alpha1.MsgRetire",
        value: MsgRetire.fromPartial(value)
      };
    },
    cancel(value: MsgCancel) {
      return {
        typeUrl: "/regen.ecocredit.v1alpha1.MsgCancel",
        value: MsgCancel.fromPartial(value)
      };
    },
    updateClassAdmin(value: MsgUpdateClassAdmin) {
      return {
        typeUrl: "/regen.ecocredit.v1alpha1.MsgUpdateClassAdmin",
        value: MsgUpdateClassAdmin.fromPartial(value)
      };
    },
    updateClassIssuers(value: MsgUpdateClassIssuers) {
      return {
        typeUrl: "/regen.ecocredit.v1alpha1.MsgUpdateClassIssuers",
        value: MsgUpdateClassIssuers.fromPartial(value)
      };
    },
    updateClassMetadata(value: MsgUpdateClassMetadata) {
      return {
        typeUrl: "/regen.ecocredit.v1alpha1.MsgUpdateClassMetadata",
        value: MsgUpdateClassMetadata.fromPartial(value)
      };
    }
  }
};