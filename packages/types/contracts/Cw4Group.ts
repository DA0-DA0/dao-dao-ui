export interface AdminResponse {
  admin?: string | null
  [k: string]: unknown
}
export interface HooksResponse {
  hooks: string[]
  [k: string]: unknown
}
export interface InstantiateMsg {
  admin?: string | null
  members: Member[]
  [k: string]: unknown
}
export interface Member {
  addr: string
  weight: number
  [k: string]: unknown
}
export interface ListMembersResponse {
  members: Member[]
  [k: string]: unknown
}
export interface MemberResponse {
  weight?: number | null
  [k: string]: unknown
}
export interface TotalWeightResponse {
  weight: number
  [k: string]: unknown
}
