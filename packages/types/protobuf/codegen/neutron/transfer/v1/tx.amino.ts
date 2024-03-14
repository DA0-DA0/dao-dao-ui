import { MsgTransfer } from "./tx";
export const AminoConverter = {
  "/neutron.transfer.MsgTransfer": {
    aminoType: "/neutron.transfer.MsgTransfer",
    toAmino: MsgTransfer.toAmino,
    fromAmino: MsgTransfer.fromAmino
  }
};