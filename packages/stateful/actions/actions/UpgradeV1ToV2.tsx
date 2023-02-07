import { useCallback } from 'react'
import { useRecoilValueLoadable } from 'recoil'

import { UnicornEmoji } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionMaker,
  ActionOptionsContextType,
  ContractVersion,
  CoreActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types'
import { InstantiateMsg as CwPreProposeSingleInstantiateMsg } from '@dao-dao/types/contracts/DaoPreProposeSingle'
import {
  CODE_ID_CONFIG,
  makeWasmMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { AddressInput } from '../../components'
import {
  DaoProposalSingleAdapter,
  matchAndLoadCommon,
} from '../../proposal-module-adapter'
import { daoPotentialSubDaosSelector } from '../../recoil'
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
  // Only v1 DAOs.
  if (
    context.type !== ActionOptionsContextType.Dao ||
    context.info.coreVersion !== ContractVersion.V1
  ) {
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
    // Get proposal module deposit info to pass through to pre-propose. If more
    // than one proposal module, can't determine which to use, so error.
    const depositInfoSelectors = context.info.proposalModules.map(
      (proposalModule) =>
        matchAndLoadCommon(proposalModule, {
          chainId,
          coreAddress: address,
        }).selectors.depositInfo
    )
    if (depositInfoSelectors.length !== 1) {
      throw new Error(
        `Expected 1 proposal module, found ${depositInfoSelectors.length}.`
      )
    }

    const depositInfoLoadable = useRecoilValueLoadable(depositInfoSelectors[0])

    return useCallback(
      ({ subDaos }) => {
        if (depositInfoLoadable.state === 'hasError') {
          throw depositInfoLoadable.contents
        } else if (depositInfoLoadable.state === 'loading') {
          return
        }

        const depositInfo = depositInfoLoadable.contents

        const preProposeSingleInstantiateMsg: CwPreProposeSingleInstantiateMsg =
          {
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
          }

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
                        // dao-proposal-single
                        close_proposal_on_execution_failure: true,
                        pre_propose_info: {
                          module_may_propose: {
                            info: {
                              admin: { core_module: {} },
                              code_id: CODE_ID_CONFIG.DaoPreProposeSingle,
                              label: `DAO_${context.info.name}_pre-propose-${DaoProposalSingleAdapter.id}`,
                              msg: Buffer.from(
                                JSON.stringify(preProposeSingleInstantiateMsg),
                                'utf8'
                              ).toString('base64'),
                            },
                          },
                        },
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
      [depositInfoLoadable]
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
                    close_proposal_on_execution_failure: {},
                    pre_propose_info: {},
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
            subDaos: msg.wasm.migrate.msg.sub_daos,
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
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
