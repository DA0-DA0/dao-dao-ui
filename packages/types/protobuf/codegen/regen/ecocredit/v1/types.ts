import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { CreditType, CreditTypeAmino, CreditTypeSDKType } from "./state";
import { BinaryReader, BinaryWriter } from "../../../binary";
/**
 * Params defines the updatable global parameters of the ecocredit module for
 * use with the x/params module.
 */
export interface Params {
  /**
   * credit_class_fee is a list of credit class creation fees accepted when
   * creating a credit class. Any fee listed is accepted and charged to the
   * credit class creator when creating a credit class.
   */
  creditClassFee: Coin[];
  /**
   * basket_fee is a list of basket creation fees accepted when creating a
   * basket. Any fee listed is accepted and charged to the basket creator when
   * creating a basket.
   */
  basketFee: Coin[];
  /**
   * allowed_class_creators is an allowlist defining the addresses with the
   * required permissions to create credit classes when allowlist_enabled is set
   * to true. If allowlist_enabled is set to false, this list has no effect.
   */
  allowedClassCreators: string[];
  /**
   * allowlist_enabled determines whether or not the allowlist for creating
   * credit classes is enabled. When set to true, only the addresses listed in
   * allowed_class_creators can create credit classes. When set to false, any
   * address can create credit classes.
   */
  allowlistEnabled: boolean;
  /**
   * allowed_denoms is a list of bank denoms allowed to be used in the ask price
   * of sell orders.
   * 
   * Since Revision 2
   */
  allowedDenoms: AllowedDenom[];
  /**
   * AllowedBridgeChains is a list of chain names that are allowed to be used in
   * bridge operations.
   * 
   * Since Revision 2
   */
  allowedBridgeChains: string[];
}
export interface ParamsProtoMsg {
  typeUrl: "/regen.ecocredit.v1.Params";
  value: Uint8Array;
}
/**
 * Params defines the updatable global parameters of the ecocredit module for
 * use with the x/params module.
 */
export interface ParamsAmino {
  /**
   * credit_class_fee is a list of credit class creation fees accepted when
   * creating a credit class. Any fee listed is accepted and charged to the
   * credit class creator when creating a credit class.
   */
  credit_class_fee?: CoinAmino[];
  /**
   * basket_fee is a list of basket creation fees accepted when creating a
   * basket. Any fee listed is accepted and charged to the basket creator when
   * creating a basket.
   */
  basket_fee?: CoinAmino[];
  /**
   * allowed_class_creators is an allowlist defining the addresses with the
   * required permissions to create credit classes when allowlist_enabled is set
   * to true. If allowlist_enabled is set to false, this list has no effect.
   */
  allowed_class_creators?: string[];
  /**
   * allowlist_enabled determines whether or not the allowlist for creating
   * credit classes is enabled. When set to true, only the addresses listed in
   * allowed_class_creators can create credit classes. When set to false, any
   * address can create credit classes.
   */
  allowlist_enabled?: boolean;
  /**
   * allowed_denoms is a list of bank denoms allowed to be used in the ask price
   * of sell orders.
   * 
   * Since Revision 2
   */
  allowed_denoms?: AllowedDenomAmino[];
  /**
   * AllowedBridgeChains is a list of chain names that are allowed to be used in
   * bridge operations.
   * 
   * Since Revision 2
   */
  allowed_bridge_chains?: string[];
}
export interface ParamsAminoMsg {
  type: "/regen.ecocredit.v1.Params";
  value: ParamsAmino;
}
/**
 * Params defines the updatable global parameters of the ecocredit module for
 * use with the x/params module.
 */
