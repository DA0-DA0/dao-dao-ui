//@ts-nocheck
import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { SwapAmountInRoute, SwapAmountInRouteAmino, SwapAmountInRouteSDKType, SwapAmountOutRoute, SwapAmountOutRouteAmino, SwapAmountOutRouteSDKType } from "../../poolmanager/v1beta1/swap_route";
import { BinaryReader, BinaryWriter } from "../../../binary";
/**
 * ===================== MsgJoinPool
 * This is really MsgJoinPoolNoSwap
 */
export interface MsgJoinPool {
  sender: string;
  poolId: bigint;
  shareOutAmount: string;
  tokenInMaxs: Coin[];
}
export interface MsgJoinPoolProtoMsg {
  typeUrl: "/osmosis.gamm.v1beta1.MsgJoinPool";
  value: Uint8Array;
}
/**
 * ===================== MsgJoinPool
 * This is really MsgJoinPoolNoSwap
 */
export interface MsgJoinPoolAmino {
  sender?: string;
  pool_id?: string;
  share_out_amount?: string;
  token_in_maxs?: CoinAmino[];
}
export interface MsgJoinPoolAminoMsg {
  type: "osmosis/gamm/join-pool";
  value: MsgJoinPoolAmino;
}
/**
 * ===================== MsgJoinPool
 * This is really MsgJoinPoolNoSwap
 */
export interface MsgJoinPoolSDKType {
  sender: string;
  pool_id: bigint;
  share_out_amount: string;
  token_in_maxs: CoinSDKType[];
}
export interface MsgJoinPoolResponse {
  shareOutAmount: string;
  tokenIn: Coin[];
}
export interface MsgJoinPoolResponseProtoMsg {
  typeUrl: "/osmosis.gamm.v1beta1.MsgJoinPoolResponse";
  value: Uint8Array;
}
export interface MsgJoinPoolResponseAmino {
  share_out_amount?: string;
  token_in?: CoinAmino[];
}
export interface MsgJoinPoolResponseAminoMsg {
  type: "osmosis/gamm/join-pool-response";
  value: MsgJoinPoolResponseAmino;
}
export interface MsgJoinPoolResponseSDKType {
  share_out_amount: string;
  token_in: CoinSDKType[];
}
/** ===================== MsgExitPool */
export interface MsgExitPool {
  sender: string;
  poolId: bigint;
  shareInAmount: string;
  tokenOutMins: Coin[];
}
export interface MsgExitPoolProtoMsg {
  typeUrl: "/osmosis.gamm.v1beta1.MsgExitPool";
  value: Uint8Array;
}
/** ===================== MsgExitPool */
export interface MsgExitPoolAmino {
  sender?: string;
  pool_id?: string;
  share_in_amount?: string;
  token_out_mins?: CoinAmino[];
}
export interface MsgExitPoolAminoMsg {
  type: "osmosis/gamm/exit-pool";
  value: MsgExitPoolAmino;
}
/** ===================== MsgExitPool */
export interface MsgExitPoolSDKType {
  sender: string;
  pool_id: bigint;
  share_in_amount: string;
  token_out_mins: CoinSDKType[];
}
export interface MsgExitPoolResponse {
  tokenOut: Coin[];
}
export interface MsgExitPoolResponseProtoMsg {
  typeUrl: "/osmosis.gamm.v1beta1.MsgExitPoolResponse";
  value: Uint8Array;
}
export interface MsgExitPoolResponseAmino {
  token_out?: CoinAmino[];
}
export interface MsgExitPoolResponseAminoMsg {
  type: "osmosis/gamm/exit-pool-response";
  value: MsgExitPoolResponseAmino;
}
export interface MsgExitPoolResponseSDKType {
  token_out: CoinSDKType[];
}
/** ===================== MsgSwapExactAmountIn */
export interface MsgSwapExactAmountIn {
  sender: string;
  routes: SwapAmountInRoute[];
  tokenIn: Coin | undefined;
  tokenOutMinAmount: string;
}
export interface MsgSwapExactAmountInProtoMsg {
  typeUrl: "/osmosis.gamm.v1beta1.MsgSwapExactAmountIn";
  value: Uint8Array;
}
/** ===================== MsgSwapExactAmountIn */
export interface MsgSwapExactAmountInAmino {
  sender?: string;
  routes?: SwapAmountInRouteAmino[];
  token_in?: CoinAmino | undefined;
  token_out_min_amount?: string;
}
export interface MsgSwapExactAmountInAminoMsg {
  type: "osmosis/gamm/swap-exact-amount-in";
  value: MsgSwapExactAmountInAmino;
}
/** ===================== MsgSwapExactAmountIn */
export interface MsgSwapExactAmountInSDKType {
  sender: string;
  routes: SwapAmountInRouteSDKType[];
  token_in: CoinSDKType | undefined;
  token_out_min_amount: string;
}
export interface MsgSwapExactAmountInResponse {
  tokenOutAmount: string;
}
export interface MsgSwapExactAmountInResponseProtoMsg {
  typeUrl: "/osmosis.gamm.v1beta1.MsgSwapExactAmountInResponse";
  value: Uint8Array;
}
export interface MsgSwapExactAmountInResponseAmino {
  token_out_amount?: string;
}
export interface MsgSwapExactAmountInResponseAminoMsg {
  type: "osmosis/gamm/swap-exact-amount-in-response";
  value: MsgSwapExactAmountInResponseAmino;
}
export interface MsgSwapExactAmountInResponseSDKType {
  token_out_amount: string;
}
export interface MsgSwapExactAmountOut {
  sender: string;
  routes: SwapAmountOutRoute[];
  tokenInMaxAmount: string;
  tokenOut: Coin | undefined;
}
export interface MsgSwapExactAmountOutProtoMsg {
  typeUrl: "/osmosis.gamm.v1beta1.MsgSwapExactAmountOut";
  value: Uint8Array;
}
export interface MsgSwapExactAmountOutAmino {
  sender?: string;
  routes?: SwapAmountOutRouteAmino[];
  token_in_max_amount?: string;
  token_out?: CoinAmino | undefined;
}
export interface MsgSwapExactAmountOutAminoMsg {
  type: "osmosis/gamm/swap-exact-amount-out";
  value: MsgSwapExactAmountOutAmino;
}
export interface MsgSwapExactAmountOutSDKType {
  sender: string;
  routes: SwapAmountOutRouteSDKType[];
  token_in_max_amount: string;
  token_out: CoinSDKType | undefined;
}
export interface MsgSwapExactAmountOutResponse {
  tokenInAmount: string;
}
export interface MsgSwapExactAmountOutResponseProtoMsg {
  typeUrl: "/osmosis.gamm.v1beta1.MsgSwapExactAmountOutResponse";
  value: Uint8Array;
}
export interface MsgSwapExactAmountOutResponseAmino {
  token_in_amount?: string;
}
export interface MsgSwapExactAmountOutResponseAminoMsg {
  type: "osmosis/gamm/swap-exact-amount-out-response";
  value: MsgSwapExactAmountOutResponseAmino;
}
export interface MsgSwapExactAmountOutResponseSDKType {
  token_in_amount: string;
}
/**
 * ===================== MsgJoinSwapExternAmountIn
 * TODO: Rename to MsgJoinSwapExactAmountIn
 */
export interface MsgJoinSwapExternAmountIn {
  sender: string;
  poolId: bigint;
  tokenIn: Coin | undefined;
  shareOutMinAmount: string;
}
export interface MsgJoinSwapExternAmountInProtoMsg {
  typeUrl: "/osmosis.gamm.v1beta1.MsgJoinSwapExternAmountIn";
  value: Uint8Array;
}
/**
 * ===================== MsgJoinSwapExternAmountIn
 * TODO: Rename to MsgJoinSwapExactAmountIn
 */
