export type QueryMsg = ({
config: {
[k: string]: unknown
}
} | {
merkle_root: {
stage: number
[k: string]: unknown
}
} | {
latest_stage: {
[k: string]: unknown
}
} | {
is_claimed: {
address: string
stage: number
[k: string]: unknown
}
})
