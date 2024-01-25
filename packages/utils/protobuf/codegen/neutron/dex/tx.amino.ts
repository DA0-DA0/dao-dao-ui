import { MsgDeposit, MsgWithdrawal, MsgPlaceLimitOrder, MsgWithdrawFilledLimitOrder, MsgCancelLimitOrder, MsgMultiHopSwap, MsgUpdateParams } from "./tx";
export const AminoConverter = {
  "/neutron.dex.MsgDeposit": {
    aminoType: "/neutron.dex.MsgDeposit",
    toAmino: MsgDeposit.toAmino,
    fromAmino: MsgDeposit.fromAmino
  },
  "/neutron.dex.MsgWithdrawal": {
    aminoType: "/neutron.dex.MsgWithdrawal",
    toAmino: MsgWithdrawal.toAmino,
    fromAmino: MsgWithdrawal.fromAmino
  },
  "/neutron.dex.MsgPlaceLimitOrder": {
    aminoType: "/neutron.dex.MsgPlaceLimitOrder",
    toAmino: MsgPlaceLimitOrder.toAmino,
    fromAmino: MsgPlaceLimitOrder.fromAmino
  },
  "/neutron.dex.MsgWithdrawFilledLimitOrder": {
    aminoType: "/neutron.dex.MsgWithdrawFilledLimitOrder",
    toAmino: MsgWithdrawFilledLimitOrder.toAmino,
    fromAmino: MsgWithdrawFilledLimitOrder.fromAmino
  },
  "/neutron.dex.MsgCancelLimitOrder": {
    aminoType: "/neutron.dex.MsgCancelLimitOrder",
    toAmino: MsgCancelLimitOrder.toAmino,
    fromAmino: MsgCancelLimitOrder.fromAmino
  },
  "/neutron.dex.MsgMultiHopSwap": {
    aminoType: "/neutron.dex.MsgMultiHopSwap",
    toAmino: MsgMultiHopSwap.toAmino,
    fromAmino: MsgMultiHopSwap.fromAmino
  },
  "/neutron.dex.MsgUpdateParams": {
    aminoType: "dex/MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  }
};