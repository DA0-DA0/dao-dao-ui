import { BinaryReader, BinaryWriter } from "../../../binary";
/**
 * FeeShare defines an instance that organizes fee distribution conditions for
 * the owner of a given smart contract
 */
export interface FeeShare {
  /**
   * contract_address is the bech32 address of a registered contract in string
   * form
   */
  contractAddress: string;
  /**
   * deployer_address is the bech32 address of message sender. It must be the
   * same as the contracts admin address.
   */
  deployerAddress: string;
  /**
   * withdrawer_address is the bech32 address of account receiving the
   * transaction fees.
   */
  withdrawerAddress: string;
}
export interface FeeShareProtoMsg {
  typeUrl: "/juno.feeshare.v1.FeeShare";
  value: Uint8Array;
}
/**
 * FeeShare defines an instance that organizes fee distribution conditions for
 * the owner of a given smart contract
 */
export interface FeeShareAmino {
  /**
   * contract_address is the bech32 address of a registered contract in string
   * form
   */
  contract_address?: string;
  /**
   * deployer_address is the bech32 address of message sender. It must be the
   * same as the contracts admin address.
   */
  deployer_address?: string;
  /**
   * withdrawer_address is the bech32 address of account receiving the
   * transaction fees.
   */
  withdrawer_address?: string;
}
export interface FeeShareAminoMsg {
  type: "/juno.feeshare.v1.FeeShare";
  value: FeeShareAmino;
}
/**
 * FeeShare defines an instance that organizes fee distribution conditions for
 * the owner of a given smart contract
 */
export interface FeeShareSDKType {
  contract_address: string;
  deployer_address: string;
  withdrawer_address: string;
}
function createBaseFeeShare(): FeeShare {
  return {
    contractAddress: "",
    deployerAddress: "",
    withdrawerAddress: ""
  };
}
export const FeeShare = {
  typeUrl: "/juno.feeshare.v1.FeeShare",
  encode(message: FeeShare, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.contractAddress !== "") {
      writer.uint32(10).string(message.contractAddress);
    }
    if (message.deployerAddress !== "") {
      writer.uint32(18).string(message.deployerAddress);
    }
    if (message.withdrawerAddress !== "") {
      writer.uint32(26).string(message.withdrawerAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): FeeShare {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFeeShare();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.contractAddress = reader.string();
          break;
        case 2:
          message.deployerAddress = reader.string();
          break;
        case 3:
          message.withdrawerAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<FeeShare>): FeeShare {
    const message = createBaseFeeShare();
    message.contractAddress = object.contractAddress ?? "";
    message.deployerAddress = object.deployerAddress ?? "";
    message.withdrawerAddress = object.withdrawerAddress ?? "";
    return message;
  },
  fromAmino(object: FeeShareAmino): FeeShare {
    const message = createBaseFeeShare();
    if (object.contract_address !== undefined && object.contract_address !== null) {
      message.contractAddress = object.contract_address;
    }
    if (object.deployer_address !== undefined && object.deployer_address !== null) {
      message.deployerAddress = object.deployer_address;
    }
    if (object.withdrawer_address !== undefined && object.withdrawer_address !== null) {
      message.withdrawerAddress = object.withdrawer_address;
    }
    return message;
  },
  toAmino(message: FeeShare, useInterfaces: boolean = false): FeeShareAmino {
    const obj: any = {};
    obj.contract_address = message.contractAddress === "" ? undefined : message.contractAddress;
    obj.deployer_address = message.deployerAddress === "" ? undefined : message.deployerAddress;
    obj.withdrawer_address = message.withdrawerAddress === "" ? undefined : message.withdrawerAddress;
    return obj;
  },
  fromAminoMsg(object: FeeShareAminoMsg): FeeShare {
    return FeeShare.fromAmino(object.value);
  },
  fromProtoMsg(message: FeeShareProtoMsg, useInterfaces: boolean = false): FeeShare {
    return FeeShare.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: FeeShare): Uint8Array {
    return FeeShare.encode(message).finish();
  },
  toProtoMsg(message: FeeShare): FeeShareProtoMsg {
    return {
      typeUrl: "/juno.feeshare.v1.FeeShare",
      value: FeeShare.encode(message).finish()
    };
  }
};