export type Cw4ExecuteMsg = ({
update_admin: {
admin?: (string | null)
[k: string]: unknown
}
} | {
add_hook: {
addr: string
[k: string]: unknown
}
} | {
remove_hook: {
addr: string
[k: string]: unknown
}
})
