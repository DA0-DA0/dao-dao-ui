import { GeneratedType, Registry, OfflineSigner } from "@cosmjs/proto-signing";
import { defaultRegistryTypes, AminoTypes, SigningStargateClient } from "@cosmjs/stargate";
import { HttpEndpoint } from "@cosmjs/tendermint-rpc";
import * as cosmwasmTokenfactoryV1beta1TxRegistry from "./tokenfactory/v1beta1/tx.registry";
import * as cosmwasmWasmV1TxRegistry from "./wasm/v1/tx.registry";
import * as cosmwasmTokenfactoryV1beta1TxAmino from "./tokenfactory/v1beta1/tx.amino";
import * as cosmwasmWasmV1TxAmino from "./wasm/v1/tx.amino";
export const cosmwasmAminoConverters = {
  ...cosmwasmTokenfactoryV1beta1TxAmino.AminoConverter,
  ...cosmwasmWasmV1TxAmino.AminoConverter
};
export const cosmwasmProtoRegistry: ReadonlyArray<[string, GeneratedType]> = [...cosmwasmTokenfactoryV1beta1TxRegistry.registry, ...cosmwasmWasmV1TxRegistry.registry];
export const getSigningCosmwasmClientOptions = ({
  defaultTypes = defaultRegistryTypes
}: {
  defaultTypes?: ReadonlyArray<[string, GeneratedType]>;
} = {}): {
  registry: Registry;
  aminoTypes: AminoTypes;
} => {
  const registry = new Registry([...defaultTypes, ...cosmwasmProtoRegistry]);
  const aminoTypes = new AminoTypes({
    ...cosmwasmAminoConverters
  });
  return {
    registry,
    aminoTypes
  };
};
export const getSigningCosmwasmClient = async ({
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
  } = getSigningCosmwasmClientOptions({
    defaultTypes
  });
  const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, signer, {
    registry: (registry as any),
    aminoTypes
  });
  return client;
};