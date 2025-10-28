import { Validator, ValidatorAmino, ValidatorSDKType } from "./validator";
import { BinaryReader, BinaryWriter } from "../../binary";
import { Decimal } from "@cosmjs/math";
/**
 * CommunityPoolRebate stores the size of the community pool liquid stake
 * (denominated in stTokens) and the rebate rate as a decimal
 */
export interface CommunityPoolRebate {
  /** Rebate percentage as a decimal (e.g. 0.2 for 20%) */
  rebateRate: string;
  /** Number of stTokens received from the community pool liquid stake */
  liquidStakedStTokenAmount: string;
}
export interface CommunityPoolRebateProtoMsg {
  typeUrl: "/stride.stakeibc.CommunityPoolRebate";
  value: Uint8Array;
}
/**
 * CommunityPoolRebate stores the size of the community pool liquid stake
 * (denominated in stTokens) and the rebate rate as a decimal
 */
export interface CommunityPoolRebateAmino {
  /** Rebate percentage as a decimal (e.g. 0.2 for 20%) */
  rebate_rate?: string;
  /** Number of stTokens received from the community pool liquid stake */
  liquid_staked_st_token_amount?: string;
}
export interface CommunityPoolRebateAminoMsg {
  type: "/stride.stakeibc.CommunityPoolRebate";
  value: CommunityPoolRebateAmino;
}
/**
 * CommunityPoolRebate stores the size of the community pool liquid stake
 * (denominated in stTokens) and the rebate rate as a decimal
 */
