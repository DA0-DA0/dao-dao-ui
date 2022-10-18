import clsx from 'clsx'
import { ComponentType, forwardRef } from 'react'

import { ButtonLink } from './Button'
import { LinkWrapper } from './LinkWrapper'

export interface NoContentProps {
  Icon: ComponentType<{ className: string }>
  body: string
  href?: string
  onClick?: () => void
  actionNudge?: string
  buttonLabel?: string
  className?: string
}

export const NoContent = forwardRef<HTMLAnchorElement, NoContentProps>(
  function NoContent(
    { Icon, body, href, onClick, actionNudge, buttonLabel, className },
    ref
  ) {
    const hasAction = !!href || !!onClick
    const containerClassName = clsx(
      'flex flex-col items-center gap-5 rounded-md border-2 border-dashed border-border-primary py-10 px-6',
      hasAction &&
        'cursor-pointer transition-all hover:border-solid hover:border-border-interactive-hover',
      className
    )

    const content = (
      <>
        <Icon className="!h-14 !w-14 text-icon-tertiary" />

        <p className="secondary-text text-center text-text-tertiary">
          {body}

          {!!actionNudge && hasAction && (
            <>
              <br />
              {actionNudge}
            </>
          )}
        </p>

        {!!buttonLabel && hasAction && (
          <ButtonLink href={href} variant="secondary">
            {buttonLabel}
          </ButtonLink>
        )}
      </>
    )

    return onClick ? (
      <div className={containerClassName} onClick={onClick}>
        {content}
      </div>
    ) : (
      <LinkWrapper className={containerClassName} href={href} ref={ref}>
        {content}
      </LinkWrapper>
    )
  }
)
