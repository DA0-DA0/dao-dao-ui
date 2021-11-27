import { CosmosMsgFor_Empty } from "./shared-types";

export type QueryMsg = {
can_execute: {
msg: CosmosMsgFor_Empty
sender: string
[k: string]: unknown
}
}
