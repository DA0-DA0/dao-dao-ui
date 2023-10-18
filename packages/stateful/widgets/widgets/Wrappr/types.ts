export type WrapprData = {
  // Wrappr  contract address.
  contract: string
}

// export type Wrappr = {
//   // Unique ID of the wrappr, which is the IPFS CID.
//   id: string
//   // Name of the post.
//   title: string
//   // Entity type of the Wrappr.
//   entity: string 
//   // Jurisdiction of the Wrappr.
//   jurisdiction: string
//   // Description of the Wrappr.
//   description?: string
//   // Markdown content of the Wrappr.
//   content: string
//   // An optional header image to display above the title.
//   image?: string
//   // The date the Wrappr was created (i.e. proposed).
//   created: Date
//   // The earlier versions of this Wrappr.
//   pastVersions: WrapprVersion[]
//   // The first date the Wrappr was created (i.e. proposed). This is either the
//   // Wrapprs's `created` date or the earliest `created` date of any of its
//   // `pastVersions`.
//   initiallyCreated: Date
// }

export type WrapprVersion = {
  // The ID of the Wrappr.
  id: string
  // The date the Wrappr version was created (i.e. proposed).
  created: Date
}

// general types for Wrappr Widget
export interface Contracts {
  testnet?: boolean
  factory: string
  deLLC: string
  wyLLC: string
  miLLC: string
  deUNA: string
  wyUNA: string
  lexCharter: string
  orCharter: string
  subgraph?: string
}

export type Wrappr = {
  id: string
  name: string
  baseURI: string
  mintFee: string
}

export type WrapprLong = {
  id: string
  name: string
  symbol: string
  baseURI: string
  mintFee: string
  admin: string
}

// create wrappr template keys

export type Create = {
  image: FileList
  name: string
  symbol: string
  description: string
  admin: string
  mintFee: number
  baseURI: string
  agreement: FileList
  attributes: {
      trait_type: string
      value: string
  }[]
}

export interface Templates {
  [key: string]: string[]
}

export const templates: Templates = {
  deLLC: ['name', 'ricardianId'],
  wyLLC: ['name', 'ricardianId'],
  deUNA: ['name', 'ricardianId', 'mission'],
  wyUNA: ['name', 'ricardianId', 'mission'],
  lexCharter: ['name', 'ricardianId', 'mission', 'jurisdiction'],
}