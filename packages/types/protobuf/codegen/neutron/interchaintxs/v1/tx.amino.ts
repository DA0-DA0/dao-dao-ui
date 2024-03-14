import { MsgRegisterInterchainAccount, MsgSubmitTx, MsgUpdateParams } from "./tx";
export const AminoConverter = {
  "/neutron.interchaintxs.v1.MsgRegisterInterchainAccount": {
    aminoType: "/neutron.interchaintxs.v1.MsgRegisterInterchainAccount",
    toAmino: MsgRegisterInterchainAccount.toAmino,
    fromAmino: MsgRegisterInterchainAccount.fromAmino
  },
  "/neutron.interchaintxs.v1.MsgSubmitTx": {
    aminoType: "/neutron.interchaintxs.v1.MsgSubmitTx",
    toAmino: MsgSubmitTx.toAmino,
    fromAmino: MsgSubmitTx.fromAmino
  },
  "/neutron.interchaintxs.v1.MsgUpdateParams": {
    aminoType: "interchaintxs/MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  }
};