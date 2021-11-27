export interface MemberListResponse {
members: Member[]
[k: string]: unknown
}
/**
 * A group member has a weight associated with them. This may all be equal, or may have meaning in the app that makes use of the group (eg. voting power)
 */
export interface Member {
addr: string
weight: number
[k: string]: unknown
}
