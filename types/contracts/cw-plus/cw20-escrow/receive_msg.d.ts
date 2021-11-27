import { CreateMsg } from "./shared-types";

export type ReceiveMsg = ({
create: CreateMsg
} | {
top_up: {
id: string
[k: string]: unknown
}
})
