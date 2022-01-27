import { ChevronRightIcon, XIcon } from '@heroicons/react/outline'
import SvgMessage from 'components/icons/Message'

export function BetaWarningModal({ onAccept }: { onAccept: Function }) {
  return (
    <div className="modal modal-open">
      <div className="modal-box rounded-md">
        <h1 className="text-2xl font-medium">Before you continue...</h1>
        <p className="mt-3">
          DAO DAO is currently in beta and has not yet completed an audit. As
          always, take care.
        </p>
        <button
          className="btn btn-outline btn-md rounded-md normal-case mt-6"
          onClick={() => onAccept()}
        >
          Got it <ChevronRightIcon className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  )
}

export function BetaNotice({ onClose }: { onClose: Function }) {
  return (
    <div className="fixed bottom-3 left-3 bg-primary text-primary-content z-10 rounded-md p-3">
      <div className="flex gap-2 items-center">
        <SvgMessage />
        <h2>
          DAO DAO is in <div className="inline text-error">beta!</div>
        </h2>
        <a
          className="link font-mono text-secondary text-sm"
          href="https://njc09z4coq8.typeform.com/to/EBkp9QJU"
          target="_blank"
          rel="noreferrer"
        >
          Share feedback
        </a>
        <button
          className="transition text-primary-content hover:text-secondary"
          onClick={() => onClose()}
        >
          <XIcon className="inline h-3 mb-2" />
        </button>
      </div>
    </div>
  )
}
