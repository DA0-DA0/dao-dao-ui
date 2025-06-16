import { Tendermint34Client, HttpEndpoint } from "@cosmjs/tendermint-rpc";
import { QueryClient } from "@cosmjs/stargate";
export const createRPCQueryClient = async ({
  rpcEndpoint
}: {
  rpcEndpoint: string | HttpEndpoint;
}) => {
  const tmClient = await Tendermint34Client.connect(rpcEndpoint);
  const client = new QueryClient(tmClient);
  return {
    cosmos: {
      auth: {
        v1beta1: (await import("../cosmos/auth/v1beta1/query.rpc.Query")).createRpcQueryExtension(client)
      },
      authz: {
        v1beta1: (await import("../cosmos/authz/v1beta1/query.rpc.Query")).createRpcQueryExtension(client)
      },
      bank: {
        v1beta1: (await import("../cosmos/bank/v1beta1/query.rpc.Query")).createRpcQueryExtension(client)
      },
      base: {
        tendermint: {
          v1beta1: (await import("../cosmos/base/tendermint/v1beta1/query.rpc.Service")).createRpcQueryExtension(client)
        }
      },
      distribution: {
        v1beta1: (await import("../cosmos/distribution/v1beta1/query.rpc.Query")).createRpcQueryExtension(client)
      },
      feegrant: {
        v1beta1: (await import("../cosmos/feegrant/v1beta1/query.rpc.Query")).createRpcQueryExtension(client)
      },
      gov: {
        v1: (await import("../cosmos/gov/v1/query.rpc.Query")).createRpcQueryExtension(client),
        v1beta1: (await import("../cosmos/gov/v1beta1/query.rpc.Query")).createRpcQueryExtension(client)
      },
      mint: {
        v1beta1: (await import("../cosmos/mint/v1beta1/query.rpc.Query")).createRpcQueryExtension(client)
      },
      params: {
        v1beta1: (await import("../cosmos/params/v1beta1/query.rpc.Query")).createRpcQueryExtension(client)
      },
      slashing: {
        v1beta1: (await import("../cosmos/slashing/v1beta1/query.rpc.Query")).createRpcQueryExtension(client)
      },
      staking: {
        v1beta1: (await import("../cosmos/staking/v1beta1/query.rpc.Query")).createRpcQueryExtension(client)
      },
      tx: {
        v1beta1: (await import("../cosmos/tx/v1beta1/service.rpc.Service")).createRpcQueryExtension(client)
      },
      upgrade: {
        v1beta1: (await import("../cosmos/upgrade/v1beta1/query.rpc.Query")).createRpcQueryExtension(client)
      }
    },
    pryzm: {
      amm: {
        v1: (await import("./amm/v1/query.rpc.Query")).createRpcQueryExtension(client)
      },
      assets: {
        v1: (await import("./assets/v1/query.rpc.Query")).createRpcQueryExtension(client)
      },
      icstaking: {
        v1: (await import("./icstaking/v1/query.rpc.Query")).createRpcQueryExtension(client)
      },
      incentives: {
        v1: (await import("./incentives/v1/query.rpc.Query")).createRpcQueryExtension(client)
      },
      mint: {
        v1: (await import("./mint/v1/query.rpc.Query")).createRpcQueryExtension(client)
      },
      pgov: {
        v1: (await import("./pgov/v1/query.rpc.Query")).createRpcQueryExtension(client)
      },
      refractor: {
        v1: (await import("./refractor/v1/query.rpc.Query")).createRpcQueryExtension(client)
      },
      treasury: {
        v1: (await import("./treasury/v1/query.rpc.Query")).createRpcQueryExtension(client)
      },
      ystaking: {
        v1: (await import("./ystaking/v1/query.rpc.Query")).createRpcQueryExtension(client)
      }
    }
  };
};