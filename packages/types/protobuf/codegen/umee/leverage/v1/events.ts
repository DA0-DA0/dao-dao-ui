import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../../binary";
/** EventSupply is emitted on Msg/Supply */
export interface EventSupply {
  /** Liquidity supplier bech32 address. */
  supplier: string;
  /** Liquidity provided to the module. */
  asset: Coin | undefined;
  /** uToken received by the supplier in exchange for the provided liquidity. */
  utoken: Coin | undefined;
}
export interface EventSupplyProtoMsg {
  typeUrl: "/umee.leverage.v1.EventSupply";
  value: Uint8Array;
}
/** EventSupply is emitted on Msg/Supply */
export interface EventSupplyAmino {
  /** Liquidity supplier bech32 address. */
  supplier?: string;
  /** Liquidity provided to the module. */
  asset?: CoinAmino | undefined;
  /** uToken received by the supplier in exchange for the provided liquidity. */
  utoken?: CoinAmino | undefined;
}
export interface EventSupplyAminoMsg {
  type: "/umee.leverage.v1.EventSupply";
  value: EventSupplyAmino;
}
/** EventSupply is emitted on Msg/Supply */
export interface EventSupplySDKType {
  supplier: string;
  asset: CoinSDKType | undefined;
  utoken: CoinSDKType | undefined;
}
/** EventWithdraw is emitted on Msg/Withdraw */
export interface EventWithdraw {
  /** Liquidity supplier bech32 address. */
  supplier: string;
  /** uToken sent to the module in exchange for the underlying asset. */
  utoken: Coin | undefined;
  /** Liquidity received by the supplier. */
  asset: Coin | undefined;
}
export interface EventWithdrawProtoMsg {
  typeUrl: "/umee.leverage.v1.EventWithdraw";
  value: Uint8Array;
}
/** EventWithdraw is emitted on Msg/Withdraw */
export interface EventWithdrawAmino {
  /** Liquidity supplier bech32 address. */
  supplier?: string;
  /** uToken sent to the module in exchange for the underlying asset. */
  utoken?: CoinAmino | undefined;
  /** Liquidity received by the supplier. */
  asset?: CoinAmino | undefined;
}
export interface EventWithdrawAminoMsg {
  type: "/umee.leverage.v1.EventWithdraw";
  value: EventWithdrawAmino;
}
/** EventWithdraw is emitted on Msg/Withdraw */
export interface EventWithdrawSDKType {
  supplier: string;
  utoken: CoinSDKType | undefined;
  asset: CoinSDKType | undefined;
}
/** EventCollaterize is emitted on Msg/Collaterize */
export interface EventCollaterize {
  /** Borrower bech32 address. */
  borrower: string;
  /** uToken provided as a collateral. */
  utoken: Coin | undefined;
}
export interface EventCollaterizeProtoMsg {
  typeUrl: "/umee.leverage.v1.EventCollaterize";
  value: Uint8Array;
}
/** EventCollaterize is emitted on Msg/Collaterize */
export interface EventCollaterizeAmino {
  /** Borrower bech32 address. */
  borrower?: string;
  /** uToken provided as a collateral. */
  utoken?: CoinAmino | undefined;
}
export interface EventCollaterizeAminoMsg {
  type: "/umee.leverage.v1.EventCollaterize";
  value: EventCollaterizeAmino;
}
/** EventCollaterize is emitted on Msg/Collaterize */
export interface EventCollaterizeSDKType {
  borrower: string;
  utoken: CoinSDKType | undefined;
}
/** EventDecollaterize is emitted on Msg/Decollateralize */
export interface EventDecollaterize {
  /** Borrower bech32 address. */
  borrower: string;
  /** utoken removed from collateral. */
  utoken: Coin | undefined;
}
export interface EventDecollaterizeProtoMsg {
  typeUrl: "/umee.leverage.v1.EventDecollaterize";
  value: Uint8Array;
}
/** EventDecollaterize is emitted on Msg/Decollateralize */
export interface EventDecollaterizeAmino {
  /** Borrower bech32 address. */
  borrower?: string;
  /** utoken removed from collateral. */
  utoken?: CoinAmino | undefined;
}
export interface EventDecollaterizeAminoMsg {
  type: "/umee.leverage.v1.EventDecollaterize";
  value: EventDecollaterizeAmino;
}
/** EventDecollaterize is emitted on Msg/Decollateralize */
export interface EventDecollaterizeSDKType {
  borrower: string;
  utoken: CoinSDKType | undefined;
}
/** EventBorrow is emitted on Msg/Borrow */
export interface EventBorrow {
  /** Borrower bech32 address. */
  borrower: string;
  /** Asset borrowed. */
  asset: Coin | undefined;
}
export interface EventBorrowProtoMsg {
  typeUrl: "/umee.leverage.v1.EventBorrow";
  value: Uint8Array;
}
/** EventBorrow is emitted on Msg/Borrow */
export interface EventBorrowAmino {
  /** Borrower bech32 address. */
  borrower?: string;
  /** Asset borrowed. */
  asset?: CoinAmino | undefined;
}
export interface EventBorrowAminoMsg {
  type: "/umee.leverage.v1.EventBorrow";
  value: EventBorrowAmino;
}
/** EventBorrow is emitted on Msg/Borrow */
export interface EventBorrowSDKType {
  borrower: string;
  asset: CoinSDKType | undefined;
}
/** EventRepay is emitted on Msg/Repay */
export interface EventRepay {
  /** Borrower bech32 address. */
  borrower: string;
  /** Asset repaid */
  repaid: Coin | undefined;
}
export interface EventRepayProtoMsg {
  typeUrl: "/umee.leverage.v1.EventRepay";
  value: Uint8Array;
}
/** EventRepay is emitted on Msg/Repay */
export interface EventRepayAmino {
  /** Borrower bech32 address. */
  borrower?: string;
  /** Asset repaid */
  repaid?: CoinAmino | undefined;
}
export interface EventRepayAminoMsg {
  type: "/umee.leverage.v1.EventRepay";
  value: EventRepayAmino;
}
/** EventRepay is emitted on Msg/Repay */
export interface EventRepaySDKType {
  borrower: string;
  repaid: CoinSDKType | undefined;
}
/** EventLiquidate is emitted on Msg/Liquidate */
export interface EventLiquidate {
  /** Liquidator bech32 address. */
  liquidator: string;
  /** Borrower bech32 address. */
  borrower: string;
  /** Assets liquidated from the borrower */
  liquidated: Coin | undefined;
}
export interface EventLiquidateProtoMsg {
  typeUrl: "/umee.leverage.v1.EventLiquidate";
  value: Uint8Array;
}
/** EventLiquidate is emitted on Msg/Liquidate */
export interface EventLiquidateAmino {
  /** Liquidator bech32 address. */
  liquidator?: string;
  /** Borrower bech32 address. */
  borrower?: string;
  /** Assets liquidated from the borrower */
  liquidated?: CoinAmino | undefined;
}
export interface EventLiquidateAminoMsg {
  type: "/umee.leverage.v1.EventLiquidate";
  value: EventLiquidateAmino;
}
/** EventLiquidate is emitted on Msg/Liquidate */
export interface EventLiquidateSDKType {
  liquidator: string;
  borrower: string;
  liquidated: CoinSDKType | undefined;
}
/** EventInterestAccrual is emitted when interest accrues in EndBlock */
export interface EventInterestAccrual {
  blockHeight: bigint;
  /** Unix timestamp (in seconds) */
  timestamp: bigint;
  totalInterest: Coin[];
  reserved: Coin[];
}
export interface EventInterestAccrualProtoMsg {
  typeUrl: "/umee.leverage.v1.EventInterestAccrual";
  value: Uint8Array;
}
/** EventInterestAccrual is emitted when interest accrues in EndBlock */
export interface EventInterestAccrualAmino {
  block_height?: string;
  /** Unix timestamp (in seconds) */
  timestamp?: string;
  total_interest?: CoinAmino[];
  reserved?: CoinAmino[];
}
export interface EventInterestAccrualAminoMsg {
  type: "/umee.leverage.v1.EventInterestAccrual";
  value: EventInterestAccrualAmino;
}
/** EventInterestAccrual is emitted when interest accrues in EndBlock */
export interface EventInterestAccrualSDKType {
  block_height: bigint;
  timestamp: bigint;
  total_interest: CoinSDKType[];
  reserved: CoinSDKType[];
}
/**
 * EventRepayBadDebt is emitted when bad debt is detected and repayed
 * (potentially partially)
 */
