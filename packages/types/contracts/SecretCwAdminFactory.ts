export interface InstantiateMsg {}
export type ExecuteMsg = {
  instantiate_contract_with_self_admin: {
    instantiate_msg: Binary
    code_id: number
    code_hash: string
    label: string
  }
}
export type Uint128 = string
export type Binary = string
export interface Coin {
  amount: Uint128
  denom: string
}
export type QueryMsg = string
export interface MigrateMsg {}
