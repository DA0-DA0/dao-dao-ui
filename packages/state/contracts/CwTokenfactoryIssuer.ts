import { StdFee } from '@cosmjs/amino'
import {
  CosmWasmClient,
  ExecuteResult,
  SigningCosmWasmClient,
} from '@cosmjs/cosmwasm-stargate'

import { Coin, Uint128 } from '@dao-dao/types'
import {
  Action,
  AllowanceResponse,
  AllowancesResponse,
  AllowlistResponse,
  BeforeSendHookInfo,
  DenomResponse,
  DenylistResponse,
  IsFrozenResponse,
  Metadata,
  OwnershipForAddr,
  StatusResponse,
} from '@dao-dao/types/contracts/CwTokenfactoryIssuer'

export interface CwTokenfactoryIssuerReadOnlyInterface {
  contractAddress: string
  isFrozen: () => Promise<IsFrozenResponse>
  denom: () => Promise<DenomResponse>
  ownership: () => Promise<OwnershipForAddr>
  burnAllowance: ({
    address,
  }: {
    address: string
  }) => Promise<AllowanceResponse>
  burnAllowances: ({
    limit,
    startAfter,
  }: {
    limit?: number
    startAfter?: string
  }) => Promise<AllowancesResponse>
  mintAllowance: ({
    address,
  }: {
    address: string
  }) => Promise<AllowanceResponse>
  mintAllowances: ({
    limit,
    startAfter,
  }: {
    limit?: number
    startAfter?: string
  }) => Promise<AllowancesResponse>
  isDenied: ({ address }: { address: string }) => Promise<StatusResponse>
  denylist: ({
    limit,
    startAfter,
  }: {
    limit?: number
    startAfter?: string
  }) => Promise<DenylistResponse>
  isAllowed: ({ address }: { address: string }) => Promise<StatusResponse>
  allowlist: ({
    limit,
    startAfter,
  }: {
    limit?: number
    startAfter?: string
  }) => Promise<AllowlistResponse>
  beforeSendHookInfo: () => Promise<BeforeSendHookInfo>
}
export class CwTokenfactoryIssuerQueryClient
  implements CwTokenfactoryIssuerReadOnlyInterface
{
  client: CosmWasmClient
  contractAddress: string

  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client
    this.contractAddress = contractAddress
    this.isFrozen = this.isFrozen.bind(this)
    this.denom = this.denom.bind(this)
    this.ownership = this.ownership.bind(this)
    this.burnAllowance = this.burnAllowance.bind(this)
    this.burnAllowances = this.burnAllowances.bind(this)
    this.mintAllowance = this.mintAllowance.bind(this)
    this.mintAllowances = this.mintAllowances.bind(this)
    this.isDenied = this.isDenied.bind(this)
    this.denylist = this.denylist.bind(this)
    this.isAllowed = this.isAllowed.bind(this)
    this.allowlist = this.allowlist.bind(this)
    this.beforeSendHookInfo = this.beforeSendHookInfo.bind(this)
  }

  isFrozen = async (): Promise<IsFrozenResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      is_frozen: {},
    })
  }
  denom = async (): Promise<DenomResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      denom: {},
    })
  }
  ownership = async (): Promise<OwnershipForAddr> => {
    return this.client.queryContractSmart(this.contractAddress, {
      ownership: {},
    })
  }
  burnAllowance = async ({
    address,
  }: {
    address: string
  }): Promise<AllowanceResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      burn_allowance: {
        address,
      },
    })
  }
  burnAllowances = async ({
    limit,
    startAfter,
  }: {
    limit?: number
    startAfter?: string
  }): Promise<AllowancesResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      burn_allowances: {
        limit,
        start_after: startAfter,
      },
    })
  }
  mintAllowance = async ({
    address,
  }: {
    address: string
  }): Promise<AllowanceResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      mint_allowance: {
        address,
      },
    })
  }
  mintAllowances = async ({
    limit,
    startAfter,
  }: {
    limit?: number
    startAfter?: string
  }): Promise<AllowancesResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      mint_allowances: {
        limit,
        start_after: startAfter,
      },
    })
  }
  isDenied = async ({
    address,
  }: {
    address: string
  }): Promise<StatusResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      is_denied: {
        address,
      },
    })
  }
  denylist = async ({
    limit,
    startAfter,
  }: {
    limit?: number
    startAfter?: string
  }): Promise<DenylistResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      denylist: {
        limit,
        start_after: startAfter,
      },
    })
  }
  isAllowed = async ({
    address,
  }: {
    address: string
  }): Promise<StatusResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      is_allowed: {
        address,
      },
    })
  }
  allowlist = async ({
    limit,
    startAfter,
  }: {
    limit?: number
    startAfter?: string
  }): Promise<AllowlistResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      allowlist: {
        limit,
        start_after: startAfter,
      },
    })
  }
  beforeSendHookInfo = async (): Promise<BeforeSendHookInfo> => {
    return this.client.queryContractSmart(this.contractAddress, {
      before_send_hook_info: {},
    })
  }
}
export interface CwTokenfactoryIssuerInterface
  extends CwTokenfactoryIssuerReadOnlyInterface {
  contractAddress: string
  sender: string
  allow: (
    {
      address,
      status,
    }: {
      address: string
      status: boolean
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
  burn: (
    {
      amount,
      fromAddress,
    }: {
      amount: Uint128
      fromAddress: string
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
  mint: (
    {
      amount,
      toAddress,
    }: {
      amount: Uint128
      toAddress: string
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
  deny: (
    {
      address,
      status,
    }: {
      address: string
      status: boolean
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
  freeze: (
    {
      status,
    }: {
      status: boolean
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
  forceTransfer: (
    {
      amount,
      fromAddress,
      toAddress,
    }: {
      amount: Uint128
      fromAddress: string
      toAddress: string
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
  setBeforeSendHook: (
    {
      cosmwasmAddress,
    }: {
      cosmwasmAddress: string
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
  setBurnerAllowance: (
    {
      address,
      allowance,
    }: {
      address: string
      allowance: Uint128
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
  setDenomMetadata: (
    {
      metadata,
    }: {
      metadata: Metadata
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
  setMinterAllowance: (
    {
      address,
      allowance,
    }: {
      address: string
      allowance: Uint128
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
  updateTokenFactoryAdmin: (
    {
      newAdmin,
    }: {
      newAdmin: string
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
  updateOwnership: (
    action: Action,
    fee?: number | StdFee | 'auto',
    memo?: string,
    _funds?: Coin[]
  ) => Promise<ExecuteResult>
}
export class CwTokenfactoryIssuerClient
  extends CwTokenfactoryIssuerQueryClient
  implements CwTokenfactoryIssuerInterface
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
    this.allow = this.allow.bind(this)
    this.burn = this.burn.bind(this)
    this.mint = this.mint.bind(this)
    this.deny = this.deny.bind(this)
    this.freeze = this.freeze.bind(this)
    this.forceTransfer = this.forceTransfer.bind(this)
    this.setBeforeSendHook = this.setBeforeSendHook.bind(this)
    this.setBurnerAllowance = this.setBurnerAllowance.bind(this)
    this.setDenomMetadata = this.setDenomMetadata.bind(this)
    this.setMinterAllowance = this.setMinterAllowance.bind(this)
    this.updateTokenFactoryAdmin = this.updateTokenFactoryAdmin.bind(this)
    this.updateOwnership = this.updateOwnership.bind(this)
  }

  allow = async (
    {
      address,
      status,
    }: {
      address: string
      status: boolean
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        allow: {
          address,
          status,
        },
      },
      fee,
      memo,
      _funds
    )
  }
  burn = async (
    {
      amount,
      fromAddress,
    }: {
      amount: Uint128
      fromAddress: string
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        burn: {
          amount,
          from_address: fromAddress,
        },
      },
      fee,
      memo,
      _funds
    )
  }
  mint = async (
    {
      amount,
      toAddress,
    }: {
      amount: Uint128
      toAddress: string
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        mint: {
          amount,
          to_address: toAddress,
        },
      },
      fee,
      memo,
      _funds
    )
  }
  deny = async (
    {
      address,
      status,
    }: {
      address: string
      status: boolean
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        deny: {
          address,
          status,
        },
      },
      fee,
      memo,
      _funds
    )
  }
  freeze = async (
    {
      status,
    }: {
      status: boolean
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        freeze: {
          status,
        },
      },
      fee,
      memo,
      _funds
    )
  }
  forceTransfer = async (
    {
      amount,
      fromAddress,
      toAddress,
    }: {
      amount: Uint128
      fromAddress: string
      toAddress: string
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        force_transfer: {
          amount,
          from_address: fromAddress,
          to_address: toAddress,
        },
      },
      fee,
      memo,
      _funds
    )
  }
  setBeforeSendHook = async (
    {
      cosmwasmAddress,
    }: {
      cosmwasmAddress: string
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        set_before_send_hook: {
          cosmwasm_address: cosmwasmAddress,
        },
      },
      fee,
      memo,
      _funds
    )
  }
  setBurnerAllowance = async (
    {
      address,
      allowance,
    }: {
      address: string
      allowance: Uint128
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        set_burner_allowance: {
          address,
          allowance,
        },
      },
      fee,
      memo,
      _funds
    )
  }
  setDenomMetadata = async (
    {
      metadata,
    }: {
      metadata: Metadata
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        set_denom_metadata: {
          metadata,
        },
      },
      fee,
      memo,
      _funds
    )
  }
  setMinterAllowance = async (
    {
      address,
      allowance,
    }: {
      address: string
      allowance: Uint128
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        set_minter_allowance: {
          address,
          allowance,
        },
      },
      fee,
      memo,
      _funds
    )
  }
  updateTokenFactoryAdmin = async (
    {
      newAdmin,
    }: {
      newAdmin: string
    },
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        update_token_factory_admin: {
          new_admin: newAdmin,
        },
      },
      fee,
      memo,
      _funds
    )
  }
  updateOwnership = async (
    action: Action,
    fee: number | StdFee | 'auto' = 'auto',
    memo?: string,
    _funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        update_ownership: action,
      },
      fee,
      memo,
      _funds
    )
  }
}
