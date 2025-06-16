import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { MsgUpdateParams, MsgUpdateParamsResponse, MsgRegisterHostChain, MsgRegisterHostChainResponse, MsgUpdateHostChain, MsgUpdateHostChainResponse, MsgStake, MsgStakeResponse, MsgStakeLsmShares, MsgStakeLsmSharesResponse, MsgUnstake, MsgUnstakeResponse, MsgRedeemUnstaked, MsgRedeemUnstakedResponse, MsgInstantUnstake, MsgInstantUnstakeResponse, MsgRebalanceDelegations, MsgRebalanceDelegationsResponse, MsgRedelegate, MsgRedelegateResponse, MsgRegisterInterchainAccount, MsgRegisterInterchainAccountResponse, MsgCreateMultiSigConnection, MsgCreateMultiSigConnectionResponse, MsgUpdateMultiSigConnection, MsgUpdateMultiSigConnectionResponse, MsgAcknowledgeMultiSigPacket, MsgAcknowledgeMultiSigPacketResponse, MsgRegisterHostAccounts, MsgRegisterHostAccountsResponse, MsgRetryFailedLsmTransfer, MsgRetryFailedLsmTransferResponse } from "./tx";
/** Msg defines the Msg service. */
export interface Msg {
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
  registerHostChain(request: MsgRegisterHostChain): Promise<MsgRegisterHostChainResponse>;
  updateHostChain(request: MsgUpdateHostChain): Promise<MsgUpdateHostChainResponse>;
  stake(request: MsgStake): Promise<MsgStakeResponse>;
  stakeLsmShares(request: MsgStakeLsmShares): Promise<MsgStakeLsmSharesResponse>;
  unstake(request: MsgUnstake): Promise<MsgUnstakeResponse>;
  redeemUnstaked(request: MsgRedeemUnstaked): Promise<MsgRedeemUnstakedResponse>;
  instantUnstake(request: MsgInstantUnstake): Promise<MsgInstantUnstakeResponse>;
  rebalanceDelegations(request: MsgRebalanceDelegations): Promise<MsgRebalanceDelegationsResponse>;
  redelegate(request: MsgRedelegate): Promise<MsgRedelegateResponse>;
  registerInterchainAccount(request: MsgRegisterInterchainAccount): Promise<MsgRegisterInterchainAccountResponse>;
  createMultiSigConnection(request: MsgCreateMultiSigConnection): Promise<MsgCreateMultiSigConnectionResponse>;
  updateMultiSigConnection(request: MsgUpdateMultiSigConnection): Promise<MsgUpdateMultiSigConnectionResponse>;
  acknowledgeMultiSigPacket(request: MsgAcknowledgeMultiSigPacket): Promise<MsgAcknowledgeMultiSigPacketResponse>;
  registerHostAccounts(request: MsgRegisterHostAccounts): Promise<MsgRegisterHostAccountsResponse>;
  retryFailedLsmTransfer(request: MsgRetryFailedLsmTransfer): Promise<MsgRetryFailedLsmTransferResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.updateParams = this.updateParams.bind(this);
    this.registerHostChain = this.registerHostChain.bind(this);
    this.updateHostChain = this.updateHostChain.bind(this);
    this.stake = this.stake.bind(this);
    this.stakeLsmShares = this.stakeLsmShares.bind(this);
    this.unstake = this.unstake.bind(this);
    this.redeemUnstaked = this.redeemUnstaked.bind(this);
    this.instantUnstake = this.instantUnstake.bind(this);
    this.rebalanceDelegations = this.rebalanceDelegations.bind(this);
    this.redelegate = this.redelegate.bind(this);
    this.registerInterchainAccount = this.registerInterchainAccount.bind(this);
    this.createMultiSigConnection = this.createMultiSigConnection.bind(this);
    this.updateMultiSigConnection = this.updateMultiSigConnection.bind(this);
    this.acknowledgeMultiSigPacket = this.acknowledgeMultiSigPacket.bind(this);
    this.registerHostAccounts = this.registerHostAccounts.bind(this);
    this.retryFailedLsmTransfer = this.retryFailedLsmTransfer.bind(this);
  }
  updateParams(request: MsgUpdateParams, useInterfaces: boolean = true): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("pryzm.icstaking.v1.Msg", "UpdateParams", data);
    return promise.then(data => MsgUpdateParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  registerHostChain(request: MsgRegisterHostChain, useInterfaces: boolean = true): Promise<MsgRegisterHostChainResponse> {
    const data = MsgRegisterHostChain.encode(request).finish();
    const promise = this.rpc.request("pryzm.icstaking.v1.Msg", "RegisterHostChain", data);
    return promise.then(data => MsgRegisterHostChainResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  updateHostChain(request: MsgUpdateHostChain, useInterfaces: boolean = true): Promise<MsgUpdateHostChainResponse> {
    const data = MsgUpdateHostChain.encode(request).finish();
    const promise = this.rpc.request("pryzm.icstaking.v1.Msg", "UpdateHostChain", data);
    return promise.then(data => MsgUpdateHostChainResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  stake(request: MsgStake, useInterfaces: boolean = true): Promise<MsgStakeResponse> {
    const data = MsgStake.encode(request).finish();
    const promise = this.rpc.request("pryzm.icstaking.v1.Msg", "Stake", data);
    return promise.then(data => MsgStakeResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  stakeLsmShares(request: MsgStakeLsmShares, useInterfaces: boolean = true): Promise<MsgStakeLsmSharesResponse> {
    const data = MsgStakeLsmShares.encode(request).finish();
    const promise = this.rpc.request("pryzm.icstaking.v1.Msg", "StakeLsmShares", data);
    return promise.then(data => MsgStakeLsmSharesResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  unstake(request: MsgUnstake, useInterfaces: boolean = true): Promise<MsgUnstakeResponse> {
    const data = MsgUnstake.encode(request).finish();
    const promise = this.rpc.request("pryzm.icstaking.v1.Msg", "Unstake", data);
    return promise.then(data => MsgUnstakeResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  redeemUnstaked(request: MsgRedeemUnstaked, useInterfaces: boolean = true): Promise<MsgRedeemUnstakedResponse> {
    const data = MsgRedeemUnstaked.encode(request).finish();
    const promise = this.rpc.request("pryzm.icstaking.v1.Msg", "RedeemUnstaked", data);
    return promise.then(data => MsgRedeemUnstakedResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  instantUnstake(request: MsgInstantUnstake, useInterfaces: boolean = true): Promise<MsgInstantUnstakeResponse> {
    const data = MsgInstantUnstake.encode(request).finish();
    const promise = this.rpc.request("pryzm.icstaking.v1.Msg", "InstantUnstake", data);
    return promise.then(data => MsgInstantUnstakeResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  rebalanceDelegations(request: MsgRebalanceDelegations, useInterfaces: boolean = true): Promise<MsgRebalanceDelegationsResponse> {
    const data = MsgRebalanceDelegations.encode(request).finish();
    const promise = this.rpc.request("pryzm.icstaking.v1.Msg", "RebalanceDelegations", data);
    return promise.then(data => MsgRebalanceDelegationsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  redelegate(request: MsgRedelegate, useInterfaces: boolean = true): Promise<MsgRedelegateResponse> {
    const data = MsgRedelegate.encode(request).finish();
    const promise = this.rpc.request("pryzm.icstaking.v1.Msg", "Redelegate", data);
    return promise.then(data => MsgRedelegateResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  registerInterchainAccount(request: MsgRegisterInterchainAccount, useInterfaces: boolean = true): Promise<MsgRegisterInterchainAccountResponse> {
    const data = MsgRegisterInterchainAccount.encode(request).finish();
    const promise = this.rpc.request("pryzm.icstaking.v1.Msg", "RegisterInterchainAccount", data);
    return promise.then(data => MsgRegisterInterchainAccountResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  createMultiSigConnection(request: MsgCreateMultiSigConnection, useInterfaces: boolean = true): Promise<MsgCreateMultiSigConnectionResponse> {
    const data = MsgCreateMultiSigConnection.encode(request).finish();
    const promise = this.rpc.request("pryzm.icstaking.v1.Msg", "CreateMultiSigConnection", data);
    return promise.then(data => MsgCreateMultiSigConnectionResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  updateMultiSigConnection(request: MsgUpdateMultiSigConnection, useInterfaces: boolean = true): Promise<MsgUpdateMultiSigConnectionResponse> {
    const data = MsgUpdateMultiSigConnection.encode(request).finish();
    const promise = this.rpc.request("pryzm.icstaking.v1.Msg", "UpdateMultiSigConnection", data);
    return promise.then(data => MsgUpdateMultiSigConnectionResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  acknowledgeMultiSigPacket(request: MsgAcknowledgeMultiSigPacket, useInterfaces: boolean = true): Promise<MsgAcknowledgeMultiSigPacketResponse> {
    const data = MsgAcknowledgeMultiSigPacket.encode(request).finish();
    const promise = this.rpc.request("pryzm.icstaking.v1.Msg", "AcknowledgeMultiSigPacket", data);
    return promise.then(data => MsgAcknowledgeMultiSigPacketResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  registerHostAccounts(request: MsgRegisterHostAccounts, useInterfaces: boolean = true): Promise<MsgRegisterHostAccountsResponse> {
    const data = MsgRegisterHostAccounts.encode(request).finish();
    const promise = this.rpc.request("pryzm.icstaking.v1.Msg", "RegisterHostAccounts", data);
    return promise.then(data => MsgRegisterHostAccountsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  retryFailedLsmTransfer(request: MsgRetryFailedLsmTransfer, useInterfaces: boolean = true): Promise<MsgRetryFailedLsmTransferResponse> {
    const data = MsgRetryFailedLsmTransfer.encode(request).finish();
    const promise = this.rpc.request("pryzm.icstaking.v1.Msg", "RetryFailedLsmTransfer", data);
    return promise.then(data => MsgRetryFailedLsmTransferResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}