import { Binary } from './common'

export type ExecuteMsg = {
  instantiate_contract_with_self_admin: {
    code_id: number
    instantiate_msg: Binary
    label: string
    [k: string]: unknown
  }
}
export interface InstantiateMsg {}
