import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { MsgCreateDenom, MsgCreateDenomResponse, MsgMint, MsgMintResponse, MsgBurn, MsgBurnResponse, MsgChangeAdmin, MsgChangeAdminResponse } from "./tx";
/** Msg defines the Msg service. */
export interface Msg {
  createDenom(request: MsgCreateDenom): Promise<MsgCreateDenomResponse>;
  mint(request: MsgMint): Promise<MsgMintResponse>;
  burn(request: MsgBurn): Promise<MsgBurnResponse>;
  /**
   * ForceTransfer is deactivated for now because we need to think through edge
   * cases rpc ForceTransfer(MsgForceTransfer) returns
   * (MsgForceTransferResponse);
   */
  changeAdmin(request: MsgChangeAdmin): Promise<MsgChangeAdminResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.createDenom = this.createDenom.bind(this);
    this.mint = this.mint.bind(this);
    this.burn = this.burn.bind(this);
    this.changeAdmin = this.changeAdmin.bind(this);
  }
  createDenom(request: MsgCreateDenom, useInterfaces: boolean = true): Promise<MsgCreateDenomResponse> {
    const data = MsgCreateDenom.encode(request).finish();
    const promise = this.rpc.request("kujira.denom.Msg", "CreateDenom", data);
    return promise.then(data => MsgCreateDenomResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  mint(request: MsgMint, useInterfaces: boolean = true): Promise<MsgMintResponse> {
    const data = MsgMint.encode(request).finish();
    const promise = this.rpc.request("kujira.denom.Msg", "Mint", data);
    return promise.then(data => MsgMintResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  burn(request: MsgBurn, useInterfaces: boolean = true): Promise<MsgBurnResponse> {
    const data = MsgBurn.encode(request).finish();
    const promise = this.rpc.request("kujira.denom.Msg", "Burn", data);
    return promise.then(data => MsgBurnResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  changeAdmin(request: MsgChangeAdmin, useInterfaces: boolean = true): Promise<MsgChangeAdminResponse> {
    const data = MsgChangeAdmin.encode(request).finish();
    const promise = this.rpc.request("kujira.denom.Msg", "ChangeAdmin", data);
    return promise.then(data => MsgChangeAdminResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}