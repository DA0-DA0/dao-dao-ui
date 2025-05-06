import { BinaryReader, BinaryWriter } from "../../binary";
import { Decimal } from "@cosmjs/math";
/** Defines the parameters for the module. */
export interface Params {
  /**
   * The asset used in revenue payments to validators. Expected to be a native token of the chain
   * with its denom metadata registered in the bank module. The denom metadata must have a defined
   * symbol field and contain a denom unit with an alias equal to the symbol and a specified
   * exponent.
   */
  rewardAsset: string;
  /** Quotation of the reward asset. */
  rewardQuote?: RewardQuote | undefined;
  /**
   * Specifies performance requirements for validators in scope of blocks signing and creation. If
   * not met, the validator is not rewarded.
   */
  blocksPerformanceRequirement?: PerformanceRequirement | undefined;
  /**
   * Specifies performance requirements for validators in scope of the oracle price votes. If not
   * met, the validator is not rewarded.
   */
  oracleVotesPerformanceRequirement?: PerformanceRequirement | undefined;
  /** Indicates the currently active type of payment schedule. */
  paymentScheduleType?: PaymentScheduleType | undefined;
  /** The time window, in seconds, used to calculate the TWAP of the reward asset. */
  twapWindow: bigint;
}
export interface ParamsProtoMsg {
  typeUrl: "/neutron.revenue.Params";
  value: Uint8Array;
}
/** Defines the parameters for the module. */
export interface ParamsAmino {
  /**
   * The asset used in revenue payments to validators. Expected to be a native token of the chain
   * with its denom metadata registered in the bank module. The denom metadata must have a defined
   * symbol field and contain a denom unit with an alias equal to the symbol and a specified
   * exponent.
   */
  reward_asset?: string;
  /** Quotation of the reward asset. */
  reward_quote?: RewardQuoteAmino | undefined;
  /**
   * Specifies performance requirements for validators in scope of blocks signing and creation. If
   * not met, the validator is not rewarded.
   */
  blocks_performance_requirement?: PerformanceRequirementAmino | undefined;
  /**
   * Specifies performance requirements for validators in scope of the oracle price votes. If not
   * met, the validator is not rewarded.
   */
  oracle_votes_performance_requirement?: PerformanceRequirementAmino | undefined;
  /** Indicates the currently active type of payment schedule. */
  payment_schedule_type?: PaymentScheduleTypeAmino | undefined;
  /** The time window, in seconds, used to calculate the TWAP of the reward asset. */
  twap_window?: string;
}
export interface ParamsAminoMsg {
  type: "/neutron.revenue.Params";
  value: ParamsAmino;
}
/** Defines the parameters for the module. */
export interface ParamsSDKType {
  reward_asset: string;
  reward_quote?: RewardQuoteSDKType | undefined;
  blocks_performance_requirement?: PerformanceRequirementSDKType | undefined;
  oracle_votes_performance_requirement?: PerformanceRequirementSDKType | undefined;
  payment_schedule_type?: PaymentScheduleTypeSDKType | undefined;
  twap_window: bigint;
}
/** Defines information about the reward quote. */
export interface RewardQuote {
  /**
   * The compensation amount measured in the quote asset. The amount is divided by the price of
   * the reward asset to determine the base revenue amount.
   */
  amount: bigint;
  /**
   * The name of the quote asset. It is used as a quote in price queries to the slinky oracle
   * module to determine the price of the reward asset.
   */
  asset: string;
}
export interface RewardQuoteProtoMsg {
  typeUrl: "/neutron.revenue.RewardQuote";
  value: Uint8Array;
}
/** Defines information about the reward quote. */
export interface RewardQuoteAmino {
  /**
   * The compensation amount measured in the quote asset. The amount is divided by the price of
   * the reward asset to determine the base revenue amount.
   */
  amount?: string;
  /**
   * The name of the quote asset. It is used as a quote in price queries to the slinky oracle
   * module to determine the price of the reward asset.
   */
  asset?: string;
}
export interface RewardQuoteAminoMsg {
  type: "/neutron.revenue.RewardQuote";
  value: RewardQuoteAmino;
}
/** Defines information about the reward quote. */
export interface RewardQuoteSDKType {
  amount: bigint;
  asset: string;
}
/**
 * A model that contains information specific to the currently active payment schedule type. The
 * oneof implementations define the payment schedule that must be used currently.
 * This is a module's parameter. It's not updated automatically in runtime in contrast to the
 * payment schedule which is a state variable, but is updated via MsgUpdateParams.
 */
