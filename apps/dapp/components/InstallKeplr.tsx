import { ChevronRightIcon, XIcon } from '@heroicons/react/outline'
import { Button } from 'ui/Button'

import { Modal } from './Modal'

export function InstallKeplr({ onClose }: { onClose: () => void }) {
  return (
    <Modal>
      <div className="bg-white h-min max-w-md p-6 rounded-lg border border-focus relative">
        <button
          className="hover:bg-secondary transition rounded-full p-1 absolute right-2 top-2"
          onClick={onClose}
        >
          <XIcon className="h-4 w-4" />
        </button>
        <h1 className="header-text">You{"'"}ll need a wallet to continue</h1>
        <p className="mt-6 body-text">
          Your wallet is your digital identity on the blockchain. Having one
          lets you interact with web3 applications like DAO DAO.
        </p>
        <p className="mt-3 mb-6 body-text">We recommend the Keplr wallet.</p>
        <a href="https://www.keplr.app/" target="_blank" rel="noreferrer">
          <Button>
            Install Keplr <ChevronRightIcon className="w-4" />
          </Button>
        </a>
      </div>
    </Modal>
  )
}
