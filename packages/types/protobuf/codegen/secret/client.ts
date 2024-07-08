import { GeneratedType, Registry, OfflineSigner } from "@cosmjs/proto-signing";
import { defaultRegistryTypes, AminoTypes, SigningStargateClient } from "@cosmjs/stargate";
import { HttpEndpoint } from "@cosmjs/tendermint-rpc";
import * as secretComputeV1beta1MsgRegistry from "./compute/v1beta1/msg.registry";
import * as secretEmergencybuttonV1beta1TxRegistry from "./emergencybutton/v1beta1/tx.registry";
import * as secretIntertxV1beta1TxRegistry from "./intertx/v1beta1/tx.registry";
import * as secretComputeV1beta1MsgAmino from "./compute/v1beta1/msg.amino";
import * as secretEmergencybuttonV1beta1TxAmino from "./emergencybutton/v1beta1/tx.amino";
import * as secretIntertxV1beta1TxAmino from "./intertx/v1beta1/tx.amino";
export const secretAminoConverters = {
  ...secretComputeV1beta1MsgAmino.AminoConverter,
  ...secretEmergencybuttonV1beta1TxAmino.AminoConverter,
  ...secretIntertxV1beta1TxAmino.AminoConverter
};
export const secretProtoRegistry: ReadonlyArray<[string, GeneratedType]> = [...secretComputeV1beta1MsgRegistry.registry, ...secretEmergencybuttonV1beta1TxRegistry.registry, ...secretIntertxV1beta1TxRegistry.registry];
export const getSigningSecretClientOptions = ({
  defaultTypes = defaultRegistryTypes
}: {
  defaultTypes?: ReadonlyArray<[string, GeneratedType]>;
} = {}): {
  registry: Registry;
  aminoTypes: AminoTypes;
} => {
  const registry = new Registry([...defaultTypes, ...secretProtoRegistry]);
  const aminoTypes = new AminoTypes({
    ...secretAminoConverters
  });
  return {
    registry,
    aminoTypes
  };
};
export const getSigningSecretClient = async ({
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
  } = getSigningSecretClientOptions({
    defaultTypes
  });
  const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, signer, {
    registry: (registry as any),
    aminoTypes
  });
  return client;
};