import { Coin, CoinAmino, CoinSDKType } from "../../../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../../../binary";
import { Decimal } from "@cosmjs/math";
export interface WeightedAddress {
  address: string;
  weight: string;
}
export interface WeightedAddressProtoMsg {
  typeUrl: "/publicawesome.stargaze.alloc.v1beta1.WeightedAddress";
  value: Uint8Array;
}
export interface WeightedAddressAmino {
  address: string;
  weight: string;
}
export interface WeightedAddressAminoMsg {
  type: "/publicawesome.stargaze.alloc.v1beta1.WeightedAddress";
  value: WeightedAddressAmino;
}
export interface WeightedAddressSDKType {
  address: string;
  weight: string;
}
export interface DistributionProportions {
  nftIncentives: string;
  developerRewards: string;
  communityPool: string;
}
export interface DistributionProportionsProtoMsg {
  typeUrl: "/publicawesome.stargaze.alloc.v1beta1.DistributionProportions";
  value: Uint8Array;
}
export interface DistributionProportionsAmino {
  nft_incentives: string;
  developer_rewards: string;
  community_pool: string;
}
export interface DistributionProportionsAminoMsg {
  type: "/publicawesome.stargaze.alloc.v1beta1.DistributionProportions";
  value: DistributionProportionsAmino;
}
export interface DistributionProportionsSDKType {
  nft_incentives: string;
  developer_rewards: string;
  community_pool: string;
}
export interface Params {
  /** distribution_proportions defines the proportion of the minted denom */
  distributionProportions: DistributionProportions | undefined;
  /** addresses to receive developer rewards */
  weightedDeveloperRewardsReceivers: WeightedAddress[];
  /** addresses to receive incentive rewards */
  weightedIncentivesRewardsReceivers: WeightedAddress[];
  /**
   * SupplementAmount is the amount to be supplemented from the pool on top of
   * newly minted coins.
   */
  supplementAmount: Coin[];
}
export interface ParamsProtoMsg {
  typeUrl: "/publicawesome.stargaze.alloc.v1beta1.Params";
  value: Uint8Array;
}
export interface ParamsAmino {
  /** distribution_proportions defines the proportion of the minted denom */
  distribution_proportions?: DistributionProportionsAmino | undefined;
  /** addresses to receive developer rewards */
  weighted_developer_rewards_receivers: WeightedAddressAmino[];
  /** addresses to receive incentive rewards */
  weighted_incentives_rewards_receivers: WeightedAddressAmino[];
  /**
   * SupplementAmount is the amount to be supplemented from the pool on top of
   * newly minted coins.
   */
  supplement_amount: CoinAmino[];
}
export interface ParamsAminoMsg {
  type: "/publicawesome.stargaze.alloc.v1beta1.Params";
  value: ParamsAmino;
}
export interface ParamsSDKType {
  distribution_proportions: DistributionProportionsSDKType | undefined;
  weighted_developer_rewards_receivers: WeightedAddressSDKType[];
  weighted_incentives_rewards_receivers: WeightedAddressSDKType[];
  supplement_amount: CoinSDKType[];
}
function createBaseWeightedAddress(): WeightedAddress {
  return {
    address: "",
    weight: ""
  };
}
export const WeightedAddress = {
  typeUrl: "/publicawesome.stargaze.alloc.v1beta1.WeightedAddress",
  encode(message: WeightedAddress, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.weight !== "") {
      writer.uint32(18).string(Decimal.fromUserInput(message.weight, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): WeightedAddress {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWeightedAddress();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.weight = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<WeightedAddress>): WeightedAddress {
    const message = createBaseWeightedAddress();
    message.address = object.address ?? "";
    message.weight = object.weight ?? "";
    return message;
  },
  fromAmino(object: WeightedAddressAmino): WeightedAddress {
    return {
      address: object.address,
      weight: object.weight
    };
  },
  toAmino(message: WeightedAddress): WeightedAddressAmino {
    const obj: any = {};
    obj.address = message.address;
    obj.weight = message.weight;
    return obj;
  },
  fromAminoMsg(object: WeightedAddressAminoMsg): WeightedAddress {
    return WeightedAddress.fromAmino(object.value);
  },
  fromProtoMsg(message: WeightedAddressProtoMsg): WeightedAddress {
    return WeightedAddress.decode(message.value);
  },
  toProto(message: WeightedAddress): Uint8Array {
    return WeightedAddress.encode(message).finish();
  },
  toProtoMsg(message: WeightedAddress): WeightedAddressProtoMsg {
    return {
      typeUrl: "/publicawesome.stargaze.alloc.v1beta1.WeightedAddress",
      value: WeightedAddress.encode(message).finish()
    };
  }
};
function createBaseDistributionProportions(): DistributionProportions {
  return {
    nftIncentives: "",
    developerRewards: "",
    communityPool: ""
  };
}
export const DistributionProportions = {
  typeUrl: "/publicawesome.stargaze.alloc.v1beta1.DistributionProportions",
  encode(message: DistributionProportions, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.nftIncentives !== "") {
      writer.uint32(10).string(Decimal.fromUserInput(message.nftIncentives, 18).atomics);
    }
    if (message.developerRewards !== "") {
      writer.uint32(18).string(Decimal.fromUserInput(message.developerRewards, 18).atomics);
    }
    if (message.communityPool !== "") {
      writer.uint32(26).string(Decimal.fromUserInput(message.communityPool, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): DistributionProportions {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDistributionProportions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nftIncentives = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 2:
          message.developerRewards = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 3:
          message.communityPool = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<DistributionProportions>): DistributionProportions {
    const message = createBaseDistributionProportions();
    message.nftIncentives = object.nftIncentives ?? "";
    message.developerRewards = object.developerRewards ?? "";
    message.communityPool = object.communityPool ?? "";
    return message;
  },
  fromAmino(object: DistributionProportionsAmino): DistributionProportions {
    return {
      nftIncentives: object.nft_incentives,
      developerRewards: object.developer_rewards,
      communityPool: object.community_pool
    };
  },
  toAmino(message: DistributionProportions): DistributionProportionsAmino {
    const obj: any = {};
    obj.nft_incentives = message.nftIncentives;
    obj.developer_rewards = message.developerRewards;
    obj.community_pool = message.communityPool;
    return obj;
  },
  fromAminoMsg(object: DistributionProportionsAminoMsg): DistributionProportions {
    return DistributionProportions.fromAmino(object.value);
  },
  fromProtoMsg(message: DistributionProportionsProtoMsg): DistributionProportions {
    return DistributionProportions.decode(message.value);
  },
  toProto(message: DistributionProportions): Uint8Array {
    return DistributionProportions.encode(message).finish();
  },
  toProtoMsg(message: DistributionProportions): DistributionProportionsProtoMsg {
    return {
      typeUrl: "/publicawesome.stargaze.alloc.v1beta1.DistributionProportions",
      value: DistributionProportions.encode(message).finish()
    };
  }
};
function createBaseParams(): Params {
  return {
    distributionProportions: DistributionProportions.fromPartial({}),
    weightedDeveloperRewardsReceivers: [],
    weightedIncentivesRewardsReceivers: [],
    supplementAmount: []
  };
}
export const Params = {
  typeUrl: "/publicawesome.stargaze.alloc.v1beta1.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.distributionProportions !== undefined) {
      DistributionProportions.encode(message.distributionProportions, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.weightedDeveloperRewardsReceivers) {
      WeightedAddress.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.weightedIncentivesRewardsReceivers) {
      WeightedAddress.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.supplementAmount) {
      Coin.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Params {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.distributionProportions = DistributionProportions.decode(reader, reader.uint32());
          break;
        case 2:
          message.weightedDeveloperRewardsReceivers.push(WeightedAddress.decode(reader, reader.uint32()));
          break;
        case 3:
          message.weightedIncentivesRewardsReceivers.push(WeightedAddress.decode(reader, reader.uint32()));
          break;
        case 4:
          message.supplementAmount.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Params>): Params {
    const message = createBaseParams();
    message.distributionProportions = object.distributionProportions !== undefined && object.distributionProportions !== null ? DistributionProportions.fromPartial(object.distributionProportions) : undefined;
    message.weightedDeveloperRewardsReceivers = object.weightedDeveloperRewardsReceivers?.map(e => WeightedAddress.fromPartial(e)) || [];
    message.weightedIncentivesRewardsReceivers = object.weightedIncentivesRewardsReceivers?.map(e => WeightedAddress.fromPartial(e)) || [];
    message.supplementAmount = object.supplementAmount?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    return {
      distributionProportions: object?.distribution_proportions ? DistributionProportions.fromAmino(object.distribution_proportions) : undefined,
      weightedDeveloperRewardsReceivers: Array.isArray(object?.weighted_developer_rewards_receivers) ? object.weighted_developer_rewards_receivers.map((e: any) => WeightedAddress.fromAmino(e)) : [],
      weightedIncentivesRewardsReceivers: Array.isArray(object?.weighted_incentives_rewards_receivers) ? object.weighted_incentives_rewards_receivers.map((e: any) => WeightedAddress.fromAmino(e)) : [],
      supplementAmount: Array.isArray(object?.supplement_amount) ? object.supplement_amount.map((e: any) => Coin.fromAmino(e)) : []
    };
  },
  toAmino(message: Params): ParamsAmino {
    const obj: any = {};
    obj.distribution_proportions = message.distributionProportions ? DistributionProportions.toAmino(message.distributionProportions) : undefined;
    if (message.weightedDeveloperRewardsReceivers) {
      obj.weighted_developer_rewards_receivers = message.weightedDeveloperRewardsReceivers.map(e => e ? WeightedAddress.toAmino(e) : undefined);
    } else {
      obj.weighted_developer_rewards_receivers = [];
    }
    if (message.weightedIncentivesRewardsReceivers) {
      obj.weighted_incentives_rewards_receivers = message.weightedIncentivesRewardsReceivers.map(e => e ? WeightedAddress.toAmino(e) : undefined);
    } else {
      obj.weighted_incentives_rewards_receivers = [];
    }
    if (message.supplementAmount) {
      obj.supplement_amount = message.supplementAmount.map(e => e ? Coin.toAmino(e) : undefined);
    } else {
      obj.supplement_amount = [];
    }
    return obj;
  },
  fromAminoMsg(object: ParamsAminoMsg): Params {
    return Params.fromAmino(object.value);
  },
  fromProtoMsg(message: ParamsProtoMsg): Params {
    return Params.decode(message.value);
  },
  toProto(message: Params): Uint8Array {
    return Params.encode(message).finish();
  },
  toProtoMsg(message: Params): ParamsProtoMsg {
    return {
      typeUrl: "/publicawesome.stargaze.alloc.v1beta1.Params",
      value: Params.encode(message).finish()
    };
  }
};