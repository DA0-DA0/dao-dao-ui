import { BinaryReader, BinaryWriter } from "../../../binary";
import { Decimal } from "@cosmjs/math";
/** msg blob for instantiate contract. */
export interface InstantiateLiquidStakeRateContract {
  admin: string;
  transferChannelID: string;
  transferPortID: string;
}
export interface InstantiateLiquidStakeRateContractProtoMsg {
  typeUrl: "/pstake.ratesync.v1beta1.InstantiateLiquidStakeRateContract";
  value: Uint8Array;
}
/** msg blob for instantiate contract. */
export interface InstantiateLiquidStakeRateContractAmino {
  admin?: string;
  transfer_channel_i_d?: string;
  transfer_port_i_d?: string;
}
export interface InstantiateLiquidStakeRateContractAminoMsg {
  type: "/pstake.ratesync.v1beta1.InstantiateLiquidStakeRateContract";
  value: InstantiateLiquidStakeRateContractAmino;
}
/** msg blob for instantiate contract. */
export interface InstantiateLiquidStakeRateContractSDKType {
  admin: string;
  transfer_channel_i_d: string;
  transfer_port_i_d: string;
}
/**
 * wrapper for liquidstakerate as wasm msg should be marshalled as encodedMsg =
 * { wasmMsg: { wasm MsgDetails } }
 */
export interface ExecuteLiquidStakeRate {
  liquidStakeRate: LiquidStakeRate | undefined;
}
export interface ExecuteLiquidStakeRateProtoMsg {
  typeUrl: "/pstake.ratesync.v1beta1.ExecuteLiquidStakeRate";
  value: Uint8Array;
}
/**
 * wrapper for liquidstakerate as wasm msg should be marshalled as encodedMsg =
 * { wasmMsg: { wasm MsgDetails } }
 */
export interface ExecuteLiquidStakeRateAmino {
  liquid_stake_rate?: LiquidStakeRateAmino | undefined;
}
export interface ExecuteLiquidStakeRateAminoMsg {
  type: "/pstake.ratesync.v1beta1.ExecuteLiquidStakeRate";
  value: ExecuteLiquidStakeRateAmino;
}
/**
 * wrapper for liquidstakerate as wasm msg should be marshalled as encodedMsg =
 * { wasmMsg: { wasm MsgDetails } }
 */
