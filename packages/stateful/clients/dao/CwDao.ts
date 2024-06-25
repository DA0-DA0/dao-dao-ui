import { Chain } from '@chain-registry/types'
import {
  FetchQueryOptions,
  QueryClient,
  skipToken,
} from '@tanstack/react-query'

import { daoDaoCoreQueries } from '@dao-dao/state/query'
import { DaoBase, DaoInfo, ProposalModuleBase } from '@dao-dao/types'
import {
  TotalPowerAtHeightResponse,
  VotingPowerAtHeightResponse,
} from '@dao-dao/types/contracts/DaoCore.v2'
import { getChainForChainId } from '@dao-dao/utils'

import { daoQueries } from '../../queries'
import {
  MultipleChoiceProposalModule,
  SingleChoiceProposalModule,
} from '../proposal-module'

// TODO(dao-client): move this somewhere better?
const getProposalModuleBases = () => [
  SingleChoiceProposalModule,
  MultipleChoiceProposalModule,
]

export class CwDao extends DaoBase {
  protected _info: DaoInfo | undefined
  protected _proposalModules: readonly ProposalModuleBase[] = []

  constructor(
    queryClient: QueryClient,
    protected readonly options: {
      chainId: string
      coreAddress: string
    }
  ) {
    super(queryClient)

    // Attempt immediate initialization if query is cached.
    this.setInfo(
      this.queryClient.getQueryData(
        daoQueries.info(this.queryClient, {
          chainId: this.options.chainId,
          coreAddress: this.options.coreAddress,
        }).queryKey
      )
    )
  }

  async init() {
    if (this.initialized) {
      return
    }

    this.setInfo(
      await this.queryClient.fetchQuery(
        daoQueries.info(this.queryClient, {
          chainId: this.options.chainId,
          coreAddress: this.options.coreAddress,
        })
      )
    )
  }

  protected setInfo(info: DaoInfo | undefined) {
    this._info = info

    if (info) {
      const proposalModuleBases = getProposalModuleBases()
      this._proposalModules = info.proposalModules.flatMap((proposalModule) => {
        const ProposalModule = proposalModuleBases.find((Base) =>
          Base.contractNames.includes(proposalModule.contractName)
        )

        if (!ProposalModule) {
          return []
        }

        return new ProposalModule(this.queryClient, this, proposalModule)
      })
    }
  }

  get initialized() {
    return !!this._info
  }

  get info(): DaoInfo {
    if (!this._info) {
      throw new Error('Not initialized')
    }
    return this._info
  }

  get chainId(): string {
    return this.options.chainId
  }

  get chain(): Chain {
    return getChainForChainId(this.chainId)
  }

  get coreAddress(): string {
    return this.options.coreAddress
  }

  get proposalModules(): readonly ProposalModuleBase[] {
    return this._proposalModules
  }

  getVotingPowerQuery(
    address?: string,
    height?: number
  ): FetchQueryOptions<VotingPowerAtHeightResponse> {
    // If no address, return query in loading state.
    if (!address) {
      return {
        queryKey: [],
        queryFn: skipToken,
      }
    }

    return daoDaoCoreQueries.votingPowerAtHeight({
      chainId: this.options.chainId,
      contractAddress: this.options.coreAddress,
      args: {
        address,
        height,
      },
    })
  }

  async getVotingPower(
    ...params: Parameters<CwDao['getVotingPowerQuery']>
  ): Promise<string> {
    return (
      await this.queryClient.fetchQuery(this.getVotingPowerQuery(...params))
    ).power
  }

  getTotalVotingPowerQuery(
    height?: number
  ): FetchQueryOptions<TotalPowerAtHeightResponse> {
    return daoDaoCoreQueries.totalPowerAtHeight({
      chainId: this.options.chainId,
      contractAddress: this.options.coreAddress,
      args: {
        height,
      },
    })
  }

  async getTotalVotingPower(
    ...params: Parameters<CwDao['getTotalVotingPowerQuery']>
  ): Promise<string> {
    return (
      await this.queryClient.fetchQuery(
        this.getTotalVotingPowerQuery(...params)
      )
    ).power
  }
}
