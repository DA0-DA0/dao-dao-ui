import { ModalProps } from './Modal'

export type KadoModalProps = Omit<ModalProps, 'children'> & {
  chainId: string
  // This determines which Kado tab to show by default.
  defaultMode?: 'buy' | 'sell'
  // This prefills in the destination address.
  toAddress?: string
}

export type DaoFiatDepositModalProps = Omit<
  KadoModalProps,
  'header' | 'defaultMode' | 'toAddress'
>
