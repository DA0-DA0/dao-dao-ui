import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { StargateClient } from '@cosmjs/stargate'
import { HttpBatchClient, Tendermint34Client } from '@cosmjs/tendermint-rpc'

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
    const tmClient = await Tendermint34Client.create(httpClient)
    // @ts-ignore
    const cwClient = new CosmWasmClient(tmClient)
    return cwClient
  },
})

/*
 * Router for connecting to `StargateClient`.
 *  */
export const stargateClientRouter = new ChainClientRouter({
  handleConnect: async (rpcEndpoint: string) => {
    const httpClient = new HttpBatchClient(rpcEndpoint)
    const tmClient = await Tendermint34Client.create(httpClient)
    // @ts-ignore
    const sgClient = new StargateClient(tmClient)
    return sgClient
  },
})
