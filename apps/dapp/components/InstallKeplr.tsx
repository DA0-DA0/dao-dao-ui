import { ChevronRightIcon } from '@heroicons/react/outline'
import { FC } from 'react'

import { Button, Modal } from '@dao-dao/ui'

interface InstallKeplrProps {
  onClose: () => void
}

export const InstallKeplr: FC<InstallKeplrProps> = ({ onClose }) => (
  <Modal onClose={onClose}>
    <h1 className="header-text">You{"'"}ll need a wallet to continue</h1>
    <p className="mt-6 body-text">
      Your wallet is your digital identity on the blockchain. Having one lets
      you interact with web3 applications like DAO DAO.
    </p>
    <p className="mt-3 mb-6 body-text">We recommend the Keplr wallet.</p>
    <a href="https://www.keplr.app/" rel="noreferrer" target="_blank">
      <Button>
        Install Keplr <ChevronRightIcon className="w-4" />
      </Button>
    </a>
  </Modal>
)