export interface MsgJoinSwapExternAmountInAmino {
  sender?: string;
  pool_id?: string;
  token_in?: CoinAmino | undefined;
  share_out_min_amount?: string;
}
export interface MsgJoinSwapExternAmountInAminoMsg {
  type: "osmosis/gamm/join-swap-extern-amount-in";
  value: MsgJoinSwapExternAmountInAmino;
}
/**
 * ===================== MsgJoinSwapExternAmountIn
 * TODO: Rename to MsgJoinSwapExactAmountIn
 */
export interface MsgJoinSwapExternAmountInSDKType {
  sender: string;
  pool_id: bigint;
  token_in: CoinSDKType | undefined;
  share_out_min_amount: string;
}
export interface MsgJoinSwapExternAmountInResponse {
  shareOutAmount: string;
}
export interface MsgJoinSwapExternAmountInResponseProtoMsg {
  typeUrl: "/osmosis.gamm.v1beta1.MsgJoinSwapExternAmountInResponse";
  value: Uint8Array;
}
export interface MsgJoinSwapExternAmountInResponseAmino {
  share_out_amount?: string;
}
export interface MsgJoinSwapExternAmountInResponseAminoMsg {
  type: "osmosis/gamm/join-swap-extern-amount-in-response";
  value: MsgJoinSwapExternAmountInResponseAmino;
}
export interface MsgJoinSwapExternAmountInResponseSDKType {
  share_out_amount: string;
}
/** ===================== MsgJoinSwapShareAmountOut */
export interface MsgJoinSwapShareAmountOut {
  sender: string;
  poolId: bigint;
  tokenInDenom: string;
  shareOutAmount: string;
  tokenInMaxAmount: string;
}
export interface MsgJoinSwapShareAmountOutProtoMsg {
  typeUrl: "/osmosis.gamm.v1beta1.MsgJoinSwapShareAmountOut";
  value: Uint8Array;
}
/** ===================== MsgJoinSwapShareAmountOut */
export interface MsgJoinSwapShareAmountOutAmino {
  sender?: string;
  pool_id?: string;
  token_in_denom?: string;
  share_out_amount?: string;
  token_in_max_amount?: string;
}
export interface MsgJoinSwapShareAmountOutAminoMsg {
  type: "osmosis/gamm/join-swap-share-amount-out";
  value: MsgJoinSwapShareAmountOutAmino;
}
/** ===================== MsgJoinSwapShareAmountOut */
export interface MsgJoinSwapShareAmountOutSDKType {
  sender: string;
  pool_id: bigint;
  token_in_denom: string;
  share_out_amount: string;
  token_in_max_amount: string;
}
export interface MsgJoinSwapShareAmountOutResponse {
  tokenInAmount: string;
}
export interface MsgJoinSwapShareAmountOutResponseProtoMsg {
  typeUrl: "/osmosis.gamm.v1beta1.MsgJoinSwapShareAmountOutResponse";
  value: Uint8Array;
}
export interface MsgJoinSwapShareAmountOutResponseAmino {
  token_in_amount?: string;
}
export interface MsgJoinSwapShareAmountOutResponseAminoMsg {
  type: "osmosis/gamm/join-swap-share-amount-out-response";
  value: MsgJoinSwapShareAmountOutResponseAmino;
}
export interface MsgJoinSwapShareAmountOutResponseSDKType {
  token_in_amount: string;
}
/** ===================== MsgExitSwapShareAmountIn */
export interface MsgExitSwapShareAmountIn {
  sender: string;
  poolId: bigint;
  tokenOutDenom: string;
  shareInAmount: string;
  tokenOutMinAmount: string;
}
export interface MsgExitSwapShareAmountInProtoMsg {
  typeUrl: "/osmosis.gamm.v1beta1.MsgExitSwapShareAmountIn";
  value: Uint8Array;
}
/** ===================== MsgExitSwapShareAmountIn */
export interface MsgExitSwapShareAmountInAmino {
  sender?: string;
  pool_id?: string;
  token_out_denom?: string;
  share_in_amount?: string;
  token_out_min_amount?: string;
}
export interface MsgExitSwapShareAmountInAminoMsg {
  type: "osmosis/gamm/exit-swap-share-amount-in";
  value: MsgExitSwapShareAmountInAmino;
}
/** ===================== MsgExitSwapShareAmountIn */
export interface MsgExitSwapShareAmountInSDKType {
  sender: string;
  pool_id: bigint;
  token_out_denom: string;
  share_in_amount: string;
  token_out_min_amount: string;
}
export interface MsgExitSwapShareAmountInResponse {
  tokenOutAmount: string;
}
export interface MsgExitSwapShareAmountInResponseProtoMsg {
  typeUrl: "/osmosis.gamm.v1beta1.MsgExitSwapShareAmountInResponse";
  value: Uint8Array;
}
export interface MsgExitSwapShareAmountInResponseAmino {
  token_out_amount?: string;
}
export interface MsgExitSwapShareAmountInResponseAminoMsg {
  type: "osmosis/gamm/exit-swap-share-amount-in-response";
  value: MsgExitSwapShareAmountInResponseAmino;
}
export interface MsgExitSwapShareAmountInResponseSDKType {
  token_out_amount: string;
}
/** ===================== MsgExitSwapExternAmountOut */
export interface MsgExitSwapExternAmountOut {
  sender: string;
  poolId: bigint;
  tokenOut: Coin | undefined;
  shareInMaxAmount: string;
}
export interface MsgExitSwapExternAmountOutProtoMsg {
  typeUrl: "/osmosis.gamm.v1beta1.MsgExitSwapExternAmountOut";
  value: Uint8Array;
}
/** ===================== MsgExitSwapExternAmountOut */
export interface MsgExitSwapExternAmountOutAmino {
  sender?: string;
  pool_id?: string;
  token_out?: CoinAmino | undefined;
  share_in_max_amount?: string;
}
export interface MsgExitSwapExternAmountOutAminoMsg {
  type: "osmosis/gamm/exit-swap-extern-amount-out";
  value: MsgExitSwapExternAmountOutAmino;
}
/** ===================== MsgExitSwapExternAmountOut */
export interface MsgExitSwapExternAmountOutSDKType {
  sender: string;
  pool_id: bigint;
  token_out: CoinSDKType | undefined;
  share_in_max_amount: string;
}
export interface MsgExitSwapExternAmountOutResponse {
  shareInAmount: string;
}
export interface MsgExitSwapExternAmountOutResponseProtoMsg {
  typeUrl: "/osmosis.gamm.v1beta1.MsgExitSwapExternAmountOutResponse";
  value: Uint8Array;
}
export interface MsgExitSwapExternAmountOutResponseAmino {
  share_in_amount?: string;
}
export interface MsgExitSwapExternAmountOutResponseAminoMsg {
  type: "osmosis/gamm/exit-swap-extern-amount-out-response";
  value: MsgExitSwapExternAmountOutResponseAmino;
}
export interface MsgExitSwapExternAmountOutResponseSDKType {
  share_in_amount: string;
}
function createBaseMsgJoinPool(): MsgJoinPool {
  return {
    sender: "",
    poolId: BigInt(0),
    shareOutAmount: "",
    tokenInMaxs: []
  };
}
export const MsgJoinPool = {
  typeUrl: "/osmosis.gamm.v1beta1.MsgJoinPool",
  encode(message: MsgJoinPool, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.poolId !== BigInt(0)) {
      writer.uint32(16).uint64(message.poolId);
    }
    if (message.shareOutAmount !== "") {
      writer.uint32(26).string(message.shareOutAmount);
    }
    for (const v of message.tokenInMaxs) {
      Coin.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgJoinPool {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgJoinPool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.poolId = reader.uint64();
          break;
        case 3:
          message.shareOutAmount = reader.string();
          break;
        case 4:
          message.tokenInMaxs.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgJoinPool>): MsgJoinPool {
    const message = createBaseMsgJoinPool();
    message.sender = object.sender ?? "";
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.shareOutAmount = object.shareOutAmount ?? "";
    message.tokenInMaxs = object.tokenInMaxs?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: MsgJoinPoolAmino): MsgJoinPool {
    const message = createBaseMsgJoinPool();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.share_out_amount !== undefined && object.share_out_amount !== null) {
      message.shareOutAmount = object.share_out_amount;
    }
    message.tokenInMaxs = object.token_in_maxs?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: MsgJoinPool, useInterfaces: boolean = false): MsgJoinPoolAmino {
    const obj: any = {};
    obj.sender = message.sender === "" ? undefined : message.sender;
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.share_out_amount = message.shareOutAmount === "" ? undefined : message.shareOutAmount;
    if (message.tokenInMaxs) {
      obj.token_in_maxs = message.tokenInMaxs.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.token_in_maxs = message.tokenInMaxs;
    }
    return obj;
  },
  fromAminoMsg(object: MsgJoinPoolAminoMsg): MsgJoinPool {
    return MsgJoinPool.fromAmino(object.value);
  },
  toAminoMsg(message: MsgJoinPool, useInterfaces: boolean = false): MsgJoinPoolAminoMsg {
    return {
      type: "osmosis/gamm/join-pool",
      value: MsgJoinPool.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgJoinPoolProtoMsg, useInterfaces: boolean = false): MsgJoinPool {
    return MsgJoinPool.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgJoinPool): Uint8Array {
    return MsgJoinPool.encode(message).finish();
  },
  toProtoMsg(message: MsgJoinPool): MsgJoinPoolProtoMsg {
    return {
      typeUrl: "/osmosis.gamm.v1beta1.MsgJoinPool",
      value: MsgJoinPool.encode(message).finish()
    };
  }
};
function createBaseMsgJoinPoolResponse(): MsgJoinPoolResponse {
  return {
    shareOutAmount: "",
    tokenIn: []
  };
}
export const MsgJoinPoolResponse = {
  typeUrl: "/osmosis.gamm.v1beta1.MsgJoinPoolResponse",
  encode(message: MsgJoinPoolResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.shareOutAmount !== "") {
      writer.uint32(10).string(message.shareOutAmount);
    }
    for (const v of message.tokenIn) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgJoinPoolResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgJoinPoolResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.shareOutAmount = reader.string();
          break;
        case 2:
          message.tokenIn.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgJoinPoolResponse>): MsgJoinPoolResponse {
    const message = createBaseMsgJoinPoolResponse();
    message.shareOutAmount = object.shareOutAmount ?? "";
    message.tokenIn = object.tokenIn?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: MsgJoinPoolResponseAmino): MsgJoinPoolResponse {
    const message = createBaseMsgJoinPoolResponse();
    if (object.share_out_amount !== undefined && object.share_out_amount !== null) {
      message.shareOutAmount = object.share_out_amount;
    }
    message.tokenIn = object.token_in?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: MsgJoinPoolResponse, useInterfaces: boolean = false): MsgJoinPoolResponseAmino {
    const obj: any = {};
    obj.share_out_amount = message.shareOutAmount === "" ? undefined : message.shareOutAmount;
    if (message.tokenIn) {
      obj.token_in = message.tokenIn.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.token_in = message.tokenIn;
    }
    return obj;
  },
  fromAminoMsg(object: MsgJoinPoolResponseAminoMsg): MsgJoinPoolResponse {
    return MsgJoinPoolResponse.fromAmino(object.value);
  },
  toAminoMsg(message: MsgJoinPoolResponse, useInterfaces: boolean = false): MsgJoinPoolResponseAminoMsg {
    return {
      type: "osmosis/gamm/join-pool-response",
      value: MsgJoinPoolResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgJoinPoolResponseProtoMsg, useInterfaces: boolean = false): MsgJoinPoolResponse {
    return MsgJoinPoolResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgJoinPoolResponse): Uint8Array {
    return MsgJoinPoolResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgJoinPoolResponse): MsgJoinPoolResponseProtoMsg {
    return {
      typeUrl: "/osmosis.gamm.v1beta1.MsgJoinPoolResponse",
      value: MsgJoinPoolResponse.encode(message).finish()
    };
  }
};
function createBaseMsgExitPool(): MsgExitPool {
  return {
    sender: "",
    poolId: BigInt(0),
    shareInAmount: "",
    tokenOutMins: []
  };
}
export const MsgExitPool = {
  typeUrl: "/osmosis.gamm.v1beta1.MsgExitPool",
  encode(message: MsgExitPool, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.poolId !== BigInt(0)) {
      writer.uint32(16).uint64(message.poolId);
    }
    if (message.shareInAmount !== "") {
      writer.uint32(26).string(message.shareInAmount);
    }
    for (const v of message.tokenOutMins) {
      Coin.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgExitPool {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgExitPool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.poolId = reader.uint64();
          break;
        case 3:
          message.shareInAmount = reader.string();
          break;
        case 4:
          message.tokenOutMins.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgExitPool>): MsgExitPool {
    const message = createBaseMsgExitPool();
    message.sender = object.sender ?? "";
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.shareInAmount = object.shareInAmount ?? "";
    message.tokenOutMins = object.tokenOutMins?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: MsgExitPoolAmino): MsgExitPool {
    const message = createBaseMsgExitPool();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.share_in_amount !== undefined && object.share_in_amount !== null) {
      message.shareInAmount = object.share_in_amount;
    }
    message.tokenOutMins = object.token_out_mins?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: MsgExitPool, useInterfaces: boolean = false): MsgExitPoolAmino {
    const obj: any = {};
    obj.sender = message.sender === "" ? undefined : message.sender;
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.share_in_amount = message.shareInAmount === "" ? undefined : message.shareInAmount;
    if (message.tokenOutMins) {
      obj.token_out_mins = message.tokenOutMins.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.token_out_mins = message.tokenOutMins;
    }
    return obj;
  },
  fromAminoMsg(object: MsgExitPoolAminoMsg): MsgExitPool {
    return MsgExitPool.fromAmino(object.value);
  },
  toAminoMsg(message: MsgExitPool, useInterfaces: boolean = false): MsgExitPoolAminoMsg {
    return {
      type: "osmosis/gamm/exit-pool",
      value: MsgExitPool.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgExitPoolProtoMsg, useInterfaces: boolean = false): MsgExitPool {
    return MsgExitPool.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgExitPool): Uint8Array {
    return MsgExitPool.encode(message).finish();
  },
  toProtoMsg(message: MsgExitPool): MsgExitPoolProtoMsg {
    return {
      typeUrl: "/osmosis.gamm.v1beta1.MsgExitPool",
      value: MsgExitPool.encode(message).finish()
    };
  }
};
function createBaseMsgExitPoolResponse(): MsgExitPoolResponse {
  return {
    tokenOut: []
  };
}
export const MsgExitPoolResponse = {
  typeUrl: "/osmosis.gamm.v1beta1.MsgExitPoolResponse",
  encode(message: MsgExitPoolResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.tokenOut) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgExitPoolResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgExitPoolResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tokenOut.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgExitPoolResponse>): MsgExitPoolResponse {
    const message = createBaseMsgExitPoolResponse();
    message.tokenOut = object.tokenOut?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: MsgExitPoolResponseAmino): MsgExitPoolResponse {
    const message = createBaseMsgExitPoolResponse();
    message.tokenOut = object.token_out?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: MsgExitPoolResponse, useInterfaces: boolean = false): MsgExitPoolResponseAmino {
    const obj: any = {};
    if (message.tokenOut) {
      obj.token_out = message.tokenOut.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.token_out = message.tokenOut;
    }
    return obj;
  },
  fromAminoMsg(object: MsgExitPoolResponseAminoMsg): MsgExitPoolResponse {
    return MsgExitPoolResponse.fromAmino(object.value);
  },
  toAminoMsg(message: MsgExitPoolResponse, useInterfaces: boolean = false): MsgExitPoolResponseAminoMsg {
    return {
      type: "osmosis/gamm/exit-pool-response",
      value: MsgExitPoolResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgExitPoolResponseProtoMsg, useInterfaces: boolean = false): MsgExitPoolResponse {
    return MsgExitPoolResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgExitPoolResponse): Uint8Array {
    return MsgExitPoolResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgExitPoolResponse): MsgExitPoolResponseProtoMsg {
    return {
      typeUrl: "/osmosis.gamm.v1beta1.MsgExitPoolResponse",
      value: MsgExitPoolResponse.encode(message).finish()
    };
  }
};
function createBaseMsgSwapExactAmountIn(): MsgSwapExactAmountIn {
  return {
    sender: "",
    routes: [],
    tokenIn: Coin.fromPartial({}),
    tokenOutMinAmount: ""
  };
}
export const MsgSwapExactAmountIn = {
  typeUrl: "/osmosis.gamm.v1beta1.MsgSwapExactAmountIn",
  encode(message: MsgSwapExactAmountIn, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    for (const v of message.routes) {
      SwapAmountInRoute.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.tokenIn !== undefined) {
      Coin.encode(message.tokenIn, writer.uint32(26).fork()).ldelim();
    }
    if (message.tokenOutMinAmount !== "") {
      writer.uint32(34).string(message.tokenOutMinAmount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSwapExactAmountIn {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSwapExactAmountIn();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.routes.push(SwapAmountInRoute.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 3:
          message.tokenIn = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 4:
          message.tokenOutMinAmount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSwapExactAmountIn>): MsgSwapExactAmountIn {
    const message = createBaseMsgSwapExactAmountIn();
    message.sender = object.sender ?? "";
    message.routes = object.routes?.map(e => SwapAmountInRoute.fromPartial(e)) || [];
    message.tokenIn = object.tokenIn !== undefined && object.tokenIn !== null ? Coin.fromPartial(object.tokenIn) : undefined;
    message.tokenOutMinAmount = object.tokenOutMinAmount ?? "";
    return message;
  },
  fromAmino(object: MsgSwapExactAmountInAmino): MsgSwapExactAmountIn {
    const message = createBaseMsgSwapExactAmountIn();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    message.routes = object.routes?.map(e => SwapAmountInRoute.fromAmino(e)) || [];
    if (object.token_in !== undefined && object.token_in !== null) {
      message.tokenIn = Coin.fromAmino(object.token_in);
    }
    if (object.token_out_min_amount !== undefined && object.token_out_min_amount !== null) {
      message.tokenOutMinAmount = object.token_out_min_amount;
    }
    return message;
  },
  toAmino(message: MsgSwapExactAmountIn, useInterfaces: boolean = false): MsgSwapExactAmountInAmino {
    const obj: any = {};
    obj.sender = message.sender === "" ? undefined : message.sender;
    if (message.routes) {
      obj.routes = message.routes.map(e => e ? SwapAmountInRoute.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.routes = message.routes;
    }
    obj.token_in = message.tokenIn ? Coin.toAmino(message.tokenIn, useInterfaces) : undefined;
    obj.token_out_min_amount = message.tokenOutMinAmount === "" ? undefined : message.tokenOutMinAmount;
    return obj;
  },
  fromAminoMsg(object: MsgSwapExactAmountInAminoMsg): MsgSwapExactAmountIn {
    return MsgSwapExactAmountIn.fromAmino(object.value);
  },
  toAminoMsg(message: MsgSwapExactAmountIn, useInterfaces: boolean = false): MsgSwapExactAmountInAminoMsg {
    return {
      type: "osmosis/gamm/swap-exact-amount-in",
      value: MsgSwapExactAmountIn.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgSwapExactAmountInProtoMsg, useInterfaces: boolean = false): MsgSwapExactAmountIn {
    return MsgSwapExactAmountIn.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSwapExactAmountIn): Uint8Array {
    return MsgSwapExactAmountIn.encode(message).finish();
  },
  toProtoMsg(message: MsgSwapExactAmountIn): MsgSwapExactAmountInProtoMsg {
    return {
      typeUrl: "/osmosis.gamm.v1beta1.MsgSwapExactAmountIn",
      value: MsgSwapExactAmountIn.encode(message).finish()
    };
  }
};
function createBaseMsgSwapExactAmountInResponse(): MsgSwapExactAmountInResponse {
  return {
    tokenOutAmount: ""
  };
}
export const MsgSwapExactAmountInResponse = {
  typeUrl: "/osmosis.gamm.v1beta1.MsgSwapExactAmountInResponse",
  encode(message: MsgSwapExactAmountInResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.tokenOutAmount !== "") {
      writer.uint32(10).string(message.tokenOutAmount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSwapExactAmountInResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSwapExactAmountInResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tokenOutAmount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSwapExactAmountInResponse>): MsgSwapExactAmountInResponse {
    const message = createBaseMsgSwapExactAmountInResponse();
    message.tokenOutAmount = object.tokenOutAmount ?? "";
    return message;
  },
  fromAmino(object: MsgSwapExactAmountInResponseAmino): MsgSwapExactAmountInResponse {
    const message = createBaseMsgSwapExactAmountInResponse();
    if (object.token_out_amount !== undefined && object.token_out_amount !== null) {
      message.tokenOutAmount = object.token_out_amount;
    }
    return message;
  },
  toAmino(message: MsgSwapExactAmountInResponse, useInterfaces: boolean = false): MsgSwapExactAmountInResponseAmino {
    const obj: any = {};
    obj.token_out_amount = message.tokenOutAmount === "" ? undefined : message.tokenOutAmount;
    return obj;
  },
  fromAminoMsg(object: MsgSwapExactAmountInResponseAminoMsg): MsgSwapExactAmountInResponse {
    return MsgSwapExactAmountInResponse.fromAmino(object.value);
  },
  toAminoMsg(message: MsgSwapExactAmountInResponse, useInterfaces: boolean = false): MsgSwapExactAmountInResponseAminoMsg {
    return {
      type: "osmosis/gamm/swap-exact-amount-in-response",
      value: MsgSwapExactAmountInResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgSwapExactAmountInResponseProtoMsg, useInterfaces: boolean = false): MsgSwapExactAmountInResponse {
    return MsgSwapExactAmountInResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSwapExactAmountInResponse): Uint8Array {
    return MsgSwapExactAmountInResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSwapExactAmountInResponse): MsgSwapExactAmountInResponseProtoMsg {
    return {
      typeUrl: "/osmosis.gamm.v1beta1.MsgSwapExactAmountInResponse",
      value: MsgSwapExactAmountInResponse.encode(message).finish()
    };
  }
};
function createBaseMsgSwapExactAmountOut(): MsgSwapExactAmountOut {
  return {
    sender: "",
    routes: [],
    tokenInMaxAmount: "",
    tokenOut: Coin.fromPartial({})
  };
}
export const MsgSwapExactAmountOut = {
  typeUrl: "/osmosis.gamm.v1beta1.MsgSwapExactAmountOut",
  encode(message: MsgSwapExactAmountOut, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    for (const v of message.routes) {
      SwapAmountOutRoute.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.tokenInMaxAmount !== "") {
      writer.uint32(26).string(message.tokenInMaxAmount);
    }
    if (message.tokenOut !== undefined) {
      Coin.encode(message.tokenOut, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSwapExactAmountOut {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSwapExactAmountOut();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.routes.push(SwapAmountOutRoute.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 3:
          message.tokenInMaxAmount = reader.string();
          break;
        case 4:
          message.tokenOut = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSwapExactAmountOut>): MsgSwapExactAmountOut {
    const message = createBaseMsgSwapExactAmountOut();
    message.sender = object.sender ?? "";
    message.routes = object.routes?.map(e => SwapAmountOutRoute.fromPartial(e)) || [];
    message.tokenInMaxAmount = object.tokenInMaxAmount ?? "";
    message.tokenOut = object.tokenOut !== undefined && object.tokenOut !== null ? Coin.fromPartial(object.tokenOut) : undefined;
    return message;
  },
  fromAmino(object: MsgSwapExactAmountOutAmino): MsgSwapExactAmountOut {
    const message = createBaseMsgSwapExactAmountOut();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    message.routes = object.routes?.map(e => SwapAmountOutRoute.fromAmino(e)) || [];
    if (object.token_in_max_amount !== undefined && object.token_in_max_amount !== null) {
      message.tokenInMaxAmount = object.token_in_max_amount;
    }
    if (object.token_out !== undefined && object.token_out !== null) {
      message.tokenOut = Coin.fromAmino(object.token_out);
    }
    return message;
  },
  toAmino(message: MsgSwapExactAmountOut, useInterfaces: boolean = false): MsgSwapExactAmountOutAmino {
    const obj: any = {};
    obj.sender = message.sender === "" ? undefined : message.sender;
    if (message.routes) {
      obj.routes = message.routes.map(e => e ? SwapAmountOutRoute.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.routes = message.routes;
    }
    obj.token_in_max_amount = message.tokenInMaxAmount === "" ? undefined : message.tokenInMaxAmount;
    obj.token_out = message.tokenOut ? Coin.toAmino(message.tokenOut, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgSwapExactAmountOutAminoMsg): MsgSwapExactAmountOut {
    return MsgSwapExactAmountOut.fromAmino(object.value);
  },
  toAminoMsg(message: MsgSwapExactAmountOut, useInterfaces: boolean = false): MsgSwapExactAmountOutAminoMsg {
    return {
      type: "osmosis/gamm/swap-exact-amount-out",
      value: MsgSwapExactAmountOut.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgSwapExactAmountOutProtoMsg, useInterfaces: boolean = false): MsgSwapExactAmountOut {
    return MsgSwapExactAmountOut.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSwapExactAmountOut): Uint8Array {
    return MsgSwapExactAmountOut.encode(message).finish();
  },
  toProtoMsg(message: MsgSwapExactAmountOut): MsgSwapExactAmountOutProtoMsg {
    return {
      typeUrl: "/osmosis.gamm.v1beta1.MsgSwapExactAmountOut",
      value: MsgSwapExactAmountOut.encode(message).finish()
    };
  }
};
function createBaseMsgSwapExactAmountOutResponse(): MsgSwapExactAmountOutResponse {
  return {
    tokenInAmount: ""
  };
}
export const MsgSwapExactAmountOutResponse = {
  typeUrl: "/osmosis.gamm.v1beta1.MsgSwapExactAmountOutResponse",
  encode(message: MsgSwapExactAmountOutResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.tokenInAmount !== "") {
      writer.uint32(10).string(message.tokenInAmount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgSwapExactAmountOutResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSwapExactAmountOutResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tokenInAmount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSwapExactAmountOutResponse>): MsgSwapExactAmountOutResponse {
    const message = createBaseMsgSwapExactAmountOutResponse();
    message.tokenInAmount = object.tokenInAmount ?? "";
    return message;
  },
  fromAmino(object: MsgSwapExactAmountOutResponseAmino): MsgSwapExactAmountOutResponse {
    const message = createBaseMsgSwapExactAmountOutResponse();
    if (object.token_in_amount !== undefined && object.token_in_amount !== null) {
      message.tokenInAmount = object.token_in_amount;
    }
    return message;
  },
  toAmino(message: MsgSwapExactAmountOutResponse, useInterfaces: boolean = false): MsgSwapExactAmountOutResponseAmino {
    const obj: any = {};
    obj.token_in_amount = message.tokenInAmount === "" ? undefined : message.tokenInAmount;
    return obj;
  },
  fromAminoMsg(object: MsgSwapExactAmountOutResponseAminoMsg): MsgSwapExactAmountOutResponse {
    return MsgSwapExactAmountOutResponse.fromAmino(object.value);
  },
  toAminoMsg(message: MsgSwapExactAmountOutResponse, useInterfaces: boolean = false): MsgSwapExactAmountOutResponseAminoMsg {
    return {
      type: "osmosis/gamm/swap-exact-amount-out-response",
      value: MsgSwapExactAmountOutResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgSwapExactAmountOutResponseProtoMsg, useInterfaces: boolean = false): MsgSwapExactAmountOutResponse {
    return MsgSwapExactAmountOutResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgSwapExactAmountOutResponse): Uint8Array {
    return MsgSwapExactAmountOutResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSwapExactAmountOutResponse): MsgSwapExactAmountOutResponseProtoMsg {
    return {
      typeUrl: "/osmosis.gamm.v1beta1.MsgSwapExactAmountOutResponse",
      value: MsgSwapExactAmountOutResponse.encode(message).finish()
    };
  }
};
function createBaseMsgJoinSwapExternAmountIn(): MsgJoinSwapExternAmountIn {
  return {
    sender: "",
    poolId: BigInt(0),
    tokenIn: Coin.fromPartial({}),
    shareOutMinAmount: ""
  };
}
export const MsgJoinSwapExternAmountIn = {
  typeUrl: "/osmosis.gamm.v1beta1.MsgJoinSwapExternAmountIn",
  encode(message: MsgJoinSwapExternAmountIn, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.poolId !== BigInt(0)) {
      writer.uint32(16).uint64(message.poolId);
    }
    if (message.tokenIn !== undefined) {
      Coin.encode(message.tokenIn, writer.uint32(26).fork()).ldelim();
    }
    if (message.shareOutMinAmount !== "") {
      writer.uint32(34).string(message.shareOutMinAmount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgJoinSwapExternAmountIn {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgJoinSwapExternAmountIn();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.poolId = reader.uint64();
          break;
        case 3:
          message.tokenIn = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 4:
          message.shareOutMinAmount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgJoinSwapExternAmountIn>): MsgJoinSwapExternAmountIn {
    const message = createBaseMsgJoinSwapExternAmountIn();
    message.sender = object.sender ?? "";
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.tokenIn = object.tokenIn !== undefined && object.tokenIn !== null ? Coin.fromPartial(object.tokenIn) : undefined;
    message.shareOutMinAmount = object.shareOutMinAmount ?? "";
    return message;
  },
  fromAmino(object: MsgJoinSwapExternAmountInAmino): MsgJoinSwapExternAmountIn {
    const message = createBaseMsgJoinSwapExternAmountIn();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.token_in !== undefined && object.token_in !== null) {
      message.tokenIn = Coin.fromAmino(object.token_in);
    }
    if (object.share_out_min_amount !== undefined && object.share_out_min_amount !== null) {
      message.shareOutMinAmount = object.share_out_min_amount;
    }
    return message;
  },
  toAmino(message: MsgJoinSwapExternAmountIn, useInterfaces: boolean = false): MsgJoinSwapExternAmountInAmino {
    const obj: any = {};
    obj.sender = message.sender === "" ? undefined : message.sender;
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.token_in = message.tokenIn ? Coin.toAmino(message.tokenIn, useInterfaces) : undefined;
    obj.share_out_min_amount = message.shareOutMinAmount === "" ? undefined : message.shareOutMinAmount;
    return obj;
  },
  fromAminoMsg(object: MsgJoinSwapExternAmountInAminoMsg): MsgJoinSwapExternAmountIn {
    return MsgJoinSwapExternAmountIn.fromAmino(object.value);
  },
  toAminoMsg(message: MsgJoinSwapExternAmountIn, useInterfaces: boolean = false): MsgJoinSwapExternAmountInAminoMsg {
    return {
      type: "osmosis/gamm/join-swap-extern-amount-in",
      value: MsgJoinSwapExternAmountIn.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgJoinSwapExternAmountInProtoMsg, useInterfaces: boolean = false): MsgJoinSwapExternAmountIn {
    return MsgJoinSwapExternAmountIn.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgJoinSwapExternAmountIn): Uint8Array {
    return MsgJoinSwapExternAmountIn.encode(message).finish();
  },
  toProtoMsg(message: MsgJoinSwapExternAmountIn): MsgJoinSwapExternAmountInProtoMsg {
    return {
      typeUrl: "/osmosis.gamm.v1beta1.MsgJoinSwapExternAmountIn",
      value: MsgJoinSwapExternAmountIn.encode(message).finish()
    };
  }
};
function createBaseMsgJoinSwapExternAmountInResponse(): MsgJoinSwapExternAmountInResponse {
  return {
    shareOutAmount: ""
  };
}
export const MsgJoinSwapExternAmountInResponse = {
  typeUrl: "/osmosis.gamm.v1beta1.MsgJoinSwapExternAmountInResponse",
  encode(message: MsgJoinSwapExternAmountInResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.shareOutAmount !== "") {
      writer.uint32(10).string(message.shareOutAmount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgJoinSwapExternAmountInResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgJoinSwapExternAmountInResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.shareOutAmount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgJoinSwapExternAmountInResponse>): MsgJoinSwapExternAmountInResponse {
    const message = createBaseMsgJoinSwapExternAmountInResponse();
    message.shareOutAmount = object.shareOutAmount ?? "";
    return message;
  },
  fromAmino(object: MsgJoinSwapExternAmountInResponseAmino): MsgJoinSwapExternAmountInResponse {
    const message = createBaseMsgJoinSwapExternAmountInResponse();
    if (object.share_out_amount !== undefined && object.share_out_amount !== null) {
      message.shareOutAmount = object.share_out_amount;
    }
    return message;
  },
  toAmino(message: MsgJoinSwapExternAmountInResponse, useInterfaces: boolean = false): MsgJoinSwapExternAmountInResponseAmino {
    const obj: any = {};
    obj.share_out_amount = message.shareOutAmount === "" ? undefined : message.shareOutAmount;
    return obj;
  },
  fromAminoMsg(object: MsgJoinSwapExternAmountInResponseAminoMsg): MsgJoinSwapExternAmountInResponse {
    return MsgJoinSwapExternAmountInResponse.fromAmino(object.value);
  },
  toAminoMsg(message: MsgJoinSwapExternAmountInResponse, useInterfaces: boolean = false): MsgJoinSwapExternAmountInResponseAminoMsg {
    return {
      type: "osmosis/gamm/join-swap-extern-amount-in-response",
      value: MsgJoinSwapExternAmountInResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgJoinSwapExternAmountInResponseProtoMsg, useInterfaces: boolean = false): MsgJoinSwapExternAmountInResponse {
    return MsgJoinSwapExternAmountInResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgJoinSwapExternAmountInResponse): Uint8Array {
    return MsgJoinSwapExternAmountInResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgJoinSwapExternAmountInResponse): MsgJoinSwapExternAmountInResponseProtoMsg {
    return {
      typeUrl: "/osmosis.gamm.v1beta1.MsgJoinSwapExternAmountInResponse",
      value: MsgJoinSwapExternAmountInResponse.encode(message).finish()
    };
  }
};
function createBaseMsgJoinSwapShareAmountOut(): MsgJoinSwapShareAmountOut {
  return {
    sender: "",
    poolId: BigInt(0),
    tokenInDenom: "",
    shareOutAmount: "",
    tokenInMaxAmount: ""
  };
}
export const MsgJoinSwapShareAmountOut = {
  typeUrl: "/osmosis.gamm.v1beta1.MsgJoinSwapShareAmountOut",
  encode(message: MsgJoinSwapShareAmountOut, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.poolId !== BigInt(0)) {
      writer.uint32(16).uint64(message.poolId);
    }
    if (message.tokenInDenom !== "") {
      writer.uint32(26).string(message.tokenInDenom);
    }
    if (message.shareOutAmount !== "") {
      writer.uint32(34).string(message.shareOutAmount);
    }
    if (message.tokenInMaxAmount !== "") {
      writer.uint32(42).string(message.tokenInMaxAmount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgJoinSwapShareAmountOut {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgJoinSwapShareAmountOut();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.poolId = reader.uint64();
          break;
        case 3:
          message.tokenInDenom = reader.string();
          break;
        case 4:
          message.shareOutAmount = reader.string();
          break;
        case 5:
          message.tokenInMaxAmount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgJoinSwapShareAmountOut>): MsgJoinSwapShareAmountOut {
    const message = createBaseMsgJoinSwapShareAmountOut();
    message.sender = object.sender ?? "";
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.tokenInDenom = object.tokenInDenom ?? "";
    message.shareOutAmount = object.shareOutAmount ?? "";
    message.tokenInMaxAmount = object.tokenInMaxAmount ?? "";
    return message;
  },
  fromAmino(object: MsgJoinSwapShareAmountOutAmino): MsgJoinSwapShareAmountOut {
    const message = createBaseMsgJoinSwapShareAmountOut();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.token_in_denom !== undefined && object.token_in_denom !== null) {
      message.tokenInDenom = object.token_in_denom;
    }
    if (object.share_out_amount !== undefined && object.share_out_amount !== null) {
      message.shareOutAmount = object.share_out_amount;
    }
    if (object.token_in_max_amount !== undefined && object.token_in_max_amount !== null) {
      message.tokenInMaxAmount = object.token_in_max_amount;
    }
    return message;
  },
  toAmino(message: MsgJoinSwapShareAmountOut, useInterfaces: boolean = false): MsgJoinSwapShareAmountOutAmino {
    const obj: any = {};
    obj.sender = message.sender === "" ? undefined : message.sender;
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.token_in_denom = message.tokenInDenom === "" ? undefined : message.tokenInDenom;
    obj.share_out_amount = message.shareOutAmount === "" ? undefined : message.shareOutAmount;
    obj.token_in_max_amount = message.tokenInMaxAmount === "" ? undefined : message.tokenInMaxAmount;
    return obj;
  },
  fromAminoMsg(object: MsgJoinSwapShareAmountOutAminoMsg): MsgJoinSwapShareAmountOut {
    return MsgJoinSwapShareAmountOut.fromAmino(object.value);
  },
  toAminoMsg(message: MsgJoinSwapShareAmountOut, useInterfaces: boolean = false): MsgJoinSwapShareAmountOutAminoMsg {
    return {
      type: "osmosis/gamm/join-swap-share-amount-out",
      value: MsgJoinSwapShareAmountOut.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgJoinSwapShareAmountOutProtoMsg, useInterfaces: boolean = false): MsgJoinSwapShareAmountOut {
    return MsgJoinSwapShareAmountOut.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgJoinSwapShareAmountOut): Uint8Array {
    return MsgJoinSwapShareAmountOut.encode(message).finish();
  },
  toProtoMsg(message: MsgJoinSwapShareAmountOut): MsgJoinSwapShareAmountOutProtoMsg {
    return {
      typeUrl: "/osmosis.gamm.v1beta1.MsgJoinSwapShareAmountOut",
      value: MsgJoinSwapShareAmountOut.encode(message).finish()
    };
  }
};
function createBaseMsgJoinSwapShareAmountOutResponse(): MsgJoinSwapShareAmountOutResponse {
  return {
    tokenInAmount: ""
  };
}
export const MsgJoinSwapShareAmountOutResponse = {
  typeUrl: "/osmosis.gamm.v1beta1.MsgJoinSwapShareAmountOutResponse",
  encode(message: MsgJoinSwapShareAmountOutResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.tokenInAmount !== "") {
      writer.uint32(10).string(message.tokenInAmount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgJoinSwapShareAmountOutResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgJoinSwapShareAmountOutResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tokenInAmount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgJoinSwapShareAmountOutResponse>): MsgJoinSwapShareAmountOutResponse {
    const message = createBaseMsgJoinSwapShareAmountOutResponse();
    message.tokenInAmount = object.tokenInAmount ?? "";
    return message;
  },
  fromAmino(object: MsgJoinSwapShareAmountOutResponseAmino): MsgJoinSwapShareAmountOutResponse {
    const message = createBaseMsgJoinSwapShareAmountOutResponse();
    if (object.token_in_amount !== undefined && object.token_in_amount !== null) {
      message.tokenInAmount = object.token_in_amount;
    }
    return message;
  },
  toAmino(message: MsgJoinSwapShareAmountOutResponse, useInterfaces: boolean = false): MsgJoinSwapShareAmountOutResponseAmino {
    const obj: any = {};
    obj.token_in_amount = message.tokenInAmount === "" ? undefined : message.tokenInAmount;
    return obj;
  },
  fromAminoMsg(object: MsgJoinSwapShareAmountOutResponseAminoMsg): MsgJoinSwapShareAmountOutResponse {
    return MsgJoinSwapShareAmountOutResponse.fromAmino(object.value);
  },
  toAminoMsg(message: MsgJoinSwapShareAmountOutResponse, useInterfaces: boolean = false): MsgJoinSwapShareAmountOutResponseAminoMsg {
    return {
      type: "osmosis/gamm/join-swap-share-amount-out-response",
      value: MsgJoinSwapShareAmountOutResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgJoinSwapShareAmountOutResponseProtoMsg, useInterfaces: boolean = false): MsgJoinSwapShareAmountOutResponse {
    return MsgJoinSwapShareAmountOutResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgJoinSwapShareAmountOutResponse): Uint8Array {
    return MsgJoinSwapShareAmountOutResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgJoinSwapShareAmountOutResponse): MsgJoinSwapShareAmountOutResponseProtoMsg {
    return {
      typeUrl: "/osmosis.gamm.v1beta1.MsgJoinSwapShareAmountOutResponse",
      value: MsgJoinSwapShareAmountOutResponse.encode(message).finish()
    };
  }
};
function createBaseMsgExitSwapShareAmountIn(): MsgExitSwapShareAmountIn {
  return {
    sender: "",
    poolId: BigInt(0),
    tokenOutDenom: "",
    shareInAmount: "",
    tokenOutMinAmount: ""
  };
}
export const MsgExitSwapShareAmountIn = {
  typeUrl: "/osmosis.gamm.v1beta1.MsgExitSwapShareAmountIn",
  encode(message: MsgExitSwapShareAmountIn, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.poolId !== BigInt(0)) {
      writer.uint32(16).uint64(message.poolId);
    }
    if (message.tokenOutDenom !== "") {
      writer.uint32(26).string(message.tokenOutDenom);
    }
    if (message.shareInAmount !== "") {
      writer.uint32(34).string(message.shareInAmount);
    }
    if (message.tokenOutMinAmount !== "") {
      writer.uint32(42).string(message.tokenOutMinAmount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgExitSwapShareAmountIn {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgExitSwapShareAmountIn();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.poolId = reader.uint64();
          break;
        case 3:
          message.tokenOutDenom = reader.string();
          break;
        case 4:
          message.shareInAmount = reader.string();
          break;
        case 5:
          message.tokenOutMinAmount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgExitSwapShareAmountIn>): MsgExitSwapShareAmountIn {
    const message = createBaseMsgExitSwapShareAmountIn();
    message.sender = object.sender ?? "";
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.tokenOutDenom = object.tokenOutDenom ?? "";
    message.shareInAmount = object.shareInAmount ?? "";
    message.tokenOutMinAmount = object.tokenOutMinAmount ?? "";
    return message;
  },
  fromAmino(object: MsgExitSwapShareAmountInAmino): MsgExitSwapShareAmountIn {
    const message = createBaseMsgExitSwapShareAmountIn();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.token_out_denom !== undefined && object.token_out_denom !== null) {
      message.tokenOutDenom = object.token_out_denom;
    }
    if (object.share_in_amount !== undefined && object.share_in_amount !== null) {
      message.shareInAmount = object.share_in_amount;
    }
    if (object.token_out_min_amount !== undefined && object.token_out_min_amount !== null) {
      message.tokenOutMinAmount = object.token_out_min_amount;
    }
    return message;
  },
  toAmino(message: MsgExitSwapShareAmountIn, useInterfaces: boolean = false): MsgExitSwapShareAmountInAmino {
    const obj: any = {};
    obj.sender = message.sender === "" ? undefined : message.sender;
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.token_out_denom = message.tokenOutDenom === "" ? undefined : message.tokenOutDenom;
    obj.share_in_amount = message.shareInAmount === "" ? undefined : message.shareInAmount;
    obj.token_out_min_amount = message.tokenOutMinAmount === "" ? undefined : message.tokenOutMinAmount;
    return obj;
  },
  fromAminoMsg(object: MsgExitSwapShareAmountInAminoMsg): MsgExitSwapShareAmountIn {
    return MsgExitSwapShareAmountIn.fromAmino(object.value);
  },
  toAminoMsg(message: MsgExitSwapShareAmountIn, useInterfaces: boolean = false): MsgExitSwapShareAmountInAminoMsg {
    return {
      type: "osmosis/gamm/exit-swap-share-amount-in",
      value: MsgExitSwapShareAmountIn.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgExitSwapShareAmountInProtoMsg, useInterfaces: boolean = false): MsgExitSwapShareAmountIn {
    return MsgExitSwapShareAmountIn.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgExitSwapShareAmountIn): Uint8Array {
    return MsgExitSwapShareAmountIn.encode(message).finish();
  },
  toProtoMsg(message: MsgExitSwapShareAmountIn): MsgExitSwapShareAmountInProtoMsg {
    return {
      typeUrl: "/osmosis.gamm.v1beta1.MsgExitSwapShareAmountIn",
      value: MsgExitSwapShareAmountIn.encode(message).finish()
    };
  }
};
function createBaseMsgExitSwapShareAmountInResponse(): MsgExitSwapShareAmountInResponse {
  return {
    tokenOutAmount: ""
  };
}
export const MsgExitSwapShareAmountInResponse = {
  typeUrl: "/osmosis.gamm.v1beta1.MsgExitSwapShareAmountInResponse",
  encode(message: MsgExitSwapShareAmountInResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.tokenOutAmount !== "") {
      writer.uint32(10).string(message.tokenOutAmount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgExitSwapShareAmountInResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgExitSwapShareAmountInResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tokenOutAmount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgExitSwapShareAmountInResponse>): MsgExitSwapShareAmountInResponse {
    const message = createBaseMsgExitSwapShareAmountInResponse();
    message.tokenOutAmount = object.tokenOutAmount ?? "";
    return message;
  },
  fromAmino(object: MsgExitSwapShareAmountInResponseAmino): MsgExitSwapShareAmountInResponse {
    const message = createBaseMsgExitSwapShareAmountInResponse();
    if (object.token_out_amount !== undefined && object.token_out_amount !== null) {
      message.tokenOutAmount = object.token_out_amount;
    }
    return message;
  },
  toAmino(message: MsgExitSwapShareAmountInResponse, useInterfaces: boolean = false): MsgExitSwapShareAmountInResponseAmino {
    const obj: any = {};
    obj.token_out_amount = message.tokenOutAmount === "" ? undefined : message.tokenOutAmount;
    return obj;
  },
  fromAminoMsg(object: MsgExitSwapShareAmountInResponseAminoMsg): MsgExitSwapShareAmountInResponse {
    return MsgExitSwapShareAmountInResponse.fromAmino(object.value);
  },
  toAminoMsg(message: MsgExitSwapShareAmountInResponse, useInterfaces: boolean = false): MsgExitSwapShareAmountInResponseAminoMsg {
    return {
      type: "osmosis/gamm/exit-swap-share-amount-in-response",
      value: MsgExitSwapShareAmountInResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgExitSwapShareAmountInResponseProtoMsg, useInterfaces: boolean = false): MsgExitSwapShareAmountInResponse {
    return MsgExitSwapShareAmountInResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgExitSwapShareAmountInResponse): Uint8Array {
    return MsgExitSwapShareAmountInResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgExitSwapShareAmountInResponse): MsgExitSwapShareAmountInResponseProtoMsg {
    return {
      typeUrl: "/osmosis.gamm.v1beta1.MsgExitSwapShareAmountInResponse",
      value: MsgExitSwapShareAmountInResponse.encode(message).finish()
    };
  }
};
function createBaseMsgExitSwapExternAmountOut(): MsgExitSwapExternAmountOut {
  return {
    sender: "",
    poolId: BigInt(0),
    tokenOut: Coin.fromPartial({}),
    shareInMaxAmount: ""
  };
}
export const MsgExitSwapExternAmountOut = {
  typeUrl: "/osmosis.gamm.v1beta1.MsgExitSwapExternAmountOut",
  encode(message: MsgExitSwapExternAmountOut, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.poolId !== BigInt(0)) {
      writer.uint32(16).uint64(message.poolId);
    }
    if (message.tokenOut !== undefined) {
      Coin.encode(message.tokenOut, writer.uint32(26).fork()).ldelim();
    }
    if (message.shareInMaxAmount !== "") {
      writer.uint32(34).string(message.shareInMaxAmount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgExitSwapExternAmountOut {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgExitSwapExternAmountOut();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.poolId = reader.uint64();
          break;
        case 3:
          message.tokenOut = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 4:
          message.shareInMaxAmount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgExitSwapExternAmountOut>): MsgExitSwapExternAmountOut {
    const message = createBaseMsgExitSwapExternAmountOut();
    message.sender = object.sender ?? "";
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.tokenOut = object.tokenOut !== undefined && object.tokenOut !== null ? Coin.fromPartial(object.tokenOut) : undefined;
    message.shareInMaxAmount = object.shareInMaxAmount ?? "";
    return message;
  },
  fromAmino(object: MsgExitSwapExternAmountOutAmino): MsgExitSwapExternAmountOut {
    const message = createBaseMsgExitSwapExternAmountOut();
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    }
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.poolId = BigInt(object.pool_id);
    }
    if (object.token_out !== undefined && object.token_out !== null) {
      message.tokenOut = Coin.fromAmino(object.token_out);
    }
    if (object.share_in_max_amount !== undefined && object.share_in_max_amount !== null) {
      message.shareInMaxAmount = object.share_in_max_amount;
    }
    return message;
  },
  toAmino(message: MsgExitSwapExternAmountOut, useInterfaces: boolean = false): MsgExitSwapExternAmountOutAmino {
    const obj: any = {};
    obj.sender = message.sender === "" ? undefined : message.sender;
    obj.pool_id = message.poolId !== BigInt(0) ? message.poolId.toString() : undefined;
    obj.token_out = message.tokenOut ? Coin.toAmino(message.tokenOut, useInterfaces) : undefined;
    obj.share_in_max_amount = message.shareInMaxAmount === "" ? undefined : message.shareInMaxAmount;
    return obj;
  },
  fromAminoMsg(object: MsgExitSwapExternAmountOutAminoMsg): MsgExitSwapExternAmountOut {
    return MsgExitSwapExternAmountOut.fromAmino(object.value);
  },
  toAminoMsg(message: MsgExitSwapExternAmountOut, useInterfaces: boolean = false): MsgExitSwapExternAmountOutAminoMsg {
    return {
      type: "osmosis/gamm/exit-swap-extern-amount-out",
      value: MsgExitSwapExternAmountOut.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgExitSwapExternAmountOutProtoMsg, useInterfaces: boolean = false): MsgExitSwapExternAmountOut {
    return MsgExitSwapExternAmountOut.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgExitSwapExternAmountOut): Uint8Array {
    return MsgExitSwapExternAmountOut.encode(message).finish();
  },
  toProtoMsg(message: MsgExitSwapExternAmountOut): MsgExitSwapExternAmountOutProtoMsg {
    return {
      typeUrl: "/osmosis.gamm.v1beta1.MsgExitSwapExternAmountOut",
      value: MsgExitSwapExternAmountOut.encode(message).finish()
    };
  }
};
function createBaseMsgExitSwapExternAmountOutResponse(): MsgExitSwapExternAmountOutResponse {
  return {
    shareInAmount: ""
  };
}
export const MsgExitSwapExternAmountOutResponse = {
  typeUrl: "/osmosis.gamm.v1beta1.MsgExitSwapExternAmountOutResponse",
  encode(message: MsgExitSwapExternAmountOutResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.shareInAmount !== "") {
      writer.uint32(10).string(message.shareInAmount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgExitSwapExternAmountOutResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgExitSwapExternAmountOutResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.shareInAmount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgExitSwapExternAmountOutResponse>): MsgExitSwapExternAmountOutResponse {
    const message = createBaseMsgExitSwapExternAmountOutResponse();
    message.shareInAmount = object.shareInAmount ?? "";
    return message;
  },
  fromAmino(object: MsgExitSwapExternAmountOutResponseAmino): MsgExitSwapExternAmountOutResponse {
    const message = createBaseMsgExitSwapExternAmountOutResponse();
    if (object.share_in_amount !== undefined && object.share_in_amount !== null) {
      message.shareInAmount = object.share_in_amount;
    }
    return message;
  },
  toAmino(message: MsgExitSwapExternAmountOutResponse, useInterfaces: boolean = false): MsgExitSwapExternAmountOutResponseAmino {
    const obj: any = {};
    obj.share_in_amount = message.shareInAmount === "" ? undefined : message.shareInAmount;
    return obj;
  },
  fromAminoMsg(object: MsgExitSwapExternAmountOutResponseAminoMsg): MsgExitSwapExternAmountOutResponse {
    return MsgExitSwapExternAmountOutResponse.fromAmino(object.value);
  },
  toAminoMsg(message: MsgExitSwapExternAmountOutResponse, useInterfaces: boolean = false): MsgExitSwapExternAmountOutResponseAminoMsg {
    return {
      type: "osmosis/gamm/exit-swap-extern-amount-out-response",
      value: MsgExitSwapExternAmountOutResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgExitSwapExternAmountOutResponseProtoMsg, useInterfaces: boolean = false): MsgExitSwapExternAmountOutResponse {
    return MsgExitSwapExternAmountOutResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgExitSwapExternAmountOutResponse): Uint8Array {
    return MsgExitSwapExternAmountOutResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgExitSwapExternAmountOutResponse): MsgExitSwapExternAmountOutResponseProtoMsg {
    return {
      typeUrl: "/osmosis.gamm.v1beta1.MsgExitSwapExternAmountOutResponse",
      value: MsgExitSwapExternAmountOutResponse.encode(message).finish()
    };
  }
};