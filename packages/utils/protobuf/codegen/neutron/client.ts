import { GeneratedType, Registry, OfflineSigner } from "@cosmjs/proto-signing";
import { defaultRegistryTypes, AminoTypes, SigningStargateClient } from "@cosmjs/stargate";
import { HttpEndpoint } from "@cosmjs/tendermint-rpc";
import * as neutronFeerefunderTxRegistry from "./feerefunder/tx.registry";
import * as neutronTransferV1TxRegistry from "./transfer/v1/tx.registry";
import * as neutronFeerefunderTxAmino from "./feerefunder/tx.amino";
import * as neutronTransferV1TxAmino from "./transfer/v1/tx.amino";
export const neutronAminoConverters = {
  ...neutronFeerefunderTxAmino.AminoConverter,
  ...neutronTransferV1TxAmino.AminoConverter
};
export const neutronProtoRegistry: ReadonlyArray<[string, GeneratedType]> = [...neutronFeerefunderTxRegistry.registry, ...neutronTransferV1TxRegistry.registry];
export const getSigningNeutronClientOptions = ({
  defaultTypes = defaultRegistryTypes
}: {
  defaultTypes?: ReadonlyArray<[string, GeneratedType]>;
} = {}): {
  registry: Registry;
  aminoTypes: AminoTypes;
} => {
  const registry = new Registry([...defaultTypes, ...neutronProtoRegistry]);
  const aminoTypes = new AminoTypes({
    ...neutronAminoConverters
  });
  return {
    registry,
    aminoTypes
  };
};
export const getSigningNeutronClient = async ({
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
  } = getSigningNeutronClientOptions({
    defaultTypes
  });
  const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, signer, {
    registry: (registry as any),
    aminoTypes
  });
  return client;
};