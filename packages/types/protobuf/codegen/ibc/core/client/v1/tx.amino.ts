import { MsgCreateClient, MsgUpdateClient, MsgUpgradeClient, MsgSubmitMisbehaviour, MsgUpdateParams } from "./tx";
export const AminoConverter = {
  "/ibc.core.client.v1.MsgCreateClient": {
    aminoType: "cosmos-sdk/MsgCreateClient",
    toAmino: MsgCreateClient.toAmino,
    fromAmino: MsgCreateClient.fromAmino
  },
  "/ibc.core.client.v1.MsgUpdateClient": {
    aminoType: "cosmos-sdk/MsgUpdateClient",
    toAmino: MsgUpdateClient.toAmino,
    fromAmino: MsgUpdateClient.fromAmino
  },
  "/ibc.core.client.v1.MsgUpgradeClient": {
    aminoType: "cosmos-sdk/MsgUpgradeClient",
    toAmino: MsgUpgradeClient.toAmino,
    fromAmino: MsgUpgradeClient.fromAmino
  },
  "/ibc.core.client.v1.MsgSubmitMisbehaviour": {
    aminoType: "cosmos-sdk/MsgSubmitMisbehaviour",
    toAmino: MsgSubmitMisbehaviour.toAmino,
    fromAmino: MsgSubmitMisbehaviour.fromAmino
  },
  "/ibc.core.client.v1.MsgUpdateParams": {
    aminoType: "cosmos-sdk/MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  }
};