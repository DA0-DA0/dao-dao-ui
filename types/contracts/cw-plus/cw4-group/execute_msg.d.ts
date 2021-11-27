import { Member } from "./shared-types";

export type ExecuteMsg = ({
update_admin: {
admin?: (string | null)
[k: string]: unknown
}
} | {
update_members: {
add: Member[]
remove: string[]
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
