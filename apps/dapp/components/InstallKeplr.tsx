import { ChevronRightIcon, XIcon } from '@heroicons/react/outline'

import { Button, Modal } from '@dao-dao/ui'

export function InstallKeplr({ onClose }: { onClose: () => void }) {
  return (
    <Modal>
      <div className="relative p-6 max-w-md h-min bg-white rounded-lg border border-focus cursor-auto">
        <button
          className="absolute top-2 right-2 p-1 hover:bg-secondary rounded-full transition"
          onClick={onClose}
        >
          <XIcon className="w-4 h-4" />
        </button>
        <h1 className="header-text">You{"'"}ll need a wallet to continue</h1>
        <p className="mt-6 body-text">
          Your wallet is your digital identity on the blockchain. Having one
          lets you interact with web3 applications like DAO DAO.
        </p>
        <p className="mt-3 mb-6 body-text">We recommend the Keplr wallet.</p>
        <a href="https://www.keplr.app/" rel="noreferrer" target="_blank">
          <Button>
            Install Keplr <ChevronRightIcon className="w-4" />
          </Button>
        </a>
      </div>
    </Modal>
  )
}
