import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { MsgDeposit, MsgDepositResponse, MsgWithdrawal, MsgWithdrawalResponse, MsgPlaceLimitOrder, MsgPlaceLimitOrderResponse, MsgWithdrawFilledLimitOrder, MsgWithdrawFilledLimitOrderResponse, MsgCancelLimitOrder, MsgCancelLimitOrderResponse, MsgMultiHopSwap, MsgMultiHopSwapResponse, MsgUpdateParams, MsgUpdateParamsResponse } from "./tx";
/** Msg defines the Msg service. */
export interface Msg {
  deposit(request: MsgDeposit): Promise<MsgDepositResponse>;
  withdrawal(request: MsgWithdrawal): Promise<MsgWithdrawalResponse>;
  placeLimitOrder(request: MsgPlaceLimitOrder): Promise<MsgPlaceLimitOrderResponse>;
  withdrawFilledLimitOrder(request: MsgWithdrawFilledLimitOrder): Promise<MsgWithdrawFilledLimitOrderResponse>;
  cancelLimitOrder(request: MsgCancelLimitOrder): Promise<MsgCancelLimitOrderResponse>;
  multiHopSwap(request: MsgMultiHopSwap): Promise<MsgMultiHopSwapResponse>;
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.deposit = this.deposit.bind(this);
    this.withdrawal = this.withdrawal.bind(this);
    this.placeLimitOrder = this.placeLimitOrder.bind(this);
    this.withdrawFilledLimitOrder = this.withdrawFilledLimitOrder.bind(this);
    this.cancelLimitOrder = this.cancelLimitOrder.bind(this);
    this.multiHopSwap = this.multiHopSwap.bind(this);
    this.updateParams = this.updateParams.bind(this);
  }
  deposit(request: MsgDeposit, useInterfaces: boolean = true): Promise<MsgDepositResponse> {
    const data = MsgDeposit.encode(request).finish();
    const promise = this.rpc.request("neutron.dex.Msg", "Deposit", data);
    return promise.then(data => MsgDepositResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  withdrawal(request: MsgWithdrawal, useInterfaces: boolean = true): Promise<MsgWithdrawalResponse> {
    const data = MsgWithdrawal.encode(request).finish();
    const promise = this.rpc.request("neutron.dex.Msg", "Withdrawal", data);
    return promise.then(data => MsgWithdrawalResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  placeLimitOrder(request: MsgPlaceLimitOrder, useInterfaces: boolean = true): Promise<MsgPlaceLimitOrderResponse> {
    const data = MsgPlaceLimitOrder.encode(request).finish();
    const promise = this.rpc.request("neutron.dex.Msg", "PlaceLimitOrder", data);
    return promise.then(data => MsgPlaceLimitOrderResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  withdrawFilledLimitOrder(request: MsgWithdrawFilledLimitOrder, useInterfaces: boolean = true): Promise<MsgWithdrawFilledLimitOrderResponse> {
    const data = MsgWithdrawFilledLimitOrder.encode(request).finish();
    const promise = this.rpc.request("neutron.dex.Msg", "WithdrawFilledLimitOrder", data);
    return promise.then(data => MsgWithdrawFilledLimitOrderResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  cancelLimitOrder(request: MsgCancelLimitOrder, useInterfaces: boolean = true): Promise<MsgCancelLimitOrderResponse> {
    const data = MsgCancelLimitOrder.encode(request).finish();
    const promise = this.rpc.request("neutron.dex.Msg", "CancelLimitOrder", data);
    return promise.then(data => MsgCancelLimitOrderResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  multiHopSwap(request: MsgMultiHopSwap, useInterfaces: boolean = true): Promise<MsgMultiHopSwapResponse> {
    const data = MsgMultiHopSwap.encode(request).finish();
    const promise = this.rpc.request("neutron.dex.Msg", "MultiHopSwap", data);
    return promise.then(data => MsgMultiHopSwapResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  updateParams(request: MsgUpdateParams, useInterfaces: boolean = true): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("neutron.dex.Msg", "UpdateParams", data);
    return promise.then(data => MsgUpdateParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}