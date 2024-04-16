import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { MsgAggregateExchangeRatePrevote, MsgAggregateExchangeRatePrevoteResponse, MsgAggregateExchangeRateVote, MsgAggregateExchangeRateVoteResponse, MsgDelegateFeedConsent, MsgDelegateFeedConsentResponse } from "./tx";
/** Msg defines the oracle Msg service. */
export interface Msg {
  /**
   * AggregateExchangeRatePrevote defines a method for submitting
   * aggregate exchange rate prevote
   */
  aggregateExchangeRatePrevote(request: MsgAggregateExchangeRatePrevote): Promise<MsgAggregateExchangeRatePrevoteResponse>;
  /**
   * AggregateExchangeRateVote defines a method for submitting
   * aggregate exchange rate vote
   */
  aggregateExchangeRateVote(request: MsgAggregateExchangeRateVote): Promise<MsgAggregateExchangeRateVoteResponse>;
  /** DelegateFeedConsent defines a method for setting the feeder delegation */
  delegateFeedConsent(request: MsgDelegateFeedConsent): Promise<MsgDelegateFeedConsentResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.aggregateExchangeRatePrevote = this.aggregateExchangeRatePrevote.bind(this);
    this.aggregateExchangeRateVote = this.aggregateExchangeRateVote.bind(this);
    this.delegateFeedConsent = this.delegateFeedConsent.bind(this);
  }
  aggregateExchangeRatePrevote(request: MsgAggregateExchangeRatePrevote, useInterfaces: boolean = true): Promise<MsgAggregateExchangeRatePrevoteResponse> {
    const data = MsgAggregateExchangeRatePrevote.encode(request).finish();
    const promise = this.rpc.request("kujira.oracle.Msg", "AggregateExchangeRatePrevote", data);
    return promise.then(data => MsgAggregateExchangeRatePrevoteResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  aggregateExchangeRateVote(request: MsgAggregateExchangeRateVote, useInterfaces: boolean = true): Promise<MsgAggregateExchangeRateVoteResponse> {
    const data = MsgAggregateExchangeRateVote.encode(request).finish();
    const promise = this.rpc.request("kujira.oracle.Msg", "AggregateExchangeRateVote", data);
    return promise.then(data => MsgAggregateExchangeRateVoteResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  delegateFeedConsent(request: MsgDelegateFeedConsent, useInterfaces: boolean = true): Promise<MsgDelegateFeedConsentResponse> {
    const data = MsgDelegateFeedConsent.encode(request).finish();
    const promise = this.rpc.request("kujira.oracle.Msg", "DelegateFeedConsent", data);
    return promise.then(data => MsgDelegateFeedConsentResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}