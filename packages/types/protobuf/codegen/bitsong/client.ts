import { GeneratedType, Registry, OfflineSigner } from "@cosmjs/proto-signing";
import { defaultRegistryTypes, AminoTypes, SigningStargateClient } from "@cosmjs/stargate";
import { HttpEndpoint } from "@cosmjs/tendermint-rpc";
import * as bitsongFantokenV1beta1TxRegistry from "./fantoken/v1beta1/tx.registry";
import * as bitsongFantokenV1beta1TxAmino from "./fantoken/v1beta1/tx.amino";
export const bitsongAminoConverters = {
  ...bitsongFantokenV1beta1TxAmino.AminoConverter
};
export const bitsongProtoRegistry: ReadonlyArray<[string, GeneratedType]> = [...bitsongFantokenV1beta1TxRegistry.registry];
export const getSigningBitsongClientOptions = ({
  defaultTypes = defaultRegistryTypes
}: {
  defaultTypes?: ReadonlyArray<[string, GeneratedType]>;
} = {}): {
  registry: Registry;
  aminoTypes: AminoTypes;
} => {
  const registry = new Registry([...defaultTypes, ...bitsongProtoRegistry]);
  const aminoTypes = new AminoTypes({
    ...bitsongAminoConverters
  });
  return {
    registry,
    aminoTypes
  };
};
export const getSigningBitsongClient = async ({
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
  } = getSigningBitsongClientOptions({
    defaultTypes
  });
  const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, signer, {
    registry: (registry as any),
    aminoTypes
  });
  return client;
};