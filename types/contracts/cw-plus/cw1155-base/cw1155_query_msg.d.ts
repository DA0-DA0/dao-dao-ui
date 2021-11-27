export type Cw1155QueryMsg = ({
balance: {
owner: string
token_id: string
[k: string]: unknown
}
} | {
batch_balance: {
owner: string
token_ids: string[]
[k: string]: unknown
}
} | {
approved_for_all: {
/**
 * unset or false will filter out expired approvals, you must set to true to see them
 */
include_expired?: (boolean | null)
limit?: (number | null)
owner: string
start_after?: (string | null)
[k: string]: unknown
}
} | {
is_approved_for_all: {
operator: string
owner: string
[k: string]: unknown
}
} | {
token_info: {
token_id: string
[k: string]: unknown
}
} | {
tokens: {
limit?: (number | null)
owner: string
start_after?: (string | null)
[k: string]: unknown
}
} | {
all_tokens: {
limit?: (number | null)
start_after?: (string | null)
[k: string]: unknown
}
})
