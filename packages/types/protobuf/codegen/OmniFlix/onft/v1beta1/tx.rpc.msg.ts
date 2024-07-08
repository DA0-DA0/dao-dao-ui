import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { MsgCreateDenom, MsgCreateDenomResponse, MsgUpdateDenom, MsgUpdateDenomResponse, MsgTransferDenom, MsgTransferDenomResponse, MsgPurgeDenom, MsgPurgeDenomResponse, MsgMintONFT, MsgMintONFTResponse, MsgTransferONFT, MsgTransferONFTResponse, MsgBurnONFT, MsgBurnONFTResponse, MsgUpdateParams, MsgUpdateParamsResponse } from "./tx";
export interface Msg {
  createDenom(request: MsgCreateDenom): Promise<MsgCreateDenomResponse>;
  updateDenom(request: MsgUpdateDenom): Promise<MsgUpdateDenomResponse>;
  transferDenom(request: MsgTransferDenom): Promise<MsgTransferDenomResponse>;
  purgeDenom(request: MsgPurgeDenom): Promise<MsgPurgeDenomResponse>;
  mintONFT(request: MsgMintONFT): Promise<MsgMintONFTResponse>;
  transferONFT(request: MsgTransferONFT): Promise<MsgTransferONFTResponse>;
  burnONFT(request: MsgBurnONFT): Promise<MsgBurnONFTResponse>;
  /**
   * UpdateParams defines a governance operation for updating the onft module
   * parameters. The authority is hard-coded to the onft module account.
   * 
   * Since: cosmos-sdk 0.47
   */
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.createDenom = this.createDenom.bind(this);
    this.updateDenom = this.updateDenom.bind(this);
    this.transferDenom = this.transferDenom.bind(this);
    this.purgeDenom = this.purgeDenom.bind(this);
    this.mintONFT = this.mintONFT.bind(this);
    this.transferONFT = this.transferONFT.bind(this);
    this.burnONFT = this.burnONFT.bind(this);
    this.updateParams = this.updateParams.bind(this);
  }
  createDenom(request: MsgCreateDenom, useInterfaces: boolean = true): Promise<MsgCreateDenomResponse> {
    const data = MsgCreateDenom.encode(request).finish();
    const promise = this.rpc.request("OmniFlix.onft.v1beta1.Msg", "CreateDenom", data);
    return promise.then(data => MsgCreateDenomResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  updateDenom(request: MsgUpdateDenom, useInterfaces: boolean = true): Promise<MsgUpdateDenomResponse> {
    const data = MsgUpdateDenom.encode(request).finish();
    const promise = this.rpc.request("OmniFlix.onft.v1beta1.Msg", "UpdateDenom", data);
    return promise.then(data => MsgUpdateDenomResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  transferDenom(request: MsgTransferDenom, useInterfaces: boolean = true): Promise<MsgTransferDenomResponse> {
    const data = MsgTransferDenom.encode(request).finish();
    const promise = this.rpc.request("OmniFlix.onft.v1beta1.Msg", "TransferDenom", data);
    return promise.then(data => MsgTransferDenomResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  purgeDenom(request: MsgPurgeDenom, useInterfaces: boolean = true): Promise<MsgPurgeDenomResponse> {
    const data = MsgPurgeDenom.encode(request).finish();
    const promise = this.rpc.request("OmniFlix.onft.v1beta1.Msg", "PurgeDenom", data);
    return promise.then(data => MsgPurgeDenomResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  mintONFT(request: MsgMintONFT, useInterfaces: boolean = true): Promise<MsgMintONFTResponse> {
    const data = MsgMintONFT.encode(request).finish();
    const promise = this.rpc.request("OmniFlix.onft.v1beta1.Msg", "MintONFT", data);
    return promise.then(data => MsgMintONFTResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  transferONFT(request: MsgTransferONFT, useInterfaces: boolean = true): Promise<MsgTransferONFTResponse> {
    const data = MsgTransferONFT.encode(request).finish();
    const promise = this.rpc.request("OmniFlix.onft.v1beta1.Msg", "TransferONFT", data);
    return promise.then(data => MsgTransferONFTResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  burnONFT(request: MsgBurnONFT, useInterfaces: boolean = true): Promise<MsgBurnONFTResponse> {
    const data = MsgBurnONFT.encode(request).finish();
    const promise = this.rpc.request("OmniFlix.onft.v1beta1.Msg", "BurnONFT", data);
    return promise.then(data => MsgBurnONFTResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  updateParams(request: MsgUpdateParams, useInterfaces: boolean = true): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("OmniFlix.onft.v1beta1.Msg", "UpdateParams", data);
    return promise.then(data => MsgUpdateParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}