import { CommitmentProof, CommitmentProofAmino, CommitmentProofSDKType } from "../../../../cosmos/ics23/v1/proofs";
import { BinaryReader, BinaryWriter } from "../../../../binary";
import { bytesFromBase64, base64FromBytes } from "../../../../helpers";
/**
 * MerkleRoot defines a merkle root hash.
 * In the Cosmos SDK, the AppHash of a block header becomes the root.
 */
export interface MerkleRoot {
  hash: Uint8Array;
}
export interface MerkleRootProtoMsg {
  typeUrl: "/ibc.core.commitment.v1.MerkleRoot";
  value: Uint8Array;
}
/**
 * MerkleRoot defines a merkle root hash.
 * In the Cosmos SDK, the AppHash of a block header becomes the root.
 */
export interface MerkleRootAmino {
  hash?: string;
}
export interface MerkleRootAminoMsg {
  type: "cosmos-sdk/MerkleRoot";
  value: MerkleRootAmino;
}
/**
 * MerkleRoot defines a merkle root hash.
 * In the Cosmos SDK, the AppHash of a block header becomes the root.
 */
export interface MerkleRootSDKType {
  hash: Uint8Array;
}
/**
 * MerklePrefix is merkle path prefixed to the key.
 * The constructed key from the Path and the key will be append(Path.KeyPath,
 * append(Path.KeyPrefix, key...))
 */
export interface MerklePrefix {
  keyPrefix: Uint8Array;
}
export interface MerklePrefixProtoMsg {
  typeUrl: "/ibc.core.commitment.v1.MerklePrefix";
  value: Uint8Array;
}
/**
 * MerklePrefix is merkle path prefixed to the key.
 * The constructed key from the Path and the key will be append(Path.KeyPath,
 * append(Path.KeyPrefix, key...))
 */
export interface MerklePrefixAmino {
  key_prefix?: string;
}
export interface MerklePrefixAminoMsg {
  type: "cosmos-sdk/MerklePrefix";
  value: MerklePrefixAmino;
}
/**
 * MerklePrefix is merkle path prefixed to the key.
 * The constructed key from the Path and the key will be append(Path.KeyPath,
 * append(Path.KeyPrefix, key...))
 */
export interface MerklePrefixSDKType {
  key_prefix: Uint8Array;
}
/**
 * MerkleProof is a wrapper type over a chain of CommitmentProofs.
 * It demonstrates membership or non-membership for an element or set of
 * elements, verifiable in conjunction with a known commitment root. Proofs
 * should be succinct.
 * MerkleProofs are ordered from leaf-to-root
 */
export interface MerkleProof {
  proofs: CommitmentProof[];
}
export interface MerkleProofProtoMsg {
  typeUrl: "/ibc.core.commitment.v1.MerkleProof";
  value: Uint8Array;
}
/**
 * MerkleProof is a wrapper type over a chain of CommitmentProofs.
 * It demonstrates membership or non-membership for an element or set of
 * elements, verifiable in conjunction with a known commitment root. Proofs
 * should be succinct.
 * MerkleProofs are ordered from leaf-to-root
 */
export interface MerkleProofAmino {
  proofs?: CommitmentProofAmino[];
}
export interface MerkleProofAminoMsg {
  type: "cosmos-sdk/MerkleProof";
  value: MerkleProofAmino;
}
/**
 * MerkleProof is a wrapper type over a chain of CommitmentProofs.
 * It demonstrates membership or non-membership for an element or set of
 * elements, verifiable in conjunction with a known commitment root. Proofs
 * should be succinct.
 * MerkleProofs are ordered from leaf-to-root
 */
