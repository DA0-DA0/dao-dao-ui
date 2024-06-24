//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { HostChainParams, HostChainParamsAmino, HostChainParamsSDKType, AllowListedValidators, AllowListedValidatorsAmino, AllowListedValidatorsSDKType, DelegationState, DelegationStateAmino, DelegationStateSDKType, HostChainRewardAddress, HostChainRewardAddressAmino, HostChainRewardAddressSDKType, IBCAmountTransientStore, IBCAmountTransientStoreAmino, IBCAmountTransientStoreSDKType, UnbondingEpochCValue, UnbondingEpochCValueAmino, UnbondingEpochCValueSDKType, DelegatorUnbondingEpochEntry, DelegatorUnbondingEpochEntryAmino, DelegatorUnbondingEpochEntrySDKType, HostAccounts, HostAccountsAmino, HostAccountsSDKType } from "./lscosmos";
import { BinaryReader, BinaryWriter } from "../../../binary";
/** GenesisState defines the lscosmos module's genesis state. */
export interface GenesisState {
  params: Params | undefined;
  /** this line is used by starport scaffolding # genesis/proto/state */
  moduleEnabled: boolean;
  hostChainParams: HostChainParams | undefined;
  allowListedValidators: AllowListedValidators | undefined;
  delegationState: DelegationState | undefined;
  hostChainRewardAddress: HostChainRewardAddress | undefined;
  iBCAmountTransientStore: IBCAmountTransientStore | undefined;
  unbondingEpochCValues: UnbondingEpochCValue[];
  delegatorUnbondingEpochEntries: DelegatorUnbondingEpochEntry[];
  hostAccounts: HostAccounts | undefined;
}
export interface GenesisStateProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the lscosmos module's genesis state. */
export interface GenesisStateAmino {
  params?: ParamsAmino | undefined;
  /** this line is used by starport scaffolding # genesis/proto/state */
  module_enabled?: boolean;
  host_chain_params?: HostChainParamsAmino | undefined;
  allow_listed_validators?: AllowListedValidatorsAmino | undefined;
  delegation_state?: DelegationStateAmino | undefined;
  host_chain_reward_address?: HostChainRewardAddressAmino | undefined;
  i_b_c_amount_transient_store?: IBCAmountTransientStoreAmino | undefined;
  unbonding_epoch_c_values?: UnbondingEpochCValueAmino[];
  delegator_unbonding_epoch_entries?: DelegatorUnbondingEpochEntryAmino[];
  host_accounts?: HostAccountsAmino | undefined;
}
export interface GenesisStateAminoMsg {
  type: "/pstake.lscosmos.v1beta1.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the lscosmos module's genesis state. */
export interface GenesisStateSDKType {
  params: ParamsSDKType | undefined;
  module_enabled: boolean;
  host_chain_params: HostChainParamsSDKType | undefined;
  allow_listed_validators: AllowListedValidatorsSDKType | undefined;
  delegation_state: DelegationStateSDKType | undefined;
  host_chain_reward_address: HostChainRewardAddressSDKType | undefined;
  i_b_c_amount_transient_store: IBCAmountTransientStoreSDKType | undefined;
  unbonding_epoch_c_values: UnbondingEpochCValueSDKType[];
  delegator_unbonding_epoch_entries: DelegatorUnbondingEpochEntrySDKType[];
  host_accounts: HostAccountsSDKType | undefined;
}
function createBaseGenesisState(): GenesisState {
  return {
    params: Params.fromPartial({}),
    moduleEnabled: false,
    hostChainParams: HostChainParams.fromPartial({}),
    allowListedValidators: AllowListedValidators.fromPartial({}),
    delegationState: DelegationState.fromPartial({}),
    hostChainRewardAddress: HostChainRewardAddress.fromPartial({}),
    iBCAmountTransientStore: IBCAmountTransientStore.fromPartial({}),
    unbondingEpochCValues: [],
    delegatorUnbondingEpochEntries: [],
    hostAccounts: HostAccounts.fromPartial({})
  };
}
export const GenesisState = {
  typeUrl: "/pstake.lscosmos.v1beta1.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    if (message.moduleEnabled === true) {
      writer.uint32(16).bool(message.moduleEnabled);
    }
    if (message.hostChainParams !== undefined) {
      HostChainParams.encode(message.hostChainParams, writer.uint32(26).fork()).ldelim();
    }
    if (message.allowListedValidators !== undefined) {
      AllowListedValidators.encode(message.allowListedValidators, writer.uint32(34).fork()).ldelim();
    }
    if (message.delegationState !== undefined) {
      DelegationState.encode(message.delegationState, writer.uint32(42).fork()).ldelim();
    }
    if (message.hostChainRewardAddress !== undefined) {
      HostChainRewardAddress.encode(message.hostChainRewardAddress, writer.uint32(50).fork()).ldelim();
    }
    if (message.iBCAmountTransientStore !== undefined) {
      IBCAmountTransientStore.encode(message.iBCAmountTransientStore, writer.uint32(58).fork()).ldelim();
    }
    for (const v of message.unbondingEpochCValues) {
      UnbondingEpochCValue.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    for (const v of message.delegatorUnbondingEpochEntries) {
      DelegatorUnbondingEpochEntry.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    if (message.hostAccounts !== undefined) {
      HostAccounts.encode(message.hostAccounts, writer.uint32(82).fork()).ldelim();
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
          message.moduleEnabled = reader.bool();
          break;
        case 3:
          message.hostChainParams = HostChainParams.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 4:
          message.allowListedValidators = AllowListedValidators.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 5:
          message.delegationState = DelegationState.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 6:
          message.hostChainRewardAddress = HostChainRewardAddress.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 7:
          message.iBCAmountTransientStore = IBCAmountTransientStore.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 8:
          message.unbondingEpochCValues.push(UnbondingEpochCValue.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 9:
          message.delegatorUnbondingEpochEntries.push(DelegatorUnbondingEpochEntry.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 10:
          message.hostAccounts = HostAccounts.decode(reader, reader.uint32(), useInterfaces);
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
    message.moduleEnabled = object.moduleEnabled ?? false;
    message.hostChainParams = object.hostChainParams !== undefined && object.hostChainParams !== null ? HostChainParams.fromPartial(object.hostChainParams) : undefined;
    message.allowListedValidators = object.allowListedValidators !== undefined && object.allowListedValidators !== null ? AllowListedValidators.fromPartial(object.allowListedValidators) : undefined;
    message.delegationState = object.delegationState !== undefined && object.delegationState !== null ? DelegationState.fromPartial(object.delegationState) : undefined;
    message.hostChainRewardAddress = object.hostChainRewardAddress !== undefined && object.hostChainRewardAddress !== null ? HostChainRewardAddress.fromPartial(object.hostChainRewardAddress) : undefined;
    message.iBCAmountTransientStore = object.iBCAmountTransientStore !== undefined && object.iBCAmountTransientStore !== null ? IBCAmountTransientStore.fromPartial(object.iBCAmountTransientStore) : undefined;
    message.unbondingEpochCValues = object.unbondingEpochCValues?.map(e => UnbondingEpochCValue.fromPartial(e)) || [];
    message.delegatorUnbondingEpochEntries = object.delegatorUnbondingEpochEntries?.map(e => DelegatorUnbondingEpochEntry.fromPartial(e)) || [];
    message.hostAccounts = object.hostAccounts !== undefined && object.hostAccounts !== null ? HostAccounts.fromPartial(object.hostAccounts) : undefined;
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    if (object.module_enabled !== undefined && object.module_enabled !== null) {
      message.moduleEnabled = object.module_enabled;
    }
    if (object.host_chain_params !== undefined && object.host_chain_params !== null) {
      message.hostChainParams = HostChainParams.fromAmino(object.host_chain_params);
    }
    if (object.allow_listed_validators !== undefined && object.allow_listed_validators !== null) {
      message.allowListedValidators = AllowListedValidators.fromAmino(object.allow_listed_validators);
    }
    if (object.delegation_state !== undefined && object.delegation_state !== null) {
      message.delegationState = DelegationState.fromAmino(object.delegation_state);
    }
    if (object.host_chain_reward_address !== undefined && object.host_chain_reward_address !== null) {
      message.hostChainRewardAddress = HostChainRewardAddress.fromAmino(object.host_chain_reward_address);
    }
    if (object.i_b_c_amount_transient_store !== undefined && object.i_b_c_amount_transient_store !== null) {
      message.iBCAmountTransientStore = IBCAmountTransientStore.fromAmino(object.i_b_c_amount_transient_store);
    }
    message.unbondingEpochCValues = object.unbonding_epoch_c_values?.map(e => UnbondingEpochCValue.fromAmino(e)) || [];
    message.delegatorUnbondingEpochEntries = object.delegator_unbonding_epoch_entries?.map(e => DelegatorUnbondingEpochEntry.fromAmino(e)) || [];
    if (object.host_accounts !== undefined && object.host_accounts !== null) {
      message.hostAccounts = HostAccounts.fromAmino(object.host_accounts);
    }
    return message;
  },
  toAmino(message: GenesisState, useInterfaces: boolean = false): GenesisStateAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
    obj.module_enabled = message.moduleEnabled === false ? undefined : message.moduleEnabled;
    obj.host_chain_params = message.hostChainParams ? HostChainParams.toAmino(message.hostChainParams, useInterfaces) : undefined;
    obj.allow_listed_validators = message.allowListedValidators ? AllowListedValidators.toAmino(message.allowListedValidators, useInterfaces) : undefined;
    obj.delegation_state = message.delegationState ? DelegationState.toAmino(message.delegationState, useInterfaces) : undefined;
    obj.host_chain_reward_address = message.hostChainRewardAddress ? HostChainRewardAddress.toAmino(message.hostChainRewardAddress, useInterfaces) : undefined;
    obj.i_b_c_amount_transient_store = message.iBCAmountTransientStore ? IBCAmountTransientStore.toAmino(message.iBCAmountTransientStore, useInterfaces) : undefined;
    if (message.unbondingEpochCValues) {
      obj.unbonding_epoch_c_values = message.unbondingEpochCValues.map(e => e ? UnbondingEpochCValue.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.unbonding_epoch_c_values = message.unbondingEpochCValues;
    }
    if (message.delegatorUnbondingEpochEntries) {
      obj.delegator_unbonding_epoch_entries = message.delegatorUnbondingEpochEntries.map(e => e ? DelegatorUnbondingEpochEntry.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.delegator_unbonding_epoch_entries = message.delegatorUnbondingEpochEntries;
    }
    obj.host_accounts = message.hostAccounts ? HostAccounts.toAmino(message.hostAccounts, useInterfaces) : undefined;
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
      typeUrl: "/pstake.lscosmos.v1beta1.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};