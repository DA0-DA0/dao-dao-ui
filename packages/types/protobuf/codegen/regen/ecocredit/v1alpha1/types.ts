import { Timestamp } from "../../../google/protobuf/timestamp";
import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { bytesFromBase64, base64FromBytes, toTimestamp, fromTimestamp } from "../../../helpers";
/** ClassInfo represents the high-level on-chain information for a credit class. */
export interface ClassInfo {
  /** class_id is the unique ID of credit class. */
  classId: string;
  /** admin is the admin of the credit class. */
  admin: string;
  /** issuers are the approved issuers of the credit class. */
  issuers: string[];
  /** metadata is any arbitrary metadata to attached to the credit class. */
  metadata: Uint8Array;
  /**
   * credit_type describes the type of credit (e.g. carbon, biodiversity), as
   * well as unit and precision.
   */
  creditType?: CreditType | undefined;
  /** The number of batches issued in this credit class. */
  numBatches: bigint;
}
export interface ClassInfoProtoMsg {
  typeUrl: "/regen.ecocredit.v1alpha1.ClassInfo";
  value: Uint8Array;
}
/** ClassInfo represents the high-level on-chain information for a credit class. */
export interface ClassInfoAmino {
  /** class_id is the unique ID of credit class. */
  class_id?: string;
  /** admin is the admin of the credit class. */
  admin?: string;
  /** issuers are the approved issuers of the credit class. */
  issuers?: string[];
  /** metadata is any arbitrary metadata to attached to the credit class. */
  metadata?: string;
  /**
   * credit_type describes the type of credit (e.g. carbon, biodiversity), as
   * well as unit and precision.
   */
  credit_type?: CreditTypeAmino | undefined;
  /** The number of batches issued in this credit class. */
  num_batches?: string;
}
export interface ClassInfoAminoMsg {
  type: "/regen.ecocredit.v1alpha1.ClassInfo";
  value: ClassInfoAmino;
}
/** ClassInfo represents the high-level on-chain information for a credit class. */
export interface ClassInfoSDKType {
  class_id: string;
  admin: string;
  issuers: string[];
  metadata: Uint8Array;
  credit_type?: CreditTypeSDKType | undefined;
  num_batches: bigint;
}
/** BatchInfo represents the high-level on-chain information for a credit batch. */
export interface BatchInfo {
  /** class_id is the unique ID of credit class. */
  classId: string;
  /** batch_denom is the unique ID of credit batch. */
  batchDenom: string;
  /** issuer is the issuer of the credit batch. */
  issuer: string;
  /**
   * total_amount is the total number of active credits in the credit batch.
   * Some of the issued credits may be cancelled and will be removed from
   * total_amount and tracked in amount_cancelled. total_amount and
   * amount_cancelled will always sum to the original amount of credits that
   * were issued.
   */
  totalAmount: string;
  /** metadata is any arbitrary metadata attached to the credit batch. */
  metadata: Uint8Array;
  /**
   * amount_cancelled is the number of credits in the batch that have been
   * cancelled, effectively undoing there issuance. The sum of total_amount and
   * amount_cancelled will always sum to the original amount of credits that
   * were issued.
   */
  amountCancelled: string;
  /**
   * start_date is the beginning of the period during which this credit batch
   * was quantified and verified.
   */
  startDate?: Date | undefined;
  /**
   * end_date is the end of the period during which this credit batch was
   * quantified and verified.
   */
  endDate?: Date | undefined;
  /**
   * project_location is the location of the project backing the credits in this
   * batch. Full documentation can be found in MsgCreateBatch.project_location.
   */
  projectLocation: string;
}
export interface BatchInfoProtoMsg {
  typeUrl: "/regen.ecocredit.v1alpha1.BatchInfo";
  value: Uint8Array;
}
/** BatchInfo represents the high-level on-chain information for a credit batch. */
export interface BatchInfoAmino {
  /** class_id is the unique ID of credit class. */
  class_id?: string;
  /** batch_denom is the unique ID of credit batch. */
  batch_denom?: string;
  /** issuer is the issuer of the credit batch. */
  issuer?: string;
  /**
   * total_amount is the total number of active credits in the credit batch.
   * Some of the issued credits may be cancelled and will be removed from
   * total_amount and tracked in amount_cancelled. total_amount and
   * amount_cancelled will always sum to the original amount of credits that
   * were issued.
   */
  total_amount?: string;
  /** metadata is any arbitrary metadata attached to the credit batch. */
  metadata?: string;
  /**
   * amount_cancelled is the number of credits in the batch that have been
   * cancelled, effectively undoing there issuance. The sum of total_amount and
   * amount_cancelled will always sum to the original amount of credits that
   * were issued.
   */
  amount_cancelled?: string;
  /**
   * start_date is the beginning of the period during which this credit batch
   * was quantified and verified.
   */
  start_date?: string | undefined;
  /**
   * end_date is the end of the period during which this credit batch was
   * quantified and verified.
   */
  end_date?: string | undefined;
  /**
   * project_location is the location of the project backing the credits in this
   * batch. Full documentation can be found in MsgCreateBatch.project_location.
   */
  project_location?: string;
}
export interface BatchInfoAminoMsg {
  type: "/regen.ecocredit.v1alpha1.BatchInfo";
  value: BatchInfoAmino;
}
/** BatchInfo represents the high-level on-chain information for a credit batch. */
export interface BatchInfoSDKType {
  class_id: string;
  batch_denom: string;
  issuer: string;
  total_amount: string;
  metadata: Uint8Array;
  amount_cancelled: string;
  start_date?: Date | undefined;
  end_date?: Date | undefined;
  project_location: string;
}
/**
 * Params defines the updatable global parameters of the ecocredit module for
 * use with the x/params module.
 */
