import { Close } from '@mui/icons-material'
import clsx from 'clsx'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'

import { ModalProps } from '@dao-dao/types/components/Modal'

import { useMountedInBrowser } from '../../hooks'
import { ErrorBoundary } from '../error/ErrorBoundary'
import { IconButton } from '../icon_buttons'
import { Loader } from '../logo/Loader'

export * from '@dao-dao/types/components/Modal'

// This component renders a modal above the page content with a dim backdrop.
//
// Ideally, it is not conditionally rendered, but instead is always rendered and
// its `visible` prop is used to control its visibility. This is because the
// fade in/out animation only occurs when the component is mounted and
// hidden/unhidden. Some modals, like the stateful PfpkNftSelectionModal, are
// conditionally rendered because they load a good amount of state which we
// don't want to load until necessary.
//
// Common gotcha: If adding any keypress listeners to navigate or perform
// actions in the modal, make sure to only add the listeners when the modal is
// visible. See the code below which adds a keypress listener to close the modal
// on escape, which only adds the listener when visible.

export const Modal = ({
  children,
  visible,
  onClose,
  backdropClassName,
  containerClassName,
  hideCloseButton,
  header,
  headerContent,
  footerContent,
  headerContainerClassName,
  contentContainerClassName,
  footerContainerClassName,
  titleClassName,
}: ModalProps) => {
  // Close modal on escape, only listening if visible.
  useEffect(() => {
    if (!onClose || !visible) {
      return
    }

    const handleKeyPress = (event: KeyboardEvent) =>
      event.key === 'Escape' && onClose()

    // Attach event listener.
    document.addEventListener('keydown', handleKeyPress)
    // Clean up event listener.
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [onClose, visible])

  const mountedInBrowser = useMountedInBrowser()

  return mountedInBrowser
    ? createPortal(
        <div
          className={clsx(
            'fixed top-0 left-0 z-40 flex h-full w-screen items-center justify-center p-4 backdrop-brightness-50 backdrop-filter transition-all duration-[120ms]',
            visible ? 'opacity-100' : 'pointer-events-none opacity-0',
            onClose && 'cursor-pointer',
            backdropClassName
          )}
          onClick={
            onClose &&
            // Only close if click specifically on backdrop.
            (({ target, currentTarget }) =>
              target === currentTarget && onClose())
          }
        >
          <div
            className={clsx(
              'relative flex h-min max-h-[90vh] max-w-md cursor-auto flex-col overflow-x-hidden rounded-lg border border-border-secondary bg-background-base shadow-dp8 transition-transform duration-[120ms]',
              visible ? 'scale-100' : 'scale-90',
              // If no children, remove bottom padding since header has its own
              // padding.
              !children && '!pb-0',
              containerClassName
            )}
          >
            {!hideCloseButton && onClose && (
              <IconButton
                Icon={Close}
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
                  'flex shrink-0 flex-col gap-1 p-6',
                  // If children, add bottom border.
                  children && 'border-b border-border-base',
                  // If close button displaying, add more right padding.
                  !hideCloseButton && 'pr-12',
                  headerContainerClassName
                )}
              >
                {header && (
                  <>
                    <p className={clsx('header-text mb-1', titleClassName)}>
                      {header.title}
                    </p>
                    {!!header.subtitle && (
                      <div className="space-y-1">
                        {header.subtitle.split('\n').map((line, index) => (
                          <p key={index} className="body-text">
                            {line}
                          </p>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {headerContent}
              </div>
            )}

            {children && (
              <ErrorBoundary>
                <div
                  className={clsx(
                    'no-scrollbar flex grow flex-col overflow-y-auto p-6',
                    contentContainerClassName
                  )}
                >
                  {children}
                </div>
              </ErrorBoundary>
            )}

            {footerContent && (
              <div
                className={clsx(
                  'shrink-0 border-t border-border-secondary py-5 px-6',
                  footerContainerClassName
                )}
              >
                {footerContent}
              </div>
            )}
          </div>
        </div>,
        document.body
      )
    : null
}

export const ModalLoader = (props: Pick<ModalProps, 'onClose'>) => (
  <Modal contentContainerClassName="!p-40" visible {...props}>
    <Loader />
  </Modal>
)
