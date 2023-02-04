import { ModalProps } from './Modal'

export type KadoModalProps = Omit<ModalProps, 'children'> & {
  // This determines which Kado tab to show by default.
  defaultMode?: 'buy' | 'sell'
  // This prefills in the destination address.
  toAddress?: string
}
