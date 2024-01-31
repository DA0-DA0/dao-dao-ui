//@ts-nocheck
import { DateCriteria, DateCriteriaAmino, DateCriteriaSDKType, BasketCredit, BasketCreditAmino, BasketCreditSDKType } from "./types";
import { Coin, CoinAmino, CoinSDKType } from "../../../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../../../binary";
/** MsgCreateBasket is the Msg/CreateBasket request type. */
export interface MsgCreate {
  /**
   * curator is the address of the basket curator who is able to change certain
   * basket settings.
   */
  curator: string;
  /**
   * name will be used to together with prefix to create a bank denom for this
   * basket token. It can be between 3-8 alphanumeric characters, with the
   * first character being alphabetic.
   * 
   * The bank denom will be formed from name and credit type with the format
   * `eco.<prefix><credit_type_abbrev>.<name>` where prefix is the prefix of
   * a standard SI unit derived from credit type precision.
   */
  name: string;
  /**
   * description is a human-readable description of the basket denom that should
   * be at most 256 characters.
   */
  description: string;
  /**
   * Deprecated (Since Revision 1): This field is no longer used and will be
   * removed in the next version. The value of credit type precision is always
   * used as the exponent when determining the prefix for basket denom, defining
   * bank denom metadata, and converting credits to/from basket tokens.
   */
  /** @deprecated */
  exponent: number;
  /**
   * disable_auto_retire allows auto-retirement to be disabled.
   * The credits will be auto-retired if disable_auto_retire is
   * false unless the credits were previously put into the basket by the
   * address picking them from the basket, in which case they will remain
   * tradable.
   */
  disableAutoRetire: boolean;
  /**
   * credit_type_abbrev is the abbreviation of the credit type this basket is
   * able to hold.
   */
  creditTypeAbbrev: string;
  /** allowed_classes are the credit classes allowed to be put in the basket */
  allowedClasses: string[];
  /**
   * date_criteria is the date criteria for batches admitted to the basket.
   * At most, only one of the date criteria fields can be set.
   */
  dateCriteria?: DateCriteria | undefined;
  /**
   * fee is the basket creation fee. A fee is not required if no fee exists
   * in the basket fee parameter. The fee must be greater than or equal to the
   * fee param. The curator will be charged the amount specified in the fee
   * parameter, even if a greater amount is provided.
   * 
   * Note (Since Revision 1): Although this field supports a list of fees, the
   * basket creator must provide no more than one fee (i.e. one Coin in a list
   * of Coins). Providing more than one fee will fail basic message validation.
   * This field will be updated to a single fee rather than a list of fees in
   * the next version to reflect these requirements.
   */
  fee: Coin[];
}
export interface MsgCreateProtoMsg {
  typeUrl: "/regen.ecocredit.basket.v1.MsgCreate";
  value: Uint8Array;
}
/** MsgCreateBasket is the Msg/CreateBasket request type. */
export interface MsgCreateAmino {
  /**
   * curator is the address of the basket curator who is able to change certain
   * basket settings.
   */
  curator?: string;
  /**
   * name will be used to together with prefix to create a bank denom for this
   * basket token. It can be between 3-8 alphanumeric characters, with the
   * first character being alphabetic.
   * 
   * The bank denom will be formed from name and credit type with the format
   * `eco.<prefix><credit_type_abbrev>.<name>` where prefix is the prefix of
   * a standard SI unit derived from credit type precision.
   */
  name?: string;
  /**
   * description is a human-readable description of the basket denom that should
   * be at most 256 characters.
   */
  description?: string;
  /**
   * Deprecated (Since Revision 1): This field is no longer used and will be
   * removed in the next version. The value of credit type precision is always
   * used as the exponent when determining the prefix for basket denom, defining
   * bank denom metadata, and converting credits to/from basket tokens.
   */
  /** @deprecated */
  exponent?: number;
  /**
   * disable_auto_retire allows auto-retirement to be disabled.
   * The credits will be auto-retired if disable_auto_retire is
   * false unless the credits were previously put into the basket by the
   * address picking them from the basket, in which case they will remain
   * tradable.
   */
  disable_auto_retire?: boolean;
  /**
   * credit_type_abbrev is the abbreviation of the credit type this basket is
   * able to hold.
   */
  credit_type_abbrev?: string;
  /** allowed_classes are the credit classes allowed to be put in the basket */
  allowed_classes?: string[];
  /**
   * date_criteria is the date criteria for batches admitted to the basket.
   * At most, only one of the date criteria fields can be set.
   */
  date_criteria?: DateCriteriaAmino | undefined;
  /**
   * fee is the basket creation fee. A fee is not required if no fee exists
   * in the basket fee parameter. The fee must be greater than or equal to the
   * fee param. The curator will be charged the amount specified in the fee
   * parameter, even if a greater amount is provided.
   * 
   * Note (Since Revision 1): Although this field supports a list of fees, the
   * basket creator must provide no more than one fee (i.e. one Coin in a list
   * of Coins). Providing more than one fee will fail basic message validation.
   * This field will be updated to a single fee rather than a list of fees in
   * the next version to reflect these requirements.
   */
  fee?: CoinAmino[];
}
export interface MsgCreateAminoMsg {
  type: "/regen.ecocredit.basket.v1.MsgCreate";
  value: MsgCreateAmino;
}
/** MsgCreateBasket is the Msg/CreateBasket request type. */
export interface MsgCreateSDKType {
  curator: string;
  name: string;
  description: string;
  /** @deprecated */
  exponent: number;
  disable_auto_retire: boolean;
  credit_type_abbrev: string;
  allowed_classes: string[];
  date_criteria?: DateCriteriaSDKType | undefined;
  fee: CoinSDKType[];
}
/** MsgCreateBasketResponse is the Msg/CreateBasket response type. */
export interface MsgCreateResponse {
  /** basket_denom is the unique denomination ID of the newly created basket. */
  basketDenom: string;
}
export interface MsgCreateResponseProtoMsg {
  typeUrl: "/regen.ecocredit.basket.v1.MsgCreateResponse";
  value: Uint8Array;
}
/** MsgCreateBasketResponse is the Msg/CreateBasket response type. */
export interface MsgCreateResponseAmino {
  /** basket_denom is the unique denomination ID of the newly created basket. */
  basket_denom?: string;
}
export interface MsgCreateResponseAminoMsg {
  type: "/regen.ecocredit.basket.v1.MsgCreateResponse";
  value: MsgCreateResponseAmino;
}
/** MsgCreateBasketResponse is the Msg/CreateBasket response type. */
export interface MsgCreateResponseSDKType {
  basket_denom: string;
}
/** MsgAddToBasket is the Msg/AddToBasket request type. */
export interface MsgPut {
  /** owner is the owner of credits being put into the basket. */
  owner: string;
  /** basket_denom is the basket denom to add credits to. */
  basketDenom: string;
  /**
   * credits are credits to add to the basket. If they do not match the basket's
   * admission criteria, the operation will fail.
   */
  credits: BasketCredit[];
}
export interface MsgPutProtoMsg {
  typeUrl: "/regen.ecocredit.basket.v1.MsgPut";
  value: Uint8Array;
}
/** MsgAddToBasket is the Msg/AddToBasket request type. */
export interface MsgPutAmino {
  /** owner is the owner of credits being put into the basket. */
  owner?: string;
  /** basket_denom is the basket denom to add credits to. */
  basket_denom?: string;
  /**
   * credits are credits to add to the basket. If they do not match the basket's
   * admission criteria, the operation will fail.
   */
  credits?: BasketCreditAmino[];
}
export interface MsgPutAminoMsg {
  type: "/regen.ecocredit.basket.v1.MsgPut";
  value: MsgPutAmino;
}
/** MsgAddToBasket is the Msg/AddToBasket request type. */
export interface MsgPutSDKType {
  owner: string;
  basket_denom: string;
  credits: BasketCreditSDKType[];
}
/** MsgAddToBasketResponse is the Msg/AddToBasket response type. */
export interface MsgPutResponse {
  /** amount_received is the integer amount of basket tokens received. */
  amountReceived: string;
}
export interface MsgPutResponseProtoMsg {
  typeUrl: "/regen.ecocredit.basket.v1.MsgPutResponse";
  value: Uint8Array;
}
/** MsgAddToBasketResponse is the Msg/AddToBasket response type. */
export interface MsgPutResponseAmino {
  /** amount_received is the integer amount of basket tokens received. */
  amount_received?: string;
}
export interface MsgPutResponseAminoMsg {
  type: "/regen.ecocredit.basket.v1.MsgPutResponse";
  value: MsgPutResponseAmino;
}
/** MsgAddToBasketResponse is the Msg/AddToBasket response type. */
export interface MsgPutResponseSDKType {
  amount_received: string;
}
/** MsgTakeFromBasket is the Msg/TakeFromBasket request type. */
export interface MsgTake {
  /** owner is the owner of the basket tokens. */
  owner: string;
  /** basket_denom is the basket bank denom to take credits from. */
  basketDenom: string;
  /** amount is the integer number of basket tokens to convert into credits. */
  amount: string;
  /**
   * retirement_location is the optional retirement jurisdiction for the
   * credits which will be used only if retire_on_take is true.
   * 
   * Deprecated (Since Revision 1): This field will be removed in the next
   * version in favor of retirement_jurisdiction. Only one of these need to be
   * set and retirement_jurisdiction will be used if both are set.
   */
  /** @deprecated */
  retirementLocation: string;
  /**
   * retire_on_take is a boolean that dictates whether the ecocredits
   * received in exchange for the basket tokens will be received as
   * retired or tradable credits. If the basket has disable_auto_retire set to
   * false, retire_on_take MUST be set to true, and a retirement jurisdiction
   * must be provided.
   */
  retireOnTake: boolean;
  /**
   * retirement_jurisdiction is the optional retirement jurisdiction for the
   * credits which will be used only if retire_on_take is true.
   * 
   * Since Revision 1
   */
  retirementJurisdiction: string;
  /**
   * retirement_reason is any arbitrary string that specifies the reason for
   * retiring credits. The reason will be included in EventRetire and is not
   * stored in state.
   * 
   * Since Revision 2
   */
  retirementReason: string;
}
export interface MsgTakeProtoMsg {
  typeUrl: "/regen.ecocredit.basket.v1.MsgTake";
  value: Uint8Array;
}
/** MsgTakeFromBasket is the Msg/TakeFromBasket request type. */
export interface MsgTakeAmino {
  /** owner is the owner of the basket tokens. */
  owner?: string;
  /** basket_denom is the basket bank denom to take credits from. */
  basket_denom?: string;
  /** amount is the integer number of basket tokens to convert into credits. */
  amount?: string;
  /**
   * retirement_location is the optional retirement jurisdiction for the
   * credits which will be used only if retire_on_take is true.
   * 
   * Deprecated (Since Revision 1): This field will be removed in the next
   * version in favor of retirement_jurisdiction. Only one of these need to be
   * set and retirement_jurisdiction will be used if both are set.
   */
  /** @deprecated */
  retirement_location?: string;
  /**
   * retire_on_take is a boolean that dictates whether the ecocredits
   * received in exchange for the basket tokens will be received as
   * retired or tradable credits. If the basket has disable_auto_retire set to
   * false, retire_on_take MUST be set to true, and a retirement jurisdiction
   * must be provided.
   */
  retire_on_take?: boolean;
  /**
   * retirement_jurisdiction is the optional retirement jurisdiction for the
   * credits which will be used only if retire_on_take is true.
   * 
   * Since Revision 1
   */
  retirement_jurisdiction?: string;
  /**
   * retirement_reason is any arbitrary string that specifies the reason for
   * retiring credits. The reason will be included in EventRetire and is not
   * stored in state.
   * 
   * Since Revision 2
   */
  retirement_reason?: string;
}
export interface MsgTakeAminoMsg {
  type: "/regen.ecocredit.basket.v1.MsgTake";
  value: MsgTakeAmino;
}
/** MsgTakeFromBasket is the Msg/TakeFromBasket request type. */
export interface MsgTakeSDKType {
  owner: string;
  basket_denom: string;
  amount: string;
  /** @deprecated */
  retirement_location: string;
  retire_on_take: boolean;
  retirement_jurisdiction: string;
  retirement_reason: string;
}
/** MsgTakeFromBasketResponse is the Msg/TakeFromBasket response type. */
export interface MsgTakeResponse {
  /** credits are the credits taken out of the basket. */
  credits: BasketCredit[];
}
export interface MsgTakeResponseProtoMsg {
  typeUrl: "/regen.ecocredit.basket.v1.MsgTakeResponse";
  value: Uint8Array;
}
/** MsgTakeFromBasketResponse is the Msg/TakeFromBasket response type. */
export interface MsgTakeResponseAmino {
  /** credits are the credits taken out of the basket. */
  credits?: BasketCreditAmino[];
}
export interface MsgTakeResponseAminoMsg {
  type: "/regen.ecocredit.basket.v1.MsgTakeResponse";
  value: MsgTakeResponseAmino;
}
/** MsgTakeFromBasketResponse is the Msg/TakeFromBasket response type. */
export interface MsgTakeResponseSDKType {
  credits: BasketCreditSDKType[];
}
/**
 * MsgUpdateBasketFee is the Msg/UpdateBasketFee request type.
 * 
 * Since Revision 2
 */
