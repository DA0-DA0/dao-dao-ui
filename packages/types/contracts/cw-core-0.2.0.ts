import { Binary } from './common'

export type Admin =
  | {
      address: {
        addr: string
      }
    }
  | {
      core_contract: {}
    }
  | {
      none: {}
    }

export interface ModuleInstantiateInfo {
  admin: Admin
  code_id: number
  label: string
  msg: Binary
}

export type InitialItemInfo =
  | {
      Existing: {
        address: string
      }
    }
  | {
      Instantiate: {
        info: ModuleInstantiateInfo
      }
    }

export interface InitialItem {
  info: InitialItemInfo
  name: string
}

export interface CwCoreV0_2_0InstantiateMsg {
  admin?: string | null
  automatically_add_cw20s: boolean
  automatically_add_cw721s: boolean
  description: string
  image_url?: string | null
  initial_items?: InitialItem[] | null
  name: string
  proposal_modules_instantiate_info: ModuleInstantiateInfo[]
  voting_module_instantiate_info: ModuleInstantiateInfo
}
