export interface AdminResponse {
  admin?: string | null
}
export interface HooksResponse {
  hooks: string[]
}
export interface InstantiateMsg {
  admin?: string | null
  members: Member[]
}
export interface Member {
  addr: string
  weight: number
}
export interface ListMembersResponse {
  members: Member[]
}
export interface MemberResponse {
  weight?: number | null
}
export interface TotalWeightResponse {
  weight: number
}
