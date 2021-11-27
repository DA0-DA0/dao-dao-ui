import { VoterDetail } from "./shared-types";

export interface VoterListResponse {
voters: VoterDetail[]
[k: string]: unknown
}
