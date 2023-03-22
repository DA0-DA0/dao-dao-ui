import { useCallback, useMemo } from 'react'
import { useRecoilValue } from 'recoil'

import { GearEmoji } from '@dao-dao/stateless'
import {
  ActionMaker,
  AdapterActionKey,
  ProposalModule,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types'
import {
  ExecuteMsg,
  PercentageThreshold,
  VotingStrategy,
} from '@dao-dao/types/contracts/DaoProposalMultiple'
import { makeWasmMessage, objectMatchesStructure } from '@dao-dao/utils'

import { configSelector } from '../../../contracts/DaoProposalMultiple.recoil'
import { UpdateProposalConfigComponent as Component } from './UpdateProposalConfigComponent'

export interface UpdateProposalConfigData {
  onlyMembersExecute: boolean

  quorumType: '%' | 'majority'
  quorumPercentage?: number

  proposalDuration: number
  proposalDurationUnits: 'weeks' | 'days' | 'hours' | 'minutes' | 'seconds'

  allowRevoting: boolean
}

const votingStrategyToProcessedQuorum = (
  votingStrategy: VotingStrategy
): Pick<UpdateProposalConfigData, 'quorumType' | 'quorumPercentage'> => {
  if (!('single_choice' in votingStrategy)) {
    throw new Error('unrecognized voting_strategy')
  }

  const quorum: PercentageThreshold = votingStrategy.single_choice.quorum

  const quorumType: UpdateProposalConfigData['quorumType'] =
    'majority' in quorum ? 'majority' : '%'
  const quorumPercentage: UpdateProposalConfigData['quorumPercentage'] =
    'majority' in quorum ? undefined : Number(quorum.percent) * 100

  return {
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

const useDecodedCosmosMsg: UseDecodedCosmosMsg<UpdateProposalConfigData> = (
  msg: Record<string, any>
) =>
  useMemo(() => {
    if (
      objectMatchesStructure(msg, {
        wasm: {
          execute: {
            update_config: {
              allow_revoting: {},
              close_proposal_on_execution_failure: {},
              dao: {},
              max_voting_period: {
                time: {},
              },
              min_voting_period: {},
              only_members_execute: {},
              voting_strategy: {
                single_choice: {
                  quorum: {},
                },
              },
            },
          },
        },
      })
    ) {
      const {
        allow_revoting: allowRevoting,
        only_members_execute: onlyMembersExecute,
        max_voting_period: { time: proposalDuration },
        voting_strategy: votingStrategy,
      } = msg.wasm.execute.msg.update_config

      return {
        data: {
          allowRevoting,
          onlyMembersExecute,
          proposalDuration,
          proposalDurationUnits: 'seconds',
          ...votingStrategyToProcessedQuorum(votingStrategy),
        },
        match: true,
      }
    }
    return { match: false }
  }, [msg])

export const makeUpdateProposalConfigAction: ActionMaker<
  UpdateProposalConfigData,
  { proposalModule: ProposalModule }
> = ({ t, proposalModule: { address: proposalModuleAddress } }) => {
  const useDefaults: UseDefaults<UpdateProposalConfigData> = () => {
    const proposalModuleConfig = useRecoilValue(
      configSelector({
        contractAddress: proposalModuleAddress,
      })
    )

    const onlyMembersExecute = proposalModuleConfig.only_members_execute
    const proposalDuration =
      'time' in proposalModuleConfig.max_voting_period
        ? proposalModuleConfig.max_voting_period.time
        : 604800
    const proposalDurationUnits = 'seconds'

    const allowRevoting = proposalModuleConfig.allow_revoting
    const votingStrategy = proposalModuleConfig.voting_strategy

    return {
      onlyMembersExecute,
      proposalDuration,
      proposalDurationUnits,
      allowRevoting,
      ...votingStrategyToProcessedQuorum(votingStrategy),
    }
  }

  const useTransformToCosmos: UseTransformToCosmos<
    UpdateProposalConfigData
  > = () => {
    const proposalModuleConfig = useRecoilValue(
      configSelector({
        contractAddress: proposalModuleAddress,
      })
    )

    return useCallback(
      (data: UpdateProposalConfigData) => {
        const updateConfigMessage: ExecuteMsg = {
          update_config: {
            voting_strategy: {
              single_choice: {
                quorum: typePercentageToPercentageThreshold(
                  data.quorumType,
                  data.quorumPercentage
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
            dao: proposalModuleConfig.dao,
            close_proposal_on_execution_failure:
              proposalModuleConfig.close_proposal_on_execution_failure,
            min_voting_period: proposalModuleConfig.min_voting_period,
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
      [
        proposalModuleConfig.dao,
        proposalModuleConfig.close_proposal_on_execution_failure,
        proposalModuleConfig.min_voting_period,
      ]
    )
  }

  return {
    key: AdapterActionKey.UpdateProposalMultipleConfig,
    Icon: GearEmoji,
    label: t('form.updateVotingConfigTitle'),
    description: t('info.updateVotingConfigActionDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
