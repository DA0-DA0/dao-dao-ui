import { GeneratedType, Registry, OfflineSigner } from "@cosmjs/proto-signing";
import { defaultRegistryTypes, AminoTypes, SigningStargateClient } from "@cosmjs/stargate";
import { HttpEndpoint } from "@cosmjs/tendermint-rpc";
import * as publicawesomeStargazeAllocV1beta1TxRegistry from "./stargaze/alloc/v1beta1/tx.registry";
import * as publicawesomeStargazeCronV1TxRegistry from "./stargaze/cron/v1/tx.registry";
import * as publicawesomeStargazeGlobalfeeV1TxRegistry from "./stargaze/globalfee/v1/tx.registry";
import * as publicawesomeStargazeAllocV1beta1TxAmino from "./stargaze/alloc/v1beta1/tx.amino";
import * as publicawesomeStargazeCronV1TxAmino from "./stargaze/cron/v1/tx.amino";
import * as publicawesomeStargazeGlobalfeeV1TxAmino from "./stargaze/globalfee/v1/tx.amino";
export const publicawesomeAminoConverters = {
  ...publicawesomeStargazeAllocV1beta1TxAmino.AminoConverter,
  ...publicawesomeStargazeCronV1TxAmino.AminoConverter,
  ...publicawesomeStargazeGlobalfeeV1TxAmino.AminoConverter
};
export const publicawesomeProtoRegistry: ReadonlyArray<[string, GeneratedType]> = [...publicawesomeStargazeAllocV1beta1TxRegistry.registry, ...publicawesomeStargazeCronV1TxRegistry.registry, ...publicawesomeStargazeGlobalfeeV1TxRegistry.registry];
export const getSigningPublicawesomeClientOptions = ({
  defaultTypes = defaultRegistryTypes
}: {
  defaultTypes?: ReadonlyArray<[string, GeneratedType]>;
} = {}): {
  registry: Registry;
  aminoTypes: AminoTypes;
} => {
  const registry = new Registry([...defaultTypes, ...publicawesomeProtoRegistry]);
  const aminoTypes = new AminoTypes({
    ...publicawesomeAminoConverters
  });
  return {
    registry,
    aminoTypes
  };
};
export const getSigningPublicawesomeClient = async ({
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
  } = getSigningPublicawesomeClientOptions({
    defaultTypes
  });
  const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, signer, {
    registry: (registry as any),
    aminoTypes
  });
  return client;
};