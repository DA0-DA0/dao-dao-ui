import clsx from 'clsx'
import { Dispatch, SetStateAction, useRef } from 'react'

import { ButtonPopupProps } from '@dao-dao/types'

import { Button } from '../buttons'
import { Popup } from './Popup'

export const ButtonPopup = ({
  sections,
  ButtonLink,
  dontCloseOnClick = false,
  ...props
}: ButtonPopupProps) => {
  const setOpenRef = useRef<Dispatch<SetStateAction<boolean>> | null>(null)

  return (
    <Popup {...props} setOpenRef={setOpenRef}>
      {sections.map(({ label, buttons }, index) => (
        <div
          key={index}
          className={clsx(
            'flex flex-col gap-2 py-3 px-4',
            index > 0 && 'border-t border-border-secondary'
          )}
        >
          {label && <p className="link-text text-text-secondary">{label}</p>}

          {buttons.map(({ Icon, label, loading, ...buttonProps }, index) => {
            const content = (
              <>
                {Icon && (
                  <div className="flex h-6 w-6 items-center justify-center text-lg ">
                    <Icon className="h-5 w-5 text-icon-primary" />
                  </div>
                )}
                <p className="link-text text-left text-text-body">{label}</p>
              </>
            )

            const commonProps = {
              key: index,
              // eslint-disable-next-line i18next/no-literal-string
              contentContainerClassName: 'gap-3',
              // eslint-disable-next-line i18next/no-literal-string
              variant: 'ghost',
            } as const

            return 'onClick' in buttonProps ? (
              <Button
                {...commonProps}
                className={clsx(
                  loading && 'animate-pulse',
                  buttonProps.disabled && 'opacity-60'
                )}
                disabled={loading || buttonProps.disabled}
                onClick={() => {
                  buttonProps.onClick()
                  // Close on click.
                  if (!dontCloseOnClick) {
                    setOpenRef.current?.(false)
                  }
                }}
              >
                {content}
              </Button>
            ) : (
              //! 'href' in props
              <ButtonLink
                {...commonProps}
                {...buttonProps}
                href={buttonProps.href}
              >
                {content}
              </ButtonLink>
            )
          })}
        </div>
      ))}
    </Popup>
  )
}
