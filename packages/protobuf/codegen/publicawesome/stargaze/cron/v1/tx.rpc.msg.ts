import { Rpc } from "../../../../helpers";
import { BinaryReader } from "../../../../binary";
import { MsgPromoteToPrivilegedContract, MsgPromoteToPrivilegedContractResponse, MsgDemoteFromPrivilegedContract, MsgDemoteFromPrivilegedContractResponse, MsgUpdateParams, MsgUpdateParamsResponse } from "./tx";
/** Msg defines the alloc Msg service. */
export interface Msg {
  promoteToPrivilegedContract(request: MsgPromoteToPrivilegedContract): Promise<MsgPromoteToPrivilegedContractResponse>;
  demoteFromPrivilegedContract(request: MsgDemoteFromPrivilegedContract): Promise<MsgDemoteFromPrivilegedContractResponse>;
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.promoteToPrivilegedContract = this.promoteToPrivilegedContract.bind(this);
    this.demoteFromPrivilegedContract = this.demoteFromPrivilegedContract.bind(this);
    this.updateParams = this.updateParams.bind(this);
  }
  promoteToPrivilegedContract(request: MsgPromoteToPrivilegedContract): Promise<MsgPromoteToPrivilegedContractResponse> {
    const data = MsgPromoteToPrivilegedContract.encode(request).finish();
    const promise = this.rpc.request("publicawesome.stargaze.cron.v1.Msg", "PromoteToPrivilegedContract", data);
    return promise.then(data => MsgPromoteToPrivilegedContractResponse.decode(new BinaryReader(data)));
  }
  demoteFromPrivilegedContract(request: MsgDemoteFromPrivilegedContract): Promise<MsgDemoteFromPrivilegedContractResponse> {
    const data = MsgDemoteFromPrivilegedContract.encode(request).finish();
    const promise = this.rpc.request("publicawesome.stargaze.cron.v1.Msg", "DemoteFromPrivilegedContract", data);
    return promise.then(data => MsgDemoteFromPrivilegedContractResponse.decode(new BinaryReader(data)));
  }
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("publicawesome.stargaze.cron.v1.Msg", "UpdateParams", data);
    return promise.then(data => MsgUpdateParamsResponse.decode(new BinaryReader(data)));
  }
}