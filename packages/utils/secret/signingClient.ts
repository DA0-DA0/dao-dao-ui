import {
  ChangeAdminResult,
  Code,
  CodeDetails,
  Contract,
  ContractCodeHistoryEntry,
  ExecuteInstruction,
  InstantiateOptions,
  InstantiateResult,
  JsonObject,
  SigningCosmWasmClient,
  SigningCosmWasmClientOptions,
  UploadResult,
  createWasmAminoConverters,
  wasmTypes,
} from '@cosmjs/cosmwasm-stargate'
import { sha256 } from '@cosmjs/crypto'
import { toBech32, toHex } from '@cosmjs/encoding'
import { OfflineSigner, Registry } from '@cosmjs/proto-signing'
import {
  AminoTypes,
  GasPrice,
  StdFee,
  createDefaultAminoConverters,
  defaultRegistryTypes as defaultStargateTypes,
  logs,
} from '@cosmjs/stargate'
import { findAttribute } from '@cosmjs/stargate/build/logs'
import { CometClient, HttpEndpoint, connectComet } from '@cosmjs/tendermint-rpc'
import { assert } from '@cosmjs/utils'
import {
  AccessConfig,
  ContractCodeHistoryOperationType,
  contractCodeHistoryOperationTypeFromJSON,
} from 'cosmjs-types/cosmwasm/wasm/v1/types'
import pako from 'pako'
import {
  CreateClientOptions as CreateSecretNetworkClientOptions,
  MsgExecuteContract,
  SecretNetworkClient,
  TxResponse,
} from 'secretjs'

import {
  secretAminoConverters,
  secretProtoRegistry,
} from '@dao-dao/types/protobuf'

const isDeliverTxFailure = (result: TxResponse) => !!result.code
const createDeliverTxResponseErrorMessage = (result: TxResponse) =>
  `Error when broadcasting tx ${result.transactionHash} at height ${result.height}. Code: ${result.code}; Raw log: ${result.rawLog}`

/**
 * A wrapper around CosmWasmClient that uses secretjs under the hood for smart
 * contract queries, to support Secret Network.
 */
export class SecretSigningCosmWasmClient extends SigningCosmWasmClient {
  private readonly secretNetworkClient: SecretNetworkClient | undefined
  private readonly secretCodesCache = new Map<number, CodeDetails>()
  private readonly secretGasPrice: GasPrice | undefined

  /**
   * Creates an instance by connecting to the given CometBFT RPC endpoint.
   *
   * This uses auto-detection to decide between a CometBFT 0.38, Tendermint 0.37 and 0.34 client.
   * To set the Comet client explicitly, use `createWithSigner`.
   */
  public static async secretConnectWithSigner(
    endpoint: string | HttpEndpoint,
    signer: OfflineSigner,
    options: SigningCosmWasmClientOptions = {},
    secretOptions: CreateSecretNetworkClientOptions
  ): Promise<SecretSigningCosmWasmClient> {
    const cometClient = await connectComet(endpoint)
    return SecretSigningCosmWasmClient.secretCreateWithSigner(
      cometClient,
      signer,
      options,
      secretOptions
    )
  }

  /**
   * Creates an instance from a manually created Comet client.
   * Use this to use `Comet38Client` or `Tendermint37Client` instead of `Tendermint34Client`.
   */
  public static async secretCreateWithSigner(
    cometClient: CometClient,
    signer: OfflineSigner,
    options: SigningCosmWasmClientOptions = {},
    secretOptions: CreateSecretNetworkClientOptions
  ): Promise<SecretSigningCosmWasmClient> {
    return new SecretSigningCosmWasmClient(
      cometClient,
      signer,
      options,
      secretOptions
    )
  }

