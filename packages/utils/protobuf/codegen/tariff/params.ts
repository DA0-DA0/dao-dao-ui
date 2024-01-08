import { BinaryReader, BinaryWriter } from "../binary";
import { Decimal } from "@cosmjs/math";
/** Params defines the set of params for the distribution module. */
export interface Params {
  /** share is % of tx fees or rewards allocated to distribution_entities */
  share: string;
  /**
   * % of tx fees or rewards allocated to a set of global distribution entities
   * these shares must add up to 1
   */
  distributionEntities: DistributionEntity[];
  transferFeeBps: string;
  transferFeeMax: string;
  transferFeeDenom: string;
}
export interface ParamsProtoMsg {
  typeUrl: "/noble.tariff.Params";
  value: Uint8Array;
}
/** Params defines the set of params for the distribution module. */
export interface ParamsAmino {
  /** share is % of tx fees or rewards allocated to distribution_entities */
  share?: string;
  /**
   * % of tx fees or rewards allocated to a set of global distribution entities
   * these shares must add up to 1
   */
  distribution_entities?: DistributionEntityAmino[];
  transfer_fee_bps?: string;
  transfer_fee_max?: string;
  transfer_fee_denom?: string;
}
export interface ParamsAminoMsg {
  type: "/noble.tariff.Params";
  value: ParamsAmino;
}
/** Params defines the set of params for the distribution module. */
export interface ParamsSDKType {
  share: string;
  distribution_entities: DistributionEntitySDKType[];
  transfer_fee_bps: string;
  transfer_fee_max: string;
  transfer_fee_denom: string;
}
/** DistributionEntity defines a distribution entity */
export interface DistributionEntity {
  address: string;
  share: string;
}
export interface DistributionEntityProtoMsg {
  typeUrl: "/noble.tariff.DistributionEntity";
  value: Uint8Array;
}
/** DistributionEntity defines a distribution entity */
export interface DistributionEntityAmino {
  address?: string;
  share?: string;
}
export interface DistributionEntityAminoMsg {
  type: "/noble.tariff.DistributionEntity";
  value: DistributionEntityAmino;
}
/** DistributionEntity defines a distribution entity */
export interface DistributionEntitySDKType {
  address: string;
  share: string;
}
function createBaseParams(): Params {
  return {
    share: "",
    distributionEntities: [],
    transferFeeBps: "",
    transferFeeMax: "",
    transferFeeDenom: ""
  };
}
export const Params = {
  typeUrl: "/noble.tariff.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.share !== "") {
      writer.uint32(10).string(Decimal.fromUserInput(message.share, 18).atomics);
    }
    for (const v of message.distributionEntities) {
      DistributionEntity.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.transferFeeBps !== "") {
      writer.uint32(26).string(message.transferFeeBps);
    }
    if (message.transferFeeMax !== "") {
      writer.uint32(34).string(message.transferFeeMax);
    }
    if (message.transferFeeDenom !== "") {
      writer.uint32(42).string(message.transferFeeDenom);
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
          message.share = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 2:
          message.distributionEntities.push(DistributionEntity.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 3:
          message.transferFeeBps = reader.string();
          break;
        case 4:
          message.transferFeeMax = reader.string();
          break;
        case 5:
          message.transferFeeDenom = reader.string();
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
    message.share = object.share ?? "";
    message.distributionEntities = object.distributionEntities?.map(e => DistributionEntity.fromPartial(e)) || [];
    message.transferFeeBps = object.transferFeeBps ?? "";
    message.transferFeeMax = object.transferFeeMax ?? "";
    message.transferFeeDenom = object.transferFeeDenom ?? "";
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    const message = createBaseParams();
    if (object.share !== undefined && object.share !== null) {
      message.share = object.share;
    }
    message.distributionEntities = object.distribution_entities?.map(e => DistributionEntity.fromAmino(e)) || [];
    if (object.transfer_fee_bps !== undefined && object.transfer_fee_bps !== null) {
      message.transferFeeBps = object.transfer_fee_bps;
    }
    if (object.transfer_fee_max !== undefined && object.transfer_fee_max !== null) {
      message.transferFeeMax = object.transfer_fee_max;
    }
    if (object.transfer_fee_denom !== undefined && object.transfer_fee_denom !== null) {
      message.transferFeeDenom = object.transfer_fee_denom;
    }
    return message;
  },
  toAmino(message: Params, useInterfaces: boolean = false): ParamsAmino {
    const obj: any = {};
    obj.share = message.share;
    if (message.distributionEntities) {
      obj.distribution_entities = message.distributionEntities.map(e => e ? DistributionEntity.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.distribution_entities = [];
    }
    obj.transfer_fee_bps = message.transferFeeBps;
    obj.transfer_fee_max = message.transferFeeMax;
    obj.transfer_fee_denom = message.transferFeeDenom;
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
      typeUrl: "/noble.tariff.Params",
      value: Params.encode(message).finish()
    };
  }
};
function createBaseDistributionEntity(): DistributionEntity {
  return {
    address: "",
    share: ""
  };
}
export const DistributionEntity = {
  typeUrl: "/noble.tariff.DistributionEntity",
  encode(message: DistributionEntity, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.share !== "") {
      writer.uint32(18).string(Decimal.fromUserInput(message.share, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): DistributionEntity {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDistributionEntity();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.share = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<DistributionEntity>): DistributionEntity {
    const message = createBaseDistributionEntity();
    message.address = object.address ?? "";
    message.share = object.share ?? "";
    return message;
  },
  fromAmino(object: DistributionEntityAmino): DistributionEntity {
    const message = createBaseDistributionEntity();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    if (object.share !== undefined && object.share !== null) {
      message.share = object.share;
    }
    return message;
  },
  toAmino(message: DistributionEntity, useInterfaces: boolean = false): DistributionEntityAmino {
    const obj: any = {};
    obj.address = message.address;
    obj.share = message.share;
    return obj;
  },
  fromAminoMsg(object: DistributionEntityAminoMsg): DistributionEntity {
    return DistributionEntity.fromAmino(object.value);
  },
  fromProtoMsg(message: DistributionEntityProtoMsg, useInterfaces: boolean = false): DistributionEntity {
    return DistributionEntity.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: DistributionEntity): Uint8Array {
    return DistributionEntity.encode(message).finish();
  },
  toProtoMsg(message: DistributionEntity): DistributionEntityProtoMsg {
    return {
      typeUrl: "/noble.tariff.DistributionEntity",
      value: DistributionEntity.encode(message).finish()
    };
  }
};