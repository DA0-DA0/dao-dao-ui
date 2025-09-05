import { Coin, CoinAmino, CoinSDKType } from "../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../binary";
export enum EarnType {
  ALL_PROGRAM = 0,
  USDC_PROGRAM = 1,
  ELYS_PROGRAM = 2,
  EDEN_PROGRAM = 3,
  EDENB_PROGRAM = 4,
  LP_MINING_PROGRAM = 5,
  UNRECOGNIZED = -1,
}
export const EarnTypeSDKType = EarnType;
export const EarnTypeAmino = EarnType;
export function earnTypeFromJSON(object: any): EarnType {
  switch (object) {
    case 0:
    case "ALL_PROGRAM":
      return EarnType.ALL_PROGRAM;
    case 1:
    case "USDC_PROGRAM":
      return EarnType.USDC_PROGRAM;
    case 2:
    case "ELYS_PROGRAM":
      return EarnType.ELYS_PROGRAM;
    case 3:
    case "EDEN_PROGRAM":
      return EarnType.EDEN_PROGRAM;
    case 4:
    case "EDENB_PROGRAM":
      return EarnType.EDENB_PROGRAM;
    case 5:
    case "LP_MINING_PROGRAM":
      return EarnType.LP_MINING_PROGRAM;
    case -1:
    case "UNRECOGNIZED":
    default:
      return EarnType.UNRECOGNIZED;
  }
}
export function earnTypeToJSON(object: EarnType): string {
  switch (object) {
    case EarnType.ALL_PROGRAM:
      return "ALL_PROGRAM";
    case EarnType.USDC_PROGRAM:
      return "USDC_PROGRAM";
    case EarnType.ELYS_PROGRAM:
      return "ELYS_PROGRAM";
    case EarnType.EDEN_PROGRAM:
      return "EDEN_PROGRAM";
    case EarnType.EDENB_PROGRAM:
      return "EDENB_PROGRAM";
    case EarnType.LP_MINING_PROGRAM:
      return "LP_MINING_PROGRAM";
    case EarnType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
export interface LegacyParams {
  vestingInfos: VestingInfo[];
  totalCommitted: Coin[];
  numberOfCommitments: bigint;
  enableVestNow: boolean;
  startAtomStakersHeight: bigint;
  endAtomStakersHeight: bigint;
  startCadetsHeight: bigint;
  endCadetsHeight: bigint;
  startNftHoldersHeight: bigint;
  endNftHoldersHeight: bigint;
  startGovernorsHeight: bigint;
  endGovernorsHeight: bigint;
}
export interface LegacyParamsProtoMsg {
  typeUrl: "/elys.commitment.LegacyParams";
  value: Uint8Array;
}
export interface LegacyParamsAmino {
  vesting_infos?: VestingInfoAmino[];
  total_committed?: CoinAmino[];
  number_of_commitments?: string;
  enable_vest_now?: boolean;
  start_atom_stakers_height?: string;
  end_atom_stakers_height?: string;
  start_cadets_height?: string;
  end_cadets_height?: string;
  start_nft_holders_height?: string;
  end_nft_holders_height?: string;
  start_governors_height?: string;
  end_governors_height?: string;
}
export interface LegacyParamsAminoMsg {
  type: "/elys.commitment.LegacyParams";
  value: LegacyParamsAmino;
}
export interface LegacyParamsSDKType {
  vesting_infos: VestingInfoSDKType[];
  total_committed: CoinSDKType[];
  number_of_commitments: bigint;
  enable_vest_now: boolean;
  start_atom_stakers_height: bigint;
  end_atom_stakers_height: bigint;
  start_cadets_height: bigint;
  end_cadets_height: bigint;
  start_nft_holders_height: bigint;
  end_nft_holders_height: bigint;
  start_governors_height: bigint;
  end_governors_height: bigint;
}
export interface Params {
  vestingInfos: VestingInfo[];
  totalCommitted: Coin[];
  numberOfCommitments: bigint;
  enableVestNow: boolean;
  startAirdropClaimHeight: bigint;
  endAirdropClaimHeight: bigint;
  enableClaim: boolean;
  startKolClaimHeight: bigint;
  endKolClaimHeight: bigint;
}
export interface ParamsProtoMsg {
  typeUrl: "/elys.commitment.Params";
  value: Uint8Array;
}
export interface ParamsAmino {
  vesting_infos?: VestingInfoAmino[];
  total_committed?: CoinAmino[];
  number_of_commitments?: string;
  enable_vest_now?: boolean;
  start_airdrop_claim_height?: string;
  end_airdrop_claim_height?: string;
  enable_claim?: boolean;
  start_kol_claim_height?: string;
  end_kol_claim_height?: string;
}
export interface ParamsAminoMsg {
  type: "/elys.commitment.Params";
  value: ParamsAmino;
}
export interface ParamsSDKType {
  vesting_infos: VestingInfoSDKType[];
  total_committed: CoinSDKType[];
  number_of_commitments: bigint;
  enable_vest_now: boolean;
  start_airdrop_claim_height: bigint;
  end_airdrop_claim_height: bigint;
  enable_claim: boolean;
  start_kol_claim_height: bigint;
  end_kol_claim_height: bigint;
}
export interface VestingInfo {
  baseDenom: string;
  vestingDenom: string;
  numBlocks: bigint;
  vestNowFactor: string;
  numMaxVestings: bigint;
}
export interface VestingInfoProtoMsg {
  typeUrl: "/elys.commitment.VestingInfo";
  value: Uint8Array;
}
export interface VestingInfoAmino {
  base_denom?: string;
  vesting_denom?: string;
  num_blocks?: string;
  vest_now_factor?: string;
  num_max_vestings?: string;
}
export interface VestingInfoAminoMsg {
  type: "/elys.commitment.VestingInfo";
  value: VestingInfoAmino;
}
export interface VestingInfoSDKType {
  base_denom: string;
  vesting_denom: string;
  num_blocks: bigint;
  vest_now_factor: string;
  num_max_vestings: bigint;
}
function createBaseLegacyParams(): LegacyParams {
  return {
    vestingInfos: [],
    totalCommitted: [],
    numberOfCommitments: BigInt(0),
    enableVestNow: false,
    startAtomStakersHeight: BigInt(0),
    endAtomStakersHeight: BigInt(0),
    startCadetsHeight: BigInt(0),
    endCadetsHeight: BigInt(0),
    startNftHoldersHeight: BigInt(0),
    endNftHoldersHeight: BigInt(0),
    startGovernorsHeight: BigInt(0),
    endGovernorsHeight: BigInt(0)
  };
}
export const LegacyParams = {
  typeUrl: "/elys.commitment.LegacyParams",
  encode(message: LegacyParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.vestingInfos) {
      VestingInfo.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.totalCommitted) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.numberOfCommitments !== BigInt(0)) {
      writer.uint32(24).uint64(message.numberOfCommitments);
    }
    if (message.enableVestNow === true) {
      writer.uint32(32).bool(message.enableVestNow);
    }
    if (message.startAtomStakersHeight !== BigInt(0)) {
      writer.uint32(40).uint64(message.startAtomStakersHeight);
    }
    if (message.endAtomStakersHeight !== BigInt(0)) {
      writer.uint32(48).uint64(message.endAtomStakersHeight);
    }
    if (message.startCadetsHeight !== BigInt(0)) {
      writer.uint32(56).uint64(message.startCadetsHeight);
    }
    if (message.endCadetsHeight !== BigInt(0)) {
      writer.uint32(64).uint64(message.endCadetsHeight);
    }
    if (message.startNftHoldersHeight !== BigInt(0)) {
      writer.uint32(72).uint64(message.startNftHoldersHeight);
    }
    if (message.endNftHoldersHeight !== BigInt(0)) {
      writer.uint32(80).uint64(message.endNftHoldersHeight);
    }
    if (message.startGovernorsHeight !== BigInt(0)) {
      writer.uint32(88).uint64(message.startGovernorsHeight);
    }
    if (message.endGovernorsHeight !== BigInt(0)) {
      writer.uint32(96).uint64(message.endGovernorsHeight);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): LegacyParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLegacyParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.vestingInfos.push(VestingInfo.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
          message.totalCommitted.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 3:
          message.numberOfCommitments = reader.uint64();
          break;
        case 4:
          message.enableVestNow = reader.bool();
          break;
        case 5:
          message.startAtomStakersHeight = reader.uint64();
          break;
        case 6:
          message.endAtomStakersHeight = reader.uint64();
          break;
        case 7:
          message.startCadetsHeight = reader.uint64();
          break;
        case 8:
          message.endCadetsHeight = reader.uint64();
          break;
        case 9:
          message.startNftHoldersHeight = reader.uint64();
          break;
        case 10:
          message.endNftHoldersHeight = reader.uint64();
          break;
        case 11:
          message.startGovernorsHeight = reader.uint64();
          break;
        case 12:
          message.endGovernorsHeight = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<LegacyParams>): LegacyParams {
    const message = createBaseLegacyParams();
    message.vestingInfos = object.vestingInfos?.map(e => VestingInfo.fromPartial(e)) || [];
    message.totalCommitted = object.totalCommitted?.map(e => Coin.fromPartial(e)) || [];
    message.numberOfCommitments = object.numberOfCommitments !== undefined && object.numberOfCommitments !== null ? BigInt(object.numberOfCommitments.toString()) : BigInt(0);
    message.enableVestNow = object.enableVestNow ?? false;
    message.startAtomStakersHeight = object.startAtomStakersHeight !== undefined && object.startAtomStakersHeight !== null ? BigInt(object.startAtomStakersHeight.toString()) : BigInt(0);
    message.endAtomStakersHeight = object.endAtomStakersHeight !== undefined && object.endAtomStakersHeight !== null ? BigInt(object.endAtomStakersHeight.toString()) : BigInt(0);
    message.startCadetsHeight = object.startCadetsHeight !== undefined && object.startCadetsHeight !== null ? BigInt(object.startCadetsHeight.toString()) : BigInt(0);
    message.endCadetsHeight = object.endCadetsHeight !== undefined && object.endCadetsHeight !== null ? BigInt(object.endCadetsHeight.toString()) : BigInt(0);
    message.startNftHoldersHeight = object.startNftHoldersHeight !== undefined && object.startNftHoldersHeight !== null ? BigInt(object.startNftHoldersHeight.toString()) : BigInt(0);
    message.endNftHoldersHeight = object.endNftHoldersHeight !== undefined && object.endNftHoldersHeight !== null ? BigInt(object.endNftHoldersHeight.toString()) : BigInt(0);
    message.startGovernorsHeight = object.startGovernorsHeight !== undefined && object.startGovernorsHeight !== null ? BigInt(object.startGovernorsHeight.toString()) : BigInt(0);
    message.endGovernorsHeight = object.endGovernorsHeight !== undefined && object.endGovernorsHeight !== null ? BigInt(object.endGovernorsHeight.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: LegacyParamsAmino): LegacyParams {
    const message = createBaseLegacyParams();
    message.vestingInfos = object.vesting_infos?.map(e => VestingInfo.fromAmino(e)) || [];
    message.totalCommitted = object.total_committed?.map(e => Coin.fromAmino(e)) || [];
    if (object.number_of_commitments !== undefined && object.number_of_commitments !== null) {
      message.numberOfCommitments = BigInt(object.number_of_commitments);
    }
    if (object.enable_vest_now !== undefined && object.enable_vest_now !== null) {
      message.enableVestNow = object.enable_vest_now;
    }
    if (object.start_atom_stakers_height !== undefined && object.start_atom_stakers_height !== null) {
      message.startAtomStakersHeight = BigInt(object.start_atom_stakers_height);
    }
    if (object.end_atom_stakers_height !== undefined && object.end_atom_stakers_height !== null) {
      message.endAtomStakersHeight = BigInt(object.end_atom_stakers_height);
    }
    if (object.start_cadets_height !== undefined && object.start_cadets_height !== null) {
      message.startCadetsHeight = BigInt(object.start_cadets_height);
    }
    if (object.end_cadets_height !== undefined && object.end_cadets_height !== null) {
      message.endCadetsHeight = BigInt(object.end_cadets_height);
    }
    if (object.start_nft_holders_height !== undefined && object.start_nft_holders_height !== null) {
      message.startNftHoldersHeight = BigInt(object.start_nft_holders_height);
    }
    if (object.end_nft_holders_height !== undefined && object.end_nft_holders_height !== null) {
      message.endNftHoldersHeight = BigInt(object.end_nft_holders_height);
    }
    if (object.start_governors_height !== undefined && object.start_governors_height !== null) {
      message.startGovernorsHeight = BigInt(object.start_governors_height);
    }
    if (object.end_governors_height !== undefined && object.end_governors_height !== null) {
      message.endGovernorsHeight = BigInt(object.end_governors_height);
    }
    return message;
  },
  toAmino(message: LegacyParams, useInterfaces: boolean = false): LegacyParamsAmino {
    const obj: any = {};
    if (message.vestingInfos) {
      obj.vesting_infos = message.vestingInfos.map(e => e ? VestingInfo.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.vesting_infos = message.vestingInfos;
    }
    if (message.totalCommitted) {
      obj.total_committed = message.totalCommitted.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.total_committed = message.totalCommitted;
    }
    obj.number_of_commitments = message.numberOfCommitments !== BigInt(0) ? message.numberOfCommitments.toString() : undefined;
    obj.enable_vest_now = message.enableVestNow === false ? undefined : message.enableVestNow;
    obj.start_atom_stakers_height = message.startAtomStakersHeight !== BigInt(0) ? message.startAtomStakersHeight.toString() : undefined;
    obj.end_atom_stakers_height = message.endAtomStakersHeight !== BigInt(0) ? message.endAtomStakersHeight.toString() : undefined;
    obj.start_cadets_height = message.startCadetsHeight !== BigInt(0) ? message.startCadetsHeight.toString() : undefined;
    obj.end_cadets_height = message.endCadetsHeight !== BigInt(0) ? message.endCadetsHeight.toString() : undefined;
    obj.start_nft_holders_height = message.startNftHoldersHeight !== BigInt(0) ? message.startNftHoldersHeight.toString() : undefined;
    obj.end_nft_holders_height = message.endNftHoldersHeight !== BigInt(0) ? message.endNftHoldersHeight.toString() : undefined;
    obj.start_governors_height = message.startGovernorsHeight !== BigInt(0) ? message.startGovernorsHeight.toString() : undefined;
    obj.end_governors_height = message.endGovernorsHeight !== BigInt(0) ? message.endGovernorsHeight.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: LegacyParamsAminoMsg): LegacyParams {
    return LegacyParams.fromAmino(object.value);
  },
  fromProtoMsg(message: LegacyParamsProtoMsg, useInterfaces: boolean = false): LegacyParams {
    return LegacyParams.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: LegacyParams): Uint8Array {
    return LegacyParams.encode(message).finish();
  },
  toProtoMsg(message: LegacyParams): LegacyParamsProtoMsg {
    return {
      typeUrl: "/elys.commitment.LegacyParams",
      value: LegacyParams.encode(message).finish()
    };
  }
};
function createBaseParams(): Params {
  return {
    vestingInfos: [],
    totalCommitted: [],
    numberOfCommitments: BigInt(0),
    enableVestNow: false,
    startAirdropClaimHeight: BigInt(0),
    endAirdropClaimHeight: BigInt(0),
    enableClaim: false,
    startKolClaimHeight: BigInt(0),
    endKolClaimHeight: BigInt(0)
  };
}
export const Params = {
  typeUrl: "/elys.commitment.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.vestingInfos) {
      VestingInfo.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.totalCommitted) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.numberOfCommitments !== BigInt(0)) {
      writer.uint32(24).uint64(message.numberOfCommitments);
    }
    if (message.enableVestNow === true) {
      writer.uint32(32).bool(message.enableVestNow);
    }
    if (message.startAirdropClaimHeight !== BigInt(0)) {
      writer.uint32(40).uint64(message.startAirdropClaimHeight);
    }
    if (message.endAirdropClaimHeight !== BigInt(0)) {
      writer.uint32(48).uint64(message.endAirdropClaimHeight);
    }
    if (message.enableClaim === true) {
      writer.uint32(56).bool(message.enableClaim);
    }
    if (message.startKolClaimHeight !== BigInt(0)) {
      writer.uint32(64).uint64(message.startKolClaimHeight);
    }
    if (message.endKolClaimHeight !== BigInt(0)) {
      writer.uint32(72).uint64(message.endKolClaimHeight);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): Params {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.vestingInfos.push(VestingInfo.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
          message.totalCommitted.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 3:
          message.numberOfCommitments = reader.uint64();
          break;
        case 4:
          message.enableVestNow = reader.bool();
          break;
        case 5:
          message.startAirdropClaimHeight = reader.uint64();
          break;
        case 6:
          message.endAirdropClaimHeight = reader.uint64();
          break;
        case 7:
          message.enableClaim = reader.bool();
          break;
        case 8:
          message.startKolClaimHeight = reader.uint64();
          break;
        case 9:
          message.endKolClaimHeight = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Params>): Params {
    const message = createBaseParams();
    message.vestingInfos = object.vestingInfos?.map(e => VestingInfo.fromPartial(e)) || [];
    message.totalCommitted = object.totalCommitted?.map(e => Coin.fromPartial(e)) || [];
    message.numberOfCommitments = object.numberOfCommitments !== undefined && object.numberOfCommitments !== null ? BigInt(object.numberOfCommitments.toString()) : BigInt(0);
    message.enableVestNow = object.enableVestNow ?? false;
    message.startAirdropClaimHeight = object.startAirdropClaimHeight !== undefined && object.startAirdropClaimHeight !== null ? BigInt(object.startAirdropClaimHeight.toString()) : BigInt(0);
    message.endAirdropClaimHeight = object.endAirdropClaimHeight !== undefined && object.endAirdropClaimHeight !== null ? BigInt(object.endAirdropClaimHeight.toString()) : BigInt(0);
    message.enableClaim = object.enableClaim ?? false;
    message.startKolClaimHeight = object.startKolClaimHeight !== undefined && object.startKolClaimHeight !== null ? BigInt(object.startKolClaimHeight.toString()) : BigInt(0);
    message.endKolClaimHeight = object.endKolClaimHeight !== undefined && object.endKolClaimHeight !== null ? BigInt(object.endKolClaimHeight.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    const message = createBaseParams();
    message.vestingInfos = object.vesting_infos?.map(e => VestingInfo.fromAmino(e)) || [];
    message.totalCommitted = object.total_committed?.map(e => Coin.fromAmino(e)) || [];
    if (object.number_of_commitments !== undefined && object.number_of_commitments !== null) {
      message.numberOfCommitments = BigInt(object.number_of_commitments);
    }
    if (object.enable_vest_now !== undefined && object.enable_vest_now !== null) {
      message.enableVestNow = object.enable_vest_now;
    }
    if (object.start_airdrop_claim_height !== undefined && object.start_airdrop_claim_height !== null) {
      message.startAirdropClaimHeight = BigInt(object.start_airdrop_claim_height);
    }
    if (object.end_airdrop_claim_height !== undefined && object.end_airdrop_claim_height !== null) {
      message.endAirdropClaimHeight = BigInt(object.end_airdrop_claim_height);
    }
    if (object.enable_claim !== undefined && object.enable_claim !== null) {
      message.enableClaim = object.enable_claim;
    }
    if (object.start_kol_claim_height !== undefined && object.start_kol_claim_height !== null) {
      message.startKolClaimHeight = BigInt(object.start_kol_claim_height);
    }
    if (object.end_kol_claim_height !== undefined && object.end_kol_claim_height !== null) {
      message.endKolClaimHeight = BigInt(object.end_kol_claim_height);
    }
    return message;
  },
  toAmino(message: Params, useInterfaces: boolean = false): ParamsAmino {
    const obj: any = {};
    if (message.vestingInfos) {
      obj.vesting_infos = message.vestingInfos.map(e => e ? VestingInfo.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.vesting_infos = message.vestingInfos;
    }
    if (message.totalCommitted) {
      obj.total_committed = message.totalCommitted.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.total_committed = message.totalCommitted;
    }
    obj.number_of_commitments = message.numberOfCommitments !== BigInt(0) ? message.numberOfCommitments.toString() : undefined;
    obj.enable_vest_now = message.enableVestNow === false ? undefined : message.enableVestNow;
    obj.start_airdrop_claim_height = message.startAirdropClaimHeight !== BigInt(0) ? message.startAirdropClaimHeight.toString() : undefined;
    obj.end_airdrop_claim_height = message.endAirdropClaimHeight !== BigInt(0) ? message.endAirdropClaimHeight.toString() : undefined;
    obj.enable_claim = message.enableClaim === false ? undefined : message.enableClaim;
    obj.start_kol_claim_height = message.startKolClaimHeight !== BigInt(0) ? message.startKolClaimHeight.toString() : undefined;
    obj.end_kol_claim_height = message.endKolClaimHeight !== BigInt(0) ? message.endKolClaimHeight.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: ParamsAminoMsg): Params {
    return Params.fromAmino(object.value);
  },
  fromProtoMsg(message: ParamsProtoMsg, useInterfaces: boolean = false): Params {
    return Params.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Params): Uint8Array {
    return Params.encode(message).finish();
  },
  toProtoMsg(message: Params): ParamsProtoMsg {
    return {
      typeUrl: "/elys.commitment.Params",
      value: Params.encode(message).finish()
    };
  }
};
function createBaseVestingInfo(): VestingInfo {
  return {
    baseDenom: "",
    vestingDenom: "",
    numBlocks: BigInt(0),
    vestNowFactor: "",
    numMaxVestings: BigInt(0)
  };
}
export const VestingInfo = {
  typeUrl: "/elys.commitment.VestingInfo",
  encode(message: VestingInfo, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.baseDenom !== "") {
      writer.uint32(10).string(message.baseDenom);
    }
    if (message.vestingDenom !== "") {
      writer.uint32(18).string(message.vestingDenom);
    }
    if (message.numBlocks !== BigInt(0)) {
      writer.uint32(24).int64(message.numBlocks);
    }
    if (message.vestNowFactor !== "") {
      writer.uint32(34).string(message.vestNowFactor);
    }
    if (message.numMaxVestings !== BigInt(0)) {
      writer.uint32(40).int64(message.numMaxVestings);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): VestingInfo {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVestingInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.baseDenom = reader.string();
          break;
        case 2:
          message.vestingDenom = reader.string();
          break;
        case 3:
          message.numBlocks = reader.int64();
          break;
        case 4:
          message.vestNowFactor = reader.string();
          break;
        case 5:
          message.numMaxVestings = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<VestingInfo>): VestingInfo {
    const message = createBaseVestingInfo();
    message.baseDenom = object.baseDenom ?? "";
    message.vestingDenom = object.vestingDenom ?? "";
    message.numBlocks = object.numBlocks !== undefined && object.numBlocks !== null ? BigInt(object.numBlocks.toString()) : BigInt(0);
    message.vestNowFactor = object.vestNowFactor ?? "";
    message.numMaxVestings = object.numMaxVestings !== undefined && object.numMaxVestings !== null ? BigInt(object.numMaxVestings.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: VestingInfoAmino): VestingInfo {
    const message = createBaseVestingInfo();
    if (object.base_denom !== undefined && object.base_denom !== null) {
      message.baseDenom = object.base_denom;
    }
    if (object.vesting_denom !== undefined && object.vesting_denom !== null) {
      message.vestingDenom = object.vesting_denom;
    }
    if (object.num_blocks !== undefined && object.num_blocks !== null) {
      message.numBlocks = BigInt(object.num_blocks);
    }
    if (object.vest_now_factor !== undefined && object.vest_now_factor !== null) {
      message.vestNowFactor = object.vest_now_factor;
    }
    if (object.num_max_vestings !== undefined && object.num_max_vestings !== null) {
      message.numMaxVestings = BigInt(object.num_max_vestings);
    }
    return message;
  },
  toAmino(message: VestingInfo, useInterfaces: boolean = false): VestingInfoAmino {
    const obj: any = {};
    obj.base_denom = message.baseDenom === "" ? undefined : message.baseDenom;
    obj.vesting_denom = message.vestingDenom === "" ? undefined : message.vestingDenom;
    obj.num_blocks = message.numBlocks !== BigInt(0) ? message.numBlocks.toString() : undefined;
    obj.vest_now_factor = message.vestNowFactor === "" ? undefined : message.vestNowFactor;
    obj.num_max_vestings = message.numMaxVestings !== BigInt(0) ? message.numMaxVestings.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: VestingInfoAminoMsg): VestingInfo {
    return VestingInfo.fromAmino(object.value);
  },
  fromProtoMsg(message: VestingInfoProtoMsg, useInterfaces: boolean = false): VestingInfo {
    return VestingInfo.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: VestingInfo): Uint8Array {
    return VestingInfo.encode(message).finish();
  },
  toProtoMsg(message: VestingInfo): VestingInfoProtoMsg {
    return {
      typeUrl: "/elys.commitment.VestingInfo",
      value: VestingInfo.encode(message).finish()
    };
  }
};