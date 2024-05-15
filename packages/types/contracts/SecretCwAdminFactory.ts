export interface InstantiateMsg {}
export type ExecuteMsg = {
  instantiate_contract_with_self_admin: {
    module_info: ModuleInstantiateInfo
  }
}
export type Admin =
  | {
      address: {
        addr: string
      }
    }
  | {
      core_module: {}
    }
export type Uint128 = string
export type Binary = string
export interface ModuleInstantiateInfo {
  admin?: Admin | null
  code_hash: string
  code_id: number
  funds: Coin[]
  label: string
  msg: Binary
}
export interface Coin {
  amount: Uint128
  denom: string
}
export type QueryMsg = string
export interface MigrateMsg {}
