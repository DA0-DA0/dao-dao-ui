import clsx from 'clsx'
import { ComponentType, forwardRef } from 'react'

import { Button } from './buttons'
import { ButtonLink } from './buttons/ButtonLink'
import { LinkWrapper } from './LinkWrapper'

export interface NoContentProps {
  Icon: ComponentType<{ className: string }>
  body: string
  href?: string
  onClick?: () => void
  actionNudge?: string
  buttonLabel?: string
  className?: string
  small?: boolean
}

// This component displays a dashed outline and centers its content in a way
// that draws attention to it. If an `href` is passed, clicking on this card
// will navigate to the link. If `onClick` is passed, clicking on this card will
// execute the function. The `body` text is displayed all the time, whereas
// `actionNudge` displays below `body` only in the event that an action is
// present (i.e. one of `href` or `onClick` is set). `buttonLabel` specifies the
// label of the button that displays below the text, which displays only when an
// action is present and triggers that action just like clicking on the whole
// card. The button ensures the user knows an action can be performed, but the
// whole card remains clickable to improve UX. It is often used when there is no
// content to prompt the user to perform an action, such as when there are no
// pinned DAOs.
export const NoContent = forwardRef<HTMLDivElement, NoContentProps>(
  function NoContent(
    { Icon, body, href, onClick, actionNudge, buttonLabel, className, small },
    ref
  ) {
    const hasAction = !!href || !!onClick
    const containerClassName = clsx(
      'flex flex-col items-center rounded-md border-2 border-dashed border-border-primary',
      small ? 'gap-3 py-6 px-4' : 'gap-5 py-10 px-6',
      hasAction &&
        'cursor-pointer transition-all hover:border-solid hover:border-border-interactive-hover',
      className
    )

    const content = (
      <>
        <Icon
          className={clsx(
            'text-icon-tertiary',
            small ? '!h-8 !w-8' : '!h-14 !w-14'
          )}
        />

        <p className="secondary-text text-center text-text-tertiary">
          {body}

          {!!actionNudge && hasAction && (
            <>
              <br />
              {actionNudge}
            </>
          )}
        </p>

        {!!buttonLabel &&
          hasAction &&
          (href ? (
            <ButtonLink href={href} variant="secondary">
              {buttonLabel}
            </ButtonLink>
          ) : (
            <Button
              onClick={
                onClick &&
                ((e) => {
                  // Don't trigger click on container.
                  e.stopPropagation()

                  onClick()
                })
              }
              variant="secondary"
            >
              {buttonLabel}
            </Button>
          ))}
      </>
    )

    return href ? (
      <LinkWrapper className={containerClassName} href={href} ref={ref}>
        {content}
      </LinkWrapper>
    ) : (
      <div className={containerClassName} onClick={onClick} ref={ref}>
        {content}
      </div>
    )
  }
)