  protected constructor(
    cometClient: CometClient | undefined,
    signer: OfflineSigner,
    options: SigningCosmWasmClientOptions,
    secretOptions: CreateSecretNetworkClientOptions
  ) {
    const registry = new Registry([
      // Fallback to default from @cosmjs/cosmwasm-stargate if not provided.
      ...Object.entries(
        options.registry?.['register'] || [
          ...defaultStargateTypes,
          ...wasmTypes,
        ]
      ),
      // Add Secret Network types to existing ones.
      ...secretProtoRegistry,
    ])

    const aminoTypes = new AminoTypes({
      // Fallback to default from @cosmjs/cosmwasm-stargate if not provided.
      ...(options.aminoTypes?.['register'] || {
        ...createDefaultAminoConverters(),
        ...createWasmAminoConverters(),
      }),
      // Add Secret Network amino types to existing ones.
      ...secretAminoConverters,
    })

    super(cometClient, signer, {
      ...options,
      registry,
      aminoTypes,
    })

    this.secretGasPrice = options.gasPrice

    this.secretNetworkClient = new SecretNetworkClient(secretOptions)
  }

  protected getSecretNetworkClient(): SecretNetworkClient | undefined {
    return this.secretNetworkClient
  }

  protected forceGetSecretNetworkClient(): SecretNetworkClient {
    if (!this.secretNetworkClient) {
      throw new Error(
        'Secret network client not available. You cannot use online functionality in offline mode.'
      )
    }
    return this.secretNetworkClient
  }

  /**
   * getCodes() returns all codes and is just looping through all pagination pages.
   *
   * This is potentially inefficient and advanced apps should consider creating
   * their own query client to handle pagination together with the app's screens.
   */
  public async getCodes(): Promise<readonly Code[]> {
    throw new Error('Unsupported by Secret Network')
  }

  public async getCodeDetails(codeId: number): Promise<CodeDetails> {
    const cached = this.secretCodesCache.get(codeId)
    if (cached) return cached

    const { code_info: codeInfo, wasm } =
      await this.forceGetSecretNetworkClient().query.compute.code({
        code_id: BigInt(codeId).toString(),
      })
    assert(
      codeInfo &&
        codeInfo.code_id &&
        codeInfo.creator &&
        codeInfo.code_hash &&
        wasm,
      'code_info missing or incomplete'
    )
    const codeDetails: CodeDetails = {
      id: Number(codeInfo.code_id),
      creator: codeInfo.creator,
      checksum: codeInfo.code_hash,
      data: wasm,
    }
    this.secretCodesCache.set(codeId, codeDetails)
    return codeDetails
  }

  /**
   * getContracts() returns all contract instances for one code and is just looping through all pagination pages.
   *
   * This is potentially inefficient and advanced apps should consider creating
   * their own query client to handle pagination together with the app's screens.
   */
  public async getContracts(codeId: number): Promise<readonly string[]> {
    const { contract_infos } = await (
      await this.forceGetSecretNetworkClient()
    ).query.compute.contractsByCodeId({ code_id: BigInt(codeId).toString() })

    return (
      contract_infos?.flatMap(
        ({ contract_address }) => contract_address || []
      ) || []
    )
  }

  /**
   * Returns a list of contract addresses created by the given creator.
   * This just loops through all pagination pages.
   */
  public async getContractsByCreator(_creator: string): Promise<string[]> {
    throw new Error('Unsupported by Secret Network')
  }

  /**
   * Throws an error if no contract was found at the address
   */
  public async getContract(address: string): Promise<Contract> {
    const { contract_address: retrievedAddress, contract_info: contractInfo } =
      await this.forceGetSecretNetworkClient().query.compute.contractInfo({
        contract_address: address,
      })
    if (!contractInfo)
      throw new Error(`No contract found at address "${address}"`)
    assert(retrievedAddress, 'address missing')
    assert(
      contractInfo.code_id && contractInfo.creator && contractInfo.label,
      'contractInfo incomplete'
    )
    return {
      address: retrievedAddress,
      codeId: Number(contractInfo.code_id),
      creator: contractInfo.creator
        ? toBech32('secret', contractInfo.creator)
        : '',
      admin: contractInfo.admin || undefined,
      label: contractInfo.label,
      ibcPortId: contractInfo.ibc_port_id || undefined,
    }
  }

