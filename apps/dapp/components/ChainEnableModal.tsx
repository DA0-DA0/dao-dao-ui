import { FC } from 'react'

import { Button, Modal } from '@dao-dao/ui'
import { CHAIN_ID, CHAIN_NAME } from '@dao-dao/utils'

interface ChainEnableModalProps {
  onClose: () => void
  onAction: () => void
}

export const ChainEnableModal: FC<ChainEnableModalProps> = ({
  onClose,
  onAction,
}) => (
  <Modal onClose={onClose}>
    <h1 className="header-text">Add Chain &quot;{CHAIN_ID}&quot;</h1>
    <p className="mt-6 body-text">
      This application is running on the {CHAIN_NAME} <code>{CHAIN_ID}</code>{' '}
      chain. You will need to approve adding the {CHAIN_NAME}{' '}
      <code>{CHAIN_ID}</code> chain to connect your wallet.
    </p>
    <Button className="mt-8" onClick={onAction}>
      ENABLE CHAIN &quot;{CHAIN_ID?.toUpperCase()}&quot;
    </Button>
  </Modal>
)
