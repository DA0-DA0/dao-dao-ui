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
  fee_share: FeeShareAmino[];
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
  enable_fee_share: boolean;
  /**
   * developer_shares defines the proportion of the transaction fees to be
   * distributed to the registered contract owner
   */
  developer_shares: string;
  /**
   * allowed_denoms defines the list of denoms that are allowed to be paid to
   * the contract withdraw addresses. If said denom is not in the list, the fees
   * will ONLY be sent to the community pool.
   * If this list is empty, all denoms are allowed.
   */
  allowed_denoms: string[];
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
  decode(input: BinaryReader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 2:
          message.feeShare.push(FeeShare.decode(reader, reader.uint32()));
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
    return {
      params: object?.params ? Params.fromAmino(object.params) : undefined,
      feeShare: Array.isArray(object?.fee_share) ? object.fee_share.map((e: any) => FeeShare.fromAmino(e)) : []
    };
  },
  toAmino(message: GenesisState): GenesisStateAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params) : undefined;
    if (message.feeShare) {
      obj.fee_share = message.feeShare.map(e => e ? FeeShare.toAmino(e) : undefined);
    } else {
      obj.fee_share = [];
    }
    return obj;
  },
  fromAminoMsg(object: GenesisStateAminoMsg): GenesisState {
    return GenesisState.fromAmino(object.value);
  },
  fromProtoMsg(message: GenesisStateProtoMsg): GenesisState {
    return GenesisState.decode(message.value);
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
  decode(input: BinaryReader | Uint8Array, length?: number): Params {
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
    return {
      enableFeeShare: object.enable_fee_share,
      developerShares: object.developer_shares,
      allowedDenoms: Array.isArray(object?.allowed_denoms) ? object.allowed_denoms.map((e: any) => e) : []
    };
  },
  toAmino(message: Params): ParamsAmino {
    const obj: any = {};
    obj.enable_fee_share = message.enableFeeShare;
    obj.developer_shares = message.developerShares;
    if (message.allowedDenoms) {
      obj.allowed_denoms = message.allowedDenoms.map(e => e);
    } else {
      obj.allowed_denoms = [];
    }
    return obj;
  },
  fromAminoMsg(object: ParamsAminoMsg): Params {
    return Params.fromAmino(object.value);
  },
  fromProtoMsg(message: ParamsProtoMsg): Params {
    return Params.decode(message.value);
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