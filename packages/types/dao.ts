export interface NewDao {
  name: string
  description: string
  imageUrl?: string
  votingModuleAdapter: {
    id: string
    data: any
  }
  proposalModuleAdapters: {
    id: string
    data: any
  }[]
  advancedVotingConfigEnabled: boolean
}
