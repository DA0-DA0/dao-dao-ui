import { BinaryReader, BinaryWriter } from "../../../binary";
import { bytesFromBase64, base64FromBytes } from "../../../helpers";
/**
 * DigestAlgorithm is the hash digest algorithm
 * 
 * With v2, this enum is no longer validated on-chain.
 * However, this enum SHOULD still be used and updated as a registry of known digest
 * algorithms and all implementations should coordinate on these values.
 */
export enum DigestAlgorithm {
  /** DIGEST_ALGORITHM_UNSPECIFIED - unspecified and invalid */
  DIGEST_ALGORITHM_UNSPECIFIED = 0,
  /** DIGEST_ALGORITHM_BLAKE2B_256 - BLAKE2b-256 */
  DIGEST_ALGORITHM_BLAKE2B_256 = 1,
  UNRECOGNIZED = -1,
}
export const DigestAlgorithmSDKType = DigestAlgorithm;
export const DigestAlgorithmAmino = DigestAlgorithm;
export function digestAlgorithmFromJSON(object: any): DigestAlgorithm {
  switch (object) {
    case 0:
    case "DIGEST_ALGORITHM_UNSPECIFIED":
      return DigestAlgorithm.DIGEST_ALGORITHM_UNSPECIFIED;
    case 1:
    case "DIGEST_ALGORITHM_BLAKE2B_256":
      return DigestAlgorithm.DIGEST_ALGORITHM_BLAKE2B_256;
    case -1:
    case "UNRECOGNIZED":
    default:
      return DigestAlgorithm.UNRECOGNIZED;
  }
}
export function digestAlgorithmToJSON(object: DigestAlgorithm): string {
  switch (object) {
    case DigestAlgorithm.DIGEST_ALGORITHM_UNSPECIFIED:
      return "DIGEST_ALGORITHM_UNSPECIFIED";
    case DigestAlgorithm.DIGEST_ALGORITHM_BLAKE2B_256:
      return "DIGEST_ALGORITHM_BLAKE2B_256";
    case DigestAlgorithm.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/**
 * GraphCanonicalizationAlgorithm is the graph canonicalization algorithm
 * 
 * With v2, this enum is no longer validated on-chain.
 * However, this enum SHOULD still be used and updated as a registry of known canonicalization
 * algorithms and all implementations should coordinate on these values.
 */
export enum GraphCanonicalizationAlgorithm {
  /** GRAPH_CANONICALIZATION_ALGORITHM_UNSPECIFIED - unspecified and invalid */
  GRAPH_CANONICALIZATION_ALGORITHM_UNSPECIFIED = 0,
  /**
   * GRAPH_CANONICALIZATION_ALGORITHM_RDFC_1_0 - RDFC 1.0 graph canonicalization algorithm. Essentially the same as URDNA2015 with some
   * small clarifications around escaping of escape characters.
   */
  GRAPH_CANONICALIZATION_ALGORITHM_RDFC_1_0 = 1,
  UNRECOGNIZED = -1,
}
export const GraphCanonicalizationAlgorithmSDKType = GraphCanonicalizationAlgorithm;
export const GraphCanonicalizationAlgorithmAmino = GraphCanonicalizationAlgorithm;
export function graphCanonicalizationAlgorithmFromJSON(object: any): GraphCanonicalizationAlgorithm {
  switch (object) {
    case 0:
    case "GRAPH_CANONICALIZATION_ALGORITHM_UNSPECIFIED":
      return GraphCanonicalizationAlgorithm.GRAPH_CANONICALIZATION_ALGORITHM_UNSPECIFIED;
    case 1:
    case "GRAPH_CANONICALIZATION_ALGORITHM_RDFC_1_0":
      return GraphCanonicalizationAlgorithm.GRAPH_CANONICALIZATION_ALGORITHM_RDFC_1_0;
    case -1:
    case "UNRECOGNIZED":
    default:
      return GraphCanonicalizationAlgorithm.UNRECOGNIZED;
  }
}
export function graphCanonicalizationAlgorithmToJSON(object: GraphCanonicalizationAlgorithm): string {
  switch (object) {
    case GraphCanonicalizationAlgorithm.GRAPH_CANONICALIZATION_ALGORITHM_UNSPECIFIED:
      return "GRAPH_CANONICALIZATION_ALGORITHM_UNSPECIFIED";
    case GraphCanonicalizationAlgorithm.GRAPH_CANONICALIZATION_ALGORITHM_RDFC_1_0:
      return "GRAPH_CANONICALIZATION_ALGORITHM_RDFC_1_0";
    case GraphCanonicalizationAlgorithm.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/**
 * GraphMerkleTree is the graph merkle tree type used for hashing, if any.
 * 
 * With v2, this enum is no longer validated on-chain.
 * However, this enum SHOULD still be used and updated as a registry of known merkle tree
 * types and all implementations should coordinate on these values.
 */
export enum GraphMerkleTree {
  /** GRAPH_MERKLE_TREE_NONE_UNSPECIFIED - unspecified and valid */
  GRAPH_MERKLE_TREE_NONE_UNSPECIFIED = 0,
  UNRECOGNIZED = -1,
}
export const GraphMerkleTreeSDKType = GraphMerkleTree;
export const GraphMerkleTreeAmino = GraphMerkleTree;
export function graphMerkleTreeFromJSON(object: any): GraphMerkleTree {
  switch (object) {
    case 0:
    case "GRAPH_MERKLE_TREE_NONE_UNSPECIFIED":
      return GraphMerkleTree.GRAPH_MERKLE_TREE_NONE_UNSPECIFIED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return GraphMerkleTree.UNRECOGNIZED;
  }
}
export function graphMerkleTreeToJSON(object: GraphMerkleTree): string {
  switch (object) {
    case GraphMerkleTree.GRAPH_MERKLE_TREE_NONE_UNSPECIFIED:
      return "GRAPH_MERKLE_TREE_NONE_UNSPECIFIED";
    case GraphMerkleTree.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/**
 * ContentHash specifies a hash-based content identifier for a piece of data.
 * Exactly one of its fields must be set so this message behaves like a oneof.
 * A protobuf oneof was not used because this caused compatibility issues with
 * amino signing.
 */
export interface ContentHash {
  /**
   * raw specifies "raw" data which does not specify a deterministic, canonical
   * encoding. Users of these hashes MUST maintain a copy of the hashed data
   * which is preserved bit by bit. All other content encodings specify a
   * deterministic, canonical encoding allowing implementations to choose from a
   * variety of alternative formats for transport and encoding while maintaining
   * the guarantee that the canonical hash will not change.
   */
  raw?: ContentHash_Raw | undefined;
  /**
   * graph specifies graph data that conforms to the RDF data model.
   * The canonicalization algorithm used for an RDF graph is specified by
   * GraphCanonicalizationAlgorithm.
   */
  graph?: ContentHash_Graph | undefined;
}
export interface ContentHashProtoMsg {
  typeUrl: "/regen.data.v2.ContentHash";
  value: Uint8Array;
}
/**
 * ContentHash specifies a hash-based content identifier for a piece of data.
 * Exactly one of its fields must be set so this message behaves like a oneof.
 * A protobuf oneof was not used because this caused compatibility issues with
 * amino signing.
 */
export interface ContentHashAmino {
  /**
   * raw specifies "raw" data which does not specify a deterministic, canonical
   * encoding. Users of these hashes MUST maintain a copy of the hashed data
   * which is preserved bit by bit. All other content encodings specify a
   * deterministic, canonical encoding allowing implementations to choose from a
   * variety of alternative formats for transport and encoding while maintaining
   * the guarantee that the canonical hash will not change.
   */
  raw?: ContentHash_RawAmino | undefined;
  /**
   * graph specifies graph data that conforms to the RDF data model.
   * The canonicalization algorithm used for an RDF graph is specified by
   * GraphCanonicalizationAlgorithm.
   */
  graph?: ContentHash_GraphAmino | undefined;
}
export interface ContentHashAminoMsg {
  type: "/regen.data.v2.ContentHash";
  value: ContentHashAmino;
}
/**
 * ContentHash specifies a hash-based content identifier for a piece of data.
 * Exactly one of its fields must be set so this message behaves like a oneof.
 * A protobuf oneof was not used because this caused compatibility issues with
 * amino signing.
 */
export interface ContentHashSDKType {
  raw?: ContentHash_RawSDKType | undefined;
  graph?: ContentHash_GraphSDKType | undefined;
}
/** RawVis the content hash type used for raw data. */
export interface ContentHash_Raw {
  /**
   * hash represents the hash of the data based on the specified
   * digest_algorithm. It must be at least 20 bytes long and at most 64 bytes long.
   */
  hash: Uint8Array;
  /** digest_algorithm represents the hash digest algorithm and should be a non-zero value from the DigestAlgorithm enum. */
  digestAlgorithm: number;
  /**
   * file_extension represents the file extension for raw data. It can be
   * must be between 2-6 characters long, must be all lower-case and should represent
   * the canonical extension for the media type.
   * 
   * A list of canonical extensions which should be used is provided here
   * and SHOULD be used by implementations: txt, json, csv, xml, pdf, tiff,
   * jpg, png, svg, webp, avif, gif, apng, mpeg, mp4, webm, ogg, heic, raw.
   * 
   * The above list should be updated as new media types come into common usage
   * especially when there are two or more possible extensions (i.e. jpg vs jpeg or tif vs tiff).
   */
  fileExtension: string;
}
export interface ContentHash_RawProtoMsg {
  typeUrl: "/regen.data.v2.Raw";
  value: Uint8Array;
}
/** RawVis the content hash type used for raw data. */
export interface ContentHash_RawAmino {
  /**
   * hash represents the hash of the data based on the specified
   * digest_algorithm. It must be at least 20 bytes long and at most 64 bytes long.
   */
  hash?: string;
  /** digest_algorithm represents the hash digest algorithm and should be a non-zero value from the DigestAlgorithm enum. */
  digest_algorithm?: number;
  /**
   * file_extension represents the file extension for raw data. It can be
   * must be between 2-6 characters long, must be all lower-case and should represent
   * the canonical extension for the media type.
   * 
   * A list of canonical extensions which should be used is provided here
   * and SHOULD be used by implementations: txt, json, csv, xml, pdf, tiff,
   * jpg, png, svg, webp, avif, gif, apng, mpeg, mp4, webm, ogg, heic, raw.
   * 
   * The above list should be updated as new media types come into common usage
   * especially when there are two or more possible extensions (i.e. jpg vs jpeg or tif vs tiff).
   */
  file_extension?: string;
}
export interface ContentHash_RawAminoMsg {
  type: "/regen.data.v2.Raw";
  value: ContentHash_RawAmino;
}
/** RawVis the content hash type used for raw data. */
export interface ContentHash_RawSDKType {
  hash: Uint8Array;
  digest_algorithm: number;
  file_extension: string;
}
/** Graph is the content hash type used for RDF graph data. */
export interface ContentHash_Graph {
  /**
   * hash represents the hash of the data based on the specified
   * digest_algorithm. It must be at least 20 bytes long and at most 64 bytes long.
   */
  hash: Uint8Array;
  /** digest_algorithm represents the hash digest algorithm and should be a non-zero value from the DigestAlgorithm enum. */
  digestAlgorithm: number;
  /**
   * graph_canonicalization_algorithm represents the RDF graph
   * canonicalization algorithm and should be a non-zero value from the GraphCanonicalizationAlgorithm enum.
   */
  canonicalizationAlgorithm: number;
  /**
   * merkle_tree is the merkle tree type used for the graph hash, if any and should be a value from the GraphMerkleTree enum
   * or left unspecified.
   */
  merkleTree: number;
}
export interface ContentHash_GraphProtoMsg {
  typeUrl: "/regen.data.v2.Graph";
  value: Uint8Array;
}
/** Graph is the content hash type used for RDF graph data. */
export interface ContentHash_GraphAmino {
  /**
   * hash represents the hash of the data based on the specified
   * digest_algorithm. It must be at least 20 bytes long and at most 64 bytes long.
   */
  hash?: string;
  /** digest_algorithm represents the hash digest algorithm and should be a non-zero value from the DigestAlgorithm enum. */
  digest_algorithm?: number;
  /**
   * graph_canonicalization_algorithm represents the RDF graph
   * canonicalization algorithm and should be a non-zero value from the GraphCanonicalizationAlgorithm enum.
   */
  canonicalization_algorithm?: number;
  /**
   * merkle_tree is the merkle tree type used for the graph hash, if any and should be a value from the GraphMerkleTree enum
   * or left unspecified.
   */
  merkle_tree?: number;
}
export interface ContentHash_GraphAminoMsg {
  type: "/regen.data.v2.Graph";
  value: ContentHash_GraphAmino;
}
/** Graph is the content hash type used for RDF graph data. */
export interface ContentHash_GraphSDKType {
  hash: Uint8Array;
  digest_algorithm: number;
  canonicalization_algorithm: number;
  merkle_tree: number;
}
/** ContentHashes contains list of content ContentHash. */
export interface ContentHashes {
  /** data is a list of content hashes which the resolver claims to serve. */
  contentHashes: ContentHash[];
}
export interface ContentHashesProtoMsg {
  typeUrl: "/regen.data.v2.ContentHashes";
  value: Uint8Array;
}
/** ContentHashes contains list of content ContentHash. */
export interface ContentHashesAmino {
  /** data is a list of content hashes which the resolver claims to serve. */
  content_hashes?: ContentHashAmino[];
}
export interface ContentHashesAminoMsg {
  type: "/regen.data.v2.ContentHashes";
  value: ContentHashesAmino;
}
/** ContentHashes contains list of content ContentHash. */
export interface ContentHashesSDKType {
  content_hashes: ContentHashSDKType[];
}
function createBaseContentHash(): ContentHash {
  return {
    raw: undefined,
    graph: undefined
  };
}
export const ContentHash = {
  typeUrl: "/regen.data.v2.ContentHash",
  encode(message: ContentHash, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.raw !== undefined) {
      ContentHash_Raw.encode(message.raw, writer.uint32(10).fork()).ldelim();
    }
    if (message.graph !== undefined) {
      ContentHash_Graph.encode(message.graph, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ContentHash {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseContentHash();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.raw = ContentHash_Raw.decode(reader, reader.uint32(), useInterfaces);
          break;
        case 2:
          message.graph = ContentHash_Graph.decode(reader, reader.uint32(), useInterfaces);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ContentHash>): ContentHash {
    const message = createBaseContentHash();
    message.raw = object.raw !== undefined && object.raw !== null ? ContentHash_Raw.fromPartial(object.raw) : undefined;
    message.graph = object.graph !== undefined && object.graph !== null ? ContentHash_Graph.fromPartial(object.graph) : undefined;
    return message;
  },
  fromAmino(object: ContentHashAmino): ContentHash {
    const message = createBaseContentHash();
    if (object.raw !== undefined && object.raw !== null) {
      message.raw = ContentHash_Raw.fromAmino(object.raw);
    }
    if (object.graph !== undefined && object.graph !== null) {
      message.graph = ContentHash_Graph.fromAmino(object.graph);
    }
    return message;
  },
  toAmino(message: ContentHash, useInterfaces: boolean = false): ContentHashAmino {
    const obj: any = {};
    obj.raw = message.raw ? ContentHash_Raw.toAmino(message.raw, useInterfaces) : undefined;
    obj.graph = message.graph ? ContentHash_Graph.toAmino(message.graph, useInterfaces) : undefined;
    return obj;
  },
  fromAminoMsg(object: ContentHashAminoMsg): ContentHash {
    return ContentHash.fromAmino(object.value);
  },
  fromProtoMsg(message: ContentHashProtoMsg, useInterfaces: boolean = false): ContentHash {
    return ContentHash.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ContentHash): Uint8Array {
    return ContentHash.encode(message).finish();
  },
  toProtoMsg(message: ContentHash): ContentHashProtoMsg {
    return {
      typeUrl: "/regen.data.v2.ContentHash",
      value: ContentHash.encode(message).finish()
    };
  }
};
function createBaseContentHash_Raw(): ContentHash_Raw {
  return {
    hash: new Uint8Array(),
    digestAlgorithm: 0,
    fileExtension: ""
  };
}
export const ContentHash_Raw = {
  typeUrl: "/regen.data.v2.Raw",
  encode(message: ContentHash_Raw, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.hash.length !== 0) {
      writer.uint32(10).bytes(message.hash);
    }
    if (message.digestAlgorithm !== 0) {
      writer.uint32(16).uint32(message.digestAlgorithm);
    }
    if (message.fileExtension !== "") {
      writer.uint32(26).string(message.fileExtension);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ContentHash_Raw {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseContentHash_Raw();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hash = reader.bytes();
          break;
        case 2:
          message.digestAlgorithm = reader.uint32();
          break;
        case 3:
          message.fileExtension = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ContentHash_Raw>): ContentHash_Raw {
    const message = createBaseContentHash_Raw();
    message.hash = object.hash ?? new Uint8Array();
    message.digestAlgorithm = object.digestAlgorithm ?? 0;
    message.fileExtension = object.fileExtension ?? "";
    return message;
  },
  fromAmino(object: ContentHash_RawAmino): ContentHash_Raw {
    const message = createBaseContentHash_Raw();
    if (object.hash !== undefined && object.hash !== null) {
      message.hash = bytesFromBase64(object.hash);
    }
    if (object.digest_algorithm !== undefined && object.digest_algorithm !== null) {
      message.digestAlgorithm = object.digest_algorithm;
    }
    if (object.file_extension !== undefined && object.file_extension !== null) {
      message.fileExtension = object.file_extension;
    }
    return message;
  },
  toAmino(message: ContentHash_Raw, useInterfaces: boolean = false): ContentHash_RawAmino {
    const obj: any = {};
    obj.hash = message.hash ? base64FromBytes(message.hash) : undefined;
    obj.digest_algorithm = message.digestAlgorithm;
    obj.file_extension = message.fileExtension;
    return obj;
  },
  fromAminoMsg(object: ContentHash_RawAminoMsg): ContentHash_Raw {
    return ContentHash_Raw.fromAmino(object.value);
  },
  fromProtoMsg(message: ContentHash_RawProtoMsg, useInterfaces: boolean = false): ContentHash_Raw {
    return ContentHash_Raw.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ContentHash_Raw): Uint8Array {
    return ContentHash_Raw.encode(message).finish();
  },
  toProtoMsg(message: ContentHash_Raw): ContentHash_RawProtoMsg {
    return {
      typeUrl: "/regen.data.v2.Raw",
      value: ContentHash_Raw.encode(message).finish()
    };
  }
};
function createBaseContentHash_Graph(): ContentHash_Graph {
  return {
    hash: new Uint8Array(),
    digestAlgorithm: 0,
    canonicalizationAlgorithm: 0,
    merkleTree: 0
  };
}
export const ContentHash_Graph = {
  typeUrl: "/regen.data.v2.Graph",
  encode(message: ContentHash_Graph, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.hash.length !== 0) {
      writer.uint32(10).bytes(message.hash);
    }
    if (message.digestAlgorithm !== 0) {
      writer.uint32(16).uint32(message.digestAlgorithm);
    }
    if (message.canonicalizationAlgorithm !== 0) {
      writer.uint32(24).uint32(message.canonicalizationAlgorithm);
    }
    if (message.merkleTree !== 0) {
      writer.uint32(32).uint32(message.merkleTree);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ContentHash_Graph {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseContentHash_Graph();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hash = reader.bytes();
          break;
        case 2:
          message.digestAlgorithm = reader.uint32();
          break;
        case 3:
          message.canonicalizationAlgorithm = reader.uint32();
          break;
        case 4:
          message.merkleTree = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ContentHash_Graph>): ContentHash_Graph {
    const message = createBaseContentHash_Graph();
    message.hash = object.hash ?? new Uint8Array();
    message.digestAlgorithm = object.digestAlgorithm ?? 0;
    message.canonicalizationAlgorithm = object.canonicalizationAlgorithm ?? 0;
    message.merkleTree = object.merkleTree ?? 0;
    return message;
  },
  fromAmino(object: ContentHash_GraphAmino): ContentHash_Graph {
    const message = createBaseContentHash_Graph();
    if (object.hash !== undefined && object.hash !== null) {
      message.hash = bytesFromBase64(object.hash);
    }
    if (object.digest_algorithm !== undefined && object.digest_algorithm !== null) {
      message.digestAlgorithm = object.digest_algorithm;
    }
    if (object.canonicalization_algorithm !== undefined && object.canonicalization_algorithm !== null) {
      message.canonicalizationAlgorithm = object.canonicalization_algorithm;
    }
    if (object.merkle_tree !== undefined && object.merkle_tree !== null) {
      message.merkleTree = object.merkle_tree;
    }
    return message;
  },
  toAmino(message: ContentHash_Graph, useInterfaces: boolean = false): ContentHash_GraphAmino {
    const obj: any = {};
    obj.hash = message.hash ? base64FromBytes(message.hash) : undefined;
    obj.digest_algorithm = message.digestAlgorithm;
    obj.canonicalization_algorithm = message.canonicalizationAlgorithm;
    obj.merkle_tree = message.merkleTree;
    return obj;
  },
  fromAminoMsg(object: ContentHash_GraphAminoMsg): ContentHash_Graph {
    return ContentHash_Graph.fromAmino(object.value);
  },
  fromProtoMsg(message: ContentHash_GraphProtoMsg, useInterfaces: boolean = false): ContentHash_Graph {
    return ContentHash_Graph.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ContentHash_Graph): Uint8Array {
    return ContentHash_Graph.encode(message).finish();
  },
  toProtoMsg(message: ContentHash_Graph): ContentHash_GraphProtoMsg {
    return {
      typeUrl: "/regen.data.v2.Graph",
      value: ContentHash_Graph.encode(message).finish()
    };
  }
};
function createBaseContentHashes(): ContentHashes {
  return {
    contentHashes: []
  };
}
export const ContentHashes = {
  typeUrl: "/regen.data.v2.ContentHashes",
  encode(message: ContentHashes, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.contentHashes) {
      ContentHash.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): ContentHashes {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseContentHashes();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.contentHashes.push(ContentHash.decode(reader, reader.uint32(), useInterfaces));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ContentHashes>): ContentHashes {
    const message = createBaseContentHashes();
    message.contentHashes = object.contentHashes?.map(e => ContentHash.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: ContentHashesAmino): ContentHashes {
    const message = createBaseContentHashes();
    message.contentHashes = object.content_hashes?.map(e => ContentHash.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: ContentHashes, useInterfaces: boolean = false): ContentHashesAmino {
    const obj: any = {};
    if (message.contentHashes) {
      obj.content_hashes = message.contentHashes.map(e => e ? ContentHash.toAmino(e, useInterfaces) : undefined);
    } else {
      obj.content_hashes = [];
    }
    return obj;
  },
  fromAminoMsg(object: ContentHashesAminoMsg): ContentHashes {
    return ContentHashes.fromAmino(object.value);
  },
  fromProtoMsg(message: ContentHashesProtoMsg, useInterfaces: boolean = false): ContentHashes {
    return ContentHashes.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: ContentHashes): Uint8Array {
    return ContentHashes.encode(message).finish();
  },
  toProtoMsg(message: ContentHashes): ContentHashesProtoMsg {
    return {
      typeUrl: "/regen.data.v2.ContentHashes",
      value: ContentHashes.encode(message).finish()
    };
  }
};