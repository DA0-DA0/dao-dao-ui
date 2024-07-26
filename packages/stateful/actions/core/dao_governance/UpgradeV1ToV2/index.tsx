import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useMemo } from 'react'
import { useRecoilValueLoadable, waitForAll } from 'recoil'

import { daoPotentialSubDaosSelector } from '@dao-dao/state/recoil'
import {
  Loader,
  UnicornEmoji,
  useCachedLoadable,
  useCachedLoading,
  useLoadingPromise,
} from '@dao-dao/stateless'
import {
  ActionChainContextType,
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMaker,
  ContractVersion,
  IDaoBase,
  LoadingData,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseHideFromPicker,
  UseTransformToCosmos,
} from '@dao-dao/types'
import { PreProposeInfo } from '@dao-dao/types/contracts/DaoProposalSingle.v2'
import {
  encodeJsonToBase64,
  makeWasmMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { getDao } from '../../../../clients'
import { AddressInput, EntityDisplay } from '../../../../components'
import { matchAndLoadCommon } from '../../../../proposal-module-adapter'
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

  const queryClient = useQueryClient()
  const daos = useLoadingPromise({
    promise:
      potentialSubDaos.state !== 'hasValue'
        ? undefined
        : async () =>
            (
              await Promise.allSettled(
                potentialSubDaos.contents.map(async (potentialSubDao) => {
                  const dao = getDao({
                    queryClient,
                    chainId,
                    coreAddress: potentialSubDao,
                  })
                  await dao.init()
                  return dao
                })
              )
            ).flatMap((l) => (l.status === 'fulfilled' ? l.value : [])),
    // Reload when query client, chain ID, or potentialSubDaos changes.
    deps: [queryClient, chainId, potentialSubDaos],
  })

  const potentialV1SubDaos: LoadingData<IDaoBase[]> = useMemo(
    () =>
      !daos.loading
        ? {
            loading: false,
            data: daos.errored
              ? []
              : daos.data.filter(
                  (dao) => dao.info.coreVersion === ContractVersion.V1
                ),
          }
        : {
            loading: true,
          },
    [daos]
  )

  return potentialV1SubDaos
}

const Component: ActionComponent = (props) => {
  const v1SubDaos = useV1SubDaos()
  const { address, context } = useActionOptions()

  return v1SubDaos.loading ? (
    <Loader />
  ) : (
    <UpgradeV1ToV2Component
      {...props}
      options={{
        v1SubDaos: v1SubDaos.data,
        // Has parent if admin is not self.
        hasParent:
          context.type === ActionContextType.Dao &&
          context.dao.info.admin !== address,
        onV1:
          context.type === ActionContextType.Dao &&
          context.dao.coreVersion === ContractVersion.V1,
        AddressInput,
        EntityDisplay,
      }}
    />
  )
}

export const makeUpgradeV1ToV2Action: ActionMaker<UpgradeV1ToV2Data> = ({
  context,
  t,
  address,
  chain,
  chainContext,
}) => {
  if (
    context.type !== ActionContextType.Dao ||
    // If no DAO migrator, don't show upgrade action.
    chainContext.type !== ActionChainContextType.Supported ||
    chainContext.config.codeIds.DaoMigrator <= 0
  ) {
    return null
  }

  const { codeIds } = chainContext.config

  const useDefaults: UseDefaults<UpgradeV1ToV2Data> = () => {
    // Load sub DAOs for registering as the current DAO upgrades to v2. If this
    // DAO is not on v1, there are no SubDAOs to load.
    const potentialSubDaos = useCachedLoading(
      context.dao.coreVersion === ContractVersion.V1
        ? daoPotentialSubDaosSelector({
            coreAddress: address,
            chainId: chain.chain_id,
          })
        : undefined,
      []
    )

    return {
      targetAddress:
        // If DAO is not on v1, don't default to the DAO address.
        context.dao.coreVersion === ContractVersion.V1 ? address : '',
      subDaos: !potentialSubDaos.loading
        ? potentialSubDaos.data.map((addr) => ({
            addr,
          }))
        : [],
    }
  }

  const useTransformToCosmos: UseTransformToCosmos<UpgradeV1ToV2Data> = () => {
    const v1SubDaos = useV1SubDaos()

    // Get proposal module deposit info to pass through to pre-propose.
    const depositInfoSelectors = v1SubDaos.loading
      ? []
      : v1SubDaos.data.map((dao) =>
          dao.proposalModules.map(
            (proposalModule) =>
              matchAndLoadCommon(dao, proposalModule.address).selectors
                .depositInfo
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
        if (proposalModuleDepositInfosLoadable.state === 'hasError') {
          throw proposalModuleDepositInfosLoadable.contents
        }

        if (
          v1SubDaos.loading ||
          v1SubDaos.updating ||
          proposalModuleDepositInfosLoadable.state === 'loading' ||
          proposalModuleDepositInfosLoadable.updating
        ) {
          return
        }

        // Get proposal module deposit infos for the target DAO based on the
        // index of the address in the available DAOs list.
        const targetDaoIndex = v1SubDaos.data.findIndex(
          ({ coreAddress }) => coreAddress === targetAddress
        )
        if (targetDaoIndex === -1) {
          throw new Error(t('error.loadingData'))
        }

        const { proposalModules } = v1SubDaos.data[targetDaoIndex].info
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
                    code_id: codeIds.DaoPreProposeSingle,
                    label: `dao-pre-propose-single_${index}_${Date.now()}`,
                    funds: [],
                    msg: encodeJsonToBase64({
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
              new_code_id: codeIds.DaoCore,
              msg: {
                from_v1: {
                  dao_uri: `https://daodao.zone/dao/${targetAddress}`,
                  params: {
                    migrator_code_id: codeIds.DaoMigrator,
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
                        proposal_single: codeIds.DaoProposalSingle,
                        cw4_voting: codeIds.DaoVotingCw4,
                        cw20_stake: codeIds.Cw20Stake ?? -1,
                        cw20_staked_balances_voting:
                          codeIds.DaoVotingCw20Staked ?? -1,
                      },
                    },
                  },
                },
              },
            },
          },
        })
      },
      [v1SubDaos, proposalModuleDepositInfosLoadable]
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

  // Hide from picker if the current DAO is not on v1 and there are no SubDAOs
  // on v1. Thus, there is nothing to upgrade.
  const useHideFromPicker: UseHideFromPicker = () => {
    const v1SubDaos = useV1SubDaos()

    return (
      context.dao.coreVersion !== ContractVersion.V1 ||
      v1SubDaos.loading ||
      v1SubDaos.data.length === 0
    )
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
    useHideFromPicker,
  }
}
