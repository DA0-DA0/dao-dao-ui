import { useCallback } from 'react'

import { DaoProposalSingleV2Selectors } from '@dao-dao/state/recoil'
import {
  BallotDepositEmoji,
  useCachedLoadingWithError,
} from '@dao-dao/stateless'
import {
  ActionContextType,
  ActionKey,
  ActionMaker,
  ContractVersion,
  ProposalModule,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types'
import { Threshold } from '@dao-dao/types/contracts/DaoProposalSingle.common'
import { ExecuteMsg } from '@dao-dao/types/contracts/DaoProposalSingle.v2'
import {
  DAO_PROPOSAL_SINGLE_CONTRACT_NAMES,
  makeWasmMessage,
  versionGte,
} from '@dao-dao/utils'

import { useMsgExecutesContract } from '../../../../../../actions'
import { UpdateProposalConfigComponent as Component } from './UpdateProposalConfigComponent'

export interface UpdateProposalConfigData {
  onlyMembersExecute: boolean

  thresholdType: '%' | 'majority'
  thresholdPercentage?: number

  quorumEnabled: boolean
  quorumType: '%' | 'majority'
  quorumPercentage?: number

  proposalDuration: number
  proposalDurationUnits: 'weeks' | 'days' | 'hours' | 'minutes' | 'seconds'

  allowRevoting: boolean
}

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

const maxVotingInfoToCosmos = (
  t: 'weeks' | 'days' | 'hours' | 'minutes' | 'seconds',
  v: number
) => {
  const converter = {
    weeks: 604800,
    days: 86400,
    hours: 3600,
    minutes: 60,
    seconds: 1,
  }

  return {
    time: converter[t] * v,
  }
}

export const makeUpdateProposalConfigV2ActionMaker =
  ({
    version,
    address: proposalModuleAddress,
  }: ProposalModule): ActionMaker<UpdateProposalConfigData> =>
  ({ t, context, chain: { chain_id: chainId } }) => {
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
      const proposalDuration =
        'time' in proposalModuleConfig.data.max_voting_period
          ? proposalModuleConfig.data.max_voting_period.time
          : 604800
      const proposalDurationUnits = 'seconds'

      const allowRevoting = proposalModuleConfig.data.allow_revoting

      return {
        onlyMembersExecute,
        proposalDuration,
        proposalDurationUnits,
        allowRevoting,
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
              max_voting_period: maxVotingInfoToCosmos(
                data.proposalDurationUnits,
                data.proposalDuration
              ),
              only_members_execute: data.onlyMembersExecute,
              allow_revoting: data.allowRevoting,
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
            max_voting_period: {
              time: {},
            },
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

      const proposalDuration = config.max_voting_period.time
      const proposalDurationUnits = 'seconds'

      const allowRevoting = !!config.allow_revoting

      return {
        match: true,
        data: {
          onlyMembersExecute,
          proposalDuration,
          proposalDurationUnits,
          allowRevoting,
          ...thresholdToTQData(config.threshold),
        },
      }
    }

    return {
      key: ActionKey.UpdateProposalSingleConfig,
      Icon: BallotDepositEmoji,
      label: t('form.updateVotingConfigTitle', {
        context:
          // If more than one proposal module, specify which one this is.
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
