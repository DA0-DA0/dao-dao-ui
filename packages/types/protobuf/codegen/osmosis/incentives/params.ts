import { Coin, CoinAmino, CoinSDKType } from "../../cosmos/base/v1beta1/coin";
import { Duration, DurationAmino, DurationSDKType } from "../../google/protobuf/duration";
import { BinaryReader, BinaryWriter } from "../../binary";
/** Params holds parameters for the incentives module */
export interface Params {
  /**
   * distr_epoch_identifier is what epoch type distribution will be triggered by
   * (day, week, etc.)
   */
  distrEpochIdentifier: string;
  /**
   * group_creation_fee is the fee required to create a new group
   * It is only charged to all addresses other than incentive module account
   * or addresses in the unrestricted_creator_whitelist
   */
  groupCreationFee: Coin[];
  /**
   * unrestricted_creator_whitelist is a list of addresses that are
   * allowed to bypass restrictions on permissionless Group
   * creation. In the future, we might expand these to creating gauges
   * as well.
   * The goal of this is to allow a subdao to manage incentives efficiently
   * without being stopped by 5 day governance process or a high fee.
   * At the same time, it prevents spam by having a fee for all
   * other users.
   */
  unrestrictedCreatorWhitelist: string[];
  /**
   * internal_uptime is the uptime used for internal incentives on pools that
   * use NoLock gauges (currently only Concentrated Liquidity pools).
   * 
   * Since Group gauges route through internal gauges, this parameter affects
   * the uptime of those incentives as well (i.e. distributions through volume
   * splitting incentives will use this uptime).
   */
  internalUptime: Duration | undefined;
  /**
   * min_value_for_distribution is the minimum amount a token must be worth
   * in order to be eligible for distribution. If the token is worth
   * less than this amount (or the route between the two denoms is not
   * registered), it will not be distributed and is forfeited to the remaining
   * distributees that are eligible.
   */
  minValueForDistribution: Coin | undefined;
}
export interface ParamsProtoMsg {
  typeUrl: "/osmosis.incentives.Params";
  value: Uint8Array;
}
/** Params holds parameters for the incentives module */
export interface ParamsAmino {
  /**
   * distr_epoch_identifier is what epoch type distribution will be triggered by
   * (day, week, etc.)
   */
  distr_epoch_identifier?: string;
  /**
   * group_creation_fee is the fee required to create a new group
   * It is only charged to all addresses other than incentive module account
   * or addresses in the unrestricted_creator_whitelist
   */
  group_creation_fee?: CoinAmino[];
  /**
   * unrestricted_creator_whitelist is a list of addresses that are
   * allowed to bypass restrictions on permissionless Group
   * creation. In the future, we might expand these to creating gauges
   * as well.
   * The goal of this is to allow a subdao to manage incentives efficiently
   * without being stopped by 5 day governance process or a high fee.
   * At the same time, it prevents spam by having a fee for all
   * other users.
   */
  unrestricted_creator_whitelist?: string[];
  /**
   * internal_uptime is the uptime used for internal incentives on pools that
   * use NoLock gauges (currently only Concentrated Liquidity pools).
   * 
   * Since Group gauges route through internal gauges, this parameter affects
   * the uptime of those incentives as well (i.e. distributions through volume
   * splitting incentives will use this uptime).
   */
  internal_uptime?: DurationAmino | undefined;
  /**
   * min_value_for_distribution is the minimum amount a token must be worth
   * in order to be eligible for distribution. If the token is worth
   * less than this amount (or the route between the two denoms is not
   * registered), it will not be distributed and is forfeited to the remaining
   * distributees that are eligible.
   */
  min_value_for_distribution?: CoinAmino | undefined;
}
export interface ParamsAminoMsg {
  type: "osmosis/incentives/params";
  value: ParamsAmino;
}
/** Params holds parameters for the incentives module */
export interface ParamsSDKType {
  distr_epoch_identifier: string;
  group_creation_fee: CoinSDKType[];
  unrestricted_creator_whitelist: string[];
  internal_uptime: DurationSDKType | undefined;
  min_value_for_distribution: CoinSDKType | undefined;
}
function createBaseParams(): Params {
  return {
    distrEpochIdentifier: "",
    groupCreationFee: [],
    unrestrictedCreatorWhitelist: [],
    internalUptime: Duration.fromPartial({}),
    minValueForDistribution: Coin.fromPartial({})
  };
}
export const Params = {
  typeUrl: "/osmosis.incentives.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.distrEpochIdentifier !== "") {
      writer.uint32(10).string(message.distrEpochIdentifier);
    }
    for (const v of message.groupCreationFee) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.unrestrictedCreatorWhitelist) {
      writer.uint32(26).string(v!);
    }
    if (message.internalUptime !== undefined) {
      Duration.encode(message.internalUptime, writer.uint32(34).fork()).ldelim();
    }
    if (message.minValueForDistribution !== undefined) {
      Coin.encode(message.minValueForDistribution, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): Params {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.distrEpochIdentifier = reader.string();
          break;
        case 2:
          message.groupCreationFee.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 3:
          message.unrestrictedCreatorWhitelist.push(reader.string());
          break;
        case 4:
          message.internalUptime = Duration.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 5:
          message.minValueForDistribution = Coin.decode(reader, reader.uint32(), useInterfaces);
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
    message.distrEpochIdentifier = object.distrEpochIdentifier ?? "";
    message.groupCreationFee = object.groupCreationFee?.map(e => Coin.fromPartial(e)) || [];
    message.unrestrictedCreatorWhitelist = object.unrestrictedCreatorWhitelist?.map(e => e) || [];
    message.internalUptime = object.internalUptime !== undefined && object.internalUptime !== null ? Duration.fromPartial(object.internalUptime) : undefined;
    message.minValueForDistribution = object.minValueForDistribution !== undefined && object.minValueForDistribution !== null ? Coin.fromPartial(object.minValueForDistribution) : undefined;
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    const message = createBaseParams();
    if (object.distr_epoch_identifier !== undefined && object.distr_epoch_identifier !== null) {
      message.distrEpochIdentifier = object.distr_epoch_identifier;
    }
    message.groupCreationFee = object.group_creation_fee?.map(e => Coin.fromAmino(e)) || [];
    message.unrestrictedCreatorWhitelist = object.unrestricted_creator_whitelist?.map(e => e) || [];
    if (object.internal_uptime !== undefined && object.internal_uptime !== null) {
      message.internalUptime = Duration.fromAmino(object.internal_uptime);
    }
    if (object.min_value_for_distribution !== undefined && object.min_value_for_distribution !== null) {
      message.minValueForDistribution = Coin.fromAmino(object.min_value_for_distribution);
    }
    return message;
  },
  toAmino(message: Params, useInterfaces: boolean = false): ParamsAmino {
    const obj: any = {};
    obj.distr_epoch_identifier = message.distrEpochIdentifier === "" ? undefined : message.distrEpochIdentifier;
    if (message.groupCreationFee) {
      obj.group_creation_fee = message.groupCreationFee.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.group_creation_fee = message.groupCreationFee;
    }
    if (message.unrestrictedCreatorWhitelist) {
      obj.unrestricted_creator_whitelist = message.unrestrictedCreatorWhitelist.map(e => e);
    } else {
      obj.unrestricted_creator_whitelist = message.unrestrictedCreatorWhitelist;
    }
    obj.internal_uptime = message.internalUptime ? Duration.toAmino(message.internalUptime, useInterfaces) : undefined;
    obj.min_value_for_distribution = message.minValueForDistribution ? Coin.toAmino(message.minValueForDistribution, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: ParamsAminoMsg): Params {
    return Params.fromAmino(object.value);
  },
  toAminoMsg(message: Params, useInterfaces: boolean = false): ParamsAminoMsg {
    return {
      type: "osmosis/incentives/params",
      value: Params.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: ParamsProtoMsg, useInterfaces: boolean = false): Params {
    return Params.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Params): Uint8Array {
    return Params.encode(message).finish();
  },
  toProtoMsg(message: Params): ParamsProtoMsg {
    return {
      typeUrl: "/osmosis.incentives.Params",
      value: Params.encode(message).finish()
    };
  }
};