export interface PaymentScheduleType {
  monthlyPaymentScheduleType?: MonthlyPaymentScheduleType | undefined;
  blockBasedPaymentScheduleType?: BlockBasedPaymentScheduleType | undefined;
  emptyPaymentScheduleType?: EmptyPaymentScheduleType | undefined;
}
export interface PaymentScheduleTypeProtoMsg {
  typeUrl: "/neutron.revenue.PaymentScheduleType";
  value: Uint8Array;
}
/**
 * A model that contains information specific to the currently active payment schedule type. The
 * oneof implementations define the payment schedule that must be used currently.
 * This is a module's parameter. It's not updated automatically in runtime in contrast to the
 * payment schedule which is a state variable, but is updated via MsgUpdateParams.
 */
export interface PaymentScheduleTypeAmino {
  monthly_payment_schedule_type?: MonthlyPaymentScheduleTypeAmino | undefined;
  block_based_payment_schedule_type?: BlockBasedPaymentScheduleTypeAmino | undefined;
  empty_payment_schedule_type?: EmptyPaymentScheduleTypeAmino | undefined;
}
export interface PaymentScheduleTypeAminoMsg {
  type: "/neutron.revenue.PaymentScheduleType";
  value: PaymentScheduleTypeAmino;
}
/**
 * A model that contains information specific to the currently active payment schedule type. The
 * oneof implementations define the payment schedule that must be used currently.
 * This is a module's parameter. It's not updated automatically in runtime in contrast to the
 * payment schedule which is a state variable, but is updated via MsgUpdateParams.
 */
export interface PaymentScheduleTypeSDKType {
  monthly_payment_schedule_type?: MonthlyPaymentScheduleTypeSDKType | undefined;
  block_based_payment_schedule_type?: BlockBasedPaymentScheduleTypeSDKType | undefined;
  empty_payment_schedule_type?: EmptyPaymentScheduleTypeSDKType | undefined;
}
/** Monthly periods with payments made at the end of each month. */
export interface MonthlyPaymentScheduleType {}
export interface MonthlyPaymentScheduleTypeProtoMsg {
  typeUrl: "/neutron.revenue.MonthlyPaymentScheduleType";
  value: Uint8Array;
}
/** Monthly periods with payments made at the end of each month. */
export interface MonthlyPaymentScheduleTypeAmino {}
export interface MonthlyPaymentScheduleTypeAminoMsg {
  type: "/neutron.revenue.MonthlyPaymentScheduleType";
  value: MonthlyPaymentScheduleTypeAmino;
}
/** Monthly periods with payments made at the end of each month. */
export interface MonthlyPaymentScheduleTypeSDKType {}
/**
 * Periods defined by a specific number of blocks, with payments made when the required block
 * count is reached.
 */
export interface BlockBasedPaymentScheduleType {
  /** The number of blocks in a payment period. */
  blocksPerPeriod: bigint;
}
export interface BlockBasedPaymentScheduleTypeProtoMsg {
  typeUrl: "/neutron.revenue.BlockBasedPaymentScheduleType";
  value: Uint8Array;
}
/**
 * Periods defined by a specific number of blocks, with payments made when the required block
 * count is reached.
 */
export interface BlockBasedPaymentScheduleTypeAmino {
  /** The number of blocks in a payment period. */
  blocks_per_period?: string;
}
export interface BlockBasedPaymentScheduleTypeAminoMsg {
  type: "/neutron.revenue.BlockBasedPaymentScheduleType";
  value: BlockBasedPaymentScheduleTypeAmino;
}
/**
 * Periods defined by a specific number of blocks, with payments made when the required block
 * count is reached.
 */
