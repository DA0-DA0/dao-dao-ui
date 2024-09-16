import { QueryClient, useQueryClient } from '@tanstack/react-query'
import uniq from 'lodash.uniq'

import { daoQueries } from '@dao-dao/state/query'
import {
  ActionBase,
  ErrorPage,
  Loader,
  UnicornEmoji,
  useActionOptions,
  useLoadingPromise,
} from '@dao-dao/stateless'
import {
  ActionChainContextType,
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMatch,
  ActionOptions,
  ContractVersion,
  IDaoBase,
  ProcessedMessage,
  UnifiedCosmosMsg,
} from '@dao-dao/types'
import { PreProposeInfo } from '@dao-dao/types/contracts/DaoProposalSingle.v2'
import {
  encodeJsonToBase64,
  makeWasmMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { getDao } from '../../../../clients'
import { AddressInput, EntityDisplay } from '../../../../components'
import { UpgradeV1ToV2Component, UpgradeV1ToV2Data } from './Component'

const getSubDaos = async (
  queryClient: QueryClient,
  chainId: string,
  address: string
): Promise<IDaoBase[]> => {
  // Merge registered SubDAOs and potential SubDAOs from indexer.
  const subDaoAddresses = uniq(
    (
      await Promise.all([
        queryClient
          .fetchQuery(
            daoQueries.listAllSubDaos(queryClient, {
              chainId,
              address,
            })
            // This action only supports same-chain upgrades right now.
          )
          .then((subDaos) =>
            subDaos.flatMap((d) => (d.chainId === chainId ? d.addr : []))
          )
          // Fails for V1 DAOs, which don't support SubDAOs.
          .catch(() => []),
        queryClient
          .fetchQuery(
            daoQueries.listPotentialSubDaos(queryClient, {
              chainId,
              address,
            })
          )
          // Fails for chains without indexers.
          .catch(() => []),
      ])
    ).flat()
  )

  const subDaos = (
    await Promise.allSettled(
      subDaoAddresses.map(async (coreAddress) => {
        const dao = getDao({
          queryClient,
          chainId,
          coreAddress,
        })
        await dao.init()
        return dao
      })
    )
  ).flatMap((l) => (l.status === 'fulfilled' ? l.value : []))

  return subDaos
}

const Component: ActionComponent = (props) => {
  const {
    chain: { chain_id: chainId },
    address,
    context,
  } = useActionOptions()
  const queryClient = useQueryClient()
  const v1SubDaos = useLoadingPromise({
    promise: async () =>
      (await getSubDaos(queryClient, chainId, address)).filter(
        (d) => d.coreVersion === ContractVersion.V1
      ),
    deps: [queryClient, chainId, address],
  })

  return v1SubDaos.loading ? (
    <Loader />
  ) : v1SubDaos.errored ? (
    <ErrorPage error={v1SubDaos.error} />
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

export class UpgradeV1ToV2Action extends ActionBase<UpgradeV1ToV2Data> {
  public readonly key = ActionKey.UpgradeV1ToV2
  public readonly Component = Component

  private subDaos: IDaoBase[] = []

  constructor(options: ActionOptions) {
    if (options.context.type !== ActionContextType.Dao) {
      throw new Error('Not DAO context')
    }

    // If no DAO migrator, don't show upgrade action.
    if (
      options.chainContext.type !== ActionChainContextType.Supported ||
      !options.chainContext.config.codeIds.DaoMigrator
    ) {
      throw new Error('No DAO migrator on this chain')
    }

    super(options, {
      Icon: UnicornEmoji,
      label: options.t('title.upgradeToV2'),
      description: options.t('info.upgradeToV2Description'),
      // Hide by default and reveal if this DAO is V1 or there are V1 SubDAOs to
      // upgrade, in setup.
      hideFromPicker: true,
      notReusable: true,
    })

    // Fire async init immediately since we may show this action.
    this.init().catch(() => {})
  }

  async setup() {
    // Type-check. Should never happen since this is checked in the constructor.
    if (this.options.context.type !== ActionContextType.Dao) {
      throw new Error('Not DAO context')
    }

    this.subDaos = await getSubDaos(
      this.options.queryClient,
      this.options.chain.chain_id,
      this.options.address
    )

    // Hide from picker if current DAO is not on v1 and there are no V1 SubDAOs
    // to upgrade.
    this.metadata.hideFromPicker =
      this.options.context.dao.coreVersion !== ContractVersion.V1 &&
      this.subDaos.filter((s) => s.coreVersion === ContractVersion.V1)
        .length === 0

    this.defaults = {
      targetAddress:
        // If DAO is not on v1, don't default to the DAO address.
        this.options.context.dao.coreVersion === ContractVersion.V1
          ? this.options.address
          : '',
      subDaos: this.subDaos.map(({ coreAddress }) => ({
        addr: coreAddress,
      })),
    }
  }

  async encode({
    targetAddress,
    subDaos,
  }: UpgradeV1ToV2Data): Promise<UnifiedCosmosMsg> {
    // Type-check. Should never happen since this is checked in the constructor.
    if (this.options.context.type !== ActionContextType.Dao) {
      throw new Error('Not DAO context')
    }

    // Type-check. Should never happen since this is checked in the constructor.
    if (this.options.chainContext.type !== ActionChainContextType.Supported) {
      throw new Error('No DAO migrator on this chain')
    }

    const dao =
      targetAddress === this.options.address
        ? this.options.context.dao
        : this.subDaos.find(({ coreAddress }) => coreAddress === targetAddress)
    if (!dao) {
      throw new Error('Invalid target DAO')
    }

    // The deposit infos are ordered to match the proposal modules in the DAO
    // core list, which is what the migration contract expects.
    const proposalModuleDepositInfos = await Promise.all(
      dao.proposalModules.map(async (p) => ({
        address: p.address,
        depositInfo: await this.options.queryClient.fetchQuery(
          p.getDepositInfoQuery()
        ),
      }))
    )

    const {
      DaoCore,
      DaoMigrator,
      DaoPreProposeSingle,
      DaoProposalSingle,
      DaoVotingCw4,
      Cw20Stake,
      DaoVotingCw20Staked,
    } = this.options.chainContext.config.codeIds

    // Array of tuples of each proposal module address and its params.
    const proposalParams = proposalModuleDepositInfos.map(
      ({ address, depositInfo }, index) => [
        address,
        {
          close_proposal_on_execution_failure: true,
          pre_propose_info: {
            module_may_propose: {
              info: {
                admin: { core_module: {} },
                code_id: DaoPreProposeSingle,
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
          new_code_id: DaoCore,
          msg: {
            from_v1: {
              dao_uri: `https://daodao.zone/dao/${targetAddress}`,
              params: {
                migrator_code_id: DaoMigrator,
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
                    proposal_single: DaoProposalSingle,
                    cw4_voting: DaoVotingCw4,
                    cw20_stake: Cw20Stake,
                    cw20_staked_balances_voting: DaoVotingCw20Staked,
                  },
                },
              },
            },
          },
        },
      },
    })
  }

  match([{ decodedMessage }]: ProcessedMessage[]): ActionMatch {
    return objectMatchesStructure(decodedMessage, {
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
  }

  decode([{ decodedMessage }]: ProcessedMessage[]): UpgradeV1ToV2Data {
    return {
      targetAddress: decodedMessage.wasm.migrate.contract_addr,
      subDaos: decodedMessage.wasm.migrate.msg.from_v1.params.params.sub_daos,
    }
  }
}
