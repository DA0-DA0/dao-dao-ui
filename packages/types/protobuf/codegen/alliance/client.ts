import { GeneratedType, Registry, OfflineSigner } from "@cosmjs/proto-signing";
import { defaultRegistryTypes, AminoTypes, SigningStargateClient } from "@cosmjs/stargate";
import { HttpEndpoint } from "@cosmjs/tendermint-rpc";
import * as allianceAllianceTxRegistry from "./alliance/tx.registry";
import * as allianceAllianceTxAmino from "./alliance/tx.amino";
export const allianceAminoConverters = {
  ...allianceAllianceTxAmino.AminoConverter
};
export const allianceProtoRegistry: ReadonlyArray<[string, GeneratedType]> = [...allianceAllianceTxRegistry.registry];
export const getSigningAllianceClientOptions = ({
  defaultTypes = defaultRegistryTypes
}: {
  defaultTypes?: ReadonlyArray<[string, GeneratedType]>;
} = {}): {
  registry: Registry;
  aminoTypes: AminoTypes;
} => {
  const registry = new Registry([...defaultTypes, ...allianceProtoRegistry]);
  const aminoTypes = new AminoTypes({
    ...allianceAminoConverters
  });
  return {
    registry,
    aminoTypes
  };
};
export const getSigningAllianceClient = async ({
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
  } = getSigningAllianceClientOptions({
    defaultTypes
  });
  const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, signer, {
    registry: (registry as any),
    aminoTypes
  });
  return client;
};