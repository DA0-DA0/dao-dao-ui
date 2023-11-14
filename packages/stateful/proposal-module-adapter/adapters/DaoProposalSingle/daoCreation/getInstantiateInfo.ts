import {
  ChainId,
  DaoCreationGetInstantiateInfo,
  PercentOrMajorityValue,
} from '@dao-dao/types'
import { InstantiateMsg as DaoPreProposeApprovalSingleInstantiateMsg } from '@dao-dao/types/contracts/DaoPreProposeApprovalSingle'
import { InstantiateMsg as DaoPreProposeSingleInstantiateMsg } from '@dao-dao/types/contracts/DaoPreProposeSingle'
import { PercentageThreshold } from '@dao-dao/types/contracts/DaoProposalSingle.common'
import { InstantiateMsg as DaoProposalSingleInstantiateMsg } from '@dao-dao/types/contracts/DaoProposalSingle.v2'
import {
  DaoProposalSingleAdapterId,
  convertDenomToMicroDenomWithDecimals,
  convertDurationWithUnitsToDuration,
  encodeMessageAsBase64,
} from '@dao-dao/utils'
import { makeValidateMsg } from '@dao-dao/utils/validation/makeValidateMsg'

import { DaoCreationExtraVotingConfig } from '../types'
import instantiateSchema from './instantiate_schema.json'
import preProposeApprovalInstantiateSchema from './pre_propose_approval_instantiate_schema.json'
import preProposeInstantiateSchema from './pre_propose_instantiate_schema.json'

export const getInstantiateInfo: DaoCreationGetInstantiateInfo<
  DaoCreationExtraVotingConfig
> = (
  { codeIds },
  {
    chainId,
    name,
    votingConfig: {
      quorum,
      votingDuration,
      proposalDeposit,
      anyoneCanPropose,
      allowRevoting,
      approver,
    },
  },
  { threshold },
  t
) => {
  const decimals = proposalDeposit.token?.decimals ?? 0

  const preProposeInstantiateMsgCommon:
    | DaoPreProposeSingleInstantiateMsg
    | DaoPreProposeApprovalSingleInstantiateMsg = {
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

  const preProposeInstantiateMsg = approver.enabled
    ? ({
        ...preProposeInstantiateMsgCommon,
        extension: {
          approver: approver.address,
        },
      } as DaoPreProposeApprovalSingleInstantiateMsg)
    : (preProposeInstantiateMsgCommon as DaoPreProposeSingleInstantiateMsg)

  // Validate and throw error if invalid according to JSON schema.
  makeValidateMsg<any>(
    approver.enabled
      ? preProposeApprovalInstantiateSchema
      : preProposeInstantiateSchema,
    t
  )(preProposeInstantiateMsg)

  const msg: DaoProposalSingleInstantiateMsg = {
    allow_revoting: allowRevoting,
    close_proposal_on_execution_failure: true,
    max_voting_period: convertDurationWithUnitsToDuration(votingDuration),
    min_voting_period: null,
    only_members_execute: true,
    pre_propose_info: {
      module_may_propose: {
        info: {
          admin: { core_module: {} },
          code_id: approver.enabled
            ? codeIds.DaoPreProposeApprovalSingle
            : codeIds.DaoPreProposeSingle,
          label: `DAO_${name.trim()}_pre-propose${
            approver.enabled ? '-approval' : ''
          }_${DaoProposalSingleAdapterId}`,
          msg: encodeMessageAsBase64(preProposeInstantiateMsg),
          // TODO(neutron-2.3.0): add back in here and in instantiate schema.
          ...(chainId !== ChainId.NeutronMainnet && {
            funds: [],
          }),
        },
      },
    },
    threshold: {
      threshold_quorum: {
        quorum: convertPercentOrMajorityValueToPercentageThreshold(quorum),
        threshold:
          convertPercentOrMajorityValueToPercentageThreshold(threshold),
      },
    },
  }

  // Validate and throw error if invalid according to JSON schema.
  makeValidateMsg<DaoProposalSingleInstantiateMsg>(instantiateSchema, t)(msg)

  return {
    admin: { core_module: {} },
    code_id: codeIds.DaoProposalSingle,
    label: `DAO_${name.trim()}_${DaoProposalSingleAdapterId}`,
    msg: encodeMessageAsBase64(msg),
    // TODO(neutron-2.3.0): add back in here and in instantiate schema.
    ...(chainId !== ChainId.NeutronMainnet && {
      funds: [],
    }),
  }
}

const convertPercentOrMajorityValueToPercentageThreshold = ({
  majority,
  value,
}: PercentOrMajorityValue): PercentageThreshold =>
  majority ? { majority: {} } : { percent: (value / 100).toFixed(2) }
