import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { MsgUpdateParams, MsgUpdateParamsResponse, MsgRegisterAsset, MsgRegisterAssetResponse, MsgDisableAsset, MsgDisableAssetResponse, MsgUpdateMaturityParams, MsgUpdateMaturityParamsResponse, MsgUpdateFeeRatios, MsgUpdateFeeRatiosResponse, MsgIntroduceMaturityLevel, MsgIntroduceMaturityLevelResponse } from "./tx";
/** Msg defines the Msg service. */
export interface Msg {
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
  registerAsset(request: MsgRegisterAsset): Promise<MsgRegisterAssetResponse>;
  disableAsset(request: MsgDisableAsset): Promise<MsgDisableAssetResponse>;
  updateMaturityParams(request: MsgUpdateMaturityParams): Promise<MsgUpdateMaturityParamsResponse>;
  updateFeeRatios(request: MsgUpdateFeeRatios): Promise<MsgUpdateFeeRatiosResponse>;
  introduceMaturityLevel(request: MsgIntroduceMaturityLevel): Promise<MsgIntroduceMaturityLevelResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.updateParams = this.updateParams.bind(this);
    this.registerAsset = this.registerAsset.bind(this);
    this.disableAsset = this.disableAsset.bind(this);
    this.updateMaturityParams = this.updateMaturityParams.bind(this);
    this.updateFeeRatios = this.updateFeeRatios.bind(this);
    this.introduceMaturityLevel = this.introduceMaturityLevel.bind(this);
  }
  updateParams(request: MsgUpdateParams, useInterfaces: boolean = true): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("pryzm.assets.v1.Msg", "UpdateParams", data);
    return promise.then(data => MsgUpdateParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  registerAsset(request: MsgRegisterAsset, useInterfaces: boolean = true): Promise<MsgRegisterAssetResponse> {
    const data = MsgRegisterAsset.encode(request).finish();
    const promise = this.rpc.request("pryzm.assets.v1.Msg", "RegisterAsset", data);
    return promise.then(data => MsgRegisterAssetResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  disableAsset(request: MsgDisableAsset, useInterfaces: boolean = true): Promise<MsgDisableAssetResponse> {
    const data = MsgDisableAsset.encode(request).finish();
    const promise = this.rpc.request("pryzm.assets.v1.Msg", "DisableAsset", data);
    return promise.then(data => MsgDisableAssetResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  updateMaturityParams(request: MsgUpdateMaturityParams, useInterfaces: boolean = true): Promise<MsgUpdateMaturityParamsResponse> {
    const data = MsgUpdateMaturityParams.encode(request).finish();
    const promise = this.rpc.request("pryzm.assets.v1.Msg", "UpdateMaturityParams", data);
    return promise.then(data => MsgUpdateMaturityParamsResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  updateFeeRatios(request: MsgUpdateFeeRatios, useInterfaces: boolean = true): Promise<MsgUpdateFeeRatiosResponse> {
    const data = MsgUpdateFeeRatios.encode(request).finish();
    const promise = this.rpc.request("pryzm.assets.v1.Msg", "UpdateFeeRatios", data);
    return promise.then(data => MsgUpdateFeeRatiosResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  introduceMaturityLevel(request: MsgIntroduceMaturityLevel, useInterfaces: boolean = true): Promise<MsgIntroduceMaturityLevelResponse> {
    const data = MsgIntroduceMaturityLevel.encode(request).finish();
    const promise = this.rpc.request("pryzm.assets.v1.Msg", "IntroduceMaturityLevel", data);
    return promise.then(data => MsgIntroduceMaturityLevelResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}