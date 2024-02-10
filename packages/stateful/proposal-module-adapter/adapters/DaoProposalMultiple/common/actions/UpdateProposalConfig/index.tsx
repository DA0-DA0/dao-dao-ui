import { useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { constSelector, useRecoilValueLoadable } from 'recoil'

import {
  Cw1WhitelistSelectors,
  DaoProposalMultipleSelectors,
} from '@dao-dao/state/recoil'
import {
  BallotDepositEmoji,
  useCachedLoadingWithError,
} from '@dao-dao/stateless'
import {
  ActionChainContextType,
  ActionComponent,
  ActionKey,
  ActionMaker,
  Feature,
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
  convertCosmosVetoConfigToVeto,
  convertDurationToDurationWithUnits,
  convertDurationWithUnitsToDuration,
  convertVetoConfigToCosmos,
  isFeatureSupportedByVersion,
  makeWasmMessage,
} from '@dao-dao/utils'

import {
  useActionOptions,
  useMsgExecutesContract,
} from '../../../../../../actions'
import { AddressInput } from '../../../../../../components'
import { useCreateCw1Whitelist } from '../../../../../../hooks'
import {
  UpdateProposalConfigComponent,
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

export const makeUpdateProposalConfigActionMaker = ({
  version,
  address: proposalModuleAddress,
}: ProposalModule): ActionMaker<UpdateProposalConfigData> => {
  const Component: ActionComponent = (props) => {
    const { t } = useTranslation()
    const { setError, clearErrors, watch, trigger } =
      useFormContext<UpdateProposalConfigData>()

    const vetoAddressesLength = watch(
      (props.fieldNamePrefix + 'veto.addresses') as 'veto.addresses'
    ).length
    const vetoCw1WhitelistAddress = watch(
      (props.fieldNamePrefix +
        'veto.cw1WhitelistAddress') as 'veto.cw1WhitelistAddress'
    )

    const { chainContext } = useActionOptions()
    if (chainContext.type !== ActionChainContextType.Supported) {
      throw new Error('Unsupported chain context')
    }

    const {
      creatingCw1Whitelist: creatingCw1WhitelistVetoers,
      createCw1Whitelist: createCw1WhitelistVetoers,
    } = useCreateCw1Whitelist({
      // Trigger veto address field validations.
      validation: async () => {
        await trigger(
          (props.fieldNamePrefix + 'veto.addresses') as 'veto.addresses',
          {
            shouldFocus: true,
          }
        )
      },
      contractLabel: 'Multi-Vetoer cw1-whitelist',
    })

    // Prevent action from being submitted if the cw1-whitelist contract has not
    // yet been created and it needs to be.
    useEffect(() => {
      if (vetoAddressesLength > 1 && !vetoCw1WhitelistAddress) {
        setError(
          (props.fieldNamePrefix +
            'veto.cw1WhitelistAddress') as 'veto.cw1WhitelistAddress',
          {
            type: 'manual',
            message: t('error.accountListNeedsSaving'),
          }
        )
      } else {
        clearErrors(
          (props.fieldNamePrefix +
            'veto.cw1WhitelistAddress') as 'veto.cw1WhitelistAddress'
        )
      }
    }, [
      setError,
      clearErrors,
      t,
      props.fieldNamePrefix,
      vetoAddressesLength,
      vetoCw1WhitelistAddress,
    ])

    return (
      <UpdateProposalConfigComponent
        {...props}
        options={{
          version,
          createCw1WhitelistVetoers,
          creatingCw1WhitelistVetoers,
          AddressInput,
        }}
      />
    )
  }

  return ({ t, chain: { chain_id: chainId } }) => {
    const useDefaults: UseDefaults<UpdateProposalConfigData> = () => {
      const proposalModuleConfig = useCachedLoadingWithError(
        DaoProposalMultipleSelectors.configSelector({
          chainId,
          contractAddress: proposalModuleAddress,
        })
      )

      // Attempt to load cw1-whitelist admins if the vetoer is set. Will only
      // succeed if the vetoer is a cw1-whitelist contract. Otherwise it returns
      // undefined.
      const cw1WhitelistAdminsLoadable = useRecoilValueLoadable(
        !proposalModuleConfig.loading &&
          !proposalModuleConfig.errored &&
          proposalModuleConfig.data.veto
          ? Cw1WhitelistSelectors.adminsIfCw1Whitelist({
              chainId,
              contractAddress: proposalModuleConfig.data.veto.vetoer,
            })
          : constSelector(undefined)
      )

      if (
        proposalModuleConfig.loading ||
        cw1WhitelistAdminsLoadable.state === 'loading'
      ) {
        return
      } else if (proposalModuleConfig.errored) {
        return proposalModuleConfig.error
      } else if (cw1WhitelistAdminsLoadable.state === 'hasError') {
        return cw1WhitelistAdminsLoadable.contents
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
        veto: convertCosmosVetoConfigToVeto(
          proposalModuleConfig.data.veto,
          cw1WhitelistAdminsLoadable.valueMaybe()
        ),
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
        DAO_PROPOSAL_MULTIPLE_CONTRACT_NAMES,
        {
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
        }
      )

      // Attempt to load cw1-whitelist admins if the vetoer is set. Will only
      // succeed if the vetoer is a cw1-whitelist contract. Otherwise it returns
      // undefined.
      const cw1WhitelistAdminsLoadable = useRecoilValueLoadable(
        isUpdateConfig && msg.wasm.execute.msg.update_config.veto
          ? Cw1WhitelistSelectors.adminsIfCw1Whitelist({
              chainId,
              contractAddress: msg.wasm.execute.msg.update_config.veto.vetoer,
            })
          : constSelector(undefined)
      )

      if (!isUpdateConfig || cw1WhitelistAdminsLoadable.state !== 'hasValue') {
        return { match: false }
      }

      const {
        allow_revoting: allowRevoting,
        only_members_execute: onlyMembersExecute,
        max_voting_period,
        voting_strategy: votingStrategy,
        veto,
      } = msg.wasm.execute.msg.update_config

      return {
        match: true,
        data: {
          allowRevoting,
          onlyMembersExecute,
          votingDuration: convertDurationToDurationWithUnits(max_voting_period),
          proposalDurationUnits: 'seconds',
          veto: convertCosmosVetoConfigToVeto(
            veto,
            cw1WhitelistAdminsLoadable.valueMaybe()
          ),
          ...votingStrategyToProcessedQuorum(votingStrategy),
        },
      }
    }

    return {
      key: ActionKey.UpdateProposalConfig,
      Icon: BallotDepositEmoji,
      label: t('proposalModuleLabel.DaoProposalMultiple'),
      // Not used.
      description: '',
      Component,
      useDefaults,
      useTransformToCosmos,
      useDecodedCosmosMsg,
    }
  }
}
