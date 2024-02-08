import { useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { constSelector, useRecoilValueLoadable } from 'recoil'

import {
  Cw1WhitelistSelectors,
  DaoProposalSingleV2Selectors,
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
  ContractVersion,
  Feature,
  ProposalModule,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types'
import { Threshold } from '@dao-dao/types/contracts/DaoProposalSingle.common'
import { ExecuteMsg } from '@dao-dao/types/contracts/DaoProposalSingle.v2'
import {
  ContractName,
  DAO_PROPOSAL_SINGLE_CONTRACT_NAMES,
  convertCosmosVetoConfigToVeto,
  convertDurationToDurationWithUnits,
  convertDurationWithUnitsToDuration,
  convertVetoConfigToCosmos,
  isFeatureSupportedByVersion,
  makeWasmMessage,
  versionGte,
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

export const makeUpdateProposalConfigV2ActionMaker = ({
  version,
  address: proposalModuleAddress,
  prePropose,
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
        DAO_PROPOSAL_SINGLE_CONTRACT_NAMES,
        {
          update_config: {
            threshold: {},
            max_voting_period: {},
            only_members_execute: {},
            allow_revoting: {},
            dao: {},
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

      const config = msg.wasm.execute.msg.update_config
      const onlyMembersExecute = config.only_members_execute

      const allowRevoting = !!config.allow_revoting

      return {
        match: true,
        data: {
          onlyMembersExecute,
          votingDuration: convertDurationToDurationWithUnits(
            config.max_voting_period
          ),
          allowRevoting,
          veto: convertCosmosVetoConfigToVeto(
            config.veto,
            cw1WhitelistAdminsLoadable.valueMaybe()
          ),
          ...thresholdToTQData(config.threshold),
        },
      }
    }

    return {
      key: ActionKey.UpdateProposalConfig,
      Icon: BallotDepositEmoji,
      label: t('proposalModuleLabel.DaoProposalSingle', {
        context:
          // If this is an approver proposal module that approves proposals in
          // another DAO, specify that.
          prePropose?.contractName === ContractName.PreProposeApprover
            ? 'approval'
            : undefined,
      }),
      // Not used.
      description: '',
      Component,
      useDefaults,
      useTransformToCosmos,
      useDecodedCosmosMsg,
    }
  }
}