  /**
   * Throws an error if no contract was found at the address
   */
  public async getContractCodeHistory(
    address: string
  ): Promise<readonly ContractCodeHistoryEntry[]> {
    const result =
      await this.forceGetSecretNetworkClient().query.compute.contractHistory({
        contract_address: address,
      })
    if (!result)
      throw new Error(`No contract history found for address "${address}"`)
    const operations: Record<number, 'Init' | 'Genesis' | 'Migrate'> = {
      [ContractCodeHistoryOperationType.CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT]:
        'Init',
      [ContractCodeHistoryOperationType.CONTRACT_CODE_HISTORY_OPERATION_TYPE_GENESIS]:
        'Genesis',
      [ContractCodeHistoryOperationType.CONTRACT_CODE_HISTORY_OPERATION_TYPE_MIGRATE]:
        'Migrate',
    }
    return (result.entries || []).map((entry): ContractCodeHistoryEntry => {
      assert(entry.operation && entry.code_id && entry.msg)
      return {
        operation:
          operations[contractCodeHistoryOperationTypeFromJSON(entry.operation)],
        codeId: Number(entry.code_id),
        msg: JSON.parse(entry.msg),
      }
    })
  }

  /**
   * Returns the data at the key if present (raw contract dependent storage data)
   * or null if no data at this key.
   *
   * Promise is rejected when contract does not exist.
   */
  public async queryContractRaw(
    _address: string,
    _key: Uint8Array
  ): Promise<Uint8Array | null> {
    throw new Error('Unsupported by Secret Network')
  }

  /**
   * Makes a smart query on the contract, returns the parsed JSON document.
   *
   * Promise is rejected when contract does not exist.
   * Promise is rejected for invalid query format.
   * Promise is rejected for invalid response format.
   */
  public async queryContractSmart(
    address: string,
    queryMsg: JsonObject
  ): Promise<JsonObject> {
    return await this.queryContractSmartWithCodeHash(
      address,
      undefined,
      queryMsg
    )
  }

