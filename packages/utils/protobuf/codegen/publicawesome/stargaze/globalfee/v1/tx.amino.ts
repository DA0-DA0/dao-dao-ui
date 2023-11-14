import { MsgSetCodeAuthorization, MsgRemoveCodeAuthorization, MsgSetContractAuthorization, MsgRemoveContractAuthorization, MsgUpdateParams } from "./tx";
export const AminoConverter = {
  "/publicawesome.stargaze.globalfee.v1.MsgSetCodeAuthorization": {
    aminoType: "/publicawesome.stargaze.globalfee.v1.MsgSetCodeAuthorization",
    toAmino: MsgSetCodeAuthorization.toAmino,
    fromAmino: MsgSetCodeAuthorization.fromAmino
  },
  "/publicawesome.stargaze.globalfee.v1.MsgRemoveCodeAuthorization": {
    aminoType: "/publicawesome.stargaze.globalfee.v1.MsgRemoveCodeAuthorization",
    toAmino: MsgRemoveCodeAuthorization.toAmino,
    fromAmino: MsgRemoveCodeAuthorization.fromAmino
  },
  "/publicawesome.stargaze.globalfee.v1.MsgSetContractAuthorization": {
    aminoType: "/publicawesome.stargaze.globalfee.v1.MsgSetContractAuthorization",
    toAmino: MsgSetContractAuthorization.toAmino,
    fromAmino: MsgSetContractAuthorization.fromAmino
  },
  "/publicawesome.stargaze.globalfee.v1.MsgRemoveContractAuthorization": {
    aminoType: "/publicawesome.stargaze.globalfee.v1.MsgRemoveContractAuthorization",
    toAmino: MsgRemoveContractAuthorization.toAmino,
    fromAmino: MsgRemoveContractAuthorization.fromAmino
  },
  "/publicawesome.stargaze.globalfee.v1.MsgUpdateParams": {
    aminoType: "/publicawesome.stargaze.globalfee.v1.MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  }
};