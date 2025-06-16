import { BinaryReader, BinaryWriter } from "../../../binary";
export interface ExecutableOrderCount {
  poolId: bigint;
  tokenIn: string;
  tokenOut: string;
  whitelistedRoute: boolean;
  count: bigint;
}
export interface ExecutableOrderCountProtoMsg {
  typeUrl: "/pryzm.amm.v1.ExecutableOrderCount";
  value: Uint8Array;
}
export interface ExecutableOrderCountAmino {
  pool_id?: string;
  token_in?: string;
  token_out?: string;
  whitelisted_route?: boolean;
  count?: string;
}
export interface ExecutableOrderCountAminoMsg {
  type: "/pryzm.amm.v1.ExecutableOrderCount";
  value: ExecutableOrderCountAmino;
}
export interface ExecutableOrderCountSDKType {
  pool_id: bigint;
  token_in: string;
  token_out: string;
  whitelisted_route: boolean;
  count: bigint;
}
function createBaseExecutableOrderCount(): ExecutableOrderCount {
  return {
    poolId: BigInt(0),
    tokenIn: "",
    tokenOut: "",
    whitelistedRoute: false,
    count: BigInt(0)
  };
}
export const ExecutableOrderCount = {
  typeUrl: "/pryzm.amm.v1.ExecutableOrderCount",
  encode(message: ExecutableOrderCount, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.tokenIn !== "") {
      writer.uint32(18).string(message.tokenIn);
    }
    if (message.tokenOut !== "") {
      writer.uint32(26).string(message.tokenOut);
    }
    if (message.whitelistedRoute === true) {
      writer.uint32(32).bool(message.whitelistedRoute);
    }
    if (message.count !== BigInt(0)) {
      writer.uint32(40).uint64(message.count);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ExecutableOrderCount {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExecutableOrderCount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.uint64();
          break;
        case 2:
          message.tokenIn = reader.string();
          break;
        case 3:
          message.tokenOut = reader.string();
          break;
        case 4:
          message.whitelistedRoute = reader.bool();
          break;
        case 5:
          message.count = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ExecutableOrderCount>): ExecutableOrderCount {
    const message = createBaseExecutableOrderCount();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.tokenIn = object.tokenIn ?? "";
    message.tokenOut = object.tokenOut ?? "";
    message.whitelistedRoute = object.whitelistedRoute ?? false;
    message.count = object.count !== undefined && object.count !== null ? BigInt(object.count.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: ExecutableOrderCountAmino): ExecutableOrderCount {
    const message = createBaseExecutableOrderCount();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.token_in !== undefined && object.token_in !== null) {
      message.tokenIn = object.token_in;
    }
    if (object.token_out !== undefined && object.token_out !== null) {
      message.tokenOut = object.token_out;
    }
    if (object.whitelisted_route !== undefined && object.whitelisted_route !== null) {
      message.whitelistedRoute = object.whitelisted_route;
    }
    if (object.count !== undefined && object.count !== null) {
      message.count = BigInt(object.count);
    }
    return message;
  },
  toAmino(message: ExecutableOrderCount, useInterfaces: boolean = false): ExecutableOrderCountAmino {
    const obj: any = {};
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.token_in = message.tokenIn === "" ? undefined : message.tokenIn;
    obj.token_out = message.tokenOut === "" ? undefined : message.tokenOut;
    obj.whitelisted_route = message.whitelistedRoute === false ? undefined : message.whitelistedRoute;
    obj.count = message.count !== BigInt(0) ? message.count.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: ExecutableOrderCountAminoMsg): ExecutableOrderCount {
    return ExecutableOrderCount.fromAmino(object.value);
  },
  fromProtoMsg(message: ExecutableOrderCountProtoMsg, useInterfaces: boolean = false): ExecutableOrderCount {
    return ExecutableOrderCount.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ExecutableOrderCount): Uint8Array {
    return ExecutableOrderCount.encode(message).finish();
  },
  toProtoMsg(message: ExecutableOrderCount): ExecutableOrderCountProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.ExecutableOrderCount",
      value: ExecutableOrderCount.encode(message).finish()
    };
  }
};