import { Coin, CoinAmino, CoinSDKType } from "../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../binary";
/** TotalBurnedNeutronsAmount defines total amount of burned neutron fees */
export interface TotalBurnedNeutronsAmount {
  coin: Coin | undefined;
}
export interface TotalBurnedNeutronsAmountProtoMsg {
  typeUrl: "/neutron.feeburner.TotalBurnedNeutronsAmount";
  value: Uint8Array;
}
/** TotalBurnedNeutronsAmount defines total amount of burned neutron fees */
export interface TotalBurnedNeutronsAmountAmino {
  coin?: CoinAmino | undefined;
}
export interface TotalBurnedNeutronsAmountAminoMsg {
  type: "/neutron.feeburner.TotalBurnedNeutronsAmount";
  value: TotalBurnedNeutronsAmountAmino;
}
/** TotalBurnedNeutronsAmount defines total amount of burned neutron fees */
export interface TotalBurnedNeutronsAmountSDKType {
  coin: CoinSDKType | undefined;
}
function createBaseTotalBurnedNeutronsAmount(): TotalBurnedNeutronsAmount {
  return {
    coin: Coin.fromPartial({})
  };
}
export const TotalBurnedNeutronsAmount = {
  typeUrl: "/neutron.feeburner.TotalBurnedNeutronsAmount",
  encode(message: TotalBurnedNeutronsAmount, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.coin !== undefined) {
      Coin.encode(message.coin, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): TotalBurnedNeutronsAmount {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTotalBurnedNeutronsAmount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.coin = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<TotalBurnedNeutronsAmount>): TotalBurnedNeutronsAmount {
    const message = createBaseTotalBurnedNeutronsAmount();
    message.coin = object.coin !== undefined && object.coin !== null ? Coin.fromPartial(object.coin) : undefined;
    return message;
  },
  fromAmino(object: TotalBurnedNeutronsAmountAmino): TotalBurnedNeutronsAmount {
    const message = createBaseTotalBurnedNeutronsAmount();
    if (object.coin !== undefined && object.coin !== null) {
      message.coin = Coin.fromAmino(object.coin);
    }
    return message;
  },
  toAmino(message: TotalBurnedNeutronsAmount, useInterfaces: boolean = false): TotalBurnedNeutronsAmountAmino {
    const obj: any = {};
    obj.coin = message.coin ? Coin.toAmino(message.coin, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: TotalBurnedNeutronsAmountAminoMsg): TotalBurnedNeutronsAmount {
    return TotalBurnedNeutronsAmount.fromAmino(object.value);
  },
  fromProtoMsg(message: TotalBurnedNeutronsAmountProtoMsg, useInterfaces: boolean = false): TotalBurnedNeutronsAmount {
    return TotalBurnedNeutronsAmount.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: TotalBurnedNeutronsAmount): Uint8Array {
    return TotalBurnedNeutronsAmount.encode(message).finish();
  },
  toProtoMsg(message: TotalBurnedNeutronsAmount): TotalBurnedNeutronsAmountProtoMsg {
    return {
      typeUrl: "/neutron.feeburner.TotalBurnedNeutronsAmount",
      value: TotalBurnedNeutronsAmount.encode(message).finish()
    };
  }
};