export interface EventRepayBadDebt {
  /** Borrower bech32 address. */
  borrower: string;
  /** Asset repaid */
  asset: Coin | undefined;
}
export interface EventRepayBadDebtProtoMsg {
  typeUrl: "/umee.leverage.v1.EventRepayBadDebt";
  value: Uint8Array;
}
/**
 * EventRepayBadDebt is emitted when bad debt is detected and repayed
 * (potentially partially)
 */
export interface EventRepayBadDebtAmino {
  /** Borrower bech32 address. */
  borrower?: string;
  /** Asset repaid */
  asset?: CoinAmino | undefined;
}
export interface EventRepayBadDebtAminoMsg {
  type: "/umee.leverage.v1.EventRepayBadDebt";
  value: EventRepayBadDebtAmino;
}
/**
 * EventRepayBadDebt is emitted when bad debt is detected and repayed
 * (potentially partially)
 */
export interface EventRepayBadDebtSDKType {
  borrower: string;
  asset: CoinSDKType | undefined;
}
/**
 * EventReservesExhausted is emitted when the module reserves are exhausted
 * by paying off bad debts.
 */
export interface EventReservesExhausted {
  /** Borrower bech32 address. */
  borrower: string;
  /** Outstanding bad debt */
  outstandingDebt: Coin | undefined;
  /** Module balance remaining */
  moduleBalance: Coin | undefined;
  /** Reserves remaining */
  reserves: Coin | undefined;
}
export interface EventReservesExhaustedProtoMsg {
  typeUrl: "/umee.leverage.v1.EventReservesExhausted";
  value: Uint8Array;
}
/**
 * EventReservesExhausted is emitted when the module reserves are exhausted
 * by paying off bad debts.
 */
