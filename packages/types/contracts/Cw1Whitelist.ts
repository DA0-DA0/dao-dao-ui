import { CosmosMsgForEmpty } from './common'

export interface InstantiateMsg {
  admins: string[]
  mutable: boolean
}
export type ExecuteMsg =
  | {
      execute: {
        msgs: CosmosMsgForEmpty[]
      }
    }
  | {
      freeze: {}
    }
  | {
      update_admins: {
        admins: string[]
      }
    }
export type QueryMsg =
  | {
      admin_list: {}
    }
  | {
      can_execute: {
        msg: CosmosMsgForEmpty
        sender: string
      }
    }
export interface AdminListResponse {
  admins: string[]
  mutable: boolean
}
export interface CanExecuteResponse {
  can_execute: boolean
}