export interface ExecuteLiquidStakeRateSDKType {
  liquid_stake_rate: LiquidStakeRateSDKType | undefined;
}
/** msg blob for execute contract. */
export interface LiquidStakeRate {
  defaultBondDenom: string;
  stkDenom: string;
  /**
   * cvalue = default_bond_denom_price/stk_denom_price
   * cvalue = stk_denom_supply/default_bond_denom_supply
   */
  cValue: string;
  controllerChainTime: bigint;
}
export interface LiquidStakeRateProtoMsg {
  typeUrl: "/pstake.ratesync.v1beta1.LiquidStakeRate";
  value: Uint8Array;
}
/** msg blob for execute contract. */
export interface LiquidStakeRateAmino {
  default_bond_denom?: string;
  stk_denom?: string;
  /**
   * cvalue = default_bond_denom_price/stk_denom_price
   * cvalue = stk_denom_supply/default_bond_denom_supply
   */
  c_value?: string;
  controller_chain_time?: string;
}
export interface LiquidStakeRateAminoMsg {
  type: "/pstake.ratesync.v1beta1.LiquidStakeRate";
  value: LiquidStakeRateAmino;
}
/** msg blob for execute contract. */
export interface LiquidStakeRateSDKType {
  default_bond_denom: string;
  stk_denom: string;
  c_value: string;
  controller_chain_time: bigint;
}
function createBaseInstantiateLiquidStakeRateContract(): InstantiateLiquidStakeRateContract {
  return {
    admin: "",
    transferChannelID: "",
    transferPortID: ""
  };
}
export const InstantiateLiquidStakeRateContract = {
  typeUrl: "/pstake.ratesync.v1beta1.InstantiateLiquidStakeRateContract",
  encode(message: InstantiateLiquidStakeRateContract, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.admin !== "") {
      writer.uint32(10).string(message.admin);
    }
    if (message.transferChannelID !== "") {
      writer.uint32(18).string(message.transferChannelID);
    }
    if (message.transferPortID !== "") {
      writer.uint32(26).string(message.transferPortID);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): InstantiateLiquidStakeRateContract {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInstantiateLiquidStakeRateContract();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.admin = reader.string();
          break;
        case 2:
          message.transferChannelID = reader.string();
          break;
        case 3:
          message.transferPortID = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<InstantiateLiquidStakeRateContract>): InstantiateLiquidStakeRateContract {
    const message = createBaseInstantiateLiquidStakeRateContract();
    message.admin = object.admin ?? "";
    message.transferChannelID = object.transferChannelID ?? "";
    message.transferPortID = object.transferPortID ?? "";
    return message;
  },
  fromAmino(object: InstantiateLiquidStakeRateContractAmino): InstantiateLiquidStakeRateContract {
    const message = createBaseInstantiateLiquidStakeRateContract();
    if (object.admin !== undefined && object.admin !== null) {
      message.admin = object.admin;
    }
    if (object.transfer_channel_i_d !== undefined && object.transfer_channel_i_d !== null) {
      message.transferChannelID = object.transfer_channel_i_d;
    }
    if (object.transfer_port_i_d !== undefined && object.transfer_port_i_d !== null) {
      message.transferPortID = object.transfer_port_i_d;
    }
    return message;
  },
  toAmino(message: InstantiateLiquidStakeRateContract, useInterfaces: boolean = false): InstantiateLiquidStakeRateContractAmino {
    const obj: any = {};
    obj.admin = message.admin === "" ? undefined : message.admin;
    obj.transfer_channel_i_d = message.transferChannelID === "" ? undefined : message.transferChannelID;
    obj.transfer_port_i_d = message.transferPortID === "" ? undefined : message.transferPortID;
    return obj;
  },
  fromAminoMsg(object: InstantiateLiquidStakeRateContractAminoMsg): InstantiateLiquidStakeRateContract {
    return InstantiateLiquidStakeRateContract.fromAmino(object.value);
  },
  fromProtoMsg(message: InstantiateLiquidStakeRateContractProtoMsg, useInterfaces: boolean = false): InstantiateLiquidStakeRateContract {
    return InstantiateLiquidStakeRateContract.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: InstantiateLiquidStakeRateContract): Uint8Array {
    return InstantiateLiquidStakeRateContract.encode(message).finish();
  },
  toProtoMsg(message: InstantiateLiquidStakeRateContract): InstantiateLiquidStakeRateContractProtoMsg {
    return {
      typeUrl: "/pstake.ratesync.v1beta1.InstantiateLiquidStakeRateContract",
      value: InstantiateLiquidStakeRateContract.encode(message).finish()
    };
  }
};
function createBaseExecuteLiquidStakeRate(): ExecuteLiquidStakeRate {
  return {
    liquidStakeRate: LiquidStakeRate.fromPartial({})
  };
}
export const ExecuteLiquidStakeRate = {
  typeUrl: "/pstake.ratesync.v1beta1.ExecuteLiquidStakeRate",
  encode(message: ExecuteLiquidStakeRate, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.liquidStakeRate !== undefined) {
      LiquidStakeRate.encode(message.liquidStakeRate, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ExecuteLiquidStakeRate {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExecuteLiquidStakeRate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.liquidStakeRate = LiquidStakeRate.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ExecuteLiquidStakeRate>): ExecuteLiquidStakeRate {
    const message = createBaseExecuteLiquidStakeRate();
    message.liquidStakeRate = object.liquidStakeRate !== undefined && object.liquidStakeRate !== null ? LiquidStakeRate.fromPartial(object.liquidStakeRate) : undefined;
    return message;
  },
  fromAmino(object: ExecuteLiquidStakeRateAmino): ExecuteLiquidStakeRate {
    const message = createBaseExecuteLiquidStakeRate();
    if (object.liquid_stake_rate !== undefined && object.liquid_stake_rate !== null) {
      message.liquidStakeRate = LiquidStakeRate.fromAmino(object.liquid_stake_rate);
    }
    return message;
  },
  toAmino(message: ExecuteLiquidStakeRate, useInterfaces: boolean = false): ExecuteLiquidStakeRateAmino {
    const obj: any = {};
    obj.liquid_stake_rate = message.liquidStakeRate ? LiquidStakeRate.toAmino(message.liquidStakeRate, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: ExecuteLiquidStakeRateAminoMsg): ExecuteLiquidStakeRate {
    return ExecuteLiquidStakeRate.fromAmino(object.value);
  },
  fromProtoMsg(message: ExecuteLiquidStakeRateProtoMsg, useInterfaces: boolean = false): ExecuteLiquidStakeRate {
    return ExecuteLiquidStakeRate.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ExecuteLiquidStakeRate): Uint8Array {
    return ExecuteLiquidStakeRate.encode(message).finish();
  },
  toProtoMsg(message: ExecuteLiquidStakeRate): ExecuteLiquidStakeRateProtoMsg {
    return {
      typeUrl: "/pstake.ratesync.v1beta1.ExecuteLiquidStakeRate",
      value: ExecuteLiquidStakeRate.encode(message).finish()
    };
  }
};
function createBaseLiquidStakeRate(): LiquidStakeRate {
  return {
    defaultBondDenom: "",
    stkDenom: "",
    cValue: "",
    controllerChainTime: BigInt(0)
  };
}
export const LiquidStakeRate = {
  typeUrl: "/pstake.ratesync.v1beta1.LiquidStakeRate",
  encode(message: LiquidStakeRate, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.defaultBondDenom !== "") {
      writer.uint32(10).string(message.defaultBondDenom);
    }
    if (message.stkDenom !== "") {
      writer.uint32(18).string(message.stkDenom);
    }
    if (message.cValue !== "") {
      writer.uint32(26).string(Decimal.fromUserInput(message.cValue, 18).atomics);
    }
    if (message.controllerChainTime !== BigInt(0)) {
      writer.uint32(32).int64(message.controllerChainTime);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): LiquidStakeRate {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLiquidStakeRate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.defaultBondDenom = reader.string();
          break;
        case 2:
          message.stkDenom = reader.string();
          break;
        case 3:
          message.cValue = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 4:
          message.controllerChainTime = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<LiquidStakeRate>): LiquidStakeRate {
    const message = createBaseLiquidStakeRate();
    message.defaultBondDenom = object.defaultBondDenom ?? "";
    message.stkDenom = object.stkDenom ?? "";
    message.cValue = object.cValue ?? "";
    message.controllerChainTime = object.controllerChainTime !== undefined && object.controllerChainTime !== null ? BigInt(object.controllerChainTime.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: LiquidStakeRateAmino): LiquidStakeRate {
    const message = createBaseLiquidStakeRate();
    if (object.default_bond_denom !== undefined && object.default_bond_denom !== null) {
      message.defaultBondDenom = object.default_bond_denom;
    }
    if (object.stk_denom !== undefined && object.stk_denom !== null) {
      message.stkDenom = object.stk_denom;
    }
    if (object.c_value !== undefined && object.c_value !== null) {
      message.cValue = object.c_value;
    }
    if (object.controller_chain_time !== undefined && object.controller_chain_time !== null) {
      message.controllerChainTime = BigInt(object.controller_chain_time);
    }
    return message;
  },
  toAmino(message: LiquidStakeRate, useInterfaces: boolean = false): LiquidStakeRateAmino {
    const obj: any = {};
    obj.default_bond_denom = message.defaultBondDenom === "" ? undefined : message.defaultBondDenom;
    obj.stk_denom = message.stkDenom === "" ? undefined : message.stkDenom;
    obj.c_value = message.cValue === "" ? undefined : message.cValue;
    obj.controller_chain_time = message.controllerChainTime !== BigInt(0) ? message.controllerChainTime.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: LiquidStakeRateAminoMsg): LiquidStakeRate {
    return LiquidStakeRate.fromAmino(object.value);
  },
  fromProtoMsg(message: LiquidStakeRateProtoMsg, useInterfaces: boolean = false): LiquidStakeRate {
    return LiquidStakeRate.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: LiquidStakeRate): Uint8Array {
    return LiquidStakeRate.encode(message).finish();
  },
  toProtoMsg(message: LiquidStakeRate): LiquidStakeRateProtoMsg {
    return {
      typeUrl: "/pstake.ratesync.v1beta1.LiquidStakeRate",
      value: LiquidStakeRate.encode(message).finish()
    };
  }
};