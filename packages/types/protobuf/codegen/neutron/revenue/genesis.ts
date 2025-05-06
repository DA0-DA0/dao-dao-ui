//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { BinaryReader, BinaryWriter } from "../../binary";
import { Decimal } from "@cosmjs/math";
/** Defines the revenue module's genesis state. */
export interface GenesisState {
  /** Revenue module parameters. */
  params: Params | undefined;
  /**
   * The current payment schedule. If nil, the module will use the respective payment schedule for
   * the payment schedule type specified in the params.
   */
  paymentSchedule?: PaymentSchedule | undefined;
  /** Revenue module list of validators. */
  validators: ValidatorInfo[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/neutron.revenue.GenesisState";
  value: Uint8Array;
}
/** Defines the revenue module's genesis state. */
export interface GenesisStateAmino {
  /** Revenue module parameters. */
  params?: ParamsAmino | undefined;
  /**
   * The current payment schedule. If nil, the module will use the respective payment schedule for
   * the payment schedule type specified in the params.
   */
  payment_schedule?: PaymentScheduleAmino | undefined;
  /** Revenue module list of validators. */
  validators?: ValidatorInfoAmino[];
}
export interface GenesisStateAminoMsg {
  type: "/neutron.revenue.GenesisState";
  value: GenesisStateAmino;
}
/** Defines the revenue module's genesis state. */
export interface GenesisStateSDKType {
  params: ParamsSDKType | undefined;
  payment_schedule?: PaymentScheduleSDKType | undefined;
  validators: ValidatorInfoSDKType[];
}
/**
 * A model that contains information specific to the currently active payment schedule. The oneof
 * implementations define conditions for payment periods ending and track the progress of the
 * current payment period. This is a module's state variable.
 * The inner oneof must correspond with the respective payment schedule type defined in the module
 * params. In runtime, on a mismatch due to e.g. MsgUpdateParams execution, the module will switch
 * to the payment schedule that corresponds to the payment schedule type automatically.
 */
export interface PaymentSchedule {
  monthlyPaymentSchedule?: MonthlyPaymentSchedule | undefined;
  blockBasedPaymentSchedule?: BlockBasedPaymentSchedule | undefined;
  emptyPaymentSchedule?: EmptyPaymentSchedule | undefined;
}
export interface PaymentScheduleProtoMsg {
  typeUrl: "/neutron.revenue.PaymentSchedule";
  value: Uint8Array;
}
/**
 * A model that contains information specific to the currently active payment schedule. The oneof
 * implementations define conditions for payment periods ending and track the progress of the
 * current payment period. This is a module's state variable.
 * The inner oneof must correspond with the respective payment schedule type defined in the module
 * params. In runtime, on a mismatch due to e.g. MsgUpdateParams execution, the module will switch
 * to the payment schedule that corresponds to the payment schedule type automatically.
 */
export interface PaymentScheduleAmino {
  monthly_payment_schedule?: MonthlyPaymentScheduleAmino | undefined;
  block_based_payment_schedule?: BlockBasedPaymentScheduleAmino | undefined;
  empty_payment_schedule?: EmptyPaymentScheduleAmino | undefined;
}
export interface PaymentScheduleAminoMsg {
  type: "/neutron.revenue.PaymentSchedule";
  value: PaymentScheduleAmino;
}
/**
 * A model that contains information specific to the currently active payment schedule. The oneof
 * implementations define conditions for payment periods ending and track the progress of the
 * current payment period. This is a module's state variable.
 * The inner oneof must correspond with the respective payment schedule type defined in the module
 * params. In runtime, on a mismatch due to e.g. MsgUpdateParams execution, the module will switch
 * to the payment schedule that corresponds to the payment schedule type automatically.
 */
export interface PaymentScheduleSDKType {
  monthly_payment_schedule?: MonthlyPaymentScheduleSDKType | undefined;
  block_based_payment_schedule?: BlockBasedPaymentScheduleSDKType | undefined;
  empty_payment_schedule?: EmptyPaymentScheduleSDKType | undefined;
}
/** Contains information about a validator. */
export interface ValidatorInfo {
  /** The validator's node operator address. */
  valOperAddress: string;
  /** The number of blocks the validator has committed in the current payment period. */
  commitedBlocksInPeriod: bigint;
  /** The number of oracle votes the validator has submitted in the current payment period. */
  commitedOracleVotesInPeriod: bigint;
  /**
   * The number of blocks the validator has remained in the active validator set for in the
   * current payment period.
   */
  inActiveValsetForBlocksInPeriod: bigint;
}
export interface ValidatorInfoProtoMsg {
  typeUrl: "/neutron.revenue.ValidatorInfo";
  value: Uint8Array;
}
/** Contains information about a validator. */
export interface ValidatorInfoAmino {
  /** The validator's node operator address. */
  val_oper_address?: string;
  /** The number of blocks the validator has committed in the current payment period. */
  commited_blocks_in_period?: string;
  /** The number of oracle votes the validator has submitted in the current payment period. */
  commited_oracle_votes_in_period?: string;
  /**
   * The number of blocks the validator has remained in the active validator set for in the
   * current payment period.
   */
  in_active_valset_for_blocks_in_period?: string;
}
export interface ValidatorInfoAminoMsg {
  type: "/neutron.revenue.ValidatorInfo";
  value: ValidatorInfoAmino;
}
/** Contains information about a validator. */
export interface ValidatorInfoSDKType {
  val_oper_address: string;
  commited_blocks_in_period: bigint;
  commited_oracle_votes_in_period: bigint;
  in_active_valset_for_blocks_in_period: bigint;
}
/** Represents a payment schedule where revenue payments are processed once a month. */
export interface MonthlyPaymentSchedule {
  /** The block height at which the current month started. */
  currentMonthStartBlock: bigint;
  /** The timestamp of the block at which the current month started. */
  currentMonthStartBlockTs: bigint;
}
export interface MonthlyPaymentScheduleProtoMsg {
  typeUrl: "/neutron.revenue.MonthlyPaymentSchedule";
  value: Uint8Array;
}
/** Represents a payment schedule where revenue payments are processed once a month. */
export interface MonthlyPaymentScheduleAmino {
  /** The block height at which the current month started. */
  current_month_start_block?: string;
  /** The timestamp of the block at which the current month started. */
  current_month_start_block_ts?: string;
}
export interface MonthlyPaymentScheduleAminoMsg {
  type: "/neutron.revenue.MonthlyPaymentSchedule";
  value: MonthlyPaymentScheduleAmino;
}
/** Represents a payment schedule where revenue payments are processed once a month. */
export interface MonthlyPaymentScheduleSDKType {
  current_month_start_block: bigint;
  current_month_start_block_ts: bigint;
}
/**
 * Represents a payment schedule where revenue payments are processed after a specified number
 * of blocks.
 */
export interface BlockBasedPaymentSchedule {
  /** The number of blocks in each payment period. */
  blocksPerPeriod: bigint;
  /** The block height at which the current payment period started. */
  currentPeriodStartBlock: bigint;
}
export interface BlockBasedPaymentScheduleProtoMsg {
  typeUrl: "/neutron.revenue.BlockBasedPaymentSchedule";
  value: Uint8Array;
}
/**
 * Represents a payment schedule where revenue payments are processed after a specified number
 * of blocks.
 */
export interface BlockBasedPaymentScheduleAmino {
  /** The number of blocks in each payment period. */
  blocks_per_period?: string;
  /** The block height at which the current payment period started. */
  current_period_start_block?: string;
}
export interface BlockBasedPaymentScheduleAminoMsg {
  type: "/neutron.revenue.BlockBasedPaymentSchedule";
  value: BlockBasedPaymentScheduleAmino;
}
/**
 * Represents a payment schedule where revenue payments are processed after a specified number
 * of blocks.
 */
export interface BlockBasedPaymentScheduleSDKType {
  blocks_per_period: bigint;
  current_period_start_block: bigint;
}
/** Represents a payment schedule where revenue is never distributed. */
export interface EmptyPaymentSchedule {}
export interface EmptyPaymentScheduleProtoMsg {
  typeUrl: "/neutron.revenue.EmptyPaymentSchedule";
  value: Uint8Array;
}
/** Represents a payment schedule where revenue is never distributed. */
export interface EmptyPaymentScheduleAmino {}
export interface EmptyPaymentScheduleAminoMsg {
  type: "/neutron.revenue.EmptyPaymentSchedule";
  value: EmptyPaymentScheduleAmino;
}
/** Represents a payment schedule where revenue is never distributed. */
export interface EmptyPaymentScheduleSDKType {}
/**
 * Represents a data structure that tracks the cumulative price of an asset over the entire
 * observation period, along with the last absolute asset price and the timestamp when this
 * price was last recorded.
 */
export interface RewardAssetPrice {
  /**
   * The cumulative price of the reward asset within the TWAP window. It is calculated as:
   * `cumulative_price_at_timestamp_t(n)` = `last_price_at_t(n-1)` * (t(n) - t(n-1)) + `cumulative_price_at_timestamp_t(n-1)`
   */
  cumulativePrice: string;
  /** The price of the reward asset in reward quote asset that corresponds to the timestamp. */
  absolutePrice: string;
  /** The timestamp of the last update of the absolute and cumulative price. */
  timestamp: bigint;
}
export interface RewardAssetPriceProtoMsg {
  typeUrl: "/neutron.revenue.RewardAssetPrice";
  value: Uint8Array;
}
/**
 * Represents a data structure that tracks the cumulative price of an asset over the entire
 * observation period, along with the last absolute asset price and the timestamp when this
 * price was last recorded.
 */
export interface RewardAssetPriceAmino {
  /**
   * The cumulative price of the reward asset within the TWAP window. It is calculated as:
   * `cumulative_price_at_timestamp_t(n)` = `last_price_at_t(n-1)` * (t(n) - t(n-1)) + `cumulative_price_at_timestamp_t(n-1)`
   */
  cumulative_price?: string;
  /** The price of the reward asset in reward quote asset that corresponds to the timestamp. */
  absolute_price?: string;
  /** The timestamp of the last update of the absolute and cumulative price. */
  timestamp?: string;
}
export interface RewardAssetPriceAminoMsg {
  type: "/neutron.revenue.RewardAssetPrice";
  value: RewardAssetPriceAmino;
}
/**
 * Represents a data structure that tracks the cumulative price of an asset over the entire
 * observation period, along with the last absolute asset price and the timestamp when this
 * price was last recorded.
 */
export interface RewardAssetPriceSDKType {
  cumulative_price: string;
  absolute_price: string;
  timestamp: bigint;
}
function createBaseGenesisState(): GenesisState {
  return {
    params: Params.fromPartial({}),
    paymentSchedule: undefined,
    validators: []
  };
}
export const GenesisState = {
  typeUrl: "/neutron.revenue.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    if (message.paymentSchedule !== undefined) {
      PaymentSchedule.encode(message.paymentSchedule, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.validators) {
      ValidatorInfo.encode(v!, writer.uint32(26).fork()).ldelim();
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
          message.paymentSchedule = PaymentSchedule.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.validators.push(ValidatorInfo.decode(reader, reader.uint32(), useInterfaces));
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
    message.paymentSchedule = object.paymentSchedule !== undefined && object.paymentSchedule !== null ? PaymentSchedule.fromPartial(object.paymentSchedule) : undefined;
    message.validators = object.validators?.map(e => ValidatorInfo.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    if (object.payment_schedule !== undefined && object.payment_schedule !== null) {
      message.paymentSchedule = PaymentSchedule.fromAmino(object.payment_schedule);
    }
    message.validators = object.validators?.map(e => ValidatorInfo.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: GenesisState, useInterfaces: boolean = false): GenesisStateAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
    obj.payment_schedule = message.paymentSchedule ? PaymentSchedule.toAmino(message.paymentSchedule, useInterfaces) : undefined;
    if (message.validators) {
      obj.validators = message.validators.map(e => e ? ValidatorInfo.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.validators = message.validators;
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
      typeUrl: "/neutron.revenue.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};
function createBasePaymentSchedule(): PaymentSchedule {
  return {
    monthlyPaymentSchedule: undefined,
    blockBasedPaymentSchedule: undefined,
    emptyPaymentSchedule: undefined
  };
}
export const PaymentSchedule = {
  typeUrl: "/neutron.revenue.PaymentSchedule",
  encode(message: PaymentSchedule, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.monthlyPaymentSchedule !== undefined) {
      MonthlyPaymentSchedule.encode(message.monthlyPaymentSchedule, writer.uint32(10).fork()).ldelim();
    }
    if (message.blockBasedPaymentSchedule !== undefined) {
      BlockBasedPaymentSchedule.encode(message.blockBasedPaymentSchedule, writer.uint32(18).fork()).ldelim();
    }
    if (message.emptyPaymentSchedule !== undefined) {
      EmptyPaymentSchedule.encode(message.emptyPaymentSchedule, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): PaymentSchedule {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePaymentSchedule();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.monthlyPaymentSchedule = MonthlyPaymentSchedule.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.blockBasedPaymentSchedule = BlockBasedPaymentSchedule.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.emptyPaymentSchedule = EmptyPaymentSchedule.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<PaymentSchedule>): PaymentSchedule {
    const message = createBasePaymentSchedule();
    message.monthlyPaymentSchedule = object.monthlyPaymentSchedule !== undefined && object.monthlyPaymentSchedule !== null ? MonthlyPaymentSchedule.fromPartial(object.monthlyPaymentSchedule) : undefined;
    message.blockBasedPaymentSchedule = object.blockBasedPaymentSchedule !== undefined && object.blockBasedPaymentSchedule !== null ? BlockBasedPaymentSchedule.fromPartial(object.blockBasedPaymentSchedule) : undefined;
    message.emptyPaymentSchedule = object.emptyPaymentSchedule !== undefined && object.emptyPaymentSchedule !== null ? EmptyPaymentSchedule.fromPartial(object.emptyPaymentSchedule) : undefined;
    return message;
  },
  fromAmino(object: PaymentScheduleAmino): PaymentSchedule {
    const message = createBasePaymentSchedule();
    if (object.monthly_payment_schedule !== undefined && object.monthly_payment_schedule !== null) {
      message.monthlyPaymentSchedule = MonthlyPaymentSchedule.fromAmino(object.monthly_payment_schedule);
    }
    if (object.block_based_payment_schedule !== undefined && object.block_based_payment_schedule !== null) {
      message.blockBasedPaymentSchedule = BlockBasedPaymentSchedule.fromAmino(object.block_based_payment_schedule);
    }
    if (object.empty_payment_schedule !== undefined && object.empty_payment_schedule !== null) {
      message.emptyPaymentSchedule = EmptyPaymentSchedule.fromAmino(object.empty_payment_schedule);
    }
    return message;
  },
  toAmino(message: PaymentSchedule, useInterfaces: boolean = false): PaymentScheduleAmino {
    const obj: any = {};
    obj.monthly_payment_schedule = message.monthlyPaymentSchedule ? MonthlyPaymentSchedule.toAmino(message.monthlyPaymentSchedule, useInterfaces) : undefined;
    obj.block_based_payment_schedule = message.blockBasedPaymentSchedule ? BlockBasedPaymentSchedule.toAmino(message.blockBasedPaymentSchedule, useInterfaces) : undefined;
    obj.empty_payment_schedule = message.emptyPaymentSchedule ? EmptyPaymentSchedule.toAmino(message.emptyPaymentSchedule, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: PaymentScheduleAminoMsg): PaymentSchedule {
    return PaymentSchedule.fromAmino(object.value);
  },
  fromProtoMsg(message: PaymentScheduleProtoMsg, useInterfaces: boolean = false): PaymentSchedule {
    return PaymentSchedule.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: PaymentSchedule): Uint8Array {
    return PaymentSchedule.encode(message).finish();
  },
  toProtoMsg(message: PaymentSchedule): PaymentScheduleProtoMsg {
    return {
      typeUrl: "/neutron.revenue.PaymentSchedule",
      value: PaymentSchedule.encode(message).finish()
    };
  }
};
function createBaseValidatorInfo(): ValidatorInfo {
  return {
    valOperAddress: "",
    commitedBlocksInPeriod: BigInt(0),
    commitedOracleVotesInPeriod: BigInt(0),
    inActiveValsetForBlocksInPeriod: BigInt(0)
  };
}
export const ValidatorInfo = {
  typeUrl: "/neutron.revenue.ValidatorInfo",
  encode(message: ValidatorInfo, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.valOperAddress !== "") {
      writer.uint32(10).string(message.valOperAddress);
    }
    if (message.commitedBlocksInPeriod !== BigInt(0)) {
      writer.uint32(16).uint64(message.commitedBlocksInPeriod);
    }
    if (message.commitedOracleVotesInPeriod !== BigInt(0)) {
      writer.uint32(24).uint64(message.commitedOracleVotesInPeriod);
    }
    if (message.inActiveValsetForBlocksInPeriod !== BigInt(0)) {
      writer.uint32(32).uint64(message.inActiveValsetForBlocksInPeriod);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ValidatorInfo {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidatorInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.valOperAddress = reader.string();
          break;
        case 2:
          message.commitedBlocksInPeriod = reader.uint64();
          break;
        case 3:
          message.commitedOracleVotesInPeriod = reader.uint64();
          break;
        case 4:
          message.inActiveValsetForBlocksInPeriod = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ValidatorInfo>): ValidatorInfo {
    const message = createBaseValidatorInfo();
    message.valOperAddress = object.valOperAddress ?? "";
    message.commitedBlocksInPeriod = object.commitedBlocksInPeriod !== undefined && object.commitedBlocksInPeriod !== null ? BigInt(object.commitedBlocksInPeriod.toString()) : BigInt(0);
    message.commitedOracleVotesInPeriod = object.commitedOracleVotesInPeriod !== undefined && object.commitedOracleVotesInPeriod !== null ? BigInt(object.commitedOracleVotesInPeriod.toString()) : BigInt(0);
    message.inActiveValsetForBlocksInPeriod = object.inActiveValsetForBlocksInPeriod !== undefined && object.inActiveValsetForBlocksInPeriod !== null ? BigInt(object.inActiveValsetForBlocksInPeriod.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: ValidatorInfoAmino): ValidatorInfo {
    const message = createBaseValidatorInfo();
    if (object.val_oper_address !== undefined && object.val_oper_address !== null) {
      message.valOperAddress = object.val_oper_address;
    }
    if (object.commited_blocks_in_period !== undefined && object.commited_blocks_in_period !== null) {
      message.commitedBlocksInPeriod = BigInt(object.commited_blocks_in_period);
    }
    if (object.commited_oracle_votes_in_period !== undefined && object.commited_oracle_votes_in_period !== null) {
      message.commitedOracleVotesInPeriod = BigInt(object.commited_oracle_votes_in_period);
    }
    if (object.in_active_valset_for_blocks_in_period !== undefined && object.in_active_valset_for_blocks_in_period !== null) {
      message.inActiveValsetForBlocksInPeriod = BigInt(object.in_active_valset_for_blocks_in_period);
    }
    return message;
  },
  toAmino(message: ValidatorInfo, useInterfaces: boolean = false): ValidatorInfoAmino {
    const obj: any = {};
    obj.val_oper_address = message.valOperAddress === "" ? undefined : message.valOperAddress;
    obj.commited_blocks_in_period = message.commitedBlocksInPeriod !== BigInt(0) ? message.commitedBlocksInPeriod.toString() : undefined;
    obj.commited_oracle_votes_in_period = message.commitedOracleVotesInPeriod !== BigInt(0) ? message.commitedOracleVotesInPeriod.toString() : undefined;
    obj.in_active_valset_for_blocks_in_period = message.inActiveValsetForBlocksInPeriod !== BigInt(0) ? message.inActiveValsetForBlocksInPeriod.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: ValidatorInfoAminoMsg): ValidatorInfo {
    return ValidatorInfo.fromAmino(object.value);
  },
  fromProtoMsg(message: ValidatorInfoProtoMsg, useInterfaces: boolean = false): ValidatorInfo {
    return ValidatorInfo.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ValidatorInfo): Uint8Array {
    return ValidatorInfo.encode(message).finish();
  },
  toProtoMsg(message: ValidatorInfo): ValidatorInfoProtoMsg {
    return {
      typeUrl: "/neutron.revenue.ValidatorInfo",
      value: ValidatorInfo.encode(message).finish()
    };
  }
};
function createBaseMonthlyPaymentSchedule(): MonthlyPaymentSchedule {
  return {
    currentMonthStartBlock: BigInt(0),
    currentMonthStartBlockTs: BigInt(0)
  };
}
export const MonthlyPaymentSchedule = {
  typeUrl: "/neutron.revenue.MonthlyPaymentSchedule",
  encode(message: MonthlyPaymentSchedule, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.currentMonthStartBlock !== BigInt(0)) {
      writer.uint32(8).uint64(message.currentMonthStartBlock);
    }
    if (message.currentMonthStartBlockTs !== BigInt(0)) {
      writer.uint32(16).uint64(message.currentMonthStartBlockTs);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MonthlyPaymentSchedule {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMonthlyPaymentSchedule();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.currentMonthStartBlock = reader.uint64();
          break;
        case 2:
          message.currentMonthStartBlockTs = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MonthlyPaymentSchedule>): MonthlyPaymentSchedule {
    const message = createBaseMonthlyPaymentSchedule();
    message.currentMonthStartBlock = object.currentMonthStartBlock !== undefined && object.currentMonthStartBlock !== null ? BigInt(object.currentMonthStartBlock.toString()) : BigInt(0);
    message.currentMonthStartBlockTs = object.currentMonthStartBlockTs !== undefined && object.currentMonthStartBlockTs !== null ? BigInt(object.currentMonthStartBlockTs.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MonthlyPaymentScheduleAmino): MonthlyPaymentSchedule {
    const message = createBaseMonthlyPaymentSchedule();
    if (object.current_month_start_block !== undefined && object.current_month_start_block !== null) {
      message.currentMonthStartBlock = BigInt(object.current_month_start_block);
    }
    if (object.current_month_start_block_ts !== undefined && object.current_month_start_block_ts !== null) {
      message.currentMonthStartBlockTs = BigInt(object.current_month_start_block_ts);
    }
    return message;
  },
  toAmino(message: MonthlyPaymentSchedule, useInterfaces: boolean = false): MonthlyPaymentScheduleAmino {
    const obj: any = {};
    obj.current_month_start_block = message.currentMonthStartBlock !== BigInt(0) ? message.currentMonthStartBlock.toString() : undefined;
    obj.current_month_start_block_ts = message.currentMonthStartBlockTs !== BigInt(0) ? message.currentMonthStartBlockTs.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: MonthlyPaymentScheduleAminoMsg): MonthlyPaymentSchedule {
    return MonthlyPaymentSchedule.fromAmino(object.value);
  },
  fromProtoMsg(message: MonthlyPaymentScheduleProtoMsg, useInterfaces: boolean = false): MonthlyPaymentSchedule {
    return MonthlyPaymentSchedule.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MonthlyPaymentSchedule): Uint8Array {
    return MonthlyPaymentSchedule.encode(message).finish();
  },
  toProtoMsg(message: MonthlyPaymentSchedule): MonthlyPaymentScheduleProtoMsg {
    return {
      typeUrl: "/neutron.revenue.MonthlyPaymentSchedule",
      value: MonthlyPaymentSchedule.encode(message).finish()
    };
  }
};
function createBaseBlockBasedPaymentSchedule(): BlockBasedPaymentSchedule {
  return {
    blocksPerPeriod: BigInt(0),
    currentPeriodStartBlock: BigInt(0)
  };
}
export const BlockBasedPaymentSchedule = {
  typeUrl: "/neutron.revenue.BlockBasedPaymentSchedule",
  encode(message: BlockBasedPaymentSchedule, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.blocksPerPeriod !== BigInt(0)) {
      writer.uint32(8).uint64(message.blocksPerPeriod);
    }
    if (message.currentPeriodStartBlock !== BigInt(0)) {
      writer.uint32(16).uint64(message.currentPeriodStartBlock);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): BlockBasedPaymentSchedule {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockBasedPaymentSchedule();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.blocksPerPeriod = reader.uint64();
          break;
        case 2:
          message.currentPeriodStartBlock = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<BlockBasedPaymentSchedule>): BlockBasedPaymentSchedule {
    const message = createBaseBlockBasedPaymentSchedule();
    message.blocksPerPeriod = object.blocksPerPeriod !== undefined && object.blocksPerPeriod !== null ? BigInt(object.blocksPerPeriod.toString()) : BigInt(0);
    message.currentPeriodStartBlock = object.currentPeriodStartBlock !== undefined && object.currentPeriodStartBlock !== null ? BigInt(object.currentPeriodStartBlock.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: BlockBasedPaymentScheduleAmino): BlockBasedPaymentSchedule {
    const message = createBaseBlockBasedPaymentSchedule();
    if (object.blocks_per_period !== undefined && object.blocks_per_period !== null) {
      message.blocksPerPeriod = BigInt(object.blocks_per_period);
    }
    if (object.current_period_start_block !== undefined && object.current_period_start_block !== null) {
      message.currentPeriodStartBlock = BigInt(object.current_period_start_block);
    }
    return message;
  },
  toAmino(message: BlockBasedPaymentSchedule, useInterfaces: boolean = false): BlockBasedPaymentScheduleAmino {
    const obj: any = {};
    obj.blocks_per_period = message.blocksPerPeriod !== BigInt(0) ? message.blocksPerPeriod.toString() : undefined;
    obj.current_period_start_block = message.currentPeriodStartBlock !== BigInt(0) ? message.currentPeriodStartBlock.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: BlockBasedPaymentScheduleAminoMsg): BlockBasedPaymentSchedule {
    return BlockBasedPaymentSchedule.fromAmino(object.value);
  },
  fromProtoMsg(message: BlockBasedPaymentScheduleProtoMsg, useInterfaces: boolean = false): BlockBasedPaymentSchedule {
    return BlockBasedPaymentSchedule.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: BlockBasedPaymentSchedule): Uint8Array {
    return BlockBasedPaymentSchedule.encode(message).finish();
  },
  toProtoMsg(message: BlockBasedPaymentSchedule): BlockBasedPaymentScheduleProtoMsg {
    return {
      typeUrl: "/neutron.revenue.BlockBasedPaymentSchedule",
      value: BlockBasedPaymentSchedule.encode(message).finish()
    };
  }
};
function createBaseEmptyPaymentSchedule(): EmptyPaymentSchedule {
  return {};
}
export const EmptyPaymentSchedule = {
  typeUrl: "/neutron.revenue.EmptyPaymentSchedule",
  encode(_: EmptyPaymentSchedule, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EmptyPaymentSchedule {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEmptyPaymentSchedule();
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
  fromPartial(_: Partial<EmptyPaymentSchedule>): EmptyPaymentSchedule {
    const message = createBaseEmptyPaymentSchedule();
    return message;
  },
  fromAmino(_: EmptyPaymentScheduleAmino): EmptyPaymentSchedule {
    const message = createBaseEmptyPaymentSchedule();
    return message;
  },
  toAmino(_: EmptyPaymentSchedule, useInterfaces: boolean = false): EmptyPaymentScheduleAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: EmptyPaymentScheduleAminoMsg): EmptyPaymentSchedule {
    return EmptyPaymentSchedule.fromAmino(object.value);
  },
  fromProtoMsg(message: EmptyPaymentScheduleProtoMsg, useInterfaces: boolean = false): EmptyPaymentSchedule {
    return EmptyPaymentSchedule.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EmptyPaymentSchedule): Uint8Array {
    return EmptyPaymentSchedule.encode(message).finish();
  },
  toProtoMsg(message: EmptyPaymentSchedule): EmptyPaymentScheduleProtoMsg {
    return {
      typeUrl: "/neutron.revenue.EmptyPaymentSchedule",
      value: EmptyPaymentSchedule.encode(message).finish()
    };
  }
};
function createBaseRewardAssetPrice(): RewardAssetPrice {
  return {
    cumulativePrice: "",
    absolutePrice: "",
    timestamp: BigInt(0)
  };
}
export const RewardAssetPrice = {
  typeUrl: "/neutron.revenue.RewardAssetPrice",
  encode(message: RewardAssetPrice, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.cumulativePrice !== "") {
      writer.uint32(10).string(Decimal.fromUserInput(message.cumulativePrice, 18).atomics);
    }
    if (message.absolutePrice !== "") {
      writer.uint32(18).string(Decimal.fromUserInput(message.absolutePrice, 18).atomics);
    }
    if (message.timestamp !== BigInt(0)) {
      writer.uint32(24).int64(message.timestamp);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): RewardAssetPrice {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRewardAssetPrice();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.cumulativePrice = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 2:
          message.absolutePrice = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 3:
          message.timestamp = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<RewardAssetPrice>): RewardAssetPrice {
    const message = createBaseRewardAssetPrice();
    message.cumulativePrice = object.cumulativePrice ?? "";
    message.absolutePrice = object.absolutePrice ?? "";
    message.timestamp = object.timestamp !== undefined && object.timestamp !== null ? BigInt(object.timestamp.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: RewardAssetPriceAmino): RewardAssetPrice {
    const message = createBaseRewardAssetPrice();
    if (object.cumulative_price !== undefined && object.cumulative_price !== null) {
      message.cumulativePrice = object.cumulative_price;
    }
    if (object.absolute_price !== undefined && object.absolute_price !== null) {
      message.absolutePrice = object.absolute_price;
    }
    if (object.timestamp !== undefined && object.timestamp !== null) {
      message.timestamp = BigInt(object.timestamp);
    }
    return message;
  },
  toAmino(message: RewardAssetPrice, useInterfaces: boolean = false): RewardAssetPriceAmino {
    const obj: any = {};
    obj.cumulative_price = message.cumulativePrice === "" ? undefined : message.cumulativePrice;
    obj.absolute_price = message.absolutePrice === "" ? undefined : message.absolutePrice;
    obj.timestamp = message.timestamp !== BigInt(0) ? message.timestamp.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: RewardAssetPriceAminoMsg): RewardAssetPrice {
    return RewardAssetPrice.fromAmino(object.value);
  },
  fromProtoMsg(message: RewardAssetPriceProtoMsg, useInterfaces: boolean = false): RewardAssetPrice {
    return RewardAssetPrice.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: RewardAssetPrice): Uint8Array {
    return RewardAssetPrice.encode(message).finish();
  },
  toProtoMsg(message: RewardAssetPrice): RewardAssetPriceProtoMsg {
    return {
      typeUrl: "/neutron.revenue.RewardAssetPrice",
      value: RewardAssetPrice.encode(message).finish()
    };
  }
};