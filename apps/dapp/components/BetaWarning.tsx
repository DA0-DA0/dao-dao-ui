import { ChevronRightIcon, XIcon } from '@heroicons/react/outline'
import { FC } from 'react'

import { Message } from '@dao-dao/icons'
import { Button } from '@dao-dao/ui'

interface BetaWarningModalProps {
  onAccept: () => void
}

export const BetaWarningModal: FC<BetaWarningModalProps> = ({ onAccept }) => (
  <div className="flex fixed z-10 justify-center items-center w-screen h-full backdrop-blur-sm backdrop-filter">
    <div className="p-6 max-w-md h-min bg-white rounded-lg border border-focus">
      <div className="mb-6 rounded-md prose prose-sm dark:prose-invert">
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
            rel="noreferrer"
            target="_blank"
          >
            Give us feedback!
          </a>{' '}
          Bug reports and feature requests are welcome.
        </p>
        <p>
          DAO DAO TOOLING IS PROVIDED “AS IS”, AT YOUR OWN RISK, AND WITHOUT
          WARRANTIES OF ANY KIND. No developer or entity involved in creating
          the DAO DAO UI or smart contracts will be liable for any claims or
          damages whatsoever associated with your use, inability to use, or your
          interaction with other users of DAO DAO tooling, including any direct,
          indirect, incidental, special, exemplary, punitive or consequential
          damages, or loss of profits, cryptocurrencies, tokens, or anything
          else of value.
        </p>
      </div>
      <Button onClick={onAccept}>
        I accept the terms
        <ChevronRightIcon className="ml-2 w-4 h-4" />
      </Button>
    </div>
  </div>
)

interface BetaNoticeProps {
  onClose: () => void
}

export const BetaNotice: FC<BetaNoticeProps> = ({ onClose }) => (
  <div className="fixed bottom-3 left-3 z-10 p-3 bg-light rounded-md text-primary-content">
    <div className="flex gap-2 items-center">
      <Message />
      <h2>
        DAO DAO is in <div className="inline text-error">beta!</div>
      </h2>
      <a
        className="font-mono text-sm text-secondary underline"
        href="https://njc09z4coq8.typeform.com/to/EBkp9QJU"
        rel="noreferrer"
        target="_blank"
      >
        Share feedback
      </a>
      <button
        className="hover:text-secondary transition text-primary-content"
        onClick={onClose}
      >
        <XIcon className="inline mb-2 h-3" />
      </button>
    </div>
  </div>
)
