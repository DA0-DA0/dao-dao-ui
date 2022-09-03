import clsx from 'clsx'
import { ComponentType, ReactNode, useEffect, useRef, useState } from 'react'

export interface PopupProps {
  Trigger: ComponentType<{ onClick: () => void; open: boolean }>
  position: 'left' | 'right'
  children: ReactNode | ReactNode[]
  wrapperClassName?: string
  popupClassName?: string
}

export const Popup = ({
  Trigger,
  position,
  children,
  wrapperClassName,
  popupClassName,
}: PopupProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

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

  return (
    <div
      className={clsx('inline-block relative', wrapperClassName)}
      ref={wrapperRef}
    >
      <Trigger onClick={() => setOpen((o) => !o)} open={open} />

      {/* Popup */}
      <div
        className={clsx(
          'absolute top-full z-10 mt-1 bg-component-dropdown rounded-lg border border-border-primary shadow-dp8 transition-all',
          // Position.
          {
            // Offset for outline of Trigger.
            '-right-[2px]': position === 'left',
            '-left-[2px]': position === 'right',
          },
          // Open.
          {
            'opacity-0 pointer-events-none': !open,
            'opacity-100': open,
          },
          popupClassName
        )}
      >
        {children}
      </div>
    </div>
  )
}
