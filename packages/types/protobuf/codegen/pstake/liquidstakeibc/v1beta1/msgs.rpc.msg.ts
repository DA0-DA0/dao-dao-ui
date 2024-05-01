import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { MsgRegisterHostChain, MsgRegisterHostChainResponse, MsgUpdateHostChain, MsgUpdateHostChainResponse, MsgLiquidStake, MsgLiquidStakeResponse, MsgLiquidStakeLSM, MsgLiquidStakeLSMResponse, MsgLiquidUnstake, MsgLiquidUnstakeResponse, MsgRedeem, MsgRedeemResponse, MsgUpdateParams, MsgUpdateParamsResponse } from "./msgs";
/** Msg defines the liquidstakeibc services. */
export interface Msg {
  registerHostChain(request: MsgRegisterHostChain): Promise<MsgRegisterHostChainResponse>;
  updateHostChain(request: MsgUpdateHostChain): Promise<MsgUpdateHostChainResponse>;
  liquidStake(request: MsgLiquidStake): Promise<MsgLiquidStakeResponse>;
  liquidStakeLSM(request: MsgLiquidStakeLSM): Promise<MsgLiquidStakeLSMResponse>;
  liquidUnstake(request: MsgLiquidUnstake): Promise<MsgLiquidUnstakeResponse>;
  redeem(request: MsgRedeem): Promise<MsgRedeemResponse>;
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.registerHostChain = this.registerHostChain.bind(this);
    this.updateHostChain = this.updateHostChain.bind(this);
    this.liquidStake = this.liquidStake.bind(this);
    this.liquidStakeLSM = this.liquidStakeLSM.bind(this);
    this.liquidUnstake = this.liquidUnstake.bind(this);
    this.redeem = this.redeem.bind(this);
    this.updateParams = this.updateParams.bind(this);
  }
  registerHostChain(request: MsgRegisterHostChain, useInterfaces: boolean = true): Promise<MsgRegisterHostChainResponse> {
    const data = MsgRegisterHostChain.encode(request).finish();
    const promise = this.rpc.request("pstake.liquidstakeibc.v1beta1.Msg", "RegisterHostChain", data);
    return promise.then(data => MsgRegisterHostChainResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  updateHostChain(request: MsgUpdateHostChain, useInterfaces: boolean = true): Promise<MsgUpdateHostChainResponse> {
    const data = MsgUpdateHostChain.encode(request).finish();
    const promise = this.rpc.request("pstake.liquidstakeibc.v1beta1.Msg", "UpdateHostChain", data);
    return promise.then(data => MsgUpdateHostChainResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  liquidStake(request: MsgLiquidStake, useInterfaces: boolean = true): Promise<MsgLiquidStakeResponse> {
    const data = MsgLiquidStake.encode(request).finish();
    const promise = this.rpc.request("pstake.liquidstakeibc.v1beta1.Msg", "LiquidStake", data);
    return promise.then(data => MsgLiquidStakeResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  liquidStakeLSM(request: MsgLiquidStakeLSM, useInterfaces: boolean = true): Promise<MsgLiquidStakeLSMResponse> {
    const data = MsgLiquidStakeLSM.encode(request).finish();
    const promise = this.rpc.request("pstake.liquidstakeibc.v1beta1.Msg", "LiquidStakeLSM", data);
    return promise.then(data => MsgLiquidStakeLSMResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  liquidUnstake(request: MsgLiquidUnstake, useInterfaces: boolean = true): Promise<MsgLiquidUnstakeResponse> {
    const data = MsgLiquidUnstake.encode(request).finish();
    const promise = this.rpc.request("pstake.liquidstakeibc.v1beta1.Msg", "LiquidUnstake", data);
    return promise.then(data => MsgLiquidUnstakeResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  redeem(request: MsgRedeem, useInterfaces: boolean = true): Promise<MsgRedeemResponse> {
    const data = MsgRedeem.encode(request).finish();
    const promise = this.rpc.request("pstake.liquidstakeibc.v1beta1.Msg", "Redeem", data);
    return promise.then(data => MsgRedeemResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  updateParams(request: MsgUpdateParams, useInterfaces: boolean = true): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("pstake.liquidstakeibc.v1beta1.Msg", "UpdateParams", data);
    return promise.then(data => MsgUpdateParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}