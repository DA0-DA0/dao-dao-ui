import { ChevronRightIcon, XIcon } from '@heroicons/react/outline'
import SvgMessage from 'components/icons/Message'

export function BetaWarningModal({ onAccept }: { onAccept: Function }) {
  return (
    <div className="modal modal-open">
      <div className="modal-box rounded-md">
        <h1 className="text-2xl font-medium">Before you continue...</h1>
        <p className="mt-3">
          DAO DAO is in beta, and has not received and audit. <b>Do not</b> keep
          large sums of money in your DAO, and <b>do not</b> use your DAO for
          anything mission critical.
        </p>
        <p className="mt-3">
          <a
            className="text-accent underline hover:no-underline"
            href="https://njc09z4coq8.typeform.com/to/EBkp9QJU"
            target="_blank"
            rel="noreferrer"
          >
            <b>Give us feedback!</b>
          </a>
          Bug reports and feature requests are welcome.
        </p>
        <p className="mt-3 text-sm">
          DAO DAO TOOLING IS PROVIDED “AS IS”, AT YOUR OWN RISK, AND WITHOUT
          WARRANTIES OF ANY KIND. No developer or entity involved in creating
          the DAO DAO UI or smart contract will be liable for any claims or
          damages whatsoever associated with your use, inability to use, or your
          interaction with other users of DAO DAO tooling, including any direct,
          indirect, incidental, special, exemplary, punitive or consequential
          damages, or loss of profits, cryptocurrencies, tokens, or anything
          else of value.
        </p>
        <button
          className="btn btn-outline btn-md rounded-md normal-case mt-6"
          onClick={() => onAccept()}
        >
          I accept the terms
          <ChevronRightIcon className="w-4 h-4 ml-2" />
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