export interface ParamsSDKType {
  credit_class_fee: CoinSDKType[];
  basket_fee: CoinSDKType[];
  allowed_class_creators: string[];
  allowlist_enabled: boolean;
  allowed_denoms: AllowedDenomSDKType[];
  allowed_bridge_chains: string[];
}
/** Credits represents a simple structure for credits. */
export interface Credits {
  /** batch_denom is the denom of the credit batch. */
  batchDenom: string;
  /** amount is the amount of credits. */
  amount: string;
}
export interface CreditsProtoMsg {
  typeUrl: "/regen.ecocredit.v1.Credits";
  value: Uint8Array;
}
/** Credits represents a simple structure for credits. */
export interface CreditsAmino {
  /** batch_denom is the denom of the credit batch. */
  batch_denom?: string;
  /** amount is the amount of credits. */
  amount?: string;
}
export interface CreditsAminoMsg {
  type: "/regen.ecocredit.v1.Credits";
  value: CreditsAmino;
}
/** Credits represents a simple structure for credits. */
export interface CreditsSDKType {
  batch_denom: string;
  amount: string;
}
/** BatchIssuance represents a simple structure for a credit batch issuance. */
export interface BatchIssuance {
  /** recipient is the address of the account receiving the issued credits. */
  recipient: string;
  /**
   * tradable_amount is the amount of credits that the recipient will receive in
   * a tradable state. The number of decimal places must be less than or equal
   * to the credit type precision.
   */
  tradableAmount: string;
  /**
   * retired_amount is the amount of credits that the recipient will receive in
   * a retired state. The number of decimal places must be less than or equal to
   * the credit type precision.
   */
  retiredAmount: string;
  /**
   * retirement_jurisdiction is the jurisdiction of the recipient and is only
   * required if retired_amount is positive. A jurisdiction has the following
   * format: <country-code>[-<sub-national-code>[ <postal-code>]]
   * The country-code must be 2 alphabetic characters, the sub-national-code
   * can be 1-3 alphanumeric characters, and the postal-code can be up to 64
   * alphanumeric characters. Only the country-code is required, while the
   * sub-national-code and postal-code are optional and can be added for
   * increased precision.
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
export interface BatchIssuanceProtoMsg {
  typeUrl: "/regen.ecocredit.v1.BatchIssuance";
  value: Uint8Array;
}
/** BatchIssuance represents a simple structure for a credit batch issuance. */
export interface BatchIssuanceAmino {
  /** recipient is the address of the account receiving the issued credits. */
  recipient?: string;
  /**
   * tradable_amount is the amount of credits that the recipient will receive in
   * a tradable state. The number of decimal places must be less than or equal
   * to the credit type precision.
   */
  tradable_amount?: string;
  /**
   * retired_amount is the amount of credits that the recipient will receive in
   * a retired state. The number of decimal places must be less than or equal to
   * the credit type precision.
   */
  retired_amount?: string;
  /**
   * retirement_jurisdiction is the jurisdiction of the recipient and is only
   * required if retired_amount is positive. A jurisdiction has the following
   * format: <country-code>[-<sub-national-code>[ <postal-code>]]
   * The country-code must be 2 alphabetic characters, the sub-national-code
   * can be 1-3 alphanumeric characters, and the postal-code can be up to 64
   * alphanumeric characters. Only the country-code is required, while the
   * sub-national-code and postal-code are optional and can be added for
   * increased precision.
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
export interface BatchIssuanceAminoMsg {
  type: "/regen.ecocredit.v1.BatchIssuance";
  value: BatchIssuanceAmino;
}
/** BatchIssuance represents a simple structure for a credit batch issuance. */
export interface BatchIssuanceSDKType {
  recipient: string;
  tradable_amount: string;
  retired_amount: string;
  retirement_jurisdiction: string;
  retirement_reason: string;
}
/**
 * OriginTx is the transaction from another chain or registry that triggered
 * the minting of credits.
 */
export interface OriginTx {
  /**
   * id is the transaction ID of an originating transaction or operation based
   * on a type (i.e. transaction ID, serial number).
   */
  id: string;
  /**
   * source is the source chain or registry of the transaction originating the
   * mint process (e.g. polygon, ethereum, verra).
   */
  source: string;
  /**
   * contract is the address of the contract on the source chain that was
   * executed when creating the transaction. This address will be stored in
   * state separately from the origin tx and on a per credit batch basis to be
   * used when sending credits back to the source chain. This field can be left
   * blank if credits are bridged from a non-contract-based source.
   */
  contract: string;
  /**
   * note is a reference note for accounting that will be included in an event
   * emitted from either Msg/CreateBatch or Msg/MintBatchCredits.
   */
  note: string;
}
export interface OriginTxProtoMsg {
  typeUrl: "/regen.ecocredit.v1.OriginTx";
  value: Uint8Array;
}
/**
 * OriginTx is the transaction from another chain or registry that triggered
 * the minting of credits.
 */
export interface OriginTxAmino {
  /**
   * id is the transaction ID of an originating transaction or operation based
   * on a type (i.e. transaction ID, serial number).
   */
  id?: string;
  /**
   * source is the source chain or registry of the transaction originating the
   * mint process (e.g. polygon, ethereum, verra).
   */
  source?: string;
  /**
   * contract is the address of the contract on the source chain that was
   * executed when creating the transaction. This address will be stored in
   * state separately from the origin tx and on a per credit batch basis to be
   * used when sending credits back to the source chain. This field can be left
   * blank if credits are bridged from a non-contract-based source.
   */
  contract?: string;
  /**
   * note is a reference note for accounting that will be included in an event
   * emitted from either Msg/CreateBatch or Msg/MintBatchCredits.
   */
  note?: string;
}
export interface OriginTxAminoMsg {
  type: "/regen.ecocredit.v1.OriginTx";
  value: OriginTxAmino;
}
/**
 * OriginTx is the transaction from another chain or registry that triggered
 * the minting of credits.
 */
export interface OriginTxSDKType {
  id: string;
  source: string;
  contract: string;
  note: string;
}
/**
 * CreditTypeProposal is a gov Content type for adding a credit type.
 * Deprecated (Since Revision 2): This message is no longer used and will be
 * removed in the next version. See MsgAddCreditType.
 */
export interface CreditTypeProposal {
  $typeUrl?: "/regen.ecocredit.v1.CreditTypeProposal";
  /** title is the title of the proposal. */
  title: string;
  /** description is the description of the proposal. */
  description: string;
  /**
   * credit_type is the credit type to be added to the network if the proposal
   * passes.
   */
  creditType?: CreditType | undefined;
}
export interface CreditTypeProposalProtoMsg {
  typeUrl: "/regen.ecocredit.v1.CreditTypeProposal";
  value: Uint8Array;
}
/**
 * CreditTypeProposal is a gov Content type for adding a credit type.
 * Deprecated (Since Revision 2): This message is no longer used and will be
 * removed in the next version. See MsgAddCreditType.
 */
export interface CreditTypeProposalAmino {
  /** title is the title of the proposal. */
  title?: string;
  /** description is the description of the proposal. */
  description?: string;
  /**
   * credit_type is the credit type to be added to the network if the proposal
   * passes.
   */
  credit_type?: CreditTypeAmino | undefined;
}
export interface CreditTypeProposalAminoMsg {
  type: "/regen.ecocredit.v1.CreditTypeProposal";
  value: CreditTypeProposalAmino;
}
/**
 * CreditTypeProposal is a gov Content type for adding a credit type.
 * Deprecated (Since Revision 2): This message is no longer used and will be
 * removed in the next version. See MsgAddCreditType.
 */
export interface CreditTypeProposalSDKType {
  $typeUrl?: "/regen.ecocredit.v1.CreditTypeProposal";
  title: string;
  description: string;
  credit_type?: CreditTypeSDKType | undefined;
}
/**
 * AllowedDenom represents the information for an allowed ask denom.
 * 
 * Since Revision 2
 * 
 * Deprecated(Since Revision 2): This type was added to support historical
 * queries for params but will also be removed in the next version.
 */
export interface AllowedDenom {
  /** denom is the bank denom to allow (ex. ibc/GLKHDSG423SGS) */
  bankDenom: string;
  /**
   * display_denom is the denom to display to the user and is informational.
   * Because the denom is likely an IBC denom, this should be chosen by
   * governance to represent the consensus trusted name of the denom.
   */
  displayDenom: string;
  /**
   * exponent is the exponent that relates the denom to the display_denom and is
   * informational
   */
  exponent: number;
}
export interface AllowedDenomProtoMsg {
  typeUrl: "/regen.ecocredit.v1.AllowedDenom";
  value: Uint8Array;
}
/**
 * AllowedDenom represents the information for an allowed ask denom.
 * 
 * Since Revision 2
 * 
 * Deprecated(Since Revision 2): This type was added to support historical
 * queries for params but will also be removed in the next version.
 */
export interface AllowedDenomAmino {
  /** denom is the bank denom to allow (ex. ibc/GLKHDSG423SGS) */
  bank_denom?: string;
  /**
   * display_denom is the denom to display to the user and is informational.
   * Because the denom is likely an IBC denom, this should be chosen by
   * governance to represent the consensus trusted name of the denom.
   */
  display_denom?: string;
  /**
   * exponent is the exponent that relates the denom to the display_denom and is
   * informational
   */
  exponent?: number;
}
export interface AllowedDenomAminoMsg {
  type: "/regen.ecocredit.v1.AllowedDenom";
  value: AllowedDenomAmino;
}
/**
 * AllowedDenom represents the information for an allowed ask denom.
 * 
 * Since Revision 2
 * 
 * Deprecated(Since Revision 2): This type was added to support historical
 * queries for params but will also be removed in the next version.
 */
export interface AllowedDenomSDKType {
  bank_denom: string;
  display_denom: string;
  exponent: number;
}
function createBaseParams(): Params {
  return {
    creditClassFee: [],
    basketFee: [],
    allowedClassCreators: [],
    allowlistEnabled: false,
    allowedDenoms: [],
    allowedBridgeChains: []
  };
}
export const Params = {
  typeUrl: "/regen.ecocredit.v1.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.creditClassFee) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.basketFee) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.allowedClassCreators) {
      writer.uint32(26).string(v!);
    }
    if (message.allowlistEnabled === true) {
      writer.uint32(32).bool(message.allowlistEnabled);
    }
    for (const v of message.allowedDenoms) {
      AllowedDenom.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.allowedBridgeChains) {
      writer.uint32(50).string(v!);
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
          message.basketFee.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 3:
          message.allowedClassCreators.push(reader.string());
          break;
        case 4:
          message.allowlistEnabled = reader.bool();
          break;
        case 5:
          message.allowedDenoms.push(AllowedDenom.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 6:
          message.allowedBridgeChains.push(reader.string());
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
    message.basketFee = object.basketFee?.map(e => Coin.fromPartial(e)) || [];
    message.allowedClassCreators = object.allowedClassCreators?.map(e => e) || [];
    message.allowlistEnabled = object.allowlistEnabled ?? false;
    message.allowedDenoms = object.allowedDenoms?.map(e => AllowedDenom.fromPartial(e)) || [];
    message.allowedBridgeChains = object.allowedBridgeChains?.map(e => e) || [];
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    const message = createBaseParams();
    message.creditClassFee = object.credit_class_fee?.map(e => Coin.fromAmino(e)) || [];
    message.basketFee = object.basket_fee?.map(e => Coin.fromAmino(e)) || [];
    message.allowedClassCreators = object.allowed_class_creators?.map(e => e) || [];
    if (object.allowlist_enabled !== undefined && object.allowlist_enabled !== null) {
      message.allowlistEnabled = object.allowlist_enabled;
    }
    message.allowedDenoms = object.allowed_denoms?.map(e => AllowedDenom.fromAmino(e)) || [];
    message.allowedBridgeChains = object.allowed_bridge_chains?.map(e => e) || [];
    return message;
  },
  toAmino(message: Params, useInterfaces: boolean = false): ParamsAmino {
    const obj: any = {};
    if (message.creditClassFee) {
      obj.credit_class_fee = message.creditClassFee.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.credit_class_fee = message.creditClassFee;
    }
    if (message.basketFee) {
      obj.basket_fee = message.basketFee.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.basket_fee = message.basketFee;
    }
    if (message.allowedClassCreators) {
      obj.allowed_class_creators = message.allowedClassCreators.map(e => e);
    } else {
      obj.allowed_class_creators = message.allowedClassCreators;
    }
    obj.allowlist_enabled = message.allowlistEnabled === false ? undefined : message.allowlistEnabled;
    if (message.allowedDenoms) {
      obj.allowed_denoms = message.allowedDenoms.map(e => e ? AllowedDenom.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.allowed_denoms = message.allowedDenoms;
    }
    if (message.allowedBridgeChains) {
      obj.allowed_bridge_chains = message.allowedBridgeChains.map(e => e);
    } else {
      obj.allowed_bridge_chains = message.allowedBridgeChains;
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
      typeUrl: "/regen.ecocredit.v1.Params",
      value: Params.encode(message).finish()
    };
  }
};
function createBaseCredits(): Credits {
  return {
    batchDenom: "",
    amount: ""
  };
}
export const Credits = {
  typeUrl: "/regen.ecocredit.v1.Credits",
  encode(message: Credits, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.batchDenom !== "") {
      writer.uint32(10).string(message.batchDenom);
    }
    if (message.amount !== "") {
      writer.uint32(18).string(message.amount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): Credits {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCredits();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.batchDenom = reader.string();
          break;
        case 2:
          message.amount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Credits>): Credits {
    const message = createBaseCredits();
    message.batchDenom = object.batchDenom ?? "";
    message.amount = object.amount ?? "";
    return message;
  },
  fromAmino(object: CreditsAmino): Credits {
    const message = createBaseCredits();
    if (object.batch_denom !== undefined && object.batch_denom !== null) {
      message.batchDenom = object.batch_denom;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    }
    return message;
  },
  toAmino(message: Credits, useInterfaces: boolean = false): CreditsAmino {
    const obj: any = {};
    obj.batch_denom = message.batchDenom === "" ? undefined : message.batchDenom;
    obj.amount = message.amount === "" ? undefined : message.amount;
    return obj;
  },
  fromAminoMsg(object: CreditsAminoMsg): Credits {
    return Credits.fromAmino(object.value);
  },
  fromProtoMsg(message: CreditsProtoMsg, useInterfaces: boolean = false): Credits {
    return Credits.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Credits): Uint8Array {
    return Credits.encode(message).finish();
  },
  toProtoMsg(message: Credits): CreditsProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.Credits",
      value: Credits.encode(message).finish()
    };
  }
};
function createBaseBatchIssuance(): BatchIssuance {
  return {
    recipient: "",
    tradableAmount: "",
    retiredAmount: "",
    retirementJurisdiction: "",
    retirementReason: ""
  };
}
export const BatchIssuance = {
  typeUrl: "/regen.ecocredit.v1.BatchIssuance",
  encode(message: BatchIssuance, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.recipient !== "") {
      writer.uint32(10).string(message.recipient);
    }
    if (message.tradableAmount !== "") {
      writer.uint32(18).string(message.tradableAmount);
    }
    if (message.retiredAmount !== "") {
      writer.uint32(26).string(message.retiredAmount);
    }
    if (message.retirementJurisdiction !== "") {
      writer.uint32(34).string(message.retirementJurisdiction);
    }
    if (message.retirementReason !== "") {
      writer.uint32(42).string(message.retirementReason);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): BatchIssuance {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBatchIssuance();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.recipient = reader.string();
          break;
        case 2:
          message.tradableAmount = reader.string();
          break;
        case 3:
          message.retiredAmount = reader.string();
          break;
        case 4:
          message.retirementJurisdiction = reader.string();
          break;
        case 5:
          message.retirementReason = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<BatchIssuance>): BatchIssuance {
    const message = createBaseBatchIssuance();
    message.recipient = object.recipient ?? "";
    message.tradableAmount = object.tradableAmount ?? "";
    message.retiredAmount = object.retiredAmount ?? "";
    message.retirementJurisdiction = object.retirementJurisdiction ?? "";
    message.retirementReason = object.retirementReason ?? "";
    return message;
  },
  fromAmino(object: BatchIssuanceAmino): BatchIssuance {
    const message = createBaseBatchIssuance();
    if (object.recipient !== undefined && object.recipient !== null) {
      message.recipient = object.recipient;
    }
    if (object.tradable_amount !== undefined && object.tradable_amount !== null) {
      message.tradableAmount = object.tradable_amount;
    }
    if (object.retired_amount !== undefined && object.retired_amount !== null) {
      message.retiredAmount = object.retired_amount;
    }
    if (object.retirement_jurisdiction !== undefined && object.retirement_jurisdiction !== null) {
      message.retirementJurisdiction = object.retirement_jurisdiction;
    }
    if (object.retirement_reason !== undefined && object.retirement_reason !== null) {
      message.retirementReason = object.retirement_reason;
    }
    return message;
  },
  toAmino(message: BatchIssuance, useInterfaces: boolean = false): BatchIssuanceAmino {
    const obj: any = {};
    obj.recipient = message.recipient === "" ? undefined : message.recipient;
    obj.tradable_amount = message.tradableAmount === "" ? undefined : message.tradableAmount;
    obj.retired_amount = message.retiredAmount === "" ? undefined : message.retiredAmount;
    obj.retirement_jurisdiction = message.retirementJurisdiction === "" ? undefined : message.retirementJurisdiction;
    obj.retirement_reason = message.retirementReason === "" ? undefined : message.retirementReason;
    return obj;
  },
  fromAminoMsg(object: BatchIssuanceAminoMsg): BatchIssuance {
    return BatchIssuance.fromAmino(object.value);
  },
  fromProtoMsg(message: BatchIssuanceProtoMsg, useInterfaces: boolean = false): BatchIssuance {
    return BatchIssuance.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: BatchIssuance): Uint8Array {
    return BatchIssuance.encode(message).finish();
  },
  toProtoMsg(message: BatchIssuance): BatchIssuanceProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.BatchIssuance",
      value: BatchIssuance.encode(message).finish()
    };
  }
};
function createBaseOriginTx(): OriginTx {
  return {
    id: "",
    source: "",
    contract: "",
    note: ""
  };
}
export const OriginTx = {
  typeUrl: "/regen.ecocredit.v1.OriginTx",
  encode(message: OriginTx, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.source !== "") {
      writer.uint32(18).string(message.source);
    }
    if (message.contract !== "") {
      writer.uint32(26).string(message.contract);
    }
    if (message.note !== "") {
      writer.uint32(34).string(message.note);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): OriginTx {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOriginTx();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.source = reader.string();
          break;
        case 3:
          message.contract = reader.string();
          break;
        case 4:
          message.note = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<OriginTx>): OriginTx {
    const message = createBaseOriginTx();
    message.id = object.id ?? "";
    message.source = object.source ?? "";
    message.contract = object.contract ?? "";
    message.note = object.note ?? "";
    return message;
  },
  fromAmino(object: OriginTxAmino): OriginTx {
    const message = createBaseOriginTx();
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    }
    if (object.source !== undefined && object.source !== null) {
      message.source = object.source;
    }
    if (object.contract !== undefined && object.contract !== null) {
      message.contract = object.contract;
    }
    if (object.note !== undefined && object.note !== null) {
      message.note = object.note;
    }
    return message;
  },
  toAmino(message: OriginTx, useInterfaces: boolean = false): OriginTxAmino {
    const obj: any = {};
    obj.id = message.id === "" ? undefined : message.id;
    obj.source = message.source === "" ? undefined : message.source;
    obj.contract = message.contract === "" ? undefined : message.contract;
    obj.note = message.note === "" ? undefined : message.note;
    return obj;
  },
  fromAminoMsg(object: OriginTxAminoMsg): OriginTx {
    return OriginTx.fromAmino(object.value);
  },
  fromProtoMsg(message: OriginTxProtoMsg, useInterfaces: boolean = false): OriginTx {
    return OriginTx.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: OriginTx): Uint8Array {
    return OriginTx.encode(message).finish();
  },
  toProtoMsg(message: OriginTx): OriginTxProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.OriginTx",
      value: OriginTx.encode(message).finish()
    };
  }
};
function createBaseCreditTypeProposal(): CreditTypeProposal {
  return {
    $typeUrl: "/regen.ecocredit.v1.CreditTypeProposal",
    title: "",
    description: "",
    creditType: undefined
  };
}
export const CreditTypeProposal = {
  typeUrl: "/regen.ecocredit.v1.CreditTypeProposal",
  encode(message: CreditTypeProposal, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.creditType !== undefined) {
      CreditType.encode(message.creditType, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): CreditTypeProposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreditTypeProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.creditType = CreditType.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<CreditTypeProposal>): CreditTypeProposal {
    const message = createBaseCreditTypeProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.creditType = object.creditType !== undefined && object.creditType !== null ? CreditType.fromPartial(object.creditType) : undefined;
    return message;
  },
  fromAmino(object: CreditTypeProposalAmino): CreditTypeProposal {
    const message = createBaseCreditTypeProposal();
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    }
    if (object.credit_type !== undefined && object.credit_type !== null) {
      message.creditType = CreditType.fromAmino(object.credit_type);
    }
    return message;
  },
  toAmino(message: CreditTypeProposal, useInterfaces: boolean = false): CreditTypeProposalAmino {
    const obj: any = {};
    obj.title = message.title === "" ? undefined : message.title;
    obj.description = message.description === "" ? undefined : message.description;
    obj.credit_type = message.creditType ? CreditType.toAmino(message.creditType, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: CreditTypeProposalAminoMsg): CreditTypeProposal {
    return CreditTypeProposal.fromAmino(object.value);
  },
  fromProtoMsg(message: CreditTypeProposalProtoMsg, useInterfaces: boolean = false): CreditTypeProposal {
    return CreditTypeProposal.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: CreditTypeProposal): Uint8Array {
    return CreditTypeProposal.encode(message).finish();
  },
  toProtoMsg(message: CreditTypeProposal): CreditTypeProposalProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.CreditTypeProposal",
      value: CreditTypeProposal.encode(message).finish()
    };
  }
};
function createBaseAllowedDenom(): AllowedDenom {
  return {
    bankDenom: "",
    displayDenom: "",
    exponent: 0
  };
}
export const AllowedDenom = {
  typeUrl: "/regen.ecocredit.v1.AllowedDenom",
  encode(message: AllowedDenom, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.bankDenom !== "") {
      writer.uint32(10).string(message.bankDenom);
    }
    if (message.displayDenom !== "") {
      writer.uint32(18).string(message.displayDenom);
    }
    if (message.exponent !== 0) {
      writer.uint32(24).uint32(message.exponent);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): AllowedDenom {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAllowedDenom();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.bankDenom = reader.string();
          break;
        case 2:
          message.displayDenom = reader.string();
          break;
        case 3:
          message.exponent = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<AllowedDenom>): AllowedDenom {
    const message = createBaseAllowedDenom();
    message.bankDenom = object.bankDenom ?? "";
    message.displayDenom = object.displayDenom ?? "";
    message.exponent = object.exponent ?? 0;
    return message;
  },
  fromAmino(object: AllowedDenomAmino): AllowedDenom {
    const message = createBaseAllowedDenom();
    if (object.bank_denom !== undefined && object.bank_denom !== null) {
      message.bankDenom = object.bank_denom;
    }
    if (object.display_denom !== undefined && object.display_denom !== null) {
      message.displayDenom = object.display_denom;
    }
    if (object.exponent !== undefined && object.exponent !== null) {
      message.exponent = object.exponent;
    }
    return message;
  },
  toAmino(message: AllowedDenom, useInterfaces: boolean = false): AllowedDenomAmino {
    const obj: any = {};
    obj.bank_denom = message.bankDenom === "" ? undefined : message.bankDenom;
    obj.display_denom = message.displayDenom === "" ? undefined : message.displayDenom;
    obj.exponent = message.exponent === 0 ? undefined : message.exponent;
    return obj;
  },
  fromAminoMsg(object: AllowedDenomAminoMsg): AllowedDenom {
    return AllowedDenom.fromAmino(object.value);
  },
  fromProtoMsg(message: AllowedDenomProtoMsg, useInterfaces: boolean = false): AllowedDenom {
    return AllowedDenom.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: AllowedDenom): Uint8Array {
    return AllowedDenom.encode(message).finish();
  },
  toProtoMsg(message: AllowedDenom): AllowedDenomProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.AllowedDenom",
      value: AllowedDenom.encode(message).finish()
    };
  }
};