export interface EventReservesExhaustedAmino {
  /** Borrower bech32 address. */
  borrower?: string;
  /** Outstanding bad debt */
  outstanding_debt?: CoinAmino | undefined;
  /** Module balance remaining */
  module_balance?: CoinAmino | undefined;
  /** Reserves remaining */
  reserves?: CoinAmino | undefined;
}
export interface EventReservesExhaustedAminoMsg {
  type: "/umee.leverage.v1.EventReservesExhausted";
  value: EventReservesExhaustedAmino;
}
/**
 * EventReservesExhausted is emitted when the module reserves are exhausted
 * by paying off bad debts.
 */
export interface EventReservesExhaustedSDKType {
  borrower: string;
  outstanding_debt: CoinSDKType | undefined;
  module_balance: CoinSDKType | undefined;
  reserves: CoinSDKType | undefined;
}
/** EventFundOracle is emitted when sending rewards to oracle module */
export interface EventFundOracle {
  /** Assets sent to oracle module */
  assets: Coin[];
}
export interface EventFundOracleProtoMsg {
  typeUrl: "/umee.leverage.v1.EventFundOracle";
  value: Uint8Array;
}
/** EventFundOracle is emitted when sending rewards to oracle module */
export interface EventFundOracleAmino {
  /** Assets sent to oracle module */
  assets?: CoinAmino[];
}
export interface EventFundOracleAminoMsg {
  type: "/umee.leverage.v1.EventFundOracle";
  value: EventFundOracleAmino;
}
/** EventFundOracle is emitted when sending rewards to oracle module */
export interface EventFundOracleSDKType {
  assets: CoinSDKType[];
}
function createBaseEventSupply(): EventSupply {
  return {
    supplier: "",
    asset: Coin.fromPartial({}),
    utoken: Coin.fromPartial({})
  };
}
export const EventSupply = {
  typeUrl: "/umee.leverage.v1.EventSupply",
  encode(message: EventSupply, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.supplier !== "") {
      writer.uint32(10).string(message.supplier);
    }
    if (message.asset !== undefined) {
      Coin.encode(message.asset, writer.uint32(18).fork()).ldelim();
    }
    if (message.utoken !== undefined) {
      Coin.encode(message.utoken, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventSupply {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSupply();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.supplier = reader.string();
          break;
        case 2:
          message.asset = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.utoken = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventSupply>): EventSupply {
    const message = createBaseEventSupply();
    message.supplier = object.supplier ?? "";
    message.asset = object.asset !== undefined && object.asset !== null ? Coin.fromPartial(object.asset) : undefined;
    message.utoken = object.utoken !== undefined && object.utoken !== null ? Coin.fromPartial(object.utoken) : undefined;
    return message;
  },
  fromAmino(object: EventSupplyAmino): EventSupply {
    const message = createBaseEventSupply();
    if (object.supplier !== undefined && object.supplier !== null) {
      message.supplier = object.supplier;
    }
    if (object.asset !== undefined && object.asset !== null) {
      message.asset = Coin.fromAmino(object.asset);
    }
    if (object.utoken !== undefined && object.utoken !== null) {
      message.utoken = Coin.fromAmino(object.utoken);
    }
    return message;
  },
  toAmino(message: EventSupply, useInterfaces: boolean = false): EventSupplyAmino {
    const obj: any = {};
    obj.supplier = message.supplier === "" ? undefined : message.supplier;
    obj.asset = message.asset ? Coin.toAmino(message.asset, useInterfaces) : undefined;
    obj.utoken = message.utoken ? Coin.toAmino(message.utoken, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventSupplyAminoMsg): EventSupply {
    return EventSupply.fromAmino(object.value);
  },
  fromProtoMsg(message: EventSupplyProtoMsg, useInterfaces: boolean = false): EventSupply {
    return EventSupply.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventSupply): Uint8Array {
    return EventSupply.encode(message).finish();
  },
  toProtoMsg(message: EventSupply): EventSupplyProtoMsg {
    return {
      typeUrl: "/umee.leverage.v1.EventSupply",
      value: EventSupply.encode(message).finish()
    };
  }
};
function createBaseEventWithdraw(): EventWithdraw {
  return {
    supplier: "",
    utoken: Coin.fromPartial({}),
    asset: Coin.fromPartial({})
  };
}
export const EventWithdraw = {
  typeUrl: "/umee.leverage.v1.EventWithdraw",
  encode(message: EventWithdraw, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.supplier !== "") {
      writer.uint32(10).string(message.supplier);
    }
    if (message.utoken !== undefined) {
      Coin.encode(message.utoken, writer.uint32(18).fork()).ldelim();
    }
    if (message.asset !== undefined) {
      Coin.encode(message.asset, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventWithdraw {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventWithdraw();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.supplier = reader.string();
          break;
        case 2:
          message.utoken = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.asset = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventWithdraw>): EventWithdraw {
    const message = createBaseEventWithdraw();
    message.supplier = object.supplier ?? "";
    message.utoken = object.utoken !== undefined && object.utoken !== null ? Coin.fromPartial(object.utoken) : undefined;
    message.asset = object.asset !== undefined && object.asset !== null ? Coin.fromPartial(object.asset) : undefined;
    return message;
  },
  fromAmino(object: EventWithdrawAmino): EventWithdraw {
    const message = createBaseEventWithdraw();
    if (object.supplier !== undefined && object.supplier !== null) {
      message.supplier = object.supplier;
    }
    if (object.utoken !== undefined && object.utoken !== null) {
      message.utoken = Coin.fromAmino(object.utoken);
    }
    if (object.asset !== undefined && object.asset !== null) {
      message.asset = Coin.fromAmino(object.asset);
    }
    return message;
  },
  toAmino(message: EventWithdraw, useInterfaces: boolean = false): EventWithdrawAmino {
    const obj: any = {};
    obj.supplier = message.supplier === "" ? undefined : message.supplier;
    obj.utoken = message.utoken ? Coin.toAmino(message.utoken, useInterfaces) : undefined;
    obj.asset = message.asset ? Coin.toAmino(message.asset, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventWithdrawAminoMsg): EventWithdraw {
    return EventWithdraw.fromAmino(object.value);
  },
  fromProtoMsg(message: EventWithdrawProtoMsg, useInterfaces: boolean = false): EventWithdraw {
    return EventWithdraw.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventWithdraw): Uint8Array {
    return EventWithdraw.encode(message).finish();
  },
  toProtoMsg(message: EventWithdraw): EventWithdrawProtoMsg {
    return {
      typeUrl: "/umee.leverage.v1.EventWithdraw",
      value: EventWithdraw.encode(message).finish()
    };
  }
};
function createBaseEventCollaterize(): EventCollaterize {
  return {
    borrower: "",
    utoken: Coin.fromPartial({})
  };
}
export const EventCollaterize = {
  typeUrl: "/umee.leverage.v1.EventCollaterize",
  encode(message: EventCollaterize, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.borrower !== "") {
      writer.uint32(10).string(message.borrower);
    }
    if (message.utoken !== undefined) {
      Coin.encode(message.utoken, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventCollaterize {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventCollaterize();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.borrower = reader.string();
          break;
        case 2:
          message.utoken = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventCollaterize>): EventCollaterize {
    const message = createBaseEventCollaterize();
    message.borrower = object.borrower ?? "";
    message.utoken = object.utoken !== undefined && object.utoken !== null ? Coin.fromPartial(object.utoken) : undefined;
    return message;
  },
  fromAmino(object: EventCollaterizeAmino): EventCollaterize {
    const message = createBaseEventCollaterize();
    if (object.borrower !== undefined && object.borrower !== null) {
      message.borrower = object.borrower;
    }
    if (object.utoken !== undefined && object.utoken !== null) {
      message.utoken = Coin.fromAmino(object.utoken);
    }
    return message;
  },
  toAmino(message: EventCollaterize, useInterfaces: boolean = false): EventCollaterizeAmino {
    const obj: any = {};
    obj.borrower = message.borrower === "" ? undefined : message.borrower;
    obj.utoken = message.utoken ? Coin.toAmino(message.utoken, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventCollaterizeAminoMsg): EventCollaterize {
    return EventCollaterize.fromAmino(object.value);
  },
  fromProtoMsg(message: EventCollaterizeProtoMsg, useInterfaces: boolean = false): EventCollaterize {
    return EventCollaterize.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventCollaterize): Uint8Array {
    return EventCollaterize.encode(message).finish();
  },
  toProtoMsg(message: EventCollaterize): EventCollaterizeProtoMsg {
    return {
      typeUrl: "/umee.leverage.v1.EventCollaterize",
      value: EventCollaterize.encode(message).finish()
    };
  }
};
function createBaseEventDecollaterize(): EventDecollaterize {
  return {
    borrower: "",
    utoken: Coin.fromPartial({})
  };
}
export const EventDecollaterize = {
  typeUrl: "/umee.leverage.v1.EventDecollaterize",
  encode(message: EventDecollaterize, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.borrower !== "") {
      writer.uint32(10).string(message.borrower);
    }
    if (message.utoken !== undefined) {
      Coin.encode(message.utoken, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventDecollaterize {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventDecollaterize();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.borrower = reader.string();
          break;
        case 2:
          message.utoken = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventDecollaterize>): EventDecollaterize {
    const message = createBaseEventDecollaterize();
    message.borrower = object.borrower ?? "";
    message.utoken = object.utoken !== undefined && object.utoken !== null ? Coin.fromPartial(object.utoken) : undefined;
    return message;
  },
  fromAmino(object: EventDecollaterizeAmino): EventDecollaterize {
    const message = createBaseEventDecollaterize();
    if (object.borrower !== undefined && object.borrower !== null) {
      message.borrower = object.borrower;
    }
    if (object.utoken !== undefined && object.utoken !== null) {
      message.utoken = Coin.fromAmino(object.utoken);
    }
    return message;
  },
  toAmino(message: EventDecollaterize, useInterfaces: boolean = false): EventDecollaterizeAmino {
    const obj: any = {};
    obj.borrower = message.borrower === "" ? undefined : message.borrower;
    obj.utoken = message.utoken ? Coin.toAmino(message.utoken, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventDecollaterizeAminoMsg): EventDecollaterize {
    return EventDecollaterize.fromAmino(object.value);
  },
  fromProtoMsg(message: EventDecollaterizeProtoMsg, useInterfaces: boolean = false): EventDecollaterize {
    return EventDecollaterize.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventDecollaterize): Uint8Array {
    return EventDecollaterize.encode(message).finish();
  },
  toProtoMsg(message: EventDecollaterize): EventDecollaterizeProtoMsg {
    return {
      typeUrl: "/umee.leverage.v1.EventDecollaterize",
      value: EventDecollaterize.encode(message).finish()
    };
  }
};
function createBaseEventBorrow(): EventBorrow {
  return {
    borrower: "",
    asset: Coin.fromPartial({})
  };
}
export const EventBorrow = {
  typeUrl: "/umee.leverage.v1.EventBorrow",
  encode(message: EventBorrow, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.borrower !== "") {
      writer.uint32(10).string(message.borrower);
    }
    if (message.asset !== undefined) {
      Coin.encode(message.asset, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventBorrow {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventBorrow();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.borrower = reader.string();
          break;
        case 2:
          message.asset = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventBorrow>): EventBorrow {
    const message = createBaseEventBorrow();
    message.borrower = object.borrower ?? "";
    message.asset = object.asset !== undefined && object.asset !== null ? Coin.fromPartial(object.asset) : undefined;
    return message;
  },
  fromAmino(object: EventBorrowAmino): EventBorrow {
    const message = createBaseEventBorrow();
    if (object.borrower !== undefined && object.borrower !== null) {
      message.borrower = object.borrower;
    }
    if (object.asset !== undefined && object.asset !== null) {
      message.asset = Coin.fromAmino(object.asset);
    }
    return message;
  },
  toAmino(message: EventBorrow, useInterfaces: boolean = false): EventBorrowAmino {
    const obj: any = {};
    obj.borrower = message.borrower === "" ? undefined : message.borrower;
    obj.asset = message.asset ? Coin.toAmino(message.asset, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventBorrowAminoMsg): EventBorrow {
    return EventBorrow.fromAmino(object.value);
  },
  fromProtoMsg(message: EventBorrowProtoMsg, useInterfaces: boolean = false): EventBorrow {
    return EventBorrow.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventBorrow): Uint8Array {
    return EventBorrow.encode(message).finish();
  },
  toProtoMsg(message: EventBorrow): EventBorrowProtoMsg {
    return {
      typeUrl: "/umee.leverage.v1.EventBorrow",
      value: EventBorrow.encode(message).finish()
    };
  }
};
function createBaseEventRepay(): EventRepay {
  return {
    borrower: "",
    repaid: Coin.fromPartial({})
  };
}
export const EventRepay = {
  typeUrl: "/umee.leverage.v1.EventRepay",
  encode(message: EventRepay, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.borrower !== "") {
      writer.uint32(10).string(message.borrower);
    }
    if (message.repaid !== undefined) {
      Coin.encode(message.repaid, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventRepay {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventRepay();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.borrower = reader.string();
          break;
        case 2:
          message.repaid = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventRepay>): EventRepay {
    const message = createBaseEventRepay();
    message.borrower = object.borrower ?? "";
    message.repaid = object.repaid !== undefined && object.repaid !== null ? Coin.fromPartial(object.repaid) : undefined;
    return message;
  },
  fromAmino(object: EventRepayAmino): EventRepay {
    const message = createBaseEventRepay();
    if (object.borrower !== undefined && object.borrower !== null) {
      message.borrower = object.borrower;
    }
    if (object.repaid !== undefined && object.repaid !== null) {
      message.repaid = Coin.fromAmino(object.repaid);
    }
    return message;
  },
  toAmino(message: EventRepay, useInterfaces: boolean = false): EventRepayAmino {
    const obj: any = {};
    obj.borrower = message.borrower === "" ? undefined : message.borrower;
    obj.repaid = message.repaid ? Coin.toAmino(message.repaid, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventRepayAminoMsg): EventRepay {
    return EventRepay.fromAmino(object.value);
  },
  fromProtoMsg(message: EventRepayProtoMsg, useInterfaces: boolean = false): EventRepay {
    return EventRepay.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventRepay): Uint8Array {
    return EventRepay.encode(message).finish();
  },
  toProtoMsg(message: EventRepay): EventRepayProtoMsg {
    return {
      typeUrl: "/umee.leverage.v1.EventRepay",
      value: EventRepay.encode(message).finish()
    };
  }
};
function createBaseEventLiquidate(): EventLiquidate {
  return {
    liquidator: "",
    borrower: "",
    liquidated: Coin.fromPartial({})
  };
}
export const EventLiquidate = {
  typeUrl: "/umee.leverage.v1.EventLiquidate",
  encode(message: EventLiquidate, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.liquidator !== "") {
      writer.uint32(10).string(message.liquidator);
    }
    if (message.borrower !== "") {
      writer.uint32(18).string(message.borrower);
    }
    if (message.liquidated !== undefined) {
      Coin.encode(message.liquidated, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventLiquidate {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventLiquidate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.liquidator = reader.string();
          break;
        case 2:
          message.borrower = reader.string();
          break;
        case 3:
          message.liquidated = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventLiquidate>): EventLiquidate {
    const message = createBaseEventLiquidate();
    message.liquidator = object.liquidator ?? "";
    message.borrower = object.borrower ?? "";
    message.liquidated = object.liquidated !== undefined && object.liquidated !== null ? Coin.fromPartial(object.liquidated) : undefined;
    return message;
  },
  fromAmino(object: EventLiquidateAmino): EventLiquidate {
    const message = createBaseEventLiquidate();
    if (object.liquidator !== undefined && object.liquidator !== null) {
      message.liquidator = object.liquidator;
    }
    if (object.borrower !== undefined && object.borrower !== null) {
      message.borrower = object.borrower;
    }
    if (object.liquidated !== undefined && object.liquidated !== null) {
      message.liquidated = Coin.fromAmino(object.liquidated);
    }
    return message;
  },
  toAmino(message: EventLiquidate, useInterfaces: boolean = false): EventLiquidateAmino {
    const obj: any = {};
    obj.liquidator = message.liquidator === "" ? undefined : message.liquidator;
    obj.borrower = message.borrower === "" ? undefined : message.borrower;
    obj.liquidated = message.liquidated ? Coin.toAmino(message.liquidated, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventLiquidateAminoMsg): EventLiquidate {
    return EventLiquidate.fromAmino(object.value);
  },
  fromProtoMsg(message: EventLiquidateProtoMsg, useInterfaces: boolean = false): EventLiquidate {
    return EventLiquidate.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventLiquidate): Uint8Array {
    return EventLiquidate.encode(message).finish();
  },
  toProtoMsg(message: EventLiquidate): EventLiquidateProtoMsg {
    return {
      typeUrl: "/umee.leverage.v1.EventLiquidate",
      value: EventLiquidate.encode(message).finish()
    };
  }
};
function createBaseEventInterestAccrual(): EventInterestAccrual {
  return {
    blockHeight: BigInt(0),
    timestamp: BigInt(0),
    totalInterest: [],
    reserved: []
  };
}
export const EventInterestAccrual = {
  typeUrl: "/umee.leverage.v1.EventInterestAccrual",
  encode(message: EventInterestAccrual, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.blockHeight !== BigInt(0)) {
      writer.uint32(8).uint64(message.blockHeight);
    }
    if (message.timestamp !== BigInt(0)) {
      writer.uint32(16).uint64(message.timestamp);
    }
    for (const v of message.totalInterest) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.reserved) {
      Coin.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventInterestAccrual {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventInterestAccrual();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.blockHeight = reader.uint64();
          break;
        case 2:
          message.timestamp = reader.uint64();
          break;
        case 3:
          message.totalInterest.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 4:
          message.reserved.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventInterestAccrual>): EventInterestAccrual {
    const message = createBaseEventInterestAccrual();
    message.blockHeight = object.blockHeight !== undefined && object.blockHeight !== null ? BigInt(object.blockHeight.toString()) : BigInt(0);
    message.timestamp = object.timestamp !== undefined && object.timestamp !== null ? BigInt(object.timestamp.toString()) : BigInt(0);
    message.totalInterest = object.totalInterest?.map(e => Coin.fromPartial(e)) || [];
    message.reserved = object.reserved?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: EventInterestAccrualAmino): EventInterestAccrual {
    const message = createBaseEventInterestAccrual();
    if (object.block_height !== undefined && object.block_height !== null) {
      message.blockHeight = BigInt(object.block_height);
    }
    if (object.timestamp !== undefined && object.timestamp !== null) {
      message.timestamp = BigInt(object.timestamp);
    }
    message.totalInterest = object.total_interest?.map(e => Coin.fromAmino(e)) || [];
    message.reserved = object.reserved?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: EventInterestAccrual, useInterfaces: boolean = false): EventInterestAccrualAmino {
    const obj: any = {};
    obj.block_height = message.blockHeight !== BigInt(0) ? message.blockHeight.toString() : undefined;
    obj.timestamp = message.timestamp !== BigInt(0) ? message.timestamp.toString() : undefined;
    if (message.totalInterest) {
      obj.total_interest = message.totalInterest.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.total_interest = message.totalInterest;
    }
    if (message.reserved) {
      obj.reserved = message.reserved.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.reserved = message.reserved;
    }
    return obj;
  },
  fromAminoMsg(object: EventInterestAccrualAminoMsg): EventInterestAccrual {
    return EventInterestAccrual.fromAmino(object.value);
  },
  fromProtoMsg(message: EventInterestAccrualProtoMsg, useInterfaces: boolean = false): EventInterestAccrual {
    return EventInterestAccrual.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventInterestAccrual): Uint8Array {
    return EventInterestAccrual.encode(message).finish();
  },
  toProtoMsg(message: EventInterestAccrual): EventInterestAccrualProtoMsg {
    return {
      typeUrl: "/umee.leverage.v1.EventInterestAccrual",
      value: EventInterestAccrual.encode(message).finish()
    };
  }
};
function createBaseEventRepayBadDebt(): EventRepayBadDebt {
  return {
    borrower: "",
    asset: Coin.fromPartial({})
  };
}
export const EventRepayBadDebt = {
  typeUrl: "/umee.leverage.v1.EventRepayBadDebt",
  encode(message: EventRepayBadDebt, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.borrower !== "") {
      writer.uint32(10).string(message.borrower);
    }
    if (message.asset !== undefined) {
      Coin.encode(message.asset, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventRepayBadDebt {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventRepayBadDebt();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.borrower = reader.string();
          break;
        case 2:
          message.asset = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventRepayBadDebt>): EventRepayBadDebt {
    const message = createBaseEventRepayBadDebt();
    message.borrower = object.borrower ?? "";
    message.asset = object.asset !== undefined && object.asset !== null ? Coin.fromPartial(object.asset) : undefined;
    return message;
  },
  fromAmino(object: EventRepayBadDebtAmino): EventRepayBadDebt {
    const message = createBaseEventRepayBadDebt();
    if (object.borrower !== undefined && object.borrower !== null) {
      message.borrower = object.borrower;
    }
    if (object.asset !== undefined && object.asset !== null) {
      message.asset = Coin.fromAmino(object.asset);
    }
    return message;
  },
  toAmino(message: EventRepayBadDebt, useInterfaces: boolean = false): EventRepayBadDebtAmino {
    const obj: any = {};
    obj.borrower = message.borrower === "" ? undefined : message.borrower;
    obj.asset = message.asset ? Coin.toAmino(message.asset, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventRepayBadDebtAminoMsg): EventRepayBadDebt {
    return EventRepayBadDebt.fromAmino(object.value);
  },
  fromProtoMsg(message: EventRepayBadDebtProtoMsg, useInterfaces: boolean = false): EventRepayBadDebt {
    return EventRepayBadDebt.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventRepayBadDebt): Uint8Array {
    return EventRepayBadDebt.encode(message).finish();
  },
  toProtoMsg(message: EventRepayBadDebt): EventRepayBadDebtProtoMsg {
    return {
      typeUrl: "/umee.leverage.v1.EventRepayBadDebt",
      value: EventRepayBadDebt.encode(message).finish()
    };
  }
};
function createBaseEventReservesExhausted(): EventReservesExhausted {
  return {
    borrower: "",
    outstandingDebt: Coin.fromPartial({}),
    moduleBalance: Coin.fromPartial({}),
    reserves: Coin.fromPartial({})
  };
}
export const EventReservesExhausted = {
  typeUrl: "/umee.leverage.v1.EventReservesExhausted",
  encode(message: EventReservesExhausted, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.borrower !== "") {
      writer.uint32(10).string(message.borrower);
    }
    if (message.outstandingDebt !== undefined) {
      Coin.encode(message.outstandingDebt, writer.uint32(18).fork()).ldelim();
    }
    if (message.moduleBalance !== undefined) {
      Coin.encode(message.moduleBalance, writer.uint32(26).fork()).ldelim();
    }
    if (message.reserves !== undefined) {
      Coin.encode(message.reserves, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventReservesExhausted {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventReservesExhausted();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.borrower = reader.string();
          break;
        case 2:
          message.outstandingDebt = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.moduleBalance = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 4:
          message.reserves = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventReservesExhausted>): EventReservesExhausted {
    const message = createBaseEventReservesExhausted();
    message.borrower = object.borrower ?? "";
    message.outstandingDebt = object.outstandingDebt !== undefined && object.outstandingDebt !== null ? Coin.fromPartial(object.outstandingDebt) : undefined;
    message.moduleBalance = object.moduleBalance !== undefined && object.moduleBalance !== null ? Coin.fromPartial(object.moduleBalance) : undefined;
    message.reserves = object.reserves !== undefined && object.reserves !== null ? Coin.fromPartial(object.reserves) : undefined;
    return message;
  },
  fromAmino(object: EventReservesExhaustedAmino): EventReservesExhausted {
    const message = createBaseEventReservesExhausted();
    if (object.borrower !== undefined && object.borrower !== null) {
      message.borrower = object.borrower;
    }
    if (object.outstanding_debt !== undefined && object.outstanding_debt !== null) {
      message.outstandingDebt = Coin.fromAmino(object.outstanding_debt);
    }
    if (object.module_balance !== undefined && object.module_balance !== null) {
      message.moduleBalance = Coin.fromAmino(object.module_balance);
    }
    if (object.reserves !== undefined && object.reserves !== null) {
      message.reserves = Coin.fromAmino(object.reserves);
    }
    return message;
  },
  toAmino(message: EventReservesExhausted, useInterfaces: boolean = false): EventReservesExhaustedAmino {
    const obj: any = {};
    obj.borrower = message.borrower === "" ? undefined : message.borrower;
    obj.outstanding_debt = message.outstandingDebt ? Coin.toAmino(message.outstandingDebt, useInterfaces) : undefined;
    obj.module_balance = message.moduleBalance ? Coin.toAmino(message.moduleBalance, useInterfaces) : undefined;
    obj.reserves = message.reserves ? Coin.toAmino(message.reserves, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventReservesExhaustedAminoMsg): EventReservesExhausted {
    return EventReservesExhausted.fromAmino(object.value);
  },
  fromProtoMsg(message: EventReservesExhaustedProtoMsg, useInterfaces: boolean = false): EventReservesExhausted {
    return EventReservesExhausted.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventReservesExhausted): Uint8Array {
    return EventReservesExhausted.encode(message).finish();
  },
  toProtoMsg(message: EventReservesExhausted): EventReservesExhaustedProtoMsg {
    return {
      typeUrl: "/umee.leverage.v1.EventReservesExhausted",
      value: EventReservesExhausted.encode(message).finish()
    };
  }
};
function createBaseEventFundOracle(): EventFundOracle {
  return {
    assets: []
  };
}
export const EventFundOracle = {
  typeUrl: "/umee.leverage.v1.EventFundOracle",
  encode(message: EventFundOracle, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.assets) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EventFundOracle {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventFundOracle();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.assets.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventFundOracle>): EventFundOracle {
    const message = createBaseEventFundOracle();
    message.assets = object.assets?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: EventFundOracleAmino): EventFundOracle {
    const message = createBaseEventFundOracle();
    message.assets = object.assets?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: EventFundOracle, useInterfaces: boolean = false): EventFundOracleAmino {
    const obj: any = {};
    if (message.assets) {
      obj.assets = message.assets.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.assets = message.assets;
    }
    return obj;
  },
  fromAminoMsg(object: EventFundOracleAminoMsg): EventFundOracle {
    return EventFundOracle.fromAmino(object.value);
  },
  fromProtoMsg(message: EventFundOracleProtoMsg, useInterfaces: boolean = false): EventFundOracle {
    return EventFundOracle.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EventFundOracle): Uint8Array {
    return EventFundOracle.encode(message).finish();
  },
  toProtoMsg(message: EventFundOracle): EventFundOracleProtoMsg {
    return {
      typeUrl: "/umee.leverage.v1.EventFundOracle",
      value: EventFundOracle.encode(message).finish()
    };
  }
};