export interface MsgUpdateBasketFee {
  /** authority is the address of the governance account. */
  authority: string;
  /**
   * fee is the basket creation fee. If not set, the basket creation fee will be
   * removed and no fee will be required to create a basket.
   */
  fee?: Coin | undefined;
}
export interface MsgUpdateBasketFeeProtoMsg {
  typeUrl: "/regen.ecocredit.basket.v1.MsgUpdateBasketFee";
  value: Uint8Array;
}
/**
 * MsgUpdateBasketFee is the Msg/UpdateBasketFee request type.
 * 
 * Since Revision 2
 */
export interface MsgUpdateBasketFeeAmino {
  /** authority is the address of the governance account. */
  authority?: string;
  /**
   * fee is the basket creation fee. If not set, the basket creation fee will be
   * removed and no fee will be required to create a basket.
   */
  fee?: CoinAmino | undefined;
}
export interface MsgUpdateBasketFeeAminoMsg {
  type: "/regen.ecocredit.basket.v1.MsgUpdateBasketFee";
  value: MsgUpdateBasketFeeAmino;
}
/**
 * MsgUpdateBasketFee is the Msg/UpdateBasketFee request type.
 * 
 * Since Revision 2
 */
export interface MsgUpdateBasketFeeSDKType {
  authority: string;
  fee?: CoinSDKType | undefined;
}
/**
 * MsgUpdateBasketFeeResponse is the Msg/UpdateBasketFee response type.
 * 
 * Since Revision 2
 */
