import { Binary } from './common'

export type ExecuteMsg =
  | {
      instantiate_contract_with_self_admin: {
        code_id: number
        instantiate_msg: Binary
        label: string
      }
    }
  | {
      instantiate2_contract_with_self_admin: {
        code_id: number
        instantiate_msg: Binary
        label: string
        salt: Binary
        expect?: string | null
      }
    }
export interface InstantiateMsg {}
