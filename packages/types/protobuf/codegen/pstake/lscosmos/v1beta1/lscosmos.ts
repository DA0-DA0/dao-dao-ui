import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { Timestamp } from "../../../google/protobuf/timestamp";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { Decimal } from "@cosmjs/math";
import { toTimestamp, fromTimestamp } from "../../../helpers";
export interface AllowListedValidators {
  allowListedValidators: AllowListedValidator[];
}
export interface AllowListedValidatorsProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.AllowListedValidators";
  value: Uint8Array;
}
export interface AllowListedValidatorsAmino {
  allow_listed_validators?: AllowListedValidatorAmino[];
}
export interface AllowListedValidatorsAminoMsg {
  type: "/pstake.lscosmos.v1beta1.AllowListedValidators";
  value: AllowListedValidatorsAmino;
}
export interface AllowListedValidatorsSDKType {
  allow_listed_validators: AllowListedValidatorSDKType[];
}
export interface AllowListedValidator {
  /**
   * validator_address defines the bech32-encoded address the allowlisted
   * validator
   */
  validatorAddress: string;
  /**
   * target_weight specifies the target weight for liquid staking, unstaking
   * amount, which is a value for calculating the real weight to be derived
   * according to the active status
   */
  targetWeight: string;
}
export interface AllowListedValidatorProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.AllowListedValidator";
  value: Uint8Array;
}
export interface AllowListedValidatorAmino {
  /**
   * validator_address defines the bech32-encoded address the allowlisted
   * validator
   */
  validator_address?: string;
  /**
   * target_weight specifies the target weight for liquid staking, unstaking
   * amount, which is a value for calculating the real weight to be derived
   * according to the active status
   */
  target_weight?: string;
}
export interface AllowListedValidatorAminoMsg {
  type: "/pstake.lscosmos.v1beta1.AllowListedValidator";
  value: AllowListedValidatorAmino;
}
export interface AllowListedValidatorSDKType {
  validator_address: string;
  target_weight: string;
}
export interface PstakeParams {
  pstakeDepositFee: string;
  pstakeRestakeFee: string;
  pstakeUnstakeFee: string;
  pstakeRedemptionFee: string;
  pstakeFeeAddress: string;
}
export interface PstakeParamsProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.PstakeParams";
  value: Uint8Array;
}
export interface PstakeParamsAmino {
  pstake_deposit_fee?: string;
  pstake_restake_fee?: string;
  pstake_unstake_fee?: string;
  pstake_redemption_fee?: string;
  pstake_fee_address?: string;
}
export interface PstakeParamsAminoMsg {
  type: "/pstake.lscosmos.v1beta1.PstakeParams";
  value: PstakeParamsAmino;
}
export interface PstakeParamsSDKType {
  pstake_deposit_fee: string;
  pstake_restake_fee: string;
  pstake_unstake_fee: string;
  pstake_redemption_fee: string;
  pstake_fee_address: string;
}
/** HostChainParams go into the DB */
export interface HostChainParams {
  chainID: string;
  connectionID: string;
  transferChannel: string;
  transferPort: string;
  baseDenom: string;
  mintDenom: string;
  minDeposit: string;
  pstakeParams: PstakeParams | undefined;
}
export interface HostChainParamsProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.HostChainParams";
  value: Uint8Array;
}
/** HostChainParams go into the DB */
export interface HostChainParamsAmino {
  chain_i_d?: string;
  connection_i_d?: string;
  transfer_channel?: string;
  transfer_port?: string;
  base_denom?: string;
  mint_denom?: string;
  min_deposit?: string;
  pstake_params?: PstakeParamsAmino | undefined;
}
export interface HostChainParamsAminoMsg {
  type: "/pstake.lscosmos.v1beta1.HostChainParams";
  value: HostChainParamsAmino;
}
/** HostChainParams go into the DB */
export interface HostChainParamsSDKType {
  chain_i_d: string;
  connection_i_d: string;
  transfer_channel: string;
  transfer_port: string;
  base_denom: string;
  mint_denom: string;
  min_deposit: string;
  pstake_params: PstakeParamsSDKType | undefined;
}
/**
 * DelegationState stores module account balance, ica account balance,
 * delegation state, undelegation state
 */
export interface DelegationState {
  /**
   * This field is necessary as the address of not blocked for send coins,
   * we only should care about funds that have come via proper channels.
   */
  hostDelegationAccountBalance: Coin[];
  hostChainDelegationAddress: string;
  hostAccountDelegations: HostAccountDelegation[];
  hostAccountUndelegations: HostAccountUndelegation[];
}
export interface DelegationStateProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.DelegationState";
  value: Uint8Array;
}
/**
 * DelegationState stores module account balance, ica account balance,
 * delegation state, undelegation state
 */
export interface DelegationStateAmino {
  /**
   * This field is necessary as the address of not blocked for send coins,
   * we only should care about funds that have come via proper channels.
   */
  host_delegation_account_balance?: CoinAmino[];
  host_chain_delegation_address?: string;
  host_account_delegations?: HostAccountDelegationAmino[];
  host_account_undelegations?: HostAccountUndelegationAmino[];
}
export interface DelegationStateAminoMsg {
  type: "/pstake.lscosmos.v1beta1.DelegationState";
  value: DelegationStateAmino;
}
/**
 * DelegationState stores module account balance, ica account balance,
 * delegation state, undelegation state
 */
