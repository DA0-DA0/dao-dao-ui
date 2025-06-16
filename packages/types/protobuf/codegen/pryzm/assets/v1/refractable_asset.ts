import { BinaryReader, BinaryWriter } from "../../../binary";
import { Decimal } from "@cosmjs/math";
/** The properties of a supported asset */
export interface RefractableAsset {
  /** A unique user-provided identifier. Is used in the p/y token denom */
  id: string;
  /** The denomination of the token on Pryzm. This may be an icstaking cToken or an IBC transferred token denom for external assets. */
  tokenDenom: string;
  /** The id for the host chain on which the asset is staked. This is empty if the asset is external. */
  hostChainId: string;
  /** Disabled assets cannot be refracted, but can still be redeemed. */
  disabled: boolean;
  maturityParams: MaturityParams | undefined;
  /** The amount of fee for each operation on the asset. */
  feeRatios: FeeRatios | undefined;
}
export interface RefractableAssetProtoMsg {
  typeUrl: "/pryzm.assets.v1.RefractableAsset";
  value: Uint8Array;
}
/** The properties of a supported asset */
export interface RefractableAssetAmino {
  /** A unique user-provided identifier. Is used in the p/y token denom */
  id?: string;
  /** The denomination of the token on Pryzm. This may be an icstaking cToken or an IBC transferred token denom for external assets. */
  token_denom?: string;
  /** The id for the host chain on which the asset is staked. This is empty if the asset is external. */
  host_chain_id: string;
  /** Disabled assets cannot be refracted, but can still be redeemed. */
  disabled: boolean;
  maturity_params: MaturityParamsAmino | undefined;
  /** The amount of fee for each operation on the asset. */
  fee_ratios: FeeRatiosAmino | undefined;
}
export interface RefractableAssetAminoMsg {
  type: "/pryzm.assets.v1.RefractableAsset";
  value: RefractableAssetAmino;
}
/** The properties of a supported asset */
export interface RefractableAssetSDKType {
  id: string;
  token_denom: string;
  host_chain_id: string;
  disabled: boolean;
  maturity_params: MaturityParamsSDKType | undefined;
  fee_ratios: FeeRatiosSDKType | undefined;
}
/** The parameters based on which new maturities are introduced */
export interface MaturityParams {
  /**
   * The number of maturities per year: can be 0, 1, 2, 4, 12
   * note: levels_per_year should be zero, if and only if years is 0 (which means no automatic maturity creation)
   */
  levelsPerYear: number;
  /**
   * The number of years in advance that maturities are made available for
   * note: years should be zero, if and only if levels_per_year is 0 (which means no automatic maturity creation)
   */
  years: number;
}
export interface MaturityParamsProtoMsg {
  typeUrl: "/pryzm.assets.v1.MaturityParams";
  value: Uint8Array;
}
/** The parameters based on which new maturities are introduced */
export interface MaturityParamsAmino {
  /**
   * The number of maturities per year: can be 0, 1, 2, 4, 12
   * note: levels_per_year should be zero, if and only if years is 0 (which means no automatic maturity creation)
   */
  levels_per_year: number;
  /**
   * The number of years in advance that maturities are made available for
   * note: years should be zero, if and only if levels_per_year is 0 (which means no automatic maturity creation)
   */
  years: number;
}
export interface MaturityParamsAminoMsg {
  type: "/pryzm.assets.v1.MaturityParams";
  value: MaturityParamsAmino;
}
/** The parameters based on which new maturities are introduced */
export interface MaturityParamsSDKType {
  levels_per_year: number;
  years: number;
}
/** Fee ratio per each operation */
export interface FeeRatios {
  yield?: string;
  refractorRefract?: string;
  refractorMerge?: string;
  refractorRedeem?: string;
  yStakingClaimReward?: string;
}
export interface FeeRatiosProtoMsg {
  typeUrl: "/pryzm.assets.v1.FeeRatios";
  value: Uint8Array;
}
/** Fee ratio per each operation */
export interface FeeRatiosAmino {
  yield?: string;
  refractor_refract?: string;
  refractor_merge?: string;
  refractor_redeem?: string;
  y_staking_claim_reward?: string;
}
export interface FeeRatiosAminoMsg {
  type: "/pryzm.assets.v1.FeeRatios";
  value: FeeRatiosAmino;
}
/** Fee ratio per each operation */
export interface FeeRatiosSDKType {
  yield?: string;
  refractor_refract?: string;
  refractor_merge?: string;
  refractor_redeem?: string;
  y_staking_claim_reward?: string;
}
function createBaseRefractableAsset(): RefractableAsset {
  return {
    id: "",
    tokenDenom: "",
    hostChainId: "",
    disabled: false,
    maturityParams: MaturityParams.fromPartial({}),
    feeRatios: FeeRatios.fromPartial({})
  };
}
export const RefractableAsset = {
  typeUrl: "/pryzm.assets.v1.RefractableAsset",
  encode(message: RefractableAsset, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.tokenDenom !== "") {
      writer.uint32(18).string(message.tokenDenom);
    }
    if (message.hostChainId !== "") {
      writer.uint32(26).string(message.hostChainId);
    }
    if (message.disabled === true) {
      writer.uint32(32).bool(message.disabled);
    }
    if (message.maturityParams !== undefined) {
      MaturityParams.encode(message.maturityParams, writer.uint32(42).fork()).ldelim();
    }
    if (message.feeRatios !== undefined) {
      FeeRatios.encode(message.feeRatios, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): RefractableAsset {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRefractableAsset();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.tokenDenom = reader.string();
          break;
        case 3:
          message.hostChainId = reader.string();
          break;
        case 4:
          message.disabled = reader.bool();
          break;
        case 5:
          message.maturityParams = MaturityParams.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 6:
          message.feeRatios = FeeRatios.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<RefractableAsset>): RefractableAsset {
    const message = createBaseRefractableAsset();
    message.id = object.id ?? "";
    message.tokenDenom = object.tokenDenom ?? "";
    message.hostChainId = object.hostChainId ?? "";
    message.disabled = object.disabled ?? false;
    message.maturityParams = object.maturityParams !== undefined && object.maturityParams !== null ? MaturityParams.fromPartial(object.maturityParams) : undefined;
    message.feeRatios = object.feeRatios !== undefined && object.feeRatios !== null ? FeeRatios.fromPartial(object.feeRatios) : undefined;
    return message;
  },
  fromAmino(object: RefractableAssetAmino): RefractableAsset {
    const message = createBaseRefractableAsset();
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    }
    if (object.token_denom !== undefined && object.token_denom !== null) {
      message.tokenDenom = object.token_denom;
    }
    if (object.host_chain_id !== undefined && object.host_chain_id !== null) {
      message.hostChainId = object.host_chain_id;
    }
    if (object.disabled !== undefined && object.disabled !== null) {
      message.disabled = object.disabled;
    }
    if (object.maturity_params !== undefined && object.maturity_params !== null) {
      message.maturityParams = MaturityParams.fromAmino(object.maturity_params);
    }
    if (object.fee_ratios !== undefined && object.fee_ratios !== null) {
      message.feeRatios = FeeRatios.fromAmino(object.fee_ratios);
    }
    return message;
  },
  toAmino(message: RefractableAsset, useInterfaces: boolean = false): RefractableAssetAmino {
    const obj: any = {};
    obj.id = message.id === "" ? undefined : message.id;
    obj.token_denom = message.tokenDenom === "" ? undefined : message.tokenDenom;
    obj.host_chain_id = message.hostChainId ?? "";
    obj.disabled = message.disabled ?? false;
    obj.maturity_params = message.maturityParams ? MaturityParams.toAmino(message.maturityParams, useInterfaces) : MaturityParams.toAmino(MaturityParams.fromPartial({}));
    obj.fee_ratios = message.feeRatios ? FeeRatios.toAmino(message.feeRatios, useInterfaces) : FeeRatios.toAmino(FeeRatios.fromPartial({}));
    return obj;
  },
  fromAminoMsg(object: RefractableAssetAminoMsg): RefractableAsset {
    return RefractableAsset.fromAmino(object.value);
  },
  fromProtoMsg(message: RefractableAssetProtoMsg, useInterfaces: boolean = false): RefractableAsset {
    return RefractableAsset.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: RefractableAsset): Uint8Array {
    return RefractableAsset.encode(message).finish();
  },
  toProtoMsg(message: RefractableAsset): RefractableAssetProtoMsg {
    return {
      typeUrl: "/pryzm.assets.v1.RefractableAsset",
      value: RefractableAsset.encode(message).finish()
    };
  }
};
function createBaseMaturityParams(): MaturityParams {
  return {
    levelsPerYear: 0,
    years: 0
  };
}
export const MaturityParams = {
  typeUrl: "/pryzm.assets.v1.MaturityParams",
  encode(message: MaturityParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.levelsPerYear !== 0) {
      writer.uint32(8).int32(message.levelsPerYear);
    }
    if (message.years !== 0) {
      writer.uint32(16).int32(message.years);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MaturityParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMaturityParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.levelsPerYear = reader.int32();
          break;
        case 2:
          message.years = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MaturityParams>): MaturityParams {
    const message = createBaseMaturityParams();
    message.levelsPerYear = object.levelsPerYear ?? 0;
    message.years = object.years ?? 0;
    return message;
  },
  fromAmino(object: MaturityParamsAmino): MaturityParams {
    const message = createBaseMaturityParams();
    if (object.levels_per_year !== undefined && object.levels_per_year !== null) {
      message.levelsPerYear = object.levels_per_year;
    }
    if (object.years !== undefined && object.years !== null) {
      message.years = object.years;
    }
    return message;
  },
  toAmino(message: MaturityParams, useInterfaces: boolean = false): MaturityParamsAmino {
    const obj: any = {};
    obj.levels_per_year = message.levelsPerYear ?? 0;
    obj.years = message.years ?? 0;
    return obj;
  },
  fromAminoMsg(object: MaturityParamsAminoMsg): MaturityParams {
    return MaturityParams.fromAmino(object.value);
  },
  fromProtoMsg(message: MaturityParamsProtoMsg, useInterfaces: boolean = false): MaturityParams {
    return MaturityParams.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MaturityParams): Uint8Array {
    return MaturityParams.encode(message).finish();
  },
  toProtoMsg(message: MaturityParams): MaturityParamsProtoMsg {
    return {
      typeUrl: "/pryzm.assets.v1.MaturityParams",
      value: MaturityParams.encode(message).finish()
    };
  }
};
function createBaseFeeRatios(): FeeRatios {
  return {
    yield: undefined,
    refractorRefract: undefined,
    refractorMerge: undefined,
    refractorRedeem: undefined,
    yStakingClaimReward: undefined
  };
}
export const FeeRatios = {
  typeUrl: "/pryzm.assets.v1.FeeRatios",
  encode(message: FeeRatios, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.yield !== undefined) {
      writer.uint32(10).string(Decimal.fromUserInput(message.yield, 18).atomics);
    }
    if (message.refractorRefract !== undefined) {
      writer.uint32(18).string(Decimal.fromUserInput(message.refractorRefract, 18).atomics);
    }
    if (message.refractorMerge !== undefined) {
      writer.uint32(26).string(Decimal.fromUserInput(message.refractorMerge, 18).atomics);
    }
    if (message.refractorRedeem !== undefined) {
      writer.uint32(34).string(Decimal.fromUserInput(message.refractorRedeem, 18).atomics);
    }
    if (message.yStakingClaimReward !== undefined) {
      writer.uint32(42).string(Decimal.fromUserInput(message.yStakingClaimReward, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): FeeRatios {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFeeRatios();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.yield = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 2:
          message.refractorRefract = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 3:
          message.refractorMerge = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 4:
          message.refractorRedeem = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 5:
          message.yStakingClaimReward = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<FeeRatios>): FeeRatios {
    const message = createBaseFeeRatios();
    message.yield = object.yield ?? undefined;
    message.refractorRefract = object.refractorRefract ?? undefined;
    message.refractorMerge = object.refractorMerge ?? undefined;
    message.refractorRedeem = object.refractorRedeem ?? undefined;
    message.yStakingClaimReward = object.yStakingClaimReward ?? undefined;
    return message;
  },
  fromAmino(object: FeeRatiosAmino): FeeRatios {
    const message = createBaseFeeRatios();
    if (object.yield !== undefined && object.yield !== null) {
      message.yield = object.yield;
    }
    if (object.refractor_refract !== undefined && object.refractor_refract !== null) {
      message.refractorRefract = object.refractor_refract;
    }
    if (object.refractor_merge !== undefined && object.refractor_merge !== null) {
      message.refractorMerge = object.refractor_merge;
    }
    if (object.refractor_redeem !== undefined && object.refractor_redeem !== null) {
      message.refractorRedeem = object.refractor_redeem;
    }
    if (object.y_staking_claim_reward !== undefined && object.y_staking_claim_reward !== null) {
      message.yStakingClaimReward = object.y_staking_claim_reward;
    }
    return message;
  },
  toAmino(message: FeeRatios, useInterfaces: boolean = false): FeeRatiosAmino {
    const obj: any = {};
    obj.yield = message.yield === null ? undefined : message.yield;
    obj.refractor_refract = message.refractorRefract === null ? undefined : message.refractorRefract;
    obj.refractor_merge = message.refractorMerge === null ? undefined : message.refractorMerge;
    obj.refractor_redeem = message.refractorRedeem === null ? undefined : message.refractorRedeem;
    obj.y_staking_claim_reward = message.yStakingClaimReward === null ? undefined : message.yStakingClaimReward;
    return obj;
  },
  fromAminoMsg(object: FeeRatiosAminoMsg): FeeRatios {
    return FeeRatios.fromAmino(object.value);
  },
  fromProtoMsg(message: FeeRatiosProtoMsg, useInterfaces: boolean = false): FeeRatios {
    return FeeRatios.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: FeeRatios): Uint8Array {
    return FeeRatios.encode(message).finish();
  },
  toProtoMsg(message: FeeRatios): FeeRatiosProtoMsg {
    return {
      typeUrl: "/pryzm.assets.v1.FeeRatios",
      value: FeeRatios.encode(message).finish()
    };
  }
};