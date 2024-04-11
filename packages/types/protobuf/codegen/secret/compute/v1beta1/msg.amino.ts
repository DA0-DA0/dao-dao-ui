import { MsgStoreCode, MsgInstantiateContract, MsgExecuteContract, MsgMigrateContract, MsgUpdateAdmin, MsgClearAdmin } from "./msg";
export const AminoConverter = {
  "/secret.compute.v1beta1.MsgStoreCode": {
    aminoType: "/secret.compute.v1beta1.MsgStoreCode",
    toAmino: MsgStoreCode.toAmino,
    fromAmino: MsgStoreCode.fromAmino
  },
  "/secret.compute.v1beta1.MsgInstantiateContract": {
    aminoType: "/secret.compute.v1beta1.MsgInstantiateContract",
    toAmino: MsgInstantiateContract.toAmino,
    fromAmino: MsgInstantiateContract.fromAmino
  },
  "/secret.compute.v1beta1.MsgExecuteContract": {
    aminoType: "/secret.compute.v1beta1.MsgExecuteContract",
    toAmino: MsgExecuteContract.toAmino,
    fromAmino: MsgExecuteContract.fromAmino
  },
  "/secret.compute.v1beta1.MsgMigrateContract": {
    aminoType: "/secret.compute.v1beta1.MsgMigrateContract",
    toAmino: MsgMigrateContract.toAmino,
    fromAmino: MsgMigrateContract.fromAmino
  },
  "/secret.compute.v1beta1.MsgUpdateAdmin": {
    aminoType: "/secret.compute.v1beta1.MsgUpdateAdmin",
    toAmino: MsgUpdateAdmin.toAmino,
    fromAmino: MsgUpdateAdmin.fromAmino
  },
  "/secret.compute.v1beta1.MsgClearAdmin": {
    aminoType: "/secret.compute.v1beta1.MsgClearAdmin",
    toAmino: MsgClearAdmin.toAmino,
    fromAmino: MsgClearAdmin.fromAmino
  }
};