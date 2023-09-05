import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { StargateClient, logs } from '@cosmjs/stargate'
import {
  HttpBatchClient,
  Tendermint34Client,
  Tendermint37Client,
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
    const tmClient = await (
      (
        await connectTendermintClient(rpcEndpoint)
      ).constructor as typeof Tendermint34Client | typeof Tendermint37Client
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
    const tmClient = await (
      (
        await connectTendermintClient(rpcEndpoint)
      ).constructor as typeof Tendermint34Client | typeof Tendermint37Client
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

// Connect the correct tendermint client based on the node's version.
export const connectTendermintClient = async (endpoint: string) => {
  // Tendermint/CometBFT 0.34/0.37 auto-detection. Starting with 0.37 we seem to
  // get reliable versions again 🎉 Using 0.34 as the fallback.
  let tmClient
  const tm37Client = await Tendermint37Client.connect(endpoint)
  const version = (await tm37Client.status()).nodeInfo.version
  if (version.startsWith('0.37.')) {
    tmClient = tm37Client
  } else {
    tm37Client.disconnect()
    tmClient = await Tendermint34Client.connect(endpoint)
  }
  return tmClient
}
