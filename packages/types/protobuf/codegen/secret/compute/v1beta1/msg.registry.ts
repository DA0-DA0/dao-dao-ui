//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgStoreCode, MsgInstantiateContract, MsgExecuteContract, MsgMigrateContract, MsgUpdateAdmin, MsgClearAdmin } from "./msg";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/secret.compute.v1beta1.MsgStoreCode", MsgStoreCode], ["/secret.compute.v1beta1.MsgInstantiateContract", MsgInstantiateContract], ["/secret.compute.v1beta1.MsgExecuteContract", MsgExecuteContract], ["/secret.compute.v1beta1.MsgMigrateContract", MsgMigrateContract], ["/secret.compute.v1beta1.MsgUpdateAdmin", MsgUpdateAdmin], ["/secret.compute.v1beta1.MsgClearAdmin", MsgClearAdmin]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    storeCode(value: MsgStoreCode) {
      return {
        typeUrl: "/secret.compute.v1beta1.MsgStoreCode",
        value: MsgStoreCode.encode(value).finish()
      };
    },
    instantiateContract(value: MsgInstantiateContract) {
      return {
        typeUrl: "/secret.compute.v1beta1.MsgInstantiateContract",
        value: MsgInstantiateContract.encode(value).finish()
      };
    },
    executeContract(value: MsgExecuteContract) {
      return {
        typeUrl: "/secret.compute.v1beta1.MsgExecuteContract",
        value: MsgExecuteContract.encode(value).finish()
      };
    },
    migrateContract(value: MsgMigrateContract) {
      return {
        typeUrl: "/secret.compute.v1beta1.MsgMigrateContract",
        value: MsgMigrateContract.encode(value).finish()
      };
    },
    updateAdmin(value: MsgUpdateAdmin) {
      return {
        typeUrl: "/secret.compute.v1beta1.MsgUpdateAdmin",
        value: MsgUpdateAdmin.encode(value).finish()
      };
    },
    clearAdmin(value: MsgClearAdmin) {
      return {
        typeUrl: "/secret.compute.v1beta1.MsgClearAdmin",
        value: MsgClearAdmin.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    storeCode(value: MsgStoreCode) {
      return {
        typeUrl: "/secret.compute.v1beta1.MsgStoreCode",
        value
      };
    },
    instantiateContract(value: MsgInstantiateContract) {
      return {
        typeUrl: "/secret.compute.v1beta1.MsgInstantiateContract",
        value
      };
    },
    executeContract(value: MsgExecuteContract) {
      return {
        typeUrl: "/secret.compute.v1beta1.MsgExecuteContract",
        value
      };
    },
    migrateContract(value: MsgMigrateContract) {
      return {
        typeUrl: "/secret.compute.v1beta1.MsgMigrateContract",
        value
      };
    },
    updateAdmin(value: MsgUpdateAdmin) {
      return {
        typeUrl: "/secret.compute.v1beta1.MsgUpdateAdmin",
        value
      };
    },
    clearAdmin(value: MsgClearAdmin) {
      return {
        typeUrl: "/secret.compute.v1beta1.MsgClearAdmin",
        value
      };
    }
  },
  fromPartial: {
    storeCode(value: MsgStoreCode) {
      return {
        typeUrl: "/secret.compute.v1beta1.MsgStoreCode",
        value: MsgStoreCode.fromPartial(value)
      };
    },
    instantiateContract(value: MsgInstantiateContract) {
      return {
        typeUrl: "/secret.compute.v1beta1.MsgInstantiateContract",
        value: MsgInstantiateContract.fromPartial(value)
      };
    },
    executeContract(value: MsgExecuteContract) {
      return {
        typeUrl: "/secret.compute.v1beta1.MsgExecuteContract",
        value: MsgExecuteContract.fromPartial(value)
      };
    },
    migrateContract(value: MsgMigrateContract) {
      return {
        typeUrl: "/secret.compute.v1beta1.MsgMigrateContract",
        value: MsgMigrateContract.fromPartial(value)
      };
    },
    updateAdmin(value: MsgUpdateAdmin) {
      return {
        typeUrl: "/secret.compute.v1beta1.MsgUpdateAdmin",
        value: MsgUpdateAdmin.fromPartial(value)
      };
    },
    clearAdmin(value: MsgClearAdmin) {
      return {
        typeUrl: "/secret.compute.v1beta1.MsgClearAdmin",
        value: MsgClearAdmin.fromPartial(value)
      };
    }
  }
};