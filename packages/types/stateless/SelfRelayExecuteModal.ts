import { ExecuteResult } from '@cosmjs/cosmwasm-stargate'

import { ModalProps } from './Modal'

export type SelfRelayExecuteModalProps = Pick<
  ModalProps,
  'onClose' | 'visible'
> & {
  chainIds: string[]
  execute: () => Promise<ExecuteResult>
  onSuccess: () => void
}
