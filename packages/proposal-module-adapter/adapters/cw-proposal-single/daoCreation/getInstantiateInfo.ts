import { Buffer } from 'buffer'

import { DaoCreationGetInstantiateInfo } from '@dao-dao/tstypes'
import { InstantiateMsg as CwPreProposeSingleInstantiateMsg } from '@dao-dao/tstypes/contracts/CwPreProposeSingle'
import { InstantiateMsg as CwProposalSingleInstantiateMsg } from '@dao-dao/tstypes/contracts/CwProposalSingle.v2'
import {
  CWPREPROPOSESINGLE_CODE_ID,
  CWPROPOSALSINGLE_CODE_ID,
  NATIVE_DENOM,
  NEW_DAO_CW20_DECIMALS,
  convertDenomToMicroDenomWithDecimals,
  convertDurationWithUnitsToDuration,
  nativeTokenDecimals,
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
  const cw20StakedBalanceVotingAdapterData =
    votingModuleAdapter.data as Cw20StakedBalanceVotingConfig

  const cw20GovernanceTokenDecimals = isCw20StakedBalanceVotingAdapter
    ? cw20StakedBalanceVotingAdapterData.tokenType === GovernanceTokenType.New
      ? NEW_DAO_CW20_DECIMALS
      : cw20StakedBalanceVotingAdapterData.existingGovernanceTokenInfo?.decimals
    : undefined

  const decimals =
    proposalDeposit.type === 'native'
      ? nativeTokenDecimals(NATIVE_DENOM) ?? 0
      : proposalDeposit.type === 'voting_module_token'
      ? cw20GovernanceTokenDecimals ?? 0
      : // type === 'cw20'
        proposalDeposit.cw20TokenInfo?.decimals ?? 0

  const preProposeSingleInstantiateMsg: CwPreProposeSingleInstantiateMsg = {
    deposit_info: proposalDeposit.enabled
      ? {
          amount: convertDenomToMicroDenomWithDecimals(
            proposalDeposit.amount,
            decimals
          ).toString(),
          denom:
            proposalDeposit.type === 'voting_module_token'
              ? {
                  voting_module_token: {},
                }
              : {
                  token: {
                    denom:
                      proposalDeposit.type === 'native'
                        ? {
                            native: NATIVE_DENOM,
                          }
                        : // proposalDeposit.type === 'cw20'
                          {
                            cw20: proposalDeposit.cw20Address,
                          },
                  },
                },
          refund_policy: proposalDeposit.refundPolicy,
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
