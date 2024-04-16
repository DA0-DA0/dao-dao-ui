import { BinaryReader, BinaryWriter } from "../../binary";
/**
 * DenomAuthorityMetadata specifies metadata for addresses that have specific
 * capabilities over a token factory denom. Right now there is only one Admin
 * permission, but is planned to be extended to the future.
 */
export interface DenomAuthorityMetadata {
  /** Can be empty for no admin, or a valid kujira address */
  Admin: string;
}
export interface DenomAuthorityMetadataProtoMsg {
  typeUrl: "/kujira.denom.DenomAuthorityMetadata";
  value: Uint8Array;
}
/**
 * DenomAuthorityMetadata specifies metadata for addresses that have specific
 * capabilities over a token factory denom. Right now there is only one Admin
 * permission, but is planned to be extended to the future.
 */
export interface DenomAuthorityMetadataAmino {
  /** Can be empty for no admin, or a valid kujira address */
  Admin?: string;
}
export interface DenomAuthorityMetadataAminoMsg {
  type: "/kujira.denom.DenomAuthorityMetadata";
  value: DenomAuthorityMetadataAmino;
}
/**
 * DenomAuthorityMetadata specifies metadata for addresses that have specific
 * capabilities over a token factory denom. Right now there is only one Admin
 * permission, but is planned to be extended to the future.
 */
export interface DenomAuthorityMetadataSDKType {
  Admin: string;
}
function createBaseDenomAuthorityMetadata(): DenomAuthorityMetadata {
  return {
    Admin: ""
  };
}
export const DenomAuthorityMetadata = {
  typeUrl: "/kujira.denom.DenomAuthorityMetadata",
  encode(message: DenomAuthorityMetadata, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.Admin !== "") {
      writer.uint32(10).string(message.Admin);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): DenomAuthorityMetadata {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDenomAuthorityMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Admin = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<DenomAuthorityMetadata>): DenomAuthorityMetadata {
    const message = createBaseDenomAuthorityMetadata();
    message.Admin = object.Admin ?? "";
    return message;
  },
  fromAmino(object: DenomAuthorityMetadataAmino): DenomAuthorityMetadata {
    const message = createBaseDenomAuthorityMetadata();
    if (object.Admin !== undefined && object.Admin !== null) {
      message.Admin = object.Admin;
    }
    return message;
  },
  toAmino(message: DenomAuthorityMetadata, useInterfaces: boolean = false): DenomAuthorityMetadataAmino {
    const obj: any = {};
    obj.Admin = message.Admin;
    return obj;
  },
  fromAminoMsg(object: DenomAuthorityMetadataAminoMsg): DenomAuthorityMetadata {
    return DenomAuthorityMetadata.fromAmino(object.value);
  },
  fromProtoMsg(message: DenomAuthorityMetadataProtoMsg, useInterfaces: boolean = false): DenomAuthorityMetadata {
    return DenomAuthorityMetadata.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: DenomAuthorityMetadata): Uint8Array {
    return DenomAuthorityMetadata.encode(message).finish();
  },
  toProtoMsg(message: DenomAuthorityMetadata): DenomAuthorityMetadataProtoMsg {
    return {
      typeUrl: "/kujira.denom.DenomAuthorityMetadata",
      value: DenomAuthorityMetadata.encode(message).finish()
    };
  }
};