import { Coin, StdFee } from '@cosmjs/amino'
import {
  CosmWasmClient,
  ExecuteInstruction,
  ExecuteResult,
  SigningCosmWasmClient,
} from '@cosmjs/cosmwasm-stargate'

import { Empty, Expiration } from '@dao-dao/types/contracts/common'
import {
  AllNftInfoResponse,
  AllOperatorsResponse,
  AllTokensResponse,
  ApprovalResponse,
  ApprovalsResponse,
  ContractInfoResponse,
  MinterResponse,
  NftInfoResponse,
  NumTokensResponse,
  OwnerOfResponse,
  TokensResponse,
} from '@dao-dao/types/contracts/Cw721Base'

export interface Cw721BaseReadOnlyInterface {
  contractAddress: string
  ownerOf: ({
    includeExpired,
    tokenId,
  }: {
    includeExpired?: boolean
    tokenId: string
  }) => Promise<OwnerOfResponse>
  approval: ({
    includeExpired,
    spender,
    tokenId,
  }: {
    includeExpired?: boolean
    spender: string
    tokenId: string
  }) => Promise<ApprovalResponse>
  approvals: ({
    includeExpired,
    tokenId,
  }: {
    includeExpired?: boolean
    tokenId: string
  }) => Promise<ApprovalsResponse>
  allOperators: ({
    includeExpired,
    limit,
    owner,
    startAfter,
  }: {
    includeExpired?: boolean
    limit?: number
    owner: string
    startAfter?: string
  }) => Promise<AllOperatorsResponse>
  numTokens: () => Promise<NumTokensResponse>
  contractInfo: () => Promise<ContractInfoResponse>
  nftInfo: ({ tokenId }: { tokenId: string }) => Promise<NftInfoResponse>
  allNftInfo: ({
    includeExpired,
    tokenId,
  }: {
    includeExpired?: boolean
    tokenId: string
  }) => Promise<AllNftInfoResponse>
  tokens: ({
    limit,
    owner,
    startAfter,
  }: {
    limit?: number
    owner: string
    startAfter?: string
  }) => Promise<TokensResponse>
  allTokens: ({
    limit,
    startAfter,
  }: {
    limit?: number
    startAfter?: string
  }) => Promise<AllTokensResponse>
  minter: () => Promise<MinterResponse>
}
export class Cw721BaseQueryClient implements Cw721BaseReadOnlyInterface {
  client: CosmWasmClient
  contractAddress: string

  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client
    this.contractAddress = contractAddress
    this.ownerOf = this.ownerOf.bind(this)
    this.approval = this.approval.bind(this)
    this.approvals = this.approvals.bind(this)
    this.allOperators = this.allOperators.bind(this)
    this.numTokens = this.numTokens.bind(this)
    this.contractInfo = this.contractInfo.bind(this)
    this.nftInfo = this.nftInfo.bind(this)
    this.allNftInfo = this.allNftInfo.bind(this)
    this.tokens = this.tokens.bind(this)
    this.allTokens = this.allTokens.bind(this)
    this.minter = this.minter.bind(this)
  }

  ownerOf = async ({
    includeExpired,
    tokenId,
  }: {
    includeExpired?: boolean
    tokenId: string
  }): Promise<OwnerOfResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      owner_of: {
        include_expired: includeExpired,
        token_id: tokenId,
      },
    })
  }
  approval = async ({
    includeExpired,
    spender,
    tokenId,
  }: {
    includeExpired?: boolean
    spender: string
    tokenId: string
  }): Promise<ApprovalResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      approval: {
        include_expired: includeExpired,
        spender,
        token_id: tokenId,
      },
    })
  }
  approvals = async ({
    includeExpired,
    tokenId,
  }: {
    includeExpired?: boolean
    tokenId: string
  }): Promise<ApprovalsResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      approvals: {
        include_expired: includeExpired,
        token_id: tokenId,
      },
    })
  }
  allOperators = async ({
    includeExpired,
    limit,
    owner,
    startAfter,
  }: {
    includeExpired?: boolean
    limit?: number
    owner: string
    startAfter?: string
  }): Promise<AllOperatorsResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      all_operators: {
        include_expired: includeExpired,
        limit,
        owner,
        start_after: startAfter,
      },
    })
  }
  numTokens = async (): Promise<NumTokensResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      num_tokens: {},
    })
  }
  contractInfo = async (): Promise<ContractInfoResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      contract_info: {},
    })
  }
  nftInfo = async ({
    tokenId,
  }: {
    tokenId: string
  }): Promise<NftInfoResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      nft_info: {
        token_id: tokenId,
      },
    })
  }
  allNftInfo = async ({
    includeExpired,
    tokenId,
  }: {
    includeExpired?: boolean
    tokenId: string
  }): Promise<AllNftInfoResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      all_nft_info: {
        include_expired: includeExpired,
        token_id: tokenId,
      },
    })
  }
  tokens = async ({
    limit,
    owner,
    startAfter,
  }: {
    limit?: number
    owner: string
    startAfter?: string
  }): Promise<TokensResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      tokens: {
        limit,
        owner,
        start_after: startAfter,
      },
    })
  }
  allTokens = async ({
    limit,
    startAfter,
  }: {
    limit?: number
    startAfter?: string
  }): Promise<AllTokensResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      all_tokens: {
        limit,
        start_after: startAfter,
      },
    })
  }
  minter = async (): Promise<MinterResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      minter: {},
    })
  }
}
export interface Cw721BaseInterface extends Cw721BaseReadOnlyInterface {
  contractAddress: string
  sender: string
  transferNft: (
    {
      recipient,
      tokenId,
    }: {
      recipient: string
      tokenId: string
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: readonly Coin[]
  ) => Promise<ExecuteResult>
  sendNft: (
    {
      contract,
      msg,
      tokenId,
    }: {
      contract: string
      msg: string
      tokenId: string
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: readonly Coin[]
  ) => Promise<ExecuteResult>
  approve: (
    {
      expires,
      spender,
      tokenId,
    }: {
      expires?: Expiration
      spender: string
      tokenId: string
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: readonly Coin[]
  ) => Promise<ExecuteResult>
  revoke: (
    {
      spender,
      tokenId,
    }: {
      spender: string
      tokenId: string
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: readonly Coin[]
  ) => Promise<ExecuteResult>
  approveAll: (
    {
      expires,
      operator,
    }: {
      expires?: Expiration
      operator: string
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: readonly Coin[]
  ) => Promise<ExecuteResult>
  revokeAll: (
    {
      operator,
    }: {
      operator: string
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: readonly Coin[]
  ) => Promise<ExecuteResult>
  mint: (
    {
      extension,
      owner,
      tokenId,
      tokenUri,
    }: {
      extension?: Empty
      owner: string
      tokenId: string
      tokenUri?: string
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: readonly Coin[]
  ) => Promise<ExecuteResult>
  burn: (
    {
      tokenId,
    }: {
      tokenId: string
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: readonly Coin[]
  ) => Promise<ExecuteResult>
}
export class Cw721BaseClient
  extends Cw721BaseQueryClient
  implements Cw721BaseInterface
{
  client: SigningCosmWasmClient
  sender: string
  contractAddress: string

  constructor(
    client: SigningCosmWasmClient,
    sender: string,
    contractAddress: string
  ) {
    super(client, contractAddress)
    this.client = client
    this.sender = sender
    this.contractAddress = contractAddress
    this.transferNft = this.transferNft.bind(this)
    this.sendNft = this.sendNft.bind(this)
    this.sendNftMultiple = this.sendNftMultiple.bind(this)
    this.approve = this.approve.bind(this)
    this.revoke = this.revoke.bind(this)
    this.approveAll = this.approveAll.bind(this)
    this.revokeAll = this.revokeAll.bind(this)
    this.mint = this.mint.bind(this)
    this.burn = this.burn.bind(this)
  }

  transferNft = async (
    {
      recipient,
      tokenId,
    }: {
      recipient: string
      tokenId: string
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    funds?: readonly Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        transfer_nft: {
          recipient,
          token_id: tokenId,
        },
      },
      fee,
      memo,
      funds
    )
  }
  sendNft = async (
    {
      contract,
      msg,
      tokenId,
    }: {
      contract: string
      msg: string
      tokenId: string
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    funds?: readonly Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        send_nft: {
          contract,
          msg,
          token_id: tokenId,
        },
      },
      fee,
      memo,
      funds
    )
  }
  sendNftMultiple = async (
    {
      contract,
      msg,
      tokenIds,
    }: {
      contract: string
      msg: string
      tokenIds: string[]
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string
  ): Promise<ExecuteResult> => {
    let instructions: ExecuteInstruction[] = tokenIds.map((tokenId) => {
      return {
        contractAddress: this.contractAddress,
        msg: {
          send_nft: {
            contract,
            msg,
            token_id: tokenId,
          },
        },
      } as ExecuteInstruction
    })

    return await this.client.executeMultiple(
      this.sender,
      instructions,
      fee,
      memo
    )
  }
  approve = async (
    {
      expires,
      spender,
      tokenId,
    }: {
      expires?: Expiration
      spender: string
      tokenId: string
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    funds?: readonly Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        approve: {
          expires,
          spender,
          token_id: tokenId,
        },
      },
      fee,
      memo,
      funds
    )
  }
  revoke = async (
    {
      spender,
      tokenId,
    }: {
      spender: string
      tokenId: string
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    funds?: readonly Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        revoke: {
          spender,
          token_id: tokenId,
        },
      },
      fee,
      memo,
      funds
    )
  }
  approveAll = async (
    {
      expires,
      operator,
    }: {
      expires?: Expiration
      operator: string
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    funds?: readonly Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        approve_all: {
          expires,
          operator,
        },
      },
      fee,
      memo,
      funds
    )
  }
  revokeAll = async (
    {
      operator,
    }: {
      operator: string
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    funds?: readonly Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        revoke_all: {
          operator,
        },
      },
      fee,
      memo,
      funds
    )
  }
  mint = async (
    {
      extension,
      owner,
      tokenId,
      tokenUri,
    }: {
      extension?: Empty
      owner: string
      tokenId: string
      tokenUri?: string
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    funds?: readonly Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        mint: {
          extension,
          owner,
          token_id: tokenId,
          token_uri: tokenUri,
        },
      },
      fee,
      memo,
      funds
    )
  }
  burn = async (
    {
      tokenId,
    }: {
      tokenId: string
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    funds?: readonly Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        burn: {
          token_id: tokenId,
        },
      },
      fee,
      memo,
      funds
    )
  }
}
