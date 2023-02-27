import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { PopupProps } from '@dao-dao/types'

import { useTrackDropdown } from '../../hooks/useTrackDropdown'

export const Popup = ({
  Trigger,
  position,
  children,
  wrapperClassName,
  popupClassName,
  getKeydownEventListener,
  headerContent,
  onOpen,
  onClose,
  openRef,
  setOpenRef,
}: PopupProps) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)

  // Store open and setOpen in ref so parent can access them.
  useEffect(() => {
    if (openRef) {
      openRef.current = open
    }
    if (setOpenRef) {
      setOpenRef.current = setOpen
    }
    // Remove refs on unmount.
    return () => {
      if (openRef) {
        openRef.current = null
      }
      if (setOpenRef) {
        setOpenRef.current = null
      }
    }
  }, [open, openRef, setOpenRef])

  // Trigger open callbacks.
  useEffect(() => {
    if (open) {
      onOpen?.()
    } else {
      onClose?.()
    }
  }, [onClose, onOpen, open])

  // Close popup on escape if open.
  useEffect(() => {
    if (!open) {
      return
    }

    const handleKeyPress = (event: KeyboardEvent) =>
      event.key === 'Escape' && setOpen(false)

    // Attach event listener.
    document.addEventListener('keydown', handleKeyPress)
    // Clean up event listener.
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [open])

  // Listen for click not in bounds, and close if so. Adds listener only when
  // the dropdown is open.
  useEffect(() => {
    // Don't do anything if not on browser or popup is not open.
    // If open is switched off, the useEffect will remove the listener and then
    // not-readd it.
    if (typeof window === 'undefined' || !open) {
      return
    }

    const closeIfClickOutside = (event: MouseEvent) => {
      // If clicked on an element that is not a descendant of the popup
      // wrapper, close it.
      if (
        event.target instanceof Node &&
        !wrapperRef.current?.contains(event.target)
      ) {
        setOpen(false)
      }
    }

    window.addEventListener('click', closeIfClickOutside)
    return () => window.removeEventListener('click', closeIfClickOutside)
  }, [open])

  // Apply keydown event listener.
  useEffect(() => {
    if (!getKeydownEventListener) {
      return
    }

    const listener = getKeydownEventListener(open, setOpen)

    document.addEventListener('keydown', listener)
    // Clean up event listener on unmount.
    return () => document.removeEventListener('keydown', listener)
  }, [getKeydownEventListener, open])

  // Track button to position the dropdown.
  const { onDropdownRef, onTrackRef } = useTrackDropdown({
    // Offset for outline of Trigger.
    top: (rect) => rect.bottom + 4,
    left: position === 'right' ? (rect) => rect.left - 2 : null,
    right:
      position === 'left' ? (rect) => window.innerWidth - rect.right : null,
    width: null,
  })

  return (
    <>
      <div
        className={clsx('inline-block', wrapperClassName)}
        ref={(ref) => {
          wrapperRef.current = ref
          onTrackRef(ref)
        }}
      >
        <Trigger onClick={() => setOpen((o) => !o)} open={open} />
      </div>

      {/* Popup */}
      {createPortal(
        <div
          className={clsx(
            'fixed z-50 flex flex-col rounded-lg border border-border-primary bg-component-dropdown shadow-dp8 transition-all',
            // Open.
            {
              'pointer-events-none scale-95 opacity-0': !open,
              'scale-100 opacity-100': open,
            },
            popupClassName
          )}
          ref={onDropdownRef}
        >
          {headerContent && (
            <div className="mb-4 border-b border-border-base">
              <div className="p-4">{headerContent}</div>
            </div>
          )}

          {children}
        </div>,
        document.body
      )}
    </>
  )
}
