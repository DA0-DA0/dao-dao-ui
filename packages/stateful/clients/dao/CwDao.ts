import { Chain } from '@chain-registry/types'
import {
  FetchQueryOptions,
  QueryClient,
  skipToken,
} from '@tanstack/react-query'

import { daoDaoCoreQueries } from '@dao-dao/state/query'
import { DaoInfo, IProposalModuleBase, IVotingModuleBase } from '@dao-dao/types'
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
import {
  Cw20StakedVotingModule,
  Cw4VotingModule,
  Cw721StakedVotingModule,
  NativeStakedVotingModule,
  TokenStakedVotingModule,
} from '../voting-module'
import { DaoBase } from './base'

const getVotingModuleBases = () => [
  Cw4VotingModule,
  Cw20StakedVotingModule,
  Cw721StakedVotingModule,
  NativeStakedVotingModule,
  TokenStakedVotingModule,
]

const getProposalModuleBases = () => [
  SingleChoiceProposalModule,
  MultipleChoiceProposalModule,
]

export class CwDao extends DaoBase {
  protected _info: DaoInfo | undefined
  protected _proposalModules: readonly IProposalModuleBase[] = []
  protected _votingModule: IVotingModuleBase | undefined

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
      const VotingModule = getVotingModuleBases().find((Base) =>
        Base.contractNames.includes(info.votingModuleInfo.contract)
      )
      if (!VotingModule) {
        throw new Error('Voting module not found')
      }
      this._votingModule = new VotingModule(
        this.queryClient,
        this,
        info.votingModuleAddress,
        info.votingModuleInfo
      )

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

  get votingModule(): IVotingModuleBase {
    if (!this._votingModule) {
      throw new Error('Not initialized')
    }
    return this._votingModule
  }

  get proposalModules(): readonly IProposalModuleBase[] {
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
}
