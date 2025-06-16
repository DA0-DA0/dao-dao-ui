import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { MsgUpdateParams, MsgUpdateParamsResponse, MsgStakePAssets, MsgStakePAssetsResponse, MsgUnstakePAssets, MsgUnstakePAssetsResponse, MsgSubmitVote, MsgSubmitVoteResponse, MsgSubmitProposal, MsgSubmitProposalResponse, MsgRetryVoteTransmit, MsgRetryVoteTransmitResponse } from "./tx";
/** Msg defines the Msg service. */
export interface Msg {
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
  stakePAssets(request: MsgStakePAssets): Promise<MsgStakePAssetsResponse>;
  unstakePAssets(request: MsgUnstakePAssets): Promise<MsgUnstakePAssetsResponse>;
  submitVote(request: MsgSubmitVote): Promise<MsgSubmitVoteResponse>;
  submitProposal(request: MsgSubmitProposal): Promise<MsgSubmitProposalResponse>;
  retryVoteTransmit(request: MsgRetryVoteTransmit): Promise<MsgRetryVoteTransmitResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.updateParams = this.updateParams.bind(this);
    this.stakePAssets = this.stakePAssets.bind(this);
    this.unstakePAssets = this.unstakePAssets.bind(this);
    this.submitVote = this.submitVote.bind(this);
    this.submitProposal = this.submitProposal.bind(this);
    this.retryVoteTransmit = this.retryVoteTransmit.bind(this);
  }
  updateParams(request: MsgUpdateParams, useInterfaces: boolean = true): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("pryzm.pgov.v1.Msg", "UpdateParams", data);
    return promise.then(data => MsgUpdateParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  stakePAssets(request: MsgStakePAssets, useInterfaces: boolean = true): Promise<MsgStakePAssetsResponse> {
    const data = MsgStakePAssets.encode(request).finish();
    const promise = this.rpc.request("pryzm.pgov.v1.Msg", "StakePAssets", data);
    return promise.then(data => MsgStakePAssetsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  unstakePAssets(request: MsgUnstakePAssets, useInterfaces: boolean = true): Promise<MsgUnstakePAssetsResponse> {
    const data = MsgUnstakePAssets.encode(request).finish();
    const promise = this.rpc.request("pryzm.pgov.v1.Msg", "UnstakePAssets", data);
    return promise.then(data => MsgUnstakePAssetsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  submitVote(request: MsgSubmitVote, useInterfaces: boolean = true): Promise<MsgSubmitVoteResponse> {
    const data = MsgSubmitVote.encode(request).finish();
    const promise = this.rpc.request("pryzm.pgov.v1.Msg", "SubmitVote", data);
    return promise.then(data => MsgSubmitVoteResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  submitProposal(request: MsgSubmitProposal, useInterfaces: boolean = true): Promise<MsgSubmitProposalResponse> {
    const data = MsgSubmitProposal.encode(request).finish();
    const promise = this.rpc.request("pryzm.pgov.v1.Msg", "SubmitProposal", data);
    return promise.then(data => MsgSubmitProposalResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  retryVoteTransmit(request: MsgRetryVoteTransmit, useInterfaces: boolean = true): Promise<MsgRetryVoteTransmitResponse> {
    const data = MsgRetryVoteTransmit.encode(request).finish();
    const promise = this.rpc.request("pryzm.pgov.v1.Msg", "RetryVoteTransmit", data);
    return promise.then(data => MsgRetryVoteTransmitResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}