export interface MerkleProofSDKType {
  proofs: CommitmentProofSDKType[];
}
function createBaseMerkleRoot(): MerkleRoot {
  return {
    hash: new Uint8Array()
  };
}
export const MerkleRoot = {
  typeUrl: "/ibc.core.commitment.v1.MerkleRoot",
  encode(message: MerkleRoot, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.hash.length !== 0) {
      writer.uint32(10).bytes(message.hash);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MerkleRoot {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMerkleRoot();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hash = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MerkleRoot>): MerkleRoot {
    const message = createBaseMerkleRoot();
    message.hash = object.hash ?? new Uint8Array();
    return message;
  },
  fromAmino(object: MerkleRootAmino): MerkleRoot {
    const message = createBaseMerkleRoot();
    if (object.hash !== undefined && object.hash !== null) {
      message.hash = bytesFromBase64(object.hash);
    }
    return message;
  },
  toAmino(message: MerkleRoot, useInterfaces: boolean = false): MerkleRootAmino {
    const obj: any = {};
    obj.hash = message.hash ? base64FromBytes(message.hash) : undefined;
    return obj;
  },
  fromAminoMsg(object: MerkleRootAminoMsg): MerkleRoot {
    return MerkleRoot.fromAmino(object.value);
  },
  toAminoMsg(message: MerkleRoot, useInterfaces: boolean = false): MerkleRootAminoMsg {
    return {
      type: "cosmos-sdk/MerkleRoot",
      value: MerkleRoot.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MerkleRootProtoMsg, useInterfaces: boolean = false): MerkleRoot {
    return MerkleRoot.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MerkleRoot): Uint8Array {
    return MerkleRoot.encode(message).finish();
  },
  toProtoMsg(message: MerkleRoot): MerkleRootProtoMsg {
    return {
      typeUrl: "/ibc.core.commitment.v1.MerkleRoot",
      value: MerkleRoot.encode(message).finish()
    };
  }
};
function createBaseMerklePrefix(): MerklePrefix {
  return {
    keyPrefix: new Uint8Array()
  };
}
export const MerklePrefix = {
  typeUrl: "/ibc.core.commitment.v1.MerklePrefix",
  encode(message: MerklePrefix, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.keyPrefix.length !== 0) {
      writer.uint32(10).bytes(message.keyPrefix);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MerklePrefix {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMerklePrefix();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.keyPrefix = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MerklePrefix>): MerklePrefix {
    const message = createBaseMerklePrefix();
    message.keyPrefix = object.keyPrefix ?? new Uint8Array();
    return message;
  },
  fromAmino(object: MerklePrefixAmino): MerklePrefix {
    const message = createBaseMerklePrefix();
    if (object.key_prefix !== undefined && object.key_prefix !== null) {
      message.keyPrefix = bytesFromBase64(object.key_prefix);
    }
    return message;
  },
  toAmino(message: MerklePrefix, useInterfaces: boolean = false): MerklePrefixAmino {
    const obj: any = {};
    obj.key_prefix = message.keyPrefix ? base64FromBytes(message.keyPrefix) : undefined;
    return obj;
  },
  fromAminoMsg(object: MerklePrefixAminoMsg): MerklePrefix {
    return MerklePrefix.fromAmino(object.value);
  },
  toAminoMsg(message: MerklePrefix, useInterfaces: boolean = false): MerklePrefixAminoMsg {
    return {
      type: "cosmos-sdk/MerklePrefix",
      value: MerklePrefix.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MerklePrefixProtoMsg, useInterfaces: boolean = false): MerklePrefix {
    return MerklePrefix.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MerklePrefix): Uint8Array {
    return MerklePrefix.encode(message).finish();
  },
  toProtoMsg(message: MerklePrefix): MerklePrefixProtoMsg {
    return {
      typeUrl: "/ibc.core.commitment.v1.MerklePrefix",
      value: MerklePrefix.encode(message).finish()
    };
  }
};
function createBaseMerkleProof(): MerkleProof {
  return {
    proofs: []
  };
}
export const MerkleProof = {
  typeUrl: "/ibc.core.commitment.v1.MerkleProof",
  encode(message: MerkleProof, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.proofs) {
      CommitmentProof.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): MerkleProof {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMerkleProof();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proofs.push(CommitmentProof.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MerkleProof>): MerkleProof {
    const message = createBaseMerkleProof();
    message.proofs = object.proofs?.map(e => CommitmentProof.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: MerkleProofAmino): MerkleProof {
    const message = createBaseMerkleProof();
    message.proofs = object.proofs?.map(e => CommitmentProof.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: MerkleProof, useInterfaces: boolean = false): MerkleProofAmino {
    const obj: any = {};
    if (message.proofs) {
      obj.proofs = message.proofs.map(e => e ? CommitmentProof.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.proofs = message.proofs;
    }
    return obj;
  },
  fromAminoMsg(object: MerkleProofAminoMsg): MerkleProof {
    return MerkleProof.fromAmino(object.value);
  },
  toAminoMsg(message: MerkleProof, useInterfaces: boolean = false): MerkleProofAminoMsg {
    return {
      type: "cosmos-sdk/MerkleProof",
      value: MerkleProof.toAmino(message, useInterfaces)
    };
  },
  fromProtoMsg(message: MerkleProofProtoMsg, useInterfaces: boolean = false): MerkleProof {
    return MerkleProof.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: MerkleProof): Uint8Array {
    return MerkleProof.encode(message).finish();
  },
  toProtoMsg(message: MerkleProof): MerkleProofProtoMsg {
    return {
      typeUrl: "/ibc.core.commitment.v1.MerkleProof",
      value: MerkleProof.encode(message).finish()
    };
  }
};