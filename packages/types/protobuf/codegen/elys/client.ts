import { GeneratedType, Registry, OfflineSigner } from "@cosmjs/proto-signing";
import { defaultRegistryTypes, AminoTypes, SigningStargateClient } from "@cosmjs/stargate";
import { HttpEndpoint } from "@cosmjs/tendermint-rpc";
import * as elysAmmTxRegistry from "./amm/tx.registry";
import * as elysMasterchefTxRegistry from "./masterchef/tx.registry";
import * as elysStablestakeTxRegistry from "./stablestake/tx.registry";
import * as elysAmmTxAmino from "./amm/tx.amino";
import * as elysMasterchefTxAmino from "./masterchef/tx.amino";
import * as elysStablestakeTxAmino from "./stablestake/tx.amino";
export const elysAminoConverters = {
  ...elysAmmTxAmino.AminoConverter,
  ...elysMasterchefTxAmino.AminoConverter,
  ...elysStablestakeTxAmino.AminoConverter
};
export const elysProtoRegistry: ReadonlyArray<[string, GeneratedType]> = [...elysAmmTxRegistry.registry, ...elysMasterchefTxRegistry.registry, ...elysStablestakeTxRegistry.registry];
export const getSigningElysClientOptions = ({
  defaultTypes = defaultRegistryTypes
}: {
  defaultTypes?: ReadonlyArray<[string, GeneratedType]>;
} = {}): {
  registry: Registry;
  aminoTypes: AminoTypes;
} => {
  const registry = new Registry([...defaultTypes, ...elysProtoRegistry]);
  const aminoTypes = new AminoTypes({
    ...elysAminoConverters
  });
  return {
    registry,
    aminoTypes
  };
};
export const getSigningElysClient = async ({
  rpcEndpoint,
  signer,
  defaultTypes = defaultRegistryTypes
}: {
  rpcEndpoint: string | HttpEndpoint;
  signer: OfflineSigner;
  defaultTypes?: ReadonlyArray<[string, GeneratedType]>;
}) => {
  const {
    registry,
    aminoTypes
  } = getSigningElysClientOptions({
    defaultTypes
  });
  const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, signer, {
    registry: (registry as any),
    aminoTypes
  });
  return client;
};