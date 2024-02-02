import { ComponentType, ReactNode, useEffect } from 'react'

export type ProposalProps = {
  voteTally: ReactNode
  votesCast: ReactNode
  contentDisplay: ReactNode
  ProposalStatusAndInfo: ComponentType<{ inline?: boolean }>
}

export const Proposal = ({
  voteTally,
  votesCast,
  contentDisplay,
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
    // Undo container (in AppLayout) pt-10 on the top and pb-6 on the bottom so
    // we can add those to our scrollable view instead. Also set height to full
    // height of parent and some overflow to account for extended margins.
    <div className="relative -mt-10 -mb-6 h-[calc(100%+4rem)]">
      <div className="absolute top-10 left-0 z-[2] hidden w-[18rem] mdlg:block">
        <ProposalStatusAndInfo inline={false} />
      </div>

      {/* Make entire pane scrollable, even space around and under status and info card on the side. */}
      <div className="no-scrollbar absolute top-0 right-0 bottom-0 left-0 z-[1] h-full overflow-y-auto pt-10 pb-6 mdlg:pl-[21rem]">
        <div className="mb-9">{contentDisplay}</div>

        <div className="mdlg:hidden">
          <ProposalStatusAndInfo inline />
        </div>

        <div className="mt-3">{voteTally}</div>

        <div className="mt-10 mb-12">{votesCast}</div>
      </div>
    </div>
  )
}
