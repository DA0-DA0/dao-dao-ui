import { GeneratedType, Registry, OfflineSigner } from "@cosmjs/proto-signing";
import { defaultRegistryTypes, AminoTypes, SigningStargateClient } from "@cosmjs/stargate";
import { HttpEndpoint } from "@cosmjs/tendermint-rpc";
import * as feemarketFeemarketV1TxRegistry from "./feemarket/v1/tx.registry";
import * as feemarketFeemarketV1TxAmino from "./feemarket/v1/tx.amino";
export const feemarketAminoConverters = {
  ...feemarketFeemarketV1TxAmino.AminoConverter
};
export const feemarketProtoRegistry: ReadonlyArray<[string, GeneratedType]> = [...feemarketFeemarketV1TxRegistry.registry];
export const getSigningFeemarketClientOptions = ({
  defaultTypes = defaultRegistryTypes
}: {
  defaultTypes?: ReadonlyArray<[string, GeneratedType]>;
} = {}): {
  registry: Registry;
  aminoTypes: AminoTypes;
} => {
  const registry = new Registry([...defaultTypes, ...feemarketProtoRegistry]);
  const aminoTypes = new AminoTypes({
    ...feemarketAminoConverters
  });
  return {
    registry,
    aminoTypes
  };
};
export const getSigningFeemarketClient = async ({
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
  } = getSigningFeemarketClientOptions({
    defaultTypes
  });
  const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, signer, {
    registry: (registry as any),
    aminoTypes
  });
  return client;
};