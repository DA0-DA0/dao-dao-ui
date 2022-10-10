import { useCallback, useMemo } from 'react'
import { useRecoilValue } from 'recoil'

import {
  Action,
  ActionComponent,
  ActionKey,
  ProposalModule,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/tstypes'
import { Threshold } from '@dao-dao/tstypes/contracts/CwProposalSingle.common'
import { ExecuteMsg } from '@dao-dao/tstypes/contracts/CwProposalSingle.v2'
import { UpdateProposalConfigIcon } from '@dao-dao/ui'
import { makeWasmMessage } from '@dao-dao/utils'
import { useVotingModuleAdapter } from '@dao-dao/voting-module-adapter'

import { configSelector } from '../../../contracts/CwProposalSingle.v2.recoil'
import { UpdateProposalConfigComponent } from './UpdateProposalConfigComponent'

// TODO: Convert this into a more generalizable 'context' abstraction.
type AsProposalModuleMaker<T> = (proposalModule: ProposalModule) => T

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

const makeUseDefaults: AsProposalModuleMaker<
  UseDefaults<UpdateProposalConfigData>
> =
  ({ address: proposalModuleAddress }) =>
  () => {
    const proposalModuleConfig = useRecoilValue(
      configSelector({
        contractAddress: proposalModuleAddress,
        params: [],
      })
    )

    const onlyMembersExecute = proposalModuleConfig.only_members_execute
    const proposalDuration =
      'time' in proposalModuleConfig.max_voting_period
        ? proposalModuleConfig.max_voting_period.time
        : 604800
    const proposalDurationUnits = 'seconds'

    const allowRevoting = proposalModuleConfig.allow_revoting

    return {
      onlyMembersExecute,
      proposalDuration,
      proposalDurationUnits,
      allowRevoting,
      ...thresholdToTQData(proposalModuleConfig.threshold),
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

const makeUseTransformToCosmos: AsProposalModuleMaker<
  UseTransformToCosmos<UpdateProposalConfigData>
> =
  ({ address: proposalModuleAddress }) =>
  () => {
    const proposalModuleConfig = useRecoilValue(
      configSelector({
        contractAddress: proposalModuleAddress,
        params: [],
      })
    )

    return useCallback(
      (data: UpdateProposalConfigData) => {
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

const Component: ActionComponent = (props) => {
  const {
    hooks: { useGovernanceTokenInfo },
  } = useVotingModuleAdapter()
  const governanceTokenSymbol =
    useGovernanceTokenInfo?.().governanceTokenInfo.symbol

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
      'threshold' in msg.wasm.execute.msg.update_config &&
      ('threshold_quorum' in msg.wasm.execute.msg.update_config.threshold ||
        'absolute_percentage' in
          msg.wasm.execute.msg.update_config.threshold) &&
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

      const allowRevoting = !!config.allow_revoting

      return {
        data: {
          onlyMembersExecute,
          proposalDuration,
          proposalDurationUnits,
          allowRevoting,
          ...thresholdToTQData(config.threshold),
        },
        match: true,
      }
    }
    return { match: false }
  }, [msg])

export const makeUpdateProposalConfigV2Action = (
  proposalModule: ProposalModule
): Action<UpdateProposalConfigData> => ({
  key: ActionKey.UpdateProposalConfig,
  Icon: UpdateProposalConfigIcon,
  label: 'Update Voting Config',
  description: 'Update the voting paramaters for your DAO.',
  Component,
  useDefaults: makeUseDefaults(proposalModule),
  useTransformToCosmos: makeUseTransformToCosmos(proposalModule),
  useDecodedCosmosMsg,
})
