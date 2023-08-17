import { MsgSetHotRoutes, MsgSetDeveloperAccount, MsgSetMaxPoolPointsPerTx, MsgSetMaxPoolPointsPerBlock, MsgSetPoolWeights, MsgSetBaseDenoms } from "./tx";
export const AminoConverter = {
  "/osmosis.protorev.v1beta1.MsgSetHotRoutes": {
    aminoType: "osmosis/MsgSetHotRoutes",
    toAmino: MsgSetHotRoutes.toAmino,
    fromAmino: MsgSetHotRoutes.fromAmino
  },
  "/osmosis.protorev.v1beta1.MsgSetDeveloperAccount": {
    aminoType: "osmosis/MsgSetDeveloperAccount",
    toAmino: MsgSetDeveloperAccount.toAmino,
    fromAmino: MsgSetDeveloperAccount.fromAmino
  },
  "/osmosis.protorev.v1beta1.MsgSetMaxPoolPointsPerTx": {
    aminoType: "osmosis/MsgSetMaxPoolPointsPerTx",
    toAmino: MsgSetMaxPoolPointsPerTx.toAmino,
    fromAmino: MsgSetMaxPoolPointsPerTx.fromAmino
  },
  "/osmosis.protorev.v1beta1.MsgSetMaxPoolPointsPerBlock": {
    aminoType: "osmosis/MsgSetPoolWeights",
    toAmino: MsgSetMaxPoolPointsPerBlock.toAmino,
    fromAmino: MsgSetMaxPoolPointsPerBlock.fromAmino
  },
  "/osmosis.protorev.v1beta1.MsgSetPoolWeights": {
    aminoType: "osmosis/MsgSetPoolWeights",
    toAmino: MsgSetPoolWeights.toAmino,
    fromAmino: MsgSetPoolWeights.fromAmino
  },
  "/osmosis.protorev.v1beta1.MsgSetBaseDenoms": {
    aminoType: "osmosis/MsgSetBaseDenoms",
    toAmino: MsgSetBaseDenoms.toAmino,
    fromAmino: MsgSetBaseDenoms.fromAmino
  }
};