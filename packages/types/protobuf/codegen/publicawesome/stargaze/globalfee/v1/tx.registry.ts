//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgSetCodeAuthorization, MsgRemoveCodeAuthorization, MsgSetContractAuthorization, MsgRemoveContractAuthorization, MsgUpdateParams } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/publicawesome.stargaze.globalfee.v1.MsgSetCodeAuthorization", MsgSetCodeAuthorization], ["/publicawesome.stargaze.globalfee.v1.MsgRemoveCodeAuthorization", MsgRemoveCodeAuthorization], ["/publicawesome.stargaze.globalfee.v1.MsgSetContractAuthorization", MsgSetContractAuthorization], ["/publicawesome.stargaze.globalfee.v1.MsgRemoveContractAuthorization", MsgRemoveContractAuthorization], ["/publicawesome.stargaze.globalfee.v1.MsgUpdateParams", MsgUpdateParams]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    setCodeAuthorization(value: MsgSetCodeAuthorization) {
      return {
        typeUrl: "/publicawesome.stargaze.globalfee.v1.MsgSetCodeAuthorization",
        value: MsgSetCodeAuthorization.encode(value).finish()
      };
    },
    removeCodeAuthorization(value: MsgRemoveCodeAuthorization) {
      return {
        typeUrl: "/publicawesome.stargaze.globalfee.v1.MsgRemoveCodeAuthorization",
        value: MsgRemoveCodeAuthorization.encode(value).finish()
      };
    },
    setContractAuthorization(value: MsgSetContractAuthorization) {
      return {
        typeUrl: "/publicawesome.stargaze.globalfee.v1.MsgSetContractAuthorization",
        value: MsgSetContractAuthorization.encode(value).finish()
      };
    },
    removeContractAuthorization(value: MsgRemoveContractAuthorization) {
      return {
        typeUrl: "/publicawesome.stargaze.globalfee.v1.MsgRemoveContractAuthorization",
        value: MsgRemoveContractAuthorization.encode(value).finish()
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/publicawesome.stargaze.globalfee.v1.MsgUpdateParams",
        value: MsgUpdateParams.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    setCodeAuthorization(value: MsgSetCodeAuthorization) {
      return {
        typeUrl: "/publicawesome.stargaze.globalfee.v1.MsgSetCodeAuthorization",
        value
      };
    },
    removeCodeAuthorization(value: MsgRemoveCodeAuthorization) {
      return {
        typeUrl: "/publicawesome.stargaze.globalfee.v1.MsgRemoveCodeAuthorization",
        value
      };
    },
    setContractAuthorization(value: MsgSetContractAuthorization) {
      return {
        typeUrl: "/publicawesome.stargaze.globalfee.v1.MsgSetContractAuthorization",
        value
      };
    },
    removeContractAuthorization(value: MsgRemoveContractAuthorization) {
      return {
        typeUrl: "/publicawesome.stargaze.globalfee.v1.MsgRemoveContractAuthorization",
        value
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/publicawesome.stargaze.globalfee.v1.MsgUpdateParams",
        value
      };
    }
  },
  fromPartial: {
    setCodeAuthorization(value: MsgSetCodeAuthorization) {
      return {
        typeUrl: "/publicawesome.stargaze.globalfee.v1.MsgSetCodeAuthorization",
        value: MsgSetCodeAuthorization.fromPartial(value)
      };
    },
    removeCodeAuthorization(value: MsgRemoveCodeAuthorization) {
      return {
        typeUrl: "/publicawesome.stargaze.globalfee.v1.MsgRemoveCodeAuthorization",
        value: MsgRemoveCodeAuthorization.fromPartial(value)
      };
    },
    setContractAuthorization(value: MsgSetContractAuthorization) {
      return {
        typeUrl: "/publicawesome.stargaze.globalfee.v1.MsgSetContractAuthorization",
        value: MsgSetContractAuthorization.fromPartial(value)
      };
    },
    removeContractAuthorization(value: MsgRemoveContractAuthorization) {
      return {
        typeUrl: "/publicawesome.stargaze.globalfee.v1.MsgRemoveContractAuthorization",
        value: MsgRemoveContractAuthorization.fromPartial(value)
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/publicawesome.stargaze.globalfee.v1.MsgUpdateParams",
        value: MsgUpdateParams.fromPartial(value)
      };
    }
  }
};