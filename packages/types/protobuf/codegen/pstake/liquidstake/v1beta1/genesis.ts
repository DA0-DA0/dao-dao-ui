//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType, LiquidValidator, LiquidValidatorAmino, LiquidValidatorSDKType } from "./liquidstake";
import { BinaryReader, BinaryWriter } from "../../../binary";
/** GenesisState defines the liquidstake module's genesis state. */
export interface GenesisState {
  /** params defines all the parameters for the liquidstake module */
  params: Params | undefined;
  liquidValidators: LiquidValidator[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/pstake.liquidstake.v1beta1.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the liquidstake module's genesis state. */
export interface GenesisStateAmino {
  /** params defines all the parameters for the liquidstake module */
  params?: ParamsAmino | undefined;
  liquid_validators?: LiquidValidatorAmino[];
}
export interface GenesisStateAminoMsg {
  type: "/pstake.liquidstake.v1beta1.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the liquidstake module's genesis state. */
export interface GenesisStateSDKType {
  params: ParamsSDKType | undefined;
  liquid_validators: LiquidValidatorSDKType[];
}
function createBaseGenesisState(): GenesisState {
  return {
    params: Params.fromPartial({}),
    liquidValidators: []
  };
}
export const GenesisState = {
  typeUrl: "/pstake.liquidstake.v1beta1.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.liquidValidators) {
      LiquidValidator.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): GenesisState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.liquidValidators.push(LiquidValidator.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<GenesisState>): GenesisState {
    const message = createBaseGenesisState();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    message.liquidValidators = object.liquidValidators?.map(e => LiquidValidator.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    message.liquidValidators = object.liquid_validators?.map(e => LiquidValidator.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: GenesisState, useInterfaces: boolean = false): GenesisStateAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
    if (message.liquidValidators) {
      obj.liquid_validators = message.liquidValidators.map(e => e ? LiquidValidator.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.liquid_validators = message.liquidValidators;
    }
    return obj;
  },
  fromAminoMsg(object: GenesisStateAminoMsg): GenesisState {
    return GenesisState.fromAmino(object.value);
  },
  fromProtoMsg(message: GenesisStateProtoMsg, useInterfaces: boolean = false): GenesisState {
    return GenesisState.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: GenesisState): Uint8Array {
    return GenesisState.encode(message).finish();
  },
  toProtoMsg(message: GenesisState): GenesisStateProtoMsg {
    return {
      typeUrl: "/pstake.liquidstake.v1beta1.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};