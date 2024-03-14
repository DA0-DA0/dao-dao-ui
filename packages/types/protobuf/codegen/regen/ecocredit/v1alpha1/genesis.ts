//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType, ClassInfo, ClassInfoAmino, ClassInfoSDKType, BatchInfo, BatchInfoAmino, BatchInfoSDKType, CreditTypeSeq, CreditTypeSeqAmino, CreditTypeSeqSDKType } from "./types";
import { BinaryReader, BinaryWriter } from "../../../binary";
/** GenesisState defines ecocredit module's genesis state. */
export interface GenesisState {
  /**
   * Params contains the updateable global parameters for use with the x/params
   * module
   */
  params: Params | undefined;
  /** class_info is the list of credit class info. */
  classInfo: ClassInfo[];
  /** batch_info is the list of credit batch info. */
  batchInfo: BatchInfo[];
  /** sequences is the list of credit type sequence. */
  sequences: CreditTypeSeq[];
  /** balances is the list of credit batch tradable/retired units. */
  balances: Balance[];
  /** supplies is the list of credit batch tradable/retired supply. */
  supplies: Supply[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/regen.ecocredit.v1alpha1.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines ecocredit module's genesis state. */
export interface GenesisStateAmino {
  /**
   * Params contains the updateable global parameters for use with the x/params
   * module
   */
  params?: ParamsAmino | undefined;
  /** class_info is the list of credit class info. */
  class_info?: ClassInfoAmino[];
  /** batch_info is the list of credit batch info. */
  batch_info?: BatchInfoAmino[];
  /** sequences is the list of credit type sequence. */
  sequences?: CreditTypeSeqAmino[];
  /** balances is the list of credit batch tradable/retired units. */
  balances?: BalanceAmino[];
  /** supplies is the list of credit batch tradable/retired supply. */
  supplies?: SupplyAmino[];
}
export interface GenesisStateAminoMsg {
  type: "/regen.ecocredit.v1alpha1.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines ecocredit module's genesis state. */
export interface GenesisStateSDKType {
  params: ParamsSDKType | undefined;
  class_info: ClassInfoSDKType[];
  batch_info: BatchInfoSDKType[];
  sequences: CreditTypeSeqSDKType[];
  balances: BalanceSDKType[];
  supplies: SupplySDKType[];
}
/**
 * Balance represents tradable or retired units of a credit batch with an
 * account address, batch_denom, and balance.
 */
export interface Balance {
  /** address is the account address of the account holding credits. */
  address: string;
  /** batch_denom is the unique ID of the credit batch. */
  batchDenom: string;
  /** tradable_balance is the tradable balance of the credit batch. */
  tradableBalance: string;
  /** retired_balance is the retired balance of the credit batch. */
  retiredBalance: string;
}
export interface BalanceProtoMsg {
  typeUrl: "/regen.ecocredit.v1alpha1.Balance";
  value: Uint8Array;
}
/**
 * Balance represents tradable or retired units of a credit batch with an
 * account address, batch_denom, and balance.
 */
export interface BalanceAmino {
  /** address is the account address of the account holding credits. */
  address?: string;
  /** batch_denom is the unique ID of the credit batch. */
  batch_denom?: string;
  /** tradable_balance is the tradable balance of the credit batch. */
  tradable_balance?: string;
  /** retired_balance is the retired balance of the credit batch. */
  retired_balance?: string;
}
export interface BalanceAminoMsg {
  type: "/regen.ecocredit.v1alpha1.Balance";
  value: BalanceAmino;
}
/**
 * Balance represents tradable or retired units of a credit batch with an
 * account address, batch_denom, and balance.
 */
export interface BalanceSDKType {
  address: string;
  batch_denom: string;
  tradable_balance: string;
  retired_balance: string;
}
/** Supply represents a tradable or retired supply of a credit batch. */
export interface Supply {
  /** batch_denom is the unique ID of the credit batch. */
  batchDenom: string;
  /** tradable_supply is the tradable supply of the credit batch. */
  tradableSupply: string;
  /** retired_supply is the retired supply of the credit batch. */
  retiredSupply: string;
}
export interface SupplyProtoMsg {
  typeUrl: "/regen.ecocredit.v1alpha1.Supply";
  value: Uint8Array;
}
/** Supply represents a tradable or retired supply of a credit batch. */
export interface SupplyAmino {
  /** batch_denom is the unique ID of the credit batch. */
  batch_denom?: string;
  /** tradable_supply is the tradable supply of the credit batch. */
  tradable_supply?: string;
  /** retired_supply is the retired supply of the credit batch. */
  retired_supply?: string;
}
export interface SupplyAminoMsg {
  type: "/regen.ecocredit.v1alpha1.Supply";
  value: SupplyAmino;
}
/** Supply represents a tradable or retired supply of a credit batch. */
export interface SupplySDKType {
  batch_denom: string;
  tradable_supply: string;
  retired_supply: string;
}
function createBaseGenesisState(): GenesisState {
  return {
    params: Params.fromPartial({}),
    classInfo: [],
    batchInfo: [],
    sequences: [],
    balances: [],
    supplies: []
  };
}
export const GenesisState = {
  typeUrl: "/regen.ecocredit.v1alpha1.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.classInfo) {
      ClassInfo.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.batchInfo) {
      BatchInfo.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.sequences) {
      CreditTypeSeq.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.balances) {
      Balance.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.supplies) {
      Supply.encode(v!, writer.uint32(50).fork()).ldelim();
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
          message.classInfo.push(ClassInfo.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 3:
          message.batchInfo.push(BatchInfo.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 4:
          message.sequences.push(CreditTypeSeq.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 5:
          message.balances.push(Balance.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 6:
          message.supplies.push(Supply.decode(reader, reader.uint32(), useInterfaces));
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
    message.classInfo = object.classInfo?.map(e => ClassInfo.fromPartial(e)) || [];
    message.batchInfo = object.batchInfo?.map(e => BatchInfo.fromPartial(e)) || [];
    message.sequences = object.sequences?.map(e => CreditTypeSeq.fromPartial(e)) || [];
    message.balances = object.balances?.map(e => Balance.fromPartial(e)) || [];
    message.supplies = object.supplies?.map(e => Supply.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    message.classInfo = object.class_info?.map(e => ClassInfo.fromAmino(e)) || [];
    message.batchInfo = object.batch_info?.map(e => BatchInfo.fromAmino(e)) || [];
    message.sequences = object.sequences?.map(e => CreditTypeSeq.fromAmino(e)) || [];
    message.balances = object.balances?.map(e => Balance.fromAmino(e)) || [];
    message.supplies = object.supplies?.map(e => Supply.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: GenesisState, useInterfaces: boolean = false): GenesisStateAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
    if (message.classInfo) {
      obj.class_info = message.classInfo.map(e => e ? ClassInfo.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.class_info = [];
    }
    if (message.batchInfo) {
      obj.batch_info = message.batchInfo.map(e => e ? BatchInfo.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.batch_info = [];
    }
    if (message.sequences) {
      obj.sequences = message.sequences.map(e => e ? CreditTypeSeq.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.sequences = [];
    }
    if (message.balances) {
      obj.balances = message.balances.map(e => e ? Balance.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.balances = [];
    }
    if (message.supplies) {
      obj.supplies = message.supplies.map(e => e ? Supply.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.supplies = [];
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
      typeUrl: "/regen.ecocredit.v1alpha1.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};
function createBaseBalance(): Balance {
  return {
    address: "",
    batchDenom: "",
    tradableBalance: "",
    retiredBalance: ""
  };
}
export const Balance = {
  typeUrl: "/regen.ecocredit.v1alpha1.Balance",
  encode(message: Balance, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.batchDenom !== "") {
      writer.uint32(18).string(message.batchDenom);
    }
    if (message.tradableBalance !== "") {
      writer.uint32(26).string(message.tradableBalance);
    }
    if (message.retiredBalance !== "") {
      writer.uint32(34).string(message.retiredBalance);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): Balance {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBalance();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.batchDenom = reader.string();
          break;
        case 3:
          message.tradableBalance = reader.string();
          break;
        case 4:
          message.retiredBalance = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Balance>): Balance {
    const message = createBaseBalance();
    message.address = object.address ?? "";
    message.batchDenom = object.batchDenom ?? "";
    message.tradableBalance = object.tradableBalance ?? "";
    message.retiredBalance = object.retiredBalance ?? "";
    return message;
  },
  fromAmino(object: BalanceAmino): Balance {
    const message = createBaseBalance();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    if (object.batch_denom !== undefined && object.batch_denom !== null) {
      message.batchDenom = object.batch_denom;
    }
    if (object.tradable_balance !== undefined && object.tradable_balance !== null) {
      message.tradableBalance = object.tradable_balance;
    }
    if (object.retired_balance !== undefined && object.retired_balance !== null) {
      message.retiredBalance = object.retired_balance;
    }
    return message;
  },
  toAmino(message: Balance, useInterfaces: boolean = false): BalanceAmino {
    const obj: any = {};
    obj.address = message.address;
    obj.batch_denom = message.batchDenom;
    obj.tradable_balance = message.tradableBalance;
    obj.retired_balance = message.retiredBalance;
    return obj;
  },
  fromAminoMsg(object: BalanceAminoMsg): Balance {
    return Balance.fromAmino(object.value);
  },
  fromProtoMsg(message: BalanceProtoMsg, useInterfaces: boolean = false): Balance {
    return Balance.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Balance): Uint8Array {
    return Balance.encode(message).finish();
  },
  toProtoMsg(message: Balance): BalanceProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1alpha1.Balance",
      value: Balance.encode(message).finish()
    };
  }
};
function createBaseSupply(): Supply {
  return {
    batchDenom: "",
    tradableSupply: "",
    retiredSupply: ""
  };
}
export const Supply = {
  typeUrl: "/regen.ecocredit.v1alpha1.Supply",
  encode(message: Supply, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.batchDenom !== "") {
      writer.uint32(10).string(message.batchDenom);
    }
    if (message.tradableSupply !== "") {
      writer.uint32(18).string(message.tradableSupply);
    }
    if (message.retiredSupply !== "") {
      writer.uint32(26).string(message.retiredSupply);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): Supply {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSupply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.batchDenom = reader.string();
          break;
        case 2:
          message.tradableSupply = reader.string();
          break;
        case 3:
          message.retiredSupply = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Supply>): Supply {
    const message = createBaseSupply();
    message.batchDenom = object.batchDenom ?? "";
    message.tradableSupply = object.tradableSupply ?? "";
    message.retiredSupply = object.retiredSupply ?? "";
    return message;
  },
  fromAmino(object: SupplyAmino): Supply {
    const message = createBaseSupply();
    if (object.batch_denom !== undefined && object.batch_denom !== null) {
      message.batchDenom = object.batch_denom;
    }
    if (object.tradable_supply !== undefined && object.tradable_supply !== null) {
      message.tradableSupply = object.tradable_supply;
    }
    if (object.retired_supply !== undefined && object.retired_supply !== null) {
      message.retiredSupply = object.retired_supply;
    }
    return message;
  },
  toAmino(message: Supply, useInterfaces: boolean = false): SupplyAmino {
    const obj: any = {};
    obj.batch_denom = message.batchDenom;
    obj.tradable_supply = message.tradableSupply;
    obj.retired_supply = message.retiredSupply;
    return obj;
  },
  fromAminoMsg(object: SupplyAminoMsg): Supply {
    return Supply.fromAmino(object.value);
  },
  fromProtoMsg(message: SupplyProtoMsg, useInterfaces: boolean = false): Supply {
    return Supply.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Supply): Uint8Array {
    return Supply.encode(message).finish();
  },
  toProtoMsg(message: Supply): SupplyProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1alpha1.Supply",
      value: Supply.encode(message).finish()
    };
  }
};