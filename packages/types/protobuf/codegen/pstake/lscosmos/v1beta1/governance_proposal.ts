import { AllowListedValidators, AllowListedValidatorsAmino, AllowListedValidatorsSDKType } from "./lscosmos";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { Decimal } from "@cosmjs/math";
/** @deprecated */
export interface MinDepositAndFeeChangeProposal {
  title: string;
  description: string;
  minDeposit: string;
  pstakeDepositFee: string;
  pstakeRestakeFee: string;
  pstakeUnstakeFee: string;
  pstakeRedemptionFee: string;
}
export interface MinDepositAndFeeChangeProposalProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.MinDepositAndFeeChangeProposal";
  value: Uint8Array;
}
/** @deprecated */
export interface MinDepositAndFeeChangeProposalAmino {
  title?: string;
  description?: string;
  min_deposit?: string;
  pstake_deposit_fee?: string;
  pstake_restake_fee?: string;
  pstake_unstake_fee?: string;
  pstake_redemption_fee?: string;
}
export interface MinDepositAndFeeChangeProposalAminoMsg {
  type: "/pstake.lscosmos.v1beta1.MinDepositAndFeeChangeProposal";
  value: MinDepositAndFeeChangeProposalAmino;
}
/** @deprecated */
export interface MinDepositAndFeeChangeProposalSDKType {
  title: string;
  description: string;
  min_deposit: string;
  pstake_deposit_fee: string;
  pstake_restake_fee: string;
  pstake_unstake_fee: string;
  pstake_redemption_fee: string;
}
/** @deprecated */
export interface PstakeFeeAddressChangeProposal {
  title: string;
  description: string;
  pstakeFeeAddress: string;
}
export interface PstakeFeeAddressChangeProposalProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.PstakeFeeAddressChangeProposal";
  value: Uint8Array;
}
/** @deprecated */
export interface PstakeFeeAddressChangeProposalAmino {
  title?: string;
  description?: string;
  pstake_fee_address?: string;
}
export interface PstakeFeeAddressChangeProposalAminoMsg {
  type: "/pstake.lscosmos.v1beta1.PstakeFeeAddressChangeProposal";
  value: PstakeFeeAddressChangeProposalAmino;
}
/** @deprecated */
export interface PstakeFeeAddressChangeProposalSDKType {
  title: string;
  description: string;
  pstake_fee_address: string;
}
/** @deprecated */
export interface AllowListedValidatorSetChangeProposal {
  title: string;
  description: string;
  allowListedValidators: AllowListedValidators | undefined;
}
export interface AllowListedValidatorSetChangeProposalProtoMsg {
  typeUrl: "/pstake.lscosmos.v1beta1.AllowListedValidatorSetChangeProposal";
  value: Uint8Array;
}
/** @deprecated */
export interface AllowListedValidatorSetChangeProposalAmino {
  title?: string;
  description?: string;
  allow_listed_validators?: AllowListedValidatorsAmino | undefined;
}
export interface AllowListedValidatorSetChangeProposalAminoMsg {
  type: "/pstake.lscosmos.v1beta1.AllowListedValidatorSetChangeProposal";
  value: AllowListedValidatorSetChangeProposalAmino;
}
/** @deprecated */
export interface AllowListedValidatorSetChangeProposalSDKType {
  title: string;
  description: string;
  allow_listed_validators: AllowListedValidatorsSDKType | undefined;
}
function createBaseMinDepositAndFeeChangeProposal(): MinDepositAndFeeChangeProposal {
  return {
    title: "",
    description: "",
    minDeposit: "",
    pstakeDepositFee: "",
    pstakeRestakeFee: "",
    pstakeUnstakeFee: "",
    pstakeRedemptionFee: ""
  };
}
export const MinDepositAndFeeChangeProposal = {
  typeUrl: "/pstake.lscosmos.v1beta1.MinDepositAndFeeChangeProposal",
  encode(message: MinDepositAndFeeChangeProposal, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.minDeposit !== "") {
      writer.uint32(26).string(message.minDeposit);
    }
    if (message.pstakeDepositFee !== "") {
      writer.uint32(34).string(Decimal.fromUserInput(message.pstakeDepositFee, 18).atomics);
    }
    if (message.pstakeRestakeFee !== "") {
      writer.uint32(42).string(Decimal.fromUserInput(message.pstakeRestakeFee, 18).atomics);
    }
    if (message.pstakeUnstakeFee !== "") {
      writer.uint32(50).string(Decimal.fromUserInput(message.pstakeUnstakeFee, 18).atomics);
    }
    if (message.pstakeRedemptionFee !== "") {
      writer.uint32(58).string(Decimal.fromUserInput(message.pstakeRedemptionFee, 18).atomics);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MinDepositAndFeeChangeProposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMinDepositAndFeeChangeProposal();
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
          message.minDeposit = reader.string();
          break;
        case 4:
          message.pstakeDepositFee = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 5:
          message.pstakeRestakeFee = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 6:
          message.pstakeUnstakeFee = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        case 7:
          message.pstakeRedemptionFee = Decimal.fromAtomics(reader.string(), 18).toString();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MinDepositAndFeeChangeProposal>): MinDepositAndFeeChangeProposal {
    const message = createBaseMinDepositAndFeeChangeProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.minDeposit = object.minDeposit ?? "";
    message.pstakeDepositFee = object.pstakeDepositFee ?? "";
    message.pstakeRestakeFee = object.pstakeRestakeFee ?? "";
    message.pstakeUnstakeFee = object.pstakeUnstakeFee ?? "";
    message.pstakeRedemptionFee = object.pstakeRedemptionFee ?? "";
    return message;
  },
  fromAmino(object: MinDepositAndFeeChangeProposalAmino): MinDepositAndFeeChangeProposal {
    const message = createBaseMinDepositAndFeeChangeProposal();
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    }
    if (object.min_deposit !== undefined && object.min_deposit !== null) {
      message.minDeposit = object.min_deposit;
    }
    if (object.pstake_deposit_fee !== undefined && object.pstake_deposit_fee !== null) {
      message.pstakeDepositFee = object.pstake_deposit_fee;
    }
    if (object.pstake_restake_fee !== undefined && object.pstake_restake_fee !== null) {
      message.pstakeRestakeFee = object.pstake_restake_fee;
    }
    if (object.pstake_unstake_fee !== undefined && object.pstake_unstake_fee !== null) {
      message.pstakeUnstakeFee = object.pstake_unstake_fee;
    }
    if (object.pstake_redemption_fee !== undefined && object.pstake_redemption_fee !== null) {
      message.pstakeRedemptionFee = object.pstake_redemption_fee;
    }
    return message;
  },
  toAmino(message: MinDepositAndFeeChangeProposal, useInterfaces: boolean = false): MinDepositAndFeeChangeProposalAmino {
    const obj: any = {};
    obj.title = message.title;
    obj.description = message.description;
    obj.min_deposit = message.minDeposit;
    obj.pstake_deposit_fee = message.pstakeDepositFee;
    obj.pstake_restake_fee = message.pstakeRestakeFee;
    obj.pstake_unstake_fee = message.pstakeUnstakeFee;
    obj.pstake_redemption_fee = message.pstakeRedemptionFee;
    return obj;
  },
  fromAminoMsg(object: MinDepositAndFeeChangeProposalAminoMsg): MinDepositAndFeeChangeProposal {
    return MinDepositAndFeeChangeProposal.fromAmino(object.value);
  },
  fromProtoMsg(message: MinDepositAndFeeChangeProposalProtoMsg, useInterfaces: boolean = false): MinDepositAndFeeChangeProposal {
    return MinDepositAndFeeChangeProposal.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MinDepositAndFeeChangeProposal): Uint8Array {
    return MinDepositAndFeeChangeProposal.encode(message).finish();
  },
  toProtoMsg(message: MinDepositAndFeeChangeProposal): MinDepositAndFeeChangeProposalProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.MinDepositAndFeeChangeProposal",
      value: MinDepositAndFeeChangeProposal.encode(message).finish()
    };
  }
};
function createBasePstakeFeeAddressChangeProposal(): PstakeFeeAddressChangeProposal {
  return {
    title: "",
    description: "",
    pstakeFeeAddress: ""
  };
}
export const PstakeFeeAddressChangeProposal = {
  typeUrl: "/pstake.lscosmos.v1beta1.PstakeFeeAddressChangeProposal",
  encode(message: PstakeFeeAddressChangeProposal, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.pstakeFeeAddress !== "") {
      writer.uint32(26).string(message.pstakeFeeAddress);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): PstakeFeeAddressChangeProposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePstakeFeeAddressChangeProposal();
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
          message.pstakeFeeAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<PstakeFeeAddressChangeProposal>): PstakeFeeAddressChangeProposal {
    const message = createBasePstakeFeeAddressChangeProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.pstakeFeeAddress = object.pstakeFeeAddress ?? "";
    return message;
  },
  fromAmino(object: PstakeFeeAddressChangeProposalAmino): PstakeFeeAddressChangeProposal {
    const message = createBasePstakeFeeAddressChangeProposal();
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    }
    if (object.pstake_fee_address !== undefined && object.pstake_fee_address !== null) {
      message.pstakeFeeAddress = object.pstake_fee_address;
    }
    return message;
  },
  toAmino(message: PstakeFeeAddressChangeProposal, useInterfaces: boolean = false): PstakeFeeAddressChangeProposalAmino {
    const obj: any = {};
    obj.title = message.title;
    obj.description = message.description;
    obj.pstake_fee_address = message.pstakeFeeAddress;
    return obj;
  },
  fromAminoMsg(object: PstakeFeeAddressChangeProposalAminoMsg): PstakeFeeAddressChangeProposal {
    return PstakeFeeAddressChangeProposal.fromAmino(object.value);
  },
  fromProtoMsg(message: PstakeFeeAddressChangeProposalProtoMsg, useInterfaces: boolean = false): PstakeFeeAddressChangeProposal {
    return PstakeFeeAddressChangeProposal.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: PstakeFeeAddressChangeProposal): Uint8Array {
    return PstakeFeeAddressChangeProposal.encode(message).finish();
  },
  toProtoMsg(message: PstakeFeeAddressChangeProposal): PstakeFeeAddressChangeProposalProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.PstakeFeeAddressChangeProposal",
      value: PstakeFeeAddressChangeProposal.encode(message).finish()
    };
  }
};
function createBaseAllowListedValidatorSetChangeProposal(): AllowListedValidatorSetChangeProposal {
  return {
    title: "",
    description: "",
    allowListedValidators: AllowListedValidators.fromPartial({})
  };
}
export const AllowListedValidatorSetChangeProposal = {
  typeUrl: "/pstake.lscosmos.v1beta1.AllowListedValidatorSetChangeProposal",
  encode(message: AllowListedValidatorSetChangeProposal, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.allowListedValidators !== undefined) {
      AllowListedValidators.encode(message.allowListedValidators, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): AllowListedValidatorSetChangeProposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAllowListedValidatorSetChangeProposal();
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
          message.allowListedValidators = AllowListedValidators.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<AllowListedValidatorSetChangeProposal>): AllowListedValidatorSetChangeProposal {
    const message = createBaseAllowListedValidatorSetChangeProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.allowListedValidators = object.allowListedValidators !== undefined && object.allowListedValidators !== null ? AllowListedValidators.fromPartial(object.allowListedValidators) : undefined;
    return message;
  },
  fromAmino(object: AllowListedValidatorSetChangeProposalAmino): AllowListedValidatorSetChangeProposal {
    const message = createBaseAllowListedValidatorSetChangeProposal();
    if (object.title !== undefined && object.title !== null) {
      message.title = object.title;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    }
    if (object.allow_listed_validators !== undefined && object.allow_listed_validators !== null) {
      message.allowListedValidators = AllowListedValidators.fromAmino(object.allow_listed_validators);
    }
    return message;
  },
  toAmino(message: AllowListedValidatorSetChangeProposal, useInterfaces: boolean = false): AllowListedValidatorSetChangeProposalAmino {
    const obj: any = {};
    obj.title = message.title;
    obj.description = message.description;
    obj.allow_listed_validators = message.allowListedValidators ? AllowListedValidators.toAmino(message.allowListedValidators, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: AllowListedValidatorSetChangeProposalAminoMsg): AllowListedValidatorSetChangeProposal {
    return AllowListedValidatorSetChangeProposal.fromAmino(object.value);
  },
  fromProtoMsg(message: AllowListedValidatorSetChangeProposalProtoMsg, useInterfaces: boolean = false): AllowListedValidatorSetChangeProposal {
    return AllowListedValidatorSetChangeProposal.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: AllowListedValidatorSetChangeProposal): Uint8Array {
    return AllowListedValidatorSetChangeProposal.encode(message).finish();
  },
  toProtoMsg(message: AllowListedValidatorSetChangeProposal): AllowListedValidatorSetChangeProposalProtoMsg {
    return {
      typeUrl: "/pstake.lscosmos.v1beta1.AllowListedValidatorSetChangeProposal",
      value: AllowListedValidatorSetChangeProposal.encode(message).finish()
    };
  }
};