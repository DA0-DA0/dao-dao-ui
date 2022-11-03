import clsx from 'clsx'
import { ComponentType, forwardRef } from 'react'

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
}

export const NoContent = forwardRef<HTMLAnchorElement, NoContentProps>(
  function NoContent(
    { Icon, body, href, onClick, actionNudge, buttonLabel, className },
    ref
  ) {
    const hasAction = !!href || !!onClick
    const containerClassName = clsx(
      'border-border-primary flex flex-col items-center gap-5 rounded-md border-2 border-dashed py-10 px-6',
      hasAction &&
        'hover:border-border-interactive-hover cursor-pointer transition-all hover:border-solid',
      className
    )

    const content = (
      <>
        <Icon className="text-icon-tertiary !h-14 !w-14" />

        <p className="secondary-text text-text-tertiary text-center">
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
