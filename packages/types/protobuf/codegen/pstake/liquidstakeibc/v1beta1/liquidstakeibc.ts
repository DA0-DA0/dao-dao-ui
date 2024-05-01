import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { Timestamp } from "../../../google/protobuf/timestamp";
import { Redelegation, RedelegationAmino, RedelegationSDKType } from "../../../cosmos/staking/v1beta1/staking";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { Decimal } from "@cosmjs/math";
import { toTimestamp, fromTimestamp } from "../../../helpers";
export enum ICAAccount_ChannelState {
  /** ICA_CHANNEL_CREATING - ICA channel is being created */
  ICA_CHANNEL_CREATING = 0,
  /** ICA_CHANNEL_CREATED - ICA is established and the account can be used */
  ICA_CHANNEL_CREATED = 1,
  UNRECOGNIZED = -1,
}
export const ICAAccount_ChannelStateSDKType = ICAAccount_ChannelState;
export const ICAAccount_ChannelStateAmino = ICAAccount_ChannelState;
export function iCAAccount_ChannelStateFromJSON(object: any): ICAAccount_ChannelState {
  switch (object) {
    case 0:
    case "ICA_CHANNEL_CREATING":
      return ICAAccount_ChannelState.ICA_CHANNEL_CREATING;
    case 1:
    case "ICA_CHANNEL_CREATED":
      return ICAAccount_ChannelState.ICA_CHANNEL_CREATED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ICAAccount_ChannelState.UNRECOGNIZED;
  }
}
export function iCAAccount_ChannelStateToJSON(object: ICAAccount_ChannelState): string {
  switch (object) {
    case ICAAccount_ChannelState.ICA_CHANNEL_CREATING:
      return "ICA_CHANNEL_CREATING";
    case ICAAccount_ChannelState.ICA_CHANNEL_CREATED:
      return "ICA_CHANNEL_CREATED";
    case ICAAccount_ChannelState.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
export enum Deposit_DepositState {
  /** DEPOSIT_PENDING - no action has been initiated on the deposit */
  DEPOSIT_PENDING = 0,
  /** DEPOSIT_SENT - deposit sent to the host chain delegator address */
  DEPOSIT_SENT = 1,
  /** DEPOSIT_RECEIVED - deposit received by the host chain delegator address */
  DEPOSIT_RECEIVED = 2,
  /** DEPOSIT_DELEGATING - delegation submitted for the deposit on the host chain */
  DEPOSIT_DELEGATING = 3,
  UNRECOGNIZED = -1,
}
export const Deposit_DepositStateSDKType = Deposit_DepositState;
export const Deposit_DepositStateAmino = Deposit_DepositState;
export function deposit_DepositStateFromJSON(object: any): Deposit_DepositState {
  switch (object) {
    case 0:
    case "DEPOSIT_PENDING":
      return Deposit_DepositState.DEPOSIT_PENDING;
    case 1:
    case "DEPOSIT_SENT":
      return Deposit_DepositState.DEPOSIT_SENT;
    case 2:
    case "DEPOSIT_RECEIVED":
      return Deposit_DepositState.DEPOSIT_RECEIVED;
    case 3:
    case "DEPOSIT_DELEGATING":
      return Deposit_DepositState.DEPOSIT_DELEGATING;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Deposit_DepositState.UNRECOGNIZED;
  }
}
export function deposit_DepositStateToJSON(object: Deposit_DepositState): string {
  switch (object) {
    case Deposit_DepositState.DEPOSIT_PENDING:
      return "DEPOSIT_PENDING";
    case Deposit_DepositState.DEPOSIT_SENT:
      return "DEPOSIT_SENT";
    case Deposit_DepositState.DEPOSIT_RECEIVED:
      return "DEPOSIT_RECEIVED";
    case Deposit_DepositState.DEPOSIT_DELEGATING:
      return "DEPOSIT_DELEGATING";
    case Deposit_DepositState.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
export enum LSMDeposit_LSMDepositState {
  /** DEPOSIT_PENDING - no action has been initiated on the deposit */
  DEPOSIT_PENDING = 0,
  /** DEPOSIT_SENT - deposit sent to the host chain delegator address */
  DEPOSIT_SENT = 1,
  /** DEPOSIT_RECEIVED - deposit received by the host chain delegator address */
  DEPOSIT_RECEIVED = 2,
  /** DEPOSIT_UNTOKENIZING - deposit started the untokenization process */
  DEPOSIT_UNTOKENIZING = 3,
  UNRECOGNIZED = -1,
}
export const LSMDeposit_LSMDepositStateSDKType = LSMDeposit_LSMDepositState;
export const LSMDeposit_LSMDepositStateAmino = LSMDeposit_LSMDepositState;
export function lSMDeposit_LSMDepositStateFromJSON(object: any): LSMDeposit_LSMDepositState {
  switch (object) {
    case 0:
    case "DEPOSIT_PENDING":
      return LSMDeposit_LSMDepositState.DEPOSIT_PENDING;
    case 1:
    case "DEPOSIT_SENT":
      return LSMDeposit_LSMDepositState.DEPOSIT_SENT;
    case 2:
    case "DEPOSIT_RECEIVED":
      return LSMDeposit_LSMDepositState.DEPOSIT_RECEIVED;
    case 3:
    case "DEPOSIT_UNTOKENIZING":
      return LSMDeposit_LSMDepositState.DEPOSIT_UNTOKENIZING;
    case -1:
    case "UNRECOGNIZED":
    default:
      return LSMDeposit_LSMDepositState.UNRECOGNIZED;
  }
}
export function lSMDeposit_LSMDepositStateToJSON(object: LSMDeposit_LSMDepositState): string {
  switch (object) {
    case LSMDeposit_LSMDepositState.DEPOSIT_PENDING:
      return "DEPOSIT_PENDING";
    case LSMDeposit_LSMDepositState.DEPOSIT_SENT:
      return "DEPOSIT_SENT";
    case LSMDeposit_LSMDepositState.DEPOSIT_RECEIVED:
      return "DEPOSIT_RECEIVED";
    case LSMDeposit_LSMDepositState.DEPOSIT_UNTOKENIZING:
      return "DEPOSIT_UNTOKENIZING";
    case LSMDeposit_LSMDepositState.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
export enum Unbonding_UnbondingState {
  /** UNBONDING_PENDING - no action has been initiated on the unbonding */
  UNBONDING_PENDING = 0,
  /** UNBONDING_INITIATED - unbonding action has been sent to the host chain */
  UNBONDING_INITIATED = 1,
  /** UNBONDING_MATURING - unbonding is waiting for the maturing period of the host chain */
  UNBONDING_MATURING = 2,
  /** UNBONDING_MATURED - unbonding has matured and is ready to transfer from the host chain */
  UNBONDING_MATURED = 3,
  /** UNBONDING_CLAIMABLE - unbonding is on the persistence chain and can be claimed */
  UNBONDING_CLAIMABLE = 4,
  /** UNBONDING_FAILED - unbonding has failed */
  UNBONDING_FAILED = 5,
  UNRECOGNIZED = -1,
}
export const Unbonding_UnbondingStateSDKType = Unbonding_UnbondingState;
export const Unbonding_UnbondingStateAmino = Unbonding_UnbondingState;
export function unbonding_UnbondingStateFromJSON(object: any): Unbonding_UnbondingState {
  switch (object) {
    case 0:
    case "UNBONDING_PENDING":
      return Unbonding_UnbondingState.UNBONDING_PENDING;
    case 1:
    case "UNBONDING_INITIATED":
      return Unbonding_UnbondingState.UNBONDING_INITIATED;
    case 2:
    case "UNBONDING_MATURING":
      return Unbonding_UnbondingState.UNBONDING_MATURING;
    case 3:
    case "UNBONDING_MATURED":
      return Unbonding_UnbondingState.UNBONDING_MATURED;
    case 4:
    case "UNBONDING_CLAIMABLE":
      return Unbonding_UnbondingState.UNBONDING_CLAIMABLE;
    case 5:
    case "UNBONDING_FAILED":
      return Unbonding_UnbondingState.UNBONDING_FAILED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Unbonding_UnbondingState.UNRECOGNIZED;
  }
}
export function unbonding_UnbondingStateToJSON(object: Unbonding_UnbondingState): string {
  switch (object) {
    case Unbonding_UnbondingState.UNBONDING_PENDING:
      return "UNBONDING_PENDING";
    case Unbonding_UnbondingState.UNBONDING_INITIATED:
      return "UNBONDING_INITIATED";
    case Unbonding_UnbondingState.UNBONDING_MATURING:
      return "UNBONDING_MATURING";
    case Unbonding_UnbondingState.UNBONDING_MATURED:
      return "UNBONDING_MATURED";
    case Unbonding_UnbondingState.UNBONDING_CLAIMABLE:
      return "UNBONDING_CLAIMABLE";
    case Unbonding_UnbondingState.UNBONDING_FAILED:
      return "UNBONDING_FAILED";
    case Unbonding_UnbondingState.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
export enum RedelegateTx_RedelegateTxState {
  /** REDELEGATE_SENT - redelegate txn sent */
  REDELEGATE_SENT = 0,
  /** REDELEGATE_ACKED - redelegate txn acked */
  REDELEGATE_ACKED = 1,
  UNRECOGNIZED = -1,
}
export const RedelegateTx_RedelegateTxStateSDKType = RedelegateTx_RedelegateTxState;
export const RedelegateTx_RedelegateTxStateAmino = RedelegateTx_RedelegateTxState;
export function redelegateTx_RedelegateTxStateFromJSON(object: any): RedelegateTx_RedelegateTxState {
  switch (object) {
    case 0:
    case "REDELEGATE_SENT":
      return RedelegateTx_RedelegateTxState.REDELEGATE_SENT;
    case 1:
    case "REDELEGATE_ACKED":
      return RedelegateTx_RedelegateTxState.REDELEGATE_ACKED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return RedelegateTx_RedelegateTxState.UNRECOGNIZED;
  }
}
export function redelegateTx_RedelegateTxStateToJSON(object: RedelegateTx_RedelegateTxState): string {
  switch (object) {
    case RedelegateTx_RedelegateTxState.REDELEGATE_SENT:
      return "REDELEGATE_SENT";
    case RedelegateTx_RedelegateTxState.REDELEGATE_ACKED:
      return "REDELEGATE_ACKED";
    case RedelegateTx_RedelegateTxState.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
export interface HostChain {
  /** host chain id */
  chainId: string;
  /** ibc connection id */
  connectionId: string;
  /** module params */
  params?: HostChainLSParams | undefined;
  /** native token denom */
  hostDenom: string;
  /** ibc connection channel id */
  channelId: string;
  /** ibc connection port id */
  portId: string;
  /** delegation host account */
  delegationAccount?: ICAAccount | undefined;
  /** reward host account */
  rewardsAccount?: ICAAccount | undefined;
  /** validator set */
  validators: Validator[];
  /** minimum ls amount */
  minimumDeposit: string;
  /** redemption rate */
  cValue: string;
  /** previous redemption rate */
  lastCValue: string;
  /** undelegation epoch factor */
  unbondingFactor: bigint;
  /** whether the chain is ready to accept delegations or not */
  active: boolean;
  /** factor limit for auto-compounding, daily periodic rate (APY / 365s) */
  autoCompoundFactor: string;
  /** host chain flags */
  flags?: HostChainFlags | undefined;
  /** non-compoundable chain reward params */
  rewardParams?: RewardParams | undefined;
}
export interface HostChainProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.HostChain";
  value: Uint8Array;
}
export interface HostChainAmino {
  /** host chain id */
  chain_id?: string;
  /** ibc connection id */
  connection_id?: string;
  /** module params */
  params?: HostChainLSParamsAmino | undefined;
  /** native token denom */
  host_denom?: string;
  /** ibc connection channel id */
  channel_id?: string;
  /** ibc connection port id */
  port_id?: string;
  /** delegation host account */
  delegation_account?: ICAAccountAmino | undefined;
  /** reward host account */
  rewards_account?: ICAAccountAmino | undefined;
  /** validator set */
  validators?: ValidatorAmino[];
  /** minimum ls amount */
  minimum_deposit?: string;
  /** redemption rate */
  c_value?: string;
  /** previous redemption rate */
  last_c_value?: string;
  /** undelegation epoch factor */
  unbonding_factor?: string;
  /** whether the chain is ready to accept delegations or not */
  active?: boolean;
  /** factor limit for auto-compounding, daily periodic rate (APY / 365s) */
  auto_compound_factor?: string;
  /** host chain flags */
  flags?: HostChainFlagsAmino | undefined;
  /** non-compoundable chain reward params */
  reward_params?: RewardParamsAmino | undefined;
}
export interface HostChainAminoMsg {
  type: "/pstake.liquidstakeibc.v1beta1.HostChain";
  value: HostChainAmino;
}
export interface HostChainSDKType {
  chain_id: string;
  connection_id: string;
  params?: HostChainLSParamsSDKType | undefined;
  host_denom: string;
  channel_id: string;
  port_id: string;
  delegation_account?: ICAAccountSDKType | undefined;
  rewards_account?: ICAAccountSDKType | undefined;
  validators: ValidatorSDKType[];
  minimum_deposit: string;
  c_value: string;
  last_c_value: string;
  unbonding_factor: bigint;
  active: boolean;
  auto_compound_factor: string;
  flags?: HostChainFlagsSDKType | undefined;
  reward_params?: RewardParamsSDKType | undefined;
}
export interface HostChainFlags {
  lsm: boolean;
}
export interface HostChainFlagsProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.HostChainFlags";
  value: Uint8Array;
}
export interface HostChainFlagsAmino {
  lsm?: boolean;
}
export interface HostChainFlagsAminoMsg {
  type: "/pstake.liquidstakeibc.v1beta1.HostChainFlags";
  value: HostChainFlagsAmino;
}
export interface HostChainFlagsSDKType {
  lsm: boolean;
}
export interface RewardParams {
  /** rewards denom on the host chain */
  denom: string;
  /** entity which will convert rewards to the host denom */
  destination: string;
}
export interface RewardParamsProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.RewardParams";
  value: Uint8Array;
}
export interface RewardParamsAmino {
  /** rewards denom on the host chain */
  denom?: string;
  /** entity which will convert rewards to the host denom */
  destination?: string;
}
export interface RewardParamsAminoMsg {
  type: "/pstake.liquidstakeibc.v1beta1.RewardParams";
  value: RewardParamsAmino;
}
export interface RewardParamsSDKType {
  denom: string;
  destination: string;
}
export interface HostChainLSParams {
  depositFee: string;
  restakeFee: string;
  unstakeFee: string;
  redemptionFee: string;
  lsmValidatorCap: string;
  /**
   * LSM bond factor
   *  Should be used only when HostChainFlag.Lsm == true, orelse default
   */
  lsmBondFactor: string;
  /** UndelegateEntries */
  maxEntries: number;
  /** amount skew that is acceptable before redelegating */
  redelegationAcceptableDelta: string;
  upperCValueLimit: string;
  lowerCValueLimit: string;
}
export interface HostChainLSParamsProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.HostChainLSParams";
  value: Uint8Array;
}
export interface HostChainLSParamsAmino {
  deposit_fee?: string;
  restake_fee?: string;
  unstake_fee?: string;
  redemption_fee?: string;
  lsm_validator_cap?: string;
  /**
   * LSM bond factor
   *  Should be used only when HostChainFlag.Lsm == true, orelse default
   */
  lsm_bond_factor?: string;
  /** UndelegateEntries */
  max_entries?: number;
  /** amount skew that is acceptable before redelegating */
  redelegation_acceptable_delta?: string;
  upper_c_value_limit?: string;
  lower_c_value_limit?: string;
}
export interface HostChainLSParamsAminoMsg {
  type: "/pstake.liquidstakeibc.v1beta1.HostChainLSParams";
  value: HostChainLSParamsAmino;
}
export interface HostChainLSParamsSDKType {
  deposit_fee: string;
  restake_fee: string;
  unstake_fee: string;
  redemption_fee: string;
  lsm_validator_cap: string;
  lsm_bond_factor: string;
  max_entries: number;
  redelegation_acceptable_delta: string;
  upper_c_value_limit: string;
  lower_c_value_limit: string;
}
export interface ICAAccount {
  /** address of the ica on the controller chain */
  address: string;
  /** token balance of the ica */
  balance: Coin | undefined;
  /** owner string */
  owner: string;
  channelState: ICAAccount_ChannelState;
}
export interface ICAAccountProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.ICAAccount";
  value: Uint8Array;
}
export interface ICAAccountAmino {
  /** address of the ica on the controller chain */
  address?: string;
  /** token balance of the ica */
  balance?: CoinAmino | undefined;
  /** owner string */
  owner?: string;
  channel_state?: ICAAccount_ChannelState;
}
export interface ICAAccountAminoMsg {
  type: "/pstake.liquidstakeibc.v1beta1.ICAAccount";
  value: ICAAccountAmino;
}
export interface ICAAccountSDKType {
  address: string;
  balance: CoinSDKType | undefined;
  owner: string;
  channel_state: ICAAccount_ChannelState;
}
export interface Validator {
  /** valoper address */
  operatorAddress: string;
  /** validator status */
  status: string;
  /** validator weight in the set */
  weight: string;
  /** amount delegated by the module to the validator */
  delegatedAmount: string;
  /**
   * the validator token exchange rate, total bonded tokens divided by total
   * shares issued
   */
  exchangeRate: string;
  /** the unbonding epoch number when the validator transitioned into the state */
  unbondingEpoch: bigint;
  /**
   * whether the validator can accept delegations or not, default true for
   * non-lsm chains
   */
  delegable: boolean;
}
export interface ValidatorProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.Validator";
  value: Uint8Array;
}
export interface ValidatorAmino {
  /** valoper address */
  operator_address?: string;
  /** validator status */
  status?: string;
  /** validator weight in the set */
  weight?: string;
  /** amount delegated by the module to the validator */
  delegated_amount?: string;
  /**
   * the validator token exchange rate, total bonded tokens divided by total
   * shares issued
   */
  exchange_rate?: string;
  /** the unbonding epoch number when the validator transitioned into the state */
  unbonding_epoch?: string;
  /**
   * whether the validator can accept delegations or not, default true for
   * non-lsm chains
   */
  delegable?: boolean;
}
export interface ValidatorAminoMsg {
  type: "/pstake.liquidstakeibc.v1beta1.Validator";
  value: ValidatorAmino;
}
export interface ValidatorSDKType {
  operator_address: string;
  status: string;
  weight: string;
  delegated_amount: string;
  exchange_rate: string;
  unbonding_epoch: bigint;
  delegable: boolean;
}
export interface Deposit {
  /** deposit target chain */
  chainId: string;
  amount: Coin | undefined;
  /** epoch number of the deposit */
  epoch: bigint;
  /** state */
  state: Deposit_DepositState;
  /** sequence id of the ibc transaction */
  ibcSequenceId: string;
}
export interface DepositProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.Deposit";
  value: Uint8Array;
}
export interface DepositAmino {
  /** deposit target chain */
  chain_id?: string;
  amount?: CoinAmino | undefined;
  /** epoch number of the deposit */
  epoch?: string;
  /** state */
  state?: Deposit_DepositState;
  /** sequence id of the ibc transaction */
  ibc_sequence_id?: string;
}
export interface DepositAminoMsg {
  type: "/pstake.liquidstakeibc.v1beta1.Deposit";
  value: DepositAmino;
}
export interface DepositSDKType {
  chain_id: string;
  amount: CoinSDKType | undefined;
  epoch: bigint;
  state: Deposit_DepositState;
  ibc_sequence_id: string;
}
export interface LSMDeposit {
  /** deposit target chain */
  chainId: string;
  /**
   * this is calculated when liquid staking [lsm_shares *
   * validator_exchange_rate]
   */
  amount: string;
  /**
   * LSM token shares, they are mapped 1:1 with the delegator shares that are
   * tokenized https://github.com/iqlusioninc/cosmos-sdk/pull/19
   */
  shares: string;
  /** LSM token denom */
  denom: string;
  /** LSM token ibc denom */
  ibcDenom: string;
  /** address of the delegator */
  delegatorAddress: string;
  /** state o the deposit */
  state: LSMDeposit_LSMDepositState;
  /** sequence id of the ibc transaction */
  ibcSequenceId: string;
}
export interface LSMDepositProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.LSMDeposit";
  value: Uint8Array;
}
export interface LSMDepositAmino {
  /** deposit target chain */
  chain_id?: string;
  /**
   * this is calculated when liquid staking [lsm_shares *
   * validator_exchange_rate]
   */
  amount?: string;
  /**
   * LSM token shares, they are mapped 1:1 with the delegator shares that are
   * tokenized https://github.com/iqlusioninc/cosmos-sdk/pull/19
   */
  shares?: string;
  /** LSM token denom */
  denom?: string;
  /** LSM token ibc denom */
  ibc_denom?: string;
  /** address of the delegator */
  delegator_address?: string;
  /** state o the deposit */
  state?: LSMDeposit_LSMDepositState;
  /** sequence id of the ibc transaction */
  ibc_sequence_id?: string;
}
export interface LSMDepositAminoMsg {
  type: "/pstake.liquidstakeibc.v1beta1.LSMDeposit";
  value: LSMDepositAmino;
}
export interface LSMDepositSDKType {
  chain_id: string;
  amount: string;
  shares: string;
  denom: string;
  ibc_denom: string;
  delegator_address: string;
  state: LSMDeposit_LSMDepositState;
  ibc_sequence_id: string;
}
export interface Unbonding {
  /** unbonding target chain */
  chainId: string;
  /** epoch number of the unbonding record */
  epochNumber: bigint;
  /** time when the unbonding matures and can be collected */
  matureTime: Date | undefined;
  /** stk token amount that is burned with the unbonding */
  burnAmount: Coin | undefined;
  /** host token amount that is being unbonded */
  unbondAmount: Coin | undefined;
  /** sequence id of the ibc transaction */
  ibcSequenceId: string;
  /** state of the unbonding during the process */
  state: Unbonding_UnbondingState;
}
export interface UnbondingProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.Unbonding";
  value: Uint8Array;
}
export interface UnbondingAmino {
  /** unbonding target chain */
  chain_id?: string;
  /** epoch number of the unbonding record */
  epoch_number?: string;
  /** time when the unbonding matures and can be collected */
  mature_time?: string | undefined;
  /** stk token amount that is burned with the unbonding */
  burn_amount?: CoinAmino | undefined;
  /** host token amount that is being unbonded */
  unbond_amount?: CoinAmino | undefined;
  /** sequence id of the ibc transaction */
  ibc_sequence_id?: string;
  /** state of the unbonding during the process */
  state?: Unbonding_UnbondingState;
}
export interface UnbondingAminoMsg {
  type: "/pstake.liquidstakeibc.v1beta1.Unbonding";
  value: UnbondingAmino;
}
export interface UnbondingSDKType {
  chain_id: string;
  epoch_number: bigint;
  mature_time: Date | undefined;
  burn_amount: CoinSDKType | undefined;
  unbond_amount: CoinSDKType | undefined;
  ibc_sequence_id: string;
  state: Unbonding_UnbondingState;
}
export interface UserUnbonding {
  /** unbonding target chain */
  chainId: string;
  /** epoch when the unbonding started */
  epochNumber: bigint;
  /** address which requested the unbonding */
  address: string;
  /** stk token amount that is being unbonded */
  stkAmount: Coin | undefined;
  /** host token amount that is being unbonded */
  unbondAmount: Coin | undefined;
}
export interface UserUnbondingProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.UserUnbonding";
  value: Uint8Array;
}
export interface UserUnbondingAmino {
  /** unbonding target chain */
  chain_id?: string;
  /** epoch when the unbonding started */
  epoch_number?: string;
  /** address which requested the unbonding */
  address?: string;
  /** stk token amount that is being unbonded */
  stk_amount?: CoinAmino | undefined;
  /** host token amount that is being unbonded */
  unbond_amount?: CoinAmino | undefined;
}
export interface UserUnbondingAminoMsg {
  type: "/pstake.liquidstakeibc.v1beta1.UserUnbonding";
  value: UserUnbondingAmino;
}
export interface UserUnbondingSDKType {
  chain_id: string;
  epoch_number: bigint;
  address: string;
  stk_amount: CoinSDKType | undefined;
  unbond_amount: CoinSDKType | undefined;
}
export interface ValidatorUnbonding {
  /** unbonding target chain */
  chainId: string;
  /** epoch when the unbonding started */
  epochNumber: bigint;
  /** time when the unbonding matures and can be collected */
  matureTime: Date | undefined;
  /** address of the validator that is being unbonded */
  validatorAddress: string;
  /** amount unbonded from the validator */
  amount: Coin | undefined;
  /** sequence id of the ibc transaction */
  ibcSequenceId: string;
}
export interface ValidatorUnbondingProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.ValidatorUnbonding";
  value: Uint8Array;
}
export interface ValidatorUnbondingAmino {
  /** unbonding target chain */
  chain_id?: string;
  /** epoch when the unbonding started */
  epoch_number?: string;
  /** time when the unbonding matures and can be collected */
  mature_time?: string | undefined;
  /** address of the validator that is being unbonded */
  validator_address?: string;
  /** amount unbonded from the validator */
  amount?: CoinAmino | undefined;
  /** sequence id of the ibc transaction */
  ibc_sequence_id?: string;
}
export interface ValidatorUnbondingAminoMsg {
  type: "/pstake.liquidstakeibc.v1beta1.ValidatorUnbonding";
  value: ValidatorUnbondingAmino;
}
export interface ValidatorUnbondingSDKType {
  chain_id: string;
  epoch_number: bigint;
  mature_time: Date | undefined;
  validator_address: string;
  amount: CoinSDKType | undefined;
  ibc_sequence_id: string;
}
export interface KVUpdate {
  key: string;
  value: string;
}
export interface KVUpdateProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.KVUpdate";
  value: Uint8Array;
}
export interface KVUpdateAmino {
  key?: string;
  value?: string;
}
export interface KVUpdateAminoMsg {
  type: "/pstake.liquidstakeibc.v1beta1.KVUpdate";
  value: KVUpdateAmino;
}
export interface KVUpdateSDKType {
  key: string;
  value: string;
}
export interface Redelegations {
  chainID: string;
  redelegations: Redelegation[];
}
export interface RedelegationsProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.Redelegations";
  value: Uint8Array;
}
export interface RedelegationsAmino {
  chain_i_d?: string;
  redelegations?: RedelegationAmino[];
}
export interface RedelegationsAminoMsg {
  type: "/pstake.liquidstakeibc.v1beta1.Redelegations";
  value: RedelegationsAmino;
}
export interface RedelegationsSDKType {
  chain_i_d: string;
  redelegations: RedelegationSDKType[];
}
export interface RedelegateTx {
  /** target chain */
  chainId: string;
  ibcSequenceId: string;
  /** state of the unbonding during the process */
  state: RedelegateTx_RedelegateTxState;
}
export interface RedelegateTxProtoMsg {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.RedelegateTx";
  value: Uint8Array;
}
export interface RedelegateTxAmino {
  /** target chain */
  chain_id?: string;
  ibc_sequence_id?: string;
  /** state of the unbonding during the process */
  state?: RedelegateTx_RedelegateTxState;
}
export interface RedelegateTxAminoMsg {
  type: "/pstake.liquidstakeibc.v1beta1.RedelegateTx";
  value: RedelegateTxAmino;
}
export interface RedelegateTxSDKType {
  chain_id: string;
  ibc_sequence_id: string;
  state: RedelegateTx_RedelegateTxState;
}
function createBaseHostChain(): HostChain {
  return {
    chainId: "",
    connectionId: "",
    params: undefined,
    hostDenom: "",
    channelId: "",
    portId: "",
    delegationAccount: undefined,
    rewardsAccount: undefined,
    validators: [],
    minimumDeposit: "",
    cValue: "",
    lastCValue: "",
    unbondingFactor: BigInt(0),
    active: false,
    autoCompoundFactor: "",
    flags: undefined,
    rewardParams: undefined
  };
}
export const HostChain = {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.HostChain",
  encode(message: HostChain, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    if (message.connectionId !== "") {
      writer.uint32(18).string(message.connectionId);
    }
    if (message.params !== undefined) {
      HostChainLSParams.encode(message.params, writer.uint32(26).fork()).ldelim();
    }
    if (message.hostDenom !== "") {
      writer.uint32(34).string(message.hostDenom);
    }
    if (message.channelId !== "") {
      writer.uint32(42).string(message.channelId);
    }
    if (message.portId !== "") {
      writer.uint32(50).string(message.portId);
    }
    if (message.delegationAccount !== undefined) {
      ICAAccount.encode(message.delegationAccount, writer.uint32(58).fork()).ldelim();
    }
    if (message.rewardsAccount !== undefined) {
      ICAAccount.encode(message.rewardsAccount, writer.uint32(66).fork()).ldelim();
    }
    for (const v of message.validators) {
      Validator.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    if (message.minimumDeposit !== "") {
      writer.uint32(82).string(message.minimumDeposit);
    }
    if (message.cValue !== "") {
      writer.uint32(90).string(Decimal.fromUserInput(message.cValue, 18).atomics);
    }
    if (message.lastCValue !== "") {
      writer.uint32(98).string(Decimal.fromUserInput(message.lastCValue, 18).atomics);
    }
    if (message.unbondingFactor !== BigInt(0)) {
      writer.uint32(104).int64(message.unbondingFactor);
    }
    if (message.active === true) {
      writer.uint32(112).bool(message.active);
    }
    if (message.autoCompoundFactor !== "") {
      writer.uint32(122).string(Decimal.fromUserInput(message.autoCompoundFactor, 18).atomics);
    }
    if (message.flags !== undefined) {
      HostChainFlags.encode(message.flags, writer.uint32(130).fork()).ldelim();
    }
    if (message.rewardParams !== undefined) {
      RewardParams.encode(message.rewardParams, writer.uint32(138).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): HostChain {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostChain();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        case 2:
          message.connectionId = reader.string();
          break;
        case 3:
          message.params = HostChainLSParams.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 4:
          message.hostDenom = reader.string();
          break;
        case 5:
          message.channelId = reader.string();
          break;
        case 6:
          message.portId = reader.string();
          break;
        case 7:
          message.delegationAccount = ICAAccount.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 8:
          message.rewardsAccount = ICAAccount.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 9:
          message.validators.push(Validator.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 10:
          message.minimumDeposit = reader.string();
          break;
        case 11:
          message.cValue = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 12:
          message.lastCValue = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 13:
          message.unbondingFactor = reader.int64();
          break;
        case 14:
          message.active = reader.bool();
          break;
        case 15:
          message.autoCompoundFactor = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 16:
          message.flags = HostChainFlags.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 17:
          message.rewardParams = RewardParams.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<HostChain>): HostChain {
    const message = createBaseHostChain();
    message.chainId = object.chainId ?? "";
    message.connectionId = object.connectionId ?? "";
    message.params = object.params !== undefined && object.params !== null ? HostChainLSParams.fromPartial(object.params) : undefined;
    message.hostDenom = object.hostDenom ?? "";
    message.channelId = object.channelId ?? "";
    message.portId = object.portId ?? "";
    message.delegationAccount = object.delegationAccount !== undefined && object.delegationAccount !== null ? ICAAccount.fromPartial(object.delegationAccount) : undefined;
    message.rewardsAccount = object.rewardsAccount !== undefined && object.rewardsAccount !== null ? ICAAccount.fromPartial(object.rewardsAccount) : undefined;
    message.validators = object.validators?.map(e => Validator.fromPartial(e)) || [];
    message.minimumDeposit = object.minimumDeposit ?? "";
    message.cValue = object.cValue ?? "";
    message.lastCValue = object.lastCValue ?? "";
    message.unbondingFactor = object.unbondingFactor !== undefined && object.unbondingFactor !== null ? BigInt(object.unbondingFactor.toString()) : BigInt(0);
    message.active = object.active ?? false;
    message.autoCompoundFactor = object.autoCompoundFactor ?? "";
    message.flags = object.flags !== undefined && object.flags !== null ? HostChainFlags.fromPartial(object.flags) : undefined;
    message.rewardParams = object.rewardParams !== undefined && object.rewardParams !== null ? RewardParams.fromPartial(object.rewardParams) : undefined;
    return message;
  },
  fromAmino(object: HostChainAmino): HostChain {
    const message = createBaseHostChain();
    if (object.chain_id !== undefined && object.chain_id !== null) {
      message.chainId = object.chain_id;
    }
    if (object.connection_id !== undefined && object.connection_id !== null) {
      message.connectionId = object.connection_id;
    }
    if (object.params !== undefined && object.params !== null) {
      message.params = HostChainLSParams.fromAmino(object.params);
    }
    if (object.host_denom !== undefined && object.host_denom !== null) {
      message.hostDenom = object.host_denom;
    }
    if (object.channel_id !== undefined && object.channel_id !== null) {
      message.channelId = object.channel_id;
    }
    if (object.port_id !== undefined && object.port_id !== null) {
      message.portId = object.port_id;
    }
    if (object.delegation_account !== undefined && object.delegation_account !== null) {
      message.delegationAccount = ICAAccount.fromAmino(object.delegation_account);
    }
    if (object.rewards_account !== undefined && object.rewards_account !== null) {
      message.rewardsAccount = ICAAccount.fromAmino(object.rewards_account);
    }
    message.validators = object.validators?.map(e => Validator.fromAmino(e)) || [];
    if (object.minimum_deposit !== undefined && object.minimum_deposit !== null) {
      message.minimumDeposit = object.minimum_deposit;
    }
    if (object.c_value !== undefined && object.c_value !== null) {
      message.cValue = object.c_value;
    }
    if (object.last_c_value !== undefined && object.last_c_value !== null) {
      message.lastCValue = object.last_c_value;
    }
    if (object.unbonding_factor !== undefined && object.unbonding_factor !== null) {
      message.unbondingFactor = BigInt(object.unbonding_factor);
    }
    if (object.active !== undefined && object.active !== null) {
      message.active = object.active;
    }
    if (object.auto_compound_factor !== undefined && object.auto_compound_factor !== null) {
      message.autoCompoundFactor = object.auto_compound_factor;
    }
    if (object.flags !== undefined && object.flags !== null) {
      message.flags = HostChainFlags.fromAmino(object.flags);
    }
    if (object.reward_params !== undefined && object.reward_params !== null) {
      message.rewardParams = RewardParams.fromAmino(object.reward_params);
    }
    return message;
  },
  toAmino(message: HostChain, useInterfaces: boolean = false): HostChainAmino {
    const obj: any = {};
    obj.chain_id = message.chainId;
    obj.connection_id = message.connectionId;
    obj.params = message.params ? HostChainLSParams.toAmino(message.params, useInterfaces) : undefined;
    obj.host_denom = message.hostDenom;
    obj.channel_id = message.channelId;
    obj.port_id = message.portId;
    obj.delegation_account = message.delegationAccount ? ICAAccount.toAmino(message.delegationAccount, useInterfaces) : undefined;
    obj.rewards_account = message.rewardsAccount ? ICAAccount.toAmino(message.rewardsAccount, useInterfaces) : undefined;
    if (message.validators) {
      obj.validators = message.validators.map(e => e ? Validator.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.validators = [];
    }
    obj.minimum_deposit = message.minimumDeposit;
    obj.c_value = message.cValue;
    obj.last_c_value = message.lastCValue;
    obj.unbonding_factor = message.unbondingFactor ? message.unbondingFactor.toString() : undefined;
    obj.active = message.active;
    obj.auto_compound_factor = message.autoCompoundFactor;
    obj.flags = message.flags ? HostChainFlags.toAmino(message.flags, useInterfaces) : undefined;
    obj.reward_params = message.rewardParams ? RewardParams.toAmino(message.rewardParams, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: HostChainAminoMsg): HostChain {
    return HostChain.fromAmino(object.value);
  },
  fromProtoMsg(message: HostChainProtoMsg, useInterfaces: boolean = false): HostChain {
    return HostChain.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: HostChain): Uint8Array {
    return HostChain.encode(message).finish();
  },
  toProtoMsg(message: HostChain): HostChainProtoMsg {
    return {
      typeUrl: "/pstake.liquidstakeibc.v1beta1.HostChain",
      value: HostChain.encode(message).finish()
    };
  }
};
function createBaseHostChainFlags(): HostChainFlags {
  return {
    lsm: false
  };
}
export const HostChainFlags = {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.HostChainFlags",
  encode(message: HostChainFlags, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.lsm === true) {
      writer.uint32(8).bool(message.lsm);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): HostChainFlags {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostChainFlags();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.lsm = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<HostChainFlags>): HostChainFlags {
    const message = createBaseHostChainFlags();
    message.lsm = object.lsm ?? false;
    return message;
  },
  fromAmino(object: HostChainFlagsAmino): HostChainFlags {
    const message = createBaseHostChainFlags();
    if (object.lsm !== undefined && object.lsm !== null) {
      message.lsm = object.lsm;
    }
    return message;
  },
  toAmino(message: HostChainFlags, useInterfaces: boolean = false): HostChainFlagsAmino {
    const obj: any = {};
    obj.lsm = message.lsm;
    return obj;
  },
  fromAminoMsg(object: HostChainFlagsAminoMsg): HostChainFlags {
    return HostChainFlags.fromAmino(object.value);
  },
  fromProtoMsg(message: HostChainFlagsProtoMsg, useInterfaces: boolean = false): HostChainFlags {
    return HostChainFlags.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: HostChainFlags): Uint8Array {
    return HostChainFlags.encode(message).finish();
  },
  toProtoMsg(message: HostChainFlags): HostChainFlagsProtoMsg {
    return {
      typeUrl: "/pstake.liquidstakeibc.v1beta1.HostChainFlags",
      value: HostChainFlags.encode(message).finish()
    };
  }
};
function createBaseRewardParams(): RewardParams {
  return {
    denom: "",
    destination: ""
  };
}
export const RewardParams = {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.RewardParams",
  encode(message: RewardParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.destination !== "") {
      writer.uint32(18).string(message.destination);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): RewardParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRewardParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.destination = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<RewardParams>): RewardParams {
    const message = createBaseRewardParams();
    message.denom = object.denom ?? "";
    message.destination = object.destination ?? "";
    return message;
  },
  fromAmino(object: RewardParamsAmino): RewardParams {
    const message = createBaseRewardParams();
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.destination !== undefined && object.destination !== null) {
      message.destination = object.destination;
    }
    return message;
  },
  toAmino(message: RewardParams, useInterfaces: boolean = false): RewardParamsAmino {
    const obj: any = {};
    obj.denom = message.denom;
    obj.destination = message.destination;
    return obj;
  },
  fromAminoMsg(object: RewardParamsAminoMsg): RewardParams {
    return RewardParams.fromAmino(object.value);
  },
  fromProtoMsg(message: RewardParamsProtoMsg, useInterfaces: boolean = false): RewardParams {
    return RewardParams.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: RewardParams): Uint8Array {
    return RewardParams.encode(message).finish();
  },
  toProtoMsg(message: RewardParams): RewardParamsProtoMsg {
    return {
      typeUrl: "/pstake.liquidstakeibc.v1beta1.RewardParams",
      value: RewardParams.encode(message).finish()
    };
  }
};
function createBaseHostChainLSParams(): HostChainLSParams {
  return {
    depositFee: "",
    restakeFee: "",
    unstakeFee: "",
    redemptionFee: "",
    lsmValidatorCap: "",
    lsmBondFactor: "",
    maxEntries: 0,
    redelegationAcceptableDelta: "",
    upperCValueLimit: "",
    lowerCValueLimit: ""
  };
}
export const HostChainLSParams = {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.HostChainLSParams",
  encode(message: HostChainLSParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.depositFee !== "") {
      writer.uint32(10).string(Decimal.fromUserInput(message.depositFee, 18).atomics);
    }
    if (message.restakeFee !== "") {
      writer.uint32(18).string(Decimal.fromUserInput(message.restakeFee, 18).atomics);
    }
    if (message.unstakeFee !== "") {
      writer.uint32(26).string(Decimal.fromUserInput(message.unstakeFee, 18).atomics);
    }
    if (message.redemptionFee !== "") {
      writer.uint32(34).string(Decimal.fromUserInput(message.redemptionFee, 18).atomics);
    }
    if (message.lsmValidatorCap !== "") {
      writer.uint32(50).string(Decimal.fromUserInput(message.lsmValidatorCap, 18).atomics);
    }
    if (message.lsmBondFactor !== "") {
      writer.uint32(58).string(Decimal.fromUserInput(message.lsmBondFactor, 18).atomics);
    }
    if (message.maxEntries !== 0) {
      writer.uint32(64).uint32(message.maxEntries);
    }
    if (message.redelegationAcceptableDelta !== "") {
      writer.uint32(74).string(message.redelegationAcceptableDelta);
    }
    if (message.upperCValueLimit !== "") {
      writer.uint32(82).string(Decimal.fromUserInput(message.upperCValueLimit, 18).atomics);
    }
    if (message.lowerCValueLimit !== "") {
      writer.uint32(90).string(Decimal.fromUserInput(message.lowerCValueLimit, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): HostChainLSParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHostChainLSParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.depositFee = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 2:
          message.restakeFee = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 3:
          message.unstakeFee = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 4:
          message.redemptionFee = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 6:
          message.lsmValidatorCap = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 7:
          message.lsmBondFactor = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 8:
          message.maxEntries = reader.uint32();
          break;
        case 9:
          message.redelegationAcceptableDelta = reader.string();
          break;
        case 10:
          message.upperCValueLimit = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 11:
          message.lowerCValueLimit = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<HostChainLSParams>): HostChainLSParams {
    const message = createBaseHostChainLSParams();
    message.depositFee = object.depositFee ?? "";
    message.restakeFee = object.restakeFee ?? "";
    message.unstakeFee = object.unstakeFee ?? "";
    message.redemptionFee = object.redemptionFee ?? "";
    message.lsmValidatorCap = object.lsmValidatorCap ?? "";
    message.lsmBondFactor = object.lsmBondFactor ?? "";
    message.maxEntries = object.maxEntries ?? 0;
    message.redelegationAcceptableDelta = object.redelegationAcceptableDelta ?? "";
    message.upperCValueLimit = object.upperCValueLimit ?? "";
    message.lowerCValueLimit = object.lowerCValueLimit ?? "";
    return message;
  },
  fromAmino(object: HostChainLSParamsAmino): HostChainLSParams {
    const message = createBaseHostChainLSParams();
    if (object.deposit_fee !== undefined && object.deposit_fee !== null) {
      message.depositFee = object.deposit_fee;
    }
    if (object.restake_fee !== undefined && object.restake_fee !== null) {
      message.restakeFee = object.restake_fee;
    }
    if (object.unstake_fee !== undefined && object.unstake_fee !== null) {
      message.unstakeFee = object.unstake_fee;
    }
    if (object.redemption_fee !== undefined && object.redemption_fee !== null) {
      message.redemptionFee = object.redemption_fee;
    }
    if (object.lsm_validator_cap !== undefined && object.lsm_validator_cap !== null) {
      message.lsmValidatorCap = object.lsm_validator_cap;
    }
    if (object.lsm_bond_factor !== undefined && object.lsm_bond_factor !== null) {
      message.lsmBondFactor = object.lsm_bond_factor;
    }
    if (object.max_entries !== undefined && object.max_entries !== null) {
      message.maxEntries = object.max_entries;
    }
    if (object.redelegation_acceptable_delta !== undefined && object.redelegation_acceptable_delta !== null) {
      message.redelegationAcceptableDelta = object.redelegation_acceptable_delta;
    }
    if (object.upper_c_value_limit !== undefined && object.upper_c_value_limit !== null) {
      message.upperCValueLimit = object.upper_c_value_limit;
    }
    if (object.lower_c_value_limit !== undefined && object.lower_c_value_limit !== null) {
      message.lowerCValueLimit = object.lower_c_value_limit;
    }
    return message;
  },
  toAmino(message: HostChainLSParams, useInterfaces: boolean = false): HostChainLSParamsAmino {
    const obj: any = {};
    obj.deposit_fee = message.depositFee;
    obj.restake_fee = message.restakeFee;
    obj.unstake_fee = message.unstakeFee;
    obj.redemption_fee = message.redemptionFee;
    obj.lsm_validator_cap = message.lsmValidatorCap;
    obj.lsm_bond_factor = message.lsmBondFactor;
    obj.max_entries = message.maxEntries;
    obj.redelegation_acceptable_delta = message.redelegationAcceptableDelta;
    obj.upper_c_value_limit = message.upperCValueLimit;
    obj.lower_c_value_limit = message.lowerCValueLimit;
    return obj;
  },
  fromAminoMsg(object: HostChainLSParamsAminoMsg): HostChainLSParams {
    return HostChainLSParams.fromAmino(object.value);
  },
  fromProtoMsg(message: HostChainLSParamsProtoMsg, useInterfaces: boolean = false): HostChainLSParams {
    return HostChainLSParams.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: HostChainLSParams): Uint8Array {
    return HostChainLSParams.encode(message).finish();
  },
  toProtoMsg(message: HostChainLSParams): HostChainLSParamsProtoMsg {
    return {
      typeUrl: "/pstake.liquidstakeibc.v1beta1.HostChainLSParams",
      value: HostChainLSParams.encode(message).finish()
    };
  }
};
function createBaseICAAccount(): ICAAccount {
  return {
    address: "",
    balance: Coin.fromPartial({}),
    owner: "",
    channelState: 0
  };
}
export const ICAAccount = {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.ICAAccount",
  encode(message: ICAAccount, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.balance !== undefined) {
      Coin.encode(message.balance, writer.uint32(18).fork()).ldelim();
    }
    if (message.owner !== "") {
      writer.uint32(26).string(message.owner);
    }
    if (message.channelState !== 0) {
      writer.uint32(32).int32(message.channelState);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ICAAccount {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseICAAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.balance = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.owner = reader.string();
          break;
        case 4:
          message.channelState = (reader.int32() as any);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ICAAccount>): ICAAccount {
    const message = createBaseICAAccount();
    message.address = object.address ?? "";
    message.balance = object.balance !== undefined && object.balance !== null ? Coin.fromPartial(object.balance) : undefined;
    message.owner = object.owner ?? "";
    message.channelState = object.channelState ?? 0;
    return message;
  },
  fromAmino(object: ICAAccountAmino): ICAAccount {
    const message = createBaseICAAccount();
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    if (object.balance !== undefined && object.balance !== null) {
      message.balance = Coin.fromAmino(object.balance);
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner;
    }
    if (object.channel_state !== undefined && object.channel_state !== null) {
      message.channelState = iCAAccount_ChannelStateFromJSON(object.channel_state);
    }
    return message;
  },
  toAmino(message: ICAAccount, useInterfaces: boolean = false): ICAAccountAmino {
    const obj: any = {};
    obj.address = message.address;
    obj.balance = message.balance ? Coin.toAmino(message.balance, useInterfaces) : undefined;
    obj.owner = message.owner;
    obj.channel_state = message.channelState;
    return obj;
  },
  fromAminoMsg(object: ICAAccountAminoMsg): ICAAccount {
    return ICAAccount.fromAmino(object.value);
  },
  fromProtoMsg(message: ICAAccountProtoMsg, useInterfaces: boolean = false): ICAAccount {
    return ICAAccount.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ICAAccount): Uint8Array {
    return ICAAccount.encode(message).finish();
  },
  toProtoMsg(message: ICAAccount): ICAAccountProtoMsg {
    return {
      typeUrl: "/pstake.liquidstakeibc.v1beta1.ICAAccount",
      value: ICAAccount.encode(message).finish()
    };
  }
};
function createBaseValidator(): Validator {
  return {
    operatorAddress: "",
    status: "",
    weight: "",
    delegatedAmount: "",
    exchangeRate: "",
    unbondingEpoch: BigInt(0),
    delegable: false
  };
}
export const Validator = {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.Validator",
  encode(message: Validator, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.operatorAddress !== "") {
      writer.uint32(10).string(message.operatorAddress);
    }
    if (message.status !== "") {
      writer.uint32(18).string(message.status);
    }
    if (message.weight !== "") {
      writer.uint32(26).string(Decimal.fromUserInput(message.weight, 18).atomics);
    }
    if (message.delegatedAmount !== "") {
      writer.uint32(34).string(message.delegatedAmount);
    }
    if (message.exchangeRate !== "") {
      writer.uint32(42).string(Decimal.fromUserInput(message.exchangeRate, 18).atomics);
    }
    if (message.unbondingEpoch !== BigInt(0)) {
      writer.uint32(48).int64(message.unbondingEpoch);
    }
    if (message.delegable === true) {
      writer.uint32(56).bool(message.delegable);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): Validator {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidator();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.operatorAddress = reader.string();
          break;
        case 2:
          message.status = reader.string();
          break;
        case 3:
          message.weight = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 4:
          message.delegatedAmount = reader.string();
          break;
        case 5:
          message.exchangeRate = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 6:
          message.unbondingEpoch = reader.int64();
          break;
        case 7:
          message.delegable = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Validator>): Validator {
    const message = createBaseValidator();
    message.operatorAddress = object.operatorAddress ?? "";
    message.status = object.status ?? "";
    message.weight = object.weight ?? "";
    message.delegatedAmount = object.delegatedAmount ?? "";
    message.exchangeRate = object.exchangeRate ?? "";
    message.unbondingEpoch = object.unbondingEpoch !== undefined && object.unbondingEpoch !== null ? BigInt(object.unbondingEpoch.toString()) : BigInt(0);
    message.delegable = object.delegable ?? false;
    return message;
  },
  fromAmino(object: ValidatorAmino): Validator {
    const message = createBaseValidator();
    if (object.operator_address !== undefined && object.operator_address !== null) {
      message.operatorAddress = object.operator_address;
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    }
    if (object.weight !== undefined && object.weight !== null) {
      message.weight = object.weight;
    }
    if (object.delegated_amount !== undefined && object.delegated_amount !== null) {
      message.delegatedAmount = object.delegated_amount;
    }
    if (object.exchange_rate !== undefined && object.exchange_rate !== null) {
      message.exchangeRate = object.exchange_rate;
    }
    if (object.unbonding_epoch !== undefined && object.unbonding_epoch !== null) {
      message.unbondingEpoch = BigInt(object.unbonding_epoch);
    }
    if (object.delegable !== undefined && object.delegable !== null) {
      message.delegable = object.delegable;
    }
    return message;
  },
  toAmino(message: Validator, useInterfaces: boolean = false): ValidatorAmino {
    const obj: any = {};
    obj.operator_address = message.operatorAddress;
    obj.status = message.status;
    obj.weight = message.weight;
    obj.delegated_amount = message.delegatedAmount;
    obj.exchange_rate = message.exchangeRate;
    obj.unbonding_epoch = message.unbondingEpoch ? message.unbondingEpoch.toString() : undefined;
    obj.delegable = message.delegable;
    return obj;
  },
  fromAminoMsg(object: ValidatorAminoMsg): Validator {
    return Validator.fromAmino(object.value);
  },
  fromProtoMsg(message: ValidatorProtoMsg, useInterfaces: boolean = false): Validator {
    return Validator.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Validator): Uint8Array {
    return Validator.encode(message).finish();
  },
  toProtoMsg(message: Validator): ValidatorProtoMsg {
    return {
      typeUrl: "/pstake.liquidstakeibc.v1beta1.Validator",
      value: Validator.encode(message).finish()
    };
  }
};
function createBaseDeposit(): Deposit {
  return {
    chainId: "",
    amount: Coin.fromPartial({}),
    epoch: BigInt(0),
    state: 0,
    ibcSequenceId: ""
  };
}
export const Deposit = {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.Deposit",
  encode(message: Deposit, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(18).fork()).ldelim();
    }
    if (message.epoch !== BigInt(0)) {
      writer.uint32(24).int64(message.epoch);
    }
    if (message.state !== 0) {
      writer.uint32(32).int32(message.state);
    }
    if (message.ibcSequenceId !== "") {
      writer.uint32(42).string(message.ibcSequenceId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): Deposit {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeposit();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        case 2:
          message.amount = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.epoch = reader.int64();
          break;
        case 4:
          message.state = (reader.int32() as any);
          break;
        case 5:
          message.ibcSequenceId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Deposit>): Deposit {
    const message = createBaseDeposit();
    message.chainId = object.chainId ?? "";
    message.amount = object.amount !== undefined && object.amount !== null ? Coin.fromPartial(object.amount) : undefined;
    message.epoch = object.epoch !== undefined && object.epoch !== null ? BigInt(object.epoch.toString()) : BigInt(0);
    message.state = object.state ?? 0;
    message.ibcSequenceId = object.ibcSequenceId ?? "";
    return message;
  },
  fromAmino(object: DepositAmino): Deposit {
    const message = createBaseDeposit();
    if (object.chain_id !== undefined && object.chain_id !== null) {
      message.chainId = object.chain_id;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = Coin.fromAmino(object.amount);
    }
    if (object.epoch !== undefined && object.epoch !== null) {
      message.epoch = BigInt(object.epoch);
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = deposit_DepositStateFromJSON(object.state);
    }
    if (object.ibc_sequence_id !== undefined && object.ibc_sequence_id !== null) {
      message.ibcSequenceId = object.ibc_sequence_id;
    }
    return message;
  },
  toAmino(message: Deposit, useInterfaces: boolean = false): DepositAmino {
    const obj: any = {};
    obj.chain_id = message.chainId;
    obj.amount = message.amount ? Coin.toAmino(message.amount, useInterfaces) : undefined;
    obj.epoch = message.epoch ? message.epoch.toString() : undefined;
    obj.state = message.state;
    obj.ibc_sequence_id = message.ibcSequenceId;
    return obj;
  },
  fromAminoMsg(object: DepositAminoMsg): Deposit {
    return Deposit.fromAmino(object.value);
  },
  fromProtoMsg(message: DepositProtoMsg, useInterfaces: boolean = false): Deposit {
    return Deposit.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Deposit): Uint8Array {
    return Deposit.encode(message).finish();
  },
  toProtoMsg(message: Deposit): DepositProtoMsg {
    return {
      typeUrl: "/pstake.liquidstakeibc.v1beta1.Deposit",
      value: Deposit.encode(message).finish()
    };
  }
};
function createBaseLSMDeposit(): LSMDeposit {
  return {
    chainId: "",
    amount: "",
    shares: "",
    denom: "",
    ibcDenom: "",
    delegatorAddress: "",
    state: 0,
    ibcSequenceId: ""
  };
}
export const LSMDeposit = {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.LSMDeposit",
  encode(message: LSMDeposit, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    if (message.amount !== "") {
      writer.uint32(18).string(message.amount);
    }
    if (message.shares !== "") {
      writer.uint32(26).string(Decimal.fromUserInput(message.shares, 18).atomics);
    }
    if (message.denom !== "") {
      writer.uint32(34).string(message.denom);
    }
    if (message.ibcDenom !== "") {
      writer.uint32(42).string(message.ibcDenom);
    }
    if (message.delegatorAddress !== "") {
      writer.uint32(50).string(message.delegatorAddress);
    }
    if (message.state !== 0) {
      writer.uint32(56).int32(message.state);
    }
    if (message.ibcSequenceId !== "") {
      writer.uint32(66).string(message.ibcSequenceId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): LSMDeposit {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLSMDeposit();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        case 2:
          message.amount = reader.string();
          break;
        case 3:
          message.shares = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 4:
          message.denom = reader.string();
          break;
        case 5:
          message.ibcDenom = reader.string();
          break;
        case 6:
          message.delegatorAddress = reader.string();
          break;
        case 7:
          message.state = (reader.int32() as any);
          break;
        case 8:
          message.ibcSequenceId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<LSMDeposit>): LSMDeposit {
    const message = createBaseLSMDeposit();
    message.chainId = object.chainId ?? "";
    message.amount = object.amount ?? "";
    message.shares = object.shares ?? "";
    message.denom = object.denom ?? "";
    message.ibcDenom = object.ibcDenom ?? "";
    message.delegatorAddress = object.delegatorAddress ?? "";
    message.state = object.state ?? 0;
    message.ibcSequenceId = object.ibcSequenceId ?? "";
    return message;
  },
  fromAmino(object: LSMDepositAmino): LSMDeposit {
    const message = createBaseLSMDeposit();
    if (object.chain_id !== undefined && object.chain_id !== null) {
      message.chainId = object.chain_id;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    }
    if (object.shares !== undefined && object.shares !== null) {
      message.shares = object.shares;
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.ibc_denom !== undefined && object.ibc_denom !== null) {
      message.ibcDenom = object.ibc_denom;
    }
    if (object.delegator_address !== undefined && object.delegator_address !== null) {
      message.delegatorAddress = object.delegator_address;
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = lSMDeposit_LSMDepositStateFromJSON(object.state);
    }
    if (object.ibc_sequence_id !== undefined && object.ibc_sequence_id !== null) {
      message.ibcSequenceId = object.ibc_sequence_id;
    }
    return message;
  },
  toAmino(message: LSMDeposit, useInterfaces: boolean = false): LSMDepositAmino {
    const obj: any = {};
    obj.chain_id = message.chainId;
    obj.amount = message.amount;
    obj.shares = message.shares;
    obj.denom = message.denom;
    obj.ibc_denom = message.ibcDenom;
    obj.delegator_address = message.delegatorAddress;
    obj.state = message.state;
    obj.ibc_sequence_id = message.ibcSequenceId;
    return obj;
  },
  fromAminoMsg(object: LSMDepositAminoMsg): LSMDeposit {
    return LSMDeposit.fromAmino(object.value);
  },
  fromProtoMsg(message: LSMDepositProtoMsg, useInterfaces: boolean = false): LSMDeposit {
    return LSMDeposit.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: LSMDeposit): Uint8Array {
    return LSMDeposit.encode(message).finish();
  },
  toProtoMsg(message: LSMDeposit): LSMDepositProtoMsg {
    return {
      typeUrl: "/pstake.liquidstakeibc.v1beta1.LSMDeposit",
      value: LSMDeposit.encode(message).finish()
    };
  }
};
function createBaseUnbonding(): Unbonding {
  return {
    chainId: "",
    epochNumber: BigInt(0),
    matureTime: new Date(),
    burnAmount: Coin.fromPartial({}),
    unbondAmount: Coin.fromPartial({}),
    ibcSequenceId: "",
    state: 0
  };
}
export const Unbonding = {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.Unbonding",
  encode(message: Unbonding, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    if (message.epochNumber !== BigInt(0)) {
      writer.uint32(16).int64(message.epochNumber);
    }
    if (message.matureTime !== undefined) {
      Timestamp.encode(toTimestamp(message.matureTime), writer.uint32(26).fork()).ldelim();
    }
    if (message.burnAmount !== undefined) {
      Coin.encode(message.burnAmount, writer.uint32(34).fork()).ldelim();
    }
    if (message.unbondAmount !== undefined) {
      Coin.encode(message.unbondAmount, writer.uint32(42).fork()).ldelim();
    }
    if (message.ibcSequenceId !== "") {
      writer.uint32(50).string(message.ibcSequenceId);
    }
    if (message.state !== 0) {
      writer.uint32(56).int32(message.state);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): Unbonding {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUnbonding();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        case 2:
          message.epochNumber = reader.int64();
          break;
        case 3:
          message.matureTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 4:
          message.burnAmount = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 5:
          message.unbondAmount = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 6:
          message.ibcSequenceId = reader.string();
          break;
        case 7:
          message.state = (reader.int32() as any);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Unbonding>): Unbonding {
    const message = createBaseUnbonding();
    message.chainId = object.chainId ?? "";
    message.epochNumber = object.epochNumber !== undefined && object.epochNumber !== null ? BigInt(object.epochNumber.toString()) : BigInt(0);
    message.matureTime = object.matureTime ?? undefined;
    message.burnAmount = object.burnAmount !== undefined && object.burnAmount !== null ? Coin.fromPartial(object.burnAmount) : undefined;
    message.unbondAmount = object.unbondAmount !== undefined && object.unbondAmount !== null ? Coin.fromPartial(object.unbondAmount) : undefined;
    message.ibcSequenceId = object.ibcSequenceId ?? "";
    message.state = object.state ?? 0;
    return message;
  },
  fromAmino(object: UnbondingAmino): Unbonding {
    const message = createBaseUnbonding();
    if (object.chain_id !== undefined && object.chain_id !== null) {
      message.chainId = object.chain_id;
    }
    if (object.epoch_number !== undefined && object.epoch_number !== null) {
      message.epochNumber = BigInt(object.epoch_number);
    }
    if (object.mature_time !== undefined && object.mature_time !== null) {
      message.matureTime = fromTimestamp(Timestamp.fromAmino(object.mature_time));
    }
    if (object.burn_amount !== undefined && object.burn_amount !== null) {
      message.burnAmount = Coin.fromAmino(object.burn_amount);
    }
    if (object.unbond_amount !== undefined && object.unbond_amount !== null) {
      message.unbondAmount = Coin.fromAmino(object.unbond_amount);
    }
    if (object.ibc_sequence_id !== undefined && object.ibc_sequence_id !== null) {
      message.ibcSequenceId = object.ibc_sequence_id;
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = unbonding_UnbondingStateFromJSON(object.state);
    }
    return message;
  },
  toAmino(message: Unbonding, useInterfaces: boolean = false): UnbondingAmino {
    const obj: any = {};
    obj.chain_id = message.chainId;
    obj.epoch_number = message.epochNumber ? message.epochNumber.toString() : undefined;
    obj.mature_time = message.matureTime ? Timestamp.toAmino(toTimestamp(message.matureTime)) : undefined;
    obj.burn_amount = message.burnAmount ? Coin.toAmino(message.burnAmount, useInterfaces) : undefined;
    obj.unbond_amount = message.unbondAmount ? Coin.toAmino(message.unbondAmount, useInterfaces) : undefined;
    obj.ibc_sequence_id = message.ibcSequenceId;
    obj.state = message.state;
    return obj;
  },
  fromAminoMsg(object: UnbondingAminoMsg): Unbonding {
    return Unbonding.fromAmino(object.value);
  },
  fromProtoMsg(message: UnbondingProtoMsg, useInterfaces: boolean = false): Unbonding {
    return Unbonding.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Unbonding): Uint8Array {
    return Unbonding.encode(message).finish();
  },
  toProtoMsg(message: Unbonding): UnbondingProtoMsg {
    return {
      typeUrl: "/pstake.liquidstakeibc.v1beta1.Unbonding",
      value: Unbonding.encode(message).finish()
    };
  }
};
function createBaseUserUnbonding(): UserUnbonding {
  return {
    chainId: "",
    epochNumber: BigInt(0),
    address: "",
    stkAmount: Coin.fromPartial({}),
    unbondAmount: Coin.fromPartial({})
  };
}
export const UserUnbonding = {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.UserUnbonding",
  encode(message: UserUnbonding, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    if (message.epochNumber !== BigInt(0)) {
      writer.uint32(16).int64(message.epochNumber);
    }
    if (message.address !== "") {
      writer.uint32(26).string(message.address);
    }
    if (message.stkAmount !== undefined) {
      Coin.encode(message.stkAmount, writer.uint32(34).fork()).ldelim();
    }
    if (message.unbondAmount !== undefined) {
      Coin.encode(message.unbondAmount, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): UserUnbonding {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserUnbonding();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        case 2:
          message.epochNumber = reader.int64();
          break;
        case 3:
          message.address = reader.string();
          break;
        case 4:
          message.stkAmount = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 5:
          message.unbondAmount = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<UserUnbonding>): UserUnbonding {
    const message = createBaseUserUnbonding();
    message.chainId = object.chainId ?? "";
    message.epochNumber = object.epochNumber !== undefined && object.epochNumber !== null ? BigInt(object.epochNumber.toString()) : BigInt(0);
    message.address = object.address ?? "";
    message.stkAmount = object.stkAmount !== undefined && object.stkAmount !== null ? Coin.fromPartial(object.stkAmount) : undefined;
    message.unbondAmount = object.unbondAmount !== undefined && object.unbondAmount !== null ? Coin.fromPartial(object.unbondAmount) : undefined;
    return message;
  },
  fromAmino(object: UserUnbondingAmino): UserUnbonding {
    const message = createBaseUserUnbonding();
    if (object.chain_id !== undefined && object.chain_id !== null) {
      message.chainId = object.chain_id;
    }
    if (object.epoch_number !== undefined && object.epoch_number !== null) {
      message.epochNumber = BigInt(object.epoch_number);
    }
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    if (object.stk_amount !== undefined && object.stk_amount !== null) {
      message.stkAmount = Coin.fromAmino(object.stk_amount);
    }
    if (object.unbond_amount !== undefined && object.unbond_amount !== null) {
      message.unbondAmount = Coin.fromAmino(object.unbond_amount);
    }
    return message;
  },
  toAmino(message: UserUnbonding, useInterfaces: boolean = false): UserUnbondingAmino {
    const obj: any = {};
    obj.chain_id = message.chainId;
    obj.epoch_number = message.epochNumber ? message.epochNumber.toString() : undefined;
    obj.address = message.address;
    obj.stk_amount = message.stkAmount ? Coin.toAmino(message.stkAmount, useInterfaces) : undefined;
    obj.unbond_amount = message.unbondAmount ? Coin.toAmino(message.unbondAmount, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: UserUnbondingAminoMsg): UserUnbonding {
    return UserUnbonding.fromAmino(object.value);
  },
  fromProtoMsg(message: UserUnbondingProtoMsg, useInterfaces: boolean = false): UserUnbonding {
    return UserUnbonding.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: UserUnbonding): Uint8Array {
    return UserUnbonding.encode(message).finish();
  },
  toProtoMsg(message: UserUnbonding): UserUnbondingProtoMsg {
    return {
      typeUrl: "/pstake.liquidstakeibc.v1beta1.UserUnbonding",
      value: UserUnbonding.encode(message).finish()
    };
  }
};
function createBaseValidatorUnbonding(): ValidatorUnbonding {
  return {
    chainId: "",
    epochNumber: BigInt(0),
    matureTime: new Date(),
    validatorAddress: "",
    amount: Coin.fromPartial({}),
    ibcSequenceId: ""
  };
}
export const ValidatorUnbonding = {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.ValidatorUnbonding",
  encode(message: ValidatorUnbonding, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    if (message.epochNumber !== BigInt(0)) {
      writer.uint32(16).int64(message.epochNumber);
    }
    if (message.matureTime !== undefined) {
      Timestamp.encode(toTimestamp(message.matureTime), writer.uint32(26).fork()).ldelim();
    }
    if (message.validatorAddress !== "") {
      writer.uint32(34).string(message.validatorAddress);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(42).fork()).ldelim();
    }
    if (message.ibcSequenceId !== "") {
      writer.uint32(50).string(message.ibcSequenceId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ValidatorUnbonding {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidatorUnbonding();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        case 2:
          message.epochNumber = reader.int64();
          break;
        case 3:
          message.matureTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 4:
          message.validatorAddress = reader.string();
          break;
        case 5:
          message.amount = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 6:
          message.ibcSequenceId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ValidatorUnbonding>): ValidatorUnbonding {
    const message = createBaseValidatorUnbonding();
    message.chainId = object.chainId ?? "";
    message.epochNumber = object.epochNumber !== undefined && object.epochNumber !== null ? BigInt(object.epochNumber.toString()) : BigInt(0);
    message.matureTime = object.matureTime ?? undefined;
    message.validatorAddress = object.validatorAddress ?? "";
    message.amount = object.amount !== undefined && object.amount !== null ? Coin.fromPartial(object.amount) : undefined;
    message.ibcSequenceId = object.ibcSequenceId ?? "";
    return message;
  },
  fromAmino(object: ValidatorUnbondingAmino): ValidatorUnbonding {
    const message = createBaseValidatorUnbonding();
    if (object.chain_id !== undefined && object.chain_id !== null) {
      message.chainId = object.chain_id;
    }
    if (object.epoch_number !== undefined && object.epoch_number !== null) {
      message.epochNumber = BigInt(object.epoch_number);
    }
    if (object.mature_time !== undefined && object.mature_time !== null) {
      message.matureTime = fromTimestamp(Timestamp.fromAmino(object.mature_time));
    }
    if (object.validator_address !== undefined && object.validator_address !== null) {
      message.validatorAddress = object.validator_address;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = Coin.fromAmino(object.amount);
    }
    if (object.ibc_sequence_id !== undefined && object.ibc_sequence_id !== null) {
      message.ibcSequenceId = object.ibc_sequence_id;
    }
    return message;
  },
  toAmino(message: ValidatorUnbonding, useInterfaces: boolean = false): ValidatorUnbondingAmino {
    const obj: any = {};
    obj.chain_id = message.chainId;
    obj.epoch_number = message.epochNumber ? message.epochNumber.toString() : undefined;
    obj.mature_time = message.matureTime ? Timestamp.toAmino(toTimestamp(message.matureTime)) : undefined;
    obj.validator_address = message.validatorAddress;
    obj.amount = message.amount ? Coin.toAmino(message.amount, useInterfaces) : undefined;
    obj.ibc_sequence_id = message.ibcSequenceId;
    return obj;
  },
  fromAminoMsg(object: ValidatorUnbondingAminoMsg): ValidatorUnbonding {
    return ValidatorUnbonding.fromAmino(object.value);
  },
  fromProtoMsg(message: ValidatorUnbondingProtoMsg, useInterfaces: boolean = false): ValidatorUnbonding {
    return ValidatorUnbonding.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ValidatorUnbonding): Uint8Array {
    return ValidatorUnbonding.encode(message).finish();
  },
  toProtoMsg(message: ValidatorUnbonding): ValidatorUnbondingProtoMsg {
    return {
      typeUrl: "/pstake.liquidstakeibc.v1beta1.ValidatorUnbonding",
      value: ValidatorUnbonding.encode(message).finish()
    };
  }
};
function createBaseKVUpdate(): KVUpdate {
  return {
    key: "",
    value: ""
  };
}
export const KVUpdate = {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.KVUpdate",
  encode(message: KVUpdate, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): KVUpdate {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKVUpdate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<KVUpdate>): KVUpdate {
    const message = createBaseKVUpdate();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
  fromAmino(object: KVUpdateAmino): KVUpdate {
    const message = createBaseKVUpdate();
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    }
    return message;
  },
  toAmino(message: KVUpdate, useInterfaces: boolean = false): KVUpdateAmino {
    const obj: any = {};
    obj.key = message.key;
    obj.value = message.value;
    return obj;
  },
  fromAminoMsg(object: KVUpdateAminoMsg): KVUpdate {
    return KVUpdate.fromAmino(object.value);
  },
  fromProtoMsg(message: KVUpdateProtoMsg, useInterfaces: boolean = false): KVUpdate {
    return KVUpdate.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: KVUpdate): Uint8Array {
    return KVUpdate.encode(message).finish();
  },
  toProtoMsg(message: KVUpdate): KVUpdateProtoMsg {
    return {
      typeUrl: "/pstake.liquidstakeibc.v1beta1.KVUpdate",
      value: KVUpdate.encode(message).finish()
    };
  }
};
function createBaseRedelegations(): Redelegations {
  return {
    chainID: "",
    redelegations: []
  };
}
export const Redelegations = {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.Redelegations",
  encode(message: Redelegations, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainID !== "") {
      writer.uint32(10).string(message.chainID);
    }
    for (const v of message.redelegations) {
      Redelegation.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): Redelegations {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRedelegations();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainID = reader.string();
          break;
        case 2:
          message.redelegations.push(Redelegation.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Redelegations>): Redelegations {
    const message = createBaseRedelegations();
    message.chainID = object.chainID ?? "";
    message.redelegations = object.redelegations?.map(e => Redelegation.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: RedelegationsAmino): Redelegations {
    const message = createBaseRedelegations();
    if (object.chain_i_d !== undefined && object.chain_i_d !== null) {
      message.chainID = object.chain_i_d;
    }
    message.redelegations = object.redelegations?.map(e => Redelegation.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: Redelegations, useInterfaces: boolean = false): RedelegationsAmino {
    const obj: any = {};
    obj.chain_i_d = message.chainID;
    if (message.redelegations) {
      obj.redelegations = message.redelegations.map(e => e ? Redelegation.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.redelegations = [];
    }
    return obj;
  },
  fromAminoMsg(object: RedelegationsAminoMsg): Redelegations {
    return Redelegations.fromAmino(object.value);
  },
  fromProtoMsg(message: RedelegationsProtoMsg, useInterfaces: boolean = false): Redelegations {
    return Redelegations.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Redelegations): Uint8Array {
    return Redelegations.encode(message).finish();
  },
  toProtoMsg(message: Redelegations): RedelegationsProtoMsg {
    return {
      typeUrl: "/pstake.liquidstakeibc.v1beta1.Redelegations",
      value: Redelegations.encode(message).finish()
    };
  }
};
function createBaseRedelegateTx(): RedelegateTx {
  return {
    chainId: "",
    ibcSequenceId: "",
    state: 0
  };
}
export const RedelegateTx = {
  typeUrl: "/pstake.liquidstakeibc.v1beta1.RedelegateTx",
  encode(message: RedelegateTx, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    if (message.ibcSequenceId !== "") {
      writer.uint32(18).string(message.ibcSequenceId);
    }
    if (message.state !== 0) {
      writer.uint32(24).int32(message.state);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): RedelegateTx {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRedelegateTx();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        case 2:
          message.ibcSequenceId = reader.string();
          break;
        case 3:
          message.state = (reader.int32() as any);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<RedelegateTx>): RedelegateTx {
    const message = createBaseRedelegateTx();
    message.chainId = object.chainId ?? "";
    message.ibcSequenceId = object.ibcSequenceId ?? "";
    message.state = object.state ?? 0;
    return message;
  },
  fromAmino(object: RedelegateTxAmino): RedelegateTx {
    const message = createBaseRedelegateTx();
    if (object.chain_id !== undefined && object.chain_id !== null) {
      message.chainId = object.chain_id;
    }
    if (object.ibc_sequence_id !== undefined && object.ibc_sequence_id !== null) {
      message.ibcSequenceId = object.ibc_sequence_id;
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = redelegateTx_RedelegateTxStateFromJSON(object.state);
    }
    return message;
  },
  toAmino(message: RedelegateTx, useInterfaces: boolean = false): RedelegateTxAmino {
    const obj: any = {};
    obj.chain_id = message.chainId;
    obj.ibc_sequence_id = message.ibcSequenceId;
    obj.state = message.state;
    return obj;
  },
  fromAminoMsg(object: RedelegateTxAminoMsg): RedelegateTx {
    return RedelegateTx.fromAmino(object.value);
  },
  fromProtoMsg(message: RedelegateTxProtoMsg, useInterfaces: boolean = false): RedelegateTx {
    return RedelegateTx.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: RedelegateTx): Uint8Array {
    return RedelegateTx.encode(message).finish();
  },
  toProtoMsg(message: RedelegateTx): RedelegateTxProtoMsg {
    return {
      typeUrl: "/pstake.liquidstakeibc.v1beta1.RedelegateTx",
      value: RedelegateTx.encode(message).finish()
    };
  }
};