import { HugeDecimal } from '@dao-dao/math'
import { cwProposalSingleV1Queries, tokenQueries } from '@dao-dao/state'
import { ActionBase, BallotDepositEmoji } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionKey,
  ActionMatch,
  ActionOptions,
  IProposalModuleBase,
  ProcessedMessage,
  TokenType,
  UnifiedCosmosMsg,
} from '@dao-dao/types'
import { Threshold } from '@dao-dao/types/contracts/DaoProposalSingle.common'
import {
  convertDurationToDurationWithUnits,
  convertDurationWithUnitsToDuration,
  makeExecuteSmartContractMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { useDaoGovernanceToken } from '../../../../../../hooks'
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
  const commonGovernanceTokenInfo = useDaoGovernanceToken() ?? undefined

  return (
    <UpdateProposalConfigComponent
      {...props}
      options={{ commonGovernanceTokenInfo }}
    />
  )
}

export class DaoProposalSingleV1UpdateConfigAction extends ActionBase<UpdateProposalConfigData> {
  public readonly key = ActionKey.UpdateProposalConfig
  public readonly Component = Component

  constructor(
    options: ActionOptions,
    private proposalModule: IProposalModuleBase
  ) {
    super(options, {
      Icon: BallotDepositEmoji,
      label: options.t('proposalModuleLabel.DaoProposalSingle'),
      // Unused.
      description: '',
    })
  }

  async setup() {
    const config = await this.options.queryClient.fetchQuery(
      cwProposalSingleV1Queries.config(this.options.queryClient, {
        chainId: this.proposalModule.chainId,
        contractAddress: this.proposalModule.address,
      })
    )

    const token = config.deposit_info
      ? await this.options.queryClient.fetchQuery(
          tokenQueries.info(this.options.queryClient, {
            chainId: this.proposalModule.chainId,
            type: TokenType.Cw20,
            denomOrAddress: config.deposit_info.token,
          })
        )
      : undefined

    const onlyMembersExecute = config.only_members_execute
    const depositRequired = !!config.deposit_info
    const depositInfo =
      config.deposit_info && token
        ? {
            // A deposit being configured implies that a token will be present.
            deposit: HugeDecimal.from(
              config.deposit_info.deposit
            ).toHumanReadableString(token.decimals),
            refundFailedProposals: config.deposit_info.refund_failed_proposals,
          }
        : {
            deposit: '0',
            refundFailedProposals: false,
          }

    const allowRevoting = config.allow_revoting

    this.defaults = {
      onlyMembersExecute,
      depositRequired,
      depositInfo,
      votingDuration: convertDurationToDurationWithUnits(
        config.max_voting_period
      ),
      allowRevoting,
      ...thresholdToTQData(config.threshold),
    }
  }

  async encode(data: UpdateProposalConfigData): Promise<UnifiedCosmosMsg> {
    return makeExecuteSmartContractMessage({
      chainId: this.proposalModule.chainId,
      contractAddress: this.proposalModule.address,
      sender: this.options.address,
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
          dao: this.proposalModule.dao.coreAddress,
          ...(data.depositInfo &&
            data.depositRequired && {
              deposit_info: {
                deposit: HugeDecimal.fromHumanReadable(
                  data.depositInfo.deposit,
                  this.proposalModule.dao.votingModule.getGovernanceTokenQuery
                    ? (
                        await this.options.queryClient.fetchQuery(
                          this.proposalModule.dao.votingModule.getGovernanceTokenQuery()
                        )
                      ).decimals
                    : 0
                ).toString(),
                refund_failed_proposals: data.depositInfo.refundFailedProposals,
                token: { voting_module_token: {} },
              },
            }),
        },
      },
    })
  }

  match([
    {
      decodedMessage,
      account: { chainId },
    },
  ]: ProcessedMessage[]): ActionMatch {
    return (
      objectMatchesStructure(decodedMessage, {
        wasm: {
          execute: {
            contract_addr: {},
            funds: {},
            msg: {
              update_config: {
                threshold: {},
                max_voting_period: {},
                only_members_execute: {},
                allow_revoting: {},
                dao: {},
              },
            },
          },
        },
      }) &&
      chainId === this.proposalModule.chainId &&
      decodedMessage.wasm.execute.contract_addr === this.proposalModule.address
    )
  }

  async decode([
    { decodedMessage },
  ]: ProcessedMessage[]): Promise<UpdateProposalConfigData> {
    const config = decodedMessage.wasm.execute.msg.update_config

    const onlyMembersExecute = config.only_members_execute
    const depositRequired = !!config.deposit_info
    const depositInfo = config.deposit_info
      ? {
          deposit: HugeDecimal.from(
            config.deposit_info.deposit
          ).toHumanReadableString(
            this.proposalModule.dao.votingModule.getGovernanceTokenQuery
              ? (
                  await this.options.queryClient.fetchQuery(
                    this.proposalModule.dao.votingModule.getGovernanceTokenQuery()
                  )
                ).decimals
              : 0
          ),
          refundFailedProposals: config.deposit_info.refund_failed_proposals,
        }
      : undefined
    const allowRevoting = !!config.allow_revoting

    return {
      onlyMembersExecute,
      depositRequired,
      depositInfo,
      votingDuration: convertDurationToDurationWithUnits(
        config.max_voting_period
      ),
      allowRevoting,
      ...thresholdToTQData(config.threshold),
    }
  }
}
