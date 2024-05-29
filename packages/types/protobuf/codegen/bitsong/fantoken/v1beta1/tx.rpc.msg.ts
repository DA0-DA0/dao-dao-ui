import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { MsgIssue, MsgIssueResponse, MsgMint, MsgMintResponse, MsgBurn, MsgBurnResponse, MsgDisableMint, MsgDisableMintResponse, MsgSetMinter, MsgSetMinterResponse, MsgSetAuthority, MsgSetAuthorityResponse, MsgSetUri, MsgSetUriResponse } from "./tx";
/** Msg defines the oracle Msg service */
export interface Msg {
  /** Issue defines a method for issuing a new fan token */
  issue(request: MsgIssue): Promise<MsgIssueResponse>;
  /** Mint defines a method for minting some fan tokens */
  mint(request: MsgMint): Promise<MsgMintResponse>;
  /** Burn defines a method for burning some fan tokens */
  burn(request: MsgBurn): Promise<MsgBurnResponse>;
  /** DisableMint defines a method for disable the mint function */
  disableMint(request: MsgDisableMint): Promise<MsgDisableMintResponse>;
  setMinter(request: MsgSetMinter): Promise<MsgSetMinterResponse>;
  setAuthority(request: MsgSetAuthority): Promise<MsgSetAuthorityResponse>;
  setUri(request: MsgSetUri): Promise<MsgSetUriResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.issue = this.issue.bind(this);
    this.mint = this.mint.bind(this);
    this.burn = this.burn.bind(this);
    this.disableMint = this.disableMint.bind(this);
    this.setMinter = this.setMinter.bind(this);
    this.setAuthority = this.setAuthority.bind(this);
    this.setUri = this.setUri.bind(this);
  }
  issue(request: MsgIssue, useInterfaces: boolean = true): Promise<MsgIssueResponse> {
    const data = MsgIssue.encode(request).finish();
    const promise = this.rpc.request("bitsong.fantoken.Msg", "Issue", data);
    return promise.then(data => MsgIssueResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  mint(request: MsgMint, useInterfaces: boolean = true): Promise<MsgMintResponse> {
    const data = MsgMint.encode(request).finish();
    const promise = this.rpc.request("bitsong.fantoken.Msg", "Mint", data);
    return promise.then(data => MsgMintResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  burn(request: MsgBurn, useInterfaces: boolean = true): Promise<MsgBurnResponse> {
    const data = MsgBurn.encode(request).finish();
    const promise = this.rpc.request("bitsong.fantoken.Msg", "Burn", data);
    return promise.then(data => MsgBurnResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  disableMint(request: MsgDisableMint, useInterfaces: boolean = true): Promise<MsgDisableMintResponse> {
    const data = MsgDisableMint.encode(request).finish();
    const promise = this.rpc.request("bitsong.fantoken.Msg", "DisableMint", data);
    return promise.then(data => MsgDisableMintResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  setMinter(request: MsgSetMinter, useInterfaces: boolean = true): Promise<MsgSetMinterResponse> {
    const data = MsgSetMinter.encode(request).finish();
    const promise = this.rpc.request("bitsong.fantoken.Msg", "SetMinter", data);
    return promise.then(data => MsgSetMinterResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  setAuthority(request: MsgSetAuthority, useInterfaces: boolean = true): Promise<MsgSetAuthorityResponse> {
    const data = MsgSetAuthority.encode(request).finish();
    const promise = this.rpc.request("bitsong.fantoken.Msg", "SetAuthority", data);
    return promise.then(data => MsgSetAuthorityResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  setUri(request: MsgSetUri, useInterfaces: boolean = true): Promise<MsgSetUriResponse> {
    const data = MsgSetUri.encode(request).finish();
    const promise = this.rpc.request("bitsong.fantoken.Msg", "SetUri", data);
    return promise.then(data => MsgSetUriResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}