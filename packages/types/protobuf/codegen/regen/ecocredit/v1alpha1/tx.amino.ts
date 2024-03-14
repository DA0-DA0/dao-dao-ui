import { MsgCreateClass, MsgCreateBatch, MsgSend, MsgRetire, MsgCancel, MsgUpdateClassAdmin, MsgUpdateClassIssuers, MsgUpdateClassMetadata } from "./tx";
export const AminoConverter = {
  "/regen.ecocredit.v1alpha1.MsgCreateClass": {
    aminoType: "/regen.ecocredit.v1alpha1.MsgCreateClass",
    toAmino: MsgCreateClass.toAmino,
    fromAmino: MsgCreateClass.fromAmino
  },
  "/regen.ecocredit.v1alpha1.MsgCreateBatch": {
    aminoType: "/regen.ecocredit.v1alpha1.MsgCreateBatch",
    toAmino: MsgCreateBatch.toAmino,
    fromAmino: MsgCreateBatch.fromAmino
  },
  "/regen.ecocredit.v1alpha1.MsgSend": {
    aminoType: "/regen.ecocredit.v1alpha1.MsgSend",
    toAmino: MsgSend.toAmino,
    fromAmino: MsgSend.fromAmino
  },
  "/regen.ecocredit.v1alpha1.MsgRetire": {
    aminoType: "/regen.ecocredit.v1alpha1.MsgRetire",
    toAmino: MsgRetire.toAmino,
    fromAmino: MsgRetire.fromAmino
  },
  "/regen.ecocredit.v1alpha1.MsgCancel": {
    aminoType: "/regen.ecocredit.v1alpha1.MsgCancel",
    toAmino: MsgCancel.toAmino,
    fromAmino: MsgCancel.fromAmino
  },
  "/regen.ecocredit.v1alpha1.MsgUpdateClassAdmin": {
    aminoType: "/regen.ecocredit.v1alpha1.MsgUpdateClassAdmin",
    toAmino: MsgUpdateClassAdmin.toAmino,
    fromAmino: MsgUpdateClassAdmin.fromAmino
  },
  "/regen.ecocredit.v1alpha1.MsgUpdateClassIssuers": {
    aminoType: "/regen.ecocredit.v1alpha1.MsgUpdateClassIssuers",
    toAmino: MsgUpdateClassIssuers.toAmino,
    fromAmino: MsgUpdateClassIssuers.fromAmino
  },
  "/regen.ecocredit.v1alpha1.MsgUpdateClassMetadata": {
    aminoType: "/regen.ecocredit.v1alpha1.MsgUpdateClassMetadata",
    toAmino: MsgUpdateClassMetadata.toAmino,
    fromAmino: MsgUpdateClassMetadata.fromAmino
  }
};