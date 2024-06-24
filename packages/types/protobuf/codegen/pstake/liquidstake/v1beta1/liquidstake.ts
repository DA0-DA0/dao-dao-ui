import { BinaryReader, BinaryWriter } from "../../../binary";
import { Decimal } from "@cosmjs/math";
/** ValidatorStatus enumerates the status of a liquid validator. */
export enum ValidatorStatus {
  /** VALIDATOR_STATUS_UNSPECIFIED - VALIDATOR_STATUS_UNSPECIFIED defines the unspecified invalid status. */
  VALIDATOR_STATUS_UNSPECIFIED = 0,
  /** VALIDATOR_STATUS_ACTIVE - VALIDATOR_STATUS_ACTIVE defines the active, valid status */
  VALIDATOR_STATUS_ACTIVE = 1,
  /** VALIDATOR_STATUS_INACTIVE - VALIDATOR_STATUS_INACTIVE defines the inactive, invalid status */
  VALIDATOR_STATUS_INACTIVE = 2,
  UNRECOGNIZED = -1,
}
export const ValidatorStatusSDKType = ValidatorStatus;
export const ValidatorStatusAmino = ValidatorStatus;
export function validatorStatusFromJSON(object: any): ValidatorStatus {
  switch (object) {
    case 0:
    case "VALIDATOR_STATUS_UNSPECIFIED":
      return ValidatorStatus.VALIDATOR_STATUS_UNSPECIFIED;
    case 1:
    case "VALIDATOR_STATUS_ACTIVE":
      return ValidatorStatus.VALIDATOR_STATUS_ACTIVE;
    case 2:
    case "VALIDATOR_STATUS_INACTIVE":
      return ValidatorStatus.VALIDATOR_STATUS_INACTIVE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ValidatorStatus.UNRECOGNIZED;
  }
}
export function validatorStatusToJSON(object: ValidatorStatus): string {
  switch (object) {
    case ValidatorStatus.VALIDATOR_STATUS_UNSPECIFIED:
      return "VALIDATOR_STATUS_UNSPECIFIED";
    case ValidatorStatus.VALIDATOR_STATUS_ACTIVE:
      return "VALIDATOR_STATUS_ACTIVE";
    case ValidatorStatus.VALIDATOR_STATUS_INACTIVE:
      return "VALIDATOR_STATUS_INACTIVE";
    case ValidatorStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/** Params defines the set of params for the liquidstake module. */
export interface Params {
  /**
   * LiquidBondDenom specifies the denomination of the token receiving after
   * liquid stake, The value is calculated through NetAmount.
   */
  liquidBondDenom: string;
  /**
   * WhitelistedValidators specifies the validators elected to become Active
   * Liquid Validators.
   */
  whitelistedValidators: WhitelistedValidator[];
  /**
   * UnstakeFeeRate specifies the fee rate when liquid unstake is requested,
   * unbonded by subtracting it from unbondingAmount
   */
  unstakeFeeRate: string;
  /**
   * LsmDisabled allows to block any msgs that convert staked tokens into
   * stkXPRT through LSM.
   */
  lsmDisabled: boolean;
  /**
   * MinLiquidStakingAmount specifies the minimum number of coins to be staked
   * to the active liquid validators on liquid staking to minimize decimal loss
   * and consider gas efficiency.
   */
  minLiquidStakeAmount: string;
  /**
   * CwLockedPoolAddress defines the bech32-encoded address of
   * a CW smart-contract representing a time locked LP (e.g. Superfluid LP).
   */
  cwLockedPoolAddress: string;
  /**
   * FeeAccountAddress defines the bech32-encoded address of
   * a an account responsible for accumulating protocol fees.
   */
  feeAccountAddress: string;
  /**
   * AutocompoundFeeRate specifies the fee rate for auto redelegating the stake
   * rewards. The fee is taken in favour of the fee account (see
   * FeeAccountAddress).
   */
  autocompoundFeeRate: string;
  /**
   * WhitelistAdminAddress the bech32-encoded address of an admin authority
   * that is allowed to update whitelisted validators or pause liquidstaking
   * module entirely. The key is controlled by an offchain process that is
   * selecting validators based on a criteria. Pausing of the module can be
   * required during important migrations or failures.
   */
  whitelistAdminAddress: string;
  /**
   * ModulePaused is a safety toggle that allows to stop main module functions
   * such as stake/unstake/stake-to-lp and the BeginBlocker logic.
   */
  modulePaused: boolean;
}
export interface ParamsProtoMsg {
  typeUrl: "/pstake.liquidstake.v1beta1.Params";
  value: Uint8Array;
}
/** Params defines the set of params for the liquidstake module. */
export interface ParamsAmino {
  /**
   * LiquidBondDenom specifies the denomination of the token receiving after
   * liquid stake, The value is calculated through NetAmount.
   */
  liquid_bond_denom?: string;
  /**
   * WhitelistedValidators specifies the validators elected to become Active
   * Liquid Validators.
   */
  whitelisted_validators?: WhitelistedValidatorAmino[];
  /**
   * UnstakeFeeRate specifies the fee rate when liquid unstake is requested,
   * unbonded by subtracting it from unbondingAmount
   */
  unstake_fee_rate?: string;
  /**
   * LsmDisabled allows to block any msgs that convert staked tokens into
   * stkXPRT through LSM.
   */
  lsm_disabled?: boolean;
  /**
   * MinLiquidStakingAmount specifies the minimum number of coins to be staked
   * to the active liquid validators on liquid staking to minimize decimal loss
   * and consider gas efficiency.
   */
  min_liquid_stake_amount?: string;
  /**
   * CwLockedPoolAddress defines the bech32-encoded address of
   * a CW smart-contract representing a time locked LP (e.g. Superfluid LP).
   */
  cw_locked_pool_address?: string;
  /**
   * FeeAccountAddress defines the bech32-encoded address of
   * a an account responsible for accumulating protocol fees.
   */
  fee_account_address?: string;
  /**
   * AutocompoundFeeRate specifies the fee rate for auto redelegating the stake
   * rewards. The fee is taken in favour of the fee account (see
   * FeeAccountAddress).
   */
  autocompound_fee_rate?: string;
  /**
   * WhitelistAdminAddress the bech32-encoded address of an admin authority
   * that is allowed to update whitelisted validators or pause liquidstaking
   * module entirely. The key is controlled by an offchain process that is
   * selecting validators based on a criteria. Pausing of the module can be
   * required during important migrations or failures.
   */
  whitelist_admin_address?: string;
  /**
   * ModulePaused is a safety toggle that allows to stop main module functions
   * such as stake/unstake/stake-to-lp and the BeginBlocker logic.
   */
  module_paused?: boolean;
}
export interface ParamsAminoMsg {
  type: "/pstake.liquidstake.v1beta1.Params";
  value: ParamsAmino;
}
/** Params defines the set of params for the liquidstake module. */
export interface ParamsSDKType {
  liquid_bond_denom: string;
  whitelisted_validators: WhitelistedValidatorSDKType[];
  unstake_fee_rate: string;
  lsm_disabled: boolean;
  min_liquid_stake_amount: string;
  cw_locked_pool_address: string;
  fee_account_address: string;
  autocompound_fee_rate: string;
  whitelist_admin_address: string;
  module_paused: boolean;
}
/**
 * WhitelistedValidator consists of the validator operator address and the
 * target weight, which is a value for calculating the real weight to be derived
 * according to the active status.
 */
export interface WhitelistedValidator {
  /**
   * validator_address defines the bech32-encoded address that whitelisted
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
export interface WhitelistedValidatorProtoMsg {
  typeUrl: "/pstake.liquidstake.v1beta1.WhitelistedValidator";
  value: Uint8Array;
}
/**
 * WhitelistedValidator consists of the validator operator address and the
 * target weight, which is a value for calculating the real weight to be derived
 * according to the active status.
 */
export interface WhitelistedValidatorAmino {
  /**
   * validator_address defines the bech32-encoded address that whitelisted
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
export interface WhitelistedValidatorAminoMsg {
  type: "/pstake.liquidstake.v1beta1.WhitelistedValidator";
  value: WhitelistedValidatorAmino;
}
/**
 * WhitelistedValidator consists of the validator operator address and the
 * target weight, which is a value for calculating the real weight to be derived
 * according to the active status.
 */
export interface WhitelistedValidatorSDKType {
  validator_address: string;
  target_weight: string;
}
/**
 * LiquidValidator defines a Validator that can be the target of LiquidStaking
 * and LiquidUnstaking, Active, Weight, etc. fields are derived as functions to
 * deal with by maintaining consistency with the state of the staking module.
 */
export interface LiquidValidator {
  /**
   * operator_address defines the address of the validator's operator; bech
   * encoded in JSON.
   */
  operatorAddress: string;
}
export interface LiquidValidatorProtoMsg {
  typeUrl: "/pstake.liquidstake.v1beta1.LiquidValidator";
  value: Uint8Array;
}
/**
 * LiquidValidator defines a Validator that can be the target of LiquidStaking
 * and LiquidUnstaking, Active, Weight, etc. fields are derived as functions to
 * deal with by maintaining consistency with the state of the staking module.
 */
export interface LiquidValidatorAmino {
  /**
   * operator_address defines the address of the validator's operator; bech
   * encoded in JSON.
   */
  operator_address?: string;
}
export interface LiquidValidatorAminoMsg {
  type: "/pstake.liquidstake.v1beta1.LiquidValidator";
  value: LiquidValidatorAmino;
}
/**
 * LiquidValidator defines a Validator that can be the target of LiquidStaking
 * and LiquidUnstaking, Active, Weight, etc. fields are derived as functions to
 * deal with by maintaining consistency with the state of the staking module.
 */
export interface LiquidValidatorSDKType {
  operator_address: string;
}
/**
 * LiquidValidatorState is type LiquidValidator with state added to return to
 * query results.
 */
export interface LiquidValidatorState {
  /**
   * operator_address defines the address of the validator's operator; bech
   * encoded in JSON.
   */
  operatorAddress: string;
  /** weight specifies the weight for liquid staking, unstaking amount */
  weight: string;
  /** status is the liquid validator status */
  status: ValidatorStatus;
  /** del_shares define the delegation shares of the validator */
  delShares: string;
  /**
   * liquid_tokens define the token amount worth of delegation shares of the
   * validator (slashing applied amount)
   */
  liquidTokens: string;
}
export interface LiquidValidatorStateProtoMsg {
  typeUrl: "/pstake.liquidstake.v1beta1.LiquidValidatorState";
  value: Uint8Array;
}
/**
 * LiquidValidatorState is type LiquidValidator with state added to return to
 * query results.
 */
export interface LiquidValidatorStateAmino {
  /**
   * operator_address defines the address of the validator's operator; bech
   * encoded in JSON.
   */
  operator_address?: string;
  /** weight specifies the weight for liquid staking, unstaking amount */
  weight?: string;
  /** status is the liquid validator status */
  status?: ValidatorStatus;
  /** del_shares define the delegation shares of the validator */
  del_shares?: string;
  /**
   * liquid_tokens define the token amount worth of delegation shares of the
   * validator (slashing applied amount)
   */
  liquid_tokens?: string;
}
export interface LiquidValidatorStateAminoMsg {
  type: "/pstake.liquidstake.v1beta1.LiquidValidatorState";
  value: LiquidValidatorStateAmino;
}
/**
 * LiquidValidatorState is type LiquidValidator with state added to return to
 * query results.
 */
export interface LiquidValidatorStateSDKType {
  operator_address: string;
  weight: string;
  status: ValidatorStatus;
  del_shares: string;
  liquid_tokens: string;
}
/**
 * NetAmountState is type for net amount raw data and mint rate, This is a value
 * that depends on the several module state every time, so it is used only for
 * calculation and query and is not stored in kv.
 */
export interface NetAmountState {
  /** mint_rate is stkXPRTTotalSupply / NetAmount */
  mintRate: string;
  /** btoken_total_supply returns the total supply of stk/uxprt (stkXPRT denom) */
  stkxprtTotalSupply: string;
  /**
   * net_amount is proxy account's native token balance + total liquid tokens +
   * total remaining rewards + total unbonding balance
   */
  netAmount: string;
  /** total_del_shares define the delegation shares of all liquid validators */
  totalDelShares: string;
  /**
   * total_liquid_tokens define the token amount worth of delegation shares of
   * all liquid validator (slashing applied amount)
   */
  totalLiquidTokens: string;
  /**
   * total_remaining_rewards define the sum of remaining rewards of proxy
   * account by all liquid validators
   */
  totalRemainingRewards: string;
  /**
   * total_unbonding_balance define the unbonding balance of proxy account by
   * all liquid validator (slashing applied amount)
   */
  totalUnbondingBalance: string;
  /** proxy_acc_balance define the balance of proxy account for the native token */
  proxyAccBalance: string;
}
export interface NetAmountStateProtoMsg {
  typeUrl: "/pstake.liquidstake.v1beta1.NetAmountState";
  value: Uint8Array;
}
/**
 * NetAmountState is type for net amount raw data and mint rate, This is a value
 * that depends on the several module state every time, so it is used only for
 * calculation and query and is not stored in kv.
 */
export interface NetAmountStateAmino {
  /** mint_rate is stkXPRTTotalSupply / NetAmount */
  mint_rate?: string;
  /** btoken_total_supply returns the total supply of stk/uxprt (stkXPRT denom) */
  stkxprt_total_supply?: string;
  /**
   * net_amount is proxy account's native token balance + total liquid tokens +
   * total remaining rewards + total unbonding balance
   */
  net_amount?: string;
  /** total_del_shares define the delegation shares of all liquid validators */
  total_del_shares?: string;
  /**
   * total_liquid_tokens define the token amount worth of delegation shares of
   * all liquid validator (slashing applied amount)
   */
  total_liquid_tokens?: string;
  /**
   * total_remaining_rewards define the sum of remaining rewards of proxy
   * account by all liquid validators
   */
  total_remaining_rewards?: string;
  /**
   * total_unbonding_balance define the unbonding balance of proxy account by
   * all liquid validator (slashing applied amount)
   */
  total_unbonding_balance?: string;
  /** proxy_acc_balance define the balance of proxy account for the native token */
  proxy_acc_balance?: string;
}
export interface NetAmountStateAminoMsg {
  type: "/pstake.liquidstake.v1beta1.NetAmountState";
  value: NetAmountStateAmino;
}
/**
 * NetAmountState is type for net amount raw data and mint rate, This is a value
 * that depends on the several module state every time, so it is used only for
 * calculation and query and is not stored in kv.
 */
export interface NetAmountStateSDKType {
  mint_rate: string;
  stkxprt_total_supply: string;
  net_amount: string;
  total_del_shares: string;
  total_liquid_tokens: string;
  total_remaining_rewards: string;
  total_unbonding_balance: string;
  proxy_acc_balance: string;
}
function createBaseParams(): Params {
  return {
    liquidBondDenom: "",
    whitelistedValidators: [],
    unstakeFeeRate: "",
    lsmDisabled: false,
    minLiquidStakeAmount: "",
    cwLockedPoolAddress: "",
    feeAccountAddress: "",
    autocompoundFeeRate: "",
    whitelistAdminAddress: "",
    modulePaused: false
  };
}
export const Params = {
  typeUrl: "/pstake.liquidstake.v1beta1.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.liquidBondDenom !== "") {
      writer.uint32(10).string(message.liquidBondDenom);
    }
    for (const v of message.whitelistedValidators) {
      WhitelistedValidator.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.unstakeFeeRate !== "") {
      writer.uint32(26).string(Decimal.fromUserInput(message.unstakeFeeRate, 18).atomics);
    }
    if (message.lsmDisabled === true) {
      writer.uint32(32).bool(message.lsmDisabled);
    }
    if (message.minLiquidStakeAmount !== "") {
      writer.uint32(42).string(message.minLiquidStakeAmount);
    }
    if (message.cwLockedPoolAddress !== "") {
      writer.uint32(50).string(message.cwLockedPoolAddress);
    }
    if (message.feeAccountAddress !== "") {
      writer.uint32(58).string(message.feeAccountAddress);
    }
    if (message.autocompoundFeeRate !== "") {
      writer.uint32(66).string(Decimal.fromUserInput(message.autocompoundFeeRate, 18).atomics);
    }
    if (message.whitelistAdminAddress !== "") {
      writer.uint32(74).string(message.whitelistAdminAddress);
    }
    if (message.modulePaused === true) {
      writer.uint32(80).bool(message.modulePaused);
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
          message.liquidBondDenom = reader.string();
          break;
        case 2:
          message.whitelistedValidators.push(WhitelistedValidator.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 3:
          message.unstakeFeeRate = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 4:
          message.lsmDisabled = reader.bool();
          break;
        case 5:
          message.minLiquidStakeAmount = reader.string();
          break;
        case 6:
          message.cwLockedPoolAddress = reader.string();
          break;
        case 7:
          message.feeAccountAddress = reader.string();
          break;
        case 8:
          message.autocompoundFeeRate = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 9:
          message.whitelistAdminAddress = reader.string();
          break;
        case 10:
          message.modulePaused = reader.bool();
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
    message.liquidBondDenom = object.liquidBondDenom ?? "";
    message.whitelistedValidators = object.whitelistedValidators?.map(e => WhitelistedValidator.fromPartial(e)) || [];
    message.unstakeFeeRate = object.unstakeFeeRate ?? "";
    message.lsmDisabled = object.lsmDisabled ?? false;
    message.minLiquidStakeAmount = object.minLiquidStakeAmount ?? "";
    message.cwLockedPoolAddress = object.cwLockedPoolAddress ?? "";
    message.feeAccountAddress = object.feeAccountAddress ?? "";
    message.autocompoundFeeRate = object.autocompoundFeeRate ?? "";
    message.whitelistAdminAddress = object.whitelistAdminAddress ?? "";
    message.modulePaused = object.modulePaused ?? false;
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    const message = createBaseParams();
    if (object.liquid_bond_denom !== undefined && object.liquid_bond_denom !== null) {
      message.liquidBondDenom = object.liquid_bond_denom;
    }
    message.whitelistedValidators = object.whitelisted_validators?.map(e => WhitelistedValidator.fromAmino(e)) || [];
    if (object.unstake_fee_rate !== undefined && object.unstake_fee_rate !== null) {
      message.unstakeFeeRate = object.unstake_fee_rate;
    }
    if (object.lsm_disabled !== undefined && object.lsm_disabled !== null) {
      message.lsmDisabled = object.lsm_disabled;
    }
    if (object.min_liquid_stake_amount !== undefined && object.min_liquid_stake_amount !== null) {
      message.minLiquidStakeAmount = object.min_liquid_stake_amount;
    }
    if (object.cw_locked_pool_address !== undefined && object.cw_locked_pool_address !== null) {
      message.cwLockedPoolAddress = object.cw_locked_pool_address;
    }
    if (object.fee_account_address !== undefined && object.fee_account_address !== null) {
      message.feeAccountAddress = object.fee_account_address;
    }
    if (object.autocompound_fee_rate !== undefined && object.autocompound_fee_rate !== null) {
      message.autocompoundFeeRate = object.autocompound_fee_rate;
    }
    if (object.whitelist_admin_address !== undefined && object.whitelist_admin_address !== null) {
      message.whitelistAdminAddress = object.whitelist_admin_address;
    }
    if (object.module_paused !== undefined && object.module_paused !== null) {
      message.modulePaused = object.module_paused;
    }
    return message;
  },
  toAmino(message: Params, useInterfaces: boolean = false): ParamsAmino {
    const obj: any = {};
    obj.liquid_bond_denom = message.liquidBondDenom === "" ? undefined : message.liquidBondDenom;
    if (message.whitelistedValidators) {
      obj.whitelisted_validators = message.whitelistedValidators.map(e => e ? WhitelistedValidator.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.whitelisted_validators = message.whitelistedValidators;
    }
    obj.unstake_fee_rate = message.unstakeFeeRate === "" ? undefined : message.unstakeFeeRate;
    obj.lsm_disabled = message.lsmDisabled === false ? undefined : message.lsmDisabled;
    obj.min_liquid_stake_amount = message.minLiquidStakeAmount === "" ? undefined : message.minLiquidStakeAmount;
    obj.cw_locked_pool_address = message.cwLockedPoolAddress === "" ? undefined : message.cwLockedPoolAddress;
    obj.fee_account_address = message.feeAccountAddress === "" ? undefined : message.feeAccountAddress;
    obj.autocompound_fee_rate = message.autocompoundFeeRate === "" ? undefined : message.autocompoundFeeRate;
    obj.whitelist_admin_address = message.whitelistAdminAddress === "" ? undefined : message.whitelistAdminAddress;
    obj.module_paused = message.modulePaused === false ? undefined : message.modulePaused;
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
      typeUrl: "/pstake.liquidstake.v1beta1.Params",
      value: Params.encode(message).finish()
    };
  }
};
function createBaseWhitelistedValidator(): WhitelistedValidator {
  return {
    validatorAddress: "",
    targetWeight: ""
  };
}
export const WhitelistedValidator = {
  typeUrl: "/pstake.liquidstake.v1beta1.WhitelistedValidator",
  encode(message: WhitelistedValidator, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.validatorAddress !== "") {
      writer.uint32(10).string(message.validatorAddress);
    }
    if (message.targetWeight !== "") {
      writer.uint32(18).string(message.targetWeight);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): WhitelistedValidator {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWhitelistedValidator();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validatorAddress = reader.string();
          break;
        case 2:
          message.targetWeight = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<WhitelistedValidator>): WhitelistedValidator {
    const message = createBaseWhitelistedValidator();
    message.validatorAddress = object.validatorAddress ?? "";
    message.targetWeight = object.targetWeight ?? "";
    return message;
  },
  fromAmino(object: WhitelistedValidatorAmino): WhitelistedValidator {
    const message = createBaseWhitelistedValidator();
    if (object.validator_address !== undefined && object.validator_address !== null) {
      message.validatorAddress = object.validator_address;
    }
    if (object.target_weight !== undefined && object.target_weight !== null) {
      message.targetWeight = object.target_weight;
    }
    return message;
  },
  toAmino(message: WhitelistedValidator, useInterfaces: boolean = false): WhitelistedValidatorAmino {
    const obj: any = {};
    obj.validator_address = message.validatorAddress === "" ? undefined : message.validatorAddress;
    obj.target_weight = message.targetWeight === "" ? undefined : message.targetWeight;
    return obj;
  },
  fromAminoMsg(object: WhitelistedValidatorAminoMsg): WhitelistedValidator {
    return WhitelistedValidator.fromAmino(object.value);
  },
  fromProtoMsg(message: WhitelistedValidatorProtoMsg, useInterfaces: boolean = false): WhitelistedValidator {
    return WhitelistedValidator.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: WhitelistedValidator): Uint8Array {
    return WhitelistedValidator.encode(message).finish();
  },
  toProtoMsg(message: WhitelistedValidator): WhitelistedValidatorProtoMsg {
    return {
      typeUrl: "/pstake.liquidstake.v1beta1.WhitelistedValidator",
      value: WhitelistedValidator.encode(message).finish()
    };
  }
};
function createBaseLiquidValidator(): LiquidValidator {
  return {
    operatorAddress: ""
  };
}
export const LiquidValidator = {
  typeUrl: "/pstake.liquidstake.v1beta1.LiquidValidator",
  encode(message: LiquidValidator, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.operatorAddress !== "") {
      writer.uint32(10).string(message.operatorAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): LiquidValidator {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLiquidValidator();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.operatorAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<LiquidValidator>): LiquidValidator {
    const message = createBaseLiquidValidator();
    message.operatorAddress = object.operatorAddress ?? "";
    return message;
  },
  fromAmino(object: LiquidValidatorAmino): LiquidValidator {
    const message = createBaseLiquidValidator();
    if (object.operator_address !== undefined && object.operator_address !== null) {
      message.operatorAddress = object.operator_address;
    }
    return message;
  },
  toAmino(message: LiquidValidator, useInterfaces: boolean = false): LiquidValidatorAmino {
    const obj: any = {};
    obj.operator_address = message.operatorAddress === "" ? undefined : message.operatorAddress;
    return obj;
  },
  fromAminoMsg(object: LiquidValidatorAminoMsg): LiquidValidator {
    return LiquidValidator.fromAmino(object.value);
  },
  fromProtoMsg(message: LiquidValidatorProtoMsg, useInterfaces: boolean = false): LiquidValidator {
    return LiquidValidator.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: LiquidValidator): Uint8Array {
    return LiquidValidator.encode(message).finish();
  },
  toProtoMsg(message: LiquidValidator): LiquidValidatorProtoMsg {
    return {
      typeUrl: "/pstake.liquidstake.v1beta1.LiquidValidator",
      value: LiquidValidator.encode(message).finish()
    };
  }
};
function createBaseLiquidValidatorState(): LiquidValidatorState {
  return {
    operatorAddress: "",
    weight: "",
    status: 0,
    delShares: "",
    liquidTokens: ""
  };
}
export const LiquidValidatorState = {
  typeUrl: "/pstake.liquidstake.v1beta1.LiquidValidatorState",
  encode(message: LiquidValidatorState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.operatorAddress !== "") {
      writer.uint32(10).string(message.operatorAddress);
    }
    if (message.weight !== "") {
      writer.uint32(18).string(message.weight);
    }
    if (message.status !== 0) {
      writer.uint32(24).int32(message.status);
    }
    if (message.delShares !== "") {
      writer.uint32(34).string(Decimal.fromUserInput(message.delShares, 18).atomics);
    }
    if (message.liquidTokens !== "") {
      writer.uint32(42).string(message.liquidTokens);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): LiquidValidatorState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLiquidValidatorState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.operatorAddress = reader.string();
          break;
        case 2:
          message.weight = reader.string();
          break;
        case 3:
          message.status = (reader.int32() as any);
          break;
        case 4:
          message.delShares = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 5:
          message.liquidTokens = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<LiquidValidatorState>): LiquidValidatorState {
    const message = createBaseLiquidValidatorState();
    message.operatorAddress = object.operatorAddress ?? "";
    message.weight = object.weight ?? "";
    message.status = object.status ?? 0;
    message.delShares = object.delShares ?? "";
    message.liquidTokens = object.liquidTokens ?? "";
    return message;
  },
  fromAmino(object: LiquidValidatorStateAmino): LiquidValidatorState {
    const message = createBaseLiquidValidatorState();
    if (object.operator_address !== undefined && object.operator_address !== null) {
      message.operatorAddress = object.operator_address;
    }
    if (object.weight !== undefined && object.weight !== null) {
      message.weight = object.weight;
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    if (object.del_shares !== undefined && object.del_shares !== null) {
      message.delShares = object.del_shares;
    }
    if (object.liquid_tokens !== undefined && object.liquid_tokens !== null) {
      message.liquidTokens = object.liquid_tokens;
    }
    return message;
  },
  toAmino(message: LiquidValidatorState, useInterfaces: boolean = false): LiquidValidatorStateAmino {
    const obj: any = {};
    obj.operator_address = message.operatorAddress === "" ? undefined : message.operatorAddress;
    obj.weight = message.weight === "" ? undefined : message.weight;
    obj.status = message.status === 0 ? undefined : message.status;
    obj.del_shares = message.delShares === "" ? undefined : message.delShares;
    obj.liquid_tokens = message.liquidTokens === "" ? undefined : message.liquidTokens;
    return obj;
  },
  fromAminoMsg(object: LiquidValidatorStateAminoMsg): LiquidValidatorState {
    return LiquidValidatorState.fromAmino(object.value);
  },
  fromProtoMsg(message: LiquidValidatorStateProtoMsg, useInterfaces: boolean = false): LiquidValidatorState {
    return LiquidValidatorState.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: LiquidValidatorState): Uint8Array {
    return LiquidValidatorState.encode(message).finish();
  },
  toProtoMsg(message: LiquidValidatorState): LiquidValidatorStateProtoMsg {
    return {
      typeUrl: "/pstake.liquidstake.v1beta1.LiquidValidatorState",
      value: LiquidValidatorState.encode(message).finish()
    };
  }
};
function createBaseNetAmountState(): NetAmountState {
  return {
    mintRate: "",
    stkxprtTotalSupply: "",
    netAmount: "",
    totalDelShares: "",
    totalLiquidTokens: "",
    totalRemainingRewards: "",
    totalUnbondingBalance: "",
    proxyAccBalance: ""
  };
}
export const NetAmountState = {
  typeUrl: "/pstake.liquidstake.v1beta1.NetAmountState",
  encode(message: NetAmountState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.mintRate !== "") {
      writer.uint32(10).string(Decimal.fromUserInput(message.mintRate, 18).atomics);
    }
    if (message.stkxprtTotalSupply !== "") {
      writer.uint32(18).string(message.stkxprtTotalSupply);
    }
    if (message.netAmount !== "") {
      writer.uint32(26).string(Decimal.fromUserInput(message.netAmount, 18).atomics);
    }
    if (message.totalDelShares !== "") {
      writer.uint32(34).string(Decimal.fromUserInput(message.totalDelShares, 18).atomics);
    }
    if (message.totalLiquidTokens !== "") {
      writer.uint32(42).string(message.totalLiquidTokens);
    }
    if (message.totalRemainingRewards !== "") {
      writer.uint32(50).string(Decimal.fromUserInput(message.totalRemainingRewards, 18).atomics);
    }
    if (message.totalUnbondingBalance !== "") {
      writer.uint32(58).string(message.totalUnbondingBalance);
    }
    if (message.proxyAccBalance !== "") {
      writer.uint32(66).string(message.proxyAccBalance);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): NetAmountState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNetAmountState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.mintRate = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 2:
          message.stkxprtTotalSupply = reader.string();
          break;
        case 3:
          message.netAmount = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 4:
          message.totalDelShares = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 5:
          message.totalLiquidTokens = reader.string();
          break;
        case 6:
          message.totalRemainingRewards = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 7:
          message.totalUnbondingBalance = reader.string();
          break;
        case 8:
          message.proxyAccBalance = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<NetAmountState>): NetAmountState {
    const message = createBaseNetAmountState();
    message.mintRate = object.mintRate ?? "";
    message.stkxprtTotalSupply = object.stkxprtTotalSupply ?? "";
    message.netAmount = object.netAmount ?? "";
    message.totalDelShares = object.totalDelShares ?? "";
    message.totalLiquidTokens = object.totalLiquidTokens ?? "";
    message.totalRemainingRewards = object.totalRemainingRewards ?? "";
    message.totalUnbondingBalance = object.totalUnbondingBalance ?? "";
    message.proxyAccBalance = object.proxyAccBalance ?? "";
    return message;
  },
  fromAmino(object: NetAmountStateAmino): NetAmountState {
    const message = createBaseNetAmountState();
    if (object.mint_rate !== undefined && object.mint_rate !== null) {
      message.mintRate = object.mint_rate;
    }
    if (object.stkxprt_total_supply !== undefined && object.stkxprt_total_supply !== null) {
      message.stkxprtTotalSupply = object.stkxprt_total_supply;
    }
    if (object.net_amount !== undefined && object.net_amount !== null) {
      message.netAmount = object.net_amount;
    }
    if (object.total_del_shares !== undefined && object.total_del_shares !== null) {
      message.totalDelShares = object.total_del_shares;
    }
    if (object.total_liquid_tokens !== undefined && object.total_liquid_tokens !== null) {
      message.totalLiquidTokens = object.total_liquid_tokens;
    }
    if (object.total_remaining_rewards !== undefined && object.total_remaining_rewards !== null) {
      message.totalRemainingRewards = object.total_remaining_rewards;
    }
    if (object.total_unbonding_balance !== undefined && object.total_unbonding_balance !== null) {
      message.totalUnbondingBalance = object.total_unbonding_balance;
    }
    if (object.proxy_acc_balance !== undefined && object.proxy_acc_balance !== null) {
      message.proxyAccBalance = object.proxy_acc_balance;
    }
    return message;
  },
  toAmino(message: NetAmountState, useInterfaces: boolean = false): NetAmountStateAmino {
    const obj: any = {};
    obj.mint_rate = message.mintRate === "" ? undefined : message.mintRate;
    obj.stkxprt_total_supply = message.stkxprtTotalSupply === "" ? undefined : message.stkxprtTotalSupply;
    obj.net_amount = message.netAmount === "" ? undefined : message.netAmount;
    obj.total_del_shares = message.totalDelShares === "" ? undefined : message.totalDelShares;
    obj.total_liquid_tokens = message.totalLiquidTokens === "" ? undefined : message.totalLiquidTokens;
    obj.total_remaining_rewards = message.totalRemainingRewards === "" ? undefined : message.totalRemainingRewards;
    obj.total_unbonding_balance = message.totalUnbondingBalance === "" ? undefined : message.totalUnbondingBalance;
    obj.proxy_acc_balance = message.proxyAccBalance === "" ? undefined : message.proxyAccBalance;
    return obj;
  },
  fromAminoMsg(object: NetAmountStateAminoMsg): NetAmountState {
    return NetAmountState.fromAmino(object.value);
  },
  fromProtoMsg(message: NetAmountStateProtoMsg, useInterfaces: boolean = false): NetAmountState {
    return NetAmountState.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: NetAmountState): Uint8Array {
    return NetAmountState.encode(message).finish();
  },
  toProtoMsg(message: NetAmountState): NetAmountStateProtoMsg {
    return {
      typeUrl: "/pstake.liquidstake.v1beta1.NetAmountState",
      value: NetAmountState.encode(message).finish()
    };
  }
};