import { Duration, DurationAmino, DurationSDKType } from "../../../google/protobuf/duration";
import { Timestamp } from "../../../google/protobuf/timestamp";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { Decimal } from "@cosmjs/math";
import { toTimestamp, fromTimestamp } from "../../../helpers";
/** FeeType enumerates the valid types for feeType. */
export enum ActionType {
  ACTION_TYPE_HOLD = 0,
  ACTION_TYPE_BURN = 1,
  ACTION_TYPE_DISTRIBUTE_TO_STAKERS = 2,
  ACTION_TYPE_DISTRIBUTE_TO_COMMUNITY_POOL = 3,
  UNRECOGNIZED = -1,
}
export const ActionTypeSDKType = ActionType;
export const ActionTypeAmino = ActionType;
export function actionTypeFromJSON(object: any): ActionType {
  switch (object) {
    case 0:
    case "ACTION_TYPE_HOLD":
      return ActionType.ACTION_TYPE_HOLD;
    case 1:
    case "ACTION_TYPE_BURN":
      return ActionType.ACTION_TYPE_BURN;
    case 2:
    case "ACTION_TYPE_DISTRIBUTE_TO_STAKERS":
      return ActionType.ACTION_TYPE_DISTRIBUTE_TO_STAKERS;
    case 3:
    case "ACTION_TYPE_DISTRIBUTE_TO_COMMUNITY_POOL":
      return ActionType.ACTION_TYPE_DISTRIBUTE_TO_COMMUNITY_POOL;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ActionType.UNRECOGNIZED;
  }
}
export function actionTypeToJSON(object: ActionType): string {
  switch (object) {
    case ActionType.ACTION_TYPE_HOLD:
      return "ACTION_TYPE_HOLD";
    case ActionType.ACTION_TYPE_BURN:
      return "ACTION_TYPE_BURN";
    case ActionType.ACTION_TYPE_DISTRIBUTE_TO_STAKERS:
      return "ACTION_TYPE_DISTRIBUTE_TO_STAKERS";
    case ActionType.ACTION_TYPE_DISTRIBUTE_TO_COMMUNITY_POOL:
      return "ACTION_TYPE_DISTRIBUTE_TO_COMMUNITY_POOL";
    case ActionType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
export interface ActionFlowTradeSettings {
  /**
   * given the occurrence of an action, this is used to compute the start of the flow
   * NOTE: the flowtrade library has a parameter for minimum start delay
   */
  startDelay: Duration | undefined;
  /** given the start of the flow, this is used to compute the end of the flow */
  duration: Duration | undefined;
  /**
   * the interval in which the distribution index is updated and hence tokens are swapped
   * if dist_interval is 0, the flow is updated every time in or out tokens are increased or decreased
   * if dist_interval is equal to the duration of flow, it means that all of the tokens are swapped once after the flow ends
   */
  distInterval: Duration | undefined;
  /**
   * the minimum price for the token-out in terms of token-in.
   * in each swap interval, if the calculated price is less than this limit, the swap doesn't happen in that turn
   */
  limitPrice: string;
  /**
   * the duration of the exit window before swap interval, in which users can only exit the flow and joining is not permitted
   * this duration is used to protect joiners from buying the token-out with a higher price when someone joins with a huge amount of token-in
   */
  exitWindowDuration: Duration | undefined;
}
export interface ActionFlowTradeSettingsProtoMsg {
  typeUrl: "/pryzm.treasury.v1.ActionFlowTradeSettings";
  value: Uint8Array;
}
export interface ActionFlowTradeSettingsAmino {
  /**
   * given the occurrence of an action, this is used to compute the start of the flow
   * NOTE: the flowtrade library has a parameter for minimum start delay
   */
  start_delay: DurationAmino | undefined;
  /** given the start of the flow, this is used to compute the end of the flow */
  duration: DurationAmino | undefined;
  /**
   * the interval in which the distribution index is updated and hence tokens are swapped
   * if dist_interval is 0, the flow is updated every time in or out tokens are increased or decreased
   * if dist_interval is equal to the duration of flow, it means that all of the tokens are swapped once after the flow ends
   */
  dist_interval: DurationAmino | undefined;
  /**
   * the minimum price for the token-out in terms of token-in.
   * in each swap interval, if the calculated price is less than this limit, the swap doesn't happen in that turn
   */
  limit_price?: string;
  /**
   * the duration of the exit window before swap interval, in which users can only exit the flow and joining is not permitted
   * this duration is used to protect joiners from buying the token-out with a higher price when someone joins with a huge amount of token-in
   */
  exit_window_duration: DurationAmino | undefined;
}
export interface ActionFlowTradeSettingsAminoMsg {
  type: "/pryzm.treasury.v1.ActionFlowTradeSettings";
  value: ActionFlowTradeSettingsAmino;
}
export interface ActionFlowTradeSettingsSDKType {
  start_delay: DurationSDKType | undefined;
  duration: DurationSDKType | undefined;
  dist_interval: DurationSDKType | undefined;
  limit_price: string;
  exit_window_duration: DurationSDKType | undefined;
}
export interface Action {
  actionType: ActionType;
  occurrence?: Date | undefined;
  /** if expiration is not set, then the action will never expire and is executed forever unless gov decides to set another action. */
  expiration?: Date | undefined;
  /** if period is nil, then the action is only executed at the first occurrence and then replaced with a HOLD/NOOP action. */
  period?: Duration | undefined;
  /** this is nil if the action is of type HOLD */
  flowTradeSettings?: ActionFlowTradeSettings | undefined;
  /** denoms in this list will not be affected by the action */
  excludedDenoms: string[];
}
export interface ActionProtoMsg {
  typeUrl: "/pryzm.treasury.v1.Action";
  value: Uint8Array;
}
export interface ActionAmino {
  action_type: ActionType;
  occurrence?: string | undefined;
  /** if expiration is not set, then the action will never expire and is executed forever unless gov decides to set another action. */
  expiration?: string | undefined;
  /** if period is nil, then the action is only executed at the first occurrence and then replaced with a HOLD/NOOP action. */
  period?: DurationAmino | undefined;
  /** this is nil if the action is of type HOLD */
  flow_trade_settings?: ActionFlowTradeSettingsAmino | undefined;
  /** denoms in this list will not be affected by the action */
  excluded_denoms: string[];
}
export interface ActionAminoMsg {
  type: "/pryzm.treasury.v1.Action";
  value: ActionAmino;
}
export interface ActionSDKType {
  action_type: ActionType;
  occurrence?: Date | undefined;
  expiration?: Date | undefined;
  period?: DurationSDKType | undefined;
  flow_trade_settings?: ActionFlowTradeSettingsSDKType | undefined;
  excluded_denoms: string[];
}
function createBaseActionFlowTradeSettings(): ActionFlowTradeSettings {
  return {
    startDelay: Duration.fromPartial({}),
    duration: Duration.fromPartial({}),
    distInterval: Duration.fromPartial({}),
    limitPrice: "",
    exitWindowDuration: Duration.fromPartial({})
  };
}
export const ActionFlowTradeSettings = {
  typeUrl: "/pryzm.treasury.v1.ActionFlowTradeSettings",
  encode(message: ActionFlowTradeSettings, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.startDelay !== undefined) {
      Duration.encode(message.startDelay, writer.uint32(10).fork()).ldelim();
    }
    if (message.duration !== undefined) {
      Duration.encode(message.duration, writer.uint32(18).fork()).ldelim();
    }
    if (message.distInterval !== undefined) {
      Duration.encode(message.distInterval, writer.uint32(26).fork()).ldelim();
    }
    if (message.limitPrice !== "") {
      writer.uint32(34).string(Decimal.fromUserInput(message.limitPrice, 18).atomics);
    }
    if (message.exitWindowDuration !== undefined) {
      Duration.encode(message.exitWindowDuration, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ActionFlowTradeSettings {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActionFlowTradeSettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.startDelay = Duration.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.duration = Duration.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.distInterval = Duration.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 4:
          message.limitPrice = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 5:
          message.exitWindowDuration = Duration.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ActionFlowTradeSettings>): ActionFlowTradeSettings {
    const message = createBaseActionFlowTradeSettings();
    message.startDelay = object.startDelay !== undefined && object.startDelay !== null ? Duration.fromPartial(object.startDelay) : undefined;
    message.duration = object.duration !== undefined && object.duration !== null ? Duration.fromPartial(object.duration) : undefined;
    message.distInterval = object.distInterval !== undefined && object.distInterval !== null ? Duration.fromPartial(object.distInterval) : undefined;
    message.limitPrice = object.limitPrice ?? "";
    message.exitWindowDuration = object.exitWindowDuration !== undefined && object.exitWindowDuration !== null ? Duration.fromPartial(object.exitWindowDuration) : undefined;
    return message;
  },
  fromAmino(object: ActionFlowTradeSettingsAmino): ActionFlowTradeSettings {
    const message = createBaseActionFlowTradeSettings();
    if (object.start_delay !== undefined && object.start_delay !== null) {
      message.startDelay = Duration.fromAmino(object.start_delay);
    }
    if (object.duration !== undefined && object.duration !== null) {
      message.duration = Duration.fromAmino(object.duration);
    }
    if (object.dist_interval !== undefined && object.dist_interval !== null) {
      message.distInterval = Duration.fromAmino(object.dist_interval);
    }
    if (object.limit_price !== undefined && object.limit_price !== null) {
      message.limitPrice = object.limit_price;
    }
    if (object.exit_window_duration !== undefined && object.exit_window_duration !== null) {
      message.exitWindowDuration = Duration.fromAmino(object.exit_window_duration);
    }
    return message;
  },
  toAmino(message: ActionFlowTradeSettings, useInterfaces: boolean = false): ActionFlowTradeSettingsAmino {
    const obj: any = {};
    obj.start_delay = message.startDelay ? Duration.toAmino(message.startDelay, useInterfaces) : Duration.toAmino(Duration.fromPartial({}));
    obj.duration = message.duration ? Duration.toAmino(message.duration, useInterfaces) : Duration.toAmino(Duration.fromPartial({}));
    obj.dist_interval = message.distInterval ? Duration.toAmino(message.distInterval, useInterfaces) : Duration.toAmino(Duration.fromPartial({}));
    obj.limit_price = message.limitPrice === "" ? undefined : message.limitPrice;
    obj.exit_window_duration = message.exitWindowDuration ? Duration.toAmino(message.exitWindowDuration, useInterfaces) : Duration.toAmino(Duration.fromPartial({}));
    return obj;
  },
  fromAminoMsg(object: ActionFlowTradeSettingsAminoMsg): ActionFlowTradeSettings {
    return ActionFlowTradeSettings.fromAmino(object.value);
  },
  fromProtoMsg(message: ActionFlowTradeSettingsProtoMsg, useInterfaces: boolean = false): ActionFlowTradeSettings {
    return ActionFlowTradeSettings.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ActionFlowTradeSettings): Uint8Array {
    return ActionFlowTradeSettings.encode(message).finish();
  },
  toProtoMsg(message: ActionFlowTradeSettings): ActionFlowTradeSettingsProtoMsg {
    return {
      typeUrl: "/pryzm.treasury.v1.ActionFlowTradeSettings",
      value: ActionFlowTradeSettings.encode(message).finish()
    };
  }
};
function createBaseAction(): Action {
  return {
    actionType: 0,
    occurrence: undefined,
    expiration: undefined,
    period: undefined,
    flowTradeSettings: undefined,
    excludedDenoms: []
  };
}
export const Action = {
  typeUrl: "/pryzm.treasury.v1.Action",
  encode(message: Action, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.actionType !== 0) {
      writer.uint32(8).int32(message.actionType);
    }
    if (message.occurrence !== undefined) {
      Timestamp.encode(toTimestamp(message.occurrence), writer.uint32(18).fork()).ldelim();
    }
    if (message.expiration !== undefined) {
      Timestamp.encode(toTimestamp(message.expiration), writer.uint32(26).fork()).ldelim();
    }
    if (message.period !== undefined) {
      Duration.encode(message.period, writer.uint32(34).fork()).ldelim();
    }
    if (message.flowTradeSettings !== undefined) {
      ActionFlowTradeSettings.encode(message.flowTradeSettings, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.excludedDenoms) {
      writer.uint32(50).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): Action {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.actionType = (reader.int32() as any);
          break;
        case 2:
          message.occurrence = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 3:
          message.expiration = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 4:
          message.period = Duration.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 5:
          message.flowTradeSettings = ActionFlowTradeSettings.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 6:
          message.excludedDenoms.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Action>): Action {
    const message = createBaseAction();
    message.actionType = object.actionType ?? 0;
    message.occurrence = object.occurrence ?? undefined;
    message.expiration = object.expiration ?? undefined;
    message.period = object.period !== undefined && object.period !== null ? Duration.fromPartial(object.period) : undefined;
    message.flowTradeSettings = object.flowTradeSettings !== undefined && object.flowTradeSettings !== null ? ActionFlowTradeSettings.fromPartial(object.flowTradeSettings) : undefined;
    message.excludedDenoms = object.excludedDenoms?.map(e => e) || [];
    return message;
  },
  fromAmino(object: ActionAmino): Action {
    const message = createBaseAction();
    if (object.action_type !== undefined && object.action_type !== null) {
      message.actionType = object.action_type;
    }
    if (object.occurrence !== undefined && object.occurrence !== null) {
      message.occurrence = fromTimestamp(Timestamp.fromAmino(object.occurrence));
    }
    if (object.expiration !== undefined && object.expiration !== null) {
      message.expiration = fromTimestamp(Timestamp.fromAmino(object.expiration));
    }
    if (object.period !== undefined && object.period !== null) {
      message.period = Duration.fromAmino(object.period);
    }
    if (object.flow_trade_settings !== undefined && object.flow_trade_settings !== null) {
      message.flowTradeSettings = ActionFlowTradeSettings.fromAmino(object.flow_trade_settings);
    }
    message.excludedDenoms = object.excluded_denoms?.map(e => e) || [];
    return message;
  },
  toAmino(message: Action, useInterfaces: boolean = false): ActionAmino {
    const obj: any = {};
    obj.action_type = message.actionType ?? 0;
    obj.occurrence = message.occurrence ? Timestamp.toAmino(toTimestamp(message.occurrence)) : undefined;
    obj.expiration = message.expiration ? Timestamp.toAmino(toTimestamp(message.expiration)) : undefined;
    obj.period = message.period ? Duration.toAmino(message.period, useInterfaces) : undefined;
    obj.flow_trade_settings = message.flowTradeSettings ? ActionFlowTradeSettings.toAmino(message.flowTradeSettings, useInterfaces) : undefined;
    if (message.excludedDenoms) {
      obj.excluded_denoms = message.excludedDenoms.map(e => e);
    } else {
      obj.excluded_denoms = message.excludedDenoms;
    }
    return obj;
  },
  fromAminoMsg(object: ActionAminoMsg): Action {
    return Action.fromAmino(object.value);
  },
  fromProtoMsg(message: ActionProtoMsg, useInterfaces: boolean = false): Action {
    return Action.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Action): Uint8Array {
    return Action.encode(message).finish();
  },
  toProtoMsg(message: Action): ActionProtoMsg {
    return {
      typeUrl: "/pryzm.treasury.v1.Action",
      value: Action.encode(message).finish()
    };
  }
};