export interface Params {
  /** credit_class_fee is the fixed fee charged on creation of a new credit class */
  creditClassFee: Coin[];
  /**
   * allowed_class_creators is an allowlist defining the addresses with
   * the required permissions to create credit classes
   */
  allowedClassCreators: string[];
  /**
   * allowlist_enabled is a param that enables/disables the allowlist for credit
   * creation
   */
  allowlistEnabled: boolean;
  /** credit_types is a list of definitions for credit types */
  creditTypes: CreditType[];
  /** basket_creation_fee is the fee to create a new basket denom. */
  basketCreationFee: Coin[];
}
export interface ParamsProtoMsg {
  typeUrl: "/regen.ecocredit.v1alpha1.Params";
  value: Uint8Array;
}
/**
 * Params defines the updatable global parameters of the ecocredit module for
 * use with the x/params module.
 */
export interface ParamsAmino {
  /** credit_class_fee is the fixed fee charged on creation of a new credit class */
  credit_class_fee?: CoinAmino[];
  /**
   * allowed_class_creators is an allowlist defining the addresses with
   * the required permissions to create credit classes
   */
  allowed_class_creators?: string[];
  /**
   * allowlist_enabled is a param that enables/disables the allowlist for credit
   * creation
   */
  allowlist_enabled?: boolean;
  /** credit_types is a list of definitions for credit types */
  credit_types?: CreditTypeAmino[];
  /** basket_creation_fee is the fee to create a new basket denom. */
  basket_creation_fee?: CoinAmino[];
}
export interface ParamsAminoMsg {
  type: "/regen.ecocredit.v1alpha1.Params";
  value: ParamsAmino;
}
/**
 * Params defines the updatable global parameters of the ecocredit module for
 * use with the x/params module.
 */
export interface ParamsSDKType {
  credit_class_fee: CoinSDKType[];
  allowed_class_creators: string[];
  allowlist_enabled: boolean;
  credit_types: CreditTypeSDKType[];
  basket_creation_fee: CoinSDKType[];
}
/**
 * CreditType defines the measurement unit/precision of a certain credit type
 * (e.g. carbon, biodiversity...)
 */
