import { Coin, CoinAmino, CoinSDKType } from "../../cosmos/base/v1beta1/coin";
import { LSMTokenDeposit, LSMTokenDepositAmino, LSMTokenDepositSDKType } from "../records/records";
import { HostZone, HostZoneAmino, HostZoneSDKType } from "./host_zone";
import { Validator, ValidatorAmino, ValidatorSDKType } from "./validator";
import { ICAAccountType } from "./ica_account";
import { BinaryReader, BinaryWriter } from "../../binary";
export interface SplitDelegation {
  validator: string;
  amount: string;
}
export interface SplitDelegationProtoMsg {
  typeUrl: "/stride.stakeibc.SplitDelegation";
  value: Uint8Array;
}
export interface SplitDelegationAmino {
  validator?: string;
  amount?: string;
}
export interface SplitDelegationAminoMsg {
  type: "/stride.stakeibc.SplitDelegation";
  value: SplitDelegationAmino;
}
export interface SplitDelegationSDKType {
  validator: string;
  amount: string;
}
export interface SplitUndelegation {
  validator: string;
  nativeTokenAmount: string;
}
export interface SplitUndelegationProtoMsg {
  typeUrl: "/stride.stakeibc.SplitUndelegation";
  value: Uint8Array;
}
export interface SplitUndelegationAmino {
  validator?: string;
  native_token_amount?: string;
}
export interface SplitUndelegationAminoMsg {
  type: "/stride.stakeibc.SplitUndelegation";
  value: SplitUndelegationAmino;
}
export interface SplitUndelegationSDKType {
  validator: string;
  native_token_amount: string;
}
export interface DelegateCallback {
  hostZoneId: string;
  depositRecordId: bigint;
  splitDelegations: SplitDelegation[];
}
export interface DelegateCallbackProtoMsg {
  typeUrl: "/stride.stakeibc.DelegateCallback";
  value: Uint8Array;
}
export interface DelegateCallbackAmino {
  host_zone_id?: string;
  deposit_record_id?: string;
  split_delegations?: SplitDelegationAmino[];
}
export interface DelegateCallbackAminoMsg {
  type: "/stride.stakeibc.DelegateCallback";
  value: DelegateCallbackAmino;
}
export interface DelegateCallbackSDKType {
  host_zone_id: string;
  deposit_record_id: bigint;
  split_delegations: SplitDelegationSDKType[];
}
export interface ClaimCallback {
  userRedemptionRecordId: string;
  chainId: string;
  epochNumber: bigint;
}
export interface ClaimCallbackProtoMsg {
  typeUrl: "/stride.stakeibc.ClaimCallback";
  value: Uint8Array;
}
export interface ClaimCallbackAmino {
  user_redemption_record_id?: string;
  chain_id?: string;
  epoch_number?: string;
}
export interface ClaimCallbackAminoMsg {
  type: "/stride.stakeibc.ClaimCallback";
  value: ClaimCallbackAmino;
}
export interface ClaimCallbackSDKType {
  user_redemption_record_id: string;
  chain_id: string;
  epoch_number: bigint;
}
export interface ReinvestCallback {
  reinvestAmount: Coin | undefined;
  hostZoneId: string;
}
export interface ReinvestCallbackProtoMsg {
  typeUrl: "/stride.stakeibc.ReinvestCallback";
  value: Uint8Array;
}
export interface ReinvestCallbackAmino {
  reinvest_amount?: CoinAmino | undefined;
  host_zone_id?: string;
}
export interface ReinvestCallbackAminoMsg {
  type: "/stride.stakeibc.ReinvestCallback";
  value: ReinvestCallbackAmino;
}
export interface ReinvestCallbackSDKType {
  reinvest_amount: CoinSDKType | undefined;
  host_zone_id: string;
}
export interface UndelegateCallback {
  hostZoneId: string;
  splitUndelegations: SplitUndelegation[];
  epochUnbondingRecordIds: bigint[];
}
export interface UndelegateCallbackProtoMsg {
  typeUrl: "/stride.stakeibc.UndelegateCallback";
  value: Uint8Array;
}
export interface UndelegateCallbackAmino {
  host_zone_id?: string;
  split_undelegations?: SplitUndelegationAmino[];
  epoch_unbonding_record_ids?: string[];
}
export interface UndelegateCallbackAminoMsg {
  type: "/stride.stakeibc.UndelegateCallback";
  value: UndelegateCallbackAmino;
}
export interface UndelegateCallbackSDKType {
  host_zone_id: string;
  split_undelegations: SplitUndelegationSDKType[];
  epoch_unbonding_record_ids: bigint[];
}
export interface RedemptionCallback {
  hostZoneId: string;
  epochUnbondingRecordIds: bigint[];
}
export interface RedemptionCallbackProtoMsg {
  typeUrl: "/stride.stakeibc.RedemptionCallback";
  value: Uint8Array;
}
export interface RedemptionCallbackAmino {
  host_zone_id?: string;
  epoch_unbonding_record_ids?: string[];
}
export interface RedemptionCallbackAminoMsg {
  type: "/stride.stakeibc.RedemptionCallback";
  value: RedemptionCallbackAmino;
}
export interface RedemptionCallbackSDKType {
  host_zone_id: string;
  epoch_unbonding_record_ids: bigint[];
}
export interface Rebalancing {
  srcValidator: string;
  dstValidator: string;
  amt: string;
}
export interface RebalancingProtoMsg {
  typeUrl: "/stride.stakeibc.Rebalancing";
  value: Uint8Array;
}
export interface RebalancingAmino {
  src_validator?: string;
  dst_validator?: string;
  amt?: string;
}
export interface RebalancingAminoMsg {
  type: "/stride.stakeibc.Rebalancing";
  value: RebalancingAmino;
}
export interface RebalancingSDKType {
  src_validator: string;
  dst_validator: string;
  amt: string;
}
export interface RebalanceCallback {
  hostZoneId: string;
  rebalancings: Rebalancing[];
}
export interface RebalanceCallbackProtoMsg {
  typeUrl: "/stride.stakeibc.RebalanceCallback";
  value: Uint8Array;
}
export interface RebalanceCallbackAmino {
  host_zone_id?: string;
  rebalancings?: RebalancingAmino[];
}
export interface RebalanceCallbackAminoMsg {
  type: "/stride.stakeibc.RebalanceCallback";
  value: RebalanceCallbackAmino;
}
export interface RebalanceCallbackSDKType {
  host_zone_id: string;
  rebalancings: RebalancingSDKType[];
}
export interface DetokenizeSharesCallback {
  deposit?: LSMTokenDeposit | undefined;
}
export interface DetokenizeSharesCallbackProtoMsg {
  typeUrl: "/stride.stakeibc.DetokenizeSharesCallback";
  value: Uint8Array;
}
export interface DetokenizeSharesCallbackAmino {
  deposit?: LSMTokenDepositAmino | undefined;
}
export interface DetokenizeSharesCallbackAminoMsg {
  type: "/stride.stakeibc.DetokenizeSharesCallback";
  value: DetokenizeSharesCallbackAmino;
}
export interface DetokenizeSharesCallbackSDKType {
  deposit?: LSMTokenDepositSDKType | undefined;
}
export interface LSMLiquidStake {
  deposit?: LSMTokenDeposit | undefined;
  hostZone?: HostZone | undefined;
  validator?: Validator | undefined;
}
export interface LSMLiquidStakeProtoMsg {
  typeUrl: "/stride.stakeibc.LSMLiquidStake";
  value: Uint8Array;
}
export interface LSMLiquidStakeAmino {
  deposit?: LSMTokenDepositAmino | undefined;
  host_zone?: HostZoneAmino | undefined;
  validator?: ValidatorAmino | undefined;
}
export interface LSMLiquidStakeAminoMsg {
  type: "/stride.stakeibc.LSMLiquidStake";
  value: LSMLiquidStakeAmino;
}
export interface LSMLiquidStakeSDKType {
  deposit?: LSMTokenDepositSDKType | undefined;
  host_zone?: HostZoneSDKType | undefined;
  validator?: ValidatorSDKType | undefined;
}
export interface ValidatorSharesToTokensQueryCallback {
  lsmLiquidStake?: LSMLiquidStake | undefined;
}
export interface ValidatorSharesToTokensQueryCallbackProtoMsg {
  typeUrl: "/stride.stakeibc.ValidatorSharesToTokensQueryCallback";
  value: Uint8Array;
}
export interface ValidatorSharesToTokensQueryCallbackAmino {
  lsm_liquid_stake?: LSMLiquidStakeAmino | undefined;
}
export interface ValidatorSharesToTokensQueryCallbackAminoMsg {
  type: "/stride.stakeibc.ValidatorSharesToTokensQueryCallback";
  value: ValidatorSharesToTokensQueryCallbackAmino;
}
export interface ValidatorSharesToTokensQueryCallbackSDKType {
  lsm_liquid_stake?: LSMLiquidStakeSDKType | undefined;
}
export interface DelegatorSharesQueryCallback {
  /** Validator delegation at the time the query is submitted */
  initialValidatorDelegation: string;
}
export interface DelegatorSharesQueryCallbackProtoMsg {
  typeUrl: "/stride.stakeibc.DelegatorSharesQueryCallback";
  value: Uint8Array;
}
export interface DelegatorSharesQueryCallbackAmino {
  /** Validator delegation at the time the query is submitted */
  initial_validator_delegation?: string;
}
export interface DelegatorSharesQueryCallbackAminoMsg {
  type: "/stride.stakeibc.DelegatorSharesQueryCallback";
  value: DelegatorSharesQueryCallbackAmino;
}
export interface DelegatorSharesQueryCallbackSDKType {
  initial_validator_delegation: string;
}
export interface CommunityPoolBalanceQueryCallback {
  icaType: ICAAccountType;
  denom: string;
}
export interface CommunityPoolBalanceQueryCallbackProtoMsg {
  typeUrl: "/stride.stakeibc.CommunityPoolBalanceQueryCallback";
  value: Uint8Array;
}
export interface CommunityPoolBalanceQueryCallbackAmino {
  ica_type?: ICAAccountType;
  denom?: string;
}
export interface CommunityPoolBalanceQueryCallbackAminoMsg {
  type: "/stride.stakeibc.CommunityPoolBalanceQueryCallback";
  value: CommunityPoolBalanceQueryCallbackAmino;
}
export interface CommunityPoolBalanceQueryCallbackSDKType {
  ica_type: ICAAccountType;
  denom: string;
}
export interface TradeRouteCallback {
  rewardDenom: string;
  hostDenom: string;
}
export interface TradeRouteCallbackProtoMsg {
  typeUrl: "/stride.stakeibc.TradeRouteCallback";
  value: Uint8Array;
}
export interface TradeRouteCallbackAmino {
  reward_denom?: string;
  host_denom?: string;
}
export interface TradeRouteCallbackAminoMsg {
  type: "/stride.stakeibc.TradeRouteCallback";
  value: TradeRouteCallbackAmino;
}
export interface TradeRouteCallbackSDKType {
  reward_denom: string;
  host_denom: string;
}
function createBaseSplitDelegation(): SplitDelegation {
  return {
    validator: "",
    amount: ""
  };
}
export const SplitDelegation = {
  typeUrl: "/stride.stakeibc.SplitDelegation",
  encode(message: SplitDelegation, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.validator !== "") {
      writer.uint32(10).string(message.validator);
    }
    if (message.amount !== "") {
      writer.uint32(18).string(message.amount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): SplitDelegation {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSplitDelegation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validator = reader.string();
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
  fromPartial(object: Partial<SplitDelegation>): SplitDelegation {
    const message = createBaseSplitDelegation();
    message.validator = object.validator ?? "";
    message.amount = object.amount ?? "";
    return message;
  },
  fromAmino(object: SplitDelegationAmino): SplitDelegation {
    const message = createBaseSplitDelegation();
    if (object.validator !== undefined && object.validator !== null) {
      message.validator = object.validator;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    }
    return message;
  },
  toAmino(message: SplitDelegation, useInterfaces: boolean = false): SplitDelegationAmino {
    const obj: any = {};
    obj.validator = message.validator === "" ? undefined : message.validator;
    obj.amount = message.amount === "" ? undefined : message.amount;
    return obj;
  },
  fromAminoMsg(object: SplitDelegationAminoMsg): SplitDelegation {
    return SplitDelegation.fromAmino(object.value);
  },
  fromProtoMsg(message: SplitDelegationProtoMsg, useInterfaces: boolean = false): SplitDelegation {
    return SplitDelegation.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: SplitDelegation): Uint8Array {
    return SplitDelegation.encode(message).finish();
  },
  toProtoMsg(message: SplitDelegation): SplitDelegationProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.SplitDelegation",
      value: SplitDelegation.encode(message).finish()
    };
  }
};
function createBaseSplitUndelegation(): SplitUndelegation {
  return {
    validator: "",
    nativeTokenAmount: ""
  };
}
export const SplitUndelegation = {
  typeUrl: "/stride.stakeibc.SplitUndelegation",
  encode(message: SplitUndelegation, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.validator !== "") {
      writer.uint32(10).string(message.validator);
    }
    if (message.nativeTokenAmount !== "") {
      writer.uint32(18).string(message.nativeTokenAmount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): SplitUndelegation {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSplitUndelegation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validator = reader.string();
          break;
        case 2:
          message.nativeTokenAmount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<SplitUndelegation>): SplitUndelegation {
    const message = createBaseSplitUndelegation();
    message.validator = object.validator ?? "";
    message.nativeTokenAmount = object.nativeTokenAmount ?? "";
    return message;
  },
  fromAmino(object: SplitUndelegationAmino): SplitUndelegation {
    const message = createBaseSplitUndelegation();
    if (object.validator !== undefined && object.validator !== null) {
      message.validator = object.validator;
    }
    if (object.native_token_amount !== undefined && object.native_token_amount !== null) {
      message.nativeTokenAmount = object.native_token_amount;
    }
    return message;
  },
  toAmino(message: SplitUndelegation, useInterfaces: boolean = false): SplitUndelegationAmino {
    const obj: any = {};
    obj.validator = message.validator === "" ? undefined : message.validator;
    obj.native_token_amount = message.nativeTokenAmount === "" ? undefined : message.nativeTokenAmount;
    return obj;
  },
  fromAminoMsg(object: SplitUndelegationAminoMsg): SplitUndelegation {
    return SplitUndelegation.fromAmino(object.value);
  },
  fromProtoMsg(message: SplitUndelegationProtoMsg, useInterfaces: boolean = false): SplitUndelegation {
    return SplitUndelegation.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: SplitUndelegation): Uint8Array {
    return SplitUndelegation.encode(message).finish();
  },
  toProtoMsg(message: SplitUndelegation): SplitUndelegationProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.SplitUndelegation",
      value: SplitUndelegation.encode(message).finish()
    };
  }
};
function createBaseDelegateCallback(): DelegateCallback {
  return {
    hostZoneId: "",
    depositRecordId: BigInt(0),
    splitDelegations: []
  };
}
export const DelegateCallback = {
  typeUrl: "/stride.stakeibc.DelegateCallback",
  encode(message: DelegateCallback, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.hostZoneId !== "") {
      writer.uint32(10).string(message.hostZoneId);
    }
    if (message.depositRecordId !== BigInt(0)) {
      writer.uint32(16).uint64(message.depositRecordId);
    }
    for (const v of message.splitDelegations) {
      SplitDelegation.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): DelegateCallback {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDelegateCallback();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hostZoneId = reader.string();
          break;
        case 2:
          message.depositRecordId = reader.uint64();
          break;
        case 3:
          message.splitDelegations.push(SplitDelegation.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<DelegateCallback>): DelegateCallback {
    const message = createBaseDelegateCallback();
    message.hostZoneId = object.hostZoneId ?? "";
    message.depositRecordId = object.depositRecordId !== undefined && object.depositRecordId !== null ? BigInt(object.depositRecordId.toString()) : BigInt(0);
    message.splitDelegations = object.splitDelegations?.map(e => SplitDelegation.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: DelegateCallbackAmino): DelegateCallback {
    const message = createBaseDelegateCallback();
    if (object.host_zone_id !== undefined && object.host_zone_id !== null) {
      message.hostZoneId = object.host_zone_id;
    }
    if (object.deposit_record_id !== undefined && object.deposit_record_id !== null) {
      message.depositRecordId = BigInt(object.deposit_record_id);
    }
    message.splitDelegations = object.split_delegations?.map(e => SplitDelegation.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: DelegateCallback, useInterfaces: boolean = false): DelegateCallbackAmino {
    const obj: any = {};
    obj.host_zone_id = message.hostZoneId === "" ? undefined : message.hostZoneId;
    obj.deposit_record_id = message.depositRecordId !== BigInt(0) ? message.depositRecordId.toString() : undefined;
    if (message.splitDelegations) {
      obj.split_delegations = message.splitDelegations.map(e => e ? SplitDelegation.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.split_delegations = message.splitDelegations;
    }
    return obj;
  },
  fromAminoMsg(object: DelegateCallbackAminoMsg): DelegateCallback {
    return DelegateCallback.fromAmino(object.value);
  },
  fromProtoMsg(message: DelegateCallbackProtoMsg, useInterfaces: boolean = false): DelegateCallback {
    return DelegateCallback.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: DelegateCallback): Uint8Array {
    return DelegateCallback.encode(message).finish();
  },
  toProtoMsg(message: DelegateCallback): DelegateCallbackProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.DelegateCallback",
      value: DelegateCallback.encode(message).finish()
    };
  }
};
function createBaseClaimCallback(): ClaimCallback {
  return {
    userRedemptionRecordId: "",
    chainId: "",
    epochNumber: BigInt(0)
  };
}
export const ClaimCallback = {
  typeUrl: "/stride.stakeibc.ClaimCallback",
  encode(message: ClaimCallback, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.userRedemptionRecordId !== "") {
      writer.uint32(10).string(message.userRedemptionRecordId);
    }
    if (message.chainId !== "") {
      writer.uint32(18).string(message.chainId);
    }
    if (message.epochNumber !== BigInt(0)) {
      writer.uint32(24).uint64(message.epochNumber);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ClaimCallback {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClaimCallback();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userRedemptionRecordId = reader.string();
          break;
        case 2:
          message.chainId = reader.string();
          break;
        case 3:
          message.epochNumber = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ClaimCallback>): ClaimCallback {
    const message = createBaseClaimCallback();
    message.userRedemptionRecordId = object.userRedemptionRecordId ?? "";
    message.chainId = object.chainId ?? "";
    message.epochNumber = object.epochNumber !== undefined && object.epochNumber !== null ? BigInt(object.epochNumber.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: ClaimCallbackAmino): ClaimCallback {
    const message = createBaseClaimCallback();
    if (object.user_redemption_record_id !== undefined && object.user_redemption_record_id !== null) {
      message.userRedemptionRecordId = object.user_redemption_record_id;
    }
    if (object.chain_id !== undefined && object.chain_id !== null) {
      message.chainId = object.chain_id;
    }
    if (object.epoch_number !== undefined && object.epoch_number !== null) {
      message.epochNumber = BigInt(object.epoch_number);
    }
    return message;
  },
  toAmino(message: ClaimCallback, useInterfaces: boolean = false): ClaimCallbackAmino {
    const obj: any = {};
    obj.user_redemption_record_id = message.userRedemptionRecordId === "" ? undefined : message.userRedemptionRecordId;
    obj.chain_id = message.chainId === "" ? undefined : message.chainId;
    obj.epoch_number = message.epochNumber !== BigInt(0) ? message.epochNumber.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: ClaimCallbackAminoMsg): ClaimCallback {
    return ClaimCallback.fromAmino(object.value);
  },
  fromProtoMsg(message: ClaimCallbackProtoMsg, useInterfaces: boolean = false): ClaimCallback {
    return ClaimCallback.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ClaimCallback): Uint8Array {
    return ClaimCallback.encode(message).finish();
  },
  toProtoMsg(message: ClaimCallback): ClaimCallbackProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.ClaimCallback",
      value: ClaimCallback.encode(message).finish()
    };
  }
};
function createBaseReinvestCallback(): ReinvestCallback {
  return {
    reinvestAmount: Coin.fromPartial({}),
    hostZoneId: ""
  };
}
export const ReinvestCallback = {
  typeUrl: "/stride.stakeibc.ReinvestCallback",
  encode(message: ReinvestCallback, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.reinvestAmount !== undefined) {
      Coin.encode(message.reinvestAmount, writer.uint32(10).fork()).ldelim();
    }
    if (message.hostZoneId !== "") {
      writer.uint32(26).string(message.hostZoneId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ReinvestCallback {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReinvestCallback();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.reinvestAmount = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.hostZoneId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ReinvestCallback>): ReinvestCallback {
    const message = createBaseReinvestCallback();
    message.reinvestAmount = object.reinvestAmount !== undefined && object.reinvestAmount !== null ? Coin.fromPartial(object.reinvestAmount) : undefined;
    message.hostZoneId = object.hostZoneId ?? "";
    return message;
  },
  fromAmino(object: ReinvestCallbackAmino): ReinvestCallback {
    const message = createBaseReinvestCallback();
    if (object.reinvest_amount !== undefined && object.reinvest_amount !== null) {
      message.reinvestAmount = Coin.fromAmino(object.reinvest_amount);
    }
    if (object.host_zone_id !== undefined && object.host_zone_id !== null) {
      message.hostZoneId = object.host_zone_id;
    }
    return message;
  },
  toAmino(message: ReinvestCallback, useInterfaces: boolean = false): ReinvestCallbackAmino {
    const obj: any = {};
    obj.reinvest_amount = message.reinvestAmount ? Coin.toAmino(message.reinvestAmount, useInterfaces) : undefined;
    obj.host_zone_id = message.hostZoneId === "" ? undefined : message.hostZoneId;
    return obj;
  },
  fromAminoMsg(object: ReinvestCallbackAminoMsg): ReinvestCallback {
    return ReinvestCallback.fromAmino(object.value);
  },
  fromProtoMsg(message: ReinvestCallbackProtoMsg, useInterfaces: boolean = false): ReinvestCallback {
    return ReinvestCallback.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ReinvestCallback): Uint8Array {
    return ReinvestCallback.encode(message).finish();
  },
  toProtoMsg(message: ReinvestCallback): ReinvestCallbackProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.ReinvestCallback",
      value: ReinvestCallback.encode(message).finish()
    };
  }
};
function createBaseUndelegateCallback(): UndelegateCallback {
  return {
    hostZoneId: "",
    splitUndelegations: [],
    epochUnbondingRecordIds: []
  };
}
export const UndelegateCallback = {
  typeUrl: "/stride.stakeibc.UndelegateCallback",
  encode(message: UndelegateCallback, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.hostZoneId !== "") {
      writer.uint32(10).string(message.hostZoneId);
    }
    for (const v of message.splitUndelegations) {
      SplitUndelegation.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    writer.uint32(26).fork();
    for (const v of message.epochUnbondingRecordIds) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): UndelegateCallback {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUndelegateCallback();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hostZoneId = reader.string();
          break;
        case 2:
          message.splitUndelegations.push(SplitUndelegation.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 3:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.epochUnbondingRecordIds.push(reader.uint64());
            }
          } else {
            message.epochUnbondingRecordIds.push(reader.uint64());
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<UndelegateCallback>): UndelegateCallback {
    const message = createBaseUndelegateCallback();
    message.hostZoneId = object.hostZoneId ?? "";
    message.splitUndelegations = object.splitUndelegations?.map(e => SplitUndelegation.fromPartial(e)) || [];
    message.epochUnbondingRecordIds = object.epochUnbondingRecordIds?.map(e => BigInt(e.toString())) || [];
    return message;
  },
  fromAmino(object: UndelegateCallbackAmino): UndelegateCallback {
    const message = createBaseUndelegateCallback();
    if (object.host_zone_id !== undefined && object.host_zone_id !== null) {
      message.hostZoneId = object.host_zone_id;
    }
    message.splitUndelegations = object.split_undelegations?.map(e => SplitUndelegation.fromAmino(e)) || [];
    message.epochUnbondingRecordIds = object.epoch_unbonding_record_ids?.map(e => BigInt(e)) || [];
    return message;
  },
  toAmino(message: UndelegateCallback, useInterfaces: boolean = false): UndelegateCallbackAmino {
    const obj: any = {};
    obj.host_zone_id = message.hostZoneId === "" ? undefined : message.hostZoneId;
    if (message.splitUndelegations) {
      obj.split_undelegations = message.splitUndelegations.map(e => e ? SplitUndelegation.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.split_undelegations = message.splitUndelegations;
    }
    if (message.epochUnbondingRecordIds) {
      obj.epoch_unbonding_record_ids = message.epochUnbondingRecordIds.map(e => e.toString());
    } else {
      obj.epoch_unbonding_record_ids = message.epochUnbondingRecordIds;
    }
    return obj;
  },
  fromAminoMsg(object: UndelegateCallbackAminoMsg): UndelegateCallback {
    return UndelegateCallback.fromAmino(object.value);
  },
  fromProtoMsg(message: UndelegateCallbackProtoMsg, useInterfaces: boolean = false): UndelegateCallback {
    return UndelegateCallback.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: UndelegateCallback): Uint8Array {
    return UndelegateCallback.encode(message).finish();
  },
  toProtoMsg(message: UndelegateCallback): UndelegateCallbackProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.UndelegateCallback",
      value: UndelegateCallback.encode(message).finish()
    };
  }
};
function createBaseRedemptionCallback(): RedemptionCallback {
  return {
    hostZoneId: "",
    epochUnbondingRecordIds: []
  };
}
export const RedemptionCallback = {
  typeUrl: "/stride.stakeibc.RedemptionCallback",
  encode(message: RedemptionCallback, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.hostZoneId !== "") {
      writer.uint32(10).string(message.hostZoneId);
    }
    writer.uint32(18).fork();
    for (const v of message.epochUnbondingRecordIds) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): RedemptionCallback {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRedemptionCallback();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hostZoneId = reader.string();
          break;
        case 2:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.epochUnbondingRecordIds.push(reader.uint64());
            }
          } else {
            message.epochUnbondingRecordIds.push(reader.uint64());
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<RedemptionCallback>): RedemptionCallback {
    const message = createBaseRedemptionCallback();
    message.hostZoneId = object.hostZoneId ?? "";
    message.epochUnbondingRecordIds = object.epochUnbondingRecordIds?.map(e => BigInt(e.toString())) || [];
    return message;
  },
  fromAmino(object: RedemptionCallbackAmino): RedemptionCallback {
    const message = createBaseRedemptionCallback();
    if (object.host_zone_id !== undefined && object.host_zone_id !== null) {
      message.hostZoneId = object.host_zone_id;
    }
    message.epochUnbondingRecordIds = object.epoch_unbonding_record_ids?.map(e => BigInt(e)) || [];
    return message;
  },
  toAmino(message: RedemptionCallback, useInterfaces: boolean = false): RedemptionCallbackAmino {
    const obj: any = {};
    obj.host_zone_id = message.hostZoneId === "" ? undefined : message.hostZoneId;
    if (message.epochUnbondingRecordIds) {
      obj.epoch_unbonding_record_ids = message.epochUnbondingRecordIds.map(e => e.toString());
    } else {
      obj.epoch_unbonding_record_ids = message.epochUnbondingRecordIds;
    }
    return obj;
  },
  fromAminoMsg(object: RedemptionCallbackAminoMsg): RedemptionCallback {
    return RedemptionCallback.fromAmino(object.value);
  },
  fromProtoMsg(message: RedemptionCallbackProtoMsg, useInterfaces: boolean = false): RedemptionCallback {
    return RedemptionCallback.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: RedemptionCallback): Uint8Array {
    return RedemptionCallback.encode(message).finish();
  },
  toProtoMsg(message: RedemptionCallback): RedemptionCallbackProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.RedemptionCallback",
      value: RedemptionCallback.encode(message).finish()
    };
  }
};
function createBaseRebalancing(): Rebalancing {
  return {
    srcValidator: "",
    dstValidator: "",
    amt: ""
  };
}
export const Rebalancing = {
  typeUrl: "/stride.stakeibc.Rebalancing",
  encode(message: Rebalancing, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.srcValidator !== "") {
      writer.uint32(10).string(message.srcValidator);
    }
    if (message.dstValidator !== "") {
      writer.uint32(18).string(message.dstValidator);
    }
    if (message.amt !== "") {
      writer.uint32(26).string(message.amt);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): Rebalancing {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRebalancing();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.srcValidator = reader.string();
          break;
        case 2:
          message.dstValidator = reader.string();
          break;
        case 3:
          message.amt = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Rebalancing>): Rebalancing {
    const message = createBaseRebalancing();
    message.srcValidator = object.srcValidator ?? "";
    message.dstValidator = object.dstValidator ?? "";
    message.amt = object.amt ?? "";
    return message;
  },
  fromAmino(object: RebalancingAmino): Rebalancing {
    const message = createBaseRebalancing();
    if (object.src_validator !== undefined && object.src_validator !== null) {
      message.srcValidator = object.src_validator;
    }
    if (object.dst_validator !== undefined && object.dst_validator !== null) {
      message.dstValidator = object.dst_validator;
    }
    if (object.amt !== undefined && object.amt !== null) {
      message.amt = object.amt;
    }
    return message;
  },
  toAmino(message: Rebalancing, useInterfaces: boolean = false): RebalancingAmino {
    const obj: any = {};
    obj.src_validator = message.srcValidator === "" ? undefined : message.srcValidator;
    obj.dst_validator = message.dstValidator === "" ? undefined : message.dstValidator;
    obj.amt = message.amt === "" ? undefined : message.amt;
    return obj;
  },
  fromAminoMsg(object: RebalancingAminoMsg): Rebalancing {
    return Rebalancing.fromAmino(object.value);
  },
  fromProtoMsg(message: RebalancingProtoMsg, useInterfaces: boolean = false): Rebalancing {
    return Rebalancing.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Rebalancing): Uint8Array {
    return Rebalancing.encode(message).finish();
  },
  toProtoMsg(message: Rebalancing): RebalancingProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.Rebalancing",
      value: Rebalancing.encode(message).finish()
    };
  }
};
function createBaseRebalanceCallback(): RebalanceCallback {
  return {
    hostZoneId: "",
    rebalancings: []
  };
}
export const RebalanceCallback = {
  typeUrl: "/stride.stakeibc.RebalanceCallback",
  encode(message: RebalanceCallback, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.hostZoneId !== "") {
      writer.uint32(10).string(message.hostZoneId);
    }
    for (const v of message.rebalancings) {
      Rebalancing.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): RebalanceCallback {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRebalanceCallback();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hostZoneId = reader.string();
          break;
        case 2:
          message.rebalancings.push(Rebalancing.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<RebalanceCallback>): RebalanceCallback {
    const message = createBaseRebalanceCallback();
    message.hostZoneId = object.hostZoneId ?? "";
    message.rebalancings = object.rebalancings?.map(e => Rebalancing.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: RebalanceCallbackAmino): RebalanceCallback {
    const message = createBaseRebalanceCallback();
    if (object.host_zone_id !== undefined && object.host_zone_id !== null) {
      message.hostZoneId = object.host_zone_id;
    }
    message.rebalancings = object.rebalancings?.map(e => Rebalancing.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: RebalanceCallback, useInterfaces: boolean = false): RebalanceCallbackAmino {
    const obj: any = {};
    obj.host_zone_id = message.hostZoneId === "" ? undefined : message.hostZoneId;
    if (message.rebalancings) {
      obj.rebalancings = message.rebalancings.map(e => e ? Rebalancing.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.rebalancings = message.rebalancings;
    }
    return obj;
  },
  fromAminoMsg(object: RebalanceCallbackAminoMsg): RebalanceCallback {
    return RebalanceCallback.fromAmino(object.value);
  },
  fromProtoMsg(message: RebalanceCallbackProtoMsg, useInterfaces: boolean = false): RebalanceCallback {
    return RebalanceCallback.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: RebalanceCallback): Uint8Array {
    return RebalanceCallback.encode(message).finish();
  },
  toProtoMsg(message: RebalanceCallback): RebalanceCallbackProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.RebalanceCallback",
      value: RebalanceCallback.encode(message).finish()
    };
  }
};
function createBaseDetokenizeSharesCallback(): DetokenizeSharesCallback {
  return {
    deposit: undefined
  };
}
export const DetokenizeSharesCallback = {
  typeUrl: "/stride.stakeibc.DetokenizeSharesCallback",
  encode(message: DetokenizeSharesCallback, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.deposit !== undefined) {
      LSMTokenDeposit.encode(message.deposit, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): DetokenizeSharesCallback {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDetokenizeSharesCallback();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.deposit = LSMTokenDeposit.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<DetokenizeSharesCallback>): DetokenizeSharesCallback {
    const message = createBaseDetokenizeSharesCallback();
    message.deposit = object.deposit !== undefined && object.deposit !== null ? LSMTokenDeposit.fromPartial(object.deposit) : undefined;
    return message;
  },
  fromAmino(object: DetokenizeSharesCallbackAmino): DetokenizeSharesCallback {
    const message = createBaseDetokenizeSharesCallback();
    if (object.deposit !== undefined && object.deposit !== null) {
      message.deposit = LSMTokenDeposit.fromAmino(object.deposit);
    }
    return message;
  },
  toAmino(message: DetokenizeSharesCallback, useInterfaces: boolean = false): DetokenizeSharesCallbackAmino {
    const obj: any = {};
    obj.deposit = message.deposit ? LSMTokenDeposit.toAmino(message.deposit, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: DetokenizeSharesCallbackAminoMsg): DetokenizeSharesCallback {
    return DetokenizeSharesCallback.fromAmino(object.value);
  },
  fromProtoMsg(message: DetokenizeSharesCallbackProtoMsg, useInterfaces: boolean = false): DetokenizeSharesCallback {
    return DetokenizeSharesCallback.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: DetokenizeSharesCallback): Uint8Array {
    return DetokenizeSharesCallback.encode(message).finish();
  },
  toProtoMsg(message: DetokenizeSharesCallback): DetokenizeSharesCallbackProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.DetokenizeSharesCallback",
      value: DetokenizeSharesCallback.encode(message).finish()
    };
  }
};
function createBaseLSMLiquidStake(): LSMLiquidStake {
  return {
    deposit: undefined,
    hostZone: undefined,
    validator: undefined
  };
}
export const LSMLiquidStake = {
  typeUrl: "/stride.stakeibc.LSMLiquidStake",
  encode(message: LSMLiquidStake, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.deposit !== undefined) {
      LSMTokenDeposit.encode(message.deposit, writer.uint32(10).fork()).ldelim();
    }
    if (message.hostZone !== undefined) {
      HostZone.encode(message.hostZone, writer.uint32(18).fork()).ldelim();
    }
    if (message.validator !== undefined) {
      Validator.encode(message.validator, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): LSMLiquidStake {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLSMLiquidStake();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.deposit = LSMTokenDeposit.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.hostZone = HostZone.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.validator = Validator.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<LSMLiquidStake>): LSMLiquidStake {
    const message = createBaseLSMLiquidStake();
    message.deposit = object.deposit !== undefined && object.deposit !== null ? LSMTokenDeposit.fromPartial(object.deposit) : undefined;
    message.hostZone = object.hostZone !== undefined && object.hostZone !== null ? HostZone.fromPartial(object.hostZone) : undefined;
    message.validator = object.validator !== undefined && object.validator !== null ? Validator.fromPartial(object.validator) : undefined;
    return message;
  },
  fromAmino(object: LSMLiquidStakeAmino): LSMLiquidStake {
    const message = createBaseLSMLiquidStake();
    if (object.deposit !== undefined && object.deposit !== null) {
      message.deposit = LSMTokenDeposit.fromAmino(object.deposit);
    }
    if (object.host_zone !== undefined && object.host_zone !== null) {
      message.hostZone = HostZone.fromAmino(object.host_zone);
    }
    if (object.validator !== undefined && object.validator !== null) {
      message.validator = Validator.fromAmino(object.validator);
    }
    return message;
  },
  toAmino(message: LSMLiquidStake, useInterfaces: boolean = false): LSMLiquidStakeAmino {
    const obj: any = {};
    obj.deposit = message.deposit ? LSMTokenDeposit.toAmino(message.deposit, useInterfaces) : undefined;
    obj.host_zone = message.hostZone ? HostZone.toAmino(message.hostZone, useInterfaces) : undefined;
    obj.validator = message.validator ? Validator.toAmino(message.validator, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: LSMLiquidStakeAminoMsg): LSMLiquidStake {
    return LSMLiquidStake.fromAmino(object.value);
  },
  fromProtoMsg(message: LSMLiquidStakeProtoMsg, useInterfaces: boolean = false): LSMLiquidStake {
    return LSMLiquidStake.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: LSMLiquidStake): Uint8Array {
    return LSMLiquidStake.encode(message).finish();
  },
  toProtoMsg(message: LSMLiquidStake): LSMLiquidStakeProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.LSMLiquidStake",
      value: LSMLiquidStake.encode(message).finish()
    };
  }
};
function createBaseValidatorSharesToTokensQueryCallback(): ValidatorSharesToTokensQueryCallback {
  return {
    lsmLiquidStake: undefined
  };
}
export const ValidatorSharesToTokensQueryCallback = {
  typeUrl: "/stride.stakeibc.ValidatorSharesToTokensQueryCallback",
  encode(message: ValidatorSharesToTokensQueryCallback, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.lsmLiquidStake !== undefined) {
      LSMLiquidStake.encode(message.lsmLiquidStake, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ValidatorSharesToTokensQueryCallback {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidatorSharesToTokensQueryCallback();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.lsmLiquidStake = LSMLiquidStake.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ValidatorSharesToTokensQueryCallback>): ValidatorSharesToTokensQueryCallback {
    const message = createBaseValidatorSharesToTokensQueryCallback();
    message.lsmLiquidStake = object.lsmLiquidStake !== undefined && object.lsmLiquidStake !== null ? LSMLiquidStake.fromPartial(object.lsmLiquidStake) : undefined;
    return message;
  },
  fromAmino(object: ValidatorSharesToTokensQueryCallbackAmino): ValidatorSharesToTokensQueryCallback {
    const message = createBaseValidatorSharesToTokensQueryCallback();
    if (object.lsm_liquid_stake !== undefined && object.lsm_liquid_stake !== null) {
      message.lsmLiquidStake = LSMLiquidStake.fromAmino(object.lsm_liquid_stake);
    }
    return message;
  },
  toAmino(message: ValidatorSharesToTokensQueryCallback, useInterfaces: boolean = false): ValidatorSharesToTokensQueryCallbackAmino {
    const obj: any = {};
    obj.lsm_liquid_stake = message.lsmLiquidStake ? LSMLiquidStake.toAmino(message.lsmLiquidStake, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: ValidatorSharesToTokensQueryCallbackAminoMsg): ValidatorSharesToTokensQueryCallback {
    return ValidatorSharesToTokensQueryCallback.fromAmino(object.value);
  },
  fromProtoMsg(message: ValidatorSharesToTokensQueryCallbackProtoMsg, useInterfaces: boolean = false): ValidatorSharesToTokensQueryCallback {
    return ValidatorSharesToTokensQueryCallback.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ValidatorSharesToTokensQueryCallback): Uint8Array {
    return ValidatorSharesToTokensQueryCallback.encode(message).finish();
  },
  toProtoMsg(message: ValidatorSharesToTokensQueryCallback): ValidatorSharesToTokensQueryCallbackProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.ValidatorSharesToTokensQueryCallback",
      value: ValidatorSharesToTokensQueryCallback.encode(message).finish()
    };
  }
};
function createBaseDelegatorSharesQueryCallback(): DelegatorSharesQueryCallback {
  return {
    initialValidatorDelegation: ""
  };
}
export const DelegatorSharesQueryCallback = {
  typeUrl: "/stride.stakeibc.DelegatorSharesQueryCallback",
  encode(message: DelegatorSharesQueryCallback, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.initialValidatorDelegation !== "") {
      writer.uint32(10).string(message.initialValidatorDelegation);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): DelegatorSharesQueryCallback {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDelegatorSharesQueryCallback();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.initialValidatorDelegation = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<DelegatorSharesQueryCallback>): DelegatorSharesQueryCallback {
    const message = createBaseDelegatorSharesQueryCallback();
    message.initialValidatorDelegation = object.initialValidatorDelegation ?? "";
    return message;
  },
  fromAmino(object: DelegatorSharesQueryCallbackAmino): DelegatorSharesQueryCallback {
    const message = createBaseDelegatorSharesQueryCallback();
    if (object.initial_validator_delegation !== undefined && object.initial_validator_delegation !== null) {
      message.initialValidatorDelegation = object.initial_validator_delegation;
    }
    return message;
  },
  toAmino(message: DelegatorSharesQueryCallback, useInterfaces: boolean = false): DelegatorSharesQueryCallbackAmino {
    const obj: any = {};
    obj.initial_validator_delegation = message.initialValidatorDelegation === "" ? undefined : message.initialValidatorDelegation;
    return obj;
  },
  fromAminoMsg(object: DelegatorSharesQueryCallbackAminoMsg): DelegatorSharesQueryCallback {
    return DelegatorSharesQueryCallback.fromAmino(object.value);
  },
  fromProtoMsg(message: DelegatorSharesQueryCallbackProtoMsg, useInterfaces: boolean = false): DelegatorSharesQueryCallback {
    return DelegatorSharesQueryCallback.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: DelegatorSharesQueryCallback): Uint8Array {
    return DelegatorSharesQueryCallback.encode(message).finish();
  },
  toProtoMsg(message: DelegatorSharesQueryCallback): DelegatorSharesQueryCallbackProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.DelegatorSharesQueryCallback",
      value: DelegatorSharesQueryCallback.encode(message).finish()
    };
  }
};
function createBaseCommunityPoolBalanceQueryCallback(): CommunityPoolBalanceQueryCallback {
  return {
    icaType: 0,
    denom: ""
  };
}
export const CommunityPoolBalanceQueryCallback = {
  typeUrl: "/stride.stakeibc.CommunityPoolBalanceQueryCallback",
  encode(message: CommunityPoolBalanceQueryCallback, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.icaType !== 0) {
      writer.uint32(8).int32(message.icaType);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): CommunityPoolBalanceQueryCallback {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommunityPoolBalanceQueryCallback();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.icaType = (reader.int32() as any);
          break;
        case 2:
          message.denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<CommunityPoolBalanceQueryCallback>): CommunityPoolBalanceQueryCallback {
    const message = createBaseCommunityPoolBalanceQueryCallback();
    message.icaType = object.icaType ?? 0;
    message.denom = object.denom ?? "";
    return message;
  },
  fromAmino(object: CommunityPoolBalanceQueryCallbackAmino): CommunityPoolBalanceQueryCallback {
    const message = createBaseCommunityPoolBalanceQueryCallback();
    if (object.ica_type !== undefined && object.ica_type !== null) {
      message.icaType = object.ica_type;
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    return message;
  },
  toAmino(message: CommunityPoolBalanceQueryCallback, useInterfaces: boolean = false): CommunityPoolBalanceQueryCallbackAmino {
    const obj: any = {};
    obj.ica_type = message.icaType === 0 ? undefined : message.icaType;
    obj.denom = message.denom === "" ? undefined : message.denom;
    return obj;
  },
  fromAminoMsg(object: CommunityPoolBalanceQueryCallbackAminoMsg): CommunityPoolBalanceQueryCallback {
    return CommunityPoolBalanceQueryCallback.fromAmino(object.value);
  },
  fromProtoMsg(message: CommunityPoolBalanceQueryCallbackProtoMsg, useInterfaces: boolean = false): CommunityPoolBalanceQueryCallback {
    return CommunityPoolBalanceQueryCallback.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: CommunityPoolBalanceQueryCallback): Uint8Array {
    return CommunityPoolBalanceQueryCallback.encode(message).finish();
  },
  toProtoMsg(message: CommunityPoolBalanceQueryCallback): CommunityPoolBalanceQueryCallbackProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.CommunityPoolBalanceQueryCallback",
      value: CommunityPoolBalanceQueryCallback.encode(message).finish()
    };
  }
};
function createBaseTradeRouteCallback(): TradeRouteCallback {
  return {
    rewardDenom: "",
    hostDenom: ""
  };
}
export const TradeRouteCallback = {
  typeUrl: "/stride.stakeibc.TradeRouteCallback",
  encode(message: TradeRouteCallback, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.rewardDenom !== "") {
      writer.uint32(10).string(message.rewardDenom);
    }
    if (message.hostDenom !== "") {
      writer.uint32(18).string(message.hostDenom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): TradeRouteCallback {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTradeRouteCallback();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rewardDenom = reader.string();
          break;
        case 2:
          message.hostDenom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<TradeRouteCallback>): TradeRouteCallback {
    const message = createBaseTradeRouteCallback();
    message.rewardDenom = object.rewardDenom ?? "";
    message.hostDenom = object.hostDenom ?? "";
    return message;
  },
  fromAmino(object: TradeRouteCallbackAmino): TradeRouteCallback {
    const message = createBaseTradeRouteCallback();
    if (object.reward_denom !== undefined && object.reward_denom !== null) {
      message.rewardDenom = object.reward_denom;
    }
    if (object.host_denom !== undefined && object.host_denom !== null) {
      message.hostDenom = object.host_denom;
    }
    return message;
  },
  toAmino(message: TradeRouteCallback, useInterfaces: boolean = false): TradeRouteCallbackAmino {
    const obj: any = {};
    obj.reward_denom = message.rewardDenom === "" ? undefined : message.rewardDenom;
    obj.host_denom = message.hostDenom === "" ? undefined : message.hostDenom;
    return obj;
  },
  fromAminoMsg(object: TradeRouteCallbackAminoMsg): TradeRouteCallback {
    return TradeRouteCallback.fromAmino(object.value);
  },
  fromProtoMsg(message: TradeRouteCallbackProtoMsg, useInterfaces: boolean = false): TradeRouteCallback {
    return TradeRouteCallback.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: TradeRouteCallback): Uint8Array {
    return TradeRouteCallback.encode(message).finish();
  },
  toProtoMsg(message: TradeRouteCallback): TradeRouteCallbackProtoMsg {
    return {
      typeUrl: "/stride.stakeibc.TradeRouteCallback",
      value: TradeRouteCallback.encode(message).finish()
    };
  }
};