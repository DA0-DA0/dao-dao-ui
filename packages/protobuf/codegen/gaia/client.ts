import { GeneratedType, Registry, OfflineSigner } from "@cosmjs/proto-signing";
import { defaultRegistryTypes, AminoTypes, SigningStargateClient } from "@cosmjs/stargate";
import { HttpEndpoint } from "@cosmjs/tendermint-rpc";
import * as gaiaGlobalfeeV1beta1TxRegistry from "./globalfee/v1beta1/tx.registry";
import * as gaiaGlobalfeeV1beta1TxAmino from "./globalfee/v1beta1/tx.amino";
export const gaiaAminoConverters = {
  ...gaiaGlobalfeeV1beta1TxAmino.AminoConverter
};
export const gaiaProtoRegistry: ReadonlyArray<[string, GeneratedType]> = [...gaiaGlobalfeeV1beta1TxRegistry.registry];
export const getSigningGaiaClientOptions = ({
  defaultTypes = defaultRegistryTypes
}: {
  defaultTypes?: ReadonlyArray<[string, GeneratedType]>;
} = {}): {
  registry: Registry;
  aminoTypes: AminoTypes;
} => {
  const registry = new Registry([...defaultTypes, ...gaiaProtoRegistry]);
  const aminoTypes = new AminoTypes({
    ...gaiaAminoConverters
  });
  return {
    registry,
    aminoTypes
  };
};
export const getSigningGaiaClient = async ({
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
  } = getSigningGaiaClientOptions({
    defaultTypes
  });
  const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, signer, {
    registry: (registry as any),
    aminoTypes
  });
  return client;
};