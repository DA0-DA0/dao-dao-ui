import { Buffer } from 'buffer'

import { InstantiateMsg } from '@dao-dao/state/clients/cw-proposal-single'
import { DaoCreationGetInstantiateInfo } from '@dao-dao/tstypes'
import {
  CWPROPOSALSINGLE_CODE_ID,
  CWPROPOSALSINGLE_CONTRACT_NAME,
  NEW_DAO_CW20_DECIMALS,
  convertDenomToMicroDenomWithDecimals,
  convertDurationWithUnitsToDuration,
} from '@dao-dao/utils'
import { makeValidateMsg } from '@dao-dao/utils/validation/makeValidateMsg'
import { Cw20StakedBalanceVotingAdapter } from '@dao-dao/voting-module-adapter/adapters/cw20-staked-balance-voting'
import {
  DaoCreationConfig as Cw20StakedBalanceVotingConfig,
  GovernanceTokenType,
} from '@dao-dao/voting-module-adapter/adapters/cw20-staked-balance-voting/types'

import { DaoCreationConfig } from '../types'
import { convertThresholdValueToPercentageThreshold } from '../utils'
import instantiateSchema from './instantiate_schema.json'

export const getInstantiateInfo: DaoCreationGetInstantiateInfo<
  DaoCreationConfig
> = (
  { name, votingModuleAdapter },
  {
    threshold,
    quorumEnabled,
    quorum,
    votingDuration,
    proposalDeposit,
    allowRevoting,
  },
  t
) => {
  const isCw20StakedBalanceVotingAdapter =
    votingModuleAdapter.id === Cw20StakedBalanceVotingAdapter.id
  // Only usable if the above is true.
  const cw20StakedBalanceVotingAdapterData =
    votingModuleAdapter.data as Cw20StakedBalanceVotingConfig
  const canSetDeposit =
    // Can only set deposit info if using governance token, which comes from
    // this adapter.
    isCw20StakedBalanceVotingAdapter &&
    typeof proposalDeposit?.amount === 'number' &&
    proposalDeposit.amount > 0

  // If making a deposit and an existing token is being used, ensure
  // existingGovernanceTokenInfo is set since we need to access its decimals.
  if (
    canSetDeposit &&
    cw20StakedBalanceVotingAdapterData.tokenType ===
      GovernanceTokenType.Existing &&
    !cw20StakedBalanceVotingAdapterData.existingGovernanceTokenInfo
  ) {
    throw new Error(t('errors.noGovTokenAddr'))
  }

  const msg: InstantiateMsg = {
    allow_revoting: allowRevoting,
    deposit_info: canSetDeposit
      ? {
          deposit: convertDenomToMicroDenomWithDecimals(
            proposalDeposit.amount,
            cw20StakedBalanceVotingAdapterData.tokenType ===
              GovernanceTokenType.New
              ? NEW_DAO_CW20_DECIMALS
              : // Validated above that this is set.
                cw20StakedBalanceVotingAdapterData.existingGovernanceTokenInfo!
                  .decimals
          ).toString(),
          refund_failed_proposals: proposalDeposit.refundFailed,
          token: { voting_module_token: {} },
        }
      : null,
    max_voting_period: convertDurationWithUnitsToDuration(votingDuration),
    only_members_execute: true,
    threshold: quorumEnabled
      ? {
          threshold_quorum: {
            quorum: convertThresholdValueToPercentageThreshold(quorum),
            threshold: convertThresholdValueToPercentageThreshold(threshold),
          },
        }
      : {
          absolute_percentage: {
            percentage: convertThresholdValueToPercentageThreshold(threshold),
          },
        },
  }

  // Validate and throw error if invalid according to JSON schema.
  makeValidateMsg<InstantiateMsg>(instantiateSchema, t)(msg)

  return {
    admin: { core_contract: {} },
    code_id: CWPROPOSALSINGLE_CODE_ID,
    label: `DAO_${name}_${CWPROPOSALSINGLE_CONTRACT_NAME}`,
    msg: Buffer.from(JSON.stringify(msg), 'utf8').toString('base64'),
  }
}
