import { MsgCreatePool, MsgJoinPool, MsgExitPool, MsgUpFrontSwapExactAmountIn, MsgSwapExactAmountIn, MsgSwapExactAmountOut, MsgSwapByDenom, MsgFeedMultipleExternalLiquidity, MsgUpdatePoolParams, MsgUpdateParams } from "./tx";
export const AminoConverter = {
  "/elys.amm.MsgCreatePool": {
    aminoType: "amm/MsgCreatePool",
    toAmino: MsgCreatePool.toAmino,
    fromAmino: MsgCreatePool.fromAmino
  },
  "/elys.amm.MsgJoinPool": {
    aminoType: "amm/MsgJoinPool",
    toAmino: MsgJoinPool.toAmino,
    fromAmino: MsgJoinPool.fromAmino
  },
  "/elys.amm.MsgExitPool": {
    aminoType: "amm/MsgExitPool",
    toAmino: MsgExitPool.toAmino,
    fromAmino: MsgExitPool.fromAmino
  },
  "/elys.amm.MsgUpFrontSwapExactAmountIn": {
    aminoType: "amm/MsgUpFrontSwapExactAmountIn",
    toAmino: MsgUpFrontSwapExactAmountIn.toAmino,
    fromAmino: MsgUpFrontSwapExactAmountIn.fromAmino
  },
  "/elys.amm.MsgSwapExactAmountIn": {
    aminoType: "amm/MsgSwapExactAmountIn",
    toAmino: MsgSwapExactAmountIn.toAmino,
    fromAmino: MsgSwapExactAmountIn.fromAmino
  },
  "/elys.amm.MsgSwapExactAmountOut": {
    aminoType: "amm/MsgSwapExactAmountOut",
    toAmino: MsgSwapExactAmountOut.toAmino,
    fromAmino: MsgSwapExactAmountOut.fromAmino
  },
  "/elys.amm.MsgSwapByDenom": {
    aminoType: "amm/MsgSwapByDenom",
    toAmino: MsgSwapByDenom.toAmino,
    fromAmino: MsgSwapByDenom.fromAmino
  },
  "/elys.amm.MsgFeedMultipleExternalLiquidity": {
    aminoType: "amm/MsgFeedMultipleExternalLiquidity",
    toAmino: MsgFeedMultipleExternalLiquidity.toAmino,
    fromAmino: MsgFeedMultipleExternalLiquidity.fromAmino
  },
  "/elys.amm.MsgUpdatePoolParams": {
    aminoType: "amm/MsgUpdatePoolParams",
    toAmino: MsgUpdatePoolParams.toAmino,
    fromAmino: MsgUpdatePoolParams.fromAmino
  },
  "/elys.amm.MsgUpdateParams": {
    aminoType: "amm/MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  }
};