export interface MsgUpdateBasketFeeResponse {}
export interface MsgUpdateBasketFeeResponseProtoMsg {
  typeUrl: "/regen.ecocredit.basket.v1.MsgUpdateBasketFeeResponse";
  value: Uint8Array;
}
/**
 * MsgUpdateBasketFeeResponse is the Msg/UpdateBasketFee response type.
 * 
 * Since Revision 2
 */
export interface MsgUpdateBasketFeeResponseAmino {}
export interface MsgUpdateBasketFeeResponseAminoMsg {
  type: "/regen.ecocredit.basket.v1.MsgUpdateBasketFeeResponse";
  value: MsgUpdateBasketFeeResponseAmino;
}
/**
 * MsgUpdateBasketFeeResponse is the Msg/UpdateBasketFee response type.
 * 
 * Since Revision 2
 */
export interface MsgUpdateBasketFeeResponseSDKType {}
/**
 * MsgUpdateCurator is the Msg/UpdateCurator request type.
 * 
 * Since Revision 2
 */
export interface MsgUpdateCurator {
  /** curator is the address of the basket curator. */
  curator: string;
  /** denom is the unique identifier of the basket. */
  denom: string;
  /**
   * new_curator is the address of the account that will become the
   * new curator of the basket.
   */
  newCurator: string;
}
export interface MsgUpdateCuratorProtoMsg {
  typeUrl: "/regen.ecocredit.basket.v1.MsgUpdateCurator";
  value: Uint8Array;
}
/**
 * MsgUpdateCurator is the Msg/UpdateCurator request type.
 * 
 * Since Revision 2
 */
export interface MsgUpdateCuratorAmino {
  /** curator is the address of the basket curator. */
  curator?: string;
  /** denom is the unique identifier of the basket. */
  denom?: string;
  /**
   * new_curator is the address of the account that will become the
   * new curator of the basket.
   */
  new_curator?: string;
}
export interface MsgUpdateCuratorAminoMsg {
  type: "/regen.ecocredit.basket.v1.MsgUpdateCurator";
  value: MsgUpdateCuratorAmino;
}
/**
 * MsgUpdateCurator is the Msg/UpdateCurator request type.
 * 
 * Since Revision 2
 */
