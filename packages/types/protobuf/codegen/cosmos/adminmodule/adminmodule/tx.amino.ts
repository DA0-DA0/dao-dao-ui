import { MsgDeleteAdmin, MsgAddAdmin, MsgSubmitProposal, MsgSubmitProposalLegacy } from "./tx";
export const AminoConverter = {
  "/cosmos.adminmodule.adminmodule.MsgDeleteAdmin": {
    aminoType: "cosmos-sdk/MsgDeleteAdmin",
    toAmino: MsgDeleteAdmin.toAmino,
    fromAmino: MsgDeleteAdmin.fromAmino
  },
  "/cosmos.adminmodule.adminmodule.MsgAddAdmin": {
    aminoType: "cosmos-sdk/MsgAddAdmin",
    toAmino: MsgAddAdmin.toAmino,
    fromAmino: MsgAddAdmin.fromAmino
  },
  "/cosmos.adminmodule.adminmodule.MsgSubmitProposal": {
    aminoType: "cosmos-sdk/MsgSubmitProposal",
    toAmino: MsgSubmitProposal.toAmino,
    fromAmino: MsgSubmitProposal.fromAmino
  },
  "/cosmos.adminmodule.adminmodule.MsgSubmitProposalLegacy": {
    aminoType: "cosmos-sdk/MsgSubmitProposalLegacy",
    toAmino: MsgSubmitProposalLegacy.toAmino,
    fromAmino: MsgSubmitProposalLegacy.fromAmino
  }
};