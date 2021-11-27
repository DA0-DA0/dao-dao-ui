export type WhitelistExecMsg = ({
freeze: {
[k: string]: unknown
}
} | {
update_admins: {
admins: string[]
[k: string]: unknown
}
})
