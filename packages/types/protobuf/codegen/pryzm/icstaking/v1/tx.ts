//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType, Height, HeightAmino, HeightSDKType } from "../../../ibc/core/client/v1/client";
import { HostChain, HostChainAmino, HostChainSDKType, Validator, ValidatorAmino, ValidatorSDKType } from "./host_chain";
import { StakingParams, StakingParamsAmino, StakingParamsSDKType } from "./params";
import { BoolValue, BoolValueAmino, BoolValueSDKType } from "../../../google/protobuf/wrappers";
import { RedelegationEntry, RedelegationEntryAmino, RedelegationEntrySDKType } from "./reply";
import { Acknowledgement, AcknowledgementAmino, AcknowledgementSDKType } from "./multisig";
import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../../binary";
export enum ICARegistrationType {
  /** DELEGATION - register delegation interchain account */
  DELEGATION = 0,
  /** REWARD - register reward interchain account */
  REWARD = 1,
  /** SWEEP - register sweep interchain account */
  SWEEP = 2,
  /** REWARD_CLAIMING - registration of reward account as the withdraw address on the host chain */
  REWARD_CLAIMING = 3,
  UNRECOGNIZED = -1,
}
export const ICARegistrationTypeSDKType = ICARegistrationType;
export const ICARegistrationTypeAmino = ICARegistrationType;
export function iCARegistrationTypeFromJSON(object: any): ICARegistrationType {
  switch (object) {
    case 0:
    case "DELEGATION":
      return ICARegistrationType.DELEGATION;
    case 1:
    case "REWARD":
      return ICARegistrationType.REWARD;
    case 2:
    case "SWEEP":
      return ICARegistrationType.SWEEP;
    case 3:
    case "REWARD_CLAIMING":
      return ICARegistrationType.REWARD_CLAIMING;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ICARegistrationType.UNRECOGNIZED;
  }
}
export function iCARegistrationTypeToJSON(object: ICARegistrationType): string {
  switch (object) {
    case ICARegistrationType.DELEGATION:
      return "DELEGATION";
    case ICARegistrationType.REWARD:
      return "REWARD";
    case ICARegistrationType.SWEEP:
      return "SWEEP";
    case ICARegistrationType.REWARD_CLAIMING:
      return "REWARD_CLAIMING";
    case ICARegistrationType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
export interface MsgUpdateParams {
  authority: string;
  params: Params | undefined;
}
export interface MsgUpdateParamsProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.MsgUpdateParams";
  value: Uint8Array;
}
export interface MsgUpdateParamsAmino {
  authority?: string;
  params: ParamsAmino | undefined;
}
export interface MsgUpdateParamsAminoMsg {
  type: "pryzm/icstaking/v1/UpdateParams";
  value: MsgUpdateParamsAmino;
}
export interface MsgUpdateParamsSDKType {
  authority: string;
  params: ParamsSDKType | undefined;
}
export interface MsgUpdateParamsResponse {}
export interface MsgUpdateParamsResponseProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.MsgUpdateParamsResponse";
  value: Uint8Array;
}
export interface MsgUpdateParamsResponseAmino {}
export interface MsgUpdateParamsResponseAminoMsg {
  type: "/pryzm.icstaking.v1.MsgUpdateParamsResponse";
  value: MsgUpdateParamsResponseAmino;
}
export interface MsgUpdateParamsResponseSDKType {}
export interface MsgRegisterHostChain {
  creator: string;
  hostChain: HostChain | undefined;
}
export interface MsgRegisterHostChainProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.MsgRegisterHostChain";
  value: Uint8Array;
}
export interface MsgRegisterHostChainAmino {
  creator?: string;
  host_chain: HostChainAmino | undefined;
}
export interface MsgRegisterHostChainAminoMsg {
  type: "pryzm/icstaking/v1/RegisterHostChain";
  value: MsgRegisterHostChainAmino;
}
export interface MsgRegisterHostChainSDKType {
  creator: string;
  host_chain: HostChainSDKType | undefined;
}
export interface MsgRegisterHostChainResponse {}
export interface MsgRegisterHostChainResponseProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.MsgRegisterHostChainResponse";
  value: Uint8Array;
}
export interface MsgRegisterHostChainResponseAmino {}
export interface MsgRegisterHostChainResponseAminoMsg {
  type: "/pryzm.icstaking.v1.MsgRegisterHostChainResponse";
  value: MsgRegisterHostChainResponseAmino;
}
export interface MsgRegisterHostChainResponseSDKType {}
export interface MsgUpdateHostChain {
  creator: string;
  hostChainId: string;
  validators: Validator[];
  params?: StakingParams | undefined;
  allowLsmShares?: BoolValue | undefined;
}
export interface MsgUpdateHostChainProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.MsgUpdateHostChain";
  value: Uint8Array;
}
export interface MsgUpdateHostChainAmino {
  creator?: string;
  host_chain_id?: string;
  validators: ValidatorAmino[];
  params: StakingParamsAmino | undefined;
  allow_lsm_shares?: BoolValueAmino | undefined;
}
export interface MsgUpdateHostChainAminoMsg {
  type: "pryzm/icstaking/v1/UpdateHostChain";
  value: MsgUpdateHostChainAmino;
}
export interface MsgUpdateHostChainSDKType {
  creator: string;
  host_chain_id: string;
  validators: ValidatorSDKType[];
  params?: StakingParamsSDKType | undefined;
  allow_lsm_shares?: BoolValueSDKType | undefined;
}
export interface MsgUpdateHostChainResponse {}
export interface MsgUpdateHostChainResponseProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.MsgUpdateHostChainResponse";
  value: Uint8Array;
}
export interface MsgUpdateHostChainResponseAmino {}
export interface MsgUpdateHostChainResponseAminoMsg {
  type: "/pryzm.icstaking.v1.MsgUpdateHostChainResponse";
  value: MsgUpdateHostChainResponseAmino;
}
export interface MsgUpdateHostChainResponseSDKType {}
export interface MsgStake {
  creator: string;
  hostChain: string;
  transferChannel: string;
  amount: string;
}
export interface MsgStakeProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.MsgStake";
  value: Uint8Array;
}
export interface MsgStakeAmino {
  creator?: string;
  host_chain?: string;
  transfer_channel?: string;
  amount: string;
}
export interface MsgStakeAminoMsg {
  type: "pryzm/icstaking/v1/Stake";
  value: MsgStakeAmino;
}
export interface MsgStakeSDKType {
  creator: string;
  host_chain: string;
  transfer_channel: string;
  amount: string;
}
export interface MsgStakeResponse {
  cAmount: Coin | undefined;
  fee: Coin | undefined;
}
export interface MsgStakeResponseProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.MsgStakeResponse";
  value: Uint8Array;
}
export interface MsgStakeResponseAmino {
  c_amount?: CoinAmino | undefined;
  fee?: CoinAmino | undefined;
}
export interface MsgStakeResponseAminoMsg {
  type: "/pryzm.icstaking.v1.MsgStakeResponse";
  value: MsgStakeResponseAmino;
}
export interface MsgStakeResponseSDKType {
  c_amount: CoinSDKType | undefined;
  fee: CoinSDKType | undefined;
}
export interface MsgStakeLsmShares {
  creator: string;
  hostChain: string;
  transferChannel: string;
  lsmDenom: string;
  amount: string;
}
export interface MsgStakeLsmSharesProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.MsgStakeLsmShares";
  value: Uint8Array;
}
export interface MsgStakeLsmSharesAmino {
  creator?: string;
  host_chain?: string;
  transfer_channel?: string;
  lsm_denom?: string;
  amount: string;
}
export interface MsgStakeLsmSharesAminoMsg {
  type: "pryzm/icstaking/v1/StakeLsmShares";
  value: MsgStakeLsmSharesAmino;
}
export interface MsgStakeLsmSharesSDKType {
  creator: string;
  host_chain: string;
  transfer_channel: string;
  lsm_denom: string;
  amount: string;
}
export interface MsgStakeLsmSharesResponse {
  cAmount: Coin | undefined;
  fee: Coin | undefined;
}
export interface MsgStakeLsmSharesResponseProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.MsgStakeLsmSharesResponse";
  value: Uint8Array;
}
export interface MsgStakeLsmSharesResponseAmino {
  c_amount?: CoinAmino | undefined;
  fee?: CoinAmino | undefined;
}
export interface MsgStakeLsmSharesResponseAminoMsg {
  type: "/pryzm.icstaking.v1.MsgStakeLsmSharesResponse";
  value: MsgStakeLsmSharesResponseAmino;
}
export interface MsgStakeLsmSharesResponseSDKType {
  c_amount: CoinSDKType | undefined;
  fee: CoinSDKType | undefined;
}
export interface MsgUnstake {
  creator: string;
  hostChain: string;
  transferChannel: string;
  cAmount: string;
}
export interface MsgUnstakeProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.MsgUnstake";
  value: Uint8Array;
}
export interface MsgUnstakeAmino {
  creator?: string;
  host_chain?: string;
  transfer_channel?: string;
  c_amount: string;
}
export interface MsgUnstakeAminoMsg {
  type: "pryzm/icstaking/v1/Unstake";
  value: MsgUnstakeAmino;
}
export interface MsgUnstakeSDKType {
  creator: string;
  host_chain: string;
  transfer_channel: string;
  c_amount: string;
}
export interface MsgUnstakeResponse {
  uAmount: Coin | undefined;
}
export interface MsgUnstakeResponseProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.MsgUnstakeResponse";
  value: Uint8Array;
}
export interface MsgUnstakeResponseAmino {
  u_amount?: CoinAmino | undefined;
}
export interface MsgUnstakeResponseAminoMsg {
  type: "/pryzm.icstaking.v1.MsgUnstakeResponse";
  value: MsgUnstakeResponseAmino;
}
export interface MsgUnstakeResponseSDKType {
  u_amount: CoinSDKType | undefined;
}
export interface MsgRedeemUnstaked {
  creator: string;
  hostChain: string;
  transferChannel: string;
  uAmount: string;
  epoch: bigint;
}
export interface MsgRedeemUnstakedProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.MsgRedeemUnstaked";
  value: Uint8Array;
}
export interface MsgRedeemUnstakedAmino {
  creator?: string;
  host_chain?: string;
  transfer_channel?: string;
  u_amount: string;
  epoch: string;
}
export interface MsgRedeemUnstakedAminoMsg {
  type: "pryzm/icstaking/v1/RedeemUnstaked";
  value: MsgRedeemUnstakedAmino;
}
export interface MsgRedeemUnstakedSDKType {
  creator: string;
  host_chain: string;
  transfer_channel: string;
  u_amount: string;
  epoch: bigint;
}
export interface MsgRedeemUnstakedResponse {
  amount: Coin | undefined;
  fee: Coin | undefined;
}
export interface MsgRedeemUnstakedResponseProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.MsgRedeemUnstakedResponse";
  value: Uint8Array;
}
export interface MsgRedeemUnstakedResponseAmino {
  amount?: CoinAmino | undefined;
  fee?: CoinAmino | undefined;
}
export interface MsgRedeemUnstakedResponseAminoMsg {
  type: "/pryzm.icstaking.v1.MsgRedeemUnstakedResponse";
  value: MsgRedeemUnstakedResponseAmino;
}
export interface MsgRedeemUnstakedResponseSDKType {
  amount: CoinSDKType | undefined;
  fee: CoinSDKType | undefined;
}
export interface MsgInstantUnstake {
  creator: string;
  hostChain: string;
  transferChannel: string;
  minCAmount: string;
  maxCAmount: string;
}
export interface MsgInstantUnstakeProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.MsgInstantUnstake";
  value: Uint8Array;
}
export interface MsgInstantUnstakeAmino {
  creator?: string;
  host_chain?: string;
  transfer_channel?: string;
  min_c_amount: string;
  max_c_amount: string;
}
export interface MsgInstantUnstakeAminoMsg {
  type: "pryzm/icstaking/v1/InstantUnstake";
  value: MsgInstantUnstakeAmino;
}
export interface MsgInstantUnstakeSDKType {
  creator: string;
  host_chain: string;
  transfer_channel: string;
  min_c_amount: string;
  max_c_amount: string;
}
export interface MsgInstantUnstakeResponse {
  amount: Coin | undefined;
  fee: Coin | undefined;
}
export interface MsgInstantUnstakeResponseProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.MsgInstantUnstakeResponse";
  value: Uint8Array;
}
export interface MsgInstantUnstakeResponseAmino {
  amount?: CoinAmino | undefined;
  fee?: CoinAmino | undefined;
}
export interface MsgInstantUnstakeResponseAminoMsg {
  type: "/pryzm.icstaking.v1.MsgInstantUnstakeResponse";
  value: MsgInstantUnstakeResponseAmino;
}
export interface MsgInstantUnstakeResponseSDKType {
  amount: CoinSDKType | undefined;
  fee: CoinSDKType | undefined;
}
export interface MsgRebalanceDelegations {
  creator: string;
  hostChain: string;
}
export interface MsgRebalanceDelegationsProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.MsgRebalanceDelegations";
  value: Uint8Array;
}
export interface MsgRebalanceDelegationsAmino {
  creator?: string;
  host_chain?: string;
}
export interface MsgRebalanceDelegationsAminoMsg {
  type: "pryzm/icstaking/v1/RebalanceDelegations";
  value: MsgRebalanceDelegationsAmino;
}
export interface MsgRebalanceDelegationsSDKType {
  creator: string;
  host_chain: string;
}
export interface MsgRebalanceDelegationsResponse {}
export interface MsgRebalanceDelegationsResponseProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.MsgRebalanceDelegationsResponse";
  value: Uint8Array;
}
export interface MsgRebalanceDelegationsResponseAmino {}
export interface MsgRebalanceDelegationsResponseAminoMsg {
  type: "/pryzm.icstaking.v1.MsgRebalanceDelegationsResponse";
  value: MsgRebalanceDelegationsResponseAmino;
}
export interface MsgRebalanceDelegationsResponseSDKType {}
export interface MsgRedelegate {
  creator: string;
  hostChain: string;
  redelegations: RedelegationEntry[];
}
export interface MsgRedelegateProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.MsgRedelegate";
  value: Uint8Array;
}
export interface MsgRedelegateAmino {
  creator?: string;
  host_chain?: string;
  redelegations?: RedelegationEntryAmino[];
}
export interface MsgRedelegateAminoMsg {
  type: "pryzm/icstaking/v1/Redelegate";
  value: MsgRedelegateAmino;
}
export interface MsgRedelegateSDKType {
  creator: string;
  host_chain: string;
  redelegations: RedelegationEntrySDKType[];
}
export interface MsgRedelegateResponse {}
export interface MsgRedelegateResponseProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.MsgRedelegateResponse";
  value: Uint8Array;
}
export interface MsgRedelegateResponseAmino {}
export interface MsgRedelegateResponseAminoMsg {
  type: "/pryzm.icstaking.v1.MsgRedelegateResponse";
  value: MsgRedelegateResponseAmino;
}
export interface MsgRedelegateResponseSDKType {}
export interface MsgRegisterInterchainAccount {
  creator: string;
  hostChain: string;
  registrationType: ICARegistrationType;
}
export interface MsgRegisterInterchainAccountProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.MsgRegisterInterchainAccount";
  value: Uint8Array;
}
export interface MsgRegisterInterchainAccountAmino {
  creator?: string;
  host_chain?: string;
  registration_type: ICARegistrationType;
}
export interface MsgRegisterInterchainAccountAminoMsg {
  type: "pryzm/icstaking/v1/RegInterchainAccount";
  value: MsgRegisterInterchainAccountAmino;
}
export interface MsgRegisterInterchainAccountSDKType {
  creator: string;
  host_chain: string;
  registration_type: ICARegistrationType;
}
export interface MsgRegisterInterchainAccountResponse {}
export interface MsgRegisterInterchainAccountResponseProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.MsgRegisterInterchainAccountResponse";
  value: Uint8Array;
}
export interface MsgRegisterInterchainAccountResponseAmino {}
export interface MsgRegisterInterchainAccountResponseAminoMsg {
  type: "/pryzm.icstaking.v1.MsgRegisterInterchainAccountResponse";
  value: MsgRegisterInterchainAccountResponseAmino;
}
export interface MsgRegisterInterchainAccountResponseSDKType {}
export interface MsgCreateMultiSigConnection {
  creator: string;
  id: string;
  operator: string;
}
export interface MsgCreateMultiSigConnectionProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.MsgCreateMultiSigConnection";
  value: Uint8Array;
}
export interface MsgCreateMultiSigConnectionAmino {
  creator?: string;
  id?: string;
  operator?: string;
}
export interface MsgCreateMultiSigConnectionAminoMsg {
  type: "pryzm/icstaking/v1/CreateMultiSigConn";
  value: MsgCreateMultiSigConnectionAmino;
}
export interface MsgCreateMultiSigConnectionSDKType {
  creator: string;
  id: string;
  operator: string;
}
export interface MsgCreateMultiSigConnectionResponse {}
export interface MsgCreateMultiSigConnectionResponseProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.MsgCreateMultiSigConnectionResponse";
  value: Uint8Array;
}
export interface MsgCreateMultiSigConnectionResponseAmino {}
export interface MsgCreateMultiSigConnectionResponseAminoMsg {
  type: "/pryzm.icstaking.v1.MsgCreateMultiSigConnectionResponse";
  value: MsgCreateMultiSigConnectionResponseAmino;
}
export interface MsgCreateMultiSigConnectionResponseSDKType {}
export interface MsgUpdateMultiSigConnection {
  creator: string;
  id: string;
  operator: string;
}
export interface MsgUpdateMultiSigConnectionProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.MsgUpdateMultiSigConnection";
  value: Uint8Array;
}
export interface MsgUpdateMultiSigConnectionAmino {
  creator?: string;
  id?: string;
  operator?: string;
}
export interface MsgUpdateMultiSigConnectionAminoMsg {
  type: "pryzm/icstaking/v1/UpdateMultiSigConn";
  value: MsgUpdateMultiSigConnectionAmino;
}
export interface MsgUpdateMultiSigConnectionSDKType {
  creator: string;
  id: string;
  operator: string;
}
export interface MsgUpdateMultiSigConnectionResponse {}
export interface MsgUpdateMultiSigConnectionResponseProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.MsgUpdateMultiSigConnectionResponse";
  value: Uint8Array;
}
export interface MsgUpdateMultiSigConnectionResponseAmino {}
export interface MsgUpdateMultiSigConnectionResponseAminoMsg {
  type: "/pryzm.icstaking.v1.MsgUpdateMultiSigConnectionResponse";
  value: MsgUpdateMultiSigConnectionResponseAmino;
}
export interface MsgUpdateMultiSigConnectionResponseSDKType {}
export interface MsgAcknowledgeMultiSigPacket {
  creator: string;
  connectionId: string;
  sequence: bigint;
  ack: Acknowledgement | undefined;
  height: Height | undefined;
  txHash: string;
}
export interface MsgAcknowledgeMultiSigPacketProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.MsgAcknowledgeMultiSigPacket";
  value: Uint8Array;
}
export interface MsgAcknowledgeMultiSigPacketAmino {
  creator?: string;
  connection_id?: string;
  sequence?: string;
  ack?: AcknowledgementAmino | undefined;
  height?: HeightAmino | undefined;
  tx_hash?: string;
}
export interface MsgAcknowledgeMultiSigPacketAminoMsg {
  type: "pryzm/icstaking/v1/AckMultiSigPacket";
  value: MsgAcknowledgeMultiSigPacketAmino;
}
export interface MsgAcknowledgeMultiSigPacketSDKType {
  creator: string;
  connection_id: string;
  sequence: bigint;
  ack: AcknowledgementSDKType | undefined;
  height: HeightSDKType | undefined;
  tx_hash: string;
}
export interface MsgAcknowledgeMultiSigPacketResponse {}
export interface MsgAcknowledgeMultiSigPacketResponseProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.MsgAcknowledgeMultiSigPacketResponse";
  value: Uint8Array;
}
export interface MsgAcknowledgeMultiSigPacketResponseAmino {}
export interface MsgAcknowledgeMultiSigPacketResponseAminoMsg {
  type: "/pryzm.icstaking.v1.MsgAcknowledgeMultiSigPacketResponse";
  value: MsgAcknowledgeMultiSigPacketResponseAmino;
}
export interface MsgAcknowledgeMultiSigPacketResponseSDKType {}
export interface MsgRegisterHostAccounts {
  creator: string;
  hostChain: string;
  delegationAddress: string;
  rewardAddress: string;
  sweepAddress: string;
}
export interface MsgRegisterHostAccountsProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.MsgRegisterHostAccounts";
  value: Uint8Array;
}
export interface MsgRegisterHostAccountsAmino {
  creator?: string;
  host_chain?: string;
  delegation_address?: string;
  reward_address?: string;
  sweep_address?: string;
}
export interface MsgRegisterHostAccountsAminoMsg {
  type: "pryzm/icstaking/v1/RegisterHostAccounts";
  value: MsgRegisterHostAccountsAmino;
}
export interface MsgRegisterHostAccountsSDKType {
  creator: string;
  host_chain: string;
  delegation_address: string;
  reward_address: string;
  sweep_address: string;
}
export interface MsgRegisterHostAccountsResponse {}
export interface MsgRegisterHostAccountsResponseProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.MsgRegisterHostAccountsResponse";
  value: Uint8Array;
}
export interface MsgRegisterHostAccountsResponseAmino {}
export interface MsgRegisterHostAccountsResponseAminoMsg {
  type: "/pryzm.icstaking.v1.MsgRegisterHostAccountsResponse";
  value: MsgRegisterHostAccountsResponseAmino;
}
export interface MsgRegisterHostAccountsResponseSDKType {}
export interface MsgRetryFailedLsmTransfer {
  creator: string;
  hostChain: string;
  lsmDenom: string;
  transferChannel: string;
}
export interface MsgRetryFailedLsmTransferProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.MsgRetryFailedLsmTransfer";
  value: Uint8Array;
}
export interface MsgRetryFailedLsmTransferAmino {
  creator?: string;
  host_chain?: string;
  lsm_denom?: string;
  transfer_channel?: string;
}
export interface MsgRetryFailedLsmTransferAminoMsg {
  type: "pryzm/icstaking/v1/RetryFailLsmTransfer";
  value: MsgRetryFailedLsmTransferAmino;
}
export interface MsgRetryFailedLsmTransferSDKType {
  creator: string;
  host_chain: string;
  lsm_denom: string;
  transfer_channel: string;
}
export interface MsgRetryFailedLsmTransferResponse {}
export interface MsgRetryFailedLsmTransferResponseProtoMsg {
  typeUrl: "/pryzm.icstaking.v1.MsgRetryFailedLsmTransferResponse";
  value: Uint8Array;
}
export interface MsgRetryFailedLsmTransferResponseAmino {}
export interface MsgRetryFailedLsmTransferResponseAminoMsg {
  type: "/pryzm.icstaking.v1.MsgRetryFailedLsmTransferResponse";
  value: MsgRetryFailedLsmTransferResponseAmino;
}
export interface MsgRetryFailedLsmTransferResponseSDKType {}
function createBaseMsgUpdateParams(): MsgUpdateParams {
  return {
    authority: "",
    params: Params.fromPartial({})
  };
}
export const MsgUpdateParams = {
  typeUrl: "/pryzm.icstaking.v1.MsgUpdateParams",
  encode(message: MsgUpdateParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.params = Params.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUpdateParams>): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    message.authority = object.authority ?? "";
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: MsgUpdateParamsAmino): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: MsgUpdateParams, useInterfaces: boolean = false): MsgUpdateParamsAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : Params.toAmino(Params.fromPartial({}));
    return obj;
  },
  fromAminoMsg(object: MsgUpdateParamsAminoMsg): MsgUpdateParams {
    return MsgUpdateParams.fromAmino(object.value);
  },
  toAminoMsg(message: MsgUpdateParams, useInterfaces: boolean = false): MsgUpdateParamsAminoMsg {
    return {
      type: "pryzm/icstaking/v1/UpdateParams",
      value: MsgUpdateParams.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgUpdateParamsProtoMsg, useInterfaces: boolean = false): MsgUpdateParams {
    return MsgUpdateParams.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateParams): Uint8Array {
    return MsgUpdateParams.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateParams): MsgUpdateParamsProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.MsgUpdateParams",
      value: MsgUpdateParams.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateParamsResponse(): MsgUpdateParamsResponse {
  return {};
}
export const MsgUpdateParamsResponse = {
  typeUrl: "/pryzm.icstaking.v1.MsgUpdateParamsResponse",
  encode(_: MsgUpdateParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParamsResponse();
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
  fromPartial(_: Partial<MsgUpdateParamsResponse>): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  },
  fromAmino(_: MsgUpdateParamsResponseAmino): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  },
  toAmino(_: MsgUpdateParamsResponse, useInterfaces: boolean = false): MsgUpdateParamsResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateParamsResponseAminoMsg): MsgUpdateParamsResponse {
    return MsgUpdateParamsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateParamsResponseProtoMsg, useInterfaces: boolean = false): MsgUpdateParamsResponse {
    return MsgUpdateParamsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateParamsResponse): Uint8Array {
    return MsgUpdateParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateParamsResponse): MsgUpdateParamsResponseProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.MsgUpdateParamsResponse",
      value: MsgUpdateParamsResponse.encode(message).finish()
    };
  }
};
function createBaseMsgRegisterHostChain(): MsgRegisterHostChain {
  return {
    creator: "",
    hostChain: HostChain.fromPartial({})
  };
}
export const MsgRegisterHostChain = {
  typeUrl: "/pryzm.icstaking.v1.MsgRegisterHostChain",
  encode(message: MsgRegisterHostChain, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.hostChain !== undefined) {
      HostChain.encode(message.hostChain, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRegisterHostChain {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterHostChain();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.hostChain = HostChain.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgRegisterHostChain>): MsgRegisterHostChain {
    const message = createBaseMsgRegisterHostChain();
    message.creator = object.creator ?? "";
    message.hostChain = object.hostChain !== undefined && object.hostChain !== null ? HostChain.fromPartial(object.hostChain) : undefined;
    return message;
  },
  fromAmino(object: MsgRegisterHostChainAmino): MsgRegisterHostChain {
    const message = createBaseMsgRegisterHostChain();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.host_chain !== undefined && object.host_chain !== null) {
      message.hostChain = HostChain.fromAmino(object.host_chain);
    }
    return message;
  },
  toAmino(message: MsgRegisterHostChain, useInterfaces: boolean = false): MsgRegisterHostChainAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.host_chain = message.hostChain ? HostChain.toAmino(message.hostChain, useInterfaces) : HostChain.toAmino(HostChain.fromPartial({}));
    return obj;
  },
  fromAminoMsg(object: MsgRegisterHostChainAminoMsg): MsgRegisterHostChain {
    return MsgRegisterHostChain.fromAmino(object.value);
  },
  toAminoMsg(message: MsgRegisterHostChain, useInterfaces: boolean = false): MsgRegisterHostChainAminoMsg {
    return {
      type: "pryzm/icstaking/v1/RegisterHostChain",
      value: MsgRegisterHostChain.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgRegisterHostChainProtoMsg, useInterfaces: boolean = false): MsgRegisterHostChain {
    return MsgRegisterHostChain.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRegisterHostChain): Uint8Array {
    return MsgRegisterHostChain.encode(message).finish();
  },
  toProtoMsg(message: MsgRegisterHostChain): MsgRegisterHostChainProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.MsgRegisterHostChain",
      value: MsgRegisterHostChain.encode(message).finish()
    };
  }
};
function createBaseMsgRegisterHostChainResponse(): MsgRegisterHostChainResponse {
  return {};
}
export const MsgRegisterHostChainResponse = {
  typeUrl: "/pryzm.icstaking.v1.MsgRegisterHostChainResponse",
  encode(_: MsgRegisterHostChainResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRegisterHostChainResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterHostChainResponse();
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
  fromPartial(_: Partial<MsgRegisterHostChainResponse>): MsgRegisterHostChainResponse {
    const message = createBaseMsgRegisterHostChainResponse();
    return message;
  },
  fromAmino(_: MsgRegisterHostChainResponseAmino): MsgRegisterHostChainResponse {
    const message = createBaseMsgRegisterHostChainResponse();
    return message;
  },
  toAmino(_: MsgRegisterHostChainResponse, useInterfaces: boolean = false): MsgRegisterHostChainResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgRegisterHostChainResponseAminoMsg): MsgRegisterHostChainResponse {
    return MsgRegisterHostChainResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRegisterHostChainResponseProtoMsg, useInterfaces: boolean = false): MsgRegisterHostChainResponse {
    return MsgRegisterHostChainResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRegisterHostChainResponse): Uint8Array {
    return MsgRegisterHostChainResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgRegisterHostChainResponse): MsgRegisterHostChainResponseProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.MsgRegisterHostChainResponse",
      value: MsgRegisterHostChainResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateHostChain(): MsgUpdateHostChain {
  return {
    creator: "",
    hostChainId: "",
    validators: [],
    params: undefined,
    allowLsmShares: undefined
  };
}
export const MsgUpdateHostChain = {
  typeUrl: "/pryzm.icstaking.v1.MsgUpdateHostChain",
  encode(message: MsgUpdateHostChain, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.hostChainId !== "") {
      writer.uint32(18).string(message.hostChainId);
    }
    for (const v of message.validators) {
      Validator.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.params !== undefined) {
      StakingParams.encode(message.params, writer.uint32(34).fork()).ldelim();
    }
    if (message.allowLsmShares !== undefined) {
      BoolValue.encode(message.allowLsmShares, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateHostChain {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateHostChain();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.hostChainId = reader.string();
          break;
        case 3:
          message.validators.push(Validator.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 4:
          message.params = StakingParams.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 5:
          message.allowLsmShares = BoolValue.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUpdateHostChain>): MsgUpdateHostChain {
    const message = createBaseMsgUpdateHostChain();
    message.creator = object.creator ?? "";
    message.hostChainId = object.hostChainId ?? "";
    message.validators = object.validators?.map(e => Validator.fromPartial(e)) || [];
    message.params = object.params !== undefined && object.params !== null ? StakingParams.fromPartial(object.params) : undefined;
    message.allowLsmShares = object.allowLsmShares !== undefined && object.allowLsmShares !== null ? BoolValue.fromPartial(object.allowLsmShares) : undefined;
    return message;
  },
  fromAmino(object: MsgUpdateHostChainAmino): MsgUpdateHostChain {
    const message = createBaseMsgUpdateHostChain();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.host_chain_id !== undefined && object.host_chain_id !== null) {
      message.hostChainId = object.host_chain_id;
    }
    message.validators = object.validators?.map(e => Validator.fromAmino(e)) || [];
    if (object.params !== undefined && object.params !== null) {
      message.params = StakingParams.fromAmino(object.params);
    }
    if (object.allow_lsm_shares !== undefined && object.allow_lsm_shares !== null) {
      message.allowLsmShares = BoolValue.fromAmino(object.allow_lsm_shares);
    }
    return message;
  },
  toAmino(message: MsgUpdateHostChain, useInterfaces: boolean = false): MsgUpdateHostChainAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.host_chain_id = message.hostChainId === "" ? undefined : message.hostChainId;
    if (message.validators) {
      obj.validators = message.validators.map(e => e ? Validator.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.validators = message.validators;
    }
    obj.params = message.params ? StakingParams.toAmino(message.params, useInterfaces) : StakingParams.toAmino(StakingParams.fromPartial({}));
    obj.allow_lsm_shares = message.allowLsmShares ? BoolValue.toAmino(message.allowLsmShares, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgUpdateHostChainAminoMsg): MsgUpdateHostChain {
    return MsgUpdateHostChain.fromAmino(object.value);
  },
  toAminoMsg(message: MsgUpdateHostChain, useInterfaces: boolean = false): MsgUpdateHostChainAminoMsg {
    return {
      type: "pryzm/icstaking/v1/UpdateHostChain",
      value: MsgUpdateHostChain.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgUpdateHostChainProtoMsg, useInterfaces: boolean = false): MsgUpdateHostChain {
    return MsgUpdateHostChain.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateHostChain): Uint8Array {
    return MsgUpdateHostChain.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateHostChain): MsgUpdateHostChainProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.MsgUpdateHostChain",
      value: MsgUpdateHostChain.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateHostChainResponse(): MsgUpdateHostChainResponse {
  return {};
}
export const MsgUpdateHostChainResponse = {
  typeUrl: "/pryzm.icstaking.v1.MsgUpdateHostChainResponse",
  encode(_: MsgUpdateHostChainResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateHostChainResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateHostChainResponse();
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
  fromPartial(_: Partial<MsgUpdateHostChainResponse>): MsgUpdateHostChainResponse {
    const message = createBaseMsgUpdateHostChainResponse();
    return message;
  },
  fromAmino(_: MsgUpdateHostChainResponseAmino): MsgUpdateHostChainResponse {
    const message = createBaseMsgUpdateHostChainResponse();
    return message;
  },
  toAmino(_: MsgUpdateHostChainResponse, useInterfaces: boolean = false): MsgUpdateHostChainResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateHostChainResponseAminoMsg): MsgUpdateHostChainResponse {
    return MsgUpdateHostChainResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateHostChainResponseProtoMsg, useInterfaces: boolean = false): MsgUpdateHostChainResponse {
    return MsgUpdateHostChainResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateHostChainResponse): Uint8Array {
    return MsgUpdateHostChainResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateHostChainResponse): MsgUpdateHostChainResponseProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.MsgUpdateHostChainResponse",
      value: MsgUpdateHostChainResponse.encode(message).finish()
    };
  }
};
function createBaseMsgStake(): MsgStake {
  return {
    creator: "",
    hostChain: "",
    transferChannel: "",
    amount: ""
  };
}
export const MsgStake = {
  typeUrl: "/pryzm.icstaking.v1.MsgStake",
  encode(message: MsgStake, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.hostChain !== "") {
      writer.uint32(18).string(message.hostChain);
    }
    if (message.transferChannel !== "") {
      writer.uint32(26).string(message.transferChannel);
    }
    if (message.amount !== "") {
      writer.uint32(34).string(message.amount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgStake {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgStake();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.hostChain = reader.string();
          break;
        case 3:
          message.transferChannel = reader.string();
          break;
        case 4:
          message.amount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgStake>): MsgStake {
    const message = createBaseMsgStake();
    message.creator = object.creator ?? "";
    message.hostChain = object.hostChain ?? "";
    message.transferChannel = object.transferChannel ?? "";
    message.amount = object.amount ?? "";
    return message;
  },
  fromAmino(object: MsgStakeAmino): MsgStake {
    const message = createBaseMsgStake();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.host_chain !== undefined && object.host_chain !== null) {
      message.hostChain = object.host_chain;
    }
    if (object.transfer_channel !== undefined && object.transfer_channel !== null) {
      message.transferChannel = object.transfer_channel;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    }
    return message;
  },
  toAmino(message: MsgStake, useInterfaces: boolean = false): MsgStakeAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.host_chain = message.hostChain === "" ? undefined : message.hostChain;
    obj.transfer_channel = message.transferChannel === "" ? undefined : message.transferChannel;
    obj.amount = message.amount ?? "";
    return obj;
  },
  fromAminoMsg(object: MsgStakeAminoMsg): MsgStake {
    return MsgStake.fromAmino(object.value);
  },
  toAminoMsg(message: MsgStake, useInterfaces: boolean = false): MsgStakeAminoMsg {
    return {
      type: "pryzm/icstaking/v1/Stake",
      value: MsgStake.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgStakeProtoMsg, useInterfaces: boolean = false): MsgStake {
    return MsgStake.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgStake): Uint8Array {
    return MsgStake.encode(message).finish();
  },
  toProtoMsg(message: MsgStake): MsgStakeProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.MsgStake",
      value: MsgStake.encode(message).finish()
    };
  }
};
function createBaseMsgStakeResponse(): MsgStakeResponse {
  return {
    cAmount: Coin.fromPartial({}),
    fee: Coin.fromPartial({})
  };
}
export const MsgStakeResponse = {
  typeUrl: "/pryzm.icstaking.v1.MsgStakeResponse",
  encode(message: MsgStakeResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.cAmount !== undefined) {
      Coin.encode(message.cAmount, writer.uint32(10).fork()).ldelim();
    }
    if (message.fee !== undefined) {
      Coin.encode(message.fee, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgStakeResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgStakeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.cAmount = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.fee = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgStakeResponse>): MsgStakeResponse {
    const message = createBaseMsgStakeResponse();
    message.cAmount = object.cAmount !== undefined && object.cAmount !== null ? Coin.fromPartial(object.cAmount) : undefined;
    message.fee = object.fee !== undefined && object.fee !== null ? Coin.fromPartial(object.fee) : undefined;
    return message;
  },
  fromAmino(object: MsgStakeResponseAmino): MsgStakeResponse {
    const message = createBaseMsgStakeResponse();
    if (object.c_amount !== undefined && object.c_amount !== null) {
      message.cAmount = Coin.fromAmino(object.c_amount);
    }
    if (object.fee !== undefined && object.fee !== null) {
      message.fee = Coin.fromAmino(object.fee);
    }
    return message;
  },
  toAmino(message: MsgStakeResponse, useInterfaces: boolean = false): MsgStakeResponseAmino {
    const obj: any = {};
    obj.c_amount = message.cAmount ? Coin.toAmino(message.cAmount, useInterfaces) : undefined;
    obj.fee = message.fee ? Coin.toAmino(message.fee, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgStakeResponseAminoMsg): MsgStakeResponse {
    return MsgStakeResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgStakeResponseProtoMsg, useInterfaces: boolean = false): MsgStakeResponse {
    return MsgStakeResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgStakeResponse): Uint8Array {
    return MsgStakeResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgStakeResponse): MsgStakeResponseProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.MsgStakeResponse",
      value: MsgStakeResponse.encode(message).finish()
    };
  }
};
function createBaseMsgStakeLsmShares(): MsgStakeLsmShares {
  return {
    creator: "",
    hostChain: "",
    transferChannel: "",
    lsmDenom: "",
    amount: ""
  };
}
export const MsgStakeLsmShares = {
  typeUrl: "/pryzm.icstaking.v1.MsgStakeLsmShares",
  encode(message: MsgStakeLsmShares, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.hostChain !== "") {
      writer.uint32(18).string(message.hostChain);
    }
    if (message.transferChannel !== "") {
      writer.uint32(26).string(message.transferChannel);
    }
    if (message.lsmDenom !== "") {
      writer.uint32(34).string(message.lsmDenom);
    }
    if (message.amount !== "") {
      writer.uint32(42).string(message.amount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgStakeLsmShares {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgStakeLsmShares();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.hostChain = reader.string();
          break;
        case 3:
          message.transferChannel = reader.string();
          break;
        case 4:
          message.lsmDenom = reader.string();
          break;
        case 5:
          message.amount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgStakeLsmShares>): MsgStakeLsmShares {
    const message = createBaseMsgStakeLsmShares();
    message.creator = object.creator ?? "";
    message.hostChain = object.hostChain ?? "";
    message.transferChannel = object.transferChannel ?? "";
    message.lsmDenom = object.lsmDenom ?? "";
    message.amount = object.amount ?? "";
    return message;
  },
  fromAmino(object: MsgStakeLsmSharesAmino): MsgStakeLsmShares {
    const message = createBaseMsgStakeLsmShares();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.host_chain !== undefined && object.host_chain !== null) {
      message.hostChain = object.host_chain;
    }
    if (object.transfer_channel !== undefined && object.transfer_channel !== null) {
      message.transferChannel = object.transfer_channel;
    }
    if (object.lsm_denom !== undefined && object.lsm_denom !== null) {
      message.lsmDenom = object.lsm_denom;
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    }
    return message;
  },
  toAmino(message: MsgStakeLsmShares, useInterfaces: boolean = false): MsgStakeLsmSharesAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.host_chain = message.hostChain === "" ? undefined : message.hostChain;
    obj.transfer_channel = message.transferChannel === "" ? undefined : message.transferChannel;
    obj.lsm_denom = message.lsmDenom === "" ? undefined : message.lsmDenom;
    obj.amount = message.amount ?? "";
    return obj;
  },
  fromAminoMsg(object: MsgStakeLsmSharesAminoMsg): MsgStakeLsmShares {
    return MsgStakeLsmShares.fromAmino(object.value);
  },
  toAminoMsg(message: MsgStakeLsmShares, useInterfaces: boolean = false): MsgStakeLsmSharesAminoMsg {
    return {
      type: "pryzm/icstaking/v1/StakeLsmShares",
      value: MsgStakeLsmShares.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgStakeLsmSharesProtoMsg, useInterfaces: boolean = false): MsgStakeLsmShares {
    return MsgStakeLsmShares.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgStakeLsmShares): Uint8Array {
    return MsgStakeLsmShares.encode(message).finish();
  },
  toProtoMsg(message: MsgStakeLsmShares): MsgStakeLsmSharesProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.MsgStakeLsmShares",
      value: MsgStakeLsmShares.encode(message).finish()
    };
  }
};
function createBaseMsgStakeLsmSharesResponse(): MsgStakeLsmSharesResponse {
  return {
    cAmount: Coin.fromPartial({}),
    fee: Coin.fromPartial({})
  };
}
export const MsgStakeLsmSharesResponse = {
  typeUrl: "/pryzm.icstaking.v1.MsgStakeLsmSharesResponse",
  encode(message: MsgStakeLsmSharesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.cAmount !== undefined) {
      Coin.encode(message.cAmount, writer.uint32(10).fork()).ldelim();
    }
    if (message.fee !== undefined) {
      Coin.encode(message.fee, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgStakeLsmSharesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgStakeLsmSharesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.cAmount = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.fee = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgStakeLsmSharesResponse>): MsgStakeLsmSharesResponse {
    const message = createBaseMsgStakeLsmSharesResponse();
    message.cAmount = object.cAmount !== undefined && object.cAmount !== null ? Coin.fromPartial(object.cAmount) : undefined;
    message.fee = object.fee !== undefined && object.fee !== null ? Coin.fromPartial(object.fee) : undefined;
    return message;
  },
  fromAmino(object: MsgStakeLsmSharesResponseAmino): MsgStakeLsmSharesResponse {
    const message = createBaseMsgStakeLsmSharesResponse();
    if (object.c_amount !== undefined && object.c_amount !== null) {
      message.cAmount = Coin.fromAmino(object.c_amount);
    }
    if (object.fee !== undefined && object.fee !== null) {
      message.fee = Coin.fromAmino(object.fee);
    }
    return message;
  },
  toAmino(message: MsgStakeLsmSharesResponse, useInterfaces: boolean = false): MsgStakeLsmSharesResponseAmino {
    const obj: any = {};
    obj.c_amount = message.cAmount ? Coin.toAmino(message.cAmount, useInterfaces) : undefined;
    obj.fee = message.fee ? Coin.toAmino(message.fee, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgStakeLsmSharesResponseAminoMsg): MsgStakeLsmSharesResponse {
    return MsgStakeLsmSharesResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgStakeLsmSharesResponseProtoMsg, useInterfaces: boolean = false): MsgStakeLsmSharesResponse {
    return MsgStakeLsmSharesResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgStakeLsmSharesResponse): Uint8Array {
    return MsgStakeLsmSharesResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgStakeLsmSharesResponse): MsgStakeLsmSharesResponseProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.MsgStakeLsmSharesResponse",
      value: MsgStakeLsmSharesResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUnstake(): MsgUnstake {
  return {
    creator: "",
    hostChain: "",
    transferChannel: "",
    cAmount: ""
  };
}
export const MsgUnstake = {
  typeUrl: "/pryzm.icstaking.v1.MsgUnstake",
  encode(message: MsgUnstake, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.hostChain !== "") {
      writer.uint32(18).string(message.hostChain);
    }
    if (message.transferChannel !== "") {
      writer.uint32(26).string(message.transferChannel);
    }
    if (message.cAmount !== "") {
      writer.uint32(34).string(message.cAmount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUnstake {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUnstake();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.hostChain = reader.string();
          break;
        case 3:
          message.transferChannel = reader.string();
          break;
        case 4:
          message.cAmount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUnstake>): MsgUnstake {
    const message = createBaseMsgUnstake();
    message.creator = object.creator ?? "";
    message.hostChain = object.hostChain ?? "";
    message.transferChannel = object.transferChannel ?? "";
    message.cAmount = object.cAmount ?? "";
    return message;
  },
  fromAmino(object: MsgUnstakeAmino): MsgUnstake {
    const message = createBaseMsgUnstake();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.host_chain !== undefined && object.host_chain !== null) {
      message.hostChain = object.host_chain;
    }
    if (object.transfer_channel !== undefined && object.transfer_channel !== null) {
      message.transferChannel = object.transfer_channel;
    }
    if (object.c_amount !== undefined && object.c_amount !== null) {
      message.cAmount = object.c_amount;
    }
    return message;
  },
  toAmino(message: MsgUnstake, useInterfaces: boolean = false): MsgUnstakeAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.host_chain = message.hostChain === "" ? undefined : message.hostChain;
    obj.transfer_channel = message.transferChannel === "" ? undefined : message.transferChannel;
    obj.c_amount = message.cAmount ?? "";
    return obj;
  },
  fromAminoMsg(object: MsgUnstakeAminoMsg): MsgUnstake {
    return MsgUnstake.fromAmino(object.value);
  },
  toAminoMsg(message: MsgUnstake, useInterfaces: boolean = false): MsgUnstakeAminoMsg {
    return {
      type: "pryzm/icstaking/v1/Unstake",
      value: MsgUnstake.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgUnstakeProtoMsg, useInterfaces: boolean = false): MsgUnstake {
    return MsgUnstake.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUnstake): Uint8Array {
    return MsgUnstake.encode(message).finish();
  },
  toProtoMsg(message: MsgUnstake): MsgUnstakeProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.MsgUnstake",
      value: MsgUnstake.encode(message).finish()
    };
  }
};
function createBaseMsgUnstakeResponse(): MsgUnstakeResponse {
  return {
    uAmount: Coin.fromPartial({})
  };
}
export const MsgUnstakeResponse = {
  typeUrl: "/pryzm.icstaking.v1.MsgUnstakeResponse",
  encode(message: MsgUnstakeResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.uAmount !== undefined) {
      Coin.encode(message.uAmount, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUnstakeResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUnstakeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.uAmount = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUnstakeResponse>): MsgUnstakeResponse {
    const message = createBaseMsgUnstakeResponse();
    message.uAmount = object.uAmount !== undefined && object.uAmount !== null ? Coin.fromPartial(object.uAmount) : undefined;
    return message;
  },
  fromAmino(object: MsgUnstakeResponseAmino): MsgUnstakeResponse {
    const message = createBaseMsgUnstakeResponse();
    if (object.u_amount !== undefined && object.u_amount !== null) {
      message.uAmount = Coin.fromAmino(object.u_amount);
    }
    return message;
  },
  toAmino(message: MsgUnstakeResponse, useInterfaces: boolean = false): MsgUnstakeResponseAmino {
    const obj: any = {};
    obj.u_amount = message.uAmount ? Coin.toAmino(message.uAmount, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgUnstakeResponseAminoMsg): MsgUnstakeResponse {
    return MsgUnstakeResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUnstakeResponseProtoMsg, useInterfaces: boolean = false): MsgUnstakeResponse {
    return MsgUnstakeResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUnstakeResponse): Uint8Array {
    return MsgUnstakeResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUnstakeResponse): MsgUnstakeResponseProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.MsgUnstakeResponse",
      value: MsgUnstakeResponse.encode(message).finish()
    };
  }
};
function createBaseMsgRedeemUnstaked(): MsgRedeemUnstaked {
  return {
    creator: "",
    hostChain: "",
    transferChannel: "",
    uAmount: "",
    epoch: BigInt(0)
  };
}
export const MsgRedeemUnstaked = {
  typeUrl: "/pryzm.icstaking.v1.MsgRedeemUnstaked",
  encode(message: MsgRedeemUnstaked, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.hostChain !== "") {
      writer.uint32(18).string(message.hostChain);
    }
    if (message.transferChannel !== "") {
      writer.uint32(26).string(message.transferChannel);
    }
    if (message.uAmount !== "") {
      writer.uint32(34).string(message.uAmount);
    }
    if (message.epoch !== BigInt(0)) {
      writer.uint32(40).uint64(message.epoch);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRedeemUnstaked {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRedeemUnstaked();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.hostChain = reader.string();
          break;
        case 3:
          message.transferChannel = reader.string();
          break;
        case 4:
          message.uAmount = reader.string();
          break;
        case 5:
          message.epoch = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgRedeemUnstaked>): MsgRedeemUnstaked {
    const message = createBaseMsgRedeemUnstaked();
    message.creator = object.creator ?? "";
    message.hostChain = object.hostChain ?? "";
    message.transferChannel = object.transferChannel ?? "";
    message.uAmount = object.uAmount ?? "";
    message.epoch = object.epoch !== undefined && object.epoch !== null ? BigInt(object.epoch.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgRedeemUnstakedAmino): MsgRedeemUnstaked {
    const message = createBaseMsgRedeemUnstaked();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.host_chain !== undefined && object.host_chain !== null) {
      message.hostChain = object.host_chain;
    }
    if (object.transfer_channel !== undefined && object.transfer_channel !== null) {
      message.transferChannel = object.transfer_channel;
    }
    if (object.u_amount !== undefined && object.u_amount !== null) {
      message.uAmount = object.u_amount;
    }
    if (object.epoch !== undefined && object.epoch !== null) {
      message.epoch = BigInt(object.epoch);
    }
    return message;
  },
  toAmino(message: MsgRedeemUnstaked, useInterfaces: boolean = false): MsgRedeemUnstakedAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.host_chain = message.hostChain === "" ? undefined : message.hostChain;
    obj.transfer_channel = message.transferChannel === "" ? undefined : message.transferChannel;
    obj.u_amount = message.uAmount ?? "";
    obj.epoch = message.epoch ? message.epoch.toString() : "0";
    return obj;
  },
  fromAminoMsg(object: MsgRedeemUnstakedAminoMsg): MsgRedeemUnstaked {
    return MsgRedeemUnstaked.fromAmino(object.value);
  },
  toAminoMsg(message: MsgRedeemUnstaked, useInterfaces: boolean = false): MsgRedeemUnstakedAminoMsg {
    return {
      type: "pryzm/icstaking/v1/RedeemUnstaked",
      value: MsgRedeemUnstaked.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgRedeemUnstakedProtoMsg, useInterfaces: boolean = false): MsgRedeemUnstaked {
    return MsgRedeemUnstaked.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRedeemUnstaked): Uint8Array {
    return MsgRedeemUnstaked.encode(message).finish();
  },
  toProtoMsg(message: MsgRedeemUnstaked): MsgRedeemUnstakedProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.MsgRedeemUnstaked",
      value: MsgRedeemUnstaked.encode(message).finish()
    };
  }
};
function createBaseMsgRedeemUnstakedResponse(): MsgRedeemUnstakedResponse {
  return {
    amount: Coin.fromPartial({}),
    fee: Coin.fromPartial({})
  };
}
export const MsgRedeemUnstakedResponse = {
  typeUrl: "/pryzm.icstaking.v1.MsgRedeemUnstakedResponse",
  encode(message: MsgRedeemUnstakedResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(10).fork()).ldelim();
    }
    if (message.fee !== undefined) {
      Coin.encode(message.fee, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRedeemUnstakedResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRedeemUnstakedResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.amount = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.fee = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgRedeemUnstakedResponse>): MsgRedeemUnstakedResponse {
    const message = createBaseMsgRedeemUnstakedResponse();
    message.amount = object.amount !== undefined && object.amount !== null ? Coin.fromPartial(object.amount) : undefined;
    message.fee = object.fee !== undefined && object.fee !== null ? Coin.fromPartial(object.fee) : undefined;
    return message;
  },
  fromAmino(object: MsgRedeemUnstakedResponseAmino): MsgRedeemUnstakedResponse {
    const message = createBaseMsgRedeemUnstakedResponse();
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = Coin.fromAmino(object.amount);
    }
    if (object.fee !== undefined && object.fee !== null) {
      message.fee = Coin.fromAmino(object.fee);
    }
    return message;
  },
  toAmino(message: MsgRedeemUnstakedResponse, useInterfaces: boolean = false): MsgRedeemUnstakedResponseAmino {
    const obj: any = {};
    obj.amount = message.amount ? Coin.toAmino(message.amount, useInterfaces) : undefined;
    obj.fee = message.fee ? Coin.toAmino(message.fee, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgRedeemUnstakedResponseAminoMsg): MsgRedeemUnstakedResponse {
    return MsgRedeemUnstakedResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRedeemUnstakedResponseProtoMsg, useInterfaces: boolean = false): MsgRedeemUnstakedResponse {
    return MsgRedeemUnstakedResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRedeemUnstakedResponse): Uint8Array {
    return MsgRedeemUnstakedResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgRedeemUnstakedResponse): MsgRedeemUnstakedResponseProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.MsgRedeemUnstakedResponse",
      value: MsgRedeemUnstakedResponse.encode(message).finish()
    };
  }
};
function createBaseMsgInstantUnstake(): MsgInstantUnstake {
  return {
    creator: "",
    hostChain: "",
    transferChannel: "",
    minCAmount: "",
    maxCAmount: ""
  };
}
export const MsgInstantUnstake = {
  typeUrl: "/pryzm.icstaking.v1.MsgInstantUnstake",
  encode(message: MsgInstantUnstake, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.hostChain !== "") {
      writer.uint32(18).string(message.hostChain);
    }
    if (message.transferChannel !== "") {
      writer.uint32(26).string(message.transferChannel);
    }
    if (message.minCAmount !== "") {
      writer.uint32(34).string(message.minCAmount);
    }
    if (message.maxCAmount !== "") {
      writer.uint32(42).string(message.maxCAmount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgInstantUnstake {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgInstantUnstake();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.hostChain = reader.string();
          break;
        case 3:
          message.transferChannel = reader.string();
          break;
        case 4:
          message.minCAmount = reader.string();
          break;
        case 5:
          message.maxCAmount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgInstantUnstake>): MsgInstantUnstake {
    const message = createBaseMsgInstantUnstake();
    message.creator = object.creator ?? "";
    message.hostChain = object.hostChain ?? "";
    message.transferChannel = object.transferChannel ?? "";
    message.minCAmount = object.minCAmount ?? "";
    message.maxCAmount = object.maxCAmount ?? "";
    return message;
  },
  fromAmino(object: MsgInstantUnstakeAmino): MsgInstantUnstake {
    const message = createBaseMsgInstantUnstake();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.host_chain !== undefined && object.host_chain !== null) {
      message.hostChain = object.host_chain;
    }
    if (object.transfer_channel !== undefined && object.transfer_channel !== null) {
      message.transferChannel = object.transfer_channel;
    }
    if (object.min_c_amount !== undefined && object.min_c_amount !== null) {
      message.minCAmount = object.min_c_amount;
    }
    if (object.max_c_amount !== undefined && object.max_c_amount !== null) {
      message.maxCAmount = object.max_c_amount;
    }
    return message;
  },
  toAmino(message: MsgInstantUnstake, useInterfaces: boolean = false): MsgInstantUnstakeAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.host_chain = message.hostChain === "" ? undefined : message.hostChain;
    obj.transfer_channel = message.transferChannel === "" ? undefined : message.transferChannel;
    obj.min_c_amount = message.minCAmount ?? "";
    obj.max_c_amount = message.maxCAmount ?? "";
    return obj;
  },
  fromAminoMsg(object: MsgInstantUnstakeAminoMsg): MsgInstantUnstake {
    return MsgInstantUnstake.fromAmino(object.value);
  },
  toAminoMsg(message: MsgInstantUnstake, useInterfaces: boolean = false): MsgInstantUnstakeAminoMsg {
    return {
      type: "pryzm/icstaking/v1/InstantUnstake",
      value: MsgInstantUnstake.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgInstantUnstakeProtoMsg, useInterfaces: boolean = false): MsgInstantUnstake {
    return MsgInstantUnstake.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgInstantUnstake): Uint8Array {
    return MsgInstantUnstake.encode(message).finish();
  },
  toProtoMsg(message: MsgInstantUnstake): MsgInstantUnstakeProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.MsgInstantUnstake",
      value: MsgInstantUnstake.encode(message).finish()
    };
  }
};
function createBaseMsgInstantUnstakeResponse(): MsgInstantUnstakeResponse {
  return {
    amount: Coin.fromPartial({}),
    fee: Coin.fromPartial({})
  };
}
export const MsgInstantUnstakeResponse = {
  typeUrl: "/pryzm.icstaking.v1.MsgInstantUnstakeResponse",
  encode(message: MsgInstantUnstakeResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(10).fork()).ldelim();
    }
    if (message.fee !== undefined) {
      Coin.encode(message.fee, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgInstantUnstakeResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgInstantUnstakeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.amount = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.fee = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgInstantUnstakeResponse>): MsgInstantUnstakeResponse {
    const message = createBaseMsgInstantUnstakeResponse();
    message.amount = object.amount !== undefined && object.amount !== null ? Coin.fromPartial(object.amount) : undefined;
    message.fee = object.fee !== undefined && object.fee !== null ? Coin.fromPartial(object.fee) : undefined;
    return message;
  },
  fromAmino(object: MsgInstantUnstakeResponseAmino): MsgInstantUnstakeResponse {
    const message = createBaseMsgInstantUnstakeResponse();
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = Coin.fromAmino(object.amount);
    }
    if (object.fee !== undefined && object.fee !== null) {
      message.fee = Coin.fromAmino(object.fee);
    }
    return message;
  },
  toAmino(message: MsgInstantUnstakeResponse, useInterfaces: boolean = false): MsgInstantUnstakeResponseAmino {
    const obj: any = {};
    obj.amount = message.amount ? Coin.toAmino(message.amount, useInterfaces) : undefined;
    obj.fee = message.fee ? Coin.toAmino(message.fee, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgInstantUnstakeResponseAminoMsg): MsgInstantUnstakeResponse {
    return MsgInstantUnstakeResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgInstantUnstakeResponseProtoMsg, useInterfaces: boolean = false): MsgInstantUnstakeResponse {
    return MsgInstantUnstakeResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgInstantUnstakeResponse): Uint8Array {
    return MsgInstantUnstakeResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgInstantUnstakeResponse): MsgInstantUnstakeResponseProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.MsgInstantUnstakeResponse",
      value: MsgInstantUnstakeResponse.encode(message).finish()
    };
  }
};
function createBaseMsgRebalanceDelegations(): MsgRebalanceDelegations {
  return {
    creator: "",
    hostChain: ""
  };
}
export const MsgRebalanceDelegations = {
  typeUrl: "/pryzm.icstaking.v1.MsgRebalanceDelegations",
  encode(message: MsgRebalanceDelegations, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.hostChain !== "") {
      writer.uint32(18).string(message.hostChain);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRebalanceDelegations {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRebalanceDelegations();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.hostChain = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgRebalanceDelegations>): MsgRebalanceDelegations {
    const message = createBaseMsgRebalanceDelegations();
    message.creator = object.creator ?? "";
    message.hostChain = object.hostChain ?? "";
    return message;
  },
  fromAmino(object: MsgRebalanceDelegationsAmino): MsgRebalanceDelegations {
    const message = createBaseMsgRebalanceDelegations();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.host_chain !== undefined && object.host_chain !== null) {
      message.hostChain = object.host_chain;
    }
    return message;
  },
  toAmino(message: MsgRebalanceDelegations, useInterfaces: boolean = false): MsgRebalanceDelegationsAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.host_chain = message.hostChain === "" ? undefined : message.hostChain;
    return obj;
  },
  fromAminoMsg(object: MsgRebalanceDelegationsAminoMsg): MsgRebalanceDelegations {
    return MsgRebalanceDelegations.fromAmino(object.value);
  },
  toAminoMsg(message: MsgRebalanceDelegations, useInterfaces: boolean = false): MsgRebalanceDelegationsAminoMsg {
    return {
      type: "pryzm/icstaking/v1/RebalanceDelegations",
      value: MsgRebalanceDelegations.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgRebalanceDelegationsProtoMsg, useInterfaces: boolean = false): MsgRebalanceDelegations {
    return MsgRebalanceDelegations.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRebalanceDelegations): Uint8Array {
    return MsgRebalanceDelegations.encode(message).finish();
  },
  toProtoMsg(message: MsgRebalanceDelegations): MsgRebalanceDelegationsProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.MsgRebalanceDelegations",
      value: MsgRebalanceDelegations.encode(message).finish()
    };
  }
};
function createBaseMsgRebalanceDelegationsResponse(): MsgRebalanceDelegationsResponse {
  return {};
}
export const MsgRebalanceDelegationsResponse = {
  typeUrl: "/pryzm.icstaking.v1.MsgRebalanceDelegationsResponse",
  encode(_: MsgRebalanceDelegationsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRebalanceDelegationsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRebalanceDelegationsResponse();
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
  fromPartial(_: Partial<MsgRebalanceDelegationsResponse>): MsgRebalanceDelegationsResponse {
    const message = createBaseMsgRebalanceDelegationsResponse();
    return message;
  },
  fromAmino(_: MsgRebalanceDelegationsResponseAmino): MsgRebalanceDelegationsResponse {
    const message = createBaseMsgRebalanceDelegationsResponse();
    return message;
  },
  toAmino(_: MsgRebalanceDelegationsResponse, useInterfaces: boolean = false): MsgRebalanceDelegationsResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgRebalanceDelegationsResponseAminoMsg): MsgRebalanceDelegationsResponse {
    return MsgRebalanceDelegationsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRebalanceDelegationsResponseProtoMsg, useInterfaces: boolean = false): MsgRebalanceDelegationsResponse {
    return MsgRebalanceDelegationsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRebalanceDelegationsResponse): Uint8Array {
    return MsgRebalanceDelegationsResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgRebalanceDelegationsResponse): MsgRebalanceDelegationsResponseProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.MsgRebalanceDelegationsResponse",
      value: MsgRebalanceDelegationsResponse.encode(message).finish()
    };
  }
};
function createBaseMsgRedelegate(): MsgRedelegate {
  return {
    creator: "",
    hostChain: "",
    redelegations: []
  };
}
export const MsgRedelegate = {
  typeUrl: "/pryzm.icstaking.v1.MsgRedelegate",
  encode(message: MsgRedelegate, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.hostChain !== "") {
      writer.uint32(18).string(message.hostChain);
    }
    for (const v of message.redelegations) {
      RedelegationEntry.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRedelegate {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRedelegate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.hostChain = reader.string();
          break;
        case 3:
          message.redelegations.push(RedelegationEntry.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgRedelegate>): MsgRedelegate {
    const message = createBaseMsgRedelegate();
    message.creator = object.creator ?? "";
    message.hostChain = object.hostChain ?? "";
    message.redelegations = object.redelegations?.map(e => RedelegationEntry.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: MsgRedelegateAmino): MsgRedelegate {
    const message = createBaseMsgRedelegate();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.host_chain !== undefined && object.host_chain !== null) {
      message.hostChain = object.host_chain;
    }
    message.redelegations = object.redelegations?.map(e => RedelegationEntry.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: MsgRedelegate, useInterfaces: boolean = false): MsgRedelegateAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.host_chain = message.hostChain === "" ? undefined : message.hostChain;
    if (message.redelegations) {
      obj.redelegations = message.redelegations.map(e => e ? RedelegationEntry.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.redelegations = message.redelegations;
    }
    return obj;
  },
  fromAminoMsg(object: MsgRedelegateAminoMsg): MsgRedelegate {
    return MsgRedelegate.fromAmino(object.value);
  },
  toAminoMsg(message: MsgRedelegate, useInterfaces: boolean = false): MsgRedelegateAminoMsg {
    return {
      type: "pryzm/icstaking/v1/Redelegate",
      value: MsgRedelegate.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgRedelegateProtoMsg, useInterfaces: boolean = false): MsgRedelegate {
    return MsgRedelegate.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRedelegate): Uint8Array {
    return MsgRedelegate.encode(message).finish();
  },
  toProtoMsg(message: MsgRedelegate): MsgRedelegateProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.MsgRedelegate",
      value: MsgRedelegate.encode(message).finish()
    };
  }
};
function createBaseMsgRedelegateResponse(): MsgRedelegateResponse {
  return {};
}
export const MsgRedelegateResponse = {
  typeUrl: "/pryzm.icstaking.v1.MsgRedelegateResponse",
  encode(_: MsgRedelegateResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRedelegateResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRedelegateResponse();
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
  fromPartial(_: Partial<MsgRedelegateResponse>): MsgRedelegateResponse {
    const message = createBaseMsgRedelegateResponse();
    return message;
  },
  fromAmino(_: MsgRedelegateResponseAmino): MsgRedelegateResponse {
    const message = createBaseMsgRedelegateResponse();
    return message;
  },
  toAmino(_: MsgRedelegateResponse, useInterfaces: boolean = false): MsgRedelegateResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgRedelegateResponseAminoMsg): MsgRedelegateResponse {
    return MsgRedelegateResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRedelegateResponseProtoMsg, useInterfaces: boolean = false): MsgRedelegateResponse {
    return MsgRedelegateResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRedelegateResponse): Uint8Array {
    return MsgRedelegateResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgRedelegateResponse): MsgRedelegateResponseProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.MsgRedelegateResponse",
      value: MsgRedelegateResponse.encode(message).finish()
    };
  }
};
function createBaseMsgRegisterInterchainAccount(): MsgRegisterInterchainAccount {
  return {
    creator: "",
    hostChain: "",
    registrationType: 0
  };
}
export const MsgRegisterInterchainAccount = {
  typeUrl: "/pryzm.icstaking.v1.MsgRegisterInterchainAccount",
  encode(message: MsgRegisterInterchainAccount, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.hostChain !== "") {
      writer.uint32(18).string(message.hostChain);
    }
    if (message.registrationType !== 0) {
      writer.uint32(24).int32(message.registrationType);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRegisterInterchainAccount {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterInterchainAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.hostChain = reader.string();
          break;
        case 3:
          message.registrationType = (reader.int32() as any);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgRegisterInterchainAccount>): MsgRegisterInterchainAccount {
    const message = createBaseMsgRegisterInterchainAccount();
    message.creator = object.creator ?? "";
    message.hostChain = object.hostChain ?? "";
    message.registrationType = object.registrationType ?? 0;
    return message;
  },
  fromAmino(object: MsgRegisterInterchainAccountAmino): MsgRegisterInterchainAccount {
    const message = createBaseMsgRegisterInterchainAccount();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.host_chain !== undefined && object.host_chain !== null) {
      message.hostChain = object.host_chain;
    }
    if (object.registration_type !== undefined && object.registration_type !== null) {
      message.registrationType = object.registration_type;
    }
    return message;
  },
  toAmino(message: MsgRegisterInterchainAccount, useInterfaces: boolean = false): MsgRegisterInterchainAccountAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.host_chain = message.hostChain === "" ? undefined : message.hostChain;
    obj.registration_type = message.registrationType ?? 0;
    return obj;
  },
  fromAminoMsg(object: MsgRegisterInterchainAccountAminoMsg): MsgRegisterInterchainAccount {
    return MsgRegisterInterchainAccount.fromAmino(object.value);
  },
  toAminoMsg(message: MsgRegisterInterchainAccount, useInterfaces: boolean = false): MsgRegisterInterchainAccountAminoMsg {
    return {
      type: "pryzm/icstaking/v1/RegInterchainAccount",
      value: MsgRegisterInterchainAccount.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgRegisterInterchainAccountProtoMsg, useInterfaces: boolean = false): MsgRegisterInterchainAccount {
    return MsgRegisterInterchainAccount.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRegisterInterchainAccount): Uint8Array {
    return MsgRegisterInterchainAccount.encode(message).finish();
  },
  toProtoMsg(message: MsgRegisterInterchainAccount): MsgRegisterInterchainAccountProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.MsgRegisterInterchainAccount",
      value: MsgRegisterInterchainAccount.encode(message).finish()
    };
  }
};
function createBaseMsgRegisterInterchainAccountResponse(): MsgRegisterInterchainAccountResponse {
  return {};
}
export const MsgRegisterInterchainAccountResponse = {
  typeUrl: "/pryzm.icstaking.v1.MsgRegisterInterchainAccountResponse",
  encode(_: MsgRegisterInterchainAccountResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRegisterInterchainAccountResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterInterchainAccountResponse();
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
  fromPartial(_: Partial<MsgRegisterInterchainAccountResponse>): MsgRegisterInterchainAccountResponse {
    const message = createBaseMsgRegisterInterchainAccountResponse();
    return message;
  },
  fromAmino(_: MsgRegisterInterchainAccountResponseAmino): MsgRegisterInterchainAccountResponse {
    const message = createBaseMsgRegisterInterchainAccountResponse();
    return message;
  },
  toAmino(_: MsgRegisterInterchainAccountResponse, useInterfaces: boolean = false): MsgRegisterInterchainAccountResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgRegisterInterchainAccountResponseAminoMsg): MsgRegisterInterchainAccountResponse {
    return MsgRegisterInterchainAccountResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRegisterInterchainAccountResponseProtoMsg, useInterfaces: boolean = false): MsgRegisterInterchainAccountResponse {
    return MsgRegisterInterchainAccountResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRegisterInterchainAccountResponse): Uint8Array {
    return MsgRegisterInterchainAccountResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgRegisterInterchainAccountResponse): MsgRegisterInterchainAccountResponseProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.MsgRegisterInterchainAccountResponse",
      value: MsgRegisterInterchainAccountResponse.encode(message).finish()
    };
  }
};
function createBaseMsgCreateMultiSigConnection(): MsgCreateMultiSigConnection {
  return {
    creator: "",
    id: "",
    operator: ""
  };
}
export const MsgCreateMultiSigConnection = {
  typeUrl: "/pryzm.icstaking.v1.MsgCreateMultiSigConnection",
  encode(message: MsgCreateMultiSigConnection, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.operator !== "") {
      writer.uint32(26).string(message.operator);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgCreateMultiSigConnection {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateMultiSigConnection();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = reader.string();
          break;
        case 3:
          message.operator = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgCreateMultiSigConnection>): MsgCreateMultiSigConnection {
    const message = createBaseMsgCreateMultiSigConnection();
    message.creator = object.creator ?? "";
    message.id = object.id ?? "";
    message.operator = object.operator ?? "";
    return message;
  },
  fromAmino(object: MsgCreateMultiSigConnectionAmino): MsgCreateMultiSigConnection {
    const message = createBaseMsgCreateMultiSigConnection();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    }
    if (object.operator !== undefined && object.operator !== null) {
      message.operator = object.operator;
    }
    return message;
  },
  toAmino(message: MsgCreateMultiSigConnection, useInterfaces: boolean = false): MsgCreateMultiSigConnectionAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.id = message.id === "" ? undefined : message.id;
    obj.operator = message.operator === "" ? undefined : message.operator;
    return obj;
  },
  fromAminoMsg(object: MsgCreateMultiSigConnectionAminoMsg): MsgCreateMultiSigConnection {
    return MsgCreateMultiSigConnection.fromAmino(object.value);
  },
  toAminoMsg(message: MsgCreateMultiSigConnection, useInterfaces: boolean = false): MsgCreateMultiSigConnectionAminoMsg {
    return {
      type: "pryzm/icstaking/v1/CreateMultiSigConn",
      value: MsgCreateMultiSigConnection.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgCreateMultiSigConnectionProtoMsg, useInterfaces: boolean = false): MsgCreateMultiSigConnection {
    return MsgCreateMultiSigConnection.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgCreateMultiSigConnection): Uint8Array {
    return MsgCreateMultiSigConnection.encode(message).finish();
  },
  toProtoMsg(message: MsgCreateMultiSigConnection): MsgCreateMultiSigConnectionProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.MsgCreateMultiSigConnection",
      value: MsgCreateMultiSigConnection.encode(message).finish()
    };
  }
};
function createBaseMsgCreateMultiSigConnectionResponse(): MsgCreateMultiSigConnectionResponse {
  return {};
}
export const MsgCreateMultiSigConnectionResponse = {
  typeUrl: "/pryzm.icstaking.v1.MsgCreateMultiSigConnectionResponse",
  encode(_: MsgCreateMultiSigConnectionResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgCreateMultiSigConnectionResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateMultiSigConnectionResponse();
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
  fromPartial(_: Partial<MsgCreateMultiSigConnectionResponse>): MsgCreateMultiSigConnectionResponse {
    const message = createBaseMsgCreateMultiSigConnectionResponse();
    return message;
  },
  fromAmino(_: MsgCreateMultiSigConnectionResponseAmino): MsgCreateMultiSigConnectionResponse {
    const message = createBaseMsgCreateMultiSigConnectionResponse();
    return message;
  },
  toAmino(_: MsgCreateMultiSigConnectionResponse, useInterfaces: boolean = false): MsgCreateMultiSigConnectionResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgCreateMultiSigConnectionResponseAminoMsg): MsgCreateMultiSigConnectionResponse {
    return MsgCreateMultiSigConnectionResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgCreateMultiSigConnectionResponseProtoMsg, useInterfaces: boolean = false): MsgCreateMultiSigConnectionResponse {
    return MsgCreateMultiSigConnectionResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgCreateMultiSigConnectionResponse): Uint8Array {
    return MsgCreateMultiSigConnectionResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgCreateMultiSigConnectionResponse): MsgCreateMultiSigConnectionResponseProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.MsgCreateMultiSigConnectionResponse",
      value: MsgCreateMultiSigConnectionResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateMultiSigConnection(): MsgUpdateMultiSigConnection {
  return {
    creator: "",
    id: "",
    operator: ""
  };
}
export const MsgUpdateMultiSigConnection = {
  typeUrl: "/pryzm.icstaking.v1.MsgUpdateMultiSigConnection",
  encode(message: MsgUpdateMultiSigConnection, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.operator !== "") {
      writer.uint32(26).string(message.operator);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateMultiSigConnection {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateMultiSigConnection();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = reader.string();
          break;
        case 3:
          message.operator = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUpdateMultiSigConnection>): MsgUpdateMultiSigConnection {
    const message = createBaseMsgUpdateMultiSigConnection();
    message.creator = object.creator ?? "";
    message.id = object.id ?? "";
    message.operator = object.operator ?? "";
    return message;
  },
  fromAmino(object: MsgUpdateMultiSigConnectionAmino): MsgUpdateMultiSigConnection {
    const message = createBaseMsgUpdateMultiSigConnection();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    }
    if (object.operator !== undefined && object.operator !== null) {
      message.operator = object.operator;
    }
    return message;
  },
  toAmino(message: MsgUpdateMultiSigConnection, useInterfaces: boolean = false): MsgUpdateMultiSigConnectionAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.id = message.id === "" ? undefined : message.id;
    obj.operator = message.operator === "" ? undefined : message.operator;
    return obj;
  },
  fromAminoMsg(object: MsgUpdateMultiSigConnectionAminoMsg): MsgUpdateMultiSigConnection {
    return MsgUpdateMultiSigConnection.fromAmino(object.value);
  },
  toAminoMsg(message: MsgUpdateMultiSigConnection, useInterfaces: boolean = false): MsgUpdateMultiSigConnectionAminoMsg {
    return {
      type: "pryzm/icstaking/v1/UpdateMultiSigConn",
      value: MsgUpdateMultiSigConnection.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgUpdateMultiSigConnectionProtoMsg, useInterfaces: boolean = false): MsgUpdateMultiSigConnection {
    return MsgUpdateMultiSigConnection.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateMultiSigConnection): Uint8Array {
    return MsgUpdateMultiSigConnection.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateMultiSigConnection): MsgUpdateMultiSigConnectionProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.MsgUpdateMultiSigConnection",
      value: MsgUpdateMultiSigConnection.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateMultiSigConnectionResponse(): MsgUpdateMultiSigConnectionResponse {
  return {};
}
export const MsgUpdateMultiSigConnectionResponse = {
  typeUrl: "/pryzm.icstaking.v1.MsgUpdateMultiSigConnectionResponse",
  encode(_: MsgUpdateMultiSigConnectionResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgUpdateMultiSigConnectionResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateMultiSigConnectionResponse();
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
  fromPartial(_: Partial<MsgUpdateMultiSigConnectionResponse>): MsgUpdateMultiSigConnectionResponse {
    const message = createBaseMsgUpdateMultiSigConnectionResponse();
    return message;
  },
  fromAmino(_: MsgUpdateMultiSigConnectionResponseAmino): MsgUpdateMultiSigConnectionResponse {
    const message = createBaseMsgUpdateMultiSigConnectionResponse();
    return message;
  },
  toAmino(_: MsgUpdateMultiSigConnectionResponse, useInterfaces: boolean = false): MsgUpdateMultiSigConnectionResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateMultiSigConnectionResponseAminoMsg): MsgUpdateMultiSigConnectionResponse {
    return MsgUpdateMultiSigConnectionResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateMultiSigConnectionResponseProtoMsg, useInterfaces: boolean = false): MsgUpdateMultiSigConnectionResponse {
    return MsgUpdateMultiSigConnectionResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgUpdateMultiSigConnectionResponse): Uint8Array {
    return MsgUpdateMultiSigConnectionResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateMultiSigConnectionResponse): MsgUpdateMultiSigConnectionResponseProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.MsgUpdateMultiSigConnectionResponse",
      value: MsgUpdateMultiSigConnectionResponse.encode(message).finish()
    };
  }
};
function createBaseMsgAcknowledgeMultiSigPacket(): MsgAcknowledgeMultiSigPacket {
  return {
    creator: "",
    connectionId: "",
    sequence: BigInt(0),
    ack: Acknowledgement.fromPartial({}),
    height: Height.fromPartial({}),
    txHash: ""
  };
}
export const MsgAcknowledgeMultiSigPacket = {
  typeUrl: "/pryzm.icstaking.v1.MsgAcknowledgeMultiSigPacket",
  encode(message: MsgAcknowledgeMultiSigPacket, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.connectionId !== "") {
      writer.uint32(18).string(message.connectionId);
    }
    if (message.sequence !== BigInt(0)) {
      writer.uint32(24).uint64(message.sequence);
    }
    if (message.ack !== undefined) {
      Acknowledgement.encode(message.ack, writer.uint32(34).fork()).ldelim();
    }
    if (message.height !== undefined) {
      Height.encode(message.height, writer.uint32(42).fork()).ldelim();
    }
    if (message.txHash !== "") {
      writer.uint32(50).string(message.txHash);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgAcknowledgeMultiSigPacket {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAcknowledgeMultiSigPacket();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.connectionId = reader.string();
          break;
        case 3:
          message.sequence = reader.uint64();
          break;
        case 4:
          message.ack = Acknowledgement.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 5:
          message.height = Height.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 6:
          message.txHash = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgAcknowledgeMultiSigPacket>): MsgAcknowledgeMultiSigPacket {
    const message = createBaseMsgAcknowledgeMultiSigPacket();
    message.creator = object.creator ?? "";
    message.connectionId = object.connectionId ?? "";
    message.sequence = object.sequence !== undefined && object.sequence !== null ? BigInt(object.sequence.toString()) : BigInt(0);
    message.ack = object.ack !== undefined && object.ack !== null ? Acknowledgement.fromPartial(object.ack) : undefined;
    message.height = object.height !== undefined && object.height !== null ? Height.fromPartial(object.height) : undefined;
    message.txHash = object.txHash ?? "";
    return message;
  },
  fromAmino(object: MsgAcknowledgeMultiSigPacketAmino): MsgAcknowledgeMultiSigPacket {
    const message = createBaseMsgAcknowledgeMultiSigPacket();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.connection_id !== undefined && object.connection_id !== null) {
      message.connectionId = object.connection_id;
    }
    if (object.sequence !== undefined && object.sequence !== null) {
      message.sequence = BigInt(object.sequence);
    }
    if (object.ack !== undefined && object.ack !== null) {
      message.ack = Acknowledgement.fromAmino(object.ack);
    }
    if (object.height !== undefined && object.height !== null) {
      message.height = Height.fromAmino(object.height);
    }
    if (object.tx_hash !== undefined && object.tx_hash !== null) {
      message.txHash = object.tx_hash;
    }
    return message;
  },
  toAmino(message: MsgAcknowledgeMultiSigPacket, useInterfaces: boolean = false): MsgAcknowledgeMultiSigPacketAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.connection_id = message.connectionId === "" ? undefined : message.connectionId;
    obj.sequence = message.sequence !== BigInt(0) ? message.sequence.toString() : undefined;
    obj.ack = message.ack ? Acknowledgement.toAmino(message.ack, useInterfaces) : undefined;
    obj.height = message.height ? Height.toAmino(message.height, useInterfaces) : {};
    obj.tx_hash = message.txHash === "" ? undefined : message.txHash;
    return obj;
  },
  fromAminoMsg(object: MsgAcknowledgeMultiSigPacketAminoMsg): MsgAcknowledgeMultiSigPacket {
    return MsgAcknowledgeMultiSigPacket.fromAmino(object.value);
  },
  toAminoMsg(message: MsgAcknowledgeMultiSigPacket, useInterfaces: boolean = false): MsgAcknowledgeMultiSigPacketAminoMsg {
    return {
      type: "pryzm/icstaking/v1/AckMultiSigPacket",
      value: MsgAcknowledgeMultiSigPacket.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgAcknowledgeMultiSigPacketProtoMsg, useInterfaces: boolean = false): MsgAcknowledgeMultiSigPacket {
    return MsgAcknowledgeMultiSigPacket.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgAcknowledgeMultiSigPacket): Uint8Array {
    return MsgAcknowledgeMultiSigPacket.encode(message).finish();
  },
  toProtoMsg(message: MsgAcknowledgeMultiSigPacket): MsgAcknowledgeMultiSigPacketProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.MsgAcknowledgeMultiSigPacket",
      value: MsgAcknowledgeMultiSigPacket.encode(message).finish()
    };
  }
};
function createBaseMsgAcknowledgeMultiSigPacketResponse(): MsgAcknowledgeMultiSigPacketResponse {
  return {};
}
export const MsgAcknowledgeMultiSigPacketResponse = {
  typeUrl: "/pryzm.icstaking.v1.MsgAcknowledgeMultiSigPacketResponse",
  encode(_: MsgAcknowledgeMultiSigPacketResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgAcknowledgeMultiSigPacketResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAcknowledgeMultiSigPacketResponse();
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
  fromPartial(_: Partial<MsgAcknowledgeMultiSigPacketResponse>): MsgAcknowledgeMultiSigPacketResponse {
    const message = createBaseMsgAcknowledgeMultiSigPacketResponse();
    return message;
  },
  fromAmino(_: MsgAcknowledgeMultiSigPacketResponseAmino): MsgAcknowledgeMultiSigPacketResponse {
    const message = createBaseMsgAcknowledgeMultiSigPacketResponse();
    return message;
  },
  toAmino(_: MsgAcknowledgeMultiSigPacketResponse, useInterfaces: boolean = false): MsgAcknowledgeMultiSigPacketResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgAcknowledgeMultiSigPacketResponseAminoMsg): MsgAcknowledgeMultiSigPacketResponse {
    return MsgAcknowledgeMultiSigPacketResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgAcknowledgeMultiSigPacketResponseProtoMsg, useInterfaces: boolean = false): MsgAcknowledgeMultiSigPacketResponse {
    return MsgAcknowledgeMultiSigPacketResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgAcknowledgeMultiSigPacketResponse): Uint8Array {
    return MsgAcknowledgeMultiSigPacketResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgAcknowledgeMultiSigPacketResponse): MsgAcknowledgeMultiSigPacketResponseProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.MsgAcknowledgeMultiSigPacketResponse",
      value: MsgAcknowledgeMultiSigPacketResponse.encode(message).finish()
    };
  }
};
function createBaseMsgRegisterHostAccounts(): MsgRegisterHostAccounts {
  return {
    creator: "",
    hostChain: "",
    delegationAddress: "",
    rewardAddress: "",
    sweepAddress: ""
  };
}
export const MsgRegisterHostAccounts = {
  typeUrl: "/pryzm.icstaking.v1.MsgRegisterHostAccounts",
  encode(message: MsgRegisterHostAccounts, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.hostChain !== "") {
      writer.uint32(18).string(message.hostChain);
    }
    if (message.delegationAddress !== "") {
      writer.uint32(26).string(message.delegationAddress);
    }
    if (message.rewardAddress !== "") {
      writer.uint32(34).string(message.rewardAddress);
    }
    if (message.sweepAddress !== "") {
      writer.uint32(42).string(message.sweepAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRegisterHostAccounts {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterHostAccounts();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.hostChain = reader.string();
          break;
        case 3:
          message.delegationAddress = reader.string();
          break;
        case 4:
          message.rewardAddress = reader.string();
          break;
        case 5:
          message.sweepAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgRegisterHostAccounts>): MsgRegisterHostAccounts {
    const message = createBaseMsgRegisterHostAccounts();
    message.creator = object.creator ?? "";
    message.hostChain = object.hostChain ?? "";
    message.delegationAddress = object.delegationAddress ?? "";
    message.rewardAddress = object.rewardAddress ?? "";
    message.sweepAddress = object.sweepAddress ?? "";
    return message;
  },
  fromAmino(object: MsgRegisterHostAccountsAmino): MsgRegisterHostAccounts {
    const message = createBaseMsgRegisterHostAccounts();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.host_chain !== undefined && object.host_chain !== null) {
      message.hostChain = object.host_chain;
    }
    if (object.delegation_address !== undefined && object.delegation_address !== null) {
      message.delegationAddress = object.delegation_address;
    }
    if (object.reward_address !== undefined && object.reward_address !== null) {
      message.rewardAddress = object.reward_address;
    }
    if (object.sweep_address !== undefined && object.sweep_address !== null) {
      message.sweepAddress = object.sweep_address;
    }
    return message;
  },
  toAmino(message: MsgRegisterHostAccounts, useInterfaces: boolean = false): MsgRegisterHostAccountsAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.host_chain = message.hostChain === "" ? undefined : message.hostChain;
    obj.delegation_address = message.delegationAddress === "" ? undefined : message.delegationAddress;
    obj.reward_address = message.rewardAddress === "" ? undefined : message.rewardAddress;
    obj.sweep_address = message.sweepAddress === "" ? undefined : message.sweepAddress;
    return obj;
  },
  fromAminoMsg(object: MsgRegisterHostAccountsAminoMsg): MsgRegisterHostAccounts {
    return MsgRegisterHostAccounts.fromAmino(object.value);
  },
  toAminoMsg(message: MsgRegisterHostAccounts, useInterfaces: boolean = false): MsgRegisterHostAccountsAminoMsg {
    return {
      type: "pryzm/icstaking/v1/RegisterHostAccounts",
      value: MsgRegisterHostAccounts.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgRegisterHostAccountsProtoMsg, useInterfaces: boolean = false): MsgRegisterHostAccounts {
    return MsgRegisterHostAccounts.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRegisterHostAccounts): Uint8Array {
    return MsgRegisterHostAccounts.encode(message).finish();
  },
  toProtoMsg(message: MsgRegisterHostAccounts): MsgRegisterHostAccountsProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.MsgRegisterHostAccounts",
      value: MsgRegisterHostAccounts.encode(message).finish()
    };
  }
};
function createBaseMsgRegisterHostAccountsResponse(): MsgRegisterHostAccountsResponse {
  return {};
}
export const MsgRegisterHostAccountsResponse = {
  typeUrl: "/pryzm.icstaking.v1.MsgRegisterHostAccountsResponse",
  encode(_: MsgRegisterHostAccountsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRegisterHostAccountsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterHostAccountsResponse();
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
  fromPartial(_: Partial<MsgRegisterHostAccountsResponse>): MsgRegisterHostAccountsResponse {
    const message = createBaseMsgRegisterHostAccountsResponse();
    return message;
  },
  fromAmino(_: MsgRegisterHostAccountsResponseAmino): MsgRegisterHostAccountsResponse {
    const message = createBaseMsgRegisterHostAccountsResponse();
    return message;
  },
  toAmino(_: MsgRegisterHostAccountsResponse, useInterfaces: boolean = false): MsgRegisterHostAccountsResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgRegisterHostAccountsResponseAminoMsg): MsgRegisterHostAccountsResponse {
    return MsgRegisterHostAccountsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRegisterHostAccountsResponseProtoMsg, useInterfaces: boolean = false): MsgRegisterHostAccountsResponse {
    return MsgRegisterHostAccountsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRegisterHostAccountsResponse): Uint8Array {
    return MsgRegisterHostAccountsResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgRegisterHostAccountsResponse): MsgRegisterHostAccountsResponseProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.MsgRegisterHostAccountsResponse",
      value: MsgRegisterHostAccountsResponse.encode(message).finish()
    };
  }
};
function createBaseMsgRetryFailedLsmTransfer(): MsgRetryFailedLsmTransfer {
  return {
    creator: "",
    hostChain: "",
    lsmDenom: "",
    transferChannel: ""
  };
}
export const MsgRetryFailedLsmTransfer = {
  typeUrl: "/pryzm.icstaking.v1.MsgRetryFailedLsmTransfer",
  encode(message: MsgRetryFailedLsmTransfer, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.hostChain !== "") {
      writer.uint32(18).string(message.hostChain);
    }
    if (message.lsmDenom !== "") {
      writer.uint32(26).string(message.lsmDenom);
    }
    if (message.transferChannel !== "") {
      writer.uint32(34).string(message.transferChannel);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRetryFailedLsmTransfer {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRetryFailedLsmTransfer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.hostChain = reader.string();
          break;
        case 3:
          message.lsmDenom = reader.string();
          break;
        case 4:
          message.transferChannel = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgRetryFailedLsmTransfer>): MsgRetryFailedLsmTransfer {
    const message = createBaseMsgRetryFailedLsmTransfer();
    message.creator = object.creator ?? "";
    message.hostChain = object.hostChain ?? "";
    message.lsmDenom = object.lsmDenom ?? "";
    message.transferChannel = object.transferChannel ?? "";
    return message;
  },
  fromAmino(object: MsgRetryFailedLsmTransferAmino): MsgRetryFailedLsmTransfer {
    const message = createBaseMsgRetryFailedLsmTransfer();
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    }
    if (object.host_chain !== undefined && object.host_chain !== null) {
      message.hostChain = object.host_chain;
    }
    if (object.lsm_denom !== undefined && object.lsm_denom !== null) {
      message.lsmDenom = object.lsm_denom;
    }
    if (object.transfer_channel !== undefined && object.transfer_channel !== null) {
      message.transferChannel = object.transfer_channel;
    }
    return message;
  },
  toAmino(message: MsgRetryFailedLsmTransfer, useInterfaces: boolean = false): MsgRetryFailedLsmTransferAmino {
    const obj: any = {};
    obj.creator = message.creator === "" ? undefined : message.creator;
    obj.host_chain = message.hostChain === "" ? undefined : message.hostChain;
    obj.lsm_denom = message.lsmDenom === "" ? undefined : message.lsmDenom;
    obj.transfer_channel = message.transferChannel === "" ? undefined : message.transferChannel;
    return obj;
  },
  fromAminoMsg(object: MsgRetryFailedLsmTransferAminoMsg): MsgRetryFailedLsmTransfer {
    return MsgRetryFailedLsmTransfer.fromAmino(object.value);
  },
  toAminoMsg(message: MsgRetryFailedLsmTransfer, useInterfaces: boolean = false): MsgRetryFailedLsmTransferAminoMsg {
    return {
      type: "pryzm/icstaking/v1/RetryFailLsmTransfer",
      value: MsgRetryFailedLsmTransfer.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MsgRetryFailedLsmTransferProtoMsg, useInterfaces: boolean = false): MsgRetryFailedLsmTransfer {
    return MsgRetryFailedLsmTransfer.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRetryFailedLsmTransfer): Uint8Array {
    return MsgRetryFailedLsmTransfer.encode(message).finish();
  },
  toProtoMsg(message: MsgRetryFailedLsmTransfer): MsgRetryFailedLsmTransferProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.MsgRetryFailedLsmTransfer",
      value: MsgRetryFailedLsmTransfer.encode(message).finish()
    };
  }
};
function createBaseMsgRetryFailedLsmTransferResponse(): MsgRetryFailedLsmTransferResponse {
  return {};
}
export const MsgRetryFailedLsmTransferResponse = {
  typeUrl: "/pryzm.icstaking.v1.MsgRetryFailedLsmTransferResponse",
  encode(_: MsgRetryFailedLsmTransferResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MsgRetryFailedLsmTransferResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRetryFailedLsmTransferResponse();
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
  fromPartial(_: Partial<MsgRetryFailedLsmTransferResponse>): MsgRetryFailedLsmTransferResponse {
    const message = createBaseMsgRetryFailedLsmTransferResponse();
    return message;
  },
  fromAmino(_: MsgRetryFailedLsmTransferResponseAmino): MsgRetryFailedLsmTransferResponse {
    const message = createBaseMsgRetryFailedLsmTransferResponse();
    return message;
  },
  toAmino(_: MsgRetryFailedLsmTransferResponse, useInterfaces: boolean = false): MsgRetryFailedLsmTransferResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgRetryFailedLsmTransferResponseAminoMsg): MsgRetryFailedLsmTransferResponse {
    return MsgRetryFailedLsmTransferResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgRetryFailedLsmTransferResponseProtoMsg, useInterfaces: boolean = false): MsgRetryFailedLsmTransferResponse {
    return MsgRetryFailedLsmTransferResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MsgRetryFailedLsmTransferResponse): Uint8Array {
    return MsgRetryFailedLsmTransferResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgRetryFailedLsmTransferResponse): MsgRetryFailedLsmTransferResponseProtoMsg {
    return {
      typeUrl: "/pryzm.icstaking.v1.MsgRetryFailedLsmTransferResponse",
      value: MsgRetryFailedLsmTransferResponse.encode(message).finish()
    };
  }
};