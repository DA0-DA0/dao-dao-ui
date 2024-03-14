import { GeneratedType, Registry, OfflineSigner } from "@cosmjs/proto-signing";
import { defaultRegistryTypes, AminoTypes, SigningStargateClient } from "@cosmjs/stargate";
import { HttpEndpoint } from "@cosmjs/tendermint-rpc";
import * as neutronCronTxRegistry from "./cron/tx.registry";
import * as neutronDexTxRegistry from "./dex/tx.registry";
import * as neutronFeeburnerTxRegistry from "./feeburner/tx.registry";
import * as neutronFeerefunderTxRegistry from "./feerefunder/tx.registry";
import * as neutronInterchainqueriesTxRegistry from "./interchainqueries/tx.registry";
import * as neutronInterchaintxsV1TxRegistry from "./interchaintxs/v1/tx.registry";
import * as neutronTransferV1TxRegistry from "./transfer/v1/tx.registry";
import * as neutronCronTxAmino from "./cron/tx.amino";
import * as neutronDexTxAmino from "./dex/tx.amino";
import * as neutronFeeburnerTxAmino from "./feeburner/tx.amino";
import * as neutronFeerefunderTxAmino from "./feerefunder/tx.amino";
import * as neutronInterchainqueriesTxAmino from "./interchainqueries/tx.amino";
import * as neutronInterchaintxsV1TxAmino from "./interchaintxs/v1/tx.amino";
import * as neutronTransferV1TxAmino from "./transfer/v1/tx.amino";
export const neutronAminoConverters = {
  ...neutronCronTxAmino.AminoConverter,
  ...neutronDexTxAmino.AminoConverter,
  ...neutronFeeburnerTxAmino.AminoConverter,
  ...neutronFeerefunderTxAmino.AminoConverter,
  ...neutronInterchainqueriesTxAmino.AminoConverter,
  ...neutronInterchaintxsV1TxAmino.AminoConverter,
  ...neutronTransferV1TxAmino.AminoConverter,
};
export const neutronProtoRegistry: ReadonlyArray<[string, GeneratedType]> = [...neutronCronTxRegistry.registry, ...neutronDexTxRegistry.registry, ...neutronFeeburnerTxRegistry.registry, ...neutronFeerefunderTxRegistry.registry, ...neutronInterchainqueriesTxRegistry.registry, ...neutronInterchaintxsV1TxRegistry.registry, ...neutronTransferV1TxRegistry.registry];
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