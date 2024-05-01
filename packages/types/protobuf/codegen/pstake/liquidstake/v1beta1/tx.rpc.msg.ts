import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { MsgLiquidStake, MsgLiquidStakeResponse, MsgLiquidUnstake, MsgLiquidUnstakeResponse, MsgStakeToLP, MsgStakeToLPResponse, MsgUpdateParams, MsgUpdateParamsResponse, MsgUpdateWhitelistedValidators, MsgUpdateWhitelistedValidatorsResponse, MsgSetModulePaused, MsgSetModulePausedResponse } from "./tx";
/** Msg defines the liquid staking Msg service. */
export interface Msg {
  /**
   * LiquidStake defines a method for performing a delegation of coins
   * from a delegator to whitelisted validators.
   */
  liquidStake(request: MsgLiquidStake): Promise<MsgLiquidStakeResponse>;
  /**
   * LiquidUnstake defines a method for performing an undelegation of liquid
   * staking from a delegate.
   */
  liquidUnstake(request: MsgLiquidUnstake): Promise<MsgLiquidUnstakeResponse>;
  /**
   * StakeToLP defines a method for LSM-transfer of staked XPRT
   * into stkXPRT with locking into an LP.
   */
  stakeToLP(request: MsgStakeToLP): Promise<MsgStakeToLPResponse>;
  /** UpdateParams defines a method to update the module params. */
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
  /**
   * UpdateWhitelistedValidators defines a method to update the whitelisted
   * validators list.
   */
  updateWhitelistedValidators(request: MsgUpdateWhitelistedValidators): Promise<MsgUpdateWhitelistedValidatorsResponse>;
  /**
   * SetModulePaused  defines a method to update the module's pause status,
   * setting value of the safety flag in params.
   */
  setModulePaused(request: MsgSetModulePaused): Promise<MsgSetModulePausedResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.liquidStake = this.liquidStake.bind(this);
    this.liquidUnstake = this.liquidUnstake.bind(this);
    this.stakeToLP = this.stakeToLP.bind(this);
    this.updateParams = this.updateParams.bind(this);
    this.updateWhitelistedValidators = this.updateWhitelistedValidators.bind(this);
    this.setModulePaused = this.setModulePaused.bind(this);
  }
  liquidStake(request: MsgLiquidStake, useInterfaces: boolean = true): Promise<MsgLiquidStakeResponse> {
    const data = MsgLiquidStake.encode(request).finish();
    const promise = this.rpc.request("pstake.liquidstake.v1beta1.Msg", "LiquidStake", data);
    return promise.then(data => MsgLiquidStakeResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  liquidUnstake(request: MsgLiquidUnstake, useInterfaces: boolean = true): Promise<MsgLiquidUnstakeResponse> {
    const data = MsgLiquidUnstake.encode(request).finish();
    const promise = this.rpc.request("pstake.liquidstake.v1beta1.Msg", "LiquidUnstake", data);
    return promise.then(data => MsgLiquidUnstakeResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  stakeToLP(request: MsgStakeToLP, useInterfaces: boolean = true): Promise<MsgStakeToLPResponse> {
    const data = MsgStakeToLP.encode(request).finish();
    const promise = this.rpc.request("pstake.liquidstake.v1beta1.Msg", "StakeToLP", data);
    return promise.then(data => MsgStakeToLPResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  updateParams(request: MsgUpdateParams, useInterfaces: boolean = true): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("pstake.liquidstake.v1beta1.Msg", "UpdateParams", data);
    return promise.then(data => MsgUpdateParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  updateWhitelistedValidators(request: MsgUpdateWhitelistedValidators, useInterfaces: boolean = true): Promise<MsgUpdateWhitelistedValidatorsResponse> {
    const data = MsgUpdateWhitelistedValidators.encode(request).finish();
    const promise = this.rpc.request("pstake.liquidstake.v1beta1.Msg", "UpdateWhitelistedValidators", data);
    return promise.then(data => MsgUpdateWhitelistedValidatorsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  setModulePaused(request: MsgSetModulePaused, useInterfaces: boolean = true): Promise<MsgSetModulePausedResponse> {
    const data = MsgSetModulePaused.encode(request).finish();
    const promise = this.rpc.request("pstake.liquidstake.v1beta1.Msg", "SetModulePaused", data);
    return promise.then(data => MsgSetModulePausedResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}