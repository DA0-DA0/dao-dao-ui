//@ts-nocheck
import { PageRequest, PageRequestAmino, PageRequestSDKType, PageResponse, PageResponseAmino, PageResponseSDKType } from "../../cosmos/base/query/v1beta1/pagination";
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { SuperfluidAssetType, SuperfluidAsset, SuperfluidAssetAmino, SuperfluidAssetSDKType, OsmoEquivalentMultiplierRecord, OsmoEquivalentMultiplierRecordAmino, OsmoEquivalentMultiplierRecordSDKType, SuperfluidDelegationRecord, SuperfluidDelegationRecordAmino, SuperfluidDelegationRecordSDKType, ConcentratedPoolUserPositionRecord, ConcentratedPoolUserPositionRecordAmino, ConcentratedPoolUserPositionRecordSDKType, superfluidAssetTypeFromJSON } from "./superfluid";
import { Coin, CoinAmino, CoinSDKType } from "../../cosmos/base/v1beta1/coin";
import { SyntheticLock, SyntheticLockAmino, SyntheticLockSDKType } from "../lockup/lock";
import { DelegationResponse, DelegationResponseAmino, DelegationResponseSDKType } from "../../cosmos/staking/v1beta1/staking";
import { BinaryReader, BinaryWriter } from "../../binary";
export interface QueryParamsRequest {}
export interface QueryParamsRequestProtoMsg {
  typeUrl: "/osmosis.superfluid.QueryParamsRequest";
  value: Uint8Array;
}
export interface QueryParamsRequestAmino {}
export interface QueryParamsRequestAminoMsg {
  type: "osmosis/query-params-request";
  value: QueryParamsRequestAmino;
}
export interface QueryParamsRequestSDKType {}
export interface QueryParamsResponse {
  /** params defines the parameters of the module. */
  params: Params | undefined;
}
export interface QueryParamsResponseProtoMsg {
  typeUrl: "/osmosis.superfluid.QueryParamsResponse";
  value: Uint8Array;
}
export interface QueryParamsResponseAmino {
  /** params defines the parameters of the module. */
  params?: ParamsAmino | undefined;
}
export interface QueryParamsResponseAminoMsg {
  type: "osmosis/query-params-response";
  value: QueryParamsResponseAmino;
}
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType | undefined;
}
export interface AssetTypeRequest {
  denom: string;
}
export interface AssetTypeRequestProtoMsg {
  typeUrl: "/osmosis.superfluid.AssetTypeRequest";
  value: Uint8Array;
}
export interface AssetTypeRequestAmino {
  denom?: string;
}
export interface AssetTypeRequestAminoMsg {
  type: "osmosis/asset-type-request";
  value: AssetTypeRequestAmino;
}
export interface AssetTypeRequestSDKType {
  denom: string;
}
export interface AssetTypeResponse {
  assetType: SuperfluidAssetType;
}
export interface AssetTypeResponseProtoMsg {
  typeUrl: "/osmosis.superfluid.AssetTypeResponse";
  value: Uint8Array;
}
export interface AssetTypeResponseAmino {
  asset_type?: SuperfluidAssetType;
}
export interface AssetTypeResponseAminoMsg {
  type: "osmosis/asset-type-response";
  value: AssetTypeResponseAmino;
}
export interface AssetTypeResponseSDKType {
  asset_type: SuperfluidAssetType;
}
export interface AllAssetsRequest {}
export interface AllAssetsRequestProtoMsg {
  typeUrl: "/osmosis.superfluid.AllAssetsRequest";
  value: Uint8Array;
}
export interface AllAssetsRequestAmino {}
export interface AllAssetsRequestAminoMsg {
  type: "osmosis/all-assets-request";
  value: AllAssetsRequestAmino;
}
export interface AllAssetsRequestSDKType {}
export interface AllAssetsResponse {
  assets: SuperfluidAsset[];
}
export interface AllAssetsResponseProtoMsg {
  typeUrl: "/osmosis.superfluid.AllAssetsResponse";
  value: Uint8Array;
}
export interface AllAssetsResponseAmino {
  assets?: SuperfluidAssetAmino[];
}
export interface AllAssetsResponseAminoMsg {
  type: "osmosis/all-assets-response";
  value: AllAssetsResponseAmino;
}
export interface AllAssetsResponseSDKType {
  assets: SuperfluidAssetSDKType[];
}
export interface AssetMultiplierRequest {
  denom: string;
}
export interface AssetMultiplierRequestProtoMsg {
  typeUrl: "/osmosis.superfluid.AssetMultiplierRequest";
  value: Uint8Array;
}
export interface AssetMultiplierRequestAmino {
  denom?: string;
}
export interface AssetMultiplierRequestAminoMsg {
  type: "osmosis/asset-multiplier-request";
  value: AssetMultiplierRequestAmino;
}
export interface AssetMultiplierRequestSDKType {
  denom: string;
}
export interface AssetMultiplierResponse {
  osmoEquivalentMultiplier?: OsmoEquivalentMultiplierRecord | undefined;
}
export interface AssetMultiplierResponseProtoMsg {
  typeUrl: "/osmosis.superfluid.AssetMultiplierResponse";
  value: Uint8Array;
}
export interface AssetMultiplierResponseAmino {
  osmo_equivalent_multiplier?: OsmoEquivalentMultiplierRecordAmino | undefined;
}
export interface AssetMultiplierResponseAminoMsg {
  type: "osmosis/asset-multiplier-response";
  value: AssetMultiplierResponseAmino;
}
export interface AssetMultiplierResponseSDKType {
  osmo_equivalent_multiplier?: OsmoEquivalentMultiplierRecordSDKType | undefined;
}
export interface SuperfluidIntermediaryAccountInfo {
  denom: string;
  valAddr: string;
  gaugeId: bigint;
  address: string;
}
export interface SuperfluidIntermediaryAccountInfoProtoMsg {
  typeUrl: "/osmosis.superfluid.SuperfluidIntermediaryAccountInfo";
  value: Uint8Array;
}
export interface SuperfluidIntermediaryAccountInfoAmino {
  denom?: string;
  val_addr?: string;
  gauge_id?: string;
  address?: string;
}
export interface SuperfluidIntermediaryAccountInfoAminoMsg {
  type: "osmosis/superfluid-intermediary-account-info";
  value: SuperfluidIntermediaryAccountInfoAmino;
}
export interface SuperfluidIntermediaryAccountInfoSDKType {
  denom: string;
  val_addr: string;
  gauge_id: bigint;
  address: string;
}
export interface AllIntermediaryAccountsRequest {
  pagination?: PageRequest | undefined;
}
export interface AllIntermediaryAccountsRequestProtoMsg {
  typeUrl: "/osmosis.superfluid.AllIntermediaryAccountsRequest";
  value: Uint8Array;
}
export interface AllIntermediaryAccountsRequestAmino {
  pagination?: PageRequestAmino | undefined;
}
export interface AllIntermediaryAccountsRequestAminoMsg {
  type: "osmosis/all-intermediary-accounts-request";
  value: AllIntermediaryAccountsRequestAmino;
}
export interface AllIntermediaryAccountsRequestSDKType {
  pagination?: PageRequestSDKType | undefined;
}
export interface AllIntermediaryAccountsResponse {
  accounts: SuperfluidIntermediaryAccountInfo[];
  pagination?: PageResponse | undefined;
}
export interface AllIntermediaryAccountsResponseProtoMsg {
  typeUrl: "/osmosis.superfluid.AllIntermediaryAccountsResponse";
  value: Uint8Array;
}
export interface AllIntermediaryAccountsResponseAmino {
  accounts?: SuperfluidIntermediaryAccountInfoAmino[];
  pagination?: PageResponseAmino | undefined;
}
export interface AllIntermediaryAccountsResponseAminoMsg {
  type: "osmosis/all-intermediary-accounts-response";
  value: AllIntermediaryAccountsResponseAmino;
}
export interface AllIntermediaryAccountsResponseSDKType {
  accounts: SuperfluidIntermediaryAccountInfoSDKType[];
  pagination?: PageResponseSDKType | undefined;
}
export interface ConnectedIntermediaryAccountRequest {
  lockId: bigint;
}
export interface ConnectedIntermediaryAccountRequestProtoMsg {
  typeUrl: "/osmosis.superfluid.ConnectedIntermediaryAccountRequest";
  value: Uint8Array;
}
export interface ConnectedIntermediaryAccountRequestAmino {
  lock_id?: string;
}
export interface ConnectedIntermediaryAccountRequestAminoMsg {
  type: "osmosis/connected-intermediary-account-request";
  value: ConnectedIntermediaryAccountRequestAmino;
}
export interface ConnectedIntermediaryAccountRequestSDKType {
  lock_id: bigint;
}
export interface ConnectedIntermediaryAccountResponse {
  account?: SuperfluidIntermediaryAccountInfo | undefined;
}
export interface ConnectedIntermediaryAccountResponseProtoMsg {
  typeUrl: "/osmosis.superfluid.ConnectedIntermediaryAccountResponse";
  value: Uint8Array;
}
export interface ConnectedIntermediaryAccountResponseAmino {
  account?: SuperfluidIntermediaryAccountInfoAmino | undefined;
}
export interface ConnectedIntermediaryAccountResponseAminoMsg {
  type: "osmosis/connected-intermediary-account-response";
  value: ConnectedIntermediaryAccountResponseAmino;
}
export interface ConnectedIntermediaryAccountResponseSDKType {
  account?: SuperfluidIntermediaryAccountInfoSDKType | undefined;
}
export interface QueryTotalDelegationByValidatorForDenomRequest {
  denom: string;
}
export interface QueryTotalDelegationByValidatorForDenomRequestProtoMsg {
  typeUrl: "/osmosis.superfluid.QueryTotalDelegationByValidatorForDenomRequest";
  value: Uint8Array;
}
export interface QueryTotalDelegationByValidatorForDenomRequestAmino {
  denom?: string;
}
export interface QueryTotalDelegationByValidatorForDenomRequestAminoMsg {
  type: "osmosis/query-total-delegation-by-validator-for-denom-request";
  value: QueryTotalDelegationByValidatorForDenomRequestAmino;
}
export interface QueryTotalDelegationByValidatorForDenomRequestSDKType {
  denom: string;
}
export interface QueryTotalDelegationByValidatorForDenomResponse {
  assets: Delegations[];
}
export interface QueryTotalDelegationByValidatorForDenomResponseProtoMsg {
  typeUrl: "/osmosis.superfluid.QueryTotalDelegationByValidatorForDenomResponse";
  value: Uint8Array;
}
export interface QueryTotalDelegationByValidatorForDenomResponseAmino {
  assets?: DelegationsAmino[];
}
export interface QueryTotalDelegationByValidatorForDenomResponseAminoMsg {
  type: "osmosis/query-total-delegation-by-validator-for-denom-response";
  value: QueryTotalDelegationByValidatorForDenomResponseAmino;
}
export interface QueryTotalDelegationByValidatorForDenomResponseSDKType {
  assets: DelegationsSDKType[];
}
export interface Delegations {
  valAddr: string;
  amountSfsd: string;
  osmoEquivalent: string;
}
export interface DelegationsProtoMsg {
  typeUrl: "/osmosis.superfluid.Delegations";
  value: Uint8Array;
}
export interface DelegationsAmino {
  val_addr?: string;
  amount_sfsd?: string;
  osmo_equivalent?: string;
}
export interface DelegationsAminoMsg {
  type: "osmosis/delegations";
  value: DelegationsAmino;
}
export interface DelegationsSDKType {
  val_addr: string;
  amount_sfsd: string;
  osmo_equivalent: string;
}
export interface TotalSuperfluidDelegationsRequest {}
export interface TotalSuperfluidDelegationsRequestProtoMsg {
  typeUrl: "/osmosis.superfluid.TotalSuperfluidDelegationsRequest";
  value: Uint8Array;
}
export interface TotalSuperfluidDelegationsRequestAmino {}
export interface TotalSuperfluidDelegationsRequestAminoMsg {
  type: "osmosis/total-superfluid-delegations-request";
  value: TotalSuperfluidDelegationsRequestAmino;
}
export interface TotalSuperfluidDelegationsRequestSDKType {}
export interface TotalSuperfluidDelegationsResponse {
  totalDelegations: string;
}
export interface TotalSuperfluidDelegationsResponseProtoMsg {
  typeUrl: "/osmosis.superfluid.TotalSuperfluidDelegationsResponse";
  value: Uint8Array;
}
export interface TotalSuperfluidDelegationsResponseAmino {
  total_delegations?: string;
}
export interface TotalSuperfluidDelegationsResponseAminoMsg {
  type: "osmosis/total-superfluid-delegations-response";
  value: TotalSuperfluidDelegationsResponseAmino;
}
export interface TotalSuperfluidDelegationsResponseSDKType {
  total_delegations: string;
}
export interface SuperfluidDelegationAmountRequest {
  delegatorAddress: string;
  validatorAddress: string;
  denom: string;
}
export interface SuperfluidDelegationAmountRequestProtoMsg {
  typeUrl: "/osmosis.superfluid.SuperfluidDelegationAmountRequest";
  value: Uint8Array;
}
export interface SuperfluidDelegationAmountRequestAmino {
  delegator_address?: string;
  validator_address?: string;
  denom?: string;
}
export interface SuperfluidDelegationAmountRequestAminoMsg {
  type: "osmosis/superfluid-delegation-amount-request";
  value: SuperfluidDelegationAmountRequestAmino;
}
export interface SuperfluidDelegationAmountRequestSDKType {
  delegator_address: string;
  validator_address: string;
  denom: string;
}
export interface SuperfluidDelegationAmountResponse {
  amount: Coin[];
}
export interface SuperfluidDelegationAmountResponseProtoMsg {
  typeUrl: "/osmosis.superfluid.SuperfluidDelegationAmountResponse";
  value: Uint8Array;
}
export interface SuperfluidDelegationAmountResponseAmino {
  amount?: CoinAmino[];
}
export interface SuperfluidDelegationAmountResponseAminoMsg {
  type: "osmosis/superfluid-delegation-amount-response";
  value: SuperfluidDelegationAmountResponseAmino;
}
export interface SuperfluidDelegationAmountResponseSDKType {
  amount: CoinSDKType[];
}
export interface SuperfluidDelegationsByDelegatorRequest {
  delegatorAddress: string;
}
export interface SuperfluidDelegationsByDelegatorRequestProtoMsg {
  typeUrl: "/osmosis.superfluid.SuperfluidDelegationsByDelegatorRequest";
  value: Uint8Array;
}
export interface SuperfluidDelegationsByDelegatorRequestAmino {
  delegator_address?: string;
}
export interface SuperfluidDelegationsByDelegatorRequestAminoMsg {
  type: "osmosis/superfluid-delegations-by-delegator-request";
  value: SuperfluidDelegationsByDelegatorRequestAmino;
}
export interface SuperfluidDelegationsByDelegatorRequestSDKType {
  delegator_address: string;
}
export interface SuperfluidDelegationsByDelegatorResponse {
  superfluidDelegationRecords: SuperfluidDelegationRecord[];
  totalDelegatedCoins: Coin[];
  totalEquivalentStakedAmount: Coin | undefined;
}
export interface SuperfluidDelegationsByDelegatorResponseProtoMsg {
  typeUrl: "/osmosis.superfluid.SuperfluidDelegationsByDelegatorResponse";
  value: Uint8Array;
}
export interface SuperfluidDelegationsByDelegatorResponseAmino {
  superfluid_delegation_records?: SuperfluidDelegationRecordAmino[];
  total_delegated_coins?: CoinAmino[];
  total_equivalent_staked_amount?: CoinAmino | undefined;
}
export interface SuperfluidDelegationsByDelegatorResponseAminoMsg {
  type: "osmosis/superfluid-delegations-by-delegator-response";
  value: SuperfluidDelegationsByDelegatorResponseAmino;
}
export interface SuperfluidDelegationsByDelegatorResponseSDKType {
  superfluid_delegation_records: SuperfluidDelegationRecordSDKType[];
  total_delegated_coins: CoinSDKType[];
  total_equivalent_staked_amount: CoinSDKType | undefined;
}
export interface SuperfluidUndelegationsByDelegatorRequest {
  delegatorAddress: string;
  denom: string;
}
export interface SuperfluidUndelegationsByDelegatorRequestProtoMsg {
  typeUrl: "/osmosis.superfluid.SuperfluidUndelegationsByDelegatorRequest";
  value: Uint8Array;
}
export interface SuperfluidUndelegationsByDelegatorRequestAmino {
  delegator_address?: string;
  denom?: string;
}
export interface SuperfluidUndelegationsByDelegatorRequestAminoMsg {
  type: "osmosis/superfluid-undelegations-by-delegator-request";
  value: SuperfluidUndelegationsByDelegatorRequestAmino;
}
export interface SuperfluidUndelegationsByDelegatorRequestSDKType {
  delegator_address: string;
  denom: string;
}
export interface SuperfluidUndelegationsByDelegatorResponse {
  superfluidDelegationRecords: SuperfluidDelegationRecord[];
  totalUndelegatedCoins: Coin[];
  syntheticLocks: SyntheticLock[];
}
export interface SuperfluidUndelegationsByDelegatorResponseProtoMsg {
  typeUrl: "/osmosis.superfluid.SuperfluidUndelegationsByDelegatorResponse";
  value: Uint8Array;
}
export interface SuperfluidUndelegationsByDelegatorResponseAmino {
  superfluid_delegation_records?: SuperfluidDelegationRecordAmino[];
  total_undelegated_coins?: CoinAmino[];
  synthetic_locks?: SyntheticLockAmino[];
}
export interface SuperfluidUndelegationsByDelegatorResponseAminoMsg {
  type: "osmosis/superfluid-undelegations-by-delegator-response";
  value: SuperfluidUndelegationsByDelegatorResponseAmino;
}
export interface SuperfluidUndelegationsByDelegatorResponseSDKType {
  superfluid_delegation_records: SuperfluidDelegationRecordSDKType[];
  total_undelegated_coins: CoinSDKType[];
  synthetic_locks: SyntheticLockSDKType[];
}
export interface SuperfluidDelegationsByValidatorDenomRequest {
  validatorAddress: string;
  denom: string;
}
export interface SuperfluidDelegationsByValidatorDenomRequestProtoMsg {
  typeUrl: "/osmosis.superfluid.SuperfluidDelegationsByValidatorDenomRequest";
  value: Uint8Array;
}
export interface SuperfluidDelegationsByValidatorDenomRequestAmino {
  validator_address?: string;
  denom?: string;
}
export interface SuperfluidDelegationsByValidatorDenomRequestAminoMsg {
  type: "osmosis/superfluid-delegations-by-validator-denom-request";
  value: SuperfluidDelegationsByValidatorDenomRequestAmino;
}
export interface SuperfluidDelegationsByValidatorDenomRequestSDKType {
  validator_address: string;
  denom: string;
}
export interface SuperfluidDelegationsByValidatorDenomResponse {
  superfluidDelegationRecords: SuperfluidDelegationRecord[];
}
export interface SuperfluidDelegationsByValidatorDenomResponseProtoMsg {
  typeUrl: "/osmosis.superfluid.SuperfluidDelegationsByValidatorDenomResponse";
  value: Uint8Array;
}
export interface SuperfluidDelegationsByValidatorDenomResponseAmino {
  superfluid_delegation_records?: SuperfluidDelegationRecordAmino[];
}
export interface SuperfluidDelegationsByValidatorDenomResponseAminoMsg {
  type: "osmosis/superfluid-delegations-by-validator-denom-response";
  value: SuperfluidDelegationsByValidatorDenomResponseAmino;
}
export interface SuperfluidDelegationsByValidatorDenomResponseSDKType {
  superfluid_delegation_records: SuperfluidDelegationRecordSDKType[];
}
export interface EstimateSuperfluidDelegatedAmountByValidatorDenomRequest {
  validatorAddress: string;
  denom: string;
}
export interface EstimateSuperfluidDelegatedAmountByValidatorDenomRequestProtoMsg {
  typeUrl: "/osmosis.superfluid.EstimateSuperfluidDelegatedAmountByValidatorDenomRequest";
  value: Uint8Array;
}
export interface EstimateSuperfluidDelegatedAmountByValidatorDenomRequestAmino {
  validator_address?: string;
  denom?: string;
}
export interface EstimateSuperfluidDelegatedAmountByValidatorDenomRequestAminoMsg {
  type: "osmosis/estimate-superfluid-delegated-amount-by-validator-denom-request";
  value: EstimateSuperfluidDelegatedAmountByValidatorDenomRequestAmino;
}
export interface EstimateSuperfluidDelegatedAmountByValidatorDenomRequestSDKType {
  validator_address: string;
  denom: string;
}
export interface EstimateSuperfluidDelegatedAmountByValidatorDenomResponse {
  totalDelegatedCoins: Coin[];
}
export interface EstimateSuperfluidDelegatedAmountByValidatorDenomResponseProtoMsg {
  typeUrl: "/osmosis.superfluid.EstimateSuperfluidDelegatedAmountByValidatorDenomResponse";
  value: Uint8Array;
}
export interface EstimateSuperfluidDelegatedAmountByValidatorDenomResponseAmino {
  total_delegated_coins?: CoinAmino[];
}
export interface EstimateSuperfluidDelegatedAmountByValidatorDenomResponseAminoMsg {
  type: "osmosis/estimate-superfluid-delegated-amount-by-validator-denom-response";
  value: EstimateSuperfluidDelegatedAmountByValidatorDenomResponseAmino;
}
export interface EstimateSuperfluidDelegatedAmountByValidatorDenomResponseSDKType {
  total_delegated_coins: CoinSDKType[];
}
export interface QueryTotalDelegationByDelegatorRequest {
  delegatorAddress: string;
}
export interface QueryTotalDelegationByDelegatorRequestProtoMsg {
  typeUrl: "/osmosis.superfluid.QueryTotalDelegationByDelegatorRequest";
  value: Uint8Array;
}
export interface QueryTotalDelegationByDelegatorRequestAmino {
  delegator_address?: string;
}
export interface QueryTotalDelegationByDelegatorRequestAminoMsg {
  type: "osmosis/query-total-delegation-by-delegator-request";
  value: QueryTotalDelegationByDelegatorRequestAmino;
}
export interface QueryTotalDelegationByDelegatorRequestSDKType {
  delegator_address: string;
}
export interface QueryTotalDelegationByDelegatorResponse {
  superfluidDelegationRecords: SuperfluidDelegationRecord[];
  delegationResponse: DelegationResponse[];
  totalDelegatedCoins: Coin[];
  totalEquivalentStakedAmount: Coin | undefined;
}
export interface QueryTotalDelegationByDelegatorResponseProtoMsg {
  typeUrl: "/osmosis.superfluid.QueryTotalDelegationByDelegatorResponse";
  value: Uint8Array;
}
export interface QueryTotalDelegationByDelegatorResponseAmino {
  superfluid_delegation_records?: SuperfluidDelegationRecordAmino[];
  delegation_response?: DelegationResponseAmino[];
  total_delegated_coins?: CoinAmino[];
  total_equivalent_staked_amount?: CoinAmino | undefined;
}
export interface QueryTotalDelegationByDelegatorResponseAminoMsg {
  type: "osmosis/query-total-delegation-by-delegator-response";
  value: QueryTotalDelegationByDelegatorResponseAmino;
}
export interface QueryTotalDelegationByDelegatorResponseSDKType {
  superfluid_delegation_records: SuperfluidDelegationRecordSDKType[];
  delegation_response: DelegationResponseSDKType[];
  total_delegated_coins: CoinSDKType[];
  total_equivalent_staked_amount: CoinSDKType | undefined;
}
export interface QueryUnpoolWhitelistRequest {}
export interface QueryUnpoolWhitelistRequestProtoMsg {
  typeUrl: "/osmosis.superfluid.QueryUnpoolWhitelistRequest";
  value: Uint8Array;
}
export interface QueryUnpoolWhitelistRequestAmino {}
export interface QueryUnpoolWhitelistRequestAminoMsg {
  type: "osmosis/query-unpool-whitelist-request";
  value: QueryUnpoolWhitelistRequestAmino;
}
export interface QueryUnpoolWhitelistRequestSDKType {}
export interface QueryUnpoolWhitelistResponse {
  poolIds: bigint[];
}
export interface QueryUnpoolWhitelistResponseProtoMsg {
  typeUrl: "/osmosis.superfluid.QueryUnpoolWhitelistResponse";
  value: Uint8Array;
}
export interface QueryUnpoolWhitelistResponseAmino {
  pool_ids?: string[];
}
export interface QueryUnpoolWhitelistResponseAminoMsg {
  type: "osmosis/query-unpool-whitelist-response";
  value: QueryUnpoolWhitelistResponseAmino;
}
export interface QueryUnpoolWhitelistResponseSDKType {
  pool_ids: bigint[];
}
export interface UserConcentratedSuperfluidPositionsDelegatedRequest {
  delegatorAddress: string;
}
export interface UserConcentratedSuperfluidPositionsDelegatedRequestProtoMsg {
  typeUrl: "/osmosis.superfluid.UserConcentratedSuperfluidPositionsDelegatedRequest";
  value: Uint8Array;
}
export interface UserConcentratedSuperfluidPositionsDelegatedRequestAmino {
  delegator_address?: string;
}
export interface UserConcentratedSuperfluidPositionsDelegatedRequestAminoMsg {
  type: "osmosis/user-concentrated-superfluid-positions-delegated-request";
  value: UserConcentratedSuperfluidPositionsDelegatedRequestAmino;
}
export interface UserConcentratedSuperfluidPositionsDelegatedRequestSDKType {
  delegator_address: string;
}
export interface UserConcentratedSuperfluidPositionsDelegatedResponse {
  clPoolUserPositionRecords: ConcentratedPoolUserPositionRecord[];
}
export interface UserConcentratedSuperfluidPositionsDelegatedResponseProtoMsg {
  typeUrl: "/osmosis.superfluid.UserConcentratedSuperfluidPositionsDelegatedResponse";
  value: Uint8Array;
}
export interface UserConcentratedSuperfluidPositionsDelegatedResponseAmino {
  cl_pool_user_position_records?: ConcentratedPoolUserPositionRecordAmino[];
}
export interface UserConcentratedSuperfluidPositionsDelegatedResponseAminoMsg {
  type: "osmosis/user-concentrated-superfluid-positions-delegated-response";
  value: UserConcentratedSuperfluidPositionsDelegatedResponseAmino;
}
export interface UserConcentratedSuperfluidPositionsDelegatedResponseSDKType {
  cl_pool_user_position_records: ConcentratedPoolUserPositionRecordSDKType[];
}
export interface UserConcentratedSuperfluidPositionsUndelegatingRequest {
  delegatorAddress: string;
}
export interface UserConcentratedSuperfluidPositionsUndelegatingRequestProtoMsg {
  typeUrl: "/osmosis.superfluid.UserConcentratedSuperfluidPositionsUndelegatingRequest";
  value: Uint8Array;
}
export interface UserConcentratedSuperfluidPositionsUndelegatingRequestAmino {
  delegator_address?: string;
}
export interface UserConcentratedSuperfluidPositionsUndelegatingRequestAminoMsg {
  type: "osmosis/user-concentrated-superfluid-positions-undelegating-request";
  value: UserConcentratedSuperfluidPositionsUndelegatingRequestAmino;
}
export interface UserConcentratedSuperfluidPositionsUndelegatingRequestSDKType {
  delegator_address: string;
}
export interface UserConcentratedSuperfluidPositionsUndelegatingResponse {
  clPoolUserPositionRecords: ConcentratedPoolUserPositionRecord[];
}
export interface UserConcentratedSuperfluidPositionsUndelegatingResponseProtoMsg {
  typeUrl: "/osmosis.superfluid.UserConcentratedSuperfluidPositionsUndelegatingResponse";
  value: Uint8Array;
}
export interface UserConcentratedSuperfluidPositionsUndelegatingResponseAmino {
  cl_pool_user_position_records?: ConcentratedPoolUserPositionRecordAmino[];
}
export interface UserConcentratedSuperfluidPositionsUndelegatingResponseAminoMsg {
  type: "osmosis/user-concentrated-superfluid-positions-undelegating-response";
  value: UserConcentratedSuperfluidPositionsUndelegatingResponseAmino;
}
export interface UserConcentratedSuperfluidPositionsUndelegatingResponseSDKType {
  cl_pool_user_position_records: ConcentratedPoolUserPositionRecordSDKType[];
}
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/osmosis.superfluid.QueryParamsRequest",
  encode(_: QueryParamsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryParamsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
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
  fromPartial(_: Partial<QueryParamsRequest>): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
  fromAmino(_: QueryParamsRequestAmino): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
  toAmino(_: QueryParamsRequest, useInterfaces: boolean = false): QueryParamsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryParamsRequestAminoMsg): QueryParamsRequest {
    return QueryParamsRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryParamsRequest, useInterfaces: boolean = false): QueryParamsRequestAminoMsg {
    return {
      type: "osmosis/query-params-request",
      value: QueryParamsRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryParamsRequestProtoMsg, useInterfaces: boolean = false): QueryParamsRequest {
    return QueryParamsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryParamsRequest): Uint8Array {
    return QueryParamsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryParamsRequest): QueryParamsRequestProtoMsg {
    return {
      typeUrl: "/osmosis.superfluid.QueryParamsRequest",
      value: QueryParamsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryParamsResponse(): QueryParamsResponse {
  return {
    params: Params.fromPartial({})
  };
}
export const QueryParamsResponse = {
  typeUrl: "/osmosis.superfluid.QueryParamsResponse",
  encode(message: QueryParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryParamsResponse>): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: QueryParamsResponseAmino): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: QueryParamsResponse, useInterfaces: boolean = false): QueryParamsResponseAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryParamsResponseAminoMsg): QueryParamsResponse {
    return QueryParamsResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryParamsResponse, useInterfaces: boolean = false): QueryParamsResponseAminoMsg {
    return {
      type: "osmosis/query-params-response",
      value: QueryParamsResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryParamsResponseProtoMsg, useInterfaces: boolean = false): QueryParamsResponse {
    return QueryParamsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryParamsResponse): Uint8Array {
    return QueryParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryParamsResponse): QueryParamsResponseProtoMsg {
    return {
      typeUrl: "/osmosis.superfluid.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};
function createBaseAssetTypeRequest(): AssetTypeRequest {
  return {
    denom: ""
  };
}
export const AssetTypeRequest = {
  typeUrl: "/osmosis.superfluid.AssetTypeRequest",
  encode(message: AssetTypeRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): AssetTypeRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAssetTypeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<AssetTypeRequest>): AssetTypeRequest {
    const message = createBaseAssetTypeRequest();
    message.denom = object.denom ?? "";
    return message;
  },
  fromAmino(object: AssetTypeRequestAmino): AssetTypeRequest {
    const message = createBaseAssetTypeRequest();
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    return message;
  },
  toAmino(message: AssetTypeRequest, useInterfaces: boolean = false): AssetTypeRequestAmino {
    const obj: any = {};
    obj.denom = message.denom;
    return obj;
  },
  fromAminoMsg(object: AssetTypeRequestAminoMsg): AssetTypeRequest {
    return AssetTypeRequest.fromAmino(object.value);
  },
  toAminoMsg(message: AssetTypeRequest, useInterfaces: boolean = false): AssetTypeRequestAminoMsg {
    return {
      type: "osmosis/asset-type-request",
      value: AssetTypeRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: AssetTypeRequestProtoMsg, useInterfaces: boolean = false): AssetTypeRequest {
    return AssetTypeRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: AssetTypeRequest): Uint8Array {
    return AssetTypeRequest.encode(message).finish();
  },
  toProtoMsg(message: AssetTypeRequest): AssetTypeRequestProtoMsg {
    return {
      typeUrl: "/osmosis.superfluid.AssetTypeRequest",
      value: AssetTypeRequest.encode(message).finish()
    };
  }
};
function createBaseAssetTypeResponse(): AssetTypeResponse {
  return {
    assetType: 0
  };
}
export const AssetTypeResponse = {
  typeUrl: "/osmosis.superfluid.AssetTypeResponse",
  encode(message: AssetTypeResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.assetType !== 0) {
      writer.uint32(8).int32(message.assetType);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): AssetTypeResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAssetTypeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.assetType = (reader.int32() as any);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<AssetTypeResponse>): AssetTypeResponse {
    const message = createBaseAssetTypeResponse();
    message.assetType = object.assetType ?? 0;
    return message;
  },
  fromAmino(object: AssetTypeResponseAmino): AssetTypeResponse {
    const message = createBaseAssetTypeResponse();
    if (object.asset_type !== undefined && object.asset_type !== null) {
      message.assetType = superfluidAssetTypeFromJSON(object.asset_type);
    }
    return message;
  },
  toAmino(message: AssetTypeResponse, useInterfaces: boolean = false): AssetTypeResponseAmino {
    const obj: any = {};
    obj.asset_type = message.assetType;
    return obj;
  },
  fromAminoMsg(object: AssetTypeResponseAminoMsg): AssetTypeResponse {
    return AssetTypeResponse.fromAmino(object.value);
  },
  toAminoMsg(message: AssetTypeResponse, useInterfaces: boolean = false): AssetTypeResponseAminoMsg {
    return {
      type: "osmosis/asset-type-response",
      value: AssetTypeResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: AssetTypeResponseProtoMsg, useInterfaces: boolean = false): AssetTypeResponse {
    return AssetTypeResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: AssetTypeResponse): Uint8Array {
    return AssetTypeResponse.encode(message).finish();
  },
  toProtoMsg(message: AssetTypeResponse): AssetTypeResponseProtoMsg {
    return {
      typeUrl: "/osmosis.superfluid.AssetTypeResponse",
      value: AssetTypeResponse.encode(message).finish()
    };
  }
};
function createBaseAllAssetsRequest(): AllAssetsRequest {
  return {};
}
export const AllAssetsRequest = {
  typeUrl: "/osmosis.superfluid.AllAssetsRequest",
  encode(_: AllAssetsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): AllAssetsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAllAssetsRequest();
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
  fromPartial(_: Partial<AllAssetsRequest>): AllAssetsRequest {
    const message = createBaseAllAssetsRequest();
    return message;
  },
  fromAmino(_: AllAssetsRequestAmino): AllAssetsRequest {
    const message = createBaseAllAssetsRequest();
    return message;
  },
  toAmino(_: AllAssetsRequest, useInterfaces: boolean = false): AllAssetsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: AllAssetsRequestAminoMsg): AllAssetsRequest {
    return AllAssetsRequest.fromAmino(object.value);
  },
  toAminoMsg(message: AllAssetsRequest, useInterfaces: boolean = false): AllAssetsRequestAminoMsg {
    return {
      type: "osmosis/all-assets-request",
      value: AllAssetsRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: AllAssetsRequestProtoMsg, useInterfaces: boolean = false): AllAssetsRequest {
    return AllAssetsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: AllAssetsRequest): Uint8Array {
    return AllAssetsRequest.encode(message).finish();
  },
  toProtoMsg(message: AllAssetsRequest): AllAssetsRequestProtoMsg {
    return {
      typeUrl: "/osmosis.superfluid.AllAssetsRequest",
      value: AllAssetsRequest.encode(message).finish()
    };
  }
};
function createBaseAllAssetsResponse(): AllAssetsResponse {
  return {
    assets: []
  };
}
export const AllAssetsResponse = {
  typeUrl: "/osmosis.superfluid.AllAssetsResponse",
  encode(message: AllAssetsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.assets) {
      SuperfluidAsset.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): AllAssetsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAllAssetsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.assets.push(SuperfluidAsset.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<AllAssetsResponse>): AllAssetsResponse {
    const message = createBaseAllAssetsResponse();
    message.assets = object.assets?.map(e => SuperfluidAsset.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: AllAssetsResponseAmino): AllAssetsResponse {
    const message = createBaseAllAssetsResponse();
    message.assets = object.assets?.map(e => SuperfluidAsset.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: AllAssetsResponse, useInterfaces: boolean = false): AllAssetsResponseAmino {
    const obj: any = {};
    if (message.assets) {
      obj.assets = message.assets.map(e => e ? SuperfluidAsset.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.assets = [];
    }
    return obj;
  },
  fromAminoMsg(object: AllAssetsResponseAminoMsg): AllAssetsResponse {
    return AllAssetsResponse.fromAmino(object.value);
  },
  toAminoMsg(message: AllAssetsResponse, useInterfaces: boolean = false): AllAssetsResponseAminoMsg {
    return {
      type: "osmosis/all-assets-response",
      value: AllAssetsResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: AllAssetsResponseProtoMsg, useInterfaces: boolean = false): AllAssetsResponse {
    return AllAssetsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: AllAssetsResponse): Uint8Array {
    return AllAssetsResponse.encode(message).finish();
  },
  toProtoMsg(message: AllAssetsResponse): AllAssetsResponseProtoMsg {
    return {
      typeUrl: "/osmosis.superfluid.AllAssetsResponse",
      value: AllAssetsResponse.encode(message).finish()
    };
  }
};
function createBaseAssetMultiplierRequest(): AssetMultiplierRequest {
  return {
    denom: ""
  };
}
export const AssetMultiplierRequest = {
  typeUrl: "/osmosis.superfluid.AssetMultiplierRequest",
  encode(message: AssetMultiplierRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): AssetMultiplierRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAssetMultiplierRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<AssetMultiplierRequest>): AssetMultiplierRequest {
    const message = createBaseAssetMultiplierRequest();
    message.denom = object.denom ?? "";
    return message;
  },
  fromAmino(object: AssetMultiplierRequestAmino): AssetMultiplierRequest {
    const message = createBaseAssetMultiplierRequest();
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    return message;
  },
  toAmino(message: AssetMultiplierRequest, useInterfaces: boolean = false): AssetMultiplierRequestAmino {
    const obj: any = {};
    obj.denom = message.denom;
    return obj;
  },
  fromAminoMsg(object: AssetMultiplierRequestAminoMsg): AssetMultiplierRequest {
    return AssetMultiplierRequest.fromAmino(object.value);
  },
  toAminoMsg(message: AssetMultiplierRequest, useInterfaces: boolean = false): AssetMultiplierRequestAminoMsg {
    return {
      type: "osmosis/asset-multiplier-request",
      value: AssetMultiplierRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: AssetMultiplierRequestProtoMsg, useInterfaces: boolean = false): AssetMultiplierRequest {
    return AssetMultiplierRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: AssetMultiplierRequest): Uint8Array {
    return AssetMultiplierRequest.encode(message).finish();
  },
  toProtoMsg(message: AssetMultiplierRequest): AssetMultiplierRequestProtoMsg {
    return {
      typeUrl: "/osmosis.superfluid.AssetMultiplierRequest",
      value: AssetMultiplierRequest.encode(message).finish()
    };
  }
};
function createBaseAssetMultiplierResponse(): AssetMultiplierResponse {
  return {
    osmoEquivalentMultiplier: undefined
  };
}
export const AssetMultiplierResponse = {
  typeUrl: "/osmosis.superfluid.AssetMultiplierResponse",
  encode(message: AssetMultiplierResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.osmoEquivalentMultiplier !== undefined) {
      OsmoEquivalentMultiplierRecord.encode(message.osmoEquivalentMultiplier, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): AssetMultiplierResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAssetMultiplierResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.osmoEquivalentMultiplier = OsmoEquivalentMultiplierRecord.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<AssetMultiplierResponse>): AssetMultiplierResponse {
    const message = createBaseAssetMultiplierResponse();
    message.osmoEquivalentMultiplier = object.osmoEquivalentMultiplier !== undefined && object.osmoEquivalentMultiplier !== null ? OsmoEquivalentMultiplierRecord.fromPartial(object.osmoEquivalentMultiplier) : undefined;
    return message;
  },
  fromAmino(object: AssetMultiplierResponseAmino): AssetMultiplierResponse {
    const message = createBaseAssetMultiplierResponse();
    if (object.osmo_equivalent_multiplier !== undefined && object.osmo_equivalent_multiplier !== null) {
      message.osmoEquivalentMultiplier = OsmoEquivalentMultiplierRecord.fromAmino(object.osmo_equivalent_multiplier);
    }
    return message;
  },
  toAmino(message: AssetMultiplierResponse, useInterfaces: boolean = false): AssetMultiplierResponseAmino {
    const obj: any = {};
    obj.osmo_equivalent_multiplier = message.osmoEquivalentMultiplier ? OsmoEquivalentMultiplierRecord.toAmino(message.osmoEquivalentMultiplier, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: AssetMultiplierResponseAminoMsg): AssetMultiplierResponse {
    return AssetMultiplierResponse.fromAmino(object.value);
  },
  toAminoMsg(message: AssetMultiplierResponse, useInterfaces: boolean = false): AssetMultiplierResponseAminoMsg {
    return {
      type: "osmosis/asset-multiplier-response",
      value: AssetMultiplierResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: AssetMultiplierResponseProtoMsg, useInterfaces: boolean = false): AssetMultiplierResponse {
    return AssetMultiplierResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: AssetMultiplierResponse): Uint8Array {
    return AssetMultiplierResponse.encode(message).finish();
  },
  toProtoMsg(message: AssetMultiplierResponse): AssetMultiplierResponseProtoMsg {
    return {
      typeUrl: "/osmosis.superfluid.AssetMultiplierResponse",
      value: AssetMultiplierResponse.encode(message).finish()
    };
  }
};
function createBaseSuperfluidIntermediaryAccountInfo(): SuperfluidIntermediaryAccountInfo {
  return {
    denom: "",
    valAddr: "",
    gaugeId: BigInt(0),
    address: ""
  };
}
export const SuperfluidIntermediaryAccountInfo = {
  typeUrl: "/osmosis.superfluid.SuperfluidIntermediaryAccountInfo",
  encode(message: SuperfluidIntermediaryAccountInfo, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.valAddr !== "") {
      writer.uint32(18).string(message.valAddr);
    }
    if (message.gaugeId !== BigInt(0)) {
      writer.uint32(24).uint64(message.gaugeId);
    }
    if (message.address !== "") {
      writer.uint32(34).string(message.address);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): SuperfluidIntermediaryAccountInfo {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSuperfluidIntermediaryAccountInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.valAddr = reader.string();
          break;
        case 3:
          message.gaugeId = reader.uint64();
          break;
        case 4:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<SuperfluidIntermediaryAccountInfo>): SuperfluidIntermediaryAccountInfo {
    const message = createBaseSuperfluidIntermediaryAccountInfo();
    message.denom = object.denom ?? "";
    message.valAddr = object.valAddr ?? "";
    message.gaugeId = object.gaugeId !== undefined && object.gaugeId !== null ? BigInt(object.gaugeId.toString()) : BigInt(0);
    message.address = object.address ?? "";
    return message;
  },
  fromAmino(object: SuperfluidIntermediaryAccountInfoAmino): SuperfluidIntermediaryAccountInfo {
    const message = createBaseSuperfluidIntermediaryAccountInfo();
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    if (object.val_addr !== undefined && object.val_addr !== null) {
      message.valAddr = object.val_addr;
    }
    if (object.gauge_id !== undefined && object.gauge_id !== null) {
      message.gaugeId = BigInt(object.gauge_id);
    }
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    }
    return message;
  },
  toAmino(message: SuperfluidIntermediaryAccountInfo, useInterfaces: boolean = false): SuperfluidIntermediaryAccountInfoAmino {
    const obj: any = {};
    obj.denom = message.denom;
    obj.val_addr = message.valAddr;
    obj.gauge_id = message.gaugeId ? message.gaugeId.toString() : undefined;
    obj.address = message.address;
    return obj;
  },
  fromAminoMsg(object: SuperfluidIntermediaryAccountInfoAminoMsg): SuperfluidIntermediaryAccountInfo {
    return SuperfluidIntermediaryAccountInfo.fromAmino(object.value);
  },
  toAminoMsg(message: SuperfluidIntermediaryAccountInfo, useInterfaces: boolean = false): SuperfluidIntermediaryAccountInfoAminoMsg {
    return {
      type: "osmosis/superfluid-intermediary-account-info",
      value: SuperfluidIntermediaryAccountInfo.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: SuperfluidIntermediaryAccountInfoProtoMsg, useInterfaces: boolean = false): SuperfluidIntermediaryAccountInfo {
    return SuperfluidIntermediaryAccountInfo.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: SuperfluidIntermediaryAccountInfo): Uint8Array {
    return SuperfluidIntermediaryAccountInfo.encode(message).finish();
  },
  toProtoMsg(message: SuperfluidIntermediaryAccountInfo): SuperfluidIntermediaryAccountInfoProtoMsg {
    return {
      typeUrl: "/osmosis.superfluid.SuperfluidIntermediaryAccountInfo",
      value: SuperfluidIntermediaryAccountInfo.encode(message).finish()
    };
  }
};
function createBaseAllIntermediaryAccountsRequest(): AllIntermediaryAccountsRequest {
  return {
    pagination: undefined
  };
}
export const AllIntermediaryAccountsRequest = {
  typeUrl: "/osmosis.superfluid.AllIntermediaryAccountsRequest",
  encode(message: AllIntermediaryAccountsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): AllIntermediaryAccountsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAllIntermediaryAccountsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<AllIntermediaryAccountsRequest>): AllIntermediaryAccountsRequest {
    const message = createBaseAllIntermediaryAccountsRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: AllIntermediaryAccountsRequestAmino): AllIntermediaryAccountsRequest {
    const message = createBaseAllIntermediaryAccountsRequest();
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: AllIntermediaryAccountsRequest, useInterfaces: boolean = false): AllIntermediaryAccountsRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: AllIntermediaryAccountsRequestAminoMsg): AllIntermediaryAccountsRequest {
    return AllIntermediaryAccountsRequest.fromAmino(object.value);
  },
  toAminoMsg(message: AllIntermediaryAccountsRequest, useInterfaces: boolean = false): AllIntermediaryAccountsRequestAminoMsg {
    return {
      type: "osmosis/all-intermediary-accounts-request",
      value: AllIntermediaryAccountsRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: AllIntermediaryAccountsRequestProtoMsg, useInterfaces: boolean = false): AllIntermediaryAccountsRequest {
    return AllIntermediaryAccountsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: AllIntermediaryAccountsRequest): Uint8Array {
    return AllIntermediaryAccountsRequest.encode(message).finish();
  },
  toProtoMsg(message: AllIntermediaryAccountsRequest): AllIntermediaryAccountsRequestProtoMsg {
    return {
      typeUrl: "/osmosis.superfluid.AllIntermediaryAccountsRequest",
      value: AllIntermediaryAccountsRequest.encode(message).finish()
    };
  }
};
function createBaseAllIntermediaryAccountsResponse(): AllIntermediaryAccountsResponse {
  return {
    accounts: [],
    pagination: undefined
  };
}
export const AllIntermediaryAccountsResponse = {
  typeUrl: "/osmosis.superfluid.AllIntermediaryAccountsResponse",
  encode(message: AllIntermediaryAccountsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.accounts) {
      SuperfluidIntermediaryAccountInfo.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): AllIntermediaryAccountsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAllIntermediaryAccountsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.accounts.push(SuperfluidIntermediaryAccountInfo.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<AllIntermediaryAccountsResponse>): AllIntermediaryAccountsResponse {
    const message = createBaseAllIntermediaryAccountsResponse();
    message.accounts = object.accounts?.map(e => SuperfluidIntermediaryAccountInfo.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: AllIntermediaryAccountsResponseAmino): AllIntermediaryAccountsResponse {
    const message = createBaseAllIntermediaryAccountsResponse();
    message.accounts = object.accounts?.map(e => SuperfluidIntermediaryAccountInfo.fromAmino(e)) || [];
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromAmino(object.pagination);
    }
    return message;
  },
  toAmino(message: AllIntermediaryAccountsResponse, useInterfaces: boolean = false): AllIntermediaryAccountsResponseAmino {
    const obj: any = {};
    if (message.accounts) {
      obj.accounts = message.accounts.map(e => e ? SuperfluidIntermediaryAccountInfo.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.accounts = [];
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: AllIntermediaryAccountsResponseAminoMsg): AllIntermediaryAccountsResponse {
    return AllIntermediaryAccountsResponse.fromAmino(object.value);
  },
  toAminoMsg(message: AllIntermediaryAccountsResponse, useInterfaces: boolean = false): AllIntermediaryAccountsResponseAminoMsg {
    return {
      type: "osmosis/all-intermediary-accounts-response",
      value: AllIntermediaryAccountsResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: AllIntermediaryAccountsResponseProtoMsg, useInterfaces: boolean = false): AllIntermediaryAccountsResponse {
    return AllIntermediaryAccountsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: AllIntermediaryAccountsResponse): Uint8Array {
    return AllIntermediaryAccountsResponse.encode(message).finish();
  },
  toProtoMsg(message: AllIntermediaryAccountsResponse): AllIntermediaryAccountsResponseProtoMsg {
    return {
      typeUrl: "/osmosis.superfluid.AllIntermediaryAccountsResponse",
      value: AllIntermediaryAccountsResponse.encode(message).finish()
    };
  }
};
function createBaseConnectedIntermediaryAccountRequest(): ConnectedIntermediaryAccountRequest {
  return {
    lockId: BigInt(0)
  };
}
export const ConnectedIntermediaryAccountRequest = {
  typeUrl: "/osmosis.superfluid.ConnectedIntermediaryAccountRequest",
  encode(message: ConnectedIntermediaryAccountRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.lockId !== BigInt(0)) {
      writer.uint32(8).uint64(message.lockId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ConnectedIntermediaryAccountRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConnectedIntermediaryAccountRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.lockId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ConnectedIntermediaryAccountRequest>): ConnectedIntermediaryAccountRequest {
    const message = createBaseConnectedIntermediaryAccountRequest();
    message.lockId = object.lockId !== undefined && object.lockId !== null ? BigInt(object.lockId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: ConnectedIntermediaryAccountRequestAmino): ConnectedIntermediaryAccountRequest {
    const message = createBaseConnectedIntermediaryAccountRequest();
    if (object.lock_id !== undefined && object.lock_id !== null) {
      message.lockId = BigInt(object.lock_id);
    }
    return message;
  },
  toAmino(message: ConnectedIntermediaryAccountRequest, useInterfaces: boolean = false): ConnectedIntermediaryAccountRequestAmino {
    const obj: any = {};
    obj.lock_id = message.lockId ? message.lockId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: ConnectedIntermediaryAccountRequestAminoMsg): ConnectedIntermediaryAccountRequest {
    return ConnectedIntermediaryAccountRequest.fromAmino(object.value);
  },
  toAminoMsg(message: ConnectedIntermediaryAccountRequest, useInterfaces: boolean = false): ConnectedIntermediaryAccountRequestAminoMsg {
    return {
      type: "osmosis/connected-intermediary-account-request",
      value: ConnectedIntermediaryAccountRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: ConnectedIntermediaryAccountRequestProtoMsg, useInterfaces: boolean = false): ConnectedIntermediaryAccountRequest {
    return ConnectedIntermediaryAccountRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ConnectedIntermediaryAccountRequest): Uint8Array {
    return ConnectedIntermediaryAccountRequest.encode(message).finish();
  },
  toProtoMsg(message: ConnectedIntermediaryAccountRequest): ConnectedIntermediaryAccountRequestProtoMsg {
    return {
      typeUrl: "/osmosis.superfluid.ConnectedIntermediaryAccountRequest",
      value: ConnectedIntermediaryAccountRequest.encode(message).finish()
    };
  }
};
function createBaseConnectedIntermediaryAccountResponse(): ConnectedIntermediaryAccountResponse {
  return {
    account: undefined
  };
}
export const ConnectedIntermediaryAccountResponse = {
  typeUrl: "/osmosis.superfluid.ConnectedIntermediaryAccountResponse",
  encode(message: ConnectedIntermediaryAccountResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.account !== undefined) {
      SuperfluidIntermediaryAccountInfo.encode(message.account, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ConnectedIntermediaryAccountResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConnectedIntermediaryAccountResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = SuperfluidIntermediaryAccountInfo.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ConnectedIntermediaryAccountResponse>): ConnectedIntermediaryAccountResponse {
    const message = createBaseConnectedIntermediaryAccountResponse();
    message.account = object.account !== undefined && object.account !== null ? SuperfluidIntermediaryAccountInfo.fromPartial(object.account) : undefined;
    return message;
  },
  fromAmino(object: ConnectedIntermediaryAccountResponseAmino): ConnectedIntermediaryAccountResponse {
    const message = createBaseConnectedIntermediaryAccountResponse();
    if (object.account !== undefined && object.account !== null) {
      message.account = SuperfluidIntermediaryAccountInfo.fromAmino(object.account);
    }
    return message;
  },
  toAmino(message: ConnectedIntermediaryAccountResponse, useInterfaces: boolean = false): ConnectedIntermediaryAccountResponseAmino {
    const obj: any = {};
    obj.account = message.account ? SuperfluidIntermediaryAccountInfo.toAmino(message.account, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: ConnectedIntermediaryAccountResponseAminoMsg): ConnectedIntermediaryAccountResponse {
    return ConnectedIntermediaryAccountResponse.fromAmino(object.value);
  },
  toAminoMsg(message: ConnectedIntermediaryAccountResponse, useInterfaces: boolean = false): ConnectedIntermediaryAccountResponseAminoMsg {
    return {
      type: "osmosis/connected-intermediary-account-response",
      value: ConnectedIntermediaryAccountResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: ConnectedIntermediaryAccountResponseProtoMsg, useInterfaces: boolean = false): ConnectedIntermediaryAccountResponse {
    return ConnectedIntermediaryAccountResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ConnectedIntermediaryAccountResponse): Uint8Array {
    return ConnectedIntermediaryAccountResponse.encode(message).finish();
  },
  toProtoMsg(message: ConnectedIntermediaryAccountResponse): ConnectedIntermediaryAccountResponseProtoMsg {
    return {
      typeUrl: "/osmosis.superfluid.ConnectedIntermediaryAccountResponse",
      value: ConnectedIntermediaryAccountResponse.encode(message).finish()
    };
  }
};
function createBaseQueryTotalDelegationByValidatorForDenomRequest(): QueryTotalDelegationByValidatorForDenomRequest {
  return {
    denom: ""
  };
}
export const QueryTotalDelegationByValidatorForDenomRequest = {
  typeUrl: "/osmosis.superfluid.QueryTotalDelegationByValidatorForDenomRequest",
  encode(message: QueryTotalDelegationByValidatorForDenomRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryTotalDelegationByValidatorForDenomRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTotalDelegationByValidatorForDenomRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryTotalDelegationByValidatorForDenomRequest>): QueryTotalDelegationByValidatorForDenomRequest {
    const message = createBaseQueryTotalDelegationByValidatorForDenomRequest();
    message.denom = object.denom ?? "";
    return message;
  },
  fromAmino(object: QueryTotalDelegationByValidatorForDenomRequestAmino): QueryTotalDelegationByValidatorForDenomRequest {
    const message = createBaseQueryTotalDelegationByValidatorForDenomRequest();
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    return message;
  },
  toAmino(message: QueryTotalDelegationByValidatorForDenomRequest, useInterfaces: boolean = false): QueryTotalDelegationByValidatorForDenomRequestAmino {
    const obj: any = {};
    obj.denom = message.denom;
    return obj;
  },
  fromAminoMsg(object: QueryTotalDelegationByValidatorForDenomRequestAminoMsg): QueryTotalDelegationByValidatorForDenomRequest {
    return QueryTotalDelegationByValidatorForDenomRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryTotalDelegationByValidatorForDenomRequest, useInterfaces: boolean = false): QueryTotalDelegationByValidatorForDenomRequestAminoMsg {
    return {
      type: "osmosis/query-total-delegation-by-validator-for-denom-request",
      value: QueryTotalDelegationByValidatorForDenomRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryTotalDelegationByValidatorForDenomRequestProtoMsg, useInterfaces: boolean = false): QueryTotalDelegationByValidatorForDenomRequest {
    return QueryTotalDelegationByValidatorForDenomRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryTotalDelegationByValidatorForDenomRequest): Uint8Array {
    return QueryTotalDelegationByValidatorForDenomRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryTotalDelegationByValidatorForDenomRequest): QueryTotalDelegationByValidatorForDenomRequestProtoMsg {
    return {
      typeUrl: "/osmosis.superfluid.QueryTotalDelegationByValidatorForDenomRequest",
      value: QueryTotalDelegationByValidatorForDenomRequest.encode(message).finish()
    };
  }
};
function createBaseQueryTotalDelegationByValidatorForDenomResponse(): QueryTotalDelegationByValidatorForDenomResponse {
  return {
    assets: []
  };
}
export const QueryTotalDelegationByValidatorForDenomResponse = {
  typeUrl: "/osmosis.superfluid.QueryTotalDelegationByValidatorForDenomResponse",
  encode(message: QueryTotalDelegationByValidatorForDenomResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.assets) {
      Delegations.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryTotalDelegationByValidatorForDenomResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTotalDelegationByValidatorForDenomResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.assets.push(Delegations.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryTotalDelegationByValidatorForDenomResponse>): QueryTotalDelegationByValidatorForDenomResponse {
    const message = createBaseQueryTotalDelegationByValidatorForDenomResponse();
    message.assets = object.assets?.map(e => Delegations.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryTotalDelegationByValidatorForDenomResponseAmino): QueryTotalDelegationByValidatorForDenomResponse {
    const message = createBaseQueryTotalDelegationByValidatorForDenomResponse();
    message.assets = object.assets?.map(e => Delegations.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: QueryTotalDelegationByValidatorForDenomResponse, useInterfaces: boolean = false): QueryTotalDelegationByValidatorForDenomResponseAmino {
    const obj: any = {};
    if (message.assets) {
      obj.assets = message.assets.map(e => e ? Delegations.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.assets = [];
    }
    return obj;
  },
  fromAminoMsg(object: QueryTotalDelegationByValidatorForDenomResponseAminoMsg): QueryTotalDelegationByValidatorForDenomResponse {
    return QueryTotalDelegationByValidatorForDenomResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryTotalDelegationByValidatorForDenomResponse, useInterfaces: boolean = false): QueryTotalDelegationByValidatorForDenomResponseAminoMsg {
    return {
      type: "osmosis/query-total-delegation-by-validator-for-denom-response",
      value: QueryTotalDelegationByValidatorForDenomResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryTotalDelegationByValidatorForDenomResponseProtoMsg, useInterfaces: boolean = false): QueryTotalDelegationByValidatorForDenomResponse {
    return QueryTotalDelegationByValidatorForDenomResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryTotalDelegationByValidatorForDenomResponse): Uint8Array {
    return QueryTotalDelegationByValidatorForDenomResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryTotalDelegationByValidatorForDenomResponse): QueryTotalDelegationByValidatorForDenomResponseProtoMsg {
    return {
      typeUrl: "/osmosis.superfluid.QueryTotalDelegationByValidatorForDenomResponse",
      value: QueryTotalDelegationByValidatorForDenomResponse.encode(message).finish()
    };
  }
};
function createBaseDelegations(): Delegations {
  return {
    valAddr: "",
    amountSfsd: "",
    osmoEquivalent: ""
  };
}
export const Delegations = {
  typeUrl: "/osmosis.superfluid.Delegations",
  encode(message: Delegations, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.valAddr !== "") {
      writer.uint32(10).string(message.valAddr);
    }
    if (message.amountSfsd !== "") {
      writer.uint32(18).string(message.amountSfsd);
    }
    if (message.osmoEquivalent !== "") {
      writer.uint32(26).string(message.osmoEquivalent);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): Delegations {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDelegations();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.valAddr = reader.string();
          break;
        case 2:
          message.amountSfsd = reader.string();
          break;
        case 3:
          message.osmoEquivalent = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Delegations>): Delegations {
    const message = createBaseDelegations();
    message.valAddr = object.valAddr ?? "";
    message.amountSfsd = object.amountSfsd ?? "";
    message.osmoEquivalent = object.osmoEquivalent ?? "";
    return message;
  },
  fromAmino(object: DelegationsAmino): Delegations {
    const message = createBaseDelegations();
    if (object.val_addr !== undefined && object.val_addr !== null) {
      message.valAddr = object.val_addr;
    }
    if (object.amount_sfsd !== undefined && object.amount_sfsd !== null) {
      message.amountSfsd = object.amount_sfsd;
    }
    if (object.osmo_equivalent !== undefined && object.osmo_equivalent !== null) {
      message.osmoEquivalent = object.osmo_equivalent;
    }
    return message;
  },
  toAmino(message: Delegations, useInterfaces: boolean = false): DelegationsAmino {
    const obj: any = {};
    obj.val_addr = message.valAddr;
    obj.amount_sfsd = message.amountSfsd;
    obj.osmo_equivalent = message.osmoEquivalent;
    return obj;
  },
  fromAminoMsg(object: DelegationsAminoMsg): Delegations {
    return Delegations.fromAmino(object.value);
  },
  toAminoMsg(message: Delegations, useInterfaces: boolean = false): DelegationsAminoMsg {
    return {
      type: "osmosis/delegations",
      value: Delegations.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: DelegationsProtoMsg, useInterfaces: boolean = false): Delegations {
    return Delegations.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Delegations): Uint8Array {
    return Delegations.encode(message).finish();
  },
  toProtoMsg(message: Delegations): DelegationsProtoMsg {
    return {
      typeUrl: "/osmosis.superfluid.Delegations",
      value: Delegations.encode(message).finish()
    };
  }
};
function createBaseTotalSuperfluidDelegationsRequest(): TotalSuperfluidDelegationsRequest {
  return {};
}
export const TotalSuperfluidDelegationsRequest = {
  typeUrl: "/osmosis.superfluid.TotalSuperfluidDelegationsRequest",
  encode(_: TotalSuperfluidDelegationsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): TotalSuperfluidDelegationsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTotalSuperfluidDelegationsRequest();
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
  fromPartial(_: Partial<TotalSuperfluidDelegationsRequest>): TotalSuperfluidDelegationsRequest {
    const message = createBaseTotalSuperfluidDelegationsRequest();
    return message;
  },
  fromAmino(_: TotalSuperfluidDelegationsRequestAmino): TotalSuperfluidDelegationsRequest {
    const message = createBaseTotalSuperfluidDelegationsRequest();
    return message;
  },
  toAmino(_: TotalSuperfluidDelegationsRequest, useInterfaces: boolean = false): TotalSuperfluidDelegationsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: TotalSuperfluidDelegationsRequestAminoMsg): TotalSuperfluidDelegationsRequest {
    return TotalSuperfluidDelegationsRequest.fromAmino(object.value);
  },
  toAminoMsg(message: TotalSuperfluidDelegationsRequest, useInterfaces: boolean = false): TotalSuperfluidDelegationsRequestAminoMsg {
    return {
      type: "osmosis/total-superfluid-delegations-request",
      value: TotalSuperfluidDelegationsRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: TotalSuperfluidDelegationsRequestProtoMsg, useInterfaces: boolean = false): TotalSuperfluidDelegationsRequest {
    return TotalSuperfluidDelegationsRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: TotalSuperfluidDelegationsRequest): Uint8Array {
    return TotalSuperfluidDelegationsRequest.encode(message).finish();
  },
  toProtoMsg(message: TotalSuperfluidDelegationsRequest): TotalSuperfluidDelegationsRequestProtoMsg {
    return {
      typeUrl: "/osmosis.superfluid.TotalSuperfluidDelegationsRequest",
      value: TotalSuperfluidDelegationsRequest.encode(message).finish()
    };
  }
};
function createBaseTotalSuperfluidDelegationsResponse(): TotalSuperfluidDelegationsResponse {
  return {
    totalDelegations: ""
  };
}
export const TotalSuperfluidDelegationsResponse = {
  typeUrl: "/osmosis.superfluid.TotalSuperfluidDelegationsResponse",
  encode(message: TotalSuperfluidDelegationsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.totalDelegations !== "") {
      writer.uint32(10).string(message.totalDelegations);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): TotalSuperfluidDelegationsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTotalSuperfluidDelegationsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.totalDelegations = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<TotalSuperfluidDelegationsResponse>): TotalSuperfluidDelegationsResponse {
    const message = createBaseTotalSuperfluidDelegationsResponse();
    message.totalDelegations = object.totalDelegations ?? "";
    return message;
  },
  fromAmino(object: TotalSuperfluidDelegationsResponseAmino): TotalSuperfluidDelegationsResponse {
    const message = createBaseTotalSuperfluidDelegationsResponse();
    if (object.total_delegations !== undefined && object.total_delegations !== null) {
      message.totalDelegations = object.total_delegations;
    }
    return message;
  },
  toAmino(message: TotalSuperfluidDelegationsResponse, useInterfaces: boolean = false): TotalSuperfluidDelegationsResponseAmino {
    const obj: any = {};
    obj.total_delegations = message.totalDelegations;
    return obj;
  },
  fromAminoMsg(object: TotalSuperfluidDelegationsResponseAminoMsg): TotalSuperfluidDelegationsResponse {
    return TotalSuperfluidDelegationsResponse.fromAmino(object.value);
  },
  toAminoMsg(message: TotalSuperfluidDelegationsResponse, useInterfaces: boolean = false): TotalSuperfluidDelegationsResponseAminoMsg {
    return {
      type: "osmosis/total-superfluid-delegations-response",
      value: TotalSuperfluidDelegationsResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: TotalSuperfluidDelegationsResponseProtoMsg, useInterfaces: boolean = false): TotalSuperfluidDelegationsResponse {
    return TotalSuperfluidDelegationsResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: TotalSuperfluidDelegationsResponse): Uint8Array {
    return TotalSuperfluidDelegationsResponse.encode(message).finish();
  },
  toProtoMsg(message: TotalSuperfluidDelegationsResponse): TotalSuperfluidDelegationsResponseProtoMsg {
    return {
      typeUrl: "/osmosis.superfluid.TotalSuperfluidDelegationsResponse",
      value: TotalSuperfluidDelegationsResponse.encode(message).finish()
    };
  }
};
function createBaseSuperfluidDelegationAmountRequest(): SuperfluidDelegationAmountRequest {
  return {
    delegatorAddress: "",
    validatorAddress: "",
    denom: ""
  };
}
export const SuperfluidDelegationAmountRequest = {
  typeUrl: "/osmosis.superfluid.SuperfluidDelegationAmountRequest",
  encode(message: SuperfluidDelegationAmountRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.delegatorAddress !== "") {
      writer.uint32(10).string(message.delegatorAddress);
    }
    if (message.validatorAddress !== "") {
      writer.uint32(18).string(message.validatorAddress);
    }
    if (message.denom !== "") {
      writer.uint32(26).string(message.denom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): SuperfluidDelegationAmountRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSuperfluidDelegationAmountRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegatorAddress = reader.string();
          break;
        case 2:
          message.validatorAddress = reader.string();
          break;
        case 3:
          message.denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<SuperfluidDelegationAmountRequest>): SuperfluidDelegationAmountRequest {
    const message = createBaseSuperfluidDelegationAmountRequest();
    message.delegatorAddress = object.delegatorAddress ?? "";
    message.validatorAddress = object.validatorAddress ?? "";
    message.denom = object.denom ?? "";
    return message;
  },
  fromAmino(object: SuperfluidDelegationAmountRequestAmino): SuperfluidDelegationAmountRequest {
    const message = createBaseSuperfluidDelegationAmountRequest();
    if (object.delegator_address !== undefined && object.delegator_address !== null) {
      message.delegatorAddress = object.delegator_address;
    }
    if (object.validator_address !== undefined && object.validator_address !== null) {
      message.validatorAddress = object.validator_address;
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    return message;
  },
  toAmino(message: SuperfluidDelegationAmountRequest, useInterfaces: boolean = false): SuperfluidDelegationAmountRequestAmino {
    const obj: any = {};
    obj.delegator_address = message.delegatorAddress;
    obj.validator_address = message.validatorAddress;
    obj.denom = message.denom;
    return obj;
  },
  fromAminoMsg(object: SuperfluidDelegationAmountRequestAminoMsg): SuperfluidDelegationAmountRequest {
    return SuperfluidDelegationAmountRequest.fromAmino(object.value);
  },
  toAminoMsg(message: SuperfluidDelegationAmountRequest, useInterfaces: boolean = false): SuperfluidDelegationAmountRequestAminoMsg {
    return {
      type: "osmosis/superfluid-delegation-amount-request",
      value: SuperfluidDelegationAmountRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: SuperfluidDelegationAmountRequestProtoMsg, useInterfaces: boolean = false): SuperfluidDelegationAmountRequest {
    return SuperfluidDelegationAmountRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: SuperfluidDelegationAmountRequest): Uint8Array {
    return SuperfluidDelegationAmountRequest.encode(message).finish();
  },
  toProtoMsg(message: SuperfluidDelegationAmountRequest): SuperfluidDelegationAmountRequestProtoMsg {
    return {
      typeUrl: "/osmosis.superfluid.SuperfluidDelegationAmountRequest",
      value: SuperfluidDelegationAmountRequest.encode(message).finish()
    };
  }
};
function createBaseSuperfluidDelegationAmountResponse(): SuperfluidDelegationAmountResponse {
  return {
    amount: []
  };
}
export const SuperfluidDelegationAmountResponse = {
  typeUrl: "/osmosis.superfluid.SuperfluidDelegationAmountResponse",
  encode(message: SuperfluidDelegationAmountResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.amount) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): SuperfluidDelegationAmountResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSuperfluidDelegationAmountResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.amount.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<SuperfluidDelegationAmountResponse>): SuperfluidDelegationAmountResponse {
    const message = createBaseSuperfluidDelegationAmountResponse();
    message.amount = object.amount?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: SuperfluidDelegationAmountResponseAmino): SuperfluidDelegationAmountResponse {
    const message = createBaseSuperfluidDelegationAmountResponse();
    message.amount = object.amount?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: SuperfluidDelegationAmountResponse, useInterfaces: boolean = false): SuperfluidDelegationAmountResponseAmino {
    const obj: any = {};
    if (message.amount) {
      obj.amount = message.amount.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.amount = [];
    }
    return obj;
  },
  fromAminoMsg(object: SuperfluidDelegationAmountResponseAminoMsg): SuperfluidDelegationAmountResponse {
    return SuperfluidDelegationAmountResponse.fromAmino(object.value);
  },
  toAminoMsg(message: SuperfluidDelegationAmountResponse, useInterfaces: boolean = false): SuperfluidDelegationAmountResponseAminoMsg {
    return {
      type: "osmosis/superfluid-delegation-amount-response",
      value: SuperfluidDelegationAmountResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: SuperfluidDelegationAmountResponseProtoMsg, useInterfaces: boolean = false): SuperfluidDelegationAmountResponse {
    return SuperfluidDelegationAmountResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: SuperfluidDelegationAmountResponse): Uint8Array {
    return SuperfluidDelegationAmountResponse.encode(message).finish();
  },
  toProtoMsg(message: SuperfluidDelegationAmountResponse): SuperfluidDelegationAmountResponseProtoMsg {
    return {
      typeUrl: "/osmosis.superfluid.SuperfluidDelegationAmountResponse",
      value: SuperfluidDelegationAmountResponse.encode(message).finish()
    };
  }
};
function createBaseSuperfluidDelegationsByDelegatorRequest(): SuperfluidDelegationsByDelegatorRequest {
  return {
    delegatorAddress: ""
  };
}
export const SuperfluidDelegationsByDelegatorRequest = {
  typeUrl: "/osmosis.superfluid.SuperfluidDelegationsByDelegatorRequest",
  encode(message: SuperfluidDelegationsByDelegatorRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.delegatorAddress !== "") {
      writer.uint32(10).string(message.delegatorAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): SuperfluidDelegationsByDelegatorRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSuperfluidDelegationsByDelegatorRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegatorAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<SuperfluidDelegationsByDelegatorRequest>): SuperfluidDelegationsByDelegatorRequest {
    const message = createBaseSuperfluidDelegationsByDelegatorRequest();
    message.delegatorAddress = object.delegatorAddress ?? "";
    return message;
  },
  fromAmino(object: SuperfluidDelegationsByDelegatorRequestAmino): SuperfluidDelegationsByDelegatorRequest {
    const message = createBaseSuperfluidDelegationsByDelegatorRequest();
    if (object.delegator_address !== undefined && object.delegator_address !== null) {
      message.delegatorAddress = object.delegator_address;
    }
    return message;
  },
  toAmino(message: SuperfluidDelegationsByDelegatorRequest, useInterfaces: boolean = false): SuperfluidDelegationsByDelegatorRequestAmino {
    const obj: any = {};
    obj.delegator_address = message.delegatorAddress;
    return obj;
  },
  fromAminoMsg(object: SuperfluidDelegationsByDelegatorRequestAminoMsg): SuperfluidDelegationsByDelegatorRequest {
    return SuperfluidDelegationsByDelegatorRequest.fromAmino(object.value);
  },
  toAminoMsg(message: SuperfluidDelegationsByDelegatorRequest, useInterfaces: boolean = false): SuperfluidDelegationsByDelegatorRequestAminoMsg {
    return {
      type: "osmosis/superfluid-delegations-by-delegator-request",
      value: SuperfluidDelegationsByDelegatorRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: SuperfluidDelegationsByDelegatorRequestProtoMsg, useInterfaces: boolean = false): SuperfluidDelegationsByDelegatorRequest {
    return SuperfluidDelegationsByDelegatorRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: SuperfluidDelegationsByDelegatorRequest): Uint8Array {
    return SuperfluidDelegationsByDelegatorRequest.encode(message).finish();
  },
  toProtoMsg(message: SuperfluidDelegationsByDelegatorRequest): SuperfluidDelegationsByDelegatorRequestProtoMsg {
    return {
      typeUrl: "/osmosis.superfluid.SuperfluidDelegationsByDelegatorRequest",
      value: SuperfluidDelegationsByDelegatorRequest.encode(message).finish()
    };
  }
};
function createBaseSuperfluidDelegationsByDelegatorResponse(): SuperfluidDelegationsByDelegatorResponse {
  return {
    superfluidDelegationRecords: [],
    totalDelegatedCoins: [],
    totalEquivalentStakedAmount: Coin.fromPartial({})
  };
}
export const SuperfluidDelegationsByDelegatorResponse = {
  typeUrl: "/osmosis.superfluid.SuperfluidDelegationsByDelegatorResponse",
  encode(message: SuperfluidDelegationsByDelegatorResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.superfluidDelegationRecords) {
      SuperfluidDelegationRecord.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.totalDelegatedCoins) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.totalEquivalentStakedAmount !== undefined) {
      Coin.encode(message.totalEquivalentStakedAmount, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): SuperfluidDelegationsByDelegatorResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSuperfluidDelegationsByDelegatorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.superfluidDelegationRecords.push(SuperfluidDelegationRecord.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
          message.totalDelegatedCoins.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 3:
          message.totalEquivalentStakedAmount = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<SuperfluidDelegationsByDelegatorResponse>): SuperfluidDelegationsByDelegatorResponse {
    const message = createBaseSuperfluidDelegationsByDelegatorResponse();
    message.superfluidDelegationRecords = object.superfluidDelegationRecords?.map(e => SuperfluidDelegationRecord.fromPartial(e)) || [];
    message.totalDelegatedCoins = object.totalDelegatedCoins?.map(e => Coin.fromPartial(e)) || [];
    message.totalEquivalentStakedAmount = object.totalEquivalentStakedAmount !== undefined && object.totalEquivalentStakedAmount !== null ? Coin.fromPartial(object.totalEquivalentStakedAmount) : undefined;
    return message;
  },
  fromAmino(object: SuperfluidDelegationsByDelegatorResponseAmino): SuperfluidDelegationsByDelegatorResponse {
    const message = createBaseSuperfluidDelegationsByDelegatorResponse();
    message.superfluidDelegationRecords = object.superfluid_delegation_records?.map(e => SuperfluidDelegationRecord.fromAmino(e)) || [];
    message.totalDelegatedCoins = object.total_delegated_coins?.map(e => Coin.fromAmino(e)) || [];
    if (object.total_equivalent_staked_amount !== undefined && object.total_equivalent_staked_amount !== null) {
      message.totalEquivalentStakedAmount = Coin.fromAmino(object.total_equivalent_staked_amount);
    }
    return message;
  },
  toAmino(message: SuperfluidDelegationsByDelegatorResponse, useInterfaces: boolean = false): SuperfluidDelegationsByDelegatorResponseAmino {
    const obj: any = {};
    if (message.superfluidDelegationRecords) {
      obj.superfluid_delegation_records = message.superfluidDelegationRecords.map(e => e ? SuperfluidDelegationRecord.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.superfluid_delegation_records = [];
    }
    if (message.totalDelegatedCoins) {
      obj.total_delegated_coins = message.totalDelegatedCoins.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.total_delegated_coins = [];
    }
    obj.total_equivalent_staked_amount = message.totalEquivalentStakedAmount ? Coin.toAmino(message.totalEquivalentStakedAmount, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: SuperfluidDelegationsByDelegatorResponseAminoMsg): SuperfluidDelegationsByDelegatorResponse {
    return SuperfluidDelegationsByDelegatorResponse.fromAmino(object.value);
  },
  toAminoMsg(message: SuperfluidDelegationsByDelegatorResponse, useInterfaces: boolean = false): SuperfluidDelegationsByDelegatorResponseAminoMsg {
    return {
      type: "osmosis/superfluid-delegations-by-delegator-response",
      value: SuperfluidDelegationsByDelegatorResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: SuperfluidDelegationsByDelegatorResponseProtoMsg, useInterfaces: boolean = false): SuperfluidDelegationsByDelegatorResponse {
    return SuperfluidDelegationsByDelegatorResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: SuperfluidDelegationsByDelegatorResponse): Uint8Array {
    return SuperfluidDelegationsByDelegatorResponse.encode(message).finish();
  },
  toProtoMsg(message: SuperfluidDelegationsByDelegatorResponse): SuperfluidDelegationsByDelegatorResponseProtoMsg {
    return {
      typeUrl: "/osmosis.superfluid.SuperfluidDelegationsByDelegatorResponse",
      value: SuperfluidDelegationsByDelegatorResponse.encode(message).finish()
    };
  }
};
function createBaseSuperfluidUndelegationsByDelegatorRequest(): SuperfluidUndelegationsByDelegatorRequest {
  return {
    delegatorAddress: "",
    denom: ""
  };
}
export const SuperfluidUndelegationsByDelegatorRequest = {
  typeUrl: "/osmosis.superfluid.SuperfluidUndelegationsByDelegatorRequest",
  encode(message: SuperfluidUndelegationsByDelegatorRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.delegatorAddress !== "") {
      writer.uint32(10).string(message.delegatorAddress);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): SuperfluidUndelegationsByDelegatorRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSuperfluidUndelegationsByDelegatorRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegatorAddress = reader.string();
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
  fromPartial(object: Partial<SuperfluidUndelegationsByDelegatorRequest>): SuperfluidUndelegationsByDelegatorRequest {
    const message = createBaseSuperfluidUndelegationsByDelegatorRequest();
    message.delegatorAddress = object.delegatorAddress ?? "";
    message.denom = object.denom ?? "";
    return message;
  },
  fromAmino(object: SuperfluidUndelegationsByDelegatorRequestAmino): SuperfluidUndelegationsByDelegatorRequest {
    const message = createBaseSuperfluidUndelegationsByDelegatorRequest();
    if (object.delegator_address !== undefined && object.delegator_address !== null) {
      message.delegatorAddress = object.delegator_address;
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    return message;
  },
  toAmino(message: SuperfluidUndelegationsByDelegatorRequest, useInterfaces: boolean = false): SuperfluidUndelegationsByDelegatorRequestAmino {
    const obj: any = {};
    obj.delegator_address = message.delegatorAddress;
    obj.denom = message.denom;
    return obj;
  },
  fromAminoMsg(object: SuperfluidUndelegationsByDelegatorRequestAminoMsg): SuperfluidUndelegationsByDelegatorRequest {
    return SuperfluidUndelegationsByDelegatorRequest.fromAmino(object.value);
  },
  toAminoMsg(message: SuperfluidUndelegationsByDelegatorRequest, useInterfaces: boolean = false): SuperfluidUndelegationsByDelegatorRequestAminoMsg {
    return {
      type: "osmosis/superfluid-undelegations-by-delegator-request",
      value: SuperfluidUndelegationsByDelegatorRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: SuperfluidUndelegationsByDelegatorRequestProtoMsg, useInterfaces: boolean = false): SuperfluidUndelegationsByDelegatorRequest {
    return SuperfluidUndelegationsByDelegatorRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: SuperfluidUndelegationsByDelegatorRequest): Uint8Array {
    return SuperfluidUndelegationsByDelegatorRequest.encode(message).finish();
  },
  toProtoMsg(message: SuperfluidUndelegationsByDelegatorRequest): SuperfluidUndelegationsByDelegatorRequestProtoMsg {
    return {
      typeUrl: "/osmosis.superfluid.SuperfluidUndelegationsByDelegatorRequest",
      value: SuperfluidUndelegationsByDelegatorRequest.encode(message).finish()
    };
  }
};
function createBaseSuperfluidUndelegationsByDelegatorResponse(): SuperfluidUndelegationsByDelegatorResponse {
  return {
    superfluidDelegationRecords: [],
    totalUndelegatedCoins: [],
    syntheticLocks: []
  };
}
export const SuperfluidUndelegationsByDelegatorResponse = {
  typeUrl: "/osmosis.superfluid.SuperfluidUndelegationsByDelegatorResponse",
  encode(message: SuperfluidUndelegationsByDelegatorResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.superfluidDelegationRecords) {
      SuperfluidDelegationRecord.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.totalUndelegatedCoins) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.syntheticLocks) {
      SyntheticLock.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): SuperfluidUndelegationsByDelegatorResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSuperfluidUndelegationsByDelegatorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.superfluidDelegationRecords.push(SuperfluidDelegationRecord.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
          message.totalUndelegatedCoins.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 3:
          message.syntheticLocks.push(SyntheticLock.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<SuperfluidUndelegationsByDelegatorResponse>): SuperfluidUndelegationsByDelegatorResponse {
    const message = createBaseSuperfluidUndelegationsByDelegatorResponse();
    message.superfluidDelegationRecords = object.superfluidDelegationRecords?.map(e => SuperfluidDelegationRecord.fromPartial(e)) || [];
    message.totalUndelegatedCoins = object.totalUndelegatedCoins?.map(e => Coin.fromPartial(e)) || [];
    message.syntheticLocks = object.syntheticLocks?.map(e => SyntheticLock.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: SuperfluidUndelegationsByDelegatorResponseAmino): SuperfluidUndelegationsByDelegatorResponse {
    const message = createBaseSuperfluidUndelegationsByDelegatorResponse();
    message.superfluidDelegationRecords = object.superfluid_delegation_records?.map(e => SuperfluidDelegationRecord.fromAmino(e)) || [];
    message.totalUndelegatedCoins = object.total_undelegated_coins?.map(e => Coin.fromAmino(e)) || [];
    message.syntheticLocks = object.synthetic_locks?.map(e => SyntheticLock.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: SuperfluidUndelegationsByDelegatorResponse, useInterfaces: boolean = false): SuperfluidUndelegationsByDelegatorResponseAmino {
    const obj: any = {};
    if (message.superfluidDelegationRecords) {
      obj.superfluid_delegation_records = message.superfluidDelegationRecords.map(e => e ? SuperfluidDelegationRecord.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.superfluid_delegation_records = [];
    }
    if (message.totalUndelegatedCoins) {
      obj.total_undelegated_coins = message.totalUndelegatedCoins.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.total_undelegated_coins = [];
    }
    if (message.syntheticLocks) {
      obj.synthetic_locks = message.syntheticLocks.map(e => e ? SyntheticLock.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.synthetic_locks = [];
    }
    return obj;
  },
  fromAminoMsg(object: SuperfluidUndelegationsByDelegatorResponseAminoMsg): SuperfluidUndelegationsByDelegatorResponse {
    return SuperfluidUndelegationsByDelegatorResponse.fromAmino(object.value);
  },
  toAminoMsg(message: SuperfluidUndelegationsByDelegatorResponse, useInterfaces: boolean = false): SuperfluidUndelegationsByDelegatorResponseAminoMsg {
    return {
      type: "osmosis/superfluid-undelegations-by-delegator-response",
      value: SuperfluidUndelegationsByDelegatorResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: SuperfluidUndelegationsByDelegatorResponseProtoMsg, useInterfaces: boolean = false): SuperfluidUndelegationsByDelegatorResponse {
    return SuperfluidUndelegationsByDelegatorResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: SuperfluidUndelegationsByDelegatorResponse): Uint8Array {
    return SuperfluidUndelegationsByDelegatorResponse.encode(message).finish();
  },
  toProtoMsg(message: SuperfluidUndelegationsByDelegatorResponse): SuperfluidUndelegationsByDelegatorResponseProtoMsg {
    return {
      typeUrl: "/osmosis.superfluid.SuperfluidUndelegationsByDelegatorResponse",
      value: SuperfluidUndelegationsByDelegatorResponse.encode(message).finish()
    };
  }
};
function createBaseSuperfluidDelegationsByValidatorDenomRequest(): SuperfluidDelegationsByValidatorDenomRequest {
  return {
    validatorAddress: "",
    denom: ""
  };
}
export const SuperfluidDelegationsByValidatorDenomRequest = {
  typeUrl: "/osmosis.superfluid.SuperfluidDelegationsByValidatorDenomRequest",
  encode(message: SuperfluidDelegationsByValidatorDenomRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.validatorAddress !== "") {
      writer.uint32(10).string(message.validatorAddress);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): SuperfluidDelegationsByValidatorDenomRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSuperfluidDelegationsByValidatorDenomRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validatorAddress = reader.string();
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
  fromPartial(object: Partial<SuperfluidDelegationsByValidatorDenomRequest>): SuperfluidDelegationsByValidatorDenomRequest {
    const message = createBaseSuperfluidDelegationsByValidatorDenomRequest();
    message.validatorAddress = object.validatorAddress ?? "";
    message.denom = object.denom ?? "";
    return message;
  },
  fromAmino(object: SuperfluidDelegationsByValidatorDenomRequestAmino): SuperfluidDelegationsByValidatorDenomRequest {
    const message = createBaseSuperfluidDelegationsByValidatorDenomRequest();
    if (object.validator_address !== undefined && object.validator_address !== null) {
      message.validatorAddress = object.validator_address;
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    return message;
  },
  toAmino(message: SuperfluidDelegationsByValidatorDenomRequest, useInterfaces: boolean = false): SuperfluidDelegationsByValidatorDenomRequestAmino {
    const obj: any = {};
    obj.validator_address = message.validatorAddress;
    obj.denom = message.denom;
    return obj;
  },
  fromAminoMsg(object: SuperfluidDelegationsByValidatorDenomRequestAminoMsg): SuperfluidDelegationsByValidatorDenomRequest {
    return SuperfluidDelegationsByValidatorDenomRequest.fromAmino(object.value);
  },
  toAminoMsg(message: SuperfluidDelegationsByValidatorDenomRequest, useInterfaces: boolean = false): SuperfluidDelegationsByValidatorDenomRequestAminoMsg {
    return {
      type: "osmosis/superfluid-delegations-by-validator-denom-request",
      value: SuperfluidDelegationsByValidatorDenomRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: SuperfluidDelegationsByValidatorDenomRequestProtoMsg, useInterfaces: boolean = false): SuperfluidDelegationsByValidatorDenomRequest {
    return SuperfluidDelegationsByValidatorDenomRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: SuperfluidDelegationsByValidatorDenomRequest): Uint8Array {
    return SuperfluidDelegationsByValidatorDenomRequest.encode(message).finish();
  },
  toProtoMsg(message: SuperfluidDelegationsByValidatorDenomRequest): SuperfluidDelegationsByValidatorDenomRequestProtoMsg {
    return {
      typeUrl: "/osmosis.superfluid.SuperfluidDelegationsByValidatorDenomRequest",
      value: SuperfluidDelegationsByValidatorDenomRequest.encode(message).finish()
    };
  }
};
function createBaseSuperfluidDelegationsByValidatorDenomResponse(): SuperfluidDelegationsByValidatorDenomResponse {
  return {
    superfluidDelegationRecords: []
  };
}
export const SuperfluidDelegationsByValidatorDenomResponse = {
  typeUrl: "/osmosis.superfluid.SuperfluidDelegationsByValidatorDenomResponse",
  encode(message: SuperfluidDelegationsByValidatorDenomResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.superfluidDelegationRecords) {
      SuperfluidDelegationRecord.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): SuperfluidDelegationsByValidatorDenomResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSuperfluidDelegationsByValidatorDenomResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.superfluidDelegationRecords.push(SuperfluidDelegationRecord.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<SuperfluidDelegationsByValidatorDenomResponse>): SuperfluidDelegationsByValidatorDenomResponse {
    const message = createBaseSuperfluidDelegationsByValidatorDenomResponse();
    message.superfluidDelegationRecords = object.superfluidDelegationRecords?.map(e => SuperfluidDelegationRecord.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: SuperfluidDelegationsByValidatorDenomResponseAmino): SuperfluidDelegationsByValidatorDenomResponse {
    const message = createBaseSuperfluidDelegationsByValidatorDenomResponse();
    message.superfluidDelegationRecords = object.superfluid_delegation_records?.map(e => SuperfluidDelegationRecord.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: SuperfluidDelegationsByValidatorDenomResponse, useInterfaces: boolean = false): SuperfluidDelegationsByValidatorDenomResponseAmino {
    const obj: any = {};
    if (message.superfluidDelegationRecords) {
      obj.superfluid_delegation_records = message.superfluidDelegationRecords.map(e => e ? SuperfluidDelegationRecord.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.superfluid_delegation_records = [];
    }
    return obj;
  },
  fromAminoMsg(object: SuperfluidDelegationsByValidatorDenomResponseAminoMsg): SuperfluidDelegationsByValidatorDenomResponse {
    return SuperfluidDelegationsByValidatorDenomResponse.fromAmino(object.value);
  },
  toAminoMsg(message: SuperfluidDelegationsByValidatorDenomResponse, useInterfaces: boolean = false): SuperfluidDelegationsByValidatorDenomResponseAminoMsg {
    return {
      type: "osmosis/superfluid-delegations-by-validator-denom-response",
      value: SuperfluidDelegationsByValidatorDenomResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: SuperfluidDelegationsByValidatorDenomResponseProtoMsg, useInterfaces: boolean = false): SuperfluidDelegationsByValidatorDenomResponse {
    return SuperfluidDelegationsByValidatorDenomResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: SuperfluidDelegationsByValidatorDenomResponse): Uint8Array {
    return SuperfluidDelegationsByValidatorDenomResponse.encode(message).finish();
  },
  toProtoMsg(message: SuperfluidDelegationsByValidatorDenomResponse): SuperfluidDelegationsByValidatorDenomResponseProtoMsg {
    return {
      typeUrl: "/osmosis.superfluid.SuperfluidDelegationsByValidatorDenomResponse",
      value: SuperfluidDelegationsByValidatorDenomResponse.encode(message).finish()
    };
  }
};
function createBaseEstimateSuperfluidDelegatedAmountByValidatorDenomRequest(): EstimateSuperfluidDelegatedAmountByValidatorDenomRequest {
  return {
    validatorAddress: "",
    denom: ""
  };
}
export const EstimateSuperfluidDelegatedAmountByValidatorDenomRequest = {
  typeUrl: "/osmosis.superfluid.EstimateSuperfluidDelegatedAmountByValidatorDenomRequest",
  encode(message: EstimateSuperfluidDelegatedAmountByValidatorDenomRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.validatorAddress !== "") {
      writer.uint32(10).string(message.validatorAddress);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EstimateSuperfluidDelegatedAmountByValidatorDenomRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEstimateSuperfluidDelegatedAmountByValidatorDenomRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validatorAddress = reader.string();
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
  fromPartial(object: Partial<EstimateSuperfluidDelegatedAmountByValidatorDenomRequest>): EstimateSuperfluidDelegatedAmountByValidatorDenomRequest {
    const message = createBaseEstimateSuperfluidDelegatedAmountByValidatorDenomRequest();
    message.validatorAddress = object.validatorAddress ?? "";
    message.denom = object.denom ?? "";
    return message;
  },
  fromAmino(object: EstimateSuperfluidDelegatedAmountByValidatorDenomRequestAmino): EstimateSuperfluidDelegatedAmountByValidatorDenomRequest {
    const message = createBaseEstimateSuperfluidDelegatedAmountByValidatorDenomRequest();
    if (object.validator_address !== undefined && object.validator_address !== null) {
      message.validatorAddress = object.validator_address;
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom;
    }
    return message;
  },
  toAmino(message: EstimateSuperfluidDelegatedAmountByValidatorDenomRequest, useInterfaces: boolean = false): EstimateSuperfluidDelegatedAmountByValidatorDenomRequestAmino {
    const obj: any = {};
    obj.validator_address = message.validatorAddress;
    obj.denom = message.denom;
    return obj;
  },
  fromAminoMsg(object: EstimateSuperfluidDelegatedAmountByValidatorDenomRequestAminoMsg): EstimateSuperfluidDelegatedAmountByValidatorDenomRequest {
    return EstimateSuperfluidDelegatedAmountByValidatorDenomRequest.fromAmino(object.value);
  },
  toAminoMsg(message: EstimateSuperfluidDelegatedAmountByValidatorDenomRequest, useInterfaces: boolean = false): EstimateSuperfluidDelegatedAmountByValidatorDenomRequestAminoMsg {
    return {
      type: "osmosis/estimate-superfluid-delegated-amount-by-validator-denom-request",
      value: EstimateSuperfluidDelegatedAmountByValidatorDenomRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: EstimateSuperfluidDelegatedAmountByValidatorDenomRequestProtoMsg, useInterfaces: boolean = false): EstimateSuperfluidDelegatedAmountByValidatorDenomRequest {
    return EstimateSuperfluidDelegatedAmountByValidatorDenomRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EstimateSuperfluidDelegatedAmountByValidatorDenomRequest): Uint8Array {
    return EstimateSuperfluidDelegatedAmountByValidatorDenomRequest.encode(message).finish();
  },
  toProtoMsg(message: EstimateSuperfluidDelegatedAmountByValidatorDenomRequest): EstimateSuperfluidDelegatedAmountByValidatorDenomRequestProtoMsg {
    return {
      typeUrl: "/osmosis.superfluid.EstimateSuperfluidDelegatedAmountByValidatorDenomRequest",
      value: EstimateSuperfluidDelegatedAmountByValidatorDenomRequest.encode(message).finish()
    };
  }
};
function createBaseEstimateSuperfluidDelegatedAmountByValidatorDenomResponse(): EstimateSuperfluidDelegatedAmountByValidatorDenomResponse {
  return {
    totalDelegatedCoins: []
  };
}
export const EstimateSuperfluidDelegatedAmountByValidatorDenomResponse = {
  typeUrl: "/osmosis.superfluid.EstimateSuperfluidDelegatedAmountByValidatorDenomResponse",
  encode(message: EstimateSuperfluidDelegatedAmountByValidatorDenomResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.totalDelegatedCoins) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): EstimateSuperfluidDelegatedAmountByValidatorDenomResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEstimateSuperfluidDelegatedAmountByValidatorDenomResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.totalDelegatedCoins.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EstimateSuperfluidDelegatedAmountByValidatorDenomResponse>): EstimateSuperfluidDelegatedAmountByValidatorDenomResponse {
    const message = createBaseEstimateSuperfluidDelegatedAmountByValidatorDenomResponse();
    message.totalDelegatedCoins = object.totalDelegatedCoins?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: EstimateSuperfluidDelegatedAmountByValidatorDenomResponseAmino): EstimateSuperfluidDelegatedAmountByValidatorDenomResponse {
    const message = createBaseEstimateSuperfluidDelegatedAmountByValidatorDenomResponse();
    message.totalDelegatedCoins = object.total_delegated_coins?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: EstimateSuperfluidDelegatedAmountByValidatorDenomResponse, useInterfaces: boolean = false): EstimateSuperfluidDelegatedAmountByValidatorDenomResponseAmino {
    const obj: any = {};
    if (message.totalDelegatedCoins) {
      obj.total_delegated_coins = message.totalDelegatedCoins.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.total_delegated_coins = [];
    }
    return obj;
  },
  fromAminoMsg(object: EstimateSuperfluidDelegatedAmountByValidatorDenomResponseAminoMsg): EstimateSuperfluidDelegatedAmountByValidatorDenomResponse {
    return EstimateSuperfluidDelegatedAmountByValidatorDenomResponse.fromAmino(object.value);
  },
  toAminoMsg(message: EstimateSuperfluidDelegatedAmountByValidatorDenomResponse, useInterfaces: boolean = false): EstimateSuperfluidDelegatedAmountByValidatorDenomResponseAminoMsg {
    return {
      type: "osmosis/estimate-superfluid-delegated-amount-by-validator-denom-response",
      value: EstimateSuperfluidDelegatedAmountByValidatorDenomResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: EstimateSuperfluidDelegatedAmountByValidatorDenomResponseProtoMsg, useInterfaces: boolean = false): EstimateSuperfluidDelegatedAmountByValidatorDenomResponse {
    return EstimateSuperfluidDelegatedAmountByValidatorDenomResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: EstimateSuperfluidDelegatedAmountByValidatorDenomResponse): Uint8Array {
    return EstimateSuperfluidDelegatedAmountByValidatorDenomResponse.encode(message).finish();
  },
  toProtoMsg(message: EstimateSuperfluidDelegatedAmountByValidatorDenomResponse): EstimateSuperfluidDelegatedAmountByValidatorDenomResponseProtoMsg {
    return {
      typeUrl: "/osmosis.superfluid.EstimateSuperfluidDelegatedAmountByValidatorDenomResponse",
      value: EstimateSuperfluidDelegatedAmountByValidatorDenomResponse.encode(message).finish()
    };
  }
};
function createBaseQueryTotalDelegationByDelegatorRequest(): QueryTotalDelegationByDelegatorRequest {
  return {
    delegatorAddress: ""
  };
}
export const QueryTotalDelegationByDelegatorRequest = {
  typeUrl: "/osmosis.superfluid.QueryTotalDelegationByDelegatorRequest",
  encode(message: QueryTotalDelegationByDelegatorRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.delegatorAddress !== "") {
      writer.uint32(10).string(message.delegatorAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryTotalDelegationByDelegatorRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTotalDelegationByDelegatorRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegatorAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryTotalDelegationByDelegatorRequest>): QueryTotalDelegationByDelegatorRequest {
    const message = createBaseQueryTotalDelegationByDelegatorRequest();
    message.delegatorAddress = object.delegatorAddress ?? "";
    return message;
  },
  fromAmino(object: QueryTotalDelegationByDelegatorRequestAmino): QueryTotalDelegationByDelegatorRequest {
    const message = createBaseQueryTotalDelegationByDelegatorRequest();
    if (object.delegator_address !== undefined && object.delegator_address !== null) {
      message.delegatorAddress = object.delegator_address;
    }
    return message;
  },
  toAmino(message: QueryTotalDelegationByDelegatorRequest, useInterfaces: boolean = false): QueryTotalDelegationByDelegatorRequestAmino {
    const obj: any = {};
    obj.delegator_address = message.delegatorAddress;
    return obj;
  },
  fromAminoMsg(object: QueryTotalDelegationByDelegatorRequestAminoMsg): QueryTotalDelegationByDelegatorRequest {
    return QueryTotalDelegationByDelegatorRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryTotalDelegationByDelegatorRequest, useInterfaces: boolean = false): QueryTotalDelegationByDelegatorRequestAminoMsg {
    return {
      type: "osmosis/query-total-delegation-by-delegator-request",
      value: QueryTotalDelegationByDelegatorRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryTotalDelegationByDelegatorRequestProtoMsg, useInterfaces: boolean = false): QueryTotalDelegationByDelegatorRequest {
    return QueryTotalDelegationByDelegatorRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryTotalDelegationByDelegatorRequest): Uint8Array {
    return QueryTotalDelegationByDelegatorRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryTotalDelegationByDelegatorRequest): QueryTotalDelegationByDelegatorRequestProtoMsg {
    return {
      typeUrl: "/osmosis.superfluid.QueryTotalDelegationByDelegatorRequest",
      value: QueryTotalDelegationByDelegatorRequest.encode(message).finish()
    };
  }
};
function createBaseQueryTotalDelegationByDelegatorResponse(): QueryTotalDelegationByDelegatorResponse {
  return {
    superfluidDelegationRecords: [],
    delegationResponse: [],
    totalDelegatedCoins: [],
    totalEquivalentStakedAmount: Coin.fromPartial({})
  };
}
export const QueryTotalDelegationByDelegatorResponse = {
  typeUrl: "/osmosis.superfluid.QueryTotalDelegationByDelegatorResponse",
  encode(message: QueryTotalDelegationByDelegatorResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.superfluidDelegationRecords) {
      SuperfluidDelegationRecord.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.delegationResponse) {
      DelegationResponse.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.totalDelegatedCoins) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.totalEquivalentStakedAmount !== undefined) {
      Coin.encode(message.totalEquivalentStakedAmount, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryTotalDelegationByDelegatorResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTotalDelegationByDelegatorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.superfluidDelegationRecords.push(SuperfluidDelegationRecord.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
          message.delegationResponse.push(DelegationResponse.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 3:
          message.totalDelegatedCoins.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 4:
          message.totalEquivalentStakedAmount = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryTotalDelegationByDelegatorResponse>): QueryTotalDelegationByDelegatorResponse {
    const message = createBaseQueryTotalDelegationByDelegatorResponse();
    message.superfluidDelegationRecords = object.superfluidDelegationRecords?.map(e => SuperfluidDelegationRecord.fromPartial(e)) || [];
    message.delegationResponse = object.delegationResponse?.map(e => DelegationResponse.fromPartial(e)) || [];
    message.totalDelegatedCoins = object.totalDelegatedCoins?.map(e => Coin.fromPartial(e)) || [];
    message.totalEquivalentStakedAmount = object.totalEquivalentStakedAmount !== undefined && object.totalEquivalentStakedAmount !== null ? Coin.fromPartial(object.totalEquivalentStakedAmount) : undefined;
    return message;
  },
  fromAmino(object: QueryTotalDelegationByDelegatorResponseAmino): QueryTotalDelegationByDelegatorResponse {
    const message = createBaseQueryTotalDelegationByDelegatorResponse();
    message.superfluidDelegationRecords = object.superfluid_delegation_records?.map(e => SuperfluidDelegationRecord.fromAmino(e)) || [];
    message.delegationResponse = object.delegation_response?.map(e => DelegationResponse.fromAmino(e)) || [];
    message.totalDelegatedCoins = object.total_delegated_coins?.map(e => Coin.fromAmino(e)) || [];
    if (object.total_equivalent_staked_amount !== undefined && object.total_equivalent_staked_amount !== null) {
      message.totalEquivalentStakedAmount = Coin.fromAmino(object.total_equivalent_staked_amount);
    }
    return message;
  },
  toAmino(message: QueryTotalDelegationByDelegatorResponse, useInterfaces: boolean = false): QueryTotalDelegationByDelegatorResponseAmino {
    const obj: any = {};
    if (message.superfluidDelegationRecords) {
      obj.superfluid_delegation_records = message.superfluidDelegationRecords.map(e => e ? SuperfluidDelegationRecord.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.superfluid_delegation_records = [];
    }
    if (message.delegationResponse) {
      obj.delegation_response = message.delegationResponse.map(e => e ? DelegationResponse.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.delegation_response = [];
    }
    if (message.totalDelegatedCoins) {
      obj.total_delegated_coins = message.totalDelegatedCoins.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.total_delegated_coins = [];
    }
    obj.total_equivalent_staked_amount = message.totalEquivalentStakedAmount ? Coin.toAmino(message.totalEquivalentStakedAmount, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryTotalDelegationByDelegatorResponseAminoMsg): QueryTotalDelegationByDelegatorResponse {
    return QueryTotalDelegationByDelegatorResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryTotalDelegationByDelegatorResponse, useInterfaces: boolean = false): QueryTotalDelegationByDelegatorResponseAminoMsg {
    return {
      type: "osmosis/query-total-delegation-by-delegator-response",
      value: QueryTotalDelegationByDelegatorResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryTotalDelegationByDelegatorResponseProtoMsg, useInterfaces: boolean = false): QueryTotalDelegationByDelegatorResponse {
    return QueryTotalDelegationByDelegatorResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryTotalDelegationByDelegatorResponse): Uint8Array {
    return QueryTotalDelegationByDelegatorResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryTotalDelegationByDelegatorResponse): QueryTotalDelegationByDelegatorResponseProtoMsg {
    return {
      typeUrl: "/osmosis.superfluid.QueryTotalDelegationByDelegatorResponse",
      value: QueryTotalDelegationByDelegatorResponse.encode(message).finish()
    };
  }
};
function createBaseQueryUnpoolWhitelistRequest(): QueryUnpoolWhitelistRequest {
  return {};
}
export const QueryUnpoolWhitelistRequest = {
  typeUrl: "/osmosis.superfluid.QueryUnpoolWhitelistRequest",
  encode(_: QueryUnpoolWhitelistRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryUnpoolWhitelistRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUnpoolWhitelistRequest();
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
  fromPartial(_: Partial<QueryUnpoolWhitelistRequest>): QueryUnpoolWhitelistRequest {
    const message = createBaseQueryUnpoolWhitelistRequest();
    return message;
  },
  fromAmino(_: QueryUnpoolWhitelistRequestAmino): QueryUnpoolWhitelistRequest {
    const message = createBaseQueryUnpoolWhitelistRequest();
    return message;
  },
  toAmino(_: QueryUnpoolWhitelistRequest, useInterfaces: boolean = false): QueryUnpoolWhitelistRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryUnpoolWhitelistRequestAminoMsg): QueryUnpoolWhitelistRequest {
    return QueryUnpoolWhitelistRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryUnpoolWhitelistRequest, useInterfaces: boolean = false): QueryUnpoolWhitelistRequestAminoMsg {
    return {
      type: "osmosis/query-unpool-whitelist-request",
      value: QueryUnpoolWhitelistRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryUnpoolWhitelistRequestProtoMsg, useInterfaces: boolean = false): QueryUnpoolWhitelistRequest {
    return QueryUnpoolWhitelistRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryUnpoolWhitelistRequest): Uint8Array {
    return QueryUnpoolWhitelistRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryUnpoolWhitelistRequest): QueryUnpoolWhitelistRequestProtoMsg {
    return {
      typeUrl: "/osmosis.superfluid.QueryUnpoolWhitelistRequest",
      value: QueryUnpoolWhitelistRequest.encode(message).finish()
    };
  }
};
function createBaseQueryUnpoolWhitelistResponse(): QueryUnpoolWhitelistResponse {
  return {
    poolIds: []
  };
}
export const QueryUnpoolWhitelistResponse = {
  typeUrl: "/osmosis.superfluid.QueryUnpoolWhitelistResponse",
  encode(message: QueryUnpoolWhitelistResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    writer.uint32(10).fork();
    for (const v of message.poolIds) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): QueryUnpoolWhitelistResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUnpoolWhitelistResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.poolIds.push(reader.uint64());
            }
          } else {
            message.poolIds.push(reader.uint64());
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryUnpoolWhitelistResponse>): QueryUnpoolWhitelistResponse {
    const message = createBaseQueryUnpoolWhitelistResponse();
    message.poolIds = object.poolIds?.map(e => BigInt(e.toString())) || [];
    return message;
  },
  fromAmino(object: QueryUnpoolWhitelistResponseAmino): QueryUnpoolWhitelistResponse {
    const message = createBaseQueryUnpoolWhitelistResponse();
    message.poolIds = object.pool_ids?.map(e => BigInt(e)) || [];
    return message;
  },
  toAmino(message: QueryUnpoolWhitelistResponse, useInterfaces: boolean = false): QueryUnpoolWhitelistResponseAmino {
    const obj: any = {};
    if (message.poolIds) {
      obj.pool_ids = message.poolIds.map(e => e.toString());
    } else {
      obj.pool_ids = [];
    }
    return obj;
  },
  fromAminoMsg(object: QueryUnpoolWhitelistResponseAminoMsg): QueryUnpoolWhitelistResponse {
    return QueryUnpoolWhitelistResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryUnpoolWhitelistResponse, useInterfaces: boolean = false): QueryUnpoolWhitelistResponseAminoMsg {
    return {
      type: "osmosis/query-unpool-whitelist-response",
      value: QueryUnpoolWhitelistResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: QueryUnpoolWhitelistResponseProtoMsg, useInterfaces: boolean = false): QueryUnpoolWhitelistResponse {
    return QueryUnpoolWhitelistResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: QueryUnpoolWhitelistResponse): Uint8Array {
    return QueryUnpoolWhitelistResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryUnpoolWhitelistResponse): QueryUnpoolWhitelistResponseProtoMsg {
    return {
      typeUrl: "/osmosis.superfluid.QueryUnpoolWhitelistResponse",
      value: QueryUnpoolWhitelistResponse.encode(message).finish()
    };
  }
};
function createBaseUserConcentratedSuperfluidPositionsDelegatedRequest(): UserConcentratedSuperfluidPositionsDelegatedRequest {
  return {
    delegatorAddress: ""
  };
}
export const UserConcentratedSuperfluidPositionsDelegatedRequest = {
  typeUrl: "/osmosis.superfluid.UserConcentratedSuperfluidPositionsDelegatedRequest",
  encode(message: UserConcentratedSuperfluidPositionsDelegatedRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.delegatorAddress !== "") {
      writer.uint32(10).string(message.delegatorAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): UserConcentratedSuperfluidPositionsDelegatedRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserConcentratedSuperfluidPositionsDelegatedRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegatorAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<UserConcentratedSuperfluidPositionsDelegatedRequest>): UserConcentratedSuperfluidPositionsDelegatedRequest {
    const message = createBaseUserConcentratedSuperfluidPositionsDelegatedRequest();
    message.delegatorAddress = object.delegatorAddress ?? "";
    return message;
  },
  fromAmino(object: UserConcentratedSuperfluidPositionsDelegatedRequestAmino): UserConcentratedSuperfluidPositionsDelegatedRequest {
    const message = createBaseUserConcentratedSuperfluidPositionsDelegatedRequest();
    if (object.delegator_address !== undefined && object.delegator_address !== null) {
      message.delegatorAddress = object.delegator_address;
    }
    return message;
  },
  toAmino(message: UserConcentratedSuperfluidPositionsDelegatedRequest, useInterfaces: boolean = false): UserConcentratedSuperfluidPositionsDelegatedRequestAmino {
    const obj: any = {};
    obj.delegator_address = message.delegatorAddress;
    return obj;
  },
  fromAminoMsg(object: UserConcentratedSuperfluidPositionsDelegatedRequestAminoMsg): UserConcentratedSuperfluidPositionsDelegatedRequest {
    return UserConcentratedSuperfluidPositionsDelegatedRequest.fromAmino(object.value);
  },
  toAminoMsg(message: UserConcentratedSuperfluidPositionsDelegatedRequest, useInterfaces: boolean = false): UserConcentratedSuperfluidPositionsDelegatedRequestAminoMsg {
    return {
      type: "osmosis/user-concentrated-superfluid-positions-delegated-request",
      value: UserConcentratedSuperfluidPositionsDelegatedRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: UserConcentratedSuperfluidPositionsDelegatedRequestProtoMsg, useInterfaces: boolean = false): UserConcentratedSuperfluidPositionsDelegatedRequest {
    return UserConcentratedSuperfluidPositionsDelegatedRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: UserConcentratedSuperfluidPositionsDelegatedRequest): Uint8Array {
    return UserConcentratedSuperfluidPositionsDelegatedRequest.encode(message).finish();
  },
  toProtoMsg(message: UserConcentratedSuperfluidPositionsDelegatedRequest): UserConcentratedSuperfluidPositionsDelegatedRequestProtoMsg {
    return {
      typeUrl: "/osmosis.superfluid.UserConcentratedSuperfluidPositionsDelegatedRequest",
      value: UserConcentratedSuperfluidPositionsDelegatedRequest.encode(message).finish()
    };
  }
};
function createBaseUserConcentratedSuperfluidPositionsDelegatedResponse(): UserConcentratedSuperfluidPositionsDelegatedResponse {
  return {
    clPoolUserPositionRecords: []
  };
}
export const UserConcentratedSuperfluidPositionsDelegatedResponse = {
  typeUrl: "/osmosis.superfluid.UserConcentratedSuperfluidPositionsDelegatedResponse",
  encode(message: UserConcentratedSuperfluidPositionsDelegatedResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.clPoolUserPositionRecords) {
      ConcentratedPoolUserPositionRecord.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): UserConcentratedSuperfluidPositionsDelegatedResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserConcentratedSuperfluidPositionsDelegatedResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clPoolUserPositionRecords.push(ConcentratedPoolUserPositionRecord.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<UserConcentratedSuperfluidPositionsDelegatedResponse>): UserConcentratedSuperfluidPositionsDelegatedResponse {
    const message = createBaseUserConcentratedSuperfluidPositionsDelegatedResponse();
    message.clPoolUserPositionRecords = object.clPoolUserPositionRecords?.map(e => ConcentratedPoolUserPositionRecord.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: UserConcentratedSuperfluidPositionsDelegatedResponseAmino): UserConcentratedSuperfluidPositionsDelegatedResponse {
    const message = createBaseUserConcentratedSuperfluidPositionsDelegatedResponse();
    message.clPoolUserPositionRecords = object.cl_pool_user_position_records?.map(e => ConcentratedPoolUserPositionRecord.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: UserConcentratedSuperfluidPositionsDelegatedResponse, useInterfaces: boolean = false): UserConcentratedSuperfluidPositionsDelegatedResponseAmino {
    const obj: any = {};
    if (message.clPoolUserPositionRecords) {
      obj.cl_pool_user_position_records = message.clPoolUserPositionRecords.map(e => e ? ConcentratedPoolUserPositionRecord.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.cl_pool_user_position_records = [];
    }
    return obj;
  },
  fromAminoMsg(object: UserConcentratedSuperfluidPositionsDelegatedResponseAminoMsg): UserConcentratedSuperfluidPositionsDelegatedResponse {
    return UserConcentratedSuperfluidPositionsDelegatedResponse.fromAmino(object.value);
  },
  toAminoMsg(message: UserConcentratedSuperfluidPositionsDelegatedResponse, useInterfaces: boolean = false): UserConcentratedSuperfluidPositionsDelegatedResponseAminoMsg {
    return {
      type: "osmosis/user-concentrated-superfluid-positions-delegated-response",
      value: UserConcentratedSuperfluidPositionsDelegatedResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: UserConcentratedSuperfluidPositionsDelegatedResponseProtoMsg, useInterfaces: boolean = false): UserConcentratedSuperfluidPositionsDelegatedResponse {
    return UserConcentratedSuperfluidPositionsDelegatedResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: UserConcentratedSuperfluidPositionsDelegatedResponse): Uint8Array {
    return UserConcentratedSuperfluidPositionsDelegatedResponse.encode(message).finish();
  },
  toProtoMsg(message: UserConcentratedSuperfluidPositionsDelegatedResponse): UserConcentratedSuperfluidPositionsDelegatedResponseProtoMsg {
    return {
      typeUrl: "/osmosis.superfluid.UserConcentratedSuperfluidPositionsDelegatedResponse",
      value: UserConcentratedSuperfluidPositionsDelegatedResponse.encode(message).finish()
    };
  }
};
function createBaseUserConcentratedSuperfluidPositionsUndelegatingRequest(): UserConcentratedSuperfluidPositionsUndelegatingRequest {
  return {
    delegatorAddress: ""
  };
}
export const UserConcentratedSuperfluidPositionsUndelegatingRequest = {
  typeUrl: "/osmosis.superfluid.UserConcentratedSuperfluidPositionsUndelegatingRequest",
  encode(message: UserConcentratedSuperfluidPositionsUndelegatingRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.delegatorAddress !== "") {
      writer.uint32(10).string(message.delegatorAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): UserConcentratedSuperfluidPositionsUndelegatingRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserConcentratedSuperfluidPositionsUndelegatingRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegatorAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<UserConcentratedSuperfluidPositionsUndelegatingRequest>): UserConcentratedSuperfluidPositionsUndelegatingRequest {
    const message = createBaseUserConcentratedSuperfluidPositionsUndelegatingRequest();
    message.delegatorAddress = object.delegatorAddress ?? "";
    return message;
  },
  fromAmino(object: UserConcentratedSuperfluidPositionsUndelegatingRequestAmino): UserConcentratedSuperfluidPositionsUndelegatingRequest {
    const message = createBaseUserConcentratedSuperfluidPositionsUndelegatingRequest();
    if (object.delegator_address !== undefined && object.delegator_address !== null) {
      message.delegatorAddress = object.delegator_address;
    }
    return message;
  },
  toAmino(message: UserConcentratedSuperfluidPositionsUndelegatingRequest, useInterfaces: boolean = false): UserConcentratedSuperfluidPositionsUndelegatingRequestAmino {
    const obj: any = {};
    obj.delegator_address = message.delegatorAddress;
    return obj;
  },
  fromAminoMsg(object: UserConcentratedSuperfluidPositionsUndelegatingRequestAminoMsg): UserConcentratedSuperfluidPositionsUndelegatingRequest {
    return UserConcentratedSuperfluidPositionsUndelegatingRequest.fromAmino(object.value);
  },
  toAminoMsg(message: UserConcentratedSuperfluidPositionsUndelegatingRequest, useInterfaces: boolean = false): UserConcentratedSuperfluidPositionsUndelegatingRequestAminoMsg {
    return {
      type: "osmosis/user-concentrated-superfluid-positions-undelegating-request",
      value: UserConcentratedSuperfluidPositionsUndelegatingRequest.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: UserConcentratedSuperfluidPositionsUndelegatingRequestProtoMsg, useInterfaces: boolean = false): UserConcentratedSuperfluidPositionsUndelegatingRequest {
    return UserConcentratedSuperfluidPositionsUndelegatingRequest.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: UserConcentratedSuperfluidPositionsUndelegatingRequest): Uint8Array {
    return UserConcentratedSuperfluidPositionsUndelegatingRequest.encode(message).finish();
  },
  toProtoMsg(message: UserConcentratedSuperfluidPositionsUndelegatingRequest): UserConcentratedSuperfluidPositionsUndelegatingRequestProtoMsg {
    return {
      typeUrl: "/osmosis.superfluid.UserConcentratedSuperfluidPositionsUndelegatingRequest",
      value: UserConcentratedSuperfluidPositionsUndelegatingRequest.encode(message).finish()
    };
  }
};
function createBaseUserConcentratedSuperfluidPositionsUndelegatingResponse(): UserConcentratedSuperfluidPositionsUndelegatingResponse {
  return {
    clPoolUserPositionRecords: []
  };
}
export const UserConcentratedSuperfluidPositionsUndelegatingResponse = {
  typeUrl: "/osmosis.superfluid.UserConcentratedSuperfluidPositionsUndelegatingResponse",
  encode(message: UserConcentratedSuperfluidPositionsUndelegatingResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.clPoolUserPositionRecords) {
      ConcentratedPoolUserPositionRecord.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): UserConcentratedSuperfluidPositionsUndelegatingResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserConcentratedSuperfluidPositionsUndelegatingResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clPoolUserPositionRecords.push(ConcentratedPoolUserPositionRecord.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<UserConcentratedSuperfluidPositionsUndelegatingResponse>): UserConcentratedSuperfluidPositionsUndelegatingResponse {
    const message = createBaseUserConcentratedSuperfluidPositionsUndelegatingResponse();
    message.clPoolUserPositionRecords = object.clPoolUserPositionRecords?.map(e => ConcentratedPoolUserPositionRecord.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: UserConcentratedSuperfluidPositionsUndelegatingResponseAmino): UserConcentratedSuperfluidPositionsUndelegatingResponse {
    const message = createBaseUserConcentratedSuperfluidPositionsUndelegatingResponse();
    message.clPoolUserPositionRecords = object.cl_pool_user_position_records?.map(e => ConcentratedPoolUserPositionRecord.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: UserConcentratedSuperfluidPositionsUndelegatingResponse, useInterfaces: boolean = false): UserConcentratedSuperfluidPositionsUndelegatingResponseAmino {
    const obj: any = {};
    if (message.clPoolUserPositionRecords) {
      obj.cl_pool_user_position_records = message.clPoolUserPositionRecords.map(e => e ? ConcentratedPoolUserPositionRecord.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.cl_pool_user_position_records = [];
    }
    return obj;
  },
  fromAminoMsg(object: UserConcentratedSuperfluidPositionsUndelegatingResponseAminoMsg): UserConcentratedSuperfluidPositionsUndelegatingResponse {
    return UserConcentratedSuperfluidPositionsUndelegatingResponse.fromAmino(object.value);
  },
  toAminoMsg(message: UserConcentratedSuperfluidPositionsUndelegatingResponse, useInterfaces: boolean = false): UserConcentratedSuperfluidPositionsUndelegatingResponseAminoMsg {
    return {
      type: "osmosis/user-concentrated-superfluid-positions-undelegating-response",
      value: UserConcentratedSuperfluidPositionsUndelegatingResponse.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: UserConcentratedSuperfluidPositionsUndelegatingResponseProtoMsg, useInterfaces: boolean = false): UserConcentratedSuperfluidPositionsUndelegatingResponse {
    return UserConcentratedSuperfluidPositionsUndelegatingResponse.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: UserConcentratedSuperfluidPositionsUndelegatingResponse): Uint8Array {
    return UserConcentratedSuperfluidPositionsUndelegatingResponse.encode(message).finish();
  },
  toProtoMsg(message: UserConcentratedSuperfluidPositionsUndelegatingResponse): UserConcentratedSuperfluidPositionsUndelegatingResponseProtoMsg {
    return {
      typeUrl: "/osmosis.superfluid.UserConcentratedSuperfluidPositionsUndelegatingResponse",
      value: UserConcentratedSuperfluidPositionsUndelegatingResponse.encode(message).finish()
    };
  }
};