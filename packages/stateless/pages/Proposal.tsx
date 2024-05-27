import clsx from 'clsx'
import { ComponentType, ReactNode, useEffect } from 'react'

import { BaseProposalVotesProps } from '@dao-dao/types'
import {
  PAGE_PADDING_BOTTOM_CLASSES,
  PAGE_PADDING_HORIZONTAL_CLASSES,
  PAGE_PADDING_LEFT_CLASS,
  PAGE_PADDING_TOP_CLASSES,
} from '@dao-dao/utils'

export type ProposalProps = {
  voteTally: ReactNode
  contentDisplay: ReactNode
  VotesCast?: ComponentType<BaseProposalVotesProps>
  ProposalStatusAndInfo: ComponentType<{ inline?: boolean }>
}

export const Proposal = ({
  voteTally,
  contentDisplay,
  VotesCast,
  ProposalStatusAndInfo,
}: ProposalProps) => {
  // Scroll to hash manually if available since this component and thus the
  // desired target anchor text won't be ready right when the page renders.
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      // Ignore the '#' character at the beginning.
      const element = document.getElementById(window.location.hash.slice(1))
      if (!element) {
        return
      }

      // 24px offset so the element isn't touching the edge of the browser.
      const top = element.getBoundingClientRect().top + window.scrollY - 24
      window.scrollTo({
        top,
        behavior: 'smooth',
      })
    }
  }, [])

  return (
    // Undo page container padding so we can add those to our scrollable view
    // instead. Also set height to full height of parent and some overflow to
    // account for extended margins.
    <div className="absolute top-0 left-0 right-0 bottom-0">
      <div className="absolute top-0 left-0 z-[2] hidden w-[18rem] mdlg:block">
        <div
          className={clsx(PAGE_PADDING_TOP_CLASSES, PAGE_PADDING_LEFT_CLASS)}
        >
          <ProposalStatusAndInfo inline={false} />
        </div>
      </div>

      {/* Make entire pane scrollable, even space around and under status and info card on the side. */}
      <div
        className={clsx(
          // On mdlg size, add left padding to account for ProposalStatusAndInfo
          // component floating to the left.
          'no-scrollbar absolute top-0 right-0 left-0 bottom-0 z-[1] overflow-y-auto mdlg:pl-[21rem]',
          PAGE_PADDING_TOP_CLASSES,
          PAGE_PADDING_BOTTOM_CLASSES,
          PAGE_PADDING_HORIZONTAL_CLASSES
        )}
      >
        <div className="mb-9">{contentDisplay}</div>

        <div className="mb-3 mdlg:hidden">
          <ProposalStatusAndInfo inline />
        </div>

        <div>{voteTally}</div>

        {VotesCast && <VotesCast className="mt-8" />}
      </div>
    </div>
  )
}
