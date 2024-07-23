import { GeneratedType, Registry, OfflineSigner } from "@cosmjs/proto-signing";
import { defaultRegistryTypes, AminoTypes, SigningStargateClient } from "@cosmjs/stargate";
import { HttpEndpoint } from "@cosmjs/tendermint-rpc";
import * as interchainSecurityCcvConsumerV1TxRegistry from "./ccv/consumer/v1/tx.registry";
import * as interchainSecurityCcvConsumerV1TxAmino from "./ccv/consumer/v1/tx.amino";
export const interchainSecurityAminoConverters = {
  ...interchainSecurityCcvConsumerV1TxAmino.AminoConverter
};
export const interchainSecurityProtoRegistry: ReadonlyArray<[string, GeneratedType]> = [...interchainSecurityCcvConsumerV1TxRegistry.registry];
export const getSigningInterchainSecurityClientOptions = ({
  defaultTypes = defaultRegistryTypes
}: {
  defaultTypes?: ReadonlyArray<[string, GeneratedType]>;
} = {}): {
  registry: Registry;
  aminoTypes: AminoTypes;
} => {
  const registry = new Registry([...defaultTypes, ...interchainSecurityProtoRegistry]);
  const aminoTypes = new AminoTypes({
    ...interchainSecurityAminoConverters
  });
  return {
    registry,
    aminoTypes
  };
};
export const getSigningInterchainSecurityClient = async ({
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
  } = getSigningInterchainSecurityClientOptions({
    defaultTypes
  });
  const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, signer, {
    registry: (registry as any),
    aminoTypes
  });
  return client;
};