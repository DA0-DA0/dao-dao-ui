import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  cw1WhitelistExtraQueries,
  daoProposalMultipleQueries,
} from '@dao-dao/state/query'
import {
  ActionBase,
  BallotDepositEmoji,
  useActionOptions,
} from '@dao-dao/stateless'
import {
  ActionChainContextType,
  ActionComponent,
  ActionKey,
  ActionMatch,
  ActionOptions,
  Feature,
  IProposalModuleBase,
  ProcessedMessage,
  UnifiedCosmosMsg,
} from '@dao-dao/types'
import {
  ExecuteMsg,
  PercentageThreshold,
  VotingStrategy,
} from '@dao-dao/types/contracts/DaoProposalMultiple'
import {
  convertCosmosVetoConfigToVeto,
  convertDurationToDurationWithUnits,
  convertDurationWithUnitsToDuration,
  convertVetoConfigToCosmos,
  isFeatureSupportedByVersion,
  makeExecuteSmartContractMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

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

export class DaoProposalMultipleUpdateConfigAction extends ActionBase<UpdateProposalConfigData> {
  public readonly key = ActionKey.UpdateProposalConfig
  public readonly Component: ActionComponent<
    undefined,
    UpdateProposalConfigData
  >

  constructor(
    options: ActionOptions,
    private proposalModule: IProposalModuleBase
  ) {
    super(options, {
      Icon: BallotDepositEmoji,
      label: options.t('proposalModuleLabel.DaoProposalMultiple'),
      // Unused.
      description: '',
    })

    this.Component = function DaoProposalMultipleUpdateConfigActionComponent(
      props
    ) {
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

      // Prevent action from being submitted if the cw1-whitelist contract has
      // not yet been created and it needs to be.
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
            version: proposalModule.version,
            createCw1WhitelistVetoers,
            creatingCw1WhitelistVetoers,
            AddressInput,
          }}
        />
      )
    }
  }

  async setup() {
    const config = await this.options.queryClient.fetchQuery(
      daoProposalMultipleQueries.config(this.options.queryClient, {
        chainId: this.proposalModule.chainId,
        contractAddress: this.proposalModule.address,
      })
    )

    // Attempt to load cw1-whitelist admins if the vetoer is set. Will only
    // succeed if the vetoer is a cw1-whitelist contract. Otherwise it returns
    // null.
    const cw1WhitlistAdmins = config.veto
      ? await this.options.queryClient.fetchQuery(
          cw1WhitelistExtraQueries.adminsIfCw1Whitelist(
            this.options.queryClient,
            {
              chainId: this.proposalModule.chainId,
              address: config.veto.vetoer,
            }
          )
        )
      : null

    this.defaults = {
      onlyMembersExecute: config.only_members_execute,
      votingDuration: convertDurationToDurationWithUnits(
        config.max_voting_period
      ),
      allowRevoting: config.allow_revoting,
      veto: convertCosmosVetoConfigToVeto(config.veto, cw1WhitlistAdmins),
      ...votingStrategyToProcessedQuorum(config.voting_strategy),
    }
  }

  async encode(data: UpdateProposalConfigData): Promise<UnifiedCosmosMsg> {
    const config = await this.options.queryClient.fetchQuery(
      daoProposalMultipleQueries.config(this.options.queryClient, {
        chainId: this.proposalModule.chainId,
        contractAddress: this.proposalModule.address,
      })
    )

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
        ...(this.proposalModule.version &&
          isFeatureSupportedByVersion(
            Feature.Veto,
            this.proposalModule.version
          ) && {
            veto: convertVetoConfigToCosmos(data.veto),
          }),
        // Pass through because we don't support changing them yet.
        dao: config.dao,
        close_proposal_on_execution_failure:
          config.close_proposal_on_execution_failure,
        min_voting_period: config.min_voting_period,
      },
    }

    return makeExecuteSmartContractMessage({
      chainId: this.proposalModule.chainId,
      contractAddress: this.proposalModule.address,
      sender: this.options.address,
      msg: updateConfigMessage,
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
      }) &&
      chainId === this.proposalModule.chainId &&
      decodedMessage.wasm.execute.contract_addr === this.proposalModule.address
    )
  }

  async decode([
    { decodedMessage },
  ]: ProcessedMessage[]): Promise<UpdateProposalConfigData> {
    const config = decodedMessage.wasm.execute.msg.update_config

    // Attempt to load cw1-whitelist admins if the vetoer is set. Will only
    // succeed if the vetoer is a cw1-whitelist contract. Otherwise it returns
    // null.
    const cw1WhitlistAdmins = config.veto
      ? await this.options.queryClient.fetchQuery(
          cw1WhitelistExtraQueries.adminsIfCw1Whitelist(
            this.options.queryClient,
            {
              chainId: this.proposalModule.chainId,
              address: config.veto.vetoer,
            }
          )
        )
      : null

    return {
      onlyMembersExecute: config.only_members_execute,
      votingDuration: convertDurationToDurationWithUnits(
        config.max_voting_period
      ),
      allowRevoting: config.allow_revoting,
      veto: convertCosmosVetoConfigToVeto(config.veto, cw1WhitlistAdmins),
      ...votingStrategyToProcessedQuorum(config.voting_strategy),
    }
  }
}
