import { PoolReserves, PoolReservesAmino, PoolReservesSDKType } from "./pool_reserves";
import { BinaryReader, BinaryWriter } from "../../binary";
export interface Pool {
  id: bigint;
  lowerTick0?: PoolReserves | undefined;
  upperTick1?: PoolReserves | undefined;
}
export interface PoolProtoMsg {
  typeUrl: "/neutron.dex.Pool";
  value: Uint8Array;
}
export interface PoolAmino {
  id?: string;
  lower_tick0?: PoolReservesAmino | undefined;
  upper_tick1?: PoolReservesAmino | undefined;
}
export interface PoolAminoMsg {
  type: "/neutron.dex.Pool";
  value: PoolAmino;
}
export interface PoolSDKType {
  id: bigint;
  lower_tick0?: PoolReservesSDKType | undefined;
  upper_tick1?: PoolReservesSDKType | undefined;
}
function createBasePool(): Pool {
  return {
    id: BigInt(0),
    lowerTick0: undefined,
    upperTick1: undefined
  };
}
export const Pool = {
  typeUrl: "/neutron.dex.Pool",
  encode(message: Pool, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.lowerTick0 !== undefined) {
      PoolReserves.encode(message.lowerTick0, writer.uint32(18).fork()).ldelim();
    }
    if (message.upperTick1 !== undefined) {
      PoolReserves.encode(message.upperTick1, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): Pool {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.lowerTick0 = PoolReserves.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.upperTick1 = PoolReserves.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Pool>): Pool {
    const message = createBasePool();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.lowerTick0 = object.lowerTick0 !== undefined && object.lowerTick0 !== null ? PoolReserves.fromPartial(object.lowerTick0) : undefined;
    message.upperTick1 = object.upperTick1 !== undefined && object.upperTick1 !== null ? PoolReserves.fromPartial(object.upperTick1) : undefined;
    return message;
  },
  fromAmino(object: PoolAmino): Pool {
    const message = createBasePool();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.lower_tick0 !== undefined && object.lower_tick0 !== null) {
      message.lowerTick0 = PoolReserves.fromAmino(object.lower_tick0);
    }
    if (object.upper_tick1 !== undefined && object.upper_tick1 !== null) {
      message.upperTick1 = PoolReserves.fromAmino(object.upper_tick1);
    }
    return message;
  },
  toAmino(message: Pool, useInterfaces: boolean = false): PoolAmino {
    const obj: any = {};
    obj.id = message.id ? message.id.toString() : undefined;
    obj.lower_tick0 = message.lowerTick0 ? PoolReserves.toAmino(message.lowerTick0, useInterfaces) : undefined;
    obj.upper_tick1 = message.upperTick1 ? PoolReserves.toAmino(message.upperTick1, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: PoolAminoMsg): Pool {
    return Pool.fromAmino(object.value);
  },
  fromProtoMsg(message: PoolProtoMsg, useInterfaces: boolean = false): Pool {
    return Pool.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Pool): Uint8Array {
    return Pool.encode(message).finish();
  },
  toProtoMsg(message: Pool): PoolProtoMsg {
    return {
      typeUrl: "/neutron.dex.Pool",
      value: Pool.encode(message).finish()
    };
  }
};