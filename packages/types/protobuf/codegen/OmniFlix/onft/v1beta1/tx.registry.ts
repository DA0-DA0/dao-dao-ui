//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgCreateDenom, MsgUpdateDenom, MsgTransferDenom, MsgPurgeDenom, MsgMintONFT, MsgTransferONFT, MsgBurnONFT, MsgUpdateParams } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/OmniFlix.onft.v1beta1.MsgCreateDenom", MsgCreateDenom], ["/OmniFlix.onft.v1beta1.MsgUpdateDenom", MsgUpdateDenom], ["/OmniFlix.onft.v1beta1.MsgTransferDenom", MsgTransferDenom], ["/OmniFlix.onft.v1beta1.MsgPurgeDenom", MsgPurgeDenom], ["/OmniFlix.onft.v1beta1.MsgMintONFT", MsgMintONFT], ["/OmniFlix.onft.v1beta1.MsgTransferONFT", MsgTransferONFT], ["/OmniFlix.onft.v1beta1.MsgBurnONFT", MsgBurnONFT], ["/OmniFlix.onft.v1beta1.MsgUpdateParams", MsgUpdateParams]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    createDenom(value: MsgCreateDenom) {
      return {
        typeUrl: "/OmniFlix.onft.v1beta1.MsgCreateDenom",
        value: MsgCreateDenom.encode(value).finish()
      };
    },
    updateDenom(value: MsgUpdateDenom) {
      return {
        typeUrl: "/OmniFlix.onft.v1beta1.MsgUpdateDenom",
        value: MsgUpdateDenom.encode(value).finish()
      };
    },
    transferDenom(value: MsgTransferDenom) {
      return {
        typeUrl: "/OmniFlix.onft.v1beta1.MsgTransferDenom",
        value: MsgTransferDenom.encode(value).finish()
      };
    },
    purgeDenom(value: MsgPurgeDenom) {
      return {
        typeUrl: "/OmniFlix.onft.v1beta1.MsgPurgeDenom",
        value: MsgPurgeDenom.encode(value).finish()
      };
    },
    mintONFT(value: MsgMintONFT) {
      return {
        typeUrl: "/OmniFlix.onft.v1beta1.MsgMintONFT",
        value: MsgMintONFT.encode(value).finish()
      };
    },
    transferONFT(value: MsgTransferONFT) {
      return {
        typeUrl: "/OmniFlix.onft.v1beta1.MsgTransferONFT",
        value: MsgTransferONFT.encode(value).finish()
      };
    },
    burnONFT(value: MsgBurnONFT) {
      return {
        typeUrl: "/OmniFlix.onft.v1beta1.MsgBurnONFT",
        value: MsgBurnONFT.encode(value).finish()
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/OmniFlix.onft.v1beta1.MsgUpdateParams",
        value: MsgUpdateParams.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    createDenom(value: MsgCreateDenom) {
      return {
        typeUrl: "/OmniFlix.onft.v1beta1.MsgCreateDenom",
        value
      };
    },
    updateDenom(value: MsgUpdateDenom) {
      return {
        typeUrl: "/OmniFlix.onft.v1beta1.MsgUpdateDenom",
        value
      };
    },
    transferDenom(value: MsgTransferDenom) {
      return {
        typeUrl: "/OmniFlix.onft.v1beta1.MsgTransferDenom",
        value
      };
    },
    purgeDenom(value: MsgPurgeDenom) {
      return {
        typeUrl: "/OmniFlix.onft.v1beta1.MsgPurgeDenom",
        value
      };
    },
    mintONFT(value: MsgMintONFT) {
      return {
        typeUrl: "/OmniFlix.onft.v1beta1.MsgMintONFT",
        value
      };
    },
    transferONFT(value: MsgTransferONFT) {
      return {
        typeUrl: "/OmniFlix.onft.v1beta1.MsgTransferONFT",
        value
      };
    },
    burnONFT(value: MsgBurnONFT) {
      return {
        typeUrl: "/OmniFlix.onft.v1beta1.MsgBurnONFT",
        value
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/OmniFlix.onft.v1beta1.MsgUpdateParams",
        value
      };
    }
  },
  fromPartial: {
    createDenom(value: MsgCreateDenom) {
      return {
        typeUrl: "/OmniFlix.onft.v1beta1.MsgCreateDenom",
        value: MsgCreateDenom.fromPartial(value)
      };
    },
    updateDenom(value: MsgUpdateDenom) {
      return {
        typeUrl: "/OmniFlix.onft.v1beta1.MsgUpdateDenom",
        value: MsgUpdateDenom.fromPartial(value)
      };
    },
    transferDenom(value: MsgTransferDenom) {
      return {
        typeUrl: "/OmniFlix.onft.v1beta1.MsgTransferDenom",
        value: MsgTransferDenom.fromPartial(value)
      };
    },
    purgeDenom(value: MsgPurgeDenom) {
      return {
        typeUrl: "/OmniFlix.onft.v1beta1.MsgPurgeDenom",
        value: MsgPurgeDenom.fromPartial(value)
      };
    },
    mintONFT(value: MsgMintONFT) {
      return {
        typeUrl: "/OmniFlix.onft.v1beta1.MsgMintONFT",
        value: MsgMintONFT.fromPartial(value)
      };
    },
    transferONFT(value: MsgTransferONFT) {
      return {
        typeUrl: "/OmniFlix.onft.v1beta1.MsgTransferONFT",
        value: MsgTransferONFT.fromPartial(value)
      };
    },
    burnONFT(value: MsgBurnONFT) {
      return {
        typeUrl: "/OmniFlix.onft.v1beta1.MsgBurnONFT",
        value: MsgBurnONFT.fromPartial(value)
      };
    },
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/OmniFlix.onft.v1beta1.MsgUpdateParams",
        value: MsgUpdateParams.fromPartial(value)
      };
    }
  }
};