export interface CommunityPoolRebateSDKType {
  rebate_rate: string;
  liquid_staked_st_token_amount: string;
}
/** Core data structure to track liquid staking zones */
export interface HostZone {
  /** Chain ID of the host zone */
  chainId: string;
  /** Bech32 prefix of host zone's address */
  bech32prefix: string;
  /** ConnectionID from Stride to the host zone (ID is on the stride side) */
  connectionId: string;
  /** Transfer Channel ID from Stride to the host zone (ID is on the stride side) */
  transferChannelId: string;
  /** ibc denom of the host zone's native token on stride */
  ibcDenom: string;
  /** native denom on host zone */
  hostDenom: string;
  /** The unbonding period in days (e.g. 21) */
  unbondingPeriod: bigint;
  /** List of validators that are delegated to */
  validators: Validator[];
  /** Address that custodies native tokens during a liquid stake */
  depositAddress: string;
  /** ICA Address on the host zone responsible for collecting rewards */
  withdrawalIcaAddress: string;
  /** ICA Address on the host zone responsible for commission */
  feeIcaAddress: string;
  /** ICA Address on the host zone responsible for staking and unstaking */
  delegationIcaAddress: string;
  /** ICA Address that receives unstaked tokens after they've finished unbonding */
  redemptionIcaAddress: string;
  /**
   * ICA Address that receives tokens from a community pool to liquid stake or
   * redeem In the case of a liquid stake, the community pool deposits native
   * tokens In the case of a redemption, the community pool deposits stTokens
   */
  communityPoolDepositIcaAddress: string;
  /**
   * ICA Address that distributes tokens back to the community pool during a
   * community pool liquid stake or redeem In the case of a liquid stake, the
   * return address sends back stTokens In the case of a redemption, the return
   * address sends back native tokens
   */
  communityPoolReturnIcaAddress: string;
  /**
   * Module account on Stride that receives native tokens from the deposit ICA
   * and liquid stakes them
   */
  communityPoolStakeHoldingAddress: string;
  /**
   * Module account on Stride that receives stTokens from the deposit ICA and
   * redeems them
   */
  communityPoolRedeemHoldingAddress: string;
  /**
   * Optional community pool address to send tokens to after a community pool
   * liquid stake or redemption If this address is empty, the tokens are sent to
   * the main community pool
   */
  communityPoolTreasuryAddress: string;
  /** The total delegated balance on the host zone */
  totalDelegations: string;
  /** The redemption rate from the previous epoch */
  lastRedemptionRate: string;
  /** The current redemption rate */
  redemptionRate: string;
  /**
   * The min outer redemption rate bound - controlled only be governance
   * The min inner bound cannot exceed this bound
   */
  minRedemptionRate: string;
  /**
   * The max outer redemption rate bound - controlled only be governance
   * The max inner bound cannot exceed this bound
   */
  maxRedemptionRate: string;
  /**
   * The min minner redemption rate bound - controlled by the admin
   * If the redemption rate exceeds this bound, the host zone is halted
   */
  minInnerRedemptionRate: string;
  /**
   * The max minner redemption rate bound - controlled by the admin
   * If the redemption rate exceeds this bound, the host zone is halted
   */
  maxInnerRedemptionRate: string;
  /**
   * The max number of messages that can be sent in a delegation
   * or undelegation ICA tx
   */
  maxMessagesPerIcaTx: bigint;
  /** Indicates whether redemptions are allowed through this module */
  redemptionsEnabled: boolean;
  /**
   * An optional fee rebate
   * If there is no rebate for the host zone, this will be nil
   */
  communityPoolRebate?: CommunityPoolRebate | undefined;
  /** A boolean indicating whether the chain has LSM enabled */
  lsmLiquidStakeEnabled: boolean;
  /**
   * A boolean indicating whether the chain is currently halted
   * A host zone is halted if redemption rate bounds are exceeded or it is
   * deprecated
   */
  halted: boolean;
  /**
   * Indicates if the host zone is deprecated and should no longer handle liquid
   * stakes. This is only used as documentation - it doesn't affect any
   * functionality `Halted` is used to stop business logic
   */
  deprecated: boolean;
}
export interface HostZoneProtoMsg {
  typeUrl: "/stride.stakeibc.HostZone";
  value: Uint8Array;
}
/** Core data structure to track liquid staking zones */
export interface HostZoneAmino {
  /** Chain ID of the host zone */
  chain_id?: string;
  /** Bech32 prefix of host zone's address */
  bech32prefix?: string;
  /** ConnectionID from Stride to the host zone (ID is on the stride side) */
  connection_id?: string;
  /** Transfer Channel ID from Stride to the host zone (ID is on the stride side) */
  transfer_channel_id?: string;
  /** ibc denom of the host zone's native token on stride */
  ibc_denom?: string;
  /** native denom on host zone */
  host_denom?: string;
  /** The unbonding period in days (e.g. 21) */
  unbonding_period?: string;
  /** List of validators that are delegated to */
  validators?: ValidatorAmino[];
  /** Address that custodies native tokens during a liquid stake */
  deposit_address?: string;
  /** ICA Address on the host zone responsible for collecting rewards */
  withdrawal_ica_address?: string;
  /** ICA Address on the host zone responsible for commission */
  fee_ica_address?: string;
  /** ICA Address on the host zone responsible for staking and unstaking */
  delegation_ica_address?: string;
  /** ICA Address that receives unstaked tokens after they've finished unbonding */
  redemption_ica_address?: string;
  /**
   * ICA Address that receives tokens from a community pool to liquid stake or
   * redeem In the case of a liquid stake, the community pool deposits native
   * tokens In the case of a redemption, the community pool deposits stTokens
   */
  community_pool_deposit_ica_address?: string;
  /**
   * ICA Address that distributes tokens back to the community pool during a
   * community pool liquid stake or redeem In the case of a liquid stake, the
   * return address sends back stTokens In the case of a redemption, the return
   * address sends back native tokens
   */
  community_pool_return_ica_address?: string;
  /**
   * Module account on Stride that receives native tokens from the deposit ICA
   * and liquid stakes them
   */
  community_pool_stake_holding_address?: string;
  /**
   * Module account on Stride that receives stTokens from the deposit ICA and
   * redeems them
   */
  community_pool_redeem_holding_address?: string;
  /**
   * Optional community pool address to send tokens to after a community pool
   * liquid stake or redemption If this address is empty, the tokens are sent to
   * the main community pool
   */
  community_pool_treasury_address?: string;
  /** The total delegated balance on the host zone */
  total_delegations?: string;
  /** The redemption rate from the previous epoch */
  last_redemption_rate?: string;
  /** The current redemption rate */
  redemption_rate?: string;
  /**
   * The min outer redemption rate bound - controlled only be governance
   * The min inner bound cannot exceed this bound
   */
  min_redemption_rate?: string;
  /**
   * The max outer redemption rate bound - controlled only be governance
   * The max inner bound cannot exceed this bound
   */
  max_redemption_rate?: string;
  /**
   * The min minner redemption rate bound - controlled by the admin
   * If the redemption rate exceeds this bound, the host zone is halted
   */
  min_inner_redemption_rate?: string;
  /**
   * The max minner redemption rate bound - controlled by the admin
   * If the redemption rate exceeds this bound, the host zone is halted
   */
  max_inner_redemption_rate?: string;
  /**
   * The max number of messages that can be sent in a delegation
   * or undelegation ICA tx
   */
  max_messages_per_ica_tx?: string;
  /** Indicates whether redemptions are allowed through this module */
  redemptions_enabled?: boolean;
  /**
   * An optional fee rebate
   * If there is no rebate for the host zone, this will be nil
   */
  community_pool_rebate?: CommunityPoolRebateAmino | undefined;
  /** A boolean indicating whether the chain has LSM enabled */
  lsm_liquid_stake_enabled?: boolean;
  /**
   * A boolean indicating whether the chain is currently halted
   * A host zone is halted if redemption rate bounds are exceeded or it is
   * deprecated
   */
  halted?: boolean;
  /**
   * Indicates if the host zone is deprecated and should no longer handle liquid
   * stakes. This is only used as documentation - it doesn't affect any
   * functionality `Halted` is used to stop business logic
   */
  deprecated?: boolean;
}
export interface HostZoneAminoMsg {
  type: "/stride.stakeibc.HostZone";
  value: HostZoneAmino;
}
/** Core data structure to track liquid staking zones */
export interface HostZoneSDKType {
  chain_id: string;
  bech32prefix: string;
  connection_id: string;
  transfer_channel_id: string;
  ibc_denom: string;
  host_denom: string;
  unbonding_period: bigint;
  validators: ValidatorSDKType[];
  deposit_address: string;
  withdrawal_ica_address: string;
  fee_ica_address: string;
  delegation_ica_address: string;
  redemption_ica_address: string;
  community_pool_deposit_ica_address: string;
  community_pool_return_ica_address: string;
  community_pool_stake_holding_address: string;
  community_pool_redeem_holding_address: string;
  community_pool_treasury_address: string;
  total_delegations: string;
  last_redemption_rate: string;
  redemption_rate: string;
  min_redemption_rate: string;
  max_redemption_rate: string;
  min_inner_redemption_rate: string;
  max_inner_redemption_rate: string;
  max_messages_per_ica_tx: bigint;
  redemptions_enabled: boolean;
  community_pool_rebate?: CommunityPoolRebateSDKType | undefined;
  lsm_liquid_stake_enabled: boolean;
  halted: boolean;
  deprecated: boolean;
}
function createBaseCommunityPoolRebate(): CommunityPoolRebate {
  return {
    rebateRate: "",
    liquidStakedStTokenAmount: ""
  };
}
export const CommunityPoolRebate = {
  typeUrl: "/stride.stakeibc.CommunityPoolRebate",
  encode(message: CommunityPoolRebate, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.rebateRate !== "") {
      writer.uint32(10).string(Decimal.fromUserInput(message.rebateRate, 18).atomics);
    }
    if (message.liquidStakedStTokenAmount !== "") {
      writer.uint32(18).string(message.liquidStakedStTokenAmount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): CommunityPoolRebate {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommunityPoolRebate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rebateRate = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 2:
          message.liquidStakedStTokenAmount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<CommunityPoolRebate>): CommunityPoolRebate {
    const message = createBaseCommunityPoolRebate();
    message.rebateRate = object.rebateRate ?? "";
    message.liquidStakedStTokenAmount = object.liquidStakedStTokenAmount ?? "";
    return message;
  },
  fromAmino(object: CommunityPoolRebateAmino): CommunityPoolRebate {
    const message = createBaseCommunityPoolRebate();
    if (object.rebate_rate !== undefined && object.rebate_rate !== null) {
      message.rebateRate = object.rebate_rate;
    }
    if (object.liquid_staked_st_token_amount !== undefined && object.liquid_staked_st_token_amount !== null) {
      message.liquidStakedStTokenAmount = object.liquid_staked_st_token_amount;
    }
    return message;
  },
  toAmino(message: CommunityPoolRebate, useInterfaces: boolean = false): CommunityPoolRebateAmino {
    const obj: any = {};
    obj.rebate_rate = message.rebateRate === "" ? undefined : message.rebateRate;
    obj.liquid_staked_st_token_amount = message.liquidStakedStTokenAmount === "" ? undefined : message.liquidStakedStTokenAmount;
    return obj;
  },
  fromAminoMsg(object: CommunityPoolRebateAminoMsg): CommunityPoolRebate {
    return CommunityPoolRebate.fromAmino(object.value);
  },
  fromProtoMsg(message: CommunityPoolRebateProtoMsg, useInterfaces: boolean = false): CommunityPoolRebate {
    return CommunityPoolRebate.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: CommunityPoolRebate): Uint8Array {
    return CommunityPoolRebate.encode(message).finish();
  },
  toProtoMsg(message: CommunityPoolRebate): CommunityPoolRebateProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.CommunityPoolRebate",
      value: CommunityPoolRebate.encode(message).finish()
    };
  }
};
function createBaseHostZone(): HostZone {
  return {
    chainId: "",
    bech32prefix: "",
    connectionId: "",
    transferChannelId: "",
    ibcDenom: "",
    hostDenom: "",
    unbondingPeriod: BigInt(0),
    validators: [],
    depositAddress: "",
    withdrawalIcaAddress: "",
    feeIcaAddress: "",
    delegationIcaAddress: "",
    redemptionIcaAddress: "",
    communityPoolDepositIcaAddress: "",
    communityPoolReturnIcaAddress: "",
    communityPoolStakeHoldingAddress: "",
    communityPoolRedeemHoldingAddress: "",
    communityPoolTreasuryAddress: "",
    totalDelegations: "",
    lastRedemptionRate: "",
    redemptionRate: "",
    minRedemptionRate: "",
    maxRedemptionRate: "",
    minInnerRedemptionRate: "",
    maxInnerRedemptionRate: "",
    maxMessagesPerIcaTx: BigInt(0),
    redemptionsEnabled: false,
    communityPoolRebate: undefined,
    lsmLiquidStakeEnabled: false,
    halted: false,
    deprecated: false
  };
}
export const HostZone = {
  typeUrl: "/stride.stakeibc.HostZone",
  encode(message: HostZone, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    if (message.bech32prefix !== "") {
      writer.uint32(138).string(message.bech32prefix);
    }
    if (message.connectionId !== "") {
      writer.uint32(18).string(message.connectionId);
    }
    if (message.transferChannelId !== "") {
      writer.uint32(98).string(message.transferChannelId);
    }
    if (message.ibcDenom !== "") {
      writer.uint32(66).string(message.ibcDenom);
    }
    if (message.hostDenom !== "") {
      writer.uint32(74).string(message.hostDenom);
    }
    if (message.unbondingPeriod !== BigInt(0)) {
      writer.uint32(208).uint64(message.unbondingPeriod);
    }
    for (const v of message.validators) {
      Validator.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.depositAddress !== "") {
      writer.uint32(146).string(message.depositAddress);
    }
    if (message.withdrawalIcaAddress !== "") {
      writer.uint32(178).string(message.withdrawalIcaAddress);
    }
    if (message.feeIcaAddress !== "") {
      writer.uint32(186).string(message.feeIcaAddress);
    }
    if (message.delegationIcaAddress !== "") {
      writer.uint32(194).string(message.delegationIcaAddress);
    }
    if (message.redemptionIcaAddress !== "") {
      writer.uint32(202).string(message.redemptionIcaAddress);
    }
    if (message.communityPoolDepositIcaAddress !== "") {
      writer.uint32(242).string(message.communityPoolDepositIcaAddress);
    }
    if (message.communityPoolReturnIcaAddress !== "") {
      writer.uint32(250).string(message.communityPoolReturnIcaAddress);
    }
    if (message.communityPoolStakeHoldingAddress !== "") {
      writer.uint32(258).string(message.communityPoolStakeHoldingAddress);
    }
    if (message.communityPoolRedeemHoldingAddress !== "") {
      writer.uint32(266).string(message.communityPoolRedeemHoldingAddress);
    }
    if (message.communityPoolTreasuryAddress !== "") {
      writer.uint32(282).string(message.communityPoolTreasuryAddress);
    }
    if (message.totalDelegations !== "") {
      writer.uint32(106).string(message.totalDelegations);
    }
    if (message.lastRedemptionRate !== "") {
      writer.uint32(82).string(Decimal.fromUserInput(message.lastRedemptionRate, 18).atomics);
    }
    if (message.redemptionRate !== "") {
      writer.uint32(90).string(Decimal.fromUserInput(message.redemptionRate, 18).atomics);
    }
    if (message.minRedemptionRate !== "") {
      writer.uint32(162).string(Decimal.fromUserInput(message.minRedemptionRate, 18).atomics);
    }
    if (message.maxRedemptionRate !== "") {
      writer.uint32(170).string(Decimal.fromUserInput(message.maxRedemptionRate, 18).atomics);
    }
    if (message.minInnerRedemptionRate !== "") {
      writer.uint32(226).string(Decimal.fromUserInput(message.minInnerRedemptionRate, 18).atomics);
    }
    if (message.maxInnerRedemptionRate !== "") {
      writer.uint32(234).string(Decimal.fromUserInput(message.maxInnerRedemptionRate, 18).atomics);
    }
    if (message.maxMessagesPerIcaTx !== BigInt(0)) {
      writer.uint32(288).uint64(message.maxMessagesPerIcaTx);
    }
    if (message.redemptionsEnabled === true) {
      writer.uint32(296).bool(message.redemptionsEnabled);
    }
    if (message.communityPoolRebate !== undefined) {
      CommunityPoolRebate.encode(message.communityPoolRebate, writer.uint32(274).fork()).ldelim();
    }
    if (message.lsmLiquidStakeEnabled === true) {
      writer.uint32(216).bool(message.lsmLiquidStakeEnabled);
    }
    if (message.halted === true) {
      writer.uint32(152).bool(message.halted);
    }
    if (message.deprecated === true) {
      writer.uint32(304).bool(message.deprecated);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): HostZone {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostZone();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        case 17:
          message.bech32prefix = reader.string();
          break;
        case 2:
          message.connectionId = reader.string();
          break;
        case 12:
          message.transferChannelId = reader.string();
          break;
        case 8:
          message.ibcDenom = reader.string();
          break;
        case 9:
          message.hostDenom = reader.string();
          break;
        case 26:
          message.unbondingPeriod = reader.uint64();
          break;
        case 3:
          message.validators.push(Validator.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 18:
          message.depositAddress = reader.string();
          break;
        case 22:
          message.withdrawalIcaAddress = reader.string();
          break;
        case 23:
          message.feeIcaAddress = reader.string();
          break;
        case 24:
          message.delegationIcaAddress = reader.string();
          break;
        case 25:
          message.redemptionIcaAddress = reader.string();
          break;
        case 30:
          message.communityPoolDepositIcaAddress = reader.string();
          break;
        case 31:
          message.communityPoolReturnIcaAddress = reader.string();
          break;
        case 32:
          message.communityPoolStakeHoldingAddress = reader.string();
          break;
        case 33:
          message.communityPoolRedeemHoldingAddress = reader.string();
          break;
        case 35:
          message.communityPoolTreasuryAddress = reader.string();
          break;
        case 13:
          message.totalDelegations = reader.string();
          break;
        case 10:
          message.lastRedemptionRate = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 11:
          message.redemptionRate = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 20:
          message.minRedemptionRate = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 21:
          message.maxRedemptionRate = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 28:
          message.minInnerRedemptionRate = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 29:
          message.maxInnerRedemptionRate = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 36:
          message.maxMessagesPerIcaTx = reader.uint64();
          break;
        case 37:
          message.redemptionsEnabled = reader.bool();
          break;
        case 34:
          message.communityPoolRebate = CommunityPoolRebate.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 27:
          message.lsmLiquidStakeEnabled = reader.bool();
          break;
        case 19:
          message.halted = reader.bool();
          break;
        case 38:
          message.deprecated = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<HostZone>): HostZone {
    const message = createBaseHostZone();
    message.chainId = object.chainId ?? "";
    message.bech32prefix = object.bech32prefix ?? "";
    message.connectionId = object.connectionId ?? "";
    message.transferChannelId = object.transferChannelId ?? "";
    message.ibcDenom = object.ibcDenom ?? "";
    message.hostDenom = object.hostDenom ?? "";
    message.unbondingPeriod = object.unbondingPeriod !== undefined && object.unbondingPeriod !== null ? BigInt(object.unbondingPeriod.toString()) : BigInt(0);
    message.validators = object.validators?.map(e => Validator.fromPartial(e)) || [];
    message.depositAddress = object.depositAddress ?? "";
    message.withdrawalIcaAddress = object.withdrawalIcaAddress ?? "";
    message.feeIcaAddress = object.feeIcaAddress ?? "";
    message.delegationIcaAddress = object.delegationIcaAddress ?? "";
    message.redemptionIcaAddress = object.redemptionIcaAddress ?? "";
    message.communityPoolDepositIcaAddress = object.communityPoolDepositIcaAddress ?? "";
    message.communityPoolReturnIcaAddress = object.communityPoolReturnIcaAddress ?? "";
    message.communityPoolStakeHoldingAddress = object.communityPoolStakeHoldingAddress ?? "";
    message.communityPoolRedeemHoldingAddress = object.communityPoolRedeemHoldingAddress ?? "";
    message.communityPoolTreasuryAddress = object.communityPoolTreasuryAddress ?? "";
    message.totalDelegations = object.totalDelegations ?? "";
    message.lastRedemptionRate = object.lastRedemptionRate ?? "";
    message.redemptionRate = object.redemptionRate ?? "";
    message.minRedemptionRate = object.minRedemptionRate ?? "";
    message.maxRedemptionRate = object.maxRedemptionRate ?? "";
    message.minInnerRedemptionRate = object.minInnerRedemptionRate ?? "";
    message.maxInnerRedemptionRate = object.maxInnerRedemptionRate ?? "";
    message.maxMessagesPerIcaTx = object.maxMessagesPerIcaTx !== undefined && object.maxMessagesPerIcaTx !== null ? BigInt(object.maxMessagesPerIcaTx.toString()) : BigInt(0);
    message.redemptionsEnabled = object.redemptionsEnabled ?? false;
    message.communityPoolRebate = object.communityPoolRebate !== undefined && object.communityPoolRebate !== null ? CommunityPoolRebate.fromPartial(object.communityPoolRebate) : undefined;
    message.lsmLiquidStakeEnabled = object.lsmLiquidStakeEnabled ?? false;
    message.halted = object.halted ?? false;
    message.deprecated = object.deprecated ?? false;
    return message;
  },
  fromAmino(object: HostZoneAmino): HostZone {
    const message = createBaseHostZone();
    if (object.chain_id !== undefined && object.chain_id !== null) {
      message.chainId = object.chain_id;
    }
    if (object.bech32prefix !== undefined && object.bech32prefix !== null) {
      message.bech32prefix = object.bech32prefix;
    }
    if (object.connection_id !== undefined && object.connection_id !== null) {
      message.connectionId = object.connection_id;
    }
    if (object.transfer_channel_id !== undefined && object.transfer_channel_id !== null) {
      message.transferChannelId = object.transfer_channel_id;
    }
    if (object.ibc_denom !== undefined && object.ibc_denom !== null) {
      message.ibcDenom = object.ibc_denom;
    }
    if (object.host_denom !== undefined && object.host_denom !== null) {
      message.hostDenom = object.host_denom;
    }
    if (object.unbonding_period !== undefined && object.unbonding_period !== null) {
      message.unbondingPeriod = BigInt(object.unbonding_period);
    }
    message.validators = object.validators?.map(e => Validator.fromAmino(e)) || [];
    if (object.deposit_address !== undefined && object.deposit_address !== null) {
      message.depositAddress = object.deposit_address;
    }
    if (object.withdrawal_ica_address !== undefined && object.withdrawal_ica_address !== null) {
      message.withdrawalIcaAddress = object.withdrawal_ica_address;
    }
    if (object.fee_ica_address !== undefined && object.fee_ica_address !== null) {
      message.feeIcaAddress = object.fee_ica_address;
    }
    if (object.delegation_ica_address !== undefined && object.delegation_ica_address !== null) {
      message.delegationIcaAddress = object.delegation_ica_address;
    }
    if (object.redemption_ica_address !== undefined && object.redemption_ica_address !== null) {
      message.redemptionIcaAddress = object.redemption_ica_address;
    }
    if (object.community_pool_deposit_ica_address !== undefined && object.community_pool_deposit_ica_address !== null) {
      message.communityPoolDepositIcaAddress = object.community_pool_deposit_ica_address;
    }
    if (object.community_pool_return_ica_address !== undefined && object.community_pool_return_ica_address !== null) {
      message.communityPoolReturnIcaAddress = object.community_pool_return_ica_address;
    }
    if (object.community_pool_stake_holding_address !== undefined && object.community_pool_stake_holding_address !== null) {
      message.communityPoolStakeHoldingAddress = object.community_pool_stake_holding_address;
    }
    if (object.community_pool_redeem_holding_address !== undefined && object.community_pool_redeem_holding_address !== null) {
      message.communityPoolRedeemHoldingAddress = object.community_pool_redeem_holding_address;
    }
    if (object.community_pool_treasury_address !== undefined && object.community_pool_treasury_address !== null) {
      message.communityPoolTreasuryAddress = object.community_pool_treasury_address;
    }
    if (object.total_delegations !== undefined && object.total_delegations !== null) {
      message.totalDelegations = object.total_delegations;
    }
    if (object.last_redemption_rate !== undefined && object.last_redemption_rate !== null) {
      message.lastRedemptionRate = object.last_redemption_rate;
    }
    if (object.redemption_rate !== undefined && object.redemption_rate !== null) {
      message.redemptionRate = object.redemption_rate;
    }
    if (object.min_redemption_rate !== undefined && object.min_redemption_rate !== null) {
      message.minRedemptionRate = object.min_redemption_rate;
    }
    if (object.max_redemption_rate !== undefined && object.max_redemption_rate !== null) {
      message.maxRedemptionRate = object.max_redemption_rate;
    }
    if (object.min_inner_redemption_rate !== undefined && object.min_inner_redemption_rate !== null) {
      message.minInnerRedemptionRate = object.min_inner_redemption_rate;
    }
    if (object.max_inner_redemption_rate !== undefined && object.max_inner_redemption_rate !== null) {
      message.maxInnerRedemptionRate = object.max_inner_redemption_rate;
    }
    if (object.max_messages_per_ica_tx !== undefined && object.max_messages_per_ica_tx !== null) {
      message.maxMessagesPerIcaTx = BigInt(object.max_messages_per_ica_tx);
    }
    if (object.redemptions_enabled !== undefined && object.redemptions_enabled !== null) {
      message.redemptionsEnabled = object.redemptions_enabled;
    }
    if (object.community_pool_rebate !== undefined && object.community_pool_rebate !== null) {
      message.communityPoolRebate = CommunityPoolRebate.fromAmino(object.community_pool_rebate);
    }
    if (object.lsm_liquid_stake_enabled !== undefined && object.lsm_liquid_stake_enabled !== null) {
      message.lsmLiquidStakeEnabled = object.lsm_liquid_stake_enabled;
    }
    if (object.halted !== undefined && object.halted !== null) {
      message.halted = object.halted;
    }
    if (object.deprecated !== undefined && object.deprecated !== null) {
      message.deprecated = object.deprecated;
    }
    return message;
  },
  toAmino(message: HostZone, useInterfaces: boolean = false): HostZoneAmino {
    const obj: any = {};
    obj.chain_id = message.chainId === "" ? undefined : message.chainId;
    obj.bech32prefix = message.bech32prefix === "" ? undefined : message.bech32prefix;
    obj.connection_id = message.connectionId === "" ? undefined : message.connectionId;
    obj.transfer_channel_id = message.transferChannelId === "" ? undefined : message.transferChannelId;
    obj.ibc_denom = message.ibcDenom === "" ? undefined : message.ibcDenom;
    obj.host_denom = message.hostDenom === "" ? undefined : message.hostDenom;
    obj.unbonding_period = message.unbondingPeriod !== BigInt(0) ? message.unbondingPeriod.toString() : undefined;
    if (message.validators) {
      obj.validators = message.validators.map(e => e ? Validator.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.validators = message.validators;
    }
    obj.deposit_address = message.depositAddress === "" ? undefined : message.depositAddress;
    obj.withdrawal_ica_address = message.withdrawalIcaAddress === "" ? undefined : message.withdrawalIcaAddress;
    obj.fee_ica_address = message.feeIcaAddress === "" ? undefined : message.feeIcaAddress;
    obj.delegation_ica_address = message.delegationIcaAddress === "" ? undefined : message.delegationIcaAddress;
    obj.redemption_ica_address = message.redemptionIcaAddress === "" ? undefined : message.redemptionIcaAddress;
    obj.community_pool_deposit_ica_address = message.communityPoolDepositIcaAddress === "" ? undefined : message.communityPoolDepositIcaAddress;
    obj.community_pool_return_ica_address = message.communityPoolReturnIcaAddress === "" ? undefined : message.communityPoolReturnIcaAddress;
    obj.community_pool_stake_holding_address = message.communityPoolStakeHoldingAddress === "" ? undefined : message.communityPoolStakeHoldingAddress;
    obj.community_pool_redeem_holding_address = message.communityPoolRedeemHoldingAddress === "" ? undefined : message.communityPoolRedeemHoldingAddress;
    obj.community_pool_treasury_address = message.communityPoolTreasuryAddress === "" ? undefined : message.communityPoolTreasuryAddress;
    obj.total_delegations = message.totalDelegations === "" ? undefined : message.totalDelegations;
    obj.last_redemption_rate = message.lastRedemptionRate === "" ? undefined : message.lastRedemptionRate;
    obj.redemption_rate = message.redemptionRate === "" ? undefined : message.redemptionRate;
    obj.min_redemption_rate = message.minRedemptionRate === "" ? undefined : message.minRedemptionRate;
    obj.max_redemption_rate = message.maxRedemptionRate === "" ? undefined : message.maxRedemptionRate;
    obj.min_inner_redemption_rate = message.minInnerRedemptionRate === "" ? undefined : message.minInnerRedemptionRate;
    obj.max_inner_redemption_rate = message.maxInnerRedemptionRate === "" ? undefined : message.maxInnerRedemptionRate;
    obj.max_messages_per_ica_tx = message.maxMessagesPerIcaTx !== BigInt(0) ? message.maxMessagesPerIcaTx.toString() : undefined;
    obj.redemptions_enabled = message.redemptionsEnabled === false ? undefined : message.redemptionsEnabled;
    obj.community_pool_rebate = message.communityPoolRebate ? CommunityPoolRebate.toAmino(message.communityPoolRebate, useInterfaces) : undefined;
    obj.lsm_liquid_stake_enabled = message.lsmLiquidStakeEnabled === false ? undefined : message.lsmLiquidStakeEnabled;
    obj.halted = message.halted === false ? undefined : message.halted;
    obj.deprecated = message.deprecated === false ? undefined : message.deprecated;
    return obj;
  },
  fromAminoMsg(object: HostZoneAminoMsg): HostZone {
    return HostZone.fromAmino(object.value);
  },
  fromProtoMsg(message: HostZoneProtoMsg, useInterfaces: boolean = false): HostZone {
    return HostZone.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: HostZone): Uint8Array {
    return HostZone.encode(message).finish();
  },
  toProtoMsg(message: HostZone): HostZoneProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.HostZone",
      value: HostZone.encode(message).finish()
    };
  }
};