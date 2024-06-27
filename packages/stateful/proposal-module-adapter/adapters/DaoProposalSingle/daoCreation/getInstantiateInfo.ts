import {
  DaoCreationGetInstantiateInfo,
  PercentOrMajorityValue,
} from '@dao-dao/types'
import { PercentageThreshold } from '@dao-dao/types/contracts/DaoProposalSingle.common'
import {
  convertDenomToMicroDenomStringWithDecimals,
  convertDurationWithUnitsToDuration,
  convertVetoConfigToCosmos,
  isSecretNetwork,
} from '@dao-dao/utils'

import { SingleChoiceProposalModule } from '../../../../clients/proposal-module/SingleChoiceProposalModule'
import { SecretSingleChoiceProposalModule } from '../../../../clients/proposal-module/SingleChoiceProposalModule.secret'
import { DaoCreationExtraVotingConfig } from '../types'

export const getInstantiateInfo: DaoCreationGetInstantiateInfo<
  DaoCreationExtraVotingConfig
> = (
  { chainId, createWithCw20 },
  {
    name,
    votingConfig: {
      quorum,
      votingDuration,
      proposalDeposit,
      anyoneCanPropose,
      onlyMembersExecute,
      allowRevoting,
      approver,
      veto,
    },
  },
  { quorumEnabled, threshold }
) => {
  const commonConfig = {
    threshold: quorumEnabled
      ? {
          threshold_quorum: {
            quorum: convertPercentOrMajorityValueToPercentageThreshold(quorum),
            threshold:
              convertPercentOrMajorityValueToPercentageThreshold(threshold),
          },
        }
      : {
          absolute_percentage: {
            percentage:
              convertPercentOrMajorityValueToPercentageThreshold(threshold),
          },
        },
    maxVotingPeriod: convertDurationWithUnitsToDuration(votingDuration),
    allowRevoting,
    veto: convertVetoConfigToCosmos(veto),
    approver: approver.enabled ? approver.address : undefined,
    submissionPolicy: anyoneCanPropose ? 'anyone' : 'members',
    onlyMembersExecute: onlyMembersExecute,
  } as const

  if (isSecretNetwork(chainId)) {
    if (
      proposalDeposit.enabled &&
      proposalDeposit.type === 'cw20' &&
      !proposalDeposit.token?.snip20CodeHash
    ) {
      throw new Error('SNIP20 proposal deposit token code hash not loaded')
    }

    return SecretSingleChoiceProposalModule.generateModuleInstantiateInfo(
      chainId,
      name,
      {
        ...commonConfig,
        deposit: proposalDeposit.enabled
          ? {
              amount: convertDenomToMicroDenomStringWithDecimals(
                proposalDeposit.amount,
                proposalDeposit.token?.decimals ?? 0
              ),
              denom:
                proposalDeposit.type === 'voting_module_token'
                  ? {
                      voting_module_token: {
                        token_type: createWithCw20 ? 'cw20' : 'native',
                      },
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
                                snip20: [
                                  proposalDeposit.denomOrAddress,
                                  // Type-checked above.
                                  proposalDeposit.token!.snip20CodeHash!,
                                ],
                              },
                      },
                    },
              refund_policy: proposalDeposit.refundPolicy,
            }
          : null,
      }
    )
  } else {
    return SingleChoiceProposalModule.generateModuleInstantiateInfo(
      chainId,
      name,
      {
        ...commonConfig,
        deposit: proposalDeposit.enabled
          ? {
              amount: convertDenomToMicroDenomStringWithDecimals(
                proposalDeposit.amount,
                proposalDeposit.token?.decimals ?? 0
              ),
              denom:
                proposalDeposit.type === 'voting_module_token'
                  ? {
                      voting_module_token: {
                        token_type: createWithCw20 ? 'cw20' : 'native',
                      },
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
      }
    )
  }
}

const convertPercentOrMajorityValueToPercentageThreshold = ({
  majority,
  value,
}: PercentOrMajorityValue): PercentageThreshold =>
  majority ? { majority: {} } : { percent: (value / 100).toFixed(2) }
