import { GeneratedType, Registry, OfflineSigner } from "@cosmjs/proto-signing";
import { defaultRegistryTypes, AminoTypes, SigningStargateClient } from "@cosmjs/stargate";
import { HttpEndpoint } from "@cosmjs/tendermint-rpc";
import * as junoFeeshareV1TxRegistry from "./feeshare/v1/tx.registry";
import * as junoMintTxRegistry from "./mint/tx.registry";
import * as junoFeeshareV1TxAmino from "./feeshare/v1/tx.amino";
import * as junoMintTxAmino from "./mint/tx.amino";
export const junoAminoConverters = {
  ...junoFeeshareV1TxAmino.AminoConverter,
  ...junoMintTxAmino.AminoConverter
};
export const junoProtoRegistry: ReadonlyArray<[string, GeneratedType]> = [...junoFeeshareV1TxRegistry.registry, ...junoMintTxRegistry.registry];
export const getSigningJunoClientOptions = ({
  defaultTypes = defaultRegistryTypes
}: {
  defaultTypes?: ReadonlyArray<[string, GeneratedType]>;
} = {}): {
  registry: Registry;
  aminoTypes: AminoTypes;
} => {
  const registry = new Registry([...defaultTypes, ...junoProtoRegistry]);
  const aminoTypes = new AminoTypes({
    ...junoAminoConverters
  });
  return {
    registry,
    aminoTypes
  };
};
export const getSigningJunoClient = async ({
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
  } = getSigningJunoClientOptions({
    defaultTypes
  });
  const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, signer, {
    registry: (registry as any),
    aminoTypes
  });
  return client;
};