export interface MsgUpdateCuratorSDKType {
  curator: string;
  denom: string;
  new_curator: string;
}
/**
 * MsgUpdateCuratorResponse is the Msg/UpdateCurator response type.
 * 
 * Since Revision 2
 */
export interface MsgUpdateCuratorResponse {}
export interface MsgUpdateCuratorResponseProtoMsg {
  typeUrl: "/regen.ecocredit.basket.v1.MsgUpdateCuratorResponse";
  value: Uint8Array;
}
/**
 * MsgUpdateCuratorResponse is the Msg/UpdateCurator response type.
 * 
 * Since Revision 2
 */
export interface MsgUpdateCuratorResponseAmino {}
export interface MsgUpdateCuratorResponseAminoMsg {
  type: "/regen.ecocredit.basket.v1.MsgUpdateCuratorResponse";
  value: MsgUpdateCuratorResponseAmino;
}
/**
 * MsgUpdateCuratorResponse is the Msg/UpdateCurator response type.
 * 
 * Since Revision 2
 */
export interface MsgUpdateCuratorResponseSDKType {}
/**
 * MsgUpdateDateCriteria is the Msg/UpdateDateCriteria request type.
 * 
 * Since Revision 3
 */
export interface MsgUpdateDateCriteria {
  /** authority is the address of the governance account. */
  authority: string;
  /** denom is the unique identifier of the basket. */
  denom: string;
  /**
   * new_date_criteria is the new date criteria for batches admitted to the
   * basket. At most, only one of the date criteria fields can be set.
   */
  newDateCriteria?: DateCriteria | undefined;
}
export interface MsgUpdateDateCriteriaProtoMsg {
  typeUrl: "/regen.ecocredit.basket.v1.MsgUpdateDateCriteria";
  value: Uint8Array;
}
/**
 * MsgUpdateDateCriteria is the Msg/UpdateDateCriteria request type.
 * 
 * Since Revision 3
 */
export interface MsgUpdateDateCriteriaAmino {
  /** authority is the address of the governance account. */
  authority?: string;
  /** denom is the unique identifier of the basket. */
  denom?: string;
  /**
   * new_date_criteria is the new date criteria for batches admitted to the
   * basket. At most, only one of the date criteria fields can be set.
   */
  new_date_criteria?: DateCriteriaAmino | undefined;
}
export interface MsgUpdateDateCriteriaAminoMsg {
  type: "/regen.ecocredit.basket.v1.MsgUpdateDateCriteria";
  value: MsgUpdateDateCriteriaAmino;
}
/**
 * MsgUpdateDateCriteria is the Msg/UpdateDateCriteria request type.
 * 
 * Since Revision 3
 */
export interface MsgUpdateDateCriteriaSDKType {
  authority: string;
  denom: string;
  new_date_criteria?: DateCriteriaSDKType | undefined;
}
/**
 * MsgUpdateDateCriteriaResponse is the Msg/UpdateDateCriteria response type.
 * 
 * Since Revision 3
 */
export interface MsgUpdateDateCriteriaResponse {}
export interface MsgUpdateDateCriteriaResponseProtoMsg {
  typeUrl: "/regen.ecocredit.basket.v1.MsgUpdateDateCriteriaResponse";
  value: Uint8Array;
}
/**
 * MsgUpdateDateCriteriaResponse is the Msg/UpdateDateCriteria response type.
 * 
 * Since Revision 3
 */
export interface MsgUpdateDateCriteriaResponseAmino {}
export interface MsgUpdateDateCriteriaResponseAminoMsg {
  type: "/regen.ecocredit.basket.v1.MsgUpdateDateCriteriaResponse";
  value: MsgUpdateDateCriteriaResponseAmino;
}
/**
 * MsgUpdateDateCriteriaResponse is the Msg/UpdateDateCriteria response type.
 * 
 * Since Revision 3
 */
