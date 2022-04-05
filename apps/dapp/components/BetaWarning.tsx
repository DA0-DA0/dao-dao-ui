import { ChevronRightIcon, XIcon } from '@heroicons/react/outline'

import { Button } from '@components'

import SvgMessage from 'components/icons/Message'

export function BetaWarningModal({ onAccept }: { onAccept: Function }) {
  return (
    <div className="fixed z-10 w-screen h-full backdrop-filter backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white h-min max-w-md p-6 rounded-lg border border-focus">
        <div className="rounded-md prose prose-sm dark:prose-invert mb-6">
          <h2>Before you continue...</h2>
          <p>
            DAO DAO is in beta, and has not yet been audited. <b>Do not</b> keep
            large sums of money in your DAO, and <b>do not</b> use your DAO for
            anything mission critical.
          </p>
          <p>
            <a
              className="text-accent underline hover:no-underline"
              href="https://njc09z4coq8.typeform.com/to/EBkp9QJU"
              target="_blank"
              rel="noreferrer"
            >
              Give us feedback!
            </a>{' '}
            Bug reports and feature requests are welcome.
          </p>
          <p>
            DAO DAO TOOLING IS PROVIDED “AS IS”, AT YOUR OWN RISK, AND WITHOUT
            WARRANTIES OF ANY KIND. No developer or entity involved in creating
            the DAO DAO UI or smart contracts will be liable for any claims or
            damages whatsoever associated with your use, inability to use, or
            your interaction with other users of DAO DAO tooling, including any
            direct, indirect, incidental, special, exemplary, punitive or
            consequential damages, or loss of profits, cryptocurrencies, tokens,
            or anything else of value.
          </p>
        </div>
        <Button onClick={() => onAccept()}>
          I accept the terms
          <ChevronRightIcon className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}

export function BetaNotice({ onClose }: { onClose: Function }) {
  return (
    <div className="fixed bottom-3 left-3 bg-light text-primary-content z-10 rounded-md p-3">
      <div className="flex gap-2 items-center">
        <SvgMessage />
        <h2>
          DAO DAO is in <div className="inline text-error">beta!</div>
        </h2>
        <a
          className="underline font-mono text-secondary text-sm"
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
