import { CosmosMsgForEmpty } from './common'

export type ExecuteMsg = {
  proxy: {
    msgs: CosmosMsgForEmpty[]
  }
}
export type QueryMsg = {
  instantiator: {}
}
