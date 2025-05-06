import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { MsgUpdateParams, MsgUpdateParamsResponse, MsgFundTreasury, MsgFundTreasuryResponse } from "./tx";
/** Defines the Msg interface of the module. */
export interface Msg {
  /**
   * Updates the parameters of the revenue module. This action can only be performed by the
   * module's authority.
   */
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
  /** FundTreasury funds the revenue treasury module account with the specified amount. */
  fundTreasury(request: MsgFundTreasury): Promise<MsgFundTreasuryResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.updateParams = this.updateParams.bind(this);
    this.fundTreasury = this.fundTreasury.bind(this);
  }
  updateParams(request: MsgUpdateParams, useInterfaces: boolean = true): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("neutron.revenue.Msg", "UpdateParams", data);
    return promise.then(data => MsgUpdateParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  fundTreasury(request: MsgFundTreasury, useInterfaces: boolean = true): Promise<MsgFundTreasuryResponse> {
    const data = MsgFundTreasury.encode(request).finish();
    const promise = this.rpc.request("neutron.revenue.Msg", "FundTreasury", data);
    return promise.then(data => MsgFundTreasuryResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}