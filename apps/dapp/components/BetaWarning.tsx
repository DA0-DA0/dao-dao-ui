import { ChevronRightIcon, XIcon } from '@heroicons/react/outline'
import { FC } from 'react'

import i18n from '@dao-dao/i18n'
import { Message } from '@dao-dao/icons'
import { Button } from '@dao-dao/ui'

interface BetaWarningModalProps {
  onAccept: () => void
}

export const BetaWarningModal: FC<BetaWarningModalProps> = ({ onAccept }) => (
  <div className="flex fixed z-10 justify-center items-center w-screen h-full backdrop-blur-sm backdrop-filter">
    <div className="p-6 max-w-md h-min bg-white rounded-lg border border-focus">
      <div className="mb-6 rounded-md prose prose-sm dark:prose-invert">
        <h2>{i18n.t('Watch out!')}</h2>
        <p>
          {i18n.t('Beta warning')}
        </p>
        <p>
          {i18n.t('Terms of service')}
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
