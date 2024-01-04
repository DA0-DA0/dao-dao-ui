import { useCallback } from 'react'

import { DaoProposalMultipleSelectors } from '@dao-dao/state/recoil'
import {
  BallotDepositEmoji,
  useCachedLoadingWithError,
} from '@dao-dao/stateless'
import {
  ActionContextType,
  ActionKey,
  ActionMaker,
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
import {
  DAO_PROPOSAL_MULTIPLE_CONTRACT_NAMES,
  convertDurationToDurationWithUnits,
  convertDurationWithUnitsToDuration,
  makeWasmMessage,
} from '@dao-dao/utils'

import { useMsgExecutesContract } from '../../../../../../actions'
import {
  UpdateProposalConfigComponent as Component,
  UpdateProposalConfigData,
} from './UpdateProposalConfigComponent'

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

export const makeUpdateProposalConfigActionMaker =
  ({
    address: proposalModuleAddress,
  }: ProposalModule): ActionMaker<UpdateProposalConfigData> =>
  ({ t, context, chain: { chain_id: chainId } }) => {
    const useDefaults: UseDefaults<UpdateProposalConfigData> = () => {
      const proposalModuleConfig = useCachedLoadingWithError(
        DaoProposalMultipleSelectors.configSelector({
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
      const votingStrategy = proposalModuleConfig.data.voting_strategy

      return {
        onlyMembersExecute,
        votingDuration: convertDurationToDurationWithUnits(
          proposalModuleConfig.data.max_voting_period
        ),
        allowRevoting,
        ...votingStrategyToProcessedQuorum(votingStrategy),
      }
    }

    const useTransformToCosmos: UseTransformToCosmos<
      UpdateProposalConfigData
    > = () => {
      const proposalModuleConfig = useCachedLoadingWithError(
        DaoProposalMultipleSelectors.configSelector({
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
              voting_strategy: {
                single_choice: {
                  quorum: typePercentageToPercentageThreshold(
                    data.quorumType,
                    data.quorumPercentage
                  ),
                },
              },
              max_voting_period: convertDurationWithUnitsToDuration(
                data.votingDuration
              ),
              only_members_execute: data.onlyMembersExecute,
              allow_revoting: data.allowRevoting,
              // Pass through because we don't support changing them yet.
              dao: proposalModuleConfig.data.dao,
              close_proposal_on_execution_failure:
                proposalModuleConfig.data.close_proposal_on_execution_failure,
              min_voting_period: proposalModuleConfig.data.min_voting_period,
              ...('veto' in proposalModuleConfig.data && {
                veto: proposalModuleConfig.data.veto,
              }),
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
        DAO_PROPOSAL_MULTIPLE_CONTRACT_NAMES,
        {
          wasm: {
            execute: {
              contract_addr: {},
              funds: {},
              msg: {
                update_config: {
                  allow_revoting: {},
                  close_proposal_on_execution_failure: {},
                  dao: {},
                  max_voting_period: {},
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
          },
        }
      )

      if (!isUpdateConfig) {
        return { match: false }
      }

      const {
        allow_revoting: allowRevoting,
        only_members_execute: onlyMembersExecute,
        max_voting_period,
        voting_strategy: votingStrategy,
      } = msg.wasm.execute.msg.update_config

      return {
        match: true,
        data: {
          allowRevoting,
          onlyMembersExecute,
          votingDuration: convertDurationToDurationWithUnits(max_voting_period),
          proposalDurationUnits: 'seconds',
          ...votingStrategyToProcessedQuorum(votingStrategy),
        },
      }
    }

    return {
      key: ActionKey.UpdateProposalMultipleConfig,
      Icon: BallotDepositEmoji,
      label: t('form.updateVotingConfigTitle', {
        context:
          // If more than one proposal module, specify which one this is.
          context.type === ActionContextType.Dao &&
          context.info.proposalModules.length > 1
            ? 'multipleChoice'
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
