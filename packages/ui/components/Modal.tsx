import { XIcon } from '@heroicons/react/solid'
import clsx from 'clsx'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'

import { ModalProps } from '@dao-dao/tstypes/ui/Modal'

import { ErrorBoundary } from './ErrorBoundary'
import { IconButton } from './IconButton'

export * from '@dao-dao/tstypes/ui/Modal'

export const Modal = ({
  children,
  onClose,
  backdropClassName,
  containerClassName,
  hideCloseButton,
  header,
  headerContent,
  footerContent,
  headerContainerClassName,
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

  return createPortal(
    <div
      className={clsx(
        'flex fixed top-0 left-0 z-40 justify-center items-center p-4 w-screen h-full backdrop-brightness-50 transition cursor-pointer backdrop-filter',
        backdropClassName
      )}
      onClick={
        // Only close if click specifically on backdrop.
        ({ target, currentTarget }) => target === currentTarget && onClose()
      }
    >
      <div
        className={clsx(
          'flex overflow-y-auto relative flex-col p-6 max-w-md h-min max-h-full bg-background-base rounded-lg border border-border-secondary shadow-dp8 cursor-auto no-scrollbar',
          containerClassName
        )}
      >
        {!hideCloseButton && (
          <IconButton
            Icon={XIcon}
            circular
            className="absolute top-2 right-2 z-50"
            iconClassName="text-icon-tertiary"
            onClick={onClose}
            variant="ghost"
          />
        )}

        {(header || headerContent) && (
          <div
            className={clsx(
              // Undo container padding with negative margin, and then re-add
              // the padding internally, so that the bottom border spans the
              // whole width.
              'flex flex-col shrink-0 gap-1 px-6 pb-6 -mx-6 mb-6 border-b border-border-base',
              headerContainerClassName
            )}
          >
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

        <ErrorBoundary>{children}</ErrorBoundary>

        {footerContent && (
          <div className="shrink-0 py-5 px-6 -mx-6 -mb-6 border-t border-border-secondary">
            {footerContent}
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}
