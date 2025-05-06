import { MsgDeposit, MsgWithdrawal, MsgPlaceLimitOrder, MsgWithdrawFilledLimitOrder, MsgCancelLimitOrder, MsgMultiHopSwap, MsgUpdateParams } from "./tx";
export const AminoConverter = {
  "/neutron.dex.MsgDeposit": {
    aminoType: "dex/MsgDeposit",
    toAmino: MsgDeposit.toAmino,
    fromAmino: MsgDeposit.fromAmino
  },
  "/neutron.dex.MsgWithdrawal": {
    aminoType: "dex/MsgWithdrawal",
    toAmino: MsgWithdrawal.toAmino,
    fromAmino: MsgWithdrawal.fromAmino
  },
  "/neutron.dex.MsgPlaceLimitOrder": {
    aminoType: "dex/MsgPlaceLimitOrder",
    toAmino: MsgPlaceLimitOrder.toAmino,
    fromAmino: MsgPlaceLimitOrder.fromAmino
  },
  "/neutron.dex.MsgWithdrawFilledLimitOrder": {
    aminoType: "dex/MsgWithdrawFilledLimitOrder",
    toAmino: MsgWithdrawFilledLimitOrder.toAmino,
    fromAmino: MsgWithdrawFilledLimitOrder.fromAmino
  },
  "/neutron.dex.MsgCancelLimitOrder": {
    aminoType: "dex/MsgCancelLimitOrder",
    toAmino: MsgCancelLimitOrder.toAmino,
    fromAmino: MsgCancelLimitOrder.fromAmino
  },
  "/neutron.dex.MsgMultiHopSwap": {
    aminoType: "dex/MsgMultiHopSwap",
    toAmino: MsgMultiHopSwap.toAmino,
    fromAmino: MsgMultiHopSwap.fromAmino
  },
  "/neutron.dex.MsgUpdateParams": {
    aminoType: "dex/MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  }
};