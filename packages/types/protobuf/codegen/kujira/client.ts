import { GeneratedType, Registry, OfflineSigner } from "@cosmjs/proto-signing";
import { defaultRegistryTypes, AminoTypes, SigningStargateClient } from "@cosmjs/stargate";
import { HttpEndpoint } from "@cosmjs/tendermint-rpc";
import * as kujiraDenomTxRegistry from "./denom/tx.registry";
import * as kujiraOracleTxRegistry from "./oracle/tx.registry";
import * as kujiraDenomTxAmino from "./denom/tx.amino";
import * as kujiraOracleTxAmino from "./oracle/tx.amino";
export const kujiraAminoConverters = {
  ...kujiraDenomTxAmino.AminoConverter,
  ...kujiraOracleTxAmino.AminoConverter
};
export const kujiraProtoRegistry: ReadonlyArray<[string, GeneratedType]> = [...kujiraDenomTxRegistry.registry, ...kujiraOracleTxRegistry.registry];
export const getSigningKujiraClientOptions = ({
  defaultTypes = defaultRegistryTypes
}: {
  defaultTypes?: ReadonlyArray<[string, GeneratedType]>;
} = {}): {
  registry: Registry;
  aminoTypes: AminoTypes;
} => {
  const registry = new Registry([...defaultTypes, ...kujiraProtoRegistry]);
  const aminoTypes = new AminoTypes({
    ...kujiraAminoConverters
  });
  return {
    registry,
    aminoTypes
  };
};
export const getSigningKujiraClient = async ({
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
  } = getSigningKujiraClientOptions({
    defaultTypes
  });
  const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, signer, {
    registry: (registry as any),
    aminoTypes
  });
  return client;
};