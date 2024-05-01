import { GeneratedType, Registry, OfflineSigner } from "@cosmjs/proto-signing";
import { defaultRegistryTypes, AminoTypes, SigningStargateClient } from "@cosmjs/stargate";
import { HttpEndpoint } from "@cosmjs/tendermint-rpc";
import * as pstakeLiquidstakeV1beta1TxRegistry from "./liquidstake/v1beta1/tx.registry";
import * as pstakeLiquidstakeibcV1beta1MsgsRegistry from "./liquidstakeibc/v1beta1/msgs.registry";
import * as pstakeLscosmosV1beta1MsgsRegistry from "./lscosmos/v1beta1/msgs.registry";
import * as pstakeRatesyncV1beta1TxRegistry from "./ratesync/v1beta1/tx.registry";
import * as pstakeLiquidstakeV1beta1TxAmino from "./liquidstake/v1beta1/tx.amino";
import * as pstakeLiquidstakeibcV1beta1MsgsAmino from "./liquidstakeibc/v1beta1/msgs.amino";
import * as pstakeLscosmosV1beta1MsgsAmino from "./lscosmos/v1beta1/msgs.amino";
import * as pstakeRatesyncV1beta1TxAmino from "./ratesync/v1beta1/tx.amino";
export const pstakeAminoConverters = {
  ...pstakeLiquidstakeV1beta1TxAmino.AminoConverter,
  ...pstakeLiquidstakeibcV1beta1MsgsAmino.AminoConverter,
  ...pstakeLscosmosV1beta1MsgsAmino.AminoConverter,
  ...pstakeRatesyncV1beta1TxAmino.AminoConverter
};
export const pstakeProtoRegistry: ReadonlyArray<[string, GeneratedType]> = [...pstakeLiquidstakeV1beta1TxRegistry.registry, ...pstakeLiquidstakeibcV1beta1MsgsRegistry.registry, ...pstakeLscosmosV1beta1MsgsRegistry.registry, ...pstakeRatesyncV1beta1TxRegistry.registry];
export const getSigningPstakeClientOptions = ({
  defaultTypes = defaultRegistryTypes
}: {
  defaultTypes?: ReadonlyArray<[string, GeneratedType]>;
} = {}): {
  registry: Registry;
  aminoTypes: AminoTypes;
} => {
  const registry = new Registry([...defaultTypes, ...pstakeProtoRegistry]);
  const aminoTypes = new AminoTypes({
    ...pstakeAminoConverters
  });
  return {
    registry,
    aminoTypes
  };
};
export const getSigningPstakeClient = async ({
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
  } = getSigningPstakeClientOptions({
    defaultTypes
  });
  const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, signer, {
    registry: (registry as any),
    aminoTypes
  });
  return client;
};