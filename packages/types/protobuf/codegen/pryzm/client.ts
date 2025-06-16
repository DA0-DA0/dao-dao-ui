import { GeneratedType, Registry, OfflineSigner } from "@cosmjs/proto-signing";
import { defaultRegistryTypes, AminoTypes, SigningStargateClient } from "@cosmjs/stargate";
import { HttpEndpoint } from "@cosmjs/tendermint-rpc";
import * as pryzmAmmV1TxRegistry from "./amm/v1/tx.registry";
import * as pryzmAmmV2TxRegistry from "./amm/v2/tx.registry";
import * as pryzmAssetsV1TxRegistry from "./assets/v1/tx.registry";
import * as pryzmIcstakingV1TxRegistry from "./icstaking/v1/tx.registry";
import * as pryzmIncentivesV1TxRegistry from "./incentives/v1/tx.registry";
import * as pryzmMintV1TxRegistry from "./mint/v1/tx.registry";
import * as pryzmPgovV1TxRegistry from "./pgov/v1/tx.registry";
import * as pryzmRefractorV1TxRegistry from "./refractor/v1/tx.registry";
import * as pryzmTreasuryV1TxRegistry from "./treasury/v1/tx.registry";
import * as pryzmYstakingV1TxRegistry from "./ystaking/v1/tx.registry";
import * as pryzmAmmV1TxAmino from "./amm/v1/tx.amino";
import * as pryzmAmmV2TxAmino from "./amm/v2/tx.amino";
import * as pryzmAssetsV1TxAmino from "./assets/v1/tx.amino";
import * as pryzmIcstakingV1TxAmino from "./icstaking/v1/tx.amino";
import * as pryzmIncentivesV1TxAmino from "./incentives/v1/tx.amino";
import * as pryzmMintV1TxAmino from "./mint/v1/tx.amino";
import * as pryzmPgovV1TxAmino from "./pgov/v1/tx.amino";
import * as pryzmRefractorV1TxAmino from "./refractor/v1/tx.amino";
import * as pryzmTreasuryV1TxAmino from "./treasury/v1/tx.amino";
import * as pryzmYstakingV1TxAmino from "./ystaking/v1/tx.amino";
export const pryzmAminoConverters = {
  ...pryzmAmmV1TxAmino.AminoConverter,
  ...pryzmAmmV2TxAmino.AminoConverter,
  ...pryzmAssetsV1TxAmino.AminoConverter,
  ...pryzmIcstakingV1TxAmino.AminoConverter,
  ...pryzmIncentivesV1TxAmino.AminoConverter,
  ...pryzmMintV1TxAmino.AminoConverter,
  ...pryzmPgovV1TxAmino.AminoConverter,
  ...pryzmRefractorV1TxAmino.AminoConverter,
  ...pryzmTreasuryV1TxAmino.AminoConverter,
  ...pryzmYstakingV1TxAmino.AminoConverter
};
export const pryzmProtoRegistry: ReadonlyArray<[string, GeneratedType]> = [...pryzmAmmV1TxRegistry.registry, ...pryzmAmmV2TxRegistry.registry, ...pryzmAssetsV1TxRegistry.registry, ...pryzmIcstakingV1TxRegistry.registry, ...pryzmIncentivesV1TxRegistry.registry, ...pryzmMintV1TxRegistry.registry, ...pryzmPgovV1TxRegistry.registry, ...pryzmRefractorV1TxRegistry.registry, ...pryzmTreasuryV1TxRegistry.registry, ...pryzmYstakingV1TxRegistry.registry];
export const getSigningPryzmClientOptions = ({
  defaultTypes = defaultRegistryTypes
}: {
  defaultTypes?: ReadonlyArray<[string, GeneratedType]>;
} = {}): {
  registry: Registry;
  aminoTypes: AminoTypes;
} => {
  const registry = new Registry([...defaultTypes, ...pryzmProtoRegistry]);
  const aminoTypes = new AminoTypes({
    ...pryzmAminoConverters
  });
  return {
    registry,
    aminoTypes
  };
};
export const getSigningPryzmClient = async ({
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
  } = getSigningPryzmClientOptions({
    defaultTypes
  });
  const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, signer, {
    registry: (registry as any),
    aminoTypes
  });
  return client;
};