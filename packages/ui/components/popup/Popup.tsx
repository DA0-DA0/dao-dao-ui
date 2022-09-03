import clsx from 'clsx'
import {
  ComponentType,
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'

export interface PopupProps {
  Trigger: ComponentType<{ onClick: () => void; open: boolean }>
  position: 'left' | 'right'
  children: ReactNode | ReactNode[]
  wrapperClassName?: string
  popupClassName?: string
  getKeydownEventListener?: (
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
  ) => (event: KeyboardEvent) => any
  headerContent?: ReactNode
  onOpen?: () => void
  onClose?: () => void
  // Give parent a way to access and control setOpen.
  setOpenRef?: MutableRefObject<Dispatch<SetStateAction<boolean>> | null>
}

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
  setOpenRef,
}: PopupProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  // Store setOpen in ref so parent can control it.
  useEffect(() => {
    if (!setOpenRef) {
      return
    }

    // Add ref on mount.
    setOpenRef.current = setOpen

    // Remove ref on unmount.
    return () => {
      setOpenRef.current = null
    }
  }, [setOpenRef])

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

  return (
    <div
      className={clsx('inline-block relative', wrapperClassName)}
      ref={wrapperRef}
    >
      <Trigger onClick={() => setOpen((o) => !o)} open={open} />

      {/* Popup */}
      <div
        className={clsx(
          'flex absolute top-full z-10 flex-col mt-1 bg-component-dropdown rounded-lg border border-border-primary shadow-dp8 transition-all',
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
        {headerContent && (
          <div className="mb-4 border-b border-border-base">
            <div className="p-4">{headerContent}</div>
          </div>
        )}

        {children}
      </div>
    </div>
  )
}
