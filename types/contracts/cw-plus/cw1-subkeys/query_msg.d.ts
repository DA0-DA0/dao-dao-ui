import { CosmosMsgFor_Empty } from "./shared-types";

export type QueryMsg = ({
admin_list: {
[k: string]: unknown
}
} | {
allowance: {
spender: string
[k: string]: unknown
}
} | {
permissions: {
spender: string
[k: string]: unknown
}
} | {
can_execute: {
msg: CosmosMsgFor_Empty
sender: string
[k: string]: unknown
}
} | {
all_allowances: {
limit?: (number | null)
start_after?: (string | null)
[k: string]: unknown
}
} | {
all_permissions: {
limit?: (number | null)
start_after?: (string | null)
[k: string]: unknown
}
})
