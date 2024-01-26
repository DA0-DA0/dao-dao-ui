import { TradePairID, TradePairIDAmino, TradePairIDSDKType } from "./trade_pair_id";
import { LimitOrderType, limitOrderTypeFromJSON, limitOrderTypeToJSON } from "./tx";
import { BinaryReader, BinaryWriter } from "../../binary";
export interface LimitOrderTrancheUser {
  tradePairId?: TradePairID | undefined;
  tickIndexTakerToMaker: bigint;
  trancheKey: string;
  address: string;
  sharesOwned: string;
  sharesWithdrawn: string;
  sharesCancelled: string;
  orderType: LimitOrderType;
}
export interface LimitOrderTrancheUserProtoMsg {
  typeUrl: "/neutron.dex.LimitOrderTrancheUser";
  value: Uint8Array;
}
export interface LimitOrderTrancheUserAmino {
  trade_pair_id?: TradePairIDAmino | undefined;
  tick_index_taker_to_maker?: string;
  tranche_key?: string;
  address?: string;
  shares_owned?: string;
  shares_withdrawn?: string;
  shares_cancelled?: string;
  order_type?: LimitOrderType;
}
export interface LimitOrderTrancheUserAminoMsg {
  type: "/neutron.dex.LimitOrderTrancheUser";
  value: LimitOrderTrancheUserAmino;
}
export interface LimitOrderTrancheUserSDKType {
  trade_pair_id?: TradePairIDSDKType | undefined;
  tick_index_taker_to_maker: bigint;
  tranche_key: string;
  address: string;
  shares_owned: string;
  shares_withdrawn: string;
  shares_cancelled: string;
  order_type: LimitOrderType;
}
function createBaseLimitOrderTrancheUser(): LimitOrderTrancheUser {
  return {
    tradePairId: undefined,
    tickIndexTakerToMaker: BigInt(0),
    trancheKey: "",
    address: "",
    sharesOwned: "",
    sharesWithdrawn: "",
    sharesCancelled: "",
    orderType: 0
  };
}
export const LimitOrderTrancheUser = {
  typeUrl: "/neutron.dex.LimitOrderTrancheUser",
  encode(message: LimitOrderTrancheUser, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.tradePairId !== undefined) {
      TradePairID.encode(message.tradePairId, writer.uint32(10).fork()).ldelim();
    }
    if (message.tickIndexTakerToMaker !== BigInt(0)) {
      writer.uint32(16).int64(message.tickIndexTakerToMaker);
    }
    if (message.trancheKey !== "") {
      writer.uint32(26).string(message.trancheKey);
    }
    if (message.address !== "") {
      writer.uint32(34).string(message.address);
    }
    if (message.sharesOwned !== "") {
      writer.uint32(42).string(message.sharesOwned);
    }
    if (message.sharesWithdrawn !== "") {
      writer.uint32(50).string(message.sharesWithdrawn);
    }
    if (message.sharesCancelled !== "") {
      writer.uint32(58).string(message.sharesCancelled);
    }
    if (message.orderType !== 0) {
      writer.uint32(64).int32(message.orderType);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): LimitOrderTrancheUser {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLimitOrderTrancheUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tradePairId = TradePairID.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.tickIndexTakerToMaker = reader.int64();
          break;
        case 3:
          message.trancheKey = reader.string();
          break;
        case 4:
          message.address = reader.string();
          break;
        case 5:
          message.sharesOwned = reader.string();
          break;
        case 6:
          message.sharesWithdrawn = reader.string();
          break;
        case 7:
          message.sharesCancelled = reader.string();
          break;
        case 8:
          message.orderType = (reader.int32() as any);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<LimitOrderTrancheUser>): LimitOrderTrancheUser {
    const message = createBaseLimitOrderTrancheUser();
    message.tradePairId = object.tradePairId !== undefined && object.tradePairId !== null ? TradePairID.fromPartial(object.tradePairId) : undefined;
    message.tickIndexTakerToMaker = object.tickIndexTakerToMaker !== undefined && object.tickIndexTakerToMaker !== null ? BigInt(object.tickIndexTakerToMaker.toString()) : BigInt(0);
    message.trancheKey = object.trancheKey ?? "";
    message.address = object.address ?? "";
    message.sharesOwned = object.sharesOwned ?? "";
    message.sharesWithdrawn = object.sharesWithdrawn ?? "";
    message.sharesCancelled = object.sharesCancelled ?? "";
    message.orderType = object.orderType ?? 0;
    return message;
  },
  fromAmino(object: LimitOrderTrancheUserAmino): LimitOrderTrancheUser {
    const message = createBaseLimitOrderTrancheUser();
    if (object.trade_pair_id !== undefined && object.trade_pair_id !== null) {
      message.tradePairId = TradePairID.fromAmino(object.trade_pair_id);
    }
    if (object.tick_index_taker_to_maker !== undefined && object.tick_index_taker_to_maker !== null) {
      message.tickIndexTakerToMaker = BigInt(object.tick_index_taker_to_maker);
    }
    if (object.tranche_key !== undefined && object.tranche_key !== null) {
      message.trancheKey = object.tranche_key;
    }
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    if (object.shares_owned !== undefined && object.shares_owned !== null) {
      message.sharesOwned = object.shares_owned;
    }
    if (object.shares_withdrawn !== undefined && object.shares_withdrawn !== null) {
      message.sharesWithdrawn = object.shares_withdrawn;
    }
    if (object.shares_cancelled !== undefined && object.shares_cancelled !== null) {
      message.sharesCancelled = object.shares_cancelled;
    }
    if (object.order_type !== undefined && object.order_type !== null) {
      message.orderType = limitOrderTypeFromJSON(object.order_type);
    }
    return message;
  },
  toAmino(message: LimitOrderTrancheUser, useInterfaces: boolean = false): LimitOrderTrancheUserAmino {
    const obj: any = {};
    obj.trade_pair_id = message.tradePairId ? TradePairID.toAmino(message.tradePairId, useInterfaces) : undefined;
    obj.tick_index_taker_to_maker = message.tickIndexTakerToMaker ? message.tickIndexTakerToMaker.toString() : undefined;
    obj.tranche_key = message.trancheKey;
    obj.address = message.address;
    obj.shares_owned = message.sharesOwned;
    obj.shares_withdrawn = message.sharesWithdrawn;
    obj.shares_cancelled = message.sharesCancelled;
    obj.order_type = limitOrderTypeToJSON(message.orderType);
    return obj;
  },
  fromAminoMsg(object: LimitOrderTrancheUserAminoMsg): LimitOrderTrancheUser {
    return LimitOrderTrancheUser.fromAmino(object.value);
  },
  fromProtoMsg(message: LimitOrderTrancheUserProtoMsg, useInterfaces: boolean = false): LimitOrderTrancheUser {
    return LimitOrderTrancheUser.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: LimitOrderTrancheUser): Uint8Array {
    return LimitOrderTrancheUser.encode(message).finish();
  },
  toProtoMsg(message: LimitOrderTrancheUser): LimitOrderTrancheUserProtoMsg {
    return {
      typeUrl: "/neutron.dex.LimitOrderTrancheUser",
      value: LimitOrderTrancheUser.encode(message).finish()
    };
  }
};