//@ts-nocheck
import { FeeShare, FeeShareAmino, FeeShareSDKType } from "./feeshare";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { Decimal } from "@cosmjs/math";
/** GenesisState defines the module's genesis state. */
export interface GenesisState {
  /** params are the feeshare module parameters */
  params: Params | undefined;
  /** FeeShare is a slice of active registered contracts for fee distribution */
  feeShare: FeeShare[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/juno.feeshare.v1.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the module's genesis state. */
export interface GenesisStateAmino {
  /** params are the feeshare module parameters */
  params?: ParamsAmino | undefined;
  /** FeeShare is a slice of active registered contracts for fee distribution */
  fee_share?: FeeShareAmino[];
}
export interface GenesisStateAminoMsg {
  type: "/juno.feeshare.v1.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the module's genesis state. */
export interface GenesisStateSDKType {
  params: ParamsSDKType | undefined;
  fee_share: FeeShareSDKType[];
}
/** Params defines the feeshare module params */
export interface Params {
  /** enable_feeshare defines a parameter to enable the feeshare module */
  enableFeeShare: boolean;
  /**
   * developer_shares defines the proportion of the transaction fees to be
   * distributed to the registered contract owner
   */
  developerShares: string;
  /**
   * allowed_denoms defines the list of denoms that are allowed to be paid to
   * the contract withdraw addresses. If said denom is not in the list, the fees
   * will ONLY be sent to the community pool.
   * If this list is empty, all denoms are allowed.
   */
  allowedDenoms: string[];
}
export interface ParamsProtoMsg {
  typeUrl: "/juno.feeshare.v1.Params";
  value: Uint8Array;
}
/** Params defines the feeshare module params */
export interface ParamsAmino {
  /** enable_feeshare defines a parameter to enable the feeshare module */
  enable_fee_share?: boolean;
  /**
   * developer_shares defines the proportion of the transaction fees to be
   * distributed to the registered contract owner
   */
  developer_shares?: string;
  /**
   * allowed_denoms defines the list of denoms that are allowed to be paid to
   * the contract withdraw addresses. If said denom is not in the list, the fees
   * will ONLY be sent to the community pool.
   * If this list is empty, all denoms are allowed.
   */
  allowed_denoms?: string[];
}
export interface ParamsAminoMsg {
  type: "/juno.feeshare.v1.Params";
  value: ParamsAmino;
}
/** Params defines the feeshare module params */
export interface ParamsSDKType {
  enable_fee_share: boolean;
  developer_shares: string;
  allowed_denoms: string[];
}
function createBaseGenesisState(): GenesisState {
  return {
    params: Params.fromPartial({}),
    feeShare: []
  };
}
export const GenesisState = {
  typeUrl: "/juno.feeshare.v1.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.feeShare) {
      FeeShare.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): GenesisState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.feeShare.push(FeeShare.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<GenesisState>): GenesisState {
    const message = createBaseGenesisState();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    message.feeShare = object.feeShare?.map(e => FeeShare.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    message.feeShare = object.fee_share?.map(e => FeeShare.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: GenesisState, useInterfaces: boolean = false): GenesisStateAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
    if (message.feeShare) {
      obj.fee_share = message.feeShare.map(e => e ? FeeShare.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.fee_share = message.feeShare;
    }
    return obj;
  },
  fromAminoMsg(object: GenesisStateAminoMsg): GenesisState {
    return GenesisState.fromAmino(object.value);
  },
  fromProtoMsg(message: GenesisStateProtoMsg, useInterfaces: boolean = false): GenesisState {
    return GenesisState.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: GenesisState): Uint8Array {
    return GenesisState.encode(message).finish();
  },
  toProtoMsg(message: GenesisState): GenesisStateProtoMsg {
    return {
      typeUrl: "/juno.feeshare.v1.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};
function createBaseParams(): Params {
  return {
    enableFeeShare: false,
    developerShares: "",
    allowedDenoms: []
  };
}
export const Params = {
  typeUrl: "/juno.feeshare.v1.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.enableFeeShare === true) {
      writer.uint32(8).bool(message.enableFeeShare);
    }
    if (message.developerShares !== "") {
      writer.uint32(18).string(Decimal.fromUserInput(message.developerShares, 18).atomics);
    }
    for (const v of message.allowedDenoms) {
      writer.uint32(26).string(v!);
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
          message.enableFeeShare = reader.bool();
          break;
        case 2:
          message.developerShares = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 3:
          message.allowedDenoms.push(reader.string());
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
    message.enableFeeShare = object.enableFeeShare ?? false;
    message.developerShares = object.developerShares ?? "";
    message.allowedDenoms = object.allowedDenoms?.map(e => e) || [];
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    const message = createBaseParams();
    if (object.enable_fee_share !== undefined && object.enable_fee_share !== null) {
      message.enableFeeShare = object.enable_fee_share;
    }
    if (object.developer_shares !== undefined && object.developer_shares !== null) {
      message.developerShares = object.developer_shares;
    }
    message.allowedDenoms = object.allowed_denoms?.map(e => e) || [];
    return message;
  },
  toAmino(message: Params, useInterfaces: boolean = false): ParamsAmino {
    const obj: any = {};
    obj.enable_fee_share = message.enableFeeShare === false ? undefined : message.enableFeeShare;
    obj.developer_shares = message.developerShares === "" ? undefined : message.developerShares;
    if (message.allowedDenoms) {
      obj.allowed_denoms = message.allowedDenoms.map(e => e);
    } else {
      obj.allowed_denoms = message.allowedDenoms;
    }
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
      typeUrl: "/juno.feeshare.v1.Params",
      value: Params.encode(message).finish()
    };
  }
};