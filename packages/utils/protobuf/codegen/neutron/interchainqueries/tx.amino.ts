import { MsgRegisterInterchainQuery, MsgSubmitQueryResult, MsgRemoveInterchainQueryRequest, MsgUpdateInterchainQueryRequest, MsgUpdateParams } from "./tx";
export const AminoConverter = {
  "/neutron.interchainqueries.MsgRegisterInterchainQuery": {
    aminoType: "/neutron.interchainqueries.MsgRegisterInterchainQuery",
    toAmino: MsgRegisterInterchainQuery.toAmino,
    fromAmino: MsgRegisterInterchainQuery.fromAmino
  },
  "/neutron.interchainqueries.MsgSubmitQueryResult": {
    aminoType: "/neutron.interchainqueries.MsgSubmitQueryResult",
    toAmino: MsgSubmitQueryResult.toAmino,
    fromAmino: MsgSubmitQueryResult.fromAmino
  },
  "/neutron.interchainqueries.MsgRemoveInterchainQueryRequest": {
    aminoType: "/neutron.interchainqueries.MsgRemoveInterchainQueryRequest",
    toAmino: MsgRemoveInterchainQueryRequest.toAmino,
    fromAmino: MsgRemoveInterchainQueryRequest.fromAmino
  },
  "/neutron.interchainqueries.MsgUpdateInterchainQueryRequest": {
    aminoType: "/neutron.interchainqueries.MsgUpdateInterchainQueryRequest",
    toAmino: MsgUpdateInterchainQueryRequest.toAmino,
    fromAmino: MsgUpdateInterchainQueryRequest.fromAmino
  },
  "/neutron.interchainqueries.MsgUpdateParams": {
    aminoType: "interchainqueries/MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  }
};