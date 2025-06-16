import { BinaryReader, BinaryWriter } from "../../../binary";
export interface RouteStep {
  poolId: bigint;
  tokenIn: string;
  tokenOut: string;
}
export interface RouteStepProtoMsg {
  typeUrl: "/pryzm.amm.v1.RouteStep";
  value: Uint8Array;
}
export interface RouteStepAmino {
  pool_id: string;
  token_in?: string;
  token_out?: string;
}
export interface RouteStepAminoMsg {
  type: "/pryzm.amm.v1.RouteStep";
  value: RouteStepAmino;
}
export interface RouteStepSDKType {
  pool_id: bigint;
  token_in: string;
  token_out: string;
}
function createBaseRouteStep(): RouteStep {
  return {
    poolId: BigInt(0),
    tokenIn: "",
    tokenOut: ""
  };
}
export const RouteStep = {
  typeUrl: "/pryzm.amm.v1.RouteStep",
  encode(message: RouteStep, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.tokenIn !== "") {
      writer.uint32(18).string(message.tokenIn);
    }
    if (message.tokenOut !== "") {
      writer.uint32(26).string(message.tokenOut);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): RouteStep {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRouteStep();
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
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<RouteStep>): RouteStep {
    const message = createBaseRouteStep();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.tokenIn = object.tokenIn ?? "";
    message.tokenOut = object.tokenOut ?? "";
    return message;
  },
  fromAmino(object: RouteStepAmino): RouteStep {
    const message = createBaseRouteStep();
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.token_in !== undefined && object.token_in !== null) {
      message.tokenIn = object.token_in;
    }
    if (object.token_out !== undefined && object.token_out !== null) {
      message.tokenOut = object.token_out;
    }
    return message;
  },
  toAmino(message: RouteStep, useInterfaces: boolean = false): RouteStepAmino {
    const obj: any = {};
    obj.pool_id = message.poolId ? message.poolId.toString() : "0";
    obj.token_in = message.tokenIn === "" ? undefined : message.tokenIn;
    obj.token_out = message.tokenOut === "" ? undefined : message.tokenOut;
    return obj;
  },
  fromAminoMsg(object: RouteStepAminoMsg): RouteStep {
    return RouteStep.fromAmino(object.value);
  },
  fromProtoMsg(message: RouteStepProtoMsg, useInterfaces: boolean = false): RouteStep {
    return RouteStep.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: RouteStep): Uint8Array {
    return RouteStep.encode(message).finish();
  },
  toProtoMsg(message: RouteStep): RouteStepProtoMsg {
    return {
      typeUrl: "/pryzm.amm.v1.RouteStep",
      value: RouteStep.encode(message).finish()
    };
  }
};