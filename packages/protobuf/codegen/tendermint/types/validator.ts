import { PublicKey, PublicKeyAmino, PublicKeySDKType } from "../crypto/keys";
import { BinaryReader, BinaryWriter } from "../../binary";
/** BlockIdFlag indicates which BlockID the signature is for */
export enum BlockIDFlag {
  /** BLOCK_ID_FLAG_UNKNOWN - indicates an error condition */
  BLOCK_ID_FLAG_UNKNOWN = 0,
  /** BLOCK_ID_FLAG_ABSENT - the vote was not received */
  BLOCK_ID_FLAG_ABSENT = 1,
  /** BLOCK_ID_FLAG_COMMIT - voted for the block that received the majority */
  BLOCK_ID_FLAG_COMMIT = 2,
  /** BLOCK_ID_FLAG_NIL - voted for nil */
  BLOCK_ID_FLAG_NIL = 3,
  UNRECOGNIZED = -1,
}
export const BlockIDFlagSDKType = BlockIDFlag;
export const BlockIDFlagAmino = BlockIDFlag;
export function blockIDFlagFromJSON(object: any): BlockIDFlag {
  switch (object) {
    case 0:
    case "BLOCK_ID_FLAG_UNKNOWN":
      return BlockIDFlag.BLOCK_ID_FLAG_UNKNOWN;
    case 1:
    case "BLOCK_ID_FLAG_ABSENT":
      return BlockIDFlag.BLOCK_ID_FLAG_ABSENT;
    case 2:
    case "BLOCK_ID_FLAG_COMMIT":
      return BlockIDFlag.BLOCK_ID_FLAG_COMMIT;
    case 3:
    case "BLOCK_ID_FLAG_NIL":
      return BlockIDFlag.BLOCK_ID_FLAG_NIL;
    case -1:
    case "UNRECOGNIZED":
    default:
      return BlockIDFlag.UNRECOGNIZED;
  }
}
export function blockIDFlagToJSON(object: BlockIDFlag): string {
  switch (object) {
    case BlockIDFlag.BLOCK_ID_FLAG_UNKNOWN:
      return "BLOCK_ID_FLAG_UNKNOWN";
    case BlockIDFlag.BLOCK_ID_FLAG_ABSENT:
      return "BLOCK_ID_FLAG_ABSENT";
    case BlockIDFlag.BLOCK_ID_FLAG_COMMIT:
      return "BLOCK_ID_FLAG_COMMIT";
    case BlockIDFlag.BLOCK_ID_FLAG_NIL:
      return "BLOCK_ID_FLAG_NIL";
    case BlockIDFlag.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
export interface ValidatorSet {
  validators: Validator[];
  proposer?: Validator | undefined;
  totalVotingPower: bigint;
}
export interface ValidatorSetProtoMsg {
  typeUrl: "/tendermint.types.ValidatorSet";
  value: Uint8Array;
}
export interface ValidatorSetAmino {
  validators: ValidatorAmino[];
  proposer?: ValidatorAmino | undefined;
  total_voting_power: string;
}
export interface ValidatorSetAminoMsg {
  type: "/tendermint.types.ValidatorSet";
  value: ValidatorSetAmino;
}
export interface ValidatorSetSDKType {
  validators: ValidatorSDKType[];
  proposer?: ValidatorSDKType | undefined;
  total_voting_power: bigint;
}
export interface Validator {
  address: Uint8Array;
  pubKey: PublicKey | undefined;
  votingPower: bigint;
  proposerPriority: bigint;
}
export interface ValidatorProtoMsg {
  typeUrl: "/tendermint.types.Validator";
  value: Uint8Array;
}
export interface ValidatorAmino {
  address: Uint8Array;
  pub_key?: PublicKeyAmino | undefined;
  voting_power: string;
  proposer_priority: string;
}
export interface ValidatorAminoMsg {
  type: "/tendermint.types.Validator";
  value: ValidatorAmino;
}
export interface ValidatorSDKType {
  address: Uint8Array;
  pub_key: PublicKeySDKType | undefined;
  voting_power: bigint;
  proposer_priority: bigint;
}
export interface SimpleValidator {
  pubKey?: PublicKey | undefined;
  votingPower: bigint;
}
export interface SimpleValidatorProtoMsg {
  typeUrl: "/tendermint.types.SimpleValidator";
  value: Uint8Array;
}
export interface SimpleValidatorAmino {
  pub_key?: PublicKeyAmino | undefined;
  voting_power: string;
}
export interface SimpleValidatorAminoMsg {
  type: "/tendermint.types.SimpleValidator";
  value: SimpleValidatorAmino;
}
export interface SimpleValidatorSDKType {
  pub_key?: PublicKeySDKType | undefined;
  voting_power: bigint;
}
function createBaseValidatorSet(): ValidatorSet {
  return {
    validators: [],
    proposer: undefined,
    totalVotingPower: BigInt(0)
  };
}
export const ValidatorSet = {
  typeUrl: "/tendermint.types.ValidatorSet",
  encode(message: ValidatorSet, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.validators) {
      Validator.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.proposer !== undefined) {
      Validator.encode(message.proposer, writer.uint32(18).fork()).ldelim();
    }
    if (message.totalVotingPower !== BigInt(0)) {
      writer.uint32(24).int64(message.totalVotingPower);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ValidatorSet {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidatorSet();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validators.push(Validator.decode(reader, reader.uint32(), useInterfaces));
          break;
        case 2:
          message.proposer = Validator.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.totalVotingPower = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ValidatorSet>): ValidatorSet {
    const message = createBaseValidatorSet();
    message.validators = object.validators?.map(e => Validator.fromPartial(e)) || [];
    message.proposer = object.proposer !== undefined && object.proposer !== null ? Validator.fromPartial(object.proposer) : undefined;
    message.totalVotingPower = object.totalVotingPower !== undefined && object.totalVotingPower !== null ? BigInt(object.totalVotingPower.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: ValidatorSetAmino): ValidatorSet {
    return {
      validators: Array.isArray(object?.validators) ? object.validators.map((e: any) => Validator.fromAmino(e)) : [],
      proposer: object?.proposer ? Validator.fromAmino(object.proposer) : undefined,
      totalVotingPower: BigInt(object.total_voting_power)
    };
  },
  toAmino(message: ValidatorSet, useInterfaces: boolean = false): ValidatorSetAmino {
    const obj: any = {};
    if (message.validators) {
      obj.validators = message.validators.map(e => e ? Validator.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.validators = [];
    }
    obj.proposer = message.proposer ? Validator.toAmino(message.proposer, useInterfaces) : undefined;
    obj.total_voting_power = message.totalVotingPower ? message.totalVotingPower.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: ValidatorSetAminoMsg): ValidatorSet {
    return ValidatorSet.fromAmino(object.value);
  },
  fromProtoMsg(message: ValidatorSetProtoMsg, useInterfaces: boolean = false): ValidatorSet {
    return ValidatorSet.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ValidatorSet): Uint8Array {
    return ValidatorSet.encode(message).finish();
  },
  toProtoMsg(message: ValidatorSet): ValidatorSetProtoMsg {
    return {
      typeUrl: "/tendermint.types.ValidatorSet",
      value: ValidatorSet.encode(message).finish()
    };
  }
};
function createBaseValidator(): Validator {
  return {
    address: new Uint8Array(),
    pubKey: PublicKey.fromPartial({}),
    votingPower: BigInt(0),
    proposerPriority: BigInt(0)
  };
}
export const Validator = {
  typeUrl: "/tendermint.types.Validator",
  encode(message: Validator, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address.length !== 0) {
      writer.uint32(10).bytes(message.address);
    }
    if (message.pubKey !== undefined) {
      PublicKey.encode(message.pubKey, writer.uint32(18).fork()).ldelim();
    }
    if (message.votingPower !== BigInt(0)) {
      writer.uint32(24).int64(message.votingPower);
    }
    if (message.proposerPriority !== BigInt(0)) {
      writer.uint32(32).int64(message.proposerPriority);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): Validator {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidator();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.bytes();
          break;
        case 2:
          message.pubKey = PublicKey.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 3:
          message.votingPower = reader.int64();
          break;
        case 4:
          message.proposerPriority = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Validator>): Validator {
    const message = createBaseValidator();
    message.address = object.address ?? new Uint8Array();
    message.pubKey = object.pubKey !== undefined && object.pubKey !== null ? PublicKey.fromPartial(object.pubKey) : undefined;
    message.votingPower = object.votingPower !== undefined && object.votingPower !== null ? BigInt(object.votingPower.toString()) : BigInt(0);
    message.proposerPriority = object.proposerPriority !== undefined && object.proposerPriority !== null ? BigInt(object.proposerPriority.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: ValidatorAmino): Validator {
    return {
      address: object.address,
      pubKey: object?.pub_key ? PublicKey.fromAmino(object.pub_key) : undefined,
      votingPower: BigInt(object.voting_power),
      proposerPriority: BigInt(object.proposer_priority)
    };
  },
  toAmino(message: Validator, useInterfaces: boolean = false): ValidatorAmino {
    const obj: any = {};
    obj.address = message.address;
    obj.pub_key = message.pubKey ? PublicKey.toAmino(message.pubKey, useInterfaces) : undefined;
    obj.voting_power = message.votingPower ? message.votingPower.toString() : undefined;
    obj.proposer_priority = message.proposerPriority ? message.proposerPriority.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: ValidatorAminoMsg): Validator {
    return Validator.fromAmino(object.value);
  },
  fromProtoMsg(message: ValidatorProtoMsg, useInterfaces: boolean = false): Validator {
    return Validator.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: Validator): Uint8Array {
    return Validator.encode(message).finish();
  },
  toProtoMsg(message: Validator): ValidatorProtoMsg {
    return {
      typeUrl: "/tendermint.types.Validator",
      value: Validator.encode(message).finish()
    };
  }
};
function createBaseSimpleValidator(): SimpleValidator {
  return {
    pubKey: undefined,
    votingPower: BigInt(0)
  };
}
export const SimpleValidator = {
  typeUrl: "/tendermint.types.SimpleValidator",
  encode(message: SimpleValidator, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pubKey !== undefined) {
      PublicKey.encode(message.pubKey, writer.uint32(10).fork()).ldelim();
    }
    if (message.votingPower !== BigInt(0)) {
      writer.uint32(16).int64(message.votingPower);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): SimpleValidator {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimpleValidator();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pubKey = PublicKey.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.votingPower = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<SimpleValidator>): SimpleValidator {
    const message = createBaseSimpleValidator();
    message.pubKey = object.pubKey !== undefined && object.pubKey !== null ? PublicKey.fromPartial(object.pubKey) : undefined;
    message.votingPower = object.votingPower !== undefined && object.votingPower !== null ? BigInt(object.votingPower.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: SimpleValidatorAmino): SimpleValidator {
    return {
      pubKey: object?.pub_key ? PublicKey.fromAmino(object.pub_key) : undefined,
      votingPower: BigInt(object.voting_power)
    };
  },
  toAmino(message: SimpleValidator, useInterfaces: boolean = false): SimpleValidatorAmino {
    const obj: any = {};
    obj.pub_key = message.pubKey ? PublicKey.toAmino(message.pubKey, useInterfaces) : undefined;
    obj.voting_power = message.votingPower ? message.votingPower.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: SimpleValidatorAminoMsg): SimpleValidator {
    return SimpleValidator.fromAmino(object.value);
  },
  fromProtoMsg(message: SimpleValidatorProtoMsg, useInterfaces: boolean = false): SimpleValidator {
    return SimpleValidator.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: SimpleValidator): Uint8Array {
    return SimpleValidator.encode(message).finish();
  },
  toProtoMsg(message: SimpleValidator): SimpleValidatorProtoMsg {
    return {
      typeUrl: "/tendermint.types.SimpleValidator",
      value: SimpleValidator.encode(message).finish()
    };
  }
};