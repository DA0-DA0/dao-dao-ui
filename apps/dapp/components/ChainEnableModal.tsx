import { XIcon } from '@heroicons/react/outline'
import { Button } from 'ui/Button'
import { Modal } from './Modal'
const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID
const CHAIN_NAME = process.env.NEXT_PUBLIC_CHAIN_NAME

function ChainEnableModal({
  onClose,
  onAction,
}: {
  onClose: () => void
  onAction: () => void
}) {
  return (
    <Modal>
      <div className="bg-white h-min max-w-md p-6 rounded-lg border border-focus relative">
        <button
          className="hover:bg-secondary transition rounded-full p-1 absolute right-2 top-2"
          onClick={onClose}
        >
          <XIcon className="h-4 w-4" />
        </button>

        <h1 className="header-text">Add Chain &quot;{CHAIN_ID}&quot;</h1>
        <p className="mt-6 body-text">
          This application is running on the {CHAIN_NAME}{' '}
          <code>{CHAIN_ID}</code> chain. You will need to approve adding the{' '}
          {CHAIN_NAME} <code>{CHAIN_ID}</code> chain to connect your wallet.
        </p>
        <Button onClick={onAction} className="mt-8">
          ENABLE CHAIN &quot;{CHAIN_ID?.toUpperCase()}&quot;
        </Button>
      </div>
    </Modal>
  )
}

export default ChainEnableModal
