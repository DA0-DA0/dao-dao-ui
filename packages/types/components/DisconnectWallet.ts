import { ButtonProps } from './Buttonifier'

export type DisconnectWalletProps = Partial<Omit<ButtonProps, 'onClick'>> & {
  onDisconnect?: () => void
  className?: string
}

export type StatefulDisconnectWalletProps = Omit<
  DisconnectWalletProps,
  'onDisconnect'
> & {
  afterDisconnect?: () => void
}
