import { ICAAccount, ICAAccountAmino, ICAAccountSDKType } from "../../liquidstakeibc/v1beta1/liquidstakeibc";
import { BinaryReader, BinaryWriter } from "../../../binary";
export enum InstantiationState {
  /** INSTANTIATION_NOT_INITIATED - Not Initiated */
  INSTANTIATION_NOT_INITIATED = 0,
  /** INSTANTIATION_INITIATED - Initiated */
  INSTANTIATION_INITIATED = 1,
  /** INSTANTIATION_COMPLETED - we should have an address */
  INSTANTIATION_COMPLETED = 2,
  UNRECOGNIZED = -1,
}
export const InstantiationStateSDKType = InstantiationState;
export const InstantiationStateAmino = InstantiationState;
export function instantiationStateFromJSON(object: any): InstantiationState {
  switch (object) {
    case 0:
    case "INSTANTIATION_NOT_INITIATED":
      return InstantiationState.INSTANTIATION_NOT_INITIATED;
    case 1:
    case "INSTANTIATION_INITIATED":
      return InstantiationState.INSTANTIATION_INITIATED;
    case 2:
    case "INSTANTIATION_COMPLETED":
      return InstantiationState.INSTANTIATION_COMPLETED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return InstantiationState.UNRECOGNIZED;
  }
}
export function instantiationStateToJSON(object: InstantiationState): string {
  switch (object) {
    case InstantiationState.INSTANTIATION_NOT_INITIATED:
      return "INSTANTIATION_NOT_INITIATED";
    case InstantiationState.INSTANTIATION_INITIATED:
      return "INSTANTIATION_INITIATED";
    case InstantiationState.INSTANTIATION_COMPLETED:
      return "INSTANTIATION_COMPLETED";
    case InstantiationState.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
export enum FeatureType {
  LIQUID_STAKE_IBC = 0,
  LIQUID_STAKE = 1,
  UNRECOGNIZED = -1,
}
export const FeatureTypeSDKType = FeatureType;
export const FeatureTypeAmino = FeatureType;
export function featureTypeFromJSON(object: any): FeatureType {
  switch (object) {
    case 0:
    case "LIQUID_STAKE_IBC":
      return FeatureType.LIQUID_STAKE_IBC;
    case 1:
    case "LIQUID_STAKE":
      return FeatureType.LIQUID_STAKE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return FeatureType.UNRECOGNIZED;
  }
}
export function featureTypeToJSON(object: FeatureType): string {
  switch (object) {
    case FeatureType.LIQUID_STAKE_IBC:
      return "LIQUID_STAKE_IBC";
    case FeatureType.LIQUID_STAKE:
      return "LIQUID_STAKE";
    case FeatureType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/** HostChain defines the ratesync module's HostChain state. */
export interface HostChain {
  /** unique id */
  iD: bigint;
  /** not really required, just easier readability */
  chainID: string;
  connectionID: string;
  iCAAccount: ICAAccount | undefined;
  features: Feature | undefined;
  transferChannelID: string;
  transferPortID: string;
}
export interface HostChainProtoMsg {
  typeUrl: "/pstake.ratesync.v1beta1.HostChain";
  value: Uint8Array;
}
/** HostChain defines the ratesync module's HostChain state. */
export interface HostChainAmino {
  /** unique id */
  i_d?: string;
  /** not really required, just easier readability */
  chain_i_d?: string;
  connection_i_d?: string;
  i_c_a_account: ICAAccountAmino | undefined;
  features: FeatureAmino | undefined;
  transfer_channel_i_d?: string;
  transfer_port_i_d?: string;
}
export interface HostChainAminoMsg {
  type: "/pstake.ratesync.v1beta1.HostChain";
  value: HostChainAmino;
}
/** HostChain defines the ratesync module's HostChain state. */
export interface HostChainSDKType {
  i_d: bigint;
  chain_i_d: string;
  connection_i_d: string;
  i_c_a_account: ICAAccountSDKType | undefined;
  features: FeatureSDKType | undefined;
  transfer_channel_i_d: string;
  transfer_port_i_d: string;
}
export interface Feature {
  /** triggers on hooks */
  liquidStakeIBC: LiquidStake | undefined;
  /** triggers on hour epoch */
  liquidStake: LiquidStake | undefined;
}
export interface FeatureProtoMsg {
  typeUrl: "/pstake.ratesync.v1beta1.Feature";
  value: Uint8Array;
}
export interface FeatureAmino {
  /** triggers on hooks */
  liquid_stake_i_b_c: LiquidStakeAmino | undefined;
  /** triggers on hour epoch */
  liquid_stake: LiquidStakeAmino | undefined;
}
export interface FeatureAminoMsg {
  type: "/pstake.ratesync.v1beta1.Feature";
  value: FeatureAmino;
}
export interface FeatureSDKType {
  liquid_stake_i_b_c: LiquidStakeSDKType | undefined;
  liquid_stake: LiquidStakeSDKType | undefined;
}
export interface LiquidStake {
  featureType: FeatureType;
  /** needs to be uploaded before hand */
  codeID: bigint;
  /**
   * state of instantiation, do not support gov based instantiation. (need ICA
   * to be at least admin)
   */
  instantiation: InstantiationState;
  /** address of instantiated contract. */
  contractAddress: string;
  /**
   * allow * as default for all denoms in case of lsibc, or default bond denom
   * in case of ls.
   */
  denoms: string[];
  enabled: boolean;
}
export interface LiquidStakeProtoMsg {
  typeUrl: "/pstake.ratesync.v1beta1.LiquidStake";
  value: Uint8Array;
}
export interface LiquidStakeAmino {
  feature_type?: FeatureType;
  /** needs to be uploaded before hand */
  code_i_d?: string;
  /**
   * state of instantiation, do not support gov based instantiation. (need ICA
   * to be at least admin)
   */
  instantiation?: InstantiationState;
  /** address of instantiated contract. */
  contract_address?: string;
  /**
   * allow * as default for all denoms in case of lsibc, or default bond denom
   * in case of ls.
   */
  denoms?: string[];
  enabled?: boolean;
}
export interface LiquidStakeAminoMsg {
  type: "/pstake.ratesync.v1beta1.LiquidStake";
  value: LiquidStakeAmino;
}
export interface LiquidStakeSDKType {
  feature_type: FeatureType;
  code_i_d: bigint;
  instantiation: InstantiationState;
  contract_address: string;
  denoms: string[];
  enabled: boolean;
}
/** aim to keep this smaller than 256 MaxCharLen in ICA memo. */
export interface ICAMemo {
  featureType: FeatureType;
  hostChainID: bigint;
}
export interface ICAMemoProtoMsg {
  typeUrl: "/pstake.ratesync.v1beta1.ICAMemo";
  value: Uint8Array;
}
/** aim to keep this smaller than 256 MaxCharLen in ICA memo. */
export interface ICAMemoAmino {
  feature_type?: FeatureType;
  host_chain_i_d?: string;
}
export interface ICAMemoAminoMsg {
  type: "/pstake.ratesync.v1beta1.ICAMemo";
  value: ICAMemoAmino;
}
/** aim to keep this smaller than 256 MaxCharLen in ICA memo. */
export interface ICAMemoSDKType {
  feature_type: FeatureType;
  host_chain_i_d: bigint;
}
function createBaseHostChain(): HostChain {
  return {
    iD: BigInt(0),
    chainID: "",
    connectionID: "",
    iCAAccount: ICAAccount.fromPartial({}),
    features: Feature.fromPartial({}),
    transferChannelID: "",
    transferPortID: ""
  };
}
export const HostChain = {
  typeUrl: "/pstake.ratesync.v1beta1.HostChain",
  encode(message: HostChain, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.iD !== BigInt(0)) {
      writer.uint32(8).uint64(message.iD);
    }
    if (message.chainID !== "") {
      writer.uint32(18).string(message.chainID);
    }
    if (message.connectionID !== "") {
      writer.uint32(26).string(message.connectionID);
    }
    if (message.iCAAccount !== undefined) {
      ICAAccount.encode(message.iCAAccount, writer.uint32(34).fork()).ldelim();
    }
    if (message.features !== undefined) {
      Feature.encode(message.features, writer.uint32(42).fork()).ldelim();
    }
    if (message.transferChannelID !== "") {
      writer.uint32(50).string(message.transferChannelID);
    }
    if (message.transferPortID !== "") {
      writer.uint32(58).string(message.transferPortID);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): HostChain {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostChain();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.iD = reader.uint64();
          break;
        case 2:
          message.chainID = reader.string();
          break;
        case 3:
          message.connectionID = reader.string();
          break;
        case 4:
          message.iCAAccount = ICAAccount.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 5:
          message.features = Feature.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 6:
          message.transferChannelID = reader.string();
          break;
        case 7:
          message.transferPortID = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<HostChain>): HostChain {
    const message = createBaseHostChain();
    message.iD = object.iD !== undefined && object.iD !== null ? BigInt(object.iD.toString()) : BigInt(0);
    message.chainID = object.chainID ?? "";
    message.connectionID = object.connectionID ?? "";
    message.iCAAccount = object.iCAAccount !== undefined && object.iCAAccount !== null ? ICAAccount.fromPartial(object.iCAAccount) : undefined;
    message.features = object.features !== undefined && object.features !== null ? Feature.fromPartial(object.features) : undefined;
    message.transferChannelID = object.transferChannelID ?? "";
    message.transferPortID = object.transferPortID ?? "";
    return message;
  },
  fromAmino(object: HostChainAmino): HostChain {
    const message = createBaseHostChain();
    if (object.i_d !== undefined && object.i_d !== null) {
      message.iD = BigInt(object.i_d);
    }
    if (object.chain_i_d !== undefined && object.chain_i_d !== null) {
      message.chainID = object.chain_i_d;
    }
    if (object.connection_i_d !== undefined && object.connection_i_d !== null) {
      message.connectionID = object.connection_i_d;
    }
    if (object.i_c_a_account !== undefined && object.i_c_a_account !== null) {
      message.iCAAccount = ICAAccount.fromAmino(object.i_c_a_account);
    }
    if (object.features !== undefined && object.features !== null) {
      message.features = Feature.fromAmino(object.features);
    }
    if (object.transfer_channel_i_d !== undefined && object.transfer_channel_i_d !== null) {
      message.transferChannelID = object.transfer_channel_i_d;
    }
    if (object.transfer_port_i_d !== undefined && object.transfer_port_i_d !== null) {
      message.transferPortID = object.transfer_port_i_d;
    }
    return message;
  },
  toAmino(message: HostChain, useInterfaces: boolean = false): HostChainAmino {
    const obj: any = {};
    obj.i_d = message.iD !== BigInt(0) ? message.iD.toString() : undefined;
    obj.chain_i_d = message.chainID === "" ? undefined : message.chainID;
    obj.connection_i_d = message.connectionID === "" ? undefined : message.connectionID;
    obj.i_c_a_account = message.iCAAccount ? ICAAccount.toAmino(message.iCAAccount, useInterfaces) : ICAAccount.toAmino(ICAAccount.fromPartial({}));
    obj.features = message.features ? Feature.toAmino(message.features, useInterfaces) : Feature.toAmino(Feature.fromPartial({}));
    obj.transfer_channel_i_d = message.transferChannelID === "" ? undefined : message.transferChannelID;
    obj.transfer_port_i_d = message.transferPortID === "" ? undefined : message.transferPortID;
    return obj;
  },
  fromAminoMsg(object: HostChainAminoMsg): HostChain {
    return HostChain.fromAmino(object.value);
  },
  fromProtoMsg(message: HostChainProtoMsg, useInterfaces: boolean = false): HostChain {
    return HostChain.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: HostChain): Uint8Array {
    return HostChain.encode(message).finish();
  },
  toProtoMsg(message: HostChain): HostChainProtoMsg {
    return {
      typeUrl: "/pstake.ratesync.v1beta1.HostChain",
      value: HostChain.encode(message).finish()
    };
  }
};
function createBaseFeature(): Feature {
  return {
    liquidStakeIBC: LiquidStake.fromPartial({}),
    liquidStake: LiquidStake.fromPartial({})
  };
}
export const Feature = {
  typeUrl: "/pstake.ratesync.v1beta1.Feature",
  encode(message: Feature, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.liquidStakeIBC !== undefined) {
      LiquidStake.encode(message.liquidStakeIBC, writer.uint32(10).fork()).ldelim();
    }
    if (message.liquidStake !== undefined) {
      LiquidStake.encode(message.liquidStake, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): Feature {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFeature();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.liquidStakeIBC = LiquidStake.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.liquidStake = LiquidStake.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Feature>): Feature {
    const message = createBaseFeature();
    message.liquidStakeIBC = object.liquidStakeIBC !== undefined && object.liquidStakeIBC !== null ? LiquidStake.fromPartial(object.liquidStakeIBC) : undefined;
    message.liquidStake = object.liquidStake !== undefined && object.liquidStake !== null ? LiquidStake.fromPartial(object.liquidStake) : undefined;
    return message;
  },
  fromAmino(object: FeatureAmino): Feature {
    const message = createBaseFeature();
    if (object.liquid_stake_i_b_c !== undefined && object.liquid_stake_i_b_c !== null) {
      message.liquidStakeIBC = LiquidStake.fromAmino(object.liquid_stake_i_b_c);
    }
    if (object.liquid_stake !== undefined && object.liquid_stake !== null) {
      message.liquidStake = LiquidStake.fromAmino(object.liquid_stake);
    }
    return message;
  },
  toAmino(message: Feature, useInterfaces: boolean = false): FeatureAmino {
    const obj: any = {};
    obj.liquid_stake_i_b_c = message.liquidStakeIBC ? LiquidStake.toAmino(message.liquidStakeIBC, useInterfaces) : LiquidStake.toAmino(LiquidStake.fromPartial({}));
    obj.liquid_stake = message.liquidStake ? LiquidStake.toAmino(message.liquidStake, useInterfaces) : LiquidStake.toAmino(LiquidStake.fromPartial({}));
    return obj;
  },
  fromAminoMsg(object: FeatureAminoMsg): Feature {
    return Feature.fromAmino(object.value);
  },
  fromProtoMsg(message: FeatureProtoMsg, useInterfaces: boolean = false): Feature {
    return Feature.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Feature): Uint8Array {
    return Feature.encode(message).finish();
  },
  toProtoMsg(message: Feature): FeatureProtoMsg {
    return {
      typeUrl: "/pstake.ratesync.v1beta1.Feature",
      value: Feature.encode(message).finish()
    };
  }
};
function createBaseLiquidStake(): LiquidStake {
  return {
    featureType: 0,
    codeID: BigInt(0),
    instantiation: 0,
    contractAddress: "",
    denoms: [],
    enabled: false
  };
}
export const LiquidStake = {
  typeUrl: "/pstake.ratesync.v1beta1.LiquidStake",
  encode(message: LiquidStake, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.featureType !== 0) {
      writer.uint32(8).int32(message.featureType);
    }
    if (message.codeID !== BigInt(0)) {
      writer.uint32(16).uint64(message.codeID);
    }
    if (message.instantiation !== 0) {
      writer.uint32(24).int32(message.instantiation);
    }
    if (message.contractAddress !== "") {
      writer.uint32(34).string(message.contractAddress);
    }
    for (const v of message.denoms) {
      writer.uint32(42).string(v!);
    }
    if (message.enabled === true) {
      writer.uint32(48).bool(message.enabled);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): LiquidStake {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLiquidStake();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.featureType = (reader.int32() as any);
          break;
        case 2:
          message.codeID = reader.uint64();
          break;
        case 3:
          message.instantiation = (reader.int32() as any);
          break;
        case 4:
          message.contractAddress = reader.string();
          break;
        case 5:
          message.denoms.push(reader.string());
          break;
        case 6:
          message.enabled = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<LiquidStake>): LiquidStake {
    const message = createBaseLiquidStake();
    message.featureType = object.featureType ?? 0;
    message.codeID = object.codeID !== undefined && object.codeID !== null ? BigInt(object.codeID.toString()) : BigInt(0);
    message.instantiation = object.instantiation ?? 0;
    message.contractAddress = object.contractAddress ?? "";
    message.denoms = object.denoms?.map(e => e) || [];
    message.enabled = object.enabled ?? false;
    return message;
  },
  fromAmino(object: LiquidStakeAmino): LiquidStake {
    const message = createBaseLiquidStake();
    if (object.feature_type !== undefined && object.feature_type !== null) {
      message.featureType = object.feature_type;
    }
    if (object.code_i_d !== undefined && object.code_i_d !== null) {
      message.codeID = BigInt(object.code_i_d);
    }
    if (object.instantiation !== undefined && object.instantiation !== null) {
      message.instantiation = object.instantiation;
    }
    if (object.contract_address !== undefined && object.contract_address !== null) {
      message.contractAddress = object.contract_address;
    }
    message.denoms = object.denoms?.map(e => e) || [];
    if (object.enabled !== undefined && object.enabled !== null) {
      message.enabled = object.enabled;
    }
    return message;
  },
  toAmino(message: LiquidStake, useInterfaces: boolean = false): LiquidStakeAmino {
    const obj: any = {};
    obj.feature_type = message.featureType === 0 ? undefined : message.featureType;
    obj.code_i_d = message.codeID !== BigInt(0) ? message.codeID.toString() : undefined;
    obj.instantiation = message.instantiation === 0 ? undefined : message.instantiation;
    obj.contract_address = message.contractAddress === "" ? undefined : message.contractAddress;
    if (message.denoms) {
      obj.denoms = message.denoms.map(e => e);
    } else {
      obj.denoms = message.denoms;
    }
    obj.enabled = message.enabled === false ? undefined : message.enabled;
    return obj;
  },
  fromAminoMsg(object: LiquidStakeAminoMsg): LiquidStake {
    return LiquidStake.fromAmino(object.value);
  },
  fromProtoMsg(message: LiquidStakeProtoMsg, useInterfaces: boolean = false): LiquidStake {
    return LiquidStake.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: LiquidStake): Uint8Array {
    return LiquidStake.encode(message).finish();
  },
  toProtoMsg(message: LiquidStake): LiquidStakeProtoMsg {
    return {
      typeUrl: "/pstake.ratesync.v1beta1.LiquidStake",
      value: LiquidStake.encode(message).finish()
    };
  }
};
function createBaseICAMemo(): ICAMemo {
  return {
    featureType: 0,
    hostChainID: BigInt(0)
  };
}
export const ICAMemo = {
  typeUrl: "/pstake.ratesync.v1beta1.ICAMemo",
  encode(message: ICAMemo, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.featureType !== 0) {
      writer.uint32(8).int32(message.featureType);
    }
    if (message.hostChainID !== BigInt(0)) {
      writer.uint32(16).uint64(message.hostChainID);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ICAMemo {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseICAMemo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.featureType = (reader.int32() as any);
          break;
        case 2:
          message.hostChainID = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ICAMemo>): ICAMemo {
    const message = createBaseICAMemo();
    message.featureType = object.featureType ?? 0;
    message.hostChainID = object.hostChainID !== undefined && object.hostChainID !== null ? BigInt(object.hostChainID.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: ICAMemoAmino): ICAMemo {
    const message = createBaseICAMemo();
    if (object.feature_type !== undefined && object.feature_type !== null) {
      message.featureType = object.feature_type;
    }
    if (object.host_chain_i_d !== undefined && object.host_chain_i_d !== null) {
      message.hostChainID = BigInt(object.host_chain_i_d);
    }
    return message;
  },
  toAmino(message: ICAMemo, useInterfaces: boolean = false): ICAMemoAmino {
    const obj: any = {};
    obj.feature_type = message.featureType === 0 ? undefined : message.featureType;
    obj.host_chain_i_d = message.hostChainID !== BigInt(0) ? message.hostChainID.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: ICAMemoAminoMsg): ICAMemo {
    return ICAMemo.fromAmino(object.value);
  },
  fromProtoMsg(message: ICAMemoProtoMsg, useInterfaces: boolean = false): ICAMemo {
    return ICAMemo.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ICAMemo): Uint8Array {
    return ICAMemo.encode(message).finish();
  },
  toProtoMsg(message: ICAMemo): ICAMemoProtoMsg {
    return {
      typeUrl: "/pstake.ratesync.v1beta1.ICAMemo",
      value: ICAMemo.encode(message).finish()
    };
  }
};