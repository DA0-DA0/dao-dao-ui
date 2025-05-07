//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType } from "./params";
import { Debt, DebtAmino, DebtSDKType } from "./debt";
import { InterestBlock, InterestBlockAmino, InterestBlockSDKType } from "./types";
import { Pool, PoolAmino, PoolSDKType, AmmPool, AmmPoolAmino, AmmPoolSDKType } from "./pool";
import { BinaryReader, BinaryWriter } from "../../binary";
/** GenesisState defines the stablestake module's genesis state. */
export interface GenesisState {
  params: Params | undefined;
  debtList: Debt[];
  interestList: InterestBlock[];
  pools: Pool[];
  ammPools: AmmPool[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/elys.stablestake.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the stablestake module's genesis state. */
export interface GenesisStateAmino {
  params?: ParamsAmino | undefined;
  debt_list?: DebtAmino[];
  interest_list?: InterestBlockAmino[];
  pools?: PoolAmino[];
  amm_pools?: AmmPoolAmino[];
}
export interface GenesisStateAminoMsg {
  type: "/elys.stablestake.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the stablestake module's genesis state. */
export interface GenesisStateSDKType {
  params: ParamsSDKType | undefined;
  debt_list: DebtSDKType[];
  interest_list: InterestBlockSDKType[];
  pools: PoolSDKType[];
  amm_pools: AmmPoolSDKType[];
}
function createBaseGenesisState(): GenesisState {
  return {
    params: Params.fromPartial({}),
    debtList: [],
    interestList: [],
    pools: [],
    ammPools: []
  };
}
export const GenesisState = {
  typeUrl: "/elys.stablestake.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.debtList) {
      Debt.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.interestList) {
      InterestBlock.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.pools) {
      Pool.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.ammPools) {
      AmmPool.encode(v!, writer.uint32(42).fork()).ldelim();
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
          message.debtList.push(Debt.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 3:
          message.interestList.push(InterestBlock.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 4:
          message.pools.push(Pool.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 5:
          message.ammPools.push(AmmPool.decode(reader, reader.uint32(), useInterfaces));
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
    message.debtList = object.debtList?.map(e => Debt.fromPartial(e)) || [];
    message.interestList = object.interestList?.map(e => InterestBlock.fromPartial(e)) || [];
    message.pools = object.pools?.map(e => Pool.fromPartial(e)) || [];
    message.ammPools = object.ammPools?.map(e => AmmPool.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    const message = createBaseGenesisState();
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    message.debtList = object.debt_list?.map(e => Debt.fromAmino(e)) || [];
    message.interestList = object.interest_list?.map(e => InterestBlock.fromAmino(e)) || [];
    message.pools = object.pools?.map(e => Pool.fromAmino(e)) || [];
    message.ammPools = object.amm_pools?.map(e => AmmPool.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: GenesisState, useInterfaces: boolean = false): GenesisStateAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params, useInterfaces) : undefined;
    if (message.debtList) {
      obj.debt_list = message.debtList.map(e => e ? Debt.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.debt_list = message.debtList;
    }
    if (message.interestList) {
      obj.interest_list = message.interestList.map(e => e ? InterestBlock.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.interest_list = message.interestList;
    }
    if (message.pools) {
      obj.pools = message.pools.map(e => e ? Pool.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.pools = message.pools;
    }
    if (message.ammPools) {
      obj.amm_pools = message.ammPools.map(e => e ? AmmPool.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.amm_pools = message.ammPools;
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
      typeUrl: "/elys.stablestake.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};