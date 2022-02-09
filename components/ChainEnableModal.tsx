import { XIcon } from '@heroicons/react/outline'
import { GradientWrapper } from './GradientWrapper'
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
    <GradientWrapper>
      <div className="modal modal-open">
        <div className="modal-box rounded-md">
          <XIcon className="float-right h-6 cursor-pointer" onClick={onClose} />
          <h1 className="text-2xl font-medium">
            Add Chain &quot;{CHAIN_ID}&quot;
          </h1>
          <p className="mt-3">
            This application is running on the {CHAIN_NAME}{' '}
            <code>{CHAIN_ID}</code> chain. You will need to approve adding the{' '}
            {CHAIN_NAME} <code>{CHAIN_ID}</code> chain to connect your wallet.
          </p>
          <button
            className="btn btn-outline btn-md rounded-md normal-case mt-6"
            onClick={onAction}
          >
            ENABLE CHAIN &quot;{CHAIN_ID?.toUpperCase()}&quot;
          </button>
        </div>
      </div>
    </GradientWrapper>
  )
}

export default ChainEnableModal
