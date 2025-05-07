import { MsgBond, MsgUnbond, MsgUpdateParams, MsgAddPool, MsgUpdatePool } from "./tx";
export const AminoConverter = {
  "/elys.stablestake.MsgBond": {
    aminoType: "stablestake/MsgBond",
    toAmino: MsgBond.toAmino,
    fromAmino: MsgBond.fromAmino
  },
  "/elys.stablestake.MsgUnbond": {
    aminoType: "stablestake/MsgUnbond",
    toAmino: MsgUnbond.toAmino,
    fromAmino: MsgUnbond.fromAmino
  },
  "/elys.stablestake.MsgUpdateParams": {
    aminoType: "stablestake/MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  },
  "/elys.stablestake.MsgAddPool": {
    aminoType: "stablestake/MsgAddPool",
    toAmino: MsgAddPool.toAmino,
    fromAmino: MsgAddPool.fromAmino
  },
  "/elys.stablestake.MsgUpdatePool": {
    aminoType: "stablestake/MsgUpdatePool",
    toAmino: MsgUpdatePool.toAmino,
    fromAmino: MsgUpdatePool.fromAmino
  }
};