export interface MsgUpdateDateCriteriaResponseSDKType {}
function createBaseMsgCreate(): MsgCreate {
  return {
    curator: "",
    name: "",
    description: "",
    exponent: 0,
    disableAutoRetire: false,
    creditTypeAbbrev: "",
    allowedClasses: [],
    dateCriteria: undefined,
    fee: []
  };
}
export const MsgCreate = {
  typeUrl: "/regen.ecocredit.basket.v1.MsgCreate",
  encode(message: MsgCreate, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.curator !== "") {
      writer.uint32(10).string(message.curator);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.exponent !== 0) {
      writer.uint32(32).uint32(message.exponent);
    }
    if (message.disableAutoRetire === true) {
      writer.uint32(40).bool(message.disableAutoRetire);
    }
    if (message.creditTypeAbbrev !== "") {
      writer.uint32(50).string(message.creditTypeAbbrev);
    }
    for (const v of message.allowedClasses) {
      writer.uint32(58).string(v!);
    }
    if (message.dateCriteria !== undefined) {
      DateCriteria.encode(message.dateCriteria, writer.uint32(66).fork()).ldelim();
    }
    for (const v of message.fee) {
      Coin.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgCreate {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.curator = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.description = reader.string();
          break;
        case 4:
          message.exponent = reader.uint32();
          break;
        case 5:
          message.disableAutoRetire = reader.bool();
          break;
        case 6:
          message.creditTypeAbbrev = reader.string();
          break;
        case 7:
          message.allowedClasses.push(reader.string());
          break;
        case 8:
          message.dateCriteria = DateCriteria.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 9:
          message.fee.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgCreate>): MsgCreate {
    const message = createBaseMsgCreate();
    message.curator = object.curator ?? "";
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.exponent = object.exponent ?? 0;
    message.disableAutoRetire = object.disableAutoRetire ?? false;
    message.creditTypeAbbrev = object.creditTypeAbbrev ?? "";
    message.allowedClasses = object.allowedClasses?.map(e => e) || [];
    message.dateCriteria = object.dateCriteria !== undefined && object.dateCriteria !== null ? DateCriteria.fromPartial(object.dateCriteria) : undefined;
    message.fee = object.fee?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: MsgCreateAmino): MsgCreate {
    const message = createBaseMsgCreate();
    if (object.curator !== undefined && object.curator !== null) {
      message.curator = object.curator;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    }
    if (object.exponent !== undefined && object.exponent !== null) {
      message.exponent = object.exponent;
    }
    if (object.disable_auto_retire !== undefined && object.disable_auto_retire !== null) {
      message.disableAutoRetire = object.disable_auto_retire;
    }
    if (object.credit_type_abbrev !== undefined && object.credit_type_abbrev !== null) {
      message.creditTypeAbbrev = object.credit_type_abbrev;
    }
    message.allowedClasses = object.allowed_classes?.map(e => e) || [];
    if (object.date_criteria !== undefined && object.date_criteria !== null) {
      message.dateCriteria = DateCriteria.fromAmino(object.date_criteria);
    }
    message.fee = object.fee?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: MsgCreate, useInterfaces: boolean = false): MsgCreateAmino {
    const obj: any = {};
    obj.curator = message.curator;
    obj.name = message.name;
    obj.description = message.description;
    obj.exponent = message.exponent;
    obj.disable_auto_retire = message.disableAutoRetire;
    obj.credit_type_abbrev = message.creditTypeAbbrev;
    if (message.allowedClasses) {
      obj.allowed_classes = message.allowedClasses.map(e => e);
    } else {
      obj.allowed_classes = [];
    }
    obj.date_criteria = message.dateCriteria ? DateCriteria.toAmino(message.dateCriteria, useInterfaces) : undefined;
    if (message.fee) {
      obj.fee = message.fee.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.fee = [];
    }
    return obj;
  },
  fromAminoMsg(object: MsgCreateAminoMsg): MsgCreate {
    return MsgCreate.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgCreateProtoMsg, useInterfaces: boolean = false): MsgCreate {
    return MsgCreate.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgCreate): Uint8Array {
    return MsgCreate.encode(message).finish();
  },
  toProtoMsg(message: MsgCreate): MsgCreateProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.basket.v1.MsgCreate",
      value: MsgCreate.encode(message).finish()
    };
  }
};
function createBaseMsgCreateResponse(): MsgCreateResponse {
  return {
    basketDenom: ""
  };
}
export const MsgCreateResponse = {
  typeUrl: "/regen.ecocredit.basket.v1.MsgCreateResponse",
  encode(message: MsgCreateResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.basketDenom !== "") {
      writer.uint32(10).string(message.basketDenom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgCreateResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.basketDenom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgCreateResponse>): MsgCreateResponse {
    const message = createBaseMsgCreateResponse();
    message.basketDenom = object.basketDenom ?? "";
    return message;
  },
  fromAmino(object: MsgCreateResponseAmino): MsgCreateResponse {
    const message = createBaseMsgCreateResponse();
    if (object.basket_denom !== undefined && object.basket_denom !== null) {
      message.basketDenom = object.basket_denom;
    }
    return message;
  },
  toAmino(message: MsgCreateResponse, useInterfaces: boolean = false): MsgCreateResponseAmino {
    const obj: any = {};
    obj.basket_denom = message.basketDenom;
    return obj;
  },
  fromAminoMsg(object: MsgCreateResponseAminoMsg): MsgCreateResponse {
    return MsgCreateResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgCreateResponseProtoMsg, useInterfaces: boolean = false): MsgCreateResponse {
    return MsgCreateResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgCreateResponse): Uint8Array {
    return MsgCreateResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgCreateResponse): MsgCreateResponseProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.basket.v1.MsgCreateResponse",
      value: MsgCreateResponse.encode(message).finish()
    };
  }
};
function createBaseMsgPut(): MsgPut {
  return {
    owner: "",
    basketDenom: "",
    credits: []
  };
}
export const MsgPut = {
  typeUrl: "/regen.ecocredit.basket.v1.MsgPut",
  encode(message: MsgPut, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.basketDenom !== "") {
      writer.uint32(18).string(message.basketDenom);
    }
    for (const v of message.credits) {
      BasketCredit.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgPut {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgPut();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        case 2:
          message.basketDenom = reader.string();
          break;
        case 3:
          message.credits.push(BasketCredit.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgPut>): MsgPut {
    const message = createBaseMsgPut();
    message.owner = object.owner ?? "";
    message.basketDenom = object.basketDenom ?? "";
    message.credits = object.credits?.map(e => BasketCredit.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: MsgPutAmino): MsgPut {
    const message = createBaseMsgPut();
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner;
    }
    if (object.basket_denom !== undefined && object.basket_denom !== null) {
      message.basketDenom = object.basket_denom;
    }
    message.credits = object.credits?.map(e => BasketCredit.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: MsgPut, useInterfaces: boolean = false): MsgPutAmino {
    const obj: any = {};
    obj.owner = message.owner;
    obj.basket_denom = message.basketDenom;
    if (message.credits) {
      obj.credits = message.credits.map(e => e ? BasketCredit.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.credits = [];
    }
    return obj;
  },
  fromAminoMsg(object: MsgPutAminoMsg): MsgPut {
    return MsgPut.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgPutProtoMsg, useInterfaces: boolean = false): MsgPut {
    return MsgPut.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgPut): Uint8Array {
    return MsgPut.encode(message).finish();
  },
  toProtoMsg(message: MsgPut): MsgPutProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.basket.v1.MsgPut",
      value: MsgPut.encode(message).finish()
    };
  }
};
function createBaseMsgPutResponse(): MsgPutResponse {
  return {
    amountReceived: ""
  };
}
export const MsgPutResponse = {
  typeUrl: "/regen.ecocredit.basket.v1.MsgPutResponse",
  encode(message: MsgPutResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.amountReceived !== "") {
      writer.uint32(10).string(message.amountReceived);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgPutResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgPutResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.amountReceived = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgPutResponse>): MsgPutResponse {
    const message = createBaseMsgPutResponse();
    message.amountReceived = object.amountReceived ?? "";
    return message;
  },
  fromAmino(object: MsgPutResponseAmino): MsgPutResponse {
    const message = createBaseMsgPutResponse();
    if (object.amount_received !== undefined && object.amount_received !== null) {
      message.amountReceived = object.amount_received;
    }
    return message;
  },
  toAmino(message: MsgPutResponse, useInterfaces: boolean = false): MsgPutResponseAmino {
    const obj: any = {};
    obj.amount_received = message.amountReceived;
    return obj;
  },
  fromAminoMsg(object: MsgPutResponseAminoMsg): MsgPutResponse {
    return MsgPutResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgPutResponseProtoMsg, useInterfaces: boolean = false): MsgPutResponse {
    return MsgPutResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgPutResponse): Uint8Array {
    return MsgPutResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgPutResponse): MsgPutResponseProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.basket.v1.MsgPutResponse",
      value: MsgPutResponse.encode(message).finish()
    };
  }
};
function createBaseMsgTake(): MsgTake {
  return {
    owner: "",
    basketDenom: "",
    amount: "",
    retirementLocation: "",
    retireOnTake: false,
    retirementJurisdiction: "",
    retirementReason: ""
  };
}
export const MsgTake = {
  typeUrl: "/regen.ecocredit.basket.v1.MsgTake",
  encode(message: MsgTake, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.basketDenom !== "") {
      writer.uint32(18).string(message.basketDenom);
    }
    if (message.amount !== "") {
      writer.uint32(26).string(message.amount);
    }
    if (message.retirementLocation !== "") {
      writer.uint32(34).string(message.retirementLocation);
    }
    if (message.retireOnTake === true) {
      writer.uint32(40).bool(message.retireOnTake);
    }
    if (message.retirementJurisdiction !== "") {
      writer.uint32(50).string(message.retirementJurisdiction);
    }
    if (message.retirementReason !== "") {
      writer.uint32(58).string(message.retirementReason);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgTake {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTake();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        case 2:
          message.basketDenom = reader.string();
          break;
        case 3:
          message.amount = reader.string();
          break;
        case 4:
          message.retirementLocation = reader.string();
          break;
        case 5:
          message.retireOnTake = reader.bool();
          break;
        case 6:
          message.retirementJurisdiction = reader.string();
          break;
        case 7:
          message.retirementReason = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgTake>): MsgTake {
    const message = createBaseMsgTake();
    message.owner = object.owner ?? "";
    message.basketDenom = object.basketDenom ?? "";
    message.amount = object.amount ?? "";
    message.retirementLocation = object.retirementLocation ?? "";
    message.retireOnTake = object.retireOnTake ?? false;
    message.retirementJurisdiction = object.retirementJurisdiction ?? "";
    message.retirementReason = object.retirementReason ?? "";
    return message;
  },
  fromAmino(object: MsgTakeAmino): MsgTake {
    const message = createBaseMsgTake();
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner;
    }
    if (object.basket_denom !== undefined && object.basket_denom !== null) {
      message.basketDenom = object.basket_denom;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    }
    if (object.retirement_location !== undefined && object.retirement_location !== null) {
      message.retirementLocation = object.retirement_location;
    }
    if (object.retire_on_take !== undefined && object.retire_on_take !== null) {
      message.retireOnTake = object.retire_on_take;
    }
    if (object.retirement_jurisdiction !== undefined && object.retirement_jurisdiction !== null) {
      message.retirementJurisdiction = object.retirement_jurisdiction;
    }
    if (object.retirement_reason !== undefined && object.retirement_reason !== null) {
      message.retirementReason = object.retirement_reason;
    }
    return message;
  },
  toAmino(message: MsgTake, useInterfaces: boolean = false): MsgTakeAmino {
    const obj: any = {};
    obj.owner = message.owner;
    obj.basket_denom = message.basketDenom;
    obj.amount = message.amount;
    obj.retirement_location = message.retirementLocation;
    obj.retire_on_take = message.retireOnTake;
    obj.retirement_jurisdiction = message.retirementJurisdiction;
    obj.retirement_reason = message.retirementReason;
    return obj;
  },
  fromAminoMsg(object: MsgTakeAminoMsg): MsgTake {
    return MsgTake.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgTakeProtoMsg, useInterfaces: boolean = false): MsgTake {
    return MsgTake.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgTake): Uint8Array {
    return MsgTake.encode(message).finish();
  },
  toProtoMsg(message: MsgTake): MsgTakeProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.basket.v1.MsgTake",
      value: MsgTake.encode(message).finish()
    };
  }
};
function createBaseMsgTakeResponse(): MsgTakeResponse {
  return {
    credits: []
  };
}
export const MsgTakeResponse = {
  typeUrl: "/regen.ecocredit.basket.v1.MsgTakeResponse",
  encode(message: MsgTakeResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.credits) {
      BasketCredit.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgTakeResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTakeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.credits.push(BasketCredit.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgTakeResponse>): MsgTakeResponse {
    const message = createBaseMsgTakeResponse();
    message.credits = object.credits?.map(e => BasketCredit.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: MsgTakeResponseAmino): MsgTakeResponse {
    const message = createBaseMsgTakeResponse();
    message.credits = object.credits?.map(e => BasketCredit.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: MsgTakeResponse, useInterfaces: boolean = false): MsgTakeResponseAmino {
    const obj: any = {};
    if (message.credits) {
      obj.credits = message.credits.map(e => e ? BasketCredit.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.credits = [];
    }
    return obj;
  },
  fromAminoMsg(object: MsgTakeResponseAminoMsg): MsgTakeResponse {
    return MsgTakeResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgTakeResponseProtoMsg, useInterfaces: boolean = false): MsgTakeResponse {
    return MsgTakeResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgTakeResponse): Uint8Array {
    return MsgTakeResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgTakeResponse): MsgTakeResponseProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.basket.v1.MsgTakeResponse",
      value: MsgTakeResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateBasketFee(): MsgUpdateBasketFee {
  return {
    authority: "",
    fee: undefined
  };
}
export const MsgUpdateBasketFee = {
  typeUrl: "/regen.ecocredit.basket.v1.MsgUpdateBasketFee",
  encode(message: MsgUpdateBasketFee, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.fee !== undefined) {
      Coin.encode(message.fee, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateBasketFee {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateBasketFee();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.fee = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUpdateBasketFee>): MsgUpdateBasketFee {
    const message = createBaseMsgUpdateBasketFee();
    message.authority = object.authority ?? "";
    message.fee = object.fee !== undefined && object.fee !== null ? Coin.fromPartial(object.fee) : undefined;
    return message;
  },
  fromAmino(object: MsgUpdateBasketFeeAmino): MsgUpdateBasketFee {
    const message = createBaseMsgUpdateBasketFee();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.fee !== undefined && object.fee !== null) {
      message.fee = Coin.fromAmino(object.fee);
    }
    return message;
  },
  toAmino(message: MsgUpdateBasketFee, useInterfaces: boolean = false): MsgUpdateBasketFeeAmino {
    const obj: any = {};
    obj.authority = message.authority;
    obj.fee = message.fee ? Coin.toAmino(message.fee, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgUpdateBasketFeeAminoMsg): MsgUpdateBasketFee {
    return MsgUpdateBasketFee.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateBasketFeeProtoMsg, useInterfaces: boolean = false): MsgUpdateBasketFee {
    return MsgUpdateBasketFee.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateBasketFee): Uint8Array {
    return MsgUpdateBasketFee.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateBasketFee): MsgUpdateBasketFeeProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.basket.v1.MsgUpdateBasketFee",
      value: MsgUpdateBasketFee.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateBasketFeeResponse(): MsgUpdateBasketFeeResponse {
  return {};
}
export const MsgUpdateBasketFeeResponse = {
  typeUrl: "/regen.ecocredit.basket.v1.MsgUpdateBasketFeeResponse",
  encode(_: MsgUpdateBasketFeeResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateBasketFeeResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateBasketFeeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgUpdateBasketFeeResponse>): MsgUpdateBasketFeeResponse {
    const message = createBaseMsgUpdateBasketFeeResponse();
    return message;
  },
  fromAmino(_: MsgUpdateBasketFeeResponseAmino): MsgUpdateBasketFeeResponse {
    const message = createBaseMsgUpdateBasketFeeResponse();
    return message;
  },
  toAmino(_: MsgUpdateBasketFeeResponse, useInterfaces: boolean = false): MsgUpdateBasketFeeResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateBasketFeeResponseAminoMsg): MsgUpdateBasketFeeResponse {
    return MsgUpdateBasketFeeResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateBasketFeeResponseProtoMsg, useInterfaces: boolean = false): MsgUpdateBasketFeeResponse {
    return MsgUpdateBasketFeeResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateBasketFeeResponse): Uint8Array {
    return MsgUpdateBasketFeeResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateBasketFeeResponse): MsgUpdateBasketFeeResponseProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.basket.v1.MsgUpdateBasketFeeResponse",
      value: MsgUpdateBasketFeeResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateCurator(): MsgUpdateCurator {
  return {
    curator: "",
    denom: "",
    newCurator: ""
  };
}
export const MsgUpdateCurator = {
  typeUrl: "/regen.ecocredit.basket.v1.MsgUpdateCurator",
  encode(message: MsgUpdateCurator, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.curator !== "") {
      writer.uint32(10).string(message.curator);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    if (message.newCurator !== "") {
      writer.uint32(26).string(message.newCurator);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateCurator {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateCurator();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.curator = reader.string();
          break;
        case 2:
          message.denom = reader.string();
          break;
        case 3:
          message.newCurator = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUpdateCurator>): MsgUpdateCurator {
    const message = createBaseMsgUpdateCurator();
    message.curator = object.curator ?? "";
    message.denom = object.denom ?? "";
    message.newCurator = object.newCurator ?? "";
    return message;
  },
  fromAmino(object: MsgUpdateCuratorAmino): MsgUpdateCurator {
    const message = createBaseMsgUpdateCurator();
    if (object.curator !== undefined && object.curator !== null) {
      message.curator = object.curator;
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.new_curator !== undefined && object.new_curator !== null) {
      message.newCurator = object.new_curator;
    }
    return message;
  },
  toAmino(message: MsgUpdateCurator, useInterfaces: boolean = false): MsgUpdateCuratorAmino {
    const obj: any = {};
    obj.curator = message.curator;
    obj.denom = message.denom;
    obj.new_curator = message.newCurator;
    return obj;
  },
  fromAminoMsg(object: MsgUpdateCuratorAminoMsg): MsgUpdateCurator {
    return MsgUpdateCurator.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateCuratorProtoMsg, useInterfaces: boolean = false): MsgUpdateCurator {
    return MsgUpdateCurator.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateCurator): Uint8Array {
    return MsgUpdateCurator.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateCurator): MsgUpdateCuratorProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.basket.v1.MsgUpdateCurator",
      value: MsgUpdateCurator.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateCuratorResponse(): MsgUpdateCuratorResponse {
  return {};
}
export const MsgUpdateCuratorResponse = {
  typeUrl: "/regen.ecocredit.basket.v1.MsgUpdateCuratorResponse",
  encode(_: MsgUpdateCuratorResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateCuratorResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateCuratorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgUpdateCuratorResponse>): MsgUpdateCuratorResponse {
    const message = createBaseMsgUpdateCuratorResponse();
    return message;
  },
  fromAmino(_: MsgUpdateCuratorResponseAmino): MsgUpdateCuratorResponse {
    const message = createBaseMsgUpdateCuratorResponse();
    return message;
  },
  toAmino(_: MsgUpdateCuratorResponse, useInterfaces: boolean = false): MsgUpdateCuratorResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateCuratorResponseAminoMsg): MsgUpdateCuratorResponse {
    return MsgUpdateCuratorResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateCuratorResponseProtoMsg, useInterfaces: boolean = false): MsgUpdateCuratorResponse {
    return MsgUpdateCuratorResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateCuratorResponse): Uint8Array {
    return MsgUpdateCuratorResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateCuratorResponse): MsgUpdateCuratorResponseProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.basket.v1.MsgUpdateCuratorResponse",
      value: MsgUpdateCuratorResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateDateCriteria(): MsgUpdateDateCriteria {
  return {
    authority: "",
    denom: "",
    newDateCriteria: undefined
  };
}
export const MsgUpdateDateCriteria = {
  typeUrl: "/regen.ecocredit.basket.v1.MsgUpdateDateCriteria",
  encode(message: MsgUpdateDateCriteria, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    if (message.newDateCriteria !== undefined) {
      DateCriteria.encode(message.newDateCriteria, writer.uint32(66).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateDateCriteria {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateDateCriteria();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.denom = reader.string();
          break;
        case 8:
          message.newDateCriteria = DateCriteria.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUpdateDateCriteria>): MsgUpdateDateCriteria {
    const message = createBaseMsgUpdateDateCriteria();
    message.authority = object.authority ?? "";
    message.denom = object.denom ?? "";
    message.newDateCriteria = object.newDateCriteria !== undefined && object.newDateCriteria !== null ? DateCriteria.fromPartial(object.newDateCriteria) : undefined;
    return message;
  },
  fromAmino(object: MsgUpdateDateCriteriaAmino): MsgUpdateDateCriteria {
    const message = createBaseMsgUpdateDateCriteria();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.new_date_criteria !== undefined && object.new_date_criteria !== null) {
      message.newDateCriteria = DateCriteria.fromAmino(object.new_date_criteria);
    }
    return message;
  },
  toAmino(message: MsgUpdateDateCriteria, useInterfaces: boolean = false): MsgUpdateDateCriteriaAmino {
    const obj: any = {};
    obj.authority = message.authority;
    obj.denom = message.denom;
    obj.new_date_criteria = message.newDateCriteria ? DateCriteria.toAmino(message.newDateCriteria, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgUpdateDateCriteriaAminoMsg): MsgUpdateDateCriteria {
    return MsgUpdateDateCriteria.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateDateCriteriaProtoMsg, useInterfaces: boolean = false): MsgUpdateDateCriteria {
    return MsgUpdateDateCriteria.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateDateCriteria): Uint8Array {
    return MsgUpdateDateCriteria.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateDateCriteria): MsgUpdateDateCriteriaProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.basket.v1.MsgUpdateDateCriteria",
      value: MsgUpdateDateCriteria.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateDateCriteriaResponse(): MsgUpdateDateCriteriaResponse {
  return {};
}
export const MsgUpdateDateCriteriaResponse = {
  typeUrl: "/regen.ecocredit.basket.v1.MsgUpdateDateCriteriaResponse",
  encode(_: MsgUpdateDateCriteriaResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateDateCriteriaResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateDateCriteriaResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgUpdateDateCriteriaResponse>): MsgUpdateDateCriteriaResponse {
    const message = createBaseMsgUpdateDateCriteriaResponse();
    return message;
  },
  fromAmino(_: MsgUpdateDateCriteriaResponseAmino): MsgUpdateDateCriteriaResponse {
    const message = createBaseMsgUpdateDateCriteriaResponse();
    return message;
  },
  toAmino(_: MsgUpdateDateCriteriaResponse, useInterfaces: boolean = false): MsgUpdateDateCriteriaResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateDateCriteriaResponseAminoMsg): MsgUpdateDateCriteriaResponse {
    return MsgUpdateDateCriteriaResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateDateCriteriaResponseProtoMsg, useInterfaces: boolean = false): MsgUpdateDateCriteriaResponse {
    return MsgUpdateDateCriteriaResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateDateCriteriaResponse): Uint8Array {
    return MsgUpdateDateCriteriaResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateDateCriteriaResponse): MsgUpdateDateCriteriaResponseProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.basket.v1.MsgUpdateDateCriteriaResponse",
      value: MsgUpdateDateCriteriaResponse.encode(message).finish()
    };
  }
};