import clsx from 'clsx'
import { ComponentType, Dispatch, SetStateAction, useRef } from 'react'

import { Button, ButtonLinkProps } from '../buttons'
import { Popup, PopupProps } from './Popup'

export interface ButtonPopupSection {
  label?: string
  buttons: ({
    Icon?: ComponentType<{ className?: string }>
    label: string
    loading?: boolean
  } & (
    | {
        onClick: () => void
      }
    | {
        href: string
      }
  ))[]
}

export interface ButtonPopupProps
  extends Omit<PopupProps, 'children' | 'setOpenRef'> {
  sections: ButtonPopupSection[]
  ButtonLink: ComponentType<ButtonLinkProps>
}

export const ButtonPopup = ({
  sections,
  ButtonLink,
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

          {buttons.map(({ Icon, label, ...buttonProps }, index) => {
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
                onClick={() => {
                  buttonProps.onClick()
                  // Close on click.
                  setOpenRef.current?.(false)
                }}
              >
                {content}
              </Button>
            ) : (
              //! 'href' in props
              <ButtonLink {...commonProps} href={buttonProps.href}>
                {content}
              </ButtonLink>
            )
          })}
        </div>
      ))}
    </Popup>
  )
}
