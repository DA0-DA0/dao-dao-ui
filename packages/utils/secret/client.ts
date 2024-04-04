import {
  Code,
  CodeDetails,
  Contract,
  ContractCodeHistoryEntry,
  CosmWasmClient,
  JsonObject,
} from '@cosmjs/cosmwasm-stargate'
import { toBech32 } from '@cosmjs/encoding'
import { CometClient, HttpEndpoint, connectComet } from '@cosmjs/tendermint-rpc'
import { assert } from '@cosmjs/utils'
import {
  ContractCodeHistoryOperationType,
  contractCodeHistoryOperationTypeFromJSON,
} from 'cosmjs-types/cosmwasm/wasm/v1/types'
import {
  CreateClientOptions as CreateSecretNetworkClientOptions,
  SecretNetworkClient,
} from 'secretjs'

/**
 * A wrapper around CosmWasmClient that uses secretjs under the hood for smart
 * contract queries, to support Secret Network.
 */
export class SecretCosmWasmClient extends CosmWasmClient {
  private readonly secretNetworkClient: SecretNetworkClient | undefined
  private readonly secretCodesCache = new Map<number, CodeDetails>()

  /**
   * Creates an instance by connecting to the given CometBFT RPC endpoint.
   *
   * This uses auto-detection to decide between a CometBFT 0.38, Tendermint 0.37 and 0.34 client.
   * To set the Comet client explicitly, use `create`.
   */
  public static async secretConnect(
    endpoint: string | HttpEndpoint,
    options: CreateSecretNetworkClientOptions
  ): Promise<SecretCosmWasmClient> {
    const cometClient = await connectComet(endpoint)
    return SecretCosmWasmClient.secretCreate(cometClient, options)
  }

  /**
   * Creates an instance from a manually created Comet client.
   * Use this to use `Comet38Client` or `Tendermint37Client` instead of `Tendermint34Client`.
   */
  public static async secretCreate(
    cometClient: CometClient,
    options: CreateSecretNetworkClientOptions
  ): Promise<SecretCosmWasmClient> {
    return new SecretCosmWasmClient(cometClient, options)
  }

  protected constructor(
    cometClient: CometClient | undefined,
    options: CreateSecretNetworkClientOptions
  ) {
    super(cometClient)
    this.secretNetworkClient = new SecretNetworkClient(options)
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
}
