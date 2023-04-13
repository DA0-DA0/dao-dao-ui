export type PressData = {
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
  headerImage?: string
  // The date the post was created (i.e. proposed).
  created: Date
  // This is used to order the posts in the UI. It is initially set to the
  // epoch time when the post is created, however when a post is edited, the old
  // one is destroyed and a new one is created. To preserve the order, the new
  // post will have the same order as the old one.
  order: number
  // The IDs of earlier versions of this post.
  pastVersions: string[]
}
