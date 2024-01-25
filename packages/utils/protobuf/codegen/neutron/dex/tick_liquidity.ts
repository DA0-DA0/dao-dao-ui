import { PoolReserves, PoolReservesAmino, PoolReservesSDKType } from "./pool_reserves";
import { LimitOrderTranche, LimitOrderTrancheAmino, LimitOrderTrancheSDKType } from "./limit_order_tranche";
import { BinaryReader, BinaryWriter } from "../../binary";
export interface TickLiquidity {
  poolReserves?: PoolReserves | undefined;
  limitOrderTranche?: LimitOrderTranche | undefined;
}
export interface TickLiquidityProtoMsg {
  typeUrl: "/neutron.dex.TickLiquidity";
  value: Uint8Array;
}
export interface TickLiquidityAmino {
  pool_reserves?: PoolReservesAmino | undefined;
  limit_order_tranche?: LimitOrderTrancheAmino | undefined;
}
export interface TickLiquidityAminoMsg {
  type: "/neutron.dex.TickLiquidity";
  value: TickLiquidityAmino;
}
export interface TickLiquiditySDKType {
  pool_reserves?: PoolReservesSDKType | undefined;
  limit_order_tranche?: LimitOrderTrancheSDKType | undefined;
}
function createBaseTickLiquidity(): TickLiquidity {
  return {
    poolReserves: undefined,
    limitOrderTranche: undefined
  };
}
export const TickLiquidity = {
  typeUrl: "/neutron.dex.TickLiquidity",
  encode(message: TickLiquidity, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolReserves !== undefined) {
      PoolReserves.encode(message.poolReserves, writer.uint32(10).fork()).ldelim();
    }
    if (message.limitOrderTranche !== undefined) {
      LimitOrderTranche.encode(message.limitOrderTranche, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): TickLiquidity {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTickLiquidity();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolReserves = PoolReserves.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.limitOrderTranche = LimitOrderTranche.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<TickLiquidity>): TickLiquidity {
    const message = createBaseTickLiquidity();
    message.poolReserves = object.poolReserves !== undefined && object.poolReserves !== null ? PoolReserves.fromPartial(object.poolReserves) : undefined;
    message.limitOrderTranche = object.limitOrderTranche !== undefined && object.limitOrderTranche !== null ? LimitOrderTranche.fromPartial(object.limitOrderTranche) : undefined;
    return message;
  },
  fromAmino(object: TickLiquidityAmino): TickLiquidity {
    const message = createBaseTickLiquidity();
    if (object.pool_reserves !== undefined && object.pool_reserves !== null) {
      message.poolReserves = PoolReserves.fromAmino(object.pool_reserves);
    }
    if (object.limit_order_tranche !== undefined && object.limit_order_tranche !== null) {
      message.limitOrderTranche = LimitOrderTranche.fromAmino(object.limit_order_tranche);
    }
    return message;
  },
  toAmino(message: TickLiquidity, useInterfaces: boolean = false): TickLiquidityAmino {
    const obj: any = {};
    obj.pool_reserves = message.poolReserves ? PoolReserves.toAmino(message.poolReserves, useInterfaces) : undefined;
    obj.limit_order_tranche = message.limitOrderTranche ? LimitOrderTranche.toAmino(message.limitOrderTranche, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: TickLiquidityAminoMsg): TickLiquidity {
    return TickLiquidity.fromAmino(object.value);
  },
  fromProtoMsg(message: TickLiquidityProtoMsg, useInterfaces: boolean = false): TickLiquidity {
    return TickLiquidity.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: TickLiquidity): Uint8Array {
    return TickLiquidity.encode(message).finish();
  },
  toProtoMsg(message: TickLiquidity): TickLiquidityProtoMsg {
    return {
      typeUrl: "/neutron.dex.TickLiquidity",
      value: TickLiquidity.encode(message).finish()
    };
  }
};