export interface CreditType {
  /** the type of credit (e.g. carbon, biodiversity, etc) */
  name: string;
  /**
   * abbreviation is a 1-3 character uppercase abbreviation of the CreditType
   * name, used in batch denominations within the CreditType. It must be unique.
   */
  abbreviation: string;
  /** the measurement unit (e.g. kg, ton, etc) */
  unit: string;
  /** the decimal precision */
  precision: number;
}
export interface CreditTypeProtoMsg {
  typeUrl: "/regen.ecocredit.v1alpha1.CreditType";
  value: Uint8Array;
}
/**
 * CreditType defines the measurement unit/precision of a certain credit type
 * (e.g. carbon, biodiversity...)
 */
export interface CreditTypeAmino {
  /** the type of credit (e.g. carbon, biodiversity, etc) */
  name?: string;
  /**
   * abbreviation is a 1-3 character uppercase abbreviation of the CreditType
   * name, used in batch denominations within the CreditType. It must be unique.
   */
  abbreviation?: string;
  /** the measurement unit (e.g. kg, ton, etc) */
  unit?: string;
  /** the decimal precision */
  precision?: number;
}
export interface CreditTypeAminoMsg {
  type: "/regen.ecocredit.v1alpha1.CreditType";
  value: CreditTypeAmino;
}
/**
 * CreditType defines the measurement unit/precision of a certain credit type
 * (e.g. carbon, biodiversity...)
 */
export interface CreditTypeSDKType {
  name: string;
  abbreviation: string;
  unit: string;
  precision: number;
}
/**
 * CreditTypeSeq associates a sequence number with a credit type abbreviation.
 * This represents the number of credit classes created with that credit type.
 */
export interface CreditTypeSeq {
  /** The credit type abbreviation */
  abbreviation: string;
  /** The sequence number of classes of the credit type */
  seqNumber: bigint;
}
export interface CreditTypeSeqProtoMsg {
  typeUrl: "/regen.ecocredit.v1alpha1.CreditTypeSeq";
  value: Uint8Array;
}
/**
 * CreditTypeSeq associates a sequence number with a credit type abbreviation.
 * This represents the number of credit classes created with that credit type.
 */
export interface CreditTypeSeqAmino {
  /** The credit type abbreviation */
  abbreviation?: string;
  /** The sequence number of classes of the credit type */
  seq_number?: string;
}
export interface CreditTypeSeqAminoMsg {
  type: "/regen.ecocredit.v1alpha1.CreditTypeSeq";
  value: CreditTypeSeqAmino;
}
/**
 * CreditTypeSeq associates a sequence number with a credit type abbreviation.
 * This represents the number of credit classes created with that credit type.
 */