  /**
   * Makes a smart query on the contract, returns the parsed JSON document.
   *
   * Promise is rejected when contract does not exist.
   * Promise is rejected for invalid query format.
   * Promise is rejected for invalid response format.
   */
  public async queryContractSmartWithCodeHash(
    address: string,
    codeHash: string | undefined,
    queryMsg: JsonObject
  ): Promise<JsonObject> {
    try {
      const response =
        await this.forceGetSecretNetworkClient().query.compute.queryContract({
          contract_address: address,
          code_hash: codeHash,
          query: queryMsg,
        })

      // secretjs' queryContract returns query errors as strings... rip
      if (
        typeof response === 'string' &&
        response.includes('Error parsing into type')
      ) {
        throw new Error(response)
      }

      return response
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.startsWith('not found: contract')) {
          throw new Error(`No contract found at address "${address}"`)
        } else {
          throw error
        }
      } else {
        throw error
      }
    }
  }

  /** Uploads code and returns a receipt, including the code ID */
  public async upload(
    senderAddress: string,
    wasmCode: Uint8Array,
    fee: StdFee | 'auto' | number,
    memo = '',
    // Unused.
    _instantiatePermission?: AccessConfig
  ): Promise<UploadResult> {
    if (typeof fee !== 'number') {
      throw new Error(
        'Secret Network signing client requires a numeric fee to use as the gasLimit.'
      )
    }

    const result =
      await this.forceGetSecretNetworkClient().tx.compute.storeCode(
        {
          sender: senderAddress,
          wasm_byte_code: wasmCode,
          source: '',
          builder: '',
        },
        {
          gasLimit: fee,
          gasPriceInFeeDenom:
            this.secretGasPrice?.amount.toFloatApproximation(),
          memo,
        }
      )

    if (isDeliverTxFailure(result)) {
      throw new Error(createDeliverTxResponseErrorMessage(result))
    }

    const parsedLogs = logs.parseRawLog(result.rawLog)
    const codeIdAttr = findAttribute(parsedLogs, 'store_code', 'code_id')

    // compression used by secretjs
    const compressed = pako.gzip(wasmCode, { level: 9 })

    return {
      checksum: toHex(sha256(wasmCode)),
      originalSize: wasmCode.length,
      compressedSize: compressed.length,
      codeId: Number.parseInt(codeIdAttr.value, 10),
      logs: parsedLogs,
      height: result.height,
      transactionHash: result.transactionHash,
      events: result.jsonLog?.flatMap((log) => log.events) || [],
      gasWanted: BigInt(Math.round(result.gasWanted)),
      gasUsed: BigInt(Math.round(result.gasUsed)),
    }
  }

  public async instantiate(
    senderAddress: string,
    codeId: number,
    msg: JsonObject,
    label: string,
    fee: StdFee | 'auto' | number,
    options: InstantiateOptions = {}
  ): Promise<InstantiateResult> {
    if (typeof fee !== 'number') {
      throw new Error(
        'Secret Network signing client requires a numeric fee to use as the gasLimit.'
      )
    }

    const result =
      await this.forceGetSecretNetworkClient().tx.compute.instantiateContract(
        {
          sender: senderAddress,
          code_id: codeId,
          label,
          init_msg: msg,
          init_funds: [...(options.funds || [])],
          admin: options.admin,
        },
        {
          gasLimit: fee,
          gasPriceInFeeDenom:
            this.secretGasPrice?.amount.toFloatApproximation(),
          memo: options.memo,
        }
      )

    if (isDeliverTxFailure(result)) {
      throw new Error(createDeliverTxResponseErrorMessage(result))
    }

    const parsedLogs = logs.parseRawLog(result.rawLog)

    const contractAddressAttr = findAttribute(
      parsedLogs,
      'instantiate',
      '_contract_address'
    )

    return {
      contractAddress: contractAddressAttr.value,
      logs: parsedLogs,
      height: result.height,
      transactionHash: result.transactionHash,
      events: result.jsonLog?.flatMap((log) => log.events) || [],
      gasWanted: BigInt(Math.round(result.gasWanted)),
      gasUsed: BigInt(Math.round(result.gasUsed)),
    }
  }

  public async instantiate2(
    _senderAddress: string,
    _codeId: number,
    _salt: Uint8Array,
    _msg: JsonObject,
    _label: string,
    _fee: StdFee | 'auto' | number,
    _options: InstantiateOptions = {}
  ): Promise<InstantiateResult> {
    throw new Error('Unsupported by Secret Network')
  }

  public async updateAdmin(
    senderAddress: string,
    contractAddress: string,
    newAdmin: string,
    fee: StdFee | 'auto' | number,
    memo = ''
  ): Promise<ChangeAdminResult> {
    if (typeof fee !== 'number') {
      throw new Error(
        'Secret Network signing client requires a numeric fee to use as the gasLimit.'
      )
    }

    const result =
      await this.forceGetSecretNetworkClient().tx.compute.updateAdmin(
        {
          sender: senderAddress,
          contract_address: contractAddress,
          new_admin: newAdmin,
        },
        {
          gasLimit: fee,
          gasPriceInFeeDenom:
            this.secretGasPrice?.amount.toFloatApproximation(),
          memo,
        }
      )

    if (isDeliverTxFailure(result)) {
      throw new Error(createDeliverTxResponseErrorMessage(result))
    }

    const parsedLogs = logs.parseRawLog(result.rawLog)

    return {
      logs: parsedLogs,
      height: result.height,
      transactionHash: result.transactionHash,
      events: result.jsonLog?.flatMap((log) => log.events) || [],
      gasWanted: BigInt(Math.round(result.gasWanted)),
      gasUsed: BigInt(Math.round(result.gasUsed)),
    }
  }

  public async clearAdmin(
    senderAddress: string,
    contractAddress: string,
    fee: StdFee | 'auto' | number,
    memo = ''
  ): Promise<ChangeAdminResult> {
    if (typeof fee !== 'number') {
      throw new Error(
        'Secret Network signing client requires a numeric fee to use as the gasLimit.'
      )
    }

    const result =
      await this.forceGetSecretNetworkClient().tx.compute.clearAdmin(
        {
          sender: senderAddress,
          contract_address: contractAddress,
        },
        {
          gasLimit: fee,
          gasPriceInFeeDenom:
            this.secretGasPrice?.amount.toFloatApproximation(),
          memo,
        }
      )

    if (isDeliverTxFailure(result)) {
      throw new Error(createDeliverTxResponseErrorMessage(result))
    }

    const parsedLogs = logs.parseRawLog(result.rawLog)

    return {
      logs: parsedLogs,
      height: result.height,
      transactionHash: result.transactionHash,
      events: result.jsonLog?.flatMap((log) => log.events) || [],
      gasWanted: BigInt(Math.round(result.gasWanted)),
      gasUsed: BigInt(Math.round(result.gasUsed)),
    }
  }

  public async migrate(
    senderAddress: string,
    contractAddress: string,
    codeId: number,
    migrateMsg: JsonObject,
    fee: StdFee | 'auto' | number,
    memo = ''
  ): Promise<ChangeAdminResult> {
    if (typeof fee !== 'number') {
      throw new Error(
        'Secret Network signing client requires a numeric fee to use as the gasLimit.'
      )
    }

    const result =
      await this.forceGetSecretNetworkClient().tx.compute.migrateContract(
        {
          sender: senderAddress,
          contract_address: contractAddress,
          code_id: codeId,
          msg: migrateMsg,
        },
        {
          gasLimit: fee,
          gasPriceInFeeDenom:
            this.secretGasPrice?.amount.toFloatApproximation(),
          memo,
        }
      )

    if (isDeliverTxFailure(result)) {
      throw new Error(createDeliverTxResponseErrorMessage(result))
    }

    const parsedLogs = logs.parseRawLog(result.rawLog)

    return {
      logs: parsedLogs,
      height: result.height,
      transactionHash: result.transactionHash,
      events: result.jsonLog?.flatMap((log) => log.events) || [],
      gasWanted: BigInt(Math.round(result.gasWanted)),
      gasUsed: BigInt(Math.round(result.gasUsed)),
    }
  }

  /**
   * Like `execute` but allows executing multiple messages in one transaction.
   */
  public async executeMultiple(
    senderAddress: string,
    instructions: readonly ExecuteInstruction[],
    fee: StdFee | 'auto' | number,
    memo = ''
  ): Promise<ChangeAdminResult> {
    if (typeof fee !== 'number') {
      throw new Error(
        'Secret Network signing client requires a numeric fee to use as the gasLimit.'
      )
    }

    const msgs = instructions.map(
      ({ contractAddress, msg, funds }) =>
        new MsgExecuteContract({
          sender: senderAddress,
          contract_address: contractAddress,
          msg,
          sent_funds: [...(funds || [])],
          code_hash: undefined,
        })
    )

    const result = await this.forceGetSecretNetworkClient().tx.broadcast(msgs, {
      gasLimit: fee,
      gasPriceInFeeDenom: this.secretGasPrice?.amount.toFloatApproximation(),
      memo,
    })

    if (isDeliverTxFailure(result)) {
      throw new Error(createDeliverTxResponseErrorMessage(result))
    }

    const parsedLogs = logs.parseRawLog(result.rawLog)

    return {
      logs: parsedLogs,
      height: result.height,
      transactionHash: result.transactionHash,
      events: result.jsonLog?.flatMap((log) => log.events) || [],
      gasWanted: BigInt(Math.round(result.gasWanted)),
      gasUsed: BigInt(Math.round(result.gasUsed)),
    }
  }
}
