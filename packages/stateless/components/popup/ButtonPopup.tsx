import clsx from 'clsx'
import { ComponentType } from 'react'

import { Button, ButtonLink } from '../buttons'
import { Popup, PopupProps } from './Popup'

export interface ButtonPopupSection {
  label?: string
  buttons: ({
    Icon?: ComponentType<{ className?: string }>
    label: string
  } & (
    | {
        onClick: () => void
      }
    | {
        href: string
      }
  ))[]
}

export interface ButtonPopupProps extends Omit<PopupProps, 'children'> {
  sections: ButtonPopupSection[]
}

export const ButtonPopup = ({ sections, ...props }: ButtonPopupProps) => (
  <Popup {...props}>
    {sections.map(({ label, buttons }, index) => (
      <div
        key={index}
        className={clsx(
          'flex flex-col gap-2 py-3 px-4',
          index > 0 && 'border-t border-border-secondary'
        )}
      >
        {label && <p className="link-text text-text-secondary">{label}</p>}

        {buttons.map(({ Icon, label, ...props }, index) => {
          const content = (
            <>
              {Icon && (
                <div className="flex h-6 w-6 items-center justify-center text-lg ">
                  <Icon className="h-5 w-5 text-icon-primary" />
                </div>
              )}
              <p className="link-text text-text-body">{label}</p>
            </>
          )

          const commonProps = {
            key: index,
            // eslint-disable-next-line i18next/no-literal-string
            contentContainerClassName: 'gap-3',
            // eslint-disable-next-line i18next/no-literal-string
            variant: 'ghost',
          } as const

          return 'onClick' in props ? (
            <Button {...commonProps} onClick={props.onClick}>
              {content}
            </Button>
          ) : (
            //! 'href' in props
            <ButtonLink {...commonProps} href={props.href}>
              {content}
            </ButtonLink>
          )
        })}
      </div>
    ))}
  </Popup>
)
