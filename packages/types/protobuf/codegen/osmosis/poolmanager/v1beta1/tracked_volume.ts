import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../../binary";
export interface TrackedVolume {
  amount: Coin[];
}
export interface TrackedVolumeProtoMsg {
  typeUrl: "/osmosis.poolmanager.v1beta1.TrackedVolume";
  value: Uint8Array;
}
export interface TrackedVolumeAmino {
  amount?: CoinAmino[];
}
export interface TrackedVolumeAminoMsg {
  type: "osmosis/poolmanager/tracked-volume";
  value: TrackedVolumeAmino;
}
export interface TrackedVolumeSDKType {
  amount: CoinSDKType[];
}
function createBaseTrackedVolume(): TrackedVolume {
  return {
    amount: []
  };
}
export const TrackedVolume = {
  typeUrl: "/osmosis.poolmanager.v1beta1.TrackedVolume",
  encode(message: TrackedVolume, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.amount) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): TrackedVolume {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTrackedVolume();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.amount.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<TrackedVolume>): TrackedVolume {
    const message = createBaseTrackedVolume();
    message.amount = object.amount?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: TrackedVolumeAmino): TrackedVolume {
    const message = createBaseTrackedVolume();
    message.amount = object.amount?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: TrackedVolume, useInterfaces: boolean = false): TrackedVolumeAmino {
    const obj: any = {};
    if (message.amount) {
      obj.amount = message.amount.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.amount = message.amount;
    }
    return obj;
  },
  fromAminoMsg(object: TrackedVolumeAminoMsg): TrackedVolume {
    return TrackedVolume.fromAmino(object.value);
  },
  toAminoMsg(message: TrackedVolume, useInterfaces: boolean = false): TrackedVolumeAminoMsg {
    return {
      type: "osmosis/poolmanager/tracked-volume",
      value: TrackedVolume.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: TrackedVolumeProtoMsg, useInterfaces: boolean = false): TrackedVolume {
    return TrackedVolume.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: TrackedVolume): Uint8Array {
    return TrackedVolume.encode(message).finish();
  },
  toProtoMsg(message: TrackedVolume): TrackedVolumeProtoMsg {
    return {
      typeUrl: "/osmosis.poolmanager.v1beta1.TrackedVolume",
      value: TrackedVolume.encode(message).finish()
    };
  }
};