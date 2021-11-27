export type QueryMsg = ({
curve_info: {
[k: string]: unknown
}
} | {
balance: {
address: string
[k: string]: unknown
}
} | {
token_info: {
[k: string]: unknown
}
} | {
allowance: {
owner: string
spender: string
[k: string]: unknown
}
})
