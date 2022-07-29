import { useCallback, useMemo } from 'react'
import { constSelector, useRecoilValue } from 'recoil'

import {
  Action,
  ActionComponent,
  ActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/actions'
import { Cw20BaseSelectors, CwProposalSingleSelectors } from '@dao-dao/state'
import {
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  makeWasmMessage,
} from '@dao-dao/utils'
import { useVotingModuleAdapter } from '@dao-dao/voting-module-adapter'

import {
  UpdateProposalConfigComponent,
  UpdateProposalConfigIcon,
} from './UpdateProposalConfigComponent'

export interface UpdateProposalConfigData {
  onlyMembersExecute: boolean

  depositRequired: boolean
  depositInfo?: {
    deposit: number
    refundFailedProposals: boolean
  }

  thresholdType: '%' | 'majority'
  thresholdPercentage?: number

  quorumType: '%' | 'majority'
  quorumPercentage?: number

  proposalDuration: number
  proposalDurationUnits: 'weeks' | 'days' | 'hours' | 'minutes' | 'seconds'

  allowRevoting: boolean
}

const useDefaults: UseDefaults<UpdateProposalConfigData> = (
  _,
  { address: proposalModuleAddress }
) => {
  const proposalModuleConfig = useRecoilValue(
    CwProposalSingleSelectors.configSelector({
      contractAddress: proposalModuleAddress,
    })
  )

  const proposalDepositTokenInfo = useRecoilValue(
    proposalModuleConfig.deposit_info?.token
      ? Cw20BaseSelectors.tokenInfoSelector({
          contractAddress: proposalModuleConfig.deposit_info.token,
          params: [],
        })
      : constSelector(undefined)
  )

  const onlyMembersExecute = proposalModuleConfig.only_members_execute
  const depositRequired = !!proposalModuleConfig.deposit_info
  const depositInfo = !!proposalModuleConfig.deposit_info
    ? {
        deposit: convertMicroDenomToDenomWithDecimals(
          Number(proposalModuleConfig.deposit_info.deposit),
          // A deposit being configured implies that a token will be present.
          proposalDepositTokenInfo?.decimals!
        ),
        refundFailedProposals:
          proposalModuleConfig.deposit_info.refund_failed_proposals,
      }
    : {
        deposit: 0,
        refundFailedProposals: false,
      }
  const proposalDuration =
    'time' in proposalModuleConfig.max_voting_period
      ? proposalModuleConfig.max_voting_period.time
      : 604800
  const proposalDurationUnits = 'seconds'

  const allowRevoting = proposalModuleConfig.allow_revoting

  if ('threshold_quorum' in proposalModuleConfig.threshold) {
    const threshold = proposalModuleConfig.threshold.threshold_quorum

    const thresholdType = 'majority' in threshold.threshold ? 'majority' : '%'
    const thresholdPercentage =
      'majority' in threshold.threshold
        ? undefined
        : Number(threshold.threshold.percent) * 100

    const quorumType = 'majority' in threshold.quorum ? 'majority' : '%'
    const quorumPercentage =
      'majority' in threshold.quorum
        ? undefined
        : Number(threshold.quorum.percent) * 100

    return {
      onlyMembersExecute,
      depositRequired,
      depositInfo,
      thresholdType,
      thresholdPercentage,
      quorumType,
      quorumPercentage,
      proposalDuration,
      proposalDurationUnits,
      allowRevoting,
    }
  } else {
    return {
      onlyMembersExecute,
      depositRequired,
      depositInfo,
      thresholdType: 'majority',
      quorumType: '%',
      quorumPercentage: 20,
      proposalDuration,
      proposalDurationUnits,
      allowRevoting,
    }
  }
}

const typePercentageToPercentageThreshold = (
  t: 'majority' | '%',
  p: number | undefined
) => {
  if (t === 'majority') {
    return { majority: {} }
  } else {
    if (p == undefined) {
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

const useTransformToCosmos: UseTransformToCosmos<UpdateProposalConfigData> = (
  _,
  { address: proposalModuleAddress }
) => {
  const proposalModuleConfig = useRecoilValue(
    CwProposalSingleSelectors.configSelector({
      contractAddress: proposalModuleAddress,
    })
  )

  const {
    hooks: { useGovernanceTokenInfo },
  } = useVotingModuleAdapter()
  const voteConversionDecimals =
    useGovernanceTokenInfo?.().governanceTokenInfo?.decimals ?? 0

  return useCallback(
    (data: UpdateProposalConfigData) =>
      makeWasmMessage({
        wasm: {
          execute: {
            contract_addr: proposalModuleAddress,
            funds: [],
            msg: {
              update_config: {
                threshold: {
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
                },
                max_voting_period: maxVotingInfoToCosmos(
                  data.proposalDurationUnits,
                  data.proposalDuration
                ),
                only_members_execute: data.onlyMembersExecute,
                allow_revoting: data.allowRevoting,
                dao: proposalModuleConfig.dao,
                ...(data.depositInfo &&
                  data.depositRequired && {
                    deposit_info: {
                      deposit: convertDenomToMicroDenomWithDecimals(
                        data.depositInfo.deposit,
                        voteConversionDecimals
                      ),
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
    [proposalModuleAddress, voteConversionDecimals, proposalModuleConfig.dao]
  )
}

const Component: ActionComponent = (props) => {
  const {
    hooks: { useGovernanceTokenInfo },
  } = useVotingModuleAdapter()
  const governanceTokenSymbol =
    useGovernanceTokenInfo?.().governanceTokenInfo?.symbol

  return (
    <UpdateProposalConfigComponent
      {...props}
      options={{ governanceTokenSymbol }}
    />
  )
}

const useDecodedCosmosMsg: UseDecodedCosmosMsg<UpdateProposalConfigData> = (
  msg: Record<string, any>
) => {
  const {
    hooks: { useGovernanceTokenInfo },
  } = useVotingModuleAdapter()
  const voteConversionDecimals =
    useGovernanceTokenInfo?.().governanceTokenInfo?.decimals ?? 0

  return useMemo(() => {
    if (
      'wasm' in msg &&
      'execute' in msg.wasm &&
      'update_config' in msg.wasm.execute.msg &&
      'threshold' in msg.wasm.execute.msg.update_config &&
      'threshold_quorum' in msg.wasm.execute.msg.update_config.threshold &&
      'max_voting_period' in msg.wasm.execute.msg.update_config &&
      'only_members_execute' in msg.wasm.execute.msg.update_config &&
      'allow_revoting' in msg.wasm.execute.msg.update_config &&
      'dao' in msg.wasm.execute.msg.update_config
    ) {
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

      if (!('time' in config.max_voting_period)) {
        return { match: false }
      }

      const proposalDuration = config.max_voting_period.time
      const proposalDurationUnits = 'seconds'

      if (!('threshold_quorum' in config.threshold)) {
        return { match: false }
      }

      const threshold = config.threshold.threshold_quorum

      const thresholdType = 'majority' in threshold.threshold ? 'majority' : '%'
      const thresholdPercentage =
        'majority' in threshold.threshold
          ? undefined
          : Number(threshold.threshold.percent) * 100

      const quorumType = 'majority' in threshold.quorum ? 'majority' : '%'
      const quorumPercentage =
        'majority' in threshold.quorum
          ? undefined
          : Number(threshold.quorum.percent) * 100

      const allowRevoting = !!config.allow_revoting

      return {
        data: {
          onlyMembersExecute,
          depositRequired,
          depositInfo,
          thresholdType,
          thresholdPercentage,
          quorumType,
          quorumPercentage,
          proposalDuration,
          proposalDurationUnits,
          allowRevoting,
        },
        match: true,
      }
    }
    return { match: false }
  }, [msg, voteConversionDecimals])
}

export const makeUpdateProposalConfigAction =
  (): Action<UpdateProposalConfigData> => ({
    key: ActionKey.UpdateProposalConfig,
    Icon: UpdateProposalConfigIcon,
    label: 'Update Voting Config',
    description: 'Update the voting paramaters for your DAO.',
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  })
