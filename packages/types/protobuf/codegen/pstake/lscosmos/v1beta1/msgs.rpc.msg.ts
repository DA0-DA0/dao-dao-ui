import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { MsgLiquidStake, MsgLiquidStakeResponse, MsgLiquidUnstake, MsgLiquidUnstakeResponse, MsgRedeem, MsgRedeemResponse, MsgClaim, MsgClaimResponse, MsgRecreateICA, MsgRecreateICAResponse, MsgJumpStart, MsgJumpStartResponse, MsgChangeModuleState, MsgChangeModuleStateResponse, MsgReportSlashing, MsgReportSlashingResponse } from "./msgs";
/** Msg defines the lsCosmos services. */
export interface Msg {
  liquidStake(request: MsgLiquidStake): Promise<MsgLiquidStakeResponse>;
  liquidUnstake(request: MsgLiquidUnstake): Promise<MsgLiquidUnstakeResponse>;
  redeem(request: MsgRedeem): Promise<MsgRedeemResponse>;
  claim(request: MsgClaim): Promise<MsgClaimResponse>;
  recreateICA(request: MsgRecreateICA): Promise<MsgRecreateICAResponse>;
  jumpStart(request: MsgJumpStart): Promise<MsgJumpStartResponse>;
  changeModuleState(request: MsgChangeModuleState): Promise<MsgChangeModuleStateResponse>;
  reportSlashing(request: MsgReportSlashing): Promise<MsgReportSlashingResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.liquidStake = this.liquidStake.bind(this);
    this.liquidUnstake = this.liquidUnstake.bind(this);
    this.redeem = this.redeem.bind(this);
    this.claim = this.claim.bind(this);
    this.recreateICA = this.recreateICA.bind(this);
    this.jumpStart = this.jumpStart.bind(this);
    this.changeModuleState = this.changeModuleState.bind(this);
    this.reportSlashing = this.reportSlashing.bind(this);
  }
  liquidStake(request: MsgLiquidStake, useInterfaces: boolean = true): Promise<MsgLiquidStakeResponse> {
    const data = MsgLiquidStake.encode(request).finish();
    const promise = this.rpc.request("pstake.lscosmos.v1beta1.Msg", "LiquidStake", data);
    return promise.then(data => MsgLiquidStakeResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  liquidUnstake(request: MsgLiquidUnstake, useInterfaces: boolean = true): Promise<MsgLiquidUnstakeResponse> {
    const data = MsgLiquidUnstake.encode(request).finish();
    const promise = this.rpc.request("pstake.lscosmos.v1beta1.Msg", "LiquidUnstake", data);
    return promise.then(data => MsgLiquidUnstakeResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  redeem(request: MsgRedeem, useInterfaces: boolean = true): Promise<MsgRedeemResponse> {
    const data = MsgRedeem.encode(request).finish();
    const promise = this.rpc.request("pstake.lscosmos.v1beta1.Msg", "Redeem", data);
    return promise.then(data => MsgRedeemResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  claim(request: MsgClaim, useInterfaces: boolean = true): Promise<MsgClaimResponse> {
    const data = MsgClaim.encode(request).finish();
    const promise = this.rpc.request("pstake.lscosmos.v1beta1.Msg", "Claim", data);
    return promise.then(data => MsgClaimResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  recreateICA(request: MsgRecreateICA, useInterfaces: boolean = true): Promise<MsgRecreateICAResponse> {
    const data = MsgRecreateICA.encode(request).finish();
    const promise = this.rpc.request("pstake.lscosmos.v1beta1.Msg", "RecreateICA", data);
    return promise.then(data => MsgRecreateICAResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  jumpStart(request: MsgJumpStart, useInterfaces: boolean = true): Promise<MsgJumpStartResponse> {
    const data = MsgJumpStart.encode(request).finish();
    const promise = this.rpc.request("pstake.lscosmos.v1beta1.Msg", "JumpStart", data);
    return promise.then(data => MsgJumpStartResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  changeModuleState(request: MsgChangeModuleState, useInterfaces: boolean = true): Promise<MsgChangeModuleStateResponse> {
    const data = MsgChangeModuleState.encode(request).finish();
    const promise = this.rpc.request("pstake.lscosmos.v1beta1.Msg", "ChangeModuleState", data);
    return promise.then(data => MsgChangeModuleStateResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  reportSlashing(request: MsgReportSlashing, useInterfaces: boolean = true): Promise<MsgReportSlashingResponse> {
    const data = MsgReportSlashing.encode(request).finish();
    const promise = this.rpc.request("pstake.lscosmos.v1beta1.Msg", "ReportSlashing", data);
    return promise.then(data => MsgReportSlashingResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}