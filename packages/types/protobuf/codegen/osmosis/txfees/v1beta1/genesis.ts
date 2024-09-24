//@ts-nocheck
import { FeeToken, FeeTokenAmino, FeeTokenSDKType } from "./feetoken";
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../../binary";
/** GenesisState defines the txfees module's genesis state. */
export interface GenesisState {
  basedenom: string;
  feetokens: FeeToken[];
  /** DEPRECATED */
  /** @deprecated */
  txFeesTracker?: TxFeesTracker | undefined;
  /** params is the container of txfees parameters. */
  params: Params | undefined;
}
export interface GenesisStateProtoMsg {
  typeUrl: "/osmosis.txfees.v1beta1.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the txfees module's genesis state. */
export interface GenesisStateAmino {
  basedenom?: string;
  feetokens?: FeeTokenAmino[];
  /** DEPRECATED */
  /** @deprecated */
  txFeesTracker?: TxFeesTrackerAmino | undefined;
  /** params is the container of txfees parameters. */
  params?: ParamsAmino | undefined;
}
export interface GenesisStateAminoMsg {
  type: "osmosis/txfees/genesis-state";
  value: GenesisStateAmino;
}
/** GenesisState defines the txfees module's genesis state. */
export interface GenesisStateSDKType {
  basedenom: string;
  feetokens: FeeTokenSDKType[];
  /** @deprecated */
  txFeesTracker?: TxFeesTrackerSDKType | undefined;
  params: ParamsSDKType | undefined;
}
export interface TxFeesTracker {
  txFees: Coin[];
  heightAccountingStartsFrom: bigint;
}
export interface TxFeesTrackerProtoMsg {
  typeUrl: "/osmosis.txfees.v1beta1.TxFeesTracker";
  value: Uint8Array;
}
export interface TxFeesTrackerAmino {
  tx_fees?: CoinAmino[];
  height_accounting_starts_from?: string;
}
export interface TxFeesTrackerAminoMsg {
  type: "osmosis/txfees/tx-fees-tracker";
  value: TxFeesTrackerAmino;
}
export interface TxFeesTrackerSDKType {
  tx_fees: CoinSDKType[];
  height_accounting_starts_from: bigint;
}
function createBaseGenesisState(): GenesisState {
  return {
    basedenom: "",
    feetokens: [],
    txFeesTracker: undefined,
    params: Params.fromPartial({})
  };
}
export const GenesisState = {
  typeUrl: "/osmosis.txfees.v1beta1.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.basedenom !== "") {
      writer.uint32(10).string(message.basedenom);
    }
    for (const v of message.feetokens) {
      FeeToken.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.txFeesTracker !== undefined) {
      TxFeesTracker.encode(message.txFeesTracker, writer.uint32(26).fork()).ldelim();
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(34).fork()).ldelim();
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
          message.basedenom = reader.string();
          break;
        case 2:
          message.feetokens.push(FeeToken.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 3:
          message.txFeesTracker = TxFeesTracker.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 4:
          message.params = Params.decode(reader, reader.uint32(), useInterfaces);
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
    message.basedenom = object.basedenom ?? "";
    message.feetokens = object.feetokens?.map(e => FeeToken.fromPartial(e)) || [];
    message.txFeesTracker = object.txFeesTracker !== undefined && object.txFeesTracker !== null ? TxFeesTracker.fromPartial(object.txFeesTracker) : undefined;
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    if (object.basedenom !== undefined && object.basedenom !== null) {
      message.basedenom = object.basedenom;
    }
    message.feetokens = object.feetokens?.map(e => FeeToken.fromAmino(e)) || [];
    if (object.txFeesTracker !== undefined && object.txFeesTracker !== null) {
      message.txFeesTracker = TxFeesTracker.fromAmino(object.txFeesTracker);
    }
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: GenesisState, useInterfaces: boolean = false): GenesisStateAmino {
    const obj: any = {};
    obj.basedenom = message.basedenom === "" ? undefined : message.basedenom;
    if (message.feetokens) {
      obj.feetokens = message.feetokens.map(e => e ? FeeToken.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.feetokens = message.feetokens;
    }
    obj.txFeesTracker = message.txFeesTracker ? TxFeesTracker.toAmino(message.txFeesTracker, useInterfaces) : undefined;
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: GenesisStateAminoMsg): GenesisState {
    return GenesisState.fromAmino(object.value);
  },
  toAminoMsg(message: GenesisState, useInterfaces: boolean = false): GenesisStateAminoMsg {
    return {
      type: "osmosis/txfees/genesis-state",
      value: GenesisState.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: GenesisStateProtoMsg, useInterfaces: boolean = false): GenesisState {
    return GenesisState.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: GenesisState): Uint8Array {
    return GenesisState.encode(message).finish();
  },
  toProtoMsg(message: GenesisState): GenesisStateProtoMsg {
    return {
      typeUrl: "/osmosis.txfees.v1beta1.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};
function createBaseTxFeesTracker(): TxFeesTracker {
  return {
    txFees: [],
    heightAccountingStartsFrom: BigInt(0)
  };
}
export const TxFeesTracker = {
  typeUrl: "/osmosis.txfees.v1beta1.TxFeesTracker",
  encode(message: TxFeesTracker, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.txFees) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.heightAccountingStartsFrom !== BigInt(0)) {
      writer.uint32(16).int64(message.heightAccountingStartsFrom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): TxFeesTracker {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTxFeesTracker();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.txFees.push(Coin.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
          message.heightAccountingStartsFrom = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<TxFeesTracker>): TxFeesTracker {
    const message = createBaseTxFeesTracker();
    message.txFees = object.txFees?.map(e => Coin.fromPartial(e)) || [];
    message.heightAccountingStartsFrom = object.heightAccountingStartsFrom !== undefined && object.heightAccountingStartsFrom !== null ? BigInt(object.heightAccountingStartsFrom.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: TxFeesTrackerAmino): TxFeesTracker {
    const message = createBaseTxFeesTracker();
    message.txFees = object.tx_fees?.map(e => Coin.fromAmino(e)) || [];
    if (object.height_accounting_starts_from !== undefined && object.height_accounting_starts_from !== null) {
      message.heightAccountingStartsFrom = BigInt(object.height_accounting_starts_from);
    }
    return message;
  },
  toAmino(message: TxFeesTracker, useInterfaces: boolean = false): TxFeesTrackerAmino {
    const obj: any = {};
    if (message.txFees) {
      obj.tx_fees = message.txFees.map(e => e ? Coin.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.tx_fees = message.txFees;
    }
    obj.height_accounting_starts_from = message.heightAccountingStartsFrom !== BigInt(0) ? message.heightAccountingStartsFrom.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: TxFeesTrackerAminoMsg): TxFeesTracker {
    return TxFeesTracker.fromAmino(object.value);
  },
  toAminoMsg(message: TxFeesTracker, useInterfaces: boolean = false): TxFeesTrackerAminoMsg {
    return {
      type: "osmosis/txfees/tx-fees-tracker",
      value: TxFeesTracker.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: TxFeesTrackerProtoMsg, useInterfaces: boolean = false): TxFeesTracker {
    return TxFeesTracker.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: TxFeesTracker): Uint8Array {
    return TxFeesTracker.encode(message).finish();
  },
  toProtoMsg(message: TxFeesTracker): TxFeesTrackerProtoMsg {
    return {
      typeUrl: "/osmosis.txfees.v1beta1.TxFeesTracker",
      value: TxFeesTracker.encode(message).finish()
    };
  }
};