import { ComponentType, ReactNode, RefCallback } from 'react'

import { KadoModalProps } from './KadoModal'
import { ModalProps } from './Modal'

export interface RightSidebarProps {
  wallet: ReactNode
  setContentRef: RefCallback<HTMLDivElement>
  // Present if wallet connected, otherwise undefined.
  WalletFiatRampModal?: ComponentType<
    Pick<ModalProps, 'onClose' | 'visible'> &
      Pick<KadoModalProps, 'defaultMode'>
  >
}

export interface RightSidebarContentProps {
  children: ReactNode
}
