import { XIcon } from '@heroicons/react/solid'
import clsx from 'clsx'
import { ReactNode, useEffect } from 'react'

import { IconButton } from './IconButton'

export interface ModalProps {
  children: ReactNode
  onClose: () => void
  backdropClassName?: string
  containerClassName?: string
  hideCloseButton?: boolean
  header?: {
    title: string
    subtitle?: string
  }
  headerContent?: ReactNode
  footerContent?: ReactNode
}

export const Modal = ({
  children,
  onClose,
  backdropClassName,
  containerClassName,
  hideCloseButton,
  header,
  headerContent,
  footerContent,
}: ModalProps) => {
  // Close modal on escape.
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) =>
      event.key === 'Escape' && onClose()

    // Attach event listener.
    document.addEventListener('keydown', handleKeyPress)
    // Clean up event listener.
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [onClose])

  return (
    <div
      className={clsx(
        'flex fixed top-0 left-0 z-10 justify-center items-center p-4 w-screen h-full backdrop-brightness-50 transition cursor-pointer backdrop-filter',
        backdropClassName
      )}
      onClick={
        // Only close if click specifically on backdrop.
        ({ target, currentTarget }) => target === currentTarget && onClose()
      }
    >
      <div
        className={clsx(
          'overflow-hidden relative p-6 max-w-md h-min max-h-full bg-background-base rounded-lg border border-border-secondary shadow-dp8 cursor-auto',
          containerClassName
        )}
      >
        {!hideCloseButton && (
          <IconButton
            Icon={XIcon}
            circular
            className="absolute top-2 right-2"
            onClick={onClose}
            variant="ghost"
          />
        )}

        {(header || headerContent) && (
          <div className="py-5 px-6 pt-0 -mx-6 mb-6 space-y-1 border-b border-border-base">
            {header && (
              <>
                <p className="header-text">{header.title}</p>
                {!!header.subtitle && (
                  <p className="body-text">{header.subtitle}</p>
                )}
              </>
            )}

            {headerContent}
          </div>
        )}

        {children}

        {footerContent && (
          <div className="py-5 px-6 -mx-6 -mb-6 border-t border-border-secondary">
            {footerContent}
          </div>
        )}
      </div>
    </div>
  )
}
