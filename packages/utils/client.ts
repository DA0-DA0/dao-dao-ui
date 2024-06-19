import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { Event, StargateClient } from '@cosmjs/stargate'
import {
  Comet38Client,
  HttpBatchClient,
  Tendermint34Client,
  Tendermint37Client,
  connectComet,
} from '@cosmjs/tendermint-rpc'

import {
  cosmos,
  cosmwasm,
  ibc,
  juno,
  kujira,
  neutron,
  noble,
  osmosis,
} from '@dao-dao/types/protobuf'

import { getRpcForChainId } from './chain'
import { retry } from './network'

type HandleConnect<T> = (chainId: string) => Promise<T>
type ChainClientRouterOptions<T> = {
  /**
   * The connection handler that returns the client for a given chain ID.
   */
  handleConnect: HandleConnect<T>
}

/*
 * This is a client wrapper that preserves singletons of connected clients for
 * many chains.
 *
 * @example
 * ```
 * export const stargateClientRouter = new ChainClientRouter({
 *   handleConnect: (chainId: string) => StargateClient.connect(
 *     getRpcForChainId(chainId)
 *   ),
 * })
 *
 * const client = await stargateClientRouter.connect(CHAIN_ID);
 *
 * const queryResponse = await client.queryContractSmart(...);
 * ```
 */
class ChainClientRouter<T> {
  private readonly handleConnect: HandleConnect<T>
  private instances: Record<string, T> = {}

  constructor({ handleConnect }: ChainClientRouterOptions<T>) {
    this.handleConnect = handleConnect
  }

  /*
   * Connect to the chain and return the client or return an existing instance
   * of the client.
   */
  async connect(chainId: string): Promise<T> {
    if (!this.instances[chainId]) {
      const instance = await this.handleConnect(chainId)
      this.instances[chainId] = instance
    }

    return this.instances[chainId]
  }
}

/*
 * Router for connecting to `CosmWasmClient`.
 */
export const cosmWasmClientRouter = new ChainClientRouter({
  handleConnect: async (chainId: string) =>
    retry(10, async (attempt) => {
      const rpc = getRpcForChainId(chainId, attempt - 1)

      const httpClient = new HttpBatchClient(rpc)
      const tmClient = await (
        (
          await connectComet(rpc)
        ).constructor as
          | typeof Tendermint34Client
          | typeof Tendermint37Client
          | typeof Comet38Client
      ).create(httpClient)

      return await CosmWasmClient.create(tmClient)
    }),
})

/*
 * Router for connecting to `StargateClient`.
 */
export const stargateClientRouter = new ChainClientRouter({
  handleConnect: async (chainId: string) =>
    retry(10, async (attempt) => {
      const rpc = getRpcForChainId(chainId, attempt - 1)

      const httpClient = new HttpBatchClient(rpc)
      const tmClient = await (
        (
          await connectComet(rpc)
        ).constructor as
          | typeof Tendermint34Client
          | typeof Tendermint37Client
          | typeof Comet38Client
      ).create(httpClient)

      return await StargateClient.create(tmClient)
    }),
})

/*
 * Router for connecting to an RPC client with Cosmos protobufs.
 */
export const cosmosProtoRpcClientRouter = new ChainClientRouter({
  handleConnect: async (chainId: string) =>
    retry(
      10,
      async (attempt) =>
        (
          await cosmos.ClientFactory.createRPCQueryClient({
            rpcEndpoint: getRpcForChainId(chainId, attempt - 1),
          })
        ).cosmos
    ),
})

/*
 * Router for connecting to an RPC client with IBC protobufs.
 */
export const ibcProtoRpcClientRouter = new ChainClientRouter({
  handleConnect: async (chainId: string) =>
    retry(
      10,
      async (attempt) =>
        (
          await ibc.ClientFactory.createRPCQueryClient({
            rpcEndpoint: getRpcForChainId(chainId, attempt - 1),
          })
        ).ibc
    ),
})

/*
 * Router for connecting to an RPC client with CosmWasm protobufs.
 */
export const cosmwasmProtoRpcClientRouter = new ChainClientRouter({
  handleConnect: async (chainId: string) =>
    retry(
      10,
      async (attempt) =>
        (
          await cosmwasm.ClientFactory.createRPCQueryClient({
            rpcEndpoint: getRpcForChainId(chainId, attempt - 1),
          })
        ).cosmwasm
    ),
})

/*
 * Router for connecting to an RPC client with Osmosis protobufs.
 */
export const osmosisProtoRpcClientRouter = new ChainClientRouter({
  handleConnect: async (chainId: string) =>
    retry(
      10,
      async (attempt) =>
        (
          await osmosis.ClientFactory.createRPCQueryClient({
            rpcEndpoint: getRpcForChainId(chainId, attempt - 1),
          })
        ).osmosis
    ),
})

/*
 * Router for connecting to an RPC client with Noble protobufs.
 */
export const nobleProtoRpcClientRouter = new ChainClientRouter({
  handleConnect: async (chainId: string) =>
    retry(
      10,
      async (attempt) =>
        (
          await noble.ClientFactory.createRPCQueryClient({
            rpcEndpoint: getRpcForChainId(chainId, attempt - 1),
          })
        ).noble
    ),
})

/*
 * Router for connecting to an RPC client with Neutron protobufs.
 */
export const neutronProtoRpcClientRouter = new ChainClientRouter({
  handleConnect: async (chainId: string) =>
    retry(
      10,
      async (attempt) =>
        (
          await neutron.ClientFactory.createRPCQueryClient({
            rpcEndpoint: getRpcForChainId(chainId, attempt - 1),
          })
        ).neutron
    ),
})

/*
 * Router for connecting to an RPC client with Juno protobufs.
 */
export const junoProtoRpcClientRouter = new ChainClientRouter({
  handleConnect: async (chainId: string) =>
    retry(
      10,
      async (attempt) =>
        (
          await juno.ClientFactory.createRPCQueryClient({
            rpcEndpoint: getRpcForChainId(chainId, attempt - 1),
          })
        ).juno
    ),
})

/*
 * Router for connecting to an RPC client with Kujira protobufs.
 */
export const kujiraProtoRpcClientRouter = new ChainClientRouter({
  handleConnect: async (chainId: string) =>
    retry(
      10,
      async (attempt) =>
        (
          await kujira.ClientFactory.createRPCQueryClient({
            rpcEndpoint: getRpcForChainId(chainId, attempt - 1),
          })
        ).kujira
    ),
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
