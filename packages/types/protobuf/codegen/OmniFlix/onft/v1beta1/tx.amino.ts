import { MsgCreateDenom, MsgUpdateDenom, MsgTransferDenom, MsgPurgeDenom, MsgMintONFT, MsgTransferONFT, MsgBurnONFT, MsgUpdateParams } from "./tx";
export const AminoConverter = {
  "/OmniFlix.onft.v1beta1.MsgCreateDenom": {
    aminoType: "OmniFlix/onft/MsgCreateDenom",
    toAmino: MsgCreateDenom.toAmino,
    fromAmino: MsgCreateDenom.fromAmino
  },
  "/OmniFlix.onft.v1beta1.MsgUpdateDenom": {
    aminoType: "OmniFlix/onft/MsgUpdateDenom",
    toAmino: MsgUpdateDenom.toAmino,
    fromAmino: MsgUpdateDenom.fromAmino
  },
  "/OmniFlix.onft.v1beta1.MsgTransferDenom": {
    aminoType: "OmniFlix/onft/MsgTransferDenom",
    toAmino: MsgTransferDenom.toAmino,
    fromAmino: MsgTransferDenom.fromAmino
  },
  "/OmniFlix.onft.v1beta1.MsgPurgeDenom": {
    aminoType: "OmniFlix/onft/MsgPurgeDenom",
    toAmino: MsgPurgeDenom.toAmino,
    fromAmino: MsgPurgeDenom.fromAmino
  },
  "/OmniFlix.onft.v1beta1.MsgMintONFT": {
    aminoType: "OmniFlix/onft/MsgMintONFT",
    toAmino: MsgMintONFT.toAmino,
    fromAmino: MsgMintONFT.fromAmino
  },
  "/OmniFlix.onft.v1beta1.MsgTransferONFT": {
    aminoType: "OmniFlix/onft/MsgTransferONFT",
    toAmino: MsgTransferONFT.toAmino,
    fromAmino: MsgTransferONFT.fromAmino
  },
  "/OmniFlix.onft.v1beta1.MsgBurnONFT": {
    aminoType: "OmniFlix/onft/MsgBurnONFT",
    toAmino: MsgBurnONFT.toAmino,
    fromAmino: MsgBurnONFT.fromAmino
  },
  "/OmniFlix.onft.v1beta1.MsgUpdateParams": {
    aminoType: "/OmniFlix.onft.v1beta1.MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  }
};