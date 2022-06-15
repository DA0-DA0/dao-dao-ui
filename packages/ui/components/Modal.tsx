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
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress])

  return (
    <div
      className={clsx(
        'flex fixed top-0 left-0 z-10 justify-center items-center px-4 w-screen h-full backdrop-brightness-50 transition cursor-pointer backdrop-filter',
        backdropClassName
      )}
      onClick={
        // Only close if click specifically on backdrop.
        ({ target, currentTarget }) => target === currentTarget && onClose()
      }
    >
      <div
        className={clsx(
          'relative p-6 max-w-md h-min bg-white rounded-lg border border-focus cursor-auto',
          containerClassName
        )}
      >
        {!hideCloseButton && (
          <button
            className="absolute top-2 right-2 p-1 hover:bg-secondary rounded-full transition"
            onClick={onClose}
          >
            <XIcon className="w-4 h-4" />
          </button>
        )}

        {children}
      </div>
    </div>
  )
}
