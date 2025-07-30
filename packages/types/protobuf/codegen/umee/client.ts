import { GeneratedType, Registry, OfflineSigner } from "@cosmjs/proto-signing";
import { defaultRegistryTypes, AminoTypes, SigningStargateClient } from "@cosmjs/stargate";
import { HttpEndpoint } from "@cosmjs/tendermint-rpc";
import * as umeeLeverageV1TxRegistry from "./leverage/v1/tx.registry";
import * as umeeLeverageV1TxAmino from "./leverage/v1/tx.amino";
export const umeeAminoConverters = {
  ...umeeLeverageV1TxAmino.AminoConverter
};
export const umeeProtoRegistry: ReadonlyArray<[string, GeneratedType]> = [...umeeLeverageV1TxRegistry.registry];
export const getSigningUmeeClientOptions = ({
  defaultTypes = defaultRegistryTypes
}: {
  defaultTypes?: ReadonlyArray<[string, GeneratedType]>;
} = {}): {
  registry: Registry;
  aminoTypes: AminoTypes;
} => {
  const registry = new Registry([...defaultTypes, ...umeeProtoRegistry]);
  const aminoTypes = new AminoTypes({
    ...umeeAminoConverters
  });
  return {
    registry,
    aminoTypes
  };
};
export const getSigningUmeeClient = async ({
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
  } = getSigningUmeeClientOptions({
    defaultTypes
  });
  const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, signer, {
    registry: (registry as any),
    aminoTypes
  });
  return client;
};