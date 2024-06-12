import { MsgAddAuthenticator, MsgRemoveAuthenticator, MsgSetActiveState } from "./tx";
export const AminoConverter = {
  "/osmosis.smartaccount.v1beta1.MsgAddAuthenticator": {
    aminoType: "osmosis/MsgAddAuthenticator",
    toAmino: MsgAddAuthenticator.toAmino,
    fromAmino: MsgAddAuthenticator.fromAmino
  },
  "/osmosis.smartaccount.v1beta1.MsgRemoveAuthenticator": {
    aminoType: "osmosis/MsgRemoveAuthenticator",
    toAmino: MsgRemoveAuthenticator.toAmino,
    fromAmino: MsgRemoveAuthenticator.fromAmino
  },
  "/osmosis.smartaccount.v1beta1.MsgSetActiveState": {
    aminoType: "osmosis/MsgSetActiveState",
    toAmino: MsgSetActiveState.toAmino,
    fromAmino: MsgSetActiveState.fromAmino
  }
};