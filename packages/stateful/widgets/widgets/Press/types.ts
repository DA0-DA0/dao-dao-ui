export type PressData = {
  contract: string
}

export type Post = {
  id: string
  title: string
  content: string
  headerImage?: string
  lastUpdated: Date
}

export type CreatePostData = {
  tokenId: string
  tokenUri: string
  // Used while creating, uploaded to IPFS.
  uploaded: boolean
  data?: {
    title: string
    description: string
    content: string
    order: number
  }
}