export interface DelegationStateSDKType {
  host_delegation_account_balance: CoinSDKType[];
  host_chain_delegation_address: string;
  host_account_delegations: HostAccountDelegationSDKType[];
  host_account_undelegations: HostAccountUndelegationSDKType[];
}
export interface HostAccountDelegation {
  validatorAddress: string;
  amount: Coin | undefined;
}
export interface HostAccountDelegationProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.HostAccountDelegation";
  value: Uint8Array;
}
export interface HostAccountDelegationAmino {
  validator_address?: string;
  amount?: CoinAmino | undefined;
}
export interface HostAccountDelegationAminoMsg {
  type: "/pstake.lscosmos.v1beta1.HostAccountDelegation";
  value: HostAccountDelegationAmino;
}
export interface HostAccountDelegationSDKType {
  validator_address: string;
  amount: CoinSDKType | undefined;
}
export interface HostAccountUndelegation {
  epochNumber: bigint;
  totalUndelegationAmount: Coin | undefined;
  completionTime: Date | undefined;
  undelegationEntries: UndelegationEntry[];
}
export interface HostAccountUndelegationProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.HostAccountUndelegation";
  value: Uint8Array;
}
export interface HostAccountUndelegationAmino {
  epoch_number?: string;
  total_undelegation_amount?: CoinAmino | undefined;
  completion_time?: string | undefined;
  undelegation_entries?: UndelegationEntryAmino[];
}
export interface HostAccountUndelegationAminoMsg {
  type: "/pstake.lscosmos.v1beta1.HostAccountUndelegation";
  value: HostAccountUndelegationAmino;
}
export interface HostAccountUndelegationSDKType {
  epoch_number: bigint;
  total_undelegation_amount: CoinSDKType | undefined;
  completion_time: Date | undefined;
  undelegation_entries: UndelegationEntrySDKType[];
}
export interface UndelegationEntry {
  validatorAddress: string;
  amount: Coin | undefined;
}
export interface UndelegationEntryProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.UndelegationEntry";
  value: Uint8Array;
}
export interface UndelegationEntryAmino {
  validator_address?: string;
  amount?: CoinAmino | undefined;
}
export interface UndelegationEntryAminoMsg {
  type: "/pstake.lscosmos.v1beta1.UndelegationEntry";
  value: UndelegationEntryAmino;
}
export interface UndelegationEntrySDKType {
  validator_address: string;
  amount: CoinSDKType | undefined;
}
export interface HostChainRewardAddress {
  address: string;
}
export interface HostChainRewardAddressProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.HostChainRewardAddress";
  value: Uint8Array;
}
export interface HostChainRewardAddressAmino {
  address?: string;
}
export interface HostChainRewardAddressAminoMsg {
  type: "/pstake.lscosmos.v1beta1.HostChainRewardAddress";
  value: HostChainRewardAddressAmino;
}
export interface HostChainRewardAddressSDKType {
  address: string;
}
export interface IBCAmountTransientStore {
  /** ibc_transfer stores only tokens which have ibc denoms "ibc/HEXHASH" */
  iBCTransfer: Coin[];
  /** ica_delegate stores only token which has staking baseDenom */
  iCADelegate: Coin | undefined;
  undelegatonCompleteIBCTransfer: TransientUndelegationTransfer[];
}
export interface IBCAmountTransientStoreProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.IBCAmountTransientStore";
  value: Uint8Array;
}
export interface IBCAmountTransientStoreAmino {
  /** ibc_transfer stores only tokens which have ibc denoms "ibc/HEXHASH" */
  i_b_c_transfer?: CoinAmino[];
  /** ica_delegate stores only token which has staking baseDenom */
  i_c_a_delegate?: CoinAmino | undefined;
  undelegaton_complete_i_b_c_transfer?: TransientUndelegationTransferAmino[];
}
export interface IBCAmountTransientStoreAminoMsg {
  type: "/pstake.lscosmos.v1beta1.IBCAmountTransientStore";
  value: IBCAmountTransientStoreAmino;
}
export interface IBCAmountTransientStoreSDKType {
  i_b_c_transfer: CoinSDKType[];
  i_c_a_delegate: CoinSDKType | undefined;
  undelegaton_complete_i_b_c_transfer: TransientUndelegationTransferSDKType[];
}
export interface TransientUndelegationTransfer {
  epochNumber: bigint;
  amountUnbonded: Coin | undefined;
}
export interface TransientUndelegationTransferProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.TransientUndelegationTransfer";
  value: Uint8Array;
}
export interface TransientUndelegationTransferAmino {
  epoch_number?: string;
  amount_unbonded?: CoinAmino | undefined;
}
export interface TransientUndelegationTransferAminoMsg {
  type: "/pstake.lscosmos.v1beta1.TransientUndelegationTransfer";
  value: TransientUndelegationTransferAmino;
}
export interface TransientUndelegationTransferSDKType {
  epoch_number: bigint;
  amount_unbonded: CoinSDKType | undefined;
}
export interface UnbondingEpochCValue {
  epochNumber: bigint;
  /** c_value = stk_burn.Amount/amount_unbonded.Amount */
  sTKBurn: Coin | undefined;
  amountUnbonded: Coin | undefined;
  isMatured: boolean;
  isFailed: boolean;
}
export interface UnbondingEpochCValueProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.UnbondingEpochCValue";
  value: Uint8Array;
}
export interface UnbondingEpochCValueAmino {
  epoch_number?: string;
  /** c_value = stk_burn.Amount/amount_unbonded.Amount */
  s_t_k_burn?: CoinAmino | undefined;
  amount_unbonded?: CoinAmino | undefined;
  is_matured?: boolean;
  is_failed?: boolean;
}
export interface UnbondingEpochCValueAminoMsg {
  type: "/pstake.lscosmos.v1beta1.UnbondingEpochCValue";
  value: UnbondingEpochCValueAmino;
}
export interface UnbondingEpochCValueSDKType {
  epoch_number: bigint;
  s_t_k_burn: CoinSDKType | undefined;
  amount_unbonded: CoinSDKType | undefined;
  is_matured: boolean;
  is_failed: boolean;
}
export interface DelegatorUnbondingEpochEntry {
  delegatorAddress: string;
  epochNumber: bigint;
  amount: Coin | undefined;
}
export interface DelegatorUnbondingEpochEntryProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.DelegatorUnbondingEpochEntry";
  value: Uint8Array;
}
export interface DelegatorUnbondingEpochEntryAmino {
  delegator_address?: string;
  epoch_number?: string;
  amount?: CoinAmino | undefined;
}
export interface DelegatorUnbondingEpochEntryAminoMsg {
  type: "/pstake.lscosmos.v1beta1.DelegatorUnbondingEpochEntry";
  value: DelegatorUnbondingEpochEntryAmino;
}
export interface DelegatorUnbondingEpochEntrySDKType {
  delegator_address: string;
  epoch_number: bigint;
  amount: CoinSDKType | undefined;
}
export interface HostAccounts {
  delegatorAccountOwnerID: string;
  rewardsAccountOwnerID: string;
}
export interface HostAccountsProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.HostAccounts";
  value: Uint8Array;
}
export interface HostAccountsAmino {
  delegator_account_owner_i_d?: string;
  rewards_account_owner_i_d?: string;
}
export interface HostAccountsAminoMsg {
  type: "/pstake.lscosmos.v1beta1.HostAccounts";
  value: HostAccountsAmino;
}
export interface HostAccountsSDKType {
  delegator_account_owner_i_d: string;
  rewards_account_owner_i_d: string;
}
function createBaseAllowListedValidators(): AllowListedValidators {
  return {
    allowListedValidators: []
  };
}
export const AllowListedValidators = {
  typeUrl: "/pstake.lscosmos.v1beta1.AllowListedValidators",
  encode(message: AllowListedValidators, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.allowListedValidators) {
      AllowListedValidator.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): AllowListedValidators {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAllowListedValidators();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.allowListedValidators.push(AllowListedValidator.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<AllowListedValidators>): AllowListedValidators {
    const message = createBaseAllowListedValidators();
    message.allowListedValidators = object.allowListedValidators?.map(e => AllowListedValidator.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: AllowListedValidatorsAmino): AllowListedValidators {
    const message = createBaseAllowListedValidators();
    message.allowListedValidators = object.allow_listed_validators?.map(e => AllowListedValidator.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: AllowListedValidators, useInterfaces: boolean = false): AllowListedValidatorsAmino {
    const obj: any = {};
    if (message.allowListedValidators) {
      obj.allow_listed_validators = message.allowListedValidators.map(e => e ? AllowListedValidator.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.allow_listed_validators = [];
    }
    return obj;
  },
  fromAminoMsg(object: AllowListedValidatorsAminoMsg): AllowListedValidators {
    return AllowListedValidators.fromAmino(object.value);
  },
  fromProtoMsg(message: AllowListedValidatorsProtoMsg, useInterfaces: boolean = false): AllowListedValidators {
    return AllowListedValidators.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: AllowListedValidators): Uint8Array {
    return AllowListedValidators.encode(message).finish();
  },
  toProtoMsg(message: AllowListedValidators): AllowListedValidatorsProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.AllowListedValidators",
      value: AllowListedValidators.encode(message).finish()
    };
  }
};
function createBaseAllowListedValidator(): AllowListedValidator {
  return {
    validatorAddress: "",
    targetWeight: ""
  };
}
export const AllowListedValidator = {
  typeUrl: "/pstake.lscosmos.v1beta1.AllowListedValidator",
  encode(message: AllowListedValidator, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.validatorAddress !== "") {
      writer.uint32(10).string(message.validatorAddress);
    }
    if (message.targetWeight !== "") {
      writer.uint32(18).string(Decimal.fromUserInput(message.targetWeight, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): AllowListedValidator {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAllowListedValidator();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validatorAddress = reader.string();
          break;
        case 2:
          message.targetWeight = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<AllowListedValidator>): AllowListedValidator {
    const message = createBaseAllowListedValidator();
    message.validatorAddress = object.validatorAddress ?? "";
    message.targetWeight = object.targetWeight ?? "";
    return message;
  },
  fromAmino(object: AllowListedValidatorAmino): AllowListedValidator {
    const message = createBaseAllowListedValidator();
    if (object.validator_address !== undefined && object.validator_address !== null) {
      message.validatorAddress = object.validator_address;
    }
    if (object.target_weight !== undefined && object.target_weight !== null) {
      message.targetWeight = object.target_weight;
    }
    return message;
  },
  toAmino(message: AllowListedValidator, useInterfaces: boolean = false): AllowListedValidatorAmino {
    const obj: any = {};
    obj.validator_address = message.validatorAddress;
    obj.target_weight = message.targetWeight;
    return obj;
  },
  fromAminoMsg(object: AllowListedValidatorAminoMsg): AllowListedValidator {
    return AllowListedValidator.fromAmino(object.value);
  },
  fromProtoMsg(message: AllowListedValidatorProtoMsg, useInterfaces: boolean = false): AllowListedValidator {
    return AllowListedValidator.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: AllowListedValidator): Uint8Array {
    return AllowListedValidator.encode(message).finish();
  },
  toProtoMsg(message: AllowListedValidator): AllowListedValidatorProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.AllowListedValidator",
      value: AllowListedValidator.encode(message).finish()
    };
  }
};
function createBasePstakeParams(): PstakeParams {
  return {
    pstakeDepositFee: "",
    pstakeRestakeFee: "",
    pstakeUnstakeFee: "",
    pstakeRedemptionFee: "",
    pstakeFeeAddress: ""
  };
}
export const PstakeParams = {
  typeUrl: "/pstake.lscosmos.v1beta1.PstakeParams",
  encode(message: PstakeParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pstakeDepositFee !== "") {
      writer.uint32(10).string(Decimal.fromUserInput(message.pstakeDepositFee, 18).atomics);
    }
    if (message.pstakeRestakeFee !== "") {
      writer.uint32(18).string(Decimal.fromUserInput(message.pstakeRestakeFee, 18).atomics);
    }
    if (message.pstakeUnstakeFee !== "") {
      writer.uint32(26).string(Decimal.fromUserInput(message.pstakeUnstakeFee, 18).atomics);
    }
    if (message.pstakeRedemptionFee !== "") {
      writer.uint32(34).string(Decimal.fromUserInput(message.pstakeRedemptionFee, 18).atomics);
    }
    if (message.pstakeFeeAddress !== "") {
      writer.uint32(42).string(message.pstakeFeeAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): PstakeParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePstakeParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pstakeDepositFee = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 2:
          message.pstakeRestakeFee = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 3:
          message.pstakeUnstakeFee = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 4:
          message.pstakeRedemptionFee = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 5:
          message.pstakeFeeAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<PstakeParams>): PstakeParams {
    const message = createBasePstakeParams();
    message.pstakeDepositFee = object.pstakeDepositFee ?? "";
    message.pstakeRestakeFee = object.pstakeRestakeFee ?? "";
    message.pstakeUnstakeFee = object.pstakeUnstakeFee ?? "";
    message.pstakeRedemptionFee = object.pstakeRedemptionFee ?? "";
    message.pstakeFeeAddress = object.pstakeFeeAddress ?? "";
    return message;
  },
  fromAmino(object: PstakeParamsAmino): PstakeParams {
    const message = createBasePstakeParams();
    if (object.pstake_deposit_fee !== undefined && object.pstake_deposit_fee !== null) {
      message.pstakeDepositFee = object.pstake_deposit_fee;
    }
    if (object.pstake_restake_fee !== undefined && object.pstake_restake_fee !== null) {
      message.pstakeRestakeFee = object.pstake_restake_fee;
    }
    if (object.pstake_unstake_fee !== undefined && object.pstake_unstake_fee !== null) {
      message.pstakeUnstakeFee = object.pstake_unstake_fee;
    }
    if (object.pstake_redemption_fee !== undefined && object.pstake_redemption_fee !== null) {
      message.pstakeRedemptionFee = object.pstake_redemption_fee;
    }
    if (object.pstake_fee_address !== undefined && object.pstake_fee_address !== null) {
      message.pstakeFeeAddress = object.pstake_fee_address;
    }
    return message;
  },
  toAmino(message: PstakeParams, useInterfaces: boolean = false): PstakeParamsAmino {
    const obj: any = {};
    obj.pstake_deposit_fee = message.pstakeDepositFee;
    obj.pstake_restake_fee = message.pstakeRestakeFee;
    obj.pstake_unstake_fee = message.pstakeUnstakeFee;
    obj.pstake_redemption_fee = message.pstakeRedemptionFee;
    obj.pstake_fee_address = message.pstakeFeeAddress;
    return obj;
  },
  fromAminoMsg(object: PstakeParamsAminoMsg): PstakeParams {
    return PstakeParams.fromAmino(object.value);
  },
  fromProtoMsg(message: PstakeParamsProtoMsg, useInterfaces: boolean = false): PstakeParams {
    return PstakeParams.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: PstakeParams): Uint8Array {
    return PstakeParams.encode(message).finish();
  },
  toProtoMsg(message: PstakeParams): PstakeParamsProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.PstakeParams",
      value: PstakeParams.encode(message).finish()
    };
  }
};
function createBaseHostChainParams(): HostChainParams {
  return {
    chainID: "",
    connectionID: "",
    transferChannel: "",
    transferPort: "",
    baseDenom: "",
    mintDenom: "",
    minDeposit: "",
    pstakeParams: PstakeParams.fromPartial({})
  };
}
export const HostChainParams = {
  typeUrl: "/pstake.lscosmos.v1beta1.HostChainParams",
  encode(message: HostChainParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainID !== "") {
      writer.uint32(10).string(message.chainID);
    }
    if (message.connectionID !== "") {
      writer.uint32(18).string(message.connectionID);
    }
    if (message.transferChannel !== "") {
      writer.uint32(26).string(message.transferChannel);
    }
    if (message.transferPort !== "") {
      writer.uint32(34).string(message.transferPort);
    }
    if (message.baseDenom !== "") {
      writer.uint32(42).string(message.baseDenom);
    }
    if (message.mintDenom !== "") {
      writer.uint32(50).string(message.mintDenom);
    }
    if (message.minDeposit !== "") {
      writer.uint32(58).string(message.minDeposit);
    }
    if (message.pstakeParams !== undefined) {
      PstakeParams.encode(message.pstakeParams, writer.uint32(66).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): HostChainParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostChainParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainID = reader.string();
          break;
        case 2:
          message.connectionID = reader.string();
          break;
        case 3:
          message.transferChannel = reader.string();
          break;
        case 4:
          message.transferPort = reader.string();
          break;
        case 5:
          message.baseDenom = reader.string();
          break;
        case 6:
          message.mintDenom = reader.string();
          break;
        case 7:
          message.minDeposit = reader.string();
          break;
        case 8:
          message.pstakeParams = PstakeParams.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<HostChainParams>): HostChainParams {
    const message = createBaseHostChainParams();
    message.chainID = object.chainID ?? "";
    message.connectionID = object.connectionID ?? "";
    message.transferChannel = object.transferChannel ?? "";
    message.transferPort = object.transferPort ?? "";
    message.baseDenom = object.baseDenom ?? "";
    message.mintDenom = object.mintDenom ?? "";
    message.minDeposit = object.minDeposit ?? "";
    message.pstakeParams = object.pstakeParams !== undefined && object.pstakeParams !== null ? PstakeParams.fromPartial(object.pstakeParams) : undefined;
    return message;
  },
  fromAmino(object: HostChainParamsAmino): HostChainParams {
    const message = createBaseHostChainParams();
    if (object.chain_i_d !== undefined && object.chain_i_d !== null) {
      message.chainID = object.chain_i_d;
    }
    if (object.connection_i_d !== undefined && object.connection_i_d !== null) {
      message.connectionID = object.connection_i_d;
    }
    if (object.transfer_channel !== undefined && object.transfer_channel !== null) {
      message.transferChannel = object.transfer_channel;
    }
    if (object.transfer_port !== undefined && object.transfer_port !== null) {
      message.transferPort = object.transfer_port;
    }
    if (object.base_denom !== undefined && object.base_denom !== null) {
      message.baseDenom = object.base_denom;
    }
    if (object.mint_denom !== undefined && object.mint_denom !== null) {
      message.mintDenom = object.mint_denom;
    }
    if (object.min_deposit !== undefined && object.min_deposit !== null) {
      message.minDeposit = object.min_deposit;
    }
    if (object.pstake_params !== undefined && object.pstake_params !== null) {
      message.pstakeParams = PstakeParams.fromAmino(object.pstake_params);
    }
    return message;
  },
  toAmino(message: HostChainParams, useInterfaces: boolean = false): HostChainParamsAmino {
    const obj: any = {};
    obj.chain_i_d = message.chainID;
    obj.connection_i_d = message.connectionID;
    obj.transfer_channel = message.transferChannel;
    obj.transfer_port = message.transferPort;
    obj.base_denom = message.baseDenom;
    obj.mint_denom = message.mintDenom;
    obj.min_deposit = message.minDeposit;
    obj.pstake_params = message.pstakeParams ? PstakeParams.toAmino(message.pstakeParams, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: HostChainParamsAminoMsg): HostChainParams {
    return HostChainParams.fromAmino(object.value);
  },
  fromProtoMsg(message: HostChainParamsProtoMsg, useInterfaces: boolean = false): HostChainParams {
    return HostChainParams.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: HostChainParams): Uint8Array {
    return HostChainParams.encode(message).finish();
  },
  toProtoMsg(message: HostChainParams): HostChainParamsProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.HostChainParams",
      value: HostChainParams.encode(message).finish()
    };
  }
};
function createBaseDelegationState(): DelegationState {
  return {
    hostDelegationAccountBalance: [],
    hostChainDelegationAddress: "",
    hostAccountDelegations: [],
    hostAccountUndelegations: []
  };
}
export const DelegationState = {
  typeUrl: "/pstake.lscosmos.v1beta1.DelegationState",
  encode(message: DelegationState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.hostDelegationAccountBalance) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.hostChainDelegationAddress !== "") {
      writer.uint32(18).string(message.hostChainDelegationAddress);
    }
    for (const v of message.hostAccountDelegations) {
      HostAccountDelegation.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.hostAccountUndelegations) {
      HostAccountUndelegation.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): DelegationState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDelegationState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hostDelegationAccountBalance.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
          message.hostChainDelegationAddress = reader.string();
          break;
        case 3:
          message.hostAccountDelegations.push(HostAccountDelegation.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 4:
          message.hostAccountUndelegations.push(HostAccountUndelegation.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<DelegationState>): DelegationState {
    const message = createBaseDelegationState();
    message.hostDelegationAccountBalance = object.hostDelegationAccountBalance?.map(e => Coin.fromPartial(e)) || [];
    message.hostChainDelegationAddress = object.hostChainDelegationAddress ?? "";
    message.hostAccountDelegations = object.hostAccountDelegations?.map(e => HostAccountDelegation.fromPartial(e)) || [];
    message.hostAccountUndelegations = object.hostAccountUndelegations?.map(e => HostAccountUndelegation.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: DelegationStateAmino): DelegationState {
    const message = createBaseDelegationState();
    message.hostDelegationAccountBalance = object.host_delegation_account_balance?.map(e => Coin.fromAmino(e)) || [];
    if (object.host_chain_delegation_address !== undefined && object.host_chain_delegation_address !== null) {
      message.hostChainDelegationAddress = object.host_chain_delegation_address;
    }
    message.hostAccountDelegations = object.host_account_delegations?.map(e => HostAccountDelegation.fromAmino(e)) || [];
    message.hostAccountUndelegations = object.host_account_undelegations?.map(e => HostAccountUndelegation.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: DelegationState, useInterfaces: boolean = false): DelegationStateAmino {
    const obj: any = {};
    if (message.hostDelegationAccountBalance) {
      obj.host_delegation_account_balance = message.hostDelegationAccountBalance.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.host_delegation_account_balance = [];
    }
    obj.host_chain_delegation_address = message.hostChainDelegationAddress;
    if (message.hostAccountDelegations) {
      obj.host_account_delegations = message.hostAccountDelegations.map(e => e ? HostAccountDelegation.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.host_account_delegations = [];
    }
    if (message.hostAccountUndelegations) {
      obj.host_account_undelegations = message.hostAccountUndelegations.map(e => e ? HostAccountUndelegation.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.host_account_undelegations = [];
    }
    return obj;
  },
  fromAminoMsg(object: DelegationStateAminoMsg): DelegationState {
    return DelegationState.fromAmino(object.value);
  },
  fromProtoMsg(message: DelegationStateProtoMsg, useInterfaces: boolean = false): DelegationState {
    return DelegationState.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: DelegationState): Uint8Array {
    return DelegationState.encode(message).finish();
  },
  toProtoMsg(message: DelegationState): DelegationStateProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.DelegationState",
      value: DelegationState.encode(message).finish()
    };
  }
};
function createBaseHostAccountDelegation(): HostAccountDelegation {
  return {
    validatorAddress: "",
    amount: Coin.fromPartial({})
  };
}
export const HostAccountDelegation = {
  typeUrl: "/pstake.lscosmos.v1beta1.HostAccountDelegation",
  encode(message: HostAccountDelegation, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.validatorAddress !== "") {
      writer.uint32(10).string(message.validatorAddress);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): HostAccountDelegation {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostAccountDelegation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validatorAddress = reader.string();
          break;
        case 2:
          message.amount = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<HostAccountDelegation>): HostAccountDelegation {
    const message = createBaseHostAccountDelegation();
    message.validatorAddress = object.validatorAddress ?? "";
    message.amount = object.amount !== undefined && object.amount !== null ? Coin.fromPartial(object.amount) : undefined;
    return message;
  },
  fromAmino(object: HostAccountDelegationAmino): HostAccountDelegation {
    const message = createBaseHostAccountDelegation();
    if (object.validator_address !== undefined && object.validator_address !== null) {
      message.validatorAddress = object.validator_address;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = Coin.fromAmino(object.amount);
    }
    return message;
  },
  toAmino(message: HostAccountDelegation, useInterfaces: boolean = false): HostAccountDelegationAmino {
    const obj: any = {};
    obj.validator_address = message.validatorAddress;
    obj.amount = message.amount ? Coin.toAmino(message.amount, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: HostAccountDelegationAminoMsg): HostAccountDelegation {
    return HostAccountDelegation.fromAmino(object.value);
  },
  fromProtoMsg(message: HostAccountDelegationProtoMsg, useInterfaces: boolean = false): HostAccountDelegation {
    return HostAccountDelegation.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: HostAccountDelegation): Uint8Array {
    return HostAccountDelegation.encode(message).finish();
  },
  toProtoMsg(message: HostAccountDelegation): HostAccountDelegationProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.HostAccountDelegation",
      value: HostAccountDelegation.encode(message).finish()
    };
  }
};
function createBaseHostAccountUndelegation(): HostAccountUndelegation {
  return {
    epochNumber: BigInt(0),
    totalUndelegationAmount: Coin.fromPartial({}),
    completionTime: new Date(),
    undelegationEntries: []
  };
}
export const HostAccountUndelegation = {
  typeUrl: "/pstake.lscosmos.v1beta1.HostAccountUndelegation",
  encode(message: HostAccountUndelegation, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.epochNumber !== BigInt(0)) {
      writer.uint32(8).int64(message.epochNumber);
    }
    if (message.totalUndelegationAmount !== undefined) {
      Coin.encode(message.totalUndelegationAmount, writer.uint32(18).fork()).ldelim();
    }
    if (message.completionTime !== undefined) {
      Timestamp.encode(toTimestamp(message.completionTime), writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.undelegationEntries) {
      UndelegationEntry.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): HostAccountUndelegation {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostAccountUndelegation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.epochNumber = reader.int64();
          break;
        case 2:
          message.totalUndelegationAmount = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.completionTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 4:
          message.undelegationEntries.push(UndelegationEntry.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<HostAccountUndelegation>): HostAccountUndelegation {
    const message = createBaseHostAccountUndelegation();
    message.epochNumber = object.epochNumber !== undefined && object.epochNumber !== null ? BigInt(object.epochNumber.toString()) : BigInt(0);
    message.totalUndelegationAmount = object.totalUndelegationAmount !== undefined && object.totalUndelegationAmount !== null ? Coin.fromPartial(object.totalUndelegationAmount) : undefined;
    message.completionTime = object.completionTime ?? undefined;
    message.undelegationEntries = object.undelegationEntries?.map(e => UndelegationEntry.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: HostAccountUndelegationAmino): HostAccountUndelegation {
    const message = createBaseHostAccountUndelegation();
    if (object.epoch_number !== undefined && object.epoch_number !== null) {
      message.epochNumber = BigInt(object.epoch_number);
    }
    if (object.total_undelegation_amount !== undefined && object.total_undelegation_amount !== null) {
      message.totalUndelegationAmount = Coin.fromAmino(object.total_undelegation_amount);
    }
    if (object.completion_time !== undefined && object.completion_time !== null) {
      message.completionTime = fromTimestamp(Timestamp.fromAmino(object.completion_time));
    }
    message.undelegationEntries = object.undelegation_entries?.map(e => UndelegationEntry.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: HostAccountUndelegation, useInterfaces: boolean = false): HostAccountUndelegationAmino {
    const obj: any = {};
    obj.epoch_number = message.epochNumber ? message.epochNumber.toString() : undefined;
    obj.total_undelegation_amount = message.totalUndelegationAmount ? Coin.toAmino(message.totalUndelegationAmount, useInterfaces) : undefined;
    obj.completion_time = message.completionTime ? Timestamp.toAmino(toTimestamp(message.completionTime)) : undefined;
    if (message.undelegationEntries) {
      obj.undelegation_entries = message.undelegationEntries.map(e => e ? UndelegationEntry.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.undelegation_entries = [];
    }
    return obj;
  },
  fromAminoMsg(object: HostAccountUndelegationAminoMsg): HostAccountUndelegation {
    return HostAccountUndelegation.fromAmino(object.value);
  },
  fromProtoMsg(message: HostAccountUndelegationProtoMsg, useInterfaces: boolean = false): HostAccountUndelegation {
    return HostAccountUndelegation.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: HostAccountUndelegation): Uint8Array {
    return HostAccountUndelegation.encode(message).finish();
  },
  toProtoMsg(message: HostAccountUndelegation): HostAccountUndelegationProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.HostAccountUndelegation",
      value: HostAccountUndelegation.encode(message).finish()
    };
  }
};
function createBaseUndelegationEntry(): UndelegationEntry {
  return {
    validatorAddress: "",
    amount: Coin.fromPartial({})
  };
}
export const UndelegationEntry = {
  typeUrl: "/pstake.lscosmos.v1beta1.UndelegationEntry",
  encode(message: UndelegationEntry, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.validatorAddress !== "") {
      writer.uint32(10).string(message.validatorAddress);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): UndelegationEntry {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUndelegationEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validatorAddress = reader.string();
          break;
        case 2:
          message.amount = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<UndelegationEntry>): UndelegationEntry {
    const message = createBaseUndelegationEntry();
    message.validatorAddress = object.validatorAddress ?? "";
    message.amount = object.amount !== undefined && object.amount !== null ? Coin.fromPartial(object.amount) : undefined;
    return message;
  },
  fromAmino(object: UndelegationEntryAmino): UndelegationEntry {
    const message = createBaseUndelegationEntry();
    if (object.validator_address !== undefined && object.validator_address !== null) {
      message.validatorAddress = object.validator_address;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = Coin.fromAmino(object.amount);
    }
    return message;
  },
  toAmino(message: UndelegationEntry, useInterfaces: boolean = false): UndelegationEntryAmino {
    const obj: any = {};
    obj.validator_address = message.validatorAddress;
    obj.amount = message.amount ? Coin.toAmino(message.amount, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: UndelegationEntryAminoMsg): UndelegationEntry {
    return UndelegationEntry.fromAmino(object.value);
  },
  fromProtoMsg(message: UndelegationEntryProtoMsg, useInterfaces: boolean = false): UndelegationEntry {
    return UndelegationEntry.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: UndelegationEntry): Uint8Array {
    return UndelegationEntry.encode(message).finish();
  },
  toProtoMsg(message: UndelegationEntry): UndelegationEntryProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.UndelegationEntry",
      value: UndelegationEntry.encode(message).finish()
    };
  }
};
function createBaseHostChainRewardAddress(): HostChainRewardAddress {
  return {
    address: ""
  };
}
export const HostChainRewardAddress = {
  typeUrl: "/pstake.lscosmos.v1beta1.HostChainRewardAddress",
  encode(message: HostChainRewardAddress, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): HostChainRewardAddress {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostChainRewardAddress();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<HostChainRewardAddress>): HostChainRewardAddress {
    const message = createBaseHostChainRewardAddress();
    message.address = object.address ?? "";
    return message;
  },
  fromAmino(object: HostChainRewardAddressAmino): HostChainRewardAddress {
    const message = createBaseHostChainRewardAddress();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    return message;
  },
  toAmino(message: HostChainRewardAddress, useInterfaces: boolean = false): HostChainRewardAddressAmino {
    const obj: any = {};
    obj.address = message.address;
    return obj;
  },
  fromAminoMsg(object: HostChainRewardAddressAminoMsg): HostChainRewardAddress {
    return HostChainRewardAddress.fromAmino(object.value);
  },
  fromProtoMsg(message: HostChainRewardAddressProtoMsg, useInterfaces: boolean = false): HostChainRewardAddress {
    return HostChainRewardAddress.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: HostChainRewardAddress): Uint8Array {
    return HostChainRewardAddress.encode(message).finish();
  },
  toProtoMsg(message: HostChainRewardAddress): HostChainRewardAddressProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.HostChainRewardAddress",
      value: HostChainRewardAddress.encode(message).finish()
    };
  }
};
function createBaseIBCAmountTransientStore(): IBCAmountTransientStore {
  return {
    iBCTransfer: [],
    iCADelegate: Coin.fromPartial({}),
    undelegatonCompleteIBCTransfer: []
  };
}
export const IBCAmountTransientStore = {
  typeUrl: "/pstake.lscosmos.v1beta1.IBCAmountTransientStore",
  encode(message: IBCAmountTransientStore, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.iBCTransfer) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.iCADelegate !== undefined) {
      Coin.encode(message.iCADelegate, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.undelegatonCompleteIBCTransfer) {
      TransientUndelegationTransfer.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): IBCAmountTransientStore {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIBCAmountTransientStore();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.iBCTransfer.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
          message.iCADelegate = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.undelegatonCompleteIBCTransfer.push(TransientUndelegationTransfer.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<IBCAmountTransientStore>): IBCAmountTransientStore {
    const message = createBaseIBCAmountTransientStore();
    message.iBCTransfer = object.iBCTransfer?.map(e => Coin.fromPartial(e)) || [];
    message.iCADelegate = object.iCADelegate !== undefined && object.iCADelegate !== null ? Coin.fromPartial(object.iCADelegate) : undefined;
    message.undelegatonCompleteIBCTransfer = object.undelegatonCompleteIBCTransfer?.map(e => TransientUndelegationTransfer.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: IBCAmountTransientStoreAmino): IBCAmountTransientStore {
    const message = createBaseIBCAmountTransientStore();
    message.iBCTransfer = object.i_b_c_transfer?.map(e => Coin.fromAmino(e)) || [];
    if (object.i_c_a_delegate !== undefined && object.i_c_a_delegate !== null) {
      message.iCADelegate = Coin.fromAmino(object.i_c_a_delegate);
    }
    message.undelegatonCompleteIBCTransfer = object.undelegaton_complete_i_b_c_transfer?.map(e => TransientUndelegationTransfer.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: IBCAmountTransientStore, useInterfaces: boolean = false): IBCAmountTransientStoreAmino {
    const obj: any = {};
    if (message.iBCTransfer) {
      obj.i_b_c_transfer = message.iBCTransfer.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.i_b_c_transfer = [];
    }
    obj.i_c_a_delegate = message.iCADelegate ? Coin.toAmino(message.iCADelegate, useInterfaces) : undefined;
    if (message.undelegatonCompleteIBCTransfer) {
      obj.undelegaton_complete_i_b_c_transfer = message.undelegatonCompleteIBCTransfer.map(e => e ? TransientUndelegationTransfer.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.undelegaton_complete_i_b_c_transfer = [];
    }
    return obj;
  },
  fromAminoMsg(object: IBCAmountTransientStoreAminoMsg): IBCAmountTransientStore {
    return IBCAmountTransientStore.fromAmino(object.value);
  },
  fromProtoMsg(message: IBCAmountTransientStoreProtoMsg, useInterfaces: boolean = false): IBCAmountTransientStore {
    return IBCAmountTransientStore.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: IBCAmountTransientStore): Uint8Array {
    return IBCAmountTransientStore.encode(message).finish();
  },
  toProtoMsg(message: IBCAmountTransientStore): IBCAmountTransientStoreProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.IBCAmountTransientStore",
      value: IBCAmountTransientStore.encode(message).finish()
    };
  }
};
function createBaseTransientUndelegationTransfer(): TransientUndelegationTransfer {
  return {
    epochNumber: BigInt(0),
    amountUnbonded: Coin.fromPartial({})
  };
}
export const TransientUndelegationTransfer = {
  typeUrl: "/pstake.lscosmos.v1beta1.TransientUndelegationTransfer",
  encode(message: TransientUndelegationTransfer, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.epochNumber !== BigInt(0)) {
      writer.uint32(8).int64(message.epochNumber);
    }
    if (message.amountUnbonded !== undefined) {
      Coin.encode(message.amountUnbonded, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): TransientUndelegationTransfer {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTransientUndelegationTransfer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.epochNumber = reader.int64();
          break;
        case 2:
          message.amountUnbonded = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<TransientUndelegationTransfer>): TransientUndelegationTransfer {
    const message = createBaseTransientUndelegationTransfer();
    message.epochNumber = object.epochNumber !== undefined && object.epochNumber !== null ? BigInt(object.epochNumber.toString()) : BigInt(0);
    message.amountUnbonded = object.amountUnbonded !== undefined && object.amountUnbonded !== null ? Coin.fromPartial(object.amountUnbonded) : undefined;
    return message;
  },
  fromAmino(object: TransientUndelegationTransferAmino): TransientUndelegationTransfer {
    const message = createBaseTransientUndelegationTransfer();
    if (object.epoch_number !== undefined && object.epoch_number !== null) {
      message.epochNumber = BigInt(object.epoch_number);
    }
    if (object.amount_unbonded !== undefined && object.amount_unbonded !== null) {
      message.amountUnbonded = Coin.fromAmino(object.amount_unbonded);
    }
    return message;
  },
  toAmino(message: TransientUndelegationTransfer, useInterfaces: boolean = false): TransientUndelegationTransferAmino {
    const obj: any = {};
    obj.epoch_number = message.epochNumber ? message.epochNumber.toString() : undefined;
    obj.amount_unbonded = message.amountUnbonded ? Coin.toAmino(message.amountUnbonded, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: TransientUndelegationTransferAminoMsg): TransientUndelegationTransfer {
    return TransientUndelegationTransfer.fromAmino(object.value);
  },
  fromProtoMsg(message: TransientUndelegationTransferProtoMsg, useInterfaces: boolean = false): TransientUndelegationTransfer {
    return TransientUndelegationTransfer.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: TransientUndelegationTransfer): Uint8Array {
    return TransientUndelegationTransfer.encode(message).finish();
  },
  toProtoMsg(message: TransientUndelegationTransfer): TransientUndelegationTransferProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.TransientUndelegationTransfer",
      value: TransientUndelegationTransfer.encode(message).finish()
    };
  }
};
function createBaseUnbondingEpochCValue(): UnbondingEpochCValue {
  return {
    epochNumber: BigInt(0),
    sTKBurn: Coin.fromPartial({}),
    amountUnbonded: Coin.fromPartial({}),
    isMatured: false,
    isFailed: false
  };
}
export const UnbondingEpochCValue = {
  typeUrl: "/pstake.lscosmos.v1beta1.UnbondingEpochCValue",
  encode(message: UnbondingEpochCValue, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.epochNumber !== BigInt(0)) {
      writer.uint32(8).int64(message.epochNumber);
    }
    if (message.sTKBurn !== undefined) {
      Coin.encode(message.sTKBurn, writer.uint32(18).fork()).ldelim();
    }
    if (message.amountUnbonded !== undefined) {
      Coin.encode(message.amountUnbonded, writer.uint32(26).fork()).ldelim();
    }
    if (message.isMatured === true) {
      writer.uint32(32).bool(message.isMatured);
    }
    if (message.isFailed === true) {
      writer.uint32(40).bool(message.isFailed);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): UnbondingEpochCValue {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUnbondingEpochCValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.epochNumber = reader.int64();
          break;
        case 2:
          message.sTKBurn = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.amountUnbonded = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 4:
          message.isMatured = reader.bool();
          break;
        case 5:
          message.isFailed = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<UnbondingEpochCValue>): UnbondingEpochCValue {
    const message = createBaseUnbondingEpochCValue();
    message.epochNumber = object.epochNumber !== undefined && object.epochNumber !== null ? BigInt(object.epochNumber.toString()) : BigInt(0);
    message.sTKBurn = object.sTKBurn !== undefined && object.sTKBurn !== null ? Coin.fromPartial(object.sTKBurn) : undefined;
    message.amountUnbonded = object.amountUnbonded !== undefined && object.amountUnbonded !== null ? Coin.fromPartial(object.amountUnbonded) : undefined;
    message.isMatured = object.isMatured ?? false;
    message.isFailed = object.isFailed ?? false;
    return message;
  },
  fromAmino(object: UnbondingEpochCValueAmino): UnbondingEpochCValue {
    const message = createBaseUnbondingEpochCValue();
    if (object.epoch_number !== undefined && object.epoch_number !== null) {
      message.epochNumber = BigInt(object.epoch_number);
    }
    if (object.s_t_k_burn !== undefined && object.s_t_k_burn !== null) {
      message.sTKBurn = Coin.fromAmino(object.s_t_k_burn);
    }
    if (object.amount_unbonded !== undefined && object.amount_unbonded !== null) {
      message.amountUnbonded = Coin.fromAmino(object.amount_unbonded);
    }
    if (object.is_matured !== undefined && object.is_matured !== null) {
      message.isMatured = object.is_matured;
    }
    if (object.is_failed !== undefined && object.is_failed !== null) {
      message.isFailed = object.is_failed;
    }
    return message;
  },
  toAmino(message: UnbondingEpochCValue, useInterfaces: boolean = false): UnbondingEpochCValueAmino {
    const obj: any = {};
    obj.epoch_number = message.epochNumber ? message.epochNumber.toString() : undefined;
    obj.s_t_k_burn = message.sTKBurn ? Coin.toAmino(message.sTKBurn, useInterfaces) : undefined;
    obj.amount_unbonded = message.amountUnbonded ? Coin.toAmino(message.amountUnbonded, useInterfaces) : undefined;
    obj.is_matured = message.isMatured;
    obj.is_failed = message.isFailed;
    return obj;
  },
  fromAminoMsg(object: UnbondingEpochCValueAminoMsg): UnbondingEpochCValue {
    return UnbondingEpochCValue.fromAmino(object.value);
  },
  fromProtoMsg(message: UnbondingEpochCValueProtoMsg, useInterfaces: boolean = false): UnbondingEpochCValue {
    return UnbondingEpochCValue.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: UnbondingEpochCValue): Uint8Array {
    return UnbondingEpochCValue.encode(message).finish();
  },
  toProtoMsg(message: UnbondingEpochCValue): UnbondingEpochCValueProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.UnbondingEpochCValue",
      value: UnbondingEpochCValue.encode(message).finish()
    };
  }
};
function createBaseDelegatorUnbondingEpochEntry(): DelegatorUnbondingEpochEntry {
  return {
    delegatorAddress: "",
    epochNumber: BigInt(0),
    amount: Coin.fromPartial({})
  };
}
export const DelegatorUnbondingEpochEntry = {
  typeUrl: "/pstake.lscosmos.v1beta1.DelegatorUnbondingEpochEntry",
  encode(message: DelegatorUnbondingEpochEntry, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.delegatorAddress !== "") {
      writer.uint32(10).string(message.delegatorAddress);
    }
    if (message.epochNumber !== BigInt(0)) {
      writer.uint32(16).int64(message.epochNumber);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): DelegatorUnbondingEpochEntry {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDelegatorUnbondingEpochEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegatorAddress = reader.string();
          break;
        case 2:
          message.epochNumber = reader.int64();
          break;
        case 3:
          message.amount = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<DelegatorUnbondingEpochEntry>): DelegatorUnbondingEpochEntry {
    const message = createBaseDelegatorUnbondingEpochEntry();
    message.delegatorAddress = object.delegatorAddress ?? "";
    message.epochNumber = object.epochNumber !== undefined && object.epochNumber !== null ? BigInt(object.epochNumber.toString()) : BigInt(0);
    message.amount = object.amount !== undefined && object.amount !== null ? Coin.fromPartial(object.amount) : undefined;
    return message;
  },
  fromAmino(object: DelegatorUnbondingEpochEntryAmino): DelegatorUnbondingEpochEntry {
    const message = createBaseDelegatorUnbondingEpochEntry();
    if (object.delegator_address !== undefined && object.delegator_address !== null) {
      message.delegatorAddress = object.delegator_address;
    }
    if (object.epoch_number !== undefined && object.epoch_number !== null) {
      message.epochNumber = BigInt(object.epoch_number);
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = Coin.fromAmino(object.amount);
    }
    return message;
  },
  toAmino(message: DelegatorUnbondingEpochEntry, useInterfaces: boolean = false): DelegatorUnbondingEpochEntryAmino {
    const obj: any = {};
    obj.delegator_address = message.delegatorAddress;
    obj.epoch_number = message.epochNumber ? message.epochNumber.toString() : undefined;
    obj.amount = message.amount ? Coin.toAmino(message.amount, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: DelegatorUnbondingEpochEntryAminoMsg): DelegatorUnbondingEpochEntry {
    return DelegatorUnbondingEpochEntry.fromAmino(object.value);
  },
  fromProtoMsg(message: DelegatorUnbondingEpochEntryProtoMsg, useInterfaces: boolean = false): DelegatorUnbondingEpochEntry {
    return DelegatorUnbondingEpochEntry.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: DelegatorUnbondingEpochEntry): Uint8Array {
    return DelegatorUnbondingEpochEntry.encode(message).finish();
  },
  toProtoMsg(message: DelegatorUnbondingEpochEntry): DelegatorUnbondingEpochEntryProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.DelegatorUnbondingEpochEntry",
      value: DelegatorUnbondingEpochEntry.encode(message).finish()
    };
  }
};
function createBaseHostAccounts(): HostAccounts {
  return {
    delegatorAccountOwnerID: "",
    rewardsAccountOwnerID: ""
  };
}
export const HostAccounts = {
  typeUrl: "/pstake.lscosmos.v1beta1.HostAccounts",
  encode(message: HostAccounts, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.delegatorAccountOwnerID !== "") {
      writer.uint32(10).string(message.delegatorAccountOwnerID);
    }
    if (message.rewardsAccountOwnerID !== "") {
      writer.uint32(18).string(message.rewardsAccountOwnerID);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): HostAccounts {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostAccounts();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegatorAccountOwnerID = reader.string();
          break;
        case 2:
          message.rewardsAccountOwnerID = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<HostAccounts>): HostAccounts {
    const message = createBaseHostAccounts();
    message.delegatorAccountOwnerID = object.delegatorAccountOwnerID ?? "";
    message.rewardsAccountOwnerID = object.rewardsAccountOwnerID ?? "";
    return message;
  },
  fromAmino(object: HostAccountsAmino): HostAccounts {
    const message = createBaseHostAccounts();
    if (object.delegator_account_owner_i_d !== undefined && object.delegator_account_owner_i_d !== null) {
      message.delegatorAccountOwnerID = object.delegator_account_owner_i_d;
    }
    if (object.rewards_account_owner_i_d !== undefined && object.rewards_account_owner_i_d !== null) {
      message.rewardsAccountOwnerID = object.rewards_account_owner_i_d;
    }
    return message;
  },
  toAmino(message: HostAccounts, useInterfaces: boolean = false): HostAccountsAmino {
    const obj: any = {};
    obj.delegator_account_owner_i_d = message.delegatorAccountOwnerID;
    obj.rewards_account_owner_i_d = message.rewardsAccountOwnerID;
    return obj;
  },
  fromAminoMsg(object: HostAccountsAminoMsg): HostAccounts {
    return HostAccounts.fromAmino(object.value);
  },
  fromProtoMsg(message: HostAccountsProtoMsg, useInterfaces: boolean = false): HostAccounts {
    return HostAccounts.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: HostAccounts): Uint8Array {
    return HostAccounts.encode(message).finish();
  },
  toProtoMsg(message: HostAccounts): HostAccountsProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.HostAccounts",
      value: HostAccounts.encode(message).finish()
    };
  }
};