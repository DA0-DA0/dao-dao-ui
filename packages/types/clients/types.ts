import { Coin } from '../contracts'

export type { ModuleInstantiateInfo } from '../contracts'
export type { ModuleInstantiateInfo as SecretModuleInstantiateInfo } from '../contracts/SecretDaoDaoCore'

export type InstantiateInfo = {
  admin: string | null
  codeId: number
  label: string
  msg: string
  funds: Coin[]
}

export type SecretInstantiateInfo = InstantiateInfo & {
  codeHash: string
}
