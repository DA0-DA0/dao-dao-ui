import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { Event, StargateClient } from '@cosmjs/stargate'
import {
  Comet38Client,
  HttpBatchClient,
  Tendermint34Client,
  Tendermint37Client,
  connectComet,
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
        await connectComet(rpcEndpoint)
      ).constructor as
        | typeof Tendermint34Client
        | typeof Tendermint37Client
        | typeof Comet38Client
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
        await connectComet(rpcEndpoint)
      ).constructor as
        | typeof Tendermint34Client
        | typeof Tendermint37Client
        | typeof Comet38Client
    ).create(httpClient)

    return await StargateClient.create(tmClient, {})
  },
})

/**
 * In response events from a transaction with a wasm event, gets the attribute
 * key for a given contract address.
 */
export const findWasmAttributeValue = (
  events: readonly Event[],
  contractAddress: string,
  attributeKey: string
): string | undefined => {
  const wasmEvent = events.find(
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

/**
 * In response events from a transaction, gets the first attribute value for an
 * attribute key in the first event of a given type.
 */
export const findEventsAttributeValue = (
  events: readonly Event[],
  eventType: string,
  attributeKey: string
): string | undefined =>
  events.flatMap(
    ({ type, attributes }) =>
      (type === eventType &&
        attributes.find(({ key }) => key === attributeKey)) ||
      []
  )[0]?.value
