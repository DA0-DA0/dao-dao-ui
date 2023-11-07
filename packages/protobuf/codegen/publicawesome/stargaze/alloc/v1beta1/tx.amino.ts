import { MsgCreateVestingAccount, MsgFundFairburnPool } from "./tx";
export const AminoConverter = {
  "/publicawesome.stargaze.alloc.v1beta1.MsgCreateVestingAccount": {
    aminoType: "/publicawesome.stargaze.alloc.v1beta1.MsgCreateVestingAccount",
    toAmino: MsgCreateVestingAccount.toAmino,
    fromAmino: MsgCreateVestingAccount.fromAmino
  },
  "/publicawesome.stargaze.alloc.v1beta1.MsgFundFairburnPool": {
    aminoType: "/publicawesome.stargaze.alloc.v1beta1.MsgFundFairburnPool",
    toAmino: MsgFundFairburnPool.toAmino,
    fromAmino: MsgFundFairburnPool.fromAmino
  }
};