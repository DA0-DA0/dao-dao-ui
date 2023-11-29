/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query collectionTokensQuery(\n    $collectionAddr: String!\n    $limit: Int\n    $offset: Int\n  ) {\n    tokens(collectionAddr: $collectionAddr, limit: $limit, offset: $offset) {\n      pageInfo {\n        limit\n        offset\n        total\n      }\n      tokens {\n        tokenId\n      }\n    }\n  }\n": types.CollectionTokensQueryDocument,
    "\n  query collectionTokensForOwnerQuery(\n    $collectionAddr: String!\n    $ownerAddrOrName: String!\n    $limit: Int\n    $offset: Int\n  ) {\n    tokens(\n      collectionAddr: $collectionAddr,\n      ownerAddrOrName: $ownerAddrOrName,\n      limit: $limit,\n      offset: $offset\n    ) {\n      pageInfo {\n        limit\n        offset\n        total\n      }\n      tokens {\n        tokenId\n      }\n    }\n  }\n": types.CollectionTokensForOwnerQueryDocument,
    "\n  query tokenQuery($collectionAddr: String!, $tokenId: String!) {\n    token(collectionAddr: $collectionAddr, tokenId: $tokenId) {\n      tokenId\n      collection {\n        contractAddress\n        name\n      }\n      media {\n        url\n        visualAssets {\n          lg {\n            url\n          }\n        }\n      }\n      name\n      description\n    }\n  }\n": types.TokenQueryDocument,
    "\n  query tokensForOwnerQuery(\n    $ownerAddrOrName: String!\n    $limit: Int\n    $offset: Int\n  ) {\n    tokens(\n      ownerAddrOrName: $ownerAddrOrName,\n      limit: $limit,\n      offset: $offset\n    ) {\n      pageInfo {\n        limit\n        offset\n        total\n      }\n      tokens {\n        tokenId\n        collection {\n          contractAddress\n          name\n        }\n        media {\n          url\n          visualAssets {\n            lg {\n              url\n            }\n          }\n        }\n        name\n        description\n      }\n    }\n  }\n": types.TokensForOwnerQueryDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query collectionTokensQuery(\n    $collectionAddr: String!\n    $limit: Int\n    $offset: Int\n  ) {\n    tokens(collectionAddr: $collectionAddr, limit: $limit, offset: $offset) {\n      pageInfo {\n        limit\n        offset\n        total\n      }\n      tokens {\n        tokenId\n      }\n    }\n  }\n"): (typeof documents)["\n  query collectionTokensQuery(\n    $collectionAddr: String!\n    $limit: Int\n    $offset: Int\n  ) {\n    tokens(collectionAddr: $collectionAddr, limit: $limit, offset: $offset) {\n      pageInfo {\n        limit\n        offset\n        total\n      }\n      tokens {\n        tokenId\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query collectionTokensForOwnerQuery(\n    $collectionAddr: String!\n    $ownerAddrOrName: String!\n    $limit: Int\n    $offset: Int\n  ) {\n    tokens(\n      collectionAddr: $collectionAddr,\n      ownerAddrOrName: $ownerAddrOrName,\n      limit: $limit,\n      offset: $offset\n    ) {\n      pageInfo {\n        limit\n        offset\n        total\n      }\n      tokens {\n        tokenId\n      }\n    }\n  }\n"): (typeof documents)["\n  query collectionTokensForOwnerQuery(\n    $collectionAddr: String!\n    $ownerAddrOrName: String!\n    $limit: Int\n    $offset: Int\n  ) {\n    tokens(\n      collectionAddr: $collectionAddr,\n      ownerAddrOrName: $ownerAddrOrName,\n      limit: $limit,\n      offset: $offset\n    ) {\n      pageInfo {\n        limit\n        offset\n        total\n      }\n      tokens {\n        tokenId\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query tokenQuery($collectionAddr: String!, $tokenId: String!) {\n    token(collectionAddr: $collectionAddr, tokenId: $tokenId) {\n      tokenId\n      collection {\n        contractAddress\n        name\n      }\n      media {\n        url\n        visualAssets {\n          lg {\n            url\n          }\n        }\n      }\n      name\n      description\n    }\n  }\n"): (typeof documents)["\n  query tokenQuery($collectionAddr: String!, $tokenId: String!) {\n    token(collectionAddr: $collectionAddr, tokenId: $tokenId) {\n      tokenId\n      collection {\n        contractAddress\n        name\n      }\n      media {\n        url\n        visualAssets {\n          lg {\n            url\n          }\n        }\n      }\n      name\n      description\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query tokensForOwnerQuery(\n    $ownerAddrOrName: String!\n    $limit: Int\n    $offset: Int\n  ) {\n    tokens(\n      ownerAddrOrName: $ownerAddrOrName,\n      limit: $limit,\n      offset: $offset\n    ) {\n      pageInfo {\n        limit\n        offset\n        total\n      }\n      tokens {\n        tokenId\n        collection {\n          contractAddress\n          name\n        }\n        media {\n          url\n          visualAssets {\n            lg {\n              url\n            }\n          }\n        }\n        name\n        description\n      }\n    }\n  }\n"): (typeof documents)["\n  query tokensForOwnerQuery(\n    $ownerAddrOrName: String!\n    $limit: Int\n    $offset: Int\n  ) {\n    tokens(\n      ownerAddrOrName: $ownerAddrOrName,\n      limit: $limit,\n      offset: $offset\n    ) {\n      pageInfo {\n        limit\n        offset\n        total\n      }\n      tokens {\n        tokenId\n        collection {\n          contractAddress\n          name\n        }\n        media {\n          url\n          visualAssets {\n            lg {\n              url\n            }\n          }\n        }\n        name\n        description\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;