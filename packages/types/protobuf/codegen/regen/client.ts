import { GeneratedType, Registry, OfflineSigner } from "@cosmjs/proto-signing";
import { defaultRegistryTypes, AminoTypes, SigningStargateClient } from "@cosmjs/stargate";
import { HttpEndpoint } from "@cosmjs/tendermint-rpc";
import * as regenDataV1TxRegistry from "./data/v1/tx.registry";
import * as regenDataV2TxRegistry from "./data/v2/tx.registry";
import * as regenEcocreditBasketV1TxRegistry from "./ecocredit/basket/v1/tx.registry";
import * as regenEcocreditMarketplaceV1TxRegistry from "./ecocredit/marketplace/v1/tx.registry";
import * as regenEcocreditV1TxRegistry from "./ecocredit/v1/tx.registry";
import * as regenEcocreditV1alpha1TxRegistry from "./ecocredit/v1alpha1/tx.registry";
import * as regenIntertxV1TxRegistry from "./intertx/v1/tx.registry";
import * as regenDataV1TxAmino from "./data/v1/tx.amino";
import * as regenDataV2TxAmino from "./data/v2/tx.amino";
import * as regenEcocreditBasketV1TxAmino from "./ecocredit/basket/v1/tx.amino";
import * as regenEcocreditMarketplaceV1TxAmino from "./ecocredit/marketplace/v1/tx.amino";
import * as regenEcocreditV1TxAmino from "./ecocredit/v1/tx.amino";
import * as regenEcocreditV1alpha1TxAmino from "./ecocredit/v1alpha1/tx.amino";
import * as regenIntertxV1TxAmino from "./intertx/v1/tx.amino";
export const regenAminoConverters = {
  ...regenDataV1TxAmino.AminoConverter,
  ...regenDataV2TxAmino.AminoConverter,
  ...regenEcocreditBasketV1TxAmino.AminoConverter,
  ...regenEcocreditMarketplaceV1TxAmino.AminoConverter,
  ...regenEcocreditV1TxAmino.AminoConverter,
  ...regenEcocreditV1alpha1TxAmino.AminoConverter,
  ...regenIntertxV1TxAmino.AminoConverter
};
export const regenProtoRegistry: ReadonlyArray<[string, GeneratedType]> = [...regenDataV1TxRegistry.registry, ...regenDataV2TxRegistry.registry, ...regenEcocreditBasketV1TxRegistry.registry, ...regenEcocreditMarketplaceV1TxRegistry.registry, ...regenEcocreditV1TxRegistry.registry, ...regenEcocreditV1alpha1TxRegistry.registry, ...regenIntertxV1TxRegistry.registry];
export const getSigningRegenClientOptions = ({
  defaultTypes = defaultRegistryTypes
}: {
  defaultTypes?: ReadonlyArray<[string, GeneratedType]>;
} = {}): {
  registry: Registry;
  aminoTypes: AminoTypes;
} => {
  const registry = new Registry([...defaultTypes, ...regenProtoRegistry]);
  const aminoTypes = new AminoTypes({
    ...regenAminoConverters
  });
  return {
    registry,
    aminoTypes
  };
};
export const getSigningRegenClient = async ({
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
  } = getSigningRegenClientOptions({
    defaultTypes
  });
  const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, signer, {
    registry: (registry as any),
    aminoTypes
  });
  return client;
};