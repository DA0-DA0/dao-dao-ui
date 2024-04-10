import {
  ChangeAdminResult,
  Code,
  CodeDetails,
  Contract,
  ContractCodeHistoryEntry,
  InstantiateOptions,
  InstantiateResult,
  JsonObject,
  SigningCosmWasmClient,
  SigningCosmWasmClientOptions,
  UploadResult,
  createWasmAminoConverters,
} from '@cosmjs/cosmwasm-stargate'
import { sha256 } from '@cosmjs/crypto'
import { toBech32, toHex } from '@cosmjs/encoding'
import {
  EncodeObject,
  OfflineSigner,
  isOfflineDirectSigner,
} from '@cosmjs/proto-signing'
import {
  AminoTypes,
  DeliverTxResponse,
  GasPrice,
  StdFee,
  createDefaultAminoConverters,
  logs,
} from '@cosmjs/stargate'
import { findAttribute } from '@cosmjs/stargate/build/logs'
import { CometClient, HttpEndpoint, connectComet } from '@cosmjs/tendermint-rpc'
import { assert } from '@cosmjs/utils'
import { SignMode } from 'cosmjs-types/cosmos/tx/signing/v1beta1/signing'
import { TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx'
import {
  AccessConfig,
  ContractCodeHistoryOperationType,
  contractCodeHistoryOperationTypeFromJSON,
} from 'cosmjs-types/cosmwasm/wasm/v1/types'
import pako from 'pako'
import {
  CreateClientOptions as CreateSecretNetworkClientOptions,
  SecretNetworkClient,
  SignerData,
  TxResponse,
} from 'secretjs'

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

  private readonly secretSigner: OfflineSigner
  private readonly secretAminoTypes: AminoTypes
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
    super(cometClient, signer, options)

    // Copied from SigningCosmWasmClient constructor.
    const {
      aminoTypes = new AminoTypes({
        ...createDefaultAminoConverters(),
        ...createWasmAminoConverters(),
      }),
    } = options
    this.secretAminoTypes = aminoTypes
    this.secretSigner = signer
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
    _fee: StdFee | 'auto' | number,
    memo = '',
    // Unused.
    _instantiatePermission?: AccessConfig
  ): Promise<UploadResult> {
    const result =
      await this.forceGetSecretNetworkClient().tx.compute.storeCode(
        {
          sender: senderAddress,
          wasm_byte_code: wasmCode,
          source: '',
          builder: '',
        },
        {
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
    _fee: StdFee | 'auto' | number,
    options: InstantiateOptions = {}
  ): Promise<InstantiateResult> {
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
    _fee: StdFee | 'auto' | number,
    memo = ''
  ): Promise<ChangeAdminResult> {
    const result =
      await this.forceGetSecretNetworkClient().tx.compute.updateAdmin(
        {
          sender: senderAddress,
          contract_address: contractAddress,
          new_admin: newAdmin,
        },
        {
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
    _fee: StdFee | 'auto' | number,
    memo = ''
  ): Promise<ChangeAdminResult> {
    const result =
      await this.forceGetSecretNetworkClient().tx.compute.clearAdmin(
        {
          sender: senderAddress,
          contract_address: contractAddress,
        },
        {
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
    _fee: StdFee | 'auto' | number,
    memo = ''
  ): Promise<ChangeAdminResult> {
    const result =
      await this.forceGetSecretNetworkClient().tx.compute.migrateContract(
        {
          sender: senderAddress,
          contract_address: contractAddress,
          code_id: codeId,
          msg: migrateMsg,
        },
        {
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

  // TODO(secret): signAndBroadcast, signAndBroadcastSync, signAmino, signDirect

  /**
   * Creates a transaction with the given messages, fee, memo and timeout height. Then signs and broadcasts the transaction.
   *
   * @param signerAddress The address that will sign transactions using this instance. The signer must be able to sign with this address.
   * @param messages
   * @param fee
   * @param memo
   * @param timeoutHeight (optional) timeout height to prevent the tx from being committed past a certain height
   */
  public async signAndBroadcast(
    signerAddress: string,
    messages: readonly EncodeObject[],
    _fee: StdFee | 'auto' | number,
    memo = '',
    timeoutHeight?: bigint
  ): Promise<DeliverTxResponse> {
    let usedFee: StdFee
    if (fee == 'auto' || typeof fee === 'number') {
      assertDefined(
        this.gasPrice,
        'Gas price must be set in the client options when auto gas is used.'
      )
      const gasEstimation = await this.simulate(signerAddress, messages, memo)
      // Starting with Cosmos SDK 0.47, we see many cases in which 1.3 is not enough anymore
      // E.g. https://github.com/cosmos/cosmos-sdk/issues/16020
      const multiplier = typeof fee === 'number' ? fee : 1.4
      usedFee = calculateFee(
        Math.round(gasEstimation * multiplier),
        this.gasPrice
      )
    } else {
      usedFee = fee
    }
    const txRaw = await this.sign(
      signerAddress,
      messages,
      usedFee,
      memo,
      undefined,
      timeoutHeight
    )
    const txBytes = TxRaw.encode(txRaw).finish()
    return this.broadcastTx(
      txBytes,
      this.broadcastTimeoutMs,
      this.broadcastPollIntervalMs
    )
  }

  /**
   * Creates a transaction with the given messages, fee, memo and timeout height. Then signs and broadcasts the transaction.
   *
   * This method is useful if you want to send a transaction in broadcast,
   * without waiting for it to be placed inside a block, because for example
   * I would like to receive the hash to later track the transaction with another tool.
   *
   * @param signerAddress The address that will sign transactions using this instance. The signer must be able to sign with this address.
   * @param messages
   * @param fee
   * @param memo
   * @param timeoutHeight (optional) timeout height to prevent the tx from being committed past a certain height
   *
   * @returns Returns the hash of the transaction
   */
  public async signAndBroadcastSync(
    signerAddress: string,
    messages: readonly EncodeObject[],
    fee: StdFee | 'auto' | number,
    memo = '',
    timeoutHeight?: bigint
  ): Promise<string> {
    let usedFee: StdFee
    if (fee == 'auto' || typeof fee === 'number') {
      assertDefined(
        this.gasPrice,
        'Gas price must be set in the client options when auto gas is used.'
      )
      const gasEstimation = await this.simulate(signerAddress, messages, memo)
      const multiplier = typeof fee === 'number' ? fee : 1.3
      usedFee = calculateFee(
        Math.round(gasEstimation * multiplier),
        this.gasPrice
      )
    } else {
      usedFee = fee
    }
    const txRaw = await this.sign(
      signerAddress,
      messages,
      usedFee,
      memo,
      undefined,
      timeoutHeight
    )
    const txBytes = TxRaw.encode(txRaw).finish()
    return this.broadcastTxSync(txBytes)
  }

  private async signAmino(
    signerAddress: string,
    messages: readonly EncodeObject[],
    fee: StdFee,
    memo: string,
    { accountNumber, sequence, chainId }: SignerData,
    timeoutHeight?: bigint
  ): Promise<TxRaw> {
    assert(!isOfflineDirectSigner(this.secretSigner))
    const accountFromSigner = (await this.secretSigner.getAccounts()).find(
      (account) => account.address === signerAddress
    )
    if (!accountFromSigner) {
      throw new Error('Failed to retrieve account from signer')
    }

    const signMode = SignMode.SIGN_MODE_LEGACY_AMINO_JSON

    const msgs = await Promise.all(
      messages.map(async (msg) => {
        await this.populateCodeHash(msg)
        return msg.toAmino(this.encryptionUtils)
      })
    )
    const signDoc = makeSignDocAmino(
      msgs,
      fee,
      chainId,
      memo,
      accountNumber,
      sequence
    )

    let signed: StdSignDoc
    let signature: StdSignature

    if (!simulate) {
      ;({ signature, signed } = await this.wallet.signAmino(
        account.address,
        signDoc
      ))
    } else {
      signed = signDoc
      signature = getSimulateSignature()
    }

    const txBody = {
      type_url: '/cosmos.tx.v1beta1.TxBody',
      value: {
        messages: await Promise.all(
          messages.map(async (msg, index) => {
            await this.populateCodeHash(msg)
            const asProto: ProtoMsg = await msg.toProto(this.encryptionUtils)

            return asProto
          })
        ),
        memo: signed.memo, // memo might have been changed by the wallet before signing
      },
    }
    const txBodyBytes = await this.encodeTx(txBody)
    const signedGasLimit = Number(signed.fee.gas)
    const signedSequence = Number(signed.sequence)
    const pubkey = await encodePubkey(encodeSecp256k1Pubkey(account.pubkey))
    const signedAuthInfoBytes = await makeAuthInfoBytes(
      [{ pubkey, sequence: signedSequence }],
      signed.fee.amount,
      signedGasLimit,
      signed.fee.granter,
      signMode
    )
    return TxRaw.fromPartial({
      body_bytes: txBodyBytes,
      auth_info_bytes: signedAuthInfoBytes,
      signatures: [fromBase64(signature.signature)],
    })
  }

  private async signDirect(
    signerAddress: string,
    messages: readonly EncodeObject[],
    fee: StdFee,
    memo: string,
    { accountNumber, sequence, chainId }: SignerData,
    timeoutHeight?: bigint
  ): Promise<TxRaw> {
    assert(isOfflineDirectSigner(this.signer))
    const accountFromSigner = (await this.signer.getAccounts()).find(
      (account) => account.address === signerAddress
    )
    if (!accountFromSigner) {
      throw new Error('Failed to retrieve account from signer')
    }
    const pubkey = encodePubkey(encodeSecp256k1Pubkey(accountFromSigner.pubkey))
    const txBody: TxBodyEncodeObject = {
      typeUrl: '/cosmos.tx.v1beta1.TxBody',
      value: {
        messages: messages,
        memo: memo,
        timeoutHeight: timeoutHeight,
      },
    }
    const txBodyBytes = this.registry.encode(txBody)
    const gasLimit = Int53.fromString(fee.gas).toNumber()
    const authInfoBytes = makeAuthInfoBytes(
      [{ pubkey, sequence }],
      fee.amount,
      gasLimit,
      fee.granter,
      fee.payer
    )
    const signDoc = makeSignDoc(
      txBodyBytes,
      authInfoBytes,
      chainId,
      accountNumber
    )
    const { signature, signed } = await this.signer.signDirect(
      signerAddress,
      signDoc
    )
    return TxRaw.fromPartial({
      bodyBytes: signed.bodyBytes,
      authInfoBytes: signed.authInfoBytes,
      signatures: [fromBase64(signature.signature)],
    })
  }
}
