import { CosmosMsgFor_Empty } from "./shared-types";

export type ExecuteMsg = {
execute: {
msgs: CosmosMsgFor_Empty[]
[k: string]: unknown
}
}
