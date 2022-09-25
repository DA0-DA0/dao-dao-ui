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
      'flex flex-col gap-5 items-center py-10 px-6 rounded-md border-2 border-border-primary border-dashed',
      hasAction &&
        'hover:border-border-interactive-hover hover:border-solid transition-all cursor-pointer',
      className
    )

    const content = (
      <>
        <Icon className="!w-14 !h-14 text-icon-tertiary" />

        <p className="text-center text-text-tertiary secondary-text">
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
