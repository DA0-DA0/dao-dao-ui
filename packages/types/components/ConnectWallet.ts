import { ButtonProps } from './Buttonifier'

export type ConnectWalletProps = Partial<Omit<ButtonProps, 'onClick'>> & {
  onConnect?: () => void
  className?: string
}

export type StatefulConnectWalletProps = Omit<
  ConnectWalletProps,
  'loading' | 'onConnect'
>
