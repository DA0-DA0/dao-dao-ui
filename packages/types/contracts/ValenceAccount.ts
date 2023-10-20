import { Binary, CosmosMsgForEmpty } from './common'

export interface InstantiateMsg {
  services_manager: string
}
export type ExecuteMsg =
  | {
      register_to_service: {
        data?: Binary | null
        service_name: ValenceServices
      }
    }
  | {
      deregister_from_service: {
        service_name: ValenceServices
      }
    }
  | {
      update_service: {
        data: Binary
        service_name: ValenceServices
      }
    }
  | {
      pause_service: {
        service_name: ValenceServices
      }
    }
  | {
      resume_service: {
        service_name: ValenceServices
      }
    }
  | {
      send_funds_by_service: {
        atomic: boolean
        msgs: CosmosMsgForEmpty[]
      }
    }
  | {
      execute_by_service: {
        atomic: boolean
        msgs: CosmosMsgForEmpty[]
      }
    }
  | {
      execute_by_admin: {
        msgs: CosmosMsgForEmpty[]
      }
    }
export type ValenceServices = 'rebalancer' | 'test'
export type QueryMsg = string
