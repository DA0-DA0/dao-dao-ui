import { DaoCreationGetInstantiateInfo } from '@dao-dao/types'
import {
  convertDenomToMicroDenomStringWithDecimals,
  convertDurationWithUnitsToDuration,
  convertVetoConfigToCosmos,
  isSecretNetwork,
} from '@dao-dao/utils'

import { MultipleChoiceProposalModule } from '../../../../clients/proposal-module/MultipleChoiceProposalModule'
import { SecretMultipleChoiceProposalModule } from '../../../../clients/proposal-module/MultipleChoiceProposalModule.secret'
import { DaoCreationExtraVotingConfig } from '../types'
import { convertPercentOrMajorityValueToPercentageThreshold } from '../utils'

export const getInstantiateInfo: DaoCreationGetInstantiateInfo<
  DaoCreationExtraVotingConfig
> = (
  { chainId, createWithCw20 },
  {
    votingConfig: {
      quorum,
      votingDuration,
      proposalDeposit,
      anyoneCanPropose,
      onlyMembersExecute,
      allowRevoting,
      veto,
    },
  },
  { overrideContractVersion }
) => {
  const commonConfig = {
    quorum: convertPercentOrMajorityValueToPercentageThreshold(quorum),
    maxVotingPeriod: convertDurationWithUnitsToDuration(votingDuration),
    allowRevoting,
    veto: convertVetoConfigToCosmos(veto),
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

    return SecretMultipleChoiceProposalModule.generateModuleInstantiateInfo(
      chainId,
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
    return MultipleChoiceProposalModule.generateModuleInstantiateInfo(
      chainId,
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
      },
      {
        overrideContractVersion,
      }
    )
  }
}
