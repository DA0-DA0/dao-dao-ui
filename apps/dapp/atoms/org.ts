import { atom } from 'recoil'

enum VotingDurationType {
  Seconds,
  Minutes,
  Hours,
  Days,
  Weeks,
  Months,
}

export interface NewOrg {
  name: string
  description?: string
  imageUrl?: string
  groups: NewOrgGroup[]
  votingDuration: number
  votingDurationType: VotingDurationType
}

export interface NewOrgGroup {
  name: string
  weight: number
  members: NewOrgGroupMember[]
}

export interface NewOrgGroupMember {
  address: string
  proportion: number
}

export const newOrgAtom = atom<Partial<NewOrg>>({
  key: 'newOrg',
  default: {},
})
