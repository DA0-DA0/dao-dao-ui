import { GeneratedType, Registry, OfflineSigner } from "@cosmjs/proto-signing";
import { defaultRegistryTypes, AminoTypes, SigningStargateClient } from "@cosmjs/stargate";
import { HttpEndpoint } from "@cosmjs/tendermint-rpc";
import * as elysStablestakeTxRegistry from "./stablestake/tx.registry";
import * as elysStablestakeTxAmino from "./stablestake/tx.amino";
export const elysAminoConverters = {
  ...elysStablestakeTxAmino.AminoConverter
};
export const elysProtoRegistry: ReadonlyArray<[string, GeneratedType]> = [...elysStablestakeTxRegistry.registry];
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