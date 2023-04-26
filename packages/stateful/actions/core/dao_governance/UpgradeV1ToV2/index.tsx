import { useCallback, useMemo } from 'react'
import { useRecoilValueLoadable, waitForAll, waitForAllSettled } from 'recoil'

import {
  DaoCoreV2Selectors,
  contractVersionSelector,
  isContractSelector,
} from '@dao-dao/state/recoil'
import { Loader, UnicornEmoji, useCachedLoadable } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMaker,
  ContractVersion,
  LoadingData,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types'
import { PreProposeInfo } from '@dao-dao/types/contracts/DaoProposalSingle.v2'
import {
  CODE_ID_CONFIG,
  makeWasmMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { AddressInput, EntityDisplay } from '../../../../components'
import {
  DaoProposalSingleAdapter,
  matchAndLoadCommon,
} from '../../../../proposal-module-adapter'
import {
  daoCoreProposalModulesSelector,
  daoPotentialSubDaosSelector,
} from '../../../../recoil'
import { useActionOptions } from '../../../react'
import { UpgradeV1ToV2Component, UpgradeV1ToV2Data } from './Component'

const useV1SubDaos = () => {
  const {
    address,
    chain: { chain_id: chainId },
  } = useActionOptions()

  const potentialSubDaos = useRecoilValueLoadable(
    daoPotentialSubDaosSelector({
      coreAddress: address,
      chainId,
    })
  )
  // Verify that the potential SubDAOs are actually DAOs.
  const potentialSubDaosAreDaos = useCachedLoadable(
    potentialSubDaos.state === 'hasValue'
      ? waitForAll(
          potentialSubDaos.contents.map((contractAddress) =>
            isContractSelector({
              contractAddress,
              chainId,
              names: [
                // V1
                'cw-core',
                // V2
                'cwd-core',
                'dao-core',
              ],
            })
          )
        )
      : undefined
  )
  // Get the versions of the potential SubDAOs.
  const potentialSubDaoVersions = useCachedLoadable(
    potentialSubDaos.state === 'hasValue'
      ? waitForAllSettled(
          potentialSubDaos.contents.map((contractAddress) =>
            contractVersionSelector({ contractAddress })
          )
        )
      : undefined
  )

  const potentialV1SubDaos: LoadingData<string[]> = useMemo(
    () =>
      potentialSubDaos.state === 'hasValue' &&
      potentialSubDaosAreDaos.state === 'hasValue' &&
      potentialSubDaoVersions.state === 'hasValue'
        ? {
            loading: false,
            data: potentialSubDaos.contents.filter(
              (_, i) =>
                potentialSubDaosAreDaos.contents[i] &&
                potentialSubDaoVersions.contents[i].state === 'hasValue' &&
                potentialSubDaoVersions.contents[i].contents ===
                  ContractVersion.V1
            ),
          }
        : {
            loading: true,
          },
    [potentialSubDaoVersions, potentialSubDaos, potentialSubDaosAreDaos]
  )

  return potentialV1SubDaos
}

const Component: ActionComponent = (props) => {
  const v1SubDaos = useV1SubDaos()

  return v1SubDaos.loading ? (
    <Loader />
  ) : (
    <UpgradeV1ToV2Component
      {...props}
      options={{
        v1SubDaos: v1SubDaos.data,
        AddressInput,
        EntityDisplay,
      }}
    />
  )
}

export const makeUpgradeV1ToV2: ActionMaker<UpgradeV1ToV2Data> = ({
  context,
  t,
  address,
  chain,
}) => {
  if (context.type !== ActionContextType.Dao) {
    return null
  }

  const useDefaults: UseDefaults<UpgradeV1ToV2Data> = () => {
    const potentialSubDaos = useRecoilValueLoadable(
      daoPotentialSubDaosSelector({
        coreAddress: address,
        chainId: chain.chain_id,
      })
    )

    return {
      targetAddress:
        // If DAO is not on v1, don't default to the DAO address.
        context.info.coreVersion === ContractVersion.V1 ? address : '',
      subDaos:
        context.info.coreVersion === ContractVersion.V1 &&
        potentialSubDaos.state === 'hasValue'
          ? potentialSubDaos.contents.map((addr) => ({
              addr,
            }))
          : [],
    }
  }

  const useTransformToCosmos: UseTransformToCosmos<UpgradeV1ToV2Data> = () => {
    const v1SubDaos = useV1SubDaos()
    const v1SubDaoProposalModules = useCachedLoadable(
      v1SubDaos.loading
        ? undefined
        : waitForAll(
            v1SubDaos.data.map((coreAddress) =>
              daoCoreProposalModulesSelector({
                coreAddress,
                chainId: chain.chain_id,
              })
            )
          )
    )
    const v1SubDaoConfigs = useCachedLoadable(
      v1SubDaos.loading
        ? undefined
        : waitForAll(
            v1SubDaos.data.map((contractAddress) =>
              DaoCoreV2Selectors.configSelector({
                contractAddress,
                chainId: chain.chain_id,
                params: [],
              })
            )
          )
    )

    const availableDaos = useMemo(
      () =>
        !v1SubDaos.loading &&
        v1SubDaoProposalModules.state === 'hasValue' &&
        v1SubDaoConfigs.state === 'hasValue'
          ? [
              {
                address,
                name: context.info.name,
                proposalModules: context.info.proposalModules,
              },
              ...v1SubDaos.data.map((address, index) => ({
                address,
                name: v1SubDaoConfigs.contents[index].name,
                proposalModules: v1SubDaoProposalModules.contents[index],
              })),
            ]
          : undefined,
      [v1SubDaoProposalModules, v1SubDaoConfigs, v1SubDaos]
    )

    // Get proposal module deposit info to pass through to pre-propose.
    const depositInfoSelectors = availableDaos?.map(
      ({ address: coreAddress, proposalModules }) =>
        proposalModules.map(
          (proposalModule) =>
            matchAndLoadCommon(proposalModule, {
              chain,
              coreAddress,
            }).selectors.depositInfo
        )
    )
    // The deposit infos are ordered to match the proposal modules in the DAO
    // core list, which is what the migration contract expects.
    const proposalModuleDepositInfosLoadable = useCachedLoadable(
      depositInfoSelectors
        ? waitForAll(
            depositInfoSelectors.map((selectors) => waitForAll(selectors))
          )
        : undefined
    )

    return useCallback(
      ({ targetAddress, subDaos }) => {
        if (
          !availableDaos ||
          proposalModuleDepositInfosLoadable.state === 'loading'
        ) {
          return
        }

        if (proposalModuleDepositInfosLoadable.state === 'hasError') {
          throw proposalModuleDepositInfosLoadable.contents
        }

        // Get proposal module deposit infos for the target DAO based on the
        // index of the address in the available DAOs list.
        const targetDaoIndex = availableDaos.findIndex(
          ({ address }) => address === targetAddress
        )
        if (targetDaoIndex === -1) {
          throw new Error(t('error.loadingData'))
        }

        const { name, proposalModules } = availableDaos[targetDaoIndex]
        const proposalModuleDepositInfos =
          proposalModuleDepositInfosLoadable.contents[targetDaoIndex]

        // Array of tuples of each proposal module address and its params.
        const proposalParams = proposalModuleDepositInfos.map(
          (depositInfo, index) => [
            proposalModules[index].address,
            {
              close_proposal_on_execution_failure: true,
              pre_propose_info: {
                module_may_propose: {
                  info: {
                    admin: { core_module: {} },
                    code_id: CODE_ID_CONFIG.DaoPreProposeSingle,
                    label: `DAO_${name}_pre-propose-${DaoProposalSingleAdapter.id}`,
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
              contract_addr: targetAddress,
              new_code_id: CODE_ID_CONFIG.DaoCore,
              msg: {
                from_v1: {
                  dao_uri: `https://daodao.zone/dao/${targetAddress}`,
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
                        cw20_stake: 430,
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
      [availableDaos, proposalModuleDepositInfosLoadable]
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
            targetAddress: msg.wasm.migrate.contract_addr,
            subDaos: msg.wasm.migrate.msg.from_v1.params.params.sub_daos,
          },
        }
      : {
          match: false,
        }

  return {
    key: ActionKey.UpgradeV1ToV2,
    Icon: UnicornEmoji,
    label: t('title.upgradeToV2'),
    description: t('info.upgradeToV2Description'),
    notReusable: true,
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
