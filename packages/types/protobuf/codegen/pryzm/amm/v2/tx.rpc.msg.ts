import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { MsgProposeMatch, MsgProposeMatchResponse } from "./tx";
/** Msg defines the Msg service. */
export interface Msg {
  proposeMatch(request: MsgProposeMatch): Promise<MsgProposeMatchResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.proposeMatch = this.proposeMatch.bind(this);
  }
  proposeMatch(request: MsgProposeMatch, useInterfaces: boolean = true): Promise<MsgProposeMatchResponse> {
    const data = MsgProposeMatch.encode(request).finish();
    const promise = this.rpc.request("pryzm.amm.v2.Msg", "ProposeMatch", data);
    return promise.then(data => MsgProposeMatchResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}