export interface CreditTypeSeqSDKType {
  abbreviation: string;
  seq_number: bigint;
}
function createBaseClassInfo(): ClassInfo {
  return {
    classId: "",
    admin: "",
    issuers: [],
    metadata: new Uint8Array(),
    creditType: undefined,
    numBatches: BigInt(0)
  };
}
export const ClassInfo = {
  typeUrl: "/regen.ecocredit.v1alpha1.ClassInfo",
  encode(message: ClassInfo, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.classId !== "") {
      writer.uint32(10).string(message.classId);
    }
    if (message.admin !== "") {
      writer.uint32(18).string(message.admin);
    }
    for (const v of message.issuers) {
      writer.uint32(26).string(v!);
    }
    if (message.metadata.length !== 0) {
      writer.uint32(34).bytes(message.metadata);
    }
    if (message.creditType !== undefined) {
      CreditType.encode(message.creditType, writer.uint32(42).fork()).ldelim();
    }
    if (message.numBatches !== BigInt(0)) {
      writer.uint32(48).uint64(message.numBatches);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ClassInfo {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClassInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.classId = reader.string();
          break;
        case 2:
          message.admin = reader.string();
          break;
        case 3:
          message.issuers.push(reader.string());
          break;
        case 4:
          message.metadata = reader.bytes();
          break;
        case 5:
          message.creditType = CreditType.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 6:
          message.numBatches = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ClassInfo>): ClassInfo {
    const message = createBaseClassInfo();
    message.classId = object.classId ?? "";
    message.admin = object.admin ?? "";
    message.issuers = object.issuers?.map(e => e) || [];
    message.metadata = object.metadata ?? new Uint8Array();
    message.creditType = object.creditType !== undefined && object.creditType !== null ? CreditType.fromPartial(object.creditType) : undefined;
    message.numBatches = object.numBatches !== undefined && object.numBatches !== null ? BigInt(object.numBatches.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: ClassInfoAmino): ClassInfo {
    const message = createBaseClassInfo();
    if (object.class_id !== undefined && object.class_id !== null) {
      message.classId = object.class_id;
    }
    if (object.admin !== undefined && object.admin !== null) {
      message.admin = object.admin;
    }
    message.issuers = object.issuers?.map(e => e) || [];
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = bytesFromBase64(object.metadata);
    }
    if (object.credit_type !== undefined && object.credit_type !== null) {
      message.creditType = CreditType.fromAmino(object.credit_type);
    }
    if (object.num_batches !== undefined && object.num_batches !== null) {
      message.numBatches = BigInt(object.num_batches);
    }
    return message;
  },
  toAmino(message: ClassInfo, useInterfaces: boolean = false): ClassInfoAmino {
    const obj: any = {};
    obj.class_id = message.classId === "" ? undefined : message.classId;
    obj.admin = message.admin === "" ? undefined : message.admin;
    if (message.issuers) {
      obj.issuers = message.issuers.map(e => e);
    } else {
      obj.issuers = message.issuers;
    }
    obj.metadata = message.metadata ? base64FromBytes(message.metadata) : undefined;
    obj.credit_type = message.creditType ? CreditType.toAmino(message.creditType, useInterfaces) : undefined;
    obj.num_batches = message.numBatches !== BigInt(0) ? message.numBatches.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: ClassInfoAminoMsg): ClassInfo {
    return ClassInfo.fromAmino(object.value);
  },
  fromProtoMsg(message: ClassInfoProtoMsg, useInterfaces: boolean = false): ClassInfo {
    return ClassInfo.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ClassInfo): Uint8Array {
    return ClassInfo.encode(message).finish();
  },
  toProtoMsg(message: ClassInfo): ClassInfoProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1alpha1.ClassInfo",
      value: ClassInfo.encode(message).finish()
    };
  }
};
function createBaseBatchInfo(): BatchInfo {
  return {
    classId: "",
    batchDenom: "",
    issuer: "",
    totalAmount: "",
    metadata: new Uint8Array(),
    amountCancelled: "",
    startDate: undefined,
    endDate: undefined,
    projectLocation: ""
  };
}
export const BatchInfo = {
  typeUrl: "/regen.ecocredit.v1alpha1.BatchInfo",
  encode(message: BatchInfo, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.classId !== "") {
      writer.uint32(10).string(message.classId);
    }
    if (message.batchDenom !== "") {
      writer.uint32(18).string(message.batchDenom);
    }
    if (message.issuer !== "") {
      writer.uint32(26).string(message.issuer);
    }
    if (message.totalAmount !== "") {
      writer.uint32(34).string(message.totalAmount);
    }
    if (message.metadata.length !== 0) {
      writer.uint32(42).bytes(message.metadata);
    }
    if (message.amountCancelled !== "") {
      writer.uint32(50).string(message.amountCancelled);
    }
    if (message.startDate !== undefined) {
      Timestamp.encode(toTimestamp(message.startDate), writer.uint32(58).fork()).ldelim();
    }
    if (message.endDate !== undefined) {
      Timestamp.encode(toTimestamp(message.endDate), writer.uint32(66).fork()).ldelim();
    }
    if (message.projectLocation !== "") {
      writer.uint32(74).string(message.projectLocation);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): BatchInfo {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBatchInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.classId = reader.string();
          break;
        case 2:
          message.batchDenom = reader.string();
          break;
        case 3:
          message.issuer = reader.string();
          break;
        case 4:
          message.totalAmount = reader.string();
          break;
        case 5:
          message.metadata = reader.bytes();
          break;
        case 6:
          message.amountCancelled = reader.string();
          break;
        case 7:
          message.startDate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 8:
          message.endDate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 9:
          message.projectLocation = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<BatchInfo>): BatchInfo {
    const message = createBaseBatchInfo();
    message.classId = object.classId ?? "";
    message.batchDenom = object.batchDenom ?? "";
    message.issuer = object.issuer ?? "";
    message.totalAmount = object.totalAmount ?? "";
    message.metadata = object.metadata ?? new Uint8Array();
    message.amountCancelled = object.amountCancelled ?? "";
    message.startDate = object.startDate ?? undefined;
    message.endDate = object.endDate ?? undefined;
    message.projectLocation = object.projectLocation ?? "";
    return message;
  },
  fromAmino(object: BatchInfoAmino): BatchInfo {
    const message = createBaseBatchInfo();
    if (object.class_id !== undefined && object.class_id !== null) {
      message.classId = object.class_id;
    }
    if (object.batch_denom !== undefined && object.batch_denom !== null) {
      message.batchDenom = object.batch_denom;
    }
    if (object.issuer !== undefined && object.issuer !== null) {
      message.issuer = object.issuer;
    }
    if (object.total_amount !== undefined && object.total_amount !== null) {
      message.totalAmount = object.total_amount;
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = bytesFromBase64(object.metadata);
    }
    if (object.amount_cancelled !== undefined && object.amount_cancelled !== null) {
      message.amountCancelled = object.amount_cancelled;
    }
    if (object.start_date !== undefined && object.start_date !== null) {
      message.startDate = fromTimestamp(Timestamp.fromAmino(object.start_date));
    }
    if (object.end_date !== undefined && object.end_date !== null) {
      message.endDate = fromTimestamp(Timestamp.fromAmino(object.end_date));
    }
    if (object.project_location !== undefined && object.project_location !== null) {
      message.projectLocation = object.project_location;
    }
    return message;
  },
  toAmino(message: BatchInfo, useInterfaces: boolean = false): BatchInfoAmino {
    const obj: any = {};
    obj.class_id = message.classId === "" ? undefined : message.classId;
    obj.batch_denom = message.batchDenom === "" ? undefined : message.batchDenom;
    obj.issuer = message.issuer === "" ? undefined : message.issuer;
    obj.total_amount = message.totalAmount === "" ? undefined : message.totalAmount;
    obj.metadata = message.metadata ? base64FromBytes(message.metadata) : undefined;
    obj.amount_cancelled = message.amountCancelled === "" ? undefined : message.amountCancelled;
    obj.start_date = message.startDate ? Timestamp.toAmino(toTimestamp(message.startDate)) : undefined;
    obj.end_date = message.endDate ? Timestamp.toAmino(toTimestamp(message.endDate)) : undefined;
    obj.project_location = message.projectLocation === "" ? undefined : message.projectLocation;
    return obj;
  },
  fromAminoMsg(object: BatchInfoAminoMsg): BatchInfo {
    return BatchInfo.fromAmino(object.value);
  },
  fromProtoMsg(message: BatchInfoProtoMsg, useInterfaces: boolean = false): BatchInfo {
    return BatchInfo.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: BatchInfo): Uint8Array {
    return BatchInfo.encode(message).finish();
  },
  toProtoMsg(message: BatchInfo): BatchInfoProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1alpha1.BatchInfo",
      value: BatchInfo.encode(message).finish()
    };
  }
};
function createBaseParams(): Params {
  return {
    creditClassFee: [],
    allowedClassCreators: [],
    allowlistEnabled: false,
    creditTypes: [],
    basketCreationFee: []
  };
}
export const Params = {
  typeUrl: "/regen.ecocredit.v1alpha1.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.creditClassFee) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.allowedClassCreators) {
      writer.uint32(18).string(v!);
    }
    if (message.allowlistEnabled === true) {
      writer.uint32(24).bool(message.allowlistEnabled);
    }
    for (const v of message.creditTypes) {
      CreditType.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.basketCreationFee) {
      Coin.encode(v!, writer.uint32(42).fork()).ldelim();
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
          message.creditClassFee.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
          message.allowedClassCreators.push(reader.string());
          break;
        case 3:
          message.allowlistEnabled = reader.bool();
          break;
        case 4:
          message.creditTypes.push(CreditType.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 5:
          message.basketCreationFee.push(Coin.decode(reader, reader.uint32(), useInterfaces));
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
    message.creditClassFee = object.creditClassFee?.map(e => Coin.fromPartial(e)) || [];
    message.allowedClassCreators = object.allowedClassCreators?.map(e => e) || [];
    message.allowlistEnabled = object.allowlistEnabled ?? false;
    message.creditTypes = object.creditTypes?.map(e => CreditType.fromPartial(e)) || [];
    message.basketCreationFee = object.basketCreationFee?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    const message = createBaseParams();
    message.creditClassFee = object.credit_class_fee?.map(e => Coin.fromAmino(e)) || [];
    message.allowedClassCreators = object.allowed_class_creators?.map(e => e) || [];
    if (object.allowlist_enabled !== undefined && object.allowlist_enabled !== null) {
      message.allowlistEnabled = object.allowlist_enabled;
    }
    message.creditTypes = object.credit_types?.map(e => CreditType.fromAmino(e)) || [];
    message.basketCreationFee = object.basket_creation_fee?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: Params, useInterfaces: boolean = false): ParamsAmino {
    const obj: any = {};
    if (message.creditClassFee) {
      obj.credit_class_fee = message.creditClassFee.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.credit_class_fee = message.creditClassFee;
    }
    if (message.allowedClassCreators) {
      obj.allowed_class_creators = message.allowedClassCreators.map(e => e);
    } else {
      obj.allowed_class_creators = message.allowedClassCreators;
    }
    obj.allowlist_enabled = message.allowlistEnabled === false ? undefined : message.allowlistEnabled;
    if (message.creditTypes) {
      obj.credit_types = message.creditTypes.map(e => e ? CreditType.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.credit_types = message.creditTypes;
    }
    if (message.basketCreationFee) {
      obj.basket_creation_fee = message.basketCreationFee.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.basket_creation_fee = message.basketCreationFee;
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
      typeUrl: "/regen.ecocredit.v1alpha1.Params",
      value: Params.encode(message).finish()
    };
  }
};
function createBaseCreditType(): CreditType {
  return {
    name: "",
    abbreviation: "",
    unit: "",
    precision: 0
  };
}
export const CreditType = {
  typeUrl: "/regen.ecocredit.v1alpha1.CreditType",
  encode(message: CreditType, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.abbreviation !== "") {
      writer.uint32(18).string(message.abbreviation);
    }
    if (message.unit !== "") {
      writer.uint32(26).string(message.unit);
    }
    if (message.precision !== 0) {
      writer.uint32(32).uint32(message.precision);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): CreditType {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreditType();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.abbreviation = reader.string();
          break;
        case 3:
          message.unit = reader.string();
          break;
        case 4:
          message.precision = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<CreditType>): CreditType {
    const message = createBaseCreditType();
    message.name = object.name ?? "";
    message.abbreviation = object.abbreviation ?? "";
    message.unit = object.unit ?? "";
    message.precision = object.precision ?? 0;
    return message;
  },
  fromAmino(object: CreditTypeAmino): CreditType {
    const message = createBaseCreditType();
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    }
    if (object.abbreviation !== undefined && object.abbreviation !== null) {
      message.abbreviation = object.abbreviation;
    }
    if (object.unit !== undefined && object.unit !== null) {
      message.unit = object.unit;
    }
    if (object.precision !== undefined && object.precision !== null) {
      message.precision = object.precision;
    }
    return message;
  },
  toAmino(message: CreditType, useInterfaces: boolean = false): CreditTypeAmino {
    const obj: any = {};
    obj.name = message.name === "" ? undefined : message.name;
    obj.abbreviation = message.abbreviation === "" ? undefined : message.abbreviation;
    obj.unit = message.unit === "" ? undefined : message.unit;
    obj.precision = message.precision === 0 ? undefined : message.precision;
    return obj;
  },
  fromAminoMsg(object: CreditTypeAminoMsg): CreditType {
    return CreditType.fromAmino(object.value);
  },
  fromProtoMsg(message: CreditTypeProtoMsg, useInterfaces: boolean = false): CreditType {
    return CreditType.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: CreditType): Uint8Array {
    return CreditType.encode(message).finish();
  },
  toProtoMsg(message: CreditType): CreditTypeProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1alpha1.CreditType",
      value: CreditType.encode(message).finish()
    };
  }
};
function createBaseCreditTypeSeq(): CreditTypeSeq {
  return {
    abbreviation: "",
    seqNumber: BigInt(0)
  };
}
export const CreditTypeSeq = {
  typeUrl: "/regen.ecocredit.v1alpha1.CreditTypeSeq",
  encode(message: CreditTypeSeq, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.abbreviation !== "") {
      writer.uint32(10).string(message.abbreviation);
    }
    if (message.seqNumber !== BigInt(0)) {
      writer.uint32(16).uint64(message.seqNumber);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): CreditTypeSeq {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreditTypeSeq();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.abbreviation = reader.string();
          break;
        case 2:
          message.seqNumber = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<CreditTypeSeq>): CreditTypeSeq {
    const message = createBaseCreditTypeSeq();
    message.abbreviation = object.abbreviation ?? "";
    message.seqNumber = object.seqNumber !== undefined && object.seqNumber !== null ? BigInt(object.seqNumber.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: CreditTypeSeqAmino): CreditTypeSeq {
    const message = createBaseCreditTypeSeq();
    if (object.abbreviation !== undefined && object.abbreviation !== null) {
      message.abbreviation = object.abbreviation;
    }
    if (object.seq_number !== undefined && object.seq_number !== null) {
      message.seqNumber = BigInt(object.seq_number);
    }
    return message;
  },
  toAmino(message: CreditTypeSeq, useInterfaces: boolean = false): CreditTypeSeqAmino {
    const obj: any = {};
    obj.abbreviation = message.abbreviation === "" ? undefined : message.abbreviation;
    obj.seq_number = message.seqNumber !== BigInt(0) ? message.seqNumber.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: CreditTypeSeqAminoMsg): CreditTypeSeq {
    return CreditTypeSeq.fromAmino(object.value);
  },
  fromProtoMsg(message: CreditTypeSeqProtoMsg, useInterfaces: boolean = false): CreditTypeSeq {
    return CreditTypeSeq.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: CreditTypeSeq): Uint8Array {
    return CreditTypeSeq.encode(message).finish();
  },
  toProtoMsg(message: CreditTypeSeq): CreditTypeSeqProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1alpha1.CreditTypeSeq",
      value: CreditTypeSeq.encode(message).finish()
    };
  }
};