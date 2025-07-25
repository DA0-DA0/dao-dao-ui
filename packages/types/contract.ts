import { ContractVersionInfo } from './contracts'

export type ContractSummary = {
  chainId: string
  address: string
  creator: string
  admin?: string | null
  label: string
  codeId: number
  info?: ContractVersionInfo
}

export type QuerierForm = {
  contractAddress: string
  query: any
}
