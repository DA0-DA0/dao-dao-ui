import { DateCriteria, DateCriteriaAmino, DateCriteriaSDKType } from "./types";
import { Timestamp } from "../../../../google/protobuf/timestamp";
import { Coin, CoinAmino, CoinSDKType } from "../../../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../../../binary";
import { bytesFromBase64, base64FromBytes, toTimestamp, fromTimestamp } from "../../../../helpers";
/** Basket represents a basket in state. */
export interface Basket {
  /**
   * id is the uint64 ID of the basket. It is used internally for reducing
   * storage space.
   */
  id: bigint;
  /**
   * basket_denom is the basket bank denom formed from name and credit type with
   * the format `eco.<prefix><credit_type_abbrev>.<name>` where prefix is the
   * prefix of the bank denom exponent, a standard SI unit derived from credit
   * type precision, and mapped as follows:
   *   0 - no prefix
   *   1 - d (deci)
   *   2 - c (centi)
   *   3 - m (milli)
   *   6 - u (micro)
   *   9 - n (nano)
   *   12 - p (pico)
   *   15 - f (femto)
   *   18 - a (atto)
   *   21 - z (zepto)
   *   24 - y (yocto)
   */
  basketDenom: string;
  /**
   * name is the unique name of the basket specified in MsgCreate. Basket
   * names must be unique across all credit types and choices of exponent
   * above and beyond the uniqueness constraint on basket_denom.
   */
  name: string;
  /**
   * disable_auto_retire indicates whether or not the credits will be retired
   * upon withdraw from the basket.
   */
  disableAutoRetire: boolean;
  /**
   * credit_type_abbrev is the abbreviation of the credit type this basket is
   * able to hold.
   */
  creditTypeAbbrev: string;
  /** date_criteria is the date criteria for batches admitted to the basket. */
  dateCriteria?: DateCriteria | undefined;
  /**
   * Deprecated (Since Revision 1): This field is no longer used and will be
   * removed in the next version. The value of credit type precision is always
   * used as the exponent when converting credits to/from basket tokens. This
   * field will be set to the value of credit type precision until removed.
   */
  /** @deprecated */
  exponent: number;
  /**
   * curator is the address of the basket curator who is able to change certain
   * basket settings.
   * 
   * Since Revision 1
   */
  curator: Uint8Array;
}
export interface BasketProtoMsg {
  typeUrl: "/regen.ecocredit.basket.v1.Basket";
  value: Uint8Array;
}
/** Basket represents a basket in state. */
export interface BasketAmino {
  /**
   * id is the uint64 ID of the basket. It is used internally for reducing
   * storage space.
   */
  id?: string;
  /**
   * basket_denom is the basket bank denom formed from name and credit type with
   * the format `eco.<prefix><credit_type_abbrev>.<name>` where prefix is the
   * prefix of the bank denom exponent, a standard SI unit derived from credit
   * type precision, and mapped as follows:
   *   0 - no prefix
   *   1 - d (deci)
   *   2 - c (centi)
   *   3 - m (milli)
   *   6 - u (micro)
   *   9 - n (nano)
   *   12 - p (pico)
   *   15 - f (femto)
   *   18 - a (atto)
   *   21 - z (zepto)
   *   24 - y (yocto)
   */
  basket_denom?: string;
  /**
   * name is the unique name of the basket specified in MsgCreate. Basket
   * names must be unique across all credit types and choices of exponent
   * above and beyond the uniqueness constraint on basket_denom.
   */
  name?: string;
  /**
   * disable_auto_retire indicates whether or not the credits will be retired
   * upon withdraw from the basket.
   */
  disable_auto_retire?: boolean;
  /**
   * credit_type_abbrev is the abbreviation of the credit type this basket is
   * able to hold.
   */
  credit_type_abbrev?: string;
  /** date_criteria is the date criteria for batches admitted to the basket. */
  date_criteria?: DateCriteriaAmino | undefined;
  /**
   * Deprecated (Since Revision 1): This field is no longer used and will be
   * removed in the next version. The value of credit type precision is always
   * used as the exponent when converting credits to/from basket tokens. This
   * field will be set to the value of credit type precision until removed.
   */
  /** @deprecated */
  exponent?: number;
  /**
   * curator is the address of the basket curator who is able to change certain
   * basket settings.
   * 
   * Since Revision 1
   */
  curator?: string;
}
export interface BasketAminoMsg {
  type: "/regen.ecocredit.basket.v1.Basket";
  value: BasketAmino;
}
/** Basket represents a basket in state. */
export interface BasketSDKType {
  id: bigint;
  basket_denom: string;
  name: string;
  disable_auto_retire: boolean;
  credit_type_abbrev: string;
  date_criteria?: DateCriteriaSDKType | undefined;
  /** @deprecated */
  exponent: number;
  curator: Uint8Array;
}
/** BasketClass describes a credit class that can be deposited in a basket. */
export interface BasketClass {
  /** basket_id is the ID of the basket */
  basketId: bigint;
  /**
   * class_id is the id of the credit class that is allowed to be deposited in
   * the basket
   */
  classId: string;
}
export interface BasketClassProtoMsg {
  typeUrl: "/regen.ecocredit.basket.v1.BasketClass";
  value: Uint8Array;
}
/** BasketClass describes a credit class that can be deposited in a basket. */
export interface BasketClassAmino {
  /** basket_id is the ID of the basket */
  basket_id?: string;
  /**
   * class_id is the id of the credit class that is allowed to be deposited in
   * the basket
   */
  class_id?: string;
}
export interface BasketClassAminoMsg {
  type: "/regen.ecocredit.basket.v1.BasketClass";
  value: BasketClassAmino;
}
/** BasketClass describes a credit class that can be deposited in a basket. */
export interface BasketClassSDKType {
  basket_id: bigint;
  class_id: string;
}
/** BasketBalance stores the amount of credits from a batch in a basket */
export interface BasketBalance {
  /** basket_id is the ID of the basket */
  basketId: bigint;
  /** batch_denom is the denom of the credit batch */
  batchDenom: string;
  /** balance is the amount of ecocredits held in the basket */
  balance: string;
  /**
   * batch_start_date is the start date of the batch. This field is used
   * to create an index which is used to remove the oldest credits first.
   */
  batchStartDate?: Date | undefined;
}
export interface BasketBalanceProtoMsg {
  typeUrl: "/regen.ecocredit.basket.v1.BasketBalance";
  value: Uint8Array;
}
/** BasketBalance stores the amount of credits from a batch in a basket */
export interface BasketBalanceAmino {
  /** basket_id is the ID of the basket */
  basket_id?: string;
  /** batch_denom is the denom of the credit batch */
  batch_denom?: string;
  /** balance is the amount of ecocredits held in the basket */
  balance?: string;
  /**
   * batch_start_date is the start date of the batch. This field is used
   * to create an index which is used to remove the oldest credits first.
   */
  batch_start_date?: string | undefined;
}
export interface BasketBalanceAminoMsg {
  type: "/regen.ecocredit.basket.v1.BasketBalance";
  value: BasketBalanceAmino;
}
/** BasketBalance stores the amount of credits from a batch in a basket */
export interface BasketBalanceSDKType {
  basket_id: bigint;
  batch_denom: string;
  balance: string;
  batch_start_date?: Date | undefined;
}
/**
 * BasketFee is the basket creation fee. If not set, a basket creation fee is
 * not required. This table is controlled via governance.
 * 
 * Since Revision 2
 */
