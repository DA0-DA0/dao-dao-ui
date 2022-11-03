import {
  CosmWasmClient,
  ExecuteResult,
  SigningCosmWasmClient,
} from '@cosmjs/cosmwasm-stargate'

import { Binary, Expiration, Uint128 } from '@dao-dao/types/contracts/common'
import {
  AllAccountsResponse,
  AllAllowancesResponse,
  AllowanceResponse,
  BalanceResponse,
  DownloadLogoResponse,
  MarketingInfoResponse,
  MinterResponse,
  TokenInfoResponse,
} from '@dao-dao/types/contracts/Cw20Base'

export interface Cw20BaseReadOnlyInterface {
  contractAddress: string
  balance: ({ address }: { address: string }) => Promise<BalanceResponse>
  tokenInfo: () => Promise<TokenInfoResponse>
  allowance: ({
    owner,
    spender,
  }: {
    owner: string
    spender: string
  }) => Promise<AllowanceResponse>
  minter: () => Promise<MinterResponse>
  marketingInfo: () => Promise<MarketingInfoResponse>
  downloadLogo: () => Promise<DownloadLogoResponse>
  allAllowances: ({
    limit,
    owner,
    startAfter,
  }: {
    limit?: number
    owner: string
    startAfter?: string
  }) => Promise<AllAllowancesResponse>
  allAccounts: ({
    limit,
    startAfter,
  }: {
    limit?: number
    startAfter?: string
  }) => Promise<AllAccountsResponse>
}
export class Cw20BaseQueryClient implements Cw20BaseReadOnlyInterface {
  client: CosmWasmClient
  contractAddress: string

  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client
    this.contractAddress = contractAddress
    this.balance = this.balance.bind(this)
    this.tokenInfo = this.tokenInfo.bind(this)
    this.allowance = this.allowance.bind(this)
    this.minter = this.minter.bind(this)
    this.marketingInfo = this.marketingInfo.bind(this)
    this.downloadLogo = this.downloadLogo.bind(this)
    this.allAllowances = this.allAllowances.bind(this)
    this.allAccounts = this.allAccounts.bind(this)
  }

  balance = async ({
    address,
  }: {
    address: string
  }): Promise<BalanceResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      balance: {
        address,
      },
    })
  }
  tokenInfo = async (): Promise<TokenInfoResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      token_info: {},
    })
  }
  allowance = async ({
    owner,
    spender,
  }: {
    owner: string
    spender: string
  }): Promise<AllowanceResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      allowance: {
        owner,
        spender,
      },
    })
  }
  minter = async (): Promise<MinterResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      minter: {},
    })
  }
  marketingInfo = async (): Promise<MarketingInfoResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      marketing_info: {},
    })
  }
  downloadLogo = async (): Promise<DownloadLogoResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      download_logo: {},
    })
  }
  allAllowances = async ({
    limit,
    owner,
    startAfter,
  }: {
    limit?: number
    owner: string
    startAfter?: string
  }): Promise<AllAllowancesResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      all_allowances: {
        limit,
        owner,
        start_after: startAfter,
      },
    })
  }
  allAccounts = async ({
    limit,
    startAfter,
  }: {
    limit?: number
    startAfter?: string
  }): Promise<AllAccountsResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      all_accounts: {
        limit,
        start_after: startAfter,
      },
    })
  }
}
export interface Cw20BaseInterface extends Cw20BaseReadOnlyInterface {
  contractAddress: string
  sender: string
  transfer: ({
    amount,
    recipient,
  }: {
    amount: Uint128
    recipient: string
  }) => Promise<ExecuteResult>
  burn: ({ amount }: { amount: Uint128 }) => Promise<ExecuteResult>
  send: ({
    amount,
    contract,
    msg,
  }: {
    amount: Uint128
    contract: string
    msg: Binary
  }) => Promise<ExecuteResult>
  increaseAllowance: ({
    amount,
    expires,
    spender,
  }: {
    amount: Uint128
    expires?: Expiration
    spender: string
  }) => Promise<ExecuteResult>
  decreaseAllowance: ({
    amount,
    expires,
    spender,
  }: {
    amount: Uint128
    expires?: Expiration
    spender: string
  }) => Promise<ExecuteResult>
  transferFrom: ({
    amount,
    owner,
    recipient,
  }: {
    amount: Uint128
    owner: string
    recipient: string
  }) => Promise<ExecuteResult>
  sendFrom: ({
    amount,
    contract,
    msg,
    owner,
  }: {
    amount: Uint128
    contract: string
    msg: Binary
    owner: string
  }) => Promise<ExecuteResult>
  burnFrom: ({
    amount,
    owner,
  }: {
    amount: Uint128
    owner: string
  }) => Promise<ExecuteResult>
  mint: ({
    amount,
    recipient,
  }: {
    amount: Uint128
    recipient: string
  }) => Promise<ExecuteResult>
  updateMarketing: ({
    description,
    marketing,
    project,
  }: {
    description?: string
    marketing?: string
    project?: string
  }) => Promise<ExecuteResult>
  uploadLogo: () => Promise<ExecuteResult>
}
export class Cw20BaseClient
  extends Cw20BaseQueryClient
  implements Cw20BaseInterface
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
    this.transfer = this.transfer.bind(this)
    this.burn = this.burn.bind(this)
    this.send = this.send.bind(this)
    this.increaseAllowance = this.increaseAllowance.bind(this)
    this.decreaseAllowance = this.decreaseAllowance.bind(this)
    this.transferFrom = this.transferFrom.bind(this)
    this.sendFrom = this.sendFrom.bind(this)
    this.burnFrom = this.burnFrom.bind(this)
    this.mint = this.mint.bind(this)
    this.updateMarketing = this.updateMarketing.bind(this)
    this.uploadLogo = this.uploadLogo.bind(this)
  }

  transfer = async ({
    amount,
    recipient,
  }: {
    amount: Uint128
    recipient: string
  }): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        transfer: {
          amount,
          recipient,
        },
      },
      'auto'
    )
  }
  burn = async ({ amount }: { amount: Uint128 }): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        burn: {
          amount,
        },
      },
      'auto'
    )
  }
  send = async ({
    amount,
    contract,
    msg,
  }: {
    amount: Uint128
    contract: string
    msg: Binary
  }): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        send: {
          amount,
          contract,
          msg,
        },
      },
      'auto'
    )
  }
  increaseAllowance = async ({
    amount,
    expires,
    spender,
  }: {
    amount: Uint128
    expires?: Expiration
    spender: string
  }): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        increase_allowance: {
          amount,
          expires,
          spender,
        },
      },
      'auto'
    )
  }
  decreaseAllowance = async ({
    amount,
    expires,
    spender,
  }: {
    amount: Uint128
    expires?: Expiration
    spender: string
  }): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        decrease_allowance: {
          amount,
          expires,
          spender,
        },
      },
      'auto'
    )
  }
  transferFrom = async ({
    amount,
    owner,
    recipient,
  }: {
    amount: Uint128
    owner: string
    recipient: string
  }): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        transfer_from: {
          amount,
          owner,
          recipient,
        },
      },
      'auto'
    )
  }
  sendFrom = async ({
    amount,
    contract,
    msg,
    owner,
  }: {
    amount: Uint128
    contract: string
    msg: Binary
    owner: string
  }): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        send_from: {
          amount,
          contract,
          msg,
          owner,
        },
      },
      'auto'
    )
  }
  burnFrom = async ({
    amount,
    owner,
  }: {
    amount: Uint128
    owner: string
  }): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        burn_from: {
          amount,
          owner,
        },
      },
      'auto'
    )
  }
  mint = async ({
    amount,
    recipient,
  }: {
    amount: Uint128
    recipient: string
  }): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        mint: {
          amount,
          recipient,
        },
      },
      'auto'
    )
  }
  updateMarketing = async ({
    description,
    marketing,
    project,
  }: {
    description?: string
    marketing?: string
    project?: string
  }): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        update_marketing: {
          description,
          marketing,
          project,
        },
      },
      'auto'
    )
  }
  uploadLogo = async (): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        upload_logo: {},
      },
      'auto'
    )
  }
}
