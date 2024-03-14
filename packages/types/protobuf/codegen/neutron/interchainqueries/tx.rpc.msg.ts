import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { MsgRegisterInterchainQuery, MsgRegisterInterchainQueryResponse, MsgSubmitQueryResult, MsgSubmitQueryResultResponse, MsgRemoveInterchainQueryRequest, MsgRemoveInterchainQueryResponse, MsgUpdateInterchainQueryRequest, MsgUpdateInterchainQueryResponse, MsgUpdateParams, MsgUpdateParamsResponse } from "./tx";
/** Msg defines the Msg service. */
export interface Msg {
  registerInterchainQuery(request: MsgRegisterInterchainQuery): Promise<MsgRegisterInterchainQueryResponse>;
  submitQueryResult(request: MsgSubmitQueryResult): Promise<MsgSubmitQueryResultResponse>;
  removeInterchainQuery(request: MsgRemoveInterchainQueryRequest): Promise<MsgRemoveInterchainQueryResponse>;
  updateInterchainQuery(request: MsgUpdateInterchainQueryRequest): Promise<MsgUpdateInterchainQueryResponse>;
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.registerInterchainQuery = this.registerInterchainQuery.bind(this);
    this.submitQueryResult = this.submitQueryResult.bind(this);
    this.removeInterchainQuery = this.removeInterchainQuery.bind(this);
    this.updateInterchainQuery = this.updateInterchainQuery.bind(this);
    this.updateParams = this.updateParams.bind(this);
  }
  registerInterchainQuery(request: MsgRegisterInterchainQuery, useInterfaces: boolean = true): Promise<MsgRegisterInterchainQueryResponse> {
    const data = MsgRegisterInterchainQuery.encode(request).finish();
    const promise = this.rpc.request("neutron.interchainqueries.Msg", "RegisterInterchainQuery", data);
    return promise.then(data => MsgRegisterInterchainQueryResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  submitQueryResult(request: MsgSubmitQueryResult, useInterfaces: boolean = true): Promise<MsgSubmitQueryResultResponse> {
    const data = MsgSubmitQueryResult.encode(request).finish();
    const promise = this.rpc.request("neutron.interchainqueries.Msg", "SubmitQueryResult", data);
    return promise.then(data => MsgSubmitQueryResultResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  removeInterchainQuery(request: MsgRemoveInterchainQueryRequest, useInterfaces: boolean = true): Promise<MsgRemoveInterchainQueryResponse> {
    const data = MsgRemoveInterchainQueryRequest.encode(request).finish();
    const promise = this.rpc.request("neutron.interchainqueries.Msg", "RemoveInterchainQuery", data);
    return promise.then(data => MsgRemoveInterchainQueryResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  updateInterchainQuery(request: MsgUpdateInterchainQueryRequest, useInterfaces: boolean = true): Promise<MsgUpdateInterchainQueryResponse> {
    const data = MsgUpdateInterchainQueryRequest.encode(request).finish();
    const promise = this.rpc.request("neutron.interchainqueries.Msg", "UpdateInterchainQuery", data);
    return promise.then(data => MsgUpdateInterchainQueryResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  updateParams(request: MsgUpdateParams, useInterfaces: boolean = true): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("neutron.interchainqueries.Msg", "UpdateParams", data);
    return promise.then(data => MsgUpdateParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}