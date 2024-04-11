import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { Empty } from "../../../google/protobuf/empty";
import { Key } from "./msg";
import { QueryEncryptedSeedRequest, QueryEncryptedSeedResponse } from "./query";
/** Query provides defines the gRPC querier service */
export interface Query {
  /** Returns the key used for transactions */
  txKey(request?: google.protobuf.Empty): Promise<Key>;
  /** Returns the key used for registration */
  registrationKey(request?: google.protobuf.Empty): Promise<Key>;
  /** Returns the encrypted seed for a registered node by public key */
  encryptedSeed(request: QueryEncryptedSeedRequest): Promise<QueryEncryptedSeedResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.txKey = this.txKey.bind(this);
    this.registrationKey = this.registrationKey.bind(this);
    this.encryptedSeed = this.encryptedSeed.bind(this);
  }
  txKey(request: google.protobuf.Empty = {}, useInterfaces: boolean = true): Promise<Key> {
    const data = google.protobuf.Empty.encode(request).finish();
    const promise = this.rpc.request("secret.registration.v1beta1.Query", "TxKey", data);
    return promise.then(data => Key.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  registrationKey(request: google.protobuf.Empty = {}, useInterfaces: boolean = true): Promise<Key> {
    const data = google.protobuf.Empty.encode(request).finish();
    const promise = this.rpc.request("secret.registration.v1beta1.Query", "RegistrationKey", data);
    return promise.then(data => Key.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  encryptedSeed(request: QueryEncryptedSeedRequest, useInterfaces: boolean = true): Promise<QueryEncryptedSeedResponse> {
    const data = QueryEncryptedSeedRequest.encode(request).finish();
    const promise = this.rpc.request("secret.registration.v1beta1.Query", "EncryptedSeed", data);
    return promise.then(data => QueryEncryptedSeedResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    txKey(request?: google.protobuf.Empty, useInterfaces: boolean = true): Promise<Key> {
      return queryService.txKey(request, useInterfaces);
    },
    registrationKey(request?: google.protobuf.Empty, useInterfaces: boolean = true): Promise<Key> {
      return queryService.registrationKey(request, useInterfaces);
    },
    encryptedSeed(request: QueryEncryptedSeedRequest, useInterfaces: boolean = true): Promise<QueryEncryptedSeedResponse> {
      return queryService.encryptedSeed(request, useInterfaces);
    }
  };
};