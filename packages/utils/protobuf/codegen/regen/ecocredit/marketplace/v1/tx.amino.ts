import { MsgSell, MsgUpdateSellOrders, MsgCancelSellOrder, MsgBuyDirect, MsgAddAllowedDenom, MsgRemoveAllowedDenom } from "./tx";
export const AminoConverter = {
  "/regen.ecocredit.marketplace.v1.MsgSell": {
    aminoType: "/regen.ecocredit.marketplace.v1.MsgSell",
    toAmino: MsgSell.toAmino,
    fromAmino: MsgSell.fromAmino
  },
  "/regen.ecocredit.marketplace.v1.MsgUpdateSellOrders": {
    aminoType: "/regen.ecocredit.marketplace.v1.MsgUpdateSellOrders",
    toAmino: MsgUpdateSellOrders.toAmino,
    fromAmino: MsgUpdateSellOrders.fromAmino
  },
  "/regen.ecocredit.marketplace.v1.MsgCancelSellOrder": {
    aminoType: "/regen.ecocredit.marketplace.v1.MsgCancelSellOrder",
    toAmino: MsgCancelSellOrder.toAmino,
    fromAmino: MsgCancelSellOrder.fromAmino
  },
  "/regen.ecocredit.marketplace.v1.MsgBuyDirect": {
    aminoType: "/regen.ecocredit.marketplace.v1.MsgBuyDirect",
    toAmino: MsgBuyDirect.toAmino,
    fromAmino: MsgBuyDirect.fromAmino
  },
  "/regen.ecocredit.marketplace.v1.MsgAddAllowedDenom": {
    aminoType: "/regen.ecocredit.marketplace.v1.MsgAddAllowedDenom",
    toAmino: MsgAddAllowedDenom.toAmino,
    fromAmino: MsgAddAllowedDenom.fromAmino
  },
  "/regen.ecocredit.marketplace.v1.MsgRemoveAllowedDenom": {
    aminoType: "/regen.ecocredit.marketplace.v1.MsgRemoveAllowedDenom",
    toAmino: MsgRemoveAllowedDenom.toAmino,
    fromAmino: MsgRemoveAllowedDenom.fromAmino
  }
};