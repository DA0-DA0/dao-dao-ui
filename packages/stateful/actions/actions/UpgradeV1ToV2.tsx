import { useCallback } from 'react'
import {
  constSelector,
  useRecoilValue,
  useRecoilValueLoadable,
  waitForAll,
} from 'recoil'

import {
  DaoVotingCw20StakedSelectors,
  contractSelector,
} from '@dao-dao/state/recoil'
import { UnicornEmoji, useCachedLoadable } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionContextType,
  ActionMaker,
  ContractVersion,
  CoreActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types'
import { PreProposeInfo } from '@dao-dao/types/contracts/DaoProposalSingle.v2'
import {
  CODE_ID_CONFIG,
  DaoVotingCw20StakedAdapterId,
  makeWasmMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { AddressInput } from '../../components'
import {
  DaoProposalSingleAdapter,
  matchAndLoadCommon,
} from '../../proposal-module-adapter'
import { daoPotentialSubDaosSelector } from '../../recoil'
import { useVotingModuleAdapterContextIfAvailable } from '../../voting-module-adapter/react/context'
import {
  UpgradeV1ToV2Component,
  UpgradeV1ToV2Data,
} from '../components/UpgradeV1ToV2'

const Component: ActionComponent = (props) => (
  <UpgradeV1ToV2Component
    {...props}
    options={{
      AddressInput,
    }}
  />
)

export const makeUpgradeV1ToV2: ActionMaker<UpgradeV1ToV2Data> = ({
  context,
  t,
  address,
  chainId,
}) => {
  if (context.type !== ActionContextType.Dao) {
    return null
  }

  const useDefaults: UseDefaults<UpgradeV1ToV2Data> = () => {
    const potentialSubDaos = useRecoilValueLoadable(
      daoPotentialSubDaosSelector({
        coreAddress: address,
        chainId,
      })
    )

    return {
      subDaos:
        potentialSubDaos.state === 'hasValue'
          ? potentialSubDaos.contents.map((addr) => ({
              addr,
            }))
          : [],
    }
  }

  const useTransformToCosmos: UseTransformToCosmos<UpgradeV1ToV2Data> = () => {
    // Get proposal module deposit info to pass through to pre-propose.
    const depositInfoSelectors = context.info.proposalModules.map(
      (proposalModule) =>
        matchAndLoadCommon(proposalModule, {
          chainId,
          coreAddress: address,
        }).selectors.depositInfo
    )
    // The deposit infos are ordered to match the proposal modules in the DAO
    // core list, which is what the migration contract expects.
    const proposalModuleDepositInfosLoadable = useCachedLoadable(
      waitForAll(depositInfoSelectors)
    )

    // If the DAO is using the CW20 staked voting module, we need to get the
    // staking contract address to pass through the code ID to the migration
    // contract. It may be the legacy code ID or the v1 code ID.
    const { id } = useVotingModuleAdapterContextIfAvailable() ?? {}
    const stakingContractAddress = useRecoilValue(
      id === DaoVotingCw20StakedAdapterId
        ? DaoVotingCw20StakedSelectors.stakingContractSelector({
            contractAddress: context.info.votingModuleAddress,
            params: [],
            chainId,
          })
        : constSelector(undefined)
    )
    const stakingContract = useRecoilValue(
      stakingContractAddress
        ? contractSelector({
            contractAddress: stakingContractAddress,
            chainId,
          })
        : constSelector(undefined)
    )

    return useCallback(
      ({ subDaos }) => {
        if (proposalModuleDepositInfosLoadable.state === 'hasError') {
          throw proposalModuleDepositInfosLoadable.contents
        } else if (proposalModuleDepositInfosLoadable.state === 'loading') {
          return
        }

        // Array of tuples of each proposal module address and its params.
        const proposalParams = proposalModuleDepositInfosLoadable.contents.map(
          (depositInfo, index) => [
            context.info.proposalModules[index].address,
            {
              close_proposal_on_execution_failure: true,
              pre_propose_info: {
                module_may_propose: {
                  info: {
                    admin: { core_module: {} },
                    code_id: CODE_ID_CONFIG.DaoPreProposeSingle,
                    label: `DAO_${context.info.name}_pre-propose-${DaoProposalSingleAdapter.id}`,
                    msg: Buffer.from(
                      JSON.stringify({
                        deposit_info: depositInfo
                          ? {
                              amount: depositInfo.amount,
                              denom: {
                                token: {
                                  denom: depositInfo.denom,
                                },
                              },
                              refund_policy: depositInfo.refund_policy,
                            }
                          : null,
                        extension: {},
                        open_proposal_submission: false,
                      }),
                      'utf8'
                    ).toString('base64'),
                  },
                },
              },
            },
          ]
        ) as [
          string,
          {
            close_proposal_on_execution_failure: boolean
            pre_propose_info: PreProposeInfo
          }
        ][]

        return makeWasmMessage({
          wasm: {
            migrate: {
              contract_addr: address,
              new_code_id: CODE_ID_CONFIG.DaoCore,
              msg: {
                from_v1: {
                  dao_uri: `https://daodao.zone/dao/${address}`,
                  params: {
                    migrator_code_id: CODE_ID_CONFIG.DaoMigrator,
                    params: {
                      sub_daos: subDaos,
                      migration_params: {
                        migrate_stake_cw20_manager: true,
                        proposal_params: proposalParams,
                      },
                      v1_code_ids: {
                        proposal_single: 427,
                        cw4_voting: 429,
                        cw20_stake: stakingContract?.codeId ?? 430,
                        cw20_staked_balances_voting: 431,
                      },
                      v2_code_ids: {
                        proposal_single: CODE_ID_CONFIG.DaoProposalSingle,
                        cw4_voting: CODE_ID_CONFIG.DaoVotingCw4,
                        cw20_stake: CODE_ID_CONFIG.Cw20Stake,
                        cw20_staked_balances_voting:
                          CODE_ID_CONFIG.DaoVotingCw20Staked,
                      },
                    },
                  },
                },
              },
            },
          },
        })
      },
      [proposalModuleDepositInfosLoadable, stakingContract?.codeId]
    )
  }

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<UpgradeV1ToV2Data> = (msg) =>
    objectMatchesStructure(msg, {
      wasm: {
        migrate: {
          contract_addr: {},
          new_code_id: {},
          msg: {
            from_v1: {
              dao_uri: {},
              params: {
                migrator_code_id: {},
                params: {
                  sub_daos: {},
                  migration_params: {
                    migrate_stake_cw20_manager: {},
                    proposal_params: {},
                  },
                  v1_code_ids: {
                    proposal_single: {},
                    cw4_voting: {},
                    cw20_stake: {},
                    cw20_staked_balances_voting: {},
                  },
                  v2_code_ids: {
                    proposal_single: {},
                    cw4_voting: {},
                    cw20_stake: {},
                    cw20_staked_balances_voting: {},
                  },
                },
              },
            },
          },
        },
      },
    })
      ? {
          match: true,
          data: {
            subDaos: msg.wasm.migrate.msg.from_v1.params.params.sub_daos,
          },
        }
      : {
          match: false,
        }

  return {
    key: CoreActionKey.UpgradeV1ToV2,
    Icon: UnicornEmoji,
    label: t('title.upgradeToV2'),
    description: t('info.upgradeToV2Description'),
    Component,
    // Only allow v1 DAOs to use this action, but still show it for v2 DAOs
    // since they may have used it to upgrade from v1 in the past.
    disallowCreation: context.info.coreVersion !== ContractVersion.V1,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
