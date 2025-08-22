import { useQueries } from '@tanstack/react-query'

import { HugeDecimal } from '@dao-dao/math'
import { daoVoteDelegationQueries } from '@dao-dao/state/query'
import { ActionBase, GearEmoji } from '@dao-dao/stateless'
import {
  ModuleId,
  UnifiedCosmosMsg,
  VoteDelegationModuleData,
} from '@dao-dao/types'
import {
  ActionComponent,
  ActionComponentProps,
  ActionContextType,
  ActionKey,
  ActionMatch,
  ActionOptions,
  ProcessedMessage,
} from '@dao-dao/types/actions'
import {
  Config,
  ExecuteMsg,
  OptionalUpdateForDecimal,
  OptionalUpdateForUint64,
  VotingPowerCapResponse,
} from '@dao-dao/types/contracts/DaoVoteDelegation'
import {
  makeCombineQueryResultsIntoLoadingDataWithError,
  makeExecuteSmartContractMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import {
  UpdateDelegationConfigComponent,
  UpdateDelegationConfigData,
} from './Component'

export class UpdateDelegationConfigAction extends ActionBase<UpdateDelegationConfigData> {
  public readonly key = ActionKey.UpdateDelegationConfig
  public readonly Component: ActionComponent

  private voteDelegationAddress: string

  constructor(
    options: ActionOptions,
    /**
     * Skip loading module from DAO by providing the address directly.
     */
    voteDelegationAddress?: string
  ) {
    if (options.context.type !== ActionContextType.Dao) {
      throw new Error(
        'UpdateDelegationConfig can only be used in a DAO context.'
      )
    }

    super(options, {
      Icon: GearEmoji,
      label: options.t('title.updateDelegationConfig'),
      description: options.t('info.updateDelegationConfigDescription'),
    })

    if (voteDelegationAddress) {
      this.voteDelegationAddress = voteDelegationAddress
    } else {
      const voteDelegation =
        options.context.dao.getModule<VoteDelegationModuleData>(
          ModuleId.VoteDelegation
        )?.values
      if (!voteDelegation?.address) {
        throw new Error('Vote delegation module not found.')
      }

      this.voteDelegationAddress = voteDelegation.address
    }

    const action = this
    this.Component = function Component(props: ActionComponentProps) {
      const currentConfig = useQueries({
        queries: [
          daoVoteDelegationQueries.config<Config & VotingPowerCapResponse>({
            chainId: options.chain.chainId,
            contractAddress: action.voteDelegationAddress,
          }),
          daoVoteDelegationQueries.votingPowerCap<
            Config & VotingPowerCapResponse
          >({
            chainId: options.chain.chainId,
            contractAddress: action.voteDelegationAddress,
            args: {},
          }),
        ],
        combine: makeCombineQueryResultsIntoLoadingDataWithError({
          firstLoad: 'one',
          errorIf: 'any',
          transform: ([config, votingPowerCap]) => ({
            validityBlocks: config.delegation_validity_blocks ?? undefined,
            vpCapPercent: votingPowerCap.vp_cap_percent
              ? HugeDecimal.from(votingPowerCap.vp_cap_percent)
                  .times(100)
                  .toNumber()
              : undefined,
            maxDelegations: config.max_delegations,
          }),
        }),
      })

      return (
        <UpdateDelegationConfigComponent
          {...props}
          options={{
            currentConfig,
          }}
        />
      )
    }
  }

  async setup() {
    const [
      { delegation_validity_blocks, max_delegations },
      { vp_cap_percent },
    ] = await Promise.all([
      this.options.queryClient.fetchQuery(
        daoVoteDelegationQueries.config({
          chainId: this.options.chain.chainId,
          contractAddress: this.voteDelegationAddress,
        })
      ),
      this.options.queryClient.fetchQuery(
        daoVoteDelegationQueries.votingPowerCap({
          chainId: this.options.chain.chainId,
          contractAddress: this.voteDelegationAddress,
          args: {},
        })
      ),
    ])

    this._defaults = {
      validityBlocks:
        typeof delegation_validity_blocks === 'number'
          ? HugeDecimal.from(delegation_validity_blocks).toString()
          : undefined,
      vpCapPercent:
        typeof vp_cap_percent === 'number'
          ? HugeDecimal.from(vp_cap_percent).times(100).toString()
          : undefined,
      maxDelegations:
        typeof max_delegations === 'number'
          ? HugeDecimal.from(max_delegations).toString()
          : undefined,
    }
  }

  encode({
    validityBlocks,
    vpCapPercent,
  }: UpdateDelegationConfigData): UnifiedCosmosMsg {
    return makeExecuteSmartContractMessage({
      chainId: this.options.chain.chainId,
      sender: this.options.address,
      contractAddress: this.voteDelegationAddress,
      msg: {
        update_config: {
          delegation_validity_blocks:
            validityBlocks === undefined
              ? null
              : validityBlocks === null
                ? 'clear'
                : { set: HugeDecimal.from(validityBlocks).toNumber() },
          vp_cap_percent:
            vpCapPercent === undefined
              ? null
              : vpCapPercent === null
                ? 'clear'
                : { set: HugeDecimal.from(vpCapPercent).div(100).toString() },
          // don't change max delegations
          // max_delegations: undefined,
        },
      } satisfies ExecuteMsg,
    })
  }

  match([
    {
      decodedMessage,
      account: { chainId, address },
    },
  ]: ProcessedMessage[]): ActionMatch {
    return (
      chainId === this.options.chain.chainId &&
      address === this.options.address &&
      objectMatchesStructure(decodedMessage, {
        wasm: {
          execute: {
            contract_addr: {},
            msg: {
              update_config: {},
            },
          },
        },
      }) &&
      decodedMessage.wasm.execute.contract_addr === this.voteDelegationAddress
    )
  }

  decode([{ decodedMessage }]: ProcessedMessage[]): UpdateDelegationConfigData {
    const { delegation_validity_blocks, max_delegations, vp_cap_percent } =
      decodedMessage.wasm.execute.msg.update_config as {
        delegation_validity_blocks: OptionalUpdateForUint64
        max_delegations?: number | null
        vp_cap_percent: OptionalUpdateForDecimal
      }

    return {
      validityBlocks: !delegation_validity_blocks
        ? undefined
        : delegation_validity_blocks === 'clear'
          ? null
          : HugeDecimal.from(delegation_validity_blocks.set).toString(),
      vpCapPercent: !vp_cap_percent
        ? undefined
        : vp_cap_percent === 'clear'
          ? null
          : HugeDecimal.from(vp_cap_percent.set).times(100).toString(),
      maxDelegations:
        typeof max_delegations !== 'number'
          ? null
          : HugeDecimal.from(max_delegations).toString(),
    }
  }
}
