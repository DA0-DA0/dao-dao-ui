import { XIcon } from '@heroicons/react/solid'
import clsx from 'clsx'
import { FC, ReactNode, useCallback, useEffect } from 'react'

export interface ModalProps {
  children: ReactNode
  onClose: () => void
  backdropClassName?: string
  containerClassName?: string
  hideCloseButton?: boolean
}

export const Modal: FC<ModalProps> = ({
  children,
  onClose,
  backdropClassName,
  containerClassName,
  hideCloseButton,
}) => {
  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    // attach the event listener
    document.addEventListener('keydown', handleKeyPress)

    // remove the event listener
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  return (
    <div
      className={clsx(
        'fixed top-0 left-0 z-10 flex h-full w-screen cursor-pointer items-center justify-center px-4 backdrop-brightness-50 backdrop-filter transition',
        backdropClassName
      )}
      onClick={
        // Only close if click specifically on backdrop.
        ({ target, currentTarget }) => target === currentTarget && onClose()
      }
    >
      <div
        className={clsx(
          'relative h-min max-w-md cursor-auto rounded-lg border border-focus bg-white p-6',
          containerClassName
        )}
      >
        {!hideCloseButton && (
          <button
            className="absolute top-2 right-2 rounded-full p-1 transition hover:bg-secondary"
            onClick={onClose}
          >
            <XIcon className="h-4 w-4" />
          </button>
        )}

        {children}
      </div>
    </div>
  )
}
