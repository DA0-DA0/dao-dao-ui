import {
  ChainId,
  ContractVersion,
  DaoCreationGetInstantiateInfo,
  PercentOrMajorityValue,
} from '@dao-dao/types'
import { InstantiateMsg as CwPreProposeMultipleInstantiateMsg } from '@dao-dao/types/contracts/DaoPreProposeMultiple'
import {
  InstantiateMsg as CwProposalMultipleInstantiateMsg,
  PercentageThreshold,
} from '@dao-dao/types/contracts/DaoProposalMultiple'
import {
  DaoProposalMultipleAdapterId,
  convertDenomToMicroDenomWithDecimals,
  convertDurationWithUnitsToDuration,
  encodeMessageAsBase64,
} from '@dao-dao/utils'
import { makeValidateMsg } from '@dao-dao/utils/validation/makeValidateMsg'

import { DaoCreationExtraVotingConfig } from '../types'
import instantiateSchema from './instantiate_schema.json'
import preProposeInstantiateSchema from './pre_propose_instantiate_schema.json'

export const getInstantiateInfo: DaoCreationGetInstantiateInfo<
  DaoCreationExtraVotingConfig
> = (
  { codeIds, historicalCodeIds },
  {
    chainId,
    name,
    votingConfig: {
      quorum,
      votingDuration,
      proposalDeposit,
      anyoneCanPropose,
      allowRevoting,
    },
  },
  { moduleInstantiateFundsUnsupported },
  t
) => {
  const decimals = proposalDeposit.token?.decimals ?? 0

  const preProposeMultipleInstantiateMsg: CwPreProposeMultipleInstantiateMsg = {
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
                            native: proposalDeposit.denomOrAddress,
                          }
                        : // proposalDeposit.type === 'cw20'
                          {
                            cw20: proposalDeposit.denomOrAddress,
                          },
                  },
                },
          refund_policy: proposalDeposit.refundPolicy,
        }
      : null,
    extension: {},
    open_proposal_submission: anyoneCanPropose,
  }

  // Validate and throw error if invalid according to JSON schema.
  makeValidateMsg<CwPreProposeMultipleInstantiateMsg>(
    preProposeInstantiateSchema,
    t
  )(preProposeMultipleInstantiateMsg)

  const codeIdsToUse = {
    ...codeIds,
    // If module instantiation funds are unsupported, use the v2.1.0 contracts
    // which are the last ones that did not support funds.
    ...(moduleInstantiateFundsUnsupported &&
      historicalCodeIds?.[ContractVersion.V210]),
  }

  const msg: CwProposalMultipleInstantiateMsg = {
    allow_revoting: allowRevoting,
    close_proposal_on_execution_failure: true,
    max_voting_period: convertDurationWithUnitsToDuration(votingDuration),
    min_voting_period: null,
    only_members_execute: true,
    pre_propose_info: {
      module_may_propose: {
        info: {
          admin: { core_module: {} },
          code_id: codeIdsToUse.DaoPreProposeMultiple,
          label: `DAO_${name.trim()}_pre-propose-${DaoProposalMultipleAdapterId}`,
          msg: encodeMessageAsBase64(preProposeMultipleInstantiateMsg),
          // TODO(neutron-2.3.0): add back in here and in instantiate schema.
          ...(chainId !== ChainId.NeutronMainnet &&
            !moduleInstantiateFundsUnsupported && {
              funds: [],
            }),
        },
      },
    },
    voting_strategy: {
      single_choice: {
        quorum: convertPercentOrMajorityValueToPercentageThreshold(quorum),
      },
    },
  }

  // Validate and throw error if invalid according to JSON schema.
  makeValidateMsg<CwProposalMultipleInstantiateMsg>(instantiateSchema, t)(msg)

  return {
    admin: { core_module: {} },
    code_id: codeIdsToUse.DaoProposalMultiple,
    label: `DAO_${name.trim()}_${DaoProposalMultipleAdapterId}`,
    msg: encodeMessageAsBase64(msg),
    // TODO(neutron-2.3.0): add back in here and in instantiate schema.
    ...(chainId !== ChainId.NeutronMainnet &&
      !moduleInstantiateFundsUnsupported && {
        funds: [],
      }),
  }
}

const convertPercentOrMajorityValueToPercentageThreshold = ({
  majority,
  value,
}: PercentOrMajorityValue): PercentageThreshold =>
  majority ? { majority: {} } : { percent: (value / 100).toFixed(2) }
