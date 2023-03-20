import { useCallback, useMemo } from 'react'
import { useRecoilValue } from 'recoil'

import { GearEmoji } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionMaker,
  AdapterActionKey,
  ContractVersion,
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
import { makeWasmMessage } from '@dao-dao/utils'

import { useVotingModuleAdapter } from '../../../../../../voting-module-adapter'
import { configSelector } from '../../../contracts/DaoProposalMultiple.recoil'
import { UpdateProposalConfigComponent } from './UpdateProposalConfigComponent'

export interface UpdateProposalConfigData {
  onlyMembersExecute: boolean
  voting_strategy: VotingStrategy
  quorumType: '%' | 'majority'
  quorumPercentage?: number

  proposalDuration: number
  proposalDurationUnits: 'weeks' | 'days' | 'hours' | 'minutes' | 'seconds'

  allowRevoting: boolean
}

const votingStrategyToProcessedQuorum = (
  voting_strategy: VotingStrategy
): Pick<UpdateProposalConfigData, 'quorumType' | 'quorumPercentage'> => {
  if (!('single_choice' in voting_strategy)) {
    console.error('unrecognized voting_strategy')
  }

  let quorum: PercentageThreshold = voting_strategy.single_choice.quorum
  let quorumType: UpdateProposalConfigData['quorumType'] = '%'
  let quorumPercentage: UpdateProposalConfigData['quorumPercentage'] = 20

  quorumType = 'majority' in quorum ? 'majority' : '%'
  quorumPercentage =
    'majority' in quorum ? undefined : Number(quorum.percent) * 100

  return {
    quorumType,
    quorumPercentage,
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

const Component: ActionComponent = (props) => {
  const {
    hooks: { useCommonGovernanceTokenInfo },
  } = useVotingModuleAdapter()
  const governanceTokenSymbol = useCommonGovernanceTokenInfo?.().symbol

  return (
    <UpdateProposalConfigComponent
      {...props}
      options={{ governanceTokenSymbol }}
    />
  )
}

const useDecodedCosmosMsg: UseDecodedCosmosMsg<UpdateProposalConfigData> = (
  msg: Record<string, any>
) =>
  useMemo(() => {
    if (
      'wasm' in msg &&
      'execute' in msg.wasm &&
      'update_config' in msg.wasm.execute.msg &&
      'quorum' in msg.wasm.execute.msg.update_config &&
      ('majority' in msg.wasm.execute.msg.update_config.quorum ||
        'percent' in msg.wasm.execute.msg.update_config.quorum) &&
      'max_voting_period' in msg.wasm.execute.msg.update_config &&
      'only_members_execute' in msg.wasm.execute.msg.update_config &&
      'allow_revoting' in msg.wasm.execute.msg.update_config &&
      'dao' in msg.wasm.execute.msg.update_config
    ) {
      const config = msg.wasm.execute.msg.update_config
      const onlyMembersExecute = config.only_members_execute

      if (!('time' in config.max_voting_period)) {
        return { match: false }
      }

      const proposalDuration = config.max_voting_period.time
      const proposalDurationUnits = 'seconds'
      const voting_strategy = config.voting_strategy
      const allowRevoting = !!config.allow_revoting

      return {
        data: {
          onlyMembersExecute,
          proposalDuration,
          proposalDurationUnits,
          allowRevoting,
          voting_strategy,
          ...votingStrategyToProcessedQuorum(voting_strategy),
        },
        match: true,
      }
    }
    return { match: false }
  }, [msg])

export const makeUpdateProposalConfigAction: ActionMaker<
  UpdateProposalConfigData,
  { proposalModule: ProposalModule }
> = ({ t, proposalModule: { version, address: proposalModuleAddress } }) => {
  // Only v2.
  if (version === ContractVersion.V1) {
    return null
  }

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
    const voting_strategy = proposalModuleConfig.voting_strategy

    return {
      onlyMembersExecute,
      proposalDuration,
      proposalDurationUnits,
      allowRevoting,
      voting_strategy,
      ...votingStrategyToProcessedQuorum(proposalModuleConfig.voting_strategy),
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
            voting_strategy: data.voting_strategy,
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
    key: AdapterActionKey.UpdateProposalConfig,
    Icon: GearEmoji,
    label: t('form.updateVotingConfigTitle'),
    description: t('info.updateVotingConfigActionDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
