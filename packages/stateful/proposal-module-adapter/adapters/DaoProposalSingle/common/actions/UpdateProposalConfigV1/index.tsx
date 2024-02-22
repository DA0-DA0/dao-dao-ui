import { useCallback } from 'react'
import { constSelector } from 'recoil'

import { Cw20BaseSelectors, CwProposalSingleV1Selectors } from '@dao-dao/state'
import {
  BallotDepositEmoji,
  useCachedLoadingWithError,
} from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionKey,
  ActionMaker,
  ProposalModule,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types'
import { Threshold } from '@dao-dao/types/contracts/DaoProposalSingle.common'
import {
  DAO_PROPOSAL_SINGLE_CONTRACT_NAMES,
  convertDenomToMicroDenomWithDecimals,
  convertDurationToDurationWithUnits,
  convertDurationWithUnitsToDuration,
  convertMicroDenomToDenomWithDecimals,
  makeWasmMessage,
} from '@dao-dao/utils'

import { useMsgExecutesContract } from '../../../../../../actions'
import { useVotingModuleAdapter } from '../../../../../../voting-module-adapter'
import {
  UpdateProposalConfigComponent,
  UpdateProposalConfigData,
} from './UpdateProposalConfigComponent'

const thresholdToTQData = (
  source: Threshold
): Pick<
  UpdateProposalConfigData,
  | 'thresholdType'
  | 'thresholdPercentage'
  | 'quorumEnabled'
  | 'quorumType'
  | 'quorumPercentage'
> => {
  let thresholdType: UpdateProposalConfigData['thresholdType'] = 'majority'
  let thresholdPercentage: UpdateProposalConfigData['thresholdPercentage'] =
    undefined
  let quorumEnabled: boolean = true
  let quorumType: UpdateProposalConfigData['quorumType'] = '%'
  let quorumPercentage: UpdateProposalConfigData['quorumPercentage'] = 20

  if ('threshold_quorum' in source) {
    const { threshold, quorum } = source.threshold_quorum

    thresholdType = 'majority' in threshold ? 'majority' : '%'
    thresholdPercentage =
      'majority' in threshold ? undefined : Number(threshold.percent) * 100

    quorumType = 'majority' in quorum ? 'majority' : '%'
    quorumPercentage =
      'majority' in quorum ? undefined : Number(quorum.percent) * 100

    quorumEnabled = true
  } else if ('absolute_percentage' in source) {
    const { percentage } = source.absolute_percentage

    thresholdType = 'majority' in percentage ? 'majority' : '%'
    thresholdPercentage =
      'majority' in percentage ? undefined : Number(percentage.percent) * 100

    quorumEnabled = false
  }

  return {
    thresholdType,
    thresholdPercentage,
    quorumEnabled,
    quorumType,
    quorumPercentage,
  }
}

const typePercentageToPercentageThreshold = (
  t: 'majority' | '%',
  p: number | undefined
) => {
  if (t === 'majority') {
    return { majority: {} }
  } else {
    if (p === undefined) {
      throw new Error(
        'internal erorr: an undefined percent was configured with a non-majority threshold.'
      )
    }
    return {
      percent: (p / 100).toString(),
    }
  }
}

const Component: ActionComponent = (props) => {
  const {
    hooks: { useCommonGovernanceTokenInfo },
  } = useVotingModuleAdapter()
  const commonGovernanceTokenInfo = useCommonGovernanceTokenInfo?.()

  return (
    <UpdateProposalConfigComponent
      {...props}
      options={{ commonGovernanceTokenInfo }}
    />
  )
}

