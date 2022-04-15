import { Button, Modal } from '@dao-dao/ui'
import { XIcon } from '@heroicons/react/outline'

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
      <div className="relative p-6 max-w-md h-min bg-white rounded-lg border border-focus">
        <button
          className="absolute top-2 right-2 p-1 hover:bg-secondary rounded-full transition"
          onClick={onClose}
        >
          <XIcon className="w-4 h-4" />
        </button>

        <h1 className="header-text">Add Chain &quot;{CHAIN_ID}&quot;</h1>
        <p className="mt-6 body-text">
          This application is running on the {CHAIN_NAME}{' '}
          <code>{CHAIN_ID}</code> chain. You will need to approve adding the{' '}
          {CHAIN_NAME} <code>{CHAIN_ID}</code> chain to connect your wallet.
        </p>
        <Button className="mt-8" onClick={onAction}>
          ENABLE CHAIN &quot;{CHAIN_ID?.toUpperCase()}&quot;
        </Button>
      </div>
    </Modal>
  )
}

export default ChainEnableModal
