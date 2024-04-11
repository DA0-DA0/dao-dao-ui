import { BinaryReader, BinaryWriter } from "../../../binary";
import { bytesFromBase64, base64FromBytes } from "../../../helpers";
export interface SeedConfig {
  masterKey: string;
  encryptedKey: string;
  version: number;
}
export interface SeedConfigProtoMsg {
  typeUrl: "/secret.registration.v1beta1.SeedConfig";
  value: Uint8Array;
}
export interface SeedConfigAmino {
  master_key?: string;
  encrypted_key?: string;
  version?: number;
}
export interface SeedConfigAminoMsg {
  type: "/secret.registration.v1beta1.SeedConfig";
  value: SeedConfigAmino;
}
export interface SeedConfigSDKType {
  master_key: string;
  encrypted_key: string;
  version: number;
}
export interface LegacySeedConfig {
  masterCert: string;
  encryptedKey: string;
}
export interface LegacySeedConfigProtoMsg {
  typeUrl: "/secret.registration.v1beta1.LegacySeedConfig";
  value: Uint8Array;
}
export interface LegacySeedConfigAmino {
  master_cert?: string;
  encrypted_key?: string;
}
export interface LegacySeedConfigAminoMsg {
  type: "/secret.registration.v1beta1.LegacySeedConfig";
  value: LegacySeedConfigAmino;
}
export interface LegacySeedConfigSDKType {
  master_cert: string;
  encrypted_key: string;
}
export interface RegistrationNodeInfo {
  certificate: Uint8Array;
  encryptedSeed: Uint8Array;
}
export interface RegistrationNodeInfoProtoMsg {
  typeUrl: "/secret.registration.v1beta1.RegistrationNodeInfo";
  value: Uint8Array;
}
export interface RegistrationNodeInfoAmino {
  certificate?: string;
  encrypted_seed?: string;
}
export interface RegistrationNodeInfoAminoMsg {
  type: "/secret.registration.v1beta1.RegistrationNodeInfo";
  value: RegistrationNodeInfoAmino;
}
export interface RegistrationNodeInfoSDKType {
  certificate: Uint8Array;
  encrypted_seed: Uint8Array;
}
function createBaseSeedConfig(): SeedConfig {
  return {
    masterKey: "",
    encryptedKey: "",
    version: 0
  };
}
export const SeedConfig = {
  typeUrl: "/secret.registration.v1beta1.SeedConfig",
  encode(message: SeedConfig, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.masterKey !== "") {
      writer.uint32(10).string(message.masterKey);
    }
    if (message.encryptedKey !== "") {
      writer.uint32(18).string(message.encryptedKey);
    }
    if (message.version !== 0) {
      writer.uint32(24).uint32(message.version);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): SeedConfig {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSeedConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.masterKey = reader.string();
          break;
        case 2:
          message.encryptedKey = reader.string();
          break;
        case 3:
          message.version = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<SeedConfig>): SeedConfig {
    const message = createBaseSeedConfig();
    message.masterKey = object.masterKey ?? "";
    message.encryptedKey = object.encryptedKey ?? "";
    message.version = object.version ?? 0;
    return message;
  },
  fromAmino(object: SeedConfigAmino): SeedConfig {
    const message = createBaseSeedConfig();
    if (object.master_key !== undefined && object.master_key !== null) {
      message.masterKey = object.master_key;
    }
    if (object.encrypted_key !== undefined && object.encrypted_key !== null) {
      message.encryptedKey = object.encrypted_key;
    }
    if (object.version !== undefined && object.version !== null) {
      message.version = object.version;
    }
    return message;
  },
  toAmino(message: SeedConfig, useInterfaces: boolean = false): SeedConfigAmino {
    const obj: any = {};
    obj.master_key = message.masterKey;
    obj.encrypted_key = message.encryptedKey;
    obj.version = message.version;
    return obj;
  },
  fromAminoMsg(object: SeedConfigAminoMsg): SeedConfig {
    return SeedConfig.fromAmino(object.value);
  },
  fromProtoMsg(message: SeedConfigProtoMsg, useInterfaces: boolean = false): SeedConfig {
    return SeedConfig.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: SeedConfig): Uint8Array {
    return SeedConfig.encode(message).finish();
  },
  toProtoMsg(message: SeedConfig): SeedConfigProtoMsg {
    return {
      typeUrl: "/secret.registration.v1beta1.SeedConfig",
      value: SeedConfig.encode(message).finish()
    };
  }
};
function createBaseLegacySeedConfig(): LegacySeedConfig {
  return {
    masterCert: "",
    encryptedKey: ""
  };
}
export const LegacySeedConfig = {
  typeUrl: "/secret.registration.v1beta1.LegacySeedConfig",
  encode(message: LegacySeedConfig, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.masterCert !== "") {
      writer.uint32(10).string(message.masterCert);
    }
    if (message.encryptedKey !== "") {
      writer.uint32(18).string(message.encryptedKey);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): LegacySeedConfig {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLegacySeedConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.masterCert = reader.string();
          break;
        case 2:
          message.encryptedKey = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<LegacySeedConfig>): LegacySeedConfig {
    const message = createBaseLegacySeedConfig();
    message.masterCert = object.masterCert ?? "";
    message.encryptedKey = object.encryptedKey ?? "";
    return message;
  },
  fromAmino(object: LegacySeedConfigAmino): LegacySeedConfig {
    const message = createBaseLegacySeedConfig();
    if (object.master_cert !== undefined && object.master_cert !== null) {
      message.masterCert = object.master_cert;
    }
    if (object.encrypted_key !== undefined && object.encrypted_key !== null) {
      message.encryptedKey = object.encrypted_key;
    }
    return message;
  },
  toAmino(message: LegacySeedConfig, useInterfaces: boolean = false): LegacySeedConfigAmino {
    const obj: any = {};
    obj.master_cert = message.masterCert;
    obj.encrypted_key = message.encryptedKey;
    return obj;
  },
  fromAminoMsg(object: LegacySeedConfigAminoMsg): LegacySeedConfig {
    return LegacySeedConfig.fromAmino(object.value);
  },
  fromProtoMsg(message: LegacySeedConfigProtoMsg, useInterfaces: boolean = false): LegacySeedConfig {
    return LegacySeedConfig.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: LegacySeedConfig): Uint8Array {
    return LegacySeedConfig.encode(message).finish();
  },
  toProtoMsg(message: LegacySeedConfig): LegacySeedConfigProtoMsg {
    return {
      typeUrl: "/secret.registration.v1beta1.LegacySeedConfig",
      value: LegacySeedConfig.encode(message).finish()
    };
  }
};
function createBaseRegistrationNodeInfo(): RegistrationNodeInfo {
  return {
    certificate: new Uint8Array(),
    encryptedSeed: new Uint8Array()
  };
}
export const RegistrationNodeInfo = {
  typeUrl: "/secret.registration.v1beta1.RegistrationNodeInfo",
  encode(message: RegistrationNodeInfo, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.certificate.length !== 0) {
      writer.uint32(10).bytes(message.certificate);
    }
    if (message.encryptedSeed.length !== 0) {
      writer.uint32(18).bytes(message.encryptedSeed);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number, useInterfaces: boolean = false): RegistrationNodeInfo {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegistrationNodeInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.certificate = reader.bytes();
          break;
        case 2:
          message.encryptedSeed = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<RegistrationNodeInfo>): RegistrationNodeInfo {
    const message = createBaseRegistrationNodeInfo();
    message.certificate = object.certificate ?? new Uint8Array();
    message.encryptedSeed = object.encryptedSeed ?? new Uint8Array();
    return message;
  },
  fromAmino(object: RegistrationNodeInfoAmino): RegistrationNodeInfo {
    const message = createBaseRegistrationNodeInfo();
    if (object.certificate !== undefined && object.certificate !== null) {
      message.certificate = bytesFromBase64(object.certificate);
    }
    if (object.encrypted_seed !== undefined && object.encrypted_seed !== null) {
      message.encryptedSeed = bytesFromBase64(object.encrypted_seed);
    }
    return message;
  },
  toAmino(message: RegistrationNodeInfo, useInterfaces: boolean = false): RegistrationNodeInfoAmino {
    const obj: any = {};
    obj.certificate = message.certificate ? base64FromBytes(message.certificate) : undefined;
    obj.encrypted_seed = message.encryptedSeed ? base64FromBytes(message.encryptedSeed) : undefined;
    return obj;
  },
  fromAminoMsg(object: RegistrationNodeInfoAminoMsg): RegistrationNodeInfo {
    return RegistrationNodeInfo.fromAmino(object.value);
  },
  fromProtoMsg(message: RegistrationNodeInfoProtoMsg, useInterfaces: boolean = false): RegistrationNodeInfo {
    return RegistrationNodeInfo.decode(message.value, undefined, useInterfaces);
  },
  toProto(message: RegistrationNodeInfo): Uint8Array {
    return RegistrationNodeInfo.encode(message).finish();
  },
  toProtoMsg(message: RegistrationNodeInfo): RegistrationNodeInfoProtoMsg {
    return {
      typeUrl: "/secret.registration.v1beta1.RegistrationNodeInfo",
      value: RegistrationNodeInfo.encode(message).finish()
    };
  }
};