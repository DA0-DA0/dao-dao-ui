import { useCallback } from 'react'

import { DaoProposalSingleV2Selectors } from '@dao-dao/state/recoil'
import {
  BallotDepositEmoji,
  useCachedLoadingWithError,
} from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMaker,
  ContractVersion,
  Feature,
  ProposalModule,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types'
import { Threshold } from '@dao-dao/types/contracts/DaoProposalSingle.common'
import { ExecuteMsg } from '@dao-dao/types/contracts/DaoProposalSingle.v2'
import {
  ContractName,
  DAO_PROPOSAL_SINGLE_CONTRACT_NAMES,
  convertCosmosVetoConfigToVeto,
  convertDurationToDurationWithUnits,
  convertDurationWithUnitsToDuration,
  convertVetoConfigToCosmos,
  isFeatureSupportedByVersion,
  makeWasmMessage,
  versionGte,
} from '@dao-dao/utils'

import { useMsgExecutesContract } from '../../../../../../actions'
import { AddressInput, Trans } from '../../../../../../components'
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

export const makeUpdateProposalConfigV2ActionMaker = ({
  version,
  address: proposalModuleAddress,
  prePropose,
}: ProposalModule): ActionMaker<UpdateProposalConfigData> => {
  const Component: ActionComponent = (props) => (
    <UpdateProposalConfigComponent
      {...props}
      options={{
        version,
        AddressInput,
        Trans,
      }}
    />
  )

  return ({ t, context, chain: { chain_id: chainId } }) => {
    if (!version || !versionGte(version, ContractVersion.V2Alpha)) {
      return null
    }

    const useDefaults: UseDefaults<UpdateProposalConfigData> = () => {
      const proposalModuleConfig = useCachedLoadingWithError(
        DaoProposalSingleV2Selectors.configSelector({
          chainId,
          contractAddress: proposalModuleAddress,
        })
      )

      if (proposalModuleConfig.loading) {
        return
      } else if (proposalModuleConfig.errored) {
        return proposalModuleConfig.error
      }

      const onlyMembersExecute = proposalModuleConfig.data.only_members_execute

      const allowRevoting = proposalModuleConfig.data.allow_revoting

      return {
        onlyMembersExecute,
        votingDuration: convertDurationToDurationWithUnits(
          proposalModuleConfig.data.max_voting_period
        ),
        allowRevoting,
        veto: convertCosmosVetoConfigToVeto(proposalModuleConfig.data.veto),
        ...thresholdToTQData(proposalModuleConfig.data.threshold),
      }
    }

    const useTransformToCosmos: UseTransformToCosmos<
      UpdateProposalConfigData
    > = () => {
      const proposalModuleConfig = useCachedLoadingWithError(
        DaoProposalSingleV2Selectors.configSelector({
          chainId,
          contractAddress: proposalModuleAddress,
        })
      )

      return useCallback(
        (data: UpdateProposalConfigData) => {
          if (proposalModuleConfig.loading) {
            return
          } else if (proposalModuleConfig.errored) {
            throw proposalModuleConfig.error
          }

          const updateConfigMessage: ExecuteMsg = {
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
              // If veto is supported...
              ...(version &&
                isFeatureSupportedByVersion(Feature.Veto, version) && {
                  veto: convertVetoConfigToCosmos(data.veto),
                }),
              // Pass through because we don't support changing them yet.
              dao: proposalModuleConfig.data.dao,
              close_proposal_on_execution_failure:
                proposalModuleConfig.data.close_proposal_on_execution_failure,
              min_voting_period: proposalModuleConfig.data.min_voting_period,
            },
          }

          return makeWasmMessage({
            wasm: {
              execute: {
                contract_addr: proposalModuleAddress,
                funds: [],
                msg: updateConfigMessage,
              },
            },
          })
        },
        [proposalModuleConfig]
      )
    }

    const useDecodedCosmosMsg: UseDecodedCosmosMsg<UpdateProposalConfigData> = (
      msg: Record<string, any>
    ) => {
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

      const allowRevoting = !!config.allow_revoting

      return {
        match: true,
        data: {
          onlyMembersExecute,
          votingDuration: convertDurationToDurationWithUnits(
            config.max_voting_period
          ),
          allowRevoting,
          veto: convertCosmosVetoConfigToVeto(config.veto),
          ...thresholdToTQData(config.threshold),
        },
      }
    }

    return {
      key: ActionKey.UpdateProposalSingleConfig,
      Icon: BallotDepositEmoji,
      label: t('form.updateVotingConfigTitle', {
        context:
          // If this is an approver proposal module that approves proposals in
          // another DAO, specify it.
          prePropose?.contractName === ContractName.PreProposeApprover
            ? 'singleChoiceApproval'
            : // If more than one proposal module, specify which one this is.
            context.type === ActionContextType.Dao &&
              context.info.proposalModules.length > 1
            ? 'singleChoice'
            : undefined,
      }),
      description: t('info.updateVotingConfigActionDescription'),
      notReusable: true,
      Component,
      useDefaults,
      useTransformToCosmos,
      useDecodedCosmosMsg,
    }
  }
}
