import { ChevronRightIcon, XIcon } from '@heroicons/react/outline'

import { Button, Modal } from '@dao-dao/ui'

export function NoKeplrAccountModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal>
      <div className="relative p-6 max-w-md h-min bg-white rounded-lg border border-focus cursor-auto">
        <button
          className="absolute top-2 right-2 p-1 hover:bg-secondary rounded-full transition"
          onClick={onClose}
        >
          <XIcon className="w-4 h-4" />
        </button>
        <h1 className="header-text">Configure your wallet to continue</h1>
        <p className="mt-6 body-text">
          You have Keplr installed, but it doesn{"'"}t seem like you{"'"}ve set
          up a wallet. To continue, open the Keplr extension and set up a
          wallet.
        </p>
        <p className="mt-3 mb-6 body-text">
          To open the Keplr extension press the puzzle icon in the top right of
          your browser and then press the Keplr button. Once you{"'"}ve done
          that a new page will open where you{"'"}ll be able to create a new
          account.
        </p>
        <Button onClick={onClose}>
          Got it <ChevronRightIcon className="w-4" />
        </Button>
      </div>
    </Modal>
  )
}
