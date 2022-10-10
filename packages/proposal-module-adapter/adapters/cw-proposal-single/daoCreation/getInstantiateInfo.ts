import { Buffer } from 'buffer'

import { DaoCreationGetInstantiateInfo } from '@dao-dao/tstypes'
import { InstantiateMsg as CwPreProposeSingleInstantiateMsg } from '@dao-dao/tstypes/contracts/CwPreProposeSingle'
import { InstantiateMsg as CwProposalSingleInstantiateMsg } from '@dao-dao/tstypes/contracts/CwProposalSingle.v2'
import {
  CWPREPROPOSESINGLE_CODE_ID,
  CWPROPOSALSINGLE_CODE_ID,
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

import { CwProposalSingleAdapter } from '../../index'
import { DaoCreationConfig } from '../types'
import { convertThresholdValueToPercentageThreshold } from '../utils'
import instantiateSchema from './instantiate_schema.json'
import preProposeInstantiateSchema from './pre_propose_instantiate_schema.json'

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
    // the cw20-staked-balance-voting voting module adapter.
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

  const preProposeSingleInstantiateMsg: CwPreProposeSingleInstantiateMsg = {
    deposit_info: canSetDeposit
      ? {
          amount: convertDenomToMicroDenomWithDecimals(
            proposalDeposit.amount,
            cw20StakedBalanceVotingAdapterData.tokenType ===
              GovernanceTokenType.New
              ? NEW_DAO_CW20_DECIMALS
              : // Validated above that this is set.
                cw20StakedBalanceVotingAdapterData.existingGovernanceTokenInfo!
                  .decimals
          ).toString(),
          denom: {
            voting_module_token: {},
          },
          // TODO: Allow any refund policy by changing toggle to dropdown.
          refund_policy: proposalDeposit.refundFailed
            ? 'always'
            : 'only_passed',
        }
      : null,
    extension: {},
    // Only allow members with voting power to propose.
    open_proposal_submission: false,
  }

  // Validate and throw error if invalid according to JSON schema.
  makeValidateMsg<CwPreProposeSingleInstantiateMsg>(
    preProposeInstantiateSchema,
    t
  )(preProposeSingleInstantiateMsg)

  const msg: CwProposalSingleInstantiateMsg = {
    allow_revoting: allowRevoting,
    close_proposal_on_execution_failure: true,
    max_voting_period: convertDurationWithUnitsToDuration(votingDuration),
    min_voting_period: null,
    only_members_execute: true,
    pre_propose_info: {
      ModuleMayPropose: {
        info: {
          admin: { core_module: {} },
          code_id: CWPREPROPOSESINGLE_CODE_ID,
          label: `DAO_${name}_pre-propose-${CwProposalSingleAdapter.id}`,
          msg: Buffer.from(
            JSON.stringify(preProposeSingleInstantiateMsg),
            'utf8'
          ).toString('base64'),
        },
      },
    },
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
  makeValidateMsg<CwProposalSingleInstantiateMsg>(instantiateSchema, t)(msg)

  return {
    admin: { core_module: {} },
    code_id: CWPROPOSALSINGLE_CODE_ID,
    label: `DAO_${name}_${CwProposalSingleAdapter.id}`,
    msg: Buffer.from(JSON.stringify(msg), 'utf8').toString('base64'),
  }
}
