import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { StargateClient, logs } from '@cosmjs/stargate'
import {
  HttpBatchClient,
  Tendermint34Client,
  Tendermint37Client,
  TendermintClient,
} from '@cosmjs/tendermint-rpc'

type ChainClientRoutes<T> = {
  [rpcEndpoint: string]: T
}

type HandleConnect<T> = (rpcEndpoint: string) => Promise<T>

/*
 * This is a workaround for `@cosmjs` clients to avoid connecting to the chain more than once.
 *
 * @example
 * export const stargateClientRouter = new ChainClientRouter({
 *   handleConnect: (rpcEndpoint: string) => StargateClient.connect(rpcEndpoint),
 * })
 *
 * const client = await stargateClientRouter.connect(RPC_ENDPOINT);
 *
 * const queryResponse = await client.queryContractSmart(...);
 *  */
class ChainClientRouter<T> {
  private readonly handleConnect: HandleConnect<T>
  private instances: ChainClientRoutes<T> = {}

  constructor({ handleConnect }: { handleConnect: HandleConnect<T> }) {
    this.handleConnect = handleConnect
  }

  /*
   * Connect to the chain and return the client
   * or return an existing instance of the client.
   *  */
  async connect(rpcEndpoint: string) {
    if (!this.getClientInstance(rpcEndpoint)) {
      const instance = await this.handleConnect(rpcEndpoint)
      this.setClientInstance(rpcEndpoint, instance)
    }

    return this.getClientInstance(rpcEndpoint)
  }

  private getClientInstance(rpcEndpoint: string) {
    return this.instances[rpcEndpoint]
  }

  private setClientInstance(rpcEndpoint: string, client: T) {
    this.instances[rpcEndpoint] = client
  }
}

/*
 * Router for connecting to `CosmWasmClient`.
 *  */
export const cosmWasmClientRouter = new ChainClientRouter({
  handleConnect: async (rpcEndpoint: string) => {
    const httpClient = new HttpBatchClient(rpcEndpoint)

    // Use default Tendermint 0.34/0.37 client auto-detection, and then recreate
    // the correct Tendermint client with the http batch client.
    const cwClient = await CosmWasmClient.connect(rpcEndpoint)
    const autoDetectedTmClient: TendermintClient = cwClient['tmClient']
    const tmClient: TendermintClient = await (
      autoDetectedTmClient.constructor as
        | typeof Tendermint34Client
        | typeof Tendermint37Client
    ).create(httpClient)

    return await CosmWasmClient.create(tmClient)
  },
})

/*
 * Router for connecting to `StargateClient`.
 *  */
export const stargateClientRouter = new ChainClientRouter({
  handleConnect: async (rpcEndpoint: string) => {
    const httpClient = new HttpBatchClient(rpcEndpoint)

    // Use default Tendermint 0.34/0.37 client auto-detection, and then recreate
    // the correct Tendermint client with the http batch client.
    const cwClient = await CosmWasmClient.connect(rpcEndpoint)
    const autoDetectedTmClient: TendermintClient = cwClient['tmClient']
    const tmClient: TendermintClient = await (
      autoDetectedTmClient.constructor as
        | typeof Tendermint34Client
        | typeof Tendermint37Client
    ).create(httpClient)

    return await StargateClient.create(tmClient, {})
  },
})

// In response logs from a transaction with a wasm event, gets the attribute key
// for a given contract address.
export const findWasmAttributeValue = (
  logs: readonly logs.Log[],
  contractAddress: string,
  attributeKey: string
): string | undefined => {
  const wasmEvent = logs
    .flatMap((log) => log.events)
    .find(
      ({ type, attributes }) =>
        type === 'wasm' &&
        attributes.some(
          ({ key, value }) =>
            key === '_contract_address' && value === contractAddress
        ) &&
        attributes.some(({ key }) => key === attributeKey)
    )
  return wasmEvent?.attributes.find(({ key }) => key === attributeKey)!.value
}
