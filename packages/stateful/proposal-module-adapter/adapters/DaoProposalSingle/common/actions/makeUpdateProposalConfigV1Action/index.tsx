import { useCallback, useMemo } from 'react'
import { constSelector, useRecoilValue } from 'recoil'

import { Cw20BaseSelectors } from '@dao-dao/state'
import { BallotDepositEmoji } from '@dao-dao/stateless'
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
import { Threshold } from '@dao-dao/types/contracts/DaoProposalSingle.common'
import {
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  makeWasmMessage,
} from '@dao-dao/utils'

import { useVotingModuleAdapter } from '../../../../../../voting-module-adapter'
import { configSelector } from '../../../contracts/CwProposalSingle.v1.recoil'
import { UpdateProposalConfigComponent } from './UpdateProposalConfigComponent'

export interface UpdateProposalConfigData {
  onlyMembersExecute: boolean

  depositRequired: boolean
  depositInfo?: {
    deposit: number
    refundFailedProposals: boolean
  }

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
) => {
  const {
    hooks: { useGovernanceTokenInfo },
  } = useVotingModuleAdapter()
  const voteConversionDecimals =
    useGovernanceTokenInfo?.().governanceTokenInfo.decimals ?? 0

  return useMemo(() => {
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

      const allowRevoting = !!config.allow_revoting

      return {
        data: {
          onlyMembersExecute,
          depositRequired,
          depositInfo,
          proposalDuration,
          proposalDurationUnits,
          allowRevoting,
          ...thresholdToTQData(config.threshold),
        },
        match: true,
      }
    }
    return { match: false }
  }, [msg, voteConversionDecimals])
}

export const makeUpdateProposalConfigV1Action: ActionMaker<
  UpdateProposalConfigData,
  { proposalModule: ProposalModule }
> = ({ t, proposalModule: { version, address: proposalModuleAddress } }) => {
  // Only v1.
  if (version !== ContractVersion.V1) {
    return null
  }

  const useDefaults: UseDefaults<UpdateProposalConfigData> = () => {
    const proposalModuleConfig = useRecoilValue(
      configSelector({
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
            proposalDepositTokenInfo!.decimals
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

    return {
      onlyMembersExecute,
      depositRequired,
      depositInfo,
      proposalDuration,
      proposalDurationUnits,
      allowRevoting,
      ...thresholdToTQData(proposalModuleConfig.threshold),
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

    const {
      hooks: { useGovernanceTokenInfo },
    } = useVotingModuleAdapter()
    const voteConversionDecimals =
      useGovernanceTokenInfo?.().governanceTokenInfo.decimals ?? 0

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
      [voteConversionDecimals, proposalModuleConfig.dao]
    )
  }

  return {
    key: AdapterActionKey.UpdateProposalConfig,
    Icon: BallotDepositEmoji,
    label: t('form.updateVotingConfigTitle'),
    description: t('info.updateVotingConfigActionDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
