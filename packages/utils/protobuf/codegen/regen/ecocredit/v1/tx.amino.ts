import { MsgCreateClass, MsgCreateProject, MsgCreateBatch, MsgMintBatchCredits, MsgSealBatch, MsgSend, MsgRetire, MsgCancel, MsgUpdateClassAdmin, MsgUpdateClassIssuers, MsgUpdateClassMetadata, MsgUpdateProjectAdmin, MsgUpdateProjectMetadata, MsgUpdateBatchMetadata, MsgBridge, MsgBridgeReceive, MsgAddCreditType, MsgSetClassCreatorAllowlist, MsgAddClassCreator, MsgRemoveClassCreator, MsgUpdateClassFee, MsgAddAllowedBridgeChain, MsgRemoveAllowedBridgeChain, MsgBurnRegen } from "./tx";
export const AminoConverter = {
  "/regen.ecocredit.v1.MsgCreateClass": {
    aminoType: "/regen.ecocredit.v1.MsgCreateClass",
    toAmino: MsgCreateClass.toAmino,
    fromAmino: MsgCreateClass.fromAmino
  },
  "/regen.ecocredit.v1.MsgCreateProject": {
    aminoType: "/regen.ecocredit.v1.MsgCreateProject",
    toAmino: MsgCreateProject.toAmino,
    fromAmino: MsgCreateProject.fromAmino
  },
  "/regen.ecocredit.v1.MsgCreateBatch": {
    aminoType: "/regen.ecocredit.v1.MsgCreateBatch",
    toAmino: MsgCreateBatch.toAmino,
    fromAmino: MsgCreateBatch.fromAmino
  },
  "/regen.ecocredit.v1.MsgMintBatchCredits": {
    aminoType: "/regen.ecocredit.v1.MsgMintBatchCredits",
    toAmino: MsgMintBatchCredits.toAmino,
    fromAmino: MsgMintBatchCredits.fromAmino
  },
  "/regen.ecocredit.v1.MsgSealBatch": {
    aminoType: "/regen.ecocredit.v1.MsgSealBatch",
    toAmino: MsgSealBatch.toAmino,
    fromAmino: MsgSealBatch.fromAmino
  },
  "/regen.ecocredit.v1.MsgSend": {
    aminoType: "/regen.ecocredit.v1.MsgSend",
    toAmino: MsgSend.toAmino,
    fromAmino: MsgSend.fromAmino
  },
  "/regen.ecocredit.v1.MsgRetire": {
    aminoType: "/regen.ecocredit.v1.MsgRetire",
    toAmino: MsgRetire.toAmino,
    fromAmino: MsgRetire.fromAmino
  },
  "/regen.ecocredit.v1.MsgCancel": {
    aminoType: "/regen.ecocredit.v1.MsgCancel",
    toAmino: MsgCancel.toAmino,
    fromAmino: MsgCancel.fromAmino
  },
  "/regen.ecocredit.v1.MsgUpdateClassAdmin": {
    aminoType: "/regen.ecocredit.v1.MsgUpdateClassAdmin",
    toAmino: MsgUpdateClassAdmin.toAmino,
    fromAmino: MsgUpdateClassAdmin.fromAmino
  },
  "/regen.ecocredit.v1.MsgUpdateClassIssuers": {
    aminoType: "/regen.ecocredit.v1.MsgUpdateClassIssuers",
    toAmino: MsgUpdateClassIssuers.toAmino,
    fromAmino: MsgUpdateClassIssuers.fromAmino
  },
  "/regen.ecocredit.v1.MsgUpdateClassMetadata": {
    aminoType: "/regen.ecocredit.v1.MsgUpdateClassMetadata",
    toAmino: MsgUpdateClassMetadata.toAmino,
    fromAmino: MsgUpdateClassMetadata.fromAmino
  },
  "/regen.ecocredit.v1.MsgUpdateProjectAdmin": {
    aminoType: "/regen.ecocredit.v1.MsgUpdateProjectAdmin",
    toAmino: MsgUpdateProjectAdmin.toAmino,
    fromAmino: MsgUpdateProjectAdmin.fromAmino
  },
  "/regen.ecocredit.v1.MsgUpdateProjectMetadata": {
    aminoType: "/regen.ecocredit.v1.MsgUpdateProjectMetadata",
    toAmino: MsgUpdateProjectMetadata.toAmino,
    fromAmino: MsgUpdateProjectMetadata.fromAmino
  },
  "/regen.ecocredit.v1.MsgUpdateBatchMetadata": {
    aminoType: "/regen.ecocredit.v1.MsgUpdateBatchMetadata",
    toAmino: MsgUpdateBatchMetadata.toAmino,
    fromAmino: MsgUpdateBatchMetadata.fromAmino
  },
  "/regen.ecocredit.v1.MsgBridge": {
    aminoType: "/regen.ecocredit.v1.MsgBridge",
    toAmino: MsgBridge.toAmino,
    fromAmino: MsgBridge.fromAmino
  },
  "/regen.ecocredit.v1.MsgBridgeReceive": {
    aminoType: "/regen.ecocredit.v1.MsgBridgeReceive",
    toAmino: MsgBridgeReceive.toAmino,
    fromAmino: MsgBridgeReceive.fromAmino
  },
  "/regen.ecocredit.v1.MsgAddCreditType": {
    aminoType: "/regen.ecocredit.v1.MsgAddCreditType",
    toAmino: MsgAddCreditType.toAmino,
    fromAmino: MsgAddCreditType.fromAmino
  },
  "/regen.ecocredit.v1.MsgSetClassCreatorAllowlist": {
    aminoType: "/regen.ecocredit.v1.MsgSetClassCreatorAllowlist",
    toAmino: MsgSetClassCreatorAllowlist.toAmino,
    fromAmino: MsgSetClassCreatorAllowlist.fromAmino
  },
  "/regen.ecocredit.v1.MsgAddClassCreator": {
    aminoType: "/regen.ecocredit.v1.MsgAddClassCreator",
    toAmino: MsgAddClassCreator.toAmino,
    fromAmino: MsgAddClassCreator.fromAmino
  },
  "/regen.ecocredit.v1.MsgRemoveClassCreator": {
    aminoType: "/regen.ecocredit.v1.MsgRemoveClassCreator",
    toAmino: MsgRemoveClassCreator.toAmino,
    fromAmino: MsgRemoveClassCreator.fromAmino
  },
  "/regen.ecocredit.v1.MsgUpdateClassFee": {
    aminoType: "/regen.ecocredit.v1.MsgUpdateClassFee",
    toAmino: MsgUpdateClassFee.toAmino,
    fromAmino: MsgUpdateClassFee.fromAmino
  },
  "/regen.ecocredit.v1.MsgAddAllowedBridgeChain": {
    aminoType: "/regen.ecocredit.v1.MsgAddAllowedBridgeChain",
    toAmino: MsgAddAllowedBridgeChain.toAmino,
    fromAmino: MsgAddAllowedBridgeChain.fromAmino
  },
  "/regen.ecocredit.v1.MsgRemoveAllowedBridgeChain": {
    aminoType: "/regen.ecocredit.v1.MsgRemoveAllowedBridgeChain",
    toAmino: MsgRemoveAllowedBridgeChain.toAmino,
    fromAmino: MsgRemoveAllowedBridgeChain.fromAmino
  },
  "/regen.ecocredit.v1.MsgBurnRegen": {
    aminoType: "/regen.ecocredit.v1.MsgBurnRegen",
    toAmino: MsgBurnRegen.toAmino,
    fromAmino: MsgBurnRegen.fromAmino
  }
};