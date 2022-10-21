import clsx from 'clsx'
import { ComponentType } from 'react'

import { Button } from '../buttons'
import { Popup, PopupProps } from './Popup'

export interface ButtonPopupSection {
  label?: string
  buttons: {
    Icon?: ComponentType<{ className?: string }>
    label: string
    onClick: () => void
  }[]
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

        {buttons.map(({ Icon, label, onClick }, index) => (
          <Button
            key={index}
            contentContainerClassName="gap-3"
            onClick={onClick}
            variant="ghost"
          >
            {Icon && (
              <div className="flex h-6 w-6 items-center justify-center text-lg ">
                <Icon className="h-5 w-5 text-icon-primary" />
              </div>
            )}
            <p className="link-text text-text-body">{label}</p>
          </Button>
        ))}
      </div>
    ))}
  </Popup>
)