export interface BasketFee {
  /**
   * fee is the basket creation fee. If not set, a basket creation fee is not
   * required.
   */
  fee?: Coin | undefined;
}
export interface BasketFeeProtoMsg {
  typeUrl: "/regen.ecocredit.basket.v1.BasketFee";
  value: Uint8Array;
}
/**
 * BasketFee is the basket creation fee. If not set, a basket creation fee is
 * not required. This table is controlled via governance.
 * 
 * Since Revision 2
 */
export interface BasketFeeAmino {
  /**
   * fee is the basket creation fee. If not set, a basket creation fee is not
   * required.
   */
  fee?: CoinAmino | undefined;
}
export interface BasketFeeAminoMsg {
  type: "/regen.ecocredit.basket.v1.BasketFee";
  value: BasketFeeAmino;
}
/**
 * BasketFee is the basket creation fee. If not set, a basket creation fee is
 * not required. This table is controlled via governance.
 * 
 * Since Revision 2
 */
export interface BasketFeeSDKType {
  fee?: CoinSDKType | undefined;
}
function createBaseBasket(): Basket {
  return {
    id: BigInt(0),
    basketDenom: "",
    name: "",
    disableAutoRetire: false,
    creditTypeAbbrev: "",
    dateCriteria: undefined,
    exponent: 0,
    curator: new Uint8Array()
  };
}
export const Basket = {
  typeUrl: "/regen.ecocredit.basket.v1.Basket",
  encode(message: Basket, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.basketDenom !== "") {
      writer.uint32(18).string(message.basketDenom);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.disableAutoRetire === true) {
      writer.uint32(32).bool(message.disableAutoRetire);
    }
    if (message.creditTypeAbbrev !== "") {
      writer.uint32(42).string(message.creditTypeAbbrev);
    }
    if (message.dateCriteria !== undefined) {
      DateCriteria.encode(message.dateCriteria, writer.uint32(50).fork()).ldelim();
    }
    if (message.exponent !== 0) {
      writer.uint32(56).uint32(message.exponent);
    }
    if (message.curator.length !== 0) {
      writer.uint32(66).bytes(message.curator);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): Basket {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBasket();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.basketDenom = reader.string();
          break;
        case 3:
          message.name = reader.string();
          break;
        case 4:
          message.disableAutoRetire = reader.bool();
          break;
        case 5:
          message.creditTypeAbbrev = reader.string();
          break;
        case 6:
          message.dateCriteria = DateCriteria.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 7:
          message.exponent = reader.uint32();
          break;
        case 8:
          message.curator = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Basket>): Basket {
    const message = createBaseBasket();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.basketDenom = object.basketDenom ?? "";
    message.name = object.name ?? "";
    message.disableAutoRetire = object.disableAutoRetire ?? false;
    message.creditTypeAbbrev = object.creditTypeAbbrev ?? "";
    message.dateCriteria = object.dateCriteria !== undefined && object.dateCriteria !== null ? DateCriteria.fromPartial(object.dateCriteria) : undefined;
    message.exponent = object.exponent ?? 0;
    message.curator = object.curator ?? new Uint8Array();
    return message;
  },
  fromAmino(object: BasketAmino): Basket {
    const message = createBaseBasket();
    if (object.id !== undefined && object.id !== null) {
      message.id = BigInt(object.id);
    }
    if (object.basket_denom !== undefined && object.basket_denom !== null) {
      message.basketDenom = object.basket_denom;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    }
    if (object.disable_auto_retire !== undefined && object.disable_auto_retire !== null) {
      message.disableAutoRetire = object.disable_auto_retire;
    }
    if (object.credit_type_abbrev !== undefined && object.credit_type_abbrev !== null) {
      message.creditTypeAbbrev = object.credit_type_abbrev;
    }
    if (object.date_criteria !== undefined && object.date_criteria !== null) {
      message.dateCriteria = DateCriteria.fromAmino(object.date_criteria);
    }
    if (object.exponent !== undefined && object.exponent !== null) {
      message.exponent = object.exponent;
    }
    if (object.curator !== undefined && object.curator !== null) {
      message.curator = bytesFromBase64(object.curator);
    }
    return message;
  },
  toAmino(message: Basket, useInterfaces: boolean = false): BasketAmino {
    const obj: any = {};
    obj.id = message.id !== BigInt(0) ? message.id.toString() : undefined;
    obj.basket_denom = message.basketDenom === "" ? undefined : message.basketDenom;
    obj.name = message.name === "" ? undefined : message.name;
    obj.disable_auto_retire = message.disableAutoRetire === false ? undefined : message.disableAutoRetire;
    obj.credit_type_abbrev = message.creditTypeAbbrev === "" ? undefined : message.creditTypeAbbrev;
    obj.date_criteria = message.dateCriteria ? DateCriteria.toAmino(message.dateCriteria, useInterfaces) : undefined;
    obj.exponent = message.exponent === 0 ? undefined : message.exponent;
    obj.curator = message.curator ? base64FromBytes(message.curator) : undefined;
    return obj;
  },
  fromAminoMsg(object: BasketAminoMsg): Basket {
    return Basket.fromAmino(object.value);
  },
  fromProtoMsg(message: BasketProtoMsg, useInterfaces: boolean = false): Basket {
    return Basket.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Basket): Uint8Array {
    return Basket.encode(message).finish();
  },
  toProtoMsg(message: Basket): BasketProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.basket.v1.Basket",
      value: Basket.encode(message).finish()
    };
  }
};
function createBaseBasketClass(): BasketClass {
  return {
    basketId: BigInt(0),
    classId: ""
  };
}
export const BasketClass = {
  typeUrl: "/regen.ecocredit.basket.v1.BasketClass",
  encode(message: BasketClass, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.basketId !== BigInt(0)) {
      writer.uint32(8).uint64(message.basketId);
    }
    if (message.classId !== "") {
      writer.uint32(18).string(message.classId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): BasketClass {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBasketClass();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.basketId = reader.uint64();
          break;
        case 2:
          message.classId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<BasketClass>): BasketClass {
    const message = createBaseBasketClass();
    message.basketId = object.basketId !== undefined && object.basketId !== null ? BigInt(object.basketId.toString()) : BigInt(0);
    message.classId = object.classId ?? "";
    return message;
  },
  fromAmino(object: BasketClassAmino): BasketClass {
    const message = createBaseBasketClass();
    if (object.basket_id !== undefined && object.basket_id !== null) {
      message.basketId = BigInt(object.basket_id);
    }
    if (object.class_id !== undefined && object.class_id !== null) {
      message.classId = object.class_id;
    }
    return message;
  },
  toAmino(message: BasketClass, useInterfaces: boolean = false): BasketClassAmino {
    const obj: any = {};
    obj.basket_id = message.basketId !== BigInt(0) ? message.basketId.toString() : undefined;
    obj.class_id = message.classId === "" ? undefined : message.classId;
    return obj;
  },
  fromAminoMsg(object: BasketClassAminoMsg): BasketClass {
    return BasketClass.fromAmino(object.value);
  },
  fromProtoMsg(message: BasketClassProtoMsg, useInterfaces: boolean = false): BasketClass {
    return BasketClass.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: BasketClass): Uint8Array {
    return BasketClass.encode(message).finish();
  },
  toProtoMsg(message: BasketClass): BasketClassProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.basket.v1.BasketClass",
      value: BasketClass.encode(message).finish()
    };
  }
};
function createBaseBasketBalance(): BasketBalance {
  return {
    basketId: BigInt(0),
    batchDenom: "",
    balance: "",
    batchStartDate: undefined
  };
}
export const BasketBalance = {
  typeUrl: "/regen.ecocredit.basket.v1.BasketBalance",
  encode(message: BasketBalance, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.basketId !== BigInt(0)) {
      writer.uint32(8).uint64(message.basketId);
    }
    if (message.batchDenom !== "") {
      writer.uint32(18).string(message.batchDenom);
    }
    if (message.balance !== "") {
      writer.uint32(26).string(message.balance);
    }
    if (message.batchStartDate !== undefined) {
      Timestamp.encode(toTimestamp(message.batchStartDate), writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): BasketBalance {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBasketBalance();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.basketId = reader.uint64();
          break;
        case 2:
          message.batchDenom = reader.string();
          break;
        case 3:
          message.balance = reader.string();
          break;
        case 4:
          message.batchStartDate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<BasketBalance>): BasketBalance {
    const message = createBaseBasketBalance();
    message.basketId = object.basketId !== undefined && object.basketId !== null ? BigInt(object.basketId.toString()) : BigInt(0);
    message.batchDenom = object.batchDenom ?? "";
    message.balance = object.balance ?? "";
    message.batchStartDate = object.batchStartDate ?? undefined;
    return message;
  },
  fromAmino(object: BasketBalanceAmino): BasketBalance {
    const message = createBaseBasketBalance();
    if (object.basket_id !== undefined && object.basket_id !== null) {
      message.basketId = BigInt(object.basket_id);
    }
    if (object.batch_denom !== undefined && object.batch_denom !== null) {
      message.batchDenom = object.batch_denom;
    }
    if (object.balance !== undefined && object.balance !== null) {
      message.balance = object.balance;
    }
    if (object.batch_start_date !== undefined && object.batch_start_date !== null) {
      message.batchStartDate = fromTimestamp(Timestamp.fromAmino(object.batch_start_date));
    }
    return message;
  },
  toAmino(message: BasketBalance, useInterfaces: boolean = false): BasketBalanceAmino {
    const obj: any = {};
    obj.basket_id = message.basketId !== BigInt(0) ? message.basketId.toString() : undefined;
    obj.batch_denom = message.batchDenom === "" ? undefined : message.batchDenom;
    obj.balance = message.balance === "" ? undefined : message.balance;
    obj.batch_start_date = message.batchStartDate ? Timestamp.toAmino(toTimestamp(message.batchStartDate)) : undefined;
    return obj;
  },
  fromAminoMsg(object: BasketBalanceAminoMsg): BasketBalance {
    return BasketBalance.fromAmino(object.value);
  },
  fromProtoMsg(message: BasketBalanceProtoMsg, useInterfaces: boolean = false): BasketBalance {
    return BasketBalance.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: BasketBalance): Uint8Array {
    return BasketBalance.encode(message).finish();
  },
  toProtoMsg(message: BasketBalance): BasketBalanceProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.basket.v1.BasketBalance",
      value: BasketBalance.encode(message).finish()
    };
  }
};
function createBaseBasketFee(): BasketFee {
  return {
    fee: undefined
  };
}
export const BasketFee = {
  typeUrl: "/regen.ecocredit.basket.v1.BasketFee",
  encode(message: BasketFee, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.fee !== undefined) {
      Coin.encode(message.fee, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): BasketFee {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBasketFee();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.fee = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<BasketFee>): BasketFee {
    const message = createBaseBasketFee();
    message.fee = object.fee !== undefined && object.fee !== null ? Coin.fromPartial(object.fee) : undefined;
    return message;
  },
  fromAmino(object: BasketFeeAmino): BasketFee {
    const message = createBaseBasketFee();
    if (object.fee !== undefined && object.fee !== null) {
      message.fee = Coin.fromAmino(object.fee);
    }
    return message;
  },
  toAmino(message: BasketFee, useInterfaces: boolean = false): BasketFeeAmino {
    const obj: any = {};
    obj.fee = message.fee ? Coin.toAmino(message.fee, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: BasketFeeAminoMsg): BasketFee {
    return BasketFee.fromAmino(object.value);
  },
  fromProtoMsg(message: BasketFeeProtoMsg, useInterfaces: boolean = false): BasketFee {
    return BasketFee.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: BasketFee): Uint8Array {
    return BasketFee.encode(message).finish();
  },
  toProtoMsg(message: BasketFee): BasketFeeProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.basket.v1.BasketFee",
      value: BasketFee.encode(message).finish()
    };
  }
};