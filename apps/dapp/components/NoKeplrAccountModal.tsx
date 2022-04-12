import { ChevronRightIcon, XIcon } from '@heroicons/react/outline'
import { Button } from 'ui/Button'

import { Modal } from './Modal'

export function NoKeplrAccountModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal>
      <div className="bg-white h-min max-w-md p-6 rounded-lg border border-focus relative">
        <button
          className="hover:bg-secondary transition rounded-full p-1 absolute right-2 top-2"
          onClick={onClose}
        >
          <XIcon className="h-4 w-4" />
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
