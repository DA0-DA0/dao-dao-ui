//@ts-nocheck
import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../../binary";
export interface UpdateFeesProposal {
  title: string;
  description: string;
  issueFee: Coin | undefined;
  mintFee: Coin | undefined;
  burnFee: Coin | undefined;
}
export interface UpdateFeesProposalProtoMsg {
  typeUrl: "/bitsong.fantoken.v1beta1.UpdateFeesProposal";
  value: Uint8Array;
}
export interface UpdateFeesProposalAmino {
  title?: string;
  description?: string;
  issue_fee?: CoinAmino | undefined;
  mint_fee?: CoinAmino | undefined;
  burn_fee?: CoinAmino | undefined;
}
export interface UpdateFeesProposalAminoMsg {
  type: "/bitsong.fantoken.v1beta1.UpdateFeesProposal";
  value: UpdateFeesProposalAmino;
}
export interface UpdateFeesProposalSDKType {
  title: string;
  description: string;
  issue_fee: CoinSDKType | undefined;
  mint_fee: CoinSDKType | undefined;
  burn_fee: CoinSDKType | undefined;
}
export interface UpdateFeesProposalWithDeposit {
  title: string;
  description: string;
  issueFee: string;
  mintFee: string;
  burnFee: string;
  deposit: string;
}
export interface UpdateFeesProposalWithDepositProtoMsg {
  typeUrl: "/bitsong.fantoken.v1beta1.UpdateFeesProposalWithDeposit";
  value: Uint8Array;
}
export interface UpdateFeesProposalWithDepositAmino {
  title?: string;
  description?: string;
  issue_fee?: string;
  mint_fee?: string;
  burn_fee?: string;
  deposit?: string;
}
export interface UpdateFeesProposalWithDepositAminoMsg {
  type: "/bitsong.fantoken.v1beta1.UpdateFeesProposalWithDeposit";
  value: UpdateFeesProposalWithDepositAmino;
}
export interface UpdateFeesProposalWithDepositSDKType {
  title: string;
  description: string;
  issue_fee: string;
  mint_fee: string;
  burn_fee: string;
  deposit: string;
}
function createBaseUpdateFeesProposal(): UpdateFeesProposal {
  return {
    title: "",
    description: "",
    issueFee: Coin.fromPartial({}),
    mintFee: Coin.fromPartial({}),
    burnFee: Coin.fromPartial({})
  };
}
export const UpdateFeesProposal = {
  typeUrl: "/bitsong.fantoken.v1beta1.UpdateFeesProposal",
  encode(message: UpdateFeesProposal, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.issueFee !== undefined) {
      Coin.encode(message.issueFee, writer.uint32(26).fork()).ldelim();
    }
    if (message.mintFee !== undefined) {
      Coin.encode(message.mintFee, writer.uint32(34).fork()).ldelim();
    }
    if (message.burnFee !== undefined) {
      Coin.encode(message.burnFee, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): UpdateFeesProposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateFeesProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.issueFee = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 4:
          message.mintFee = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 5:
          message.burnFee = Coin.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<UpdateFeesProposal>): UpdateFeesProposal {
    const message = createBaseUpdateFeesProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.issueFee = object.issueFee !== undefined && object.issueFee !== null ? Coin.fromPartial(object.issueFee) : undefined;
    message.mintFee = object.mintFee !== undefined && object.mintFee !== null ? Coin.fromPartial(object.mintFee) : undefined;
    message.burnFee = object.burnFee !== undefined && object.burnFee !== null ? Coin.fromPartial(object.burnFee) : undefined;
    return message;
  },
  fromAmino(object: UpdateFeesProposalAmino): UpdateFeesProposal {
    const message = createBaseUpdateFeesProposal();
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    }
    if (object.issue_fee !== undefined && object.issue_fee !== null) {
      message.issueFee = Coin.fromAmino(object.issue_fee);
    }
    if (object.mint_fee !== undefined && object.mint_fee !== null) {
      message.mintFee = Coin.fromAmino(object.mint_fee);
    }
    if (object.burn_fee !== undefined && object.burn_fee !== null) {
      message.burnFee = Coin.fromAmino(object.burn_fee);
    }
    return message;
  },
  toAmino(message: UpdateFeesProposal, useInterfaces: boolean = false): UpdateFeesProposalAmino {
    const obj: any = {};
    obj.title = message.title === "" ? undefined : message.title;
    obj.description = message.description === "" ? undefined : message.description;
    obj.issue_fee = message.issueFee ? Coin.toAmino(message.issueFee, useInterfaces) : undefined;
    obj.mint_fee = message.mintFee ? Coin.toAmino(message.mintFee, useInterfaces) : undefined;
    obj.burn_fee = message.burnFee ? Coin.toAmino(message.burnFee, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: UpdateFeesProposalAminoMsg): UpdateFeesProposal {
    return UpdateFeesProposal.fromAmino(object.value);
  },
  fromProtoMsg(message: UpdateFeesProposalProtoMsg, useInterfaces: boolean = false): UpdateFeesProposal {
    return UpdateFeesProposal.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: UpdateFeesProposal): Uint8Array {
    return UpdateFeesProposal.encode(message).finish();
  },
  toProtoMsg(message: UpdateFeesProposal): UpdateFeesProposalProtoMsg {
    return {
      typeUrl: "/bitsong.fantoken.v1beta1.UpdateFeesProposal",
      value: UpdateFeesProposal.encode(message).finish()
    };
  }
};
function createBaseUpdateFeesProposalWithDeposit(): UpdateFeesProposalWithDeposit {
  return {
    title: "",
    description: "",
    issueFee: "",
    mintFee: "",
    burnFee: "",
    deposit: ""
  };
}
export const UpdateFeesProposalWithDeposit = {
  typeUrl: "/bitsong.fantoken.v1beta1.UpdateFeesProposalWithDeposit",
  encode(message: UpdateFeesProposalWithDeposit, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.issueFee !== "") {
      writer.uint32(26).string(message.issueFee);
    }
    if (message.mintFee !== "") {
      writer.uint32(34).string(message.mintFee);
    }
    if (message.burnFee !== "") {
      writer.uint32(42).string(message.burnFee);
    }
    if (message.deposit !== "") {
      writer.uint32(58).string(message.deposit);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): UpdateFeesProposalWithDeposit {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateFeesProposalWithDeposit();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.issueFee = reader.string();
          break;
        case 4:
          message.mintFee = reader.string();
          break;
        case 5:
          message.burnFee = reader.string();
          break;
        case 7:
          message.deposit = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<UpdateFeesProposalWithDeposit>): UpdateFeesProposalWithDeposit {
    const message = createBaseUpdateFeesProposalWithDeposit();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.issueFee = object.issueFee ?? "";
    message.mintFee = object.mintFee ?? "";
    message.burnFee = object.burnFee ?? "";
    message.deposit = object.deposit ?? "";
    return message;
  },
  fromAmino(object: UpdateFeesProposalWithDepositAmino): UpdateFeesProposalWithDeposit {
    const message = createBaseUpdateFeesProposalWithDeposit();
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    }
    if (object.issue_fee !== undefined && object.issue_fee !== null) {
      message.issueFee = object.issue_fee;
    }
    if (object.mint_fee !== undefined && object.mint_fee !== null) {
      message.mintFee = object.mint_fee;
    }
    if (object.burn_fee !== undefined && object.burn_fee !== null) {
      message.burnFee = object.burn_fee;
    }
    if (object.deposit !== undefined && object.deposit !== null) {
      message.deposit = object.deposit;
    }
    return message;
  },
  toAmino(message: UpdateFeesProposalWithDeposit, useInterfaces: boolean = false): UpdateFeesProposalWithDepositAmino {
    const obj: any = {};
    obj.title = message.title === "" ? undefined : message.title;
    obj.description = message.description === "" ? undefined : message.description;
    obj.issue_fee = message.issueFee === "" ? undefined : message.issueFee;
    obj.mint_fee = message.mintFee === "" ? undefined : message.mintFee;
    obj.burn_fee = message.burnFee === "" ? undefined : message.burnFee;
    obj.deposit = message.deposit === "" ? undefined : message.deposit;
    return obj;
  },
  fromAminoMsg(object: UpdateFeesProposalWithDepositAminoMsg): UpdateFeesProposalWithDeposit {
    return UpdateFeesProposalWithDeposit.fromAmino(object.value);
  },
  fromProtoMsg(message: UpdateFeesProposalWithDepositProtoMsg, useInterfaces: boolean = false): UpdateFeesProposalWithDeposit {
    return UpdateFeesProposalWithDeposit.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: UpdateFeesProposalWithDeposit): Uint8Array {
    return UpdateFeesProposalWithDeposit.encode(message).finish();
  },
  toProtoMsg(message: UpdateFeesProposalWithDeposit): UpdateFeesProposalWithDepositProtoMsg {
    return {
      typeUrl: "/bitsong.fantoken.v1beta1.UpdateFeesProposalWithDeposit",
      value: UpdateFeesProposalWithDeposit.encode(message).finish()
    };
  }
};