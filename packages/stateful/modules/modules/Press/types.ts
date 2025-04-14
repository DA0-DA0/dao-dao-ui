export type PressData = {
  // Which chain the contract exists on. If undefined, the chain is the same as
  // the DAO's native chain. This fallback ensures backwards compatibility with
  // presses that were setup before polytone accounts existed.
  chainId?: string
  // NFT collection contract address.
  contract: string
}

export type Post = {
  // Unique ID of the post, which is the IPFS CID.
  id: string
  // Title of the post.
  title: string
  // Description of the post.
  description?: string
  // Markdown content of the post.
  content: string
  // An optional header image to display above the title.
  image?: string
  // The date the post was created (i.e. proposed).
  created: Date
  // The earlier versions of this post.
  pastVersions: PostVersion[]
  // The first date the post was created (i.e. proposed). This is either the
  // post's `created` date or the earliest `created` date of any of its
  // `pastVersions`.
  initiallyCreated: Date
}

export type PostVersion = {
  // The ID of the post.
  id: string
  // The date the post version was created (i.e. proposed).
  created: Date
}
