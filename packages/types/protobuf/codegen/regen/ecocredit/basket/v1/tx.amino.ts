import { MsgCreate, MsgPut, MsgTake, MsgUpdateBasketFee, MsgUpdateCurator, MsgUpdateDateCriteria } from "./tx";
export const AminoConverter = {
  "/regen.ecocredit.basket.v1.MsgCreate": {
    aminoType: "/regen.ecocredit.basket.v1.MsgCreate",
    toAmino: MsgCreate.toAmino,
    fromAmino: MsgCreate.fromAmino
  },
  "/regen.ecocredit.basket.v1.MsgPut": {
    aminoType: "/regen.ecocredit.basket.v1.MsgPut",
    toAmino: MsgPut.toAmino,
    fromAmino: MsgPut.fromAmino
  },
  "/regen.ecocredit.basket.v1.MsgTake": {
    aminoType: "/regen.ecocredit.basket.v1.MsgTake",
    toAmino: MsgTake.toAmino,
    fromAmino: MsgTake.fromAmino
  },
  "/regen.ecocredit.basket.v1.MsgUpdateBasketFee": {
    aminoType: "/regen.ecocredit.basket.v1.MsgUpdateBasketFee",
    toAmino: MsgUpdateBasketFee.toAmino,
    fromAmino: MsgUpdateBasketFee.fromAmino
  },
  "/regen.ecocredit.basket.v1.MsgUpdateCurator": {
    aminoType: "/regen.ecocredit.basket.v1.MsgUpdateCurator",
    toAmino: MsgUpdateCurator.toAmino,
    fromAmino: MsgUpdateCurator.fromAmino
  },
  "/regen.ecocredit.basket.v1.MsgUpdateDateCriteria": {
    aminoType: "/regen.ecocredit.basket.v1.MsgUpdateDateCriteria",
    toAmino: MsgUpdateDateCriteria.toAmino,
    fromAmino: MsgUpdateDateCriteria.fromAmino
  }
};