export interface BlockBasedPaymentScheduleTypeSDKType {
  blocks_per_period: bigint;
}
/** Endless periods with payments never made. */
export interface EmptyPaymentScheduleType {}
export interface EmptyPaymentScheduleTypeProtoMsg {
  typeUrl: "/neutron.revenue.EmptyPaymentScheduleType";
  value: Uint8Array;
}
/** Endless periods with payments never made. */
export interface EmptyPaymentScheduleTypeAmino {}
export interface EmptyPaymentScheduleTypeAminoMsg {
  type: "/neutron.revenue.EmptyPaymentScheduleType";
  value: EmptyPaymentScheduleTypeAmino;
}
/** Endless periods with payments never made. */
export interface EmptyPaymentScheduleTypeSDKType {}
/** Specifies a performance criteria that validators must meet to qualify for network rewards. */
export interface PerformanceRequirement {
  /**
   * The fraction of the total performance a validator can miss without affecting their reward.
   * Represented as a decimal value in the range [0.0, 1.0], where 1.0 corresponds to 100%.
   */
  allowedToMiss: string;
  /**
   * The minimum fraction of the total performance a validator must achieve to be eligible for
   * network rewards. Validators falling below this threshold will not receive any rewards.
   * Represented as a decimal value in the range [0.0, 1.0], where 1.0 corresponds to 100%.
   */
  requiredAtLeast: string;
}
export interface PerformanceRequirementProtoMsg {
  typeUrl: "/neutron.revenue.PerformanceRequirement";
  value: Uint8Array;
}
/** Specifies a performance criteria that validators must meet to qualify for network rewards. */
export interface PerformanceRequirementAmino {
  /**
   * The fraction of the total performance a validator can miss without affecting their reward.
   * Represented as a decimal value in the range [0.0, 1.0], where 1.0 corresponds to 100%.
   */
  allowed_to_miss?: string;
  /**
   * The minimum fraction of the total performance a validator must achieve to be eligible for
   * network rewards. Validators falling below this threshold will not receive any rewards.
   * Represented as a decimal value in the range [0.0, 1.0], where 1.0 corresponds to 100%.
   */
  required_at_least?: string;
}
export interface PerformanceRequirementAminoMsg {
  type: "/neutron.revenue.PerformanceRequirement";
  value: PerformanceRequirementAmino;
}
/** Specifies a performance criteria that validators must meet to qualify for network rewards. */
export interface PerformanceRequirementSDKType {
  allowed_to_miss: string;
  required_at_least: string;
}
function createBaseParams(): Params {
  return {
    rewardAsset: "",
    rewardQuote: undefined,
    blocksPerformanceRequirement: undefined,
    oracleVotesPerformanceRequirement: undefined,
    paymentScheduleType: undefined,
    twapWindow: BigInt(0)
  };
}
export const Params = {
  typeUrl: "/neutron.revenue.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.rewardAsset !== "") {
      writer.uint32(10).string(message.rewardAsset);
    }
    if (message.rewardQuote !== undefined) {
      RewardQuote.encode(message.rewardQuote, writer.uint32(18).fork()).ldelim();
    }
    if (message.blocksPerformanceRequirement !== undefined) {
      PerformanceRequirement.encode(message.blocksPerformanceRequirement, writer.uint32(26).fork()).ldelim();
    }
    if (message.oracleVotesPerformanceRequirement !== undefined) {
      PerformanceRequirement.encode(message.oracleVotesPerformanceRequirement, writer.uint32(34).fork()).ldelim();
    }
    if (message.paymentScheduleType !== undefined) {
      PaymentScheduleType.encode(message.paymentScheduleType, writer.uint32(42).fork()).ldelim();
    }
    if (message.twapWindow !== BigInt(0)) {
      writer.uint32(48).int64(message.twapWindow);
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
          message.rewardAsset = reader.string();
          break;
        case 2:
          message.rewardQuote = RewardQuote.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.blocksPerformanceRequirement = PerformanceRequirement.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 4:
          message.oracleVotesPerformanceRequirement = PerformanceRequirement.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 5:
          message.paymentScheduleType = PaymentScheduleType.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 6:
          message.twapWindow = reader.int64();
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
    message.rewardAsset = object.rewardAsset ?? "";
    message.rewardQuote = object.rewardQuote !== undefined && object.rewardQuote !== null ? RewardQuote.fromPartial(object.rewardQuote) : undefined;
    message.blocksPerformanceRequirement = object.blocksPerformanceRequirement !== undefined && object.blocksPerformanceRequirement !== null ? PerformanceRequirement.fromPartial(object.blocksPerformanceRequirement) : undefined;
    message.oracleVotesPerformanceRequirement = object.oracleVotesPerformanceRequirement !== undefined && object.oracleVotesPerformanceRequirement !== null ? PerformanceRequirement.fromPartial(object.oracleVotesPerformanceRequirement) : undefined;
    message.paymentScheduleType = object.paymentScheduleType !== undefined && object.paymentScheduleType !== null ? PaymentScheduleType.fromPartial(object.paymentScheduleType) : undefined;
    message.twapWindow = object.twapWindow !== undefined && object.twapWindow !== null ? BigInt(object.twapWindow.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    const message = createBaseParams();
    if (object.reward_asset !== undefined && object.reward_asset !== null) {
      message.rewardAsset = object.reward_asset;
    }
    if (object.reward_quote !== undefined && object.reward_quote !== null) {
      message.rewardQuote = RewardQuote.fromAmino(object.reward_quote);
    }
    if (object.blocks_performance_requirement !== undefined && object.blocks_performance_requirement !== null) {
      message.blocksPerformanceRequirement = PerformanceRequirement.fromAmino(object.blocks_performance_requirement);
    }
    if (object.oracle_votes_performance_requirement !== undefined && object.oracle_votes_performance_requirement !== null) {
      message.oracleVotesPerformanceRequirement = PerformanceRequirement.fromAmino(object.oracle_votes_performance_requirement);
    }
    if (object.payment_schedule_type !== undefined && object.payment_schedule_type !== null) {
      message.paymentScheduleType = PaymentScheduleType.fromAmino(object.payment_schedule_type);
    }
    if (object.twap_window !== undefined && object.twap_window !== null) {
      message.twapWindow = BigInt(object.twap_window);
    }
    return message;
  },
  toAmino(message: Params, useInterfaces: boolean = false): ParamsAmino {
    const obj: any = {};
    obj.reward_asset = message.rewardAsset === "" ? undefined : message.rewardAsset;
    obj.reward_quote = message.rewardQuote ? RewardQuote.toAmino(message.rewardQuote, useInterfaces) : undefined;
    obj.blocks_performance_requirement = message.blocksPerformanceRequirement ? PerformanceRequirement.toAmino(message.blocksPerformanceRequirement, useInterfaces) : undefined;
    obj.oracle_votes_performance_requirement = message.oracleVotesPerformanceRequirement ? PerformanceRequirement.toAmino(message.oracleVotesPerformanceRequirement, useInterfaces) : undefined;
    obj.payment_schedule_type = message.paymentScheduleType ? PaymentScheduleType.toAmino(message.paymentScheduleType, useInterfaces) : undefined;
    obj.twap_window = message.twapWindow !== BigInt(0) ? message.twapWindow.toString() : undefined;
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
      typeUrl: "/neutron.revenue.Params",
      value: Params.encode(message).finish()
    };
  }
};
function createBaseRewardQuote(): RewardQuote {
  return {
    amount: BigInt(0),
    asset: ""
  };
}
export const RewardQuote = {
  typeUrl: "/neutron.revenue.RewardQuote",
  encode(message: RewardQuote, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.amount !== BigInt(0)) {
      writer.uint32(8).uint64(message.amount);
    }
    if (message.asset !== "") {
      writer.uint32(18).string(message.asset);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): RewardQuote {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRewardQuote();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.amount = reader.uint64();
          break;
        case 2:
          message.asset = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<RewardQuote>): RewardQuote {
    const message = createBaseRewardQuote();
    message.amount = object.amount !== undefined && object.amount !== null ? BigInt(object.amount.toString()) : BigInt(0);
    message.asset = object.asset ?? "";
    return message;
  },
  fromAmino(object: RewardQuoteAmino): RewardQuote {
    const message = createBaseRewardQuote();
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = BigInt(object.amount);
    }
    if (object.asset !== undefined && object.asset !== null) {
      message.asset = object.asset;
    }
    return message;
  },
  toAmino(message: RewardQuote, useInterfaces: boolean = false): RewardQuoteAmino {
    const obj: any = {};
    obj.amount = message.amount !== BigInt(0) ? message.amount.toString() : undefined;
    obj.asset = message.asset === "" ? undefined : message.asset;
    return obj;
  },
  fromAminoMsg(object: RewardQuoteAminoMsg): RewardQuote {
    return RewardQuote.fromAmino(object.value);
  },
  fromProtoMsg(message: RewardQuoteProtoMsg, useInterfaces: boolean = false): RewardQuote {
    return RewardQuote.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: RewardQuote): Uint8Array {
    return RewardQuote.encode(message).finish();
  },
  toProtoMsg(message: RewardQuote): RewardQuoteProtoMsg {
    return {
      typeUrl: "/neutron.revenue.RewardQuote",
      value: RewardQuote.encode(message).finish()
    };
  }
};
function createBasePaymentScheduleType(): PaymentScheduleType {
  return {
    monthlyPaymentScheduleType: undefined,
    blockBasedPaymentScheduleType: undefined,
    emptyPaymentScheduleType: undefined
  };
}
export const PaymentScheduleType = {
  typeUrl: "/neutron.revenue.PaymentScheduleType",
  encode(message: PaymentScheduleType, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.monthlyPaymentScheduleType !== undefined) {
      MonthlyPaymentScheduleType.encode(message.monthlyPaymentScheduleType, writer.uint32(34).fork()).ldelim();
    }
    if (message.blockBasedPaymentScheduleType !== undefined) {
      BlockBasedPaymentScheduleType.encode(message.blockBasedPaymentScheduleType, writer.uint32(42).fork()).ldelim();
    }
    if (message.emptyPaymentScheduleType !== undefined) {
      EmptyPaymentScheduleType.encode(message.emptyPaymentScheduleType, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): PaymentScheduleType {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePaymentScheduleType();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 4:
          message.monthlyPaymentScheduleType = MonthlyPaymentScheduleType.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 5:
          message.blockBasedPaymentScheduleType = BlockBasedPaymentScheduleType.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 6:
          message.emptyPaymentScheduleType = EmptyPaymentScheduleType.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<PaymentScheduleType>): PaymentScheduleType {
    const message = createBasePaymentScheduleType();
    message.monthlyPaymentScheduleType = object.monthlyPaymentScheduleType !== undefined && object.monthlyPaymentScheduleType !== null ? MonthlyPaymentScheduleType.fromPartial(object.monthlyPaymentScheduleType) : undefined;
    message.blockBasedPaymentScheduleType = object.blockBasedPaymentScheduleType !== undefined && object.blockBasedPaymentScheduleType !== null ? BlockBasedPaymentScheduleType.fromPartial(object.blockBasedPaymentScheduleType) : undefined;
    message.emptyPaymentScheduleType = object.emptyPaymentScheduleType !== undefined && object.emptyPaymentScheduleType !== null ? EmptyPaymentScheduleType.fromPartial(object.emptyPaymentScheduleType) : undefined;
    return message;
  },
  fromAmino(object: PaymentScheduleTypeAmino): PaymentScheduleType {
    const message = createBasePaymentScheduleType();
    if (object.monthly_payment_schedule_type !== undefined && object.monthly_payment_schedule_type !== null) {
      message.monthlyPaymentScheduleType = MonthlyPaymentScheduleType.fromAmino(object.monthly_payment_schedule_type);
    }
    if (object.block_based_payment_schedule_type !== undefined && object.block_based_payment_schedule_type !== null) {
      message.blockBasedPaymentScheduleType = BlockBasedPaymentScheduleType.fromAmino(object.block_based_payment_schedule_type);
    }
    if (object.empty_payment_schedule_type !== undefined && object.empty_payment_schedule_type !== null) {
      message.emptyPaymentScheduleType = EmptyPaymentScheduleType.fromAmino(object.empty_payment_schedule_type);
    }
    return message;
  },
  toAmino(message: PaymentScheduleType, useInterfaces: boolean = false): PaymentScheduleTypeAmino {
    const obj: any = {};
    obj.monthly_payment_schedule_type = message.monthlyPaymentScheduleType ? MonthlyPaymentScheduleType.toAmino(message.monthlyPaymentScheduleType, useInterfaces) : undefined;
    obj.block_based_payment_schedule_type = message.blockBasedPaymentScheduleType ? BlockBasedPaymentScheduleType.toAmino(message.blockBasedPaymentScheduleType, useInterfaces) : undefined;
    obj.empty_payment_schedule_type = message.emptyPaymentScheduleType ? EmptyPaymentScheduleType.toAmino(message.emptyPaymentScheduleType, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: PaymentScheduleTypeAminoMsg): PaymentScheduleType {
    return PaymentScheduleType.fromAmino(object.value);
  },
  fromProtoMsg(message: PaymentScheduleTypeProtoMsg, useInterfaces: boolean = false): PaymentScheduleType {
    return PaymentScheduleType.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: PaymentScheduleType): Uint8Array {
    return PaymentScheduleType.encode(message).finish();
  },
  toProtoMsg(message: PaymentScheduleType): PaymentScheduleTypeProtoMsg {
    return {
      typeUrl: "/neutron.revenue.PaymentScheduleType",
      value: PaymentScheduleType.encode(message).finish()
    };
  }
};
function createBaseMonthlyPaymentScheduleType(): MonthlyPaymentScheduleType {
  return {};
}
export const MonthlyPaymentScheduleType = {
  typeUrl: "/neutron.revenue.MonthlyPaymentScheduleType",
  encode(_: MonthlyPaymentScheduleType, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MonthlyPaymentScheduleType {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMonthlyPaymentScheduleType();
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
  fromPartial(_: Partial<MonthlyPaymentScheduleType>): MonthlyPaymentScheduleType {
    const message = createBaseMonthlyPaymentScheduleType();
    return message;
  },
  fromAmino(_: MonthlyPaymentScheduleTypeAmino): MonthlyPaymentScheduleType {
    const message = createBaseMonthlyPaymentScheduleType();
    return message;
  },
  toAmino(_: MonthlyPaymentScheduleType, useInterfaces: boolean = false): MonthlyPaymentScheduleTypeAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MonthlyPaymentScheduleTypeAminoMsg): MonthlyPaymentScheduleType {
    return MonthlyPaymentScheduleType.fromAmino(object.value);
  },
  fromProtoMsg(message: MonthlyPaymentScheduleTypeProtoMsg, useInterfaces: boolean = false): MonthlyPaymentScheduleType {
    return MonthlyPaymentScheduleType.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MonthlyPaymentScheduleType): Uint8Array {
    return MonthlyPaymentScheduleType.encode(message).finish();
  },
  toProtoMsg(message: MonthlyPaymentScheduleType): MonthlyPaymentScheduleTypeProtoMsg {
    return {
      typeUrl: "/neutron.revenue.MonthlyPaymentScheduleType",
      value: MonthlyPaymentScheduleType.encode(message).finish()
    };
  }
};
function createBaseBlockBasedPaymentScheduleType(): BlockBasedPaymentScheduleType {
  return {
    blocksPerPeriod: BigInt(0)
  };
}
export const BlockBasedPaymentScheduleType = {
  typeUrl: "/neutron.revenue.BlockBasedPaymentScheduleType",
  encode(message: BlockBasedPaymentScheduleType, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.blocksPerPeriod !== BigInt(0)) {
      writer.uint32(8).uint64(message.blocksPerPeriod);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): BlockBasedPaymentScheduleType {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockBasedPaymentScheduleType();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.blocksPerPeriod = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<BlockBasedPaymentScheduleType>): BlockBasedPaymentScheduleType {
    const message = createBaseBlockBasedPaymentScheduleType();
    message.blocksPerPeriod = object.blocksPerPeriod !== undefined && object.blocksPerPeriod !== null ? BigInt(object.blocksPerPeriod.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: BlockBasedPaymentScheduleTypeAmino): BlockBasedPaymentScheduleType {
    const message = createBaseBlockBasedPaymentScheduleType();
    if (object.blocks_per_period !== undefined && object.blocks_per_period !== null) {
      message.blocksPerPeriod = BigInt(object.blocks_per_period);
    }
    return message;
  },
  toAmino(message: BlockBasedPaymentScheduleType, useInterfaces: boolean = false): BlockBasedPaymentScheduleTypeAmino {
    const obj: any = {};
    obj.blocks_per_period = message.blocksPerPeriod !== BigInt(0) ? message.blocksPerPeriod.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: BlockBasedPaymentScheduleTypeAminoMsg): BlockBasedPaymentScheduleType {
    return BlockBasedPaymentScheduleType.fromAmino(object.value);
  },
  fromProtoMsg(message: BlockBasedPaymentScheduleTypeProtoMsg, useInterfaces: boolean = false): BlockBasedPaymentScheduleType {
    return BlockBasedPaymentScheduleType.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: BlockBasedPaymentScheduleType): Uint8Array {
    return BlockBasedPaymentScheduleType.encode(message).finish();
  },
  toProtoMsg(message: BlockBasedPaymentScheduleType): BlockBasedPaymentScheduleTypeProtoMsg {
    return {
      typeUrl: "/neutron.revenue.BlockBasedPaymentScheduleType",
      value: BlockBasedPaymentScheduleType.encode(message).finish()
    };
  }
};
function createBaseEmptyPaymentScheduleType(): EmptyPaymentScheduleType {
  return {};
}
export const EmptyPaymentScheduleType = {
  typeUrl: "/neutron.revenue.EmptyPaymentScheduleType",
  encode(_: EmptyPaymentScheduleType, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EmptyPaymentScheduleType {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEmptyPaymentScheduleType();
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
  fromPartial(_: Partial<EmptyPaymentScheduleType>): EmptyPaymentScheduleType {
    const message = createBaseEmptyPaymentScheduleType();
    return message;
  },
  fromAmino(_: EmptyPaymentScheduleTypeAmino): EmptyPaymentScheduleType {
    const message = createBaseEmptyPaymentScheduleType();
    return message;
  },
  toAmino(_: EmptyPaymentScheduleType, useInterfaces: boolean = false): EmptyPaymentScheduleTypeAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: EmptyPaymentScheduleTypeAminoMsg): EmptyPaymentScheduleType {
    return EmptyPaymentScheduleType.fromAmino(object.value);
  },
  fromProtoMsg(message: EmptyPaymentScheduleTypeProtoMsg, useInterfaces: boolean = false): EmptyPaymentScheduleType {
    return EmptyPaymentScheduleType.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EmptyPaymentScheduleType): Uint8Array {
    return EmptyPaymentScheduleType.encode(message).finish();
  },
  toProtoMsg(message: EmptyPaymentScheduleType): EmptyPaymentScheduleTypeProtoMsg {
    return {
      typeUrl: "/neutron.revenue.EmptyPaymentScheduleType",
      value: EmptyPaymentScheduleType.encode(message).finish()
    };
  }
};
function createBasePerformanceRequirement(): PerformanceRequirement {
  return {
    allowedToMiss: "",
    requiredAtLeast: ""
  };
}
export const PerformanceRequirement = {
  typeUrl: "/neutron.revenue.PerformanceRequirement",
  encode(message: PerformanceRequirement, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.allowedToMiss !== "") {
      writer.uint32(10).string(Decimal.fromUserInput(message.allowedToMiss, 18).atomics);
    }
    if (message.requiredAtLeast !== "") {
      writer.uint32(18).string(Decimal.fromUserInput(message.requiredAtLeast, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): PerformanceRequirement {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePerformanceRequirement();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.allowedToMiss = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 2:
          message.requiredAtLeast = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<PerformanceRequirement>): PerformanceRequirement {
    const message = createBasePerformanceRequirement();
    message.allowedToMiss = object.allowedToMiss ?? "";
    message.requiredAtLeast = object.requiredAtLeast ?? "";
    return message;
  },
  fromAmino(object: PerformanceRequirementAmino): PerformanceRequirement {
    const message = createBasePerformanceRequirement();
    if (object.allowed_to_miss !== undefined && object.allowed_to_miss !== null) {
      message.allowedToMiss = object.allowed_to_miss;
    }
    if (object.required_at_least !== undefined && object.required_at_least !== null) {
      message.requiredAtLeast = object.required_at_least;
    }
    return message;
  },
  toAmino(message: PerformanceRequirement, useInterfaces: boolean = false): PerformanceRequirementAmino {
    const obj: any = {};
    obj.allowed_to_miss = message.allowedToMiss === "" ? undefined : message.allowedToMiss;
    obj.required_at_least = message.requiredAtLeast === "" ? undefined : message.requiredAtLeast;
    return obj;
  },
  fromAminoMsg(object: PerformanceRequirementAminoMsg): PerformanceRequirement {
    return PerformanceRequirement.fromAmino(object.value);
  },
  fromProtoMsg(message: PerformanceRequirementProtoMsg, useInterfaces: boolean = false): PerformanceRequirement {
    return PerformanceRequirement.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: PerformanceRequirement): Uint8Array {
    return PerformanceRequirement.encode(message).finish();
  },
  toProtoMsg(message: PerformanceRequirement): PerformanceRequirementProtoMsg {
    return {
      typeUrl: "/neutron.revenue.PerformanceRequirement",
      value: PerformanceRequirement.encode(message).finish()
    };
  }
};