export const makeUpdateProposalConfigV1ActionMaker =
  ({
    address: proposalModuleAddress,
  }: ProposalModule): ActionMaker<UpdateProposalConfigData> =>
  ({ t, address, chain: { chain_id: chainId } }) => {
    const useDefaults: UseDefaults<UpdateProposalConfigData> = () => {
      const proposalModuleConfig = useCachedLoadingWithError(
        CwProposalSingleV1Selectors.configSelector({
          chainId,
          contractAddress: proposalModuleAddress,
        })
      )

      const proposalDepositTokenInfo = useCachedLoadingWithError(
        proposalModuleConfig.loading || proposalModuleConfig.errored
          ? undefined
          : proposalModuleConfig.data.deposit_info?.token
          ? Cw20BaseSelectors.tokenInfoSelector({
              chainId,
              contractAddress: proposalModuleConfig.data.deposit_info.token,
              params: [],
            })
          : constSelector(undefined)
      )

      if (proposalModuleConfig.loading || proposalDepositTokenInfo.loading) {
        return
      }
      if (proposalModuleConfig.errored) {
        return proposalModuleConfig.error
      }
      if (proposalDepositTokenInfo.errored) {
        return proposalDepositTokenInfo.error
      }

      const onlyMembersExecute = proposalModuleConfig.data.only_members_execute
      const depositRequired = !!proposalModuleConfig.data.deposit_info
      const depositInfo = !!proposalModuleConfig.data.deposit_info
        ? {
            deposit: convertMicroDenomToDenomWithDecimals(
              Number(proposalModuleConfig.data.deposit_info.deposit),
              // A deposit being configured implies that a token will be present.
              proposalDepositTokenInfo.data!.decimals
            ),
            refundFailedProposals:
              proposalModuleConfig.data.deposit_info.refund_failed_proposals,
          }
        : {
            deposit: 0,
            refundFailedProposals: false,
          }

      const allowRevoting = proposalModuleConfig.data.allow_revoting

      return {
        onlyMembersExecute,
        depositRequired,
        depositInfo,
        votingDuration: convertDurationToDurationWithUnits(
          proposalModuleConfig.data.max_voting_period
        ),
        allowRevoting,
        ...thresholdToTQData(proposalModuleConfig.data.threshold),
      }
    }

    const useTransformToCosmos: UseTransformToCosmos<
      UpdateProposalConfigData
    > = () => {
      const {
        hooks: { useCommonGovernanceTokenInfo },
      } = useVotingModuleAdapter()
      const voteConversionDecimals =
        useCommonGovernanceTokenInfo?.().decimals ?? 0

      return useCallback(
        (data: UpdateProposalConfigData) =>
          makeWasmMessage({
            wasm: {
              execute: {
                contract_addr: proposalModuleAddress,
                funds: [],
                msg: {
                  update_config: {
                    threshold: data.quorumEnabled
                      ? {
                          threshold_quorum: {
                            quorum: typePercentageToPercentageThreshold(
                              data.quorumType,
                              data.quorumPercentage
                            ),
                            threshold: typePercentageToPercentageThreshold(
                              data.thresholdType,
                              data.thresholdPercentage
                            ),
                          },
                        }
                      : {
                          absolute_percentage: {
                            percentage: typePercentageToPercentageThreshold(
                              data.thresholdType,
                              data.thresholdPercentage
                            ),
                          },
                        },
                    max_voting_period: convertDurationWithUnitsToDuration(
                      data.votingDuration
                    ),
                    only_members_execute: data.onlyMembersExecute,
                    allow_revoting: data.allowRevoting,
                    dao: address,
                    ...(data.depositInfo &&
                      data.depositRequired && {
                        deposit_info: {
                          deposit: convertDenomToMicroDenomWithDecimals(
                            data.depositInfo.deposit,
                            voteConversionDecimals
                          ).toString(),
                          refund_failed_proposals:
                            data.depositInfo.refundFailedProposals,
                          token: { voting_module_token: {} },
                        },
                      }),
                  },
                },
              },
            },
          }),
        [voteConversionDecimals]
      )
    }

    const useDecodedCosmosMsg: UseDecodedCosmosMsg<UpdateProposalConfigData> = (
      msg: Record<string, any>
    ) => {
      const {
        hooks: { useCommonGovernanceTokenInfo },
      } = useVotingModuleAdapter()
      const voteConversionDecimals =
        useCommonGovernanceTokenInfo?.().decimals ?? 0

      const isUpdateConfig = useMsgExecutesContract(
        msg,
        DAO_PROPOSAL_SINGLE_CONTRACT_NAMES,
        {
          update_config: {
            threshold: {},
            max_voting_period: {},
            only_members_execute: {},
            allow_revoting: {},
            dao: {},
          },
        }
      )

      if (!isUpdateConfig) {
        return { match: false }
      }

      const config = msg.wasm.execute.msg.update_config
      const onlyMembersExecute = config.only_members_execute
      const depositRequired = !!config.deposit_info
      const depositInfo = !!config.deposit_info
        ? {
            deposit: convertMicroDenomToDenomWithDecimals(
              Number(config.deposit_info.deposit),
              voteConversionDecimals
            ),
            refundFailedProposals: config.deposit_info.refund_failed_proposals,
          }
        : undefined

      const allowRevoting = !!config.allow_revoting

      return {
        match: true,
        data: {
          onlyMembersExecute,
          depositRequired,
          depositInfo,
          votingDuration: convertDurationToDurationWithUnits(
            config.max_voting_period
          ),
          allowRevoting,
          ...thresholdToTQData(config.threshold),
        },
      }
    }

    return {
      key: ActionKey.UpdateProposalConfig,
      Icon: BallotDepositEmoji,
      label: t('proposalModuleLabel.DaoProposalSingle'),
      // Not used.
      description: '',
      Component,
      useDefaults,
      useTransformToCosmos,
      useDecodedCosmosMsg,
    }
  }
