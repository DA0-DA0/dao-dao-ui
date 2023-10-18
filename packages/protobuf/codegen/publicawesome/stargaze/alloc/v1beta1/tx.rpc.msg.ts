import { Rpc } from "../../../../helpers";
import { BinaryReader } from "../../../../binary";
import { MsgCreateVestingAccount, MsgCreateVestingAccountResponse, MsgFundFairburnPool, MsgFundFairburnPoolResponse } from "./tx";
/** Msg defines the alloc Msg service. */
export interface Msg {
  /**
   * CreateVestingAccount defines a method that enables creating a vesting
   * account.
   */
  createVestingAccount(request: MsgCreateVestingAccount): Promise<MsgCreateVestingAccountResponse>;
  /**
   * FundFairburnPool defines a method to allow an account to directly
   * fund the fee collector module account.
   */
  fundFairburnPool(request: MsgFundFairburnPool): Promise<MsgFundFairburnPoolResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.createVestingAccount = this.createVestingAccount.bind(this);
    this.fundFairburnPool = this.fundFairburnPool.bind(this);
  }
  createVestingAccount(request: MsgCreateVestingAccount): Promise<MsgCreateVestingAccountResponse> {
    const data = MsgCreateVestingAccount.encode(request).finish();
    const promise = this.rpc.request("publicawesome.stargaze.alloc.v1beta1.Msg", "CreateVestingAccount", data);
    return promise.then(data => MsgCreateVestingAccountResponse.decode(new BinaryReader(data)));
  }
  fundFairburnPool(request: MsgFundFairburnPool): Promise<MsgFundFairburnPoolResponse> {
    const data = MsgFundFairburnPool.encode(request).finish();
    const promise = this.rpc.request("publicawesome.stargaze.alloc.v1beta1.Msg", "FundFairburnPool", data);
    return promise.then(data => MsgFundFairburnPoolResponse.decode(new BinaryReader(data)));
  }
}