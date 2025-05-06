import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { MsgRegisterInterchainQuery, MsgRegisterInterchainQueryResponse, MsgSubmitQueryResult, MsgSubmitQueryResultResponse, MsgRemoveInterchainQueryRequest, MsgRemoveInterchainQueryResponse, MsgUpdateInterchainQueryRequest, MsgUpdateInterchainQueryResponse, MsgUpdateParams, MsgUpdateParamsResponse } from "./tx";
/** Defines the Msg interface of the module. */
export interface Msg {
  /**
   * Registers a new Interchain Query in the `interchainqueries` module. This message should only
   * be issued by a smart contract. The calling contract is automatically charged a query
   * registration deposit, based on the module's query deposit parameter. The deposit is refunded
   * when the query is removed. Ensure the contract's account has sufficient assets at the time of
   * message execution.
   * 
   * The response includes the ID assigned to the registered query. Use a reply handler to process
   * this response and utilize the query ID.
   */
  registerInterchainQuery(request: MsgRegisterInterchainQuery): Promise<MsgRegisterInterchainQueryResponse>;
  /**
   * Submits the result of an Interchain Query execution to the chain. Handling this message may
   * involve forwarding the result to the smart contract that owns the query for processing, which
   * could require significant gas usage.
   */
  submitQueryResult(request: MsgSubmitQueryResult): Promise<MsgSubmitQueryResultResponse>;
  /**
   * Removes a specific Interchain Query and its results from the module. The query can only be
   * removed by its owner during the query's submit timeout. After the timeout, anyone can remove
   * it. Upon successful removal, the query deposit is refunded to the caller.
   */
  removeInterchainQuery(request: MsgRemoveInterchainQueryRequest): Promise<MsgRemoveInterchainQueryResponse>;
  /**
   * Updates the parameters of a registered Interchain Query. This action can only be performed by
   * the query's owner.
   */
  updateInterchainQuery(request: MsgUpdateInterchainQueryRequest): Promise<MsgUpdateInterchainQueryResponse>;
  /**
   * Updates the parameters of the `interchainqueries` module. This action can only be performed
   * by the module's authority.
   */
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