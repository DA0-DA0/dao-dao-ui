import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { MsgSwapExactAmountIn, MsgSwapExactAmountInResponse, MsgSwapExactAmountOut, MsgSwapExactAmountOutResponse, MsgSplitRouteSwapExactAmountIn, MsgSplitRouteSwapExactAmountInResponse, MsgSplitRouteSwapExactAmountOut, MsgSplitRouteSwapExactAmountOutResponse, MsgSetDenomPairTakerFee, MsgSetDenomPairTakerFeeResponse } from "./tx";
export interface Msg {
  swapExactAmountIn(request: MsgSwapExactAmountIn): Promise<MsgSwapExactAmountInResponse>;
  swapExactAmountOut(request: MsgSwapExactAmountOut): Promise<MsgSwapExactAmountOutResponse>;
  splitRouteSwapExactAmountIn(request: MsgSplitRouteSwapExactAmountIn): Promise<MsgSplitRouteSwapExactAmountInResponse>;
  splitRouteSwapExactAmountOut(request: MsgSplitRouteSwapExactAmountOut): Promise<MsgSplitRouteSwapExactAmountOutResponse>;
  setDenomPairTakerFee(request: MsgSetDenomPairTakerFee): Promise<MsgSetDenomPairTakerFeeResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.swapExactAmountIn = this.swapExactAmountIn.bind(this);
    this.swapExactAmountOut = this.swapExactAmountOut.bind(this);
    this.splitRouteSwapExactAmountIn = this.splitRouteSwapExactAmountIn.bind(this);
    this.splitRouteSwapExactAmountOut = this.splitRouteSwapExactAmountOut.bind(this);
    this.setDenomPairTakerFee = this.setDenomPairTakerFee.bind(this);
  }
  swapExactAmountIn(request: MsgSwapExactAmountIn, useInterfaces: boolean = true): Promise<MsgSwapExactAmountInResponse> {
    const data = MsgSwapExactAmountIn.encode(request).finish();
    const promise = this.rpc.request("osmosis.poolmanager.v1beta1.Msg", "SwapExactAmountIn", data);
    return promise.then(data => MsgSwapExactAmountInResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  swapExactAmountOut(request: MsgSwapExactAmountOut, useInterfaces: boolean = true): Promise<MsgSwapExactAmountOutResponse> {
    const data = MsgSwapExactAmountOut.encode(request).finish();
    const promise = this.rpc.request("osmosis.poolmanager.v1beta1.Msg", "SwapExactAmountOut", data);
    return promise.then(data => MsgSwapExactAmountOutResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  splitRouteSwapExactAmountIn(request: MsgSplitRouteSwapExactAmountIn, useInterfaces: boolean = true): Promise<MsgSplitRouteSwapExactAmountInResponse> {
    const data = MsgSplitRouteSwapExactAmountIn.encode(request).finish();
    const promise = this.rpc.request("osmosis.poolmanager.v1beta1.Msg", "SplitRouteSwapExactAmountIn", data);
    return promise.then(data => MsgSplitRouteSwapExactAmountInResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  splitRouteSwapExactAmountOut(request: MsgSplitRouteSwapExactAmountOut, useInterfaces: boolean = true): Promise<MsgSplitRouteSwapExactAmountOutResponse> {
    const data = MsgSplitRouteSwapExactAmountOut.encode(request).finish();
    const promise = this.rpc.request("osmosis.poolmanager.v1beta1.Msg", "SplitRouteSwapExactAmountOut", data);
    return promise.then(data => MsgSplitRouteSwapExactAmountOutResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  setDenomPairTakerFee(request: MsgSetDenomPairTakerFee, useInterfaces: boolean = true): Promise<MsgSetDenomPairTakerFeeResponse> {
    const data = MsgSetDenomPairTakerFee.encode(request).finish();
    const promise = this.rpc.request("osmosis.poolmanager.v1beta1.Msg", "SetDenomPairTakerFee", data);
    return promise.then(data => MsgSetDenomPairTakerFeeResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}