export type QueryMsg = ({
list: {
limit?: (number | null)
start_after?: (string | null)
[k: string]: unknown
}
} | {
details: {
id: string
[k: string]: unknown
}
})
