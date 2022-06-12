import { useCallback, useMemo } from 'react'
import { constSelector, useRecoilValue } from 'recoil'

import {
  useGovernanceTokenInfo,
  useProposalModule,
  useVotingModule,
} from '@dao-dao/state'
import { tokenInfoSelector } from '@dao-dao/state/recoil/selectors/clients/cw20-base'
import { tokenContractSelector } from '@dao-dao/state/recoil/selectors/clients/cw20-staked-balance-voting'
import {
  VotingModuleType,
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  makeWasmMessage,
} from '@dao-dao/utils'

import { ActionKey } from '.'
import {
  Action,
  ActionComponent,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '..'
import { UpdateProposalConfigComponent as StatelessUpdateProposalConfigComponent } from '../components'

interface UpdateProposalConfigData {
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
}

const useDefaults: UseDefaults<UpdateProposalConfigData> = (
  coreAddr: string
) => {
  const { proposalModuleConfig, proposalDepositTokenInfo } = useProposalModule(
    coreAddr,
    {
      fetchProposalDepositTokenInfo: true,
    }
  )

  if (proposalModuleConfig === undefined) {
    // We will only hit this case if the CosmWasmClient is undefined in which
    // case a lot of things have likely broken before we've gotten here. Return
    // some default values.
    return {
      onlyMembersExecute: true,

      depositRequired: false,

      thresholdType: 'majority',
      quorumType: 'majority',

      proposalDuration: 1,
      proposalDurationUnits: 'weeks',
    }
  }

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
    : undefined
  const proposalDuration =
    'time' in proposalModuleConfig.max_voting_period
      ? proposalModuleConfig.max_voting_period.time
      : 604800
  const proposalDurationUnits = 'seconds'

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
  coreAddr: string
) => {
  const { proposalModuleAddress, proposalModuleConfig } =
    useProposalModule(coreAddr)

  const { governanceTokenShouldExist, governanceTokenInfo } =
    useGovernanceTokenInfo(coreAddr)

  if (
    !proposalModuleAddress ||
    !proposalModuleConfig ||
    (governanceTokenShouldExist && !governanceTokenInfo)
  ) {
    throw new Error('Failed to get proposal module.')
  }

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
                allow_revoting: proposalModuleConfig.allow_revoting,
                dao: proposalModuleConfig.dao,
                ...(data.depositInfo &&
                  data.depositRequired && {
                    deposit_info: {
                      deposit: convertDenomToMicroDenomWithDecimals(
                        data.depositInfo.deposit,
                        // The form won't allow a deposit if a voting
                        // module token isn't being used so we can
                        // safely unwrap here.
                        governanceTokenInfo?.decimals!
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
    [
      proposalModuleAddress,
      governanceTokenInfo?.decimals,
      proposalModuleConfig.allow_revoting,
      proposalModuleConfig.dao,
    ]
  )
}

const Component: ActionComponent = (props) => {
  const coreAddress = props.coreAddress

  const { governanceTokenInfo } = useGovernanceTokenInfo(coreAddress)

  return (
    <StatelessUpdateProposalConfigComponent
      {...props}
      options={{ governanceTokenSymbol: governanceTokenInfo?.symbol }}
    />
  )
}

const useDecodedCosmosMsg: UseDecodedCosmosMsg<UpdateProposalConfigData> = (
  msg: Record<string, any>,
  coreAddress: string
) => {
  const { votingModuleAddress, votingModuleType } = useVotingModule(coreAddress)

  const maybeTokenContract = useRecoilValue(
    votingModuleType === VotingModuleType.Cw20StakedBalanceVoting &&
      votingModuleAddress
      ? tokenContractSelector({
          contractAddress: votingModuleAddress,
        })
      : constSelector(undefined)
  )
  const maybeTokenContractInfo = useRecoilValue(
    maybeTokenContract
      ? tokenInfoSelector({ contractAddress: maybeTokenContract, params: [] })
      : constSelector(undefined)
  )

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
              maybeTokenContractInfo?.decimals!
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
        },
        match: true,
      }
    }
    return { match: false }
  }, [msg, maybeTokenContractInfo?.decimals])
}

export const updateProposalConfigAction: Action<UpdateProposalConfigData> = {
  key: ActionKey.UpdateProposalConfig,
  label: '⚙️ Update Voting Config',
  description: 'Update the voting paramaters for your DAO',
  Component,
  useDefaults,
  useTransformToCosmos,
  useDecodedCosmosMsg,
  votingModuleTypes: [
    VotingModuleType.Cw20StakedBalanceVoting,
    VotingModuleType.Cw4Voting,
  ],
}
