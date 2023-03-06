import { Binary, Expiration, Uint128 } from './common'
import { InstantiateMsg as VestingInstantiateMsg } from './CwVesting'

export type InstantiateMsg = {
  owner?: string | null
  vesting_code_id: number
}
export type InstantiateNativePayrollContractMsg = {
  instantiate_msg: VestingInstantiateMsg
  label: string
}
export type ExecuteMsg =
  | {
      receive: Cw20ReceiveMsg
    }
  | {
      instantiate_native_payroll_contract: InstantiateNativePayrollContractMsg
    }
  | {
      update_code_id: {
        vesting_code_id: number
      }
    }
  | {
      update_ownership: Action
    }
type Action =
  | {
      transfer_ownership: {
        expiry?: Expiration | null
        new_owner: string
      }
    }
  | 'accept_ownership'
  | 'renounce_ownership'
interface Cw20ReceiveMsg {
  amount: Uint128
  msg: Binary
  sender: string
}
export type QueryMsg =
  | {
      list_vesting_contracts: {
        limit?: number | null
        start_after?: string | null
      }
    }
  | {
      list_vesting_contracts_reverse: {
        limit?: number | null
        start_before?: string | null
      }
    }
  | {
      list_vesting_contracts_by_instantiator: {
        instantiator: string
        limit?: number | null
        start_after?: string | null
      }
    }
  | {
      list_vesting_contracts_by_instantiator_reverse: {
        instantiator: string
        limit?: number | null
        start_before?: string | null
      }
    }
  | {
      list_vesting_contracts_by_recipient: {
        limit?: number | null
        recipient: string
        start_after?: string | null
      }
    }
  | {
      list_vesting_contracts_by_recipient_reverse: {
        limit?: number | null
        recipient: string
        start_before?: string | null
      }
    }
  | {
      ownership: {}
    }
  | {
      code_id: {}
    }
export type ArrayOfVestingContract = VestingContract[]
interface VestingContract {
  contract: string
  instantiator: string
  recipient: string
}
