//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgDeleteAdmin, MsgAddAdmin, MsgSubmitProposal, MsgSubmitProposalLegacy } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/cosmos.adminmodule.adminmodule.MsgDeleteAdmin", MsgDeleteAdmin], ["/cosmos.adminmodule.adminmodule.MsgAddAdmin", MsgAddAdmin], ["/cosmos.adminmodule.adminmodule.MsgSubmitProposal", MsgSubmitProposal], ["/cosmos.adminmodule.adminmodule.MsgSubmitProposalLegacy", MsgSubmitProposalLegacy]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    deleteAdmin(value: MsgDeleteAdmin) {
      return {
        typeUrl: "/cosmos.adminmodule.adminmodule.MsgDeleteAdmin",
        value: MsgDeleteAdmin.encode(value).finish()
      };
    },
    addAdmin(value: MsgAddAdmin) {
      return {
        typeUrl: "/cosmos.adminmodule.adminmodule.MsgAddAdmin",
        value: MsgAddAdmin.encode(value).finish()
      };
    },
    submitProposal(value: MsgSubmitProposal) {
      return {
        typeUrl: "/cosmos.adminmodule.adminmodule.MsgSubmitProposal",
        value: MsgSubmitProposal.encode(value).finish()
      };
    },
    submitProposalLegacy(value: MsgSubmitProposalLegacy) {
      return {
        typeUrl: "/cosmos.adminmodule.adminmodule.MsgSubmitProposalLegacy",
        value: MsgSubmitProposalLegacy.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    deleteAdmin(value: MsgDeleteAdmin) {
      return {
        typeUrl: "/cosmos.adminmodule.adminmodule.MsgDeleteAdmin",
        value
      };
    },
    addAdmin(value: MsgAddAdmin) {
      return {
        typeUrl: "/cosmos.adminmodule.adminmodule.MsgAddAdmin",
        value
      };
    },
    submitProposal(value: MsgSubmitProposal) {
      return {
        typeUrl: "/cosmos.adminmodule.adminmodule.MsgSubmitProposal",
        value
      };
    },
    submitProposalLegacy(value: MsgSubmitProposalLegacy) {
      return {
        typeUrl: "/cosmos.adminmodule.adminmodule.MsgSubmitProposalLegacy",
        value
      };
    }
  },
  fromPartial: {
    deleteAdmin(value: MsgDeleteAdmin) {
      return {
        typeUrl: "/cosmos.adminmodule.adminmodule.MsgDeleteAdmin",
        value: MsgDeleteAdmin.fromPartial(value)
      };
    },
    addAdmin(value: MsgAddAdmin) {
      return {
        typeUrl: "/cosmos.adminmodule.adminmodule.MsgAddAdmin",
        value: MsgAddAdmin.fromPartial(value)
      };
    },
    submitProposal(value: MsgSubmitProposal) {
      return {
        typeUrl: "/cosmos.adminmodule.adminmodule.MsgSubmitProposal",
        value: MsgSubmitProposal.fromPartial(value)
      };
    },
    submitProposalLegacy(value: MsgSubmitProposalLegacy) {
      return {
        typeUrl: "/cosmos.adminmodule.adminmodule.MsgSubmitProposalLegacy",
        value: MsgSubmitProposalLegacy.fromPartial(value)
      };
    }
  }
};